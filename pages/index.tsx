import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Layout from '../src/layout'
import { Button, SimpleGrid, Flex } from '@chakra-ui/react'
import { WrapprCard } from '../src/wrap'

const Home: NextPage = ({ wrapprs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  console.log('wrapprs', wrapprs)

  return (
    <Layout heading="Home" content="Wrap anything" back={false}>
      <Flex direction="column" gap={5} marginRight={[2, 4, 6, 8]} marginLeft={[2, 4, 6, 8]} alignItems={"flex-end"}>
        <Button onClick={() => router.push('/create')} maxW="fit-content">
          Create
        </Button>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
          {wrapprs.map((wrappr) => (
            <WrapprCard key={wrappr['id']} wrappr={wrappr} />
          ))}
        </SimpleGrid>
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        wrapprs {
          id
          name
          symbol
          baseURI
          mintFee
          admin
        }
      }`,
    }),
  })

  const data = await res.json()

  return {
    props: { wrapprs: data?.['data']?.['wrapprs'] },
  }
}

export default Home
