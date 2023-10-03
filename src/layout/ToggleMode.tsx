import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '~/components/ui/button'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

export default function ToggleMode() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      size="icon"
      variant="ghost"
      className="rounded-full"
    >
      {resolvedTheme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
