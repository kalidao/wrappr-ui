import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { StoreT } from '../types'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { ViewsEnum, useMinterStore } from '../useMinterStore'
import { Icons } from '~/components/ui/icons'

const UNASchema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
  mission: z.string().min(1, { message: 'A mission is required' }),
})

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function UNA() {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { name, setName, mission, setMission, setView } = useMinterStore()
  const form = useForm<z.infer<typeof UNASchema>>({
    resolver: zodResolver(UNASchema),
    defaultValues: {
      name: name,
      mission: mission,
    },
  })

  const onSubmit = async (data: z.infer<typeof UNASchema>) => {
    const { name, mission } = data

    setName(name)
    setMission(mission)
    setView(ViewsEnum.mint)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>What&apos;s the name of your non-profit?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Mission</FormLabel>
              <FormControl>
                <Textarea placeholder="Promote open-source law" className="resize-y" {...field} />
              </FormControl>
              <FormDescription>What is your mission?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isConnected && openConnectModal ? (
          <Button type="button" className="flex items-center py-3 justify-between w-full" onClick={openConnectModal}>
            Login
            <Icons.chevronRight />
          </Button>
        ) : (
          <Button type="submit" className="flex items-center py-3 justify-between w-full">
            Review Document
            <Icons.chevronRight />
          </Button>
        )}
      </form>
    </Form>
  )
}
