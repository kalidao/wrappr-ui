import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Box, IconArrowLeft, IconHand } from '@kalidao/reality'
import Header from './Header'
import Footer from './Footer'
import * as styles from './styles.css'
import { useRouter } from 'next/router'

type LayoutProps = {
  heading: string
  content: string
  back?: () => any
  children?: React.ReactNode
}

export default function Layout({ heading, content, back, children }: LayoutProps) {
  const title = 'Wrappr - ' + heading
  const router = useRouter()
  const chatActive = router.pathname === '/lexy' ? true : false

  return (
    <Box className={styles.layout}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name="description" property="og:description" content={content} key="description" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <Header />
      <Box margin="3">
        {back && (
          <Button shape="circle" size="small" variant="transparent" onClick={back}>
            <IconArrowLeft />
          </Button>
        )}
      </Box>
      <Box className={styles.container}>{children}</Box>
      {chatActive ? null : (
        <Link href="/lexy" passHref>
          <Box as="a" className={styles.chat}>
            <IconHand />
          </Box>
        </Link>
      )}
      <Footer />
    </Box>
  )
}
