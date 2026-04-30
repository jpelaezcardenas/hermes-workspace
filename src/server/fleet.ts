import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readdir, readFile, stat } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import YAML from 'yaml'

const execFileAsync = promisify(execFile)
const DEFAULT_TIMEOUT_MS = 8_000

type RawFleetNode = {
  id?: string
  name?: string
  kind?: FleetNodeKind
  host?: string
  address?: string
  user?: string
  key_path?: string
  hermes_home?: string
  gateway_url?: string
  workspace_url?: string
  parent?: string
  container?: string
  notes?: string
}

export type FleetNodeKind =
  | 'hermes-local'
  | 'hermes-container'
  | 'host'
  | 'openclaw'
  | 'orchestrator'

export type FleetStatus = 'healthy' | 'degraded' | 'offline' | 'unknown'

export type FleetNode = {
  id: string
  name: string
  kind: FleetNodeKind
  host: string
  address?: string
  user?: string
  keyPath?: string
  hermesHome?: string
  gatewayUrl?: string
  workspaceUrl?: string
  parent?: string
  container?: string
  notes?: string
  status: FleetStatus
}

export type FleetCronItem = {
  id: string
  name: string
  status: string
  schedule?: string
  nextRun?: string
  lastRun?: string
  lastRunStatus?: string
}

export type FleetCronSummary = {
  total: number
  active: number
  paused: number
  failedRecent: number
  items: Array<FleetCronItem>
}

export type FleetNodeStatus = FleetNode & {
  lastSeen: string | null
  uptime?: string
  version?: string
  model?: string
  provider?: string
  image?: string
  dockerStatus?: string
  cron?: FleetCronSummary
  recentErrors: Array<string>
  checks: Array<{ label: string; ok: boolean; detail?: string }>
}

export type FleetSummary = Record<FleetStatus | 'total', number>

export type FleetStatusPayload = {
  generatedAt: string
  registryPath: string
  summary: FleetSummary
  nodes: Array<FleetNodeStatus>
}

export type FleetLogSource = {
  label: string
  kind: 'file' | 'docker' | 'command' | 'note'
  source: string
  ok: boolean
  content: string
}

export type FleetNodeDetailPayload = {
  generatedAt: string
  registryPath: string
  node: FleetNodeStatus
  parent?: FleetNodeStatus
  logs: Array<FleetLogSource>
}

export type FleetCronDashboardJob = FleetCronItem & {
  nodeId: string
  nodeName: string
  nodeStatus: FleetStatus
  nodeKind: FleetNodeKind
  outputPreview?: string
  style: {
    tone: 'human' | 'systemish' | 'unknown'
    score: number
    reasons: Array<string>
  }
}

export type FleetCronDashboardPayload = {
  generatedAt: string
  registryPath: string
  summary: Pick<FleetCronSummary, 'total' | 'active' | 'paused' | 'failedRecent'>
  jobs: Array<FleetCronDashboardJob>
}

type RawCronJob = {
  id: string
  name?: string
  prompt?: string
  skills?: Array<string>
  skill?: string | null
  model?: { provider?: string; model?: string } | string | null
  provider?: string | null
  schedule_display?: string
  schedule?: { display?: string; expr?: string }
  enabled?: boolean
  state?: string
  next_run_at?: string
  last_run_at?: string
  last_status?: string
  last_error?: string | null
  last_delivery_error?: string | null
  deliver?: string
  origin?: { platform?: string; chat_id?: string; chat_name?: string; thread_id?: string | null }
}

export type FleetCronLatestOutput = {
  path: string
  runTime?: string
  prompt?: string
  response: string
  raw: string
}

export type FleetCronDetailPayload = {
  generatedAt: string
  registryPath: string
  node: Pick<FleetNodeStatus, 'id' | 'name' | 'kind' | 'status'>
  job: FleetCronDashboardJob & {
    prompt?: string
    skills: Array<string>
    model?: string
    provider?: string
    deliveryTarget: string
    lastError?: string | null
    lastDeliveryError?: string | null
  }
  latestOutput?: FleetCronLatestOutput
  style: FleetCronDashboardJob['style']
  suggestedHumanSummary: string
}

type DockerContainerState = {
  name: string
  status: string
  image: string
  running: boolean
  healthy: boolean
}

function expandHome(value?: string): string | undefined {
  if (!value) return value
  if (value === '~') return os.homedir()
  if (value.startsWith('~/')) return path.join(os.homedir(), value.slice(2))
  return value
}

