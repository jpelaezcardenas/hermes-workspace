/**
 * Admin identity resolution based on SSO-forwarded headers.
 *
 * The workspace sits behind an SSO reverse proxy (Caddy at S&T Properties).
 * The proxy forwards the authenticated user's email via identity headers.
 * Admin access is controlled by the `HERMES_ADMIN_EMAILS` env var — a
 * comma-separated allowlist of email addresses. Matching is case-insensitive.
 *
 * If `HERMES_ADMIN_EMAILS` is unset/empty, the workspace falls back to
 * "everyone is admin" so local development and single-user deployments keep
 * working unchanged.
 */

const IDENTITY_HEADERS = [
  'x-forwarded-user',
  'x-sso-email',
  'x-forwarded-email',
  'x-auth-request-email',
  'x-authenticated-user',
  'x-user-email',
  'remote-user',
] as const

function normalizeEmail(value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim().toLowerCase()
  if (!trimmed) return null
  return trimmed
}

export function getAdminEmails(): Array<string> {
  const raw = process.env.HERMES_ADMIN_EMAILS ?? ''
  return raw
    .split(',')
    .map((entry) => normalizeEmail(entry))
    .filter((entry): entry is string => Boolean(entry))
}

export function isAdminAllowlistConfigured(): boolean {
  return getAdminEmails().length > 0
}

export function getCurrentUserEmail(request: Request): string | null {
  for (const header of IDENTITY_HEADERS) {
    const value = request.headers.get(header)
    const normalized = normalizeEmail(value)
    if (normalized) return normalized
  }
  return null
}

export function isAdminEmail(email: string | null): boolean {
  // If no allowlist is configured, treat everyone as admin — preserves
  // the previous behavior for local/single-user installs.
  if (!isAdminAllowlistConfigured()) return true
  if (!email) return false
  return getAdminEmails().includes(email.toLowerCase())
}

export function isAdminRequest(request: Request): boolean {
  return isAdminEmail(getCurrentUserEmail(request))
}
