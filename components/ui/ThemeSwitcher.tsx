'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import type { Theme } from '@/lib/types'

type Color = 'green' | 'purple'
type Mode  = 'dark'  | 'light'

const COLORS: { value: Color; dot: string; ring: string }[] = [
  { value: 'green',  dot: '#a0e548', ring: '#7ac42e' },
  { value: 'purple', dot: '#7c5cbf', ring: '#5a3a9a' },
]

const STORAGE_KEY = 'portfolio-theme'

function toTheme(color: Color, mode: Mode): Theme {
  return `${mode}-${color}` as Theme
}

function parseTheme(theme: Theme): { color: Color; mode: Mode } {
  const [mode, color] = theme.split('-') as [Mode, Color]
  return { color, mode }
}

export function ThemeSwitcher() {
  const [color, setColor] = useState<Color>('green')
  const [mode,  setMode]  = useState<Mode>('dark')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved) {
      const parsed = parseTheme(saved)
      setColor(parsed.color)
      setMode(parsed.mode)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  function applyColor(c: Color) {
    const theme = toTheme(c, mode)
    setColor(c)
    localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  function toggleMode() {
    const next: Mode = mode === 'dark' ? 'light' : 'dark'
    const theme = toTheme(color, next)
    setMode(next)
    localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div
      role="group"
      aria-label="Theme controls"
      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
    >
      {/* Color dots */}
      {COLORS.map((c) => (
        <motion.button
          key={c.value}
          onClick={() => applyColor(c.value)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`${c.value} color`}
          title={c.value.charAt(0).toUpperCase() + c.value.slice(1)}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'transparent',
            border: 'none',
            cursor: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{
            display: 'block',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: c.dot,
            border: color === c.value ? `2px solid ${c.ring}` : '2px solid transparent',
            outline: color === c.value ? `2px solid ${c.dot}` : 'none',
            outlineOffset: '2px',
            transition: 'outline 0.2s ease, border 0.2s ease',
          }} />
        </motion.button>
      ))}

      {/* Dark / Light toggle */}
      <motion.button
        onClick={toggleMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'var(--bg-overlay)',
          border: '1px solid var(--border-default)',
          cursor: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--text-secondary)',
          transition: 'background 0.2s ease, color 0.2s ease',
        }}
      >
        <motion.span
          key={mode}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0,   opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex' }}
        >
          {mode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </motion.button>
    </div>
  )
}
