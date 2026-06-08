/** @vitest-environment jsdom */
import { createElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { filterResults, useSearchData } from './use-search-data'
import type { ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Module mocks
//
// useSearchData fans out four TanStack queries that each call raw `fetch`
// against `/api/*` routes, gated by `useFeatureAvailable(feature)`. We replace
// `useFeatureAvailable` with a typed fake (so we control the sessions/skills
// capability flags) and stub `fetch` per test with a small router that maps a
// URL substring to a canned JSON Response. This lets us exercise the hook's
// normalization (fetchSessions/fetchFiles/fetchSkills/fetchSessionSearch) and
// its scope/enabled gating purely through the returned values.
// ---------------------------------------------------------------------------

const featureAvailableMock = vi.fn<(feature: string) => boolean>()

vi.mock('@/hooks/use-feature-available', () => ({
  useFeatureAvailable: (feature: string) => featureAvailableMock(feature),
}))

type JsonBody = Record<string, unknown>

function jsonResponse(body: JsonBody, ok = true): Response {
  return {
    ok,
    status: ok ? 200 : 500,
    json: () => Promise.resolve(body),
  } as unknown as Response
}

type FetchRoutes = {
  sessions?: Response
  files?: Response
  skills?: Response
  sessionSearch?: Response
}

const fetchedUrls: Array<string> = []

function stubFetch(routes: FetchRoutes): void {
  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL): Promise<Response> => {
      const url = typeof input === 'string' ? input : input.toString()
      fetchedUrls.push(url)
      // Order matters: the FTS search route also contains "/sessions".
      if (url.includes('/api/sessions/search')) {
        return Promise.resolve(routes.sessionSearch ?? jsonResponse({}))
      }
      if (url.includes('/api/sessions')) {
        return Promise.resolve(routes.sessions ?? jsonResponse({}))
      }
      if (url.includes('/api/files')) {
        return Promise.resolve(routes.files ?? jsonResponse({}))
      }
      if (url.includes('/api/skills')) {
        return Promise.resolve(routes.skills ?? jsonResponse({}))
      }
      return Promise.resolve(jsonResponse({}, false))
    }),
  )
}

function makeWrapper(): ({ children }: { children: ReactNode }) => ReactNode {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
    },
  })
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children)
}

type SearchScope = 'all' | 'chats' | 'files' | 'agents' | 'skills' | 'actions'

