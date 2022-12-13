import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { Box, Spinner, Stack } from '@kalidao/reality'
import { WrapprCard } from '~/wrap'
import { Wrappr } from '~/types/wrappr.types'
import { deployments } from '~/constants'
import { useQuery } from '@tanstack/react-query'

const Explore: NextPage = () => {
  const router = useRouter()
  const chainId = Number(router.query.chainId)
  const { data: wrapprs, isLoading } = useQuery(['wrapprs', chainId], () => {
    return fetch(deployments[chainId]['subgraph'], {
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
