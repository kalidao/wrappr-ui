import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '~/utils/fetcher'
import { useAccount } from 'wagmi'
import Layout from '~/layout'
import { Disclaimer } from '~/lexy'
import { ChatMessage, getChatCompletion } from '~/lexy/utils'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Separator } from '@radix-ui/react-select'

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
      <div>
        <div className="flex justify-center items-center">
          <h1>Chat with Lexy</h1>
          <p>Lexy is a legal assistant built on GPT.</p>
          <Separator />
          {!checked ? (
            <Disclaimer checked={checked} setChecked={setChecked} />
          ) : (
            <div>
              {context.map((c, i) => (
                <div key={i} className="flex flex-row space-x-2 p-3">
                  {/* <Avatar
                    label="aiAvatar"
                    src={c.role == 'assistant' ? '/lexy.jpeg' : profile?.picture ?? defaultProfile}
                  ></Avatar> */}
                  <div>{c.content}</div>
                </div>
              ))}
              <div>
                {/* <Avatar label="" src={defaultProfile}></Avatar> */}
                <Input
                  placeholder="Type here"
                  value={input}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      ask()
                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
                />
              </div>
              <p>{error}</p>
              {!isConnected && <p>Please connect your wallet to start chatting with Lexy.</p>}
              <Button onClick={ask} disabled={loading || !isConnected || !checked} className="w-full">
                Message
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Lexy
