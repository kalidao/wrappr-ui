import type { NextPage } from 'next'
import { useState } from 'react'
import Layout from '~/layout'
import { useRouter } from 'next/router'
import { Heading, Input, Text, Button, Box, Avatar, Divider, Stack } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils/fetcher'
import { useAccount } from 'wagmi'
import { Disclaimer } from '~/lexy'
import { motion } from 'framer-motion'
import * as styles from '@design/lexy.css'

const Lexy: NextPage = () => {
  const router = useRouter()
  const [input, setInput] = useState<string>('')
  const [context, setContext] = useState<string[]>([])
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const { address, isConnected } = useAccount()
  const { data: profile } = useQuery(['userProfile', address], () => fetcher(`/api/users/${address}`), {
    enabled: isConnected,
  })
  const [checked, setChecked] = useState(false)

  const ask = async () => {
    setLoading(true)
    if (!input || !isConnected) return

    setInput('')

    // Convert context to messages format
    const messages = context.map((msg, idx) => {
        return { role: idx % 2 === 0 ? 'system' : 'user', content: msg };
    });
    messages.push({ role: 'user', content: input });

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'This is a conversation between Lexy, a legal AI chatbot and human. Lexy, please help the user with legal information about DAOs.',
            },
            ...messages,
          ],
          max_tokens: 1024,
          temperature: 0.5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: [' Human:', ' AI:'],
        }),
      }).then((res) => res.json());
      if (res) {
        if (res.error) {
          setError(res?.error?.message);
          return;
        }
        setContext((prev) => [...prev, input, res?.choices?.[0]?.text]);
      }
    } catch (e) {
      console.error(e);
      setError('Oops! There was an error.');
    }
    setLoading(false);
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
                  <Avatar label="Profile Picture" src={i % 2 !== 0 ? '/lexy.jpeg' : profile?.picture}></Avatar>
                  <Box className={styles.text}>{c}</Box>
                </Box>
              ))}
              <Box className={styles.message}>
              <Avatar label="Custom Image" src="https://pbs.twimg.com/profile_images/1651277319279984653/YSuLuNlg_400x400.jpg"></Avatar>
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