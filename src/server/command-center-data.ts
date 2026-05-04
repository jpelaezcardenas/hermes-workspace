import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import os from 'node:os'
import { join } from 'node:path'
import { listTasks } from './tasks-store'

type RawJob = Record<string, unknown>

export type CommandCenterStatus = {
  generated_at: string
  horizon: 'today_tomorrow'
  health: {
    workspace_ui: 'live' | 'down'
    gateway: 'live' | 'down'
    dashboard_api: 'live' | 'auth_gated' | 'down'
  }
  summary: {
    needs_wilson: number
    jobs_total: number
    approvals_required: number
    unproven: number
    broken_flows: number
    tasks_open: number
	  gains: number
	  next_moves: number
	  hermes_primary_drivers: number
	  support_specialists: number
	  skills_total: number
	  automations_ready: number
	  identity_issues: number
	}
  needs_wilson: Array<CommandCenterItem>
  bottlenecks: Array<CommandCenterItem>
	  gains: Array<CommandCenterItem>
	  next_moves: Array<CommandCenterItem>
	  schedule: Array<CommandCenterItem>
	  company: HermesCompany
	  automation_queue: Array<HermesAutomationQueueItem>
	  evidence_ledger: Array<HermesEvidenceRecord>
	  sections: Array<CommandCenterSection>
	  sources: Array<CommandCenterSource>
	  proof: Record<string, unknown> | null
	}

export type CommandCenterItem = {
  id: string
  title: string
  detail: string
  status: 'live' | 'stale' | 'inferred' | 'missing' | 'blocked' | 'ready'
  priority: 'critical' | 'high' | 'medium' | 'low'
  owner?: string
  action?: string
  href?: string
  evidence?: string
}

export type CommandCenterSection = {
  id: string
  label: string
  status: 'live' | 'needs_attention' | 'planned'
  current_truth: string
  bottleneck: string
  next_action: string
  href: string
}

export type CommandCenterSource = {
  id: string
  label: string
  path: string
  status: 'live' | 'missing'
  modified_at?: string
}

export type HermesEmployee = {
  id: string
  name: string
  department: string
  operating_role: 'primary_driver' | 'support_specialist'
  role: string
  mission: string
  health: 'live' | 'needs_attention' | 'missing'
  proof_status: CommandCenterItem['status']
  capabilities: Array<string>
  owned_projects: Array<string>
  current_work: string
  blocker: string
  next_move: string
  needed_data: Array<string>
  jobs: number
  tasks: number
  source_paths: Array<string>
  identity_issues: Array<string>
}

export type HermesCompany = {
  operating_model: 'hermes_led_with_support_specialists'
  primary_drivers: Array<HermesEmployee>
  support_specialists: Array<HermesEmployee>
  skill_inventory: {
    total: number
    by_category: Record<string, number>
    mapped_to_hermes: number
  }
  top_bottlenecks: Array<CommandCenterItem>
}

export type HermesAutomationQueueItem = CommandCenterItem & {
  cadence: 'nightly' | 'daily' | 'continuous'
  driver: string
  support?: string
  autonomy: 'local_autonomous' | 'approval_gated'
}

export type HermesEvidenceRecord = {
  id: string
  source_path: string
  source_type: 'profile' | 'skill' | 'job' | 'proof' | 'handoff' | 'task' | 'brain' | 'system'
  owner_agent: string
  project: string
  freshness: string
  confidence: 'high' | 'medium' | 'low'
  impact: 'critical' | 'high' | 'medium' | 'low'
  status: 'live' | 'stale' | 'inferred' | 'missing' | 'conflict'
  recommended_task: string
}

export type CompanyFlowPacket = CommandCenterStatus & {
  mode: 'full_loop_with_external_gates'
  nodes: Array<FlowNode>
  edges: Array<FlowEdge>
  skill_candidates: Array<CommandCenterItem>
}

export type FlowNode = {
  id: string
  type: 'source' | 'agent' | 'support' | 'job' | 'automation' | 'output' | 'proof' | 'approval' | 'project' | 'gain' | 'next_move' | 'skill_candidate'
  label: string
  column: number
  status: CommandCenterItem['status']
  priority?: CommandCenterItem['priority']
  detail?: string
  href?: string
}

export type FlowEdge = {
  id: string
  source: string
  target: string
  label: string
  status: 'healthy' | 'blocked' | 'attention'
}

const AI_SYSTEMS = process.env.MAJESTIC12_ROOT || '/Users/majestic12/ai-systems'
const HERMES_HOME = process.env.HERMES_HOME || join(os.homedir(), '.hermes')
const WORKSPACE = join(AI_SYSTEMS, 'hermes-workspace')
const STATE_DIR = join(AI_SYSTEMS, 'state')
const BRIDGE_DIR = join(AI_SYSTEMS, 'bridge', 'hermes_to_cowork')
const JOBS_FILE = join(HERMES_HOME, 'cron', 'jobs.json')
const OUTPUT_DIR = join(HERMES_HOME, 'cron', 'output')
const PROFILES_DIR = join(HERMES_HOME, 'profiles')
const SKILLS_DIR = join(HERMES_HOME, 'skills')

const SOURCE_PATHS = [
  {
    id: 'doctrine',
    label: 'Majestic12 doctrine',
    path: '/Users/majestic12/brain/design/majestic12_os_agent_company_doctrine_2026-04-29.md',
  },
  {
    id: 'source-radar',
    label: 'Source radar implementation',
    path: '/Users/majestic12/brain/improvement/company_project_source_radar_implementation_2026-04-29.md',
  },
  {
    id: 'truth-debt',
    label: 'Truth debt',
    path: '/Users/majestic12/brain/state/company_project_source_radar_truth_debt_2026-04-29.md',
  },
  {
    id: 'handoffs',
    label: 'Hermes to Cowork handoffs',
    path: join(AI_SYSTEMS, 'bridge', 'hermes_to_cowork'),
  },
  {
    id: 'shared-goals-todos',
    label: 'Shared goals + todo board',
    path: join(HERMES_HOME, 'tasks.json'),
  },
  {
    id: 'startup-mission',
    label: 'Startup acceleration mission packet',
    path: join(AI_SYSTEMS, 'state', 'agent_startup_mission_current.json'),
  },
]

function normalizeJobs(payload: unknown): Array<RawJob> {
  if (Array.isArray(payload)) return payload as Array<RawJob>
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>
    if (Array.isArray(record.jobs)) return record.jobs as Array<RawJob>
    if (record.jobs && typeof record.jobs === 'object') {
      return Object.values(record.jobs) as Array<RawJob>
    }
  }
  return []
}

