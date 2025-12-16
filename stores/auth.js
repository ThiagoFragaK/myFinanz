import { defineStore } from 'pinia';
import { useAuthService } from '@/services/AuthService';
import { useUserService } from '@/services/UserService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        language: 'pt',
        currency: 'BRL',
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
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
                        } catch (error) {
                            console.error('Failed to fetch user data:', error);
                            this.token = null;
                            this.language = 'pt';
                            this.currency = 'BRL';
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
