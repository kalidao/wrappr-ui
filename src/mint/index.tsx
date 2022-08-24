import React, { useState } from 'react'

import { Heading, Flex } from '@chakra-ui/react'

import MintForm from './MintForm'
import Confetti from './Confetti'

export default function Minter() {
  return (
    <Flex
      direction="column"
      padding="20px"
      justify={'center'}
      ml={['2.5%', '5%', '15%', '25%']}
      mr={['2.5%', '5%', '15%', '25%']}
      mt={['10%', '1.3%', '2.5%', '5%']}
      gap={5}
      boxShadow={'1.5px -1.5px 5px 2px #30FDFD'}
    >
      <Heading>Form Legal Entity</Heading>
      <MintForm />
    </Flex>
  )
}
