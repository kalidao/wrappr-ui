import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { createAgreement } from '../utils/createAgreement'
import { StoreT } from '../types'
import { useNetwork, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { getTokenId } from '../getTokenId'

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
