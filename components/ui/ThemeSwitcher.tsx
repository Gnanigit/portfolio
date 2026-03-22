'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Theme } from '@/lib/types'

const THEMES: { value: Theme; label: string; color: string; ring: string }[] = [
  { value: 'dark-green',   label: 'Dark Green',   color: '#a0e548', ring: '#7ac42e' },
  { value: 'light-green',  label: 'Light Green',  color: '#6abf1e', ring: '#4a9a0e' },
  { value: 'dark-purple',  label: 'Dark Purple',  color: '#7c5cbf', ring: '#5a3a9a' },
  { value: 'light-purple', label: 'Light Purple', color: '#5e4388', ring: '#3e2660' },
]

const STORAGE_KEY = 'portfolio-theme'

export function ThemeSwitcher() {
  const [current, setCurrent] = useState<Theme>('dark-green')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved && THEMES.find((t) => t.value === saved)) {
      setCurrent(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  function applyTheme(theme: Theme) {
    setCurrent(theme)
    localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Select color theme">
      {THEMES.map((theme) => (
        <motion.button
          key={theme.value}
          onClick={() => applyTheme(theme.value)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Switch to ${theme.label} theme`}
          title={theme.label}
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: theme.color,
            border: current === theme.value ? `2px solid ${theme.ring}` : '2px solid transparent',
            outline: current === theme.value ? `2px solid ${theme.color}` : 'none',
            outlineOffset: '2px',
            cursor: 'none',
            padding: 0,
            transition: 'outline 0.2s ease, border 0.2s ease',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}
