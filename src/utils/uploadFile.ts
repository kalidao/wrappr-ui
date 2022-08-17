import fleek from '@fleekhq/fleek-storage-js'

// General use case
export async function uploadFile(attachment: any) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: 'Wrappr Attachment',
    data: attachment,
    httpUploadProgressCallback: (event) => {
      console.log(Math.round((event.loaded / event.total) * 100) + '% done')
    },
  }

  try {
    const result = await fleek.upload(input)
    return result.hash
  } catch (e) {
    console.error('Something wrong with Fleek upload.')
  }
}
