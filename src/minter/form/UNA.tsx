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
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
      <Input
        type="text"
        // description={"What's the name of your non-profit?"}
        {...register('name')}
        id="name"
        placeholder=" "
        required
        // label="Name"
      />

      <Textarea
        id="mission"
        // description="What is your mission?"
        {...register('mission')}
        rows={4}
        // label="Your Mission"
        placeholder="Promote open-source law"
      />

      {!isConnected && openConnectModal ? (
        <Button className="flex items-center justify-between w-full" onClick={openConnectModal}>
          <ChevronRightIcon />
          Login
        </Button>
      ) : (
        <Button className="flex items-center justify-between w-full" type="submit">
          <ChevronRightIcon />
          Review Document
        </Button>
      )}
    </form>
  )
}
