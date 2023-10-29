import Link from 'next/link'
import Confetti from '../utils/Confetti'
import { useNetwork } from 'wagmi'
import { FaWpexplorer } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { StoreC } from './types'
import { buttonVariants } from '~/components/ui/button'

const fetchWrapprData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

export default function Confirmation({ store }: { store: StoreC }) {
  const { chain } = useNetwork()
  const {
    isLoading: isFetching,
    isError: isFetchingError,
    error,
    data: uri,
    isFetched,
    isSuccess,
  } = useQuery(['wrappr', store.uri], () => fetchWrapprData(store.uri))

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {isFetched && isSuccess && (
          <img src={uri?.['image']} className="w-96 h-96 rounded-md" alt="Uploaded Image for NFT" />
        )}
        <div className="flex items-center justify-center">
          <a
            href={chain?.blockExplorers?.default.url + '/tx/' + store.hash}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'default' })}
          >
            <FaWpexplorer />
            View on Explorer
          </a>
          <Link className={buttonVariants({ variant: 'default' })} href={`/${store.chainId}/${store.address}`} passHref>
            View in Gallery
          </Link>
        </div>
      </div>
      <Confetti />
    </>
  )
}
