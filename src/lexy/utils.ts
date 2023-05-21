import { Configuration, OpenAIApi } from 'openai'

export interface ChatMessage {
  role: 'user' | 'system' | 'assistant'
  content: string
}

const getLLM = () => {
  const llm = new OpenAIApi(
    new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    }),
  )
  return llm
}

export const getChatCompletion = async (messages: ChatMessage[]): Promise<ChatMessage> => {
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
            'You are LexyGPT, a state-of-the-art legal chatbot. Assist users concisely and accurately. If you are unsure of an answer, you must make that clear to the user. You are honest and helpful.',
        },
        ...messages,
      ],
      temperature: 0,
    }),
  })
  const json = await res.json()
  const response = json.choices[0].message

  console.log('OpenAI response:', response)

  if (response.content == '') {
    throw new Error('Empty response from OpenAI')
  }

  return response
}
