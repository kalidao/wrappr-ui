import { useState } from 'react'
import Choice from './choice'
import Form from './form'
import Confirm from './Confirm'
import Success from './success/Success'
import { StoreT } from './types'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { FaBookOpen } from 'react-icons/fa'
import { badgeVariants } from '~/components/ui/badge'
import { cn } from '~/utils'

export default function Skeleton() {
  const [view, setView] = useState(0)
  const [store, setStore] = useState<StoreT>({
    entity: '',
    juris: '',
    name: '',
    mission: '',
    jurisdiction: '',
    tokenId: 0,
    agreement: '',
    uri: '',
    txHash: '',
  })

  const views = [
    {
      description: 'Choose your entity type',
      link: 'https://docs.wrappr.wtf/how-to/choose-entity',
      component: <Choice key={'choice'} setScreen={setView} setChoice={setStore} choice={store} />,
    },
    {
      description: 'Form',
      link: 'https://docs.wrappr.wtf/how-to/form',
      component: <Form key={'form'} store={store} setStore={setStore} setView={setView} />,
    },
    {
      description: '',
      link: '',
      component: <Confirm key={'confirm'} store={store} setStore={setStore} setView={setView} />,
    },
    {
      description: '',
      link: '',
      component: <Success key={'success'} store={store} />,
    },
  ]

  return (
    <div className="min-h-[90vh] px-5 grid grid-cols-2">
      {views[view]['description'] !== '' ? <div className={cn(views[view].description === '' ? 'hidden' : 'grid-cols-1', 'flex flex-col items-center')}>
        <p className="text-xl text-muted-foreground">{views[view]['description']}</p>
        <a
          className={cn((badgeVariants({ variant: 'default' })), 'flex flex-row items-center justify-between w-fit space-x-3')}
          href={views[view]['link']}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-row items-center space-x-1">
            <FaBookOpen />
            <p>How it works</p>
          </div>
          <ArrowRightIcon />
        </a>
      </div> : null}
      <div className={cn(view > 1 ? 'grid-cols-2' : 'grid-cols-1')}>{views[view]['component']}</div>
    </div>
  )
}

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
