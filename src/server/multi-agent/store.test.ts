import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  createApproval,
  createMultiAgentStore,
  createTask,
  emptyMultiAgentState,
  listTasks,
  loadState,
  resolveApproval,
  saveState,
  updateTask,
} from './store'

function tempStateFile(): string {
  return join(mkdtempSync(join(tmpdir(), 'hermes-ma-store-')), 'state.json')
}

describe('multi-agent file-backed store', () => {
  it('creates an empty state when the state file is missing', () => {
    const stateFile = tempStateFile()
    const state = loadState(stateFile)

    expect(state.schemaVersion).toBe(1)
    expect(state.tasks).toEqual({})
    expect(state.profiles).toEqual({})
  })

  it('writes and reads tasks', () => {
    const stateFile = tempStateFile()
    const store = createMultiAgentStore({ stateFile, now: () => '2026-05-16T18:20:00.000Z' })

    const task = createTask(store, {
      projectId: 'workspace',
      title: 'Build store',
      description: 'Persist task data',
      assigneeProfileId: 'backend-engineer',
      priority: 'high',
      workPacket: 'Implement store module',
      acceptanceCriteria: ['Task can be listed'],
    })

    const loaded = loadState(stateFile)
    expect(loaded.tasks[task.id]?.title).toBe('Build store')
    expect(listTasks(store, { projectId: 'workspace' })).toHaveLength(1)
  })

  it('updates task status and timestamps', () => {
    const stateFile = tempStateFile()
    const store = createMultiAgentStore({ stateFile, now: () => '2026-05-16T18:21:00.000Z' })
    const task = createTask(store, {
      projectId: 'workspace',
      title: 'Create worktree',
      description: '',
      assigneeProfileId: 'backend-engineer',
      priority: 'medium',
      workPacket: '',
      acceptanceCriteria: [],
    })

    store.now = () => '2026-05-16T18:22:00.000Z'
    const updated = updateTask(store, task.id, {
      status: 'ready',
      branchName: 'hermes/task-task-123-create-worktree',
    })

    expect(updated.status).toBe('ready')
    expect(updated.updatedAt).toBe('2026-05-16T18:22:00.000Z')
    expect(loadState(stateFile).tasks[task.id]?.branchName).toBe('hermes/task-task-123-create-worktree')
  })

  it('resolves approvals', () => {
    const stateFile = tempStateFile()
    const store = createMultiAgentStore({ stateFile, now: () => '2026-05-16T18:23:00.000Z' })
    const approval = createApproval(store, {
      taskId: 'task-123',
      riskLevel: 'high',
      actionType: 'github.pr_create',
      title: 'Create PR',
      description: 'Push and create a PR',
      payload: { branch: 'hermes/task-123' },
    })

    store.now = () => '2026-05-16T18:24:00.000Z'
    const resolved = resolveApproval(store, approval.id, 'approved')

    expect(resolved.status).toBe('approved')
    expect(resolved.resolvedAt).toBe('2026-05-16T18:24:00.000Z')
    expect(loadState(stateFile).approvals[approval.id]?.status).toBe('approved')
  })

  it('preserves malformed state before returning empty state', () => {
    const stateFile = tempStateFile()
    writeFileSync(stateFile, '{ definitely not json', 'utf-8')

    const state = loadState(stateFile, { now: () => '2026-05-16T18:25:00.000Z' })

    expect(state).toEqual(emptyMultiAgentState('2026-05-16T18:25:00.000Z'))
    const corruptCopy = readFileSync(`${stateFile}.corrupt-2026-05-16T18-25-00-000Z.json`, 'utf-8')
    expect(corruptCopy).toContain('definitely not json')
  })

  it('saves state atomically through a temp file and rename', () => {
    const stateFile = tempStateFile()
    const state = emptyMultiAgentState('2026-05-16T18:26:00.000Z')

    saveState(stateFile, state)

    expect(JSON.parse(readFileSync(stateFile, 'utf-8'))).toMatchObject({ schemaVersion: 1 })
  })
})
