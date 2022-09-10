import Image from 'next/image'
import { useContractRead, useNetwork } from 'wagmi'
import { WRAPPR, deployments } from '../constants'
import { useQuery } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { Skeleton } from '@chakra-ui/react'

const fetchWrapprData = async (URI: string | undefined) => {
  if (URI) {
    const res = await fetch(URI)
    return res.json()
  }
}

export default function MintedImage({ entity, tokenId }: { entity: string; tokenId: number }) {
  const { chain } = useNetwork()
  const {
    data: uri,
    isLoading: isLoadingURI,
    isSuccess,
    error,
  } = useContractRead({
    addressOrName: chain ? deployments[chain.id][entity] : ethers.constants.AddressZero,
    contractInterface: WRAPPR,
    functionName: 'uri',
    args: [tokenId],
  })
  const { isLoading, error: reactError, data } = useQuery(['wrappr', uri], () => fetchWrapprData(String(uri)))

  if (isLoadingURI && isLoading) return <>Fetching</>

  return (
    <Skeleton isLoaded={!isLoadingURI && !isLoading}>
      <div className="flex items-center justify-center rounded-md">
        <Image
          height="300px"
          width="300px"
          src={data?.image}
          alt="Minted NFT image"
          className={'shadow-gray-900/40 shadow-sm rounded-lg overflow-hidden '}
        />
      </div>
    </Skeleton>
  )
}
