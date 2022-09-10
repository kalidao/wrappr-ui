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
    <Juris key={'juris'} choice={choice} setChoice={setChoice} />,
  ]

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Mint Entity</h1>
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
      {views[view]}
    </div>
  )
}