function readJson(path: string): unknown | null {
  try {
    if (!existsSync(path)) return null
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return null
  }
}

function latestProofPath(): string | null {
  try {
    const latest = readdirSync(STATE_DIR)
      .filter((name) => /^hermes_jobs_proof_status_\d{4}-\d{2}-\d{2}\.json$/.test(name))
      .sort()
      .at(-1)
    return latest ? join(STATE_DIR, latest) : null
  } catch {
    return null
  }
}

function refreshProof(): void {
  try {
    execFileSync('node', [join(WORKSPACE, 'scripts', 'generate-hermes-proof-status.mjs')], {
      cwd: WORKSPACE,
      timeout: 30_000,
      stdio: ['ignore', 'ignore', 'ignore'],
    })
  } catch {
    // The command center must degrade gracefully if Hermes is temporarily down.
  }
}

async function probeHealth(url: string): Promise<'live' | 'auth_gated' | 'down'> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(1800) })
    if (res.ok) return 'live'
    if (res.status === 401 || res.status === 403) return 'auth_gated'
    return 'down'
  } catch {
    return 'down'
  }
}

function readSources(): Array<CommandCenterSource> {
  return SOURCE_PATHS.map((source) => {
    try {
      const st = statSync(source.path)
      return {
        ...source,
        status: 'live' as const,
        modified_at: st.mtime.toISOString(),
      }
    } catch {
      return { ...source, status: 'missing' as const }
    }
  })
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function jobId(job: RawJob): string {
  return asString(job.id) || asString(job.job_id) || asString(job.jobId)
}

function jobName(job: RawJob): string {
  return asString(job.name) || jobId(job) || 'Unnamed job'
}

function agentNameFromJob(name: string): string {
  return name.split(' daily ')[0].replace(/ nightly .*/, '').trim() || name
}

function jobSchedule(job: RawJob): string {
  if (typeof job.schedule === 'string') return job.schedule
  const schedule = job.schedule as Record<string, unknown> | undefined
  return asString(job.schedule_display) || asString(schedule?.display) || asString(schedule?.expr)
}

function buildOutputPath(id: string): string | null {
  const dir = join(OUTPUT_DIR, id)
  try {
    const latest = readdirSync(dir)
      .filter((name) => /\.(md|json|txt)$/.test(name))
      .sort()
      .at(-1)
    return latest ? join(dir, latest) : null
  } catch {
    return null
  }
}

function proofJobs(proof: Record<string, unknown> | null): Array<Record<string, unknown>> {
  return Array.isArray(proof?.jobs) ? proof.jobs as Array<Record<string, unknown>> : []
}

const HERMES_AGENT_DEFAULTS: Record<string, {
  name: string
  department: string
  operating_role: HermesEmployee['operating_role']
  role: string
  mission: string
  owned_projects: Array<string>
  next_move: string
}> = {
  reddington: {
    name: 'Reddington',
    department: 'Executive',
    operating_role: 'primary_driver',
    role: 'CEO / whole-system orchestrator',
    mission: 'Translate Wilson intent into ranked next moves and seize the highest-leverage bottleneck.',
    owned_projects: ['Majestic12 OS', 'Mission Control', 'Company priorities'],
    next_move: 'Rank the company queue and assign each blocker to an owner.',
  },
  hermes_curator: {
    name: 'Hermes Curator',
    department: 'Truth Infrastructure',
    operating_role: 'primary_driver',
    role: 'Source truth, proof, system health, attribution',
    mission: 'Maintain source maps, truth debt, dashboard/API health, proof packets, and proposal-first infrastructure upgrades.',
    owned_projects: ['Proof packets', 'Source maps', 'Dashboard health'],
    next_move: 'Classify proof outputs and turn unresolved evidence into owned tasks.',
  },
  scribe: {
    name: 'Scribe',
    department: 'Memory',
    operating_role: 'primary_driver',
    role: 'Durable memory and knowledge promotion',
    mission: 'Convert raw activity into durable wikis, ledgers, review queues, skills, truth labels, and state summaries.',
    owned_projects: ['Memory', 'Knowledge base', 'Promotion queue'],
    next_move: 'Promote the most useful agent outputs into evidence-labeled memory.',
  },
  strategist: {
    name: 'Strategist',
    department: 'Strategy',
    operating_role: 'primary_driver',
    role: 'Portfolio architecture and leverage ranking',
    mission: 'Rank the highest-leverage moves across Majestic12 and keep mini-companies pointed at moonshot outcomes.',
    owned_projects: ['Portfolio strategy', 'Moonshot ranking', 'Company architecture'],
    next_move: 'Pressure-test the top projects against bottleneck, proof, and leverage.',
  },
  feynman: {
    name: 'Feynman',
    department: 'Finance + World Intelligence',
    operating_role: 'primary_driver',
    role: 'Markets, equities, earth intelligence',
    mission: 'Produce proposal-first investing, personal-interest, and geopolitical intelligence from sourced public data.',
    owned_projects: ['JanetStreet', 'Finance radar', 'World intelligence'],
    next_move: 'Publish source-backed market/world radar with no action until approval gates clear.',
  },
  waitzkin: {
    name: 'Waitzkin',
    department: 'Performance',
    operating_role: 'primary_driver',
    role: 'Golf performance and accountability',
    mission: 'Make Wilson world-class at golf through practice design, round review, mental-game integration, and learning loops.',
    owned_projects: ['Citadel', 'Golf practice', 'Performance accountability'],
    next_move: 'Publish the current golf scoreboard and next practice protocol.',
  },
  da_vinci: {
    name: 'Da Vinci',
    department: 'Research + Invention',
    operating_role: 'primary_driver',
    role: 'Research polymath and invention synthesis',
    mission: 'Connect science, design, engineering, art, biology, history, and weird edges into usable questions and prototypes.',
    owned_projects: ['Research synthesis', 'Prototype ideas', 'Creative invention'],
    next_move: 'Route one high-upside idea into a sourced experiment plan.',
  },
  curie: {
    name: 'Curie',
    department: 'Research Radar',
    operating_role: 'primary_driver',
    role: 'Science and research signal scout',
    mission: 'Scan research signals and convert promising findings into sourced next-step briefs.',
    owned_projects: ['Research radar', 'Science watch'],
    next_move: 'Produce one high-signal research brief with source freshness and confidence.',
  },
  alfred: {
    name: 'Alfred',
    department: 'Life Admin',
    operating_role: 'primary_driver',
    role: 'Life admin and daily operating rails',
    mission: 'Keep Wilson’s day, reminders, admin loose ends, and practical context organized.',
    owned_projects: ['Life admin', 'Reminders', 'Daily agenda'],
    next_move: 'Prepare today/tomorrow admin risks and reminders needing cleanup.',
  },
  hermes_treasure: {
    name: 'Hermes Treasure',
    department: 'Field Research',
    operating_role: 'primary_driver',
    role: 'Treasure, provenance, and field research gates',
    mission: 'Maintain clue provenance, field gates, map/intel planning, and research safety constraints.',
    owned_projects: ['Treasure research', 'Field gates', 'Provenance'],
    next_move: 'Update active clues, confidence, and field gate status from sourced files.',
  },
  claude_code: {
    name: 'Claude Code',
    department: 'Engineering Support',
    operating_role: 'support_specialist',
    role: 'Engineering/build support assigned by Hermes',
    mission: 'Build, test, harden, and verify the local OS, dashboard, adapters, and runtime when Hermes assigns engineering work.',
    owned_projects: ['Command Center engineering', 'Build/test reliability'],
    next_move: 'Run app reliability loops only when delegated by Hermes.',
  },
  cowork: {
    name: 'Cowork',
    department: 'Scheduling Support',
    operating_role: 'support_specialist',
    role: 'Recurrence, scheduling rhythm, handoffs, proof timing',
    mission: 'Keep recurring scans, reviews, proof loops, and agent rhythms alive while distinguishing scheduled from proven.',
    owned_projects: ['Cron rhythm', 'Handoffs', 'Proof timing'],
    next_move: 'Maintain schedule rhythm after Hermes sets priorities.',
  },
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
}

function displayNameFromId(id: string): string {
  return id.split('_').map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(' ')
}

function normalizeOwner(value: string): string {
  const clean = slug(value.replace(/\bdaily\b|\bnightly\b|\bmorning\b|\bproof\b|\bcheck\b/gi, ' '))
  if (clean.includes('hermes_curator')) return 'hermes_curator'
  if (clean.includes('hermes_treasure')) return 'hermes_treasure'
  if (clean.includes('claude')) return 'claude_code'
  if (clean.includes('cowork')) return 'cowork'
  if (clean === 'hermes' || /^hermes_\d/.test(clean)) return 'hermes_curator'
  if (clean.includes('majestic12') || clean.includes('os_radar')) return 'strategist'
  return clean.split('_')[0] || clean
}

function readText(path: string): string {
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return ''
  }
}

