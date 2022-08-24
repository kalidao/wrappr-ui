import React, { useState } from 'react'
import { Flex, FormControl, FormErrorMessage, Input, Button, Select, Text, useToast } from '@chakra-ui/react'
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
  entity: z.string().min(1, { message: 'Entity type is required' }),
})

export default function MintForm() {
  const toast = useToast()
  const [type, setType] = useState('delSeries')
  const [loading, setLoading] = useState(false)
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const { write } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: chain ? deployments[chain.id][type] : ethers.constants.AddressZero,
    contractInterface: WRAPPR,
    functionName: 'mint',
    onError(error) {
      toast({
        title: 'Error minting!',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
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
      entity: 'llc',
    },
  })

  const onSubmit = async (data: MintT) => {
    setLoading(true)
    if (!isConnected || !chain) return
    console.log(data)

    const { name, jurisdiction, entity } = data

    if (jurisdiction === 'del' && entity === 'llc') {
      setType('delSeries')
    } else if (jurisdiction === 'wyo' && entity === 'llc') {
      setType('wyoSeries')
    } else if (jurisdiction === 'del' && entity === 'una') {
      setType('delUNA')
    } else if (jurisdiction === 'wyo' && entity === 'una') {
      setType('wyoUNA')
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

    try {
      console.log('args: ', address, tokenId, amount, ethers.constants.HashZero, '', address, 'contract: ', type)
      const res = write({
        recklesslySetUnpreparedArgs: [address, tokenId, amount, ethers.constants.HashZero, '', address],
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
        >
          Confirm
        </Button>
      )}
    </Flex>
  )
}
