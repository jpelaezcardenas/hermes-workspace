import { Link } from '@tanstack/react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Add01Icon,
  PinIcon,
  Search01Icon,
} from '@hugeicons/core-free-icons'
import { useMemo, useState } from 'react'
import { getMessageTimestamp } from '../../utils'
import type { SessionMeta } from '../../types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePinnedSessions } from '@/hooks/use-pinned-sessions'

type DesktopSessionsPanelProps = {
  sessions: Array<SessionMeta>
  activeFriendlyId: string
  creatingSession: boolean
  loading: boolean
  fetching: boolean
  error: string | null
  onCreateSession: () => void
  onSelectSession?: () => void
  onRetry: () => void
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit',
})

function normalizeTitle(value: string | undefined | null): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  const lowered = trimmed.toLowerCase()
  if (UUID_PATTERN.test(trimmed)) return null
  if (lowered.startsWith('<workspace_context')) return null
  if (lowered.startsWith('<environment_context')) return null
  if (lowered.startsWith('<image')) return null
  return trimmed
}

function shortId(session: SessionMeta): string {
  const value = session.friendlyId || session.key || ''
  return value.length > 12 ? value.slice(0, 12) : value
}

function sessionTitle(session: SessionMeta): string {
  return (
    normalizeTitle(session.label) ||
    normalizeTitle(session.derivedTitle) ||
    normalizeTitle(session.title) ||
    `Session ${shortId(session)}`
  )
}

function sessionPreview(session: SessionMeta): string {
  return (
    normalizeTitle(session.preview) ||
    normalizeTitle(session.derivedTitle) ||
    normalizeTitle(session.title) ||
    session.friendlyId ||
    session.key
  )
}

function updatedAt(session: SessionMeta): number | null {
  if (typeof session.updatedAt === 'number') return session.updatedAt
  if (session.lastMessage) return getMessageTimestamp(session.lastMessage)
  return null
}

function formatAge(timestamp: number | null): string {
  if (!timestamp) return ''
  const value = new Date(timestamp)
  return timeFormatter.format(value)
}

