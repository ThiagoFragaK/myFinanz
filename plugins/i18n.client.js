import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import pt from '../locales/pt.json'
import es from '../locales/es.json'
import de from '../locales/de.json'
import fr from '../locales/fr.json'

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'en',
        messages: {
            en,
            pt,
            es,
            de,
            fr
        }
    })

    vueApp.use(i18n)

    return {
        provide: {
            i18n
        }
    }
})
