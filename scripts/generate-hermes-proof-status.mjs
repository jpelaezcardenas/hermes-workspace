#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const AI_SYSTEMS = process.env.MAJESTIC12_ROOT || '/Users/majestic12/ai-systems'
const HERMES_HOME = process.env.HERMES_HOME || '/Users/majestic12/.hermes'
const CRON_DIR = join(HERMES_HOME, 'cron')
const JOBS_FILE = join(CRON_DIR, 'jobs.json')
const OUTPUT_DIR = join(CRON_DIR, 'output')
const STATE_DIR = join(AI_SYSTEMS, 'state')

function todayChicago() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date())
}

function safeJson(path) {
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf8'))
}

function normalizeJobs(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.jobs)) return payload.jobs
  if (payload && payload.jobs && typeof payload.jobs === 'object') return Object.values(payload.jobs)
  if (payload && typeof payload === 'object') return Object.values(payload).filter((v) => v && typeof v === 'object' && ('id' in v || 'job_id' in v))
  return []
}

async function fetchJson(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 2500)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return { ok: true, url, data: await res.json() }
  } catch (error) {
    return { ok: false, url, error: error instanceof Error ? error.message : String(error) }
  } finally {
    clearTimeout(timer)
  }
}

async function readJobs() {
  const sources = [
    'http://127.0.0.1:3000/api/hermes-jobs?include_disabled=true',
    'http://127.0.0.1:9119/api/cron/jobs?include_disabled=true',
    'http://127.0.0.1:8642/api/jobs?include_disabled=true',
  ]
  const attempts = []
  let selected = null
  for (const url of sources) {
    const attempt = await fetchJson(url)
    const jobs = attempt.ok ? normalizeJobs(attempt.data) : []
    attempts.push(attempt.ok ? { url, ok: true, job_count: jobs.length } : { url, ok: false, error: attempt.error })
    if (!selected && jobs.length > 0) selected = { jobs, source: url }
  }
  if (selected) return { ...selected, api_attempts: attempts, fallback_reason: null }

  let payload = null
  let localError = null
  try {
    payload = safeJson(JOBS_FILE)
  } catch (error) {
    localError = error instanceof Error ? error.message : String(error)
  }
  const fallbackReasons = attempts
    .filter((attempt) => !attempt.ok || attempt.job_count === 0)
    .map((attempt) => attempt.ok ? `${attempt.url}: no jobs` : `${attempt.url}: ${attempt.error}`)
  if (localError) fallbackReasons.push(`${JOBS_FILE}: ${localError}`)
  return {
    jobs: normalizeJobs(payload),
    source: JOBS_FILE,
    api_attempts: attempts,
    fallback_reason: fallbackReasons.join('; ') || 'API job sources unavailable or empty',
  }
}

function listOutputs(jobId) {
  const dir = join(OUTPUT_DIR, jobId)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md') || name.endsWith('.json') || name.endsWith('.txt'))
    .map((name) => {
      const path = join(dir, name)
      const st = statSync(path)
      return { path, filename: name, size: st.size, mtime: st.mtime.toISOString() }
    })
    .sort((a, b) => b.mtime.localeCompare(a.mtime))
}

function hasEvidence(text) {
  const lower = text.toLowerCase()
  return [
    '/users/majestic12/', 'http://', 'https://', 'source:', 'sources:', 'evidence',
    'ledger', 'api', '.json', '.md', '.yaml', '.yml', '.csv', '.db', 'sqlite',
  ].some((needle) => lower.includes(needle))
}

function hasApprovalGate(text) {
  const lower = text.toLowerCase()
  return ['approval', 'approve', 'wilson', 'proposal', 'gate', 'requires confirmation'].some((needle) => lower.includes(needle))
}

function laneForJob(job) {
  const name = String(job.name || '').toLowerCase()
  if (name.includes('janet') || name.includes('feynman')) return 'trading-intelligence'
  if (name.includes('research') || name.includes('curie')) return 'research-radar'
  if (name.includes('performance') || name.includes('waitzkin')) return 'performance-learning'
  if (name.includes('life') || name.includes('alfred')) return 'life-admin'
  if (name.includes('truth') || name.includes('scribe') || name.includes('curator')) return 'truth-infrastructure'
  if (name.includes('synthesis') || name.includes('alignment') || name.includes('reddington')) return 'council-synthesis'
  return 'operations'
}

