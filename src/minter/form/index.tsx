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
  description: string
  link: string
  component: React.ReactNode
}

export default function Form({ store, setStore, setView }: Props) {
  const choice: string = store?.juris + store?.entity

  const form: { [key: string]: Form } = {
    deLLC: {
      heading: 'Delaware LLC',
      description: 'A Delaware LLC is a limited liability company that is formed under the laws of the state of Delaware.',
      link: 'https://www.delawareinc.com/llc/',
      component: <LLC store={store} setStore={setStore} setView={setView} />,
    },
    wyLLC: {
      heading: 'Wyoming LLC',
      description: 'A Wyoming LLC is a limited liability company that is formed under the laws of the state of Wyoming.',
      link: 'https://www.wyomingllc.com/',
      component: <LLC store={store} setStore={setStore} setView={setView} />,
    },
    deUNA: {
      heading: 'Delaware UNA',
      description: 'A Delaware UNA is a unitary non-asset corporation that is formed under the laws of the state of Delaware.',
      link: 'https://www.delawareinc.com/una/',
      component: <UNA store={store} setStore={setStore} setView={setView} />,
    },
    wyUNA: {
      heading: 'Wyoming UNA',
      description: 'A Wyoming UNA is a unitary non-asset corporation that is formed under the laws of the state of Wyoming.',
      link: 'https://www.wyomingllc.com/',
      component: <UNA store={store} setStore={setStore} setView={setView} />,
    },
    lexCharter: {
      heading: 'LexPunk Charter',
      description: 'A LexPunk Charter is a charter that is formed under the laws of the state of Delaware.',
      link: 'https://www.delawareinc.com/lexpunk/',
      component: <Charter store={store} setStore={setStore} setView={setView} />,
    },
    orCharter: {
      heading: 'Orange Charter',
      description: 'A Orange Charter is a charter that is formed under the laws of the state of Wyoming.',
      link: 'https://www.wyomingllc.com/',
      component: <Charter store={store} setStore={setStore} setView={setView} />,
    },
  }

  return (
    <Box
      display={'flex'}
      flexDirection={{
        xs: 'column',
        md: 'row',
      }}
    >
      <Box className={styles.splashContainer}>
        <Box display="flex" flexDirection={"column"} width={{
          xs: "full",
          md: "2/3",
        }} gap="5">
          <Text size="headingOne" color="foreground" align="left">
            {form[choice]['description']}
          </Text>
          <Box as="a" className={styles.pill} href={form[choice]['link']} target="_blank">
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
