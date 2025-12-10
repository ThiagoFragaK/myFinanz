<template>
    <div class="container my-5">
        <div class="card border-success bg-transparent rounded-3">
            <div class="card-body">
                <div class="row">
                    <!-- Update Password Section -->
                    <div class="col-md-6 mb-4">
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
                            <div v-if="passwordError" class="alert alert-danger" role="alert">
                                {{ passwordError }}
                            </div>
                            <div v-if="passwordSuccess" class="alert alert-success" role="alert">
                                {{ passwordSuccess }}
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm" :disabled="isPasswordLoading">
                                <span v-if="isPasswordLoading" class="spinner-border spinner-border-sm me-2"></span>
                                Update Password
                            </button>
                        </form>
                    </div>

                    <!-- Language and Currency Settings -->
                    <div class="col-md-6 mb-4">
                        <h5 class="mb-3">Preferences</h5>
                        <form @submit.prevent="updateSettings">
                            <div class="mb-3">
                                <label for="language">Language</label>
                                <select
                                    class="form-select"
                                    id="language"
                                    v-model="settingsForm.language"
                                    required
                                >
                                    <option value="en">English</option>
                                    <option value="deu">Deutsch</option>
                                    <option value="es">Español</option>
                                    <option value="pt">Português</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="currency">Currency</label>
                                <select
                                    class="form-select"
                                    id="currency"
                                    v-model="settingsForm.currency"
                                    required
                                >
                                    <option value="BRL">Real (BRL)</option>
                                    <option value="EUR">Euro (EUR)</option>
                                    <option value="USD">Dollar (USD)</option>
                                    <option value="ARS">Peso (ARS)</option>
                                </select>
                            </div>
                            <div v-if="settingsError" class="alert alert-danger" role="alert">
                                {{ settingsError }}
                            </div>
                            <div v-if="settingsSuccess" class="alert alert-success" role="alert">
                                {{ settingsSuccess }}
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm" :disabled="isSettingsLoading">
                                <span v-if="isSettingsLoading" class="spinner-border spinner-border-sm me-2"></span>
                                Save Preferences
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Password form
const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
});
const isPasswordLoading = ref(false);
const passwordError = ref('');
const passwordSuccess = ref('');

// Settings form
const settingsForm = ref({
    language: 'pt',
    currency: 'BRL'
});
const isSettingsLoading = ref(false);
const settingsError = ref('');
const settingsSuccess = ref('');

onMounted(() => {
    // Initialize settings form with current user preferences
    settingsForm.value.language = authStore.language;
    settingsForm.value.currency = authStore.currency;
});

const updatePassword = async () => {
    passwordError.value = '';
    passwordSuccess.value = '';

    // Validate passwords match
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        passwordError.value = 'New passwords do not match';
        return;
    }

    isPasswordLoading.value = true;

    try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/users/password', {
            current_password: passwordForm.value.currentPassword,
            new_password: passwordForm.value.newPassword,
            new_password_confirmation: passwordForm.value.confirmPassword
        });

        if (response.data.success) {
            passwordSuccess.value = 'Password updated successfully';
            // Clear form
            passwordForm.value = {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            };
        } else {
            passwordError.value = response.data.message || 'Failed to update password';
        }
    } catch (error) {
        passwordError.value = error.response?.data?.message || 'Failed to update password';
    } finally {
        isPasswordLoading.value = false;
    }
};

const updateSettings = async () => {
    settingsError.value = '';
    settingsSuccess.value = '';
    isSettingsLoading.value = true;

    try {
        const result = await authStore.updateSettings(
            settingsForm.value.language,
            settingsForm.value.currency
        );

        if (result.success) {
            settingsSuccess.value = 'Preferences updated successfully';
        } else {
            settingsError.value = result.message || 'Failed to update preferences';
        }
    } catch (error) {
        settingsError.value = 'Failed to update preferences';
    } finally {
        isSettingsLoading.value = false;
    }
};

definePageMeta({
    middleware: ['auth']
});
</script>
