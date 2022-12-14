import { Text, Stack, Button, Spinner, Input } from '@kalidao/reality'
import { useAccount, usePrepareContractWrite, useContractWrite, chain, useQuery } from 'wagmi'
import { WRAPPR } from '../constants'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { GrPowerReset } from 'react-icons/gr'
import { calculateTokenId } from '~/utils/calculateTokenId'

export default function MintWrapprNFT({ chainId, wrappr, mintFee }: { chainId: number; wrappr: string; mintFee: any }) {
  const [error, setError] = useState('')
  const { address, isConnected } = useAccount()
  const [account, setAccount] = useState(isConnected ? address : '')
  const { data: tokenId } = useQuery(['tokenId', wrappr, chainId], () => calculateTokenId(wrappr, chainId), {
    staleTime: 1 * 60 * 1000, // a minute
  })
  const { config, error: isPrepareError } = usePrepareContractWrite({
    addressOrName: wrappr,
    contractInterface: WRAPPR,
    functionName: 'mint',
    chainId: chainId,
    args: [account, tokenId, 1, ethers.constants.HashZero, '', account],
    overrides: {
      value: mintFee,
    },
    onError(error: any) {
      setError(error?.code)
    },
  })
  const { write } = useContractWrite({
    ...config,
  })

  return (
    <Stack>
      <Stack direction={'horizontal'}>
        <Input
          label="Address for Minting"
          hideLabel
          value={account}
          placeholder="Address"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)}
        />
        <Button size="medium" variant="secondary" onClick={() => setAccount('')}>
          <GrPowerReset />
        </Button>
      </Stack>
      <Button onClick={() => write?.()} disabled={!write} width="full">
        Mint
      </Button>
    </Stack>
  )
}
