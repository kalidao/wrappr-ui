import { Skeleton, Flex, Text, Button, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

const fetchWrapprData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

type WrapprCardProps = {
  name: string
  id: string
  baseURI: string
  chainId: string
}

export default function WrapprCard({ name, id, baseURI, chainId }: WrapprCardProps) {
  const { isLoading, error, data } = useQuery(['wrappr', baseURI], () => fetchWrapprData(baseURI))

  return (
    <Skeleton isLoaded={!isLoading} className="rounded-lg">
      <div className="rounded-lg gap-10 flex-col">
        <Link href={`/${chainId}/${id}`} passHref>
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
        <p className={'text-gray-500 px-2 py-1'}>{name}</p>
      </div>
    </Skeleton>
  )
}
