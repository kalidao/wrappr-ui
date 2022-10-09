import { deployments } from '~/constants'

export const getCollections = async (address: string, chainId: number) => {
  const res = await fetch(deployments[chainId]['subgraph'], {
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

  if (res.ok) {
    const data = await res.json()

    if (data?.data) {
      return data?.data?.collections
    } else {
      return new Error('No collections found.')
    }
  } else {
    return new Error('Error fetching collections.')
  }
}
