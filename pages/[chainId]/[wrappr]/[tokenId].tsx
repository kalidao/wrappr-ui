import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '~/layout'
import { useQuery } from '@tanstack/react-query'
import { MintWrappr, Trait, TraitType } from '~/wrap'
import { useContractReads } from 'wagmi'
import { useRouter } from 'next/router'
import { deployments, WRAPPR } from '~/constants'
import { zeroAddress } from 'viem'
import { Spinner } from '~/components/ui/spinner'

const Wrappr: NextPage = () => {
  const router = useRouter()
  const { wrappr, chainId, tokenId } = router.query
  const wrapprContract = {
    addressOrName: wrappr ? wrappr.toString() : zeroAddress,
    contractInterface: WRAPPR,
  }
  const collectionId = wrappr?.toString().toLowerCase() + '0x' + Number(tokenId)?.toString(16)
  const { isLoading, error, data } = useQuery(
    ['wrappr', chainId, collectionId],
    () => fetchWrappr(deployments[Number(chainId)]['subgraph'] as string, collectionId),
    {
      enabled: wrappr !== undefined && tokenId !== undefined,
    },
  )
  const URI = data?.uri ? data.uri : data?.wrappr?.baseURI
  const {
    isLoading: isLoadingURI,
    error: uriError,
    data: uri,
  } = useQuery(['wrappr', data?.['wrappr']?.['baseURI']], () => fetchWrapprURI(URI), {
    enabled: data !== undefined,
  })
  const { data: qOwner, isLoading: qIsReading } = useContractReads({
    contracts: [
      {
        ...wrapprContract,
        functionName: 'ownerOf',
        args: [Number(tokenId)],
      },
    ],
  })
  const { data: tokenUri, isLoading: isReading } = useContractReads({
    contracts: [
      {
        ...wrapprContract,
        functionName: 'uri',
        args: [Number(tokenId)],
      },
    ],
  })
  const _uri = tokenUri ? tokenUri[0] : ''
  const {
    isLoading: qIsLoadingURI,
    // error: uriError,
    data: qUri,
  } = useQuery(['wrappr', _uri], () => fetchWrapprURI(_uri as string), {
    enabled: _uri !== '',
  })

  // TODO: Add chain not supported if subgraph is undefined for chainId
  if (chainId && chainId != '35443' && deployments[Number(chainId)]['subgraph'] === undefined) {
    return (
      <Layout heading="Wrappr" content="Wrap now" back={() => router.push('/')}>
        <div className="flex items-center justify-center">
          <p>This chain is not yet supported. Please switch to a supported chain.</p>
        </div>
      </Layout>
    )
  }

  // TODO: Add Back
  return (
    <Layout heading="Wrappr" content="Wrap now" back={() => router.push(`/${chainId}/${wrappr}`)}>
      <div className="p-6 flex flex-col md:flex-row">
        <div>
          {/* {data ? (
            <Avatar src={uri?.['image']} size="96" shape="square" label={`Image for ${uri?.['name']}`} />
          ) : qUri ? (
            <Avatar src={qUri?.['image']} size="96" shape="square" label={`Image for ${uri?.['name']}`} />
          ) : (
            'No image found'
          )} */}

          <MintWrappr chainId={4} wrappr={wrappr ? wrappr.toString() : zeroAddress} tokenId={Number(tokenId)} />
          <Link href="/clinic" passHref>
            Need help with your entity?
          </Link>
          {(uri?.attributes[1].value == 'LLC' || uri?.attributes[1].value == 'UNA') && (
            <Link href={`/${chainId}/${wrappr}/${tokenId}/ein`} passHref>
              Apply for EIN
            </Link>
          )}
        </div>
        <div className="w-full">
          <div>
            <p>{qIsLoadingURI ? <Spinner /> : qUri ? qUri?.['name'] : 'No name found'}</p>
            {qUri ? (
              <p>{qUri?.['description']}</p>
            ) : (
              <p>{isLoading ? <Spinner /> : uri ? uri?.['description'] : 'No name found'}</p>
            )}
            <h2>Traits</h2>
            <div>
              {uri
                ? uri?.['attributes']?.map((trait: TraitType, index: number) => (
                    <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                  ))
                : qUri
                ? qUri?.['attributes']?.map((trait: TraitType, index: number) => (
                    <Trait key={index} trait_type={trait['trait_type']} value={trait['value']} isBig={false} />
                  ))
                : null}
            </div>
            <div>
              <Trait
                trait_type={'Permissioned'}
                value={data?.['permissioned'] === null ? 'No' : data?.permissioned === true ? 'Yes' : 'No'}
                isBig={false}
              />
              <Trait
                trait_type={'Transferable'}
                value={data?.['transferability'] === null ? 'No' : data?.transferability === true ? 'Yes' : 'No'}
                isBig={false}
              />
              <Trait trait_type={'Owner'} value={data?.['owner'] || qOwner} isBig={false} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
const fetchWrapprURI = async (URI: string) => {
  const res = await fetch(URI)
  const json = await res.json()
  return json
}

const fetchWrappr = async (URI: string, collectionId: string) => {
  const res = await fetch(URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query {
        collections(where: {
          id: "${collectionId}"
        }) {
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
  return data['data']['collections'][0]
}

export default Wrappr
