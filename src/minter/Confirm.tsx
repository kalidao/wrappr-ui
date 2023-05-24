import { useState } from 'react'
import Image from 'next/image'
import PDFViewer from '@design/PDFViewer'
import { Stack, Box, Checkbox, Text, Button, IconArrowLeft } from '@kalidao/reality'
import { useAccount, useNetwork, useContractWrite } from 'wagmi'
import { StoreT } from './types'
import { ethers } from 'ethers'
import { deployments, WRAPPR } from '../constants'
import { MdConstruction, MdError, MdSend, MdSearch, MdAccessTimeFilled, MdCheckCircle } from 'react-icons/md'
import getName from './utils/getName'
import { createAgreement } from './utils/createAgreement'
import createTokenURI from './utils/createTokenURI'
import { getAgreement } from './utils/getAgreement'
import { calculateTokenId } from '~/utils/calculateTokenId'
import { calculateTokenIdonQ } from '~/utils/calculateTokenIdonQ'

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
  const contractAddress = deployments[1][(store.juris + store.entity) as keyof (typeof deployments)[1]] as string
  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: contractAddress,
    contractInterface: WRAPPR,
    functionName: 'mint',
  })

  const { writeAsync: writeAsyncQtest } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: deployments[35443][(store.juris + store.entity) as keyof (typeof deployments)[35443]] as string,
    contractInterface: WRAPPR,
    functionName: 'mint',
  })

  const { writeAsync: writeAsyncQ } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: deployments[35441][(store.juris + store.entity) as keyof (typeof deployments)[35441]] as string,
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
    if (chain) {
      // fetching tokenId
      let tokenId = 0
      try {
        setMessage({
          text: 'Fetching tokenId...',
          icon: <MdSearch />,
        })

        if (chain.id == 35443) {
          tokenId = await calculateTokenIdonQ(
            deployments[35443][(store.juris + store.entity) as keyof (typeof deployments)[35443]] as string,
          )
        } else {
          tokenId = await calculateTokenId(contractAddress as string, Number(chain.id))
        }

        console.log(tokenId, chain.id)
      } catch (e) {
        console.error(e)
        setMessage({
          text: 'Something went wrong, please try again',
          icon: <MdError />,
        })
        setLoading(false)
      }
      // creating agreement
      let agreement = getAgreement(store.juris + store.entity)
      try {
        setMessage({
          text: 'Creating agreement...',
          icon: <MdConstruction />,
        })
        const res = await createAgreement(
          store.juris + store.entity,
          store.name,
          tokenId.toString(),
          store.mission,
          store.jurisdiction,
          chain.id.toString(),
        )

        if (typeof res === 'string') {
          agreement = res
          setMessage({
            text: 'Agreement created',
            icon: <MdCheckCircle />,
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

      // building token URI
      let tokenURI = ''
      try {
        setMessage({
          text: 'Building token metadata...',
          icon: <MdConstruction />,
        })
        const res = await createTokenURI(store.name, tokenId, store.juris + store.entity, agreement)
        if (res) {
          tokenURI = res
        }
      } catch (e) {
        console.error(e)
        setMessage({
          text: 'Something went wrong, please try again',
          icon: <MdError />,
        })
        setLoading(false)
      }

      // sending tx
      let res
      try {
        setMessage({
          text: 'Sending your transaction...',
          icon: <MdSend />,
        })

        if (store.entity === 'LLC') {
          if (chain.id == 35443) {
            res = await writeAsyncQtest({
              recklesslySetUnpreparedArgs: [address, tokenId, 1, ethers.constants.HashZero, tokenURI, address],
            })
          } else {
            res = await writeAsync({
              recklesslySetUnpreparedArgs: [address, tokenId, 1, ethers.constants.HashZero, tokenURI, address],
              recklesslySetUnpreparedOverrides: {
                value: ethers.utils.parseEther('0.015'),
              },
            })
          }
        } else {
          if (chain.id == 35443) {
            res = await writeAsyncQtest({
              recklesslySetUnpreparedArgs: [address, tokenId, 1, ethers.constants.HashZero, tokenURI, address],
            })
          } else {
            res = await writeAsync({
              recklesslySetUnpreparedArgs: [address, tokenId, 1, ethers.constants.HashZero, tokenURI, address],
            })
          }
        }

        setMessage({
          text: 'Awaiting confirmation...',
          icon: <MdAccessTimeFilled />,
        })
        // success
        await res.wait(1)
        setStore({
          ...store,
          agreement: agreement,
          tokenId: tokenId,
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
    } else {
      setMessage({
        text: 'Could not find chainId, please try reconnecting to the network',
        icon: <MdError />,
      })
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={'center'}
      padding={{
        xs: '3',
        md: '6',
      }}
    >
      <Box
        width={{
          xs: 'full',
          md: '3/4',
          lg: '1/2',
        }}
      >
        {loading === false ? (
          <Stack>
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Text size="headingTwo" color="foreground">
                Confirm {getName(store.juris, store.entity)} for {store.name}{' '}
              </Text>
              <Button onClick={() => setView(1)} aria-label="Go back!" variant="transparent" shape="circle">
                <IconArrowLeft />
              </Button>
            </Stack>
            <PDFViewer src={`/legal/${store.juris + store.entity}.pdf`} />
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
                <Button tone="foreground" type="submit" disabled={!checked} onClick={tx}>
                  Confirm Mint
                </Button>
              ) : (
                <Text>Please connect to a wallet.</Text>
              )}
            </Box>
          </Stack>
        ) : (
          <Stack align="center" justify="center" space="20">
            <Text size="headingOne" color="foreground" align="center">
              We are working our magic, please be patient
            </Text>
            <Text size="headingThree" color="text">
              {message.text}
            </Text>
            <Image src={'/loading.png'} height="150px" width="150px" unoptimized />
          </Stack>
        )}
      </Box>
    </Box>
  )
}
