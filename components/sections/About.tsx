'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { PERSONAL, STATS } from '@/lib/constants'

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = end / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span ref={ref} style={{ color: 'var(--primary)', fontWeight: 900, fontFamily: "'Space Grotesk', sans-serif" }}>
      {count}{suffix}
    </span>
  )
}

const BENTO_ITEMS = [
  {
    id: 'bio',
    colSpan: 2,
    rowSpan: 2,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '0.75rem' }}>
            About Me
          </div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
            Crafting digital experiences with <span style={{ color: 'var(--primary)' }}>precision & passion</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem' }}>
            {PERSONAL.bio}
          </p>
        </div>
        <a
          href={PERSONAL.resumeUrl}
          download
          className="magnetic-btn btn-outline"
          style={{ width: 'fit-content', fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}
        >
          Download Resume
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        </a>
      </div>
    ),
  },
  {
    id: 'location',
    colSpan: 1,
    rowSpan: 1,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '2rem' }}>📍</div>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif" }}>Location</div>
        <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{PERSONAL.location}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Open to remote work</div>
      </div>
    ),
  },
  {
    id: 'available',
    colSpan: 1,
    rowSpan: 1,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="pulse-dot"><span className="pulse-dot-inner" /></span>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-success)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>Open to Work</span>
        </div>
        <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem' }}>Available Now</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Freelance & Full-time roles</div>
      </div>
    ),
  },
  {
    id: 'learning',
    colSpan: 1,
    rowSpan: 1,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '1.8rem' }}>📚</div>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif" }}>Currently Learning</div>
        <div style={{ color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Space Grotesk', sans-serif" }}>{PERSONAL.currentlyLearning}</div>
      </div>
    ),
  },
  {
    id: 'funfact',
    colSpan: 1,
    rowSpan: 1,
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '1.8rem' }}>💡</div>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif" }}>Fun Fact</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, fontStyle: 'italic' }}>&ldquo;{PERSONAL.funFact}&rdquo;</div>
      </div>
    ),
  },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="section dot-grid"
      style={{ background: 'var(--bg-base)' }}
      ref={ref}
    >
      {/* Ghost text */}
      <div className="section-ghost" aria-hidden="true">ABOUT</div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)', position: 'relative', zIndex: 1 }}
      >
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          About <span style={{ color: 'var(--primary)' }}>Me</span>
        </h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--primary)', margin: '1rem auto 0', borderRadius: '2px' }} />
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          maxWidth: '900px',
          margin: '0 auto 3rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="card"
            style={{
              padding: '1.5rem 1rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 1 }}>
              <CountUp end={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Bento grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: 'minmax(140px, auto)',
          gap: '1rem',
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
        className="bento-grid"
      >
        {BENTO_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            className="card"
            style={{
              gridColumn: `span ${item.colSpan}`,
              padding: '1.5rem',
              cursor: 'default',
            }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-grid > * {
            grid-column: span 1 !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .bento-grid > *:first-child {
            grid-column: span 2 !important;
          }
        }
      `}</style>
    </section>
  )
}
