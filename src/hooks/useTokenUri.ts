import { Address, useContractRead } from 'wagmi'
import { WRAPPR } from '~/constants'

interface IReadTokenUri {
  address: Address
  tokenId: bigint
  chainId: number
}

export const useTokenUri = ({ address, tokenId, chainId }: IReadTokenUri) => {
  return useContractRead({
    address,
    abi: WRAPPR,
    functionName: 'uri',
    chainId,
    args: [tokenId],
  })
}
