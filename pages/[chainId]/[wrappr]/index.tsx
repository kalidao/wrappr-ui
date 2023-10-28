import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Layout from '~/layout'
import { useQuery } from '@tanstack/react-query'
import { Trait, TraitType } from '~/wrap'
import { useRouter } from 'next/router'
import { deployments } from '~/constants'
import MintWrapprNFT from '~/wrap/MintWrapprNFT'
import { compileQtestnetWrapprs } from '~/utils/compileQtestnetWrapprs'
import { zeroAddress } from 'viem'
import { useWrapprName } from '~/hooks/useWrapprName'
import { getAddress } from 'viem'
import { Spinner } from '~/components/ui/spinner'
import { AspectRatio } from '~/components/ui/aspect-ratio'
import Image from 'next/image'
import { Table, TableBody, TableCaption } from '~/components/ui/table'

const Wrappr: NextPage = ({ wrappr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const address = getAddress(router.query.wrappr as string)
  const chainId = Number(router.query.chainId)

  const { data: name, isLoading: isReading } = useWrapprName({
    address,
    chainId,
  })

  const { isLoading, error, data } = useQuery(['wrappr', wrappr?.['baseURI']], () =>
    fetchWrapprData(wrappr?.['baseURI']),
  )

  // TODO: Add mint fee
  return (
    <Layout heading="Wrappr" content="Wrap now" back={() => router.push(`/${chainId}/explore`)}>
      <div className="p-6">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col">
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="w-[50rem]">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    layout="fill"
                    src={data?.['image']}
                    alt={`Image for ${data?.['name']}`}
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            )}
            <MintWrapprNFT
              chainId={Number(chainId)}
              wrappr={address ? address : zeroAddress}
              mintFee={wrappr['mintFee']}
            />
          </div>
          <div className="w-full">
            <div className="flex flex-col space-y-5">
              <div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl capitalize">
                  {name ? name : 'No name found'}
                </h1>
                <p className="text-xl text-muted-foreground break-words capitalize">
                  {data ? data['description'] : 'No description found'}
                </p>
              </div>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Traits</h2>
              <Table>
                <TableCaption className="text-xs">Traits of {name ? name : ''}</TableCaption>
                <TableBody>
                  {data &&
                    data?.['attributes']?.map((trait: TraitType, index: number) => (
                      <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                    ))}
                  {wrappr ? <Trait trait_type={'Admin'} value={wrappr?.['admin']} isBig={false} /> : <Spinner />}
                  {wrappr ? <Trait trait_type={'Mint Fee'} value={wrappr?.['mintFee']} isBig={true} /> : <Spinner />}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const wrappr = context?.params?.wrappr as string
  const chainId = Number(context?.params?.chainId as string)

  console.log(wrappr)
  if (!chainId)
    return {
      notFound: true,
    }

  const { wrapprsLong } = compileQtestnetWrapprs(chainId)
  if (chainId == 35443) {
    for (let i = 0; i < wrapprsLong.length; i++) {
      if (wrapprsLong[i].id == wrappr) {
        return {
          props: { wrappr: wrapprsLong[i] },
        }
      }
    }
  }

  const res = await fetch(deployments[chainId]['subgraph'] as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        wrapprs (where: {
          id: "${wrappr.toLowerCase()}"
        }) {
          id
          name
          symbol
          baseURI
          mintFee
          admin
        }
      }`,
    }),
  })

  const data = await res.json()
  return {
    props: { wrappr: data['data']['wrapprs'][0] },
  }
}

const fetchWrapprData = async (URI: string) => {
  const res = await fetch(URI)
  return res.json()
}

export default Wrappr
