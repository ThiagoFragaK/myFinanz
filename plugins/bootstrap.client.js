import { createPopper } from '@popperjs/core'
export default defineNuxtPlugin(async () => {
    if (process.client) {
        window.Popper = { createPopper }
        import('/public/vendor/bootstrap.bundle.min.js');
    }
});