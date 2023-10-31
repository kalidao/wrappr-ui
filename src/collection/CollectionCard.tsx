import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { AspectRatio } from '~/components/ui/aspect-ratio'
import Image from 'next/image'
import { convertIpfsToGateway, isIpfsUrl } from '~/utils/convertIpfsHash'
import { Skeleton } from '~/components/ui/skeleton'

type Props = {
  tokenURI: string
  chainId: string
  address: string
  id: string
}

export const CollectionCard = ({ tokenURI, chainId, address, id }: Props) => {
  const { data } = useQuery(['wrappr', tokenURI], () => fetchCollectionData(tokenURI))

  return (
    <Link href={`/${chainId}/${address}/${id}`} passHref className="col-span-1">
      <div className="flex flex-col justify-center items-center gap-2 w-[10rem]">
        <AspectRatio ratio={1 / 1}>
          {data?.['image'] === undefined || data?.['image'] === '' || data?.['image'] === null ? (
            <Skeleton className="w-full h-full animate-pulse" />
          ) : (
            <Image
              src={data?.['image']}
              alt={`Image for ${data?.['name']}`}
              className="rounded-md h-20 w-20 object-cover"
              layout="fill"
            />
          )}
        </AspectRatio>
        <p>{data ? data?.['name'] : ''}</p>
      </div>
    </Link>
  )
}

const fetchCollectionData = async (URI: string) => {
  isIpfsUrl(URI) && (URI = convertIpfsToGateway(URI))
  const res = await fetch(URI)
  return res.json()
}
