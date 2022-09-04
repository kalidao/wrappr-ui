import { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../src/layout'
import { Button } from '@chakra-ui/react'
function validateResponse(response: any) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
const Home: NextPage = () => {
  const [creating, setCreating] = useState(false)
  const create = async () => {
    setCreating(true)
    try {
      const res = await fetch('api/create', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          name: 'Shiv',
        }),
      })
        .then(validateResponse)
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob))

      console.log('res', res.body)
    } catch (e) {
      console.log('Error', e)
    }
    setCreating(false)
  }
  return (
    <Layout heading="Test" content="Wrap anything" back={false}>
      <Button onClick={create} disabled={creating}>
        Create PDF
      </Button>
    </Layout>
  )
}

export default Home
