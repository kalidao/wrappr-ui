import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Layout from '../src/layout'
import { SimpleGrid, Flex } from '@chakra-ui/react'
import { WrapprCard } from '../src/wrap'
import { Wrappr } from '../src/types/wrappr.types'

const Explore: NextPage = ({ wrapprs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout heading="Explore" content="Explore wrapprs. Wrap anything." back={true}>
      <Flex direction="column" gap={5} marginRight={[2, 4, 6, 8]} marginLeft={[2, 4, 6, 8]} alignItems={'flex-end'}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
          {wrapprs.map((wrappr: Wrappr) => (
            <WrapprCard
              key={wrappr['id']}
              name={wrappr.name}
              id={wrappr.id}
              baseURI={wrappr.baseURI}
              mintFee={wrappr.mintFee}
            />
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
          baseURI
          mintFee
        }
      }`,
    }),
  })

  const data = await res.json()

  return {
    props: { wrapprs: data?.['data']?.['wrapprs'] },
  }
}

export default Explore
