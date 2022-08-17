import fleek from '@fleekhq/fleek-storage-js'
import { FileWithPath } from 'react-dropzone'
import { uploadFile } from '../utils/uploadFile'

type Props = {
  name: string
  description: string
  image: FileWithPath
  agreement: FileWithPath
}

type FileUpload = {
  apiKey: string
  apiSecret: string
  key: string
  bucket: string
  data: any
}
export async function createWrappr({ name, description, image, agreement }: Props) {
  let imageHash, agreementHash

  try {
    imageHash = await uploadFile(image)
  } catch (e) {
    console.error('Error uploading image: ', e)
  }

  try {
    agreementHash = await uploadFile(agreement)
  } catch (e) {
    console.error('Error uploading agreement: ', e)
  }

  try {
    const wrappr = {
      name: name,
      description: description,
      image: imageHash,
      agreement: agreementHash,
    }

    // idk ts :(
    const input: FileUpload = {
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY ? process.env.NEXT_PUBLIC_FLEEK_API_KEY : '',
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET ? process.env.NEXT_PUBLIC_FLEEK_API_SECRET : '',
      bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
      key: 'wrappr',
      data: JSON.stringify(wrappr, null, 2),
    }

    const result = await fleek.upload(input)
    return result.hash
  } catch (e) {
    console.log(e)
  }
}
