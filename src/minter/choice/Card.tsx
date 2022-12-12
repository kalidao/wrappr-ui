import { Box, Text } from '@kalidao/reality'
import * as styles from '../styles.css'
import Tilt from 'react-parallax-tilt'

type CardProps = {
  name: string
  description?: string
  icon?: React.ReactNode
  cta: string
  learn?: string
  onClick: React.MouseEventHandler
}

const Card = ({ name, icon, description, learn, cta, onClick }: CardProps) => {
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
      <Box className={styles.card} as="button" onClick={onClick}>
        <Text size={'extraLarge'}>{name}</Text>
        <Text as={'p'} align="left">
          {description}
        </Text>
      </Box>
    </Tilt>
  )
}

export default Card
