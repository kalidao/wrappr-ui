import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils/fetcher'
import { useAccount } from 'wagmi'
import { Avatar, Box, Button, Divider, Heading, Input, Stack, Text } from '@kalidao/reality'
import Layout from '~/layout'
import * as styles from '@design/lexy.css'
import { Disclaimer } from '~/lexy'
import { ChatMessage, getChatCompletion } from '~/lexy/utils'

const defaultProfile = 'https://pbs.twimg.com/profile_images/1651277319279984653/YSuLuNlg_400x400.jpg'

const Lexy: NextPage = () => {
  const router = useRouter()
  const [input, setInput] = useState<string>('')
  const [context, setContext] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const { address, isConnected } = useAccount()
  const { data: profile } = useQuery(['userProfile', address], () => fetcher(`/api/users/${address}`), {
    enabled: isConnected,
  })
  const [checked, setChecked] = useState(false)

  const ask = async () => {
    try {
      setLoading(true)
      if (!input || !isConnected) {
        throw new Error('Please connect your wallet and type a question.')
      }

      setInput('')
      let ctx: ChatMessage[] = [...context, { role: 'user', content: input }]
      setContext(ctx)

      let res = await getChatCompletion(ctx)

      ctx.push({ role: 'assistant', content: res.content })
      setContext(ctx)
    } catch (err) {
      console.error(err)
      setError("Sorry, I couldn't generate a valid response. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout heading="Lexy" content="Interact with LexDAO's legal engineering assistant" back={() => router.push('/')}>
      <Box className={styles.container}>
        <Stack align="center" justify={'center'}>
          <Heading>Chat with Lexy</Heading>
          <Text>Lexy is a legal assistant built on GPT.</Text>
          <Divider />
          {!checked ? (
            <Disclaimer checked={checked} setChecked={setChecked} />
          ) : (
            <Box className={styles.chat}>
              {context.map((c, i) => (
                <Box key={i} className={styles.message}>
                  <Avatar
                    label="aiAvatar"
                    src={c.role == 'assistant' ? '/lexy.jpeg' : profile?.picture ?? defaultProfile}
                  ></Avatar>
                  <Box className={styles.text}>{c.content}</Box>
                </Box>
              ))}
              <Box className={styles.message}>
                <Avatar label="" src={defaultProfile}></Avatar>
                <Input
                  label="Type your question here"
                  hideLabel
                  placeholder="Type here"
                  value={input}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      ask()
                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
                />
              </Box>
              <Text>{error}</Text>
              {!isConnected && <Text>Please connect your wallet to start chatting with Lexy.</Text>}
              <Button
                width="full"
                onClick={ask}
                loading={loading}
                disabled={loading || !isConnected || !checked}
                tone="foreground"
              >
                Message
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    </Layout>
  )
}

export default Lexy
