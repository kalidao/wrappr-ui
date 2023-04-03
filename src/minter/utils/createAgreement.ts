import { uploadFile } from '~/utils'
import { StoreT } from '../types'

export async function createAgreement(
  // template_name: string,
  // name: string,
  tokenId: string,
  // mission: string,
  // jurisdiction: string,
  chainId: string,
  store: StoreT,
) {
  let agreement_params
  let template_name

  if (store.entity == 'Terms') {
    template_name = store.juris
  } else {
    template_name = store.juris + store.entity
  }

  console.log(store)
  switch (template_name) {
    case 'deLLC':
      agreement_params = {
        name: store.name,
        ricardianId: `${chainId}:${tokenId}`,
      }
      break
    case 'wyLLC':
      agreement_params = {
        name: `Wrappr LLC - ${store.name} - Series ${tokenId}`,
        ricardianId: `${chainId}:${tokenId}`,
      }
      break
    case 'deUNA':
      agreement_params = {
        name: store.name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: store.mission,
      }
      break
    case 'wyUNA':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: store.mission,
      }
      break
    case 'lexCharter':
      agreement_params = {
        name: store.name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: store.mission,
        jurisdiction: store.jurisdiction,
      }
      break
    case 'orCharter':
      agreement_params = {
        name: store.name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: store.mission,
        jurisdiction: store.jurisdiction,
      }
      break
    case 'tosDao':
      agreement_params = {
        date: store.name,
        // ricardianId: `${chainId}:${tokenId}`,
        // mission: store.mission,
        // jurisdiction: store.jurisdiction,
      }
      break
  }
  try {
    const obj = {
      template_name: template_name,
      agreement_params: agreement_params,
    }
    console.log(obj)
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
      const formData = new FormData()
      formData.append('file', blob, 'agreement.pdf')
      const upload = await uploadFile(formData)
      if (upload) {
        return upload
      }
    } else {
      return Error(`${res.status.toString()} ${res.statusText}`)
    }
  } catch (e) {
    console.error('Error', e)
    return Error(`${e}`)
  }
}
