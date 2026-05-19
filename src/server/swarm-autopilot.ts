import { DEFAULT_SWARM_AGENT_TEAM } from './swarm-roster'

type DefaultSwarmAgent = (typeof DEFAULT_SWARM_AGENT_TEAM)[number]

export type SwarmAutopilotWorker = Pick<
  DefaultSwarmAgent,
  | 'id'
  | 'name'
  | 'role'
  | 'specialty'
  | 'mission'
  | 'skills'
  | 'capabilities'
  | 'preferredTaskTypes'
  | 'reviewRequired'
>

export type SwarmWorkerSelection = {
  workerId: string
  score: number
  rationale: string
}

export type SwarmAutopilotAssignment = {
  workerId: string
  task: string
  rationale: string
  dependsOn: Array<string>
  reviewRequired: boolean
}

export type SwarmAutopilotPlan = {
  missionTitle: string
  assignments: Array<SwarmAutopilotAssignment>
  unassigned: Array<string>
}

type WorkPacketInput = {
  missionTitle: string
  userPrompt: string
  worker: SwarmAutopilotWorker
  rationale: string
  dependsOn?: Array<string>
  reviewRequired?: boolean
}

const ROLE_HINTS: Array<{
  id: string
  patterns: Array<RegExp>
  terms: Array<string>
  rationale: string
}> = [
  {
    id: 'swarm7',
    patterns: [/telegram|webhook|github|google|obsidian|oauth|mcp|integration|bot-to-bot|api integration/i],
    terms: ['integration', 'webhook', 'telegram', 'github', 'google', 'obsidian', 'mcp', 'oauth'],
    rationale: 'Integration lane owns external systems, webhooks, OAuth, and bot/API wiring.',
  },
  {
    id: 'swarm4',
    patterns: [/backend|server|route|api|database|storage|worker|business logic|endpoint/i],
    terms: ['backend', 'api', 'server', 'storage', 'worker', 'business logic'],
    rationale: 'Backend lane owns server routes, data flow, persistence, and worker-side business logic.',
  },
  {
    id: 'swarm6',
    patterns: [/frontend|react|ui|dashboard|screen|component|status panel|ux|browser/i],
    terms: ['frontend', 'react', 'ui', 'dashboard', 'component', 'status panel', 'browser'],
    rationale: 'Frontend lane owns React UI, visible state, and browser-facing workflows.',
  },
  {
    id: 'swarm5',
    patterns: [/ml|llm|model|embedding|eval|inference|prompt|rag/i],
    terms: ['ml', 'llm', 'model', 'embedding', 'eval', 'inference', 'prompt'],
    rationale: 'ML lane owns model, prompt, eval, inference, and embedding concerns.',
  },
  {
    id: 'swarm12',
    patterns: [/research|investigate|community|compare|source|changelog|paper|evidence/i],
    terms: ['research', 'investigate', 'community', 'source', 'evidence'],
    rationale: 'Research lane owns external docs, community practice, and evidence gathering.',
  },
  {
    id: 'swarm8',
    patterns: [/qa|test|vitest|smoke|e2e|regression|verify|acceptance/i],
    terms: ['qa', 'test', 'vitest', 'smoke', 'e2e', 'regression', 'verify'],
    rationale: 'QA lane owns tests, smoke coverage, repros, and acceptance checks.',
  },
  {
    id: 'swarm9',
    patterns: [/devops|deploy|ci|runtime|tmux|process|monitoring|electron|infra/i],
    terms: ['devops', 'deploy', 'ci', 'runtime', 'tmux', 'process', 'monitoring', 'electron'],
    rationale: 'DevOps lane owns process/runtime, CI, deployment, and monitoring concerns.',
  },
  {
    id: 'swarm10',
    patterns: [/review|reviewer|quality gate|code review|risk|approve/i],
    terms: ['review', 'quality gate', 'code review', 'risk', 'approve'],
    rationale: 'Reviewer lane owns independent code/product review gates.',
  },
  {
    id: 'swarm11',
    patterns: [/memory|knowledge|docs|documentation|runbook|handoff|summary|obsidian|skill/i],
    terms: ['memory', 'knowledge', 'docs', 'documentation', 'runbook', 'handoff', 'summary', 'obsidian', 'skill'],
    rationale: 'Memory / Knowledge lane owns durable summaries, docs, runbooks, and skills.',
  },
  {
    id: 'swarm13',
    patterns: [/design|opendesign|visual|prototype|mockup|figma|landing/i],
    terms: ['design', 'opendesign', 'visual', 'prototype', 'mockup', 'figma'],
    rationale: 'Designer / OpenDesign lane owns visual UX, prototypes, and design artifacts.',
  },
  {
    id: 'swarm14',
    patterns: [/security|secret|credential|auth|token|abuse|threat|permission|privacy/i],
    terms: ['security', 'secret', 'credential', 'auth', 'token', 'abuse', 'threat', 'permission', 'privacy'],
    rationale: 'CyberSecurity lane owns auth, secrets, threat modeling, and abuse risk.',
  },
  {
    id: 'swarm15',
    patterns: [/data|analytics|metric|sql|dashboard|experiment|tracking|kpi/i],
    terms: ['data', 'analytics', 'metric', 'sql', 'dashboard', 'experiment', 'tracking', 'kpi'],
    rationale: 'Data Analyst lane owns metrics, analytics, dashboards, and experiment readouts.',
  },
  {
    id: 'swarm3',
    patterns: [/architect|architecture|system design|contract|boundary|tradeoff|api design/i],
    terms: ['architect', 'architecture', 'system design', 'contract', 'boundary', 'tradeoff'],
    rationale: 'Architect lane owns system boundaries, contracts, and design tradeoffs.',
  },
  {
    id: 'swarm2',
    patterns: [/product|prd|scope|acceptance criteria|priority|roadmap|user story/i],
    terms: ['product', 'prd', 'scope', 'acceptance criteria', 'priority', 'roadmap'],
    rationale: 'Product Manager lane owns scope, requirements, and acceptance criteria.',
  },
]

