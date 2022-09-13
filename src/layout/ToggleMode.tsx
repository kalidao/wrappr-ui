import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'

export default function ToggleMode() {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('brand.50', 'brand.900')

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === 'light' ? <BsMoonStarsFill /> : <BsSunFill />}
      onClick={toggleColorMode}
      variant="transparent"
      _hover={{
        background: bg,
      }}
    />
  )
}
