import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Box, Button, Input, Stack, Textarea, IconChevronRight } from '@kalidao/reality'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { DateInput } from '@design/DateInput'
import { useState } from 'react'

type TosDao = {
  date: string
  dao_address: string
  dao_name: string
  entity_name: string
  email: string
  privacy_url: string
  jurisdiction: string
}

const schema = z.object({
  dao_address: z.string().min(1, { message: 'An address is required' }),
  dao_name: z.string().min(1, { message: 'A name is required' }),
  entity_name: z.string().min(1, { message: 'A mission is required' }),
  email: z.string().min(1, { message: 'A mission is required' }),
  privacy_url: z.string().min(1, { message: 'A mission is required' }),
  jurisdiction: z.string().min(1, { message: 'A jurisdiction is required' }),
})

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function TosDao({ store, setStore, setView }: Props) {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const [date, setDate] = useState<string>('')
  const { openConnectModal } = useConnectModal()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TosDao>({
    resolver: zodResolver(schema),
  })

  console.log(store)
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let _date = e.target.value

    _date = (Date.parse(_date) / 1000).toString()
    setDate(_date)
  }

  const onSubmit = (data: TosDao) => {
    const { dao_address, dao_name, entity_name, email, privacy_url, jurisdiction } = data

    setStore({
      ...store,
      date: date,
      name: dao_name,
      dao_address: dao_address,
      entity_name: entity_name,
      email: email,
      privacy_url: privacy_url,
      jurisdiction: jurisdiction,
    })

    setView(2)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
      <Stack>
        <Input
          type="text"
          {...register('dao_address')}
          id="dao_address"
          placeholder="0x0000000000000000000000000000000000000000"
          required
          label="DAO Address"
          description=""
        />
        <Input
          type="text"
          {...register('dao_name')}
          id="dao_name"
          placeholder=""
          required
          label="DAO Name"
          description=""
        />
        <Input
          type="text"
          {...register('entity_name')}
          id="entity_name"
          placeholder=""
          required
          label="Name of Legal Entity"
          description=""
        />
        <Input type="email" {...register('email')} id="email" placeholder=" " required label="Email" description="" />
        <Input
          type="text"
          {...register('privacy_url')}
          id="privacy_url"
          placeholder=" "
          required
          label="Link to Privacy Policy"
          description=""
        />
        <Input
          type="text"
          {...register('jurisdiction')}
          id="jurisdiction"
          placeholder=" "
          required
          label="Jurisdiction"
          description=""
        />
        <DateInput label="Date" onChange={handleDate} />
        {!isConnected && openConnectModal ? (
          <Button
            tone="foreground"
            suffix={<IconChevronRight />}
            width="full"
            justifyContent="space-between"
            onClick={openConnectModal}
          >
            Login
          </Button>
        ) : (
          <Button
            tone="foreground"
            suffix={<IconChevronRight />}
            width="full"
            justifyContent="space-between"
            type="submit"
            loading={isSubmitting}
          >
            Review Document
          </Button>
        )}
      </Stack>
    </Box>
  )
}
