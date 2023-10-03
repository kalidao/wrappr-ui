import { useState } from 'react'
import Image from 'next/image'
import PDFViewer from '@design/PDFViewer'
import { useAccount, useNetwork } from 'wagmi'
import { StoreT } from './types'
import { MdConstruction, MdError, MdSend, MdSearch, MdAccessTimeFilled, MdCheckCircle } from 'react-icons/md'
import getName from './utils/getName'
import { createAgreement } from './utils/createAgreement'
import createTokenURI from './utils/createTokenURI'
import { getAgreement } from './utils/getAgreement'
import { calculateTokenId } from '~/utils/calculateTokenId'
import { useMintWrappr } from '~/hooks/useMintWrappr'
import { getEntityAddress } from '~/constants/deployments'
import { parseEther } from 'viem'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { BackButton } from '~/components/back-button'
import { Label } from '~/components/ui/label'

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
  const { writeAsync } = useMintWrappr({
    chainId: chain?.id ?? 1,
  })
  const tx = async () => {
    try {
      setLoading(true)
      setMessage({
        text: 'Preparing your transaction...',
        icon: <MdConstruction />,
      })

      if (!address) {
        throw new Error('Please connect your wallet.')
      }

      if (!chain) {
        throw new Error('Could not find chainId, please try reconnecting to the network')
      }

      // fetching tokenId
      const contractAddress = getEntityAddress(chain.id, store.juris + store.entity)

      let tokenId = 0

      setMessage({
        text: 'Fetching tokenId...',
        icon: <MdSearch />,
      })

      tokenId = await calculateTokenId(contractAddress, Number(chain.id))

      console.log(tokenId, chain.id)

      // creating agreement
      let agreement = getAgreement(store.juris + store.entity)

      setMessage({
        text: 'Creating agreement...',
        icon: <MdConstruction />,
      })
      await createAgreement(
        store.juris + store.entity,
        store.name,
        tokenId.toString(),
        store.mission,
        store.jurisdiction,
        chain.id.toString(),
      )
        .then((res) => {
          agreement = res

          setMessage({
            text: 'Agreement created',
            icon: <MdCheckCircle />,
          })
        })
        .catch((e) => {
          throw new Error(e)
        })

      // building token URI
      let tokenURI = ''

      setMessage({
        text: 'Building token metadata...',
        icon: <MdConstruction />,
      })
      await createTokenURI(store.name, tokenId, store.juris + store.entity, agreement)
        .then((res) => {
          tokenURI = res

          setMessage({
            text: 'Token metadata built',
            icon: <MdCheckCircle />,
          })
        })
        .catch((e) => {
          throw new Error(e)
        })

      // sending tx

      setMessage({
        text: 'Sending your transaction...',
        icon: <MdSend />,
      })

      const receipt = await writeAsync({
        address: contractAddress,
        to: address,
        id: BigInt(tokenId),
        amount: BigInt(1),
        data: '0x',
        tokenURI: tokenURI,
        owner: address,
        value: store.entity === 'LLC' ? parseEther('0.015') : parseEther('0'),
      })

      setMessage({
        text: 'Awaiting confirmation...',
        icon: <MdAccessTimeFilled />,
      })

      setStore({
        ...store,
        agreement: agreement,
        tokenId: tokenId,
        txHash: receipt.transactionHash,
      })
      setView(3)
    } catch (e) {
      console.error(e)

      if (e instanceof Error) {
        setMessage({
          text: e.message,
          icon: <MdError />,
        })
      } else {
        setMessage({
          text: 'Something went wrong, please try again',
          icon: <MdError />,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen flex items-center justify-center p-3 md:p-6">
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col space-y-2">
        {loading === false ? (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Confirm {getName(store.juris, store.entity)} for {store.name}{' '}
              </h2>
              <BackButton onClick={() => setView(1)} />
            </div>
            <PDFViewer src={`/legal/${store.juris + store.entity}.pdf`} />
            <div className="flex items-center justify-between border-t-2 border-foregroundSecondary pt-1">
              <Label className="flex flex-row space-x-2 items-center justify-between">
                <Checkbox onCheckedChange={() => setChecked((checked) => !checked)}></Checkbox>
                <span>I have read and accept the terms of this agreement.</span>
              </Label>
              {isConnected ? (
                <Button
                  // tone="foreground"
                  type="submit"
                  disabled={!checked}
                  onClick={tx}
                >
                  Confirm Mint
                </Button>
              ) : (
                <p>Please connect to a wallet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-20">
            <p className="text-2xl text-foreground text-center">We are working our magic, please be patient</p>
            <p>{message.text}</p>
            <Image src={'/loading.png'} height="150" width="150" alt="Loading..." unoptimized />
          </div>
        )}
      </div>
    </div>
  )
}
