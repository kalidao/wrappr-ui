import { isValidURL } from '../utils'
import { HiExternalLink } from 'react-icons/hi'
import { formatEther, isAddress } from 'viem'
import { buttonVariants } from '~/components/ui/button'
import { TableCell, TableRow } from '~/components/ui/table'
import { Icons } from '~/components/ui/icons'

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
      <a href={`/users/${value}`} className="flex flex-row items-center space-y-1">
        <span className="">{value}</span>
      </a>
    )
  }

  if (isBig) {
    if (value == 0) {
      renderValue = <i>FREE</i>
    } else {
      renderValue = <p>{`${formatEther(BigInt(value))} ETH`}</p>
    }
  }

  return (
    <TableRow>
      <TableCell className="capitalize">{trait_type}</TableCell>
      <TableCell className="font-semiBold">{renderValue}</TableCell>
    </TableRow>
  )
}
