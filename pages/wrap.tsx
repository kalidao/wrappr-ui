import type { NextPage } from 'next'
import Layout from '../src/layout'
import WrapComponent from '../src/wrap'

const Wrap: NextPage = () => {
  return (
    <Layout heading="Wrap" content="Wrap any account" back={true}>
      <WrapComponent />
    </Layout>
  )
}

export default Wrap
