import Confirm from './Confirm'
import Success from './success/Success'
import { badgeVariants } from '~/components/ui/badge'
import { cn } from '~/utils'
import { Icons } from '~/components/ui/icons'
import Juris from './choice/Juris'
import LLC from './form/LLC'
import UNA from './form/UNA'
import { ViewsEnum, useMinterStore } from './useMinterStore'
import Entity from './choice/Entity'
import FormShell from './form'
import { Error } from './error'

interface IView {
  heading?: string
  description: string
  link: string
  component: React.ReactNode
}

export default function Skeleton() {
  const { view } = useMinterStore()

  const views: { [key in ViewsEnum]: IView } = {
    entity: {
      description: 'Legal wrappers for your digital assets',
      link: 'https://docs.wrappr.wtf/how-to/choose-entity',
      component: <Entity key={'entity'} />,
    },
    juris: {
      description:
        'Your LLC will be created after minting. State formation and taxes included. Which jurisdiction do you want?',
      link: 'https://docs.wrappr.wtf/how-to/choose-entity',
      component: <Juris key={'juris'} />,
    },
    deLLC: {
      heading: 'Delaware LLC',
      description: 'Delaware is the gold standard for corporate law. Members can remain anonymous.',
      link: 'https://docs.wrappr.wtf/how-to/LLC',
      component: (
        <FormShell choice="deLLC">
          <LLC />
        </FormShell>
      ),
    },
    wyUNA: {
      heading: 'UNA',
      description: 'Wyoming is friendly to digital assets. Members can remain anonymous.',
      link: 'https://docs.wrappr.wtf/how-to/non-profit/',
      component: (
        <FormShell choice="wyUNA">
          <UNA />
        </FormShell>
      ),
    },
    miLLC: {
      heading: 'Marshall Islands LLC',
      description: 'Marshall Islands offers an offshore alternative for LLC formation',
      link: 'https://docs.wrappr.wtf/how-to/LLC',
      component: (
        <FormShell choice="miLLC">
          <LLC />
        </FormShell>
      ),
    },
    mint: {
      description: '',
      link: '',
      component: <Confirm key={'confirm'} />,
    },
    success: {
      description: '',
      link: '',
      component: <Success key={'success'} />,
    },
    error: {
      description: '',
      link: '',
      component: <Error key={'error'} />,
    },
  }

  return (
    <div className="grid min-h-[90vh] w-screen px-5 grid-cols-5">
      {views[view]['description'] !== '' ? (
        <div
          className={cn(
            views[view].description === '' ? 'hidden' : 'col-span-3',
            'flex flex-col items-center justify-center space-y-5 h-full',
          )}
        >
          <div className="flex flex-col space-y-3">
            <p className="text-4xl text-primary max-w-2xl">{views[view]['description']}</p>
            <a
              className={cn(
                badgeVariants({ variant: 'outline' }),
                'flex flex-row items-center justify-between w-fit space-x-3 rounded-3xl text-md py-2 px-5',
              )}
              href={views[view]['link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-row items-center space-x-3">
                <Icons.book size={20} />
                <p>How it works</p>
              </div>
              <Icons.arrowRight />
            </a>
          </div>
        </div>
      ) : null}
      <div className={cn(views[view].description == '' ? 'col-span-full' : 'col-span-2')}>
        {views[view]['component']}
      </div>
    </div>
  )
}
