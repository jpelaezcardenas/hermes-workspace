import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { i18next } from '@/lib/i18n/init'
import { cn } from '@/lib/utils'
import {
  emitFeedEvent,
  onFeedEvent,
  type FeedEvent,
  type FeedEventType,
} from './feed-event-bus'

// activity = tasks + agents (no health checks), default
const FILTER_KEYS = ['activity', 'tasks', 'agents', 'system'] as const
type FilterTab = (typeof FILTER_KEYS)[number]

type SessionRecord = Record<string, unknown>
type FeedRow = FeedEvent & { baseMessage: string; repeatCount: number }
const MAX_EVENTS = 100

const TASK_TYPES = new Set<FeedEventType>([
  'mission_started',
  'task_created',
  'task_moved',
  'task_completed',
  'task_assigned',
])

const AGENT_TYPES = new Set<FeedEventType>([
  'agent_active',
  'agent_idle',
  'agent_paused',
  'agent_spawned',
  'agent_killed',
])

const SYSTEM_TYPES = new Set<FeedEventType>([
  'gateway_health',
  'system',
])

// Activity = all except system/health
const ACTIVITY_TYPES = new Set<FeedEventType>([
  ...TASK_TYPES,
  ...AGENT_TYPES,
])

type EventBadge = { label: string; className: string }
type EventSeverity = 'error' | 'spawn' | 'system' | 'default'

const EVENT_BADGE_CLASS: Record<FeedEventType, string> = {
  mission_started: 'bg-orange-950/70 text-orange-400 border border-orange-800/50',
  task_created: 'bg-cyan-950/70 text-cyan-400 border border-cyan-800/50',
  task_moved: 'bg-cyan-950/70 text-cyan-400 border border-cyan-800/50',
  task_completed: 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50',
  task_assigned: 'bg-cyan-950/70 text-cyan-400 border border-cyan-800/50',
  agent_active: 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50',
  agent_idle:
    'bg-neutral-100 text-neutral-500 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700',
  agent_paused: 'bg-amber-950/70 text-amber-400 border border-amber-800/50',
  agent_spawned: 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/50',
  agent_killed: 'bg-red-950/70 text-red-400 border border-red-800/50',
  gateway_health:
    'bg-neutral-100 text-neutral-500 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-600 dark:border-neutral-800',
  system:
    'bg-neutral-100 text-neutral-500 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-600 dark:border-neutral-800',
}

