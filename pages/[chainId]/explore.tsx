import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { Stack } from '@kalidao/reality'
import { WrapprCard } from '~/wrap'
import { Wrappr } from '~/types/wrappr.types'
import { deployments } from '~/constants'

const Explore: NextPage = ({ wrapprs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { chainId } = router.query

  return (
    <Layout heading="Explore" content="Explore wrapprs. Wrap anything." back={() => router.push('/explore')}>
      <Stack direction={'horizontal'} wrap>
        {wrapprs.map((wrappr: Wrappr) => (
          <WrapprCard
            key={wrappr['id']}
            name={wrappr.name}
            id={wrappr.id}
            baseURI={wrappr.baseURI}
            chainId={chainId ? chainId.toString() : '1'}
          />
        ))}
      </Stack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const chainId = context?.params?.chainId as unknown as number

  const res = await fetch(deployments[chainId]['subgraph'], {
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

  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { wrapprs: data?.['data']?.['wrapprs'] },
  }
}

export default Explore
