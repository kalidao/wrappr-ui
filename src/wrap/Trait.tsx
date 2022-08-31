import { Flex, Text, Link } from '@chakra-ui/react'
import { isValidURL } from '../utils'
import { HiExternalLink } from 'react-icons/hi'
import { ethers } from 'ethers'

export type TraitType = {
  trait_type: string
  value: string | number
  isBig: Boolean
}

export default function Trait({ trait_type, value, isBig }: TraitType) {
  let renderValue = <>{value}</>
  if (isValidURL(value as string) === true) {
    renderValue = (
      <Link href={value as string} isExternal>
        <HiExternalLink />
      </Link>
    )
  }

  if (isBig) {
    if (value == 0) {
      renderValue = <i>FREE</i>
    } else {
      renderValue = <>{ethers.utils.formatEther(value)}</>
    }
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" paddingX={3} paddingY={1} borderRadius="lg">
      <Text color="gray.300">{trait_type}</Text>
      <Text>{renderValue}</Text>
    </Flex>
  )
}
