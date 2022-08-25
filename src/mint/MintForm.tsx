import React, { useState } from 'react'
import { Flex, FormControl, FormErrorMessage, Input, Button, Select, Text, useToast } from '@chakra-ui/react'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { ethers } from 'ethers'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { MintT, StoreT } from './types'
import WatchedMint from './WatchedMint'

import { deployments, WRAPPR } from '../constants'

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
    console.log(data)

    const { name, jurisdiction, entity } = data

    if (jurisdiction === 'del' && entity === 'llc') {
      setStore({
        ...store,
        minting: 'delSeries',
      })
    } else if (jurisdiction === 'wyo' && entity === 'llc') {
      setStore({
        ...store,
        minting: 'wyoSeries',
      })
    } else if (jurisdiction === 'del' && entity === 'una') {
      setStore({
        ...store,
        minting: 'delUNA',
      })
    } else if (jurisdiction === 'wyo' && entity === 'una') {
      setStore({
        ...store,
        minting: 'wyoUNA',
      })
    }

    let len = 0
    try {
      const query = deployments[chain.id][type].toLowerCase()

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

    const tokenId = len + 1
    const amount = 1

    // update store
    setView(1)
    setLoading(false)
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
        <Button onClick={openConnectModal} width="100%" colorScheme="brand" variant="solid" borderRadius={'none'}>
          Connect Wallet to Mint!
        </Button>
      )}
      {isConnected && (
        <Button
          type="submit"
          width="100%"
          colorScheme="brand"
          variant="solid"
          borderRadius={'none'}
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
