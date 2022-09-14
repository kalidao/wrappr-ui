import { GiBriefcase, GiThreeLeaves, GiTiedScroll } from 'react-icons/gi'
import { StoreT } from '../types'
import Card from './Card'
import Soon from './Soon'
import { Grid, GridItem } from '@chakra-ui/react'

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
    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={1}>
      <Card
        name="LLC"
        cta="Mint"
        learn="https://docs.wrappr.wtf/how-to/LLC/"
        icon={<GiBriefcase />}
        description={'Enjoy limited legal liability'}
        onClick={() => setEntity('LLC')}
      />
      <Card
        name="UNA"
        cta="Mint"
        learn="https://docs.wrappr.wtf/how-to/UNA/"
        icon={<GiThreeLeaves />}
        description={'Qualify for tax benefits as a Non-Profit'}
        onClick={() => setEntity('UNA')}
      />
      <Card
        name="Charter"
        cta="Mint"
        learn="https://docs.wrappr.wtf/how-to/charter/"
        icon={<GiTiedScroll />}
        description={'Govern yourself'}
        onClick={() => setEntity('Charter')}
      />
      {/* create card that flips on hover  */}
      <Soon />
    </Grid>
  )
}