function firstMarkdownValue(text: string, label: string): string {
  const match = text.match(new RegExp(`^${label}:\\s*(.+)$`, 'im'))
  return match?.[1]?.trim() ?? ''
}

function listSkillFiles(dir = SKILLS_DIR): Array<string> {
  try {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) return listSkillFiles(path)
      return entry.name === 'SKILL.md' ? [path] : []
    })
  } catch {
    return []
  }
}

function skillCategory(path: string): string {
  const relative = path.startsWith(SKILLS_DIR) ? path.slice(SKILLS_DIR.length + 1) : path
  return relative.split('/')[0] || 'uncategorized'
}

function summarizeSkills(skillFiles: Array<string>): HermesCompany['skill_inventory'] {
  const byCategory: Record<string, number> = {}
  for (const path of skillFiles) {
    const category = skillCategory(path)
    byCategory[category] = (byCategory[category] ?? 0) + 1
  }
  return {
    total: skillFiles.length,
    by_category: byCategory,
    mapped_to_hermes: skillFiles.filter((path) => agentCapabilitiesFromSkillPath(path).length > 0).length,
  }
}

function agentCapabilitiesFromSkillPath(path: string): Array<string> {
  const rel = path.toLowerCase()
  const owners: Array<string> = []
  if (/janetstreet|kalshi|polymarket|finance|blogwatcher|worldview/.test(rel)) owners.push('feynman')
  if (/citadel|golf|performance/.test(rel)) owners.push('waitzkin')
  if (/scribe|obsidian|note|ocr|documents|knowledge|session-compounding/.test(rel)) owners.push('scribe')
  if (/capability-spine|life-admin|maps|google-workspace|airtable|notion/.test(rel)) owners.push('reddington')
  if (/dashboard|hardening|debugging|filesystem|skill-authoring|mcp|github|test-driven|systematic/.test(rel)) owners.push('hermes_curator')
  if (/creative|design|diagram|research-paper|arxiv|llm-wiki/.test(rel)) owners.push('da_vinci')
  if (/claude-code|codex|opencode|node-inspect|python-debugpy/.test(rel)) owners.push('claude_code')
  return [...new Set(owners)]
}

function capabilityLabelsForAgent(id: string, skillFiles: Array<string>): Array<string> {
  const defaults: Record<string, Array<string>> = {
    reddington: ['CEO orchestration', 'Priority ranking', 'Bottleneck seizure', 'Company alignment'],
    hermes_curator: ['Proof packets', 'Source maps', 'Truth debt', 'Dashboard/API health'],
    scribe: ['Memory promotion', 'Knowledge hygiene', 'Durable ledgers', 'State summaries'],
    strategist: ['Portfolio ranking', 'Moonshot architecture', 'Leverage analysis'],
    feynman: ['Equities research', 'World intelligence', 'Risk-gated proposals', 'Market radar'],
    waitzkin: ['Golf practice design', 'Performance review', 'Accountability loops'],
    da_vinci: ['Research synthesis', 'Creative invention', 'Prototype questions'],
    curie: ['Research scan', 'Scientific signal triage'],
    alfred: ['Life admin', 'Reminder cleanup', 'Daily logistics'],
    hermes_treasure: ['Provenance', 'Field gates', 'Map/intel planning'],
    claude_code: ['Code implementation', 'Type/build verification', 'App hardening'],
    cowork: ['Cron rhythm', 'Handoffs', 'Schedule timing'],
  }
  const skillCategories = skillFiles
    .filter((path) => agentCapabilitiesFromSkillPath(path).includes(id))
    .map((path) => skillCategory(path).replace(/-/g, ' '))
  return [...new Set([...(defaults[id] ?? []), ...skillCategories])].slice(0, 8)
}

