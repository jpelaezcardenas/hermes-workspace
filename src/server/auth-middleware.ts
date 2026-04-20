import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { randomBytes, timingSafeEqual } from 'node:crypto'
import { DatabaseSync } from 'node:sqlite'

const SESSION_COOKIE_NAME = 'hermes-auth'
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60

const EMPLOYEE_WHITELIST: ReadonlyArray<{ openId: string; displayName: string; role: 'owner' | 'member' }> = [
  { openId: 'ou_40ece573ca861adce640dc9ea5054460', displayName: 'JC', role: 'owner' },
  { openId: 'ou_d89d30f80a0cdd287cb77db6a1f0346f', displayName: '泡泡', role: 'member' },
  { openId: 'ou_3a1e620f3a86ac4bd8f5908e9c972eda', displayName: '皮皮', role: 'member' },
  { openId: 'ou_364c1a524046117645bfaf62ed812884', displayName: '奶思', role: 'member' },
  { openId: 'ou_c5bb2da837826b19ea9c7b6747861237', displayName: '黄宁', role: 'member' },
  { openId: 'ou_9ea09e0d7b7f0f6397624e0fdd5873c5', displayName: '芳芳', role: 'member' },
  { openId: 'ou_5bc5804ad321315d905efa73dea81fa4', displayName: '小龙', role: 'member' },
  { openId: 'ou_ad30272f15dfc74a7fb905ae7856a005', displayName: '欣欣', role: 'member' },
]

const whitelistByOpenId = new Map(EMPLOYEE_WHITELIST.map((item) => [item.openId, item]))

type SessionUserRow = {
  id: string
  feishu_open_id: string
  feishu_union_id: string | null
  display_name: string
  role: string
  created_at: string
  last_login_at: string
}

type SessionRow = {
  token: string
  user_id: string
  expires_at: string
}

type UpsertUserInput = {
  feishuOpenId: string
  feishuUnionId?: string | null
  displayName: string
  role: 'owner' | 'member'
}

type StoreSessionTokenOptions = {
  userId: string
  ttlSeconds?: number
}

export type SessionUser = {
  id: string
  feishu_open_id: string
  feishu_union_id: string | null
  display_name: string
  role: string
  created_at: string
  last_login_at: string
}

const storeByPath = new Map<string, SessionStore>()

function resolveAuthDbPath() {
  const explicit = process.env.HERMES_AUTH_DB_PATH?.trim()
  if (explicit) return explicit
  return path.join(os.homedir(), '.hermes', 'data', 'auth.sqlite')
}

function nowIsoUtc() {
  return new Date().toISOString()
}

function plusSecondsIsoUtc(seconds: number) {
  const next = Date.now() + Math.max(1, seconds) * 1000
  return new Date(next).toISOString()
}

function isExpired(expiresAt: string) {
  return Date.parse(expiresAt) <= Date.now()
}

function readCookieValue(cookieHeader: string | null, key: string): string | null {
  if (!cookieHeader) return null
  const cookies = cookieHeader.split(';').map((c) => c.trim())
  for (const cookie of cookies) {
    if (cookie.startsWith(`${key}=`)) {
      return cookie.slice(key.length + 1)
    }
  }
  return null
}

export class SessionStore {
  private readonly db: DatabaseSync

  constructor(private readonly dbPath: string) {
    fs.mkdirSync(path.dirname(this.dbPath), { recursive: true })
    this.db = new DatabaseSync(this.dbPath)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        feishu_open_id TEXT NOT NULL UNIQUE,
        feishu_union_id TEXT,
        display_name TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL,
        last_login_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );

      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
    `)
  }

  upsertUser(input: UpsertUserInput): SessionUser {
    const now = nowIsoUtc()
    const existing = this.getUserByOpenId(input.feishuOpenId)

    if (existing) {
      const update = this.db.prepare(`
        UPDATE users
        SET
          feishu_union_id = ?,
          display_name = ?,
          role = ?,
          last_login_at = ?
        WHERE id = ?
      `)
      update.run(
        input.feishuUnionId ?? null,
        input.displayName,
        input.role,
        now,
        existing.id,
      )
      return this.getUserById(existing.id) as SessionUser
    }

    const id = input.feishuOpenId
    const insert = this.db.prepare(`
      INSERT INTO users (id, feishu_open_id, feishu_union_id, display_name, role, created_at, last_login_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    insert.run(
      id,
      input.feishuOpenId,
      input.feishuUnionId ?? null,
      input.displayName,
      input.role,
      now,
      now,
    )
    return this.getUserById(id) as SessionUser
  }

  getUserByOpenId(openId: string): SessionUser | null {
    const stmt = this.db.prepare(`
      SELECT id, feishu_open_id, feishu_union_id, display_name, role, created_at, last_login_at
      FROM users
      WHERE feishu_open_id = ?
      LIMIT 1
    `)
    return (stmt.get(openId) as SessionUserRow | undefined) ?? null
  }

  getUserById(id: string): SessionUser | null {
    const stmt = this.db.prepare(`
      SELECT id, feishu_open_id, feishu_union_id, display_name, role, created_at, last_login_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `)
    return (stmt.get(id) as SessionUserRow | undefined) ?? null
  }

  storeSessionToken(token: string, options: StoreSessionTokenOptions): void {
    const now = nowIsoUtc()
    const expiresAt = plusSecondsIsoUtc(options.ttlSeconds ?? SESSION_TTL_SECONDS)

    const upsert = this.db.prepare(`
      INSERT INTO sessions (token, user_id, expires_at, created_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(token) DO UPDATE SET
        user_id = excluded.user_id,
        expires_at = excluded.expires_at
    `)
    upsert.run(token, options.userId, expiresAt, now)
  }

