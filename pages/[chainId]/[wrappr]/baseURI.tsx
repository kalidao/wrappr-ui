import Layout from '../../../src/layout'
import UpdateURI from '../../../src/updateURI'

export default function UpdateBaseURI() {
  return (
    <Layout heading="Wrappr" content="Update Base URI" back={true}>
      <UpdateURI />
    </Layout>
  )
}
