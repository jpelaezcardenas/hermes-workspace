import { describe, expect, it } from 'vitest'
import type { MultiAgentProfile, MultiAgentTask } from './types'
import {
  MULTI_AGENT_SKILL_METADATA_INDEX,
  defaultSkillsForRole,
  selectSkillsForTask,
} from './skill-autoload'

const now = '2026-05-19T00:00:00.000Z'

function profile(overrides: Partial<MultiAgentProfile> = {}): MultiAgentProfile {
  return {
    id: 'backend-engineer',
    name: 'Backend Engineer',
    role: 'backend-engineer',
    runtime: 'hermes-agent',
    model: null,
    skills: [],
    enabledToolsets: ['terminal', 'file'],
    permissionPolicy: 'ask-risky',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

function task(overrides: Partial<MultiAgentTask> = {}): MultiAgentTask {
  return {
    id: 'task-1',
    projectId: 'workspace',
    title: 'Add validation runner UI',
    description: 'Build a React panel for validation results and API state.',
    status: 'ready',
    priority: 'medium',
    assigneeProfileId: 'backend-engineer',
    parentIds: [],
    childIds: [],
    workPacket: 'Use TDD, implement POST /api validation wiring, show build and test results in UI.',
    acceptanceCriteria: ['tests pass', 'review gate completed'],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

describe('contextual skill autoloading', () => {
  it('exposes a metadata index with role and keyword match signals', () => {
    expect(MULTI_AGENT_SKILL_METADATA_INDEX['test-driven-development']).toMatchObject({
      name: 'test-driven-development',
      roles: expect.arrayContaining(['backend-engineer', 'frontend-engineer']),
      keywords: expect.arrayContaining(['test', 'tdd']),
    })
    expect(MULTI_AGENT_SKILL_METADATA_INDEX['review-gate'].keywords).toContain('review')
  })

  it('returns default skills for each worker role', () => {
    expect(defaultSkillsForRole('backend-engineer')).toEqual(
      expect.arrayContaining(['test-driven-development', 'systematic-debugging']),
    )
    expect(defaultSkillsForRole('reviewer')).toEqual(expect.arrayContaining(['review-gate']))
  })

  it('selects profile, role-default, and contextual task skills with stable de-duplication', () => {
    const selected = selectSkillsForTask({
      profile: profile({ skills: ['custom-project-skill', 'test-driven-development'] }),
      task: task(),
    })

    expect(selected).toEqual([
      'custom-project-skill',
      'test-driven-development',
      'systematic-debugging',
      'frontend-design',
      'review-gate',
    ])
  })

  it('adds docs and orchestration skills from task context without loading unrelated skills', () => {
    const selected = selectSkillsForTask({
      profile: profile({ role: 'orchestrator', id: 'orchestrator', skills: [] }),
      task: task({
        title: 'Document multi-agent architecture plan',
        description: 'Write docs and decide the best plan for the control plane rollout.',
        workPacket: 'Produce documentation, architecture notes, and best-of-n options.',
        acceptanceCriteria: ['docs updated'],
      }),
    })

    expect(selected).toEqual(
      expect.arrayContaining(['protocol-driven-orchestrator', 'best-of-n-planning', 'document-release']),
    )
    expect(selected).not.toContain('frontend-design')
  })
})
