import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Flex, Button, Box } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MdExplore, MdCreate } from 'react-icons/md'
import { FaScroll } from 'react-icons/fa'
import Link from 'next/link'

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
        <Link href="/explore" passHref>
          <div className="flex justify-center items-center gap-1 px-2 rounded-lg hover:ring-1 hover:ring-brand-400 hover:bg-brand-900 focus:bg-brand-800">
            <span>
              <MdExplore className="fill-brand-50" />
            </span>
            <p className="hidden md:block">explore</p>
          </div>
        </Link>
        <Link href="/create" passHref>
          <div className="flex justify-center items-center gap-1 px-2 rounded-lg hover:ring-1 hover:ring-brand-400 hover:bg-brand-900 focus:bg-brand-800">
            <span>
              <MdCreate className="fill-brand-50" />
            </span>
            <p className="hidden md:block">create</p>
          </div>
        </Link>
        <Link href="https://www.wrappr.wtf/get-started/what/" target="_blank" passHref>
          <div className="flex justify-center items-center gap-1 px-2 rounded-lg hover:ring-1 hover:ring-brand-400 hover:bg-brand-900 focus:bg-brand-800">
            <span>
              <FaScroll className="fill-brand-50" />
            </span>
            <p className="hidden md:block text-size">docs</p>
          </div>
        </Link>
        <ConnectButton label="Login" />
      </nav>
    </Flex>
  )
}
