import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  createHotboardVoteStore,
  type VoteType,
} from './hotboard-vote-store'

const tempDirs: string[] = []

afterEach(() => {
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }
})

function createTempDbPath() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hotboard-vote-store-'))
  tempDirs.push(tempDir)
  return path.join(tempDir, 'hotboard.sqlite')
}

describe('hotboard vote store', () => {
  it('toggles same vote type on repeated clicks', () => {
    const store = createHotboardVoteStore({ dbPath: createTempDbPath() })

    const first = store.toggleVote({
      eventId: 'event-1',
      userId: 'user-a',
      voteType: 'like',
    })
    expect(first.active).toBe(true)

    const second = store.toggleVote({
      eventId: 'event-1',
      userId: 'user-a',
      voteType: 'like',
    })
    expect(second.active).toBe(false)

    const aggregate = store.getAggregateForUser('user-a')
    expect(aggregate['event-1']).toBeUndefined()
  })

  it('keeps vote types independent per user and returns my_vote list', () => {
    const store = createHotboardVoteStore({ dbPath: createTempDbPath() })

    const votes: VoteType[] = ['like', 'bookmark']
    votes.forEach((voteType) => {
      store.toggleVote({
        eventId: 'event-2',
        userId: 'user-a',
        voteType,
      })
    })
    store.toggleVote({
      eventId: 'event-2',
      userId: 'user-b',
      voteType: 'dislike',
    })

    const aggregate = store.getAggregateForUser('user-a')
    expect(aggregate['event-2']).toEqual({
      like_count: 1,
      dislike_count: 1,
      bookmark_count: 1,
      my_vote: ['bookmark', 'like'],
    })
  })

  it('persists votes across store instances pointing at same database path', () => {
    const dbPath = createTempDbPath()

    const storeA = createHotboardVoteStore({ dbPath })
    storeA.toggleVote({
      eventId: 'event-3',
      userId: 'user-a',
      voteType: 'bookmark',
    })

    const storeB = createHotboardVoteStore({ dbPath })
    const aggregate = storeB.getAggregateForUser('user-a')
    expect(aggregate['event-3']).toEqual({
      like_count: 0,
      dislike_count: 0,
      bookmark_count: 1,
      my_vote: ['bookmark'],
    })
  })
})
