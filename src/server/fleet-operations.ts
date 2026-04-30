import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { collectFleetStatus, getFleetRegistryPath, redactSensitiveText, type FleetNodeStatus } from './fleet'

const execFileAsync = promisify(execFile)
const DEFAULT_TIMEOUT_MS = 20_000

export type FleetOperation = 'cron.run_now' | 'gateway.restart' | 'agent.update' | 'health.check'
export type FleetOperationStatus = 'planned' | 'running' | 'completed' | 'failed' | 'rejected'

export type FleetOperationRequest = {
  operation?: string
  nodeId?: string
  jobId?: string
  actor?: string
  confirmed?: boolean
}

export type FleetOperationPlan = {
  operation: FleetOperation
  nodeId: string
  targetId: string
  scope: 'local' | 'remote-container'
  commandClass: string
  displayCommand: string
  sideEffect: string
  rollback: string
  requiresConfirmation: boolean
}

export type FleetOperationAuditRecord = {
  id: string
  timestamp: string
  actor: string
  operation: FleetOperation
  nodeId: string
  targetId: string
  status: FleetOperationStatus
  commandClass: string
  resultSummary: string
  error?: string
}

export type FleetOperationResponse = {
  generatedAt: string
  record: FleetOperationAuditRecord
  plan?: FleetOperationPlan
}

function safeId(value?: string): boolean {
  return Boolean(value && /^[a-zA-Z0-9_-]+$/.test(value))
}

function resolveExecutable(command: string): string {
  if (command !== 'hermes') return command
  const candidates = [
    process.env.HERMES_CLI_PATH,
    path.join(os.homedir(), '.hermes', 'hermes-agent', 'venv', 'bin', 'hermes'),
    path.join(os.homedir(), '.hermes', 'bin', 'hermes'),
    'hermes',
  ].filter(Boolean) as Array<string>
  return candidates.find((candidate) => candidate === 'hermes' || existsSync(candidate)) || 'hermes'
}

function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'"'"'`)}'`
}

export function validateOperationRequest(request: FleetOperationRequest): { ok: true } | { ok: false; error: string } {
  if (!safeId(request.nodeId)) return { ok: false, error: 'Invalid nodeId' }
  if (request.operation === 'cron.run_now') {
    if (!safeId(request.jobId)) return { ok: false, error: 'Invalid jobId' }
    return { ok: true }
  }
  if (['gateway.restart', 'agent.update', 'health.check'].includes(request.operation || '')) {
    return { ok: true }
  }
  return { ok: false, error: 'Unsupported operation' }
}

function buildCronRunPlan(input: {
  nodeId: string
  nodeKind: FleetNodeStatus['kind']
  jobId: string
  container?: string
  parentId?: string
}): FleetOperationPlan {
  if (input.nodeKind === 'hermes-local') {
    return {
      operation: 'cron.run_now',
      nodeId: input.nodeId,
      targetId: input.jobId,
      scope: 'local',
      commandClass: 'hermes cron run',
      displayCommand: `hermes cron run ${input.jobId}`,
      sideEffect: 'Triggers one scheduled Hermes cron job on the next scheduler tick.',
      rollback: 'No rollback. If the job sends a message, delivery cannot be unsent.',
      requiresConfirmation: true,
    }
  }

  if (input.nodeKind === 'hermes-container' && input.container && input.parentId) {
    return {
      operation: 'cron.run_now',
      nodeId: input.nodeId,
      targetId: input.jobId,
      scope: 'remote-container',
      commandClass: 'docker exec hermes cron run',
      displayCommand: `ssh ${input.parentId} -- docker exec ${input.container} hermes cron run ${input.jobId}`,
      sideEffect: 'Triggers one scheduled Hermes cron job inside the remote container on the next scheduler tick.',
      rollback: 'No rollback. If the job sends a message, delivery cannot be unsent.',
      requiresConfirmation: true,
    }
  }

  throw new Error(`Unsupported node kind for cron.run_now: ${input.nodeKind}`)
}

