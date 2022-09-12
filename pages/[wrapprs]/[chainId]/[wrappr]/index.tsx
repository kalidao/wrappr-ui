import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Layout from '../../../../src/layout'
import { Link as ChakraLink, Flex, VStack, StackDivider, Skeleton } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Trait, TraitType } from '~/wrap'
import { useAccount, useContractReads } from 'wagmi'
import { useRouter } from 'next/router'
import { WRAPPR } from '~/constants'
import MintWrapprNFT from '~/wrap/MintWrapprNFT'
import { ethers } from 'ethers'

const Wrappr: NextPage = ({ wrappr, collections }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { chainId, wrappr: contractAddress } = router.query
  const { isConnected, address } = useAccount()
  const wrapprContract = {
    addressOrName: contractAddress as string,
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

  // TODO: Add mint fee
  return (
    <Layout heading="Wrappr" content="Wrap now" back={true}>
      <Flex
        direction={['column', 'row']}
        gap={5}
        marginTop={2}
        marginRight={[2, 4, 6, 8]}
        marginLeft={[2, 4, 6, 8]}
        marginBottom={[2, 4, 6, 8]}
        justify="space-evenly"
        align={['center', 'start']}
      >
        <Flex direction="column" gap={5}>
          <Skeleton isLoaded={!isLoading && data !== undefined}>
            <Image
              src={data?.['image']}
              height="300px"
              width="300px"
              alt={`Image for ${data?.['name']}`}
              className="rounded-lg shadow-gray-900 shadow-md"
            />
          </Skeleton>
          {/* {isConnected && address?.toLowerCase() === wrappr['admin'].toLowerCase() && (
            <Link href={`${router.asPath}/baseURI`} passHref>
              <Button as={ChakraLink} leftIcon={<FaPenNib />}>
                Update Metadata
              </Button>
            </Link>
          )} */}
          <MintWrapprNFT
            chainId={Number(chainId)}
            wrappr={contractAddress ? (contractAddress as string) : ethers.constants.AddressZero}
            tokenId={collections.length + 1}
            mintFee={wrappr['mintFee']}
          />
        </Flex>
        <Flex direction="column" gap={5} minW={'75%'}>
          <Skeleton isLoaded={!isReading}>
            <h1 className="text-gray-100 font-semibold text-xl">{reads ? reads?.[0].toString() : 'No name found'}</h1>
          </Skeleton>
          <Skeleton isLoaded={!isReading}>
            <p className="whitespace-pre-line break-normal text-gray-400">
              {data ? data['description'] : 'No description found'}
            </p>
          </Skeleton>
          <h2 className="text-gray-100 font-semibold text-xl">Traits</h2>
          <Skeleton isLoaded={!isLoading}>
            <VStack
              gap={3}
              align={'stretch'}
              divider={<StackDivider borderColor={'brand.900'} />}
              className="rounded-lg shadow-brand-900 shadow-md py-3"
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

        collections(where: {
          wrappr: "${wrappr.toLowerCase()}"
        }) {
          id
          wrappr {
            id
            name
          }
          collectionId
          owner
        }
      }`,
    }),
  })

  const data = await res.json()

  return {
    props: { wrappr: data['data']['wrapprs'][0], collections: data['data']['collections'] },
  }
}

const fetchWrapprData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

export default Wrappr
