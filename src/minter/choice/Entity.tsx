import { Button } from '~/components/ui/button'
import { Entity, ViewsEnum, useMinterStore } from '../useMinterStore'
import { Icons } from '~/components/ui/icons'

export default function Entity() {
  const { setEntity: setStoreEntity, setJuris, setView } = useMinterStore()

  const setEntity = (to: Entity) => {
    setStoreEntity(to)
    if (to === 'UNA') {
      setJuris('wy')
      setView(ViewsEnum.wyUNA)
    } else {
      setView(ViewsEnum.juris)
    }
  }

  return (
    <div className="flex-col md:flex-row space-y-5">
      <div className="flex flex-row space-x-2 border-b">
        <h2 className="scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0">Mint</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <Button
          className="flex items-center justify-between w-3/4 text-xl rounded-xl p-5"
          onClick={() => setEntity('LLC')}
        >
          LLC
          <Icons.chevronRight />
        </Button>
        <Button
          className="flex items-center justify-between w-3/4 text-xl rounded-xl p-5"
          onClick={() => setEntity('UNA')}
        >
          Non-Profit
          <Icons.chevronRight />
        </Button>
      </div>
    </div>
  )
}
