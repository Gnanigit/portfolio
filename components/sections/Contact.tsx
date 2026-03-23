'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, Send, Loader2 } from 'lucide-react'
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

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
    }

    console.log('[EmailJS] Service ID:', serviceId)
    console.log('[EmailJS] Template ID:', templateId)
    console.log('[EmailJS] Public Key:', publicKey)
    console.log('[EmailJS] Template Params:', templateParams)

    try {
      const result = await emailjs.send(serviceId!, templateId!, templateParams, publicKey!)
      console.log('[EmailJS] Success:', result.status, result.text)
      setForm({ name: '', email: '', subject: '', message: '' })
      showToast('success', 'Message sent! I\'ll get back to you soon.')
    } catch (err: unknown) {
      console.error('[EmailJS] Error:', err)
      if (err && typeof err === 'object') {
        console.error('[EmailJS] Status:', (err as { status?: number }).status)
        console.error('[EmailJS] Text:', (err as { text?: string }).text)
      }
      showToast('error', 'Failed to send. Try emailing me directly.')
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    { icon: <Mail size={20} />,    label: 'Email',    value: PERSONAL.email,    href: `mailto:${PERSONAL.email}` },
    { icon: <MapPin size={20} />,  label: 'Location', value: PERSONAL.location, href: undefined },
    { icon: <Github size={20} />,  label: 'GitHub',   value: 'github.com/Gnanigit', href: PERSONAL.github },
    { icon: <Linkedin size={20} />,label: 'LinkedIn', value: 'linkedin.com/in/gnaneswar-yalla', href: PERSONAL.linkedin },
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
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={16} />
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
