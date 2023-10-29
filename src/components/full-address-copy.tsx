import { Address } from 'viem'
import { useCopyToClipboard } from '~/hooks/useCopyToClipboard'
import { Button } from './ui/button'
import { Icons } from './ui/icons'
import { cn } from '~/utils'

export const FullAddressCopy = ({ address }: { address: Address }) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard({
    timeout: 2000,
  })

  return (
    <div className="flex flex-row items-center justify-center space-y-1">
      <p className={cn('text-muted text-xl', isCopied ? 'italic' : 'bold')}>{address}</p>
      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(address)} className="rounded-full">
        <Icons.copy className="text-muted" />
      </Button>
    </div>
  )
}
