import { uploadFile, uploadJSON } from '../utils/'

export async function updateURI(name: string, description: any, image: FileList, agreement: FileList, traits: any) {
  let imageHash, agreementHash

  try {
    const formData = new FormData()
    formData.append('file', image[0])
    console.log('image', formData, image)
    imageHash = await uploadFile(formData)
  } catch (e) {
    console.error('Error uploading image: ', e)
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', agreement[0])
    console.log('image', formData, agreement)
    agreementHash = await uploadFile(formData)
  } catch (e) {
    console.error('Error uploading agreement: ', e)
    return
  }

  try {
    const wrappr = {
      name: name,
      description: description,
      image: imageHash,
      agreement: agreementHash,
      attributes: traits,
    }
    const hash = await uploadJSON(wrappr)
    return hash
  } catch (e) {
    console.log(e)
    return
  }
}
