import { usePrepareContractWrite, useContractWrite, Address, usePublicClient, useWalletClient } from 'wagmi'
import { WRAPPR_FACTORY } from '~/constants'
import { getFactory } from '~/constants/deployments'

interface IDeployWrappr {
  name: string
  symbol: string
  baseURI: string
  mintFee: bigint
  admin: Address
  chainId: number
}

export const useDeployWrappr = ({ chainId }: { chainId?: number }) => {
  const { data: walletClient } = useWalletClient({ chainId })
  const publicClient = usePublicClient({ chainId })

  const writeAsync = async ({ name, symbol, baseURI, mintFee, admin, chainId }: IDeployWrappr) => {
    if (!walletClient) {
      throw new Error('No wallet client')
    }

    if (!publicClient) {
      throw new Error('No public client')
    }

    const hash = await walletClient.writeContract({
      address: getFactory(chainId),
      abi: WRAPPR_FACTORY,
      functionName: 'deployWrappr',
      args: [name, symbol, baseURI, mintFee, admin],
    })

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    })

    return receipt
  }

  return { writeAsync }
}