function buildGatewayRestartPlan(input: {
  nodeId: string
  nodeKind: FleetNodeStatus['kind']
  container?: string
  parentId?: string
}): FleetOperationPlan {
  if (input.nodeKind === 'hermes-local') {
    return {
      operation: 'gateway.restart',
      nodeId: input.nodeId,
      targetId: input.nodeId,
      scope: 'local',
      commandClass: 'hermes gateway restart',
      displayCommand: 'hermes gateway run --replace',
      sideEffect: 'Restarts the Hermes gateway service. Active websocket connections will drop and reconnect.',
      rollback: 'No rollback needed. Gateway starts from persistent state.',
      requiresConfirmation: true,
    }
  }

  if (input.nodeKind === 'hermes-container' && input.container && input.parentId) {
    return {
      operation: 'gateway.restart',
      nodeId: input.nodeId,
      targetId: input.nodeId,
      scope: 'remote-container',
      commandClass: 'docker exec hermes gateway restart',
      displayCommand: `ssh ${input.parentId} -- docker exec ${input.container} hermes gateway run --replace`,
      sideEffect: 'Restarts the Hermes gateway inside the remote container. Active connections will drop.',
      rollback: 'No rollback needed. Gateway starts from persistent state.',
      requiresConfirmation: true,
    }
  }

  throw new Error(`Unsupported node kind for gateway.restart: ${input.nodeKind}`)
}

function buildAgentUpdatePlan(input: {
  nodeId: string
  nodeKind: FleetNodeStatus['kind']
  container?: string
  parentId?: string
}): FleetOperationPlan {
  if (input.nodeKind === 'hermes-local') {
    return {
      operation: 'agent.update',
      nodeId: input.nodeId,
      targetId: input.nodeId,
      scope: 'local',
      commandClass: 'hermes update',
      displayCommand: 'hermes update',
      sideEffect: 'Pulls latest agent code and restarts the gateway from the updated version.',
      rollback: 'Manual git revert in ~/.hermes/hermes-agent required if update breaks.',
      requiresConfirmation: true,
    }
  }

  if (input.nodeKind === 'hermes-container' && input.container && input.parentId) {
    return {
      operation: 'agent.update',
      nodeId: input.nodeId,
      targetId: input.nodeId,
      scope: 'remote-container',
      commandClass: 'docker exec hermes update',
      displayCommand: `ssh ${input.parentId} -- docker exec ${input.container} hermes update`,
      sideEffect: 'Pulls latest agent code inside the remote container. May require container rebuild for dependency changes.',
      rollback: 'Container rebuild from previous image tag required if update breaks.',
      requiresConfirmation: true,
    }
  }

  throw new Error(`Unsupported node kind for agent.update: ${input.nodeKind}`)
}

function buildHealthCheckPlan(input: {
  nodeId: string
  nodeKind: FleetNodeStatus['kind']
  container?: string
  parentId?: string
}): FleetOperationPlan {
  if (input.nodeKind === 'hermes-local') {
    return {
      operation: 'health.check',
      nodeId: input.nodeId,
      targetId: input.nodeId,
      scope: 'local',
      commandClass: 'hermes status',
      displayCommand: 'hermes status',
      sideEffect: 'Read-only status poll. No side effects.',
      rollback: 'N/A',
      requiresConfirmation: false,
    }
  }

  if (input.nodeKind === 'hermes-container' && input.container && input.parentId) {
    return {
      operation: 'health.check',
      nodeId: input.nodeId,
      targetId: input.nodeId,
      scope: 'remote-container',
      commandClass: 'docker exec hermes status',
      displayCommand: `ssh ${input.parentId} -- docker exec ${input.container} hermes status`,
      sideEffect: 'Read-only status poll inside remote container. No side effects.',
      rollback: 'N/A',
      requiresConfirmation: false,
    }
  }

  throw new Error(`Unsupported node kind for health.check: ${input.nodeKind}`)
}

