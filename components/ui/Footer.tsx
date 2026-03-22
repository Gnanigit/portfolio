'use client'

import { PERSONAL, NAV_LINKS } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  function handleNavClick(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-default)',
        padding: '3rem clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="footer-inner"
      >
        {/* Left */}
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: '1.5rem',
              color: 'var(--primary)',
              letterSpacing: '-0.05em',
              marginBottom: '0.5rem',
            }}
          >
            {PERSONAL.initials}
            <span style={{ color: 'var(--text-primary)' }}>.</span>
          </div>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              maxWidth: '280px',
              lineHeight: 1.65,
            }}
          >
            {PERSONAL.tagline} Open to freelance and full-time opportunities.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            {[
              { label: 'GitHub', href: PERSONAL.github, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> },
              { label: 'LinkedIn', href: PERSONAL.linkedin, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { label: 'Twitter', href: PERSONAL.twitter, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
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
                  borderRadius: 'var(--border-radius-sm)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-muted)',
                  cursor: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--primary)'
                  e.currentTarget.style.borderColor = 'var(--border-accent)'
                  e.currentTarget.style.background = 'var(--primary-subtle)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border-default)'
                  e.currentTarget.style.background = 'var(--bg-elevated)'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Nav links */}
        <nav aria-label="Footer navigation">
          <div
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: '0.75rem',
              fontWeight: 600,
            }}
          >
            Quick Links
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    cursor: 'none',
                    padding: '0.5rem 0',
                    transition: 'color 0.2s ease',
                    textAlign: 'left',
                    minHeight: 44,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '2rem auto 0',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-default)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          © {year} {PERSONAL.name}. Built with Next.js + Framer Motion + Three.js
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif" }}>
          Designed & developed with ♥
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
