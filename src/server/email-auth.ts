import { randomBytes } from 'node:crypto'
import { createSessionStore, getAuthDbPath } from './auth-middleware'

type EmailWhitelistRole = 'owner' | 'member'

type EmailWhitelistSeed = {
  email: string
  displayName: string
  role: EmailWhitelistRole
}

type EmailWhitelistRow = {
  email: string
  display_name: string
  role: string
}

type MagicLinkRow = {
  token: string
  email: string
  expires_at: string
  consumed_at: string | null
}

const MAGIC_LINK_TTL_SECONDS = 15 * 60

const EMAIL_WHITELIST_SEED: ReadonlyArray<EmailWhitelistSeed> = [
  { email: 'jc@tangyuanjc.com', displayName: 'JC', role: 'owner' },
  { email: 'paopao@tangyuanjc.com', displayName: '泡泡', role: 'member' },
  { email: 'pipi@tangyuanjc.com', displayName: '皮皮', role: 'member' },
  { email: 'naisi@tangyuanjc.com', displayName: '奶思', role: 'member' },
  { email: 'huangning@tangyuanjc.com', displayName: '黄宁', role: 'member' },
  { email: 'fangfang@tangyuanjc.com', displayName: '芳芳', role: 'member' },
  { email: 'xiaolong@tangyuanjc.com', displayName: '小龙', role: 'member' },
  { email: 'xinxin@tangyuanjc.com', displayName: '欣欣', role: 'member' },
]

function nowIsoUtc() {
  return new Date().toISOString()
}

function plusSecondsIsoUtc(seconds: number) {
  return new Date(Date.now() + Math.max(1, seconds) * 1000).toISOString()
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function isExpired(expiresAt: string) {
  return Date.parse(expiresAt) <= Date.now()
}

function isValidRole(role: string): role is EmailWhitelistRole {
  return role === 'owner' || role === 'member'
}

function getDb() {
  const store = createSessionStore()
  return store.getDatabase()
}

let initializedByDbPath = new Set<string>()

function ensureEmailAuthTables() {
  const dbPath = getAuthDbPath()
  if (initializedByDbPath.has(dbPath)) return

  const db = getDb()
  db.exec(`
    CREATE TABLE IF NOT EXISTS email_whitelist (
      email TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TEXT NOT NULL,
      invited_by TEXT
    );

    CREATE TABLE IF NOT EXISTS magic_links (
      token TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      consumed_at TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_magic_links_email ON magic_links(email);
    CREATE INDEX IF NOT EXISTS idx_magic_links_expires_at ON magic_links(expires_at);
  `)

  const now = nowIsoUtc()
  const seedStmt = db.prepare(`
    INSERT INTO email_whitelist (email, display_name, role, created_at, invited_by)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      display_name = excluded.display_name,
      role = excluded.role
  `)

  for (const entry of EMAIL_WHITELIST_SEED) {
    seedStmt.run(
      normalizeEmail(entry.email),
      entry.displayName,
      entry.role,
      now,
      'seed',
    )
  }

  initializedByDbPath.add(dbPath)
}

export function resolveWhitelistedUserByEmail(email: string): {
  email: string
  displayName: string
  role: EmailWhitelistRole
} | null {
  ensureEmailAuthTables()
  const normalized = normalizeEmail(email)
  if (!normalized) return null

  const db = getDb()
  const stmt = db.prepare(`
    SELECT email, display_name, role
    FROM email_whitelist
    WHERE email = ?
    LIMIT 1
  `)
  const row = (stmt.get(normalized) as EmailWhitelistRow | undefined) ?? null
  if (!row || !isValidRole(row.role)) return null

  return {
    email: normalizeEmail(row.email),
    displayName: row.display_name,
    role: row.role,
  }
}

export function generateMagicLinkToken(email: string): {
  token: string
  expiresAt: string
} {
  ensureEmailAuthTables()
  const normalized = normalizeEmail(email)
  const allowed = resolveWhitelistedUserByEmail(normalized)
  if (!allowed) {
    throw new Error('UNAUTHORIZED_EMAIL')
  }

  const token = randomBytes(32).toString('hex')
  const now = nowIsoUtc()
  const expiresAt = plusSecondsIsoUtc(MAGIC_LINK_TTL_SECONDS)

  const db = getDb()
  db.prepare(`
    INSERT INTO magic_links (token, email, expires_at, consumed_at, created_at)
    VALUES (?, ?, ?, NULL, ?)
  `).run(token, normalized, expiresAt, now)

  return { token, expiresAt }
}

export function consumeMagicLinkToken(token: string): {
  email: string
  displayName: string
  role: EmailWhitelistRole
} | null {
  ensureEmailAuthTables()
  const normalizedToken = String(token || '').trim()
  if (!normalizedToken) return null

  const db = getDb()
  const row = (db.prepare(`
    SELECT token, email, expires_at, consumed_at
    FROM magic_links
    WHERE token = ?
    LIMIT 1
  `).get(normalizedToken) as MagicLinkRow | undefined) ?? null
  if (!row) return null
  if (row.consumed_at) return null
  if (isExpired(row.expires_at)) return null

  const now = nowIsoUtc()
  const consumeResult = db.prepare(`
    UPDATE magic_links
    SET consumed_at = ?
    WHERE token = ? AND consumed_at IS NULL
  `).run(now, normalizedToken)
  if (consumeResult.changes === 0) {
    return null
  }

  return resolveWhitelistedUserByEmail(row.email)
}

export function buildMagicLinkVerifyUrl(request: Request, token: string) {
  const explicitBase = process.env.HERMES_MAGIC_LINK_BASE_URL?.trim()
  const origin = explicitBase || new URL(request.url).origin
  const url = new URL('/auth/email/verify', origin)
  url.searchParams.set('token', token)
  return url.toString()
}

export async function sendMagicLinkEmail(args: {
  toEmail: string
  displayName: string
  verifyUrl: string
}): Promise<{ mode: 'resend' | 'stub' }> {
  const resendApiKey = process.env.RESEND_API_KEY?.trim()
  const fromAddress = process.env.RESEND_FROM_EMAIL?.trim() || 'noreply@tangyuanjc.com'

  if (!resendApiKey) {
    console.log('[magic-link stub] send email', {
      to: args.toEmail,
      displayName: args.displayName,
      verifyUrl: args.verifyUrl,
    })
    return { mode: 'stub' }
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [args.toEmail],
      subject: 'AI Hotboard 登录链接',
      html: `<p>Hi ${args.displayName},</p><p>点击下面链接登录 AI Hotboard（15 分钟内有效）：</p><p><a href="${args.verifyUrl}">${args.verifyUrl}</a></p>`,
      text: `Hi ${args.displayName},\n\n点击下面链接登录 AI Hotboard（15 分钟内有效）：\n${args.verifyUrl}\n`,
    }),
  })

  if (!response.ok) {
    const bodyText = await response.text().catch(() => '')
    throw new Error(`Failed to send magic link email: HTTP ${response.status} ${bodyText}`)
  }

  return { mode: 'resend' }
}

