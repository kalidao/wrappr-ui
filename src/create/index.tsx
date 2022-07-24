import {
  Flex,
  FormControl,
  FormLabel,
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
  const { register, handleSubmit } = useForm<Create>({
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
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input {...register('name')} placeholder="Agreement Name" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="symbol">Symbol</FormLabel>
        <Input {...register('symbol')} placeholder="SYMBOL" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="admin">Admin</FormLabel>
        <Input {...register('admin')} placeholder={ethers.constants.AddressZero} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="mintFee">Minting Fee</FormLabel>
        <NumberInput defaultValue={5} min={0}>
          <NumberInputField {...register('mintFee')} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="baseURI">Base URI</FormLabel>
        <Input {...register('baseURI')} placeholder="ipfs://" />
      </FormControl>
      <Button type="submit" width="100%">
        Create
      </Button>
    </Flex>
  )
}
