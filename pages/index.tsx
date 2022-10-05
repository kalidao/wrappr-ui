import type { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import Layout from '~/layout'
import Minter from '~/minter'
import Banner from '@design/Banner'
import { useAutoConnect } from '~/hooks'

const Home: NextPage = () => {
  useAutoConnect()

  return (
    <Layout heading="Home" content="Wrap anything">
      <Flex
        direction="column"
        justify={'center'}
        ml={['5%', '15%', '25%']}
        mr={[0, '5%', '15%', '25%']}
        mt={['10%', '1.3%', '2.5%', '5%']}
        mb={['10%', '1.3%', '2.5%', '5%']}
        gap={5}
      >
        <Minter />
        <Banner
          title="How does it work?"
          description="Learn more about the legal engineering behind Wrappr."
          to="https://docs.wrappr.wtf/how-to/quick-notes/"
        />
      </Flex>
    </Layout>
  )
}

export default Home
