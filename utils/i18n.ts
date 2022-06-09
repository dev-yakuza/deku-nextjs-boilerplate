import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { i18n as i18nConfig } from '../next-i18next.config'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: Object.assign(
    {},
    ...i18nConfig.locales.map((locale) => ({
      [locale]: {
        common: require(`../public/locales/${locale}/common.json`),
      },
    })),
  ),
})

export default i18n
