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

export default function Confirm({ setView }: Props) {
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
  }

  const back = () => {
    setView('mint')
  }

  return (
    <Flex
      flexDirection="column"
      gap="10px"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      mr={['1%', '5%', '15%', '25%']}
      ml={['1%', '5%', '15%', '25%']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button type="submit" width="100%" colorScheme="brand" variant="solid" borderRadius={'none'}>
        Confirm
      </Button>
    </Flex>
  )
}
