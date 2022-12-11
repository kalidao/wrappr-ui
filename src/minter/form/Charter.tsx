import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button, Input, Textarea } from '@kalidao/reality'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
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
      <div className="relative z-0 mb-6 w-full group">
        <Input type="text" {...register('name')} id="name" placeholder=" " required label="Name" />
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <Input
          type="text"
          {...register('jurisdiction')}
          id="jurisdiction"
          placeholder=" "
          required
          label="Jurisdiction"
        />
      </div>
      <div>
        <Textarea
          id="mission"
          label="Your Mission"
          {...register('mission')}
          rows={4}
          placeholder="Which shall primarily be..."
        />
      </div>
      {!isConnected && openConnectModal ? (
        <Button onClick={openConnectModal} type="submit" width="full" prefix={<BsFillArrowRightCircleFill />}>
          Connect
        </Button>
      ) : (
        <Button prefix={<BsFillArrowRightCircleFill />} type="submit" width="full" loading={isSubmitting}>
          Next
        </Button>
      )}
    </form>
  )
}
