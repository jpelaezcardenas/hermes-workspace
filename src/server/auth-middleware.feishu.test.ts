import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  createSessionCookie,
  createSessionStore,
  getSessionTokenFromCookie,
  getSessionUser,
  isAuthenticated,
  revokeSessionToken,
  storeSessionToken,
} from './auth-middleware'

const tempDirs: string[] = []
const originalAuthDbPath = process.env.HERMES_AUTH_DB_PATH

afterEach(() => {
  if (originalAuthDbPath === undefined) {
    delete process.env.HERMES_AUTH_DB_PATH
  } else {
    process.env.HERMES_AUTH_DB_PATH = originalAuthDbPath
  }

  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }
})

function setupTempDbPath() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-auth-'))
  tempDirs.push(tempDir)
  const dbPath = path.join(tempDir, 'auth.sqlite')
  process.env.HERMES_AUTH_DB_PATH = dbPath
  return dbPath
}

describe('auth middleware feishu session behavior', () => {
  it('persists session and resolves auth user from cookie token', () => {
    setupTempDbPath()
    const store = createSessionStore()

    store.upsertUser({
      feishuOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
      feishuUnionId: 'on_123',
      displayName: 'JC',
      role: 'owner',
    })

    storeSessionToken('token-1', {
      userId: 'ou_40ece573ca861adce640dc9ea5054460',
      ttlSeconds: 7 * 24 * 60 * 60,
    })

    const req = new Request('http://localhost/api/hotboard/feed', {
      headers: {
        cookie: 'hermes-auth=token-1',
      },
    })

    expect(isAuthenticated(req)).toBe(true)

    const user = getSessionUser(req)
    expect(user).toEqual({
      id: 'ou_40ece573ca861adce640dc9ea5054460',
      feishu_open_id: 'ou_40ece573ca861adce640dc9ea5054460',
      feishu_union_id: 'on_123',
      display_name: 'JC',
      role: 'owner',
      created_at: expect.any(String),
      last_login_at: expect.any(String),
    })
  })

  it('revokes session token and rejects authentication afterward', () => {
    setupTempDbPath()
    const store = createSessionStore()
    store.upsertUser({
      feishuOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
      feishuUnionId: 'on_123',
      displayName: 'JC',
      role: 'owner',
    })
    storeSessionToken('token-2', {
      userId: 'ou_40ece573ca861adce640dc9ea5054460',
      ttlSeconds: 7 * 24 * 60 * 60,
    })

    const beforeRevoke = new Request('http://localhost/api/hotboard/feed', {
      headers: { cookie: 'hermes-auth=token-2' },
    })
    expect(isAuthenticated(beforeRevoke)).toBe(true)

    revokeSessionToken('token-2')

    const afterRevoke = new Request('http://localhost/api/hotboard/feed', {
      headers: { cookie: 'hermes-auth=token-2' },
    })
    expect(isAuthenticated(afterRevoke)).toBe(false)
  })

  it('uses 7 day ttl in session cookie header', () => {
    const header = createSessionCookie('token-3')
    expect(header).toContain('HttpOnly')
    expect(header).toContain('SameSite=Strict')
    expect(header).toContain('Path=/')
    expect(header).toContain(`Max-Age=${7 * 24 * 60 * 60}`)
  })

  it('extracts session token from cookie header', () => {
    expect(getSessionTokenFromCookie('a=1; hermes-auth=abc123; c=3')).toBe('abc123')
    expect(getSessionTokenFromCookie(null)).toBeNull()
  })
})
