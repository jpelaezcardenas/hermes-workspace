import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { runTaskValidation } from '../../../server/multi-agent/validation-runner'
import { createArtifact, getTask, listTaskValidations, saveValidation } from '../../../server/multi-agent/store'
import type { MultiAgentValidationType } from '../../../server/multi-agent/types'
import { getRouteStore, requireAuthenticated, safeError } from './-helpers'
import { MultiAgentProjectNotFoundError, resolveConfiguredProject } from './-project-config'

const VALIDATION_TYPES = new Set<MultiAgentValidationType>(['lint', 'typecheck', 'test', 'build', 'custom'])

function parseValidationType(value: unknown): MultiAgentValidationType {
  const type = typeof value === 'string' ? value.trim() : ''
  if (!VALIDATION_TYPES.has(type as MultiAgentValidationType)) {
    throw new Error(`Unsupported validation type: ${type || '(missing)'}`)
  }
  return type as MultiAgentValidationType
}

function statusForValidationError(err: unknown): number {
  if (err instanceof MultiAgentProjectNotFoundError) return 404
  if (err instanceof Error && err.message.includes('Custom validation commands require approval')) return 403
  return 400
}

function validationArtifactsDir(stateFile: string): string {
  return join(dirname(stateFile), 'artifacts', 'validation-output')
}

function safeValidationFileName(value: string): string {
  return value.replace(/[^0-9A-Za-z_.-]/g, '-')
}

export const Route = createFileRoute('/api/ma/tasks/$taskId/validate')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        const store = getRouteStore()
        const task = getTask(store, params.taskId)
        if (!task) {
          return json({ ok: false, error: `Task not found: ${params.taskId}` }, { status: 404 })
        }
        return json({ ok: true, validations: listTaskValidations(store, task.id) })
      },
      POST: async ({ request, params }) => {
        const authFailure = requireAuthenticated(request)
        if (authFailure) return authFailure

        try {
          const store = getRouteStore()
          const task = getTask(store, params.taskId)
          if (!task) {
            return json({ ok: false, error: `Task not found: ${params.taskId}` }, { status: 404 })
          }
          if (!task.worktreePath) {
            return json({ ok: false, error: `Task has no worktree yet: ${params.taskId}` }, { status: 409 })
          }

          const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
          const type = parseValidationType(body.type)
          const command = typeof body.command === 'string' ? body.command : undefined
          const project = resolveConfiguredProject(task.projectId)
          const result = runTaskValidation({
            taskId: task.id,
            type,
            command,
            validationConfig: project.validation,
            worktreePath: task.worktreePath,
            now: store.now,
            id: store.id,
          })
          const outputDir = validationArtifactsDir(store.stateFile)
          mkdirSync(outputDir, { recursive: true })
          const outputPath = join(outputDir, `${safeValidationFileName(result.validation.id)}.log`)
          writeFileSync(outputPath, result.output, 'utf-8')
          const artifact = createArtifact(store, {
            taskId: task.id,
            type: 'validation-output',
            pathOrUrl: outputPath,
            title: `${type} validation output`,
            metadata: {
              validationId: result.validation.id,
              status: result.validation.status,
              exitCode: result.validation.exitCode,
            },
          })
          const validation = saveValidation(store, { ...result.validation, outputArtifactId: artifact.id })
          return json({ ok: true, validation })
        } catch (err) {
          return json({ ok: false, error: safeError(err) }, { status: statusForValidationError(err) })
        }
      },
    },
  },
})
