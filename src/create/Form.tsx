import React, { useState } from 'react'
import { Box, Stack, Input, Field, Button, Textarea, Text, MediaPicker, IconPlus } from '@kalidao/reality'
import { AiOutlineDelete } from 'react-icons/ai'

import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { ethers } from 'ethers'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { deployments } from '../constants'
import { WRAPPR_FACTORY } from '../constants'

import { createWrappr } from './createWrappr'
import { StoreC } from './types'
import { checkName } from './checkName'
import FileUploader from '@design/FileUploader'
import Loader from './Loader'

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
    formState: { errors },
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
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  const { data: result, writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: chain ? (deployments[chain.id]['factory'] as `0xstring`) : ethers.constants.AddressZero,
    abi: WRAPPR_FACTORY,
    functionName: 'deployWrappr',
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = async (data: Create) => {
    setSubmitting(true)
    setMessage('Checking summoning variables...')
    if (!isConnected) {
      setError('Please connect your wallet.')
      setSubmitting(false)
      return
    }
    if (!image) {
      setError('Please upload an image.')
      setSubmitting(false)
      return
    }
    if (!agreement) {
      setError('Please upload an agreement.')
      setSubmitting(false)
      return
    }

    const { name, description, symbol, mintFee, admin, attributes } = data

    setMessage('Checking name collision...')
    try {
      if (chain) {
        const res = await checkName(name, chain?.id)
        if (res.isError) {
          setError(res.error)
          return
        } else {
          if (!res.available) {
            setMessage('')
            setError(res.error)
          }
        }
      }
    } catch (e) {
      console.error(e)
      setMessage('')
      setError('Failed to check name collision.')
      return
    }

    console.log(
      'Creating Wrappr JSON...',
      name,
      symbol,
      description,
      image,
      agreement,
      attributes,
      ethers.utils.parseEther(mintFee.toString()).toString(),
      admin,
    )
    setMessage('Creating the Wrappr...')
    let baseURI
    try {
      baseURI = await createWrappr(name, description, image, agreement, attributes)
    } catch (e) {
      console.error('Failed to create Wrappr JSON: ', e)
      setError('Failed to create Wrappr metadata.')
      return
    }

    setMessage('Summoning the Wrappr...')
    try {
      setStore({
        ...store,
        uri: baseURI as string,
      })

      const res = await writeAsync?.({
        recklesslySetUnpreparedArgs: [name, symbol, baseURI, ethers.utils.parseEther(mintFee.toString()), admin],
      })
      setMessage('Waiting for confirmation...')
      if (res)
        await res.wait(1).then(async (res) => {
          console.log('logs', res.logs)
          await res.logs.forEach(async (log: any) => {
            setMessage('Wrappr Summoned! 🍬')
            if (log.topics[0] === '0x11a62d632ed0efbf5131a4b627885485564b1bb225f0689f8c58457122e4deb7') {
              const address = '0x' + log.topics[1].slice(-40)
              setStore({
                ...store,
                hash: res.transactionHash,
                address: address,
                chainId: chain?.id,
              })
              setView(1)
            }
          })
        })
    } catch (e) {
      console.error('Failed to deploy Wrappr: ', e)
    }

    setSubmitting(false)
  }

  return (
    <Box
      display="flex"
      flexDirection={'column'}
      gap="10"
      width={{
        xs: '3/4',
        md: '3/4',
        lg: '1/2',
      }}
    >
      <Box borderBottomWidth={'0.375'} paddingBottom="6">
        <Text size="headingOne" color="foreground">
          {submitting ? 'Summoning' : '🍬 Create Wrappr'}
        </Text>
        <Text>
          {submitting
            ? 'We are working our magic, please be patient'
            : 'Wrappr is a protocol for incorporating as NFTs. Create a Wrappr by filling out the form below.'}
        </Text>
      </Box>
      {submitting ? (
        <Loader message={message} />
      ) : (
        <Box as="form" display="flex" flexDirection={'column'} gap="3" onSubmit={handleSubmit(onSubmit)}>
          <MediaPicker label="Image" onChange={(file: File) => setImage(file)} />
          <Input
            label="Name"
            id="name"
            {...register('name')}
            placeholder="Agreement Name"
            error={errors.name && errors.name.message}
          />
          <Input
            label="Symbol"
            id="symbol"
            {...register('symbol')}
            placeholder="SYMBOL"
            error={errors.symbol && errors.symbol.message}
          />
          <Textarea label="Description" id="description" placeholder="" {...register('description')} />
          <Input
            label="Admin"
            id="admin"
            {...register('admin')}
            placeholder={ethers.constants.AddressZero}
            error={errors.admin && errors.admin.message}
          />
          <Input
            inputMode="numeric"
            id="mintFee"
            defaultValue={'0.1'}
            min={'0'}
            label="Minting Fee"
            error={errors.mintFee && errors.mintFee.message}
            {...register('mintFee')}
          />
          <FileUploader label="Agreement" setFile={setAgreement} />
          <Field label="Traits">
            <Stack>
              {fields.map((field, index) => {
                return (
                  <Stack direction="horizontal" align="center" key={field.id}>
                    <Input
                      label="Type"
                      hideLabel
                      placeholder="Type"
                      {...register(`attributes.${index}.trait_type` as const, {
                        required: true,
                      })}
                    />
                    <Input
                      label="Value"
                      hideLabel
                      placeholder="Value"
                      {...register(`attributes.${index}.value` as const, {
                        required: true,
                      })}
                    />
                    <Button
                      variant="secondary"
                      size="small"
                      shape="circle"
                      aria-label="Delete Item"
                      onClick={() => remove(index)}
                      tone="red"
                    >
                      <AiOutlineDelete />
                    </Button>
                  </Stack>
                )
              })}
              <Button
                suffix={<IconPlus />}
                variant="secondary"
                tone="green"
                type="button"
                onClick={() => append({ trait_type: '', value: '' })}
              >
                Add
              </Button>
            </Stack>
          </Field>
          <Text>{error}</Text>
          <Button
            tone="foreground"
            type="submit"
            width="full"
            variant="primary"
            disabled={submitting}
            loading={submitting}
          >
            Create
          </Button>
        </Box>
      )}
    </Box>
  )
}
