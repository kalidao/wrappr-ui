import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Flex, Button, Box } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MdExplore, MdCreate } from 'react-icons/md'
import { FaScroll } from 'react-icons/fa'

export default function Header() {
  const router = useRouter()

  return (
    <Flex padding="0 10px" alignItems="center" justifyContent="space-between" minH="10vh">
      <motion.div
        whileHover={{
          rotate: Math.floor(Math.random() * (360 - 20)) + 20,
          transition: { duration: 0.2 },
        }}
        onClick={() => router.push('/')}
      >
        <Image src={'/logo.png'} height={60} width={80} alt={`Wrappr logo`} />
      </motion.div>
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
        <Button
          as="a"
          href="http://docs.wrappr.wtf/"
          target="_blank"
          maxW="fit-content"
          colorScheme={'brand'}
          variant="outline"
          borderRadius={'none'}
          rightIcon={<FaScroll />}
        >
          Docs
        </Button>
        <ConnectButton label="Login" />
      </Flex>
    </Flex>
  )
}
