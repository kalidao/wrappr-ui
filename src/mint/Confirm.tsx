import React, { Dispatch, SetStateAction } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { VStack, Button, IconButton, Flex, Text, StackDivider } from '@chakra-ui/react'

import { MintT } from './types'

type Props = {
  setView: Dispatch<SetStateAction<string>>
  data: MintT
}

export default function Confirm({ setView, data }: Props) {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()

  const { name, jurisdiction, type } = data

  const mint = () => {}

  const back = () => {
    setView('mint')
  }

  return (
    <VStack spacing={5} align="stretch" divider={<StackDivider borderColor="gray.200" />}>
      {/* <Choice type={'Name'} value={name} />
      <Choice type={'Entity Type'} value={type === 'llc' ? 'LLC' : 'UNA'} />
      <Choice type={'Jurisdiction'} value={jurisdiction === 'del' ? 'Delaware' : 'Wyoming'} />
      {chain && <Choice type={'Network'} value={chain?.name} />} */}
      <Text>
        You are minting {name} {type === 'llc' ? 'LLC' : 'UNA'} in {jurisdiction === 'del' ? 'Delaware' : 'Wyoming'}
        {chain && ` on ${chain?.name}`}.
      </Text>
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
    </VStack>
  )
}

type ChoiceProps = {
  type: string
  value: string
}

const Choice = ({ type, value }: ChoiceProps) => {
  return (
    <Flex align="center" justify="space-between">
      <Text fontWeight={700}>{type}</Text>
      <Text>{value}</Text>
    </Flex>
  )
}
