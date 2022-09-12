import type { NextPage } from 'next'
import Layout from '../src/layout'
import { Widget } from '@typeform/embed-react'

const Clinic: NextPage = () => {
  return (
    <Layout
      heading="LexDAO Clinic"
      content="Get help managing your Wrappr from legal engineers at LexDAO Clinic"
      back={false}
    >
      <Widget id="FEZ9cFhM" className="h-[90vh] w-full bg-black" />
    </Layout>
  )
}

export default Clinic
