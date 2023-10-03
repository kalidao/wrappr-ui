import type { AppProps } from 'next/app'
import RootProvider from '~/providers'

// stylesheets //
import '@kalidao/reality/styles'
import '@design/app.css'
import '@rainbow-me/rainbowkit/styles.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </RootProvider>
  )
}

export default MyApp
