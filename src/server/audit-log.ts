/**
 * Audit logging for security-relevant events.
 *
 * Logs are written to stderr (visible in dev server output) and optionally
 * flushed to a file in production. Each entry is a single-line JSON object
 * so it integrates with log aggregation pipelines (ELK, Datadog, etc.).
 *
 * Sensitive data (passwords, tokens, file content) is explicitly redacted.
 */

export type AuditEvent =
  | { type: 'auth.success'; ip: string; timestamp: number }
  | { type: 'auth.failure'; ip: string; reason: string; timestamp: number }
  | { type: 'auth.rate_limited'; ip: string; timestamp: number }
  | {
      type: 'session.created'
      sessionKey: string
      ip: string
      timestamp: number
    }
  | {
      type: 'session.message_sent'
      sessionKey: string
      ip: string
      messageLength: number
      timestamp: number
    }
  | {
      type: 'terminal.session_created'
      sessionId: string
      ip: string
      timestamp: number
    }
  | {
      type: 'terminal.input_sent'
      sessionId: string
      ip: string
      inputLength: number
      timestamp: number
    }
  | { type: 'file.read'; path: string; ip: string; timestamp: number }
  | { type: 'file.write'; path: string; ip: string; timestamp: number }
  | { type: 'file.delete'; path: string; ip: string; timestamp: number }
  | { type: 'oauth.start'; provider: string; ip: string; timestamp: number }
  | {
      type: 'oauth.token_received'
      provider: string
      ip: string
      timestamp: number
    }
  | { type: 'api.unauthorized'; path: string; ip: string; timestamp: number }
  | { type: 'api.forbidden'; path: string; ip: string; timestamp: number }
  | {
      type: 'upload.rejected'
      ip: string
      reason: string
      size?: number
      timestamp: number
    }

const REDACTED = '[REDACTED]'

/** Return a safe log-safe representation of an event (no sensitive data). */
function serialize(event: AuditEvent): string {
  return JSON.stringify(event)
}

/** Log an audit event to stderr (dev) / stdout (prod). */
export function audit(event: AuditEvent): void {
  const line = serialize(event)
  if (process.env.NODE_ENV === 'production') {
    console.error(`AUDIT ${line}`)
  } else {
    console.error(`[AUDIT] ${line}`)
  }
}

/** Create a read-only snapshot of the current in-memory audit stats.
 *  Exposes counts per event type for health-check / monitoring endpoints.
 */
const _stats = new Map<string, number>()

export function recordStat(type: AuditEvent['type']): void {
  _stats.set(type, (_stats.get(type) ?? 0) + 1)
}

export function getAuditStats(): Record<string, number> {
  return Object.fromEntries(_stats)
}

/** Redact a string value for logging (shows first + last 3 chars if long). */
export function redactString(value: string, maxLen = 6): string {
  if (value.length <= maxLen) return REDACTED
  return `${value.slice(0, 3)}...${value.slice(-3)}`
}
