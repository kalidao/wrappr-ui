import type { InferGetStaticPropsType, GetStaticProps, NextPage } from 'next'
import Layout from '../src/layout'
import MintForm from '../src/mint'

const Home: NextPage = () => {
  return (
    <Layout heading="Home" content="Wrap anything" back={false}>
      <MintForm />
    </Layout>
  )
}

export default Home
