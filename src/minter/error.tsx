import { Button } from '~/components/ui/button'
import { ViewsEnum, useMinterStore } from './useMinterStore'

export const Error = () => {
  const { error, setView } = useMinterStore()

  return (
    <div>
      <h1>{error}</h1>
      <Button onClick={() => setView(ViewsEnum.entity)}>Start over.</Button>
    </div>
  )
}
