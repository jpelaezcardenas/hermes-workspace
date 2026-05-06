import {
  BEARER_TOKEN,
  CLAUDE_API,
  dashboardFetch,
  ensureGatewayProbed,
  getCapabilities,
} from '@/server/gateway-capabilities'

export type ContextUsageSnapshot = {
  ok: true
  contextPercent: number
  maxTokens: number
  usedTokens: number
  model: string
  staticTokens: number
  conversationTokens: number
}

const MODEL_CONTEXT_WINDOWS: Record<string, number> = {
  'claude-opus-4-6': 200_000,
  'claude-opus-4-5': 200_000,
  'claude-sonnet-4-6': 200_000,
  'claude-sonnet-4-5': 200_000,
  'claude-sonnet-4': 200_000,
  'claude-3-5-sonnet': 200_000,
  'claude-3-opus': 200_000,
  'claude-haiku-3.5': 200_000,
  'gpt-5.4': 1_000_000,
  'gpt-5.2-codex': 1_000_000,
  'gpt-4.1': 1_000_000,
  'gpt-4.1-mini': 1_000_000,
  'gpt-4o': 128_000,
  'gpt-4o-mini': 128_000,
  'gpt-4-turbo': 128_000,
  o1: 200_000,
  'o3-mini': 200_000,
  'gemini-2.5-flash': 1_000_000,
  'gemini-2.5-pro': 1_000_000,
}

const CHARS_PER_TOKEN = 3.5
const BYTES_PER_TOKEN = CHARS_PER_TOKEN

function getContextWindow(model: string): number {
  if (MODEL_CONTEXT_WINDOWS[model]) return MODEL_CONTEXT_WINDOWS[model]
  for (const [key, value] of Object.entries(MODEL_CONTEXT_WINDOWS)) {
    if (
      model.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(model.toLowerCase())
    )
      return value
  }
  return 200_000
}


function serializedLength(value: unknown): number {
  if (typeof value === 'string') return value.length
  if (value == null) return 0
  try {
    return JSON.stringify(value).length
  } catch {
    return String(value).length
  }
}

function messageContentLength(message: Record<string, unknown>): number {
  const contentLength = serializedLength(message.content)
  let total = contentLength

  const topLevelText =
    typeof message.text === 'string'
      ? message.text
      : typeof message.output === 'string'
        ? message.output
        : ''
  if (contentLength === 0 && topLevelText) total += topLevelText.length

  if (typeof message.reasoning === 'string') total += message.reasoning.length
  if (message.tool_calls) total += serializedLength(message.tool_calls)
  if (message.toolResults) total += serializedLength(message.toolResults)
  if (message.tool_results) total += serializedLength(message.tool_results)

  return total
}

export function estimateContextTokensFromMessages(
  messages: Array<Record<string, unknown>>,
): number {
  const totalChars = messages.reduce(
    (sum, message) => sum + messageContentLength(message),
    0,
  )
  return Math.ceil(totalChars / CHARS_PER_TOKEN)
}

export function estimateContextTokensFromCacheRead(
  cacheReadBytes: number,
  messageCount = 0,
): number {
  const assistantTurns = Math.max(1, Math.ceil(messageCount / 2))
  return Math.ceil((cacheReadBytes / BYTES_PER_TOKEN / assistantTurns) * 1.2)
}

function authHeaders(): Record<string, string> {
  return BEARER_TOKEN ? { Authorization: `Bearer ${BEARER_TOKEN}` } : {}
}

function emptySnapshot(): ContextUsageSnapshot {
  return {
    ok: true,
    contextPercent: 0,
    maxTokens: 0,
    usedTokens: 0,
    model: '',
    staticTokens: 0,
    conversationTokens: 0,
  }
}

