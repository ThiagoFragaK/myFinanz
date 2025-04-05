export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { 
        enabled: true
    },
    plugins: [
        '~/plugins/sweetalert.client.js',
    ], 
    css: [
        '~/assets/darkly.css',
    ],
    app: {
        head: {
            script: [
                {
                    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js',
                    defer: true, 
                },
            ],
        },
    },
})
  