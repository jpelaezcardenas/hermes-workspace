import { execFile } from 'node:child_process'
import { readdir, stat } from 'node:fs/promises'
import { basename, join, relative } from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

export type N8nInstanceId = 'personal-bigmac' | 'business-devserver'

export type N8nHealth = {
  ok: boolean
  detail: string
  checkedAt: string
  latencyMs?: number
}

export type N8nFailureSummary = {
  workflowName: string
  status: string
  lastSeen: string
  count: number
  instance: N8nInstanceId
}

export type PromotionReceiptSummary = {
  title: string
  path: string
  updatedAt: string
  instance: N8nInstanceId | 'unknown'
}

export type SafeWorkflowCommand = {
  id: string
  label: string
  description: string
  owningInstance: N8nInstanceId
  riskLevel:
    | 'read_only'
    | 'reversible_local'
    | 'external_send'
    | 'production_mutation'
    | 'destructive'
  approvalRequired: boolean
  dryRunSupported: boolean
  sideEffects: string
  rollback: string
  status: 'available' | 'planned' | 'approval_gated'
}

export type N8nInstanceGovernance = {
  id: N8nInstanceId
  label: string
  scope: string
  access: string
  boundary: string
  health: N8nHealth
  failures: Array<N8nFailureSummary>
}

export type N8nGovernanceResponse = {
  ok: boolean
  generatedAt: string
  boundary: string
  instances: Array<N8nInstanceGovernance>
  promotionReceipts: Array<PromotionReceiptSummary>
  safeWorkflowCommands: Array<SafeWorkflowCommand>
  guardrails: Array<string>
}

const FAILURE_STATUSES = "('error','crashed','failed')"

export function scrubSensitiveText(value: string): string {
  return value
    .replace(/(PGPASSWORD=)[^\s;]+/gi, '$1***')
    .replace(
      /(password|passwd|secret|token|api[_-]?key|bearer)\s*[:=]\s*[^\s,;]+/gi,
      '$1=***',
    )
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer ***')
    .slice(0, 500)
}

async function commandHealth(
  label: string,
  command: string,
  args: Array<string>,
  timeout = 4500,
): Promise<N8nHealth> {
  const start = Date.now()
  try {
    const { stdout } = await execFileAsync(command, args, {
      timeout,
      maxBuffer: 32_000,
    })
    const detail = stdout.trim() || `${label} ok`
    return {
      ok: true,
      detail: scrubSensitiveText(detail),
      checkedAt: new Date().toISOString(),
      latencyMs: Date.now() - start,
    }
  } catch (error) {
    return {
      ok: false,
      detail: scrubSensitiveText(
        error instanceof Error ? error.message : String(error),
      ),
      checkedAt: new Date().toISOString(),
      latencyMs: Date.now() - start,
    }
  }
}

async function httpHealth(url: string): Promise<N8nHealth> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)
    const body = await response.text().catch(() => '')
    return {
      ok: response.ok,
      detail: scrubSensitiveText(body || `HTTP ${response.status}`),
      checkedAt: new Date().toISOString(),
      latencyMs: Date.now() - start,
    }
  } catch (error) {
    return {
      ok: false,
      detail: scrubSensitiveText(
        error instanceof Error ? error.message : String(error),
      ),
      checkedAt: new Date().toISOString(),
      latencyMs: Date.now() - start,
    }
  }
}

function parseFailureRows(
  text: string,
  instance: N8nInstanceId,
): Array<N8nFailureSummary> {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((line) => {
      const [
        workflowName = 'Unknown workflow',
        status = 'unknown',
        lastSeen = '',
        count = '0',
      ] = line.split('\t')
      return {
        workflowName: scrubSensitiveText(workflowName),
        status: scrubSensitiveText(status),
        lastSeen: scrubSensitiveText(lastSeen),
        count: Number.parseInt(count, 10) || 0,
        instance,
      }
    })
}

