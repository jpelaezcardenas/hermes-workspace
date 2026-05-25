import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getStateDir } from './workspace-state-dir'

export type KnowledgeBaseSource =
  | { type: 'local'; path: string }
  | { type: 'github'; repo: string; branch: string; path: string }

export type KnowledgeBaseConfig = {
  source: KnowledgeBaseSource
}

const DEFAULT_CONFIG: KnowledgeBaseConfig = {
  source: { type: 'local', path: '' },
}

function expandHome(input: string): string {
  return input.replace(/^~(?=$|\/)/, os.homedir())
}

function resolveConfiguredPath(input: string): string {
  return path.resolve(expandHome(input.trim()))
}

function directoryExists(input: string): boolean {
  try {
    return fs.statSync(input).isDirectory()
  } catch {
    return false
  }
}

export function getDefaultKnowledgeRoot(): string {
  if (process.env.KNOWLEDGE_DIR?.trim()) {
    return resolveConfiguredPath(process.env.KNOWLEDGE_DIR)
  }

  const candidates = [
    process.env.SECOND_BRAIN_PERSONAL_KV_DIR,
    '~/StorageRuntime/KnowledgeVault/personal',
    '~/.codex/knowledge-vault',
    '~/.claude/knowledge',
    '~/knowledge/wiki',
  ]
    .map((candidate) => candidate?.trim())
    .filter((candidate): candidate is string => Boolean(candidate))
    .map(resolveConfiguredPath)

  return (
    candidates.find(directoryExists) ??
    resolveConfiguredPath('~/StorageRuntime/KnowledgeVault/personal')
  )
}

function getConfigPath(): string {
  return path.join(getStateDir(), 'knowledge-config.json')
}

export function readKnowledgeBaseConfig(): KnowledgeBaseConfig {
  const configPath = getConfigPath()
  try {
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, 'utf-8')
      const parsed = JSON.parse(raw) as Partial<KnowledgeBaseConfig>
      return {
        source: parsed.source ?? DEFAULT_CONFIG.source,
      }
    }
  } catch {
    // ignore parse errors, use default
  }
  return DEFAULT_CONFIG
}

export function writeKnowledgeBaseConfig(config: KnowledgeBaseConfig): void {
  const configPath = getConfigPath()
  const dir = path.dirname(configPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')
}

export function getKnowledgeBaseEffectiveRoot(): string {
  const config = readKnowledgeBaseConfig()
  if (config.source.type === 'local') {
    const p = config.source.path.trim()
    if (p) return resolveConfiguredPath(p)
  }
  return getDefaultKnowledgeRoot()
}
