import { Box, Text, Stack, Divider } from '@kalidao/reality'
import * as styles from './styles.css'
import { siteConfig } from '@/config/siteConfig'
export default function Header() {
  return (
    <Box as="footer" className={styles.footer}>
      <Text color="textSecondary">
        Made with ♡ by <a href={siteConfig.links.twitter}>KaliCo</a>.
      </Text>
      <Stack justify="center" direction={'horizontal'}>
        <a href={siteConfig.links.tos} target="_blank" rel="noopenner noreferrer">
          Terms
        </a>
        <Divider orientation="vertical" />
        <a href={siteConfig.links.privacy} target="_blank" rel="noopenner noreferrer">
          Privacy Policy
        </a>
      </Stack>
    </Box>
  )
}
