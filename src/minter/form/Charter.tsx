import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { ChevronRightIcon } from '@radix-ui/react-icons'

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
  const { address, isConnected, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
      <Input
        type="text"
        {...register('name')}
        id="name"
        placeholder=" "
        required
        // label="Name"
      />
      <Input
        type="text"
        {...register('jurisdiction')}
        id="jurisdiction"
        placeholder=" "
        required
        // label="Jurisdiction"
        // description="What jurisdiction will this Charter be under?"
      />
      <Textarea
        id="mission"
        // label="Your Mission"
        {...register('mission')}
        rows={4}
        placeholder="Promote open-source law"
        // description="What is the mission of this organization?"
      />
      {!isConnected && openConnectModal ? (
        <Button className="flex items-center justify-between w-full" onClick={openConnectModal}>
          <ChevronRightIcon />
          Login
        </Button>
      ) : (
        <Button type="submit" className="flex items-center justify-between w-full">
          <ChevronRightIcon />
          Review Document
        </Button>
      )}
    </form>
  )
}
