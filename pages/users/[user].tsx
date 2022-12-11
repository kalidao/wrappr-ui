import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { Stack, Heading, Button, Box, Text } from '@kalidao/reality'
import { deployments } from '~/constants'
import { useQuery } from '@tanstack/react-query'
import { CollectionCard } from '~/collection'
import { useNetwork } from 'wagmi'

const User: NextPage = () => {
  const router = useRouter()
  const { user } = router.query
  const { chain, chains } = useNetwork()
  const [chainId, setChainId] = useState(chain ? chain.id : 1)
  const { data, isLoading } = useQuery(
    ['userCollections', user],
    () => fetchCollections(Number(chainId), (user as string).toLowerCase()),
    {
      enabled: user !== undefined,
    },
  )

  const getChainName = (chainId: number) => {
    return chains?.find(({ id }) => id === chainId)?.name
  }

  useEffect(() => {
    if (chain) setChainId(chain.id)
  }, [chain])

  return (
    <Layout heading="User" content="Explore wrapprs created by users. Wrap anything." back={() => router.push('/')}>
      <Box display="flex" flexDirection={'column'} alignItems="center" justifyContent="center" gap="2">
        <Stack direction={'horizontal'}>
          <Heading>{getChainName(chainId)}</Heading>
        </Stack>
        {data ? (
          <Stack wrap>
            {data.map((wrappr: any) => (
              <CollectionCard
                key={wrappr?.id}
                address={wrappr?.wrappr?.id}
                id={wrappr.collectionId}
                tokenURI={wrappr?.uri === '' ? wrappr?.wrappr?.baseURI : wrappr?.uri}
                chainId={chainId.toString()}
              />
            ))}
          </Stack>
        ) : isLoading ? (
          <Text>Fetching...</Text>
        ) : (
          <Text>We could not find any Wrappr owned by you on {getChainName(chainId)}</Text>
        )}
      </Box>
    </Layout>
  )
}

const fetchCollections = async (chainId: number, user: string) => {
  const res = await fetch(deployments[chainId]['subgraph'], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
          collections(where: {
            owner: "${user}"
          }) {
            collectionId
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

  return data['data']['collections']
}

export default User
