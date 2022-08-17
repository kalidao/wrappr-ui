import fleek from '@fleekhq/fleek-storage-js'
type FileUpload = {
  apiKey: string
  apiSecret: string
  key: string
  bucket: string
  data: any
}

// General use case
export async function uploadFile(attachment: any) {
  const input: FileUpload = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY ? process.env.NEXT_PUBLIC_FLEEK_API_KEY : '',
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET ? process.env.NEXT_PUBLIC_FLEEK_API_SECRET : '',
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: 'Wrappr Attachment' + attachment.path,
    data: attachment,
  }

  try {
    const result = await fleek.upload(input)
    return result.hash
  } catch (e) {
    console.error('Something wrong with Fleek upload.')
  }
}
