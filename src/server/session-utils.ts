type ResolveSessionKeyInput = {
  rawSessionKey?: string
  friendlyId?: string
  defaultKey?: string
}

type ResolveSessionResult = {
  sessionKey: string
  resolvedVia: 'raw' | 'friendly' | 'default' | 'canonical'
}

type CanonicalSessionConfig = {
  sessionKey: string
  friendlyId: string
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

function readEnvString(name: string): string {
  return typeof process !== 'undefined'
    ? (process.env[name]?.trim() ?? '')
    : ''
}

export function getCanonicalHermesSessionConfig(): CanonicalSessionConfig | null {
  const sessionKey = readEnvString('HERMES_WORKSPACE_CANONICAL_SESSION_KEY')
  if (!sessionKey) return null
  return {
    sessionKey,
    friendlyId:
      readEnvString('HERMES_WORKSPACE_CANONICAL_SESSION_FRIENDLY_ID') ||
      sessionKey,
  }
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
    (sessionKey ?? '').trim() === 'main' &&
    dashboardAvailable &&
    !enhancedChat
  )
}

export async function resolveSessionKey({
  rawSessionKey,
  friendlyId,
  defaultKey = 'new',
}: ResolveSessionKeyInput): Promise<ResolveSessionResult> {
  const trimmedRaw = rawSessionKey?.trim() ?? ''
  const canonical = getCanonicalHermesSessionConfig()
  if (canonical && (!trimmedRaw || isSyntheticSessionKey(trimmedRaw))) {
    return { sessionKey: canonical.sessionKey, resolvedVia: 'canonical' }
  }

  if (trimmedRaw.length > 0) {
    return { sessionKey: trimmedRaw, resolvedVia: 'raw' }
  }

  const trimmedFriendly = friendlyId?.trim() ?? ''
  if (trimmedFriendly.length > 0) {
    return { sessionKey: trimmedFriendly, resolvedVia: 'friendly' }
  }

  return { sessionKey: defaultKey, resolvedVia: 'default' }
}
