export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE_URL,
        }
    },
    devtools: {
        enabled: true
    },
    plugins: [
        '~/plugins/sweetalert.client.js',
        '~/plugins/apexcharts.client.js',
        '~/plugins/vee-validate.js',
    ], 
    css: [
        '@/assets/scss/styles.scss' 
    ],
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap'
                }
            ],
            script: [
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js',
                    defer: true, 
                },
            ],
        }
    },
})
  