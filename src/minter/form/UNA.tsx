import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@chakra-ui/react'
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
    console.log('UNA data: ', data)
    const { name, mission } = data

    setStore({
      ...store,
      name: name,
    })

    setView(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col space-y-4">
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          {...register('name')}
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>
      <div>
        <label htmlFor="mission" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-400">
          Your mission
        </label>
        <textarea
          id="mission"
          {...register('mission')}
          rows={4}
          className="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50 rounded-lg border border-brand-300 focus:ring-brand-500 focus:border-brand-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-brand-500 dark:focus:border-brand-500"
          placeholder="Which shall primarily be..."
        ></textarea>
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
