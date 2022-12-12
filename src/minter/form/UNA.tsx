import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Stack, Box, Button, Input, Textarea } from '@kalidao/reality'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

type UNA = {
  name: string
  mission: string
}

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
  mission: z.string().min(1, { message: 'A mission is required' }),
})

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function UNA({ store, setStore, setView }: Props) {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UNA>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: UNA) => {
    const { name, mission } = data

    setStore({
      ...store,
      name: name,
      mission: mission,
    })

    setView(2)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
      <Stack>
        <Input
          type="text"
          description={"What's the name of your UNA?"}
          {...register('name')}
          id="name"
          placeholder=" "
          required
          label="Name"
        />

        <Textarea
          id="mission"
          description="What is your mission?"
          {...register('mission')}
          rows={4}
          label="Your Mission"
          placeholder="Which shall primarily be..."
        />

        {!isConnected && openConnectModal ? (
          <Button onClick={openConnectModal} type="submit" width="full" prefix={<BsFillArrowRightCircleFill />}>
            Connect
          </Button>
        ) : (
          <Button prefix={<BsFillArrowRightCircleFill />} type="submit" width="full" loading={isSubmitting}>
            Next
          </Button>
        )}
      </Stack>
    </Box>
  )
}
