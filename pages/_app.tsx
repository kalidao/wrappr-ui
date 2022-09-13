import { useState } from 'react'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import { theme } from '@design/theme'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@fontsource/alegreya-sans/'
import '../styles/globals.css'
import merge from 'lodash.merge'

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
  const accentColor = useColorModeValue('gray.50', '#013232')
  const accentColorForeground = useColorModeValue('gray.900', 'gray.50')
  const connectText = useColorModeValue('gray.600', 'gray.300')

  const wrapprTheme = merge(darkTheme(), {
    blurs: {
      modalOverlay: 'blur(30px)',
    },
    colors: {
      accentColor: accentColor,
      accentColorForeground: accentColorForeground,
      connectButtonBackground: accentColor,
      connectButtonText: connectText,
      connectButtonInnerBackground: 'none',
      modalBackground: 'none',
      selectedOptionBorder: '',
    },
    fonts: {
      body: `"Alegreya Sans", sans-serif`,
    },
    shadows: {
      connectButton: '1px 2px 6px rgba(1,50,50, 0.2)',
    },
  } as Theme)

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} coolMode={true} modalSize="compact" theme={wrapprTheme}>
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
