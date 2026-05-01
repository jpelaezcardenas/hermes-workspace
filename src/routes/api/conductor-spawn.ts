/**
 * Conductor mission spawn — Hermes-backed.
 *
 * Spawns a one-shot Hermes job whose prompt is the orchestrator instructions.
 * The orchestrator session, when it runs, uses the create_task / delegate
 * tools to spawn worker agents. The Conductor UI then polls /api/sessions
 * + /api/history to track workers.
 *
 * Replaces the previous OCPlatform JSON-RPC implementation
 * (gatewayRpc('cron.add', ...)) which only worked when the OCPlatform
 * gateway was running on ws://127.0.0.1:18789.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { requireJsonContentType } from '../../server/rate-limit'
import { BEARER_TOKEN, HERMES_API, dashboardFetch, ensureGatewayProbed } from '../../server/gateway-capabilities'

let cachedSkill: string | null = null

type ConductorSpawnBody = {
  goal?: unknown
  orchestratorModel?: unknown
  workerModel?: unknown
  projectsDir?: unknown
  maxParallel?: unknown
  supervised?: unknown
}

// Resolve the workspace root from this module's location so we find the
// bundled skill regardless of where the server is launched from.
function repoRoot(): string {
  try {
    const here = dirname(fileURLToPath(import.meta.url))
    // src/routes/api -> repo root (../..)
    return resolve(here, '..', '..', '..')
  } catch {
    return process.cwd()
  }
}

function loadDispatchSkill(): string {
  if (cachedSkill !== null) return cachedSkill
  const candidates = [
    resolve(repoRoot(), 'skills/workspace-dispatch/SKILL.md'),
    resolve(process.cwd(), 'skills/workspace-dispatch/SKILL.md'),
    resolve(process.env.HOME ?? '~', '.hermes/skills/workspace-dispatch/SKILL.md'),
    resolve(process.env.HOME ?? '~', '.ocplatform/workspace/skills/workspace-dispatch/SKILL.md'),
  ]
  for (const p of candidates) {
    try {
      cachedSkill = readFileSync(p, 'utf-8')
      return cachedSkill
    } catch {
      continue
    }
  }
  cachedSkill = ''
  return cachedSkill
}

function readOptionalString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function readMaxParallel(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 1
  return Math.min(5, Math.max(1, Math.round(value)))
}

function buildOrchestratorPrompt(
  goal: string,
  skill: string,
  options: {
    orchestratorModel: string
    workerModel: string
    projectsDir: string
    maxParallel: number
    supervised: boolean
  },
): string {
  const outputBase = options.projectsDir || '/tmp'
  const outputPrefix = outputBase === '/tmp' ? '/tmp/dispatch-<slug>' : `${outputBase}/dispatch-<slug>`

  return [
    'You are a mission orchestrator. Execute this mission autonomously.',
    '',
    '## Dispatch Skill Instructions',
    '',
    skill || '(workspace-dispatch skill not found locally; proceed using create_task to spawn workers)',
    '',
    '## Mission',
    '',
    `Goal: ${goal}`,
    ...(options.orchestratorModel ? ['', `Use model: ${options.orchestratorModel} for the orchestrator`] : []),
    ...(options.workerModel ? ['', `Use model: ${options.workerModel} for all workers`] : []),
    ...(options.maxParallel > 1
      ? ['', `Run up to ${options.maxParallel} workers in parallel when tasks are independent`]
      : ['', 'Spawn workers one at a time. Do NOT wait for workers to finish — the UI handles tracking.']),
    ...(options.supervised ? ['', 'Supervised mode is enabled. Require approval before each task.'] : []),
    '',
    '## Critical Rules',
    '- Use create_task / delegate_task to create worker agents for each task',
    '- Do NOT do the work yourself — spawn workers',
    '- For simple tasks (single file, quick mockup), use ONLY 1 task with 1 worker — do not over-decompose',
    '- Do NOT ask for confirmation — start immediately',
    '- Label workers as "worker-<task-slug>" so the UI can track them',
    '- Each worker gets a self-contained prompt with the task + exit criteria',
    `- Workers should write output to ${outputPrefix} directories`,
    '- After spawning all workers, report your plan summary and finish. The UI tracks worker completion automatically.',
    '- Report a summary when all tasks are done',
  ].join('\n')
}

function authHeaders(): Record<string, string> {
  return BEARER_TOKEN ? { Authorization: `Bearer ${BEARER_TOKEN}` } : {}
}

function nowPlusSecondsIso(seconds: number): string {
  const t = new Date(Date.now() + seconds * 1000)
  // Hermes accepts ISO-8601 timestamps; strip milliseconds for cleanliness
  return t.toISOString().replace(/\.\d{3}Z$/, 'Z')
}

async function createConductorMission(payload: { name: string; prompt: string }): Promise<{
  id?: string
  name?: string
  sessionKey?: string
  sessionKeyPrefix?: string
  error?: string
}> {
  const body = JSON.stringify({
    name: payload.name,
    prompt: payload.prompt,
  })
  const capabilities = await ensureGatewayProbed()
  if (capabilities.dashboard.available) {
    const res = await dashboardFetch('/api/conductor/missions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    const text = await res.text()
    let data: {
      id?: string
      name?: string
      session_id?: string
      error?: string
      detail?: string
    } = {}
    try {
      data = JSON.parse(text)
    } catch {
      return { error: text || `HTTP ${res.status}` }
    }
    if (!res.ok || data.error || data.detail) {
      return { error: data.error || data.detail || `HTTP ${res.status}` }
    }
    return {
      id: data.id,
      name: data.name,
      sessionKey: data.session_id,
    }
  }

  const cronBody = JSON.stringify({
    name: payload.name,
    schedule: nowPlusSecondsIso(5),
    prompt: payload.prompt,
    deliver: 'local',
  })
  const res = await fetch(`${HERMES_API}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: cronBody,
  })
  const text = await res.text()
  let data: { job?: { id?: string; name?: string }; error?: string } = {}
  try {
    data = JSON.parse(text)
  } catch {
    return { error: text || `HTTP ${res.status}` }
  }
  if (!res.ok || data.error) {
    return { error: data.error || `HTTP ${res.status}` }
  }
  return {
    id: data.job?.id,
    name: data.job?.name,
    sessionKeyPrefix: data.job?.id ? `cron_${data.job.id}_` : undefined,
  }
}

export const Route = createFileRoute('/api/conductor-spawn')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }

        const url = new URL(request.url)
        const missionId = url.searchParams.get('missionId')?.trim()
        const requestedLines = Number(url.searchParams.get('lines') || '200')
        const lines = Number.isFinite(requestedLines) ? Math.min(2000, Math.max(1, requestedLines)) : 200
        if (!missionId) {
          return json({ ok: false, error: 'missionId required' }, { status: 400 })
        }

        const capabilities = await ensureGatewayProbed()
        if (!capabilities.dashboard.available) {
          return json({ ok: false, error: 'Hermes dashboard API is unavailable' }, { status: 503 })
        }

        const res = await dashboardFetch(`/api/conductor/missions/${encodeURIComponent(missionId)}?lines=${lines}`)
        const text = await res.text()
        let mission: Record<string, unknown> = {}
        try {
          mission = JSON.parse(text) as Record<string, unknown>
        } catch {
          return json({ ok: false, error: text || `HTTP ${res.status}` }, { status: res.ok ? 502 : res.status })
        }
        if (!res.ok) {
          const error = typeof mission.detail === 'string' ? mission.detail : typeof mission.error === 'string' ? mission.error : `HTTP ${res.status}`
          return json({ ok: false, error }, { status: res.status })
        }
        return json({ ok: true, mission })
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        try {
          const body = (await request.json().catch(() => ({}))) as ConductorSpawnBody
          const goal = readOptionalString(body.goal)
          const orchestratorModel = readOptionalString(body.orchestratorModel)
          const workerModel = readOptionalString(body.workerModel)
          const projectsDir = readOptionalString(body.projectsDir)
          const maxParallel = readMaxParallel(body.maxParallel)
          const supervised = body.supervised === true

          if (!goal) {
            return json({ ok: false, error: 'goal required' }, { status: 400 })
          }

          const skill = loadDispatchSkill()
          const prompt = buildOrchestratorPrompt(goal, skill, {
            orchestratorModel,
            workerModel,
            projectsDir,
            maxParallel,
            supervised,
          })

          const jobName = `conductor-${Date.now()}`
          const result = await createConductorMission({
            name: jobName,
            prompt,
          })

          if (result.error) {
            return json({ ok: false, error: result.error }, { status: 502 })
          }

          // Dashboard-backed Conductor starts immediately. Legacy gateway-only
          // fallback still uses cron sessions keyed `cron_<jobId>_<timestamp>`.
          const jobId = result.id ?? jobName
          const dashboardBacked = Boolean(result.id && !result.sessionKeyPrefix)
          return json({
            ok: true,
            missionId: dashboardBacked ? jobId : null,
            sessionKey: result.sessionKey ?? (dashboardBacked ? null : `cron_${jobId}_pending`),
            sessionKeyPrefix: result.sessionKeyPrefix ?? (dashboardBacked ? null : `cron_${jobId}_`),
            jobId,
            jobName: result.name ?? jobName,
            runId: null,
          })
        } catch (error) {
          return json(
            {
              ok: false,
              error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
