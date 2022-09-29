import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '~/layout'
import {
  Flex,
  Link as ChakraLink,
  Spinner,
  Text,
  VStack,
  StackDivider,
  Skeleton,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { MintWrappr, Trait, TraitType } from '~/wrap'
import { useContractReads } from 'wagmi'
import { useRouter } from 'next/router'
import { deployments, WRAPPR } from '~/constants'
import { ethers } from 'ethers'

const Wrappr: NextPage = () => {
  const router = useRouter()
  const { wrappr, chainId, tokenId } = router.query
  const wrapprContract = {
    addressOrName: wrappr ? wrappr.toString() : ethers.constants.AddressZero,
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
  const collectionId = wrappr?.toString().toLowerCase() + '0x' + Number(tokenId)?.toString(16)
  const { isLoading, error, data } = useQuery(
    ['wrappr', chainId, collectionId],
    () => fetchWrappr(deployments[Number(chainId)]['subgraph'], collectionId),
    {
      enabled: wrappr !== undefined && tokenId !== undefined,
    },
  )
  const URI = data?.uri ? data.uri : data?.wrappr?.baseURI
  const {
    isLoading: isLoadingURI,
    error: uriError,
    data: uri,
  } = useQuery(['wrappr', data?.['wrappr']?.['baseURI']], () => fetchWrapprURI(URI), {
    enabled: data !== undefined,
  })

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
                src={uri?.['image']}
                height="300px"
                width="300px"
                alt={`Image for ${uri?.['name']}`}
                className="rounded-lg shadow-gray-900 shadow-md"
              />
            ) : (
              'No image found'
            )}
          </Skeleton>
          <MintWrappr
            chainId={4}
            wrappr={wrappr ? wrappr.toString() : ethers.constants.AddressZero}
            tokenId={Number(tokenId)}
          />
          <Link href="/clinic" passHref>
            <ChakraLink>Need help with your entity?</ChakraLink>
          </Link>
        </Flex>
        <Flex direction="column" gap={5} minW={'75%'}>
          <Skeleton isLoaded={!isLoading}>
            <Text as="h1" colorScheme="gray" fontWeight="extrabold" fontSize="x-large">
              {isLoading ? <Spinner /> : uri ? uri?.['name'] : 'No name found'}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoadingURI}>
            <Text as="p" colorScheme="gray">
              {isLoading ? <Spinner /> : uri ? uri?.['description'] : 'No description found'}
            </Text>
          </Skeleton>
          <Text as="p" colorScheme="gray">
            Traits
          </Text>
          <Skeleton isLoaded={!isLoadingURI}>
            <VStack
              gap={3}
              align={'stretch'}
              divider={<StackDivider borderColor={'brand.900'} />}
              className="rounded-lg shadow-brand-900 shadow-md py-3"
            >
              {uri
                ? uri?.['attributes']?.map((trait: TraitType, index: number) => (
                  <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                ))
                : null}
            </VStack>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <VStack
              gap={3}
              align={'stretch'}
              divider={<StackDivider borderColor={'brand.900'} />}
              className="rounded-lg shadow-brand-900 shadow-md py-3"
            >
              <Trait
                trait_type={'Permissioned'}
                value={data?.['permissioned'] === null ? 'No' : data?.permissioned === true ? 'Yes' : 'No'}
                isBig={false}
              />
              <Trait
                trait_type={'Transferable'}
                value={data?.['transferability'] === null ? 'No' : data?.transferability === true ? 'Yes' : 'No'}
                isBig={false}
              />
              <Trait trait_type={'Owner'} value={data?.['owner']} isBig={false} />
            </VStack>
          </Skeleton>
        </Flex>
      </Flex>
    </Layout>
  )
}
const fetchWrapprURI = async (URI: string) => {
  const res = await fetch(URI)
  const json = await res.json()
  return json
}

const fetchWrappr = async (URI: string, collectionId: string) => {
  const res = await fetch(URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        collections(where: {
          id: "${collectionId}"
        }) {
          owner
          uri
          transferability
          permissioned
          wrappr {
            id
            name
            baseURI
          }
          users {
            amount
          }
        }
      }`,
    }),
  })

  const data = await res.json()
  return data['data']['collections'][0]
}

export default Wrappr
