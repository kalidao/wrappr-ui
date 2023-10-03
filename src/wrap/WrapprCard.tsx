import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '~/components/ui/spinner'
import { WrapprImage } from '~/components/wrappr-image'

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
    <Link href={`/${chainId}/${id}`} passHref>
      <div className="hover:scale-105 transition-all duration-200 ease-in-out flex flex-col items-center justify-center space-y-2">
        {isLoading ? <Spinner /> : <WrapprImage src={data?.['image']} />}
        <p className="text-sm text-secondary-foreground">{name}</p>
      </div>
    </Link>
  )
}
