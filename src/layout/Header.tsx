import { useRouter } from 'next/router'
import Image from 'next/image'

import { Flex, Button } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MdExplore, MdCreate } from 'react-icons/md'

export default function Header() {
  const router = useRouter()
  return (
    <Flex padding="0 10px" alignItems="center" justifyContent="space-between" minH="10vh">
      <Image src={'/logo.png'} height={60} width={80} alt={`Wrappr logo`} />
      <Flex gap="15px">
        <Button
          onClick={() => router.push('/explore')}
          maxW="fit-content"
          colorScheme={'brand'}
          variant="outline"
          borderRadius={'none'}
          rightIcon={<MdExplore />}
        >
          Explore
        </Button>
        <Button
          onClick={() => router.push('/create')}
          maxW="fit-content"
          colorScheme={'brand'}
          variant="outline"
          borderRadius={'none'}
          rightIcon={<MdCreate />}
        >
          Create
        </Button>
        <ConnectButton />
      </Flex>
    </Flex>
  )
}
