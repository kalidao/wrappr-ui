import { useState } from 'react'
import PDFViewer from '@design/PDFViewer'
import { VStack, Button, Checkbox, Text, IconButton } from '@chakra-ui/react'
import { useAccount, useNetwork, useContractWrite } from 'wagmi'
import { StoreT } from './types'
import { ethers } from 'ethers'
import { deployments, WRAPPR } from '../constants'
import { MdOutlineArrowBack, MdConstruction, MdError, MdSend } from 'react-icons/md'
import getName from './utils/getName'
import { getTokenId } from './getTokenId'

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

type Message = {
  text: string
  icon: React.ReactNode
}

export default function Confirm({ store, setStore, setView }: Props) {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>({
    text: '',
    icon: null,
  })
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const contractAddress = deployments[1][store.juris + store.entity]
  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: contractAddress,
    contractInterface: WRAPPR,
    functionName: 'mint',
  })

  const tx = async () => {
    setLoading(true)
    setMessage({
      text: 'Preparing your transaction...',
      icon: <MdConstruction />,
    })
    if (!isConnected && !chain) return

    // fetching tokenId
    let tokenId = 0
    try {
      if (chain) {
        tokenId = await getTokenId(contractAddress, chain.id)
      } else {
        setMessage({
          text: 'Could not find chainId, please try reconnecting to the network',
          icon: <MdError />,
        })
      }
    } catch (e) {
      console.error(e)
      setMessage({
        text: 'Something went wrong, please try again',
        icon: <MdError />,
      })
      setLoading(false)
    }

    // creating agreement
    try {
    } catch (e) {
      console.error(e)
      setMessage({
        text: 'Something went wrong, please try again',
        icon: <MdError />,
      })
      setLoading(false)
    }
    // building token URI
    try {
    } catch (e) {
      console.error(e)
      setMessage({
        text: 'Something went wrong, please try again',
        icon: <MdError />,
      })
      setLoading(false)
    }
    // sending tx
    try {
      setMessage({
        text: 'Sending your transaction...',
        icon: <MdSend />,
      })
      //   address to,
      //   uint256 id,
      //   uint256 amount,
      //   bytes calldata data,
      //   string calldata tokenURI,
      //   address owner
      const res = await writeAsync({
        recklesslySetUnpreparedArgs: [address, tokenId, 1, ethers.constants.HashZero, '', address],
      })
      await res.wait(1)
      setStore({
        ...store,
        txHash: res.hash,
      })
      setView(3)
    } catch (e) {
      console.error(e)
      setMessage({
        text: 'Something went wrong, please try again',
        icon: <MdError />,
      })
      setLoading(false)
    }

    // success
  }

  return (
    <>
      {loading === false ? (
        <div className="flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              Confirm {getName(store.juris, store.entity)} for {store.name}{' '}
            </h1>
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
          {isConnected ? (
            <Button
              type="submit"
              width="100%"
              colorScheme="brand"
              variant="solid"
              borderRadius={'lg'}
              disabled={!checked}
              onClick={tx}
            >
              {!checked ? 'Please agree to the terms.' : 'Confirm Mint'}
            </Button>
          ) : (
            <Text>Please connect to a wallet.</Text>
          )}
        </div>
      ) : (
        <VStack align="center" justify="center">
          <span>{message.icon}</span>
          <p className="text-center font-semibold text-xl">{message.text}</p>
        </VStack>
      )}
    </>
  )
}

const sources: { [key: string]: string } = {
  deLLC: '/legal/DelLLC.pdf',
  wyLLC: '/legal/WyLLC.pdf',
  deUNA: '/legal/DelUNA.pdf',
  wyUNA: '/legal/WyUNA.pdf',
}
