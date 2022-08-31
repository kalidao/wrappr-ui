import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../../../src/layout'
import {
  Link as ChakraLink,
  Flex,
  Button,
  Spinner,
  Text,
  VStack,
  StackDivider,
  Heading,
  Skeleton,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { MintWrappr, Trait, TraitType } from '../../../../src/wrap'
import { useAccount, useContractReads } from 'wagmi'
import { useRouter } from 'next/router'
import { WRAPPR } from '../../../../src/constants'
import { FaPenNib } from 'react-icons/fa'

const Wrappr: NextPage = ({ wrappr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const wrapprContract = {
    addressOrName: router.query.wrappr as string,
    contractInterface: WRAPPR,
  }
  const { data: reads, isLoading: isReading } = useContractReads({
    contracts: [
      {
        ...wrapprContract,
        functionName: 'name',
      },
    ],
  })
  const { isLoading, error, data } = useQuery(['wrappr', wrappr?.['baseURI']], () =>
    fetchWrapprData(wrappr?.['baseURI']),
  )
  console.log('baseURI', wrappr?.['baseURI'], reads)

  return (
    <Layout heading="Wrappr" content="Wrap now" back={true}>
      <Flex
        direction="row"
        gap={5}
        marginTop={2}
        marginRight={[2, 4, 6, 8]}
        marginLeft={[2, 4, 6, 8]}
        marginBottom={[2, 4, 6, 8]}
        justify="space-evenly"
      >
        <Flex direction="column" gap={5}>
          <Skeleton isLoaded={!isLoading && data !== undefined}>
            <Image src={data?.['image']} height="300px" width="300px" alt={`Image for ${data?.['name']}`} />
          </Skeleton>
          {isConnected && address?.toLowerCase() === wrappr['admin'].toLowerCase() && (
            <Link href={`${router.asPath}/baseURI`} passHref>
              <Button as={ChakraLink} leftIcon={<FaPenNib />}>
                Update BaseURI
              </Button>
            </Link>
          )}
          {/* <MintWrappr chainId={4} wrappr={wrappr['id']} /> */}
        </Flex>
        <Flex direction="column" gap={5} minW={'75%'}>
          <Skeleton isLoaded={!isReading}>
            <Heading size="2xl">{reads ? reads?.[0].toString() : 'No name found'}</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isReading}>
            <Text fontWeight={400} color="gray.300">
              {data ? data['description'] : 'No description found'}
            </Text>
          </Skeleton>
          <Heading size="lg">Traits</Heading>
          <Skeleton isLoaded={!isLoading}>
            <VStack
              gap={3}
              align={'stretch'}
              divider={<StackDivider borderColor={'brand.900'} />}
              paddingY={4}
              boxShadow={
                'rgba(1, 50, 50, 0.4) 0px 2px 4px, rgba(1, 50, 50, 0.3) 0px 7px 13px -3px, rgba(1, 50, 50, 0.2) 0px -3px 0px inset'
              }
            >
              {data &&
                data?.['attributes']?.map((trait: TraitType, index: number) => (
                  <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                ))}
              <Trait trait_type={'Admin'} value={wrappr['admin']} isBig={false} />
              <Trait trait_type={'Mint Fee'} value={wrappr['mintFee']} isBig={true} />
            </VStack>
          </Skeleton>
        </Flex>
      </Flex>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const wrappr = context?.params?.wrappr as string

  const res = await fetch('https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        wrapprs (where: {
          id: "${wrappr.toLowerCase()}"
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
