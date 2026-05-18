import { execSync } from 'node:child_process'
import type {
  MultiAgentProjectValidation,
  MultiAgentValidation,
  MultiAgentValidationType,
} from './types'

export type RunTaskValidationInput = {
  taskId: string
  type: MultiAgentValidationType
  command?: string | null
  validationConfig?: MultiAgentProjectValidation | null
  worktreePath: string
  allowCustomCommand?: boolean
  timeoutMs?: number
  now?: () => string
  id?: () => string
}

export type RunTaskValidationResult = {
  validation: MultiAgentValidation
  output: string
}

function defaultNow(): string {
  return new Date().toISOString()
}

function defaultId(): string {
  return crypto.randomUUID()
}

function summarizeOutput(output: string): string {
  const text = output.trim()
  if (text.length <= 4000) return text
  return `${text.slice(0, 4000)}\n… truncated`
}

function resolveValidationCommand(input: RunTaskValidationInput): string {
  const command = input.command?.trim()
  if (input.type === 'custom') {
    if (!input.allowCustomCommand) {
      throw new Error('Custom validation commands require approval')
    }
    if (!command) throw new Error('Custom validation command is required')
    return command
  }

  const configured = input.validationConfig?.[input.type]?.trim()
  if (configured) return configured
  if (command) return command
  throw new Error(`No validation command configured for ${input.type}`)
}

export function runTaskValidation(input: RunTaskValidationInput): RunTaskValidationResult {
  const now = input.now ?? defaultNow
  const id = input.id ?? defaultId
  const startedAt = now()
  const command = resolveValidationCommand(input)
  let output = ''
  let exitCode = 0

  try {
    output = execSync(command, {
      cwd: input.worktreePath,
      encoding: 'utf-8',
      shell: '/bin/bash',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: input.timeoutMs ?? 120_000,
    })
  } catch (err) {
    const error = err as { status?: number | null; stdout?: Buffer | string; stderr?: Buffer | string; message?: string }
    exitCode = typeof error.status === 'number' ? error.status : 1
    const stdout = Buffer.isBuffer(error.stdout) ? error.stdout.toString('utf-8') : error.stdout ?? ''
    const stderr = Buffer.isBuffer(error.stderr) ? error.stderr.toString('utf-8') : error.stderr ?? ''
    output = [stdout, stderr || error.message || 'Validation command failed'].filter(Boolean).join('\n')
  }

  const validation: MultiAgentValidation = {
    id: `validation-${id()}`,
    taskId: input.taskId,
    type: input.type,
    command,
    status: exitCode === 0 ? 'passed' : 'failed',
    exitCode,
    outputSummary: summarizeOutput(output),
    outputArtifactId: null,
    startedAt,
    finishedAt: now(),
  }

  return { validation, output }
}
