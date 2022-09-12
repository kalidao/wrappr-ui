import Image from 'next/image'
import { Text, Box, useColorModeValue } from '@chakra-ui/react'
type Props = { title: string; description: string; to: string }

export default function Banner({ title, description, to }: Props) {
  const colorA = useColorModeValue('brand.100', 'brand.900')
  const colorB = useColorModeValue('brand.200', 'brand.800')
  return (
    <div className="bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 p-1 rounded-lg">
      <a href={to} target="_blank" rel="nooppenner">
        <Box
          bgGradient="linear(to-r, colorA, colorB)"
          display="flex"
          justifyContent={'space-evenly'}
          alignItems="center"
          _hover={{
            bgGradient: 'linear(to-r, colorB, colorA)',
          }}
        >
          <div className="flex-col">
            <Text as="h2" fontSize="4xl" fontWeight="extrabold">
              {title}
            </Text>
            <Text as="p" fontSize="md" colorScheme="gray">
              {description}
            </Text>
          </div>
          <div>
            <Image
              src={'/logo.png'}
              height={'100%'}
              width={'100%'}
              alt={`Wrappr logo`}
              className="hover:animate-spin"
            />
          </div>
        </Box>
      </a>
    </div>
  )
}
