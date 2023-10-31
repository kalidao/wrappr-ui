import { useAccount } from 'wagmi'
import { useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { useManageMint } from '~/hooks/useManageMint'
import { getAddress } from 'viem'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function MintWrappr({ chainId, tokenId, wrappr }: { chainId: number; tokenId: number; wrappr: string }) {
  const { address, isConnected } = useAccount()
  const [account, setAccount] = useState(isConnected ? address : '')
  const { writeAsync } = useManageMint({ chainId })

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
      <Button
        className="w-full"
        onClick={() => {
          try {
            if (!account) {
              throw new Error('Please enter an address')
            }

            const to = getAddress(account)

            writeAsync({
              address: getAddress(wrappr),
              to,
              id: BigInt(tokenId),
              amount: BigInt(1),
              data: '0x',
              tokenURI: '',
              owner: to,
              value: BigInt(0),
            })
          } catch (e) {
            console.log(e)
            if (e instanceof Error) {
              toast(e.message)
            }
          }
        }}
        disabled={!writeAsync}
      >
        Mint
      </Button>
    </div>
  )
}
