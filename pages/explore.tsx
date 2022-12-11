import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../src/layout'
import { useRouter } from 'next/router'
import { useNetwork } from 'wagmi'
import { Stack, Button, Card, Box, Heading, IconArrowRight } from '@kalidao/reality'

const Explore: NextPage = () => {
  const router = useRouter()
  const { chains } = useNetwork()

  return (
    <Layout heading="Explore" content="Explore the universe of Wrapprs" back={() => router.push('/')}>
      <Stack direction={'horizontal'} wrap>
        {chains.map((chain) => (
          <Card key={chain.id} width="128" padding="6" as="a" borderRadius="2xLarge" hover>
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Stack>
                <Heading>{chain.name}</Heading>
                <Box color="foreground">{chain.nativeCurrency?.symbol}</Box>
              </Stack>
              <Link href={`/${chain.id}/explore`} passHref>
                <Button as="a" variant="secondary">
                  <IconArrowRight />
                </Button>
              </Link>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Layout>
  )
}

export default Explore
