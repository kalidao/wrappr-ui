import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { deployments } from '~/constants'
import { useQuery } from '@tanstack/react-query'
import { CollectionCard } from '~/collection'
import { getChainDetails, getExplorerLink } from '~/utils/getChainDetails'
import { Separator } from '~/components/ui/separator'
import { Spinner } from '~/components/ui/spinner'
import { buttonVariants } from '~/components/ui/button'

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

  console.log('user data', data)

  return (
    <Layout heading="User" content="Explore wrapprs created by users. Wrap anything." back={() => router.push('/')}>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div>
          <h1>{user ? user.slice(0, 5) + '...' + user.slice(-4) : null}</h1>
          {/* Add link on etherscan */}
          <div className="flex flex-row">
            <a
              className={buttonVariants({ variant: 'outline' })}
              href={`https://etherscan.io/address/${user}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
            </a>
          </div>
        </div>
        <Separator />
        <div>
          {isLoading ? (
            <Spinner />
          ) : data && data?.length === 0 ? (
            <p>We could not find any Wrapprs owned by this user.</p>
          ) : (
            data?.map((chain: any, index) => <UserCollection key={index} chainId={chain.chainId} data={chain.data} />)
          )}
        </div>
      </div>
    </Layout>
  )
}

export const UserCollection = ({ chainId, data }: { chainId: number; data: any[] }) => {
  const chain = getChainDetails(chainId)

  return (
    <div className="flex flex-col">
      <h1>{chain?.name}</h1>
      <div className="flex flex-row flex-wrap">
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
      </div>
    </div>
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
