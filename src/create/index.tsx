import { useState } from 'react'
import CreateForm from './Form'
import Confirmation from './Confirmation'
import { StoreC } from './types'
import { Box } from '@kalidao/reality'

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
  return (
    <Box display="flex" alignItems="center" justifyContent={'center'} >
      {views[view]}
    </Box>
  )
}
