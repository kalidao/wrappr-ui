import React, { useState, useEffect, useCallback } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Textarea,
} from '@chakra-ui/react'
import styled from './create.module.css'
import { BsUpload } from 'react-icons/bs'

import { useContractWrite, useNetwork } from 'wagmi'
import { ethers } from 'ethers'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDropzone, FileWithPath } from 'react-dropzone'

import { deployments } from '../constants'
import { WRAPPR_FACTORY } from '../constants'
import Image from 'next/image'
import UploadImage from './UploadImage'

import { createWrappr } from './createWrappr'

type Create = {
  name: string
  symbol: string
  description: string
  admin: string
  mintFee: number
  baseURI: string
  image: FileList
  agreement: FileList
}

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
  symbol: z.string().min(1, { message: 'A symbol is required' }),
  description: z.string().min(1, { message: 'A symbol is required' }),
  admin: z.string().min(1, { message: 'An admin is required' }),
  mintFee: z.string(),
  image: z.any(),
  agreement: z.any(),
})

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Create>({
    resolver: zodResolver(schema),
  })
  const [image, setImage] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const { chain } = useNetwork()
  const {
    data: result,
    isError,
    isLoading,
    writeAsync,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: chain ? deployments[chain.id]['factory'] : ethers.constants.AddressZero,
    contractInterface: WRAPPR_FACTORY,
    functionName: 'deployWrappr',
  })

  const onSubmit = async (data: Create) => {
    setSubmitting(true)

    const { name, description, agreement, symbol, mintFee, admin } = data
    let baseURI
    try {
      baseURI = await createWrappr({ name: name, description: description, image: image[0], agreement: agreement[0] })
    } catch (e) {
      console.error('Failed to create Wrappr JSON: ', e)
    }

    try {
      const res = writeAsync({
        recklesslySetUnpreparedArgs: [name, symbol, baseURI, ethers.utils.parseEther(mintFee.toString()), admin],
      })
    } catch (e) {
      console.error('Failed to deploy Wrappr: ', e)
    }
    setSubmitting(false)
  }

  return (
    <Flex
      as="form"
      flexDirection="column"
      gap="10px"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      mr={['1%', '5%', '15%', '25%']}
      ml={['1%', '5%', '15%', '25%']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={Boolean(errors.image)}>
        <FormLabel htmlFor="image">Image</FormLabel>
        <UploadImage file={image} setFile={setImage} />
      </FormControl>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" {...register('name')} placeholder="Agreement Name" variant="flushed" />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.symbol)}>
        <FormLabel htmlFor="symbol">Symbol</FormLabel>
        <Input id="symbol" {...register('symbol')} placeholder="SYMBOL" variant="flushed" />
        <FormErrorMessage>{errors.symbol && errors.symbol.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.description)}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea id="description" placeholder="" variant="outline" borderRadius="none" {...register('description')} />
      </FormControl>
      <FormControl isInvalid={Boolean(errors.admin)}>
        <FormLabel htmlFor="admin">Admin</FormLabel>
        <Input id="admin" {...register('admin')} placeholder={ethers.constants.AddressZero} variant="flushed" />
        <FormErrorMessage>{errors.admin && errors.admin.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.mintFee)}>
        <FormLabel htmlFor="mintFee">Minting Fee</FormLabel>
        <NumberInput id="mintFee" defaultValue={5} min={0} variant="flushed">
          <NumberInputField {...register('mintFee')} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errors.mintFee && errors.mintFee.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.agreement)}>
        <FormLabel htmlFor="agreement">Agreement</FormLabel>
        <Input id="agreement" type="file" {...register('agreement')} variant="flushed" />
      </FormControl>
      <Button
        type="submit"
        width="100%"
        colorScheme="brand"
        variant="solid"
        borderRadius={'none'}
        disabled={submitting}
        isLoading={submitting}
      >
        Create
      </Button>
    </Flex>
  )
}
