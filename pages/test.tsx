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
  const [url, setURL] = useState('')

  const create = async () => {
    setCreating(true)

    try {
      const obj = {
        template_name: 'daoCharter',
        agreement_params: { name: 'hello', ricardianId: '123', jurisdiction: 'Ethereum', mission: 'Testing' },
      }
      const res = await fetch('https://engine.wrappr.wtf/v1/gen', {
        method: 'POST',
        headers: {
          Accept: 'application/pdf',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
        .then(validateResponse)
        .then((res) => res.blob())

      setURL(window.URL.createObjectURL(res))

      console.log('res', res, url)
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
      <iframe src={url}></iframe>
    </Layout>
  )
}

export default Home
