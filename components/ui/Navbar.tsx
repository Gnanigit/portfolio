'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeSwitcher } from './ThemeSwitcher'
import { NAV_LINKS, PERSONAL } from '@/lib/constants'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function handleNavClick(href: string) {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          background: scrolled ? 'rgba(var(--bg-base-rgb, 15,15,15), 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-default)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: '1.5rem',
            color: 'var(--primary)',
            letterSpacing: '-0.05em',
            cursor: 'none',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
          aria-label="Go to top"
        >
          {PERSONAL.initials}
          <span style={{ color: 'var(--text-primary)' }}>.</span>
        </button>

        {/* Desktop Nav */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.replace('#', '')
            return (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'none',
                  padding: '0.25rem 0',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                }}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'var(--primary)',
                      borderRadius: 1,
                    }}
                  />
                )}
              </button>
            )
          })}
          <ThemeSwitcher />
        </nav>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeSwitcher />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              minWidth: 44,
              minHeight: 44,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              style={{ width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block', transformOrigin: 'center' }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              style={{ width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block' }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              style={{ width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block', transformOrigin: 'center' }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 490,
              }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(320px, 85vw)',
                background: 'var(--bg-surface)',
                borderLeft: '1px solid var(--border-default)',
                zIndex: 491,
                padding: '5rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = activeSection === href.replace('#', '')
                return (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleNavClick(href)}
                    style={{
                      background: isActive ? 'var(--primary-subtle)' : 'none',
                      border: 'none',
                      borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                      cursor: 'none',
                      padding: '0.75rem 1rem',
                      borderRadius: '0 var(--border-radius-md) var(--border-radius-md) 0',
                      textAlign: 'left',
                      minHeight: 44,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
