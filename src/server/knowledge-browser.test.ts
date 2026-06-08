import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type * as KnowledgeBrowser from './knowledge-browser'
import type { KnowledgeGraph, WikiPageMeta } from './knowledge-browser'
import type { KnowledgeBaseConfig } from './knowledge-config'

// Each spec resolves its own knowledge root through HERMES_WORKSPACE_STATE_DIR
// (which feeds getStateDir → knowledge-config.json) so the module under test
// reads a deterministic on-disk fixture. No module-level caching exists in
// knowledge-browser, so plain dynamic re-imports stay isolated per test.

let stateDir = ''
let knowledgeDir = ''
let originalKnowledgeDir: string | undefined

function writeConfig(config: KnowledgeBaseConfig): void {
  const configPath = path.join(stateDir, 'knowledge-config.json')
  fs.mkdirSync(path.dirname(configPath), { recursive: true })
  fs.writeFileSync(configPath, JSON.stringify(config), 'utf-8')
}

function useLocalKnowledgeDir(): void {
  writeConfig({ source: { type: 'local', path: knowledgeDir } })
}

function writePage(relativePath: string, contents: string): string {
  const full = path.join(knowledgeDir, relativePath)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, contents, 'utf-8')
  return full
}

function setMtime(relativePath: string, isoTime: string): void {
  const full = path.join(knowledgeDir, relativePath)
  const time = new Date(isoTime)
  fs.utimesSync(full, time, time)
}

async function loadModule(): Promise<typeof KnowledgeBrowser> {
  return import('./knowledge-browser')
}

beforeEach(() => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'knowledge-browser-'))
  stateDir = path.join(root, 'state')
  knowledgeDir = path.join(root, 'knowledge')
  fs.mkdirSync(stateDir, { recursive: true })
  fs.mkdirSync(knowledgeDir, { recursive: true })
  process.env.HERMES_WORKSPACE_STATE_DIR = stateDir
  originalKnowledgeDir = process.env.KNOWLEDGE_DIR
  delete process.env.KNOWLEDGE_DIR
  useLocalKnowledgeDir()
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  delete process.env.HERMES_WORKSPACE_STATE_DIR
  if (originalKnowledgeDir === undefined) {
    delete process.env.KNOWLEDGE_DIR
  } else {
    process.env.KNOWLEDGE_DIR = originalKnowledgeDir
  }
  const parent = path.dirname(stateDir)
  fs.rmSync(parent, { recursive: true, force: true })
})

