import { Skeleton } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

type Props = {
  tokenURI: string
  chainId: string
  address: string
  id: string
}

const CollectionCard = ({ tokenURI, chainId, address, id }: Props) => {
  const { isLoading, data } = useQuery(['wrappr', tokenURI], () => fetchCollectionData(tokenURI))

  return (
    <Skeleton isLoaded={!isLoading} className="rounded-lg">
      <div className="rounded-lg gap-10 flex-col">
        <Link href={`/${chainId}/${address}/${id}`} passHref>
          <div
            className={
              'hover:scale-105 m-1 transition duration-500 ease-in-out shadow-gray-900 shadow-md rounded-md hover:shadow-none'
            }
          >
            {data ? (
              <Image
                src={data['image']}
                height="200px"
                width="200px"
                layout="responsive"
                alt={`Image for ${data['name']}`}
                className={'rounded-lg overflow-hidden'}
              />
            ) : (
              'No image found'
            )}
          </div>
        </Link>
        <p className={'text-gray-500 px-2 py-1'}>{data?.name}</p>
      </div>
    </Skeleton>
  )
}

const fetchCollectionData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

export default CollectionCard
