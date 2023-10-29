import React, { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

import { useAccount, useNetwork } from 'wagmi'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { createWrappr } from './createWrappr'
import { StoreC } from './types'
import { checkName } from './checkName'
import Loader from './Loader'
import { useDeployWrappr } from '~/hooks/useDeployWrappr'
import { getAddress, parseEther, zeroAddress } from 'viem'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

type Create = {
  image: FileList
  name: string
  symbol: string
  description: string
  admin: string
  mintFee: number
  baseURI: string
  agreement: FileList
  attributes: {
    trait_type: string
    value: string
  }[]
}

const schema = z.object({
  name: z.string().min(1, { message: 'A name is required' }),
  symbol: z.string().min(1, { message: 'A symbol is required' }),
  description: z.string().min(1, { message: 'A symbol is required' }),
  admin: z.string().min(1, { message: 'An admin is required' }),
  mintFee: z.string(),
  agreement: z.any(),
  attributes: z.any(),
  // image: z.any(),
})

type Props = {
  store: StoreC
  setStore: React.Dispatch<React.SetStateAction<StoreC>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function CreateForm({ store, setStore, setView }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Create>({
    resolver: zodResolver(schema),
    defaultValues: {
      attributes: [{ trait_type: '', value: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'attributes',
    control,
  })
  const [agreement, setAgreement] = useState<File>()
  const [image, setImage] = useState<File>()
  const [submitting, setSubmitting] = useState(false)
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const { writeAsync } = useDeployWrappr({
    chainId: chain?.id,
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (data: Create) => {
    setSubmitting(true)
    setMessage('Checking summoning variables...')
    try {
      if (!isConnected) {
        throw new Error('Please connect your wallet.')
      }
      if (!chain) {
        throw new Error('Please select a network.')
      }
      if (!image) {
        throw new Error('Please upload an image.')
      }
      if (!agreement) {
        throw new Error('Please upload an agreement.')
      }

      const { name, description, symbol, mintFee, admin, attributes } = data

      setMessage('Checking name collision...')
      if (chain) {
        const res = await checkName(name, chain?.id)
        if (res.isError) {
          throw new Error(res.error)
        } else {
          if (!res.available) {
            setMessage('')
            throw new Error(res.error)
          }
        }
      }

      setMessage('Creating the Wrappr...')
      const baseURI = await createWrappr(name, description, image, agreement, attributes)

      setMessage('Summoning the Wrappr...')
      setStore({
        ...store,
        uri: baseURI as string,
      })

      const res = await writeAsync({
        name,
        symbol,
        mintFee: parseEther(mintFee.toString()),
        admin: getAddress(admin),
        baseURI: baseURI as string,
        chainId: chain.id,
      })
      setMessage('Wrappr Summoned! 🍬')
      res.logs.forEach(async (log: any) => {
        if (log.topics[0] === '0x11a62d632ed0efbf5131a4b627885485564b1bb225f0689f8c58457122e4deb7') {
          const address = '0x' + log.topics[1].slice(-40)
          setStore({
            ...store,
            hash: res.transactionHash,
            address: address,
            chainId: chain.id,
          })
          setView(1)
        }
      })
    } catch (e) {
      console.error(e)
      setMessage('')
      if (e instanceof Error) {
        console.error(e)
        setMessage('')
        setError(e.message)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-10 w-full sm:w-3/4 md:w-3/4 lg:w-1/2">
      <div className="border-b-2 pb-6">
        <h1>{submitting ? 'Summoning' : '🍬 Create Wrappr'}</h1>
        <p>
          {submitting
            ? 'We are working our magic, please be patient'
            : 'Wrappr is a protocol for incorporating as NFTs. Create a Wrappr by filling out the form below.'}
        </p>
      </div>
      {submitting ? (
        <Loader message={message} />
      ) : (
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* <MediaPicker label="Image" onChange={(file: File) => setImage(file)} /> */}
          <Input id="name" {...register('name')} placeholder="Agreement Name" />
          <Input id="symbol" {...register('symbol')} placeholder="SYMBOL" />
          <Textarea id="description" placeholder="" {...register('description')} />
          <Input id="admin" {...register('admin')} placeholder={zeroAddress} />
          <Input inputMode="numeric" id="mintFee" defaultValue={'0.1'} min={'0'} {...register('mintFee')} />
          {/* <FileUploader label="Agreement" setFile={setAgreement} /> */}

          <div>
            {fields.map((field, index) => {
              return (
                <div className="flex items-center" key={field.id}>
                  <Input
                    placeholder="Type"
                    {...register(`attributes.${index}.trait_type` as const, {
                      required: true,
                    })}
                  />
                  <Input
                    placeholder="Value"
                    {...register(`attributes.${index}.value` as const, {
                      required: true,
                    })}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label="Delete Item"
                    onClick={() => remove(index)}
                    className="bg-destructive rounded-full"
                  >
                    <AiOutlineDelete />
                  </Button>
                </div>
              )
            })}
            <Button variant="secondary" type="button" onClick={() => append({ trait_type: '', value: '' })}>
              Add
            </Button>
          </div>

          <p>{error}</p>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      )}
    </div>
  )
}
