import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import ToggleMode from './ToggleMode'
import { useIsMounted } from '~/hooks/useIsMounted'
import { buttonVariants } from '~/components/ui/button'
import Link from 'next/link'
import { FaBookOpen, FaUser } from 'react-icons/fa'

export default function Header() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return (
    <div className="max-h-[15vh] py-5 flex items-center justify-between z-10 gap-2 relative border-b-1 border-border">
      <motion.div
        whileHover={{
          rotate: Math.floor(Math.random() * (360 - 20)) + 20,
          transition: { duration: 0.2 },
        }}
        onClick={() => router.push('/')}
      >
        <Image src={'/logo.png'} height={60} width={80} alt={`Wrappr logo`} />
      </motion.div>
      <Box as="nav" display="flex" gap="2" alignItems={'center'}>
        {/* {isConnected && <Item label="user" src={`/users/${address}`} icon={<IconUserSolid />} />} */}
        <Item label="docs" src="https://docs.wrappr.wtf/get-started/what/" icon={<IconBookOpenSolid />} isExternal />
        <ToggleMode />
      </div>
      <div className="flex">
        <ConnectButton label="login" />
      </div>
    </div>
  )
}

type ItemProps = {
  label: string
  src: string
  icon: React.ReactNode
  isExternal?: boolean
}

const Item = ({ src, label, isExternal }: ItemProps) => {
  const router = useRouter()
  const isActive = router.asPath === src

  if (isExternal) {
    return (
      <a
        href={src}
        target="_blank"
        rel="noopenner noreferrer"
        className={buttonVariants({ variant: isActive ? 'outline' : 'link' })}
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={src} className={buttonVariants({ variant: isActive ? 'outline' : 'link' })}>
      {label}
    </Link>
  )
}
