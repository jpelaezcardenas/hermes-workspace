import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  handleHotboardVoteAggregateGet,
  handleHotboardVotePost,
} from './hotboard-vote-api'

const tempDirs: string[] = []
const originalDbPath = process.env.HOTBOARD_VOTE_DB_PATH

afterEach(() => {
  if (originalDbPath === undefined) {
    delete process.env.HOTBOARD_VOTE_DB_PATH
  } else {
    process.env.HOTBOARD_VOTE_DB_PATH = originalDbPath
  }

  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }
})

function createTempDbPath() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hotboard-vote-api-'))
  tempDirs.push(tempDir)
  const dbPath = path.join(tempDir, 'hotboard.sqlite')
  process.env.HOTBOARD_VOTE_DB_PATH = dbPath
  return dbPath
}

function makeRequest(url: string, init?: RequestInit) {
  return new Request(url, {
    headers: {
      'x-forwarded-for': '127.0.0.1',
      ...(init?.headers ?? {}),
    },
    ...init,
  })
}

describe('hotboard vote api handlers', () => {
  it('POST vote toggles and returns aggregate for current user', async () => {
    createTempDbPath()

    const firstRequest = makeRequest('http://localhost/api/hotboard/vote', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        event_id: 'event-a',
        vote_type: 'like',
        user_id: 'user-1',
      }),
    })

    const firstResponse = await handleHotboardVotePost(firstRequest)
    expect(firstResponse.status).toBe(200)
    const firstPayload = (await firstResponse.json()) as {
      ok: boolean
      active: boolean
      aggregate: Record<string, unknown>
    }
    expect(firstPayload.ok).toBe(true)
    expect(firstPayload.active).toBe(true)
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
        user_id: 'user-1',
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

  it('GET aggregate returns cross-user counts and my_vote for requested user', async () => {
    createTempDbPath()

    const requests = [
      { event_id: 'event-b', vote_type: 'like', user_id: 'user-a' },
      { event_id: 'event-b', vote_type: 'bookmark', user_id: 'user-a' },
      { event_id: 'event-b', vote_type: 'dislike', user_id: 'user-b' },
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

    const aggregateRequest = makeRequest('http://localhost/api/hotboard/vote/aggregate?user_id=user-a', {
      method: 'GET',
    })
    const aggregateResponse = await handleHotboardVoteAggregateGet(aggregateRequest)
    expect(aggregateResponse.status).toBe(200)
    const aggregatePayload = (await aggregateResponse.json()) as {
      ok: boolean
      aggregate: Record<string, unknown>
    }
    expect(aggregatePayload.ok).toBe(true)
    expect(aggregatePayload.aggregate['event-b']).toEqual({
      like_count: 1,
      dislike_count: 1,
      bookmark_count: 1,
      my_vote: ['bookmark', 'like'],
    })
  })
})
