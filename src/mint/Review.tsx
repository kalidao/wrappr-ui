import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Flex, Button, Checkbox } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { StoreT } from './types'

type ReviewProps = {
  store: StoreT
}

const PDFViewer = dynamic(import('./PDFViewer'), { ssr: false })

export default function Review({ store }: ReviewProps) {
  const [checked, setChecked] = useState(false)

  const mint = () => {}

  const sources: { [key: string]: string } = {
    delSeries: '/legal/DelLLC.pdf',
    wyoSeries: '/legal/WyLLC.pdf',
    delUNA: '/legal/DelUNA.pdf',
    wyoUNA: '/legal/WyUNA.pdf',
  }

  console.log('minting', 'wyoSeries'.slice(3, 4)[0])
  return (
    <Flex flexDirection="column" gap="10px" justifyContent="center" alignItems="flex-start">
      <PDFViewer src={sources[store.minting]} />
      <Checkbox colorScheme="brand" onChange={() => setChecked(!checked)}>
        I have read and accept the terms of this agreement.
      </Checkbox>
      <Button
        type="submit"
        width="100%"
        colorScheme="brand"
        variant="solid"
        borderRadius={'none'}
        disabled={!checked}
        onClick={mint}
      >
        {!checked ? 'Please agree to the terms.' : 'Confirm Mint'}
      </Button>
    </Flex>
  )
}
