import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'

export function BackButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button {...props} size="icon" className="rounded-full">
      <ArrowLeftIcon className="w-5 h-5" />
    </Button>
  )
}
