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

  const views = [<CreateForm store={store} setView={setView} setStore={setStore} />, <Confirmation store={store} />]
  return <>{views[view]}</>
}
