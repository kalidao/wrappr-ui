import type { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import Layout from '~/layout'
import Minter from '~/mint'
import Banner from '@design/Banner'

const Home: NextPage = () => {
  return (
    <Layout heading="Home" content="Wrap anything" back={false}>
      <Flex
        direction="column"
        justify={'center'}
        ml={['2.5%', '5%', '15%', '25%']}
        mr={['2.5%', '5%', '15%', '25%']}
        mt={['10%', '1.3%', '2.5%', '5%']}
        mb={['10%', '1.3%', '2.5%', '5%']}
        gap={5}
      >
        <Minter />
        <Banner
          title="How does it work?"
          description="Learn more about the legal engineering behind Wrappr."
          to="https://www.wrappr.wtf/how-to/quick-notes/"
        />
      </Flex>
    </Layout>
  )
}

export default Home
