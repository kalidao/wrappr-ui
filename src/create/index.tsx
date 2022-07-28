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
} from '@chakra-ui/react'

import { useContractWrite } from 'wagmi'
import { ethers } from 'ethers'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { deployments } from '../constants'
import { WRAPPR_FACTORY } from '../constants'

type Create = {
  name: string
  symbol: string
  admin: string
  mintFee: number
  baseURI: string
}

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    symbol: yup.string().required(),
    admin: yup.string().required(),
    mintFee: yup.number().required(),
    baseURI: yup.string().required(),
  })
  .required()

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Create>({
    resolver: yupResolver(schema),
  })
  const {
    data: result,
    isError,
    isLoading,
    writeAsync,
  } = useContractWrite({
    addressOrName: deployments[4]['factory'],
    contractInterface: WRAPPR_FACTORY,
    functionName: 'deployWrappr',
  })

  const onSubmit = (data: Create) => {
    console.log(data)
    const { name, symbol, baseURI, mintFee, admin } = data

    try {
      const res = writeAsync({
        args: [name, symbol, baseURI, ethers.utils.parseEther(mintFee.toString()), admin],
      })
    } catch (e) {
      console.error(e)
    }
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
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" {...register('name')} placeholder="Agreement Name" variant="flushed" />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.symbol}>
        <FormLabel htmlFor="symbol">Symbol</FormLabel>
        <Input id="symbol" {...register('symbol')} placeholder="SYMBOL" variant="flushed" />
        <FormErrorMessage>{errors.symbol && errors.symbol.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.admin}>
        <FormLabel htmlFor="admin">Admin</FormLabel>
        <Input id="admin" {...register('admin')} placeholder={ethers.constants.AddressZero} variant="flushed" />
        <FormErrorMessage>{errors.admin && errors.admin.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.mintFee}>
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
      <FormControl isInvalid={errors.baseURI}>
        <FormLabel htmlFor="baseURI">Base URI</FormLabel>
        <Input {...register('baseURI')} placeholder="ipfs://" variant="flushed" />
        <FormErrorMessage>{errors.baseURI && errors.baseURI.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" width="100%" colorScheme="brand" variant="solid" borderRadius={'none'}>
        Create
      </Button>
    </Flex>
  )
}