function employeeProofStatus(rows: Array<Record<string, unknown>>, id: string): CommandCenterItem['status'] {
  const agentRows = rows.filter((row) => normalizeOwner(asString(row.agent) || asString(row.name)) === id)
  if (!agentRows.length) return 'inferred'
  if (agentRows.some((row) => asString(row.status) === 'approval_required')) return 'blocked'
  if (agentRows.some((row) => ['failed', 'output_missing', 'evidence_missing'].includes(asString(row.status)))) return 'blocked'
  if (agentRows.some((row) => asString(row.status) === 'scheduled')) return 'inferred'
  return 'live'
}

function latestBridgePath(): string | null {
  try {
    const latest = readdirSync(BRIDGE_DIR)
      .filter((name) => /\.(json|md|txt)$/.test(name))
      .sort()
      .at(-1)
    return latest ? join(BRIDGE_DIR, latest) : null
  } catch {
    return null
  }
}

function buildHermesCompany({
  jobs,
  tasks,
  proofRows,
}: {
  jobs: Array<RawJob>
  tasks: ReturnType<typeof listTasks>
  proofRows: Array<Record<string, unknown>>
}): { company: HermesCompany; evidence: Array<HermesEvidenceRecord> } {
  const skillFiles = listSkillFiles()
  const employeeIds = new Set<string>(Object.keys(HERMES_AGENT_DEFAULTS))
  try {
    for (const name of readdirSync(PROFILES_DIR)) {
      if (statSync(join(PROFILES_DIR, name)).isDirectory()) employeeIds.add(slug(name))
    }
  } catch {
    // Missing profile directory is handled as evidence below.
  }
  for (const job of jobs) employeeIds.add(normalizeOwner(agentNameFromJob(jobName(job))))

  const employees = [...employeeIds].map((id): HermesEmployee => {
    const defaults = HERMES_AGENT_DEFAULTS[id] ?? {
      name: displayNameFromId(id),
      department: 'Project Specialist',
      operating_role: 'primary_driver' as const,
      role: 'Hermes project specialist',
      mission: 'Own a Hermes project lane and produce sourced outputs, proof, blockers, and next moves.',
      owned_projects: [displayNameFromId(id)],
      next_move: 'Publish current status, blocker, proof, and next action.',
    }
    const profileDir = join(PROFILES_DIR, id)
    const missionPath = join(profileDir, 'MISSION.md')
    const soulPath = join(profileDir, 'SOUL.md')
    const missionText = readText(missionPath)
    const soulText = readText(soulPath)
    const role = firstMarkdownValue(missionText, 'Role') || defaults.role
    const mission = firstMarkdownValue(missionText, 'Mission') || defaults.mission
    const agentJobs = jobs.filter((job) => normalizeOwner(agentNameFromJob(jobName(job))) === id)
    const agentTasks = tasks.filter((task) => normalizeOwner(task.assignee ?? '') === id)
    const identityIssues = id !== 'feynman' && /# Feynman|I am Feynman/i.test(soulText)
      ? ['SOUL.md appears copied from Feynman; use MISSION.md as canonical until repaired.']
      : []
    const proofStatus = employeeProofStatus(proofRows, id)
    const blocker = identityIssues[0]
      || (proofStatus === 'blocked' ? 'Proof or approval gate is blocking durable truth.' : '')
      || (agentTasks.find((task) => task.column === 'review')?.title ?? '')
      || 'No critical blocker surfaced.'
    const currentWork = agentTasks[0]?.title
      || (agentJobs[0] ? `${jobName(agentJobs[0])} · ${jobSchedule(agentJobs[0]) || 'unscheduled'}` : '')

    return {
      id,
      name: defaults.name,
      department: defaults.department,
      operating_role: defaults.operating_role,
      role,
      mission,
      health: identityIssues.length || proofStatus === 'blocked' ? 'needs_attention' : existsSync(profileDir) || agentJobs.length ? 'live' : 'missing',
      proof_status: proofStatus,
      capabilities: capabilityLabelsForAgent(id, skillFiles),
      owned_projects: defaults.owned_projects,
      current_work: currentWork || 'No current work assigned in local tasks/jobs.',
      blocker,
      next_move: defaults.next_move,
      needed_data: identityIssues.length ? ['Correct profile SOUL.md attribution'] : proofStatus === 'blocked' ? ['Proof classification', 'Output evidence review'] : ['Fresh output artifact'],
      jobs: agentJobs.length,
      tasks: agentTasks.length,
      source_paths: [missionPath, soulPath].filter(existsSync),
      identity_issues: identityIssues,
    }
  })

  const primaryDrivers = employees
    .filter((employee) => employee.operating_role === 'primary_driver')
    .sort((a, b) => (a.id === 'reddington' ? -1 : b.id === 'reddington' ? 1 : a.department.localeCompare(b.department)))
  const supportSpecialists = employees
    .filter((employee) => employee.operating_role === 'support_specialist')
    .sort((a, b) => a.name.localeCompare(b.name))

  const evidence: Array<HermesEvidenceRecord> = [
    ...employees.flatMap((employee) => employee.source_paths.map((path) => ({
      id: `profile-${employee.id}-${path.endsWith('SOUL.md') ? 'soul' : 'mission'}`,
      source_path: path,
      source_type: 'profile' as const,
      owner_agent: employee.name,
      project: employee.department,
      freshness: statSync(path).mtime.toISOString(),
      confidence: path.endsWith('MISSION.md') ? 'high' as const : 'medium' as const,
      impact: employee.identity_issues.length ? 'critical' as const : 'medium' as const,
      status: employee.identity_issues.length && path.endsWith('SOUL.md') ? 'conflict' as const : 'live' as const,
      recommended_task: employee.identity_issues.length
        ? `Repair ${employee.name} identity attribution from canonical MISSION.md.`
        : `Keep ${employee.name} mission and ownership current.`,
    }))),
    ...skillFiles.slice(0, 80).map((path) => {
      const owners = agentCapabilitiesFromSkillPath(path)
      return {
        id: `skill-${slug(path.slice(SKILLS_DIR.length + 1))}`,
        source_path: path,
        source_type: 'skill' as const,
        owner_agent: owners.length ? owners.map((owner) => HERMES_AGENT_DEFAULTS[owner]?.name ?? displayNameFromId(owner)).join(', ') : 'Unmapped',
        project: skillCategory(path),
        freshness: statSync(path).mtime.toISOString(),
        confidence: owners.length ? 'medium' as const : 'low' as const,
        impact: owners.length ? 'medium' as const : 'high' as const,
        status: owners.length ? 'inferred' as const : 'missing' as const,
        recommended_task: owners.length ? 'Verify this skill belongs in the mapped agent capability set.' : 'Assign this skill to a Hermes owner or retire it from active capability planning.',
      }
    }),
  ]
  const bridgePath = latestBridgePath()
  if (bridgePath) {
    evidence.push({
      id: 'latest-handoff',
      source_path: bridgePath,
      source_type: 'handoff',
      owner_agent: 'Hermes',
      project: 'Command Center',
      freshness: statSync(bridgePath).mtime.toISOString(),
      confidence: 'medium',
      impact: 'high',
      status: 'live',
      recommended_task: 'Use the latest handoff as supporting evidence, not as canonical employee identity.',
    })
  }

  const skillInventory = summarizeSkills(skillFiles)
  const identityIssueCount = employees.reduce((total, employee) => total + employee.identity_issues.length, 0)
  const topBottlenecks: Array<CommandCenterItem> = [
    {
      id: 'bottleneck-agent-identity-attribution',
      title: 'Repair Hermes employee identity attribution',
      detail: `${identityIssueCount} profile identity issue${identityIssueCount === 1 ? '' : 's'} detected. MISSION.md remains canonical until SOUL.md is repaired.`,
      status: identityIssueCount ? 'blocked' : 'ready',
      priority: identityIssueCount ? 'critical' : 'low',
      owner: 'Hermes Curator + Reddington',
      action: 'Create repair tasks for each contaminated profile and keep Cowork/Claude Code labeled as support.',
      href: '/agents',
      evidence: PROFILES_DIR,
    },
    {
      id: 'bottleneck-skill-capability-map',
      title: 'Map Hermes skills to employees and projects',
      detail: `${skillInventory.total} local skills found; ${skillInventory.mapped_to_hermes} currently map to a likely Hermes owner by local heuristics.`,
      status: skillInventory.mapped_to_hermes < skillInventory.total ? 'blocked' : 'ready',
      priority: 'high',
      owner: 'Hermes Curator',
      action: 'Turn unmapped high-value skills into owner-verification tasks.',
      href: '/skills',
      evidence: SKILLS_DIR,
    },
    {
      id: 'bottleneck-proof-promotion',
      title: 'Promote proof outputs into tasks, memory, and next moves',
      detail: 'Outputs are not durable company truth until proof and approval states are classified.',
      status: proofRows.some((row) => asString(row.status) !== 'ran_successfully') ? 'blocked' : 'ready',
      priority: 'high',
      owner: 'Hermes Curator + Scribe',
      action: 'Classify each proof row and route durable gains into memory or work.',
      href: '/company-flow',
      evidence: latestProofPath() || undefined,
    },
  ]

  return {
    company: {
      operating_model: 'hermes_led_with_support_specialists',
      primary_drivers: primaryDrivers,
      support_specialists: supportSpecialists,
      skill_inventory: skillInventory,
      top_bottlenecks: topBottlenecks,
    },
    evidence,
  }
}

