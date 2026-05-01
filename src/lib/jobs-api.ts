/**
 * Jobs API client — talks to Hermes FastAPI /api/jobs endpoints.
 */

const HERMES_API = '/api/hermes-jobs'

export type HermesJob = {
  id: string
  name: string
  prompt: string
  schedule: Record<string, unknown>
  schedule_display?: string
  enabled: boolean
  state: string
  next_run_at?: string | null
  last_run_at?: string | null
  last_run_success?: boolean | null
  last_run_error?: string | null
  error?: string | null
  created_at?: string
  updated_at?: string
  deliver?: Array<string>
  skills?: Array<string>
  repeat?: { times?: number; completed?: number }
  run_count?: number
}

export type JobOutput = {
  filename: string
  timestamp: string
  content: string
  size: number
}

export function normalizeJobsResponse(data: unknown): Array<HermesJob> {
  if (Array.isArray(data)) return data
  if (
    typeof data === 'object' &&
    data !== null &&
    'jobs' in data &&
    Array.isArray(data.jobs)
  ) {
    return data.jobs as Array<HermesJob>
  }
  return []
}

export function findJobById(
  jobs: Array<HermesJob>,
  jobId: string | null | undefined,
): HermesJob | null {
  if (!jobId) return null
  return jobs.find((job) => job.id === jobId) ?? null
}

export function normalizeJobState(state: unknown): string | null {
  return typeof state === 'string' && state.trim() ? state.trim().toLowerCase() : null
}

export function isFailedJobState(state: unknown): boolean {
  const normalized = normalizeJobState(state)
  return (
    normalized === 'failed' ||
    normalized === 'error' ||
    normalized === 'errored' ||
    normalized === 'cancelled' ||
    normalized === 'canceled' ||
    normalized === 'aborted'
  )
}

export function isTerminalJobState(state: unknown): boolean {
  const normalized = normalizeJobState(state)
  return (
    normalized === 'completed' ||
    normalized === 'complete' ||
    normalized === 'succeeded' ||
    normalized === 'success' ||
    normalized === 'finished' ||
    normalized === 'done' ||
    isFailedJobState(normalized)
  )
}

export function getLatestJobOutputText(outputs: Array<JobOutput>): string {
  let latestContent = ''
  let latestTimestamp = Number.NEGATIVE_INFINITY

  for (const output of outputs) {
    const content = typeof output.content === 'string' ? output.content.trim() : ''
    if (!content) continue

    const timestamp = new Date(output.timestamp).getTime()
    if (!Number.isFinite(timestamp) || timestamp < latestTimestamp) continue

    latestTimestamp = timestamp
    latestContent = content
  }

  return latestContent
}

export function getJobErrorText(job: HermesJob | null | undefined): string | null {
  if (!job) return null

  const candidates = [job.last_run_error, job.error]
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim()
    }
  }

  return null
}

export async function fetchJobs(): Promise<Array<HermesJob>> {
  const res = await fetch(`${HERMES_API}?include_disabled=true`)
  if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`)
  const data = (await res.json()) as unknown
  return normalizeJobsResponse(data)
}

export async function createJob(input: {
  schedule: string
  prompt: string
  name?: string
  deliver?: Array<string>
  skills?: Array<string>
  repeat?: number
}): Promise<HermesJob> {
  const res = await fetch(HERMES_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || `Failed to create job: ${res.status}`)
  }
  return (await res.json()).job
}

export async function updateJob(
  jobId: string,
  updates: Record<string, unknown>,
): Promise<HermesJob> {
  const res = await fetch(`${HERMES_API}/${jobId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error(`Failed to update job: ${res.status}`)
  return (await res.json()).job
}

export async function deleteJob(jobId: string): Promise<void> {
  const res = await fetch(`${HERMES_API}/${jobId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Failed to delete job: ${res.status}`)
}

export async function pauseJob(jobId: string): Promise<HermesJob> {
  const res = await fetch(`${HERMES_API}/${jobId}?action=pause`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error(`Failed to pause job: ${res.status}`)
  return (await res.json()).job
}

export async function resumeJob(jobId: string): Promise<HermesJob> {
  const res = await fetch(`${HERMES_API}/${jobId}?action=resume`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error(`Failed to resume job: ${res.status}`)
  return (await res.json()).job
}

export async function triggerJob(jobId: string): Promise<HermesJob> {
  const res = await fetch(`${HERMES_API}/${jobId}?action=run`, {
    method: 'POST',
  })
  if (!res.ok) throw new Error(`Failed to trigger job: ${res.status}`)
  return (await res.json()).job
}

export async function fetchJobOutput(
  jobId: string,
  limit = 10,
): Promise<Array<JobOutput>> {
  const res = await fetch(`${HERMES_API}/${jobId}?action=output&limit=${limit}`)
  if (!res.ok) throw new Error(`Failed to fetch output: ${res.status}`)
  return (await res.json()).outputs ?? []
}
