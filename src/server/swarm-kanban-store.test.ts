import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type {
  CreateSwarmKanbanCardInput,
  SwarmKanbanCard,
  UpdateSwarmKanbanCardInput,
} from './swarm-kanban-store'
import type * as StoreModuleType from './swarm-kanban-store'

type StoreModule = typeof StoreModuleType

let homeDir: string

/**
 * The store reads HERMES_HOME into a module-load-time const, so each loader
 * call resets the module registry and re-imports against the current env. This
 * keeps the temp-dir backing file deterministic per test.
 */
async function loadStore(): Promise<StoreModule> {
  vi.resetModules()
  vi.stubEnv('HERMES_HOME', homeDir)
  vi.stubEnv('CLAUDE_HOME', '')
  return import('./swarm-kanban-store')
}

function kanbanFilePath(): string {
  return join(homeDir, 'swarm2-kanban.json')
}

function writeRawFile(contents: string): void {
  writeFileSync(kanbanFilePath(), contents, 'utf-8')
}

function readRawFile(): string {
  return readFileSync(kanbanFilePath(), 'utf-8')
}

beforeEach(() => {
  homeDir = mkdtempSync(join(tmpdir(), 'hermes-kanban-'))
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
  rmSync(homeDir, { recursive: true, force: true })
})

describe('SWARM_KANBAN_FILE path resolution', () => {
  it('resolves the file under HERMES_HOME', async () => {
    const store = await loadStore()
    expect(store.SWARM_KANBAN_FILE).toBe(kanbanFilePath())
  })

  it('falls back to CLAUDE_HOME when HERMES_HOME is unset', async () => {
    vi.resetModules()
    const priorHermes = process.env.HERMES_HOME
    const priorClaude = process.env.CLAUDE_HOME
    delete process.env.HERMES_HOME
    process.env.CLAUDE_HOME = homeDir
    try {
      const store = await import('./swarm-kanban-store')
      expect(store.SWARM_KANBAN_FILE).toBe(kanbanFilePath())
    } finally {
      if (priorHermes === undefined) delete process.env.HERMES_HOME
      else process.env.HERMES_HOME = priorHermes
      if (priorClaude === undefined) delete process.env.CLAUDE_HOME
      else process.env.CLAUDE_HOME = priorClaude
    }
  })

  it('exposes the canonical lane ordering', async () => {
    const store = await loadStore()
    expect(store.SWARM_KANBAN_LANES).toEqual([
      'backlog',
      'todo',
      'ready',
      'running',
      'review',
      'blocked',
      'done',
    ])
  })
})

describe('listSwarmKanbanCards bootstrap + read', () => {
  it('creates the backing file lazily and returns an empty list', async () => {
    const store = await loadStore()
    expect(existsSync(kanbanFilePath())).toBe(false)
    const cards = store.listSwarmKanbanCards()
    expect(cards).toEqual([])
    expect(existsSync(kanbanFilePath())).toBe(true)
    expect(JSON.parse(readRawFile())).toEqual({ cards: [] })
  })

  it('returns an empty list when the file holds only whitespace', async () => {
    const store = await loadStore()
    store.listSwarmKanbanCards()
    writeRawFile('   \n  ')
    expect(store.listSwarmKanbanCards()).toEqual([])
  })

  it('returns an empty list when the JSON is malformed', async () => {
    const store = await loadStore()
    store.listSwarmKanbanCards()
    writeRawFile('{not valid json')
    expect(store.listSwarmKanbanCards()).toEqual([])
  })

  it('returns an empty list when cards is not an array', async () => {
    const store = await loadStore()
    store.listSwarmKanbanCards()
    writeRawFile(JSON.stringify({ cards: { nope: true } }))
    expect(store.listSwarmKanbanCards()).toEqual([])
  })

  it('returns an empty list when the top-level shape lacks cards', async () => {
    const store = await loadStore()
    store.listSwarmKanbanCards()
    writeRawFile(JSON.stringify({ unrelated: 1 }))
    expect(store.listSwarmKanbanCards()).toEqual([])
  })
})

