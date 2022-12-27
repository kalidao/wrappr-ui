import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { connectorsForWallets, RainbowKitProvider, DisclaimerComponent, Theme } from '@rainbow-me/rainbowkit'
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  ledgerWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, optimism, polygon, arbitrum, goerli } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/globals.css'
import { avalanche, bsc, xdai, fantom } from '~/constants/chains'
import { GnosisConnector } from '~/wallets/'
import { getRainbowTheme } from '~/utils/getRainbowTheme'
import { useThemeStore } from '~/hooks/useThemeStore'
import { ThemeProvider } from '@kalidao/reality'
import '@kalidao/reality/styles'
import '@design/app.css'

const { chains, provider } = configureChains(
  [mainnet, optimism, polygon, arbitrum, xdai, avalanche, bsc, goerli, xdai],
  [infuraProvider({ apiKey: process.env.INFURA_ID ?? ''}), publicProvider()],
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      coinbaseWallet({ appName: 'Wrappr', chains }),
      walletConnectWallet({ chains }),
    ],
  },
  {
    groupName: 'Extra',
    wallets: [ledgerWallet({ chains }), GnosisConnector({ chains })],
  },
])

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
})

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the <Link href="/tos">Terms of Service</Link> and acknowledge you have read
    and understand the Disclaimers therein.
  </Text>
)

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const rainbowTheme = getRainbowTheme('dark')

  return (
    <ThemeProvider defaultAccent="teal" defaultMode={'dark'} forcedMode="dark">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} coolMode={true} modalSize="compact" theme={rainbowTheme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}

export default MyApp
