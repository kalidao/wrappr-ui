import { blo } from 'blo'
import { useMemo } from 'react'
import { Address, getAddress, isAddress, zeroAddress } from 'viem'
import { useEnsAvatar, useEnsName } from 'wagmi'
import { truncateAddress } from '~/utils/address'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FullAddressCopy } from './full-address-copy'

export const User = ({ address }: { address: Address }) => {
  const { data: ensName } = useEnsName({
    address: address,
    chainId: 1,
  })
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: 1,
  })

  const name = useMemo(() => {
    if (ensName) return ensName
    if (address && isAddress(address)) return truncateAddress(getAddress(address))
    return 'User'
  }, [ensName, address])

  const avatar = useMemo(() => {
    if (ensAvatar) return ensAvatar
    if (address && isAddress(address)) return blo(address)
    return blo(zeroAddress)
  }, [ensAvatar, address])

  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="w-12 h-12">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>K</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{name}</h1>
        <FullAddressCopy address={address} />
      </div>
    </div>
  )
}