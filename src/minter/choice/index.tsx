import { useState } from 'react'
import { Box, Button, IconArrowLeft } from '@kalidao/reality'

import Entity from './Entity'
import Juris from './Juris'
import { StoreT } from '../types'

type Props = {
  setScreen: React.Dispatch<React.SetStateAction<number>>
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
  choice: StoreT
}

export default function Choice({ setScreen, setChoice, choice }: Props) {
  const [view, setView] = useState(0)
  const back = () => {
    setView(0)
    setChoice({
      ...choice,
      juris: '',
      entity: '',
    })
  }

  const views = [
    <Entity key={'entity'} choice={choice} setChoice={setChoice} setView={setView} />,
    <Juris key={'juris'} choice={choice} setChoice={setChoice} setScreen={setScreen} />,
  ]

  return (
    <Box>
      <Box>
        {view === 1 && (
          <Button variant="transparent" onClick={back} aria-label="Go back!">
            <IconArrowLeft />
          </Button>
        )}
      </Box>
      <Box>{views[view]}</Box>
    </Box>
  )
}
