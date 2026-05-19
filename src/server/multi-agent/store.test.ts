import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  createApproval,
  createMission,
  createMultiAgentStore,
  listApprovals,
  createTask,
  emptyMultiAgentState,
  listMissions,
  listTasks,
  loadState,
  planMissionTasks,
  resolveApproval,
  saveState,
  updateTask,
} from './store'

function tempStateFile(): string {
  return join(mkdtempSync(join(tmpdir(), 'hermes-ma-store-')), 'state.json')
}

describe('multi-agent file-backed store', () => {
  it('writes and lists missions as the top-level multi-agent product unit', () => {
    const stateFile = tempStateFile()
    const store = createMultiAgentStore({ stateFile, now: () => '2026-05-19T09:00:00.000Z', id: () => 'mission-1' })

    const mission = createMission(store, {
      projectId: 'workspace',
      title: 'Ship real multi-agent team',
      productBrief: {
        goal: 'Turn manual worker runs into an autonomous Hermes team.',
        userStory: 'As an operator, I can define one mission and let Hermes plan coordinated agent work.',
        successMetrics: ['mission creates a task graph'],
        nonGoals: ['remote worker fleet'],
      },
      constraints: ['single-user local runtime', 'hermes-agent workers only'],
      desiredOutput: 'Planned task graph ready for execution.',
    })

    const loaded = loadState(stateFile)
    expect(loaded.missions[mission.id]?.title).toBe('Ship real multi-agent team')
    expect(loaded.missions[mission.id]?.status).toBe('draft')
    expect(loaded.missions[mission.id]?.taskIds).toEqual([])
    expect(loaded.missions[mission.id]?.productBrief.goal).toContain('autonomous Hermes team')
    expect(listMissions(store, { projectId: 'workspace' })).toEqual([mission])
  })

  it('plans a mission into linked backlog tasks and marks the mission planned', () => {
    const stateFile = tempStateFile()
    const ids = ['mission-1', 'task-1', 'task-2']
    const store = createMultiAgentStore({
      stateFile,
      now: () => '2026-05-19T09:10:00.000Z',
      id: () => ids.shift() ?? 'fallback',
    })
    const mission = createMission(store, {
      projectId: 'workspace',
      title: 'Ship autonomous planning loop',
      productBrief: {
        goal: 'Let Hermes plan and run coordinated worker tasks.',
        userStory: 'As an operator, I can turn one mission into a reviewed task graph.',
        successMetrics: ['task graph is created'],
        nonGoals: ['remote worker fleet'],
      },
      constraints: ['local single-user runtime'],
      desiredOutput: 'A ready execution graph.',
    })

    const plannedTasks = planMissionTasks(store, mission.id, [
      {
        title: 'Design task graph contract',
        description: 'Define the mission task graph data contract.',
        assigneeProfileId: 'architect',
        priority: 'high',
        workPacket: 'Specify task dependencies and outputs.',
        acceptanceCriteria: ['Contract is documented'],
      },
      {
        title: 'Implement task graph runner',
        description: 'Persist planned tasks for execution.',
        assigneeProfileId: 'backend-engineer',
        priority: 'medium',
        parentIds: ['task-task-1'],
        workPacket: 'Create linked tasks from mission plan.',
        acceptanceCriteria: ['Tasks are linked to mission'],
      },
    ])

    const loaded = loadState(stateFile)
    expect(plannedTasks.map((task) => task.missionId)).toEqual([mission.id, mission.id])
    expect(plannedTasks.map((task) => task.status)).toEqual(['backlog', 'backlog'])
    expect(loaded.missions[mission.id]?.status).toBe('planned')
    expect(loaded.missions[mission.id]?.taskIds).toEqual(plannedTasks.map((task) => task.id))
    expect(loaded.tasks[plannedTasks[1].id]?.parentIds).toEqual(['task-task-1'])
  })

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
      productBrief: {
        goal: 'Help operators trust stored task state.',
        userStory: 'As an operator, I can reopen the board and see task context.',
        successMetrics: ['task reload success rate'],
        nonGoals: ['cloud sync'],
      },
      acceptanceCriteria: ['Task can be listed'],
    })

    const loaded = loadState(stateFile)
    expect(loaded.tasks[task.id]?.title).toBe('Build store')
    expect(loaded.tasks[task.id]?.productBrief).toEqual({
      goal: 'Help operators trust stored task state.',
      userStory: 'As an operator, I can reopen the board and see task context.',
      successMetrics: ['task reload success rate'],
      nonGoals: ['cloud sync'],
    })
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

  it('lists and resolves approvals', () => {
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

    expect(listApprovals(store, { status: 'pending' })).toEqual([approval])

    store.now = () => '2026-05-16T18:24:00.000Z'
    const resolved = resolveApproval(store, approval.id, 'approved')

    expect(resolved.status).toBe('approved')
    expect(resolved.resolvedAt).toBe('2026-05-16T18:24:00.000Z')
    expect(loadState(stateFile).approvals[approval.id]?.status).toBe('approved')
    expect(listApprovals(store, { status: 'pending' })).toEqual([])
    expect(listApprovals(store, { taskId: 'task-123' })).toEqual([resolved])
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
