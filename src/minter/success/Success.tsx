import Link from 'next/link'
import { useNetwork } from 'wagmi'
import { FaWpexplorer, FaScroll } from 'react-icons/fa'
import { TbCandy } from 'react-icons/tb'
import Confetti from '~/utils/Confetti'
import MintedImage from './MintedImage'
import { deployments } from '~/constants'
import { buttonVariants } from '~/components/ui/button'
import { useMinterStore } from '../useMinterStore'

export default function Minted() {
  const { juris, entity, tokenId, agreement, txHash } = useMinterStore()
  const { chain } = useNetwork()

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-1/2 flex flex-col items-center justify-center space-y-10">
        <MintedImage entity={juris! + entity!} tokenId={tokenId} />
        <div className="flex justify-center items-center">
          <a
            className={buttonVariants({
              variant: 'default',
            })}
            href={`${chain?.blockExplorers?.default?.url}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWpexplorer />
            <span>Explorer</span>
          </a>
          <a
            className={buttonVariants({
              variant: 'default',
            })}
            href={`${agreement}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaScroll />
            <span>Agreement</span>
          </a>

          <Link
            href={`/${chain?.id}/${
              deployments[chain ? chain.id : 1][(juris! + entity!) as keyof (typeof deployments)[1]]
            }/${tokenId}`}
            className={buttonVariants({ variant: 'default' })}
          >
            <TbCandy />
            Gallery
          </Link>
        </div>
        <Link href={`/clinic`} passHref>
          <p>Need help with your new entity?</p>
        </Link>
      </div>
      <Confetti />
    </div>
  )
}
