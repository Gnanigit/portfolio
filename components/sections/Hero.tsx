'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Github, Linkedin, Twitter, Mail, Download, ArrowRight } from 'lucide-react'
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
  download?: boolean | string
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
            <ArrowRight size={16} />
          </MagneticButton>
          <MagneticButton className="btn-outline" href={PERSONAL.resumeUrl} download="Gnaneswar_Yalla_Resume.pdf">
            Download CV
            <Download size={16} />
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
            { label: 'GitHub',   href: PERSONAL.github,   icon: <Github   size={20} /> },
            { label: 'LinkedIn', href: PERSONAL.linkedin, icon: <Linkedin size={20} /> },
            { label: 'Twitter',  href: PERSONAL.twitter,             icon: <Twitter size={20} /> },
            { label: 'Email',    href: `mailto:${PERSONAL.email}`,   icon: <Mail    size={20} /> },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 44,
                height: 44,
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
          paddingBottom: '5rem',
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
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
          zIndex: 4,
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
