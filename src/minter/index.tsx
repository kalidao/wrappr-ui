import { useState } from 'react'
import { Box } from '@kalidao/reality'
import Choice from './choice'
import Form from './form'
import Confirm from './Confirm'
import Success from './success/Success'
import { StoreT } from './types'
import * as styles from './styles.css'

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
    <Choice key={'choice'} setScreen={setView} setChoice={setStore} choice={store} />,
    <Form key={'form'} store={store} setStore={setStore} setView={setView} />,
    <Confirm key={'confirm'} store={store} setStore={setStore} setView={setView} />,
    <Success key={'success'} store={store} />,
  ]

  return <Box className={styles.container}>{views[view]}</Box>
}
