import { useState } from 'react'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [infuraProvider({ infuraId: process.env.INFURA_ID }), publicProvider()],
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

const config: ThemeConfig = {
  initialColorMode: 'dark',
}

export const theme = extendTheme({
  config,
  colors: {
    gray: {
      '50': '#3a3f42',
      '100': '#3a3f42',
      '200': '#313538',
      '300': '#2b2f31',
      '400': '#26292b',
      '500': '#202425',
      '600': '#1a1d1e',
      '700': '#151718',
      '800': '#060707',
      '900': '#000',
    },
    brand: {
      '50': '#E6FFFF',
      '100': '#B8FEFE',
      '200': '#8BFEFE',
      '300': '#5EFDFD',
      '400': '#30FDFD',
      '500': '#03FCFC',
      '600': '#02CACA',
      '700': '#029797',
      '800': '#016565',
      '900': '#013232',
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          coolMode={true}
          theme={darkTheme({
            accentColor: '#02CACA',
            accentColorForeground: 'white',
            borderRadius: 'none',
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
