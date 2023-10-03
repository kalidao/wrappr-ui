import { usePrepareContractWrite, useContractWrite, Address } from 'wagmi'
import { Hex } from 'viem'
import { WRAPPR } from '~/constants'

interface IMintWrappr {
  address: Address
  to: Address
  id: bigint
  amount: bigint
  data: Hex
  tokenURI: string
  owner: Address
}

export const useMintWrappr = ({ address, to, id, amount, data, tokenURI, owner }: IMintWrappr) => {
  const { config } = usePrepareContractWrite({
    address,
    abi: WRAPPR,
    functionName: 'mint',
    args: [to, id, amount, data, tokenURI, owner],
  })
  return useContractWrite(config)
}
