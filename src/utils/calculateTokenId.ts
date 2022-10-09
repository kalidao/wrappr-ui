import { getCollections } from '~/graph/getCollections'
import { ethers } from 'ethers'
import { WRAPPR } from '~/constants'

// TODO: check in loop?
export const calculateTokenId = async (address: string, chainId: number) => {
  const collections = await getCollections(address, chainId)
  const numCollections = collections?.length
  const isRegistered = await checkRegistered(address, chainId, numCollections + 1)

  if (isRegistered) {
    return numCollections + 2
  }

  return numCollections + 1
}

const checkRegistered = async (address: string, chainId: number, tokenId: number) => {
  try {
    const provider = new ethers.providers.InfuraProvider(Number(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
    const contract = new ethers.Contract(address, WRAPPR, provider)
    const owner = await contract.ownerOf(tokenId)
    console.log('owner', owner)
    if (owner.toLowerCase() == ethers.constants.AddressZero.toLowerCase()) {
      return false
    } else {
      return true
    }
  } catch (e) {
    const message = 'Could not check registered'
    console.error(message, e)
    return new Error(message)
  }
}