describe('listKnowledgePages', () => {
  it('lists markdown pages with parsed frontmatter and defaults', async () => {
    writePage(
      'alpha.md',
      [
        '---',
        'title: Alpha Page',
        'type: note',
        'domain: ops',
        'status: draft',
        'tags: [one, two]',
        'summary: A summary',
        'created: 2024-01-01',
        'updated: 2024-02-01T00:00:00.000Z',
        '---',
        'Body with [[beta]] link.',
      ].join('\n'),
    )
    writePage('beta.md', 'No frontmatter here. Links to [[alpha]].')

    const mod = await loadModule()
    const pages = mod.listKnowledgePages()

    expect(pages).toHaveLength(2)
    const byPath = new Map<string, WikiPageMeta>(pages.map((p) => [p.path, p]))
    const alpha = byPath.get('alpha.md')
    expect(alpha).toBeDefined()
    if (!alpha) throw new Error('alpha missing')
    expect(alpha.title).toBe('Alpha Page')
    expect(alpha.type).toBe('note')
    expect(alpha.domain).toBe('ops')
    expect(alpha.status).toBe('draft')
    expect(alpha.tags).toEqual(['one', 'two'])
    expect(alpha.summary).toBe('A summary')
    expect(alpha.created).toBe('2024-01-01')
    expect(alpha.updated).toBe('2024-02-01T00:00:00.000Z')
    expect(alpha.wikilinks).toEqual(['beta'])
    expect(alpha.size).toBeGreaterThan(0)
    expect(typeof alpha.modified).toBe('string')

    const beta = byPath.get('beta.md')
    expect(beta).toBeDefined()
    if (!beta) throw new Error('beta missing')
    // No frontmatter title → derived from filename.
    expect(beta.title).toBe('beta')
    expect(beta.type).toBeUndefined()
    expect(beta.tags).toEqual([])
    // updated falls back to modified mtime when frontmatter omits it.
    expect(beta.updated).toBe(beta.modified)
  })

  it('returns an empty array when the knowledge root does not exist', async () => {
    fs.rmSync(knowledgeDir, { recursive: true, force: true })
    const mod = await loadModule()
    expect(mod.listKnowledgePages()).toEqual([])
  })

  it('skips .git and node_modules directories but recurses real subdirs', async () => {
    writePage('docs/nested.md', '# Nested')
    writePage('.git/config.md', '# Should be skipped')
    writePage('node_modules/pkg/readme.md', '# Should be skipped')

    const mod = await loadModule()
    const paths = mod.listKnowledgePages().map((p) => p.path)

    expect(paths).toContain('docs/nested.md')
    expect(paths).not.toContain('.git/config.md')
    expect(paths.some((p) => p.includes('node_modules'))).toBe(false)
  })

  it('ignores non-markdown files', async () => {
    writePage('keep.md', '# Keep')
    fs.writeFileSync(path.join(knowledgeDir, 'skip.txt'), 'plain', 'utf-8')
    fs.writeFileSync(path.join(knowledgeDir, 'data.json'), '{}', 'utf-8')

    const mod = await loadModule()
    const paths = mod.listKnowledgePages().map((p) => p.path)
    expect(paths).toEqual(['keep.md'])
  })

  it('sorts by updated descending, then path ascending', async () => {
    writePage('old.md', 'old')
    writePage('newer.md', 'newer')
    writePage('a-tie.md', 'tie')
    writePage('b-tie.md', 'tie')
    setMtime('old.md', '2020-01-01T00:00:00.000Z')
    setMtime('newer.md', '2024-01-01T00:00:00.000Z')
    // Equal mtimes → ordered by path ascending.
    setMtime('a-tie.md', '2022-01-01T00:00:00.000Z')
    setMtime('b-tie.md', '2022-01-01T00:00:00.000Z')

    const mod = await loadModule()
    const paths = mod.listKnowledgePages().map((p) => p.path)
    expect(paths).toEqual(['newer.md', 'a-tie.md', 'b-tie.md', 'old.md'])
  })

  it('normalizes a comma-separated string tags value', async () => {
    writePage(
      'tags.md',
      ['---', 'tags: red, green , , blue', '---', 'body'].join('\n'),
    )
    const mod = await loadModule()
    const page = mod.listKnowledgePages().find((p) => p.path === 'tags.md')
    expect(page?.tags).toEqual(['red', 'green', 'blue'])
  })

  it('falls back to empty data when frontmatter YAML is malformed', async () => {
    writePage(
      'broken.md',
      ['---', 'title: [unterminated', '---', 'Body text'].join('\n'),
    )
    const mod = await loadModule()
    const page = mod.listKnowledgePages().find((p) => p.path === 'broken.md')
    expect(page).toBeDefined()
    if (!page) throw new Error('broken missing')
    // Malformed YAML → title derives from filename, no tags.
    expect(page.title).toBe('broken')
    expect(page.tags).toEqual([])
  })

  it('treats non-object frontmatter (scalar) as empty data', async () => {
    writePage('scalar.md', ['---', 'just-a-string', '---', 'Body'].join('\n'))
    const mod = await loadModule()
    const page = mod.listKnowledgePages().find((p) => p.path === 'scalar.md')
    expect(page?.title).toBe('scalar')
    expect(page?.tags).toEqual([])
  })

  it('dedupes wikilinks and strips alias/anchor parts', async () => {
    writePage(
      'links.md',
      'See [[Target|Alias]] and [[Target#section]] and [[Other]].',
    )
    const mod = await loadModule()
    const page = mod.listKnowledgePages().find((p) => p.path === 'links.md')
    expect(page?.wikilinks).toEqual(['Target', 'Other'])
  })
})

describe('knowledgeRootExists', () => {
  it('returns true for an existing local root', async () => {
    writePage('x.md', 'x')
    const mod = await loadModule()
    expect(mod.knowledgeRootExists()).toBe(true)
  })

  it('returns false when the local root is absent', async () => {
    fs.rmSync(knowledgeDir, { recursive: true, force: true })
    const mod = await loadModule()
    expect(mod.knowledgeRootExists()).toBe(false)
  })

  it('uses the legacy KNOWLEDGE_DIR env var when config path is empty', async () => {
    writeConfig({ source: { type: 'local', path: '' } })
    process.env.KNOWLEDGE_DIR = knowledgeDir
    writePage('legacy.md', 'legacy')
    const mod = await loadModule()
    expect(mod.knowledgeRootExists()).toBe(true)
    expect(mod.listKnowledgePages().map((p) => p.path)).toEqual(['legacy.md'])
  })

  it('checks the github cache directory for github sources', async () => {
    writeConfig({
      source: {
        type: 'github',
        repo: 'owner/repo',
        branch: 'main',
        path: 'docs',
      },
    })
    const mod = await loadModule()
    // No cache populated → not cached.
    expect(mod.knowledgeRootExists()).toBe(false)

    // Seed the deterministic cache path the provider computes.
    const cacheDir = path.join(
      os.homedir(),
      '.claude',
      'knowledge-cache',
      'github',
      'owner_repo',
      'main',
      'docs',
    )
    fs.mkdirSync(cacheDir, { recursive: true })
    fs.writeFileSync(path.join(cacheDir, 'page.md'), '# cached', 'utf-8')
    try {
      expect(mod.knowledgeRootExists()).toBe(true)
    } finally {
      fs.rmSync(path.join(os.homedir(), '.claude', 'knowledge-cache'), {
        recursive: true,
        force: true,
      })
    }
  })
})

