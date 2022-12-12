import { Box, Text } from '@kalidao/reality'
import { isValidURL } from '../utils'
import { HiExternalLink } from 'react-icons/hi'
import { ethers } from 'ethers'
import * as styles from './styles.css'

export type TraitType = {
  trait_type: string
  value: string | number
  isBig: Boolean
}

export default function Trait({ trait_type, value, isBig }: TraitType) {
  let renderValue = <>{value}</>
  if (isValidURL(value as string) === true) {
    renderValue = (
      <a href={value as string} target="_blank" rel="noopenner noreferrer">
        <HiExternalLink />
      </a>
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
    <Box className={styles.trait}>
      <Text>{trait_type}</Text>
      <Text>{renderValue}</Text>
    </Box>
  )
}
