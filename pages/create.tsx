import type { NextPage } from 'next'
import Layout from '../src/layout'
import CreateForm from '../src/create/'

const Create: NextPage = () => {
  return (
    <Layout heading="Create" content="Create a Wrappr" back={true}>
      <CreateForm />
    </Layout>
  )
}

export default Create
