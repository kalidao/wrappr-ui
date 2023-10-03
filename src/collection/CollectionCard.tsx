import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { AspectRatio } from '~/components/ui/aspect-ratio'

type Props = {
  tokenURI: string
  chainId: string
  address: string
  id: string
}

const CollectionCard = ({ tokenURI, chainId, address, id }: Props) => {
  const { isLoading, data } = useQuery(['wrappr', tokenURI], () => fetchCollectionData(tokenURI))

  return (
    <Link href={`/${chainId}/${address}/${id}`} passHref>
      <div className="flex flex-col justify-center items-center gap-2">
        <AspectRatio ratio={1 / 1}>
          <img
            src={data?.['image']}
            alt={`Image for ${data?.['name']}`}
            className="rounded-md h-20 w-20 object-cover"
          />
        </AspectRatio>
        <p>{data ? data?.['name'] : 'Fetching...'}</p>
      </div>
    </Link>
  )
}

const fetchCollectionData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

export default CollectionCard
