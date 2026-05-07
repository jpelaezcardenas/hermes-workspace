#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { generateHermesProofStatus } from './generate-hermes-proof-status.mjs'

const AI_SYSTEMS = process.env.MAJESTIC12_ROOT || '/Users/majestic12/ai-systems'
const HERMES_HOME = process.env.HERMES_HOME || '/Users/majestic12/.hermes'
const STATE_DIR = join(AI_SYSTEMS, 'state')
const JOBS_FILE = join(HERMES_HOME, 'cron', 'jobs.json')
const OUTPUT_DIR = join(HERMES_HOME, 'cron', 'output')

function todayChicago() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date())
}

async function probe(url) {
  const controller = new AbortController()
  const started = Date.now()
  const timer = setTimeout(() => controller.abort(), 3000)
  try {
    const res = await fetch(url, { signal: controller.signal })
    const text = await res.text()
    return { url, live: res.ok, status: res.status, ms: Date.now() - started, sample: text.slice(0, 180) }
  } catch (error) {
    return { url, live: false, ms: Date.now() - started, error: error instanceof Error ? error.message : String(error) }
  } finally {
    clearTimeout(timer)
  }
}

function invariantFailures(packet) {
  const failures = []
  for (const job of packet.jobs || []) {
    if (job.checks?.proven !== (job.status === 'ran_successfully')) {
      failures.push(`${job.job_id}: checks.proven=${job.checks?.proven} while status=${job.status}`)
    }
    if (['output_missing', 'evidence_missing', 'approval_required', 'failed', 'scheduled'].includes(job.status) && job.checks?.proven) {
      failures.push(`${job.job_id}: unproven status marked proven (${job.status})`)
    }
    if (job.status !== 'ran_successfully' && !job.proof_failure_reason) {
      failures.push(`${job.job_id}: missing proof_failure_reason for ${job.status}`)
    }
  }
  return failures
}

const requestedDate = process.argv.find((arg) => arg.startsWith('--date='))?.slice('--date='.length) || todayChicago()
const packet = await generateHermesProofStatus({ write: false, date: requestedDate })
const artifactJson = join(STATE_DIR, `hermes_jobs_proof_status_${requestedDate}.json`)
const artifactMd = join(STATE_DIR, `hermes_jobs_proof_status_${requestedDate}.md`)
const probes = await Promise.all([
  probe('http://127.0.0.1:3000/api/hermes-jobs'),
  probe(`http://127.0.0.1:3000/api/hermes-proof-status?date=${requestedDate}`),
  probe('http://127.0.0.1:9119/api/cron/jobs'),
  probe('http://127.0.0.1:8642/api/jobs'),
])
const failures = invariantFailures(packet)
const result = {
  type: 'hermes_proof_loop_verification',
  checked_at: new Date().toISOString(),
  requested_date: requestedDate,
  paths: {
    jobs_file: JOBS_FILE,
    output_dir: OUTPUT_DIR,
    artifact_json: artifactJson,
    artifact_md: artifactMd,
  },
  path_exists: {
    jobs_file: existsSync(JOBS_FILE),
    output_dir: existsSync(OUTPUT_DIR),
    artifact_json: existsSync(artifactJson),
    artifact_md: existsSync(artifactMd),
  },
  artifact_sizes: {
    artifact_json: existsSync(artifactJson) ? statSync(artifactJson).size : 0,
    artifact_md: existsSync(artifactMd) ? statSync(artifactMd).size : 0,
  },
  summary: packet.summary,
  run_window: packet.run_window,
  api_liveness: packet.api_liveness,
  route_probes: probes.map(({ sample, ...rest }) => rest),
  invariant_failures: failures,
  ok: failures.length === 0 && existsSync(JOBS_FILE),
}
console.log(JSON.stringify(result, null, 2))
if (!result.ok) process.exit(1)
