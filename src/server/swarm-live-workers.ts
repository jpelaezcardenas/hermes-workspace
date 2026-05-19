import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import * as yaml from 'yaml'
import { getLocalBinDir, getProfilesDir } from './claude-paths'
import { SWARM_CANONICAL_REPO } from './swarm-environment'
import { DEFAULT_SWARM_AGENT_TEAM } from './swarm-roster'

type DefaultSwarmAgent = (typeof DEFAULT_SWARM_AGENT_TEAM)[number]

export type SwarmLiveWorkerPlan = {
  id: string
  name: string
  role: string
  profilePath: string
  wrapperPath: string
  sessionName: string
  workspaceRoot: string
  hermesBin: string
  profileConfigPath: string
  runtimePath: string
}

export type SwarmLiveWorkersOptions = {
  profilesDir?: string
  localBinDir?: string
  workspaceRoot?: string
  hermesBin?: string
}

export type SwarmLiveWorkerEnsureResult = SwarmLiveWorkerPlan & {
  profileCreated: boolean
  configChanged: boolean
  runtimeChanged: boolean
  wrapperCreated: boolean
  wrapperChanged: boolean
}

export type SwarmLiveWorkersEnsureResult = {
  ok: true
  workers: Array<SwarmLiveWorkerEnsureResult>
  createdProfiles: number
  changedConfigs: number
  changedRuntimes: number
  createdWrappers: number
  changedWrappers: number
}

export type SwarmWorkerStartResult = {
  workerId: string
  ok: boolean
  started: boolean
  alreadyRunning: boolean
  error?: string
}

export type SwarmLiveWorkersStartSummary = {
  requested: number
  ok: boolean
  started: number
  alreadyRunning: number
  failed: number
}

export function buildSwarmLiveWorkersStartSummary(
  results: Array<SwarmWorkerStartResult>,
): SwarmLiveWorkersStartSummary {
  const failed = results.filter((result) => !result.ok).length
  return {
    requested: results.length,
    ok: failed === 0,
    started: results.filter((result) => result.ok && result.started).length,
    alreadyRunning: results.filter((result) => result.ok && result.alreadyRunning).length,
    failed,
  }
}

const DEFAULT_HERMES_BIN_CANDIDATES = [
  process.env.HERMES_CLI_BIN,
  join(homedir(), '.hermes', 'hermes-agent', 'venv', 'bin', 'hermes'),
  join(homedir(), '.local', 'bin', 'hermes'),
  'hermes',
].filter((value): value is string => Boolean(value))

function resolveHermesBin(): string {
  for (const candidate of DEFAULT_HERMES_BIN_CANDIDATES) {
    if (!candidate.includes('/') || existsSync(candidate)) return candidate
  }
  return 'hermes'
}

