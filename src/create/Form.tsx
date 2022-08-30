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
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineDelete } from 'react-icons/ai'

import { useContractWrite, useNetwork } from 'wagmi'
import { ethers } from 'ethers'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { deployments } from '../constants'
import { WRAPPR_FACTORY } from '../constants'
import UploadImage from '../utils/UploadImage'

import { createWrappr } from './createWrappr'
import { StoreC } from './types'

type Create = {
  image: FileList
  name: string
  symbol: string
  description: string
  admin: string
  mintFee: number
  baseURI: string
  agreement: FileList
  attributes: {
    trait_type: string
    value: string
  }[]
}

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
  symbol: z.string().min(1, { message: 'A symbol is required' }),
  description: z.string().min(1, { message: 'A symbol is required' }),
  admin: z.string().min(1, { message: 'An admin is required' }),
  mintFee: z.string(),
  agreement: z.any(),
  attributes: z.any(),
  // image: z.any(),
})

type Props = {
  store: StoreC
  setStore: React.Dispatch<React.SetStateAction<StoreC>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function CreateForm({ store, setStore, setView }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Create>({
    resolver: zodResolver(schema),
    defaultValues: {
      attributes: [{ trait_type: '', value: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'attributes',
    control,
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
    onSuccess(data) {
      if (data !== undefined) {
        setStore({
          ...store,
          hash: data.hash,
        })
        setView(1)
      }
    },
  })

  const onSubmit = async (data: Create) => {
    setSubmitting(true)
    if (image.length === 0) return
    const { name, description, agreement, symbol, mintFee, admin, attributes } = data

    let baseURI
    try {
      baseURI = await createWrappr(name, description, image as unknown as FileList, agreement, attributes)
      if (baseURI) {
        setStore({
          ...store,
          uri: baseURI,
        })
      }
    } catch (e) {
      console.error('Failed to create Wrappr JSON: ', e)
      return
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
      <FormControl>
        <FormLabel htmlFor="image">Image</FormLabel>
        <UploadImage file={image} setFile={setImage} />
        {/* <Input id="image" type="file" {...register('image')} variant="flushed" /> */}
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
      <FormControl as={VStack} align="stretch" isInvalid={Boolean(errors.attributes)}>
        <FormLabel>Traits</FormLabel>
        {fields.map((field, index) => {
          return (
            <HStack key={field.id}>
              <Input
                placeholder="Type"
                {...register(`attributes.${index}.trait_type` as const, {
                  required: true,
                })}
                className={errors?.attributes?.[index]?.trait_type ? 'error' : ''}
              />
              <Input
                placeholder="Value"
                {...register(`attributes.${index}.value` as const, {
                  required: true,
                })}
                className={errors?.attributes?.[index]?.value ? 'error' : ''}
              />
              <IconButton aria-label="Delete Item" onClick={() => remove(index)} colorScheme="red" isRound>
                <AiOutlineDelete />
              </IconButton>
            </HStack>
          )
        })}
        <Button
          onClick={() =>
            append({
              trait_type: '',
              value: '',
            })
          }
        >
          Add
        </Button>
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
