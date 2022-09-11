import { useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import { MdOutlineArrowBack } from 'react-icons/md'

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
    <div className="flex-col space-y-4">
      <div className="flex justify-end items-center">
        {view === 1 && (
          <IconButton
            variant="ghost"
            maxWidth={1}
            colorScheme={'brand'}
            onClick={back}
            aria-label="Go back!"
            icon={<MdOutlineArrowBack />}
            isRound
          />
        )}
      </div>
      <div>{views[view]}</div>
    </div>
  )
}