describe('readKnowledgePage', () => {
  it('reads content, meta, and computes backlinks', async () => {
    writePage('target.md', '# Target body')
    writePage('one.md', 'Refers to [[target]].')
    writePage('two.md', 'Also references [[Target]].')
    writePage('three.md', 'No reference here.')

    const mod = await loadModule()
    const page = mod.readKnowledgePage('target.md')

    expect(page.meta.path).toBe('target.md')
    expect(page.content).toContain('# Target body')
    expect(page.backlinks.sort()).toEqual(['one.md', 'two.md'])
  })

  it('throws ENOENT for a missing page', async () => {
    const mod = await loadModule()
    expect(() => mod.readKnowledgePage('missing.md')).toThrow(/ENOENT/)
  })

  it('rejects an empty path', async () => {
    const mod = await loadModule()
    expect(() => mod.readKnowledgePage('   ')).toThrow(/Path is required/)
  })

  it('rejects absolute paths', async () => {
    const mod = await loadModule()
    expect(() => mod.readKnowledgePage('/etc/passwd.md')).toThrow(
      /Absolute paths are not allowed/,
    )
  })

  it('rejects path traversal', async () => {
    const mod = await loadModule()
    expect(() => mod.readKnowledgePage('../escape.md')).toThrow(
      /Path traversal is not allowed/,
    )
  })

  it('rejects non-markdown paths', async () => {
    const mod = await loadModule()
    expect(() => mod.readKnowledgePage('notes.txt')).toThrow(
      /Only Markdown files are allowed/,
    )
  })

  it('throws when the resolved path is a directory, not a file', async () => {
    fs.mkdirSync(path.join(knowledgeDir, 'adir.md'), { recursive: true })
    const mod = await loadModule()
    expect(() => mod.readKnowledgePage('adir.md')).toThrow(/ENOENT/)
  })

  it('excludes self-references from backlinks', async () => {
    writePage('selfie.md', 'I link to [[selfie]] myself.')
    const mod = await loadModule()
    const page = mod.readKnowledgePage('selfie.md')
    expect(page.backlinks).toEqual([])
  })
})

describe('resolveWikilink', () => {
  beforeEach(() => {
    writePage('guides/setup.md', '# Setup')
    writePage('intro.md', '# Intro')
  })

  it('resolves by basename, case-insensitively', async () => {
    const mod = await loadModule()
    expect(mod.resolveWikilink('Setup')).toBe('guides/setup.md')
    expect(mod.resolveWikilink('intro')).toBe('intro.md')
  })

  it('resolves by full relative path with or without extension', async () => {
    const mod = await loadModule()
    expect(mod.resolveWikilink('guides/setup')).toBe('guides/setup.md')
    expect(mod.resolveWikilink('guides/setup.md')).toBe('guides/setup.md')
  })

  it('strips alias and anchor before resolving', async () => {
    const mod = await loadModule()
    expect(mod.resolveWikilink('Setup|click here')).toBe('guides/setup.md')
    expect(mod.resolveWikilink('intro#heading')).toBe('intro.md')
  })

  it('returns null for empty or unknown links', async () => {
    const mod = await loadModule()
    expect(mod.resolveWikilink('')).toBeNull()
    expect(mod.resolveWikilink('   ')).toBeNull()
    expect(mod.resolveWikilink('#anchor-only')).toBeNull()
    expect(mod.resolveWikilink('nonexistent')).toBeNull()
  })
})

