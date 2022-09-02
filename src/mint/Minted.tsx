import { StoreT } from './types'
import Link from 'next/link'
import { useNetwork, useTransaction } from 'wagmi'
import { Link as ChakraLink, Button, VStack, HStack, Spinner } from '@chakra-ui/react'
import { FaWpexplorer } from 'react-icons/fa'
import { TbCandy } from 'react-icons/tb'
import Confetti from '../utils/Confetti'
import MintedImage from './MintedImage'
import { deployments } from '../constants'
import Progress from '@design/Progress'

type MintedProps = {
  store: StoreT
}

export default function Minted({ store }: MintedProps) {
  const { chain } = useNetwork()
  const { data, isError, isLoading } = useTransaction({
    hash: store.data,
  })

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )
  if (isError) return <div>Error fetching tx!</div>

  return (
    <>
      <VStack spacing="5" align="stretch">
        <MintedImage entity={store.minting} tokenId={store.tokenId} />
        <Progress
          label="Confirmations"
          value={data ? (data.confirmations <= 12 ? data.confirmations : 12) : 0}
          max={12}
        />
        <HStack>
          <Button
            as={ChakraLink}
            leftIcon={<FaWpexplorer />}
            href={`${chain?.blockExplorers?.default?.url}/tx/${store.data}`}
            isExternal
          >
            View on Explorer
          </Button>
          <Link
            href={`/wrapprs/${chain?.id}/${deployments[chain ? chain.id : 1][store.minting]}/${store.tokenId}`}
            passHref
          >
            <Button as={ChakraLink} leftIcon={<TbCandy />} colorScheme={'brand'}>
              View in Gallery
            </Button>
          </Link>
        </HStack>
      </VStack>
      <Confetti />
    </>
  )
}
