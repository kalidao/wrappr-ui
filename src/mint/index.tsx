import React, { useState } from 'react'

import { Heading, Flex, IconButton } from '@chakra-ui/react'
import { MdOutlineArrowBack } from 'react-icons/md'

import MintForm from './MintForm'
import Confirm from './Confirm'

import { MintT } from './types'

{
  /* TODO: 
        - Add registered agent 
        - Add mission statement for UNAs 
      */
}
export default function MintControl() {
  return (
    <Flex
      direction="column"
      padding="20px"
      justify={'center'}
      ml={['2.5%', '5%', '15%', '25%']}
      mr={['2.5%', '5%', '15%', '25%']}
      mt={['10%', '1.3%', '2.5%', '5%']}
      gap={5}
      boxShadow={'0 5px 5px #E6FFFF'}
    >
      <Heading>Form Legal Entity</Heading>
      <MintForm />
    </Flex>
  )
}
