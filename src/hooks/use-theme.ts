import { useEffect } from 'react'
import { useKV } from '@github/spark/hooks'

export function useTheme() {
  const [theme, setTheme] = useKV<'light' | 'dark'>('app-theme', 'dark')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (theme) {
      root.classList.add(theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}
