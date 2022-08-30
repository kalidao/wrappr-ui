import type { NextPage } from 'next'
import Layout from '../src/layout'
import CreateForm from '../src/create/'
import { Input } from '@chakra-ui/react'
import { uploadFile } from '../src/utils/uploadFile'

const Create: NextPage = () => {
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('upload', e.target.files)
    if (e.target.files !== null) {
      try {
        const formData = new FormData()
        Object.values(e.target.files).forEach((file) => {
          formData.append('file', file)
        })
        const res = await uploadFile(formData)
      } catch (e) {
        console.error('e', e)
      }
    }
  }

  return (
    <Layout heading="Create" content="Create a Wrappr" back={true}>
      <CreateForm />
      <Input type="file" onChange={upload} />
    </Layout>
  )
}

export default Create
