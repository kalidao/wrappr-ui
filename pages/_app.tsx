import { useState } from 'react'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  cssStringFromTheme,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@design/theme'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fontsource/alegreya-sans/'
import '../styles/globals.css'

const { chains, provider } = configureChains(
  [chain.goerli],
  [infuraProvider({ apiKey: process.env.INFURA_ID }), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'Wrappr',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          coolMode={true}
          modalSize="compact"
          theme={darkTheme({
            accentColor: '#02CACA',
            accentColorForeground: 'black',
            borderRadius: 'large',
            fontStack: 'system',
          })}
        >
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
