import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { createZaraStore } from './hotboard-zara-store'

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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hotboard-zara-store-'))
  tempDirs.push(tempDir)
  return path.join(tempDir, 'hotboard-zara.sqlite')
}

describe('hotboard zara store', () => {
  it('upserts items by video id and preserves first_seen_at while updating mutable fields', () => {
    const store = createZaraStore({ dbPath: createTempDbPath() })

    const firstResult = store.upsertItems([
      {
        videoId: '7xTGNNLPyMI',
        url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
        title: 'Deep Dive into LLMs like ChatGPT',
        channel: 'Andrej Karpathy',
        tags: ['Fundamentals'],
        description: 'The best introduction into LLMs on the Internet',
        thumbnailUrl: 'https://i.ytimg.com/vi/7xTGNNLPyMI/hqdefault.jpg',
      },
    ])

    expect(firstResult).toEqual({ added: 1, updated: 0, total: 1 })

    const initial = store.listAllItems()
    expect(initial).toHaveLength(1)
    expect(initial[0]).toMatchObject({
      videoId: '7xTGNNLPyMI',
      title: 'Deep Dive into LLMs like ChatGPT',
      tags: ['Fundamentals'],
    })

    const firstSeenAt = initial[0].firstSeenAt
    const refreshedAt = initial[0].lastRefreshedAt

    const secondResult = store.upsertItems([
      {
        videoId: '7xTGNNLPyMI',
        url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
        title: 'Deep Dive into LLMs',
        channel: 'Andrej Karpathy',
        tags: ['Fundamentals', 'LLM'],
        description: 'Updated description',
        thumbnailUrl: 'https://i.ytimg.com/vi/7xTGNNLPyMI/maxresdefault.jpg',
      },
    ])

    expect(secondResult).toEqual({ added: 0, updated: 1, total: 1 })

    const updated = store.listAllItems()
    expect(updated[0]).toMatchObject({
      videoId: '7xTGNNLPyMI',
      title: 'Deep Dive into LLMs',
      tags: ['Fundamentals', 'LLM'],
      description: 'Updated description',
      thumbnailUrl: 'https://i.ytimg.com/vi/7xTGNNLPyMI/maxresdefault.jpg',
    })
    expect(updated[0].firstSeenAt).toBe(firstSeenAt)
    expect(Date.parse(updated[0].lastRefreshedAt ?? '')).toBeGreaterThanOrEqual(Date.parse(refreshedAt ?? ''))
  })

  it('lists items by first_seen_at desc and applies limit', () => {
    const store = createZaraStore({ dbPath: createTempDbPath() })

    store.upsertItems([
      {
        videoId: 'old-video',
        url: 'https://www.youtube.com/watch?v=old-video',
        title: 'Old video',
        channel: 'Old channel',
        tags: ['Product'],
      },
    ])

    store.upsertItems([
      {
        videoId: 'new-video',
        url: 'https://www.youtube.com/watch?v=new-video',
        title: 'New video',
        channel: 'New channel',
        tags: ['Practical'],
      },
    ])

    const list = store.listAllItems(1)
    expect(list).toHaveLength(1)
    expect(list[0].videoId).toBe('new-video')
  })
})
