'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { NAV_LINKS, PERSONAL } from '@/lib/constants'

export function Navbar() {
  const [scrolled, setScrolled]             = useState(false)
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [activeSection, setActiveSection]   = useState('home')
  const [isMobile, setIsMobile]             = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.1, rootMargin: '-10% 0px -60% 0px' },
    )
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function handleNavClick(href: string) {
    setActiveSection(href.replace('#', ''))
    setMobileOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 500,
          padding: '0 clamp(1rem, 5vw, 4rem)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          background: scrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-default)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          aria-label="Go to top"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: '1.4rem',
            color: 'var(--primary)',
            letterSpacing: '-0.05em',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: '0.5rem 0',
            minHeight: 44,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {PERSONAL.initials}
          <span style={{ color: 'var(--text-primary)' }}>.</span>
        </button>

        {/* Desktop nav */}
        {!isMobile && <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: -2, left: 0, right: 0,
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
        </nav>}

        {/* Hamburger — mobile only */}
        {isMobile && <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: 44,
            height: 44,
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--border-radius-sm)',
            flexShrink: 0,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: 'flex', color: 'var(--text-primary)' }}>
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }} style={{ display: 'flex', color: 'var(--text-primary)' }}>
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>}
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.55)',
                zIndex: 490,
                backdropFilter: 'blur(2px)',
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: 'min(300px, 80vw)',
                background: 'var(--bg-surface)',
                borderLeft: '1px solid var(--border-default)',
                zIndex: 491,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                boxShadow: '-8px 0 32px rgba(0,0,0,0.25)',
              }}
            >
              {/* Drawer header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 1.25rem',
                  height: 64,
                  borderBottom: '1px solid var(--border-default)',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    color: 'var(--primary)',
                    letterSpacing: '-0.05em',
                  }}
                >
                  {PERSONAL.initials}
                  <span style={{ color: 'var(--text-primary)' }}>.</span>
                </span>
              </div>

              {/* Nav links */}
              <nav
                aria-label="Mobile navigation"
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                {NAV_LINKS.map(({ label, href }, i) => {
                  const isActive = activeSection === href.replace('#', '')
                  return (
                    <motion.button
                      key={href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNavClick(href)}
                      style={{
                        background: isActive ? 'var(--primary-subtle)' : 'transparent',
                        border: 'none',
                        borderLeft: `3px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
                        borderRadius: '0 var(--border-radius-md) var(--border-radius-md) 0',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        padding: '0.9rem 1rem',
                        textAlign: 'left',
                        minHeight: 52,
                        width: '100%',
                        transition: 'background 0.15s ease, color 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {label}
                    </motion.button>
                  )
                })}
              </nav>

              {/* Theme switcher */}
              <div
                style={{
                  padding: '1.25rem',
                  borderTop: '1px solid var(--border-default)',
                  flexShrink: 0,
                }}
              >
                <p
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  Theme
                </p>
                <ThemeSwitcher />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
