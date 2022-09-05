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
      const obj = {
        template_name: 'una_test',
        agreement_params: {
          name: 'Hello World!',
        },
      }
      const rawResponse = await fetch('https://wrappr-engine.onrender.com/api/v1/gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      const content = await rawResponse.json()
      const res = await fetch('https://engine.wrappr.wtf/api/v1/gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then(validateResponse)
        .then((res) => res.blob())

      console.log('res', res)
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
