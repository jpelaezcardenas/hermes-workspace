import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import * as yaml from 'yaml'
import { z } from 'zod'
import { SWARM_CANONICAL_REPO } from './swarm-environment'

export const SWARM_ROSTER_PATH = join(SWARM_CANONICAL_REPO, 'swarm.yaml')

export const DEFAULT_SWARM_AGENT_TEAM = [
  {
    id: 'swarm1',
    name: 'Conductor',
    role: 'CTO / Conductor',
    specialty: 'strategy, orchestration, task decomposition, agent routing, approval gates',
    mission: 'Own the whole mission: clarify outcomes, decompose work, route packets to specialists, keep humans in the approval loop, and synthesize final decisions.',
    skills: ['protocol-driven-orchestrator', 'agent-team-operating-manual', 'review-gate'],
    capabilities: ['orchestration', 'task-decomposition', 'agent-routing', 'approval-gates', 'decision-synthesis'],
    preferredTaskTypes: ['orchestration', 'planning', 'coordination', 'approval', 'handoff'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm2',
    name: 'Product',
    role: 'Product Manager',
    specialty: 'requirements, PRDs, priorities, acceptance criteria, user outcomes',
    mission: 'Turn vague ideas into scoped product requirements, acceptance criteria, non-goals, and priority calls.',
    skills: ['cto-product-ops', 'office-hours', 'writing-plans'],
    capabilities: ['prd', 'requirements', 'prioritization', 'acceptance-criteria', 'scope-control'],
    preferredTaskTypes: ['product', 'requirements', 'prd', 'scope', 'roadmap'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm3',
    name: 'Architect',
    role: 'Architect',
    specialty: 'system design, module boundaries, data flow, technical tradeoffs',
    mission: 'Design robust architecture before code: APIs, boundaries, risk analysis, migration paths, and maintainability constraints.',
    skills: ['plan-eng-review', 'best-of-n-planning', 'graphify'],
    capabilities: ['architecture', 'api-design', 'data-flow', 'tradeoff-analysis', 'technical-risk'],
    preferredTaskTypes: ['architecture', 'design', 'api', 'refactor', 'technical-plan'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm4',
    name: 'Backend',
    role: 'Backend Coder',
    specialty: 'server APIs, business logic, storage, auth, workers, integrations backend',
    mission: 'Implement backend slices with tests, clear contracts, safe persistence, and minimal production risk.',
    skills: ['test-driven-development', 'systematic-debugging', 'github-pr-workflow'],
    capabilities: ['backend', 'api-routes', 'storage', 'auth', 'server-runtime'],
    preferredTaskTypes: ['backend', 'api', 'database', 'auth', 'worker'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: true,
  },
  {
    id: 'swarm5',
    name: 'ML',
    role: 'ML Coder',
    specialty: 'ML pipelines, LLM features, evals, inference, embeddings, model tooling',
    mission: 'Build and evaluate AI/ML features with reproducible metrics, cost awareness, and safety constraints.',
    skills: ['autoresearch', 'dspy', 'evaluating-llms-harness'],
    capabilities: ['ml', 'llm', 'evals', 'inference', 'embeddings'],
    preferredTaskTypes: ['ml', 'llm', 'eval', 'model', 'rag'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: true,
  },
  {
    id: 'swarm6',
    name: 'Frontend',
    role: 'Frontend Coder',
    specialty: 'React UI, state, accessibility, responsive layouts, browser behavior',
    mission: 'Ship polished frontend experiences with focused tests, accessibility, responsive layout, and browser verification.',
    skills: ['frontend-design', 'test-driven-development', 'browse'],
    capabilities: ['frontend', 'react', 'ui-state', 'accessibility', 'responsive-layout'],
    preferredTaskTypes: ['frontend', 'ui', 'react', 'layout', 'browser'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: true,
  },
  {
    id: 'swarm7',
    name: 'Integration',
    role: 'Integration Agent',
    specialty: 'Telegram, GitHub, Google Workspace, Obsidian, MCP, webhooks, OAuth, external APIs',
    mission: 'Connect Hermes to external systems with safe auth boundaries, retries, webhook handling, and clear operator docs.',
    skills: ['native-mcp', 'github-pr-workflow', 'google-workspace'],
    capabilities: ['integrations', 'webhooks', 'oauth', 'telegram', 'github', 'mcp'],
    preferredTaskTypes: ['integration', 'webhook', 'telegram', 'github', 'google', 'mcp'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: true,
  },
  {
    id: 'swarm8',
    name: 'QA',
    role: 'QA Tester',
    specialty: 'test plans, regression suites, smoke tests, browser QA, reproducible bug reports',
    mission: 'Prove whether work is ready: reproduce bugs, run targeted checks, write smoke tests, and report evidence.',
    skills: ['qa', 'playwright-mcp', 'test-driven-development'],
    capabilities: ['qa', 'regression', 'smoke-tests', 'e2e', 'bug-reproduction'],
    preferredTaskTypes: ['qa', 'test', 'regression', 'smoke', 'verification'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm9',
    name: 'DevOps',
    role: 'DevOps',
    specialty: 'runtime, CI/CD, deploy, env, monitoring, Electron, process health',
    mission: 'Keep Hermes running locally and in production: scripts, CI, deploys, env safety, monitoring, and rollback plans.',
    skills: ['setup-deploy', 'health', 'careful'],
    capabilities: ['devops', 'ci-cd', 'deploy', 'monitoring', 'runtime-health'],
    preferredTaskTypes: ['devops', 'deploy', 'ci', 'infra', 'runtime', 'electron'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: true,
  },
  {
    id: 'swarm10',
    name: 'Reviewer',
    role: 'Reviewer',
    specialty: 'code review, product review, regression risk, merge readiness',
    mission: 'Act as the independent review gate: inspect diffs, verify requirements, catch regressions, and request fixes before shipping.',
    skills: ['review-gate', 'github-code-review', 'requesting-code-review'],
    capabilities: ['code-review', 'quality-gate', 'regression-analysis', 'merge-readiness'],
    preferredTaskTypes: ['review', 'code-review', 'quality', 'merge-gate', 'risk'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm11',
    name: 'Memory',
    role: 'Memory / Knowledge',
    specialty: 'Obsidian, docs, summaries, skills, decisions, knowledge hygiene',
    mission: 'Preserve useful context: final summaries, lessons learned, docs, runbooks, skills, and knowledge-base updates.',
    skills: ['obsidian', 'document-release', 'context-checkpoint'],
    capabilities: ['memory', 'knowledge-base', 'docs', 'summaries', 'skills'],
    preferredTaskTypes: ['memory', 'docs', 'summary', 'obsidian', 'runbook', 'skill'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm12',
    name: 'Research',
    role: 'Research',
    specialty: 'technical research, docs reading, competitor analysis, papers, decision briefs',
    mission: 'Find decision-grade evidence quickly, cite sources, compare options, and summarize what matters for execution.',
    skills: ['arxiv', 'autoresearch', 'research-paper-writing'],
    capabilities: ['research', 'docs-analysis', 'competitive-analysis', 'technical-synthesis'],
    preferredTaskTypes: ['research', 'analysis', 'docs', 'papers', 'options'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm13',
    name: 'Designer',
    role: 'Designer / OpenDesign',
    specialty: 'product design, UX flows, visual systems, OpenDesign artifacts, prototypes',
    mission: 'Design clear product experiences, states, flows, and polished visual artifacts before frontend implementation.',
    skills: ['frontend-design', 'open-design-hermes-integration', 'design-review'],
    capabilities: ['design', 'ux', 'prototype', 'opendesign', 'visual-system'],
    preferredTaskTypes: ['design', 'ux', 'prototype', 'visual', 'opendesign'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm14',
    name: 'Security',
    role: 'CyberSecurity',
    specialty: 'threat modeling, secrets, auth, abuse cases, supply chain, secure review',
    mission: 'Protect Hermes and user data: threat-model changes, scan for secrets, review auth boundaries, and block unsafe releases.',
    skills: ['cso', 'careful', 'review-gate'],
    capabilities: ['security', 'threat-modeling', 'secrets', 'auth-review', 'supply-chain'],
    preferredTaskTypes: ['security', 'auth', 'secrets', 'threat-model', 'audit'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
  {
    id: 'swarm15',
    name: 'Data Analyst',
    role: 'Data Analyst',
    specialty: 'metrics, SQL, analytics events, dashboards, product insights, experiment readouts',
    mission: 'Turn product and system activity into useful metrics, dashboards, tracking plans, and analytical decisions.',
    skills: ['analytics-tracking', 'jupyter-live-kernel', 'xlsx'],
    capabilities: ['analytics', 'metrics', 'sql', 'dashboards', 'experiments'],
    preferredTaskTypes: ['analytics', 'data', 'metrics', 'dashboard', 'experiment'],
    maxConcurrentTasks: 1,
    acceptsBroadcast: true,
    reviewRequired: false,
  },
] as const

export const SwarmRosterWorkerSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  role: z.string().default('Worker'),
  specialty: z.string().default(''),
  model: z.string().default('Worker'),
  mission: z.string().default('Awaiting orchestrator dispatch.'),
  skills: z.array(z.string()).default([]),
  capabilities: z.array(z.string()).default([]),
  defaultCwd: z.string().optional(),
  preferredTaskTypes: z.array(z.string()).default([]),
  maxConcurrentTasks: z.number().int().positive().default(1),
  acceptsBroadcast: z.boolean().default(true),
  reviewRequired: z.boolean().default(false),
})

export const SwarmRosterSchema = z.object({
  version: z.number().int().positive().default(1),
  workers: z.array(SwarmRosterWorkerSchema).default([]),
})

export type SwarmRosterWorker = z.infer<typeof SwarmRosterWorkerSchema>
export type SwarmRoster = z.infer<typeof SwarmRosterSchema>

export const SwarmRosterUpsertSchema = SwarmRosterWorkerSchema.extend({
  id: z.string().regex(/^swarm\d+$/i, 'worker id must look like swarm13'),
})

export type SwarmRosterUpsert = z.infer<typeof SwarmRosterUpsertSchema>

function defaultAgentForId(id: string): SwarmRosterWorker | null {
  const normalized = id.toLowerCase()
  const agent = DEFAULT_SWARM_AGENT_TEAM.find((candidate) => candidate.id === normalized)
  if (!agent) return null
  return SwarmRosterWorkerSchema.parse({
    ...agent,
    id,
    model: 'Hermes Agent',
  })
}

export function fallbackRoster(ids: Array<string> = []): SwarmRoster {
  return {
    version: 1,
    workers: ids.map((id) => {
      const defaultAgent = defaultAgentForId(id)
      if (defaultAgent) return defaultAgent
      return {
        id,
        name: id.replace(/^swarm/i, 'Swarm'),
        role: 'Worker',
        specialty: '',
        model: 'Hermes Agent',
        mission: 'Awaiting orchestrator dispatch.',
        skills: [],
        capabilities: [],
        preferredTaskTypes: [],
        maxConcurrentTasks: 1,
        acceptsBroadcast: true,
        reviewRequired: false,
      }
    }),
  }
}

export function readSwarmRoster(ids: Array<string> = []): SwarmRoster {
  if (!existsSync(SWARM_ROSTER_PATH)) return fallbackRoster(ids)
  try {
    const raw = yaml.parse(readFileSync(SWARM_ROSTER_PATH, 'utf-8')) as unknown
    const parsed = SwarmRosterSchema.parse(raw)
    const byId = new Map(parsed.workers.map((worker) => [worker.id, worker]))
    for (const fallback of fallbackRoster(ids).workers) {
      if (!byId.has(fallback.id)) byId.set(fallback.id, fallback)
    }
    return { version: parsed.version, workers: [...byId.values()] }
  } catch {
    return fallbackRoster(ids)
  }
}

export function writeSwarmRoster(roster: SwarmRoster): void {
  const parsed = SwarmRosterSchema.parse(roster)
  const doc = yaml.stringify(parsed, { lineWidth: 0 })
  writeFileSync(SWARM_ROSTER_PATH, doc)
}

export function upsertSwarmRosterWorker(input: SwarmRosterUpsert, ids: Array<string> = []): SwarmRoster {
  const nextWorker = SwarmRosterUpsertSchema.parse(input)
  const current = readSwarmRoster(ids)
  const byId = new Map(current.workers.map((worker) => [worker.id, worker]))
  byId.set(nextWorker.id, nextWorker)
  const next: SwarmRoster = {
    version: current.version || 1,
    workers: [...byId.values()].sort((a, b) => {
      const na = parseInt(a.id.replace(/\D/g, ''), 10) || 0
      const nb = parseInt(b.id.replace(/\D/g, ''), 10) || 0
      return na - nb
    }),
  }
  writeSwarmRoster(next)
  return next
}

export function rosterByWorkerId(ids: Array<string> = []): Map<string, SwarmRosterWorker> {
  return new Map(readSwarmRoster(ids).workers.map((worker) => [worker.id, worker]))
}
