import { describe, expect, it, vi } from 'vitest'

vi.mock('@tanstack/react-router', () => ({
  createFileRoute: (_path: string) => (opts: any) => opts,
}))

describe('weatherbot route module', () => {
  it('registers the public weatherbot route', async () => {
    vi.resetModules()
    const mod = await import('./weatherbot')

    expect((mod as any).Route).toBeTruthy()
    expect((mod as any).Route.server.handlers.GET).toEqual(expect.any(Function))
  })
})
