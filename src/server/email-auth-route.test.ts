import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { Route as EmailAuthApiRoute } from '../routes/api/auth/email'
import { Route as EmailVerifyRoute } from '../routes/auth/email/verify'
import { getSessionTokenFromCookie, getSessionUser } from './auth-middleware'
import { generateMagicLinkToken } from './email-auth'

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
    if (dir) fs.rmSync(dir, { recursive: true, force: true })
  }
})

function setupTempDbPath() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-email-route-'))
  tempDirs.push(tempDir)
  const dbPath = path.join(tempDir, 'auth.sqlite')
  process.env.HERMES_AUTH_DB_PATH = dbPath
}

describe('email auth routes', () => {
  it('returns forbidden for non-whitelisted email', async () => {
    setupTempDbPath()
    const request = new Request('http://localhost:3002/api/auth/email', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
      },
      body: JSON.stringify({ email: 'outsider@example.com' }),
    })

    const response = await EmailAuthApiRoute.options.server.handlers.POST({ request } as never)
    expect(response.status).toBe(403)
  })

  it('creates session and redirects on valid verify token', async () => {
    setupTempDbPath()
    const created = generateMagicLinkToken('jc@tangyuanjc.com')
    const request = new Request(
      `http://localhost:3002/auth/email/verify?token=${created.token}`,
      {
        method: 'GET',
        headers: {
          'x-forwarded-for': '127.0.0.1',
        },
      },
    )

    const response = await EmailVerifyRoute.options.server.handlers.GET({ request } as never)
    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('/ai-hotboard')

    const setCookie = response.headers.get('set-cookie')
    expect(setCookie).toContain('hermes-auth=')

    const token = getSessionTokenFromCookie(setCookie)
    expect(token).toBeTruthy()

    const verifyRequest = new Request('http://localhost:3002/api/auth-check', {
      headers: {
        cookie: setCookie || '',
      },
    })
    const user = getSessionUser(verifyRequest)
    expect(user?.email).toBe('jc@tangyuanjc.com')
  })

  it('rejects reused verify token', async () => {
    setupTempDbPath()
    const created = generateMagicLinkToken('jc@tangyuanjc.com')
    const url = `http://localhost:3002/auth/email/verify?token=${created.token}`

    const first = await EmailVerifyRoute.options.server.handlers.GET({
      request: new Request(url),
    } as never)
    expect(first.status).toBe(302)
    expect(first.headers.get('location')).toBe('/ai-hotboard')

    const second = await EmailVerifyRoute.options.server.handlers.GET({
      request: new Request(url),
    } as never)
    expect(second.status).toBe(302)
    expect(second.headers.get('location')).toContain('/ai-hotboard?auth_error=')
  })
})