describe('createSwarmKanbanCard', () => {
  it('creates a card with defaults for omitted fields', async () => {
    const store = await loadStore()
    const card = store.createSwarmKanbanCard({ title: 'My task' })
    expect(card.title).toBe('My task')
    expect(card.spec).toBe('')
    expect(card.acceptanceCriteria).toEqual([])
    expect(card.assignedWorker).toBeNull()
    expect(card.reviewer).toBeNull()
    expect(card.status).toBe('backlog')
    expect(card.missionId).toBeNull()
    expect(card.reportPath).toBeNull()
    expect(card.createdBy).toBe('swarm2-kanban')
    expect(card.parents).toEqual([])
    expect(card.children).toEqual([])
    expect(card.tags).toEqual([])
    expect(card.latestRun).toBeNull()
    expect(card.source).toBeUndefined()
    expect(typeof card.id).toBe('string')
    expect(card.id.length).toBeGreaterThan(0)
    expect(card.createdAt).toBe(card.updatedAt)
  })

  it('persists the created card to disk', async () => {
    const store = await loadStore()
    const card = store.createSwarmKanbanCard({ title: 'Persisted' })
    const onDisk = JSON.parse(readRawFile()) as {
      cards: Array<SwarmKanbanCard>
    }
    expect(onDisk.cards).toHaveLength(1)
    expect(onDisk.cards[0]?.id).toBe(card.id)
    expect(readRawFile().endsWith('\n')).toBe(true)
  })

  it('trims the title and falls back to a placeholder when blank', async () => {
    const store = await loadStore()
    expect(store.createSwarmKanbanCard({ title: '  Hello  ' }).title).toBe(
      'Hello',
    )
    expect(store.createSwarmKanbanCard({ title: '   ' }).title).toBe(
      'Untitled task',
    )
  })

  it('normalizes acceptance criteria from a newline string', async () => {
    const store = await loadStore()
    const input: CreateSwarmKanbanCardInput = {
      title: 't',
      // The store also accepts a raw string for criteria via normalizeCriteria.
      acceptanceCriteria: 'one\n  two  \n\nthree' as unknown as Array<string>,
    }
    const card = store.createSwarmKanbanCard(input)
    expect(card.acceptanceCriteria).toEqual(['one', 'two', 'three'])
  })

  it('normalizes acceptance criteria from an array, dropping non-strings', async () => {
    const store = await loadStore()
    const input: CreateSwarmKanbanCardInput = {
      title: 't',
      acceptanceCriteria: ['  keep  ', '', 3 as unknown as string, 'also'],
    }
    const card = store.createSwarmKanbanCard(input)
    expect(card.acceptanceCriteria).toEqual(['keep', 'also'])
  })

  it('normalizes tags from a comma string and from an array', async () => {
    const store = await loadStore()
    const fromString = store.createSwarmKanbanCard({
      title: 't',
      tags: 'a, b ,,c' as unknown as Array<string>,
    })
    expect(fromString.tags).toEqual(['a', 'b', 'c'])
    const fromArray = store.createSwarmKanbanCard({
      title: 't',
      tags: [' x ', '', 'y'],
    })
    expect(fromArray.tags).toEqual(['x', 'y'])
  })

  it('maps legacy in_progress/doing statuses onto running', async () => {
    const store = await loadStore()
    const inProgress = store.createSwarmKanbanCard({
      title: 'a',
      status: 'in_progress' as unknown as null,
    })
    const doing = store.createSwarmKanbanCard({
      title: 'b',
      status: 'doing' as unknown as null,
    })
    expect(inProgress.status).toBe('running')
    expect(doing.status).toBe('running')
  })

  it('falls back to backlog for an unknown status', async () => {
    const store = await loadStore()
    const card = store.createSwarmKanbanCard({
      title: 'a',
      status: 'nonsense' as unknown as null,
    })
    expect(card.status).toBe('backlog')
  })

  it('preserves a valid explicit status', async () => {
    const store = await loadStore()
    const card = store.createSwarmKanbanCard({ title: 'a', status: 'review' })
    expect(card.status).toBe('review')
  })

  it('treats blank optional strings as null', async () => {
    const store = await loadStore()
    const card = store.createSwarmKanbanCard({
      title: 'a',
      assignedWorker: '   ',
      reviewer: '',
      missionId: null,
      reportPath: undefined,
    })
    expect(card.assignedWorker).toBeNull()
    expect(card.reviewer).toBeNull()
    expect(card.missionId).toBeNull()
    expect(card.reportPath).toBeNull()
  })

  it('trims non-blank optional strings', async () => {
    const store = await loadStore()
    const card = store.createSwarmKanbanCard({
      title: 'a',
      assignedWorker: '  worker-1  ',
      reviewer: 'rev',
      missionId: ' m1 ',
      reportPath: ' /tmp/r ',
    })
    expect(card.assignedWorker).toBe('worker-1')
    expect(card.reviewer).toBe('rev')
    expect(card.missionId).toBe('m1')
    expect(card.reportPath).toBe('/tmp/r')
  })

  it('honors an explicit createdBy', async () => {
    const store = await loadStore()
    const card = store.createSwarmKanbanCard({
      title: 'a',
      createdBy: 'operator',
    })
    expect(card.createdBy).toBe('operator')
  })

  it('appends successive cards rather than overwriting', async () => {
    const store = await loadStore()
    store.createSwarmKanbanCard({ title: 'one' })
    store.createSwarmKanbanCard({ title: 'two' })
    expect(store.listSwarmKanbanCards()).toHaveLength(2)
  })
})