export function readFleetRegistryFromText(text: string): { nodes: Array<FleetNode> } {
  const parsed = YAML.parse(text) as { nodes?: Array<RawFleetNode> } | null
  const rawNodes = Array.isArray(parsed?.nodes) ? parsed.nodes : []

  return {
    nodes: rawNodes
      .filter((node) => node.id && node.name && node.kind)
      .map((node) => ({
        id: node.id!,
        name: node.name!,
        kind: node.kind!,
        host: node.host || 'unknown',
        address: node.address,
        user: node.user,
        keyPath: expandHome(node.key_path),
        hermesHome: expandHome(node.hermes_home),
        gatewayUrl: node.gateway_url,
        workspaceUrl: node.workspace_url,
        parent: node.parent,
        container: node.container,
        notes: node.notes,
        status: 'unknown' as const,
      })),
  }
}

export function parseDockerPsLines(lines: Array<string>): Map<string, DockerContainerState> {
  const containers = new Map<string, DockerContainerState>()
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const [name, status, image] = trimmed.split('|')
    if (!name || !status) continue
    const running = status.startsWith('Up')
    const healthy = running && !status.includes('unhealthy') && (status.includes('(healthy)') || !status.includes('health:'))
    containers.set(name, {
      name,
      status,
      image: image || 'unknown',
      running,
      healthy,
    })
  }
  return containers
}

export function parseHermesCronList(output: string): FleetCronSummary {
  const items: Array<FleetCronItem> = []
  let current: FleetCronItem | null = null

  for (const rawLine of output.split('\n')) {
    const line = rawLine.trimEnd()
    const jobMatch = line.match(/^\s*([a-f0-9]{8,})\s+\[([^\]]+)\]/i)
    if (jobMatch) {
      if (current) items.push(current)
      current = { id: jobMatch[1], status: jobMatch[2], name: jobMatch[1] }
      continue
    }
    if (!current) continue

    const fieldMatch = line.match(/^\s*(Name|Schedule|Next run|Last run):\s+(.*)$/)
    if (!fieldMatch) continue
    const [, key, value] = fieldMatch
    if (key === 'Name') current.name = value.trim()
    if (key === 'Schedule') current.schedule = value.trim()
    if (key === 'Next run') current.nextRun = value.trim()
    if (key === 'Last run') {
      const parts = value.trim().split(/\s+/)
      current.lastRunStatus = parts.at(-1)
      current.lastRun = parts.slice(0, -1).join(' ') || value.trim()
    }
  }
  if (current) items.push(current)

  return summarizeCronItems(items)
}

function summarizeCronItems(items: Array<FleetCronItem>): FleetCronSummary {
  return {
    total: items.length,
    active: items.filter((item) => item.status === 'active').length,
    paused: items.filter((item) => item.status === 'paused').length,
    failedRecent: items.filter((item) => item.lastRunStatus === 'failed').length,
    items,
  }
}

export function cronSummaryFromRawJobs(jobs: Array<RawCronJob>): FleetCronSummary {
  return summarizeCronItems(
    jobs.map((job) => ({
      id: job.id,
      name: job.name || job.id,
      status: job.enabled === false || job.state === 'paused' ? 'paused' : 'active',
      schedule: job.schedule_display || job.schedule?.display || job.schedule?.expr,
      nextRun: job.next_run_at,
      lastRun: job.last_run_at,
      lastRunStatus: job.last_status,
    })),
  )
}

export function buildFleetSummary(nodes: Array<Pick<FleetNodeStatus, 'status'>>): FleetSummary {
  return {
    total: nodes.length,
    healthy: nodes.filter((node) => node.status === 'healthy').length,
    degraded: nodes.filter((node) => node.status === 'degraded').length,
    offline: nodes.filter((node) => node.status === 'offline').length,
    unknown: nodes.filter((node) => node.status === 'unknown').length,
  }
}

