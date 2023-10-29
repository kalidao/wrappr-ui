import { Address, useContractRead } from 'wagmi'
import { WRAPPR } from '~/constants'

interface IReadWrapprName {
  address: Address
  chainId: number
}

export const useWrapprName = ({ address, chainId }: IReadWrapprName) => {
  return useContractRead({
    address,
    abi: WRAPPR,
    functionName: 'name',
    chainId,
  })
}
