import { MintT } from './types'
import { useAccount, useNetwork, useEnsName } from 'wagmi'
import { useWatch, Control } from 'react-hook-form'
import { Text } from '@chakra-ui/react'

export default function WatchedMint({ control }: { control: Control<MintT> }) {
  const watched = useWatch({
    control,
  })

  return (
    <Text>
      You are minting an NFT representing {watched.name} {watched.type === 'llc' ? 'LLC' : 'UNA'} in{' '}
      {watched.jurisdiction === 'del' ? 'Delaware' : 'Wyoming'}
    </Text>
  )
}
