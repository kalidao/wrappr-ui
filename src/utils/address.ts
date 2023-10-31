import { Address } from 'viem'

export const truncateAddress = (address: Address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
