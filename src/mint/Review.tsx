import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Flex, Button, Checkbox, Text } from '@chakra-ui/react'
import { useAccount, useNetwork, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { StoreT } from './types'
import { ethers } from 'ethers'
import { deployments, WRAPPR } from '../constants'

type ReviewProps = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

const PDFViewer = dynamic(import('./PDFViewer'), { ssr: false })

export default function Review({ store, setStore, setView }: ReviewProps) {
  const [checked, setChecked] = useState(false)
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { config, isError, error } = usePrepareContractWrite({
    addressOrName: chain ? deployments[chain.id][store.minting] : ethers.constants.AddressZero,
    contractInterface: WRAPPR,
    functionName: 'mint',
    args: [address, store.tokenId, 1, ethers.constants.HashZero, '', address],
  })
  const { write } = useContractWrite({
    ...config,
    onSettled(data, error) {
      console.log('Settled', { data, error })
      setStore({
        ...store,
        data: { ...data, ...error },
      })
      setView(3)
    },
  })

  const sources: { [key: string]: string } = {
    delSeries: '/legal/DelLLC.pdf',
    wyoSeries: '/legal/WyLLC.pdf',
    delUNA: '/legal/DelUNA.pdf',
    wyoUNA: '/legal/WyUNA.pdf',
  }

  console.log('store minting', store.minting)
  return (
    <Flex flexDirection="column" gap="10px" justifyContent="center" alignItems="flex-start">
      <PDFViewer src={sources[store.minting]} />
      <Checkbox colorScheme="brand" onChange={() => setChecked(!checked)}>
        I have read and accept the terms of this agreement.
      </Checkbox>
      {checked && isError && <Text width="100%">An error occurred preparing the transaction: {error?.message}</Text>}
      <Button
        type="submit"
        width="100%"
        colorScheme="brand"
        variant="solid"
        borderRadius={'none'}
        disabled={!checked || !write}
        onClick={() => write?.()}
      >
        {!checked ? 'Please agree to the terms.' : 'Confirm Mint'}
      </Button>
    </Flex>
  )
}
