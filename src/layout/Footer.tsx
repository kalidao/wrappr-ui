import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Flex, Text, Button, Box, useColorModeValue, HStack, Divider } from '@chakra-ui/react'

import { useAccount, useNetwork } from 'wagmi'

export default function Header() {
  const router = useRouter()
  const { chain } = useNetwork()
  const { isConnected, address } = useAccount()

  return (
    <HStack as="footer" padding="10" alignItems="center" justifyContent="space-between" minH="10vh">
      <Text colorScheme="gray">
        Made by <a href="https://twitter.com/kali__gg">Kali</a>
      </Text>
      <HStack justify="center">
        {/* <Text as="a" href="/tos">Terms</Text>
            <Divider colorScheme={"brand"} orientation="vertical" />
            <Text>Privacy Policy</Text> */}
      </HStack>
    </HStack>
  )
}
