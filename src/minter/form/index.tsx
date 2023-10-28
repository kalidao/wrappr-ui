import React from 'react'
import { StoreT } from '../types'
import { buttonVariants } from '~/components/ui/button'
import { Icons } from '~/components/ui/icons'
import { BackButton } from '~/components/back-button'
import { ViewsEnum, useMinterStore } from '../useMinterStore'

type Props = {
  store: StoreT
  setStore: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

interface Form {
  heading: string
  description: string
  link: string
}

export default function FormShell({
  choice,
  children,
}: {
  choice: 'wyUNA' | 'miLLC' | 'deLLC'
  children: React.ReactNode
}) {
  const { setView } = useMinterStore()

  const form: { [key: string]: Form } = {
    deLLC: {
      heading: 'Delaware LLC',
      description: 'Delaware is the gold standard for corporate law. Members can remain anonymous.',
      link: 'https://docs.wrappr.wtf/how-to/LLC',
    },
    wyUNA: {
      heading: 'UNA',
      description: 'Wyoming is friendly to digital assets. Members can remain anonymous.',
      link: 'https://docs.wrappr.wtf/how-to/non-profit/',
    },
    miLLC: {
      heading: 'Marshall Islands LLC',
      description: 'Marshall Islands offers an offshore alternative for LLC formation',
      link: 'https://docs.wrappr.wtf/how-to/LLC',
    },
  }
  const selectedForm = form[choice] || form['wyUNA']

  return (
    <div>
      <div className="flex flex-col space-y-2 border-b">
        <BackButton onClick={() => setView(choice === 'wyUNA' ? ViewsEnum.entity : ViewsEnum.juris)} />
        <h2 className="scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
          {selectedForm['heading']}
        </h2>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  )
}
