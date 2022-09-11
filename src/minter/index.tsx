import { useState } from 'react'
import Tilt from 'react-parallax-tilt'

import Choice from './choice'
import Form from './form'
import Confirm from './Confirm'
import Success from './success/Success'

import { StoreT } from './types'

export default function Skeleton() {
  const [view, setView] = useState(0)
  const [store, setStore] = useState<StoreT>({
    entity: '',
    juris: '',
    name: '',
    mission: '',
    jurisdiction: '',
    tokenId: 0,
    uri: '',
    txHash: '',
  })

  const views = [
    <Choice key={'choice'} setScreen={setView} setChoice={setStore} choice={store} />,
    <Form key={'form'} store={store} setStore={setStore} setView={setView} />,
    <Confirm key={'confirm'} store={store} setStore={setStore} setView={setView} />,
    <Success key={'success'} store={store} />,
  ]

  return (
    <Tilt
      className="rounded-xl"
      perspective={1300}
      transitionSpeed={300}
      tiltMaxAngleX={1}
      tiltMaxAngleY={1}
      glareEnable={true}
      glareMaxOpacity={0.01}
      glarePosition={'all'}
    >
      <div className="p-4 w-full bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-zinc-900 dark:border-zinc-800">
        {views[view]}
      </div>
    </Tilt>
  )
}
