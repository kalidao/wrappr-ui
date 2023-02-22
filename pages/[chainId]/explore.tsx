import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { Box, Spinner, Stack, Text } from '@kalidao/reality'
import { WrapprCard } from '~/wrap'
import { Wrappr } from '~/types/wrappr.types'
import { deployments } from '~/constants'
import { useQuery } from '@tanstack/react-query'
import { compileQtestnetWrapprs } from '~/utils/compileQtestnetWrapprs'

const Explore: NextPage = () => {
  const router = useRouter()
  const chainId = Number(router.query.chainId)
  const { data: wrapprs, isLoading } = useQuery(['wrapprs', chainId], () => {
    return fetch(deployments[chainId]['subgraph'] as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          wrapprs {
            id
            name
            baseURI
            mintFee
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((data) => data?.['data']?.['wrapprs'])
  })

  // Q Testnet
  if (chainId == 35443) {
    const { wrapprs } = compileQtestnetWrapprs(chainId)
    console.log(wrapprs)
    return (
      <Layout heading="Wrappr" content="ddWrap now" back={() => router.push('/')}>
        <Box padding="6">
          <Stack direction={'horizontal'} align="center" justify={'flex-start'} space="8" wrap>
            {isLoading ? (
              <Spinner />
            ) : (
              wrapprs?.map((wrappr: Wrappr) => (
                <WrapprCard
                  key={wrappr['id']}
                  name={wrappr.name}
                  id={wrappr.id}
                  baseURI={wrappr.baseURI}
                  chainId={chainId ? chainId.toString() : '1'}
                />
              ))
            )}
          </Stack>
        </Box>
      </Layout>
    )
  } else if (chainId && deployments[Number(chainId)]['subgraph'] === undefined) {
    return (
      <Layout heading="Wrappr" content="Wrap now" back={() => router.push('/')}>
        <Box display={'flex'} alignItems="center" justifyContent={'center'}>
          <Text>This chain is not yet supported. Please switch to a supported chain.</Text>
        </Box>
      </Layout>
    )
  }

  // TODO: Add chain not supported if subgraph is undefined for chainId
  // if (chainId && deployments[Number(chainId)]['subgraph'] === undefined) {
  //   return (
  //     <Layout heading="Wrappr" content="Wrap now" back={() => router.push('/')}>
  //       <Box display={'flex'} alignItems="center" justifyContent={'center'}>
  //         <Text>This chain is not yet supported. Please switch to a supported chain.</Text>
  //       </Box>
  //     </Layout>
  //   )
  // }

  return (
    <Layout heading="Explore" content="Explore wrapprs. Wrap anything." back={() => router.push('/explore')}>
      <Box padding="6">
        <Stack direction={'horizontal'} align="center" justify={'flex-start'} space="8" wrap>
          {isLoading ? (
            <Spinner />
          ) : (
            wrapprs?.map((wrappr: Wrappr) => (
              <WrapprCard
                key={wrappr['id']}
                name={wrappr.name}
                id={wrappr.id}
                baseURI={wrappr.baseURI}
                chainId={chainId ? chainId.toString() : '1'}
              />
            ))
          )}
        </Stack>
      </Box>
    </Layout>
  )
}

export default Explore
