import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { createSessionStore, storeSessionToken } from './auth-middleware'
import {
  handleHotboardIntakeGet,
  handleHotboardIntakePost,
} from './hotboard-intake-api'

const tempDirs: string[] = []
const originalAuthDbPath = process.env.HERMES_AUTH_DB_PATH
const originalIntakeDbPath = process.env.HOTBOARD_INTAKE_DB_PATH

afterEach(() => {
  if (originalAuthDbPath === undefined) {
    delete process.env.HERMES_AUTH_DB_PATH
  } else {
    process.env.HERMES_AUTH_DB_PATH = originalAuthDbPath
  }

  if (originalIntakeDbPath === undefined) {
    delete process.env.HOTBOARD_INTAKE_DB_PATH
  } else {
    process.env.HOTBOARD_INTAKE_DB_PATH = originalIntakeDbPath
  }

  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }
})

function setupTempStores() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hotboard-intake-api-'))
  tempDirs.push(tempDir)
  process.env.HERMES_AUTH_DB_PATH = path.join(tempDir, 'auth.sqlite')
  process.env.HOTBOARD_INTAKE_DB_PATH = path.join(tempDir, 'hotboard.sqlite')

  const sessionStore = createSessionStore()
  sessionStore.upsertUser({
    feishuOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
    feishuUnionId: 'on_owner',
    displayName: 'JC',
    role: 'owner',
  })

  sessionStore.upsertUser({
    feishuOpenId: 'ou_5bc5804ad321315d905efa73dea81fa4',
    feishuUnionId: 'on_member',
    displayName: '小龙',
    role: 'member',
  })

  storeSessionToken('session-owner', {
    userId: 'ou_40ece573ca861adce640dc9ea5054460',
    ttlSeconds: 7 * 24 * 60 * 60,
  })

  storeSessionToken('session-member', {
    userId: 'ou_5bc5804ad321315d905efa73dea81fa4',
    ttlSeconds: 7 * 24 * 60 * 60,
  })
}

function makeRequest(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers ?? {})
  headers.set('x-forwarded-for', '127.0.0.1')

  return new Request(url, {
    ...init,
    headers,
  })
}

describe('hotboard intake api handlers', () => {
  it('POST /api/hotboard/intake creates intake for owner session', async () => {
    setupTempStores()

    const request = makeRequest('http://localhost/api/hotboard/intake', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: 'hermes-auth=session-owner',
      },
      body: JSON.stringify({
        author_agent: 'hermes',
        title: '战略：新增低粉爆文盯盘',
        body: '执行节奏改为每天两次',
        tags: ['strategy', 'ops'],
      }),
    })

    const response = await handleHotboardIntakePost(request)
    expect(response.status).toBe(201)

    const payload = (await response.json()) as {
      ok: boolean
      item?: {
        author_agent_id: string
        title: string
        tags: string[]
        submitted_by_name: string
      }
    }

    expect(payload.ok).toBe(true)
    expect(payload.item?.author_agent_id).toBe('hermes')
    expect(payload.item?.title).toBe('战略：新增低粉爆文盯盘')
    expect(payload.item?.tags).toEqual(['strategy', 'ops'])
    expect(payload.item?.submitted_by_name).toBe('JC')
  })

  it('POST /api/hotboard/intake rejects member session', async () => {
    setupTempStores()

    const request = makeRequest('http://localhost/api/hotboard/intake', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: 'hermes-auth=session-member',
      },
      body: JSON.stringify({
        author_agent: 'xiaoj',
        title: '执行建议',
        body: '先跑 A/B',
        tags: ['execution'],
      }),
    })

    const response = await handleHotboardIntakePost(request)
    expect(response.status).toBe(403)

    const payload = (await response.json()) as { ok: boolean; error: string }
    expect(payload.ok).toBe(false)
    expect(payload.error).toContain('Forbidden')
  })

  it('GET /api/hotboard/intake returns newest-first list by author_agent', async () => {
    setupTempStores()

    const create = async (title: string) => {
      const request = makeRequest('http://localhost/api/hotboard/intake', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          cookie: 'hermes-auth=session-owner',
        },
        body: JSON.stringify({
          author_agent: 'xiaoj',
          title,
          body: '执行正文',
          tags: ['execution'],
        }),
      })
      const response = await handleHotboardIntakePost(request)
      expect(response.status).toBe(201)
    }

    await create('first')
    await create('second')

    const listRequest = makeRequest('http://localhost/api/hotboard/intake?author_agent=xiaoj', {
      method: 'GET',
      headers: {
        cookie: 'hermes-auth=session-member',
      },
    })

    const listResponse = await handleHotboardIntakeGet(listRequest)
    expect(listResponse.status).toBe(200)

    const payload = (await listResponse.json()) as {
      ok: boolean
      author_agent: string
      items: Array<{ title: string }>
    }

    expect(payload.ok).toBe(true)
    expect(payload.author_agent).toBe('xiaoj')
    expect(payload.items).toHaveLength(2)
    expect(payload.items.map((item) => item.title)).toEqual(['second', 'first'])
  })
})
