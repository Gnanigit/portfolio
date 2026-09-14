import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import type { ChatMessage as ChatMessageType } from '@/lib/types'

function formatTime(date: Date) {
  return new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(date)
}

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '0.75rem',
        gap: '0.5rem',
        alignItems: 'flex-end',
      }}
    >
      {!isUser && (
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
      )}
      <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: '0.2rem', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <div
          style={{
            padding: '0.6rem 0.9rem',
            borderRadius: isUser
              ? 'var(--border-radius-lg) var(--border-radius-lg) var(--border-radius-sm) var(--border-radius-lg)'
              : 'var(--border-radius-lg) var(--border-radius-lg) var(--border-radius-lg) var(--border-radius-sm)',
            background: isUser ? 'var(--primary)' : 'var(--bg-elevated)',
            color: isUser ? 'var(--bg-base)' : 'var(--text-primary)',
            fontSize: '0.85rem',
            lineHeight: 1.55,
            fontFamily: "'Inter', sans-serif",
            border: isUser ? 'none' : '1px solid var(--border-default)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
          <span
            style={{
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {formatTime(message.timestamp)}
          </span>
          {!isUser && (
            <button
              onClick={handleCopy}
              aria-label={copied ? 'Copied' : 'Copy message'}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--border-radius-sm)',
                transition: 'color 0.2s ease',
                minWidth: '28px',
                minHeight: '28px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
