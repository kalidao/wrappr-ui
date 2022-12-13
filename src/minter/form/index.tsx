import React from 'react'
import { StoreT } from '../types'
import { Box, Stack, Text, IconBookOpen, IconArrowRight, IconArrowLeft } from '@kalidao/reality'
import * as styles from '../styles.css'

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
    <Box display={'flex'} flexDirection={{
      xs: 'column',
      md: 'row'
    }}>
      <Box className={styles.splashContainer}>
        <Stack>
          <Text size="headingOne" color="foreground" align="left">
            Wrappr NFTs: the future of legal ownership. Transform your organization with our exclusive platform.
          </Text>
          <Box as="a" className={styles.pill} href="https://docs.wrappr.wtf/how-to/quick-notes/" target="_blank">
            <Stack direction={'horizontal'} align="center">
              <IconBookOpen />
              <Text>How it works</Text>
            </Stack>
            <IconArrowRight />
          </Box>
        </Stack>
      </Box>
      <Box className={styles.action}>
        <Stack>
          <Box className={styles.back} as="button" onClick={() => setView(0)} aria-label="Go back!">
            <IconArrowLeft />
          </Box>
          <Text size="headingOne" align="left" weight="semiBold" color="foreground">
            {form[choice]['heading']}
          </Text>
        </Stack>
        <Box className={styles.actionCards}>{form[choice]['component']}</Box>
      </Box>
    </Box>
  )
}

import LLC from './LLC'
import Charter from './Charter'
import UNA from './UNA'
