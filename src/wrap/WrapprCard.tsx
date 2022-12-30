import { Spinner } from '@kalidao/reality'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Box, Avatar, Text } from '@kalidao/reality'
import * as styles from './styles.css'

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
  const { isLoading, data } = useQuery(['wrappr', baseURI], () => fetchWrapprData(baseURI))

  return (
    <Link href={`/${chainId}/${id}`} passHref>
      <Box
        className={styles.wrapprCard}
        as="a"
        display="flex"
        flexDirection={'column'}
        justifyContent="center"
        alignItems="center"
        gap="2"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Avatar src={data?.['image']} shape="square" size="52" label={`Image for ${data?.['name']}`} />
        )}
        <Text variant="label">{name}</Text>
      </Box>
    </Link>
  )
}
