import React, { useMemo } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { deployments } from '~/constants'
import { Separator } from '~/components/ui/separator'
import { buttonVariants } from '~/components/ui/button'
import { getAddress, isAddress, zeroAddress } from 'viem'
import { CollectionCard } from '~/collection'
import { useEnsAvatar, useEnsName, useNetwork } from 'wagmi'
import { truncateAddress } from '~/utils/address'
import { blo } from 'blo'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { FullAddressCopy } from '~/components/full-address-copy'

export const getServerSideProps = (async (context) => {
  const user = context.params?.user?.toString()
  const testnet = Boolean(context.query?.testnet)

  if (!user || !isAddress(user)) {
    return {
      notFound: true,
    }
  }

  const data = await fetchAllCollections(user, testnet)

  return {
    props: {
      data,
    },
  }
}) satisfies GetServerSideProps<{
  data: any
}>

export default function UserPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const user = router.query.user ? router.query.user.toString() : undefined
  const { data: ensName } = useEnsName({
    address: user ? getAddress(user) : undefined,
    chainId: 1,
  })
  const {
    data: ensAvatar,
    isError,
    isLoading,
  } = useEnsAvatar({
    name: ensName,
    chainId: 1,
  })

  const name = useMemo(() => {
    if (ensName) return ensName
    if (user && isAddress(user)) return truncateAddress(getAddress(user))
    return 'User'
  }, [ensName, user])
  const avatar = useMemo(() => {
    if (ensAvatar) return ensAvatar
    if (user && isAddress(user)) return blo(user)
    return blo(zeroAddress)
  }, [ensAvatar, user])

  if (!user || !isAddress(user)) {
    return (
      <Layout heading="User" content="Explore wrapprs created by users. Wrap anything." back={() => router.push('/')}>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p>Could not find user.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout heading="User" content="Explore wrapprs created by users. Wrap anything." back={() => router.push('/')}>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-col space-y-3">
          <div className="flex flex-row items-center justify-center space-x-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatar} />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{name}</h1>
              {ensName ? <FullAddressCopy address={user} /> : null}
            </div>
          </div>
          <div className="flex flex-row">
            <a
              className={buttonVariants({ variant: 'outline' })}
              href={`https://etherscan.io/address/${user}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Etherscan
            </a>
          </div>
        </div>
        <Separator />
        {data && data?.length === 0 ? (
          <p>We could not find any Wrapprs owned by this user.</p>
        ) : (
          <div className="min-h-screen w-screen flex flex-col space-x-4 p-4">
            {data?.map((chain: any, index) => <UserCollection key={index} chainId={chain.chainId} data={chain.data} />)}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const UserCollection = ({ chainId, data }: { chainId: number; data: any[] }) => {
  const { chains } = useNetwork()
  const chain = chains.find((c) => c.id === chainId)

  if (!chain) return null

  return (
    <div className="flex flex-col space-y-5 items-center justify-center p-2 w-full">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-full">
        {chain.name}
      </h2>
      <div className="grid grid-cols-10 w-full">
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
  const chains = Object.keys(deployments).filter(
    (chainId) =>
      deployments[Number(chainId)]['subgraph'] !== null &&
      (testnet ? true : deployments[Number(chainId)]['testnet'] === testnet),
  )

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
