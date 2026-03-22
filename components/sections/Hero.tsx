'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { PERSONAL } from '@/lib/constants'

const HeroScene = dynamic(
  () => import('@/components/three/HeroScene').then((m) => m.HeroScene),
  { ssr: false, loading: () => <div style={{ width: '100%', height: '100%' }} /> }
)

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setText(current.slice(0, charIdx + 1))
          setCharIdx((c) => c + 1)
        } else {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        if (charIdx > 0) {
          setText(current.slice(0, charIdx - 1))
          setCharIdx((c) => c - 1)
        } else {
          setDeleting(false)
          setWordIdx((w) => (w + 1) % words.length)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return text
}

function MagneticButton({
  children,
  className,
  href,
  download,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  href?: string
  download?: boolean
  onClick?: () => void
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }
  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  const sharedProps = {
    ref: ref as React.RefObject<HTMLAnchorElement>,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: `magnetic-btn ${className ?? ''}`,
    style: { transition: 'transform 0.3s ease, background-color 0.2s ease, box-shadow 0.2s ease' },
  }

  if (href) {
    return (
      <a
        {...sharedProps}
        href={href}
        download={download}
        target={download ? undefined : '_blank'}
        rel={download ? undefined : 'noopener noreferrer'}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-btn ${className ?? ''}`}
      style={{ transition: 'transform 0.3s ease, background-color 0.2s ease, box-shadow 0.2s ease' }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function Hero() {
  const roleText = useTypewriter(PERSONAL.roles)

  function scrollToProjects() {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr',
        position: 'relative',
        paddingTop: '72px',
        overflow: 'hidden',
        background: 'var(--bg-base)',
      }}
      className="lg:grid-cols-2"
    >
      {/* Ghost initials */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(8rem, 28vw, 22rem)',
          color: 'var(--text-primary)',
          opacity: 0.03,
          letterSpacing: '-0.08em',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        {PERSONAL.initials}
      </div>

      {/* Left: Text content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 5vw, 4rem)',
          paddingLeft: 'clamp(1.5rem, 8vw, 6rem)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            background: 'var(--color-success-subtle)',
            border: '1px solid var(--color-success-border)',
            borderRadius: '999px',
            marginBottom: '1.5rem',
            width: 'fit-content',
          }}
        >
          <span className="pulse-dot">
            <span className="pulse-dot-inner" />
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-success)',
              letterSpacing: '0.05em',
            }}
          >
            Available for work ✦
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '0.25rem',
            }}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '0.5em', display: 'block', fontWeight: 500, marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Hi, I&apos;m
            </span>
            <span style={{ color: 'var(--text-primary)' }}>{PERSONAL.name}</span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)',
              fontWeight: 600,
              color: 'var(--primary)',
            }}
          >
            {roleText}
            <span className="typewriter-cursor" aria-hidden="true" />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          {PERSONAL.tagline} I turn complex ideas into{' '}
          <span style={{ color: 'var(--text-accent)', fontWeight: 600 }}>
            fast, beautiful, and scalable
          </span>{' '}
          web experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <MagneticButton className="btn-primary" onClick={scrollToProjects}>
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton className="btn-outline" href={PERSONAL.resumeUrl} download>
            Download CV
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}
        >
          {[
            { label: 'GitHub', href: PERSONAL.github, icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )},
            { label: 'LinkedIn', href: PERSONAL.linkedin, icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            )},
            { label: 'Twitter', href: PERSONAL.twitter, icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            )},
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
                cursor: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)'
                e.currentTarget.style.borderColor = 'var(--border-accent)'
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.borderColor = 'var(--border-default)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Right: 3D Scene */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'relative',
          height: 'clamp(320px, 50vw, 100%)',
          minHeight: '320px',
          zIndex: 2,
        }}
        className="lg:h-auto"
      >
        <HeroScene />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif" }}>
          Scroll
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>

      {/* Diagonal clip */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          height: '80px',
          background: 'var(--bg-base)',
          clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
          zIndex: 3,
        }}
      />
    </section>
  )
}