const EVENT_BADGE_I18N_KEY: Record<FeedEventType, string> = {
  mission_started: 'feedBadgeMission',
  task_created: 'feedBadgeTask',
  task_moved: 'feedBadgeMove',
  task_completed: 'feedBadgeDone',
  task_assigned: 'feedBadgeAssign',
  agent_active: 'feedBadgeAgent',
  agent_idle: 'feedBadgeIdle',
  agent_paused: 'feedBadgePause',
  agent_spawned: 'feedBadgeSpawn',
  agent_killed: 'feedBadgeKill',
  gateway_health: 'feedBadgeSys',
  system: 'feedBadgeSys',
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function sessionIdentity(session: SessionRecord): string {
  return (
    readString(session.key) ||
    readString(session.friendlyId) ||
    readString(session.label) ||
    readString(session.displayName)
  )
}

function sessionName(session: SessionRecord): string {
  return (
    readString(session.label) ||
    readString(session.displayName) ||
    readString(session.title) ||
    readString(session.friendlyId) ||
    readString(session.key)
  )
}

function relativeTime(ts: number, now: number): string {
  const s = Math.max(0, Math.floor((now - ts) / 1000))
  const just = () =>
    i18next.t('gateway:timeJustNow', { defaultValue: 'just now' })
  if (s < 5) return just()
  if (s < 60)
    return i18next.t('gateway:timeSecondsAgo', {
      count: s,
      defaultValue: `${s}s ago`,
    })
  if (s < 3600)
    return i18next.t('gateway:timeMinutesAgo', {
      count: Math.floor(s / 60),
      defaultValue: `${Math.floor(s / 60)}m ago`,
    })
  if (s < 86400)
    return i18next.t('gateway:timeHoursAgo', {
      count: Math.floor(s / 3600),
      defaultValue: `${Math.floor(s / 3600)}h ago`,
    })
  if (s < 604800)
    return i18next.t('gateway:timeDaysAgo', {
      count: Math.floor(s / 86400),
      defaultValue: `${Math.floor(s / 86400)}d ago`,
    })
  return i18next.t('gateway:timeWeeksAgo', {
    count: Math.floor(s / 604800),
    defaultValue: `${Math.floor(s / 604800)}w ago`,
  })
}

function eventSeverity(event: FeedRow): EventSeverity {
  const lowerMessage = event.baseMessage.toLowerCase()
  const isErrorMessage =
    lowerMessage.includes('failed') ||
    lowerMessage.includes('error') ||
    lowerMessage.includes('unauthorized') ||
    lowerMessage.includes('forbidden') ||
    lowerMessage.includes('disconnected')

  if (event.type === 'agent_killed') return 'error'
  if (event.type === 'agent_spawned') return 'spawn'
  if (event.type === 'system' && isErrorMessage) return 'error'
  if (SYSTEM_TYPES.has(event.type)) return 'system'
  if (event.type === 'task_completed') return 'spawn'
  return 'default'
}

function severityClass(severity: EventSeverity): string {
  if (severity === 'error') {
    return 'border-red-200 bg-red-50/80 dark:border-red-900/40 dark:bg-red-950/30'
  }
  if (severity === 'spawn') {
    return 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/30'
  }
  if (severity === 'system') {
    return 'border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50'
  }
  return 'border-neutral-200 bg-neutral-50 dark:border-neutral-800/60 dark:bg-neutral-900/40'
}

function severityBadge(
  event: FeedRow,
  severity: EventSeverity,
  typeBadge: (type: FeedEventType) => EventBadge,
): EventBadge {
  if (severity === 'error') {
    return {
      label: i18next.t('gateway:feedBadgeError', { defaultValue: 'ERROR' }),
      className: 'bg-red-950/70 text-red-300 border border-red-800/60',
    }
  }
  return typeBadge(event.type)
}

function severityTextClass(severity: EventSeverity): string {
  if (severity === 'error') return 'text-red-800 dark:text-red-200'
  if (severity === 'system') return 'text-neutral-700 dark:text-neutral-300'
  return 'text-neutral-800 dark:text-neutral-200'
}

function severityTimestampClass(severity: EventSeverity): string {
  if (severity === 'error') return 'text-red-700 dark:text-red-300'
  if (severity === 'spawn') return 'text-emerald-700 dark:text-emerald-300'
  if (severity === 'system') return 'text-neutral-500 dark:text-neutral-500'
  return 'text-neutral-700 dark:text-neutral-400'
}

function eventMatchesFilter(type: FeedEventType, tab: FilterTab): boolean {
  if (tab === 'tasks') return TASK_TYPES.has(type)
  if (tab === 'agents') return AGENT_TYPES.has(type)
  if (tab === 'system') return SYSTEM_TYPES.has(type)
  return ACTIVITY_TYPES.has(type)
}

export function LiveFeedPanel() {
  const { t } = useTranslation('gateway')
  const typeBadge = useCallback(
    (type: FeedEventType): EventBadge => {
      const key = EVENT_BADGE_I18N_KEY[type] ?? 'feedBadgeSys'
      const defaults: Record<string, string> = {
        feedBadgeMission: 'MISSION',
        feedBadgeTask: 'TASK',
        feedBadgeMove: 'MOVE',
        feedBadgeDone: 'DONE',
        feedBadgeAssign: 'ASSIGN',
        feedBadgeAgent: 'AGENT',
        feedBadgeIdle: 'IDLE',
        feedBadgePause: 'PAUSE',
        feedBadgeSpawn: 'SPAWN',
        feedBadgeKill: 'KILL',
        feedBadgeSys: 'SYS',
      }
      return {
        label: t(key as 'feedBadgeMission', { defaultValue: defaults[key] ?? 'SYS' }),
        className: EVENT_BADGE_CLASS[type] ?? EVENT_BADGE_CLASS.system,
      }
    },
    [t],
  )

  // Default to activity to hide noisy health checks
  const [activeFilter, setActiveFilter] = useState<FilterTab>('activity')
  const [events, setEvents] = useState<Array<FeedRow>>([])
  const [now, setNow] = useState(() => Date.now())
  const previousSessionsRef = useRef<Map<string, string> | null>(null)

  useEffect(
    () =>
      onFeedEvent((event) =>
        setEvents((previous) => {
          const latest = previous[0]
          if (
            latest &&
            latest.type === event.type &&
            latest.baseMessage === event.message
          ) {
            return [
              {
                ...latest,
                agentName: event.agentName ?? latest.agentName,
                timestamp: event.timestamp,
                repeatCount: latest.repeatCount + 1,
              },
              ...previous.slice(1),
            ].slice(0, MAX_EVENTS)
          }
          return [
            { ...event, baseMessage: event.message, repeatCount: 1 },
            ...previous,
          ].slice(0, MAX_EVENTS)
        }),
      ),
    [],
  )

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    async function pollSessions() {
      try {
        const response = await fetch('/api/sessions')
        if (!response.ok) return
        const payload = (await response.json()) as { sessions?: Array<SessionRecord> }
        const sessions = Array.isArray(payload.sessions) ? payload.sessions : []
        const next = new Map<string, string>()
        sessions.forEach((session) => {
          const id = sessionIdentity(session)
          if (!id) return
          next.set(id, sessionName(session) || id)
        })
        const previous = previousSessionsRef.current
        if (previous) {
          next.forEach((name, id) => {
            if (!previous.has(id)) {
              emitFeedEvent({ type: 'agent_spawned', message: `Session started: ${name}`, agentName: name })
            }
          })
          previous.forEach((name, id) => {
            if (!next.has(id)) {
              emitFeedEvent({ type: 'agent_killed', message: `Session ended: ${name}`, agentName: name || id })
            }
          })
        }
        previousSessionsRef.current = next
      } catch {
        // Ignore polling errors; feed continues from local events.
      }
    }
    void pollSessions()
    const interval = window.setInterval(() => void pollSessions(), 10_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const emit = () => emitFeedEvent({ type: 'gateway_health', message: 'Gateway health check' })
    emit()
    const interval = window.setInterval(emit, 30_000)
    return () => window.clearInterval(interval)
  }, [])

  const visibleEvents = useMemo(() => {
    return events.filter((event) => eventMatchesFilter(event.type, activeFilter))
  }, [activeFilter, events])

  const emptyFeedLabel = useMemo(() => {
    if (activeFilter === 'activity')
      return t('feedEmptyActivity', { defaultValue: 'No events yet' })
    const filterName = t(`feedFilter_${activeFilter}` as 'feedFilter_tasks', {
      defaultValue:
        activeFilter === 'tasks'
          ? 'Tasks'
          : activeFilter === 'agents'
            ? 'Agents'
            : 'System',
    })
    return t('feedEmptyFiltered', {
      filter: filterName,
      defaultValue: 'No events yet in {{filter}}',
    })
  }, [activeFilter, t])

  return (
    <div className="flex h-full flex-col bg-white dark:bg-neutral-950">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-2.5 dark:border-neutral-800">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {t('feedTitle', { defaultValue: 'Live Feed' })}
        </h2>
        <div className="flex items-center gap-2">
          {events.length > 0 ? (
            <button
              type="button"
              onClick={() => setEvents([])}
              className="rounded px-1.5 py-0.5 text-[10px] text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            >
              {t('feedClear', { defaultValue: 'Clear' })}
            </button>
          ) : null}
          {/* Animated LIVE badge */}
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-800/50 bg-emerald-950/40 px-2 py-0.5 text-[9px] font-bold tracking-wider text-emerald-400">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            {t('feedLiveBadge', { defaultValue: 'LIVE' })}
          </span>
        </div>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <div className="flex shrink-0 gap-0.5 border-b border-neutral-200 px-2 py-1.5 dark:border-neutral-800">
        {FILTER_KEYS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveFilter(tab)}
            className={cn(
              'rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide transition-colors',
              activeFilter === tab
                ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-600 dark:hover:bg-neutral-900 dark:hover:text-neutral-300',
            )}
          >
            {t(`feedFilter_${tab}` as 'feedFilter_activity', {
              defaultValue:
                tab === 'activity'
                  ? 'Activity'
                  : tab === 'tasks'
                    ? 'Tasks'
                    : tab === 'agents'
                      ? 'Agents'
                      : 'System',
            })}
          </button>
        ))}
      </div>

      {/* ── Events list ─────────────────────────────────────────────────── */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* Top fade overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-white to-transparent dark:from-neutral-950" />

        <div className="h-full overflow-y-auto px-3 pb-3 pt-8">
          {visibleEvents.length === 0 ? (
            <div className="flex min-h-[220px] items-center justify-center">
              <p className="text-center font-mono text-[10px] text-neutral-600 dark:text-neutral-500">
                {emptyFeedLabel}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {visibleEvents.map((event) => {
                const message =
                  event.repeatCount > 1
                    ? `${event.baseMessage} ×${event.repeatCount}`
                    : event.baseMessage
                const severity = eventSeverity(event)
                const badge = severityBadge(event, severity, typeBadge)

                return (
                  <div
                    key={event.id}
                    className={cn(
                      'flex items-start gap-2 rounded-md border px-3 py-2',
                      severityClass(severity),
                    )}
                  >
                    {/* Type badge */}
                    <span
                      className={cn(
                        'mt-0.5 shrink-0 rounded px-1 py-px font-mono text-[8px] font-bold tracking-wider',
                        badge.className,
                      )}
                    >
                      {badge.label}
                    </span>

                    {/* Message + agent name */}
                    <div className="min-w-0 flex-1">
                      <p className={cn('truncate text-[11px] leading-tight', severityTextClass(severity))} title={message}>{message}</p>
                      {event.agentName ? (
                        <p className="mt-0.5 truncate font-mono text-[9px] text-neutral-600 dark:text-neutral-500" title={event.agentName}>
                          {event.agentName}
                        </p>
                      ) : null}
                    </div>

                    {/* Timestamp */}
                    <span
                      className={cn(
                        'shrink-0 font-mono text-[9px] tabular-nums',
                        severityTimestampClass(severity),
                      )}
                    >
                      {relativeTime(event.timestamp, now)}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
