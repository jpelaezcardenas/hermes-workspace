import type { MultiAgentProfile, MultiAgentProfileRole, MultiAgentTask } from './types'

export type MultiAgentSkillMetadata = {
  name: string
  description: string
  roles: MultiAgentProfileRole[]
  keywords: string[]
}

export const MULTI_AGENT_SKILL_METADATA_INDEX: Record<string, MultiAgentSkillMetadata> = {
  'protocol-driven-orchestrator': {
    name: 'protocol-driven-orchestrator',
    description: 'Structured orchestration for multi-step implementation tasks.',
    roles: ['orchestrator', 'architect'],
    keywords: ['orchestrate', 'orchestration', 'plan', 'architecture', 'multi-agent', 'control plane'],
  },
  'best-of-n-planning': {
    name: 'best-of-n-planning',
    description: 'Compare multiple implementation strategies before choosing one.',
    roles: ['orchestrator', 'reviewer'],
    keywords: ['best-of-n', 'strategy', 'options', 'tradeoff', 'plan'],
  },
  'test-driven-development': {
    name: 'test-driven-development',
    description: 'Red-green-refactor implementation workflow.',
    roles: ['backend-engineer', 'frontend-engineer', 'qa-validator'],
    keywords: ['test', 'tests', 'tdd', 'vitest', 'pytest', 'coverage', 'failing test'],
  },
  'systematic-debugging': {
    name: 'systematic-debugging',
    description: 'Structured debugging and regression isolation.',
    roles: ['backend-engineer', 'qa-validator'],
    keywords: ['bug', 'debug', 'failure', 'error', 'regression', 'fix'],
  },
  'frontend-design': {
    name: 'frontend-design',
    description: 'Frontend UI, component, and UX implementation guidance.',
    roles: ['frontend-engineer'],
    keywords: ['ui', 'ux', 'react', 'component', 'panel', 'button', 'screen', 'frontend'],
  },
  'review-gate': {
    name: 'review-gate',
    description: 'Pre-final review checklist for non-trivial changes.',
    roles: ['reviewer', 'qa-validator'],
    keywords: ['review', 'risk', 'quality', 'validate', 'validation', 'diff', 'build'],
  },
  'requesting-code-review': {
    name: 'requesting-code-review',
    description: 'Code review request and reviewer handoff guidance.',
    roles: ['reviewer'],
    keywords: ['pull request', 'pr handoff'],
  },
  'document-release': {
    name: 'document-release',
    description: 'Operator-facing release and implementation documentation.',
    roles: ['docs-writer'],
    keywords: ['docs', 'documentation', 'readme', 'guide', 'runbook'],
  },
  'doc-coauthoring': {
    name: 'doc-coauthoring',
    description: 'Collaborative documentation drafting and editing.',
    roles: ['docs-writer'],
    keywords: ['docs', 'documentation', 'copy', 'edit'],
  },
}

const ROLE_DEFAULT_SKILLS: Record<MultiAgentProfileRole, string[]> = {
  orchestrator: ['protocol-driven-orchestrator', 'best-of-n-planning'],
  architect: ['protocol-driven-orchestrator', 'best-of-n-planning'],
  'frontend-engineer': ['test-driven-development', 'frontend-design'],
  'backend-engineer': ['test-driven-development', 'systematic-debugging'],
  'qa-validator': ['test-driven-development', 'review-gate'],
  reviewer: ['review-gate', 'requesting-code-review'],
  'docs-writer': ['document-release', 'doc-coauthoring'],
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)))
}

function taskSearchText(task: MultiAgentTask): string {
  return [
    task.title,
    task.description,
    task.workPacket,
    task.productBrief?.goal,
    task.productBrief?.userStory,
    ...(task.productBrief?.successMetrics ?? []),
    ...(task.productBrief?.nonGoals ?? []),
    ...task.acceptanceCriteria,
  ].filter(Boolean).join('\n').toLowerCase()
}

export function defaultSkillsForRole(role: MultiAgentProfileRole): string[] {
  return [...ROLE_DEFAULT_SKILLS[role]]
}

export function matchContextualSkills(task: MultiAgentTask): string[] {
  const text = taskSearchText(task)
  return Object.values(MULTI_AGENT_SKILL_METADATA_INDEX)
    .filter((metadata) => metadata.keywords.some((keyword) => text.includes(keyword.toLowerCase())))
    .map((metadata) => metadata.name)
}

export function selectSkillsForTask({
  profile,
  task,
}: {
  profile: MultiAgentProfile
  task: MultiAgentTask
}): string[] {
  return unique([
    ...profile.skills,
    ...defaultSkillsForRole(profile.role),
    ...matchContextualSkills(task),
  ])
}
