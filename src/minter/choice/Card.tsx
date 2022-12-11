import { Stack, Button, Text } from '@kalidao/reality'

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
    <Stack>
      <Stack>
        {icon && <span className="[&>*]:w-7 [&>*]:h-7 [&>*]:text-gray-500 [&>*]:dark:text-gray-400">{icon}</span>}
        <Text as="h2">{name}</Text>
      </Stack>
      <Text as={'p'}>{description}</Text>
      <Stack>
        {learn && (
          <Button as="a" href={learn} rel="no-oppener" target="_blank">
            Learn More
          </Button>
        )}
        <Button onClick={onClick}>{cta}</Button>
      </Stack>
    </Stack>
  )
}

export default Card
