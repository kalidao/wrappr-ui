import React from 'react'
import { StoreT } from '../types'
import { Button } from '~/components/ui/button'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

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
    <div className="flex-col md:flex-row space-y-5">
      <div className="flex flex-row space-x-2 border-b">
        <BackButton onClick={() => setView(0)} disabled={true} />
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {form[choice]['heading']}
        </h2>
      </div>
      <div className="flex flex-col space-y-2">{form[choice]['component']}</div>
    </div>
  )
}

import LLC from './LLC'
import Charter from './Charter'
import UNA from './UNA'
import { BackButton } from '~/components/back-button'