function renderSearch(scope: SearchScope, query = '') {
  return renderHook(() => useSearchData(scope, query), {
    wrapper: makeWrapper(),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  fetchedUrls.length = 0
  // Default: both feature gates open so queries can run.
  featureAvailableMock.mockReturnValue(true)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

// ===========================================================================
// filterResults — pure client-side filter
// ===========================================================================

describe('filterResults', () => {
  type Row = Record<string, unknown> & { name: string; tag: string }
  const rows: Array<Row> = [
    { name: 'GitHub Workflow', tag: 'ci' },
    { name: 'Deploy Script', tag: 'ops' },
    { name: 'Readme', tag: 'docs' },
  ]

  it('returns all items (unbounded) when the query is empty', () => {
    expect(filterResults(rows, '', ['name'])).toEqual(rows)
  })

  it('treats a whitespace-only query as empty', () => {
    expect(filterResults(rows, '   ', ['name'])).toEqual(rows)
  })

  it('slices to maxResults when query is empty and a finite cap is given', () => {
    expect(filterResults(rows, '', ['name'], 2)).toEqual(rows.slice(0, 2))
  })

  it('floors and clamps a fractional/negative maxResults on the empty path', () => {
    expect(filterResults(rows, '', ['name'], 1.9)).toHaveLength(1)
    expect(filterResults(rows, '', ['name'], -5)).toEqual([])
  })

  it('matches case-insensitively against the listed fields', () => {
    const out = filterResults(rows, 'github', ['name', 'tag'])
    expect(out).toHaveLength(1)
    expect(out.at(0)?.name).toBe('GitHub Workflow')
  })

  it('only searches the requested fields', () => {
    // "ops" lives in `tag`, so searching only `name` finds nothing.
    expect(filterResults(rows, 'ops', ['name'])).toEqual([])
    expect(filterResults(rows, 'ops', ['tag'])).toHaveLength(1)
  })

  it('ignores non-string field values without throwing', () => {
    const mixed: Array<Record<string, unknown>> = [
      { name: 'alpha', count: 5 },
      { name: 'beta', count: 10 },
    ]
    const out = filterResults(mixed, '5', ['count', 'name'])
    expect(out).toEqual([])
  })

  it('stops collecting once maxResults matches are reached', () => {
    const many: Array<Record<string, unknown>> = [
      { name: 'match-1' },
      { name: 'match-2' },
      { name: 'match-3' },
    ]
    const out = filterResults(many, 'match', ['name'], 2)
    expect(out).toHaveLength(2)
    expect(out.at(0)?.name).toBe('match-1')
    expect(out.at(1)?.name).toBe('match-2')
  })
})

// ===========================================================================
// useSearchData — sessions normalization
// ===========================================================================

describe('useSearchData — sessions', () => {
  it('normalizes sessions, preferring derivedTitle for the title', async () => {
    stubFetch({
      sessions: jsonResponse({
        sessions: [
          {
            key: 'sess-1',
            friendlyId: 'happy-otter',
            derivedTitle: '  GitHub deploy chat  ',
            preview: 'about deploys',
            updatedAt: 1234,
          },
        ],
      }),
    })
    const { result } = renderSearch('chats')

    await waitFor(() => expect(result.current.sessions).toHaveLength(1))
    const session = result.current.sessions.at(0)
    expect(session?.id).toBe('sess-1')
    expect(session?.key).toBe('sess-1')
    expect(session?.friendlyId).toBe('happy-otter')
    // derivedTitle wins and is trimmed.
    expect(session?.title).toBe('GitHub deploy chat')
    expect(session?.preview).toBe('about deploys')
    expect(session?.updatedAt).toBe(1234)
  })

  it('falls back to friendlyId when derivedTitle is blank, and startedAt for the timestamp', async () => {
    stubFetch({
      sessions: jsonResponse({
        sessions: [
          {
            key: 'sess-2',
            friendlyId: 'brave-fox',
            derivedTitle: '   ',
            startedAt: 999,
          },
        ],
      }),
    })
    const { result } = renderSearch('all')

    await waitFor(() => expect(result.current.sessions).toHaveLength(1))
    const session = result.current.sessions.at(0)
    expect(session?.title).toBe('brave-fox')
    expect(session?.updatedAt).toBe(999)
  })

  it('falls back to "unknown" id/friendlyId when key and friendlyId are absent', async () => {
    stubFetch({
      sessions: jsonResponse({ sessions: [{ preview: 'orphan' }] }),
    })
    const { result } = renderSearch('chats')

    await waitFor(() => expect(result.current.sessions).toHaveLength(1))
    const session = result.current.sessions.at(0)
    expect(session?.id).toBe('unknown')
    expect(session?.friendlyId).toBe('unknown')
    expect(session?.key).toBe('')
    expect(session?.title).toBe('unknown')
  })

  it('returns an empty list when the sessions response is not ok', async () => {
    stubFetch({ sessions: jsonResponse({}, false) })
    const { result } = renderSearch('chats')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.sessions).toEqual([])
  })

  it('returns an empty list when sessions field is missing/non-array', async () => {
    stubFetch({ sessions: jsonResponse({ sessions: 'nope' }) })
    const { result } = renderSearch('chats')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.sessions).toEqual([])
  })

  it('does not fetch sessions when the sessions feature is unavailable', async () => {
    featureAvailableMock.mockImplementation((f) => f !== 'sessions')
    stubFetch({})
    const { result } = renderSearch('chats')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.sessions).toEqual([])
    expect(fetchedUrls.some((u) => u.includes('/api/sessions'))).toBe(false)
  })

  it('does not fetch sessions for an unrelated scope (files)', async () => {
    stubFetch({})
    const { result } = renderSearch('files')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(
      fetchedUrls.some(
        (u) => u.includes('/api/sessions') && !u.includes('/search'),
      ),
    ).toBe(false)
  })
})

