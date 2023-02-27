import { getCollections } from '~/graph/getCollections'
import { useAccount, useSigner, useContract, usePrepareContractWrite, useContractWrite, useQuery } from 'wagmi'
import { WRAPPR } from '../constants'
import { ethers } from 'ethers'

export const calculateTokenIdonQ = async (address: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider)
  const signer = provider.getSigner()
  const wrappr = new ethers.Contract(address, WRAPPR, signer)

  console.log(address, signer)
  const dummyCount = 20
  let i = 0
  while (i < dummyCount) {
    try {
      const owner = await wrappr.ownerOf(i)
      console.log('id owner', owner)

      if (owner == ethers.constants.AddressZero) {
        // setFreeId(i)
        break
      }
    } catch (e) {
      console.log(e)
      return 20
    }

    i++
  }
  return i
}
