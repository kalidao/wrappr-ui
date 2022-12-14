import Link from 'next/link'
import { Box, Text, Stack, Divider } from '@kalidao/reality'
import * as styles from './styles.css'

export default function Header() {
  return (
    <Box as="footer" className={styles.footer}>
      <Text color="textSecondary">
        Made by <a href="https://twitter.com/kali__gg">Kali</a>
      </Text>
      <Stack justify="center" direction={'horizontal'}>
        <a href="https://app.kali.gg/tos" target="_blank" rel="noopenner noreferrer">
          Terms
        </a>
        <Divider orientation="vertical" />
        <a href="https://app.kali.gg/privacy" target="_blank" rel="noopenner noreferrer">
          Privacy Policy
        </a>
      </Stack>
    </Box>
  )
}
