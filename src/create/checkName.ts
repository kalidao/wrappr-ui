import { deployments } from '~/constants'

export async function checkName(name: string, chainId: number) {
  if (chainId !== undefined) {
    if (deployments[chainId]['subgraph'] === undefined) {
      return {
        isError: false,
        available: false,
        error: 'No subgraph found for this chain. Please try again on a different network.',
      }
    }
    try {
      const result = await fetch(deployments[chainId]['subgraph'] as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query {
                  wrapprs(where: {
                    name: "${name}"
                  }) {
                    name
                  }
                }`,
        }),
      }).then((res) => res.json())

      const available = result['data']['wrapprs'].length === 0 ? true : false
      return {
        isError: false,
        available: available,
        error: '',
      }
    } catch (e) {
      console.error('Error fetching wrapprs', e)
      return {
        isError: true,
        available: false,
        error: 'Error fetching names. Cannot check for name collision at the moment. Please try again.',
      }
    }
  } else {
    return {
      isError: false,
      available: false,
      error: 'Could not detect the chainId. Try reconnecting your wallet.',
    }
  }
}
