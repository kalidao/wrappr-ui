import { useNetwork } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { useTokenUri } from '~/hooks/useTokenUri'
import { getEntityAddress } from '~/constants/deployments'
import { zeroAddress } from 'viem'
import { WrapprImage } from '~/components/wrappr-image'

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
  } = useTokenUri({
    address: chain ? getEntityAddress(chain.id, entity) : zeroAddress,
    chainId: chain?.id ?? 1,
    tokenId: BigInt(tokenId),
  })
  const { isLoading, error: reactError, data } = useQuery(['wrappr', uri], () => fetchWrapprData(String(uri)))

  if (isLoadingURI && isLoading) return <>Fetching</>

  if (data?.image === undefined) return <>No image</>

  return <WrapprImage src={data.image} />
}
