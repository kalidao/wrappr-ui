import React from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Header from './Header'

type LayoutProps = {
  heading: string
  content: string
  children: React.ReactNode
}

export default function Layout({ heading, content, children }: LayoutProps) {
  const title = 'Wrappr - ' + heading
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} key="description" />
      </Head>
      <Box minHeight="100vh">
        <Header />
        {children}
      </Box>
    </>
  )
}
