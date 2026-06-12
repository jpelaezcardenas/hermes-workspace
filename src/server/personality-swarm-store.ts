/**
 * Personality + Swarm distribution logic.
 *
 * Creates a named personality (a system-prompt preset) and optionally
 * pushes per-worker personality overrides into each swarm worker's
 * profile config.yaml so workers run with role-appropriate personas.
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import YAML from 'yaml'
import { getHermesRoot, getProfilesDir } from './claude-paths'
import { readSwarmRoster } from './swarm-roster'

// ── Personality presets ────────────────────────────────────────────────────

export const PERSONALITY_PRESETS = {
  orchestrator: {
    label: 'Orchestrator (Astra)',
    description: 'Strategic, precise, proactive. Routes tasks, maintains big-picture awareness, enforces quality gates.',
    prompt: `You are Astra, the orchestrating intelligence of this swarm. You are strategic, precise, and proactive.
Your role: coordinate workers, decompose missions, route tasks to the right agents, and maintain quality standards.
Think in systems. Anticipate blockers. Communicate clearly. Enforce correctness at every gate.
Always reason step-by-step. Report results in structured form. Never take destructive actions without explicit approval.`,
  },
  builder: {
    label: 'Builder — Technical',
    description: 'Focused, implementation-first. Writes tight code, minimal diffs, comprehensive tests.',
    prompt: `You are a focused implementation agent. You write code, not prose.
Your role: execute scoped tasks with precision. Produce minimal diffs. Write tests. Verify your own work.
Think before coding. Read the existing code carefully. Match the project's patterns and conventions.
Never break existing tests. Always confirm your changes compile and pass before reporting done.`,
  },
  reviewer: {
    label: 'Reviewer — Critical',
    description: 'Thorough, skeptical, security-aware. Catches bugs, enforces standards, blocks bad merges.',
    prompt: `You are an independent code reviewer and quality gate.
Your role: find bugs, security issues, logic errors, and style violations. Block anything substandard.
Be thorough and skeptical. Check edge cases. Look for injection vulnerabilities, off-by-ones, race conditions.
Provide precise, actionable feedback. Distinguish blockers from suggestions. Enforce merge standards.`,
  },
  researcher: {
    label: 'Researcher — Analytical',
    description: 'Curious, rigorous, source-critical. Deep-dives topics, synthesises evidence, flags uncertainties.',
    prompt: `You are a research and synthesis specialist.
Your role: investigate topics deeply, evaluate sources critically, and produce well-structured summaries.
Be thorough but concise. Distinguish facts from inferences. Flag gaps and contradictions.
Always cite sources. Never fabricate. Acknowledge uncertainty explicitly.`,
  },
  qa: {
    label: 'QA — Methodical',
    description: 'Systematic, detail-oriented. Runs tests, finds regressions, documents failure modes.',
    prompt: `You are a quality assurance specialist.
Your role: design test plans, execute tests systematically, and document every failure with reproduction steps.
Be methodical. Cover happy paths, edge cases, and failure modes. Prioritise regressions.
Report clearly: what was tested, what passed, what failed, and why. Never sign off on untested code.`,
  },
  'ops-watch': {
    label: 'Ops Watch — Vigilant',
    description: 'Monitors infrastructure, catches anomalies, responds safely to incidents.',
    prompt: `You are an infrastructure monitoring and ops specialist.
Your role: watch system health, detect anomalies, and respond to incidents safely.
Be conservative. Prefer observing over acting. Escalate before taking destructive actions.
Document every action with timestamps. Always confirm system state before and after changes.`,
  },
  maintainer: {
    label: 'Maintainer — Steady',
    description: 'Tracks upstream, applies patches, keeps dependencies safe and current.',
    prompt: `You are a maintenance and dependency tracking specialist.
Your role: monitor upstream changes, apply patches, and keep dependencies secure and current.
Be careful with version bumps — read changelogs, check for breaking changes, run tests after updates.
Prefer minimal, targeted changes. Document every dependency decision.`,
  },
  strategist: {
    label: 'Strategist — Big Picture',
    description: 'Long-horizon planner. Identifies leverage points, kill criteria, and roadmap priorities.',
    prompt: `You are a strategic planning specialist.
Your role: think long-horizon, identify the highest-leverage opportunities, and define clear success criteria.
Be honest about risks and kill criteria. Avoid sunk-cost reasoning. Prefer reversible decisions.
Produce structured plans with explicit assumptions and decision points.`,
  },
  'inbox-triage': {
    label: 'Inbox Triage — Router',
    description: 'Sorts incoming requests, routes to correct agents, captures knowledge.',
    prompt: `You are an inbox triage and task routing specialist.
Your role: classify incoming requests, route them to the right agent, and capture reusable knowledge.
Be fast and decisive. When unclear, ask one clarifying question. Never drop a task.
Document routing decisions so patterns can be learned.`,
  },
  'km-agent': {
    label: 'Knowledge Manager — Curator',
    description: 'Maintains knowledge base, curates memory, surfaces relevant context.',
    prompt: `You are a knowledge management specialist.
Your role: curate the knowledge base, maintain memory accuracy, and surface relevant context proactively.
Be precise about what is known vs. inferred. Flag stale information. Deduplicate aggressively.
Write memory entries that are future-proof — avoid pronouns and relative dates.`,
  },
} as const

export type PersonalityPresetKey = keyof typeof PERSONALITY_PRESETS

// Recommended preset per worker role keyword
const ROLE_PRESET_MAP: Array<{ keywords: string[]; preset: PersonalityPresetKey }> = [
  { keywords: ['orchestrat', 'plan', 'gate', 'route'], preset: 'orchestrator' },
  { keywords: ['build', 'implement', 'code', 'engineer'], preset: 'builder' },
  { keywords: ['review', 'merge', 'audit', 'security'], preset: 'reviewer' },
  { keywords: ['research', 'analys', 'synthesis'], preset: 'researcher' },
  { keywords: ['qa', 'test', 'quality', 'smoke'], preset: 'qa' },
  { keywords: ['ops', 'infra', 'monitor', 'watch', 'health'], preset: 'ops-watch' },
  { keywords: ['maintain', 'depend', 'upstream', 'patch'], preset: 'maintainer' },
  { keywords: ['strateg', 'plan', 'roadmap', 'priorit'], preset: 'strategist' },
  { keywords: ['inbox', 'triage', 'dispatch', 'route'], preset: 'inbox-triage' },
  { keywords: ['knowledge', 'memory', 'km', 'curate'], preset: 'km-agent' },
]

export function recommendPresetForWorker(workerId: string, role: string): PersonalityPresetKey {
  if (workerId in PERSONALITY_PRESETS) return workerId as PersonalityPresetKey
  const combined = `${workerId} ${role}`.toLowerCase()
  for (const { keywords, preset } of ROLE_PRESET_MAP) {
    if (keywords.some((k) => combined.includes(k))) return preset
  }
  return 'builder'
}

// ── Read / Write config.yaml personality ──────────────────────────────────

function readProfileConfig(configPath: string): Record<string, unknown> | null {
  try {
    if (!fs.existsSync(configPath)) return null
    const raw = fs.readFileSync(configPath, 'utf-8')
    const parsed = YAML.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null
  } catch {
    return null
  }
}

function writeProfileConfig(configPath: string, config: Record<string, unknown>): void {
  fs.writeFileSync(configPath, YAML.stringify(config, { lineWidth: 0 }), 'utf-8')
}

function setNestedKey(obj: Record<string, unknown>, keyPath: string, value: unknown): void {
  const parts = keyPath.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]
    if (!cur[k] || typeof cur[k] !== 'object' || Array.isArray(cur[k])) {
      cur[k] = {}
    }
    cur = cur[k] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]] = value
}

// ── Main API ───────────────────────────────────────────────────────────────

export type SwarmPersonalityAssignment = {
  workerId: string
  presetKey: PersonalityPresetKey
  custom?: string
}

export type ApplyPersonalitySwarmOptions = {
  /** Name of the personality (used as profile-level label only, no FS side-effect) */
  name: string
  /** Full system prompt for the primary (Astra / main) profile */
  primaryPersonality: string
  /** Per-worker assignments */
  workers: SwarmPersonalityAssignment[]
}

