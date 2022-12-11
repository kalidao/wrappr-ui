import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Layout from '~/layout'
import { Stack, Skeleton } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { Trait, TraitType } from '~/wrap'
import { useContractReads } from 'wagmi'
import { useRouter } from 'next/router'
import { deployments, WRAPPR } from '~/constants'
import MintWrapprNFT from '~/wrap/MintWrapprNFT'
import { ethers } from 'ethers'

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

  // TODO: Add mint fee
  return (
    <Layout heading="Wrappr" content="Wrap now" back={() => router.push(`/${chainId}/explore`)}>
      <Stack>
        <Stack>
          <Skeleton loading={!isLoading && data !== undefined}>
            <Image
              src={data?.['image']}
              height="300px"
              width="300px"
              alt={`Image for ${data?.['name']}`}
              className="rounded-lg shadow-gray-900 shadow-md"
            />
          </Skeleton>
          <MintWrapprNFT
            chainId={Number(chainId)}
            wrappr={contractAddress ? (contractAddress as string) : ethers.constants.AddressZero}
            mintFee={wrappr['mintFee']}
          />
        </Stack>
        <Stack>
          <Skeleton loading={!isReading}>
            <h1 className="text-gray-100 font-semibold text-xl">{reads ? reads?.[0] : 'No name found'}</h1>
          </Skeleton>
          <Skeleton loading={!isReading}>
            <p className="whitespace-pre-line break-normal text-gray-400">
              {data ? data['description'] : 'No description found'}
            </p>
          </Skeleton>
          <h2 className="text-gray-100 font-semibold text-xl">Traits</h2>
          <Skeleton loading={!isLoading}>
            <Stack>
              {data &&
                data?.['attributes']?.map((trait: TraitType, index: number) => (
                  <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                ))}
              <Trait trait_type={'Admin'} value={wrappr['admin']} isBig={false} />
              <Trait trait_type={'Mint Fee'} value={wrappr['mintFee']} isBig={true} />
            </Stack>
          </Skeleton>
        </Stack>
      </Stack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const wrappr = context?.params?.wrappr as string
  const chainId = Number(context?.params?.chainId as string)

  const res = await fetch(deployments[chainId]['subgraph'], {
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

const fetchCollections = async (address: string, chainId: number) => {
  const res = await fetch(deployments[chainId]['subgraph'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        collections(where: {
            wrappr: "${address.toLowerCase()}"
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
  return data
}

export default Wrappr
