import { Flex, Text, Button, Spinner, Input, useToast } from '@chakra-ui/react'
import { useAccount, useContractWrite } from 'wagmi'
import { WRAPPR } from '../constants'
import { useState } from 'react'
import { ethers } from 'ethers'
export default function MintWrappr({ chainId, wrappr }: { chainId: number; wrappr: string }) {
  const { address, isConnected } = useAccount()
  const { data, writeAsync, isSuccess, isError, error } = useContractWrite({
    addressOrName: wrappr,
    contractInterface: WRAPPR,
    functionName: 'mint',
    chainId: chainId,
  })
  const [account, setAccount] = useState(isConnected ? address : '')
  const toast = useToast()

  const mint = async () => {
    const res = writeAsync({ args: [account, 3, 1, ethers.constants.HashZero, '', account] })
    console.log('address', res)
  }

  if (isSuccess) {
    toast({
      title: 'Minting!.',
      description: 'Your NFT has been successfully minted.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  if (isError) {
    toast({
      title: 'Oops!.',
      description: `There was an error minting your NFT. 
                        ${error}`,
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <Flex direction="column" gap={1}>
      <Flex>
        <Input defaultValue={account} placeholder="Address" borderTopRightRadius={0} borderBottomRightRadius={0} />
        <Button borderTopLeftRadius={0} borderBottomLeftRadius={0}>
          Switch
        </Button>
      </Flex>
      <Button onClick={mint}>Mint</Button>
    </Flex>
  )
}
