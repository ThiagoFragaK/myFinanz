import { configure } from 'vee-validate'
import '@/rules/validationRules.js'

export default defineNuxtPlugin(() => {
    configure({
        validateOnInput: true,
    })
})
