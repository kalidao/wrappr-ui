import { Box, IconArrowRight, Text } from '@kalidao/reality'
import * as styles from '../styles.css'
import Tilt from 'react-parallax-tilt'

type CardProps = {
  name: string
  description?: string
  icon?: React.ReactNode
  cta: string
  learn?: string
  onClick: React.MouseEventHandler
} & HTMLButtonElement

const Card = ({ name, onClick, disabled, type }: CardProps) => {
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
      <Box
        className={styles.card}
        backgroundColor="foreground"
        as="button"
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        <Text size={'extraLarge'} weight="bold" color="background">
          {name}
        </Text>
        <IconArrowRight color={'background'} />
      </Box>
    </Tilt>
  )
}

export default Card
