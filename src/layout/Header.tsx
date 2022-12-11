import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Button, Box, IconUserSolid, IconGrid, IconPencil, IconBookOpenSolid } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import ToggleMode from './ToggleMode'
import { useAccount, useNetwork } from 'wagmi'
import * as styles from './styles.css'
import { ReactNodeNoStrings } from '@kalidao/reality/dist/types/types'

export default function Header() {
  const router = useRouter()
  const { chain } = useNetwork()
  const { isConnected, address } = useAccount()

  return (
    <Box className={styles.header}>
      <motion.div
        whileHover={{
          rotate: Math.floor(Math.random() * (360 - 20)) + 20,
          transition: { duration: 0.2 },
        }}
        onClick={() => router.push('/')}
      >
        <Image src={'/logo.png'} height={60} width={80} alt={`Wrappr logo`} />
      </motion.div>
      <Box as="nav" display="flex" gap="2">
        {isConnected && <Item label="user" src={`/users/${address}`} icon={<IconUserSolid />} />}
        <Item label="make" src="/create" icon={<IconPencil />} />
        <Item label="find" src={`/${chain ? chain.id : 1}/explore`} icon={<IconGrid />} />
        <Item label="docs" src="https://docs.wrappr.wtf/get-started/what/" icon={<IconBookOpenSolid />} isExternal />
        <ToggleMode />
        <ConnectButton label="login" />
      </Box>
    </Box>
  )
}

type ItemProps = {
  label: string
  src: string
  icon: ReactNodeNoStrings
  isExternal?: boolean
}

const Item = ({ src, icon, label, isExternal }: ItemProps) => {
  if (isExternal) {
    return (
      <Button
        as="a"
        prefix={icon}
        href={src}
        size="small"
        variant="transparent"
        target="_blank"
        rel="noopenner noreferrer"
      >
        {label}
      </Button>
    )
  }
  return (
    <Button as="a" prefix={icon} href={src} size="small" variant="transparent">
      {label}
    </Button>
  )
}