function normalize(value: string): string {
  return value.toLowerCase()
}

function workerText(worker: SwarmAutopilotWorker): string {
  return [
    worker.id,
    worker.name,
    worker.role,
    worker.specialty,
    worker.mission,
    ...(worker.skills ?? []),
    ...(worker.capabilities ?? []),
    ...(worker.preferredTaskTypes ?? []),
  ].filter(Boolean).join(' ').toLowerCase()
}

function unique<T>(items: Array<T>): Array<T> {
  return Array.from(new Set(items))
}

function scoreWorker(prompt: string, worker: SwarmAutopilotWorker): SwarmWorkerSelection {
  const lower = normalize(prompt)
  const text = workerText(worker)
  let score = 0
  const reasons: Array<string> = []

  for (const hint of ROLE_HINTS) {
    const promptMatches = hint.patterns.some((pattern) => pattern.test(prompt))
    if (!promptMatches) continue
    if (worker.id === hint.id) {
      score += 12
      reasons.push(hint.rationale)
      continue
    }
    for (const term of hint.terms) {
      if (text.includes(term) && lower.includes(term)) {
        score += 2
      }
    }
  }

  if (worker.id === 'swarm1') score += 1
  if (worker.role === 'Reviewer' && /implement|build|code|frontend|backend|integration/i.test(prompt)) score += 4
  if (worker.role === 'Memory / Knowledge' && /build|implement|task|mvp|docs|skill/i.test(prompt)) score += 3
  if (worker.role === 'CyberSecurity' && /integration|webhook|auth|token|api|secret|credential|telegram|security/i.test(prompt)) score += 8
  if (worker.id === 'swarm5' && !/\b(ml|llm|model|embedding|eval|inference|rag)\b/i.test(prompt)) score = 0
  if (worker.id === 'swarm12' && !/research|investigate|community|source|changelog|paper|evidence/i.test(prompt)) score = 0
  if (worker.id === 'swarm13' && !/design|opendesign|visual|prototype|mockup|figma|ux/i.test(prompt)) score = 0

  return {
    workerId: worker.id,
    score,
    rationale: reasons[0] ?? `Matched ${worker.role} to mission context.`,
  }
}

export function selectSwarmWorkersForPrompt(
  prompt: string,
  workers: ReadonlyArray<SwarmAutopilotWorker> = DEFAULT_SWARM_AGENT_TEAM,
  maxWorkers = 8,
): Array<SwarmWorkerSelection> {
  const selections = workers
    .map((worker) => scoreWorker(prompt, worker))
    .filter((selection) => selection.score > 0 && selection.workerId !== 'swarm1')
    .sort((a, b) => b.score - a.score || a.workerId.localeCompare(b.workerId, undefined, { numeric: true }))

  const byId = new Map(selections.map((selection) => [selection.workerId, selection]))
  const preferredOrder = [
    'swarm7',
    'swarm4',
    'swarm6',
    'swarm5',
    'swarm12',
    'swarm8',
    'swarm9',
    'swarm10',
    'swarm11',
    'swarm13',
    'swarm14',
    'swarm15',
    'swarm3',
    'swarm2',
  ]
  const ordered = [
    ...preferredOrder.map((id) => byId.get(id)).filter((selection): selection is SwarmWorkerSelection => Boolean(selection)),
    ...selections.filter((selection) => !preferredOrder.includes(selection.workerId)),
  ]
  return ordered.slice(0, Math.max(1, maxWorkers))
}

