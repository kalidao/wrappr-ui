import React from 'react'
import { StoreT } from '../types'
import { MdOutlineArrowBack } from 'react-icons/md'

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

interface Form {
  heading: string
  component: React.ReactNode
}

export default function Form({ store, setStore, setView }: Props) {
  const choice: string = store?.juris + store?.entity
  console.log('store', store, choice)

  const form: { [key: string]: Form } = {
    deLLC: {
      heading: 'Delaware LLC',
      component: <LLC store={store} setStore={setStore} setView={setView} />,
    },
    wyLLC: {
      heading: 'Wyoming LLC',
      component: <LLC store={store} setStore={setStore} setView={setView} />,
    },
    deUNA: {
      heading: 'Delaware UNA',
      component: <UNA store={store} setStore={setStore} setView={setView} />,
    },
    wyUNA: {
      heading: 'Wyoming UNA',
      component: <UNA store={store} setStore={setStore} setView={setView} />,
    },
    lexCharter: {
      heading: 'LexPunk Charter',
      component: <Charter store={store} setStore={setStore} setView={setView} />,
    },
    orCharter: {
      heading: 'Orange Charter',
      component: <Charter store={store} setStore={setStore} setView={setView} />,
    },
  }
  return (
    <div className="flex-col space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{form[choice]['heading']}</h1>
        <IconButton
          variant="ghost"
          maxWidth={1}
          colorScheme={'brand'}
          onClick={() => setView(0)}
          aria-label="Go back!"
          icon={<MdOutlineArrowBack />}
          isRound
        />
      </div>
      <div>{form[choice]['component']}</div>
    </div>
  )
}

import LLC from './LLC'
import Charter from './Charter'
import UNA from './UNA'
import { IconButton } from '@chakra-ui/react'
