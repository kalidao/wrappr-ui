import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Flex, Button, Box, useColorModeValue } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MdExplore, MdCreate } from 'react-icons/md'
import { FaScroll } from 'react-icons/fa'
import Link from 'next/link'
import ToggleMode from './ToggleMode'

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
      <nav className="flex gap-3">
        <Item label="make" src="/create" icon={<MdCreate />} />
        <Item label="find" src="/explore" icon={<MdExplore />} />
        <Item label="docs" src="https://www.wrappr.wtf/get-started/what/" icon={<FaScroll />} />
        <ToggleMode />
        <ConnectButton label="login" />
      </nav>
    </Flex>
  )
}

type ItemProps = {
  label: string
  src: string
  icon: React.ReactNode
}

const Item = ({ src, icon, label }: ItemProps) => {
  const bg = useColorModeValue('brand.50', 'brand.900')
  return (
    <Link href={src} target="_blank" passHref>
      <Box
        className="flex justify-center items-center gap-1 px-2 rounded-lg"
        _hover={{
          background: bg,
        }}
      >
        {icon}
        <p className="hidden md:block text-size">{label}</p>
      </Box>
    </Link>
  )
}
