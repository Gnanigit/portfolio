'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '@/lib/constants'
import type { Skill } from '@/lib/types'

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools & DevOps'] as const

function SkillPill({
  skill,
  index,
  allPills,
  containerRect,
}: {
  skill: Skill
  index: number
  allPills: { id: string; rect: DOMRect | null }[]
  containerRect: DOMRect | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <motion.div
      ref={ref}
      data-pill-id={`${skill.category}-${index}`}
      whileHover={!isMobile ? { scale: 1.08 } : {}}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: hovered ? 'var(--primary-subtle)' : 'var(--bg-surface)',
        border: `1px solid ${hovered ? 'var(--border-accent)' : 'var(--border-default)'}`,
        borderRadius: '999px',
        cursor: 'none',
        transition: 'all 0.2s ease',
        boxShadow: hovered ? 'var(--shadow-glow)' : 'none',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        willChange: 'transform',
      }}
    >
      <span style={{ fontSize: '1rem' }}>{skill.icon}</span>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '0.82rem',
          color: hovered ? 'var(--primary)' : 'var(--text-secondary)',
          transition: 'color 0.2s ease',
          letterSpacing: '0.02em',
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  )
}

function SkillCategory({
  category,
  skills,
  delay,
}: {
  category: string
  skills: Skill[]
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [pillRects, setPillRects] = useState<{ id: string; rect: DOMRect | null }[]>([])
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ marginBottom: '2.5rem' }}
    >
      {/* Category label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            width: 4,
            height: 20,
            background: 'var(--primary)',
            borderRadius: 2,
          }}
        />
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '0.85rem',
            color: 'var(--text-accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {category}
        </span>
      </div>

      {/* Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
        }}
      >
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: delay + i * 0.05 }}
          >
            <SkillPill
              skill={skill}
              index={i}
              allPills={pillRects}
              containerRect={containerRect}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = SKILLS.filter((s) => s.category === cat)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section
      id="skills"
      className="section"
      style={{
        background: 'var(--bg-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
      ref={ref}
    >
      {/* Ghost text */}
      <div className="section-ghost" aria-hidden="true">SKILLS</div>

      {/* Faint dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(var(--border-default) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 5rem)', position: 'relative', zIndex: 1 }}
      >
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Tech <span style={{ color: 'var(--primary)' }}>Stack</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem' }}>
          The tools I wield daily to ship great products
        </p>
        <div style={{ width: '60px', height: '3px', background: 'var(--primary)', margin: '1rem auto 0', borderRadius: '2px' }} />
      </motion.div>

      {/* Skills grid */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <SkillCategory
            key={cat}
            category={cat}
            skills={grouped[cat] ?? []}
            delay={0.1 + i * 0.12}
          />
        ))}
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
          clipPath: 'polygon(0 100%, 100% 30%, 100% 100%)',
          zIndex: 3,
        }}
      />
    </section>
  )
}