function statusFor(job, latestOutput, content) {
  if (job.enabled === false || job.state === 'paused') return 'scheduled'
  if (!job.last_run_at && !job.lastRunAt) return 'scheduled'
  const success = job.last_run_success ?? job.lastRunSuccess ?? job.lastRun?.status
  if (success === false || success === 'error' || job.last_error || job.lastRunError) return 'failed'
  if (!latestOutput) return 'output_missing'
  if (!hasEvidence(content || '')) return 'evidence_missing'
  if (hasApprovalGate(content || '')) return 'approval_required'
  return 'ran_successfully'
}

function proofFailureReason(job, latestOutput, outputReadable, content, status) {
  if (status === 'ran_successfully') return null
  if (status === 'scheduled') return 'scheduled_or_no_last_run_at'
  if (status === 'failed') return job.last_error || job.lastRunError || job.lastRun?.error || 'last run failed'
  if (status === 'output_missing') return 'last_run_at present but no readable output artifact was found'
  if (status === 'evidence_missing') return 'output artifact exists but evidence markers were not detected'
  if (status === 'approval_required') return 'output contains proposal/approval-gate language and remains unproven until approved or classified'
  if (!latestOutput) return 'output_missing'
  if (!outputReadable) return 'output_unreadable'
  if (!hasEvidence(content || '')) return 'evidence_missing'
  return 'unproven_status'
}

function normalizeJob(job) {
  const jobId = String(job.id || job.job_id || job.jobId || '')
  const outputs = jobId ? listOutputs(jobId) : []
  const latest = outputs[0] || null
  let content = ''
  let outputReadable = false
  if (latest) {
    try {
      content = readFileSync(latest.path, 'utf8')
      outputReadable = true
    } catch {}
  }
  const schedule = typeof job.schedule === 'string'
    ? job.schedule
    : (job.schedule_display || job.schedule?.display || job.schedule?.expr || '')
  const status = statusFor(job, latest, content)
  const proven = status === 'ran_successfully'
  return {
    agent: String(job.name || '').split(' daily ')[0] || String(job.name || jobId),
    job_id: jobId,
    name: job.name || '',
    schedule,
    next_run_at: job.next_run_at || job.nextRunAt || null,
    last_run_at: job.last_run_at || job.lastRunAt || job.lastRun?.startedAt || null,
    last_run_success: job.last_run_success ?? job.lastRunSuccess ?? null,
    status,
    error: job.last_error || job.lastRunError || job.lastRun?.error || null,
    lane: laneForJob(job),
    output: latest ? { path: latest.path, size: latest.size, modified_at: latest.mtime } : null,
    proof_failure_reason: proofFailureReason(job, latest, outputReadable, content, status),
    intake_contract: {
      agent: String(job.name || '').split(' daily ')[0] || String(job.name || jobId),
      job_id: jobId,
      run_at: job.last_run_at || job.lastRunAt || null,
      lane: laneForJob(job),
      evidence: hasEvidence(content) ? ['detected in output'] : [],
      freshness_labels: [],
      truth_debt: [],
      recommendations: [],
      skill_candidates: [],
      approval_gates: hasApprovalGate(content) ? ['approval language detected'] : [],
    },
    checks: {
      proven,
      output_readable: outputReadable,
      evidence_present: latest ? hasEvidence(content) : false,
      proposal_first_guardrail: latest ? hasApprovalGate(content) || !/(sent|deleted|traded|placed order|created calendar|emailed)/i.test(content) : true,
    },
  }
}

