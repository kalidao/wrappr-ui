import React, { useState } from 'react'

import { Heading, Flex } from '@chakra-ui/react'

import MintForm from './MintForm'
import Review from './Review'
import Minting from './Minting'
import Minted from './Minted'

export default function Minter() {
  const [view, setView] = useState(0)
  const views = [
    {
      title: 'Form Legal Entity',
      component: <MintForm setView={setView} />,
    },
    {
      title: 'Review Agreement',
      component: <Review />,
    },
    {
      title: 'Minting...',
      component: <Minting />,
    },
    {
      title: 'Congratulations!',
      component: <Minted />,
    },
  ]

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
      <Heading>{views[view]['title']}</Heading>
      {views[view]['component']}
    </Flex>
  )
}
