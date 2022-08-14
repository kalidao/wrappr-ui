import React, { Dispatch, SetStateAction } from 'react'
import { Flex, FormControl, FormLabel, FormErrorMessage, Input, Button, Select } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { MintT } from './types'

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
  jurisdiction: z.string().min(1, { message: 'Jurisdiction is required' }),
  type: z.string().min(1, { message: 'Entity type is required' }),
})

type Props = {
  setView: Dispatch<SetStateAction<string>>
  setData: Dispatch<SetStateAction<MintT>>
  data: MintT
}

export default function MintForm({ setView, setData, data }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MintT>({
    resolver: zodResolver(schema),
    defaultValues: data,
  })

  const onSubmit = (data: MintT) => {
    console.log(data)
    setData(data)
    setView('confirm')
  }

  return (
    <Flex
      as="form"
      flexDirection="column"
      gap="10px"
      justifyContent="center"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" {...register('name')} placeholder="Name" variant="flushed" />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.jurisdiction)}>
        <FormLabel htmlFor="jurisdiction">Jurisdiction</FormLabel>
        <Select placeholder="Select jurisdiction" variant="flushed" {...register('jurisdiction')}>
          <option value="del">Delaware</option>
          <option value="wyo">Wyoming</option>
        </Select>
        <FormErrorMessage>{errors.jurisdiction && errors.jurisdiction.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.type)}>
        <FormLabel htmlFor="type">Entity Type</FormLabel>
        <Select placeholder="Select entity type" variant="flushed" {...register('type')}>
          <option value="llc">LLC</option>
          <option value="una">UNA</option>
        </Select>
        <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" width="100%" colorScheme="brand" variant="solid" borderRadius={'none'}>
        Mint Legal Entity!
      </Button>
    </Flex>
  )
}
