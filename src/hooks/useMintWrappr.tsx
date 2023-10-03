import { Address, useWalletClient, usePublicClient } from 'wagmi'
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
  value: bigint
}

export const useMintWrappr = ({ chainId }: { chainId: number }) => {
  const { data: walletClient } = useWalletClient({ chainId })
  const publicClient = usePublicClient({ chainId })

  const writeAsync = async ({ address, to, id, amount, data, tokenURI, owner, value }: IMintWrappr) => {
    if (!walletClient) {
      throw new Error('Wallet client not found')
    }
    if (!publicClient) {
      throw new Error('Public client not found')
    }

    const hash = await walletClient.writeContract({
      address,
      abi: WRAPPR,
      functionName: 'mint',
      value,
      args: [to, id, amount, data, tokenURI, owner],
    })

    const receipt = await publicClient.getTransactionReceipt({ hash })

    return receipt
  }

  return {
    writeAsync,
  }
}
