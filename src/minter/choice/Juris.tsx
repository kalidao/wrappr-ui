import { ArrowRightIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { StoreT } from '../types'
import { Button } from '~/components/ui/button'
import { FaBookOpen } from 'react-icons/fa'

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
        'Your LLC will be created after minting. State formation and taxes included. Which jurisdiction do you want?',
      link: 'https://docs.wrappr.wtf/how-to/LLC/',
    },
    UNA: {
      description: 'Your Non-Profit (UNA) will be created after minting. Which jurisdiction do you want?',
      link: 'https://daos.paradigm.xyz/',
    },
    Charter: {
      description:
        'Your DAO Charter will be drafted after minting. This is a simple membership agreement signable with DAO vote or key-signature.',
      link: 'https://docs.wrappr.wtf/how-to/charter/#%F0%9F%93%9C-dao-charter',
    },
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div>
        <div className="flex flex-col w-full md:w-2/3 space-y-5">
          <p className="text-foreground text-xl align-left">{info[choice.entity].description}</p>
          <a href={info[choice.entity].link} target="_blank" rel="noopenner noreferrer">
            <div className="flex flex-row items-center">
              <FaBookOpen />
              <p>Learn More</p>
            </div>
            <ArrowRightIcon />
          </a>
        </div>
      </div>
      <div>
        <div>
          <Button onClick={back} aria-label="Go back!">
            <ArrowRightIcon />
          </Button>
          <p className="text-left font-semibold text-foreground">Select Jurisdiction</p>
        </div>
        <div>
          {entity.map(({ text, set }) => (
            <Button key={text} className="flex items-center justify-between w-full" onClick={() => setJuris(set)}>
              <ChevronRightIcon />
              {text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

const entity = [
  {
    text: 'Delaware',
    description: 'Standard business-friendly jurisdiction.',
    set: 'de',
    type: 'Jurisdiction',
    icon: <span className="text-xl">🏢</span>,
    learn: 'https://docs.wrappr.wtf/get-started/where/#%F0%9F%8F%A2-delaware',
  },
  {
    text: 'Wyoming',
    description: 'Emerging crypto-friendly jurisdiction.',
    set: 'wy',
    icon: <span className="text-xl">🌇</span>,
    learn: 'https://docs.wrappr.wtf/get-started/where/#%F0%9F%A6%AC-wyoming',
  },
]
