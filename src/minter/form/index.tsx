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
    // wyLLC: {
    //   heading: 'Wyoming LLC',
    //   description: 'Wyoming is friendly to digital assets. Members can remain anonymous.',
    //   link: 'https://docs.wrappr.wtf/how-to/LLC',
    //   component: <LLC store={store} setStore={setStore} setView={setView} />,
    // },
    // deUNA: {
    //   heading: 'Delaware UNA',
    //   description: 'Delaware is the gold standard for corporate law. Members can remain anonymous.',
    //   link: 'https://docs.wrappr.wtf/how-to/non-profit/',
    //   component: <UNA store={store} setStore={setStore} setView={setView} />,
    // },
    wyUNA: {
      heading: 'UNA',
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
    miLLC: {
      heading: 'Marshall Islands LLC',
      description: 'Marshall Islands offers an offshore alternative for LLC formation',
      link: 'https://docs.wrappr.wtf/how-to/LLC',
      component: <LLC store={store} setStore={setStore} setView={setView} />,
    },
  }
  const selectedForm = form[choice] || form['wyUNA']
  return (
    <Box
      display={'flex'}
      flexDirection={{
        xs: 'column',
        md: 'row',
      }}
    >
      <Box className={styles.splashContainer}>
        <Box
          display="flex"
          flexDirection={'column'}
          width={{
            xs: 'full',
            md: '2/3',
          }}
          gap="5"
        >
          <Text size="headingOne" color="foreground" align="left">
            {selectedForm['description']}
          </Text>
          <Box as="a" className={styles.pill} href={selectedForm['link']} target="_blank">
            <Stack direction={'horizontal'} align="center">
              <IconBookOpen />
              <Text>Learn More</Text>
            </Stack>
            <IconArrowRight />
          </Box>
        </Box>
      </Box>
      <Box className={styles.action}>
        <Stack>
          <Box className={styles.back} as="button" onClick={() => setView(0)} aria-label="Go back!">
            <IconArrowLeft />
          </Box>
          <Text size="headingOne" align="left" weight="semiBold" color="foreground">
            {selectedForm['heading']}
          </Text>
        </Stack>
        <Box className={styles.actionCards}>{selectedForm['component']}</Box>
      </Box>
    </Box>
  )
}

import LLC from './LLC'
import Charter from './Charter'
import UNA from './UNA'
import { BackButton } from '~/components/back-button'
