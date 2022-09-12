import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../../../src/layout'
import {
  Flex,
  Button,
  Link as ChakraLink,
  Spinner,
  Text,
  VStack,
  StackDivider,
  Heading,
  Skeleton,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { MintWrappr, Trait, TraitType } from '../../../../src/wrap'
import { useContractReads } from 'wagmi'
import { useRouter } from 'next/router'
import { WRAPPR } from '../../../../src/constants'

const Wrappr: NextPage = ({ wrappr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { isLoading, error, data } = useQuery(['wrappr', wrappr?.['baseURI']], () =>
    fetchWrapprData(wrappr?.['baseURI']),
  )
  const { wrappr: wrapprAddress, tokenId } = router.query
  const wrapprContract = {
    addressOrName: router.query.wrappr as string,
    contractInterface: WRAPPR,
  }
  const { data: reads, isLoading: isReading } = useContractReads({
    contracts: [
      {
        ...wrapprContract,
        functionName: 'ownerOf',
        args: [tokenId],
      },
    ],
  })

  console.log('reads', reads)

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
          <Skeleton isLoaded={!isLoading}>
            {data ? (
              <Image
                src={data['image']}
                height="300px"
                width="300px"
                alt={`Image for ${data['name']}`}
                className="rounded-lg shadow-gray-900 shadow-md"
              />
            ) : (
              'No image found'
            )}
          </Skeleton>
          <MintWrappr chainId={4} wrappr={wrappr['id']} tokenId={tokenId as unknown as number} />
          <Link href="/clinic" passHref>
            <ChakraLink>Need help with your entity?</ChakraLink>
          </Link>
        </Flex>
        <Flex direction="column" gap={5} minW={'75%'}>
          <h1 className="text-gray-100 font-semibold text-xl">
            {isLoading ? <Spinner /> : data ? data['name'] : 'No name found'}
          </h1>
          <p className="whitespace-pre-line break-normal text-gray-400">
            {isLoading ? <Spinner /> : data ? data['description'] : 'No description found'}
          </p>
          <h2 className="text-gray-100 font-semibold text-xl">Traits</h2>
          <Skeleton isLoaded={!isLoading && !isReading}>
            <VStack
              gap={3}
              align={'stretch'}
              divider={<StackDivider borderColor={'brand.900'} />}
              className="rounded-lg shadow-brand-900 shadow-md py-3"
            >
              {data &&
                data['attributes'].map((trait: TraitType, index: number) => (
                  <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                ))}
              <Trait trait_type={'Owner'} value={reads ? (reads?.[0] as unknown as string) : ''} isBig={false} />
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
