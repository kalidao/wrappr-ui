import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Layout from '~/layout'
import { Box, Stack, Text, Spinner, Skeleton, Avatar, Heading } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { Trait, TraitType } from '~/wrap'
import { useContractReads } from 'wagmi'
import { useRouter } from 'next/router'
import { deployments, WRAPPR } from '~/constants'
import MintWrapprNFT from '~/wrap/MintWrapprNFT'
import { ethers } from 'ethers'
import { compileQtestnetWrapprs } from '~/utils/compileQtestnetWrapprs'

const Wrappr: NextPage = ({ wrappr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { chainId, wrappr: contractAddress } = router.query
  const wrapprContract = {
    addressOrName: contractAddress as string,
    contractInterface: WRAPPR,
    chainId: Number(chainId),
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
  console.log(data, wrappr)
  if (Number(chainId) == 35543) {
    return (
      <Layout heading="Wrappr" content="Wrap now" back={() => router.push(`/${chainId}/explore`)}>
        <Box padding="6">
          <Stack direction={'horizontal'} align="flex-start" justify={'space-between'}>
            <Stack>
              {isLoading ? (
                <Spinner />
              ) : (
                <Avatar src={data?.['image']} size="96" label={`Image for ${data?.['name']}`} shape="square" />
              )}
              <MintWrapprNFT
                chainId={Number(chainId)}
                wrappr={contractAddress ? (contractAddress as string) : ethers.constants.AddressZero}
                mintFee={wrappr['mintFee']}
              />
            </Stack>
            <Box width="full">
              <Stack>
                <Heading>{reads ? reads?.[0] : 'No name found'}</Heading>
                {/* className="whitespace-pre-line break-normal text-gray-400" */}
                <Text wordBreak="break-word">{data ? data['description'] : 'No description found'}</Text>
                <Heading>Traits</Heading>
                <Stack>
                  {data &&
                    data?.['attributes']?.map((trait: TraitType, index: number) => (
                      <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                    ))}
                  {wrappr ? <Trait trait_type={'Admin'} value={wrappr?.['admin']} isBig={false} /> : <Spinner />}
                  {/* {wrappr ? <Trait trait_type={'Mint Fee'} value={wrappr?.['mintFee']} isBig={true} /> : <Spinner />} */}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Layout>
    )
  }

  // TODO: Add mint fee
  return (
    <Layout heading="Wrappr" content="Wrap now" back={() => router.push(`/${chainId}/explore`)}>
      <Box padding="6">
        <Stack direction={'horizontal'} align="flex-start" justify={'space-between'}>
          <Stack>
            {isLoading ? (
              <Spinner />
            ) : (
              <Avatar src={data?.['image']} size="96" label={`Image for ${data?.['name']}`} shape="square" />
            )}
            <MintWrapprNFT
              chainId={Number(chainId)}
              wrappr={contractAddress ? (contractAddress as string) : ethers.constants.AddressZero}
              mintFee={wrappr['mintFee']}
            />
          </Stack>
          <Box width="full">
            <Stack>
              <Heading>{reads ? reads?.[0] : 'No name found'}</Heading>
              {/* className="whitespace-pre-line break-normal text-gray-400" */}
              <Text wordBreak="break-word">{data ? data['description'] : 'No description found'}</Text>
              <Heading>Traits</Heading>
              <Stack>
                {data &&
                  data?.['attributes']?.map((trait: TraitType, index: number) => (
                    <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                  ))}
                {wrappr ? <Trait trait_type={'Admin'} value={wrappr?.['admin']} isBig={false} /> : <Spinner />}
                {wrappr ? <Trait trait_type={'Mint Fee'} value={wrappr?.['mintFee']} isBig={true} /> : <Spinner />}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const wrappr = context?.params?.wrappr as string
  const chainId = Number(context?.params?.chainId as string)

  console.log(wrappr)
  if (!chainId)
    return {
      notFound: true,
    }

  const { wrapprsLong } = compileQtestnetWrapprs(chainId)
  if (chainId == 35443) {
    for (let i = 0; i < wrapprsLong.length; i++) {
      if (wrapprsLong[i].id == wrappr) {
        return {
          props: { wrappr: wrapprsLong[i] },
        }
      }
    }
  }

  const res = await fetch(deployments[chainId]['subgraph'] as string, {
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