export function buildOperationPlan(input: {
  operation: FleetOperation
  nodeId: string
  nodeKind: FleetNodeStatus['kind']
  targetId?: string
  container?: string
  parentId?: string
}): FleetOperationPlan {
  if (input.operation === 'cron.run_now') {
    return buildCronRunPlan({ nodeId: input.nodeId, nodeKind: input.nodeKind, jobId: input.targetId!, container: input.container, parentId: input.parentId })
  }
  if (input.operation === 'gateway.restart') {
    return buildGatewayRestartPlan({ nodeId: input.nodeId, nodeKind: input.nodeKind, container: input.container, parentId: input.parentId })
  }
  if (input.operation === 'agent.update') {
    return buildAgentUpdatePlan({ nodeId: input.nodeId, nodeKind: input.nodeKind, container: input.container, parentId: input.parentId })
  }
  if (input.operation === 'health.check') {
    return buildHealthCheckPlan({ nodeId: input.nodeId, nodeKind: input.nodeKind, container: input.container, parentId: input.parentId })
  }
  throw new Error(`Unsupported operation: ${input.operation}`)
}

function operationId(): string {
  return `op_${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}_${Math.random().toString(16).slice(2, 8)}`
}

export function summarizeOperationResult(stdout: string, stderr: string): string {
  const text = redactSensitiveText([stdout, stderr].filter(Boolean).join('\n').trim() || 'No command output.')
  const lines = text.split('\n').filter(Boolean)
  return lines.slice(Math.max(0, lines.length - 8)).join('\n').slice(0, 2_000)
}

export function createAuditRecord(input: {
  operation: FleetOperation
  nodeId: string
  targetId: string
  actor?: string
  status: FleetOperationStatus
  commandClass: string
  resultSummary: string
  error?: string
}): FleetOperationAuditRecord {
  return {
    id: operationId(),
    timestamp: new Date().toISOString(),
    actor: input.actor || 'workspace',
    operation: input.operation,
    nodeId: input.nodeId,
    targetId: input.targetId,
    status: input.status,
    commandClass: input.commandClass,
    resultSummary: redactSensitiveText(input.resultSummary),
    error: input.error ? redactSensitiveText(input.error) : undefined,
  }
}

export function getFleetOperationsAuditPath(): string {
  return path.join(os.homedir(), '.hermes', 'fleet', 'operations-audit.jsonl')
}

async function appendAuditRecord(record: FleetOperationAuditRecord, auditPath = getFleetOperationsAuditPath()) {
  await mkdir(path.dirname(auditPath), { recursive: true })
  const existing = existsSync(auditPath) ? await readFile(auditPath, 'utf8') : ''
  await writeFile(auditPath, `${existing}${JSON.stringify(record)}\n`, 'utf8')
}

export async function readFleetOperations(limit = 100, auditPath = getFleetOperationsAuditPath()): Promise<Array<FleetOperationAuditRecord>> {
  if (!existsSync(auditPath)) return []
  const lines = (await readFile(auditPath, 'utf8')).split('\n').filter(Boolean)
  return lines
    .slice(-Math.max(1, Math.min(limit, 500)))
    .map((line) => {
      try {
        return JSON.parse(line) as FleetOperationAuditRecord
      } catch {
        return null
      }
    })
    .filter((record): record is FleetOperationAuditRecord => Boolean(record))
    .reverse()
}

async function runCommand(command: string, args: Array<string>, timeout = DEFAULT_TIMEOUT_MS) {
  try {
    const { stdout, stderr } = await execFileAsync(resolveExecutable(command), args, { timeout, maxBuffer: 1024 * 256 })
    return { ok: true, stdout: String(stdout), stderr: String(stderr) }
  } catch (error) {
    const err = error as { stdout?: string | Buffer; stderr?: string | Buffer; message?: string }
    return {
      ok: false,
      stdout: err.stdout ? String(err.stdout) : '',
      stderr: err.stderr ? String(err.stderr) : err.message || 'Command failed',
    }
  }
}

