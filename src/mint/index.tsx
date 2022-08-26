import React, { useState } from 'react'

import { Heading, Flex, IconButton } from '@chakra-ui/react'
import { MdOutlineArrowBack } from 'react-icons/md'

import MintForm from './MintForm'
import Review from './Review'
import Minting from './Minting'
import Minted from './Minted'

import { StoreT } from './types'

export default function Minter() {
  const [view, setView] = useState(0)
  const [store, setStore] = useState<StoreT>({
    minting: 'delSeries',
    name: 'Name',
    tokenId: 0,
    data: null,
  })

  const views = [
    {
      title: 'Form Legal Entity',
      component: <MintForm setView={setView} store={store} setStore={setStore} />,
    },
    {
      title: 'Review Agreement',
      component: <Review store={store} setStore={setStore} setView={setView} />,
    },
    {
      title: 'Minting...',
      component: <Minting />,
    },
    {
      title: 'Congratulations!',
      component: <Minted store={store} />,
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
      mb={['10%', '1.3%', '2.5%', '5%']}
      gap={5}
      boxShadow={'1.5px -1.5px 5px 2px #30FDFD'}
    >
      <Flex justify="space-between" align="center">
        <Heading>{views[view]['title']}</Heading>
        {view === 1 && (
          <IconButton
            variant="ghost"
            maxWidth={1}
            colorScheme={'brand'}
            onClick={() => setView(0)}
            aria-label="Go back!"
            icon={<MdOutlineArrowBack />}
            isRound
          />
        )}
      </Flex>
      {views[view]['component']}
    </Flex>
  )
}