function buildAutomationQueue(company: HermesCompany): Array<HermesAutomationQueueItem> {
  return [
    {
      id: 'automation-proof-bottlenecks',
      title: 'Nightly proof + bottleneck loop',
      detail: 'Hermes Curator classifies runs, proof gaps, approvals, and broken flows; Reddington ranks the top blockage.',
      status: 'ready',
      priority: 'critical',
      owner: 'Hermes Curator',
      driver: 'Hermes Curator',
      support: 'Cowork handles recurrence timing only',
      cadence: 'nightly',
      autonomy: 'local_autonomous',
      action: 'Run local proof generation, update evidence ledger, and create tasks for unresolved blockers.',
      href: '/company-flow',
    },
    {
      id: 'automation-project-radar',
      title: 'Nightly project radar loop',
      detail: 'Hermes agents scan owned project files, report current state, missed data, owner, proof, and next action.',
      status: 'ready',
      priority: 'high',
      owner: 'Reddington',
      driver: 'Reddington',
      support: 'Scribe promotes durable findings',
      cadence: 'nightly',
      autonomy: 'local_autonomous',
      action: 'Create project status tasks for stale, missing, or conflicting evidence.',
      href: '/domains',
    },
    {
      id: 'automation-daily-planning',
      title: 'Daily planning loop',
      detail: 'Reddington prepares tomorrow’s top 3 moves from agent outputs, proof, schedule pressure, and Wilson-needed decisions.',
      status: 'ready',
      priority: 'high',
      owner: 'Reddington',
      driver: 'Reddington',
      support: 'Alfred and Cowork support agenda/rhythm',
      cadence: 'daily',
      autonomy: 'local_autonomous',
      action: 'Publish today/tomorrow plan and create internal tasks; external actions still require Wilson approval.',
      href: '/schedule',
    },
    {
      id: 'automation-memory-promotion',
      title: 'Memory promotion loop',
      detail: 'Scribe turns approved outputs into durable brain entries with source, freshness, confidence, and impact labels.',
      status: 'ready',
      priority: 'high',
      owner: 'Scribe',
      driver: 'Scribe',
      support: 'Hermes Curator validates source truth',
      cadence: 'nightly',
      autonomy: 'local_autonomous',
      action: 'Queue promotion candidates and conflict-resolution tasks instead of overwriting disagreeing facts.',
      href: '/memory',
    },
    {
      id: 'automation-app-reliability',
      title: 'Command Center reliability loop',
      detail: 'Hermes detects route/API/startup failures and delegates engineering implementation to Claude Code only when code work is needed.',
      status: 'ready',
      priority: 'high',
      owner: 'Hermes Curator',
      driver: 'Hermes Curator',
      support: 'Claude Code handles assigned code/build/test work',
      cadence: 'continuous',
      autonomy: 'local_autonomous',
      action: 'Smoke core routes and APIs, then stage engineering tasks for failures.',
      href: '/agents',
      evidence: company.support_specialists.find((employee) => employee.id === 'claude_code')?.source_paths[0],
    },
  ]
}

