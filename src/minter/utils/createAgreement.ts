import { uploadFile } from '~/utils'

export async function createAgreement(
  template_name: string,
  name: string,
  tokenId: string,
  mission: string,
  chainId: string,
) {
  let agreement_params
  switch (template_name) {
    case 'deLLC':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
      }
      break
    case 'miLLC':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
      }
      break
    case 'wyLLC':
      agreement_params = {
        name: `Wrappr LLC - ${name} - Series ${tokenId}`,
        ricardianId: `${chainId}:${tokenId}`,
      }
      break
    case 'deUNA':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: mission,
      }
      break
    case 'wyUNA':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: mission,
      }
      break
  }

  try {
    const obj = {
      template_name: template_name,
      agreement_params: agreement_params,
    }
    const res = await fetch('https://engine.wrappr.wtf/v1/gen', {
      method: 'POST',
      headers: {
        Accept: 'application/pdf',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
    const blob = await res.blob()

    if (!res.ok) {
      throw new Error(`${res.status.toString()} ${res.statusText}`)
    }
    const formData = new FormData()
    formData.append('file', blob, 'agreement.pdf')
    const upload = await uploadFile(formData)
    if (!upload) {
      throw new Error('Error uploading file')
    }

    return upload
  } catch (e) {
    console.error(e)
    if (e instanceof Error) throw new Error(e.message)
    else throw new Error('Error')
  }
}