describe('listSwarmKanbanCards filtering + sorting', () => {
  it('sorts by updatedAt desc, breaking ties on title', async () => {
    const store = await loadStore()
    // Two cards share updatedAt (tie → title asc); the third is newest.
    const clock = vi.spyOn(Date, 'now')
    clock.mockReturnValue(1_000_000)
    store.createSwarmKanbanCard({ title: 'bbb' })
    store.createSwarmKanbanCard({ title: 'aaa' })
    clock.mockReturnValue(1_000_100)
    store.createSwarmKanbanCard({ title: 'ccc' })
    const titles = store.listSwarmKanbanCards().map((c) => c.title)
    // ccc is newest; aaa and bbb tie on updatedAt so sort by title asc.
    expect(titles).toEqual(['ccc', 'aaa', 'bbb'])
  })

  it('filters by status using normalization', async () => {
    const store = await loadStore()
    store.createSwarmKanbanCard({ title: 'r', status: 'running' })
    store.createSwarmKanbanCard({ title: 'b', status: 'backlog' })
    const running = store.listSwarmKanbanCards({ status: 'in_progress' })
    expect(running.map((c) => c.title)).toEqual(['r'])
  })

  it('filters by assignedWorker, reviewer, and missionId', async () => {
    const store = await loadStore()
    store.createSwarmKanbanCard({
      title: 'match',
      assignedWorker: 'w1',
      reviewer: 'rev',
      missionId: 'm1',
    })
    store.createSwarmKanbanCard({ title: 'other', assignedWorker: 'w2' })
    expect(
      store.listSwarmKanbanCards({ assignedWorker: 'w1' }).map((c) => c.title),
    ).toEqual(['match'])
    expect(
      store.listSwarmKanbanCards({ reviewer: 'rev' }).map((c) => c.title),
    ).toEqual(['match'])
    expect(
      store.listSwarmKanbanCards({ missionId: 'm1' }).map((c) => c.title),
    ).toEqual(['match'])
  })

  it('ignores falsy filter values', async () => {
    const store = await loadStore()
    store.createSwarmKanbanCard({ title: 'a' })
    store.createSwarmKanbanCard({ title: 'b' })
    const all = store.listSwarmKanbanCards({
      status: null,
      assignedWorker: null,
      reviewer: null,
      missionId: null,
    })
    expect(all).toHaveLength(2)
  })

  it('uses an empty filter object by default', async () => {
    const store = await loadStore()
    store.createSwarmKanbanCard({ title: 'a' })
    expect(store.listSwarmKanbanCards()).toHaveLength(1)
  })

  it('does not mutate the underlying array order across calls', async () => {
    const store = await loadStore()
    store.createSwarmKanbanCard({ title: 'a' })
    store.createSwarmKanbanCard({ title: 'b' })
    const first = store.listSwarmKanbanCards()
    const second = store.listSwarmKanbanCards()
    expect(first.map((c) => c.id)).toEqual(second.map((c) => c.id))
  })
})

