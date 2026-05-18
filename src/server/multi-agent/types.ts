export type MultiAgentTaskStatus =
  | 'backlog'
  | 'ready'
  | 'running'
  | 'needs_approval'
  | 'review'
  | 'blocked'
  | 'done'
  | 'failed'
  | 'cancelled'

export type MultiAgentPriority = 'low' | 'medium' | 'high' | 'urgent'

export type MultiAgentProfileRole =
  | 'orchestrator'
  | 'frontend-engineer'
  | 'backend-engineer'
  | 'qa-validator'
  | 'reviewer'
  | 'docs-writer'

export type MultiAgentRuntime = 'hermes-agent'

export type MultiAgentPermissionPolicy = 'safe-default' | 'ask-risky' | 'read-only'

export type MultiAgentProjectValidation = {
  lint?: string | null
  typecheck?: string | null
  test?: string | null
  build?: string | null
}

export type MultiAgentProject = {
  id: string
  name: string
  repoPath: string
  defaultBranch: string
  worktreeRoot: string
  githubRemote?: string | null
  graphifyGraphPath?: string | null
  obsidianPath?: string | null
  validation?: MultiAgentProjectValidation
  createdAt: string
  updatedAt: string
}

export type MultiAgentProfile = {
  id: string
  name: string
  role: MultiAgentProfileRole
  runtime: MultiAgentRuntime
  model?: string | null
  skills: string[]
  enabledToolsets?: string[]
  permissionPolicy: MultiAgentPermissionPolicy
  createdAt: string
  updatedAt: string
}

export type MultiAgentTask = {
  id: string
  projectId: string
  title: string
  description: string
  status: MultiAgentTaskStatus
  priority: MultiAgentPriority
  assigneeProfileId: string
  parentIds: string[]
  childIds: string[]
  workPacket: string
  acceptanceCriteria: string[]
  branchName?: string | null
  worktreePath?: string | null
  latestRunId?: string | null
  createdAt: string
  updatedAt: string
}

export type MultiAgentRunStatus =
  | 'queued'
  | 'starting'
  | 'running'
  | 'waiting_approval'
  | 'completed'
  | 'failed'
  | 'cancelled'

export type MultiAgentRun = {
  id: string
  taskId: string
  profileId: string
  status: MultiAgentRunStatus
  pid?: number | null
  sessionId?: string | null
  startedAt?: string | null
  finishedAt?: string | null
  tokenIn?: number | null
  tokenOut?: number | null
  costUsd?: number | null
  summary?: string | null
  error?: string | null
}

export type MultiAgentEventType =
  | 'task.created'
  | 'worktree.created'
  | 'run.started'
  | 'run.log'
  | 'run.tool_call'
  | 'approval.requested'
  | 'approval.resolved'
  | 'validation.started'
  | 'validation.completed'
  | 'diff.updated'
  | 'pr.created'
  | 'task.completed'
  | 'task.failed'

export type MultiAgentEvent = {
  id: string
  taskId: string
  runId?: string | null
  type: MultiAgentEventType
  message: string
  payload?: unknown
  createdAt: string
}

export type MultiAgentRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export type MultiAgentApprovalActionType =
  | 'git.push'
  | 'github.pr_create'
  | 'file.delete'
  | 'shell.risky'
  | 'external.message'
  | 'deploy'
  | 'secret_or_env'

export type MultiAgentApprovalStatus = 'pending' | 'approved' | 'denied' | 'expired'

export type MultiAgentApproval = {
  id: string
  taskId: string
  runId?: string | null
  riskLevel: MultiAgentRiskLevel
  actionType: MultiAgentApprovalActionType
  title: string
  description: string
  payload: unknown
  status: MultiAgentApprovalStatus
  createdAt: string
  resolvedAt?: string | null
}

export type MultiAgentValidationType = 'lint' | 'typecheck' | 'test' | 'build' | 'custom'

export type MultiAgentValidationStatus = 'queued' | 'running' | 'passed' | 'failed' | 'cancelled'

export type MultiAgentValidation = {
  id: string
  taskId: string
  type: MultiAgentValidationType
  command: string
  status: MultiAgentValidationStatus
  exitCode?: number | null
  outputSummary?: string | null
  outputArtifactId?: string | null
  startedAt?: string | null
  finishedAt?: string | null
}

export type MultiAgentArtifactType = 'diff' | 'log' | 'pr' | 'screenshot' | 'report' | 'validation-output' | 'github-pr'

export type MultiAgentArtifact = {
  id: string
  taskId: string
  type: MultiAgentArtifactType
  pathOrUrl: string
  title: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export type MultiAgentState = {
  projects: Record<string, MultiAgentProject>
  profiles: Record<string, MultiAgentProfile>
  tasks: Record<string, MultiAgentTask>
  runs: Record<string, MultiAgentRun>
  approvals: Record<string, MultiAgentApproval>
  validations: Record<string, MultiAgentValidation>
  artifacts: Record<string, MultiAgentArtifact>
  schemaVersion: 1
  updatedAt: string
}
