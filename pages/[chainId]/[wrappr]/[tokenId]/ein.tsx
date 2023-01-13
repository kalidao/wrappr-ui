import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Layout from '../../../../src/layout'
import { Box, Stack, Input, Button, Text, Tag } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { createPdf } from '~/utils/createPdf'

import { useContractReads } from 'wagmi'
import { WRAPPR } from '../../../../src/constants'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Select } from '@design/Select'

type Create = {
  name: string
  ssn: string
  date: string
}

type Org = {
  name: string
  attributes: any[]
  description: string
  image: string
  external_url: string
}

const schema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  ssn: z.string().min(1, { message: 'This field required' }),
  date: z.string().min(1, { message: 'This field required' }),
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

  const [buttonText, setButtonText] = useState('Generate SS-4')
  const [taxEntity, setTaxEntity] = useState('')
  const [org, setOrg] = useState<Org>()

  const wrapprContract = {
    addressOrName: wrappr as string,
    contractInterface: WRAPPR,
    chainId: Number(chainId),
  }
  const { data: tokenUri } = useContractReads({
    contracts: [
      {
        ...wrapprContract,
        functionName: 'uri',
        args: [tokenId],
      },
    ],
  })

  const onSubmit = async (data: Create) => {
    setButtonText('Generating...')
    const { name, ssn, date } = data

    const pdf = {
      entityType: org ? org.attributes[1].value : '',
      entityName: org ? org.name : '',
      userName: name,
      userSsn: ssn,
      formationDate: date,
      taxEntity: taxEntity,
    }

    createPdf(pdf).then(() => {
      setButtonText('Generate SS-4')
    })
  }

  const fetchTokenMetadata = async (URI: string) => {
    const res = await fetch(URI)
    return res.json()
  }

  useEffect(() => {
    const getData = async () => {
      const org = await fetchTokenMetadata(tokenUri ? tokenUri.toString() : '')
      setOrg(org)
    }

    getData()
  }, [])

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
              <Text>3. Review, sign, and date at the bottom of Form SS-4.</Text>
              <Text>
                4. For US entities, fax Form SS-4 to IRS at (855)641-6935. For Int&apos;l entities, fax Form SS-4 to
                (304)707-9471.{' '}
              </Text>
              <Text>5. We expect a response with an EIN from the IRS in seven (7) business days.</Text>
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
              label="Name of responsible person"
              labelSecondary={<Tag>Line 7a of Form SS-4</Tag>}
              id="name"
              {...register('name')}
              placeholder="Name"
              error={errors.name && errors.name.message}
            />
            {org && org.attributes[1].value == 'LLC' && (
              <Select
                label="Taxed as"
                description="Pick an entity type."
                name="type"
                onChange={(e) => setTaxEntity(e.target.value)}
                options={[
                  { value: 'select', label: 'Select' },
                  { value: 'sole', label: 'Sole Proprietor (single member)' },
                  { value: 'partnership', label: 'Partnership (multiple members)' },
                  { value: 'c-corp', label: 'C-Corporation' },
                  { value: 's-corp', label: 'S-Corporation' },
                ]}
              />
            )}
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
              error={errors.date && errors.date.message}
            />
            {org && org.attributes[1].value == 'UNA' && (
              <Input
                label="Activity"
                labelSecondary={<Tag>Line 17 of Form SS-4</Tag>}
                id="ssn"
                {...register('date')}
                placeholder="Describe services or products provided"
                error={errors.date && errors.date.message}
              />
            )}
          </Stack>
        </Box>
        <Button onClick={handleSubmit(onSubmit)}>{buttonText}</Button>
      </Stack>
    </Layout>
  )
}

export default EIN
