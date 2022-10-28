import { StoreT } from '../types'
import Link from 'next/link'
import { useNetwork } from 'wagmi'
import { Link as ChakraLink, Button, VStack, HStack, Spinner } from '@chakra-ui/react'
import { FaWpexplorer, FaScroll } from 'react-icons/fa'
import { TbCandy } from 'react-icons/tb'
import Confetti from '~/utils/Confetti'
import MintedImage from './MintedImage'
import { deployments } from '~/constants'

type MintedProps = {
  store: StoreT
}

export default function Minted({ store }: MintedProps) {
  const { chain } = useNetwork()

  return (
    <>
      <VStack spacing="5" align="center" justify="center">
        <MintedImage entity={store.juris + store.entity} tokenId={store.tokenId} />
        <HStack>
          <Button
            as={ChakraLink}
            leftIcon={<FaWpexplorer />}
            href={`${chain?.blockExplorers?.default?.url}/tx/${store.txHash}`}
            isExternal
          >
            Explorer
          </Button>
          <Button as={ChakraLink} leftIcon={<FaScroll />} href={`${store.agreement}`} isExternal>
            Agreement
          </Button>
          <Link
            href={`/${chain?.id}/${deployments[chain ? chain.id : 1][store.juris + store.entity]}/${store.tokenId}`}
            passHref
          >
            <Button as={ChakraLink} leftIcon={<TbCandy />} colorScheme={'brand'}>
              Gallery
            </Button>
          </Link>
        </HStack>
        <Link href={`/clinic`} passHref>
          <ChakraLink>Need help with your new entity?</ChakraLink>
        </Link>
      </VStack>
      <Confetti />
    </>
  )
}
