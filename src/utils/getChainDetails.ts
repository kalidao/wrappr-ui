import chains from '~/constants/chains.json'

export const getChainDetails = (chainId: number) => {
  return chains.find((chain) => chain.chainId === chainId)
}

export const getExplorerLink = (chainId: number, value: string, type: 'tx' | 'address') => {
  const chain = getChainDetails(chainId)
  if (chain && chain.explorers) {
    const url = chain.explorers[0].url
    switch (type) {
      case 'tx':
        return `${url}/tx/${value}`
      case 'tx':
        return `${url}/address/${value}`
    }
  }
  return null
}
