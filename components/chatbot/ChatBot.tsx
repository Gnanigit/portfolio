'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { PERSONAL } from '@/lib/constants'
import type { ChatMessage as ChatMessageType } from '@/lib/types'

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  role: 'assistant',
  content: `Hi! 👋 I'm Gnani's AI assistant. Ask me anything about his skills, experience, projects, or availability. How can I help you?`,
  timestamp: new Date(),
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '0.75rem',
          color: 'var(--bg-base)',
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        GN
      </div>
      <div
        style={{
          padding: '0.6rem 0.9rem',
          borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) var(--border-radius-lg) var(--border-radius-sm)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--text-muted)',
              animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const SUGGESTED_QUESTIONS = [
  'What are your main skills?',
  'Are you available for hire?',
  'Tell me about your projects',
  'What\'s your experience?',
]

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return
    setShowSuggestions(false)

    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const apiMessages = [...messages, userMsg]
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, content: m.content }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })
      const data = await res.json()
      const assistantMsg: ChatMessageType = {
        id: Date.now().toString() + '-assistant',
        role: 'assistant',
        content: data.message || data.error || 'Sorry, I could not get a response.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-error',
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      <style>{`
        @keyframes typing-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      {/* Right Side Panel - Full Height */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="chat-panel"
            role="dialog"
            aria-label="AI Chat Assistant"
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '420px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg-base)',
              borderLeft: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-md)',
              height: '100vh',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.25rem',
                borderBottom: '1px solid var(--border-default)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-elevated)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    color: 'var(--bg-base)',
                    flexShrink: 0,
                  }}
                >
                  {PERSONAL.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Assistant
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <span className="pulse-dot">
                      <span className="pulse-dot-inner" />
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontFamily: "'Space Grotesk', sans-serif" }}>
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
              aria-live="polite"
            >
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              {loading && <TypingIndicator />}
              {showSuggestions && messages.length === 1 && (
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Try asking:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '999px',
                          border: '1px solid var(--border-accent)',
                          background: 'transparent',
                          color: 'var(--primary)',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--primary-subtle)'
                          e.currentTarget.style.borderColor = 'var(--primary)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.borderColor = 'var(--border-accent)'
                        }}
                        aria-label={q}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Row */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid var(--border-default)',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                background: 'var(--bg-elevated)',
                flexShrink: 0,
              }}
            >
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                disabled={loading}
                aria-label="Message input"
                style={{
                  flex: 1,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--border-radius-lg)',
                  color: 'var(--text-primary)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  padding: '0.55rem 0.9rem',
                  outline: 'none',
                  cursor: loading ? 'not-allowed' : 'text',
                  transition: 'border-color 0.2s ease',
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--border-radius-md)',
                  background: !input.trim() || loading ? 'var(--bg-overlay)' : 'var(--primary)',
                  border: 'none',
                  color: !input.trim() || loading ? 'var(--text-muted)' : 'var(--bg-base)',
                  cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  opacity: !input.trim() || loading ? 0.5 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button - positioned fixed on right side */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="open-btn"
            onClick={() => setOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Open chat assistant"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--primary)',
              border: 'none',
              color: 'var(--bg-base)',
              zIndex: 998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow), var(--shadow-md)',
              cursor: 'pointer',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Close button when panel is open */}
      <AnimatePresence>
        {open && (
          <motion.button
            key="close-btn"
            onClick={() => setOpen(false)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            aria-label="Close chat assistant"
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--primary)',
              border: 'none',
              color: 'var(--bg-base)',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow), var(--shadow-md)',
              cursor: 'pointer',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
