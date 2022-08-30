import { FileWithPath } from 'react-dropzone'
import { uploadJSON } from '../utils'
import { uploadFile } from '../utils/uploadFile'

export async function createWrappr(
  name: string,
  description: string,
  image: FileList,
  agreement: FileList,
  attributes: any,
) {
  let imageHash, agreementHash

  try {
    const formData = new FormData()
    formData.append('file', image[0])
    imageHash = await uploadFile(formData)
  } catch (e) {
    console.error('Error uploading image: ', e)
  }

  try {
    const formData = new FormData()
    formData.append('file', agreement[0])
    agreementHash = await uploadFile(formData)
  } catch (e) {
    console.error('Error uploading agreement: ', e)
  }

  try {
    const wrappr = {
      name: name,
      description: description,
      image: imageHash,
      agreement: agreementHash,
      attributes: attributes,
    }

    const result = await uploadJSON(wrappr)
    return result
  } catch (e) {
    console.log(e)
  }
}
