#!/usr/bin/env node
import { existsSync, lstatSync, mkdirSync, readFileSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import YAML from 'yaml'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(scriptDir, '..')
const rosterPath = join(repoRoot, 'swarm.yaml')
const home = homedir()
const hermesHome = join(home, '.hermes')
const profilesDir = join(hermesHome, 'profiles')
const localBin = join(home, '.local', 'bin')

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`
}

function resolveModel(label) {
  if (!label) return null
  const normalized = String(label).trim().toLowerCase().replace(/\s+/g, ' ')
  if (!normalized || normalized === 'worker') return null

  if (/^opus\s*4\.7$|^claude\s*opus\s*4\.7$/.test(normalized)) {
    return { provider: 'anthropic-oauth', default: 'claude-opus-4-7' }
  }
  if (/^opus\s*4\.6$|^claude\s*opus\s*4\.6$/.test(normalized)) {
    return { provider: 'anthropic-oauth', default: 'claude-opus-4-6' }
  }
  if (/^sonnet\s*4\.6$|^claude\s*sonnet\s*4\.6$/.test(normalized)) {
    return { provider: 'anthropic-oauth', default: 'claude-sonnet-4-6' }
  }
  if (/^gpt[- ]?5\.5$|^codex\s*\(?gpt[- ]?5\.5\)?$/.test(normalized)) {
    return { provider: 'openai-codex', default: 'gpt-5.5' }
  }
  if (/^gpt[- ]?5\.4$|^codex\s*\(?gpt[- ]?5\.4\)?$/.test(normalized)) {
    return { provider: 'openai-codex', default: 'gpt-5.4' }
  }
  if (/^spark$|^gpt[- ]?5\.3\s*spark$|^gpt[- ]?5\.3[- ]codex(?:[- ]?spark)?$/.test(normalized)) {
    return { provider: 'openai-codex', default: 'gpt-5.3-codex-spark' }
  }
  if (/^gemini\s*3\.1\s*pro(?:\s*preview)?$|^gemini[- ]?3\.1[- ]pro[- ]preview$/.test(normalized)) {
    return { provider: 'google-gemini-cli', default: 'gemini-3.1-pro-preview', base_url: 'cloudcode-pa://google' }
  }
  if (/^gemini\s*3\s*flash(?:\s*preview)?$|^gemini[- ]?3[- ]flash[- ]preview$|^gemini\s*flash$/.test(normalized)) {
    return { provider: 'google-gemini-cli', default: 'gemini-3-flash-preview', base_url: 'cloudcode-pa://google' }
  }

  const passthrough = String(label).trim().match(/^([\w.-]+)\/(.+)$/)
  if (passthrough) return { provider: passthrough[1], default: passthrough[2] }
  return null
}

function linkSecret(profilePath, filename) {
  const source = join(hermesHome, filename)
  const target = join(profilePath, filename)
  if (!existsSync(source)) return false
  if (existsSync(target)) {
    const stat = lstatSync(target)
    if (!stat.isSymbolicLink()) return false
    unlinkSync(target)
  }
  symlinkSync(source, target)
  return true
}

function renderIdentity(worker) {
  const name = worker.name || worker.id
  const role = worker.role || 'Worker'
  const specialty = worker.specialty || 'General execution'
  const model = worker.model || 'Unspecified'
  const mission = worker.mission || 'Execute assigned swarm work and checkpoint progress.'
  const skills = Array.isArray(worker.skills) && worker.skills.length ? worker.skills.join(', ') : `${worker.id}-core`
  const capabilities = Array.isArray(worker.capabilities) && worker.capabilities.length ? worker.capabilities.join(', ') : 'not declared'
  const routeWhen = Array.isArray(worker.routeWhen) && worker.routeWhen.length
    ? worker.routeWhen.map((item) => `- ${item}`).join('\n')
    : '- Direct assignments from Cael Router.'
  const delegateTo = Array.isArray(worker.delegateTo) && worker.delegateTo.length ? worker.delegateTo.join(', ') : 'none'

  return [
    `# IDENTITY.md - ${name}`,
    '',
    `- Name: ${name}`,
    `- Worker ID: ${worker.id}`,
    `- Role: ${role}`,
    `- Specialty: ${specialty}`,
    `- Mission: ${mission}`,
    `- Skills: ${skills}`,
    `- Capabilities: ${capabilities}`,
    `- Model: ${model}`,
    `- Budget class: ${worker.budgetClass || 'standard'}`,
    `- Delegate to: ${delegateTo}`,
    '',
    '## Route when',
    routeWhen,
    '',
    '## Job description',
    `${name} is the ${role} lane. ${mission}`,
    '',
    'The worker ID is a stable machine identifier only; user-facing surfaces should prefer `Name - Role`.',
    '',
  ].join('\n')
}

function writeWrapper(worker, profilePath) {
  const wrapperName = worker.wrapper || worker.id
  const wrapperPath = join(localBin, wrapperName)
  const cwd = worker.defaultCwd || repoRoot
  const hermesBin = '${HERMES_CLI_BIN:-$HOME/.hermes/hermes-agent/venv/bin/hermes}'
  const body = [
    '#!/usr/bin/env bash',
    'set -euo pipefail',
    `export HERMES_HOME=${shellQuote(profilePath)}`,
    `cd ${shellQuote(cwd)}`,
    `exec "${hermesBin}" chat --tui`,
    '',
  ].join('\n')
  writeFileSync(wrapperPath, body, { mode: 0o755 })
  return wrapperPath
}

if (!existsSync(rosterPath)) {
  console.error(`Missing roster: ${rosterPath}`)
  process.exit(1)
}

const roster = YAML.parse(readFileSync(rosterPath, 'utf8'))
const workers = Array.isArray(roster?.workers) ? roster.workers : []
mkdirSync(profilesDir, { recursive: true })
mkdirSync(localBin, { recursive: true })

const summary = []
for (const worker of workers) {
  if (!worker?.id) continue
  const profileId = worker.profile || worker.id
  const profilePath = join(profilesDir, profileId)
  mkdirSync(join(profilePath, 'memory'), { recursive: true })

  const configPath = join(profilePath, 'config.yaml')
  let config = {}
  if (existsSync(configPath)) {
    config = YAML.parse(readFileSync(configPath, 'utf8')) || {}
  } else {
    const sourceConfig = join(hermesHome, 'config.yaml')
    config = existsSync(sourceConfig)
      ? YAML.parse(readFileSync(sourceConfig, 'utf8')) || {}
      : {}
  }

  const resolvedModel = resolveModel(worker.model)
  if (resolvedModel) {
    const existingModel = config.model && typeof config.model === 'object' ? config.model : {}
    config.model = { ...existingModel, ...resolvedModel }
  }
  writeFileSync(configPath, YAML.stringify(config, { lineWidth: 0 }), { mode: 0o600 })

  const envLinked = linkSecret(profilePath, '.env')
  const authLinked = linkSecret(profilePath, 'auth.json')
  writeFileSync(join(profilePath, 'memory', 'IDENTITY.md'), renderIdentity(worker), 'utf8')
  const wrapperPath = writeWrapper(worker, profilePath)

  summary.push({
    id: worker.id,
    model: resolvedModel ? `${resolvedModel.provider}/${resolvedModel.default}` : 'unchanged',
    profile: profilePath,
    wrapper: wrapperPath,
    envLinked,
    authLinked,
  })
}

console.log(JSON.stringify({ ok: true, workers: summary }, null, 2))