async function executeCronRun(node: FleetNodeStatus, jobId: string) {
  if (node.kind === 'hermes-local') {
    return runCommand('hermes', ['cron', 'run', jobId], 20_000)
  }

  if (node.kind === 'hermes-container') {
    const fleet = await collectFleetStatus(getFleetRegistryPath())
    const parent = fleet.nodes.find((candidate) => candidate.id === node.parent)
    if (!parent?.address || !parent.user || !node.container) {
      return { ok: false, stdout: '', stderr: 'Missing parent host or container for remote cron run.' }
    }
    const remoteCommand = `docker exec ${shellQuote(node.container)} sh -lc ${shellQuote(`hermes cron run ${jobId}`)}`
    return runCommand('ssh', [
      ...(parent.keyPath ? ['-i', parent.keyPath] : []),
      '-o', 'BatchMode=yes',
      '-o', 'ConnectTimeout=6',
      `${parent.user}@${parent.address}`,
      remoteCommand,
    ], 25_000)
  }

  return { ok: false, stdout: '', stderr: `Unsupported node kind: ${node.kind}` }
}

async function executeGatewayRestart(node: FleetNodeStatus) {
  if (node.kind === 'hermes-local') {
    return runCommand('hermes', ['gateway', 'run', '--replace'], 30_000)
  }

  if (node.kind === 'hermes-container') {
    const fleet = await collectFleetStatus(getFleetRegistryPath())
    const parent = fleet.nodes.find((candidate) => candidate.id === node.parent)
    if (!parent?.address || !parent.user || !node.container) {
      return { ok: false, stdout: '', stderr: 'Missing parent host or container for remote gateway restart.' }
    }
    const remoteCommand = `docker exec ${shellQuote(node.container)} sh -lc ${shellQuote('hermes gateway run --replace')}`
    return runCommand('ssh', [
      ...(parent.keyPath ? ['-i', parent.keyPath] : []),
      '-o', 'BatchMode=yes',
      '-o', 'ConnectTimeout=6',
      `${parent.user}@${parent.address}`,
      remoteCommand,
    ], 35_000)
  }

  return { ok: false, stdout: '', stderr: `Unsupported node kind: ${node.kind}` }
}

async function executeAgentUpdate(node: FleetNodeStatus) {
  if (node.kind === 'hermes-local') {
    return runCommand('hermes', ['update'], 120_000)
  }

  if (node.kind === 'hermes-container') {
    const fleet = await collectFleetStatus(getFleetRegistryPath())
    const parent = fleet.nodes.find((candidate) => candidate.id === node.parent)
    if (!parent?.address || !parent.user || !node.container) {
      return { ok: false, stdout: '', stderr: 'Missing parent host or container for remote agent update.' }
    }
    const remoteCommand = `docker exec ${shellQuote(node.container)} sh -lc ${shellQuote('hermes update')}`
    return runCommand('ssh', [
      ...(parent.keyPath ? ['-i', parent.keyPath] : []),
      '-o', 'BatchMode=yes',
      '-o', 'ConnectTimeout=6',
      `${parent.user}@${parent.address}`,
      remoteCommand,
    ], 120_000)
  }

  return { ok: false, stdout: '', stderr: `Unsupported node kind: ${node.kind}` }
}

async function executeHealthCheck(node: FleetNodeStatus) {
  if (node.kind === 'hermes-local') {
    return runCommand('hermes', ['status'], 10_000)
  }

  if (node.kind === 'hermes-container') {
    const fleet = await collectFleetStatus(getFleetRegistryPath())
    const parent = fleet.nodes.find((candidate) => candidate.id === node.parent)
    if (!parent?.address || !parent.user || !node.container) {
      return { ok: false, stdout: '', stderr: 'Missing parent host or container for remote health check.' }
    }
    const remoteCommand = `docker exec ${shellQuote(node.container)} sh -lc ${shellQuote('hermes status')}`
    return runCommand('ssh', [
      ...(parent.keyPath ? ['-i', parent.keyPath] : []),
      '-o', 'BatchMode=yes',
      '-o', 'ConnectTimeout=6',
      `${parent.user}@${parent.address}`,
      remoteCommand,
    ], 15_000)
  }

  return { ok: false, stdout: '', stderr: `Unsupported node kind: ${node.kind}` }
}

