import { Chain, Wallet } from '@rainbow-me/rainbowkit'
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'

export interface MyWalletOptions {
  chains: Chain[]
}
const GnosisConnector = ({ chains }: MyWalletOptions): Wallet => ({
  id: 'gnosis-safe',
  name: 'Gnosis Safe',
  iconUrl: '/connectors/SafeConnector.jpg',
  iconBackground: '#13ff7f',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=io.gnosis.safe',
    ios: 'https://apps.apple.com/app/id1515759131',
  },
  createConnector: () => {
    const connector = new SafeConnector({ chains })
    return {
      connector,
    }
  },
})
export default GnosisConnector
