import React, { Dispatch, SetStateAction } from 'react'
import { Flex, FormControl, FormLabel, FormErrorMessage, Input, Button, Select } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type Mint = {
  name: string
  jurisdiction: string
  type: string
}

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
  jurisdiction: z.string().min(1, { message: 'Jurisdiction is required' }),
  type: z.string().min(1, { message: 'Entity type is required' }),
})

type Props = {
  setView: Dispatch<SetStateAction<string>>
}

export default function MintForm({ setView }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Mint>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Mint) => {
    console.log(data)
    setView('confirm')
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
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" {...register('name')} placeholder="Name" variant="flushed" />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.jurisdiction)}>
        <FormLabel htmlFor="jurisdiction">Jurisdiction</FormLabel>
        <Select placeholder="Select jurisdiction" variant="flushed">
          <option value="del">Delaware</option>
          <option value="wyo">Wyoming</option>
        </Select>
        <FormErrorMessage>{errors.jurisdiction && errors.jurisdiction.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.type)}>
        <FormLabel htmlFor="type">Entity Type</FormLabel>
        <Select placeholder="Select entity type" variant="flushed">
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
