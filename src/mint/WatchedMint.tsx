import { MintT } from './types'
import { useAccount, useNetwork, useEnsName } from 'wagmi'
import { useWatch, Control } from 'react-hook-form'
import { Text } from '@chakra-ui/react'

export default function WatchedMint({ control }: { control: Control<MintT> }) {
  const watched = useWatch({
    control,
  })
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const smolAddress = address?.slice(0, 5) + '...' + address?.slice(address?.length - 3, address.length)

  return (
    <Text>
      You are minting {watched.name} {watched.type === 'llc' ? 'LLC' : 'UNA'} in{' '}
      {watched.jurisdiction === 'del' ? 'Delaware' : 'Wyoming'}
      {isConnected ? ' to ' + smolAddress : null}
      {chain && ` on ${chain?.name}`}.
    </Text>
  ) // only re-render at the custom hook level, when firstName changes
}
