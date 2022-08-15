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
  const [view, setView] = useState<string>('mint')
  const [data, setData] = useState<MintT>({
    name: '',
    jurisdiction: '',
    type: '',
  })

  type ScreenType = {
    heading: string
    component: React.ReactNode
  }
  const screen: { [key: string]: ScreenType } = {
    mint: {
      heading: 'Entity Minter',
      component: <MintForm setView={setView} setData={setData} data={data} />,
    },
    confirm: {
      heading: 'Preview',
      component: <Confirm setView={setView} data={data} />,
    },
  }

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
      <Flex align="center" justifyContent={'space-between'}>
        <Heading>{screen[view]['heading']}</Heading>
        {view === 'confirm' && (
          <IconButton
            variant="ghost"
            maxWidth={1}
            colorScheme={'brand'}
            onClick={() => setView('mint')}
            aria-label="Go back!"
            icon={<MdOutlineArrowBack />}
            isRound
          />
        )}
      </Flex>
      {screen[view]['component']}
    </Flex>
  )
}
