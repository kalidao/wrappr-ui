import React, { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../../../../src/layout'
import {
  Box,
  Stack,
  Input,
  Field,
  Button,
  Textarea,
  Text,
  MediaPicker,
  IconPlus,
  Tag,
  Checkbox,
} from '@kalidao/reality'
import { useRouter } from 'next/router'
import { createPdf } from '~/utils/createPdf'

import { ethers } from 'ethers'
import { useContractRead } from 'wagmi'
import { WRAPPR } from '../../../../src/constants'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type Create = {
  name: string
  ssn: string
  date: string
  signature: string
}

const schema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  ssn: z.string().min(1, { message: 'This field required' }),
  date: z.string().min(1, { message: 'This field required' }),
  signature: z.string().min(1, { message: 'This field required' }),
})

const EIN: NextPage = () => {
  const router = useRouter()
  const { wrappr, chainId, tokenId } = router.query
  console.log(wrappr, chainId, tokenId)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Create>({
    resolver: zodResolver(schema),
  })

  // const [error, setError] = useState('')
  const [toGenerate, setToGenerate] = useState(false)

  const { data: entity } = useContractRead({
    addressOrName: wrappr ? wrappr?.toString() : '',
    chainId: Number(chainId),
    contractInterface: WRAPPR,
    functionName: 'symbol',
  })

  const { data: tokenUri, error: tokenUriError } = useContractRead({
    addressOrName: wrappr ? wrappr?.toString() : '',
    contractInterface: WRAPPR,
    chainId: Number(chainId),
    functionName: 'uri',
    args: [tokenId],
  })

  const onSubmit = async (data: Create) => {
    const { name, ssn, date, signature } = data

    const org = await fetchTokenMetadata(tokenUri ? tokenUri.toString() : '')

    console.log(org.attributes[1].value, org.name)

    const pdf = {
      entityType: org.attributes[1].value,
      entityName: org.name,
      userName: name,
      userSsn: ssn,
      formationDate: date,
      signature: signature,
    }

    createPdf(pdf)
  }

  const fetchTokenMetadata = async (URI: string) => {
    const res = await fetch(URI)
    return res.json()
  }

  return (
    <Layout
      heading="EIN Form"
      content="Fill out and apply for EIN"
      back={() => router.push(`/${chainId}/${wrappr}/${tokenId}`)}
    >
      <Stack
        align="center"
        // backgroundColor="red"
      >
        <Box alignItems="flex-start" width="1/2" borderBottomWidth={'0.375'} paddingBottom="6">
          <Stack>
            <Text size="headingOne" color="foreground">
              🍬 Apply for EIN
            </Text>
            <Text>
              An EIN is a unique nine-digit number that identifies your business in the United States for tax purposes.
            </Text>
          </Stack>
          <Box paddingLeft="10" paddingTop="5">
            <Stack>
              <Text>To apply for an EIN:</Text>
              <Text>1. Fill out Form SS-4 by providing the following information.</Text>
              <Text>2. Click &apos;Generate SS-4&apos; and carefully review completed Form SS-4.</Text>
              <Text>3. Fax the completed Form SS-4 to IRS.</Text>
              <Text>4. We expect a response with an EIN from the IRS in seven (7) business days.</Text>
            </Stack>
          </Box>
        </Box>
        <Box
          as="form"
          width="1/2"
          // display="flex"
          flexDirection={'column'}
          gap="20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack>
            <Input
              label="Name of responsible party"
              labelSecondary={<Tag>Line 7a of Form SS-4</Tag>}
              id="name"
              {...register('name')}
              placeholder="Name"
              error={errors.name && errors.name.message}
            />
            <Input
              label="SSN / ITIN "
              labelSecondary={<Tag>Line 7b of Form SS-4</Tag>}
              id="ssn"
              {...register('ssn')}
              placeholder="Social Security Number / Individual Taxpayer Identification Number"
              error={errors.ssn && errors.ssn.message}
            />
            <Input
              label="Formation Date"
              labelSecondary={<Tag>Line 11 of Form SS-4</Tag>}
              id="ssn"
              {...register('date')}
              placeholder="Specify the date of formation"
              error={errors.signature && errors.signature.message}
            />
            <Input
              label="Signature"
              labelSecondary={<Tag>Signature Block</Tag>}
              id="ssn"
              {...register('signature')}
              placeholder="Print name here to e-sign Form SS-4"
              error={errors.signature && errors.signature.message}
            />
            {/* <Checkbox label="I agree to e-sign Form SS-4"/> */}
          </Stack>
          {/* <Text>{error}</Text> */}
        </Box>
        <Button onClick={handleSubmit(onSubmit)}>Generate SS-4</Button>
      </Stack>
    </Layout>
  )
}

export default EIN
