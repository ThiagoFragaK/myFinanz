import { defineStore } from 'pinia';
import { useAuthService } from '@/services/AuthService';
import { useUserService } from '@/services/UserService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        language: 'pt',
        currency: 'BRL',
        role: null,
        is_first_login: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.role === 'admin',
    },
    actions: {
        async login(email, password) {
            const { $axios } = useNuxtApp();
            const authService = useAuthService($axios);
            try {
                const response = await authService.login({ email, password });

                if (response.data.success) {
                    const { access_token, user } = response.data.data;
                    this.token = access_token;
                    this.user = user;
                    this.language = user.language || 'pt';
                    this.currency = user.currency || 'BRL';
                    this.role = user.role;
                    this.is_first_login = user.is_first_login;

                    const { $i18n } = useNuxtApp();
                    if ($i18n && $i18n.global) {
                        $i18n.global.locale.value = this.language;
                    }

                    if (process.client) {
                        localStorage.setItem('token', access_token);
                    }

                    return { success: true };
                }

                return {
                    success: false,
                    message: response.data.message
                };

            } catch (error) {
                return {
                    success: false,
                    message: error.response?.data?.message || 'Login failed',
                    errors: error.response?.data?.errors
                };
            }
        },

        async logout() {
            const { $axios } = useNuxtApp();
            const authService = useAuthService($axios);
            try {
                if (this.token) {
                    await authService.logout();
                }
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                this.token = null;
                this.user = null;
                this.language = 'pt';
                this.currency = 'BRL';
                this.role = null;
                this.is_first_login = false;
                if (process.client) {
                    localStorage.removeItem('token');
                }
            }
        },

        async initializeAuth() {
            if (process.client) {
                const token = localStorage.getItem('token');

                if (token) {
                    this.token = token;

                    if (!this.user) {
                        try {
                            const { $axios } = useNuxtApp();
                            const userService = useUserService($axios);
                            const response = await userService.getUser();
                            this.user = response.data;
                            this.language = response.data.language || 'pt';
                            this.currency = response.data.currency || 'BRL';
                            this.role = response.data.role;
                            this.is_first_login = response.data.is_first_login;

                            const { $i18n } = useNuxtApp();
                            if ($i18n && $i18n.global) {
                                $i18n.global.locale.value = this.language;
                            }
                        } catch (error) {
                            console.error('Failed to fetch user data:', error);
                            this.token = null;
                            this.language = 'pt';
                            this.currency = 'BRL';
                            this.role = null;
                            this.is_first_login = false;
                            localStorage.removeItem('token');
                        }
                    }
                }
            }
        },

        async updateSettings(language, currency) {
            const { $axios } = useNuxtApp();
            const userService = useUserService($axios);
            try {
                const response = await userService.updateSettings({ language, currency });

                if (response.data.success) {
                    this.language = language;
                    this.currency = currency;
                    this.user = response.data.user;

                    const { $i18n } = useNuxtApp();
                    if ($i18n && $i18n.global) {
                        $i18n.global.locale.value = this.language;
                    }

                    return { success: true };
                }

                return {
                    success: false,
                    message: response.data.message
                };

            } catch (error) {
                return {
                    success: false,
                    message: error.response?.data?.message || 'Failed to update settings',
                    errors: error.response?.data?.errors
                };
            }
        }
    }
});
