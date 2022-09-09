import { Chain, Wallet } from '@rainbow-me/rainbowkit';
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi';

export interface MyWalletOptions {
  chains: Chain[]
}

export const gnosis = ({ chains }: MyWalletOptions): Wallet => ({
  id: 'gnosis-pm',
  name: 'Gnosis Safe',
  iconUrl: 'https://my-image.xyz',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android: 'https://my-wallet/android',
    ios: 'https://my-wallet/ios',
    qrCode: 'https://my-wallet/qr',
  },
  
  createConnector: () => {
    const connector = new SafeConnector({ chains })

    return {
      connector,
      // mobile: {
      //   getUri: async () => {
      //     const { uri } = (await connector.getProvider()).connector
      //     return uri
      //   },
      // },
      // qrCode: {
      //   getUri: async () => (await connector.getProvider()).connector.uri,
      //   instructions: {
      //     learnMoreUrl: 'https://my-wallet/learn-more',
      //     steps: [
      //       {
      //         description: 'We recommend putting My Wallet on your home screen for faster access to your wallet.',
      //         step: 'install',
      //         title: 'Open the My Wallet app',
      //       },
      //       {
      //         description: 'After you scan, a connection prompt will appear for you to connect your wallet.',
      //         step: 'scan',
      //         title: 'Tap the scan button',
      //       },
      //     ],
      //   },
      // },
    }
  },
})
