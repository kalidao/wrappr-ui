import type { NextPage } from 'next'
import Layout from '../src/layout'
import { Widget } from '@typeform/embed-react'
import { useRouter } from 'next/router'
import { useThemeStore } from '~/hooks/useThemeStore'

const Clinic: NextPage = () => {
  const router = useRouter()
  const mode = useThemeStore((state) => state.mode)

  return (
    <Layout
      heading="LexDAO Clinic"
      content="Get help managing your Wrappr from legal engineers at LexDAO Clinic"
      back={() => router.push('/')}
    >
      <Widget
        id="FEZ9cFhM"
        style={{
          height: '75vh',
          width: '100%',
          backgroundColor: mode === 'dark' ? 'black' : 'white',
        }}
      />
    </Layout>
  )
}

export default Clinic
