import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let originalFetch: typeof global.fetch
const originalEnv = { ...process.env }

function sse(payload: unknown): string {
  return `event: message\ndata: ${JSON.stringify(payload)}\n\n`
}

function response(status: number, body: string, headers: Record<string, string> = {}): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => body,
    json: async () => JSON.parse(body),
    headers: { get: (name: string) => headers[name] ?? headers[name.toLowerCase()] ?? null },
  } as unknown as Response
}

beforeEach(() => {
  vi.resetModules()
  originalFetch = global.fetch
  process.env = { ...originalEnv }
  process.env.KNOWLEDGE_MEMORY_FABRIC_API_KEY = 'test-key'
  delete process.env.MEMORY_FABRIC_URL
  delete process.env.KNOWLEDGE_MEMORY_FABRIC_URL
})

afterEach(() => {
  global.fetch = originalFetch
  process.env = { ...originalEnv }
})

describe('knowledge memory fabric client', () => {
  it('defaults to the public Memory Fabric endpoint', async () => {
    const { getMemoryFabricBaseUrl } = await import('./knowledge-memory-fabric')
    expect(getMemoryFabricBaseUrl()).toBe('https://memory.visualgraphx.com')
  })

  it('requires explicit business or personal scope', async () => {
    const { normalizeMemoryScope } = await import('./knowledge-memory-fabric')
    expect(normalizeMemoryScope('business')).toBe('business')
    expect(normalizeMemoryScope('personal')).toBe('personal')
    expect(() => normalizeMemoryScope('')).toThrow(/business or personal/)
    expect(() => normalizeMemoryScope('auto')).toThrow(/business or personal/)
  })

  it('opens an MCP session, routes the scoped request, then searches with evidence', async () => {
    const fetchSpy = vi.fn()
      .mockResolvedValueOnce(response(200, sse({ result: { serverInfo: { name: 'knowledge-vault' } } }), { 'mcp-session-id': 'sid-1' }))
      .mockResolvedValueOnce(response(200, sse({ result: { content: [{ type: 'text', text: JSON.stringify({ route: { memory_scope: 'business' } }) }] } })))
      .mockResolvedValueOnce(response(200, sse({ result: { serverInfo: { name: 'knowledge-vault' } } }), { 'mcp-session-id': 'sid-2' }))
      .mockResolvedValueOnce(response(200, sse({ result: { content: [{ type: 'text', text: JSON.stringify({ results: [{ title: 'Hermes' }] }) }] } })))
    global.fetch = fetchSpy as unknown as typeof fetch

    const { searchKnowledgeWithEvidence } = await import('./knowledge-memory-fabric')
    const result = await searchKnowledgeWithEvidence({ query: 'Hermes', memoryScope: 'business' })

    expect(result.memoryScope).toBe('business')
    expect(result.route).toEqual({ route: { memory_scope: 'business' } })
    expect(result.data).toEqual({ results: [{ title: 'Hermes' }] })
    expect(fetchSpy).toHaveBeenNthCalledWith(
      2,
      'https://memory.visualgraphx.com/mcp/',
      expect.objectContaining({ headers: expect.objectContaining({ 'mcp-session-id': 'sid-1' }) }),
    )
    const searchBody = JSON.parse(fetchSpy.mock.calls[3][1].body)
    expect(searchBody.params.name).toBe('search_knowledge_with_evidence')
    expect(searchBody.params.arguments.memory_scope).toBe('business')
  })
})
