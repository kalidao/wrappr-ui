import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { StoreT } from '../types'
import { badgeVariants } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { FaBookOpen } from 'react-icons/fa'
import { BackButton } from '~/components/back-button'

type Props = {
  choice: StoreT
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
  setScreen: React.Dispatch<React.SetStateAction<number>>
}

export default function Entity({ choice, setChoice, setView, setScreen }: Props) {
  const setEntity = (to: string) => {
    setChoice({
      ...choice,
      entity: to,
    })
    if (to === 'UNA') {
      setScreen(1)
    } else {
      setView(1)
    }
  }

  return (
    <div className="flex-col md:flex-row space-y-5">
      <div className="flex flex-row space-x-2 border-b">
        <BackButton onClick={() => setView(0)} disabled={true} />
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Mint</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <Button className="flex items-center justify-between w-3/4" onClick={() => setEntity('LLC')}>
          <ChevronRightIcon />
          LLC
        </Button>
        <Button className="flex items-center justify-between w-3/4" onClick={() => setEntity('UNA')}>
          <ChevronRightIcon />
          Non-Profit
        </Button>
      </div>
    </div>
  )
}
