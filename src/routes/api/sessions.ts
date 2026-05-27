import { randomUUID } from 'node:crypto'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import { requireJsonContentType } from '../../server/rate-limit'
import {
  SESSIONS_API_UNAVAILABLE_MESSAGE,
  createSession,
  deleteSession,
  ensureGatewayProbed,
  getGatewayCapabilities,
  listSessions,
  toSessionSummary,
  updateSession,
} from '../../server/claude-api'
import { createCapabilityUnavailablePayload } from '@/lib/feature-gates'
import {
  deleteLocalSession,
  ensureLocalSession,
  getLocalSession,
  listLocalSessions,
  updateLocalSessionTitle,
} from '../../server/local-session-store'

function localSessionEntry(session: ReturnType<typeof ensureLocalSession>) {
  const title = session.title || 'Local Chat'
  return {
    key: session.id,
    id: session.id,
    friendlyId: session.id,
    title,
    label: title,
    derivedTitle: title,
    startedAt: session.createdAt,
    updatedAt: session.updatedAt,
    message_count: session.messageCount,
    model: session.model,
    source: 'local',
  }
}

function parseBoundedInt(
  raw: string | null,
  fallback: number,
  min: number,
  max: number,
): number {
  if (!raw) return fallback
  const parsed = Number.parseInt(raw, 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

function isValidationProbeSession(session: Record<string, unknown>): boolean {
  const keys = [session.id, session.key, session.friendlyId]
    .filter((value): value is string => typeof value === 'string')
    .map((value) => value.trim())

  return keys.some(
    (key) =>
      key.startsWith('codex_parity_validation_') ||
      key.startsWith('codex_validation_chat_') ||
      key.startsWith('codex_phone_probe_') ||
      key.startsWith('codex_monitor_validation_') ||
      key.startsWith('codex_ui_active_run_') ||
      key.startsWith('codex_e2e_chat_'),
  )
}

function sessionsJson(body: Record<string, unknown>, init?: ResponseInit) {
  return json(body, {
    ...init,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      ...init?.headers,
    },
  })
}

function readUpdatedAt(session: Record<string, unknown>): number {
  const value = session.updatedAt
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

function isDashboardSessionCreateUnsupported(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err)
  return (
    message.includes('dashboard /api/sessions: 405') ||
    (message.includes('/api/sessions') &&
      message.toLowerCase().includes('method not allowed'))
  )
}

export const Route = createFileRoute('/api/sessions')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Auth check
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const capabilities = await ensureGatewayProbed()
        if (!capabilities.sessions) {
          return json({
            ok: true,
            sessions: [],
            source: 'unavailable',
            message: SESSIONS_API_UNAVAILABLE_MESSAGE,
          })
        }

        try {
          const url = new URL(request.url)
          const limit = parseBoundedInt(
            url.searchParams.get('limit'),
            50,
            1,
            100,
          )
          const offset = parseBoundedInt(
            url.searchParams.get('offset'),
            0,
            0,
            10_000,
          )
          const includeValidation =
            url.searchParams.get('includeValidation') === '1' ||
            url.searchParams.get('includeValidation') === 'true'

          const gatewayFetchLimit = Math.min(100, limit + 25)
          const sessions = await listSessions(gatewayFetchLimit, offset)
          const gatewaySessions = sessions
            .map(toSessionSummary)
            .filter(
              (session) =>
                includeValidation ||
                !isValidationProbeSession(session as Record<string, unknown>),
            )

          // The dashboard can be list-capable while refusing POST /api/sessions.
          // Keep locally-created fallback chats visible without duplicating
          // canonical dashboard IDs.
          const localSessions = listLocalSessions()
          const gatewayIds = new Set(
            gatewaySessions.map((s: any) => s.key || s.id),
          )
          for (const ls of localSessions) {
            if (!gatewayIds.has(ls.id)) {
              gatewaySessions.push(localSessionEntry(ls) as any)
            }
          }

          const visibleSessions = gatewaySessions
            .filter(
              (session) =>
                includeValidation ||
                !isValidationProbeSession(session as Record<string, unknown>),
            )
            .sort(
              (a, b) =>
                readUpdatedAt(b as Record<string, unknown>) -
                readUpdatedAt(a as Record<string, unknown>),
            )
            .slice(0, limit)

          return sessionsJson({ sessions: visibleSessions })
        } catch (err) {
          return sessionsJson(
            {
              error: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
          )
        }
      },
      POST: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheckPost = requireJsonContentType(request)
        if (csrfCheckPost) return csrfCheckPost
        const capabilities = await ensureGatewayProbed()
        if (!capabilities.sessions) {
          const friendlyId = randomUUID()
          return json({
            ...createCapabilityUnavailablePayload('sessions'),
            ok: true,
            sessionKey: friendlyId,
            friendlyId,
            persisted: false,
          })
        }
        const body = (await request.json().catch(() => ({}))) as Record<
          string,
          unknown
        >
        const requestedLabel =
          typeof body.label === 'string' ? body.label.trim() : ''
        const label = requestedLabel || undefined

        const requestedFriendlyId =
          typeof body.friendlyId === 'string' ? body.friendlyId.trim() : ''
        const friendlyId = requestedFriendlyId || randomUUID()

        const requestedModel =
          typeof body.model === 'string' ? body.model.trim() : ''
        const model = requestedModel || undefined

        try {
          const session = await createSession({
            id: friendlyId || randomUUID(),
            title: label,
            model,
          })

          return json({
            ok: true,
            sessionKey: session.id,
            friendlyId: session.id,
            entry: toSessionSummary(session),
            modelApplied: true,
          })
        } catch (err) {
          if (isDashboardSessionCreateUnsupported(err)) {
            const localSession = ensureLocalSession(friendlyId, model)
            if (requestedLabel) {
              updateLocalSessionTitle(friendlyId, requestedLabel)
              localSession.title = requestedLabel
            }

            return json({
              ok: true,
              sessionKey: localSession.id,
              friendlyId: localSession.id,
              entry: localSessionEntry(localSession),
              modelApplied: Boolean(model),
              persisted: false,
              source: 'local',
              warning:
                'Dashboard session creation is not supported; using workspace-local session.',
            })
          }
          return json(
            {
              ok: false,
              error: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
          )
        }
      },
      PATCH: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheckPatch = requireJsonContentType(request)
        if (csrfCheckPatch) return csrfCheckPatch
        const capabilities = await ensureGatewayProbed()
        if (!capabilities.sessions) {
          const body = (await request.json().catch(() => ({}))) as Record<
            string,
            unknown
          >
          const rawSessionKey =
            typeof body.sessionKey === 'string' ? body.sessionKey.trim() : ''
          const rawFriendlyId =
            typeof body.friendlyId === 'string' ? body.friendlyId.trim() : ''
          const sessionKey = rawSessionKey || rawFriendlyId || randomUUID()

          return json({
            ...createCapabilityUnavailablePayload('sessions'),
            ok: true,
            sessionKey,
            friendlyId: rawFriendlyId || sessionKey,
            updated: false,
          })
        }
        try {
          const body = (await request.json().catch(() => ({}))) as Record<
            string,
            unknown
          >

          const rawSessionKey =
            typeof body.sessionKey === 'string' ? body.sessionKey.trim() : ''
          const rawFriendlyId =
            typeof body.friendlyId === 'string' ? body.friendlyId.trim() : ''
          const label =
            typeof body.label === 'string' ? body.label.trim() : undefined
          const sessionKey = rawSessionKey || rawFriendlyId

          if (!sessionKey) {
            return json(
              { ok: false, error: 'sessionKey required' },
              { status: 400 },
            )
          }

          const localSession = getLocalSession(sessionKey)
          if (localSession) {
            if (label) updateLocalSessionTitle(sessionKey, label)
            return json({
              ok: true,
              sessionKey,
              friendlyId: rawFriendlyId || sessionKey,
              entry: {
                key: sessionKey,
                id: sessionKey,
                title: label || sessionKey,
                label: label || sessionKey,
                derivedTitle: label || sessionKey,
                startedAt: localSession.createdAt,
                updatedAt: Date.now(),
                message_count: localSession.messageCount,
                model: localSession.model,
                source: 'local',
              },
              updated: true,
              source: 'local',
            })
          }

          const session = await updateSession(sessionKey, {
            title: label,
          })

          return json({
            ok: true,
            sessionKey,
            entry: toSessionSummary(session),
          })
        } catch (err) {
          return json(
            {
              ok: false,
              error: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
          )
        }
      },
      DELETE: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const url = new URL(request.url)
        const rawSessionKey = url.searchParams.get('sessionKey') ?? ''
        const rawFriendlyId = url.searchParams.get('friendlyId') ?? ''
        const sessionKey = rawSessionKey.trim() || rawFriendlyId.trim()

        if (!sessionKey) {
          return json(
            { ok: false, error: 'sessionKey required' },
            { status: 400 },
          )
        }

        let deletedLocal = false
        if (getLocalSession(sessionKey)) {
          deleteLocalSession(sessionKey)
          deletedLocal = true
        }

        const capabilities = await ensureGatewayProbed()
        if (!capabilities.sessions) {
          return json({
            ...createCapabilityUnavailablePayload('sessions'),
            ok: true,
            sessionKey,
            deleted: deletedLocal,
            source: deletedLocal ? 'local' : 'unavailable',
          })
        }
        try {
          await deleteSession(sessionKey)

          return json({
            ok: true,
            sessionKey,
            source: deletedLocal ? 'local+gateway' : 'gateway',
          })
        } catch (err) {
          if (deletedLocal) {
            return json({
              ok: true,
              sessionKey,
              source: 'local',
              remoteDeleted: false,
              remoteError: err instanceof Error ? err.message : String(err),
            })
          }
          return json(
            {
              ok: false,
              error: err instanceof Error ? err.message : String(err),
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
