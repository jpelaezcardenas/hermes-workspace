import { defaultSkillsForRole } from './skill-autoload'
import type { MultiAgentProfile, MultiAgentProfileRole } from './types'

const DEFAULT_PROFILE_IDS: MultiAgentProfileRole[] = [
  'orchestrator',
  'frontend-engineer',
  'backend-engineer',
  'architect',
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

export function defaultMultiAgentProfiles(now = new Date().toISOString()): MultiAgentProfile[] {
  return DEFAULT_PROFILE_IDS.map((role) => ({
    id: role,
    name: titleizeProfileId(role),
    role,
    runtime: 'hermes-agent',
    model: null,
    skills: defaultSkillsForRole(role),
    enabledToolsets: ['terminal', 'file'],
    permissionPolicy: role === 'reviewer' || role === 'qa-validator' ? 'read-only' : 'ask-risky',
    createdAt: now,
    updatedAt: now,
  }))
}
