import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { Spinner, Stack } from '@kalidao/reality'
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
      <Stack direction={'horizontal'} align="center" justify={'center'} space="10" wrap>
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
    </Layout>
  )
}

export default Explore
