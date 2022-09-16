import { deployments } from '~/constants'

export async function checkName(name: string, chainId: number) {
  if (chainId !== undefined) {
    try {
      const result = await fetch(deployments[chainId]['subgraph'], {
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
      console.log('name check', result)
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
