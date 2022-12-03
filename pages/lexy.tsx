import type { NextPage } from 'next'
import { useState } from 'react'
import Layout from '~/layout'
import { useRouter } from 'next/router'
import { Heading, VStack, Input, Text, Button, Box, HStack, Avatar } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils/fetcher'
import { useAccount } from 'wagmi'

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

  const ask = async () => {
    setLoading(true)
    if (!input || !isConnected) return
    let prompt
    try {
      prompt = ' Human:' + input
      setInput('')
    } catch (e) {
      console.error(e)
    }

    try {
      const currentContext = context.join('\n') + '\n' + prompt
      console.log('currentContext', currentContext)
      const res = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt:
            'This is a conversation between Lexy, a legal AI chatbot and human. \n Human: How do I form a legal structure for my DAO? \n AI: To form a legal structure for your DAO, you can choose to mint an NFT representing a legal entity or registration on wrappr.wtf \n Human: How do I form a DAO? \n AI: You can create an ERC20 token-based DAO on app.kali.gg within a minute for absolutely free right now. Kali includes voting, treasury and extensions to help grow your DAO.' +
            currentContext +
            ' AI:',
          max_tokens: 1024,
          temperature: 0.5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: [' Human:', ' AI:'],
        }),
      }).then((res) => res.json())
      if (res) {
        if (res.error) {
          setError(res?.error?.message)
          return
        }
        setContext((prev) => [...prev, input, res?.choices?.[0]?.text])
      }
    } catch (e) {
      console.error(e)
      setError('Oops! There was an error.')
    }
    setLoading(false)
  }
  return (
    <Layout heading="Lexy" content="Interact with LexDAO's legal engineering assistant" back={() => router.push('/')}>
      <Box display={'flex'} alignItems="center" justifyContent={'center'}>
        <VStack width={'container.lg'} align="center" justify={'center'}>
          <Heading>Chat with Lexy</Heading>
          <Text>Lexy is a legal assistance AI chatbot.</Text>
          {context.map((c, i) => (
            <HStack
              width={'full'}
              key={i}
              flexDirection={i % 2 !== 0 ? 'row-reverse' : 'row'}
              justify="space-between"
              gap="3"
            >
              <Avatar src={i % 2 !== 0 ? '/lexy.jpeg' : profile?.picture}></Avatar>
              <Box
                display="flex"
                alignItems={'center'}
                justifyContent="flex-start"
                width={'full'}
                padding="2"
                border="1px"
                borderColor={i % 2 !== 0 ? 'brand.900' : 'blue.900'}
                borderRadius={'2xl'}
                backgroundColor={i % 2 !== 0 ? 'brand.800' : 'blue.800'}
              >
                {c}
              </Box>
            </HStack>
          ))}
          <HStack width="full">
            <Avatar src={profile?.picture}></Avatar>
            <Input
              placeholder="Type here"
              value={input}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  ask()
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
              width="full"
            />
          </HStack>
          <Text>{error}</Text>
          {!isConnected && <Text>Please connect your wallet to start chatting with Lexy.</Text>}
          <Button width="full" onClick={ask} isLoading={loading} disabled={loading || !isConnected} colorScheme="brand">
            Submit
          </Button>
        </VStack>
      </Box>
    </Layout>
  )
}

export default Lexy
