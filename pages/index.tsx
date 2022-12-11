import type { NextPage } from 'next'
import { Stack } from '@kalidao/reality'
import Layout from '~/layout'
import Minter from '~/minter'
import Banner from '@design/Banner'
import { useAutoConnect } from '~/hooks'

const Home: NextPage = () => {
  useAutoConnect()

  return (
    <Layout heading="Home" content="Wrap anything">
      <Stack>
        <Minter />
        <Banner
          title="How does it work?"
          description="Learn more about the legal engineering behind Wrappr."
          to="https://docs.wrappr.wtf/how-to/quick-notes/"
        />
      </Stack>
    </Layout>
  )
}

export default Home
