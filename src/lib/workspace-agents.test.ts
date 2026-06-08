import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  extractWorkspaceAgents,
  getWorkspaceAgentStats,
  listWorkspaceAgents,
  normalizeWorkspaceAgentStats,
} from './workspace-agents'
import { workspaceRequestJson } from '@/lib/workspace-checkpoints'

vi.mock('@/lib/workspace-checkpoints', () => ({
  workspaceRequestJson: vi.fn(),
}))

const requestMock = vi.mocked(workspaceRequestJson)

/** A fully-populated raw agent record used as a valid baseline. */
function fullAgent(): Record<string, unknown> {
  return {
    id: 'agent-1',
    name: 'Builder',
    role: 'developer',
    adapter_type: 'claude',
    model: 'opus',
    provider: 'Anthropic',
    status: 'online',
    avatar: '🛠️',
    avatar_tone: 'green',
    description: 'Builds things',
    system_prompt: 'You build.',
    prompt_updated_at: '2026-01-01T00:00:00.000Z',
    limits: {
      max_tokens: 1000,
      cost_label: 'Cheap',
      concurrency_limit: 4,
      memory_scope: 'project',
    },
    capabilities: {
      repo_write: true,
      shell_commands: true,
      git_operations: true,
      browser: true,
      network: true,
    },
    assigned_projects: ['proj-a', 'proj-b'],
    skills: ['typescript', 'review'],
  }
}