describe('searchKnowledgePages', () => {
  it('returns empty for a blank query', async () => {
    writePage('a.md', 'content')
    const mod = await loadModule()
    expect(mod.searchKnowledgePages('')).toEqual([])
    expect(mod.searchKnowledgePages('   ')).toEqual([])
  })

  it('finds word-boundary matches with line numbers and text', async () => {
    writePage(
      'doc.md',
      ['first line', 'has Apple here', 'no fruit', 'pineapple ignored'].join(
        '\n',
      ),
    )
    const mod = await loadModule()
    const results = mod.searchKnowledgePages('apple')

    // \bapple matches "Apple" (boundary) but not "pineapple" (no boundary).
    expect(results).toHaveLength(1)
    const hit = results[0]
    expect(hit).toBeDefined()
    if (!hit) throw new Error('no hit')
    expect(hit.path).toBe('doc.md')
    expect(hit.line).toBe(2)
    expect(hit.text).toBe('has Apple here')
    expect(hit.title).toBe('doc')
  })

  it('escapes regex metacharacters in the query', async () => {
    writePage('regex.md', 'value is a.b and also axb')
    const mod = await loadModule()
    const results = mod.searchKnowledgePages('a.b')
    // Literal "a.b" matches once; "axb" must not match a literal dot.
    expect(results).toHaveLength(1)
    expect(results[0]?.text).toBe('value is a.b and also axb')
  })

  it('caps results at 200 matches', async () => {
    const lines = Array.from({ length: 250 }, () => 'token here').join('\n')
    writePage('big.md', lines)
    const mod = await loadModule()
    const results = mod.searchKnowledgePages('token')
    expect(results).toHaveLength(200)
  })

  it('searches raw frontmatter as well as body', async () => {
    writePage(
      'fm.md',
      ['---', 'title: Special', '---', 'body without keyword'].join('\n'),
    )
    const mod = await loadModule()
    const results = mod.searchKnowledgePages('Special')
    expect(results).toHaveLength(1)
    expect(results[0]?.line).toBe(2)
  })
})

describe('buildKnowledgeGraph', () => {
  it('builds nodes and de-duplicated, resolvable edges', async () => {
    writePage(
      'a.md',
      [
        '---',
        'title: A',
        'type: note',
        'tags: [x]',
        '---',
        'A → [[b]] and [[b]] again.',
      ].join('\n'),
    )
    writePage('b.md', 'B → [[a]] and [[ghost]] (unresolved).')

    const mod = await loadModule()
    const graph: KnowledgeGraph = mod.buildKnowledgeGraph()

    const nodeIds = graph.nodes.map((n) => n.id).sort()
    expect(nodeIds).toEqual(['a.md', 'b.md'])
    const nodeA = graph.nodes.find((n) => n.id === 'a.md')
    expect(nodeA?.title).toBe('A')
    expect(nodeA?.type).toBe('note')
    expect(nodeA?.tags).toEqual(['x'])

    // [[b]] duplicated in a.md collapses to one edge; [[ghost]] drops out.
    expect(graph.edges).toContainEqual({ source: 'a.md', target: 'b.md' })
    expect(graph.edges).toContainEqual({ source: 'b.md', target: 'a.md' })
    expect(graph.edges).toHaveLength(2)
  })

  it('returns empty graph when there are no pages', async () => {
    const mod = await loadModule()
    const graph = mod.buildKnowledgeGraph()
    expect(graph.nodes).toEqual([])
    expect(graph.edges).toEqual([])
  })
})

