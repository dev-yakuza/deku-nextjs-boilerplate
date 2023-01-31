import React from 'react'

import '../styles/globals.css'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '@mui/material'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import i18n from '../utils/i18n'
import { i18n as i18nConfig } from '../next-i18next.config'
import { theme } from '../utils/theme'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: i18nConfig.defaultLocale,
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: 'EN', title: 'English' },
        { value: 'ko', right: 'KO', title: '한국어' },
        { value: 'ja', right: 'JA', title: '日本語' },
      ],
    },
  },
}

export const decorators = [
  (Story, { globals }) => {
    useEffect(() => {
      i18n.changeLanguage(globals.locale)
    }, [globals.locale])

    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <Story />
          </ThemeProvider>
        </I18nextProvider>
      </QueryClientProvider>
    )
  },
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
  layout: 'fullscreen',
}
