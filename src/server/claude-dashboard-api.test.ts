import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { dashboardFetch } from './gateway-capabilities'
import {
  CLAUDE_DASHBOARD_URL,
  createCronJob,
  createSession,
  deleteCronJob,
  deleteEnvVar,
  deleteSession,
  forkSession,
  getAnalytics,
  getConfig,
  getConfigRaw,
  getConfigSchema,
  getCronJobs,
  getEnvVars,
  getLogs,
  getModelInfo,
  getOAuthProviders,
  getSession,
  getSessionMessages,
  getSkills,
  getStatus,
  getToolsets,
  listSessions,
  pauseCronJob,
  resumeCronJob,
  saveConfig,
  saveConfigRaw,
  searchSessions,
  setEnvVar,
  toggleSkill,
  triggerCronJob,
  updateSession,
} from './claude-dashboard-api'

vi.mock('./gateway-capabilities', () => ({
  CLAUDE_DASHBOARD_URL: 'http://dashboard.test',
  dashboardFetch: vi.fn(),
}))

const fetchMock = vi.mocked(dashboardFetch)

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    ...init,
  })
}

/** The path passed to the most recent dashboardFetch call. */
function lastPath(): string {
  const call = fetchMock.mock.calls.at(-1)
  if (call === undefined) throw new Error('dashboardFetch was not called')
  return call[0]
}

/** The RequestInit passed to the most recent dashboardFetch call. */
function lastInit(): RequestInit | undefined {
  const call = fetchMock.mock.calls.at(-1)
  if (call === undefined) throw new Error('dashboardFetch was not called')
  return call[1]
}

/** Parse the JSON body of the most recent dashboardFetch call. */
function lastBody(): Record<string, unknown> {
  const init = lastInit()
  if (!init || typeof init.body !== 'string') return {}
  const parsed: unknown = JSON.parse(init.body)
  if (parsed !== null && typeof parsed === 'object') {
    return parsed as Record<string, unknown>
  }
  return {}
}

beforeEach(() => {
  fetchMock.mockReset()
  // Return a fresh Response per call — a Response body can only be read once,
  // so a shared instance would fail when multiple endpoints are exercised.
  fetchMock.mockImplementation(() =>
    Promise.resolve(jsonResponse({ ok: true })),
  )
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('dashboardJson error handling', () => {
  it('throws including path, status and body text on non-OK responses', async () => {
    fetchMock.mockResolvedValue(
      new Response('upstream exploded', { status: 502 }),
    )
    await expect(getStatus()).rejects.toThrow(
      'Hermes Agent dashboard /api/status: 502 upstream exploded',
    )
  })

  it('tolerates a failing response.text() during error handling', async () => {
    const badResponse = new Response(null, { status: 500 })
    vi.spyOn(badResponse, 'text').mockRejectedValue(new Error('stream gone'))
    fetchMock.mockResolvedValue(badResponse)
    await expect(getStatus()).rejects.toThrow(
      'Hermes Agent dashboard /api/status: 500 ',
    )
  })

  it('returns undefined for 204 No Content', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }))
    const result = await deleteSession('abc')
    expect(result).toBeUndefined()
  })

  it('parses JSON on a successful response', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ version: '1.2.3' }))
    const status = await getStatus()
    expect(status).toEqual({ version: '1.2.3' })
  })

  it('rejects when the body is not valid JSON', async () => {
    fetchMock.mockResolvedValue(
      new Response('<<not json>>', {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )
    await expect(getStatus()).rejects.toBeInstanceOf(Error)
  })
})

