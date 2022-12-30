import Link from 'next/link'
import { Stack, Button, Avatar } from '@kalidao/reality'
import Confetti from '../utils/Confetti'
import { useNetwork } from 'wagmi'
import { FaWpexplorer } from 'react-icons/fa'
import { TbCandy } from 'react-icons/tb'
import { useQuery } from '@tanstack/react-query'
import { StoreC } from './types'

const fetchWrapprData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

export default function Confirmation({ store }: { store: StoreC }) {
  const { chain } = useNetwork()
  const { data: uri, isFetched, isSuccess } = useQuery(['wrappr', store.uri], () => fetchWrapprData(store.uri))

  return (
    <>
      <Stack direction={'vertical'} align="center" justify={'center'}>
        {isFetched && isSuccess && (
          <Avatar src={uri?.['image']} size="96" label="Uploaded Image for NFT" shape="square" />
        )}
        <Stack direction={'horizontal'} align="center" justify={'center'}>
          <Button
            as={'a'}
            prefix={<FaWpexplorer />}
            href={chain?.blockExplorers?.default.url + '/tx/' + store.hash}
            target="_blank"
            rel="noopener noreferrer"
            tone="foreground"
          >
            View on Explorer
          </Button>
          <Link href={`/${store.chainId}/${store.address}`} passHref>
            <Button as={'a'} prefix={<TbCandy />} tone="foreground">
              View in Gallery
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Confetti />
    </>
  )
}