beforeEach(() => {
  requestMock.mockReset()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('extractWorkspaceAgents', () => {
  it('normalizes a fully-populated agent from a top-level array', () => {
    const agents = extractWorkspaceAgents([fullAgent()])
    expect(agents).toHaveLength(1)
    expect(agents[0]).toEqual({
      id: 'agent-1',
      name: 'Builder',
      role: 'developer',
      adapter_type: 'claude',
      model: 'opus',
      provider: 'Anthropic',
      status: 'online',
      avatar: '🛠️',
      avatar_tone: 'green',
      description: 'Builds things',
      system_prompt: 'You build.',
      prompt_updated_at: '2026-01-01T00:00:00.000Z',
      limits: {
        max_tokens: 1000,
        cost_label: 'Cheap',
        concurrency_limit: 4,
        memory_scope: 'project',
      },
      capabilities: {
        repo_write: true,
        shell_commands: true,
        git_operations: true,
        browser: true,
        network: true,
      },
      assigned_projects: ['proj-a', 'proj-b'],
      skills: ['typescript', 'review'],
    })
  })

  it('applies defaults when optional fields are missing', () => {
    const before = Date.now()
    const agents = extractWorkspaceAgents([
      {
        id: 'agent-2',
        name: 'Minimal',
        role: 'reviewer',
        adapter_type: 'gpt',
      },
    ])
    const after = Date.now()
    expect(agents).toHaveLength(1)
    const agent = agents[0]
    if (agent === undefined) throw new Error('expected agent')
    expect(agent.model).toBeNull()
    expect(agent.provider).toBe('Unknown')
    expect(agent.status).toBe('offline')
    expect(agent.avatar).toBe('🤖')
    expect(agent.avatar_tone).toBe('primary')
    expect(agent.description).toBe('')
    expect(agent.system_prompt).toBe('')
    expect(agent.limits).toEqual({
      max_tokens: 0,
      cost_label: 'Unknown',
      concurrency_limit: 0,
      memory_scope: 'Unknown',
    })
    expect(agent.capabilities).toEqual({
      repo_write: false,
      shell_commands: false,
      git_operations: false,
      browser: false,
      network: false,
    })
    expect(agent.assigned_projects).toEqual([])
    expect(agent.skills).toEqual([])
    // Default prompt_updated_at is a fresh ISO timestamp.
    const ts = Date.parse(agent.prompt_updated_at)
    expect(ts).toBeGreaterThanOrEqual(before)
    expect(ts).toBeLessThanOrEqual(after)
  })

  it('coerces invalid status and avatar_tone values to their fallbacks', () => {
    const agents = extractWorkspaceAgents([
      { ...fullAgent(), status: 'busy', avatar_tone: 'rainbow' },
    ])
    const agent = agents[0]
    if (agent === undefined) throw new Error('expected agent')
    expect(agent.status).toBe('offline')
    expect(agent.avatar_tone).toBe('primary')
  })

  it('accepts each valid status value', () => {
    for (const status of ['online', 'away', 'offline'] as const) {
      const agents = extractWorkspaceAgents([{ ...fullAgent(), status }])
      expect(agents[0]?.status).toBe(status)
    }
  })

  it('accepts each valid avatar_tone value', () => {
    for (const tone of ['accent', 'green', 'yellow', 'primary'] as const) {
      const agents = extractWorkspaceAgents([
        { ...fullAgent(), avatar_tone: tone },
      ])
      expect(agents[0]?.avatar_tone).toBe(tone)
    }
  })

  it('filters out blank, non-string array entries in skills/projects', () => {
    const agents = extractWorkspaceAgents([
      {
        ...fullAgent(),
        skills: ['keep', '', '   ', 42, null, 'also-keep'],
        assigned_projects: 'not-an-array',
      },
    ])
    const agent = agents[0]
    if (agent === undefined) throw new Error('expected agent')
    expect(agent.skills).toEqual(['keep', 'also-keep'])
    expect(agent.assigned_projects).toEqual([])
  })

  it('treats non-finite and non-number limit values as 0', () => {
    const agents = extractWorkspaceAgents([
      {
        ...fullAgent(),
        limits: {
          max_tokens: Number.NaN,
          concurrency_limit: '5',
          cost_label: '   ',
          memory_scope: '',
        },
      },
    ])
    const agent = agents[0]
    if (agent === undefined) throw new Error('expected agent')
    expect(agent.limits.max_tokens).toBe(0)
    expect(agent.limits.concurrency_limit).toBe(0)
    // Blank strings fall back to 'Unknown'.
    expect(agent.limits.cost_label).toBe('Unknown')
    expect(agent.limits.memory_scope).toBe('Unknown')
  })

  it('only treats strict boolean true as a granted capability', () => {
    const agents = extractWorkspaceAgents([
      {
        ...fullAgent(),
        capabilities: {
          repo_write: 'true',
          shell_commands: 1,
          git_operations: true,
          browser: false,
          network: null,
        },
      },
    ])
    const agent = agents[0]
    if (agent === undefined) throw new Error('expected agent')
    expect(agent.capabilities).toEqual({
      repo_write: false,
      shell_commands: false,
      git_operations: true,
      browser: false,
      network: false,
    })
  })

  it('drops entries missing any required identity field', () => {
    const agents = extractWorkspaceAgents([
      { name: 'NoId', role: 'r', adapter_type: 'a' },
      { id: 'i', role: 'r', adapter_type: 'a' },
      { id: 'i', name: 'n', adapter_type: 'a' },
      { id: 'i', name: 'n', role: 'r' },
      { id: '   ', name: 'n', role: 'r', adapter_type: 'a' },
      null,
      'string',
      42,
      fullAgent(),
    ])
    expect(agents).toHaveLength(1)
    expect(agents[0]?.id).toBe('agent-1')
  })

  it('reads agents from the `agents` wrapper key', () => {
    const agents = extractWorkspaceAgents({ agents: [fullAgent()] })
    expect(agents).toHaveLength(1)
  })

  it('reads agents from the `data` wrapper key', () => {
    const agents = extractWorkspaceAgents({ data: [fullAgent()] })
    expect(agents).toHaveLength(1)
  })

  it('reads agents from the `items` wrapper key', () => {
    const agents = extractWorkspaceAgents({ items: [fullAgent()] })
    expect(agents).toHaveLength(1)
  })

  it('prefers the first matching wrapper key', () => {
    const agents = extractWorkspaceAgents({
      agents: [fullAgent()],
      data: [{ ...fullAgent(), id: 'other' }],
    })
    expect(agents.map((a) => a.id)).toEqual(['agent-1'])
  })

  it('returns an empty array for unrecognized payload shapes', () => {
    expect(extractWorkspaceAgents(null)).toEqual([])
    expect(extractWorkspaceAgents(undefined)).toEqual([])
    expect(extractWorkspaceAgents('nope')).toEqual([])
    expect(extractWorkspaceAgents(42)).toEqual([])
    expect(extractWorkspaceAgents({})).toEqual([])
    expect(extractWorkspaceAgents({ agents: 'not-array' })).toEqual([])
  })
})

describe('normalizeWorkspaceAgentStats', () => {
  it('normalizes stats nested under a `stats` key', () => {
    const stats = normalizeWorkspaceAgentStats({
      stats: {
        agent_id: 'agent-1',
        runs_today: 10,
        tokens_today: 2000,
        cost_cents_today: 55,
        success_rate: 0.9,
        avg_response_ms: 1234,
      },
    })
    expect(stats).toEqual({
      agent_id: 'agent-1',
      runs_today: 10,
      tokens_today: 2000,
      cost_cents_today: 55,
      success_rate: 0.9,
      avg_response_ms: 1234,
    })
  })

  it('falls back to the top-level record when no `stats` key is present', () => {
    const stats = normalizeWorkspaceAgentStats({
      agent_id: 'agent-9',
      runs_today: 3,
    })
    expect(stats.agent_id).toBe('agent-9')
    expect(stats.runs_today).toBe(3)
  })

  it('applies defaults for missing/invalid fields', () => {
    const stats = normalizeWorkspaceAgentStats({})
    expect(stats).toEqual({
      agent_id: '',
      runs_today: 0,
      tokens_today: 0,
      cost_cents_today: 0,
      success_rate: 0,
      avg_response_ms: null,
    })
  })

  it('returns null avg_response_ms for non-finite values', () => {
    expect(
      normalizeWorkspaceAgentStats({
        avg_response_ms: Number.POSITIVE_INFINITY,
      }).avg_response_ms,
    ).toBeNull()
    expect(
      normalizeWorkspaceAgentStats({ avg_response_ms: '500' }).avg_response_ms,
    ).toBeNull()
    expect(
      normalizeWorkspaceAgentStats({ avg_response_ms: 0 }).avg_response_ms,
    ).toBe(0)
  })

  it('handles non-object payloads via record fallback', () => {
    const stats = normalizeWorkspaceAgentStats(null)
    expect(stats.agent_id).toBe('')
    expect(stats.avg_response_ms).toBeNull()
  })
})

describe('listWorkspaceAgents', () => {
  it('requests the agents endpoint and extracts the result', async () => {
    requestMock.mockResolvedValue({ agents: [fullAgent()] })
    const agents = await listWorkspaceAgents()
    expect(requestMock).toHaveBeenCalledWith('/api/workspace/agents')
    expect(agents).toHaveLength(1)
    expect(agents[0]?.id).toBe('agent-1')
  })

  it('propagates request rejections', async () => {
    requestMock.mockRejectedValue(new Error('boom'))
    await expect(listWorkspaceAgents()).rejects.toThrow('boom')
  })
})

describe('getWorkspaceAgentStats', () => {
  it('encodes the agent id into the stats query and normalizes', async () => {
    requestMock.mockResolvedValue({ stats: { agent_id: 'a b', runs_today: 7 } })
    const stats = await getWorkspaceAgentStats('a b/c')
    expect(requestMock).toHaveBeenCalledWith(
      '/api/workspace/agents?stats_for=a%20b%2Fc',
    )
    expect(stats.agent_id).toBe('a b')
    expect(stats.runs_today).toBe(7)
  })

  it('propagates request rejections', async () => {
    requestMock.mockRejectedValue(new Error('nope'))
    await expect(getWorkspaceAgentStats('x')).rejects.toThrow('nope')
  })
})
