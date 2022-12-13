import { StoreT } from '../types'
import Link from 'next/link'
import { useNetwork } from 'wagmi'
import { Button, Box, Stack, Text, Spinner } from '@kalidao/reality'
import { FaWpexplorer, FaScroll } from 'react-icons/fa'
import { TbCandy } from 'react-icons/tb'
import Confetti from '~/utils/Confetti'
import MintedImage from './MintedImage'
import { deployments } from '~/constants'

type MintedProps = {
  store: StoreT
}

export default function Minted({ store }: MintedProps) {
  const { chain } = useNetwork()

  return (
    <Box display="flex" alignItems="center" justifyContent={'center'} padding="6">
      <Box width="1/2" display="flex" flexDirection={'column'} alignItems="center" justifyContent={'center'} gap="10">
        <MintedImage entity={store.juris + store.entity} tokenId={store.tokenId} />
        <Stack direction={'horizontal'} align="center" justify={'center'}>
          <Button
            as="a"
            prefix={<FaWpexplorer />}
            href={`${chain?.blockExplorers?.default?.url}/tx/${store.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            tone="foreground"
            size="medium"
          >
            Explorer
          </Button>
          <Button
            tone="foreground"
            as={'a'}
            prefix={<FaScroll />}
            href={`${store.agreement}`}
            target="_blank"
            rel="noopener noreferrer"
            size="medium"
          >
            Agreement
          </Button>
          <Link
            href={`/${chain?.id}/${deployments[chain ? chain.id : 1][store.juris + store.entity]}/${store.tokenId}`}
            passHref
          >
            <Button tone="foreground" as={'a'} prefix={<TbCandy />} size="medium">
              Gallery
            </Button>
          </Link>
        </Stack>
        <Link href={`/clinic`} passHref>
          <a>
            <Text>Need help with your new entity?</Text>
          </a>
        </Link>
      </Box>
      <Confetti />
    </Box>
  )
}
