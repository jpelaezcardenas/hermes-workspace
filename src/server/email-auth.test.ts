import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { afterEach, describe, expect, it } from 'vitest'
import {
  consumeMagicLinkToken,
  generateMagicLinkToken,
  resolveWhitelistedUserByEmail,
} from './email-auth'

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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-email-auth-'))
  tempDirs.push(tempDir)
  const dbPath = path.join(tempDir, 'auth.sqlite')
  process.env.HERMES_AUTH_DB_PATH = dbPath
  return dbPath
}

describe('email auth', () => {
  it('resolves seeded whitelist users by email', () => {
    setupTempDbPath()
    const user = resolveWhitelistedUserByEmail('jc@tangyuanjc.com')
    expect(user).toEqual({
      email: 'jc@tangyuanjc.com',
      displayName: 'JC',
      role: 'owner',
    })
  })

  it('generates and consumes one-time magic link tokens', () => {
    setupTempDbPath()

    const created = generateMagicLinkToken('jc@tangyuanjc.com')
    expect(created.token.length).toBeGreaterThan(20)
    expect(created.expiresAt).toEqual(expect.any(String))

    const consumed = consumeMagicLinkToken(created.token)
    expect(consumed).toEqual({
      email: 'jc@tangyuanjc.com',
      displayName: 'JC',
      role: 'owner',
    })

    const consumedAgain = consumeMagicLinkToken(created.token)
    expect(consumedAgain).toBeNull()
  })

  it('rejects expired magic link tokens', () => {
    const dbPath = setupTempDbPath()

    const created = generateMagicLinkToken('jc@tangyuanjc.com')

    const db = new DatabaseSync(dbPath)
    db.prepare('UPDATE magic_links SET expires_at = ? WHERE token = ?')
      .run('2000-01-01T00:00:00.000Z', created.token)

    const consumed = consumeMagicLinkToken(created.token)
    expect(consumed).toBeNull()
  })
})
