'use client'

import { useSyncExternalStore } from 'react'

import { Button } from '@mitay/ui/atoms/button'
import { applyTheme, isDarkThemeActive, subscribeToThemeChange } from '@mitay/ui/lib/theme'

function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribeToThemeChange, isDarkThemeActive, () => false)

  return (
    <Button variant="outline" size="sm" onClick={() => applyTheme(isDark ? 'light' : 'dark')}>
      {isDark ? 'Modo claro' : 'Modo oscuro'}
    </Button>
  )
}

export { ThemeToggle }
