import { getEntityAddress } from '~/constants/deployments'
import { Wrappr, WrapprLong } from '~/types/wrappr.types'

export function compileQtestnetWrapprs(chainId: number) {
  const deLLC = getEntityAddress(chainId, 'deLLC')
  const wyLLC = getEntityAddress(chainId, 'wyLLC')
  const miLLC = getEntityAddress(chainId, 'miLLC')
  const deUNA = getEntityAddress(chainId, 'deUNA')
  const wyUNA = getEntityAddress(chainId, 'wyUNA')
  const lexCharter = getEntityAddress(chainId, 'lexCharter')
  const orCharter = getEntityAddress(chainId, 'orCharter')

  // Prep for building `wrapprs` variable
  const wrapprAddresses = [deLLC, wyLLC, miLLC, deUNA, wyUNA, lexCharter, orCharter]
  const wrapprNames = [
    'Wrappr LLC (Delaware)',
    'Wrappr LLC (Wyoming)',
    'Wrappr LLC (Marshall Islands)',
    'Wrappr UNA (Delaware)',
    'Wrappr UNA (Wyoming)',
    'LeXpunK DAO Charter',
    'Orange Charter',
  ]
  const wrapprSymbols = ['LLC', 'LLC', 'LLC', 'UNA', 'UNA', 'CHARTER', 'CHARTER']
  const wrapprURIs = [
    'https://content.wrappr.wtf/ipfs/QmP8JQVEw376Q6tLKX4Q9nLvYHKLgPD9848LkMKtP4xyoR',
    'https://content.wrappr.wtf/ipfs/QmUtNiS3Z8rKnC4xkze1sZUtqBs2kXpafhNDPS4c4kRjLg',
    'https://content.wrappr.wtf/ipfs/QmV5XJE8T9A6czrJwskwwvfUMuPX5pBsrni5L3JQS21kXw',
    'https://content.wrappr.wtf/ipfs/QmRDDxN1vVGAHJooMC8p5hFLTZcfRaKaRRPeHrRDkpohBg',
    'https://content.wrappr.wtf/ipfs/Qmb94Kaqtu9NaXQjZEqxMDUvEs5n5CsULcDes39ztoCgET',
    'https://content.wrappr.wtf/ipfs/QmXTvc35PzqAhAPDPh73zQKj6cSqeDNPQLdUcPYPFEKegG',
    'https://content.wrappr.wtf/ipfs/QmPgnSrfUuWoUrRgq6ZF9s1nY6gini5fBrN3tBJnyDjcWh',
  ]

  let wrapprs: Wrappr[] = []
  let wrapprsLong: WrapprLong[] = []

  for (let i = 0; i < 6; i++) {
    wrapprs.push({
      id: wrapprAddresses[i],
      name: wrapprNames[i],
      baseURI: wrapprURIs[i],
      mintFee: '0',
    })

    wrapprsLong.push({
      id: wrapprAddresses[i],
      name: wrapprNames[i],
      baseURI: wrapprURIs[i],
      mintFee: '0',
      admin: '0x4744cda32bE7b3e75b9334001da9ED21789d4c0d',
      symbol: wrapprSymbols[i],
    })
  }
  return { wrapprs, wrapprsLong }
}
