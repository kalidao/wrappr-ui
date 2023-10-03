import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'

type LLC = {
  name: string
}

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
})

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function LLC({ store, setStore, setView }: Props) {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LLC>({
    resolver: zodResolver(schema),
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (message == 'Please connect your wallet') {
      if (isConnected) {
        setMessage('')
      }
    }
  }, [isConnected, message])

  const onSubmit = async (data: LLC) => {
    if (!isConnected) return setMessage('Please connect your wallet')
    if (!chain) return setMessage('Please connect to a network')
    const { name } = data

    if (store.juris === 'de' && chain.id !== 5) {
      const res = await fetch('api/isNameAvailable', {
        method: 'POST',
        body: name,
      }).then((res) => res.json())

      if (res.error) {
        setMessage('We are having trouble checking the name.')
      }

      if (res.isAvailable === false) {
        setMessage('Name is not available. Please choose another one.')
        return
      }
    }

    setStore({
      ...store,
      name: name,
    })

    setView(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        width="full"
        // description={"What's the name of your LLC?"}
        {...register('name')}
        id="name"
        placeholder=" "
        required
        // label="Name"
        // suffix={'LLC'}
        // error={errors.name && errors.name.message}
      />
      <p>{message}</p>
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
