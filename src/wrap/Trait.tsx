import { Flex, Text, Link } from '@chakra-ui/react'
import { isValidURL } from '../utils'
import { HiExternalLink } from 'react-icons/hi'

type TraitType = {
  trait_type: string
  value: string | number
}

export default function Trait({ trait_type, value }: TraitType) {
  if (isValidURL(value as string) === true) {
    return (
      <Flex alignItems="center" justifyContent="space-between" paddingX={3} paddingY={1}>
        <Text>{trait_type}</Text>
        <Link href={value as string} isExternal><HiExternalLink /></Link>
      </Flex>
    )
  }
  
  return (
    <Flex alignItems="center" justifyContent="space-between" paddingX={3} paddingY={1}>
      <Text>{trait_type}</Text>
      <Text>{value}</Text>
    </Flex>
  )
}
