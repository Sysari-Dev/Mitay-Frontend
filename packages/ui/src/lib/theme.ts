export type Theme = 'light' | 'dark' | 'system'

export const THEME_STORAGE_KEY = 'mitay-theme'

export const DEFAULT_THEME: Theme = 'light'

export const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('${THEME_STORAGE_KEY}') || '${DEFAULT_THEME}'
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (stored === 'system' && prefersDark)
    document.documentElement.classList.toggle('dark', isDark)
  } catch {}
})()`

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  document.documentElement.classList.toggle('dark', resolveTheme(theme) === 'dark')
}

export function subscribeToThemeChange(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

export function isDarkThemeActive() {
  return document.documentElement.classList.contains('dark')
}
