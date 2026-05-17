import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../../server/auth-middleware'
import { createMultiAgentEventLog } from '../../../server/multi-agent/events'
import { createMultiAgentStore } from '../../../server/multi-agent/store'

export function unauthorized() {
  return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

export function requireAuthenticated(request: Request): Response | null {
  return isAuthenticated(request) ? null : unauthorized()
}

export function getRouteStore() {
  return createMultiAgentStore({ stateFile: process.env.HERMES_MA_STATE_FILE })
}

export function getRouteEventLog() {
  return createMultiAgentEventLog({ eventsDir: process.env.HERMES_MA_EVENTS_DIR })
}

export function safeError(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}
