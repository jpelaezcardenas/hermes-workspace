import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let tmpRoot: string
let outsideRoot: string

async function loadModule() {
  vi.resetModules()
  return await import('./second-brain-files')
}

beforeEach(() => {
  tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'second-brain-files-'))
  outsideRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'second-brain-outside-'))
  fs.mkdirSync(path.join(tmpRoot, 'nested'), { recursive: true })
  fs.writeFileSync(path.join(tmpRoot, 'index.md'), '# Index\n', 'utf8')
  fs.writeFileSync(path.join(tmpRoot, 'nested', 'note.txt'), 'note\n', 'utf8')
  fs.writeFileSync(path.join(tmpRoot, '.env'), 'SECRET=value\n', 'utf8')
  fs.writeFileSync(path.join(tmpRoot, 'raw.sqlite'), 'sqlite-ish', 'utf8')
  fs.writeFileSync(path.join(outsideRoot, 'secret.md'), 'escape\n', 'utf8')
  try {
    fs.symlinkSync(path.join(outsideRoot, 'secret.md'), path.join(tmpRoot, 'nested', 'escape.md'))
  } catch {
    // Symlink creation can be unavailable on some platforms; the symlink-specific
    // assertion is skipped if setup fails.
  }
  process.env.SECOND_BRAIN_PERSONAL_KV_DIR = tmpRoot
  process.env.SECOND_BRAIN_BUSINESS_KV_DIR = path.join(tmpRoot, 'missing-business')
  process.env.SECOND_BRAIN_RECEIPTS_DIR = path.join(tmpRoot, 'receipts')
  process.env.SECOND_BRAIN_DOCS_DIR = path.join(tmpRoot, 'docs')
})

afterEach(async () => {
  const mod = await loadModule()
  mod.resetSecondBrainTestEnvironment()
  fs.rmSync(tmpRoot, { recursive: true, force: true })
  fs.rmSync(outsideRoot, { recursive: true, force: true })
})

describe('second brain files source registry', () => {
  it('separates personal, business, receipts, and docs sources', async () => {
    const { listSecondBrainSources } = await loadModule()

    const sources = await listSecondBrainSources()

    expect(sources.map((source) => source.id)).toEqual([
      'personal-kv',
      'business-kv',
      'receipts',
      'docs',
    ])
    expect(sources.find((source) => source.id === 'personal-kv')?.status).toBe('available')
    expect(sources.find((source) => source.id === 'business-kv')?.status).toBe('missing')
  })

  it('lists only allowed markdown/text files and hides raw secrets/runtime files', async () => {
    const { listSecondBrainEntries } = await loadModule()

    const result = await listSecondBrainEntries('personal-kv')

    expect(result.entries.map((entry) => entry.name)).toContain('index.md')
    expect(result.entries.map((entry) => entry.name)).toContain('nested')
    expect(result.entries.map((entry) => entry.name)).not.toContain('.env')
    expect(result.entries.map((entry) => entry.name)).not.toContain('raw.sqlite')
  })

  it('rejects absolute paths and traversal', async () => {
    const { readSecondBrainFile } = await loadModule()

    await expect(readSecondBrainFile('personal-kv', '/etc/passwd')).rejects.toThrow(/Absolute paths/)
    await expect(readSecondBrainFile('personal-kv', '../index.md')).rejects.toThrow(/traversal/)
  })

  it('rejects symlink escapes before reading content', async () => {
    const { readSecondBrainFile } = await loadModule()
    const linkPath = path.join(tmpRoot, 'nested', 'escape.md')
    if (!fs.existsSync(linkPath)) return

    await expect(readSecondBrainFile('personal-kv', 'nested/escape.md')).rejects.toThrow(/escapes/)
  })

  it('rejects raw database and secret file reads', async () => {
    const { readSecondBrainFile } = await loadModule()

    await expect(readSecondBrainFile('personal-kv', 'raw.sqlite')).rejects.toThrow(/Denied|markdown\/text/)
    await expect(readSecondBrainFile('personal-kv', '.env')).rejects.toThrow(/Denied|markdown\/text/)
  })

  it('uses expectedHash guards and writes audit-backed atomic text updates', async () => {
    const { readSecondBrainFile, writeSecondBrainFile } = await loadModule()
    const before = await readSecondBrainFile('personal-kv', 'index.md')

    await expect(
      writeSecondBrainFile({
        sourceId: 'personal-kv',
        path: 'index.md',
        content: '# Conflict\n',
        expectedHash: 'wrong',
      }),
    ).rejects.toThrow(/Hash conflict/)

    const saved = await writeSecondBrainFile({
      sourceId: 'personal-kv',
      path: 'index.md',
      content: '# Updated\n',
      expectedHash: before.hash,
    })
    expect(saved.hash).not.toBe(before.hash)
    expect(fs.readFileSync(path.join(tmpRoot, 'index.md'), 'utf8')).toBe('# Updated\n')
  })

  it('builds deterministic n8n idempotency keys without requiring a webhook', async () => {
    const { dispatchSecondBrainWorkflow } = await loadModule()

    const first = await dispatchSecondBrainWorkflow({
      operation: 'reingest',
      sourceId: 'personal-kv',
      path: 'index.md',
      hash: 'abc',
    })
    const second = await dispatchSecondBrainWorkflow({
      operation: 'reingest',
      sourceId: 'personal-kv',
      path: './index.md',
      hash: 'abc',
    })

    expect(first.status).toBe('dry_run')
    expect(first.idempotencyKey).toBe(second.idempotencyKey)
  })

  it('enforces the same file boundary before dispatching to n8n', async () => {
    const { dispatchSecondBrainWorkflow } = await loadModule()

    await expect(
      dispatchSecondBrainWorkflow({
        operation: 'ingest',
        sourceId: 'personal-kv',
        path: 'raw.sqlite',
      }),
    ).rejects.toThrow(/Denied|markdown\/text/)
    await expect(
      dispatchSecondBrainWorkflow({
        operation: 'ingest',
        sourceId: 'personal-kv',
        path: 'nested/escape.md',
      }),
    ).rejects.toThrow(/escapes|Path not found/)
  })
})
