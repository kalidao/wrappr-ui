interface Trait {
  [key: string]: string
}

export async function updateURI(name: string, description: Trait, image: File, agreement: File, traits: Trait) {
  let imageHash, agreementHash

  try {
    imageHash = await ''
  } catch (e) {
    console.error('Error uploading image: ', e)
  }

  try {
    agreementHash = ''
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
    const hash = ''
    return hash
  } catch (e) {
    console.log(e)
  }
}
