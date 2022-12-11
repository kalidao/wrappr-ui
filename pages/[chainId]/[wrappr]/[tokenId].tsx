import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '~/layout'
import { Stack, Spinner, Text, Divider, Skeleton } from '@kalidao/reality'
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

  // TODO: Add Back
  return (
    <Layout heading="Wrappr" content="Wrap now" back={() => router.push(`/${chainId}/${wrappr}`)}>
      <Stack>
        <Stack>
          <Skeleton loading={!isLoading}>
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
            <a>Need help with your entity?</a>
          </Link>
        </Stack>
        <Stack>
          <Skeleton loading={!isLoading}>
            <Text as="h1" weight={'bold'} size="extraLarge">
              {isLoading ? <Spinner /> : uri ? uri?.['name'] : 'No name found'}
            </Text>
          </Skeleton>
          <Skeleton loading={!isLoadingURI}>
            <Text as="p">{isLoading ? <Spinner /> : uri ? uri?.['description'] : 'No description found'}</Text>
          </Skeleton>
          <Text as="p">Traits</Text>
          <Skeleton loading={!isLoadingURI}>
            <Stack>
              {uri
                ? uri?.['attributes']?.map((trait: TraitType, index: number) => (
                    <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                  ))
                : null}
            </Stack>
          </Skeleton>
          <Skeleton loading={!isLoading}>
            <Stack>
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
            </Stack>
          </Skeleton>
        </Stack>
      </Stack>
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