async function queryPersonalFailures(): Promise<Array<N8nFailureSummary>> {
  const sql = `select coalesce(w.name,'Unknown workflow') as workflow_name, e.status, max(e."startedAt") as last_seen, count(*) from execution_entity e left join workflow_entity w on e."workflowId"=w.id where e.status in ${FAILURE_STATUSES} and e."startedAt" > now() - interval '7 days' group by 1,2 order by last_seen desc limit 8;`
  const script = `set -euo pipefail
ENV_FILE="$HOME/docker/n8n-devserver/.env"
if [ -f "$ENV_FILE" ]; then set -a; . "$ENV_FILE" >/dev/null 2>&1 || true; set +a; fi
DB_NAME="${'${POSTGRES_DB:-${DB_POSTGRESDB_DATABASE:-n8n}}'}"
DB_USER="${'${POSTGRES_USER:-${DB_POSTGRESDB_USER:-n8n}}'}"
DB_PORT="${'${POSTGRES_PORT:-15433}'}"
export PGPASSWORD="${'${POSTGRES_PASSWORD:-${DB_POSTGRESDB_PASSWORD:-}}'}"
psql -h 127.0.0.1 -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -A -F $'\t' -P pager=off -c ${JSON.stringify(sql)}`
  try {
    const { stdout } = await execFileAsync('/bin/bash', ['-lc', script], {
      timeout: 5000,
      maxBuffer: 64_000,
    })
    return parseFailureRows(stdout, 'personal-bigmac')
  } catch {
    return []
  }
}

async function queryBusinessFailures(): Promise<Array<N8nFailureSummary>> {
  const sql = `select coalesce(w.name,'Unknown workflow') as workflow_name, e.status, max(e."startedAt") as last_seen, count(*) from execution_entity e left join workflow_entity w on e."workflowId"=w.id where e.status in ${FAILURE_STATUSES} and e."startedAt" > now() - interval '7 days' group by 1,2 order by last_seen desc limit 8;`
  const remote = `DB_NAME=$(docker exec n8n-main printenv DB_POSTGRESDB_DATABASE); DB_USER=$(docker exec n8n-main printenv DB_POSTGRESDB_USER); DB_PASS=$(docker exec n8n-main printenv DB_POSTGRESDB_PASSWORD); docker exec -e PGPASSWORD="$DB_PASS" postgres psql -U "$DB_USER" -d "$DB_NAME" -t -A -F $'\t' -P pager=off -c ${JSON.stringify(sql)}`
  try {
    const { stdout } = await execFileAsync('ssh', ['devserver-tg', remote], {
      timeout: 8000,
      maxBuffer: 64_000,
    })
    return parseFailureRows(stdout, 'business-devserver')
  } catch {
    return []
  }
}

const RECEIPT_ROOTS = [
  '/Users/cderamos/.hermes',
  '/Users/cderamos/.codex/knowledge-vault/artifacts',
  '/Users/cderamos/StorageRuntime/hermes-workspace-cael',
]

function inferReceiptInstance(
  path: string,
): PromotionReceiptSummary['instance'] {
  const lower = path.toLowerCase()
  if (
    lower.includes('business') ||
    lower.includes('dev-server') ||
    lower.includes('devserver')
  )
    return 'business-devserver'
  if (
    lower.includes('personal') ||
    lower.includes('bigmac') ||
    lower.includes('cael') ||
    lower.includes('n8n')
  )
    return 'personal-bigmac'
  return 'unknown'
}

export function summarizeReceiptPath(
  path: string,
  mtime: Date,
): PromotionReceiptSummary {
  return {
    title: basename(path).replace(/[-_]/g, ' ').replace(/\.md$/i, ''),
    path,
    updatedAt: mtime.toISOString(),
    instance: inferReceiptInstance(path),
  }
}

async function collectReceiptPaths(
  root: string,
  depth = 0,
): Promise<Array<PromotionReceiptSummary>> {
  if (depth > 4) return []
  let entries: Awaited<ReturnType<typeof readdir>> = []
  try {
    entries = await readdir(root, { withFileTypes: true })
  } catch {
    return []
  }

  const receipts: Array<PromotionReceiptSummary> = []
  for (const entry of entries) {
    if (entry.name.startsWith('.') && depth > 0) continue
    if (
      entry.name === 'node_modules' ||
      entry.name === 'dist' ||
      entry.name === '.git'
    )
      continue
    const fullPath = join(root, entry.name)
    if (entry.isDirectory()) {
      receipts.push(...(await collectReceiptPaths(fullPath, depth + 1)))
      continue
    }
    const lower = entry.name.toLowerCase()
    if (!lower.endsWith('.md')) continue
    if (!lower.includes('receipt') && !lower.includes('promotion')) continue
    if (
      !lower.includes('n8n') &&
      !lower.includes('workflow') &&
      !lower.includes('cael')
    )
      continue
    try {
      const info = await stat(fullPath)
      receipts.push(summarizeReceiptPath(fullPath, info.mtime))
    } catch {
      // Ignore unreadable files; the panel should degrade safely.
    }
  }
  return receipts
}

