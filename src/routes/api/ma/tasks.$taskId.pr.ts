import { execFileSync } from 'node:child_process'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import {
  buildGitHubPrCommand,
  getGitHubPrPreflight,
  type ExecFile,
} from '../../../server/multi-agent/github-pr-manager'
import {
  createApproval,
  createArtifact,
  getTask,
  listApprovals,
  listTaskValidations,
  updateTask,
} from '../../../server/multi-agent/store'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'
import { resolveConfiguredProject } from './-project-config'

function prExecFile(): ExecFile {
  if (process.env.HERMES_MA_GH_MOCK === '1') {
    return (command, args, options) => {
      if (command === 'gh' && args.join(' ') === '--version') return 'gh version 2.0.0'
      if (command === 'gh' && args.join(' ') === 'auth status') return 'Logged in to github.com'
      if (command === 'gh' && args[0] === 'pr' && args[1] === 'create') return 'https://github.com/example/repo/pull/1'
      if (command === 'git' && args[0] === 'push') return 'mock push ok'
      return execFileSync(command, args, { cwd: options?.cwd, encoding: 'utf-8' }).trim()
    }
  }
  return (command, args, options) => execFileSync(command, args, {
    cwd: options?.cwd,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 30_000,
  }).trim()
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function approvalPayload(taskId: string, title: string, body: string, branchName: string, baseBranch: string) {
  return { taskId, title, body, branchName, baseBranch }
}

export const Route = createFileRoute('/api/ma/tasks/$taskId/pr')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const store = getRouteStore()
          const task = getTask(store, params.taskId)
          if (!task) return json({ ok: false, error: `Task not found: ${params.taskId}` }, { status: 404 })
          if (!task.worktreePath || !task.branchName) {
            return json({ ok: false, error: `Task has no worktree/branch yet: ${params.taskId}` }, { status: 409 })
          }

          const project = resolveConfiguredProject(task.projectId)
          const validations = listTaskValidations(store, task.id)
          const execFile = prExecFile()
          const preflight = getGitHubPrPreflight({
            worktreePath: task.worktreePath,
            branchName: task.branchName,
            validations,
            execFile,
          })
          if (!preflight.ok) {
            return json({ ok: false, preflight, error: 'PR preflight failed' }, { status: 409 })
          }

          const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
          const title = text(body.title, task.title)
          const prBody = text(body.body, task.workPacket || task.description || 'Created by Hermes multi-agent control plane.')
          const baseBranch = text(body.baseBranch ?? body.base_branch, project.defaultBranch)
          const payload = approvalPayload(task.id, title, prBody, task.branchName, baseBranch)

          const approved = listApprovals(store, { taskId: task.id })
            .find((approval) => approval.actionType === 'github.pr_create' && approval.status === 'approved')
          if (!approved) {
            const existingPending = listApprovals(store, { taskId: task.id })
              .find((approval) => approval.actionType === 'github.pr_create' && approval.status === 'pending')
            const approval = existingPending ?? createApproval(store, {
              taskId: task.id,
              riskLevel: 'high',
              actionType: 'github.pr_create',
              title: `Create PR for ${task.title}`,
              description: `Push ${task.branchName} and create a GitHub pull request.`,
              payload,
            })
            return json({ ok: false, approval, preflight, error: 'Approval required' }, { status: 202 })
          }

          execFile('git', ['push', '-u', 'origin', task.branchName], { cwd: task.worktreePath })
          const prUrl = execFile('gh', buildGitHubPrCommand({
            title,
            body: prBody,
            baseBranch,
            headBranch: task.branchName,
            draft: Boolean(body.draft),
          }), { cwd: task.worktreePath }).split('\n').find(Boolean) ?? ''

          const artifact = createArtifact(store, {
            taskId: task.id,
            type: 'github-pr',
            pathOrUrl: prUrl,
            title,
            metadata: { approvalId: approved.id, branchName: task.branchName, baseBranch },
          })
          const updatedTask = updateTask(store, task.id, { status: 'review' })
          return json({ ok: true, pr: { url: prUrl, artifactId: artifact.id }, artifact, task: updatedTask })
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: 400 })
        }
      },
    },
  },
})
