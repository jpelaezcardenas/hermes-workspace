import type { ConductorProjectOverride } from './conductor-launch-intent'

export type ConductorPreflightSummary = {
  projectLabel: string
  workingDirectory: string
  gitStatusLabel: string
  gitStatusTone: 'success' | 'warning' | 'muted'
  stackLabel: string
  packageManagerLabel: string
  contextFilesLabel: string
  contextSummary: string | null
  lastCommitLabel: string | null
}

function basename(path: string): string {
  return path.split('/').filter(Boolean).pop() ?? path
}

export function buildConductorPreflightSummary(
  project: ConductorProjectOverride,
): ConductorPreflightSummary {
  const workingDirectory =
    project.effectiveWorkingDirectory ?? project.activeProjectPath ?? ''
  const status = project.status ?? null
  const contextFiles = project.contextPreview?.files ?? []

  const gitStatusLabel = status
    ? status.gitDirty === null
      ? 'Git status unavailable'
      : status.gitDirty
        ? `${status.changedFiles ?? 0} changed file${status.changedFiles === 1 ? '' : 's'}`
        : 'Clean worktree'
    : 'Git status unavailable'

  return {
    projectLabel:
      project.activeProjectName ??
      (project.activeProjectPath
        ? basename(project.activeProjectPath)
        : null) ??
      'Selected project',
    workingDirectory,
    gitStatusLabel,
    gitStatusTone:
      status?.gitDirty === false
        ? 'success'
        : status?.gitDirty
          ? 'warning'
          : 'muted',
    stackLabel:
      status && status.detectedStack.length > 0
        ? status.detectedStack.join(', ')
        : 'Stack not detected',
    packageManagerLabel:
      status?.packageManager ?? 'Package manager unavailable',
    contextFilesLabel:
      contextFiles.length > 0
        ? contextFiles.map((file) => file.name).join(', ')
        : 'No context files detected',
    contextSummary: project.contextPreview?.summary.trim() || null,
    lastCommitLabel: status?.lastCommit ?? null,
  }
}

export function shouldWarnProjectMismatch(
  project: ConductorProjectOverride | null,
  activeProject: { id?: string | null; path?: string | null } | null,
): boolean {
  if (!project || !activeProject) return false
  if (project.activeProjectId && activeProject.id) {
    return project.activeProjectId !== activeProject.id
  }
  if (project.activeProjectPath && activeProject.path) {
    return project.activeProjectPath !== activeProject.path
  }
  return false
}
