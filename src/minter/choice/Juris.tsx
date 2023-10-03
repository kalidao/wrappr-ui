import { ChevronRightIcon } from '@radix-ui/react-icons'
import { StoreT } from '../types'
import { Button } from '~/components/ui/button'
import { BackButton } from '~/components/back-button'

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

  return (
    <div className="flex-col md:flex-row space-y-5">
      <div className="flex flex-row space-x-2 border-b">
        <BackButton onClick={() => setView(0)} disabled={true} />
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Select Jurisdiction
        </h2>
      </div>
      <div className="flex flex-col space-y-2">
        {entity.map(({ text, set }) => (
          <Button key={text} className="flex items-center justify-between w-full" onClick={() => setJuris(set)}>
            <ChevronRightIcon />
            {text}
          </Button>
        ))}
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
