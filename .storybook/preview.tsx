import '../styles/globals.css'
import I18nProvider from 'next-translate/I18nProvider'
import { ThemeProvider } from '@mui/material'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import i18nConfig from '../i18n.json'
import { theme } from '../utils/theme'

const namespaces = [...new Set(Object.values(i18nConfig.pages).flat())]
const translations = Object.assign(
  {},
  ...i18nConfig.locales.map((locale) => ({
    [locale]: Object.assign(
      {},
      ...namespaces.map((ns) => ({
        [ns]: require(`../locales/${locale}/${ns}.json`),
      })),
    ),
  })),
)

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: i18nConfig.defaultLocale,
    toolbar: {
      icon: 'globe',
      items: [{ value: 'ja', right: 'JA', title: '日本語' }],
    },
  },
}

export const decorators = [
  (Story, { globals }) => (
    <ThemeProvider theme={theme}>
      <I18nProvider
        lang={globals.locale}
        namespaces={translations[globals.locale]}
      >
        <Story />
      </I18nProvider>
    </ThemeProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
