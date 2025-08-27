export default {
    mounted(el, binding) {
        el.setAttribute('data-bs-toggle', 'tooltip')
        el.setAttribute('data-bs-title', binding.value || '')

        el._tooltip = new bootstrap.Tooltip(el)
    },
    updated(el, binding) {
        if (binding.value !== binding.oldValue) {
            el.setAttribute('data-bs-title', binding.value || '')
            if (el._tooltip) {
                el._tooltip.dispose()
            }
            el._tooltip = new bootstrap.Tooltip(el)
        }
    },
    unmounted(el) {
        if (el._tooltip) {
            el._tooltip.dispose()
            delete el._tooltip
        }
    }
}