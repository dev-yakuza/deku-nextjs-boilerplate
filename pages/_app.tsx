import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'

import { theme } from 'utils/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />{' '}
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
