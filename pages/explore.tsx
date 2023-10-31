import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../src/layout'
import { useRouter } from 'next/router'
import { useNetwork } from 'wagmi'
import { ArrowRightIcon } from '@radix-ui/react-icons'

const Explore: NextPage = () => {
  const router = useRouter()
  const { chains } = useNetwork()

  return (
    <Layout heading="Explore" content="Explore the universe of Wrapprs" back={() => router.push('/')}>
      <div className="flex justify-center items-center flex-wrap">
        {chains.map((chain) => (
          <div key={chain.id} className="w-32 p-6 rounded-2xl hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold">{chain.name}</h1>
                <div className="text-foreground">{chain.nativeCurrency?.symbol}</div>
              </div>
              <Link href={`/${chain.id}/explore`} className="bg-secondary text-white rounded-full p-2" passHref>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Explore