function markdown(packet) {
  const lines = []
  lines.push(`# Hermes Jobs Proof Status — ${packet.generated_for}`)
  lines.push('')
  lines.push(`Generated: ${packet.generated_at}`)
  lines.push(`Source: ${packet.source}`)
  if (packet.fallback_reason) lines.push(`Fallback reason: ${packet.fallback_reason}`)
  if (packet.run_window) {
    lines.push(`Run window: ${packet.run_window.earliest_next_run_at ?? 'null'} → ${packet.run_window.latest_next_run_at ?? 'null'}`)
  }
  lines.push('')
  lines.push('## Summary')
  for (const [key, value] of Object.entries(packet.summary)) lines.push(`- ${key}: ${value}`)
  lines.push('')
  lines.push('## Intake Contract')
  lines.push('- agent')
  lines.push('- job_id')
  lines.push('- run_at')
  lines.push('- lane')
  lines.push('- evidence')
  lines.push('- freshness_labels')
  lines.push('- truth_debt')
  lines.push('- recommendations')
  lines.push('- skill_candidates')
  lines.push('- approval_gates')
  lines.push('')
  lines.push('## Jobs')
  for (const job of packet.jobs) {
    lines.push(`### ${job.name || job.job_id}`)
    lines.push(`- status: ${job.status}`)
    lines.push(`- job_id: ${job.job_id}`)
    lines.push(`- schedule: ${job.schedule}`)
    lines.push(`- next_run_at: ${job.next_run_at ?? 'null'}`)
    lines.push(`- last_run_at: ${job.last_run_at ?? 'null'}`)
    lines.push(`- error: ${job.error ?? 'null'}`)
    lines.push(`- output: ${job.output?.path ?? 'missing'}`)
    lines.push(`- evidence_present: ${job.checks.evidence_present}`)
    lines.push(`- proven: ${job.checks.proven}`)
    lines.push(`- proof_failure_reason: ${job.proof_failure_reason ?? 'null'}`)
  }
  return lines.join('\n') + '\n'
}

export async function generateHermesProofStatus({ write = true, date = null } = {}) {
  const { jobs, source, api_attempts, fallback_reason } = await readJobs()
  if (!date) {
    const next = jobs
      .map((job) => job.next_run_at || job.nextRunAt)
      .filter(Boolean)
      .sort()[0]
    date = next ? String(next).slice(0, 10) : todayChicago()
  }
  const normalized = jobs.map(normalizeJob).sort((a, b) => String(a.next_run_at || '').localeCompare(String(b.next_run_at || '')))
  const summary = normalized.reduce((acc, job) => {
    acc.total += 1
    acc[job.status] = (acc[job.status] || 0) + 1
    if (!job.checks.proven) acc.unproven += 1
    return acc
  }, { total: 0, scheduled: 0, ran_successfully: 0, failed: 0, output_missing: 0, evidence_missing: 0, approval_required: 0, unproven: 0 })
  const packet = {
    type: 'hermes_jobs_proof_status',
    generated_at: new Date().toISOString(),
    generated_for: date,
    source,
    api_attempts,
    api_liveness: Object.fromEntries(api_attempts.map((attempt) => [
      attempt.url,
      { live: attempt.ok, job_count: attempt.job_count ?? 0, error: attempt.error ?? null },
    ])),
    fallback_reason,
    run_window: {
      requested_date: date,
      earliest_next_run_at: normalized.map((job) => job.next_run_at).filter(Boolean).sort()[0] || null,
      latest_next_run_at: normalized.map((job) => job.next_run_at).filter(Boolean).sort().at(-1) || null,
      jobs_with_last_run_at: normalized.filter((job) => Boolean(job.last_run_at)).length,
      jobs_without_last_run_at: normalized.filter((job) => !job.last_run_at).length,
    },
    paths: { jobs_file: JOBS_FILE, output_dir: OUTPUT_DIR, state_dir: STATE_DIR },
    summary,
    jobs: normalized,
  }
  if (write) {
    mkdirSync(STATE_DIR, { recursive: true })
    writeFileSync(join(STATE_DIR, `hermes_jobs_proof_status_${date}.json`), JSON.stringify(packet, null, 2) + '\n')
    writeFileSync(join(STATE_DIR, `hermes_jobs_proof_status_${date}.md`), markdown(packet))
    writeFileSync(join(STATE_DIR, 'hermes_output_intake_contract.md'), `# Hermes Output Intake Contract\n\nEvery local agent run should produce proposal-first output with these fields:\n\n- agent\n- job_id\n- run_at\n- lane\n- evidence\n- freshness_labels\n- truth_debt\n- recommendations\n- skill_candidates\n- approval_gates\n\nExternal-world actions remain approval-gated: no email, calendar, reminders, trades, deletes, launchd, port exposure, or protected file edits without Wilson approval.\n`)
  }
  return packet
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const dateArg = process.argv.find((arg) => arg.startsWith('--date='))?.slice('--date='.length)
  const envDate = process.env.HERMES_PROOF_DATE
  const date = dateArg || envDate || null
  const packet = await generateHermesProofStatus({ write: true, date })
  console.log(JSON.stringify(packet, null, 2))
}
