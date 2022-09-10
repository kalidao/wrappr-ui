import Card from './Card'
import { StoreT } from '../types'

type Props = {
  choice: StoreT
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
}

export default function Juris({ choice, setChoice }: Props) {
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

  return (
    <div className="grid gap-1 grid-cols-1">
      {choice.entity !== 'charter'
        ? entity.map(({ text, set }) => (
            <Card key={text} name={text} onClick={() => setChoice({ ...choice, juris: set })} />
          ))
        : charter.map(({ text, set }) => (
            <Card key={text} name={text} onClick={() => setChoice({ ...choice, juris: set })} />
          ))}
    </div>
  )
}
