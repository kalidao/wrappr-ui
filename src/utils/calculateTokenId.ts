import { getCollections } from '~/graph/getCollections'
import { ethers } from 'ethers'

// TODO: check in loop?
export const calculateTokenId = async (address: string, chainId: number) => {
  try {
    const collections = await getCollections(address, chainId)
    const ids = collections
      .map((collection: { [x: string]: any }) => Number(collection['collectionId']))
      .sort((a: number, b: number) => a - b)

    let id = 0
    for (let i = 0; i < ids.length + 1; i++) {
      if (ids[i] !== i) {
        id = i
        return id
      }
    }

    return id
  } catch (e) {
    console.error('Error fetching from subgraph. Assigning random huge number.')
  }
  return ethers.BigNumber.from(ethers.utils.randomBytes(4)).toNumber() // big fallback
}
