<template>
    <div>
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
            <button type="submit" class="btn btn-primary btn-sm" :disabled="isSettingsLoading">
                <span v-if="isSettingsLoading" class="spinner-border spinner-border-sm me-2"></span>
                Save Preferences
            </button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
    name: 'PreferencesComponent',
    data() {
        return {
            settingsForm: {
                language: 'pt',
                currency: 'BRL'
            },
            isSettingsLoading: false
        };
    },
    mounted() {
        const authStore = useAuthStore();
        // Initialize settings form with current user preferences
        this.settingsForm.language = authStore.language;
        this.settingsForm.currency = authStore.currency;
    },
    methods: {
        async updateSettings() {
            this.isSettingsLoading = true;

            try {
                const authStore = useAuthStore();
                const result = await authStore.updateSettings(
                    this.settingsForm.language,
                    this.settingsForm.currency
                );

                if (result.success) {
                    this.$notify({
                        title: 'Success',
                        text: 'Preferences updated successfully',
                        icon: 'success'
                    });
                } else {
                    this.$notify({
                        title: 'Error',
                        text: result.message || 'Failed to update preferences',
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.$notify({
                    title: 'Error',
                    text: 'Failed to update preferences',
                    icon: 'error'
                });
            } finally {
                this.isSettingsLoading = false;
            }
        }
    }
};
</script>
