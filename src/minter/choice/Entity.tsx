import { GiBriefcase, GiThreeLeaves, GiTiedScroll } from 'react-icons/gi'
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
    <div className="grid gap-1 grid-cols-2">
      <Card
        name="LLC"
        cta="Mint"
        learn="https://www.wrappr.wtf/how-to/LLC/"
        icon={<GiBriefcase />}
        description={'Enjoy limited legal liability'}
        onClick={() => setEntity('LLC')}
      />
      <Card
        name="UNA"
        cta="Mint"
        learn="https://www.wrappr.wtf/how-to/UNA/"
        icon={<GiThreeLeaves />}
        description={'Qualify for tax benefits as a Non-Profit'}
        onClick={() => setEntity('UNA')}
      />
      <Card
        name="Charter"
        cta="Mint"
        learn="https://www.wrappr.wtf/how-to/charter/"
        icon={<GiTiedScroll />}
        description={'Govern yourself'}
        onClick={() => setEntity('Charter')}
      />
    </div>
  )
}
