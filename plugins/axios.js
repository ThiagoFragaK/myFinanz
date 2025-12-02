import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const api = axios.create({
        baseURL: config.public.apiBase,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Request interceptor to attach token
    api.interceptors.request.use(
        (config) => {
            if (process.client) {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor to handle 401 errors
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                // Token expired or invalid
                if (process.client) {
                    localStorage.removeItem('token');
                    // Redirect to login
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', api);
});