import { useState } from 'react'
import CreateForm from './Form'
import Confirmation from './Confirmation'
import { StoreC } from './types'

export default function CreateControl() {
  const [view, setView] = useState(0)
  const [store, setStore] = useState<StoreC>({
    hash: '',
    uri: '',
  })

  const views = [
    <CreateForm key={1} store={store} setView={setView} setStore={setStore} />,
    <Confirmation key={1} store={store} />,
  ]
  return <div className="flex items-center justify-center">{views[view]}</div>
}
