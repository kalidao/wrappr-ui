import { Box, Button } from '@chakra-ui/react'

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
    <Box className="p-3 w-full flex-col space-y-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-600 ">
      <div className="flex align-center justify-start space-x-2">
        {icon && <span className="[&>*]:w-10 [&>*]:h-10 [&>*]:text-gray-500 [&>*]:dark:text-gray-400">{icon}</span>}
        <h5 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">{name}</h5>
      </div>
      <p className="font-normal text-gray-500 dark:text-zinc-200">{description}</p>
      <div className="flex align-center justify-start space-x-2 h-min">
        {learn && (
          <Button as="a" href={learn} rel="no-oppener" target="_blank" variant="ghost">
            Learn More
          </Button>
        )}
        <Button onClick={onClick} colorScheme="brand" variant="outline">
          {cta}
        </Button>
      </div>
    </Box>
  )
}

export default Card
