import { isAddressEqual } from 'viem'
import { Address } from 'wagmi'

interface Contracts {
  factory: Address | null
  deLLC: Address | null
  wyLLC: Address | null
  miLLC: Address | null
  deUNA: Address | null
  wyUNA: Address | null
  lexCharter: Address | null
  orCharter: Address | null
}

interface Deployment {
  testnet: boolean
  contracts: Contracts
  subgraph: string | null
}

export const deployments: { [key: number]: Deployment } = {
  // Ethereum
  1: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-mainnet',
  },
  // Optimism
  10: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: null, // @TODO deploy marshall on optimism
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-optimism',
  },
  // Binance
  56: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-bsc',
  },
  // Gnosis
  100: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-xdai',
  },
  // Polygon
  137: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-matic',
  },
  // Fantom
  250: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: null,
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: null,
  },
  // Arbitrum
  42161: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: null,
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-arbitrum',
  },
  // Nova
  42170: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: null,
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
    },
    subgraph: null,
  },
  // Avalanche
  43114: {
    testnet: false,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: null,
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-avalanche',
  },
  // Q
  35441: {
    testnet: false,
    contracts: {
      factory: null,
      deLLC: null,
      wyLLC: null,
      miLLC: null,
      deUNA: null,
      wyUNA: null,
      lexCharter: null,
      orCharter: null,
    },
    subgraph: null,
  },
  // Goerli
  5: {
    testnet: true,
    contracts: {
      factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
      deLLC: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
      wyLLC: '0x8d18D533047129dF8172feC7931a3933C47645D2',
      miLLC: '0xee06D1Eb614003f081F2A98F5e6a8135eBa99AF3',
      deUNA: '0xE22ebfbD3e6609A9550a86545E37af7DE1EE688b',
      wyUNA: '0x73Af00b92073D93b47e1077f796A3D6A12F63909',
      lexCharter: '0xa958f8D815a037E8eDe8194DAD70f9A3f3f94041',
      orCharter: '0x5228eBc680BA2Ac70A8dB9FBF01CEAaC9Dd9b2Ea',
    },
    subgraph: 'https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr-goerli',
  },
  // Q Testnet
  35443: {
    testnet: true,
    contracts: {
      factory: '0xB96b13E38caBF09A79A8b6a427FBB9e09A1aB6b2',
      deLLC: '0xaE8F59941A169cfA9C55E9213f7c50409973DB01',
      wyLLC: '0xB18D52C4662b2F9b9a860406ab6aA5D9C79d8b88',
      miLLC: '0x119Aef39481c2b7e683Fb1015a10EF8C75A5BF94',
      deUNA: '0x61FDc87e3BFE16874099650041Db3e11B005d69c',
      wyUNA: '0x1CEa1b21eE8Cb62ea97c54D0454E10b387bd0AA1',
      lexCharter: '0xa585417062dcB987cBf197F712532cBBcf7f95D5',
      orCharter: '0xdEe39515DB9366E1b80168190f7FE78bcbD29E5b',
    },
    subgraph: null,
  },
}

export const getDeployment = (chainId: number) => {
  return deployments[chainId]
}

export const hasSubgraphSupport = (chainId: number) => {
  const subgraph = getDeployment(chainId).subgraph

  return subgraph !== null
}

export const resolveWrappr = (chainId: number, address: Address) => {
  const deployment = getDeployment(chainId)

  for (const key in deployment['contracts']) {
    if (deployment['contracts'][key as keyof Contracts] === address) {
      return key
    }
  }

  return undefined
}

export const getFactory = (chainId: number) => {
  const factory = getDeployment(chainId).contracts.factory

  if (factory === null) {
    throw new Error('Factory not deployed on this network')
  }

  return factory
}

export const getEntityAddress = (chainId: number, entity: string) => {
  const address = getDeployment(chainId).contracts[entity as keyof Contracts]

  if (address === null) {
    throw new Error(`${entity} not deployed on this network`)
  }

  return address
}
