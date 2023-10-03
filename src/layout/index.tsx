import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'
import { Button } from '~/components/ui/button'
import { ArrowLeftIcon, HandIcon } from '@radix-ui/react-icons'

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
    <div className="bg-background min-h-screen">
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
      <div className="m-3">
        {back && (
          <Button size="sm" variant="outline" className="rounded-full" onClick={back}>
            <ArrowLeftIcon />
          </Button>
        )}
      </div>
      <div className="min-h-[90vh] relative">{children}</div>
      {chatActive ? null : (
        <Link
          className="fixed bottom-6 right-6 p-3 bg-accent text-accent-foreground rounded-full z-10 hover:animate-bounce"
          href="/lexy"
          passHref
        >
          <HandIcon />
        </Link>
      )}
      <Footer />
    </div>
  )
}
