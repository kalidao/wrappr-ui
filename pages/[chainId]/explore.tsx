import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/layout'
import { WrapprCard } from '~/wrap'
import { Wrappr } from '~/types/wrappr.types'
import { deployments } from '~/constants'
import { useQuery } from '@tanstack/react-query'
import { compileQtestnetWrapprs } from '~/utils/compileQtestnetWrapprs'
import { Spinner } from '~/components/ui/spinner'

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
      <Layout heading="Wrappr" content="Wrap now" back={() => router.push('/')}>
        <div className="">
          <div className="grid grid-cols-3 justify-start items-center  space-x-8 space-y-10">
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
          </div>
        </div>
      </Layout>
    )
  } else if (chainId && deployments[Number(chainId)]['subgraph'] === undefined) {
    return (
      <Layout heading="Wrappr" content="Wrap now" back={() => router.push('/')}>
        <div className="flex items-center justify-center">
          <p>This chain is not yet supported. Please switch to a supported chain.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout heading="Explore" content="Explore wrapprs. Wrap anything." back={() => router.push('/explore')}>
      <div className="p-6">
        <div className="flex flex-row justify-start items-center flex-wrap space-x-8">
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
        </div>
      </div>
    </Layout>
  )
}

export default Explore
