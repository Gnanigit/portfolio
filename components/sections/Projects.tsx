'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { PROJECTS, TECH_FILTER_TAGS } from '@/lib/constants'
import type { Project } from '@/lib/types'

function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16
    setTilt({ x, y })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        style={{
          background: 'var(--bg-surface)',
          border: `1px solid ${hovered ? 'var(--border-accent)' : 'var(--border-default)'}`,
          borderRadius: 'var(--border-radius-xl)',
          overflow: 'hidden',
          transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${hovered ? 1.02 : 1})`,
          transition: 'transform 0.15s ease, border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: hovered ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
          cursor: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Image area */}
        <div
          style={{
            position: 'relative',
            height: '200px',
            background: 'var(--bg-elevated)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {/* Placeholder gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, var(--bg-elevated) 0%, var(--primary-subtle) 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '3rem',
                fontWeight: 900,
                color: 'var(--primary)',
                opacity: 0.3,
                letterSpacing: '-0.05em',
              }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>

          {/* Overlay on hover (desktop) / always visible (touch) */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="project-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              backdropFilter: 'blur(4px)',
            }}
          >
            <p
              style={{
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              {project.longDescription}
            </p>
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <div
              style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                padding: '0.2rem 0.6rem',
                background: 'var(--primary)',
                borderRadius: '999px',
                fontSize: '0.65rem',
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                color: 'var(--bg-base)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Featured
            </div>
          )}
        </div>

        {/* Card content */}
        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: '0.83rem',
              color: 'var(--text-muted)',
              lineHeight: 1.55,
              flex: 1,
            }}
          >
            {project.description}
          </p>

          {/* Tech badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="mono"
                style={{
                  padding: '0.2rem 0.55rem',
                  background: 'var(--primary-subtle)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.68rem',
                  color: 'var(--text-accent)',
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.techStack.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())))

  return (
    <section
      id="projects"
      className="section"
      style={{ background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Ghost text */}
      <div className="section-ghost" aria-hidden="true">PROJECTS</div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}
      >
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Featured <span style={{ color: 'var(--primary)' }}>Projects</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem' }}>
          Things I&apos;ve built that I&apos;m proud of
        </p>
        <div style={{ width: '60px', height: '3px', background: 'var(--primary)', margin: '1rem auto 0', borderRadius: '2px' }} />
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '2.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {TECH_FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            style={{
              padding: '0.4rem 1.1rem',
              borderRadius: '999px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'none',
              background: activeFilter === tag ? 'var(--primary)' : 'var(--bg-surface)',
              color: activeFilter === tag ? 'var(--bg-base)' : 'var(--text-secondary)',
              border: `1px solid ${activeFilter === tag ? 'var(--primary)' : 'var(--border-default)'}`,
              transition: 'all 0.2s ease',
              minHeight: 44,
            }}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* Projects grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {filtered.map((project, i) => (
          <TiltCard key={project.id} project={project} index={i} />
        ))}
      </motion.div>

      {/* Show card overlay always on touch devices */}
      <style>{`
        @media (hover: none) {
          .project-overlay { opacity: 1 !important; }
        }
      `}</style>
    </section>
  )
}
