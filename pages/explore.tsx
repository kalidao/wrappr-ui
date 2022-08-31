import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Layout from '~/layout'
import { SimpleGrid, Flex } from '@chakra-ui/react'
import { WrapprCard } from '~/wrap'
import { Wrappr } from '~/types/wrappr.types'

const Explore: NextPage = ({ wrapprs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout heading="Explore" content="Explore wrapprs. Wrap anything." back={true}>
      <SimpleGrid columns={[1, 2, 3, 6]} spacing={10} px={[1, 2, 4, 6]} py={2}>
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
