import { StoreT } from '../types'
import {
  Box,
  Text,
  Button,
  Stack,
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
  setScreen: React.Dispatch<React.SetStateAction<number>>
}

export default function Entity({ choice, setChoice, setView, setScreen }: Props) {
  const setEntity = (to: string) => {
    setChoice({
      ...choice,
      entity: to,
    });
    if (to === 'UNA') {
      setScreen(1);
    } else {
      setView(1);
    }
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
            Legal wrappers for your digital assets
          </Text>
          <Box as="a" className={styles.pill} href="https://docs.wrappr.wtf/get-started/what/" target="_blank">
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
            Mint
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
            Non-Profit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
