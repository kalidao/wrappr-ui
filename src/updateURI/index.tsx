import { useState } from 'react'
import { Button, IconButton, FormControl, FormLabel, Input, VStack, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { WRAPPR } from '../constants'
import { useForm, useFieldArray } from 'react-hook-form'
import { updateURI } from './updateURI'
import Editor from '../editor'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { AiOutlineDelete } from 'react-icons/ai'
import UploadImage from '../utils/UploadImage'
import { createWrappr } from '../create/createWrappr'

interface Trait {
  [key: string]: string
}

type URI = {
  name: string
  // description: string
  external_url: string
  agreement: FileList
  attributes: {
    trait_type: string
    value: string
  }[]
}

export default function UpdateURI() {
  const router = useRouter()
  const [description, setDescription] = useState()
  const [image, setImage] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: 'Add new description',
    onUpdate({ editor }: { editor: any }) {
      // The content has changed.
      if (editor !== null) {
        setDescription(editor.getJSON())
      }
    },
  })

  // form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<URI>({
    defaultValues: {
      attributes: [{ trait_type: '', value: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'attributes',
    control,
  })
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: router.query.wrappr as string,
    contractInterface: WRAPPR,
    functionName: 'setBaseURI',
  })
  const create = async (data: URI) => {
    setSubmitting(true)
    if (image.length === 0) return
    const { name, agreement, attributes } = data

    // if (editor) {
    let uri
    try {
      uri = await createWrappr(name, description, agreement, image as unknown as FileList, attributes)
    } catch (e) {
      console.error('Failed to create Wrappr JSON: ', e)
      return
    }

    try {
      const res = await writeAsync({
        recklesslySetUnpreparedArgs: [uri],
      })
    } catch (e) {
      console.error(e)
      return
    }
    setSubmitting(false)
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(create)}
      ml={['2.5%', '5%', '15%', '25%']}
      mr={['2.5%', '5%', '15%', '25%']}
      mt={['10%', '1.3%', '2.5%', '5%']}
      mb={['10%', '1.3%', '2.5%', '5%']}
      spacing={5}
    >
      <FormControl>
        <FormLabel>Image</FormLabel>
        <UploadImage setFile={setImage} file={image} />
      </FormControl>
      <FormControl>
        <Input id="name" defaultValue={'New Name'} {...register('name')} variant="flushed" />
      </FormControl>
      <FormControl>
        {/* <Input id="description" defaultValue={'New Description'} {...register('description')} variant="flushed" /> */}
        <Editor editor={editor} />
      </FormControl>
      <FormControl>
        <Input id="external_url" defaultValue={'External URL'} {...register('external_url')} variant="flushed" />
      </FormControl>
      <FormControl>
        <FormLabel>Agreement</FormLabel>
        <Input id="agreement" type="file" {...register('agreement')} variant="flushed" />
      </FormControl>
      <FormControl as={VStack} align={'stretch'}>
        <FormLabel>Traits</FormLabel>
        {fields.map((field, index) => {
          return (
            <HStack key={field.id}>
              <Input
                placeholder="Type"
                {...register(`attributes.${index}.trait_type` as const, {
                  required: true,
                })}
                className={errors?.attributes?.[index]?.trait_type ? 'error' : ''}
              />
              <Input
                placeholder="value"
                {...register(`attributes.${index}.value` as const, {
                  required: true,
                })}
                className={errors?.attributes?.[index]?.value ? 'error' : ''}
              />
              <IconButton aria-label="Delete Item" onClick={() => remove(index)} colorScheme="orange" isRound>
                <AiOutlineDelete />
              </IconButton>
            </HStack>
          )
        })}
        <Button
          onClick={() =>
            append({
              trait_type: '',
              value: '',
            })
          }
        >
          Add
        </Button>
      </FormControl>
      <Button disabled={!writeAsync} type="submit">
        Update Base URI.
      </Button>
    </VStack>
  )
}
