import { FaUser } from 'react-icons/fa'
import { isValidURL } from '../utils'
import { HiExternalLink } from 'react-icons/hi'
import { formatEther, isAddress } from 'viem'
import { Button, buttonVariants } from '~/components/ui/button'

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

  if (isAddress(value as string) === true) {
    renderValue = (
      <a
        className={buttonVariants({
          variant: 'link',
        })}
        href={`/users/${value}`}
      >
        <FaUser />
      </a>
    )
  }

  if (isBig) {
    if (value == 0) {
      renderValue = <i>FREE</i>
    } else {
      renderValue = <>{formatEther(BigInt(value))}</>
    }
  }

  return (
    <div>
      <p>{trait_type}</p>
      <p>{renderValue}</p>
    </div>
  )
}
