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
        <Text color="textSecondary">
          <Link href="/tos">Terms</Link>
        </Text>
        <Divider orientation="vertical" />
        <Text color="textSecondary">
          <Link href="/privacy">Privacy Policy</Link>
        </Text>
      </Stack>
    </Box>
  )
}
