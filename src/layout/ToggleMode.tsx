import { IconButton, useColorMode } from '@chakra-ui/react'
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'

export default function ToggleMode() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === 'light' ? <BsMoonStarsFill />: <BsSunFill />}
        onClick={toggleColorMode}
        variant="transparent"
        />
    )
  }