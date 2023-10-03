import { ArrowRightIcon } from '@radix-ui/react-icons'
import Tilt from 'react-parallax-tilt'
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '~/components/ui/card'

type CardProps = {
  name: string
  description?: string
  icon?: React.ReactNode
  cta: string
  learn?: string
  onClick: React.MouseEventHandler
} & HTMLButtonElement

const TiltCard = ({ name, onClick, disabled, type }: CardProps) => {
  return (
    <Tilt
      className="rounded-xl"
      perspective={1300}
      transitionSpeed={300}
      tiltMaxAngleX={1}
      tiltMaxAngleY={1}
      glareEnable={true}
      glareMaxOpacity={0.01}
      glarePosition={'all'}
    >
      <Card onClick={onClick}>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <ArrowRightIcon color={'background'} />
      </Card>
    </Tilt>
  )
}

export default TiltCard
