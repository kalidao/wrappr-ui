import { useRouter } from 'next/router'
import Layout from '../../../src/layout'
import UpdateURI from '../../../src/updateURI'

export default function UpdateBaseURI() {
  const router = useRouter()
  const { chainId, wrappr } = router.query
  return (
    <Layout heading="Wrappr" content="Update Base URI" back={() => router.push(`/${chainId}/${wrappr}`)}>
      <UpdateURI />
    </Layout>
  )
}