// ===========================================================================
// useSearchData — session FTS search
// ===========================================================================

describe('useSearchData — session FTS search', () => {
  it('normalizes FTS results and reads snippet/session fields', async () => {
    stubFetch({
      sessionSearch: jsonResponse({
        ok: true,
        results: [
          {
            id: 'r1',
            key: 'sess-k',
            friendlyId: 'cool-cat',
            title: 'Result Title',
            snippet: 'matched snippet',
            updatedAt: 42,
            source: 'remote',
          },
        ],
      }),
    })
    const { result } = renderSearch('chats', 'hello')

    await waitFor(() =>
      expect(result.current.sessionSearchResults).toHaveLength(1),
    )
    const hit = result.current.sessionSearchResults.at(0)
    expect(hit?.id).toBe('r1')
    expect(hit?.key).toBe('sess-k')
    expect(hit?.friendlyId).toBe('cool-cat')
    expect(hit?.title).toBe('Result Title')
    expect(hit?.preview).toBe('matched snippet')
    expect(hit?.updatedAt).toBe(42)
    expect(hit?.source).toBe('remote')
  })

  it('derives id, key (session_id), and timestamp (session_started) fallbacks', async () => {
    stubFetch({
      sessionSearch: jsonResponse({
        ok: true,
        results: [{ session_id: 'sid', preview: 'p', session_started: 7 }],
      }),
    })
    const { result } = renderSearch('chats', 'query')

    await waitFor(() =>
      expect(result.current.sessionSearchResults).toHaveLength(1),
    )
    const hit = result.current.sessionSearchResults.at(0)
    expect(hit?.key).toBe('sid')
    // id falls back to `${key}:${index}`.
    expect(hit?.id).toBe('sid:0')
    expect(hit?.friendlyId).toBe('sid')
    expect(hit?.preview).toBe('p')
    expect(hit?.updatedAt).toBe(7)
    expect(hit?.source).toBeNull()
  })

  it('returns empty when the API reports ok:false', async () => {
    stubFetch({
      sessionSearch: jsonResponse({ ok: false, results: [{ key: 'x' }] }),
    })
    const { result } = renderSearch('chats', 'query')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.sessionSearchResults).toEqual([])
  })

  it('does not run the FTS query for short (<2 char) queries', async () => {
    stubFetch({})
    const { result } = renderSearch('chats', 'a')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.sessionSearchResults).toEqual([])
    expect(fetchedUrls.some((u) => u.includes('/api/sessions/search'))).toBe(
      false,
    )
  })

  it('url-encodes the query and runs the FTS request for long-enough queries', async () => {
    stubFetch({
      sessionSearch: jsonResponse({ ok: true, results: [] }),
    })
    const { result } = renderSearch('all', 'a b')

    await waitFor(() =>
      expect(fetchedUrls.some((u) => u.includes('/api/sessions/search'))).toBe(
        true,
      ),
    )
    expect(result.current.sessionSearchResults).toEqual([])
    const ftsUrl = fetchedUrls.find((u) => u.includes('/api/sessions/search'))
    expect(ftsUrl).toContain('q=a%20b')
  })
})

// ===========================================================================
// useSearchData — files (flattened tree)
// ===========================================================================

