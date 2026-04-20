import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  createHotboardIntakeStore,
  type IntakeAgentKey,
} from './hotboard-intake-store'

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
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hotboard-intake-store-'))
  tempDirs.push(tempDir)
  return path.join(tempDir, 'hotboard.sqlite')
}

describe('hotboard intake store', () => {
  it('creates intake item and returns list in newest-first order', () => {
    const store = createHotboardIntakeStore({ dbPath: createTempDbPath() })

    const first = store.createItem({
      authorAgent: 'hermes',
      title: 'First strategy signal',
      body: 'Body A',
      tags: ['strategy', 'x'],
      submittedByOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
      submittedByName: 'JC',
    })

    const second = store.createItem({
      authorAgent: 'hermes',
      title: 'Second strategy signal',
      body: 'Body B',
      tags: ['ops'],
      submittedByOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
      submittedByName: 'JC',
    })

    const list = store.listItems('hermes')
    expect(list).toHaveLength(2)
    expect(list[0]?.id).toBe(second.id)
    expect(list[1]?.id).toBe(first.id)
    expect(list[0]?.tags).toEqual(['ops'])
    expect(list[1]?.tags).toEqual(['strategy', 'x'])
  })

  it('keeps intake streams isolated by author agent', () => {
    const store = createHotboardIntakeStore({ dbPath: createTempDbPath() })

    const agents: IntakeAgentKey[] = ['hermes', 'xiaoj']
    agents.forEach((agent) => {
      store.createItem({
        authorAgent: agent,
        title: `title-${agent}`,
        body: `body-${agent}`,
        tags: [agent],
        submittedByOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
        submittedByName: 'JC',
      })
    })

    const hermes = store.listItems('hermes')
    const xiaoj = store.listItems('xiaoj')

    expect(hermes).toHaveLength(1)
    expect(hermes[0]?.author_agent_id).toBe('hermes')
    expect(hermes[0]?.title).toBe('title-hermes')

    expect(xiaoj).toHaveLength(1)
    expect(xiaoj[0]?.author_agent_id).toBe('xiaoj')
    expect(xiaoj[0]?.title).toBe('title-xiaoj')
  })

  it('persists intake items across store instances on same db path', () => {
    const dbPath = createTempDbPath()

    const storeA = createHotboardIntakeStore({ dbPath })
    const created = storeA.createItem({
      authorAgent: 'xiaoj',
      title: 'Execution follow-up',
      body: 'launch in 2 days',
      tags: ['execution'],
      submittedByOpenId: 'ou_40ece573ca861adce640dc9ea5054460',
      submittedByName: 'JC',
    })

    const storeB = createHotboardIntakeStore({ dbPath })
    const list = storeB.listItems('xiaoj')

    expect(list).toHaveLength(1)
    expect(list[0]?.id).toBe(created.id)
    expect(list[0]?.title).toBe('Execution follow-up')
  })
})
