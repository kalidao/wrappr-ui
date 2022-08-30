import { convertIpfsHash } from './convertIpfsHash'

// General use case
export async function uploadFile(attachment: any) {
  try {
    console.log('uploading', attachment)
    const result = await fetch('api/file', {
      method: 'POST',
      body: attachment,
    }).then((res) => res.json())
    const url = convertIpfsHash(result.IpfsHash)
    return url
  } catch (e) {
    console.error('Something wrong with upload.', e)
  }
}
