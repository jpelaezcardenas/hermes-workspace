import { BEARER_TOKEN } from './gateway-capabilities'

export type PortableHistoryMessage = {
  role: string
  content: string
}

/**
 * Decide whether the Workspace server should replay the local persisted
 * transcript when calling the chat backend.
 *
 * Default behavior: skip replay when a bearer token is present AND no
 * `localBaseUrl` override is set, since a stateful gateway is expected to
 * resolve conversation continuity from `X-Claude-Session-Id`.
 *
 * Override behavior: when `HERMES_WORKSPACE_FORCE_HISTORY=1`, always replay
 * the local transcript. This is needed when the chat backend is a *stateless*
 * OpenAI-compatible endpoint (e.g. Hermes Agent's `/v1/chat/completions`
 * on `:8642`), which does NOT auto-rehydrate session messages server-side.
 * Without the override, such backends receive only the current turn and
 * effectively appear to "forget" prior in-session messages.
 *
 * See issue: in-session conversational memory loss against Hermes-Agent-style
 * stateless backends.
 */
export function shouldReplayPortableHistory(options?: {
  localBaseUrl?: string
  bearerToken?: string
}): boolean {
  // Explicit opt-in escape hatch for stateless OpenAI-compatible backends.
  if (process.env.HERMES_WORKSPACE_FORCE_HISTORY === '1') return true

  const localBaseUrl = options?.localBaseUrl?.trim() || ''
  if (localBaseUrl) return true

  const bearerToken =
    typeof options?.bearerToken === 'string' ? options.bearerToken : BEARER_TOKEN

  return !bearerToken.trim()
}

export function selectPortableConversationHistory(
  persistedHistory: Array<PortableHistoryMessage>,
  fallbackHistory: Array<PortableHistoryMessage>,
  options?: {
    localBaseUrl?: string
    bearerToken?: string
  },
): Array<PortableHistoryMessage> {
  if (!shouldReplayPortableHistory(options)) return []
  return persistedHistory.length > 0 ? persistedHistory : fallbackHistory
}
