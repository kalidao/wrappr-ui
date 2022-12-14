import { uploadJSON } from '../utils'
import { uploadFile } from '../utils/uploadFile'

export async function createWrappr(name: string, description: any, image: File, agreement: File, attributes: any) {
  let imageHash, agreementHash

  try {
    const formData = new FormData()
    formData.append('file', image)
    imageHash = await uploadFile(formData)
  } catch (e) {
    console.error('Error uploading image: ', e)
  }

  console.log('imageHash: ', imageHash)

  try {
    const formData = new FormData()
    formData.append('file', agreement)
    agreementHash = await uploadFile(formData)
  } catch (e) {
    console.error('Error uploading agreement: ', e)
  }

  console.log('agreementHash: ', agreementHash)

  try {
    const wrappr = {
      name: name,
      description: description,
      image: imageHash,
      agreement: agreementHash,
      attributes: attributes,
    }

    const result = await uploadJSON(wrappr)

    console.log('wrapprHash', result)
    return result
  } catch (e) {
    console.log(e)
  }
}
