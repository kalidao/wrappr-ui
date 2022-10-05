import type { NextPage } from 'next'
import Layout from '../src/layout'
import CreateForm from '../src/create/'
import { useRouter } from 'next/router'

const Create: NextPage = () => {
  const router = useRouter()
  return (
    <Layout heading="Create" content="Create a Wrappr" back={() => router.push('/')}>
      <CreateForm />
    </Layout>
  )
}

export default Create