describe('syncKnowledgeSource', () => {
  it('is a no-op success for local sources', async () => {
    const mod = await loadModule()
    const result = await mod.syncKnowledgeSource()
    expect(result.success).toBe(true)
    expect(result.source).toEqual({ type: 'local', path: knowledgeDir })
    expect(result.error).toBeUndefined()
  })

  it('fetches and caches a github source', async () => {
    writeConfig({
      source: {
        type: 'github',
        repo: 'owner/repo',
        branch: 'main',
        path: 'docs',
      },
    })

    const dirListing = [
      { type: 'dir', name: 'sub', path: 'docs/sub', sha: 'd1' },
      { type: 'file', name: 'top.md', path: 'docs/top.md', sha: 'f1' },
      { type: 'file', name: 'ignore.txt', path: 'docs/ignore.txt', sha: 'f2' },
    ]
    const subListing = [
      { type: 'file', name: 'inner.md', path: 'docs/sub/inner.md', sha: 'f3' },
    ]
    const fileContent = (
      text: string,
    ): { content: string; encoding: string } => ({
      content: Buffer.from(text, 'utf-8').toString('base64'),
      encoding: 'base64',
    })

    const fetchMock = vi.fn((input: string | URL): Promise<Response> => {
      const url = String(input)
      const json = (body: unknown): Response =>
        new Response(JSON.stringify(body), { status: 200 })
      if (url.includes('/contents/docs?'))
        return Promise.resolve(json(dirListing))
      if (url.includes('/contents/docs/sub?'))
        return Promise.resolve(json(subListing))
      if (url.includes('/contents/docs/top.md?'))
        return Promise.resolve(json(fileContent('# Top page')))
      if (url.includes('/contents/docs/sub/inner.md?'))
        return Promise.resolve(json(fileContent('# Inner page')))
      return Promise.resolve(new Response('not found', { status: 404 }))
    })
    vi.stubGlobal('fetch', fetchMock)

    const cacheRoot = path.join(os.homedir(), '.claude', 'knowledge-cache')
    fs.rmSync(cacheRoot, { recursive: true, force: true })
    try {
      const mod = await loadModule()
      const result = await mod.syncKnowledgeSource()
      expect(result.success).toBe(true)
      expect(result.error).toBeUndefined()

      const cacheDir = path.join(
        cacheRoot,
        'github',
        'owner_repo',
        'main',
        'docs',
      )
      expect(fs.readFileSync(path.join(cacheDir, 'top.md'), 'utf-8')).toBe(
        '# Top page',
      )
      // fetchDir writes every file's basename directly under cacheDir (the
      // empty dir created for the subtree is left in place), so nested
      // markdown lands flat at the cache root.
      expect(fs.readFileSync(path.join(cacheDir, 'inner.md'), 'utf-8')).toBe(
        '# Inner page',
      )
      // Non-markdown entry was not written.
      expect(fs.existsSync(path.join(cacheDir, 'ignore.txt'))).toBe(false)

      // Pages are now readable through the standard local-read path.
      expect(mod.knowledgeRootExists()).toBe(true)
      const pages = mod.listKnowledgePages().map((p) => p.path)
      expect(pages.sort()).toEqual(['inner.md', 'top.md'])
    } finally {
      fs.rmSync(cacheRoot, { recursive: true, force: true })
    }
  })

  it('returns a failure result when the github fetch errors', async () => {
    writeConfig({
      source: {
        type: 'github',
        repo: 'owner/repo',
        branch: 'main',
        path: 'docs',
      },
    })
    const fetchMock = vi.fn(
      (): Promise<Response> =>
        Promise.resolve(new Response('boom', { status: 500 })),
    )
    vi.stubGlobal('fetch', fetchMock)

    const cacheRoot = path.join(os.homedir(), '.claude', 'knowledge-cache')
    fs.rmSync(cacheRoot, { recursive: true, force: true })
    try {
      const mod = await loadModule()
      const result = await mod.syncKnowledgeSource()
      expect(result.success).toBe(false)
      expect(result.error).toMatch(/GitHub sync failed/)
      expect(result.error).toMatch(/500/)
    } finally {
      fs.rmSync(cacheRoot, { recursive: true, force: true })
    }
  })

  it('decodes plain (non-base64) github file content', async () => {
    writeConfig({
      source: {
        type: 'github',
        repo: 'owner/repo',
        branch: 'main',
        path: 'docs',
      },
    })
    const dirListing = [
      { type: 'file', name: 'plain.md', path: 'docs/plain.md', sha: 'p1' },
    ]
    const fetchMock = vi.fn((input: string | URL): Promise<Response> => {
      const url = String(input)
      const json = (body: unknown): Response =>
        new Response(JSON.stringify(body), { status: 200 })
      if (url.includes('/contents/docs?'))
        return Promise.resolve(json(dirListing))
      if (url.includes('/contents/docs/plain.md?'))
        return Promise.resolve(
          json({ content: 'line1\nline2', encoding: 'utf-8' }),
        )
      return Promise.resolve(new Response('nf', { status: 404 }))
    })
    vi.stubGlobal('fetch', fetchMock)

    const cacheRoot = path.join(os.homedir(), '.claude', 'knowledge-cache')
    fs.rmSync(cacheRoot, { recursive: true, force: true })
    try {
      const mod = await loadModule()
      const result = await mod.syncKnowledgeSource()
      expect(result.success).toBe(true)
      const cacheDir = path.join(
        cacheRoot,
        'github',
        'owner_repo',
        'main',
        'docs',
      )
      // Newlines are stripped for non-base64 content.
      expect(fs.readFileSync(path.join(cacheDir, 'plain.md'), 'utf-8')).toBe(
        'line1line2',
      )
    } finally {
      fs.rmSync(cacheRoot, { recursive: true, force: true })
    }
  })
})
