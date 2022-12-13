import Card from './Card'
import { StoreT } from '../types'
import {
  Stack,
  Button,
  Box,
  Text,
  IconBookOpen,
  IconArrowRight,
  IconChevronRight,
  IconArrowLeft,
} from '@kalidao/reality'
import * as styles from '../styles.css'

type Props = {
  choice: StoreT
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
  setScreen: React.Dispatch<React.SetStateAction<number>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function Juris({ choice, setChoice, setView, setScreen }: Props) {
  const setJuris = (to: string) => {
    setChoice({ ...choice, juris: to })
    setScreen(1)
  }

  const back = () => {
    setView(0)
    setChoice({
      ...choice,
      juris: '',
      entity: '',
    })
  }

  console.log('choice', choice)
  const info: {
    [key: string]: {
      description: string
      link: string
    }
  } = {
    LLC: {
      description:
        'A Delaware LLC is a limited liability company that is formed under the laws of the state of Delaware.',
      link: 'https://www.delawareinc.com/llc/',
    },
    UNA: {
      description:
        'A Delaware UNA is a unitary non-asset corporation that is formed under the laws of the state of Delaware.',
      link: 'https://www.delawareinc.com/una/',
    },
    Charter: {
      description: 'A LexPunk Charter is a charter that is formed under the laws of the state of Delaware.',
      link: 'https://www.delawareinc.com/lexpunk/',
    },
  }

  return (
    <Box
      display={'flex'}
      flexDirection={{
        xs: 'column',
        md: 'row',
      }}
    >
      <Box className={styles.splashContainer}>
        <Box
          display="flex"
          flexDirection={'column'}
          width={{
            xs: 'full',
            md: '2/3',
          }}
          gap="5"
        >
          <Text size="headingOne" color="foreground" align="left">
            {info[choice.entity].description}
          </Text>
          <Box as="a" className={styles.pill} href={info[choice.entity].link} target="_blank">
            <Stack direction={'horizontal'} align="center">
              <IconBookOpen />
              <Text>Learn More</Text>
            </Stack>
            <IconArrowRight />
          </Box>
        </Box>
      </Box>
      <Box className={styles.action}>
        <Stack>
          <Box className={styles.back} as="button" onClick={back} aria-label="Go back!">
            <IconArrowLeft />
          </Box>
          <Text size="headingOne" align="left" weight="semiBold" color="foreground">
            Select Jurisdiction
          </Text>
        </Stack>
        <Box className={styles.actionCards}>
          {choice.entity.toLowerCase() !== 'charter'
            ? entity.map(({ text, set }) => (
                <Button
                  key={text}
                  tone="foreground"
                  suffix={<IconChevronRight />}
                  width="3/4"
                  justifyContent="space-between"
                  onClick={() => setJuris(set)}
                >
                  {text}
                </Button>
              ))
            : charter.map(({ text, set }) => (
                <Button
                  key={text}
                  tone="foreground"
                  suffix={<IconChevronRight />}
                  width="3/4"
                  justifyContent="space-between"
                  onClick={() => setJuris(set)}
                >
                  {text}
                </Button>
              ))}
        </Box>
      </Box>
    </Box>
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
