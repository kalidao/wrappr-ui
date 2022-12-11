import React, { useState, useEffect, useCallback } from 'react'
import { Box, Stack, Input, Field, Button, Textarea, Text, MediaPicker } from '@kalidao/reality'
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
  const { data: result, writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: chain ? deployments[chain.id]['factory'] : ethers.constants.AddressZero,
    contractInterface: WRAPPR_FACTORY,
    functionName: 'deployWrappr',
    onSuccess(data) {
      if (data !== undefined) {
        setStore({
          ...store,
          hash: data.hash,
        })
        setView(1)
      }
    },
  })
  const [error, setError] = useState('')

  const onSubmit = async (data: Create) => {
    if (!isConnected) {
      setError('Please connect your wallet.')
      return
    }
    setSubmitting(true)
    if (!image) return
    const { name, description, agreement, symbol, mintFee, admin, attributes } = data

    try {
      if (chain) {
        const res = await checkName(name, chain?.id)
        if (res.isError) {
          setError(res.error)
          return
        } else {
          if (!res.available) {
            setError(res.error)
          }
        }
      }
    } catch (e) {
      console.error(e)
      setError('Failed to check name collision.')
      return
    }
    let baseURI
    try {
      baseURI = await createWrappr(name, description, image as unknown as FileList, agreement, attributes)
    } catch (e) {
      console.error('Failed to create Wrappr JSON: ', e)
      setError('Failed to create Wrappr metadata.')
      return
    }

    try {
      setStore({
        ...store,
        uri: baseURI as string,
      })

      const res = writeAsync({
        recklesslySetUnpreparedArgs: [name, symbol, baseURI, ethers.utils.parseEther(mintFee.toString()), admin],
      })
    } catch (e) {
      console.error('Failed to deploy Wrappr: ', e)
    }
    setSubmitting(false)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      {/* <Input id="image" type="file" {...register('image')} variant="flushed" /> */}

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
        type="number"
        id="mintFee"
        defaultValue={5}
        min={0}
        label="Minting Fee"
        error={errors.mintFee && errors.mintFee.message}
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
                <Button size="small" shape="circle" aria-label="Delete Item" onClick={() => remove(index)} tone="red">
                  <AiOutlineDelete />
                </Button>
              </Stack>
            )
          })}

          <Button
            variant="secondary"
            onClick={() =>
              append({
                trait_type: '',
                value: '',
              })
            }
          >
            Add
          </Button>
        </Stack>
      </Field>
      <Text>{error}</Text>
      <Button type="submit" width="full" tone="accent" variant="primary" disabled={submitting} loading={submitting}>
        Create
      </Button>
    </Box>
  )
}
