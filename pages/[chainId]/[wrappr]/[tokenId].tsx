import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '~/layout'
import { Box, Stack, Spinner, Text, Avatar, Heading } from '@kalidao/reality'
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
  const {} = useContractReads({
    contracts: [
      {
        ...wrapprContract,
        functionName: 'ownerOf',
        args: [tokenId],
      },
    ],
  })
  const collectionId = wrappr?.toString().toLowerCase() + '0x' + Number(tokenId)?.toString(16)
  const { isLoading, data } = useQuery(
    ['wrappr', chainId, collectionId],
    () => fetchWrappr(deployments[Number(chainId)]['subgraph'] as string, collectionId),
    {
      enabled: wrappr !== undefined && tokenId !== undefined,
    },
  )
  const URI = data?.uri ? data.uri : data?.wrappr?.baseURI
  const { data: uri } = useQuery(['wrappr', data?.['wrappr']?.['baseURI']], () => fetchWrapprURI(URI), {
    enabled: data !== undefined,
  })

  // TODO: Add chain not supported if subgraph is undefined for chainId
  if (chainId && deployments[Number(chainId)]['subgraph'] === undefined) {
    return (
      <Layout heading="Wrappr" content="Wrap now" back={() => router.push('/')}>
        <Box display={'flex'} alignItems="center" justifyContent={'center'}>
          <Text>This chain is not yet supported. Please switch to a supported chain.</Text>
        </Box>
      </Layout>
    )
  }

  // TODO: Add Back
  return (
    <Layout heading="Wrappr" content="Wrap now" back={() => router.push(`/${chainId}/${wrappr}`)}>
      <Box padding="6">
        <Stack
          direction={{
            xs: 'vertical',
            md: 'horizontal',
          }}
        >
          <Stack>
            {data ? (
              <Avatar src={uri?.['image']} size="96" shape="square" label={`Image for ${uri?.['name']}`} />
            ) : (
              'No image found'
            )}

            <MintWrappr
              chainId={4}
              wrappr={wrappr ? wrappr.toString() : ethers.constants.AddressZero}
              tokenId={Number(tokenId)}
            />
            <Link href="/clinic" passHref>
              <a>Need help with your entity?</a>
            </Link>
            {(uri?.attributes[1].value == 'LLC' || uri?.attributes[1].value == 'UNA') && (
              <Link href={`/${chainId}/${wrappr}/${tokenId}/ein`} passHref>
                <a>Apply for EIN</a>
              </Link>
            )}
          </Stack>
          <Box width="full">
            <Stack>
              <Heading>{isLoading ? <Spinner /> : uri ? uri?.['name'] : 'No name found'}</Heading>
              <Text as="p">{isLoading ? <Spinner /> : uri ? uri?.['description'] : 'No description found'}</Text>
              <Heading>Traits</Heading>
              <Stack>
                {uri
                  ? uri?.['attributes']?.map((trait: TraitType, index: number) => (
                      <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                    ))
                  : null}
              </Stack>
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
            </Stack>
          </Box>
        </Stack>
      </Box>
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
