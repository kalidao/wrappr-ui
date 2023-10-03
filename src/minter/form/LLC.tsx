import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'

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
  const form = useForm<z.infer<typeof schema>>({
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

  const onSubmit = async (data: z.infer<typeof schema>) => {
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

  return  (<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="wrappr" {...field} />
          </FormControl>
          <FormDescription>
            A unique name for your LLC.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
      {!isConnected && openConnectModal ? (
        <Button className="flex items-center justify-between space-x-2" onClick={openConnectModal}>
          <ChevronRightIcon />
          <span>Login</span>
        </Button>
      ) : (
        <Button className="flex items-center justify-between space-x-2" type="submit">
          <ChevronRightIcon />
         <span>Review Document</span> 
        </Button>
      )}
  </form>
</Form>)

}
