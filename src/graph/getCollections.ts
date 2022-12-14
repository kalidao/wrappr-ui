import { deployments } from '~/constants'

export const getCollections = async (address: string, chainId: number) => {
  try {
    if (!chainId && deployments[chainId]['subgraph'] === undefined) return
    const res = await fetch(deployments[chainId]['subgraph'] as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    })

    const data = await res.json()

    return data?.data?.collections
  } catch (e) {
    console.error(e)
    return
  }
}