export async function collectPromotionReceipts(): Promise<
  Array<PromotionReceiptSummary>
> {
  const nested = await Promise.all(
    RECEIPT_ROOTS.map((root) => collectReceiptPaths(root)),
  )
  return nested
    .flat()
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 8)
}

export function getN8nCommandRegistry(): Array<SafeWorkflowCommand> {
  return [
    {
      id: 'refresh-n8n-inventory',
      label: 'Refresh n8n inventory snapshot',
      description:
        'Read-only workflow / credential / execution counts for the selected estate.',
      owningInstance: 'personal-bigmac',
      riskLevel: 'read_only',
      approvalRequired: false,
      dryRunSupported: true,
      sideEffects: 'None; read-only SQL and health checks only.',
      rollback: 'No mutation; clear the generated receipt if it is wrong.',
      status: 'planned',
    },
    {
      id: 'open-failure-triage',
      label: 'Open failure triage',
      description:
        'Create a review packet with workflow name, execution id, node, and error class without dumping payloads.',
      owningInstance: 'personal-bigmac',
      riskLevel: 'read_only',
      approvalRequired: false,
      dryRunSupported: true,
      sideEffects: 'Writes a local receipt only; no workflow mutation.',
      rollback: 'Delete the local receipt packet.',
      status: 'planned',
    },
    {
      id: 'business-dry-run-smoke',
      label: 'Business workflow dry-run smoke',
      description:
        'Approval-gated dev-server dry-run using test payloads before any production activation.',
      owningInstance: 'business-devserver',
      riskLevel: 'production_mutation',
      approvalRequired: true,
      dryRunSupported: true,
      sideEffects:
        'May touch dev-server logs/receipts; must not activate production workflows from the UI.',
      rollback:
        'Disable the imported workflow and restore the previous inactive JSON/version.',
      status: 'approval_gated',
    },
  ]
}

export async function buildN8nGovernanceResponse(): Promise<N8nGovernanceResponse> {
  const [
    personalHealth,
    businessHealth,
    personalFailures,
    businessFailures,
    promotionReceipts,
  ] = await Promise.all([
    httpHealth('http://127.0.0.1:5681/healthz'),
    commandHealth(
      'Business n8n',
      'ssh',
      ['devserver-tg', 'curl -fsS --max-time 4 http://127.0.0.1:5678/healthz'],
      7000,
    ),
    queryPersonalFailures(),
    queryBusinessFailures(),
    collectPromotionReceipts(),
  ])

  const instances: Array<N8nInstanceGovernance> = [
    {
      id: 'personal-bigmac',
      label: 'Personal BigMac n8n',
      scope:
        'Personal/Mac-local automations, Personal Brain, Fireflies, Google/Apple, and local command-center support.',
      access:
        'BigMac localhost 127.0.0.1:5681; exposed to Cael only through server-side checks.',
      boundary:
        'Personal estate only; do not mix with Visual Graphx production credentials or payloads.',
      health: personalHealth,
      failures: personalFailures,
    },
    {
      id: 'business-devserver',
      label: 'Business dev-server n8n',
      scope:
        'Visual Graphx / OPS / catalog / proof / production workflows on the dev-server estate.',
      access:
        'Twingate SSH alias devserver-tg; n8n health checked on dev-server localhost 127.0.0.1:5678.',
      boundary:
        'Business estate only; production activation stays gated by validation, receipt, and rollback notes.',
      health: businessHealth,
      failures: businessFailures,
    },
  ]

  return {
    ok: instances.every((instance) => instance.health.ok),
    generatedAt: new Date().toISOString(),
    boundary:
      'BigMac personal n8n and Visual Graphx business/dev-server n8n are rendered as separate estates. UI actions use a command registry; no frontend button calls arbitrary n8n webhooks or exposes secrets.',
    instances,
    promotionReceipts,
    safeWorkflowCommands: getN8nCommandRegistry(),
    guardrails: [
      'No raw credentials, OAuth tokens, service keys, env values, or execution payloads are returned by this API.',
      'Read-only health/failure checks are allowed; production activation remains approval-gated.',
      'Reusable automation should be called through documented Execute Workflow subflows, not duplicated node chains.',
      'Every live promotion needs validation evidence, expected outputs, and rollback/disable notes.',
    ],
  }
}

export function receiptPathForDisplay(path: string): string {
  for (const root of RECEIPT_ROOTS) {
    const rel = relative(root, path)
    if (rel && !rel.startsWith('..')) return `${root}/…/${rel}`
  }
  return path
}
