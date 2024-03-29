import '@/styles/globals.css'
import theme from '@/themeConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ReactElement, ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {getLayout(
          <ConfigProvider theme={theme}>
            <main className={inter.className}>
              <Toaster />
              <Component {...pageProps} />
            </main>
          </ConfigProvider>
        )}
      </QueryClientProvider>
    </SessionProvider>
  )
}