describe('session endpoints', () => {
  it('listSessions builds a paginated query with defaults', async () => {
    await listSessions()
    expect(lastPath()).toBe('/api/sessions?limit=50&offset=0')
  })

  it('listSessions honors explicit limit and offset', async () => {
    await listSessions(10, 20)
    expect(lastPath()).toBe('/api/sessions?limit=10&offset=20')
  })

  it('getSession encodes the id', async () => {
    await getSession('a/b c')
    expect(lastPath()).toBe('/api/sessions/a%2Fb%20c')
  })

  it('getSessionMessages targets the messages sub-resource', async () => {
    await getSessionMessages('id#1')
    expect(lastPath()).toBe('/api/sessions/id%231/messages')
  })

  it('searchSessions encodes the query string', async () => {
    await searchSessions('hello world&x')
    expect(lastPath()).toBe('/api/sessions/search?q=hello%20world%26x')
  })

  it('deleteSession issues a DELETE', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }))
    await deleteSession('s1')
    expect(lastPath()).toBe('/api/sessions/s1')
    expect(lastInit()?.method).toBe('DELETE')
  })

  it('createSession POSTs a JSON body with content-type header', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ session: { id: 'new' } }))
    await createSession({ title: 'Hi' })
    const init = lastInit()
    expect(lastPath()).toBe('/api/sessions')
    expect(init?.method).toBe('POST')
    expect(new Headers(init?.headers).get('content-type')).toBe(
      'application/json',
    )
    expect(lastBody()).toEqual({ title: 'Hi' })
  })

  it('updateSession PATCHes the encoded id with a JSON body', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ session: { id: 's 1' } }))
    await updateSession('s 1', { title: 'Renamed' })
    expect(lastPath()).toBe('/api/sessions/s%201')
    expect(lastInit()?.method).toBe('PATCH')
    expect(lastBody()).toEqual({ title: 'Renamed' })
  })

  it('forkSession POSTs to the fork sub-resource', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ session: { id: 'f' }, forked_from: 's' }),
    )
    await forkSession('s')
    expect(lastPath()).toBe('/api/sessions/s/fork')
    expect(lastInit()?.method).toBe('POST')
  })
})

describe('skills endpoints', () => {
  it('getSkills hits the skills list', async () => {
    fetchMock.mockResolvedValue(jsonResponse([]))
    await getSkills()
    expect(lastPath()).toBe('/api/skills')
  })

  it('toggleSkill PUTs name + enabled', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }))
    await toggleSkill('deep-research', false)
    expect(lastPath()).toBe('/api/skills/toggle')
    expect(lastInit()?.method).toBe('PUT')
    expect(lastBody()).toEqual({ name: 'deep-research', enabled: false })
  })
})

describe('config endpoints', () => {
  it('getConfig / getConfigSchema / getConfigRaw hit their paths', async () => {
    await getConfig()
    expect(lastPath()).toBe('/api/config')
    await getConfigSchema()
    expect(lastPath()).toBe('/api/config/schema')
    await getConfigRaw()
    expect(lastPath()).toBe('/api/config/raw')
  })

  it('saveConfigRaw PUTs the yaml text', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }))
    await saveConfigRaw('key: value')
    expect(lastPath()).toBe('/api/config/raw')
    expect(lastInit()?.method).toBe('PUT')
    expect(lastBody()).toEqual({ yaml_text: 'key: value' })
  })

  describe('saveConfig deep-merge', () => {
    it('merges the patch over the current config (plain GET shape)', async () => {
      // The first call (GET) returns the current config; the PUT echoes ok via
      // the default beforeEach mock.
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ a: { keep: 1, drop: 2 }, top: 'old' }),
      )
      await saveConfig({ a: { drop: null, add: 3 }, top: 'new' })

      expect(lastPath()).toBe('/api/config')
      expect(lastInit()?.method).toBe('PUT')
      expect(lastBody()).toEqual({
        config: { a: { keep: 1, add: 3 }, top: 'new' },
      })
    })

    it('unwraps a { config } GET shape before merging', async () => {
      fetchMock.mockResolvedValueOnce(
        jsonResponse({ config: { nested: { x: 1 } } }),
      )
      await saveConfig({ nested: { y: 2 } })
      expect(lastBody()).toEqual({ config: { nested: { x: 1, y: 2 } } })
    })

    it('replaces arrays wholesale rather than merging them', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ list: [1, 2, 3] }))
      await saveConfig({ list: [9] })
      expect(lastBody()).toEqual({ config: { list: [9] } })
    })

    it('falls back to the raw patch when the current config read fails', async () => {
      fetchMock.mockResolvedValueOnce(new Response('boom', { status: 500 }))
      await saveConfig({ only: 'patch' })
      expect(lastInit()?.method).toBe('PUT')
      expect(lastBody()).toEqual({ config: { only: 'patch' } })
    })

    it('keeps the raw patch when the current config is not an object', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse('a string'))
      await saveConfig({ only: 'patch' })
      expect(lastBody()).toEqual({ config: { only: 'patch' } })
    })

    it('replaces a non-object existing value with the patch object', async () => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ a: 5 }))
      await saveConfig({ a: { nested: true } })
      expect(lastBody()).toEqual({ config: { a: { nested: true } } })
    })
  })
})

