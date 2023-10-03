import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { StoreT } from '../types'
import { badgeVariants } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { FaBookOpen } from 'react-icons/fa'

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
    <div className="flex-col md:flex-row">
      <div>
        <p className="text-foreground text-xl align-left">Legal wrappers for your digital assets</p>
        <a
          className={badgeVariants({ variant: 'default' })}
          href="https://docs.wrappr.wtf/get-started/what/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-row items-center">
            <FaBookOpen />
            <p>How it works</p>
          </div>
          <ArrowRightIcon />
        </a>
      </div>
      <div>
        <div>
          <Button size="icon" disabled={true}>
            <ArrowLeftIcon />
          </Button>
          <p>Mint</p>
        </div>
        <div>
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
    </div>
  )
}
