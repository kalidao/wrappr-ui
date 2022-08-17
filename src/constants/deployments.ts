type Contracts = {
  factory: string
  delSeries?: string
}

export const deployments: { [key: number]: Contracts } = {
  1: {
    factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
  },
  4: {
    factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
    delSeries: '0xaC4EF9D6fC426f8fFd188771d9C688890b634462',
  },
  5: {
    factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
  },
  10: {
    factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
  },
  56: {
    factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
  },
  137: {
    factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
  },
  42161: {
    factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
  },
  42170: {
    factory: '0xA945f46Ca376B18fB34d809ef4F21f9b58AE4C50',
  },
}
