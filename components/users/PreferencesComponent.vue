<template>
    <div>
        <h5 class="mb-3">{{ $t('user.preferences.title') }}</h5>
        <form @submit.prevent="updateSettings">
            <div class="mb-3">
                <label for="language">{{ $t('user.preferences.language') }}</label>
                <select
                    class="form-select"
                    id="language"
                    v-model="settingsForm.language"
                    @blur="validateField('language')"
                    @input="validateField('language')"
                    required
                >
                    <option v-for="lang in languagesList" :key="lang.value" :value="lang.value">
                        {{ lang.label }}
                    </option>
                </select>
                <small v-if="errors.language" class="text-danger">{{ errors.language }}</small>
            </div>
            <div class="mb-3">
                <label for="currency">{{ $t('user.preferences.currency') }}</label>
                <select
                    class="form-select"
                    id="currency"
                    v-model="settingsForm.currency"
                    @blur="validateField('currency')"
                    @input="validateField('currency')"
                    required
                >
                    <option v-for="curr in currenciesList" :key="curr.value" :value="curr.value">
                        {{ curr.label }}
                    </option>
                </select>
                <small v-if="errors.currency" class="text-danger">{{ errors.currency }}</small>
            </div>
            <button type="submit" class="btn btn-primary btn-sm" :disabled="isSettingsLoading">
                <span v-if="isSettingsLoading" class="spinner-border spinner-border-sm me-2"></span>
                {{ $t('user.preferences.save') }}
            </button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { Validation } from '@/helpers/Validation';

export default {
    name: 'PreferencesComponent',
    data() {
        return {
            settingsForm: {
                language: 'pt',
                currency: 'BRL'
            },
            languagesList: [
                { value: 'en', label: 'English' },
                { value: 'en', label: 'English' },
                { value: 'de', label: 'Deutsch' },
                { value: 'es', label: 'Español' },
                { value: 'pt', label: 'Português' },
                { value: 'fr', label: 'Français' }
            ],
            currenciesList: [
                { value: 'BRL', label: 'Real (BRL)' },
                { value: 'EUR', label: 'Euro (EUR)' },
                { value: 'USD', label: 'Dollar (USD)' },
                { value: 'ARS', label: 'Peso (ARS)' }
            ],
            isSettingsLoading: false,
            errors: {}
        };
    },
    mounted() {
        const authStore = useAuthStore();
        // Initialize settings form with current user preferences
        this.settingsForm.language = authStore.language;
        this.settingsForm.currency = authStore.currency;
    },
    methods: {
        async validateField(field) {
            const value = this.settingsForm[field];
            const result = await Validation.validateField(field, value);

            this.errors[field] = result[field].message;
            return result[field].status;
        },
        async validateForm() {
            const result = await Validation.validateForm(this.settingsForm);
            this.errors = Object.fromEntries(
                Object.entries(result.fields).map(([key, value]) => [key, value.message])
            );
            return result.valid;
        },
        async updateSettings() {
            const isValid = await this.validateForm();
            if (!isValid) {
                return this.$notify({
                    title: this.$t('login.notifications.validation_error'),
                    text: this.$t('login.notifications.validation_text'),
                    icon: 'error'
                });
            }

            this.isSettingsLoading = true;

            try {
                const authStore = useAuthStore();
                const result = await authStore.updateSettings(
                    this.settingsForm.language,
                    this.settingsForm.currency
                );

                if (result.success) {
                    this.$notify({
                        title: this.$t('login.notifications.success'),
                        text: this.$t('user.preferences.success'),
                        icon: 'success'
                    });
                    this.$i18n.locale = this.settingsForm.language;
                } else {
                    this.$notify({
                        title: this.$t('login.notifications.failed'),
                        text: result.message || this.$t('user.preferences.failed'),
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.$notify({
                    title: this.$t('login.notifications.failed'),
                    text: this.$t('user.preferences.failed'),
                    icon: 'error'
                });
            } finally {
                this.isSettingsLoading = false;
            }
        }
    }
};
</script>
