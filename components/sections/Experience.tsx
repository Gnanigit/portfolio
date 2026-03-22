'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE } from '@/lib/constants'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="experience"
      className="section"
      style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Ghost text */}
      <div className="section-ghost" aria-hidden="true">EXPERIENCE</div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 5rem)', position: 'relative', zIndex: 1 }}
      >
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Work <span style={{ color: 'var(--primary)' }}>Experience</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem' }}>
          My professional journey so far
        </p>
        <div style={{ width: '60px', height: '3px', background: 'var(--primary)', margin: '1rem auto 0', borderRadius: '2px' }} />
      </motion.div>

      {/* Timeline */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          paddingLeft: '3.5rem',
        }}
      >
        {/* Vertical line */}
        <div className="timeline-line" />

        {EXPERIENCE.map((exp, i) => {
          const itemRef = useRef<HTMLDivElement>(null)
          const itemInView = useInView(itemRef, { once: true, margin: '-40px' })

          return (
            <motion.div
              key={exp.id}
              ref={itemRef}
              initial={{ opacity: 0, x: -30 }}
              animate={itemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                position: 'relative',
                marginBottom: i < EXPERIENCE.length - 1 ? '3rem' : 0,
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-2.75rem',
                  top: '0.35rem',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: exp.current ? 'var(--primary)' : 'var(--bg-surface)',
                  border: '3px solid var(--primary)',
                  boxShadow: exp.current ? 'var(--shadow-glow)' : 'none',
                  zIndex: 2,
                  flexShrink: 0,
                }}
              />

              {/* Card */}
              <div
                className="card"
                style={{
                  padding: '1.5rem',
                  cursor: 'default',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '0.15rem',
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: 'var(--primary)',
                        }}
                      >
                        {exp.company}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        background: 'var(--bg-elevated)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--border-radius-sm)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {exp.duration}
                    </span>
                    {exp.current && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: 'var(--color-success)',
                          background: 'var(--color-success-subtle)',
                          border: '1px solid var(--color-success-border)',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '999px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullet points */}
                <ul style={{ listStyle: 'none', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {exp.description.map((point, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        gap: '0.6rem',
                        alignItems: 'flex-start',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '0.35rem', fontSize: '0.6rem' }}>▶</span>
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="mono"
                      style={{
                        padding: '0.15rem 0.5rem',
                        background: 'var(--primary-subtle)',
                        border: '1px solid var(--border-accent)',
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: '0.67rem',
                        color: 'var(--text-accent)',
                        fontWeight: 500,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom clip */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          height: '80px',
          background: 'var(--bg-base)',
          clipPath: 'polygon(0 0, 100% 60%, 100% 100%, 0 100%)',
          zIndex: 3,
        }}
      />
    </section>
  )
}
