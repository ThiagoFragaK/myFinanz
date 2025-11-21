<template>
    <div class="login-component">
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label for="email" class="form-label fw-semibold">Email</label>
                <div class="input-group">
                    <span class="input-group-text bg-light border-end-0 text-secondary">
                        <Lucide icon="Mail" :size="18" />
                    </span>
                    <input
                        type="email"
                        class="form-control bg-light border-start-0 ps-0"
                        :class="{ 'is-invalid': errors.email }"
                        placeholder="seu@email.com"
                        v-model="form.email"
                        @blur="validateField('email')"
                        @input="validateField('email')"
                    />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label fw-semibold">Password</label>
                <div class="input-group">
                    <span class="input-group-text bg-light border-end-0 text-secondary">
                        <Lucide icon="Lock" :size="18" />
                    </span>
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control bg-light border-start-0 border-end-0 ps-0"
                        :class="{ 'is-invalid': errors.password }"
                        placeholder="••••••••"
                        v-model="form.password"
                        @blur="validateField('password')"
                        @input="validateField('password')"
                    />
                    <span
                        class="input-group-text bg-light border-start-0 cursor-pointer text-secondary"
                        @click="togglePassword"
                        style="cursor: pointer;"
                    >
                        <Lucide :icon="showPassword ? 'EyeOff' : 'Eye'" :size="18" />
                    </span>
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="d-flex justify-content-end mt-1">
                    <a href="#" class="text-decoration-none small text-primary fw-semibold">Forgot password?</a>
                </div>
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2 fw-bold shadow-sm" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Login
            </button>
        </form>
    </div>
</template>

<script>
    import Lucide from '@/components/icons/Lucide.vue';
    import { Validation } from '@/helpers/Validation';

    export default {
        name: "LoginComponent",
        components: {
            Lucide
        },
        data() {
            return {
                showPassword: false,
                isLoading: false,
                form: {
                    email: '',
                    password: '',
                },
                errors: {},
            };
        },
        methods: {
            togglePassword() {
                this.showPassword = !this.showPassword;
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
                if (!isValid) {
                    return this.$notify({
                        title: "Validation error",
                        text: "One or more fields aren't valid, fix them and try again.",
                        icon: 'error'
                    });
                }

                this.isLoading = true;
                // Simulate API call
                console.log('Login submitted:', this.form);
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.isLoading = false;
                // Handle login logic here
            }
        }
    }
</script>

<style scoped>
.input-group-text {
    border-color: #dee2e6;
}

.form-control {
    border-color: #dee2e6;
}

.form-control:focus {
    box-shadow: none;
    border-color: var(--bs-primary);
}

.form-control:focus + .input-group-text,
.input-group-text:has(+ .form-control:focus) {
    border-color: var(--bs-primary);
}

.btn-primary {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #2c6360;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(52, 117, 113, 0.2) !important;
}
</style>
