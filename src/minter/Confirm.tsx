import { useState } from 'react'
import Image from 'next/image'
import PDFViewer from '@design/PDFViewer'
import { useAccount, useNetwork } from 'wagmi'
import { MdConstruction, MdError, MdSend, MdSearch, MdAccessTimeFilled, MdCheckCircle } from 'react-icons/md'
import getName, { getPdfName } from './utils/getName'
import { createAgreement } from './utils/createAgreement'
import createTokenURI from './utils/createTokenURI'
import { getAgreement } from './utils/getAgreement'
import { calculateTokenId } from '~/utils/calculateTokenId'
import { useMintWrappr } from '~/hooks/useMintWrappr'
import { getEntityAddress } from '~/constants/deployments'
import { parseEther } from 'viem'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { ViewsEnum, useMinterStore } from './useMinterStore'
import { BackButton } from '~/components/back-button'

type Message = {
  text: string
  icon: React.ReactNode
}

export default function Confirm() {
  const { entity, juris, name, mission, setTokenId, setAgreement, setTxHash, setView, setError } = useMinterStore()
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

      if (!juris || !entity) {
        throw new Error('Could not find entity or jurisdiction, please try again.')
      }

      // fetching tokenId
      const contractAddress = getEntityAddress(chain.id, juris + entity)

      let tokenId = 0

      setMessage({
        text: 'Fetching tokenId...',
        icon: <MdSearch />,
      })

      tokenId = await calculateTokenId(contractAddress, Number(chain.id))

      console.log(tokenId, chain.id)
      setTokenId(tokenId)

      // creating agreement
      let agreement = getAgreement(juris + entity)

      setMessage({
        text: 'Creating agreement...',
        icon: <MdConstruction />,
      })
      await createAgreement(juris! + entity!, name, tokenId.toString(), mission, chain.id.toString())
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
      await createTokenURI(name, tokenId, juris + entity, agreement)
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
        value: entity === 'LLC' ? parseEther('0.015') : parseEther('0'),
      })

      setMessage({
        text: 'Awaiting confirmation...',
        icon: <MdAccessTimeFilled />,
      })

      setTokenId(tokenId)
      setAgreement(agreement)
      setTxHash(receipt.transactionHash)
      setView(ViewsEnum.success)
    } catch (e) {
      console.error(e)
      // @TODO handle User rejected the request
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('Something went wrong, please try again.')
      }
      setView(ViewsEnum.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen flex items-center justify-center p-3 md:p-6">
      <div className="w-full md:w-3/4 lg:w-1/2 flex flex-col space-y-2">
        {loading === false ? (
          <div>
            <div className="flex flex-col justify-start items-start space-y-2 border-b">
              <BackButton
                onClick={() =>
                  setView(entity === 'UNA' ? ViewsEnum.wyUNA : juris == 'de' ? ViewsEnum.deLLC : ViewsEnum.miLLC)
                }
              />
              <h2 className="scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
                {`Confirm ${getName(juris!, entity!)} for ${name}`}
              </h2>
            </div>
            <div>
              <PDFViewer src={`/legal/${getPdfName(juris!, entity!)}.pdf`} />
              <div className="flex items-center justify-between border-t-2 border-foregroundSecondary pt-3">
                <div className="items-top flex space-x-2">
                  <Checkbox id="terms" checked={checked} onCheckedChange={() => setChecked(!checked)} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">I have read and accept the terms of this agreement.</p>
                  </div>
                </div>
                {isConnected ? (
                  <Button type="submit" disabled={!checked} onClick={tx}>
                    Confirm Mint
                  </Button>
                ) : (
                  <p>Please connect to a wallet.</p>
                )}
              </div>
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
