import Link from 'next/link'
import Image from 'next/image'
import { Stack, Button, Spinner } from '@kalidao/reality'
import Confetti from '../utils/Confetti'
import { useTransaction, useNetwork, useContractEvent } from 'wagmi'
import { FaWpexplorer } from 'react-icons/fa'
import { TbCandy } from 'react-icons/tb'
import { WRAPPR_FACTORY } from '../constants'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StoreC } from './types'

const fetchWrapprData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

export default function Confirmation({ store }: { store: StoreC }) {
  const { chain } = useNetwork()
  const { data, isError, isLoading } = useTransaction({
    hash: store.hash as `0x${string}`,
  })
  const [event, setEvent] = useState()
  useContractEvent({
    addressOrName: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
    contractInterface: WRAPPR_FACTORY,
    eventName: 'WrapprDeployed',
    listener: (e) => {
      setEvent(e)
    },
  })
  const {
    isLoading: isFetching,
    isError: isFetchingError,
    error,
    data: uri,
    isFetched,
    isSuccess,
  } = useQuery(['wrappr', store.uri], () => fetchWrapprData(store.uri))

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )

  return (
    <>
      <Stack>
        {isFetched && isSuccess && (
          <Image src={uri?.['image']} height="500px" width="500px" alt="Uploaded Image for NFT" />
        )}
        <Stack>
          <Button
            as={'a'}
            prefix={<FaWpexplorer />}
            href={`${chain?.blockExplorers?.default?.url}/tx/${store.hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Explorer
          </Button>
          <Link href={`/${chain?.id}/${event?.[0]}`} passHref>
            <Button as={'a'} prefix={<TbCandy />} tone={'accent'} disabled={!event}>
              View in Gallery
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Confetti />
    </>
  )
}
