import React, { useState } from 'react'
import MintForm from './MintForm'
import Confirm from './Confirm'

export default function MintControl() {
  const [view, setView] = useState('mint')
  const screen: { [key: string]: React.ReactNode } = {
    mint: <MintForm setView={setView} />,
    confirm: <Confirm setView={setView} />,
  }

  return <>{screen[view]}</>
}