export function buildSwarmWorkPacket(input: WorkPacketInput): string {
  const skills = input.worker.skills?.length ? input.worker.skills.join(', ') : 'none declared'
  const capabilities = input.worker.capabilities?.length ? input.worker.capabilities.join(', ') : 'none declared'
  const dependsOn = input.dependsOn?.length ? input.dependsOn.join(', ') : 'none'

  return [
    '### Swarm Work Packet',
    `Role: ${input.worker.role}`,
    `Worker: ${input.worker.id} / ${input.worker.name}`,
    `Goal: ${input.missionTitle}`,
    `Context: ${input.userPrompt}`,
    `Routing rationale: ${input.rationale}`,
    `Relevant dependencies: ${dependsOn}`,
    `Skills to consider: ${skills}`,
    `Capabilities: ${capabilities}`,
    '',
    'Constraints:',
    '- Stay strictly inside your role lane unless the CTO / Conductor reroutes you.',
    '- Do not broaden scope; produce the smallest useful result for this packet.',
    '- Never run deploy, git push, destructive cleanup, or secret/env edits without explicit approval.',
    '- Never print or persist secrets; redact credentials as [REDACTED].',
    input.reviewRequired ? '- Your output requires independent Reviewer/QA/Security review before landing.' : '- Return proof so the Conductor can decide whether review is needed.',
    '',
    'Expected output:',
    '- Concrete findings/changes for your lane.',
    '- Files touched or files that should be touched.',
    '- Commands run or commands recommended.',
    '- Blockers and exact next action.',
    '',
    'Required checkpoint format:',
    'STATE: IN_PROGRESS | DONE | BLOCKED | NEEDS_INPUT | HANDOFF',
    'FILES_CHANGED: exact files or none',
    'COMMANDS_RUN: exact commands or none',
    'RESULT: concise outcome',
    'BLOCKER: blocker/question or none',
    'NEXT_ACTION: exact next action',
  ].join('\n')
}

function workerById(workers: ReadonlyArray<SwarmAutopilotWorker>, id: string): SwarmAutopilotWorker | null {
  return workers.find((worker) => worker.id === id) ?? null
}

function dependencyIds(assignments: Array<SwarmAutopilotAssignment>, roles: Array<RegExp>): Array<string> {
  return assignments
    .filter((assignment) => roles.some((pattern) => pattern.test(assignment.task)))
    .map((assignment) => assignment.workerId)
}

export function buildAutopilotDispatchPlan(input: {
  prompt: string
  missionTitle?: string
  workers?: ReadonlyArray<SwarmAutopilotWorker>
  maxWorkers?: number
}): SwarmAutopilotPlan {
  const workers = input.workers ?? DEFAULT_SWARM_AGENT_TEAM
  const missionTitle = input.missionTitle?.trim() || input.prompt.trim().slice(0, 80) || 'Swarm autopilot mission'
  const selected = selectSwarmWorkersForPrompt(input.prompt, workers, input.maxWorkers ?? 8)
  const assignments: Array<SwarmAutopilotAssignment> = []
  const conductor = workerById(workers, 'swarm1')
  if (conductor) {
    assignments.push({
      workerId: conductor.id,
      rationale: 'CTO / Conductor coordinates the swarm plan and approval gates.',
      dependsOn: [],
      reviewRequired: false,
      task: buildSwarmWorkPacket({
        missionTitle,
        userPrompt: input.prompt,
        worker: conductor,
        rationale: 'Coordinate task decomposition, dependencies, approval gates, and final synthesis.',
      }),
    })
  }

  for (const selection of selected) {
    const worker = workerById(workers, selection.workerId)
    if (!worker) continue
    const dependsOn = worker.id === 'swarm10'
      ? assignments.filter((assignment) => !['swarm1', 'swarm10', 'swarm8', 'swarm14', 'swarm11'].includes(assignment.workerId)).map((assignment) => assignment.workerId)
      : worker.id === 'swarm14'
        ? assignments.filter((assignment) => ['swarm4', 'swarm6', 'swarm7', 'swarm9'].includes(assignment.workerId)).map((assignment) => assignment.workerId)
        : []
    const reviewRequired = worker.reviewRequired === true || ['swarm8', 'swarm10', 'swarm14'].includes(worker.id)
    const prefix = worker.id === 'swarm10' ? 'Review gate. ' : ''
    assignments.push({
      workerId: worker.id,
      rationale: selection.rationale,
      dependsOn: unique(dependsOn),
      reviewRequired,
      task: `${prefix}${buildSwarmWorkPacket({
        missionTitle,
        userPrompt: input.prompt,
        worker,
        rationale: selection.rationale,
        dependsOn: unique(dependsOn),
        reviewRequired,
      })}`,
    })
  }

  return {
    missionTitle,
    assignments,
    unassigned: selected.length ? [] : ['No confident worker match; only Conductor assignment was created.'],
  }
}
