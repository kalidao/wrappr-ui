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
  console.log('store.juris:', store.juris)
  if(store.entity === 'UNA' && store.juris !== 'wy') {
    setStore(prev => ({
      ...prev,
      juris: 'wy'
    }));
  }
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
          <Stack>
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Text size="headingTwo" color="foreground">
                {'Confirm '}
                {store.entity === 'UNA'
                  ? store.entity
                  : store.juris === 'mi'
                  ? 'Marshall Islands ' + store.entity
                  : getName(store.juris, store.entity) + ' '}
                {' for ' + store.name}
              </Text>
              <Button onClick={() => setView(1)} aria-label="Go back!" variant="transparent" shape="circle">
                <IconArrowLeft />
              </Button>
            </Stack>
            {/* Same here, pdf wasn't loading */}
            <PDFViewer src={`/legal/${store.entity === 'UNA' ? 'wyUNA' : store.juris + store.entity}.pdf`} />
            <Box
              display="flex"
              alignItems={'center'}
              justifyContent="space-between"
              borderTopWidth={'0.375'}
              borderColor="foregroundSecondary"
              paddingTop="1"
            >
              <Checkbox
                variant="transparent"
                label={<Text>I have read and accept the terms of this agreement.</Text>}
                onCheckedChange={() => setChecked(!checked)}
              ></Checkbox>
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
