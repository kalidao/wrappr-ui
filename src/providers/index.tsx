import { useState } from 'react'
import { RainbowKitProvider, DisclaimerComponent, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'

import { SUPPORTED_CHAINS } from '~/constants/chains'
import { AppProps } from 'next/app'
import { siteConfig } from '@/config/siteConfig'
import { Toaster } from 'sonner'

const { chains, publicClient } = configureChains(SUPPORTED_CHAINS, [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID! }),
  publicProvider(),
])

const { connectors } = getDefaultWallets({
  appName: siteConfig.name,
  projectId: process.env.NEXT_PUBLIC_WC_ID!,
  chains,
})

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <p>
    By connecting your wallet, you agree to the <Link href="/tos">Terms of Service</Link> and acknowledge you have read
    and understand the included Disclaimers.
  </p>
)

export default function RootProvider({
  children,
  pageProps,
}: {
  children: React.ReactNode
  pageProps: AppProps['pageProps']
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider>
      <WagmiConfig config={wagmiClient}>
        <RainbowKitProvider
          appInfo={{
            appName: siteConfig.name,
            learnMoreUrl: siteConfig.docsBaseUrl,
            disclaimer: Disclaimer,
          }}
          chains={chains}
          coolMode={true}
          modalSize="compact"
        >
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              {children}
              <Toaster richColors />
            </Hydrate>
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}