export async function readContextUsage(
  sessionId = '',
): Promise<ContextUsageSnapshot> {
  try {
    let sessionData: Record<string, unknown> | null = null
    const capabilities = await ensureGatewayProbed()

    if (sessionId) {
      try {
        const res = capabilities.dashboard.available
          ? await dashboardFetch(`/api/sessions/${encodeURIComponent(sessionId)}`, {
              signal: AbortSignal.timeout(3000),
            })
          : await fetch(
              `${CLAUDE_API}/api/sessions/${encodeURIComponent(sessionId)}`,
              {
                headers: authHeaders(),
                signal: AbortSignal.timeout(3000),
              },
            )
        if (res.ok) {
          const data = (await res.json()) as {
            session?: Record<string, unknown>
          } & Record<string, unknown>
          sessionData = capabilities.dashboard.available ? data : (data.session ?? null)
        }
      } catch {
        /* ignore */
      }
    }

    if (!sessionData) {
      try {
        const listRes = capabilities.dashboard.available
          ? await dashboardFetch('/api/sessions?limit=1', {
              signal: AbortSignal.timeout(3000),
            })
          : await fetch(`${CLAUDE_API}/api/sessions?limit=1`, {
              headers: authHeaders(),
              signal: AbortSignal.timeout(3000),
            })
        if (listRes.ok) {
          const listData = (await listRes.json()) as {
            items?: Array<Record<string, unknown>>
            sessions?: Array<Record<string, unknown>>
          }
          const sessions = capabilities.dashboard.available
            ? (listData.sessions ?? [])
            : (listData.items ?? [])
          if (sessions.length > 0) {
            sessionData = sessions[0]
          }
        }
      } catch {
        /* ignore */
      }
    }

    if (!sessionData) return emptySnapshot()

    const model = String(sessionData.model || '')
    const maxTokens = getContextWindow(model)
    const cacheReadTokens = Number(sessionData.cache_read_tokens) || 0
    const messageCount = Number(sessionData.message_count) || 0

    let usedTokens = 0
    const assistantTurns = Math.max(1, Math.ceil(messageCount / 2))

    if (cacheReadTokens > 0 && assistantTurns > 0) {
      usedTokens = estimateContextTokensFromCacheRead(cacheReadTokens, messageCount)
    } else if (messageCount > 0) {
      try {
        const targetSessionId = sessionId || String(sessionData.id || '')
        if (targetSessionId) {
          const capabilitiesNow = getCapabilities()
          const msgRes = capabilitiesNow.dashboard.available
            ? await dashboardFetch(
                `/api/sessions/${encodeURIComponent(targetSessionId)}/messages`,
                {
                  signal: AbortSignal.timeout(5000),
                },
              )
            : await fetch(
                `${CLAUDE_API}/api/sessions/${encodeURIComponent(targetSessionId)}/messages`,
                {
                  headers: authHeaders(),
                  signal: AbortSignal.timeout(5000),
                },
              )
          if (msgRes.ok) {
            const msgData = (await msgRes.json()) as {
              items?: Array<{
                content?: string
                tool_calls?: unknown
                reasoning?: string
              }>
              messages?: Array<{
                content?: string
                tool_calls?: unknown
                reasoning?: string
              }>
            }
            const messages = capabilitiesNow.dashboard.available
              ? (msgData.messages ?? [])
              : (msgData.items ?? [])
            usedTokens = estimateContextTokensFromMessages(messages)
          }
        }
      } catch {
        /* ignore */
      }
    }

    usedTokens = Math.min(usedTokens, maxTokens)
    const contextPercent =
      maxTokens > 0 ? Math.round((usedTokens / maxTokens) * 1000) / 10 : 0

    return {
      ok: true,
      contextPercent,
      maxTokens,
      usedTokens,
      model,
      staticTokens: 0,
      conversationTokens: usedTokens,
    }
  } catch {
    return {
      ok: true,
      contextPercent: 0,
      maxTokens: 128_000,
      usedTokens: 0,
      model: '',
      staticTokens: 0,
      conversationTokens: 0,
    }
  }
}