export async function buildCommandCenterStatus({ refresh = false } = {}): Promise<CommandCenterStatus> {
  if (refresh) refreshProof()
  const proofPath = latestProofPath()
  const proof = proofPath ? readJson(proofPath) as Record<string, unknown> | null : null
  const proofSummary = (proof?.summary && typeof proof.summary === 'object')
    ? proof.summary as Record<string, number>
    : {}
  const jobs = normalizeJobs(readJson(JOBS_FILE))
  const tasks = listTasks({ includeDone: true })
  const openTasks = tasks.filter((task) => task.column !== 'done')
  const sources = readSources()
  const proofJobRows = proofJobs(proof)
  const approvalRows = proofJobRows.filter((job) => job.status === 'approval_required')
  const missingRows = proofJobRows.filter((job) =>
    ['failed', 'output_missing', 'evidence_missing', 'scheduled'].includes(asString(job.status)),
  )
  const { company, evidence } = buildHermesCompany({ jobs, tasks, proofRows: proofJobRows })
  const automationQueue = buildAutomationQueue(company)
  const identityIssueCount = [...company.primary_drivers, ...company.support_specialists]
    .reduce((total, employee) => total + employee.identity_issues.length, 0)

  const health = {
    workspace_ui: 'live' as const,
    gateway: (await probeHealth('http://127.0.0.1:8642/health')) === 'live' ? 'live' as const : 'down' as const,
    dashboard_api: await probeHealth('http://127.0.0.1:9119/api/health'),
  }

  const needsWilson: Array<CommandCenterItem> = [
    ...company.top_bottlenecks.filter((item) => item.status === 'blocked').slice(0, 2),
    ...approvalRows.slice(0, 4).map((job) => ({
      id: `approval-${asString(job.job_id)}`,
      title: `${asString(job.name) || asString(job.agent)} needs classification`,
      detail: asString(job.proof_failure_reason) || 'Output is proposal-gated and needs approval before it becomes proven truth.',
      status: 'blocked' as const,
      priority: 'high' as const,
      owner: asString(job.agent),
      action: 'Review output and approve, reject, or turn into a task.',
      href: '/company-flow',
      evidence: asString((job.output as Record<string, unknown> | null)?.path),
    })),
    ...sources.filter((source) => source.status === 'missing').map((source) => ({
      id: `missing-${source.id}`,
      title: `${source.label} missing`,
      detail: 'A command-center source file is not available, so related claims must stay missing/inferred.',
      status: 'missing' as const,
      priority: 'medium' as const,
      action: 'Restore the source or update the source map.',
      href: '/memory',
      evidence: source.path,
    })),
  ]

  const bottlenecks: Array<CommandCenterItem> = [
    ...company.top_bottlenecks,
    ...needsWilson,
    ...missingRows.slice(0, 4).map((job) => ({
      id: `proof-${asString(job.job_id)}`,
      title: `${asString(job.name) || asString(job.agent)} is unproven`,
      detail: asString(job.proof_failure_reason) || `Proof status: ${asString(job.status) || 'unknown'}`,
      status: 'blocked' as const,
      priority: asString(job.status) === 'failed' ? 'critical' as const : 'high' as const,
      owner: asString(job.agent),
      action: 'Repair the proof path, classify the output, or convert the blockage into an owned next-step task.',
      href: '/jobs',
      evidence: asString((job.output as Record<string, unknown> | null)?.path),
    })),
  ]

  const gains: Array<CommandCenterItem> = proofJobRows
    .filter((job) => asString((job.output as Record<string, unknown> | null)?.path))
    .slice(0, 5)
    .map((job) => ({
      id: `gain-${asString(job.job_id)}`,
      title: `${asString(job.agent) || asString(job.name)} produced an artifact`,
      detail: 'Useful progress exists, but remains evidence-labeled until classified.',
      status: 'live' as const,
      priority: 'medium' as const,
      owner: asString(job.agent),
      action: 'Promote the durable finding or convert it into the next task.',
      href: '/company-flow',
      evidence: asString((job.output as Record<string, unknown> | null)?.path),
    }))

  const nextMoves: Array<CommandCenterItem> = [
    {
      id: 'review-approval-queue',
      title: 'Clear the approval-required proof queue',
      detail: `${approvalRows.length} outputs have evidence but are not proven until Wilson or the curator classifies them.`,
      status: approvalRows.length ? 'blocked' : 'ready',
      priority: approvalRows.length ? 'critical' : 'low',
      owner: 'Wilson + Hermes-curator',
      action: 'Classify each output into approved truth, next-step task, or discard; do not mark proven from proposal language alone.',
      href: '/company-flow',
      evidence: proofPath || undefined,
    },
    {
      id: 'startup-cadence-shared-board',
      title: 'Compress startup cadence around a shared goals/todo board',
      detail: 'Agents are blocked when goals, Scribe outputs, and next-step tasks are not visible in one packet. Stage a fast-cycle mission board first; scheduler compression remains an approval-gated control-plane change.',
      status: 'blocked',
      priority: 'critical',
      owner: 'Reddington + Hermes employees',
      action: 'Publish the current mission packet, route every blocked Hermes agent to one next task, then let Cowork maintain recurrence timing.',
      href: '/company-flow',
      evidence: join(AI_SYSTEMS, 'state', 'agent_startup_mission_current.json'),
    },
    ...automationQueue.slice(0, 3).map((automation) => ({
      id: `next-${automation.id}`,
      title: automation.title,
      detail: automation.detail,
      status: automation.status,
      priority: automation.priority,
      owner: automation.owner,
      action: automation.action,
      href: automation.href,
      evidence: automation.evidence,
    })),
    {
      id: 'daily-apple-rail',
      title: 'Dial in today and tomorrow schedule rails',
      detail: 'Use Hermes to keep reversible Calendar/Reminder items aligned with current tasks, jobs, and Wilson-needed decisions.',
      status: 'ready',
      priority: 'high',
      owner: 'Alfred',
      action: 'Create/update low-risk reminders; require approval for deletes, invites, shared calendars, and external attendees.',
      href: '/schedule',
    },
    {
      id: 'idea-inbox-loop',
      title: 'Route new ideas into daily agent loops',
      detail: 'Capture topics once, assign the best agent, require source standards, and let repeated workflows become skill candidates.',
      status: 'ready',
      priority: 'medium',
      owner: 'Reddington',
      action: 'Use the Ideas Inbox to create source-backed planning tasks.',
      href: '/domains',
    },
  ]

  const schedule = jobs
    .map((job) => ({
      id: `schedule-${jobId(job)}`,
      title: jobName(job),
      detail: `${jobSchedule(job) || 'No schedule'} · next ${asString(job.next_run_at) || 'unknown'}`,
      status: asString(job.last_status) === 'ok' ? 'live' as const : 'inferred' as const,
      priority: 'medium' as const,
      owner: agentNameFromJob(jobName(job)),
      action: 'Verify output after the next run.',
      href: '/jobs',
      evidence: buildOutputPath(jobId(job)) || undefined,
    }))
    .slice(0, 12)

  const sections: Array<CommandCenterSection> = [
    {
      id: 'home',
      label: 'Home',
      status: needsWilson.length ? 'needs_attention' : 'live',
      current_truth: `${needsWilson.length} Wilson-needed items across proof, schedule, and source truth.`,
      bottleneck: needsWilson[0]?.title || 'No critical decision surfaced.',
      next_action: nextMoves[0]?.title || 'Run the daily review.',
      href: '/dashboard',
    },
    {
      id: 'company-flow',
      label: 'Company Flow',
      status: bottlenecks.length ? 'needs_attention' : 'live',
      current_truth: `${company.primary_drivers.length} Hermes primary drivers, ${company.support_specialists.length} support specialists, ${jobs.length} jobs.`,
      bottleneck: bottlenecks[0]?.title || 'No broken flow detected.',
      next_action: 'Inspect the circuit grid and clear the first blocked edge.',
      href: '/company-flow',
    },
    {
      id: 'agents',
      label: 'Agents',
      status: identityIssueCount ? 'needs_attention' : 'live',
      current_truth: `Hermes agents are the core drivers; Cowork and Claude Code are support specialists.`,
      bottleneck: identityIssueCount ? `${identityIssueCount} profile identity attribution issue(s) detected.` : 'No identity blocker detected.',
      next_action: 'Open Hermes Company View and repair the top attribution issue.',
      href: '/agents',
    },
    {
      id: 'work',
      label: 'Work',
      status: openTasks.length ? 'live' : 'planned',
      current_truth: `${openTasks.length} open tasks, ${tasks.length - openTasks.length} completed tasks.`,
      bottleneck: openTasks.find((task) => task.column === 'review')?.title || 'No review task at the top.',
      next_action: 'Convert the top next move into a task.',
      href: '/tasks',
    },
    {
      id: 'brain',
      label: 'Brain',
      status: sources.some((source) => source.status === 'missing') ? 'needs_attention' : 'live',
      current_truth: `${sources.filter((source) => source.status === 'live').length}/${sources.length} source nodes are available.`,
      bottleneck: sources.find((source) => source.status === 'missing')?.label || 'Promotion queue needs regular review.',
      next_action: 'Promote durable findings from agent outputs.',
      href: '/memory',
    },
    {
      id: 'schedule',
      label: 'Schedule',
      status: 'planned',
      current_truth: `${schedule.length} Hermes jobs feed today/tomorrow planning.`,
      bottleneck: 'Apple Calendar/Reminders are read/planning rails only until reversible-action audit logs are implemented.',
      next_action: 'Create the daily schedule rail task.',
      href: '/schedule',
    },
    {
      id: 'domains',
      label: 'Domains',
      status: 'planned',
      current_truth: 'Finance, research/world imagery, performance, treasure, and ideas are mapped as domain hubs with source standards.',
      bottleneck: 'Domains need recurring source-backed briefs; no domain should act from unlabeled or stale intel.',
      next_action: 'Capture one high-leverage idea and route it to an agent.',
      href: '/domains',
    },
  ]

  return {
    generated_at: new Date().toISOString(),
    horizon: 'today_tomorrow',
    health,
    summary: {
      needs_wilson: needsWilson.length,
      jobs_total: jobs.length || Number(proofSummary.total ?? 0),
      approvals_required: Number(proofSummary.approval_required ?? approvalRows.length),
      unproven: Number(proofSummary.unproven ?? 0),
      broken_flows: bottlenecks.length,
      tasks_open: openTasks.length,
      gains: gains.length,
      next_moves: nextMoves.length,
      hermes_primary_drivers: company.primary_drivers.length,
      support_specialists: company.support_specialists.length,
      skills_total: company.skill_inventory.total,
      automations_ready: automationQueue.filter((item) => item.status === 'ready').length,
      identity_issues: identityIssueCount,
    },
    needs_wilson: needsWilson,
    bottlenecks,
    gains,
    next_moves: nextMoves,
    schedule,
    company,
    automation_queue: automationQueue,
    evidence_ledger: evidence,
    sections,
    sources,
    proof,
  }
}

