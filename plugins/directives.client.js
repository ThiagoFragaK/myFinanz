import tooltipDirective from '~/directives/tooltip.js';
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tooltip', tooltipDirective)
});