import React, { Dispatch, SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { Flex, FormControl, FormLabel, FormErrorMessage, Input, Button, Select } from '@chakra-ui/react'

type Props = {
  setView: Dispatch<SetStateAction<string>>
}

export default function Confirm({ setView }: Props) {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  const mint = () => {}

  const back = () => {
    setView('mint')
  }

  return (
    <Flex
      flexDirection="column"
      gap="10px"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      mr={['1%', '5%', '15%', '25%']}
      ml={['1%', '5%', '15%', '25%']}
    >
      You will be minted a {'Delaware'} {'UNA'}.
      {!address && openConnectModal && (
        <Button onClick={openConnectModal} width="100%" colorScheme="brand" variant="solid" borderRadius={'none'}>
          Connect Wallet to Mint!
        </Button>
      )}
      {isConnected && (
        <Button onClick={mint} width="100%" colorScheme="brand" variant="solid" borderRadius={'none'}>
          Confirm
        </Button>
      )}
    </Flex>
  )
}
