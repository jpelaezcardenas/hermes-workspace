import { beforeEach, describe, expect, it, vi } from 'vitest'

const { existsSync, readFileSync, writeFileSync, mkdirSync } = vi.hoisted(() => ({
  existsSync: vi.fn().mockReturnValue(false),
  readFileSync: vi.fn().mockReturnValue(''),
  writeFileSync: vi.fn().mockImplementation(() => {}),
  mkdirSync: vi.fn().mockImplementation(() => {}),
}))

vi.mock('node:fs', () => ({
  default: { existsSync, readFileSync, writeFileSync, mkdirSync },
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
}))

const { homedir } = vi.hoisted(() => ({
  homedir: vi.fn().mockReturnValue('/home/testuser'),
}))

vi.mock('node:os', () => ({
  default: { homedir },
  homedir,
}))

beforeEach(() => {
  vi.clearAllMocks()
  delete process.env.HERMES_HOME
})

async function loadMod() {
  vi.resetModules()
  return import('../local-session-store')
}

describe('local-session-store', () => {
  it('writes portable sessions under HERMES_HOME immediately', async () => {
    process.env.HERMES_HOME = '/custom/hermes'
    const mod = await loadMod()

    mod.appendLocalMessage('session-1', {
      id: 'msg-1',
      role: 'assistant',
      content: 'done',
      timestamp: 123,
      toolCalls: [
        {
          id: 'tool-1',
          name: 'shell',
          phase: 'complete',
          result: 'ok',
        },
      ],
    })

    expect(mkdirSync).toHaveBeenCalledWith('/custom/hermes/workspace', {
      recursive: true,
    })
    const lastWrite = writeFileSync.mock.calls.at(-1)
    expect(lastWrite?.[0]).toBe('/custom/hermes/workspace/local-sessions.json')
    const parsed = JSON.parse(String(lastWrite?.[1]))
    expect(parsed.messages['session-1'][0].toolCalls[0]).toMatchObject({
      id: 'tool-1',
      name: 'shell',
      phase: 'complete',
      result: 'ok',
    })
  })

  it('falls back to ~/.hermes/workspace when HERMES_HOME is unset', async () => {
    const mod = await loadMod()

    mod.appendLocalMessage('session-2', {
      id: 'msg-2',
      role: 'user',
      content: 'hello',
      timestamp: 456,
    })

    const lastWrite = writeFileSync.mock.calls.at(-1)
    expect(lastWrite?.[0]).toBe(
      '/home/testuser/.hermes/workspace/local-sessions.json',
    )
  })
})
