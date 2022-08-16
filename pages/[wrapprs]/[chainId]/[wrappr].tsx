import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Layout from '../../../src/layout'
import { Flex, Button, Spinner, Text, VStack, StackDivider, Heading } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { MintWrappr } from '../../../src/wrap'

const Wrappr: NextPage = ({ wrappr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isLoading, error, data } = useQuery(['wrappr', wrappr?.['baseURI']], () =>
    fetchWrapprData(wrappr?.['baseURI']),
  )

  return (
    <Layout heading="Wrappr" content="Wrap now" back={true}>
      <Flex
        direction="row"
        gap={5}
        marginTop={2}
        marginRight={[2, 4, 6, 8]}
        marginLeft={[2, 4, 6, 8]}
        justify="space-evenly"
      >
        <Flex direction="column" gap={5}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Image src={data['image']} height="300px" width="300px" alt={`Image for ${data['name']}`} />
          )}
          <MintWrappr chainId={4} wrappr={wrappr['id']} />
        </Flex>
        <Flex direction="column" gap={5} minW={'75%'}>
          <Heading size="2xl">{isLoading ? <Spinner /> : data['name']}</Heading>
          <Text fontWeight={400}>{isLoading ? <Spinner /> : data['description']}</Text>
          <Heading size="lg">Traits</Heading>
          <VStack
            gap={3}
            align={'stretch'}
            divider={<StackDivider borderColor={'brand.900'} />}
            paddingY={4}
            boxShadow={
              'rgba(1, 50, 50, 0.4) 0px 2px 4px, rgba(1, 50, 50, 0.3) 0px 7px 13px -3px, rgba(1, 50, 50, 0.2) 0px -3px 0px inset'
            }
          >
            <Trait trait_type={'Admin'} value={wrappr['admin']} />
            <Trait trait_type={'Mint Fee'} value={wrappr['mintFee']} />
            {isLoading ? (
              <Spinner />
            ) : (
              data['attributes'].map((trait: TraitType, index: number) => (
                <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} />
              ))
            )}
          </VStack>
        </Flex>
      </Flex>
    </Layout>
  )
}

type TraitType = {
  trait_type: string
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

const Trait = ({ trait_type, value }: TraitType) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" paddingX={3} paddingY={1}>
      <Text>{trait_type}</Text>
      <Text>{value}</Text>
    </Flex>
  )
}