  revokeSessionToken(token: string): void {
    const stmt = this.db.prepare('DELETE FROM sessions WHERE token = ?')
    stmt.run(token)
  }

  getSession(token: string): SessionRow | null {
    const stmt = this.db.prepare(`
      SELECT token, user_id, expires_at
      FROM sessions
      WHERE token = ?
      LIMIT 1
    `)
    return (stmt.get(token) as SessionRow | undefined) ?? null
  }

  getSessionUserByToken(token: string): SessionUser | null {
    const session = this.getSession(token)
    if (!session) return null

    if (isExpired(session.expires_at)) {
      this.revokeSessionToken(token)
      return null
    }

    return this.getUserById(session.user_id)
  }

  isValidSessionToken(token: string): boolean {
    return this.getSessionUserByToken(token) !== null
  }
}

export function createSessionStore(options: { dbPath?: string } = {}) {
  const dbPath = options.dbPath?.trim() || resolveAuthDbPath()
  const existing = storeByPath.get(dbPath)
  if (existing) return existing
  const store = new SessionStore(dbPath)
  storeByPath.set(dbPath, store)
  return store
}

/**
 * Generate a cryptographically secure session token.
 */
export function generateSessionToken(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Store a session token as valid.
 */
export function storeSessionToken(token: string, options: StoreSessionTokenOptions): void {
  createSessionStore().storeSessionToken(token, options)
}

/**
 * Check if a session token is valid.
 */
export function isValidSessionToken(token: string): boolean {
  return createSessionStore().isValidSessionToken(token)
}

/**
 * Remove a session token (logout).
 */
export function revokeSessionToken(token: string): void {
  createSessionStore().revokeSessionToken(token)
}

/**
 * Check if password protection is enabled.
 */
export function isPasswordProtectionEnabled(): boolean {
  return Boolean(
    process.env.HERMES_PASSWORD && process.env.HERMES_PASSWORD.length > 0,
  )
}

/**
 * Verify password using timing-safe comparison.
 */
export function verifyPassword(password: string): boolean {
  const configured = process.env.HERMES_PASSWORD
  if (!configured || configured.length === 0) {
    return false
  }

  const passwordBuf = Buffer.from(password, 'utf8')
  const configuredBuf = Buffer.from(configured, 'utf8')

  if (passwordBuf.length !== configuredBuf.length) {
    return false
  }

  try {
    return timingSafeEqual(passwordBuf, configuredBuf)
  } catch {
    return false
  }
}

export function isFeishuSsoEnabled(): boolean {
  return Boolean(
    process.env.FEISHU_APP_ID?.trim() && process.env.FEISHU_APP_SECRET?.trim(),
  )
}

export function getFeishuAuthConfig() {
  const appId = process.env.FEISHU_APP_ID?.trim()
  const appSecret = process.env.FEISHU_APP_SECRET?.trim()
  if (!appId || !appSecret) return null

  return {
    appId,
    appSecret,
    redirectUri: process.env.FEISHU_REDIRECT_URI?.trim() || '/auth/feishu/callback',
  }
}

export function getEmployeeWhitelist() {
  return EMPLOYEE_WHITELIST
}

export function resolveWhitelistedUserByOpenId(openId: string) {
  return whitelistByOpenId.get(openId) ?? null
}

/**
 * Extract session token from cookie header.
 */
export function getSessionTokenFromCookie(
  cookieHeader: string | null,
): string | null {
  return readCookieValue(cookieHeader, SESSION_COOKIE_NAME)
}

export function getSessionUser(request: Request): SessionUser | null {
  const cookieHeader = request.headers.get('cookie')
  const token = getSessionTokenFromCookie(cookieHeader)
  if (!token) return null
  return createSessionStore().getSessionUserByToken(token)
}

function isLocalRequest(request: Request): boolean {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || '127.0.0.1'
  const localIPs = ['127.0.0.1', '::1', 'localhost', '::ffff:127.0.0.1']
  if (localIPs.includes(ip)) return true
  if (/^100\.\d+\.\d+\.\d+$/.test(ip)) return true
  if (/^192\.168\./.test(ip)) return true
  if (/^10\./.test(ip)) return true
  return false
}

/**
 * Check if the request is authenticated.
 * Returns true if:
 * - Password protection is disabled and Feishu SSO is disabled, OR
 * - Request has a valid session token
 */
export function isAuthenticated(request: Request): boolean {
  const authRequired = isPasswordProtectionEnabled() || isFeishuSsoEnabled()
  if (!authRequired) {
    return true
  }

  const cookieHeader = request.headers.get('cookie')
  const token = getSessionTokenFromCookie(cookieHeader)

  if (!token) {
    return false
  }

  return isValidSessionToken(token)
}

export function requireLocalOrAuth(request: Request): boolean {
  const authRequired = isPasswordProtectionEnabled() || isFeishuSsoEnabled()
  if (!authRequired) {
    return isLocalRequest(request)
  }

  return isAuthenticated(request)
}

/**
 * Create a Set-Cookie header for the session token.
 */
export function createSessionCookie(token: string): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${SESSION_COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict; Path=/${secureFlag}; Max-Age=${SESSION_TTL_SECONDS}`
}

export function clearSessionCookie(): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${SESSION_COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/${secureFlag}; Max-Age=0`
}
