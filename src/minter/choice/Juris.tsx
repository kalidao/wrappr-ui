import Card from './Card'
import { StoreT } from '../types'

type Props = {
  choice: StoreT
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
  setScreen: React.Dispatch<React.SetStateAction<number>>
}

export default function Juris({ choice, setChoice, setScreen }: Props) {
  const setJuris = (to: string) => {
    setChoice({ ...choice, juris: to })
    setScreen(1)
  }

  console.log('choice', choice)
  return (
    <div className="grid gap-1 grid-cols-1">
      {choice.entity.toLowerCase() !== 'charter'
        ? entity.map(({ text, set }) => <Card key={text} name={text} onClick={() => setJuris(set)} />)
        : charter.map(({ text, set }) => <Card key={text} name={text} onClick={() => setJuris(set)} />)}
    </div>
  )
}

const entity = [
  {
    text: 'Delaware',
    set: 'de',
  },
  {
    text: 'Wyoming',
    set: 'wy',
  },
]

const charter = [
  {
    text: 'LexPunk',
    set: 'lex',
  },
  { text: 'Orange', set: 'or' },
]
