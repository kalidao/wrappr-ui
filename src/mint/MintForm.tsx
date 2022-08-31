import React, { useState } from 'react'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Select,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { MintT, StoreT } from './types'
import { deployments } from '../constants'
import WatchedMint from './WatchedMint'
import createURI from './createURI'

const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'A name is required' })
    .max(100, { message: 'Name cannot be longer than 100 characters.' }),
  jurisdiction: z.string().min(1, { message: 'Jurisdiction is required' }),
  entity: z.string().min(1, { message: 'Entity type is required' }),
})

type MintFormProps = {
  setView: React.Dispatch<React.SetStateAction<number>>
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
}

export default function MintForm({ setView, store, setStore }: MintFormProps) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MintT>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: store.name,
      jurisdiction: store.minting.slice(0, 3),
      entity: store.minting.slice(3, 4)[0] === 'U' ? 'una' : 'llc',
    },
  })

  const onSubmit = async (data: MintT) => {
    setLoading(true)
    if (!isConnected || !chain) return

    const { name, jurisdiction, entity } = data

    let id: number
    let uri: string
    if (jurisdiction === 'del' && entity === 'llc') {
      id = await getTokenId('delSeries')
      uri = await createURI(name, Number(id), 'delSeries')
      setStore({
        ...store,
        tokenId: id,
        minting: 'delSeries',
        uri: uri,
      })
    } else if (jurisdiction === 'wyo' && entity === 'llc') {
      id = await getTokenId('wyoSeries')
      uri = await createURI(name, Number(id), 'wyoSeries')
      setStore({
        ...store,
        tokenId: id,
        minting: 'wyoSeries',
        uri: uri,
      })
    } else if (jurisdiction === 'del' && entity === 'una') {
      id = await getTokenId('delUNA')
      uri = await createURI(name, Number(id), 'delUNA')
      setStore({
        ...store,
        tokenId: id,
        minting: 'delUNA',
        uri: uri,
      })
    } else if (jurisdiction === 'wyo' && entity === 'una') {
      id = await getTokenId('wyoUNA')
      uri = await createURI(name, Number(id), 'wyoUNA')
      setStore({
        ...store,
        tokenId: id,
        minting: 'wyoUNA',
        uri: uri,
      })
    }

    setView(1)
    setLoading(false)
  }

  const getTokenId = async (x: string) => {
    let len = 0
    if (chain !== undefined) {
      try {
        const query = deployments[chain.id][x].toLowerCase()

        const result = await fetch('https://api.thegraph.com/subgraphs/name/nerderlyne/wrappr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query {
              collections(where: {
                wrappr: "${query}"
              }) {
                id
                wrappr {
                  id
                  name
                }
                collectionId
                owner
              }
            }`,
          }),
        }).then((res) => res.json())
        len = result['data']['collections'].length
      } catch (e) {
        console.error('Error fetching collections', e)
      }
      return Number(len) + 1
    } else {
      return 0
    }
  }

  return (
    <Flex
      as="form"
      flexDirection="column"
      gap="10px"
      justifyContent="center"
      alignItems="flex-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={Boolean(errors.name)}>
        {/* <FormLabel htmlFor="name">Name</FormLabel> */}
        <Input id="name" {...register('name')} placeholder="Name" variant="flushed" />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.jurisdiction)}>
        {/* <FormLabel htmlFor="jurisdiction">Jurisdiction</FormLabel> */}
        <Select placeholder="Select jurisdiction" variant="flushed" {...register('jurisdiction')}>
          <option value="del">Delaware</option>
          <option value="wyo">Wyoming</option>
        </Select>
        <FormErrorMessage>{errors.jurisdiction && errors.jurisdiction.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.entity)}>
        {/* <FormLabel htmlFor="type">Entity Type</FormLabel> */}
        <Select placeholder="Select entity type" variant="flushed" {...register('entity')}>
          <option value="llc">LLC</option>
          <option value="una">UNA</option>
        </Select>
        <FormErrorMessage>{errors.entity && errors.entity.message}</FormErrorMessage>
      </FormControl>
      <WatchedMint control={control} />
      {!isConnected && openConnectModal && (
        <Button
          onClick={openConnectModal}
          type="submit"
          width="100%"
          colorScheme="brand"
          variant="solid"
          borderRadius={'lg'}
          rightIcon={<BsFillArrowRightCircleFill />}
        >
          Connect
        </Button>
      )}
      {isConnected && (
        <Button
          type="submit"
          width="100%"
          colorScheme="brand"
          variant="solid"
          borderRadius={'lg'}
          disabled={loading}
          isLoading={loading}
          rightIcon={<BsFillArrowRightCircleFill />}
        >
          Next
        </Button>
      )}
    </Flex>
  )
}
