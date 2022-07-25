import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Button, Text } from '@chakra-ui/react'
import { MdOutlineArrowBack } from 'react-icons/md'
import Header from './Header'

type LayoutProps = {
  heading: string
  content: string
  back: boolean
  children: React.ReactNode
}

export default function Layout({ heading, content, back, children }: LayoutProps) {
  const router = useRouter()
  const title = 'Wrappr - ' + heading
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} key="description" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <Box minHeight="100vh">
        <Header />
        {back && (
          <Button variant="ghost" leftIcon={<MdOutlineArrowBack />} onClick={() => router.back()}>
            Back
          </Button>
        )}
        {children}
      </Box>
    </>
  )
}
