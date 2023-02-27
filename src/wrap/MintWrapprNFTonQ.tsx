import { Stack, Button, Input } from '@kalidao/reality'
import { useAccount, useSigner, useContract, usePrepareContractWrite, useContractWrite, useQuery } from 'wagmi'
import { WRAPPR } from '../constants'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { GrPowerReset } from 'react-icons/gr'

export default function MintWrapprNFTonQ({
  chainId,
  wrappr,
  mintFee,
}: {
  chainId: number
  wrappr: string
  mintFee: any
}) {
  const [error, setError] = useState('')
  const { address, isConnected } = useAccount()
  const { data: signer } = useSigner()
  const [account, setAccount] = useState(isConnected ? address : '')
  const [freeId, setFreeId] = useState<number>()

  const wrapprInstance = useContract({
    addressOrName: wrappr,
    contractInterface: WRAPPR,
    signerOrProvider: signer,
  })

  const { config, error: isPrepareError } = usePrepareContractWrite({
    addressOrName: wrappr,
    contractInterface: WRAPPR,
    functionName: 'mint',
    chainId: chainId,
    args: [account, freeId, 1, ethers.constants.HashZero, '', account],
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

  useEffect(() => {
    const getFreeId = async () => {
      console.log(wrapprInstance)
      if (!wrapprInstance) {
        return
      }

      const dummyCount = 20
      let i = 0
      while (i < dummyCount) {
        try {
          const owner = await wrapprInstance.ownerOf(i)
          console.log('id owner', owner)

          if (owner == ethers.constants.AddressZero) {
            setFreeId(i)
            break
          }
        } catch (e) {
          console.log(e)
        }

        i++
      }
    }

    getFreeId()
  }, [wrapprInstance])

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