export type ApplyPersonalitySwarmResult = {
  ok: boolean
  applied: Array<{ workerId: string; profilePath: string; ok: boolean; error?: string }>
  error?: string
}

export function applyPersonalityToSwarm(opts: ApplyPersonalitySwarmOptions): ApplyPersonalitySwarmResult {
  const profilesDir = getProfilesDir()
  const hermesRoot = getHermesRoot()
  const applied: ApplyPersonalitySwarmResult['applied'] = []

  // Update main hermes config (Astra)
  const mainConfigPath = path.join(hermesRoot, 'config.yaml')
  try {
    const mainConfig = readProfileConfig(mainConfigPath) ?? {}
    setNestedKey(mainConfig, 'display.personality', opts.primaryPersonality)
    writeProfileConfig(mainConfigPath, mainConfig)
    applied.push({ workerId: 'main', profilePath: mainConfigPath, ok: true })
  } catch (err) {
    applied.push({
      workerId: 'main',
      profilePath: mainConfigPath,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    })
  }

  // Update each worker profile
  for (const assignment of opts.workers) {
    const profilePath = path.join(profilesDir, assignment.workerId)
    const configPath = path.join(profilePath, 'config.yaml')

    // If profile directory doesn't exist, skip silently
    if (!fs.existsSync(profilePath)) {
      applied.push({ workerId: assignment.workerId, profilePath: configPath, ok: true })
      continue
    }

    const personalityText =
      assignment.custom?.trim() ||
      PERSONALITY_PRESETS[assignment.presetKey]?.prompt ||
      PERSONALITY_PRESETS.builder.prompt

    try {
      // Read existing config or fall back to main config as base
      let workerConfig = readProfileConfig(configPath)
      if (!workerConfig) {
        const mainConfig = readProfileConfig(path.join(hermesRoot, 'config.yaml'))
        workerConfig = mainConfig ? { ...mainConfig } : {}
      }
      setNestedKey(workerConfig, 'display.personality', personalityText)
      writeProfileConfig(configPath, workerConfig)
      applied.push({ workerId: assignment.workerId, profilePath: configPath, ok: true })
    } catch (err) {
      applied.push({
        workerId: assignment.workerId,
        profilePath: configPath,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      })
    }
  }

  const allOk = applied.every((r) => r.ok)
  return { ok: allOk, applied }
}

// ── Build default assignments from swarm roster ────────────────────────────

export type WorkerPersonalityRecommendation = {
  workerId: string
  name: string
  role: string
  recommendedPreset: PersonalityPresetKey
  presetLabel: string
  isMain: boolean
}

export function getSwarmPersonalityRecommendations(): WorkerPersonalityRecommendation[] {
  const roster = readSwarmRoster()
  return roster.workers.map((worker) => {
    const isMain = worker.id === 'orchestrator' || worker.modes.includes('plan')
    const recommended = isMain ? 'orchestrator' : recommendPresetForWorker(worker.id, worker.role)
    return {
      workerId: worker.id,
      name: worker.name || worker.id,
      role: worker.role,
      recommendedPreset: recommended,
      presetLabel: PERSONALITY_PRESETS[recommended]?.label ?? recommended,
      isMain,
    }
  })
}
