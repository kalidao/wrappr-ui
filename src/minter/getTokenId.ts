import { ethers } from 'ethers'
import { deployments } from '~/constants'

export const getTokenId = async (address: string, chainId: number, user: string) => {
  let len = 0
  if (chainId !== undefined) {
    try {
      const result = await fetch(deployments[chainId]['subgraph'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query {
              collections(where: {
                wrappr: "${address.toLowerCase()}"
              }) {
                id
                wrappr {
                  id
                  name
                }
                collectionId
                owner
              }
            }`,
        }),
      }).then((res) => res.json())
      len = result['data']['collections'].length
    } catch (e) {
      console.error('Error fetching collections', e)
    }
    let tokenId = Number(len) + 1
    if (address.toLowerCase() === '0x8d18D533047129dF8172feC7931a3933C47645D2'.toLowerCase() && tokenId == 10) {
      tokenId = 1
    }

    return tokenId
  } else {
    return ethers.BigNumber.from(ethers.utils.randomBytes(4)).toNumber()
  }
}