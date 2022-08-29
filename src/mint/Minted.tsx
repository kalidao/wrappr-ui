import { StoreT } from './types'
import { useNetwork, useTransaction } from 'wagmi'
import { Flex, Text, Link } from '@chakra-ui/react'
import { FaWpexplorer } from 'react-icons/fa'
import Confetti from './Confetti'

type MintedProps = {
  store: StoreT
}

export default function Minted({ store }: MintedProps) {
  const { chain } = useNetwork()
  const { data, isError, isLoading } = useTransaction({
    hash: store.data,
  })

  console.log('data', data)

  if (isLoading) return <div>Fetching tx!</div>
  if (isError) return <div>Error fetching tx!</div>

  return (
    <>
      <Flex flexDirection={'column'}>
        <Link href={`${chain?.blockExplorers?.default?.url}/tx/${store.data}`} isExternal>
          <Flex>
            <FaWpexplorer /> View on Explorer
          </Flex>
        </Link>
        <Text>Confirmations: {data?.confirmations}</Text>
      </Flex>
      <Confetti />
    </>
  )
}
