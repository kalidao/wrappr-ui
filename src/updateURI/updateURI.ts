import { uploadFile, uploadJSON } from '../utils/'

interface Trait {
  [key: string]: string
}

export async function updateURI(name: string, description: Trait, image: File, agreement: File, traits: Trait) {
  let imageHash, agreementHash

  try {
    const formData = new FormData()
    formData.append('file', image)
    imageHash = await uploadFile(formData)
  } catch (e) {
    console.error('Error uploading image: ', e)
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', agreement)
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
