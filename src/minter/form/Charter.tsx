import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button, FormLabel, Input, Textarea } from '@chakra-ui/react'
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
    console.log('Charter data: ', data)
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
        <Input
          type="text"
          {...register('name')}
          id="name"
          placeholder=" "
          required
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none peer"
          variant="flushed"
          colorScheme="brand"
        />
        <FormLabel
          htmlFor="name"
          fontSize="sm"
          colorScheme="gray"
          className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </FormLabel>
      </div>
      <div className="relative z-0 mb-6 w-full group">
        <Input
          type="text"
          {...register('jurisdiction')}
          id="jurisdiction"
          placeholder=" "
          required
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none peer"
          variant="flushed"
          colorScheme="brand"
        />
        <FormLabel
          htmlFor="jurisdiction"
          fontSize="sm"
          colorScheme="gray"
          className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Jurisdiction
        </FormLabel>
      </div>
      <div>
        <FormLabel htmlFor="mission" colorScheme={'gray'} fontSize="sm">
          Your mission
        </FormLabel>
        <Textarea
          id="mission"
          {...register('mission')}
          rows={4}
          colorScheme="brand"
          variant="unstyled"
          placeholder="Which shall primarily be..."
        />
      </div>
      {!isConnected && openConnectModal ? (
        <Button
          onClick={openConnectModal}
          type="submit"
          width="100%"
          colorScheme="brand"
          variant="solid"
          borderRadius={'lg'}
          rightIcon={<BsFillArrowRightCircleFill />}
        >
          Connect
        </Button>
      ) : (
        <Button rightIcon={<BsFillArrowRightCircleFill />} type="submit" width="100%" isLoading={isSubmitting}>
          Next
        </Button>
      )}
    </form>
  )
}
