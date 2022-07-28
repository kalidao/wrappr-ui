import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Layout from '../../../src/layout'
import { Flex, Button, Spinner, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { MintWrappr } from '../../../src/wrap'

const Wrappr: NextPage = ({ wrappr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isLoading, error, data } = useQuery(['wrappr', wrappr?.['baseURI']], () =>
    fetchWrapprData(wrappr?.['baseURI']),
  )
  console.log('wrappr', wrappr, data)
  return (
    <Layout heading="Wrappr" content="Wrap now" back={true}>
      <Flex direction="row" gap={5} marginTop={2} marginRight={[2, 4, 6, 8]} marginLeft={[2, 4, 6, 8]}>
        <Flex direction="column" gap={5}>
          {isLoading ? <Spinner /> : <Image src={data['image']} height="300px" width="300px" />}
          <MintWrappr chainId={4} wrappr={wrappr['id']} />
        </Flex>
        <Flex direction="column" gap={5}>
          <Text as="h1" fontWeight={600}>
            {isLoading ? <Spinner /> : data['name']}
          </Text>
          {isLoading ? <Spinner /> : data['description']}
          <Flex direction="column" gap={3}>
            <Trait trait_type={'Admin'} value={wrappr['admin']} />
            <Trait trait_type={'Mint Fee'} value={wrappr['mintFee']} />
            <Text as="h2" fontWeight={500}>
              Traits
            </Text>
            {isLoading ? (
              <Spinner />
            ) : (
              data['attributes'].map((trait: TraitType, index: number) => <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} />)
            )}
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}

type TraitType = {
  trait_type: string,
  value: string | number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        wrapprs (where: {
          id: "${context?.params?.wrappr}"
        }) {
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
    props: { wrappr: data['data']['wrapprs'][0] },
  }
}

const fetchWrapprData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

export default Wrappr

const Trait = ({trait_type, value}: TraitType) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{trait_type}</Text>
      <Text>{value}</Text>
    </Flex>
  )
}
