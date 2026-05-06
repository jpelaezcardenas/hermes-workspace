import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const originalEnv = { ...process.env }
let tempRoot = ''

beforeEach(async () => {
  vi.resetModules()
  tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hermes-kanban-store-'))
  process.env = { ...originalEnv, HERMES_HOME: tempRoot }
})

afterEach(async () => {
  process.env = { ...originalEnv }
  await fs.rm(tempRoot, { recursive: true, force: true })
})

describe('swarm-kanban-store project scoping', () => {
  it('keeps project boards isolated while preserving the default board path', async () => {
    const {
      SWARM_KANBAN_FILE,
      createSwarmKanbanCard,
      listSwarmKanbanCards,
      swarmKanbanFileForProject,
    } = await import('./swarm-kanban-store')

    const defaultCard = createSwarmKanbanCard({ title: 'General task' })
    const solarbotCard = createSwarmKanbanCard({ title: 'Solarbot task', projectId: 'solarbot' })

    expect(defaultCard.projectId).toBe('default')
    expect(solarbotCard.projectId).toBe('solarbot')
    expect(listSwarmKanbanCards().map((card) => card.title)).toEqual(['General task'])
    expect(listSwarmKanbanCards({ projectId: 'solarbot' }).map((card) => card.title)).toEqual(['Solarbot task'])
    expect(swarmKanbanFileForProject()).toBe(SWARM_KANBAN_FILE)
    expect(swarmKanbanFileForProject('solarbot')).toBe(path.join(tempRoot, 'swarm2-kanban', 'solarbot.json'))
    await expect(fs.stat(SWARM_KANBAN_FILE)).resolves.toBeTruthy()
    await expect(fs.stat(path.join(tempRoot, 'swarm2-kanban', 'solarbot.json'))).resolves.toBeTruthy()
  })
})
