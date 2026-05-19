import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import type { MultiAgentRun, MultiAgentTask } from './types'
import { saveTaskSummaryToObsidian } from './memory-sync'

const now = '2026-05-18T12:00:00.000Z'

function task(overrides: Partial<MultiAgentTask> = {}): MultiAgentTask {
  return {
    id: 'task-1',
    projectId: 'workspace',
    title: 'Add memory hooks / MVP',
    description: 'Persist final task context',
    status: 'done',
    priority: 'medium',
    assigneeProfileId: 'backend-engineer',
    parentIds: [],
    childIds: [],
    workPacket: 'Store final summary and optionally sync to Obsidian.',
    productBrief: {
      goal: 'Preserve useful task outcomes for future planning.',
      userStory: 'As an operator, I can reopen a run note and understand why the task mattered.',
      successMetrics: ['summary reused in next planning session'],
      nonGoals: ['global knowledge graph sync'],
    },
    acceptanceCriteria: ['summary is stored', 'obsidian note can be written'],
    branchName: 'hermes/task-1-memory-hooks',
    worktreePath: '/repo/.hermes-worktrees/task-1-memory-hooks',
    latestRunId: 'run-1',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

function run(overrides: Partial<MultiAgentRun> = {}): MultiAgentRun {
  return {
    id: 'run-1',
    taskId: 'task-1',
    profileId: 'backend-engineer',
    status: 'completed',
    startedAt: now,
    finishedAt: now,
    summary: 'Implemented memory hooks and tests.',
    ...overrides,
  }
}

describe('multi-agent memory sync', () => {
  it('writes a sanitized markdown note for a task final summary', () => {
    const obsidianRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-memory-'))

    const result = saveTaskSummaryToObsidian({
      obsidianRoot,
      task: task(),
      run: run(),
      summary: 'Implemented memory hooks and tests.',
      savedAt: now,
    })

    expect(result.path).toMatch(/2026-05-18-task-1-add-memory-hooks-mvp\.md$/)
    const note = readFileSync(result.path, 'utf-8')
    expect(note).toContain('# Add memory hooks / MVP')
    expect(note).toContain('Task: `task-1`')
    expect(note).toContain('Run: `run-1`')
    expect(note).toContain('Status: `done`')
    expect(note).toContain('Branch: `hermes/task-1-memory-hooks`')
    expect(note).toContain('Implemented memory hooks and tests.')
    expect(note).toContain('## Product Brief')
    expect(note).toContain('Goal: Preserve useful task outcomes for future planning.')
    expect(note).toContain('- summary reused in next planning session')
    expect(note).toContain('- global knowledge graph sync')
    expect(note).toContain('- summary is stored')
    expect(note).not.toContain('undefined')
  })

  it('rejects empty summaries before writing memory notes', () => {
    const obsidianRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-memory-'))

    expect(() => saveTaskSummaryToObsidian({
      obsidianRoot,
      task: task(),
      run: run({ summary: null }),
      summary: '   ',
      savedAt: now,
    })).toThrow(/summary is required/i)
  })
})
