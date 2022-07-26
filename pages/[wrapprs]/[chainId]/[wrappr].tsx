import type { NextPage } from 'next'
import Layout from '../../../src/layout'
import { Button } from '@chakra-ui/react'

const Wrappr: NextPage = () => {
  return (
    <Layout heading="Wrappr" content="Wrap now" back={true}>
      <Button>Mint</Button>
    </Layout>
  )
}

export default Wrappr
