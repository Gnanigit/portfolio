'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import emailjs from 'emailjs-com'
import { PERSONAL } from '@/lib/constants'

type FormState = { name: string; email: string; subject: string; message: string }
type ToastType = 'success' | 'error' | null

function Toast({ type, message }: { type: ToastType; message: string }) {
  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--border-radius-lg)',
            background: type === 'success' ? 'var(--color-success-subtle)' : 'var(--color-error-subtle)',
            border: `1px solid ${type === 'success' ? 'var(--color-success-border)' : 'var(--color-error-border)'}`,
            color: type === 'success' ? 'var(--color-success)' : 'var(--color-error)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
          }}
        >
          {type === 'success' ? '✓' : '✕'} {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  textarea,
  required,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ position: 'relative', marginBottom: '2rem' }}>
      <label
        style={{
          display: 'block',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: focused ? 'var(--primary)' : 'var(--text-muted)',
          marginBottom: '0.4rem',
          transition: 'color 0.2s ease',
        }}
      >
        {label} {required && <span style={{ color: 'var(--primary)' }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          required={required}
          className="input-underline"
          style={{ resize: 'none' }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className="input-underline"
        />
      )}
    </div>
  )
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<{ type: ToastType; message: string }>({ type: null, message: '' })

  function showToast(type: ToastType, message: string) {
    setToast({ type, message })
    setTimeout(() => setToast({ type: null, message: '' }), 4000)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      showToast('error', 'Please fill in all required fields.')
      return
    }

    setSending(true)
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setForm({ name: '', email: '', subject: '', message: '' })
      showToast('success', 'Message sent! I\'ll get back to you soon.')
    } catch {
      showToast('error', 'Failed to send. Try emailing me directly.')
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: PERSONAL.email,
      href: `mailto:${PERSONAL.email}`,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Location',
      value: PERSONAL.location,
      href: undefined,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      value: 'github.com/gnani',
      href: PERSONAL.github,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      value: 'linkedin.com/in/gnani',
      href: PERSONAL.linkedin,
    },
  ]

  return (
    <section
      id="contact"
      className="section"
      style={{ background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}
      ref={ref}
    >
      {/* Ghost text */}
      <div className="section-ghost" aria-hidden="true">CONTACT</div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 5rem)', position: 'relative', zIndex: 1 }}
      >
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Get In <span style={{ color: 'var(--primary)' }}>Touch</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '1rem', maxWidth: '500px', margin: '0.75rem auto 0' }}>
          Have a project in mind? Let&apos;s talk. I&apos;m always open to exciting new opportunities.
        </p>
        <div style={{ width: '60px', height: '3px', background: 'var(--primary)', margin: '1rem auto 0', borderRadius: '2px' }} />
      </motion.div>

      {/* Two-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
        className="contact-grid"
      >
        {/* Left: Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.3rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
            }}
          >
            Let&apos;s work together
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              fontSize: '0.9rem',
              marginBottom: '2rem',
            }}
          >
            Whether you need a full-stack web app, want to discuss a freelance project, or are hiring for a full-time role — I&apos;d love to hear from you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {contactInfo.map(({ icon, label, value, href }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--border-radius-md)',
                    background: 'var(--primary-subtle)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.1rem' }}>
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--text-primary)',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        cursor: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                      {value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }} className="form-row">
            <InputField
              label="Name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              required
            />
            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              required
            />
          </div>
          <InputField
            label="Subject"
            value={form.subject}
            onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
          />
          <InputField
            label="Message"
            value={form.message}
            onChange={(v) => setForm((f) => ({ ...f, message: v }))}
            textarea
            required
          />

          <motion.button
            type="submit"
            disabled={sending}
            whileHover={{ scale: sending ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="magnetic-btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              opacity: sending ? 0.7 : 1,
              cursor: sending ? 'not-allowed' : 'none',
              fontSize: '1rem',
              padding: '0.9rem 2rem',
              boxShadow: sending ? 'none' : 'var(--shadow-glow)',
            }}
          >
            {sending ? (
              <>
                <svg
                  style={{ animation: 'spin 1s linear infinite' }}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </>
            )}
          </motion.button>
        </motion.form>
      </div>

      <Toast type={toast.type} message={toast.message} />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1.4fr !important;
          }
        }
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
