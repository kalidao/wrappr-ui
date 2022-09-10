import { uploadFile } from '~/utils'

export async function createAgreement(name: string, params: any) {
  try {
    const obj = {
      template_name: name,
      agreement_params: params,
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
      const uploadedURL = await uploadFile(blob)
      return {
        blob: blob,
        url: url,
        uploadedURL: uploadedURL,
      }
    } else {
      return Error(`${res.status.toString()} ${res.statusText}`)
    }
  } catch (e) {
    console.log('Error', e)
  }
}
