type ResolveSessionKeyInput = {
  rawSessionKey?: string
  friendlyId?: string
  defaultKey?: string
}

type ResolveSessionResult = {
  sessionKey: string
  resolvedVia: 'raw' | 'friendly' | 'default'
}

type SessionLike = {
  id: string
  title?: string | null
  message_count?: number | null
}

type PortableMainBindingOptions = {
  sessionKey: string | null | undefined
  dashboardAvailable: boolean
  enhancedChat: boolean
}

const SYNTHETIC_SESSION_KEYS = new Set(['main', 'new'])
const DEFAULT_CHAT_SESSION_ALIASES = new Set([
  'dashboard-chat',
  'agent:main',
  'agent:main:main',
  'agent:main:dashboard-chat',
])

export function normalizeDefaultChatSessionKey(value: string): string {
  const trimmed = value.trim()
  return DEFAULT_CHAT_SESSION_ALIASES.has(trimmed) ? 'main' : trimmed
}

export function isInternalSessionKey(id: string): boolean {
  return (
    id.startsWith('cron_') ||
    id.startsWith('cron:') ||
    id.startsWith('agent:main:ops-')
  )
}

export function hasRealTitle(session: SessionLike): boolean {
  const title = (session.title ?? '').trim()
  return title.length > 0 && title !== session.id
}

export function resolveMainChatSessionId(
  sessions: Array<SessionLike>,
): string | null {
  const titled = sessions.find(
    (session) => !isInternalSessionKey(session.id) && hasRealTitle(session),
  )
  const fallback = titled
    ? null
    : sessions.find(
        (session) =>
          !isInternalSessionKey(session.id) &&
          typeof session.message_count === 'number' &&
          session.message_count > 0,
      )
  return (titled ?? fallback)?.id ?? null
}

export function isSyntheticSessionKey(
  value: string | null | undefined,
): boolean {
  if (!value) return false
  return SYNTHETIC_SESSION_KEYS.has(value.trim())
}

export function shouldBindMainToPortableSession({
  sessionKey,
  dashboardAvailable,
  enhancedChat,
}: PortableMainBindingOptions): boolean {
  return (
    (sessionKey ?? '').trim() === 'main' && dashboardAvailable && !enhancedChat
  )
}

export async function resolveSessionKey({
  rawSessionKey,
  friendlyId,
  defaultKey = 'new',
}: ResolveSessionKeyInput): Promise<ResolveSessionResult> {
  const trimmedRaw = rawSessionKey?.trim() ?? ''
  if (trimmedRaw.length > 0) {
    return {
      sessionKey: normalizeDefaultChatSessionKey(trimmedRaw),
      resolvedVia: 'raw',
    }
  }

  const trimmedFriendly = friendlyId?.trim() ?? ''
  if (trimmedFriendly.length > 0) {
    return {
      sessionKey: normalizeDefaultChatSessionKey(trimmedFriendly),
      resolvedVia: 'friendly',
    }
  }

  return {
    sessionKey: normalizeDefaultChatSessionKey(defaultKey),
    resolvedVia: 'default',
  }
}
