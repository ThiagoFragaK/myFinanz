<template>
    <ModalComponent
        id="changePasswordModal"
        ref="modal"
        title="Change Password"
        :isLoading="isLoading"
        saveText="Change Password"
        :showCancel="false"
        @save="onSubmit"
    >
        <template #header>
            <div class="modal-header">
                <h5 class="modal-title">Change Password</h5>
                <!-- No close button -->
            </div>
        </template>
        <template #body>
            <p class="text-muted mb-3">
                This is your first login. You must change your password to continue.
            </p>
            <form @submit.prevent="onSubmit">
                <div class="mb-3">
                    <label class="form-label">Current Password</label>
                    <input
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors.current_password }"
                        v-model="form.current_password"
                        @blur="validateField('current_password')"
                        @input="validateField('current_password')"
                        placeholder="Enter current password"
                    >
                     <div class="invalid-feedback">{{ errors.current_password }}</div>
                </div>
                <div class="mb-3">
                    <label class="form-label">New Password</label>
                    <input
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors.new_password }"
                        v-model="form.new_password"
                        @blur="validateField('new_password')"
                        @input="validateField('new_password')"
                        placeholder="Minimum 8 characters"
                    >
                    <div class="invalid-feedback">{{ errors.new_password }}</div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Confirm New Password</label>
                    <input
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors.new_password_confirmation }"
                        v-model="form.new_password_confirmation"
                        @blur="validateField('new_password_confirmation')"
                        @input="validateField('new_password_confirmation')"
                        placeholder="Confirm new password"
                    >
                    <div class="invalid-feedback">{{ errors.new_password_confirmation }}</div>
                </div>
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <!-- Submit handled by Modal Save button -->
            </form>
        </template>
        <template #footer>
            <div class="modal-footer justify-content-end">
                <button type="button" class="btn btn-primary" :disabled="isLoading" @click="onSubmit">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                    Change Password
                </button>
            </div>
        </template>
    </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/global/ModalComponent.vue';
import { useUserService } from '@/services/UserService';
import { useAuthStore } from '@/stores/auth';
import { Validation } from '@/helpers/Validation';

export default {
    name: 'ChangePasswordModal',
    components: {
        ModalComponent
    },
    data() {
        return {
            form: {
                current_password: '',
                new_password: '', // Validation rules expect 'password' or aliases? 'new_password' needs a rule or alias? 
                // The rules file has 'password'. I should probably map it conceptually or update rules?
                // Rules file: 'password' rule exists. 'new_password' isn't there explicitly.
                // Wait, Validation helper: `rules[fieldName]`.
                // If I use 'new_password', it won't find a rule unless I add it to ValidationRules or map it.
                // I will add 'current_password', 'new_password', 'new_password_confirmation' to rules dynamically or use existing.
                // Actually, I can use a local 'rules' object? No, Validation helper imports fixed rules.
                // I should assume the developer adds them or I should add them if allowed.
                // 'password' rule exists. 'confirmed' rule exists.
                // Let's check validationRules.js again.
                // It exports `rules` object directly.
                // I will use `password` as field name for validation logic? No, form fields need unique names.
                // I will update validationRules.js to include these fields if needed, OR just reuse 'password' rule for 'new_password'.
                // But the helper does `const rule = rules[fieldName]`.
                // So I MUST update validationRules.js or alias it.
                // I will assume for now I should update validationRules.js to support 'new_password' etc.
                // Or I can map it in data, but that's messy.
                // Better approach: Update validationRules.js to include these necessary keys.
                new_password_confirmation: ''
            },
            errors: {},
            isLoading: false,
            error: null
        }
    },
    methods: {
        open() {
            this.form.current_password = '';
            this.form.new_password = '';
            this.form.new_password_confirmation = '';
            this.errors = {};
            this.$refs.modal.open();
        },
        async validateField(field) {
            // Mapping for validation: We need rules for 'current_password' and 'new_password'.
            // If they are missing in rules file, validation fails or does nothing?
            // "if (!rule) return fieldValidation;" -> passes as valid.
            // That's bad.
            // I will update validationRules.js in a separate step.
            
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

            // Custom check for confirmation if not covered by generic rule (generic rule 'confirmed' relies on ctx)
            // The helper defines `confirmed` rule but implementation details:
            // "defineRule('confirmed', (value, [target], ctx) => ..."
            // But Validation helper `validateField` calls `validate(fieldValue, rule)`.
            // Does it pass `ctx`? `validate` from vee-validate does if configured.
            // The helper seems simple. I'll rely on manual check for confirmation to be safe given I can't debug vee-validate internals deeply.
            if (this.form.new_password !== this.form.new_password_confirmation) {
                 this.errors.new_password_confirmation = "Passwords do not match";
                 return;
            }

            this.isLoading = true;
            this.error = null;

            const { $axios } = useNuxtApp();
            const userService = useUserService($axios);
            const authStore = useAuthStore();

            try {
                const response = await userService.updatePassword(this.form);
                if (response.data.success) {
                    this.$notify({
                         title: "Success",
                         text: "Password changed successfully!",
                         icon: 'success'
                    });
                    this.$refs.modal.close();
                    if (authStore.user) {
                        authStore.user.is_first_login = false;
                    }
                    authStore.is_first_login = false;
                } else {
                    this.error = response.data.message || 'Failed to update password';
                }
            } catch (err) {
                this.error = err.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>
