import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        async login(email, password) {
            const { $axios } = useNuxtApp();
            try {
                const response = await $axios.post('/login', { email, password });

                if (response.data.success) {
                    const { access_token, user } = response.data.data;
                    this.token = access_token;
                    this.user = user;

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

        logout() {
            this.token = null;
            this.user = null;
            if (process.client) {
                localStorage.removeItem('token');
            }
        }
    }
});
