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

interface Trait {
  [key: string]: string
}

type URI = {
  name: string
  description: string
  external_url: string
  image: FileList
  agreement: FileList
  attributes: {
    trait_type: string
    value: string
  }[]
}

export default function UpdateURI() {
  const router = useRouter()
  const [description, setDescription] = useState()
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
    const { name, agreement, image } = data

    if (editor) {
      const uri = await updateURI(name, description as unknown as Trait, agreement[0], image[0], { name: 'name' })
      try {
        const res = await writeAsync({
          recklesslySetUnpreparedArgs: [uri],
        })
      } catch (e) {
        console.error(e)
        return
      }
    }
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
        <FormLabel>Name</FormLabel>
        <Input id="name" defaultValue={'New Name'} {...register('name')} variant="flushed" />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Editor editor={editor} />
      </FormControl>
      <FormControl>
        <FormLabel>External URL</FormLabel>
        <Input id="external_url" defaultValue={'External URL'} {...register('external_url')} variant="flushed" />
      </FormControl>
      <FormControl>
        <FormLabel>Image</FormLabel>
        <Input id="image" type="file" {...register('image')} variant="flushed" />
      </FormControl>
      <FormControl>
        <FormLabel>Agreement</FormLabel>
        <Input id="agreement" type="file" {...register('agreement')} variant="flushed" />
      </FormControl>
      <FormControl>
        <FormLabel>Traits</FormLabel>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
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
                <IconButton aria-label="Delete Item" onClick={() => remove(index)} colorScheme="red" isRound>
                  <AiOutlineDelete />
                </IconButton>
              </HStack>
            </div>
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
