import { StoreT } from '../types'
import Link from 'next/link'
import { useNetwork } from 'wagmi'
import { Button, Stack, Spinner } from '@kalidao/reality'
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
    <>
      <Stack>
        <MintedImage entity={store.juris + store.entity} tokenId={store.tokenId} />
        <Stack direction={'horizontal'} align="center" justify={'center'}>
          <Button
            as="a"
            prefix={<FaWpexplorer />}
            href={`${chain?.blockExplorers?.default?.url}/tx/${store.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorer
          </Button>
          <Button as={'a'} prefix={<FaScroll />} href={`${store.agreement}`} target="_blank" rel="noopener noreferrer">
            Agreement
          </Button>
          <Link
            href={`/${chain?.id}/${deployments[chain ? chain.id : 1][store.juris + store.entity]}/${store.tokenId}`}
            passHref
          >
            <Button as={'a'} prefix={<TbCandy />}>
              Gallery
            </Button>
          </Link>
        </Stack>
        <Link href={`/clinic`} passHref>
          <a>Need help with your new entity?</a>
        </Link>
      </Stack>
      <Confetti />
    </>
  )
}
