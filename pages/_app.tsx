import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { connectorsForWallets, wallet, RainbowKitProvider, DisclaimerComponent, Theme } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
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
  [chain.mainnet, chain.optimism, chain.polygon, chain.arbitrum, xdai, avalanche, bsc, chain.goerli, xdai],
  [infuraProvider({ apiKey: process.env.INFURA_ID }), publicProvider()],
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.injected({ chains }),
      wallet.metaMask({ chains }),
      wallet.rainbow({ chains }),
      wallet.coinbase({ appName: 'Wrappr', chains }),
      wallet.walletConnect({ chains }),
    ],
  },
  {
    groupName: 'Extra',
    wallets: [wallet.ledger({ chains }), GnosisConnector({ chains })],
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
    and understand the included Disclaimers.
  </Text>
)

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const mode = useThemeStore((state) => state.mode)
  const [theme, setTheme] = useState<Theme>()

  useEffect(() => {
    setTheme(getRainbowTheme(mode))
  }, [mode])

  return (
    <ThemeProvider defaultAccent="teal" defaultMode={mode} forcedMode="dark">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} coolMode={true} modalSize="compact" theme={theme}>
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
