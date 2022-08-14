import type { NextPage } from 'next'
import Layout from '../src/layout'

const Home: NextPage = () => {
  return <Layout heading="Home" content="Wrap anything" back={false}></Layout>
}

export default Home
