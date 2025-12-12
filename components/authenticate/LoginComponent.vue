<template>
    <div class="login-component">
        <div v-if="isCheckingAuth" class="text-center py-5">
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span class="text-muted">Checking authentication...</span>
        </div>
        <form v-else @submit.prevent="onSubmit">
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
                        placeholder="your@email.com"
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
    import { useAuthStore } from '@/stores/auth';

    export default {
        name: "LoginComponent",
        components: {
            Lucide
        },
        data() {
            return {
                showPassword: false,
                isLoading: false,
                isCheckingAuth: true,
                form: {
                    email: '',
                    password: '',
                },
                errors: {},
            };
        },
        async mounted() {
            // Check if there's a valid token and try to authenticate
            const authStore = useAuthStore();
            
            if (process.client) {
                const token = localStorage.getItem('token');
                
                if (token) {
                    try {
                        await authStore.initializeAuth();
                        
                        // If authentication was successful, redirect to home
                        if (authStore.isAuthenticated && authStore.user) {
                            this.$router.push('/');
                            return;
                        }
                    } catch (error) {
                        // Token is invalid or expired, will be removed by initializeAuth
                        console.log('Token validation failed, user needs to login');
                    }
                }
            }
            
            this.isCheckingAuth = false;
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
                
                const authStore = useAuthStore();
                const result = await authStore.login(this.form.email, this.form.password);

                this.isLoading = false;

                if (result.success) {
                    this.$notify({
                        title: "Success",
                        text: "Login successful!",
                        icon: 'success'
                    });
                    this.$router.push("/");
                } else {
                    this.$notify({
                        title: "Login failed",
                        text: result.message || "Invalid credentials",
                        icon: 'error'
                    });
                }
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
