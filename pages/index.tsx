import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../src/layout'
import { Flex, Button } from '@chakra-ui/react'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Layout heading="Home" content="Wrap anything" back={false}>
      <Flex minH="90vh" justifyContent="center" alignItems="center" gap="10px">
        <Button onClick={() => router.push('/wrap')}>Wrap Now</Button>
        <Button onClick={() => router.push('/create')}>Create Wrappr</Button>
      </Flex>
    </Layout>
  )
}

export default Home