describe('listSwarmKanbanCards card normalization on read', () => {
  it('repairs malformed persisted cards', async () => {
    const store = await loadStore()
    store.listSwarmKanbanCards()
    writeRawFile(
      JSON.stringify({
        cards: [
          {
            // Missing id/title/createdBy; bad types elsewhere.
            spec: 42,
            status: 'doing',
            acceptanceCriteria: 'a\nb',
            tags: 'x,y',
            parents: ['p1'],
            children: 'c1,c2',
            createdAt: 'not-a-number',
            updatedAt: 5,
          },
        ],
      }),
    )
    const [card] = store.listSwarmKanbanCards()
    expect(card).toBeDefined()
    if (card === undefined) throw new Error('expected a card')
    expect(card.id.length).toBeGreaterThan(0)
    expect(card.title).toBe('Untitled task')
    expect(card.spec).toBe('')
    expect(card.status).toBe('running')
    expect(card.acceptanceCriteria).toEqual(['a', 'b'])
    expect(card.tags).toEqual(['x', 'y'])
    expect(card.parents).toEqual(['p1'])
    expect(card.children).toEqual(['c1', 'c2'])
    expect(typeof card.createdAt).toBe('number')
    expect(card.updatedAt).toBe(5)
    expect(card.createdBy).toBe('swarm2-kanban')
  })

  it('preserves latestRun and source when present', async () => {
    const store = await loadStore()
    store.listSwarmKanbanCards()
    writeRawFile(
      JSON.stringify({
        cards: [
          {
            id: 'c1',
            title: 'kept',
            latestRun: { summary: 's', outcome: 'ok', status: 'done' },
            source: 'imported',
          },
        ],
      }),
    )
    const [card] = store.listSwarmKanbanCards()
    if (card === undefined) throw new Error('expected a card')
    expect(card.latestRun).toEqual({
      summary: 's',
      outcome: 'ok',
      status: 'done',
    })
    expect(card.source).toBe('imported')
  })
})

describe('updateSwarmKanbanCard', () => {
  it('returns null when the card id is unknown', async () => {
    const store = await loadStore()
    store.createSwarmKanbanCard({ title: 'a' })
    expect(store.updateSwarmKanbanCard('missing', { title: 'x' })).toBeNull()
  })

  it('applies updates and bumps updatedAt while preserving identity', async () => {
    const store = await loadStore()
    const created = store.createSwarmKanbanCard({
      title: 'orig',
      createdBy: 'operator',
    })
    const updates: UpdateSwarmKanbanCardInput = {
      title: 'renamed',
      status: 'review',
      assignedWorker: 'w9',
    }
    const updated = store.updateSwarmKanbanCard(created.id, updates)
    if (updated === null) throw new Error('expected an updated card')
    expect(updated.id).toBe(created.id)
    expect(updated.title).toBe('renamed')
    expect(updated.status).toBe('review')
    expect(updated.assignedWorker).toBe('w9')
    expect(updated.createdAt).toBe(created.createdAt)
    expect(updated.createdBy).toBe('operator')
    expect(updated.updatedAt).toBeGreaterThanOrEqual(created.updatedAt)
  })

  it('keeps the existing title when the update omits it', async () => {
    const store = await loadStore()
    const created = store.createSwarmKanbanCard({ title: 'keepme' })
    const updated = store.updateSwarmKanbanCard(created.id, { status: 'done' })
    if (updated === null) throw new Error('expected an updated card')
    expect(updated.title).toBe('keepme')
    expect(updated.status).toBe('done')
  })

  it('cannot override id, createdAt, or createdBy via updates', async () => {
    const store = await loadStore()
    const created = store.createSwarmKanbanCard({
      title: 'a',
      createdBy: 'operator',
    })
    const updated = store.updateSwarmKanbanCard(created.id, {
      ...({
        id: 'hacked',
        createdAt: 0,
        createdBy: 'attacker',
      } as unknown as UpdateSwarmKanbanCardInput),
      title: 'a2',
    })
    if (updated === null) throw new Error('expected an updated card')
    expect(updated.id).toBe(created.id)
    expect(updated.createdAt).toBe(created.createdAt)
    expect(updated.createdBy).toBe('operator')
  })

  it('persists the update to disk', async () => {
    const store = await loadStore()
    const created = store.createSwarmKanbanCard({ title: 'a' })
    store.updateSwarmKanbanCard(created.id, { title: 'b' })
    const onDisk = JSON.parse(readRawFile()) as {
      cards: Array<SwarmKanbanCard>
    }
    expect(onDisk.cards[0]?.title).toBe('b')
  })

  it('normalizes a legacy status supplied in the update', async () => {
    const store = await loadStore()
    const created = store.createSwarmKanbanCard({ title: 'a' })
    const updated = store.updateSwarmKanbanCard(created.id, {
      status: 'in_progress' as unknown as null,
    })
    if (updated === null) throw new Error('expected an updated card')
    expect(updated.status).toBe('running')
  })

  it('clears an optional string field when set to blank', async () => {
    const store = await loadStore()
    const created = store.createSwarmKanbanCard({
      title: 'a',
      assignedWorker: 'w1',
    })
    const updated = store.updateSwarmKanbanCard(created.id, {
      assignedWorker: '   ',
    })
    if (updated === null) throw new Error('expected an updated card')
    expect(updated.assignedWorker).toBeNull()
  })
})
