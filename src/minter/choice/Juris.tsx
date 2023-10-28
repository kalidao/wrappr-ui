import { StoreT } from '../types'
import { Button, buttonVariants } from '~/components/ui/button'
import { BackButton } from '~/components/back-button'
import { Icons } from '~/components/ui/icons'
import { Jurisdiction, ViewsEnum, useMinterStore } from '../useMinterStore'

type Props = {
  choice: StoreT
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
  setScreen: React.Dispatch<React.SetStateAction<number>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function Juris() {
  const { entity, setJuris: setStoreJuris, setView, reset } = useMinterStore()

  const setJuris = (to: Exclude<Jurisdiction, 'wy'>) => {
    setStoreJuris(to)
    setView(to === 'de' ? ViewsEnum.deLLC : ViewsEnum.miLLC)
  }

  const back = () => {
    setView(ViewsEnum.entity)
    reset()
  }

  const filteredEntity = entities.filter(
    (item) => entity === 'LLC' && (item.text === 'Delaware' || item.text === 'Offshore'),
  )

  return (
    <div>
      <div>
        <div className="flex flex-col space-y-2 border-b">
          <BackButton onClick={back} />
          <h2 className="scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
            Jurisdiction
          </h2>
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          {filteredEntity.map(({ text, set }) => (
            <Button
              key={text}
              className="flex items-center justify-between w-3/4 text-xl rounded-xl p-5"
              onClick={() => setJuris(set as 'de' | 'mi')}
            >
              {text}
              <Icons.chevronRight className="ml-2" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

const entities = [
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
  {
    text: 'Offshore',
    description: 'Offshore alternative to Delaware.',
    set: 'mi',
    icon: <span className="text-xl">🏝️</span>,
    learn: 'https://docs.wrappr.wtf/get-started/where/#%F0%9F%8F%A2-delaware',
  },
]
