import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { Stack, Heading, Button, Box, Text, Spinner, Divider, IconEth } from '@kalidao/reality'
import { deployments } from '~/constants'
import { useQuery } from '@tanstack/react-query'
import { CollectionCard } from '~/collection'
import { getChainDetails, getExplorerLink } from '~/utils/getChainDetails'

const User: NextPage = () => {
  const router = useRouter()
  const user = router.query.user ? router.query.user.toString() : undefined
  const { data, isLoading } = useQuery(
    ['userCollections', user],
    async () => {
      const data = await fetchAllCollections(user as string, true)
      return data
    },
    {
      enabled: user !== undefined,
    },
  )

  const explorerLink = getExplorerLink(1, user as string, 'address')

  return (
    <Layout heading="User" content="Explore wrapprs created by users. Wrap anything." back={() => router.push('/')}>
      <Box display="flex" flexDirection={'column'} alignItems="center" justifyContent="center" gap="2">
        <Stack>
          <Heading>{user ? user.slice(0, 5) + '...' + user.slice(-4) : null}</Heading>
          {/* Add link on etherscan */}
          <Stack direction="horizontal">
            <Button
              shape="circle"
              variant="transparent"
              as="a"
              href={`https://etherscan.io/address/${user}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconEth />
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Stack>
          {isLoading ? (
            <Spinner />
          ) : data && data?.length === 0 ? (
            <Text>We could not find any Wrapprs owned by this user.</Text>
          ) : (
            data?.map((chain: any, index) => <UserCollection key={index} chainId={chain.chainId} data={chain.data} />)
          )}
        </Stack>
      </Box>
    </Layout>
  )
}

export const UserCollection = ({ chainId, data }: { chainId: number; data: any[] }) => {
  const chain = getChainDetails(chainId)

  return (
    <Stack direction={'vertical'}>
      <Heading>{chain?.name}</Heading>
      <Stack direction={'horizontal'} wrap>
        {data?.map((wrappr: any) => {
          return (
            <CollectionCard
              key={wrappr?.id}
              address={wrappr?.wrappr?.id}
              id={wrappr.collectionId}
              tokenURI={wrappr?.uri === '' ? wrappr?.wrappr?.baseURI : wrappr?.uri}
              chainId={chainId.toString()}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

const fetchAllCollections = async (user: string, testnet: boolean) => {
  const address = user.toLowerCase()
  const chains = Object.keys(deployments)
    .filter((chainId) => deployments[Number(chainId)]['subgraph'] !== undefined)
    .filter((chainId) => !(deployments[Number(chainId)]['testnet'] === testnet))
  const res = await Promise.all(
    chains.map((chainId) =>
      fetch(deployments[Number(chainId)]['subgraph'] as string, {
        method: 'POST',
        body: JSON.stringify({
          query: `query {
            collections(where: {
              owner: "${address}"
            }) {
              id
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
      }),
    ),
  )
  const data = await Promise.all(res.map(async (r) => await r.json()))

  let collections = []
  for (let i = 0; i < chains.length; i++) {
    if (data[i].data.collections.length > 0) {
      collections.push({
        chainId: Number(chains[i]),
        data: data[i].data.collections,
      })
    }
  }

  return collections
}

export default User
