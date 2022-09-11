import { useState } from 'react'
import PDFViewer from '@design/PDFViewer'
import { Flex, Button, Checkbox, Text, IconButton } from '@chakra-ui/react'
import { useAccount, useNetwork, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { StoreT } from './types'
import { ethers } from 'ethers'
import { deployments, WRAPPR } from '../constants'
import { MdOutlineArrowBack } from 'react-icons/md'

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function Confirm({ store, setStore, setView }: Props) {
  const [checked, setChecked] = useState(false)
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { config, isError, error } = usePrepareContractWrite({
    addressOrName: chain ? deployments[chain.id][store.juris + store.entity] : ethers.constants.AddressZero,
    contractInterface: WRAPPR,
    functionName: 'mint',
    args: [address, store.tokenId, 1, ethers.constants.HashZero, store.uri, address],
  })

  const { write } = useContractWrite({
    ...config,
    onSuccess(data) {
      if (data !== undefined) {
        setStore({
          ...store,
          data: data.hash,
        })
        setView(3)
      }
    },
  })

  return (
    <div className="flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Confirm Delaware LLC for {store.name} </h1>
        <IconButton
          variant="ghost"
          maxWidth={1}
          colorScheme={'brand'}
          onClick={() => setView(1)}
          aria-label="Go back!"
          icon={<MdOutlineArrowBack />}
          isRound
        />
      </div>
      <PDFViewer src={sources[store.juris + store.entity]} />
      <Checkbox colorScheme="brand" onChange={() => setChecked(!checked)}>
        I have read and accept the terms of this agreement.
      </Checkbox>
      {checked && isError && <Text width="100%">An error occurred preparing the transaction: {error?.message}</Text>}
      <Button
        type="submit"
        width="100%"
        colorScheme="brand"
        variant="solid"
        borderRadius={'lg'}
        disabled={!checked || !write}
        onClick={() => write?.()}
      >
        {!checked ? 'Please agree to the terms.' : 'Confirm Mint'}
      </Button>
    </div>
  )
}

const sources: { [key: string]: string } = {
  deLLC: '/legal/DelLLC.pdf',
  wyLLC: '/legal/WyLLC.pdf',
  deUNA: '/legal/DelUNA.pdf',
  wyUNA: '/legal/WyUNA.pdf',
}
