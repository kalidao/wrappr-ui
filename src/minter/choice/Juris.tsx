import Card from './Card'
import { StoreT } from '../types'
import { Grid } from '@chakra-ui/react'
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
    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']} gap={1}>
      {choice.entity.toLowerCase() !== 'charter'
        ? entity.map(({ text, icon, learn, description, set }) => (
            <Card
              key={text}
              name={text}
              description={description}
              cta="Use"
              icon={icon}
              learn={learn}
              onClick={() => setJuris(set)}
            />
          ))
        : charter.map(({ text, icon, learn, description, set }) => (
            <Card
              key={text}
              name={text}
              description={description}
              cta="Use"
              icon={icon}
              learn={learn}
              onClick={() => setJuris(set)}
            />
          ))}
    </Grid>
  )
}

const entity = [
  {
    text: 'Delaware',
    description: 'Preferred state for doing business',
    set: 'de',
    type: 'Jurisdiction',
    icon: <span className="text-xl">🏢</span>,
    learn: 'https://docs.wrappr.wtf/get-started/where/#%F0%9F%8F%A2-delaware',
  },
  {
    text: 'Wyoming',
    description: 'Crypto-friendly jurisdiction',
    set: 'wy',
    icon: <span className="text-xl">🌇</span>,
    learn: 'https://docs.wrappr.wtf/get-started/where/#%F0%9F%A6%AC-wyoming',
  },
]

const charter = [
  {
    text: 'LexPunk',
    icon: <span className="text-xl">🦍</span>,
    description: 'stateless entity with qualified code deference',
    set: 'lex',
    learn: 'https://docs.wrappr.wtf/how-to/charter/#%F0%9F%A6%8D-lexpunk-dao-charter',
  },
  {
    text: 'Orange',
    icon: <span className="text-xl">🍊</span>,
    description: 'stateless entity with qualified code deference',
    set: 'or',
    learn: 'https://docs.wrappr.wtf/how-to/charter/#%F0%9F%8D%8A-orange-charter',
  },
]
