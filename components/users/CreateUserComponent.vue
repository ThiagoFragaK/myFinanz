<template>
    <div class="card bg-light border-0 shadow-sm h-100">
        <div class="card-body">
            <h5 class="card-title text-primary mb-3">
                <Lucide icon="UserPlus" class="me-2" :size="20" />
                Create New User
            </h5>
            <p class="text-muted small mb-4">
                Create a new user by entering their email address. A default password will be assigned.
            </p>

            <form @submit.prevent="onSubmit">
                <div class="mb-3">
                    <label class="form-label small fw-semibold">Email Address</label>
                    <div class="input-group">
                        <span class="input-group-text bg-white border-end-0">
                            <Lucide icon="Mail" :size="16" />
                        </span>
                        <input 
                            type="email" 
                            class="form-control border-start-0"
                            :class="{ 'is-invalid': errors.email }"
                            v-model="form.email"
                            @blur="validateField('email')"
                            @input="validateField('email')"
                            placeholder="user@example.com"
                        >
                        <div class="invalid-feedback">{{ errors.email }}</div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                    Create User
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import Lucide from '@/components/icons/Lucide.vue';
import { useUserService } from '@/services/UserService';
import { Validation } from '@/helpers/Validation';

export default {
    name: 'CreateUserComponent',
    components: {
        Lucide
    },
    data() {
        return {
            form: {
                email: ''
            },
            errors: {},
            isLoading: false
        }
    },
    methods: {
        async validateField(field) {
            const value = this.form[field];
            const result = await Validation.validateField(field, value);

            this.errors[field] = result[field].message;
            return result[field].status;
        },
        async validateForm() {
            const result = await Validation.validateForm(this.form);
            this.errors = Object.fromEntries(
                Object.entries(result.fields).map(([key, value]) => [key, value.message])
            );
            return result.valid;
        },
        async onSubmit() {
            const isValid = await this.validateForm();
            if (!isValid) return;

            this.isLoading = true;
            const { $axios } = useNuxtApp();
            const userService = useUserService($axios);

            try {
                const response = await userService.createUser(this.form.email);
                if (response.data.success) {
                  this.$notify({
                        title: "Success",
                        text: "User created successfully!",
                        icon: 'success'
                   });
                   this.form.email = ''; // Reset form
                   this.errors = {};
                } else {
                    this.$notify({
                        title: "Error",
                        text: response.data.message || "Failed to create user",
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.$notify({
                    title: "Error",
                    text: error.response?.data?.message || "An error occurred",
                    icon: 'error'
                });
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>
