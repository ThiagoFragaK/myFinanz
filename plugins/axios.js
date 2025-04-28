import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    nuxtApp.provide('axios', api);
});