async function executeOperation(node: FleetNodeStatus, operation: FleetOperation, targetId: string) {
  if (operation === 'cron.run_now') {
    return executeCronRun(node, targetId)
  }
  if (operation === 'gateway.restart') {
    return executeGatewayRestart(node)
  }
  if (operation === 'agent.update') {
    return executeAgentUpdate(node)
  }
  if (operation === 'health.check') {
    return executeHealthCheck(node)
  }
  return { ok: false, stdout: '', stderr: `Unsupported operation: ${operation}` }
}

export async function planFleetOperation(request: FleetOperationRequest): Promise<FleetOperationResponse> {
  const validation = validateOperationRequest(request)
  if (!validation.ok) {
    const err = (validation as { ok: false; error: string }).error
    const operation = (request.operation as FleetOperation) || 'cron.run_now'
    const targetId = request.operation === 'cron.run_now' ? (request.jobId || 'unknown') : (request.nodeId || 'unknown')
    const record = createAuditRecord({
      operation,
      nodeId: request.nodeId || 'unknown',
      targetId,
      actor: request.actor,
      status: 'rejected',
      commandClass: 'validation',
      resultSummary: err,
      error: err,
    })
    return { generatedAt: new Date().toISOString(), record }
  }

  const fleet = await collectFleetStatus()
  const node = fleet.nodes.find((candidate) => candidate.id === request.nodeId)
  if (!node) {
    const operation = (request.operation as FleetOperation) || 'cron.run_now'
    const targetId = request.operation === 'cron.run_now' ? request.jobId! : request.nodeId!
    const record = createAuditRecord({
      operation,
      nodeId: request.nodeId!,
      targetId,
      actor: request.actor,
      status: 'rejected',
      commandClass: 'lookup',
      resultSummary: 'Node not found.',
      error: 'Node not found.',
    })
    return { generatedAt: new Date().toISOString(), record }
  }

  const plan = buildOperationPlan({
    operation: request.operation as FleetOperation,
    nodeId: node.id,
    nodeKind: node.kind,
    ...(request.operation === 'cron.run_now' ? { targetId: request.jobId } : {}),
    ...(node.container ? { container: node.container } : {}),
    ...(typeof node.parent === 'string' ? { parentId: node.parent } : {}),
  })
  const record = createAuditRecord({
    operation: plan.operation,
    nodeId: node.id,
    targetId: plan.targetId,
    actor: request.actor,
    status: 'planned',
    commandClass: plan.commandClass,
    resultSummary: `${plan.sideEffect} Confirmation required.`,
  })
  return { generatedAt: new Date().toISOString(), record, plan }
}

export async function executeFleetOperation(request: FleetOperationRequest): Promise<FleetOperationResponse> {
  const planned = await planFleetOperation(request)
  if (!planned.plan) {
    await appendAuditRecord(planned.record)
    return planned
  }
  if (!request.confirmed && planned.plan.requiresConfirmation) {
    await appendAuditRecord(planned.record)
    return planned
  }

  const running = createAuditRecord({
    operation: planned.plan.operation,
    nodeId: planned.plan.nodeId,
    targetId: planned.plan.targetId,
    actor: request.actor,
    status: 'running',
    commandClass: planned.plan.commandClass,
    resultSummary: 'Operation accepted and execution started.',
  })
  await appendAuditRecord(running)

  const fleet = await collectFleetStatus()
  const node = fleet.nodes.find((candidate) => candidate.id === planned.plan!.nodeId)
  const result = node ? await executeOperation(node, planned.plan.operation, planned.plan.targetId) : { ok: false, stdout: '', stderr: 'Node disappeared before execution.' }
  const completed = createAuditRecord({
    operation: planned.plan.operation,
    nodeId: planned.plan.nodeId,
    targetId: planned.plan.targetId,
    actor: request.actor,
    status: result.ok ? 'completed' : 'failed',
    commandClass: planned.plan.commandClass,
    resultSummary: summarizeOperationResult(result.stdout, result.stderr),
    error: result.ok ? undefined : result.stderr || result.stdout || 'Operation failed.',
  })
  await appendAuditRecord(completed)

  return { generatedAt: new Date().toISOString(), record: completed, plan: planned.plan }
}
