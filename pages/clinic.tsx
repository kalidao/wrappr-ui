import type { NextPage } from 'next'
import Layout from '~/layout'
import { Widget } from '@typeform/embed-react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

const Clinic: NextPage = () => {
  const router = useRouter()
  const { resolvedTheme } = useTheme()

  return (
    <Layout
      heading="LexDAO Clinic"
      content="Get help managing your Wrappr from legal engineers"
      back={() => router.push('/')}
    >
      <Widget
        id="FEZ9cFhM"
        style={{
          height: '75vh',
          width: '100%',
          backgroundColor: resolvedTheme === 'dark' ? 'black' : 'white',
        }}
      />
    </Layout>
  )
}

export default Clinic
