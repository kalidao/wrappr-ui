import { Flex, Text, Button, Spinner, Input, useToast } from '@chakra-ui/react'
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import { WRAPPR } from '../constants'
import { useState } from 'react'
import { ethers } from 'ethers'
import { GrPowerReset } from 'react-icons/gr'

export default function MintWrapprNFT({
  chainId,
  tokenId,
  wrappr,
}: {
  chainId: number
  tokenId: number
  wrappr: string
}) {
  const toast = useToast()
  const { address, isConnected } = useAccount()
  const [account, setAccount] = useState(isConnected ? address : '')
  const { config, error } = usePrepareContractWrite({
    addressOrName: wrappr,
    contractInterface: WRAPPR,
    functionName: 'mint',
    chainId: chainId,
    args: [account, tokenId, 1, ethers.constants.HashZero, '', account],
  })
  const { write } = useContractWrite({
    ...config,
    onError(error: any) {
      toast({
        title: 'Oops! There was an error minting your NFT.',
        description: error?.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
    onSuccess() {
      toast({
        title: 'Minting!.',
        description: 'Your NFT has been successfully minted.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    },
  })

  console.log('error', error)

  return (
    <Flex direction="column" gap={1}>
      <Flex>
        <Input
          value={account}
          placeholder="Address"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)}
        />
        <Button borderTopLeftRadius={0} borderBottomLeftRadius={0} onClick={() => setAccount('')}>
          <GrPowerReset />
        </Button>
      </Flex>
      <Button onClick={() => write?.()} variant="solid" colorScheme="brand" disabled={!write}>
        Mint
      </Button>
    </Flex>
  )
}