function shellEscapeSingle(value: string): string {
  return value.replace(/'/g, `'\\''`)
}

function rolePrompt(worker: DefaultSwarmAgent): string {
  return [
    `You are ${worker.role} (${worker.name}) in the Hermes Swarm live-worker team.`,
    '',
    `Specialty: ${worker.specialty || 'general Hermes worker'}`,
    `Mission: ${worker.mission || 'Await orchestrator dispatch and return proof-bearing checkpoints.'}`,
    '',
    'Operating rules:',
    '- Stay inside your role unless the CTO / Conductor explicitly reroutes you.',
    '- Read the dispatched work packet before acting.',
    '- Use relevant skills when the task context calls for them.',
    '- Produce concise checkpoints with files changed, commands run, result, blockers, and next action.',
    '- Never run deploy, git push, destructive filesystem cleanup, or secret/env edits without explicit approval.',
    '- Never print or persist secrets; redact credentials as [REDACTED].',
    '',
    `Default skills: ${(worker.skills ?? []).join(', ') || 'none'}`,
    `Capabilities: ${(worker.capabilities ?? []).join(', ') || 'none'}`,
  ].join('\n')
}

function profileConfig(worker: DefaultSwarmAgent): Record<string, unknown> {
  return {
    profile: {
      id: worker.id,
      name: worker.name,
      role: worker.role,
      specialty: worker.specialty,
      mission: worker.mission,
      capabilities: worker.capabilities ?? [],
      preferredTaskTypes: worker.preferredTaskTypes ?? [],
      acceptsBroadcast: worker.acceptsBroadcast ?? true,
      reviewRequired: worker.reviewRequired ?? false,
    },
    system_prompt: rolePrompt(worker),
    agent: {
      kind: 'swarm-live-worker',
      max_turns: 80,
      checkpoint_required: true,
    },
  }
}

function runtimeMetadata(worker: DefaultSwarmAgent, workspaceRoot: string): Record<string, unknown> {
  const now = Date.now()
  return {
    workerId: worker.id,
    role: worker.role,
    state: 'idle',
    phase: 'live-worker-ready',
    currentTask: null,
    activeTool: null,
    cwd: workspaceRoot,
    startedAt: null,
    lastOutputAt: null,
    lastCheckIn: new Date(now).toISOString(),
    lastSummary: `Ready as ${worker.role}`,
    needsHuman: false,
    blockedReason: null,
    checkpointStatus: 'none',
    nextAction: 'Await CTO / Conductor dispatch.',
    lastResult: null,
    assignedTaskCount: 0,
    cronJobCount: 0,
    sessionId: null,
    sessionTitle: null,
    historySource: 'unavailable',
    transport: 'unknown',
    lastDispatchAt: null,
    lastDispatchMode: 'none',
    lastDispatchResult: null,
    tasks: [],
    artifacts: [],
    previews: [],
    boundary: {
      workspaceRoot,
      cwd: workspaceRoot,
      insideWorkspace: true,
      relativeCwd: '.',
      owner: 'workspace',
    },
    liveWorker: {
      version: 1,
      name: worker.name,
      specialty: worker.specialty,
      skills: worker.skills ?? [],
      sessionName: `swarm-${worker.id}`,
    },
  }
}

function wrapperScript(input: { profilePath: string; workspaceRoot: string; hermesBin: string }): string {
  const workspace = shellEscapeSingle(input.workspaceRoot)
  const profile = shellEscapeSingle(input.profilePath)
  const hermes = shellEscapeSingle(input.hermesBin)
  return [
    '#!/usr/bin/env bash',
    'set -euo pipefail',
    `cd '${workspace}'`,
    `export HERMES_HOME='${profile}'`,
    `export HERMES_CLI_BIN='${hermes}'`,
    `exec '${hermes}' chat --tui`,
    '',
  ].join('\n')
}

function writeIfChanged(path: string, content: string): { existed: boolean; changed: boolean } {
  const existed = existsSync(path)
  if (existed) {
    try {
      if (readFileSync(path, 'utf8') === content) return { existed, changed: false }
    } catch {
      // Rewrite unreadable/corrupt file below.
    }
  }
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content, 'utf8')
  return { existed, changed: true }
}

export function planDefaultSwarmLiveWorkers(options: SwarmLiveWorkersOptions = {}): Array<SwarmLiveWorkerPlan> {
  const profilesDir = options.profilesDir ?? getProfilesDir()
  const localBinDir = options.localBinDir ?? getLocalBinDir()
  const workspaceRoot = options.workspaceRoot ?? SWARM_CANONICAL_REPO
  const hermesBin = options.hermesBin ?? resolveHermesBin()

  return DEFAULT_SWARM_AGENT_TEAM.map((worker) => {
    const profilePath = join(profilesDir, worker.id)
    return {
      id: worker.id,
      name: worker.name,
      role: worker.role,
      profilePath,
      wrapperPath: join(localBinDir, worker.id),
      sessionName: `swarm-${worker.id}`,
      workspaceRoot,
      hermesBin,
      profileConfigPath: join(profilePath, 'config.yaml'),
      runtimePath: join(profilePath, 'runtime.json'),
    }
  })
}

export function ensureDefaultSwarmLiveWorkers(options: SwarmLiveWorkersOptions = {}): SwarmLiveWorkersEnsureResult {
  const plan = planDefaultSwarmLiveWorkers(options)
  const workers = plan.map((item, index): SwarmLiveWorkerEnsureResult => {
    const worker = DEFAULT_SWARM_AGENT_TEAM[index]
    if (!worker || worker.id !== item.id) throw new Error(`Missing default worker metadata for ${item.id}`)

    const profileCreated = !existsSync(item.profilePath)
    mkdirSync(join(item.profilePath, 'logs'), { recursive: true })
    mkdirSync(join(item.profilePath, 'memory', 'handoffs'), { recursive: true })

    const configWrite = writeIfChanged(
      item.profileConfigPath,
      yaml.stringify(profileConfig(worker), { lineWidth: 0 }),
    )
    const runtimeWrite = writeIfChanged(
      item.runtimePath,
      JSON.stringify(runtimeMetadata(worker, item.workspaceRoot), null, 2) + '\n',
    )
    const wrapperWrite = writeIfChanged(
      item.wrapperPath,
      wrapperScript({
        profilePath: item.profilePath,
        workspaceRoot: item.workspaceRoot,
        hermesBin: item.hermesBin,
      }),
    )
    chmodSync(item.wrapperPath, 0o755)

    return {
      ...item,
      profileCreated,
      configChanged: configWrite.changed,
      runtimeChanged: runtimeWrite.changed,
      wrapperCreated: !wrapperWrite.existed,
      wrapperChanged: wrapperWrite.changed,
    }
  })

  return {
    ok: true,
    workers,
    createdProfiles: workers.filter((worker) => worker.profileCreated).length,
    changedConfigs: workers.filter((worker) => worker.configChanged).length,
    changedRuntimes: workers.filter((worker) => worker.runtimeChanged).length,
    createdWrappers: workers.filter((worker) => worker.wrapperCreated).length,
    changedWrappers: workers.filter((worker) => worker.wrapperChanged).length,
  }
}
