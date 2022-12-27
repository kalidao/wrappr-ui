import { useState } from 'react'
import { Box } from '@kalidao/reality'

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
    <Juris key={'juris'} choice={choice} setChoice={setChoice} setView={setView} setScreen={setScreen} />,
  ]

  return <Box>{views[view]}</Box>
}
