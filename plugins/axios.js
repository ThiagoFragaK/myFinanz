import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
        baseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    nuxtApp.provide('axios', api);
});