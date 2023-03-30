import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { appWithTranslation } from 'next-i18next'
import { RecoilRoot } from 'recoil'

import { PageContainer } from 'components/atoms'
import { Header } from 'components/organisms'
import { theme } from 'utils/theme'

import type { AppProps } from 'next/app'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <PageContainer>
            <Header />
            <Component {...pageProps} />
          </PageContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
