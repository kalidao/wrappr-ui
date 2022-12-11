import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button, Input } from '@kalidao/reality'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-1">
      <div className="relative z-0 mb-6 w-full group">
        <Input
          type="text"
          {...register('name')}
          id="name"
          placeholder=" "
          required
          label="Name"
          error={errors.name && errors.name.message}
        />
      </div>
      {message}
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