describe('useSearchData — files', () => {
  it('flattens a nested file tree and keeps only valid file/folder entries', async () => {
    stubFetch({
      files: jsonResponse({
        entries: [
          {
            path: 'src',
            name: 'src',
            type: 'folder',
            children: [
              { path: 'src/a.ts', name: 'a.ts', type: 'file' },
              // invalid type — dropped
              { path: 'src/weird', name: 'weird', type: 'symlink' },
              // missing name — dropped
              { path: 'src/noname', name: '', type: 'file' },
            ],
          },
        ],
      }),
    })
    const { result } = renderSearch('files')

    await waitFor(() => expect(result.current.files.length).toBeGreaterThan(0))
    const byPath = new Map(result.current.files.map((f) => [f.path, f]))
    expect(byPath.has('src')).toBe(true)
    expect(byPath.get('src')?.type).toBe('folder')
    expect(byPath.has('src/a.ts')).toBe(true)
    expect(byPath.get('src/a.ts')?.type).toBe('file')
    expect(byPath.has('src/weird')).toBe(false)
    expect(byPath.has('src/noname')).toBe(false)
  })

  it('defaults a missing type to "file"', async () => {
    stubFetch({
      files: jsonResponse({
        entries: [{ path: 'x.md', name: 'x.md' }],
      }),
    })
    const { result } = renderSearch('files')

    await waitFor(() => expect(result.current.files).toHaveLength(1))
    expect(result.current.files.at(0)?.type).toBe('file')
  })

  it('returns empty files when the response is not ok', async () => {
    stubFetch({ files: jsonResponse({}, false) })
    const { result } = renderSearch('files')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.files).toEqual([])
  })

  it('fetches files regardless of feature gates (no gate on files)', async () => {
    featureAvailableMock.mockReturnValue(false)
    stubFetch({ files: jsonResponse({ entries: [] }) })
    const { result } = renderSearch('files')

    await waitFor(() =>
      expect(fetchedUrls.some((u) => u.includes('/api/files'))).toBe(true),
    )
    expect(result.current.files).toEqual([])
  })
})

// ===========================================================================
// useSearchData — skills
// ===========================================================================

describe('useSearchData — skills', () => {
  it('normalizes skills and derives a slug id from the name', async () => {
    stubFetch({
      skills: jsonResponse({
        ok: true,
        skills: [
          { name: 'Code Review', description: 'reviews code', installed: 1 },
          { id: 'explicit', name: 'Other' },
        ],
      }),
    })
    const { result } = renderSearch('skills')

    await waitFor(() => expect(result.current.skills).toHaveLength(2))
    const byName = new Map(result.current.skills.map((s) => [s.name, s]))
    expect(byName.get('Code Review')?.id).toBe('code-review')
    expect(byName.get('Code Review')?.installed).toBe(true)
    expect(byName.get('Other')?.id).toBe('explicit')
    expect(byName.get('Other')?.installed).toBe(false)
    expect(byName.get('Other')?.description).toBe('')
  })

  it('falls back to "Unknown Skill" for nameless entries', async () => {
    stubFetch({
      skills: jsonResponse({ ok: true, skills: [{ description: 'x' }] }),
    })
    const { result } = renderSearch('skills')

    await waitFor(() => expect(result.current.skills).toHaveLength(1))
    expect(result.current.skills.at(0)?.name).toBe('Unknown Skill')
  })

  it('returns empty when the skills API reports ok:false', async () => {
    stubFetch({
      skills: jsonResponse({ ok: false, skills: [{ name: 'ghost' }] }),
    })
    const { result } = renderSearch('skills')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.skills).toEqual([])
  })

  it('does not fetch skills when the skills feature is unavailable', async () => {
    featureAvailableMock.mockImplementation((f) => f !== 'skills')
    stubFetch({})
    const { result } = renderSearch('skills')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.skills).toEqual([])
    expect(fetchedUrls.some((u) => u.includes('/api/skills'))).toBe(false)
  })
})

// ===========================================================================
// useSearchData — aggregate shape
// ===========================================================================

describe('useSearchData — aggregate', () => {
  it('always returns an empty activity array (SSE disabled)', async () => {
    stubFetch({})
    const { result } = renderSearch('all')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.activity).toEqual([])
  })

  it('exposes the full result shape with array defaults', async () => {
    stubFetch({})
    const { result } = renderSearch('actions')

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(Array.isArray(result.current.sessions)).toBe(true)
    expect(Array.isArray(result.current.sessionSearchResults)).toBe(true)
    expect(Array.isArray(result.current.files)).toBe(true)
    expect(Array.isArray(result.current.skills)).toBe(true)
    expect(Array.isArray(result.current.activity)).toBe(true)
    // The 'actions' scope gates out every query, so nothing is fetched.
    expect(fetchedUrls).toEqual([])
  })
})
