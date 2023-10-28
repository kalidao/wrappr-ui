import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, useTheme } from 'next-themes'

import { AppProps } from 'next/app'
import { Toaster } from 'sonner'
import WalletProvider from './wallet-provider'

export default function RootProvider({
  children,
  pageProps,
}: {
  children: React.ReactNode
  pageProps: AppProps['pageProps']
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider attribute="class">
      <WalletProvider pageProps={pageProps}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {children}
            <Toaster richColors />
          </Hydrate>
        </QueryClientProvider>
      </WalletProvider>
    </ThemeProvider>
  )
}
