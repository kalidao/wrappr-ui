import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { Stack, Heading, IconButton, Box, Text } from '@chakra-ui/react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { deployments } from '~/constants'
import { useQuery } from '@tanstack/react-query'
import { CollectionCard } from '~/collection'
import { useNetwork } from 'wagmi'
import { SimpleGrid } from '@chakra-ui/react'

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

  // const goBack = () => {
  //     const index = chains?.findIndex(({ id }) => id === chainId)
  //     console.log(chains.length, index, chains[chains.length])

  //     if (index === 0) setChainId(chains[chains.length - 1]["id"])
  //     else setChainId(index - 1)
  // }

  // const goNext = () => {
  //     const index = chains?.findIndex(({ id }) => id === chainId)
  //     console.log(chains.length, index)
  //     if (chains.length === index + 1) setChainId(chains[0]["id"])
  //     else setChainId(chains[index + 1]["id"])
  // }

  return (
    <Layout heading="User" content="Explore wrapprs created by users. Wrap anything." back={true}>
      <Box display="flex" flexDirection={'column'} alignItems="center" justifyContent="center" gap={'md'}>
        <Stack direction={'row'}>
          {/* <IconButton
                        variant="ghost"
                        maxWidth={1}
                        colorScheme={'brand'}
                        disabled={!chains}
                        onClick={goBack}
                        aria-label="Go back!"
                        icon={<BsArrowLeft />}
                        isRound
                        marginLeft={[2, 4, 6, 8]}
                    /> */}
          <Heading>{getChainName(chainId)}</Heading>
          {/* <IconButton
                        variant="ghost"
                        maxWidth={1}
                        colorScheme={'brand'}
                        disabled={!chains}
                        onClick={goNext}
                        aria-label="Go back!"
                        icon={<BsArrowRight />}
                        isRound
                        marginLeft={[2, 4, 6, 8]}
                    /> */}
        </Stack>
        {data ? (
          <SimpleGrid columns={[1, 2, 3, 6]} spacing={10} px={[4, 6]} py={2}>
            {data.map((wrappr: any) => (
              <CollectionCard
                key={wrappr?.id}
                address={wrappr?.wrappr?.id}
                id={wrappr.collectionId}
                tokenURI={wrappr?.uri === '' ? wrappr?.wrappr?.baseURI : wrappr?.uri}
                chainId={chainId.toString()}
              />
            ))}
          </SimpleGrid>
        ) : isLoading ? (
          <Text>Fetching...</Text>
        ) : (
          <Text>We didn'&apos;t find any Wrappr owned by you on {getChainName(chainId)}</Text>
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
