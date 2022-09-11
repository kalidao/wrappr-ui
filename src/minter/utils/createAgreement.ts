import { uploadBlob } from '~/utils'
import { convertIpfsHash } from '~/utils/convertIpfsHash'

export async function createAgreement(
  template_name: string,
  name: string,
  tokenId: string,
  mission: string,
  jurisdiction: string,
  chainId: string,
) {
  let agreement_params
  switch (template_name) {
    case 'deLLC':
      agreement_params = {
        name: name,
        ricardianId: tokenId,
      }
      break
    case 'wyLLC':
      agreement_params = {
        name: name,
        ricardianId: tokenId,
      }
      break
    case 'deUNA':
      agreement_params = {
        name: name,
        ricardianId: tokenId,
        mission: mission,
      }
      break
    case 'wyUNA':
      agreement_params = {
        name: name,
        ricardianId: tokenId,
        mission: mission,
      }
      break
    case 'lexCharter':
      agreement_params = {
        name: name,
        ricardianId: tokenId,
        mission: mission,
        jurisdiction: jurisdiction,
      }
      break
    case 'orCharter':
      agreement_params = {
        name: name,
        ricardianId: tokenId,
        mission: mission,
        jurisdiction: jurisdiction,
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

    if (res.ok) {
      const url = window.URL.createObjectURL(blob)
      const hash = await uploadBlob(blob)
      if (hash) {
        return convertIpfsHash(hash)
      }
    } else {
      return Error(`${res.status.toString()} ${res.statusText}`)
    }
  } catch (e) {
    console.error('Error', e)
    return Error(`${e}`)
  }
}
