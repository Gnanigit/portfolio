"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import { PERSONAL, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  function handleNavClick(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-default)",
        padding: "3rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2rem",
          alignItems: "start",
        }}
        className="footer-inner"
      >
        {/* Left */}
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: "1.5rem",
              color: "var(--primary)",
              letterSpacing: "-0.05em",
              marginBottom: "0.5rem",
            }}
          >
            {PERSONAL.initials}
            <span style={{ color: "var(--text-primary)" }}>.</span>
          </div>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              maxWidth: "280px",
              lineHeight: 1.65,
            }}
          >
            {PERSONAL.tagline} Open to freelance and full-time opportunities.
          </p>
          {/* Social icons */}
          <div
            style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}
          >
            {[
              { label: "GitHub",   href: PERSONAL.github,   icon: <Github   size={18} /> },
              { label: "LinkedIn", href: PERSONAL.linkedin, icon: <Linkedin size={18} /> },
              { label: "Twitter",  href: PERSONAL.twitter,  icon: <Twitter  size={18} /> },
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--border-radius-sm)",
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-muted)",
                  cursor: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.background = "var(--primary-subtle)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border-default)";
                  e.currentTarget.style.background = "var(--bg-elevated)";
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
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: "0.75rem",
              fontWeight: 600,
            }}
          >
            Quick Links
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-secondary)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    cursor: "none",
                    padding: "0.5rem 0",
                    transition: "color 0.2s ease",
                    textAlign: "left",
                    minHeight: 44,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
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
          maxWidth: "1100px",
          margin: "2rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border-default)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          © {year} {PERSONAL.name}.
        </p>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Designed & developed with{" "}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#e53e3e"
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginBottom: "2px",
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
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
  );
}
