import { useAccount, useQuery } from 'wagmi'
import { useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { calculateTokenId } from '~/utils/calculateTokenId'
import { useMintWrappr } from '~/hooks/useMintWrappr'
import { getAddress, parseEther } from 'viem'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function MintWrapprNFT({ chainId, wrappr, mintFee }: { chainId: number; wrappr: string; mintFee: any }) {
  const [error, setError] = useState('')
  const { address, isConnected } = useAccount()
  const [account, setAccount] = useState(isConnected ? address : '')
  const { data: tokenId } = useQuery(['tokenId', wrappr, chainId], () => calculateTokenId(wrappr, chainId), {
    staleTime: 1 * 60 * 1000, // a minute
  })
  const { writeAsync } = useMintWrappr({ chainId })

  const write = async () => {
    try {
      if (!account) {
        throw new Error('Please enter an address')
      }

      if (!tokenId) {
        throw new Error('Could not find tokenId')
      }

      const to = getAddress(account)

      await writeAsync({
        address: getAddress(wrappr),
        to,
        id: BigInt(tokenId),
        amount: BigInt(1),
        data: '0x',
        tokenURI: '',
        owner: to,
        value: parseEther(mintFee.toString()),
      })
    } catch (e) {
      console.log(e)
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  }
  return (
    <div>
      <div className="flex flex-row">
        <Input
          className="w-full"
          value={account}
          placeholder="Address"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)}
        />
        <Button size="icon" onClick={() => setAccount('')}>
          <GrPowerReset />
        </Button>
      </div>
      <Button onClick={() => write?.()} disabled={!write} className="w-full">
        Mint
      </Button>
    </div>
  )
}
