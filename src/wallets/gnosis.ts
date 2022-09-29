import { Chain, Wallet } from '@rainbow-me/rainbowkit'
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';
export interface MyWalletOptions {
  chains: Chain[]
}

export const gnosis = ({ chains }: MyWalletOptions): Wallet => ({
  id: 'Gnosis Safe',
  name: 'Gnosis Safe',
  iconUrl: 'https://cryptologos.cc/logos/gnosis-gno-gno-logo.svg?v=023',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=io.gnosis.safe',
    ios: 'https://apps.apple.com/app/id1515759131',
    qrCode: 'https://my-wallet/qr',
  },
  createConnector: () => {
    const connector = new SafeConnector({ chains })
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector
          return uri
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: 'https://my-wallet/learn-more',
          steps: [
            {
              description: 'We recommend putting My Wallet on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the My Wallet app',
            },
            {
              description: 'After you scan, a connection prompt will appear for you to connect your wallet.',
              step: 'scan',
              title: 'Tap the scan button',
            },
          ],
        },
      },
    }
  },
})