describe('env endpoints', () => {
  it('getEnvVars hits the env path', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}))
    await getEnvVars()
    expect(lastPath()).toBe('/api/env')
    expect(lastInit()).toBeUndefined()
  })

  it('setEnvVar PUTs key + value', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }))
    await setEnvVar('API_KEY', 'secret')
    expect(lastInit()?.method).toBe('PUT')
    expect(lastBody()).toEqual({ key: 'API_KEY', value: 'secret' })
  })

  it('deleteEnvVar DELETEs with the key in the body', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }))
    await deleteEnvVar('API_KEY')
    expect(lastInit()?.method).toBe('DELETE')
    expect(lastBody()).toEqual({ key: 'API_KEY' })
  })
})

describe('cron endpoints', () => {
  it('getCronJobs lists jobs', async () => {
    fetchMock.mockResolvedValue(jsonResponse([]))
    await getCronJobs()
    expect(lastPath()).toBe('/api/cron/jobs')
  })

  it('createCronJob POSTs the job definition', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ id: 'c1' }))
    await createCronJob({ prompt: 'p', schedule: '* * * * *', name: 'n' })
    expect(lastPath()).toBe('/api/cron/jobs')
    expect(lastInit()?.method).toBe('POST')
    expect(lastBody()).toEqual({
      prompt: 'p',
      schedule: '* * * * *',
      name: 'n',
    })
  })

  it('pause/resume/trigger POST to encoded action sub-resources', async () => {
    await pauseCronJob('c 1')
    expect(lastPath()).toBe('/api/cron/jobs/c%201/pause')
    expect(lastInit()?.method).toBe('POST')

    await resumeCronJob('c 1')
    expect(lastPath()).toBe('/api/cron/jobs/c%201/resume')

    await triggerCronJob('c 1')
    expect(lastPath()).toBe('/api/cron/jobs/c%201/trigger')
  })

  it('deleteCronJob DELETEs the encoded id', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ ok: true }))
    await deleteCronJob('c/1')
    expect(lastPath()).toBe('/api/cron/jobs/c%2F1')
    expect(lastInit()?.method).toBe('DELETE')
  })
})

describe('misc read endpoints', () => {
  it('getAnalytics builds the days query with default and override', async () => {
    await getAnalytics()
    expect(lastPath()).toBe('/api/analytics/usage?days=7')
    await getAnalytics(30)
    expect(lastPath()).toBe('/api/analytics/usage?days=30')
  })

  it('getModelInfo / getToolsets / getOAuthProviders hit their paths', async () => {
    await getModelInfo()
    expect(lastPath()).toBe('/api/model/info')
    await getToolsets()
    expect(lastPath()).toBe('/api/tools/toolsets')
    await getOAuthProviders()
    expect(lastPath()).toBe('/api/providers/oauth')
  })
})

describe('getLogs query construction', () => {
  it('omits the query string entirely when no params are given', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}))
    await getLogs({})
    expect(lastPath()).toBe('/api/logs')
  })

  it('includes only the provided params', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}))
    await getLogs({ file: 'gateway.log', lines: 100, level: 'error' })
    const path = lastPath()
    expect(path.startsWith('/api/logs?')).toBe(true)
    const params = new URLSearchParams(path.split('?')[1])
    expect(params.get('file')).toBe('gateway.log')
    expect(params.get('lines')).toBe('100')
    expect(params.get('level')).toBe('error')
    expect(params.get('component')).toBeNull()
  })

  it('treats zero lines as falsy and omits it', async () => {
    fetchMock.mockResolvedValue(jsonResponse({}))
    await getLogs({ lines: 0, component: 'cron' })
    const params = new URLSearchParams(lastPath().split('?')[1])
    expect(params.has('lines')).toBe(false)
    expect(params.get('component')).toBe('cron')
  })
})

describe('re-exports', () => {
  it('re-exports the dashboard URL constant', () => {
    expect(CLAUDE_DASHBOARD_URL).toBe('http://dashboard.test')
  })
})
