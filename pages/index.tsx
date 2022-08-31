import type { NextPage } from 'next'
import Layout from '~/layout'
import Minter from '~/mint'

const Home: NextPage = () => {
  return (
    <Layout heading="Home" content="Wrap anything" back={false}>
      <Minter />
    </Layout>
  )
}

export default Home