export function classifyCronOutputStyle(output?: string | null): FleetCronDashboardJob['style'] {
  const text = (output || '').trim()
  if (!text) return { tone: 'unknown', score: 0, reasons: ['no output preview'] }

  const checks: Array<[boolean, string]> = [
    [/Cronjob Response:|^#\s*Cron Job:/im.test(text), 'cron wrapper visible'],
    [/\bjob_id\b|\*\*Job ID:\*\*/i.test(text), 'job id exposed'],
    [/^-{5,}$/m.test(text), 'separator line exposed'],
    [/[📕📗📙]/.test(text), 'status-book emoji framing'],
    [/^##\s*(Prompt|Response)\b|^###\s*Orchestrator Output\b/im.test(text), 'internal prompt/output sections exposed'],
    [/•\s*(job_id|last_updated|Appended|Connected successfully)/i.test(text), 'implementation details exposed'],
    [/The command ran successfully\. Here is the result:/i.test(text), 'tool execution narration exposed'],
    [text.length > 900, 'too long for delivery surface'],
  ]
  const reasons = checks.filter(([matched]) => matched).map(([, reason]) => reason)
  const score = reasons.length
  return { tone: score >= 2 ? 'systemish' : 'human', score, reasons }
}

export function buildFleetCronDashboard(nodes: Array<FleetNodeStatus>): Pick<FleetCronDashboardPayload, 'summary' | 'jobs'> {
  const jobs = nodes.flatMap((node) =>
    (node.cron?.items || []).map((job) => ({
      ...job,
      nodeId: node.id,
      nodeName: node.name,
      nodeStatus: node.status,
      nodeKind: node.kind,
      style: classifyCronOutputStyle(job.name),
    })),
  )
  return {
    summary: {
      total: jobs.length,
      active: jobs.filter((job) => job.status === 'active').length,
      paused: jobs.filter((job) => job.status === 'paused').length,
      failedRecent: jobs.filter((job) => job.lastRunStatus === 'failed').length,
    },
    jobs: jobs.sort((a, b) => {
      if (a.lastRunStatus === 'failed' && b.lastRunStatus !== 'failed') return -1
      if (a.lastRunStatus !== 'failed' && b.lastRunStatus === 'failed') return 1
      return a.name.localeCompare(b.name)
    }),
  }
}

function extractMarkdownSection(markdown: string, heading: string): string {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = markdown.match(new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=^## |\\Z)`, 'm'))
  return match?.[1]?.trim() || ''
}

function modelLabel(model: RawCronJob['model'], provider?: string | null): { model?: string; provider?: string } {
  if (!model) return { provider: provider || undefined }
  if (typeof model === 'string') return { model, provider: provider || undefined }
  return { model: model.model, provider: model.provider || provider || undefined }
}

function deliveryTarget(job: RawCronJob): string {
  if (job.origin?.platform) return `${job.origin.platform}:${job.origin.chat_name || job.origin.chat_id || 'origin'}`
  return job.deliver || 'local'
}

export function buildCronDetailFromJob({
  job,
  node,
  latestOutput,
  outputPath,
  registryPath = getFleetRegistryPath(),
}: {
  job: RawCronJob
  node: FleetNodeStatus
  latestOutput?: string
  outputPath?: string
  registryPath?: string
}): FleetCronDetailPayload {
  const redactedRaw = latestOutput ? redactSensitiveText(latestOutput) : ''
  const response = latestOutput ? redactSensitiveText(extractMarkdownSection(latestOutput, 'Response') || latestOutput) : ''
  const promptFromOutput = latestOutput ? redactSensitiveText(extractMarkdownSection(latestOutput, 'Prompt')) : undefined
  const runTime = latestOutput?.match(/\*\*Run Time:\*\*\s+(.+)/)?.[1]?.trim()
  const style = classifyCronOutputStyle(response || job.name)
  const labels = modelLabel(job.model, job.provider)
  const dashboardJob: FleetCronDashboardJob = {
    id: job.id,
    name: job.name || job.id,
    status: job.enabled === false ? 'paused' : job.state === 'paused' ? 'paused' : 'active',
    schedule: job.schedule_display || job.schedule?.display || job.schedule?.expr,
    nextRun: job.next_run_at,
    lastRun: job.last_run_at,
    lastRunStatus: job.last_status,
    nodeId: node.id,
    nodeName: node.name,
    nodeStatus: node.status,
    nodeKind: node.kind,
    outputPreview: response ? tailText(response, 8) : undefined,
    style,
  }

  return {
    generatedAt: new Date().toISOString(),
    registryPath,
    node: { id: node.id, name: node.name, kind: node.kind, status: node.status },
    job: {
      ...dashboardJob,
      prompt: job.prompt,
      skills: [...(job.skills || []), ...(job.skill ? [job.skill] : [])],
      model: labels.model,
      provider: labels.provider,
      deliveryTarget: deliveryTarget(job),
      lastError: job.last_error,
      lastDeliveryError: job.last_delivery_error,
    },
    latestOutput: latestOutput
      ? {
          path: outputPath || '',
          runTime,
          prompt: promptFromOutput,
          response,
          raw: redactedRaw,
        }
      : undefined,
    style,
    suggestedHumanSummary: suggestHumanCronSummary(response || job.name),
  }
}

function suggestHumanCronSummary(output: string): string {
  const text = output.trim()
  const codeBlock = text.match(/```\s*\n([\s\S]*?)\n```/)
  const source = codeBlock?.[1]?.trim() || text
  const lines = source
    .split('\n')
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)
    .filter((line) => !/^(Cronjob Response|job_id|Job ID|Run Time|Schedule|Prompt|Response|[-]{5,})/i.test(line))
    .filter((line) => !/^\(?job_id:/i.test(line))
  const meaningful = lines.find((line) => /diary updated|sessions?|turns?|morgan|open/i.test(line)) || lines[0]
  if (!meaningful) return 'Done. No user-facing summary was available.'
  return meaningful.replace(/\bjob_id\b[^\n]*/gi, '').trim()
}

export function findFleetNode<T extends { id: string }>(nodes: Array<T>, nodeId: string | null | undefined): T | null {
  if (!nodeId) return null
  return nodes.find((node) => node.id === nodeId) || null
}

export function redactSensitiveText(text: string): string {
  return text
    .replace(/\b(authorization\s*:\s*bearer)\s+[^\s]+/gi, '$1 [REDACTED]')
    .replace(
      /\b([A-Z0-9_]*(?:API[_-]?KEY|TOKEN|SECRET|PASSWORD|PASS)[A-Z0-9_]*|password)\s*([:=])\s*(['"]?)[^\s'";]+\3/gi,
      (_match, key: string, separator: string) => `${key}${separator}${separator === ':' ? ' ' : ''}[REDACTED]`,
    )
}

function tailText(text: string, lineCount: number): string {
  return text.split('\n').slice(-lineCount).join('\n').trimEnd()
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

async function runCommand(command: string, args: Array<string>, timeout = DEFAULT_TIMEOUT_MS) {
  try {
    const { stdout, stderr } = await execFileAsync(resolveExecutable(command), args, {
      timeout,
      maxBuffer: 1024 * 512,
    })
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

function defaultRegistryText(): string {
  return `nodes:
  - id: pierre-local
    name: Pierre / Local Hermes
    kind: hermes-local
    host: local
    hermes_home: ~/.hermes
    gateway_url: http://127.0.0.1:8642
    workspace_url: http://127.0.0.1:8643

  - id: morgan-vps
    name: morgan-prod-01
    kind: host
    host: ssh
    address: 46.225.149.254
    user: bressane
    key_path: ~/.ssh/id_hermes_morgan

  - id: morgan-agent
    name: Morgan
    kind: hermes-container
    host: docker
    parent: morgan-vps
    container: morgan-hermes
    hermes_home: /workspace/.hermes

  - id: maya-round6
    name: Maya / Round 6
    kind: hermes-container
    host: docker
    parent: morgan-vps
    container: round6-hermes
    hermes_home: /workspace/.hermes

  - id: openclaw-local
    name: OpenClaw Local
    kind: openclaw
    host: local
`
}

export function getFleetRegistryPath(): string {
  return expandHome(process.env.FLEET_REGISTRY_PATH) || path.join(os.homedir(), '.hermes', 'fleet.yaml')
}

export async function readFleetRegistry(registryPath = getFleetRegistryPath()): Promise<{ nodes: Array<FleetNode> }> {
  if (!existsSync(registryPath)) return readFleetRegistryFromText(defaultRegistryText())
  return readFleetRegistryFromText(await readFile(registryPath, 'utf8'))
}

async function collectLocalHermes(node: FleetNode): Promise<FleetNodeStatus> {
  const [version, status, cron] = await Promise.all([
    runCommand('hermes', ['--version'], 6_000),
    runCommand('hermes', ['status', '--all'], 8_000),
    runCommand('hermes', ['cron', 'list'], 8_000),
  ])

  const statusText = status.stdout
  const versionLine = version.stdout.split('\n')[0]?.trim()
  const model = statusText.match(/Model:\s+(.+)/)?.[1]?.trim()
  const provider = statusText.match(/Provider:\s+(.+)/)?.[1]?.trim()
  const gatewayRunning = /Gateway Service[\s\S]*Status:\s+✓ running/.test(statusText)
  const cronSummary = parseHermesCronList(cron.stdout)
  const ok = version.ok && status.ok

  return {
    ...node,
    status: ok && gatewayRunning ? 'healthy' : ok ? 'degraded' : 'offline',
    lastSeen: ok ? new Date().toISOString() : null,
    version: versionLine,
    model,
    provider,
    cron: cronSummary,
    recentErrors: [],
    checks: [
      { label: 'Hermes CLI', ok: version.ok, detail: versionLine || version.stderr },
      { label: 'Gateway', ok: gatewayRunning, detail: gatewayRunning ? 'running' : 'not confirmed' },
      { label: 'Cron', ok: cron.ok, detail: `${cronSummary.active}/${cronSummary.total} active` },
    ],
  }
}

async function collectSshHost(node: FleetNode): Promise<FleetNodeStatus> {
  if (!node.address || !node.user) {
    return { ...node, status: 'unknown', lastSeen: null, recentErrors: ['Missing SSH address or user'], checks: [] }
  }
  const args = [
    ...(node.keyPath ? ['-i', node.keyPath] : []),
    '-o', 'BatchMode=yes',
    '-o', 'ConnectTimeout=6',
    `${node.user}@${node.address}`,
    "hostname; docker ps --format '{{.Names}}|{{.Status}}|{{.Image}}'",
  ]
  const result = await runCommand('ssh', args, 10_000)
  const lines = result.stdout.split('\n').filter(Boolean)
  const hostname = lines[0]
  const containers = parseDockerPsLines(lines.slice(1))
  return {
    ...node,
    status: result.ok ? 'healthy' : 'offline',
    lastSeen: result.ok ? new Date().toISOString() : null,
    recentErrors: result.ok ? [] : [result.stderr],
    checks: [
      { label: 'SSH', ok: result.ok, detail: hostname || result.stderr },
      { label: 'Docker containers', ok: containers.size > 0, detail: `${containers.size} visible` },
    ],
  }
}

function extractBetweenMarkers(text: string, start: string, end: string): string {
  const startIndex = text.indexOf(start)
  if (startIndex < 0) return ''
  const contentStart = startIndex + start.length
  const endIndex = text.indexOf(end, contentStart)
  return text.slice(contentStart, endIndex < 0 ? undefined : endIndex).trim()
}

function parseCronJobsJson(text: string): Array<RawCronJob> {
  if (!text.trim()) return []
  try {
    const parsed = JSON.parse(text) as { jobs?: Array<RawCronJob> } | Array<RawCronJob>
    if (Array.isArray(parsed)) return parsed
    return Array.isArray(parsed.jobs) ? parsed.jobs : []
  } catch {
    return []
  }
}

async function collectDockerHermes(node: FleetNode, registryNodes: Array<FleetNode>): Promise<FleetNodeStatus> {
  const parent = registryNodes.find((candidate) => candidate.id === node.parent)
  if (!parent?.address || !parent.user || !node.container) {
    return { ...node, status: 'unknown', lastSeen: null, recentErrors: ['Missing parent host or container'], checks: [] }
  }

  const sshPrefix = [
    ...(parent.keyPath ? ['-i', parent.keyPath] : []),
    '-o', 'BatchMode=yes',
    '-o', 'ConnectTimeout=6',
    `${parent.user}@${parent.address}`,
  ]
  const hermesHome = node.hermesHome || '/workspace/.hermes'
  const containerName = shellQuote(node.container)
  const home = shellQuote(hermesHome)
  const command = [
    `docker ps --format '{{.Names}}|{{.Status}}|{{.Image}}' | grep '^${node.container}|' || true`,
    `docker exec ${containerName} sh -lc 'test -d ${home} && echo HERMES_HOME_OK || true' 2>/dev/null || true`,
    `docker exec ${containerName} sh -lc 'test -f /proc/1/environ && echo PROCESS_ENV_OK || true' 2>/dev/null || true`,
    `echo __CRON_JSON_BEGIN__`,
    `docker exec ${containerName} sh -lc 'cat ${home}/cron/jobs.json 2>/dev/null || true' || true`,
    `echo __CRON_JSON_END__`,
  ].join('; ')
  const result = await runCommand('ssh', [...sshPrefix, command], 12_000)
  const lines = result.stdout.split('\n')
  const dockerLine = lines.find((line) => line.startsWith(`${node.container}|`))
  const container = dockerLine ? parseDockerPsLines([dockerLine]).get(node.container) : null
  const hermesHomeOk = lines.includes('HERMES_HOME_OK')
  const processEnvOk = lines.includes('PROCESS_ENV_OK')
  const rawJobs = parseCronJobsJson(extractBetweenMarkers(result.stdout, '__CRON_JSON_BEGIN__', '__CRON_JSON_END__'))
  const cronSummary = cronSummaryFromRawJobs(rawJobs)

  const running = Boolean(container?.running)
  const healthy = Boolean(container?.healthy)
  return {
    ...node,
    status: result.ok && healthy ? 'healthy' : result.ok && running ? 'degraded' : 'offline',
    lastSeen: result.ok ? new Date().toISOString() : null,
    image: container?.image,
    dockerStatus: container?.status,
    cron: cronSummary.total ? cronSummary : undefined,
    recentErrors: result.ok ? [] : [result.stderr],
    checks: [
      { label: 'Container running', ok: running, detail: container?.status || 'not found' },
      { label: 'Container health', ok: healthy, detail: container?.status || 'not found' },
      { label: 'Hermes home mounted', ok: hermesHomeOk, detail: hermesHomeOk ? `${hermesHome} exists` : 'not confirmed' },
      { label: 'Runtime environment', ok: processEnvOk, detail: processEnvOk ? '/proc/1/environ readable' : 'not confirmed' },
      { label: 'Cron registry', ok: cronSummary.total > 0, detail: `${cronSummary.active}/${cronSummary.total} active` },
    ],
  }
}

export function inferOpenClawRuntime({
  launchctl,
  health,
  npm,
}: {
  launchctl: string
  health: string
  npm: string
}): Pick<FleetNodeStatus, 'status' | 'version' | 'checks'> {
  const launchRunning = /state\s*=\s*running|job state\s*=\s*running/i.test(launchctl)
  const pid = launchctl.match(/\bpid\s*=\s*(\d+)/i)?.[1]
  const healthOk = /"ok"\s*:\s*true|"status"\s*:\s*"live"/i.test(health)
  const version = npm.match(/openclaw@(\d{4}\.\d+\.\d+)/)?.[1] || launchctl.match(/OPENCLAW_SERVICE_VERSION\s*=>\s*([^\s]+)/)?.[1]
  const packageOk = Boolean(version)
  const status: FleetStatus = launchRunning && healthOk ? 'healthy' : launchRunning || healthOk || packageOk ? 'degraded' : 'unknown'

  return {
    status,
    version,
    checks: [
      { label: 'LaunchAgent', ok: launchRunning, detail: pid ? `running, pid ${pid}` : launchRunning ? 'running' : 'not confirmed' },
      { label: 'Gateway health', ok: healthOk, detail: healthOk ? 'http://127.0.0.1:18789/health ok' : tailText(health || 'not confirmed', 3) },
      { label: 'OpenClaw package', ok: packageOk, detail: version ? `openclaw@${version}` : 'not confirmed' },
    ],
  }
}

async function collectOpenClaw(node: FleetNode): Promise<FleetNodeStatus> {
  const [launchctl, health, npm] = await Promise.all([
    runCommand('launchctl', ['print', `gui/${process.getuid?.() || 501}/ai.openclaw.gateway`], 6_000),
    runCommand('curl', ['-sS', '--max-time', '3', 'http://127.0.0.1:18789/health'], 5_000),
    runCommand('npm', ['list', '-g', 'openclaw', '--depth=0'], 8_000),
  ])
  const runtime = inferOpenClawRuntime({
    launchctl: launchctl.stdout || launchctl.stderr,
    health: health.stdout || health.stderr,
    npm: npm.stdout || npm.stderr,
  })

  return {
    ...node,
    status: runtime.status,
    lastSeen: runtime.status === 'healthy' || runtime.status === 'degraded' ? new Date().toISOString() : null,
    version: runtime.version,
    gatewayUrl: node.gatewayUrl || 'http://127.0.0.1:18789',
    recentErrors: [launchctl, health, npm].filter((result) => !result.ok).map((result) => tailText(result.stderr || result.stdout, 5)),
    checks: runtime.checks,
  }
}

function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'"'"'`)}'`
}

async function readLocalLog(label: string, filePath: string, lines: number): Promise<FleetLogSource> {
  if (!existsSync(filePath)) {
    return { label, kind: 'file', source: filePath, ok: false, content: 'Log file not found.' }
  }
  try {
    const content = await readFile(filePath, 'utf8')
    return { label, kind: 'file', source: filePath, ok: true, content: redactSensitiveText(tailText(content, lines)) }
  } catch (error) {
    return {
      label,
      kind: 'file',
      source: filePath,
      ok: false,
      content: error instanceof Error ? error.message : 'Could not read log file.',
    }
  }
}

async function collectNodeLogs(node: FleetNodeStatus, registryNodes: Array<FleetNode>, lines: number): Promise<Array<FleetLogSource>> {
  if (node.kind === 'hermes-local') {
    const logRoot = path.join(os.homedir(), '.hermes', 'logs')
    return Promise.all([
      readLocalLog('Agent log', path.join(logRoot, 'agent.log'), lines),
      readLocalLog('Gateway log', path.join(logRoot, 'gateway.log'), lines),
      readLocalLog('Workspace log', path.join(logRoot, 'workspace.log'), lines),
    ])
  }

  if (node.kind === 'hermes-container') {
    const parent = registryNodes.find((candidate) => candidate.id === node.parent)
    if (!parent?.address || !parent.user || !node.container) {
      return [{ label: 'Container logs', kind: 'docker', source: node.container || 'unknown', ok: false, content: 'Missing parent host or container.' }]
    }
    const args = [
      ...(parent.keyPath ? ['-i', parent.keyPath] : []),
      '-o', 'BatchMode=yes',
      '-o', 'ConnectTimeout=6',
      `${parent.user}@${parent.address}`,
      `docker logs --tail ${Math.max(1, Math.min(lines, 500))} ${shellQuote(node.container)} 2>&1`,
    ]
    const result = await runCommand('ssh', args, 12_000)
    return [{
      label: 'Container logs',
      kind: 'docker',
      source: `docker logs ${node.container}`,
      ok: result.ok,
      content: redactSensitiveText(tailText(result.stdout || result.stderr || 'No log output.', lines)),
    }]
  }

  if (node.kind === 'host' && node.host === 'ssh') {
    const detail = node.recentErrors.length ? node.recentErrors.join('\n') : 'Host detail is available. Container-level logs live on the child nodes.'
    return [{ label: 'Host note', kind: 'note', source: node.address || node.host, ok: true, content: detail }]
  }

  if (node.kind === 'openclaw') {
    const logRoot = path.join(os.homedir(), '.openclaw', 'logs')
    return Promise.all([
      readLocalLog('OpenClaw gateway log', path.join(logRoot, 'gateway.log'), lines),
      readLocalLog('OpenClaw gateway errors', path.join(logRoot, 'gateway.err.log'), lines),
      readLocalLog('OpenClaw watchdog log', path.join(logRoot, 'watchdog.log'), lines),
    ])
  }

  return [{ label: 'Logs', kind: 'note', source: node.kind, ok: false, content: 'No log collector configured for this node yet.' }]
}

export async function collectFleetNodeDetail(nodeId: string, lines = 160, registryPath = getFleetRegistryPath()): Promise<FleetNodeDetailPayload | null> {
  const registry = await readFleetRegistry(registryPath)
  const fleet = await collectFleetStatus(registryPath)
  const node = findFleetNode(fleet.nodes, nodeId)
  if (!node) return null
  const parent = node.parent ? findFleetNode(fleet.nodes, node.parent) || undefined : undefined
  const logs = await collectNodeLogs(node, registry.nodes, Math.max(20, Math.min(lines, 500)))
  return {
    generatedAt: new Date().toISOString(),
    registryPath,
    node,
    parent,
    logs,
  }
}

export async function collectFleetStatus(registryPath = getFleetRegistryPath()): Promise<FleetStatusPayload> {
  const registry = await readFleetRegistry(registryPath)
  const statuses = await Promise.all(
    registry.nodes.map((node) => {
      if (node.kind === 'hermes-local') return collectLocalHermes(node)
      if (node.kind === 'host' && node.host === 'ssh') return collectSshHost(node)
      if (node.kind === 'hermes-container') return collectDockerHermes(node, registry.nodes)
      if (node.kind === 'openclaw') return collectOpenClaw(node)
      return Promise.resolve({ ...node, status: 'unknown' as const, lastSeen: null, recentErrors: [], checks: [] })
    }),
  )

  return {
    generatedAt: new Date().toISOString(),
    registryPath,
    summary: buildFleetSummary(statuses),
    nodes: statuses,
  }
}

export async function collectFleetCronDashboard(registryPath = getFleetRegistryPath()): Promise<FleetCronDashboardPayload> {
  const fleet = await collectFleetStatus(registryPath)
  const dashboard = buildFleetCronDashboard(fleet.nodes)
  return {
    generatedAt: new Date().toISOString(),
    registryPath,
    ...dashboard,
  }
}

function cronJobsPath(): string {
  return path.join(os.homedir(), '.hermes', 'cron', 'jobs.json')
}

async function readLocalCronJobs(): Promise<Array<RawCronJob>> {
  try {
    return parseCronJobsJson(await readFile(cronJobsPath(), 'utf8'))
  } catch {
    return []
  }
}

async function readRemoteContainerCronDetail(
  node: FleetNodeStatus,
  registryNodes: Array<FleetNode>,
  jobId: string,
): Promise<{ jobs: Array<RawCronJob>; latest?: { path: string; content: string } }> {
  if (!/^[a-zA-Z0-9_-]+$/.test(jobId)) return { jobs: [] }
  const parent = registryNodes.find((candidate) => candidate.id === node.parent)
  if (!parent?.address || !parent.user || !node.container) return { jobs: [] }

  const hermesHome = node.hermesHome || '/workspace/.hermes'
  const sshPrefix = [
    ...(parent.keyPath ? ['-i', parent.keyPath] : []),
    '-o', 'BatchMode=yes',
    '-o', 'ConnectTimeout=6',
    `${parent.user}@${parent.address}`,
  ]
  const containerName = shellQuote(node.container)
  const home = shellQuote(hermesHome)
  const job = shellQuote(jobId)
  const command = [
    'echo __CRON_JSON_BEGIN__',
    `docker exec ${containerName} sh -lc 'cat ${home}/cron/jobs.json 2>/dev/null || true' || true`,
    'echo __CRON_JSON_END__',
    'echo __OUTPUT_PATH_BEGIN__',
    `docker exec ${containerName} sh -lc 'ls -t ${home}/cron/output/${job}/*.md 2>/dev/null | head -n 1' || true`,
    'echo __OUTPUT_PATH_END__',
    'echo __OUTPUT_CONTENT_BEGIN__',
    `docker exec ${containerName} sh -lc 'file=$(ls -t ${home}/cron/output/${job}/*.md 2>/dev/null | head -n 1); test -n "$file" && cat "$file" || true' || true`,
    'echo __OUTPUT_CONTENT_END__',
  ].join('; ')
  const result = await runCommand('ssh', [...sshPrefix, command], 12_000)
  if (!result.ok) return { jobs: [] }

  const jobs = parseCronJobsJson(extractBetweenMarkers(result.stdout, '__CRON_JSON_BEGIN__', '__CRON_JSON_END__'))
  const outputPath = extractBetweenMarkers(result.stdout, '__OUTPUT_PATH_BEGIN__', '__OUTPUT_PATH_END__').split('\n').filter(Boolean).at(-1)
  const content = extractBetweenMarkers(result.stdout, '__OUTPUT_CONTENT_BEGIN__', '__OUTPUT_CONTENT_END__')
  return {
    jobs,
    latest: outputPath && content ? { path: `${node.container}:${outputPath}`, content } : undefined,
  }
}

async function latestCronOutput(jobId: string): Promise<{ path: string; content: string } | undefined> {
  const outputDir = path.join(os.homedir(), '.hermes', 'cron', 'output', jobId)
  if (!existsSync(outputDir)) return undefined
  try {
    const files = await readdir(outputDir)
    const markdownFiles = await Promise.all(
      files
        .filter((file) => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = path.join(outputDir, file)
          return { path: filePath, mtime: (await stat(filePath)).mtimeMs }
        }),
    )
    const latest = markdownFiles.sort((a, b) => b.mtime - a.mtime)[0]
    if (!latest) return undefined
    return { path: latest.path, content: await readFile(latest.path, 'utf8') }
  } catch {
    return undefined
  }
}

export async function collectFleetCronDetail(nodeId: string, jobId: string, registryPath = getFleetRegistryPath()): Promise<FleetCronDetailPayload | null> {
  const registry = await readFleetRegistry(registryPath)
  const fleet = await collectFleetStatus(registryPath)
  const node = findFleetNode(fleet.nodes, nodeId)
  if (!node) return null

  if (node.kind === 'hermes-local') {
    const jobs = await readLocalCronJobs()
    const rawJob = jobs.find((job) => job.id === jobId)
    if (!rawJob) return null
    const latest = await latestCronOutput(jobId)
    return buildCronDetailFromJob({
      job: rawJob,
      node,
      latestOutput: latest?.content,
      outputPath: latest?.path,
      registryPath,
    })
  }

  if (node.kind === 'hermes-container') {
    const remote = await readRemoteContainerCronDetail(node, registry.nodes, jobId)
    const rawJob = remote.jobs.find((job) => job.id === jobId)
    if (!rawJob) return null
    return buildCronDetailFromJob({
      job: rawJob,
      node,
      latestOutput: remote.latest?.content,
      outputPath: remote.latest?.path,
      registryPath,
    })
  }

  return null
}
