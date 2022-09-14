import { deployments } from '~/constants'

export const getTokenId = async (address: string, chainId: number) => {
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
    return Number(len) + 1
  } else {
    return 0
  }
}
