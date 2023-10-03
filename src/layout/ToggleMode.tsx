import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '~/components/ui/button'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export default function ToggleMode() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleMode = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return (
    <Button aria-label="Toggle dark mode" onClick={toggleMode} size="icon" className="rounded-full">
      {resolvedTheme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
