import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
        baseURL: 'https://api.example.com',
    })

    nuxtApp.provide('axios', api)
})