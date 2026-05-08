import { describe, expect, it, vi } from 'vitest'

describe('connection-status capabilities', () => {
  it('includes mcpFallback when config-backed MCP is available', async () => {
    const fakeCaps = {
      health: true,
      chatCompletions: true,
      models: true,
      streaming: true,
      sessions: true,
      skills: true,
      memory: true,
      config: true,
      jobs: true,
      mcp: false,
      mcpFallback: true,
      conductor: false,
      kanban: false,
      enhancedChat: false,
      dashboard: { available: true },
    }

    vi.doMock('../../server/gateway-capabilities', () => ({
      CLAUDE_API: 'http://127.0.0.1:8642',
      ensureGatewayProbed: () => Promise.resolve(fakeCaps),
      getChatMode: () => 'portable',
    }))
    vi.doMock('../../server/auth-middleware', () => ({
      isAuthenticated: () => true,
    }))
    vi.doMock('@tanstack/react-router', () => ({
      createFileRoute: () => (cfg: unknown) => cfg,
    }))

    const mod = await import('./connection-status')
    const route = mod.Route as unknown as {
      server: { handlers: { GET: (ctx: { request: Request }) => Promise<Response> } }
    }

    const res = await route.server.handlers.GET({
      request: new Request('http://localhost/api/connection-status'),
    })
    const body = (await res.json()) as { capabilities: Record<string, boolean> }

    expect(body.capabilities.mcp).toBe(false)
    expect(body.capabilities.mcpFallback).toBe(true)
  })
})
