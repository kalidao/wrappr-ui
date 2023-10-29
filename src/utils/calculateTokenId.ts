import { randomBytes } from 'crypto'
import { getCollections } from '~/graph/getCollections'

export const calculateTokenId = async (address: string, chainId: number, force: boolean = false) => {
  if (!force) {
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
  }

  return Number(randomBytes(4)) // big fallback
}