export async function buildCompanyFlowPacket(): Promise<CompanyFlowPacket> {
  const status = await buildCommandCenterStatus({ refresh: true })
  const proofRows = proofJobs(status.proof)
  const nodes = new Map<string, FlowNode>()
  const edges: Array<FlowEdge> = []

  const flowStatusRank: Record<CommandCenterItem['status'], number> = {
    missing: 0,
    blocked: 1,
    stale: 2,
    inferred: 3,
    ready: 4,
    live: 5,
  }
  const addNode = (node: FlowNode) => {
    const current = nodes.get(node.id)
    if (!current) {
      nodes.set(node.id, node)
      return
    }
    nodes.set(node.id, {
      ...current,
      ...node,
      status: flowStatusRank[current.status] <= flowStatusRank[node.status] ? current.status : node.status,
      priority: current.priority === 'critical' || node.priority === 'critical' ? 'critical' : node.priority ?? current.priority,
    })
  }
  const edgeCounts = new Map<string, number>()
  const addEdge = (edge: FlowEdge) => {
    const count = edgeCounts.get(edge.id) ?? 0
    edgeCounts.set(edge.id, count + 1)
    edges.push(count === 0 ? edge : { ...edge, id: `${edge.id}-${count + 1}` })
  }

  addNode({
    id: 'agent-reddington',
    type: 'agent',
    label: 'Reddington CEO',
    column: 1,
    status: status.company.primary_drivers.find((agent) => agent.id === 'reddington')?.health === 'needs_attention' ? 'blocked' : 'live',
    priority: 'high',
    detail: 'Hermes CEO/chief orchestrator. Cowork and Claude Code support; they do not drive strategy.',
    href: '/agents',
  })

  for (const source of status.sources) {
    addNode({
      id: `source-${source.id}`,
      type: 'source',
      label: source.label,
      column: 0,
      status: source.status === 'live' ? 'live' : 'missing',
      detail: source.path,
      href: '/memory',
    })
    addEdge({
      id: `edge-${source.id}-reddington`,
      source: `source-${source.id}`,
      target: 'agent-reddington',
      label: 'feeds',
      status: source.status === 'live' ? 'healthy' : 'blocked',
    })
  }

  for (const employee of status.company.primary_drivers) {
    const agentNode = `agent-${employee.id.replace(/_/g, '-')}`
    addNode({
      id: agentNode,
      type: 'agent',
      label: employee.id === 'reddington' ? 'Reddington CEO' : employee.name,
      column: 1,
      status: employee.health === 'needs_attention' ? 'blocked' : employee.health === 'missing' ? 'missing' : employee.proof_status,
      priority: employee.health === 'needs_attention' ? 'high' : 'medium',
      detail: `${employee.department}: ${employee.current_work}`,
      href: '/agents',
    })
    if (employee.id !== 'reddington') {
      addEdge({
        id: `edge-reddington-${agentNode}`,
        source: 'agent-reddington',
        target: agentNode,
        label: 'orchestrates',
        status: employee.health === 'needs_attention' ? 'attention' : 'healthy',
      })
    }
  }

  for (const support of status.company.support_specialists) {
    const supportNode = `support-${support.id.replace(/_/g, '-')}`
    addNode({
      id: supportNode,
      type: 'support',
      label: `${support.name} support`,
      column: 1,
      status: support.health === 'needs_attention' ? 'blocked' : 'inferred',
      priority: 'medium',
      detail: `${support.department}: ${support.role}. Assigned by Hermes, not the main driver.`,
      href: '/agents',
    })
    addEdge({
      id: `edge-reddington-${supportNode}`,
      source: 'agent-reddington',
      target: supportNode,
      label: 'delegates support work',
      status: support.health === 'needs_attention' ? 'attention' : 'healthy',
    })
  }

  for (const automation of status.automation_queue) {
    const automationNode = `automation-${automation.id}`
    addNode({
      id: automationNode,
      type: 'automation',
      label: automation.title,
      column: 2,
      status: automation.status,
      priority: automation.priority,
      detail: `${automation.driver} · ${automation.cadence} · ${automation.autonomy}`,
      href: automation.href,
    })
    addEdge({
      id: `edge-reddington-${automationNode}`,
      source: 'agent-reddington',
      target: automationNode,
      label: 'queues',
      status: automation.status === 'blocked' ? 'blocked' : 'attention',
    })
  }

  for (const row of proofRows) {
    const id = asString(row.job_id)
    const agent = asString(row.agent) || agentNameFromJob(asString(row.name))
    const agentNode = `agent-${normalizeOwner(agent).replace(/_/g, '-')}`
    const jobNode = `job-${id}`
    const output = row.output as Record<string, unknown> | null
    const outputPath = asString(output?.path)
    const statusValue = asString(row.status)
    const isBlocked = statusValue !== 'ran_successfully'

    addNode({
      id: agentNode,
      type: 'agent',
      label: agent,
      column: 1,
      status: isBlocked ? 'blocked' : 'live',
      priority: isBlocked ? 'high' : 'medium',
      detail: asString(row.lane) || 'Agent lane',
      href: '/agents',
    })
    addNode({
      id: jobNode,
      type: 'job',
      label: asString(row.name) || id,
      column: 2,
      status: isBlocked ? 'blocked' : 'live',
      priority: isBlocked ? 'high' : 'medium',
      detail: `${asString(row.schedule)} · next ${asString(row.next_run_at) || 'unknown'}`,
      href: '/jobs',
    })
    addEdge({
      id: `edge-reddington-${agentNode}`,
      source: 'agent-reddington',
      target: agentNode,
      label: 'orchestrates',
      status: 'attention',
    })
    addEdge({
      id: `edge-${agentNode}-${jobNode}`,
      source: agentNode,
      target: jobNode,
      label: 'scheduled by',
      status: isBlocked ? 'attention' : 'healthy',
    })

    if (outputPath) {
      const outputNode = `output-${id}`
      addNode({
        id: outputNode,
        type: 'output',
        label: `${agent} output`,
        column: 3,
        status: 'live',
        detail: outputPath,
        href: '/company-flow',
      })
      addEdge({
        id: `edge-${jobNode}-${outputNode}`,
        source: jobNode,
        target: outputNode,
        label: 'produces',
        status: 'healthy',
      })
      const proofNode = `proof-${id}`
      addNode({
        id: proofNode,
        type: 'proof',
        label: statusValue || 'proof pending',
        column: 4,
        status: isBlocked ? 'blocked' : 'live',
        priority: isBlocked ? 'high' : 'medium',
        detail: asString(row.proof_failure_reason) || 'Proof status',
        href: '/company-flow',
      })
      addEdge({
        id: `edge-${outputNode}-${proofNode}`,
        source: outputNode,
        target: proofNode,
        label: 'proves',
        status: isBlocked ? 'blocked' : 'healthy',
      })
      if (statusValue === 'approval_required') {
        const approvalNode = `approval-${id}`
        addNode({
          id: approvalNode,
          type: 'approval',
          label: `${agent} approval`,
          column: 5,
          status: 'blocked',
          priority: 'critical',
          detail: 'Evidence exists, but the output needs classification before becoming durable truth.',
          href: '/company-flow',
        })
        addEdge({
          id: `edge-${proofNode}-${approvalNode}`,
          source: proofNode,
          target: approvalNode,
          label: 'requires approval',
          status: 'blocked',
        })
      }
    }
  }

  for (const gain of status.gains) {
    addNode({
      id: gain.id,
      type: 'gain',
      label: gain.title,
      column: 6,
      status: gain.status,
      priority: gain.priority,
      detail: gain.detail,
      href: gain.href,
    })
  }

  for (const move of status.next_moves) {
    addNode({
      id: move.id,
      type: 'next_move',
      label: move.title,
      column: 7,
      status: move.status,
      priority: move.priority,
      detail: move.detail,
      href: move.href,
    })
    addEdge({
      id: `edge-reddington-${move.id}`,
      source: 'agent-reddington',
      target: move.id,
      label: 'recommends',
      status: move.status === 'blocked' ? 'blocked' : 'attention',
    })
  }

  const skillCandidates = [
    {
      id: 'skill-approval-review-loop',
      title: 'Approval review loop',
      detail: 'Repeated proof classification should become a reusable curator skill after Wilson approves the workflow.',
      status: 'ready' as const,
      priority: 'medium' as const,
      owner: 'Hermes-curator',
      action: 'Draft a skill candidate once the review loop succeeds twice.',
      href: '/skills',
    },
  ]
  for (const candidate of skillCandidates) {
    addNode({
      id: candidate.id,
      type: 'skill_candidate',
      label: candidate.title,
      column: 7,
      status: candidate.status,
      priority: candidate.priority,
      detail: candidate.detail,
      href: candidate.href,
    })
  }

  return {
    ...status,
    mode: 'full_loop_with_external_gates',
    nodes: [...nodes.values()],
    edges,
    skill_candidates: skillCandidates,
  }
}
