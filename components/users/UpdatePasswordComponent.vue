<template>
    <div>
        <h5 class="mb-3">{{ $t('user.password.title') }}</h5>
        <form @submit.prevent="updatePassword">
            <div class="mb-3">
                <label for="currentPassword">{{ $t('user.password.current') }}</label>
                <input
                    type="password"
                    class="form-control"
                    id="currentPassword"
                    :placeholder="$t('user.password.current')"
                    v-model="passwordForm.currentPassword"
                    @blur="validateField('currentPassword')"
                    @input="validateField('currentPassword')"
                    required
                />
                <small v-if="errors.currentPassword" class="text-danger">{{ errors.currentPassword }}</small>
            </div>
            <div class="mb-3">
                <label for="newPassword">{{ $t('user.password.new') }}</label>
                <input
                    type="password"
                    class="form-control"
                    id="newPassword"
                    :placeholder="$t('user.password.new')"
                    v-model="passwordForm.newPassword"
                    @blur="validateField('newPassword')"
                    @input="validateField('newPassword')"
                    required
                    minlength="8"
                />
                <small class="text-muted">{{ $t('user.password.help') }}</small>
                <small v-if="errors.newPassword" class="text-danger d-block">{{ errors.newPassword }}</small>
            </div>
            <div class="mb-3">
                <label for="confirmPassword">{{ $t('user.password.confirm') }}</label>
                <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    :placeholder="$t('user.password.confirm')"
                    v-model="passwordForm.confirmPassword"
                    @blur="validateField('confirmPassword')"
                    @input="validateField('confirmPassword')"
                    required
                />
                <small v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</small>
            </div>
            <button type="submit" class="btn btn-primary btn-sm" :disabled="isPasswordLoading">
                <span v-if="isPasswordLoading" class="spinner-border spinner-border-sm me-2"></span>
                {{ $t('user.password.update') }}
            </button>
        </form>
    </div>
</template>

<script>
import { Validation } from '@/helpers/Validation';
import { useUserService } from '@/services/UserService';

export default {
    name: 'UpdatePasswordComponent',
    data() {
        return {
            passwordForm: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            isPasswordLoading: false,
            errors: {}
        };
    },
    methods: {
        async validateField(field) {
            const value = this.passwordForm[field];
            const result = await Validation.validateField(field, value);

            this.errors[field] = result[field].message;
            return result[field].status;
        },
        async validateForm() {
            const result = await Validation.validateForm(this.passwordForm);
            this.errors = Object.fromEntries(
                Object.entries(result.fields).map(([key, value]) => [key, value.message])
            );
            return result.valid;
        },
        async updatePassword() {
            const isValid = await this.validateForm();
            if (!isValid) {
                return this.$notify({
                    title: this.$t('login.notifications.validation_error'),
                    text: this.$t('login.notifications.validation_text'),
                    icon: 'error'
                });
            }

            // Validate passwords match
            if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
                this.$notify({
                    title: this.$t('login.notifications.validation_error'),
                    text: this.$t('user.password.match_error'),
                    icon: 'error'
                });
                return;
            }

            this.isPasswordLoading = true;

            try {
                const { $axios } = useNuxtApp();
                const userService = useUserService($axios);
                const response = await userService.updatePassword({
                    current_password: this.passwordForm.currentPassword,
                    new_password: this.passwordForm.newPassword,
                    new_password_confirmation: this.passwordForm.confirmPassword
                });

                if (response.data.success) {
                    this.$notify({
                        title: this.$t('login.notifications.success'),
                        text: this.$t('user.password.success'),
                        icon: 'success'
                    });
                    // Clear form
                    this.passwordForm = {
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    };
                    this.errors = {};
                } else {
                    this.$notify({
                        title: this.$t('login.notifications.failed'),
                        text: response.data.message || this.$t('user.password.failed'),
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.$notify({
                    title: this.$t('login.notifications.failed'),
                    text: error.response?.data?.message || this.$t('user.password.failed'),
                    icon: 'error'
                });
            } finally {
                this.isPasswordLoading = false;
            }
        }
    }
};
</script>
