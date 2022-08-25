import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Flex, Button, Checkbox } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

type ReviewProps = {
  setView: React.Dispatch<React.SetStateAction<number>>
}

const PDFViewer = dynamic(import('./PDFViewer'), { ssr: false })

export default function Review({ setView }: ReviewProps) {
  const { isConnected } = useAccount()

  return (
    <Flex flexDirection="column" gap="10px" justifyContent="center" alignItems="flex-start">
      <PDFViewer src={'/legal/DelLLC.pdf'} />
      <Checkbox colorScheme="brand">I have read and accept the terms of this agreement.</Checkbox>
      {isConnected && (
        <Button type="submit" width="100%" colorScheme="brand" variant="solid" borderRadius={'none'}>
          Confirm Mint
        </Button>
      )}
    </Flex>
  )
}
