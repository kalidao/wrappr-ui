import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Box, Button, Input, Stack, Textarea, IconChevronRight } from '@kalidao/reality'
import { StoreT } from '../types'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

type Charter = {
  name: string
  mission: string
  jurisdiction: string
}

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
  mission: z.string().min(1, { message: 'A mission is required' }),
  jurisdiction: z.string().min(1, { message: 'A jurisdiction is required' }),
})

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function Charter({ store, setStore, setView }: Props) {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Charter>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Charter) => {
    const { name, jurisdiction, mission } = data

    setStore({
      ...store,
      name: name,
      mission: mission,
      jurisdiction: jurisdiction,
    })

    setView(2)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
      <Stack>
        <Input type="text" {...register('name')} id="name" placeholder=" " required label="Name" />
        <Input
          type="text"
          {...register('jurisdiction')}
          id="jurisdiction"
          placeholder=" "
          required
          label="Jurisdiction"
          description="What jurisdiction will this Charter be under?"
        />
        <Textarea
          id="mission"
          label="Your Mission"
          {...register('mission')}
          rows={4}
          placeholder="Promote open-source law"
          description="What is the mission of this organisation?"
        />
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
