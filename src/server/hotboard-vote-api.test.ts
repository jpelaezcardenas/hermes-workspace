import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  handleHotboardVoteAggregateGet,
  handleHotboardVotePost,
} from './hotboard-vote-api'
import { createSessionStore, storeSessionToken } from './auth-middleware'

const tempDirs: string[] = []
const originalDbPath = process.env.HOTBOARD_VOTE_DB_PATH
const originalAuthDbPath = process.env.HERMES_AUTH_DB_PATH

afterEach(() => {
  if (originalDbPath === undefined) {
    delete process.env.HOTBOARD_VOTE_DB_PATH
  } else {
    process.env.HOTBOARD_VOTE_DB_PATH = originalDbPath
  }

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

function setupTempStores() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hotboard-vote-api-'))
  tempDirs.push(tempDir)
  process.env.HOTBOARD_VOTE_DB_PATH = path.join(tempDir, 'hotboard.sqlite')
  process.env.HERMES_AUTH_DB_PATH = path.join(tempDir, 'auth.sqlite')

  const sessionStore = createSessionStore()
  sessionStore.upsertUser({
    feishuOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
    feishuUnionId: 'on_owner',
    displayName: 'JC',
    role: 'owner',
  })

  storeSessionToken('session-jc', {
    userId: 'ou_40ece573ca861adce640dc9ea5054460',
    ttlSeconds: 7 * 24 * 60 * 60,
  })
}

function makeRequest(url: string, init?: RequestInit) {
  const headers = new Headers(init?.headers ?? {})
  headers.set('x-forwarded-for', '127.0.0.1')
  headers.set('cookie', 'hermes-auth=session-jc')

  return new Request(url, {
    ...init,
    headers,
  })
}

describe('hotboard vote api handlers', () => {
  it('POST vote toggles and returns aggregate for current user', async () => {
    setupTempStores()

    const firstRequest = makeRequest('http://localhost/api/hotboard/vote', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        event_id: 'event-a',
        vote_type: 'like',
      }),
    })

    const firstResponse = await handleHotboardVotePost(firstRequest)
    expect(firstResponse.status).toBe(200)
    const firstPayload = (await firstResponse.json()) as {
      ok: boolean
      active: boolean
      aggregate: Record<string, unknown>
      user_id: string
    }
    expect(firstPayload.ok).toBe(true)
    expect(firstPayload.active).toBe(true)
    expect(firstPayload.user_id).toBe('ou_40ece573ca861adce640dc9ea5054460')
    expect(firstPayload.aggregate['event-a']).toEqual({
      like_count: 1,
      dislike_count: 0,
      bookmark_count: 0,
      my_vote: ['like'],
    })

    const secondRequest = makeRequest('http://localhost/api/hotboard/vote', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        event_id: 'event-a',
        vote_type: 'like',
      }),
    })

    const secondResponse = await handleHotboardVotePost(secondRequest)
    expect(secondResponse.status).toBe(200)
    const secondPayload = (await secondResponse.json()) as {
      active: boolean
      aggregate: Record<string, unknown>
    }
    expect(secondPayload.active).toBe(false)
    expect(secondPayload.aggregate['event-a']).toBeUndefined()
  })

  it('GET aggregate returns cross-user counts and my_vote for authenticated user', async () => {
    setupTempStores()

    const requests = [
      { event_id: 'event-b', vote_type: 'like' },
      { event_id: 'event-b', vote_type: 'bookmark' },
    ]

    for (const payload of requests) {
      const request = makeRequest('http://localhost/api/hotboard/vote', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const response = await handleHotboardVotePost(request)
      expect(response.status).toBe(200)
    }

    const aggregateRequest = makeRequest('http://localhost/api/hotboard/vote/aggregate', {
      method: 'GET',
    })
    const aggregateResponse = await handleHotboardVoteAggregateGet(aggregateRequest)
    expect(aggregateResponse.status).toBe(200)
    const aggregatePayload = (await aggregateResponse.json()) as {
      ok: boolean
      aggregate: Record<string, unknown>
      user_id: string
    }
    expect(aggregatePayload.ok).toBe(true)
    expect(aggregatePayload.user_id).toBe('ou_40ece573ca861adce640dc9ea5054460')
    expect(aggregatePayload.aggregate['event-b']).toEqual({
      like_count: 1,
      dislike_count: 0,
      bookmark_count: 1,
      my_vote: ['bookmark', 'like'],
    })
  })
})
