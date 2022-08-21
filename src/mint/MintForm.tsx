import React, { useState } from 'react'
import { Flex, FormControl, FormErrorMessage, Input, Button, Select, Text } from '@chakra-ui/react'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { MintT } from './types'
import WatchedMint from './WatchedMint'

import { deployments, WRAPPR } from '../constants'

const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'A name is required' })
    .max(100, { message: 'Name cannot be longer than 100 characters.' }),
  jurisdiction: z.string().min(1, { message: 'Jurisdiction is required' }),
  type: z.string().min(1, { message: 'Entity type is required' }),
})

export default function MintForm() {
  const [type, setType] = useState('delSeries')
  const [loading, setLoading] = useState(false)
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const {
    data: result,
    isError,
    isLoading,
    writeAsync,
  } = useContractWrite({
    addressOrName: chain ? deployments[chain.id][type] : ethers.constants.AddressZero,
    contractInterface: WRAPPR,
    functionName: 'mint',
  })
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MintT>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'Name',
      jurisdiction: 'del',
      type: 'llc',
    },
  })

  const onSubmit = (data: MintT) => {
    setLoading(true)
    if (!isConnected && !chain) return
    console.log(data)

    const { name, jurisdiction, type } = data

    if (jurisdiction === 'del' && type === 'llc') {
      setType('delSeries')
    } else if (jurisdiction === 'wyo' && type === 'llc') {
      setType('wyoSeries')
    } else if (type === 'una') {
      // TODO: Add jurisdiction to UNA json
      setType('una')
    }

    const tokenId = 3
    const amount = 1
    // TODO: remove hardcoded tokenID
    try {
      console.log('args: ', address, tokenId, amount, ethers.constants.HashZero, '', address, 'contract: ', type)
      const res = writeAsync({
        args: [address, tokenId, amount, ethers.constants.HashZero, '', address],
      })
    } catch (e) {
      console.error('Error minting: ', e)
    }
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
      <FormControl isInvalid={Boolean(errors.type)}>
        {/* <FormLabel htmlFor="type">Entity Type</FormLabel> */}
        <Select placeholder="Select entity type" variant="flushed" {...register('type')}>
          <option value="llc">LLC</option>
          <option value="una">UNA</option>
        </Select>
        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
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
        >
          Confirm
        </Button>
      )}
    </Flex>
  )
}
