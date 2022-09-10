import { StoreT } from '../types'
import Card from './Card'

type Props = {
  choice: StoreT
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function Entity({ choice, setChoice, setView }: Props) {
  const setEntity = (to: string) => {
    setChoice({
      ...choice,
      entity: to,
    })
    setView(1)
  }

  return (
    <div className="grid gap-1 grid-cols-1">
      <Card name="LLC" onClick={() => setEntity('llc')} />
      <Card name="UNA" onClick={() => setEntity('una')} />
      <Card name="Charter" onClick={() => setEntity('charter')} />
    </div>
  )
}
