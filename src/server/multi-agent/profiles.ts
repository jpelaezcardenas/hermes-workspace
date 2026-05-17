import type { MultiAgentProfile, MultiAgentProfileRole } from './types'

const DEFAULT_PROFILE_IDS: MultiAgentProfileRole[] = [
  'orchestrator',
  'frontend-engineer',
  'backend-engineer',
  'qa-validator',
  'reviewer',
  'docs-writer',
]

function titleizeProfileId(id: string): string {
  return id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function defaultSkillsFor(role: MultiAgentProfileRole): string[] {
  switch (role) {
    case 'orchestrator':
      return ['protocol-driven-orchestrator', 'best-of-n-planning']
    case 'frontend-engineer':
      return ['test-driven-development', 'frontend-design']
    case 'backend-engineer':
      return ['test-driven-development', 'systematic-debugging']
    case 'qa-validator':
      return ['qa', 'superpowers-verification-before-completion']
    case 'reviewer':
      return ['review-gate', 'requesting-code-review']
    case 'docs-writer':
      return ['document-release', 'doc-coauthoring']
  }
}

export function defaultMultiAgentProfiles(now = new Date().toISOString()): MultiAgentProfile[] {
  return DEFAULT_PROFILE_IDS.map((role) => ({
    id: role,
    name: titleizeProfileId(role),
    role,
    runtime: 'hermes-agent',
    model: null,
    skills: defaultSkillsFor(role),
    enabledToolsets: ['terminal', 'file'],
    permissionPolicy: role === 'reviewer' || role === 'qa-validator' ? 'read-only' : 'ask-risky',
    createdAt: now,
    updatedAt: now,
  }))
}
