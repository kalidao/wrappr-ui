import type { NextPage } from 'next'
import Layout from '../src/layout'
import CreateForm from '../src/create/'
import { Input } from '@chakra-ui/react'
import { uploadFile } from '../src/utils/uploadFile'

const Create: NextPage = () => {
  return (
    <Layout heading="Create" content="Create a Wrappr" back={true}>
      <CreateForm />
    </Layout>
  )
}

export default Create
