import { GiBriefcase, GiThreeLeaves, GiTiedScroll } from 'react-icons/gi'
import { StoreT } from '../types'
import Card from './Card'
import {
  Box,
  Text,
  Divider,
  Button,
  Stack,
  Heading,
  IconLightningBolt,
  IconChevronRight,
  IconBookOpen,
  IconArrowRight,
  IconArrowLeft,
} from '@kalidao/reality'
import * as styles from '../styles.css'

type Props = {
  choice: StoreT
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function Entity({ choice, setChoice, setView }: Props) {
  const setEntity = (to: string) => {
    setChoice({
      ...choice,
      entity: to,
    })
    setView(1)
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
            Wrappr NFTs: the future of legal ownership. Transform your organization with our exclusive platform.
          </Text>
          <Box as="a" className={styles.pill} href="https://docs.wrappr.wtf/how-to/quick-notes/" target="_blank">
            <Stack direction={'horizontal'} align="center">
              <IconBookOpen />
              <Text>How it works</Text>
            </Stack>
            <IconArrowRight />
          </Box>
        </Box>
      </Box>
      <Box className={styles.action}>
        <Stack>
          <Box className={styles.back} as="button" disabled={true}>
            <IconArrowLeft />
          </Box>
          <Text size="headingOne" align="left" weight="semiBold" color="foreground">
            Mint Wrappr
          </Text>
        </Stack>
        <Box className={styles.actionCards}>
          <Button
            tone="foreground"
            suffix={<IconChevronRight />}
            width="3/4"
            justifyContent="space-between"
            onClick={() => setEntity('LLC')}
          >
            LLC
          </Button>
          <Button
            tone="foreground"
            suffix={<IconChevronRight />}
            width="3/4"
            justifyContent="space-between"
            onClick={() => setEntity('UNA')}
          >
            UNA
          </Button>
          <Button
            tone="foreground"
            suffix={<IconChevronRight />}
            width="3/4"
            justifyContent="space-between"
            onClick={() => setEntity('Charter')}
          >
            Charter
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
