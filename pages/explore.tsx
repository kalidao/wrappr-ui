import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../src/layout'
import { useRouter } from 'next/router'
import { chain, useNetwork } from 'wagmi'
import { Box, Heading, SimpleGrid, useColorModeValue } from '@chakra-ui/react'

const Explore: NextPage = () => {
  const router = useRouter()
  const { chains } = useNetwork()
  // FIXME: wagmi chains object only populates when user is connected
  const supportedChains = []
  const color = useColorModeValue('brand.100', 'brand.900')
  const border = useColorModeValue('brand.200', 'brand.800')

  return (
    <Layout heading="Explore" content="Explore the universe of Wrapprs" back={() => router.push('/')}>
      <SimpleGrid columns={[1, 2, 3]} spacing={10} px={[4, 6]} py={2}>
        {chains.map((chain) => (
          <Link href={`/${chain.id}/explore`} passHref key={chain.id}>
            <Box
              padding="2"
              as="a"
              border="1px"
              borderColor={color}
              borderRadius={'lg'}
              _hover={{
                borderColor: border,
                background: color,
              }}
            >
              <Heading>{chain.name}</Heading>
              <Box>{chain.nativeCurrency?.symbol}</Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Layout>
  )
}

export default Explore
