import { FileWithPath } from 'react-dropzone'
import { uploadJSON } from '../utils'
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

    const result = await uploadJSON(wrappr)
    return result
  } catch (e) {
    console.log(e)
  }
}
