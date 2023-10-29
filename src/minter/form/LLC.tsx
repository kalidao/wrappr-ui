import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'
import { ViewsEnum, useMinterStore } from '../useMinterStore'
import { Icons } from '~/components/ui/icons'

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
})

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function LLC() {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const { openConnectModal } = useConnectModal()
  const { name, juris, setName, setView } = useMinterStore()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name,
    },
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

    if (juris === 'de' && chain.id !== 5) {
      const res = await fetch('api/isNameAvailable', {
        method: 'POST',
        body: name,
      }).then((res) => res.json())

      if (res.error) {
        setMessage('We are having trouble checking the name.')
        return
      }

      if (res.isAvailable === false) {
        setMessage('Name is not available. Please choose another one.')
        return
      }
    }

    setName(name)
    setView(ViewsEnum.mint)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="wrappr" className="w-3/4" {...field} />
              </FormControl>
              <FormDescription>A unique name for your LLC.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isConnected && openConnectModal ? (
          <Button className="flex items-center justify-between w-3/4 text-xl rounded-xl p-5" onClick={openConnectModal}>
            <span>Login</span>
            <Icons.chevronRight />
          </Button>
        ) : (
          <Button className="flex items-center justify-between w-3/4 text-xl rounded-xl p-5" type="submit">
            <span>Review Document</span>
            <Icons.chevronRight />
          </Button>
        )}
      </form>
    </Form>
  )
}
