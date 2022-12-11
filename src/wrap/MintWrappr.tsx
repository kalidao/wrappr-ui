import { Stack, Text, Button, Spinner, Input } from '@kalidao/reality'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { WRAPPR } from '../constants'
import { useState } from 'react'
import { ethers } from 'ethers'
import { GrPowerReset } from 'react-icons/gr'

export default function MintWrappr({ chainId, tokenId, wrappr }: { chainId: number; tokenId: number; wrappr: string }) {
  const { address, isConnected } = useAccount()
  const [account, setAccount] = useState(isConnected ? address : '')
  const { config } = usePrepareContractWrite({
    addressOrName: wrappr,
    contractInterface: WRAPPR,
    functionName: 'manageMint',
    chainId: chainId,
    args: [account, tokenId, 1, ethers.constants.HashZero, '', account],
  })
  const { write } = useContractWrite({
    ...config,
  })

  return (
    <Stack>
      <Stack>
        <Input
          label="Address for Minting"
          hideLabel
          value={account}
          placeholder="Address"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)}
        />
        <Button onClick={() => setAccount('')}>
          <GrPowerReset />
        </Button>
      </Stack>
      <Button onClick={() => write?.()} disabled={!write}>
        Mint
      </Button>
    </Stack>
  )
}
