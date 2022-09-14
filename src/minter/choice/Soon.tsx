import { VStack, Button, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { GiIsland } from 'react-icons/gi'


const Soon = () => {
  
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const color = useColorModeValue('#C4C4C4', '#060707')

  return (
    <VStack
    p={3}
    w={'full'}
    display="flex"
    flexDir={'column'}
    gap={'2'}
    border="gray.700"
    borderWidth="1px"
    borderRadius="lg"
    bgColor={bgColor}
  >
    <HStack>
    <GiIsland color={color} />
      <Text as="h2" fontSize="2xl" color={color} fontWeight="semibold" mr={3}>
        Offshore
      </Text>
    </HStack>
    <Text as={'p'} fontSize="md" color={color} mt={2}>
        Explore new horizons
    </Text>
    <HStack>
        <Button disabled={true} variant="ghost" color={color} borderRadius="2xl">
            Learn More
        </Button>
      <Button colorScheme="gray" color={color} variant="outline" borderRadius="2xl">
        Coming soon
      </Button>
    </HStack>
  </VStack>
  )
}

export default Soon