function SessionCard({
  session,
  active,
  pinned,
  onSelectSession,
}: {
  session: SessionMeta
  active: boolean
  pinned: boolean
  onSelectSession?: () => void
}) {
  const title = sessionTitle(session)
  const preview = sessionPreview(session)
  const age = formatAge(updatedAt(session))
  const count =
    typeof session.messageCount === 'number' ? session.messageCount : null

  return (
    <Link
      to="/chat/$sessionKey"
      params={{ sessionKey: session.friendlyId }}
      onClick={() => {
        try {
          localStorage.setItem('claude-last-session', session.friendlyId)
        } catch {}
        onSelectSession?.()
      }}
      className={cn(
        'group block rounded-lg border px-4 py-3 text-left transition-colors',
        active
          ? 'border-accent-500/50 bg-accent-500/15 text-primary-950'
          : 'border-primary-200/70 bg-primary-100/35 text-primary-950 hover:border-accent-500/40 hover:bg-primary-100/60',
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <div className="min-w-0 flex-1 truncate text-sm font-semibold">
          {title}
        </div>
        {count !== null ? (
          <span className="shrink-0 rounded-full bg-primary-200 px-2 py-0.5 text-[11px] font-semibold text-primary-700">
            {count} messages
          </span>
        ) : null}
        {pinned ? (
          <HugeiconsIcon
            icon={PinIcon}
            size={14}
            strokeWidth={1.7}
            className="shrink-0 text-amber-500"
          />
        ) : null}
      </div>
      <div className="mt-1 truncate text-[11px] font-semibold text-primary-500">
        {session.friendlyId}
      </div>
      <div className="mt-2 line-clamp-2 text-xs leading-5 text-primary-600">
        {preview}
      </div>
      <div className="mt-2 flex items-center gap-3 text-[11px] text-primary-500">
        {age ? <span>Active {age}</span> : null}
      </div>
    </Link>
  )
}

export function DesktopSessionsPanel({
  sessions,
  activeFriendlyId,
  creatingSession,
  loading,
  fetching,
  error,
  onCreateSession,
  onSelectSession,
  onRetry,
}: DesktopSessionsPanelProps) {
  const [query, setQuery] = useState('')
  const { pinnedSessionKeys } = usePinnedSessions()

  const filteredSessions = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return sessions
    return sessions.filter((session) => {
      const haystack = [
        sessionTitle(session),
        sessionPreview(session),
        session.friendlyId,
        session.key,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(needle)
    })
  }, [query, sessions])

  const [pinnedSessions, unpinnedSessions] = useMemo(() => {
    const pinnedKeys = new Set(pinnedSessionKeys)
    const pinned: Array<SessionMeta> = []
    const unpinned: Array<SessionMeta> = []
    for (const session of filteredSessions) {
      if (pinnedKeys.has(session.key)) {
        pinned.push(session)
      } else {
        unpinned.push(session)
      }
    }
    return [pinned, unpinned] as const
  }, [filteredSessions, pinnedSessionKeys])

  return (
    <aside className="hidden h-full min-h-0 w-[420px] shrink-0 border-r border-primary-200 bg-[var(--theme-bg)] px-5 py-5 text-primary-950 xl:flex xl:flex-col">
      <div className="shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold leading-tight">Sessions</h1>
            <p className="mt-2 max-w-[260px] text-xs leading-5 text-primary-600">
              Browse recent Hermes conversations discovered on the active host.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-100 text-primary-800 hover:bg-primary-200"
            aria-label="Search sessions"
            onClick={() => {
              const input = document.getElementById('desktop-session-search')
              if (input instanceof HTMLInputElement) input.focus()
            }}
          >
            <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={1.7} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onCreateSession}
            disabled={creatingSession}
            className="inline-flex h-8 items-center gap-2 rounded-md bg-primary-200 px-3 text-xs font-semibold text-primary-950 hover:bg-primary-300 disabled:opacity-60"
          >
            <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={1.8} />
            New Chat
          </button>
          {fetching && !loading ? (
            <span className="text-[11px] text-primary-500">Updating...</span>
          ) : null}
        </div>

        <input
          id="desktop-session-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search sessions"
          className="mt-4 h-9 w-full rounded-lg border border-primary-200 bg-primary-50 px-3 text-sm outline-none transition focus:border-accent-500"
        />
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col rounded-lg bg-primary-100/50 p-4">
        <div className="shrink-0">
          <div className="text-sm font-semibold">
            Sessions Library ({filteredSessions.length})
          </div>
          <p className="mt-1 text-[11px] text-primary-500">
            Select a session to inspect its transcript, metadata and last
            activity.
          </p>
        </div>

        <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
          {loading ? (
            <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm text-primary-600">
              Loading sessions...
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-primary-700">
              <div className="font-semibold">Unable to load sessions.</div>
              <div className="mt-1 text-xs opacity-80">{error}</div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="mt-3"
                onClick={onRetry}
              >
                Retry
              </Button>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm text-primary-600">
              No sessions match this search.
            </div>
          ) : (
            <>
              {pinnedSessions.length > 0 ? (
                <section>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-primary-500">
                    Pinned Sessions ({pinnedSessions.length})
                  </div>
                  <div className="space-y-2">
                    {pinnedSessions.map((session) => (
                      <SessionCard
                        key={session.key}
                        session={session}
                        active={session.friendlyId === activeFriendlyId}
                        pinned
                        onSelectSession={onSelectSession}
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              <section>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-primary-500">
                  All Sessions ({unpinnedSessions.length})
                </div>
                <div className="space-y-2">
                  {unpinnedSessions.map((session) => (
                    <SessionCard
                      key={session.key}
                      session={session}
                      active={session.friendlyId === activeFriendlyId}
                      pinned={false}
                      onSelectSession={onSelectSession}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
