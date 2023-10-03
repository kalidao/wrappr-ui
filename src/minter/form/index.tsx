import React from 'react'
import { StoreT } from '../types'
import { badgeVariants } from '~/components/ui/badge'

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

interface Form {
  heading: string
  description: string
  link: string
  component: React.ReactNode
}

export default function Form({ store, setStore, setView }: Props) {
  const choice: string = store?.juris + store?.entity

  const form: { [key: string]: Form } = {
    deLLC: {
      heading: 'Delaware LLC',
      description: 'Delaware is the gold standard for corporate law. Members can remain anonymous.',
      link: 'https://docs.wrappr.wtf/how-to/LLC',
      component: <LLC store={store} setStore={setStore} setView={setView} />,
    },
    wyLLC: {
      heading: 'Wyoming LLC',
      description: 'Wyoming is friendly to digital assets. Members can remain anonymous.',
      link: 'https://docs.wrappr.wtf/how-to/LLC',
      component: <LLC store={store} setStore={setStore} setView={setView} />,
    },
    deUNA: {
      heading: 'Delaware UNA',
      description: 'Delaware is the gold standard for corporate law. Members can remain anonymous.',
      link: 'https://docs.wrappr.wtf/how-to/non-profit/',
      component: <UNA store={store} setStore={setStore} setView={setView} />,
    },
    wyUNA: {
      heading: 'Wyoming UNA',
      description: 'Wyoming is friendly to digital assets. Members can remain anonymous.',
      link: 'https://docs.wrappr.wtf/how-to/non-profit/',
      component: <UNA store={store} setStore={setStore} setView={setView} />,
    },
    lexCharter: {
      heading: 'DAO Charter',
      description:
        'A simple membership agreement for DAOs with emphasis on code deference. Based on LeXpunK legal defense forms.',
      link: 'https://docs.wrappr.wtf/how-to/charter/#lexpunk-dao-charter',
      component: <Charter store={store} setStore={setStore} setView={setView} />,
    },
    orCharter: {
      heading: 'Orange Charter',
      description:
        'A simple membership agreement for DAOs with emphasis on social structure and regular cadence. Based on Orange DAO.',
      link: 'https://docs.wrappr.wtf/how-to/charter/#lexpunk-dao-charter',
      component: <Charter store={store} setStore={setStore} setView={setView} />,
    },
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className="flex flex-col justify-between h-full w-full md:w-2/3 space-y-5">
        <div className="flex flex-col justify-between h-full w-full md:w-2/3 space-y-5">
          <p className="text-left text-foreground text-4xl">{form[choice]['description']}</p>
          <a
            className={badgeVariants({ variant: 'default' })}
            href={form[choice]['link']}
            target="_blank"
            rel="noopenner noreferrer"
          >
            <div className="flex items-center justify-center">
              <FaBookOpen />
              <p>Learn More</p>
            </div>
            <ArrowRightIcon />
          </a>
        </div>
      </div>
      <div>
        <Button size="icon" onClick={() => setView(0)} aria-label="Go back!">
          <ArrowLeftIcon />
        </Button>
        <p className="text-left font-semibold text-foreground">{form[choice]['heading']}</p>

        <div>{form[choice]['component']}</div>
      </div>
    </div>
  )
}

import LLC from './LLC'
import Charter from './Charter'
import UNA from './UNA'
import { Button } from '~/components/ui/button'
import { FaBookOpen } from 'react-icons/fa'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
