import { HugeiconsIcon } from '@hugeicons/react'
import { BrainIcon, CodeIcon, PuzzleIcon } from '@hugeicons/core-free-icons'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

type SuggestionChip = {
  label: string
  prompt: string
  icon: unknown
}

const SUGGESTIONS: Array<SuggestionChip> = [
  {
    label: 'Analyze workspace',
    prompt:
      'Analyze this workspace structure and give me 3 engineering risks. Use tools and keep it concise.',
    icon: CodeIcon,
  },
  {
    label: 'Save a preference',
    prompt:
      'Save this to memory exactly: "For demos, respond in 3 bullets max and put risk first." Then confirm saved.',
    icon: BrainIcon,
  },
  {
    label: 'Create a file',
    prompt: 'Create demo-checklist.md with 5 launch checks for this app.',
    icon: PuzzleIcon,
  },
]

type ChatEmptyStateProps = {
  onSuggestionClick?: (prompt: string) => void
  compact?: boolean
}

type ProfileInfo = {
  name?: string
  model?: string
  provider?: string
}

export function ChatEmptyState({
  onSuggestionClick,
  compact = false,
}: ChatEmptyStateProps) {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({})

  useEffect(() => {
    let cancelled = false
    fetch('/api/profiles/list')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return
        const active = data.activeProfile || 'default'
        const profile = data.profiles?.find(
          (p: { name: string }) => p.name === active,
        )
        if (profile) {
          setProfileInfo({
            name: profile.name,
            model: profile.model,
            provider: profile.provider,
          })
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex h-full flex-col items-center justify-center px-4 py-8"
    >
      <div className="flex max-w-xl flex-col items-center text-center">
        {/* Avatar in editorial frame, no glow — architectural restraint */}
        <div className="relative mb-6">
          <img
            src="/hermes-avatar.webp"
            alt="Hermes"
            className="relative size-20 rounded-md"
            style={{
              border: '1px solid var(--theme-border)',
              padding: '4px',
              background: 'var(--theme-card)',
            }}
          />
        </div>

        {/* Editorial micro-label */}
        <p
          className="micro-label mb-2"
          style={{ color: 'var(--theme-muted)' }}
        >
          Hermes Workspace
        </p>

        {/* Editorial display title */}
        <h2
          className="editorial-display text-3xl"
          style={{ color: 'var(--theme-text)' }}
        >
          Begin a session
        </h2>

        {/* Active profile indicator */}
        {profileInfo.name && (
          <p
            className="mt-1 text-xs font-medium"
            style={{ color: 'var(--theme-accent)' }}
          >
            {profileInfo.name}
            {profileInfo.model ? ` · ${profileInfo.model}` : ''}
          </p>
        )}

        {!compact && (
          <>
            <p className="mt-3 text-sm" style={{ color: 'var(--theme-muted)' }}>
              Agent chat · live tools · memory · full observability
            </p>
          </>
        )}

        {/* Prompt chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              onClick={() => onSuggestionClick?.(suggestion.prompt)}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-all"
              style={{
                background: 'var(--theme-card)',
                border: '1px solid var(--theme-border)',
                color: 'var(--theme-text)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--theme-card2)'
                e.currentTarget.style.borderColor = 'var(--theme-accent-border)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--theme-card)'
                e.currentTarget.style.borderColor = 'var(--theme-border)'
              }}
            >
              <HugeiconsIcon
                icon={suggestion.icon as any}
                size={14}
                strokeWidth={1.5}
                style={{ color: 'var(--theme-accent)' }}
              />
              {suggestion.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
