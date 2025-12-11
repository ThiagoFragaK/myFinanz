<template>
    <div>
        <h5 class="mb-3">Update Password</h5>
        <form @submit.prevent="updatePassword">
            <div class="mb-3">
                <label for="currentPassword">Current Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="currentPassword"
                    placeholder="Current password"
                    v-model="passwordForm.currentPassword"
                    required
                />
            </div>
            <div class="mb-3">
                <label for="newPassword">New Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="newPassword"
                    placeholder="New password"
                    v-model="passwordForm.newPassword"
                    required
                    minlength="8"
                />
                <small class="text-muted">Password must be at least 8 characters long.</small>
            </div>
            <div class="mb-3">
                <label for="confirmPassword">Confirm New Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    v-model="passwordForm.confirmPassword"
                    required
                />
            </div>
            <button type="submit" class="btn btn-primary btn-sm" :disabled="isPasswordLoading">
                <span v-if="isPasswordLoading" class="spinner-border spinner-border-sm me-2"></span>
                Update Password
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'UpdatePasswordComponent',
    data() {
        return {
            passwordForm: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            isPasswordLoading: false
        };
    },
    methods: {
        async updatePassword() {
            // Validate passwords match
            if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
                this.$notify({
                    title: 'Validation Error',
                    text: 'New passwords do not match',
                    icon: 'error'
                });
                return;
            }

            this.isPasswordLoading = true;

            try {
                const { $axios } = useNuxtApp();
                const response = await $axios.post('/users/password', {
                    current_password: this.passwordForm.currentPassword,
                    new_password: this.passwordForm.newPassword,
                    new_password_confirmation: this.passwordForm.confirmPassword
                });

                if (response.data.success) {
                    this.$notify({
                        title: 'Success',
                        text: 'Password updated successfully',
                        icon: 'success'
                    });
                    // Clear form
                    this.passwordForm = {
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    };
                } else {
                    this.$notify({
                        title: 'Error',
                        text: response.data.message || 'Failed to update password',
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.$notify({
                    title: 'Error',
                    text: error.response?.data?.message || 'Failed to update password',
                    icon: 'error'
                });
            } finally {
                this.isPasswordLoading = false;
            }
        }
    }
};
</script>
