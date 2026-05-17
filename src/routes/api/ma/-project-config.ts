import { resolveProject, type ResolveProjectInput } from '../../../server/multi-agent/project-resolver'

export class MultiAgentProjectNotFoundError extends Error {
  readonly statusCode = 404

  constructor(projectId: string) {
    super(`Project not found: ${projectId}`)
    this.name = 'MultiAgentProjectNotFoundError'
  }
}

export function listConfiguredProjectInputs(): ResolveProjectInput[] {
  const raw = process.env.HERMES_MA_PROJECTS_JSON
  if (raw?.trim()) {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) throw new Error('HERMES_MA_PROJECTS_JSON must be an array')
    return parsed as ResolveProjectInput[]
  }

  const singlePath = process.env.HERMES_MA_PROJECT_PATH
  if (singlePath?.trim()) return [{ repoPath: singlePath }]

  return []
}

export function listConfiguredProjects() {
  return listConfiguredProjectInputs().map((project) => resolveProject(project))
}

export function resolveConfiguredProject(projectId: string) {
  const project = listConfiguredProjects().find((candidate) => candidate.id === projectId)
  if (!project) throw new MultiAgentProjectNotFoundError(projectId)
  return project
}
