<template>
    <ModalComponent
        id="CreateUserModal"
        :isLoading="isLoading"
        title="Create New User"
        saveText="Create User"
        @save="onSubmit"
        ref="modal"
    >
        <template #header>
            <div class="modal-header bg-primary text-white">
                <IconsLucide icon="UserPlus" />
                <h5 class="modal-title ms-2"> New User </h5>
                <button 
                    class="btn text-white ms-auto" 
                    data-bs-dismiss="modal" 
                    @click="close" 
                >
                    <IconsLucide icon="X" />
                </button>
            </div>
        </template>

        <template #body>
            <div class="modal-body">
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
                </form>
            </div>
        </template>
    </ModalComponent>
</template>

<script>
import Lucide from '@/components/icons/Lucide.vue';
import ModalComponent from '@/components/global/ModalComponent.vue';
import { useUserService } from '@/services/UserService';
import { Validation } from '@/helpers/Validation';

export default {
    name: 'CreateUserModal',
    components: {
        Lucide,
        ModalComponent
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
        open() {
            this.form.email = '';
            this.errors = {};
            this.$refs.modal.open();
        },
        close() {
            this.$refs.modal.close();
        },
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
                   this.close();
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
