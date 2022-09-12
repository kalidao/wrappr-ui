import { VStack, Button, HStack, Text, useColorModeValue } from '@chakra-ui/react'

type CardProps = {
  name: string
  description?: string
  icon?: React.ReactNode
  cta: string
  learn?: string
  onClick: React.MouseEventHandler
}

const Card = ({ name, icon, description, learn, cta, onClick }: CardProps) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700')
  return (
    <VStack
      p={3}
      w={'full'}
      display="flex"
      flexDir={'column'}
      gap={'2'}
      border="gray.800"
      borderWidth="1px"
      borderRadius="lg"
      _hover={{
        background: bgColor,
      }}
    >
      <HStack>
        {icon && <span className="[&>*]:w-7 [&>*]:h-7 [&>*]:text-gray-500 [&>*]:dark:text-gray-400">{icon}</span>}
        <Text as="h2" fontSize="2xl" fontWeight="semibold" colorScheme="gray" mr={3}>
          {name}
        </Text>
      </HStack>
      <Text as={'p'} fontSize="md" colorScheme="gray" mt={2}>
        {description}
      </Text>
      <HStack>
        {learn && (
          <Button as="a" href={learn} rel="no-oppener" target="_blank" variant="ghost" borderRadius="2xl">
            Learn More
          </Button>
        )}
        <Button onClick={onClick} colorScheme="brand" variant="outline" borderRadius="2xl">
          {cta}
        </Button>
      </HStack>
    </VStack>
  )
}

export default Card
