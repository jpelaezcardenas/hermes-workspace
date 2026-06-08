import { EventEmitter } from 'node:events'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  autoSweepLifecycle,
  getSwarmLifecycleStatus,
  lifecycleHandoffPath,
  notifyHandoffWritten,
  renewWorker,
  requestWorkerHandoff,
  sendToWorker,
} from './swarm-lifecycle'
import type { SwarmLifecyclePolicy } from './swarm-lifecycle'

// ── Constant fakes for path-producing dependencies ──────────────────────────

const PROFILES_DIR = '/fake/.hermes/profiles'
const MEMORY_ROOT = '/fake/hermes-workspace'
const HOME_DIR = '/home/tester'

vi.mock('./claude-paths', () => ({
  getProfilesDir: (): string => PROFILES_DIR,
}))

vi.mock('./swarm-environment', () => ({
  SWARM_MEMORY_ROOT: '/fake/hermes-workspace',
}))

const appendSwarmMemoryEvent = vi.fn<(input: unknown) => void>()
vi.mock('./swarm-memory', () => ({
  appendSwarmMemoryEvent: (input: unknown): void => {
    appendSwarmMemoryEvent(input)
  },
}))

vi.mock('node:os', () => ({
  homedir: (): string => HOME_DIR,
}))

// ── Virtual filesystem ──────────────────────────────────────────────────────

type FsState = {
  files: Map<string, string>
  dirs: Set<string>
  mtimes: Map<string, number>
  appends: Map<string, string>
  mkdirCalls: Array<string>
  existsSyncThrows: Set<string>
  statThrows: Set<string>
  readThrows: Set<string>
  appendThrows: boolean
  mkdirThrows: boolean
}

const fsState: FsState = {
  files: new Map(),
  dirs: new Set(),
  mtimes: new Map(),
  appends: new Map(),
  mkdirCalls: [],
  existsSyncThrows: new Set(),
  statThrows: new Set(),
  readThrows: new Set(),
  appendThrows: false,
  mkdirThrows: false,
}

vi.mock('node:fs', () => ({
  existsSync: (p: string): boolean => {
    if (fsState.existsSyncThrows.has(p)) throw new Error(`boom: ${p}`)
    return fsState.files.has(p) || fsState.dirs.has(p)
  },
  statSync: (p: string): { mtimeMs: number } => {
    if (fsState.statThrows.has(p)) throw new Error(`stat boom: ${p}`)
    return { mtimeMs: fsState.mtimes.get(p) ?? 0 }
  },
  readFileSync: (p: string): string => {
    if (fsState.readThrows.has(p)) throw new Error(`read boom: ${p}`)
    const v = fsState.files.get(p)
    if (v === undefined) throw new Error(`ENOENT: ${p}`)
    return v
  },
  mkdirSync: (p: string): void => {
    if (fsState.mkdirThrows) throw new Error(`mkdir boom: ${p}`)
    fsState.mkdirCalls.push(p)
    fsState.dirs.add(p)
  },
  appendFileSync: (p: string, data: string): void => {
    if (fsState.appendThrows) throw new Error(`append boom: ${p}`)
    fsState.appends.set(p, (fsState.appends.get(p) ?? '') + data)
  },
}))

// ── child_process mocks ─────────────────────────────────────────────────────

type ExecFileCb = (err: Error | null, stdout: string, stderr: string) => void

type ExecFileSyncImpl = (file: string, args: Array<string>) => string
type ExecFileImpl = (
  file: string,
  args: Array<string>,
  cb: ExecFileCb,
) => FakeExecFileChild
type SpawnImpl = (file: string, args: Array<string>) => FakeChildProcess

const cpState: {
  execFileSync: ExecFileSyncImpl
  execFile: ExecFileImpl
  spawn: SpawnImpl
  execFileCalls: Array<{ file: string; args: Array<string> }>
  spawnCalls: Array<{ file: string; args: Array<string> }>
} = {
  execFileSync: () => '',
  execFile: () => new FakeExecFileChild(),
  spawn: () => new FakeChildProcess(),
  execFileCalls: [],
  spawnCalls: [],
}

class FakeExecFileChild {
  public readonly stdin: { end: (chunk?: string) => void; ended?: string } = {
    end: (chunk?: string): void => {
      this.stdin.ended = chunk
    },
  }
}

class FakeChildProcess extends EventEmitter {
  public pid: number | undefined = 4242
  public readonly stdout = new EventEmitter()
  public readonly stderr = new EventEmitter()
  public stdin: {
    writable: boolean
    write: (chunk: string, cb: (err?: Error) => void) => void
    end?: () => void
  } | null = {
    writable: true,
    write: (_chunk: string, cb: (err?: Error) => void): void => {
      cb()
    },
  }
  public killSignals: Array<NodeJS.Signals | number> = []
  public kill(signal?: NodeJS.Signals | number): boolean {
    this.killSignals.push(signal ?? 'SIGTERM')
    return true
  }
}

vi.mock('node:child_process', () => ({
  execFileSync: (file: string, args: Array<string>): string => {
    cpState.execFileCalls.push({ file, args })
    return cpState.execFileSync(file, args)
  },
  execFile: (
    file: string,
    args: Array<string>,
    cb: ExecFileCb,
  ): FakeExecFileChild => {
    cpState.execFileCalls.push({ file, args })
    return cpState.execFile(file, args, cb)
  },
  spawn: (file: string, args: Array<string>): FakeChildProcess => {
    cpState.spawnCalls.push({ file, args })
    return cpState.spawn(file, args)
  },
}))

// ── helpers ─────────────────────────────────────────────────────────────────

const PYTHON_OK = (overrides: Record<string, unknown> = {}): string =>
  JSON.stringify({
    ok: true,
    sessionId: 'sess-1',
    model: 'opus',
    title: 'My Task',
    inputTokens: 100,
    outputTokens: 50,
    cacheReadTokens: 10,
    cacheWriteTokens: 5,
    reasoningTokens: 1,
    messageTokens: 0,
    ...overrides,
  })

/** Force the "no tmux available" branch -> native process path. */
function makeTmuxUnavailable(): void {
  const prev = cpState.execFileSync
  cpState.execFileSync = (file, args): string => {
    if (args[0] === 'list-sessions') throw new Error('no server running')
    return prev(file, args)
  }
}

/** Force the "tmux available" branch -> tmux path. */
function makeTmuxAvailable(): void {
  const prev = cpState.execFileSync
  cpState.execFileSync = (file, args): string => {
    if (args[0] === 'list-sessions') return ''
    return prev(file, args)
  }
}

beforeEach(() => {
  fsState.files.clear()
  fsState.dirs.clear()
  fsState.mtimes.clear()
  fsState.appends.clear()
  fsState.mkdirCalls.length = 0
  fsState.existsSyncThrows.clear()
  fsState.statThrows.clear()
  fsState.readThrows.clear()
  fsState.appendThrows = false
  fsState.mkdirThrows = false
  cpState.execFileSync = () => ''
  cpState.execFile = () => new FakeExecFileChild()
  cpState.spawn = () => new FakeChildProcess()
  cpState.execFileCalls.length = 0
  cpState.spawnCalls.length = 0
  appendSwarmMemoryEvent.mockClear()
})

afterEach(() => {
  vi.useRealTimers()
})

// ════════════════════════════════════════════════════════════════════════════
// getSwarmLifecycleStatus — classification, parsing, handoff metadata
// ════════════════════════════════════════════════════════════════════════════

describe('getSwarmLifecycleStatus', () => {
  it('parses a healthy status and computes total from token sum', () => {
    cpState.execFileSync = () => PYTHON_OK()
    const status = getSwarmLifecycleStatus('worker-1')

    expect(status.workerId).toBe('worker-1')
    expect(status.profilePath).toBe(`${PROFILES_DIR}/worker-1`)
    expect(status.sessionId).toBe('sess-1')
    expect(status.model).toBe('opus')
    expect(status.title).toBe('My Task')
    // 100 + 50 + 10 + 5 + 1 = 166, vs messageTokens 0 -> max = 166
    expect(status.totalTokens).toBe(166)
    expect(status.contextState).toBe('healthy')
    expect(status.recommendedAction).toBe('Continue normally.')
    expect(status.handoffPath).toBe(
      `${MEMORY_ROOT}/memory/handoffs/swarm/worker-1-latest.md`,
    )
    expect(status.handoffExists).toBe(false)
    expect(status.lastHandoffAt).toBeNull()
  })

  it('passes the worker profile path to the python status script', () => {
    cpState.execFileSync = () => PYTHON_OK()
    getSwarmLifecycleStatus('worker-x')
    const call = cpState.execFileCalls.find((c) => c.file === 'python3')
    expect(call).toBeDefined()
    expect(call?.args.at(0)).toBe('-c')
    expect(call?.args.at(-1)).toBe(`${PROFILES_DIR}/worker-x`)
  })

  it('uses messageTokens when it exceeds the component sum', () => {
    cpState.execFileSync = () =>
      PYTHON_OK({
        inputTokens: 1,
        outputTokens: 1,
        cacheReadTokens: 0,
        cacheWriteTokens: 0,
        reasoningTokens: 0,
        messageTokens: 300_000,
      })
    const status = getSwarmLifecycleStatus('worker-1')
    expect(status.totalTokens).toBe(300_000)
    expect(status.contextState).toBe('watch')
  })

  it.each([
    [0, 'healthy', 'Continue normally.'],
    [250_000, 'watch', 'Monitor context; request concise checkpoint soon.'],
    [
      400_000,
      'handoff_required',
      'Request durable handoff before assigning more work.',
    ],
    [
      500_000,
      'renew_required',
      'Renew worker after handoff; avoid new work until restarted.',
    ],
  ] as const)(
    'classifies %i tokens as %s',
    (tokens, expectedState, expectedAction) => {
      cpState.execFileSync = () =>
        PYTHON_OK({
          inputTokens: 0,
          outputTokens: 0,
          cacheReadTokens: 0,
          cacheWriteTokens: 0,
          reasoningTokens: 0,
          messageTokens: tokens,
        })
      const status = getSwarmLifecycleStatus('w')
      expect(status.contextState).toBe(expectedState)
      expect(status.recommendedAction).toBe(expectedAction)
    },
  )

  it('honours a custom policy', () => {
    const policy: SwarmLifecyclePolicy = {
      softTokens: 10,
      handoffTokens: 20,
      hardTokens: 30,
    }
    cpState.execFileSync = () =>
      PYTHON_OK({
        inputTokens: 25,
        outputTokens: 0,
        cacheReadTokens: 0,
        cacheWriteTokens: 0,
        reasoningTokens: 0,
        messageTokens: 0,
      })
    const status = getSwarmLifecycleStatus('w', policy)
    expect(status.contextState).toBe('handoff_required')
    expect(status.policy).toBe(policy)
  })

  it('falls back to zeros / nulls when python3 throws', () => {
    cpState.execFileSync = (file, args) => {
      if (file === 'python3') throw new Error('python missing')
      return args.join('')
    }
    const status = getSwarmLifecycleStatus('w')
    expect(status.sessionId).toBeNull()
    expect(status.model).toBeNull()
    expect(status.title).toBeNull()
    expect(status.totalTokens).toBe(0)
    expect(status.contextState).toBe('healthy')
  })

  it('treats invalid JSON output as a failure (ok:false defaults)', () => {
    cpState.execFileSync = () => 'not json{'
    const status = getSwarmLifecycleStatus('w')
    expect(status.totalTokens).toBe(0)
    expect(status.sessionId).toBeNull()
  })

  it('coerces non-string sessionId/model/title to null', () => {
    cpState.execFileSync = () =>
      PYTHON_OK({ sessionId: 123, model: null, title: undefined })
    const status = getSwarmLifecycleStatus('w')
    expect(status.sessionId).toBeNull()
    expect(status.model).toBeNull()
    expect(status.title).toBeNull()
  })

  it('reports handoff existence and mtime when the file is present', () => {
    cpState.execFileSync = () => PYTHON_OK()
    const hp = `${MEMORY_ROOT}/memory/handoffs/swarm/worker-1-latest.md`
    fsState.files.set(hp, '# handoff')
    fsState.mtimes.set(hp, 1_700_000_000_000)
    const status = getSwarmLifecycleStatus('worker-1')
    expect(status.handoffExists).toBe(true)
    expect(status.lastHandoffAt).toBe(1_700_000_000_000)
  })

  it('returns null mtime when statSync throws but file exists', () => {
    cpState.execFileSync = () => PYTHON_OK()
    const hp = `${MEMORY_ROOT}/memory/handoffs/swarm/worker-1-latest.md`
    fsState.files.set(hp, '# handoff')
    fsState.statThrows.add(hp)
    const status = getSwarmLifecycleStatus('worker-1')
    expect(status.handoffExists).toBe(true)
    expect(status.lastHandoffAt).toBeNull()
  })
})

// ════════════════════════════════════════════════════════════════════════════
// lifecycleHandoffPath — pure helper
// ════════════════════════════════════════════════════════════════════════════

describe('lifecycleHandoffPath', () => {
  it('builds the shared swarm handoff path', () => {
    expect(lifecycleHandoffPath('abc')).toBe(
      `${MEMORY_ROOT}/memory/handoffs/swarm/abc-latest.md`,
    )
  })
})

// ════════════════════════════════════════════════════════════════════════════
// sendToWorker — native process path
// ════════════════════════════════════════════════════════════════════════════

describe('sendToWorker (native process path)', () => {
  beforeEach(() => {
    makeTmuxUnavailable()
  })

  it('errors when no worker process is registered', async () => {
    const res = await sendToWorker('ghost', 'hello')
    expect(res.ok).toBe(false)
    expect(res.error).toContain('not running or stdin not writable')
  })
})

// ════════════════════════════════════════════════════════════════════════════
// sendToWorker — tmux fallback path
// ════════════════════════════════════════════════════════════════════════════

describe('sendToWorker (tmux path)', () => {
  beforeEach(() => {
    makeTmuxAvailable()
    vi.useFakeTimers()
  })

  it('drives the full load-buffer -> send-keys -> paste -> Enter sequence', async () => {
    cpState.execFile = (_file, _args, cb): FakeExecFileChild => {
      // Invoke each callback synchronously with success.
      cb(null, '', '')
      return new FakeExecFileChild()
    }
    const promise = sendToWorker('w1', 'do the thing')
    // The Enter send-keys is scheduled behind a 150ms timer.
    await vi.advanceTimersByTimeAsync(200)
    const res = await promise
    expect(res.ok).toBe(true)

    // load-buffer used the per-worker buffer name
    const loadBuffer = cpState.execFileCalls.find((c) =>
      c.args.includes('load-buffer'),
    )
    expect(loadBuffer?.args).toContain('swarm-lifecycle-w1')
    // paste-buffer targets the swarm session
    const paste = cpState.execFileCalls.find((c) =>
      c.args.includes('paste-buffer'),
    )
    expect(paste?.args).toContain('swarm-w1')
    // final Enter keystroke
    const enter = cpState.execFileCalls.find((c) => c.args.includes('Enter'))
    expect(enter?.args).toContain('swarm-w1')
  })

  it('writes the prompt to the load-buffer child stdin', async () => {
    let captured: FakeExecFileChild | undefined
    cpState.execFile = (_file, args, cb): FakeExecFileChild => {
      const child = new FakeExecFileChild()
      if (args.includes('load-buffer')) captured = child
      cb(null, '', '')
      return child
    }
    const promise = sendToWorker('w1', 'PROMPT-TEXT')
    await vi.advanceTimersByTimeAsync(200)
    await promise
    expect(captured?.stdin.ended).toBe('PROMPT-TEXT')
  })

  it('fails when load-buffer errors, using stderr text', async () => {
    cpState.execFile = (_file, args, cb): FakeExecFileChild => {
      if (args.includes('load-buffer')) {
        cb(new Error('load fail'), '', 'stderr-load')
      }
      return new FakeExecFileChild()
    }
    const res = await sendToWorker('w1', 'x')
    expect(res.ok).toBe(false)
    expect(res.error).toBe('stderr-load')
  })

  it('fails when paste-buffer errors', async () => {
    cpState.execFile = (_file, args, cb): FakeExecFileChild => {
      if (args.includes('paste-buffer')) {
        cb(new Error('paste fail'), '', 'stderr-paste')
      } else {
        cb(null, '', '')
      }
      return new FakeExecFileChild()
    }
    const promise = sendToWorker('w1', 'x')
    await vi.advanceTimersByTimeAsync(200)
    const res = await promise
    expect(res.ok).toBe(false)
    expect(res.error).toBe('stderr-paste')
  })

  it('fails when the final Enter send-keys errors', async () => {
    cpState.execFile = (_file, args, cb): FakeExecFileChild => {
      if (args.includes('Enter')) {
        cb(new Error('enter fail'), '', 'stderr-enter')
      } else {
        cb(null, '', '')
      }
      return new FakeExecFileChild()
    }
    const promise = sendToWorker('w1', 'x')
    await vi.advanceTimersByTimeAsync(200)
    const res = await promise
    expect(res.ok).toBe(false)
    expect(res.error).toBe('stderr-enter')
  })

  it('falls back to error.message when stderr is empty on load failure', async () => {
    cpState.execFile = (_file, args, cb): FakeExecFileChild => {
      if (args.includes('load-buffer')) {
        cb(new Error('only-message'), '', '')
      }
      return new FakeExecFileChild()
    }
    const res = await sendToWorker('w1', 'x')
    expect(res.ok).toBe(false)
    expect(res.error).toBe('only-message')
  })
})

// ════════════════════════════════════════════════════════════════════════════
// requestWorkerHandoff
// ════════════════════════════════════════════════════════════════════════════

describe('requestWorkerHandoff', () => {
  beforeEach(() => {
    makeTmuxUnavailable() // native path; no worker registered -> send fails
  })

  it('creates the handoff directory and sends the handoff prompt', async () => {
    const res = await requestWorkerHandoff('w1')
    expect(res.handoffPath).toBe(
      `${MEMORY_ROOT}/memory/handoffs/swarm/w1-latest.md`,
    )
    // dirname of handoff path was mkdir'd
    expect(fsState.mkdirCalls).toContain(`${MEMORY_ROOT}/memory/handoffs/swarm`)
    // No process registered -> send reports not running
    expect(res.ok).toBe(false)
    expect(res.error).toContain('not running')
  })

  it('records a handoff-requested memory event with both paths', async () => {
    await requestWorkerHandoff('w1')
    expect(appendSwarmMemoryEvent).toHaveBeenCalledTimes(1)
    const arg = appendSwarmMemoryEvent.mock.calls.at(0)?.at(0) as {
      type: string
      workerId: string
      event: { sharedHandoffPath: string; localHandoffPath: string }
    }
    expect(arg.type).toBe('handoff-requested')
    expect(arg.workerId).toBe('w1')
    expect(arg.event.sharedHandoffPath).toBe(
      `${MEMORY_ROOT}/memory/handoffs/swarm/w1-latest.md`,
    )
    expect(arg.event.localHandoffPath).toBe(
      `${PROFILES_DIR}/w1/memory/handoffs/latest.md`,
    )
  })

  it('reads mission context from runtime.json when present', async () => {
    const runtimePath = `${PROFILES_DIR}/w1/runtime.json`
    fsState.files.set(
      runtimePath,
      JSON.stringify({
        currentMissionId: 'm-1',
        currentAssignmentId: 'a-1',
      }),
    )
    await requestWorkerHandoff('w1')
    const arg = appendSwarmMemoryEvent.mock.calls.at(0)?.at(0) as {
      missionId: string | null
      assignmentId: string | null
    }
    expect(arg.missionId).toBe('m-1')
    expect(arg.assignmentId).toBe('a-1')
  })

  it('defaults mission context to null when runtime.json is malformed', async () => {
    const runtimePath = `${PROFILES_DIR}/w1/runtime.json`
    fsState.files.set(runtimePath, '{ not valid')
    await requestWorkerHandoff('w1')
    const arg = appendSwarmMemoryEvent.mock.calls.at(0)?.at(0) as {
      missionId: string | null
      assignmentId: string | null
    }
    expect(arg.missionId).toBeNull()
    expect(arg.assignmentId).toBeNull()
  })

  it('ignores non-string mission/assignment ids in runtime.json', async () => {
    const runtimePath = `${PROFILES_DIR}/w1/runtime.json`
    fsState.files.set(
      runtimePath,
      JSON.stringify({ currentMissionId: 42, currentAssignmentId: false }),
    )
    await requestWorkerHandoff('w1')
    const arg = appendSwarmMemoryEvent.mock.calls.at(0)?.at(0) as {
      missionId: string | null
      assignmentId: string | null
    }
    expect(arg.missionId).toBeNull()
    expect(arg.assignmentId).toBeNull()
  })

  it('still returns a result when the memory write throws', async () => {
    appendSwarmMemoryEvent.mockImplementationOnce(() => {
      throw new Error('memory down')
    })
    const res = await requestWorkerHandoff('w1')
    expect(res.handoffPath).toContain('w1-latest.md')
  })
})

// ════════════════════════════════════════════════════════════════════════════
// notifyHandoffWritten
// ════════════════════════════════════════════════════════════════════════════

describe('notifyHandoffWritten', () => {
  it('records a handoff-written memory event', () => {
    notifyHandoffWritten('w9')
    expect(appendSwarmMemoryEvent).toHaveBeenCalledTimes(1)
    const arg = appendSwarmMemoryEvent.mock.calls.at(0)?.at(0) as {
      type: string
      workerId: string
      event: { sharedHandoffPath: string }
    }
    expect(arg.type).toBe('handoff-written')
    expect(arg.workerId).toBe('w9')
    expect(arg.event.sharedHandoffPath).toBe(
      `${MEMORY_ROOT}/memory/handoffs/swarm/w9-latest.md`,
    )
  })

  it('swallows errors from the memory write', () => {
    appendSwarmMemoryEvent.mockImplementationOnce(() => {
      throw new Error('boom')
    })
    expect(() => notifyHandoffWritten('w9')).not.toThrow()
  })
})

// ════════════════════════════════════════════════════════════════════════════
// renewWorker
// ════════════════════════════════════════════════════════════════════════════

describe('renewWorker', () => {
  beforeEach(() => {
    makeTmuxUnavailable() // native path
    vi.useFakeTimers()
  })

  it('fails fast when the handoff file is missing', async () => {
    const res = await renewWorker('w1')
    expect(res.ok).toBe(false)
    expect(res.restarted).toBe(false)
    expect(res.resumeSent).toBe(false)
    expect(res.error).toBe('Handoff missing; request handoff first')
    expect(res.handoffPath).toContain('w1-latest.md')
  })

  it('fails to restart when the profile directory is absent', async () => {
    const id = 'renew-noprofile'
    const hp = `${MEMORY_ROOT}/memory/handoffs/swarm/${id}-latest.md`
    fsState.files.set(hp, '# handoff') // handoff exists
    // profile dir NOT present -> startWorkerProcessNative returns error
    const promise = renewWorker(id)
    await vi.advanceTimersByTimeAsync(5000)
    const res = await promise
    expect(res.ok).toBe(false)
    expect(res.restarted).toBe(false)
    expect(res.error).toContain('Profile not found')
  })

  it('restarts, sends resume prompt, and records a resume event', async () => {
    // Use a unique workerId so a registered process never leaks across tests.
    const id = 'renew-ok'
    const hp = `${MEMORY_ROOT}/memory/handoffs/swarm/${id}-latest.md`
    fsState.files.set(hp, '# handoff')
    fsState.dirs.add(`${PROFILES_DIR}/${id}`) // profile exists

    const child = new FakeChildProcess()
    cpState.spawn = (): FakeChildProcess => child

    const promise = renewWorker(id)
    // Drive the internal kill + two setTimeout waits (2000 + 600 + 1500ms).
    await vi.advanceTimersByTimeAsync(5000)
    const res = await promise

    expect(res.restarted).toBe(true)
    expect(res.resumeSent).toBe(true)
    expect(res.ok).toBe(true)
    expect(res.handoffPath).toBe(hp)

    // spawned the hermes CLI with the worker profile flags
    const spawnCall = cpState.spawnCalls.at(0)
    expect(spawnCall?.args).toEqual(['--tui', '--profile', id])

    // resume memory event recorded
    const resumeEvent = appendSwarmMemoryEvent.mock.calls
      .map((c) => c.at(0) as { type: string })
      .find((e) => e.type === 'resume')
    expect(resumeEvent).toBeDefined()

    // Clean up the registered process so it never leaks into another test.
    child.emit('exit', 0, null)
  })

  it('reports failure when spawn yields no pid', async () => {
    const id = 'renew-nopid'
    const hp = `${MEMORY_ROOT}/memory/handoffs/swarm/${id}-latest.md`
    fsState.files.set(hp, '# handoff')
    fsState.dirs.add(`${PROFILES_DIR}/${id}`)

    const child = new FakeChildProcess()
    child.pid = undefined
    cpState.spawn = (): FakeChildProcess => child

    const promise = renewWorker(id)
    await vi.advanceTimersByTimeAsync(5000)
    const res = await promise
    expect(res.ok).toBe(false)
    expect(res.restarted).toBe(false)
    expect(res.error).toBe('Failed to spawn worker process')
  })
})

// ════════════════════════════════════════════════════════════════════════════
// renewWorker — tmux path (tmuxKill / tmuxStart command construction)
// ════════════════════════════════════════════════════════════════════════════

describe('renewWorker (tmux path)', () => {
  const id = 'tmux-renew'
  const wrapper = `${HOME_DIR}/.local/bin/${id}`

  beforeEach(() => {
    makeTmuxAvailable() // tmux path
    vi.useFakeTimers()
    fsState.files.set(
      `${MEMORY_ROOT}/memory/handoffs/swarm/${id}-latest.md`,
      '# handoff',
    )
  })

  it('kills then starts a tmux session with the worker wrapper', async () => {
    fsState.files.set(wrapper, '#!/bin/sh') // wrapper present
    cpState.execFile = (_file, _args, cb): FakeExecFileChild => {
      cb(null, '', '')
      return new FakeExecFileChild()
    }
    const promise = renewWorker(id)
    await vi.advanceTimersByTimeAsync(3000)
    const res = await promise
    expect(res.restarted).toBe(true)
    expect(res.ok).toBe(true)

    const kill = cpState.execFileCalls.find((c) =>
      c.args.includes('kill-session'),
    )
    expect(kill?.args).toEqual(['kill-session', '-t', `swarm-${id}`])

    const start = cpState.execFileCalls.find((c) =>
      c.args.includes('new-session'),
    )
    expect(start?.args).toEqual([
      'new-session',
      '-d',
      '-s',
      `swarm-${id}`,
      wrapper,
    ])
  })

  it('fails to restart when the tmux wrapper script is missing', async () => {
    // wrapper NOT present -> tmuxStart returns "Wrapper not found"
    cpState.execFile = (_file, _args, cb): FakeExecFileChild => {
      cb(null, '', '')
      return new FakeExecFileChild()
    }
    const promise = renewWorker(id)
    await vi.advanceTimersByTimeAsync(3000)
    const res = await promise
    expect(res.ok).toBe(false)
    expect(res.restarted).toBe(false)
    expect(res.error).toContain('Wrapper not found')
  })

  it('continues to restart even when tmuxKill reports an error', async () => {
    fsState.files.set(wrapper, '#!/bin/sh')
    cpState.execFile = (_file, args, cb): FakeExecFileChild => {
      if (args.includes('kill-session')) {
        cb(new Error('no such session'), '', 'no session')
      } else {
        cb(null, '', '')
      }
      return new FakeExecFileChild()
    }
    const promise = renewWorker(id)
    await vi.advanceTimersByTimeAsync(3000)
    const res = await promise
    // kill failing is tolerated; start succeeds
    expect(res.restarted).toBe(true)
  })

  it('surfaces a tmuxStart error from stderr', async () => {
    fsState.files.set(wrapper, '#!/bin/sh')
    cpState.execFile = (_file, args, cb): FakeExecFileChild => {
      if (args.includes('new-session')) {
        cb(new Error('start fail'), '', 'tmux-start-stderr')
      } else {
        cb(null, '', '')
      }
      return new FakeExecFileChild()
    }
    const promise = renewWorker(id)
    await vi.advanceTimersByTimeAsync(3000)
    const res = await promise
    expect(res.ok).toBe(false)
    expect(res.restarted).toBe(false)
    expect(res.error).toBe('tmux-start-stderr')
  })
})

// ════════════════════════════════════════════════════════════════════════════
// autoSweepLifecycle
// ════════════════════════════════════════════════════════════════════════════

describe('autoSweepLifecycle', () => {
  beforeEach(() => {
    makeTmuxUnavailable()
    vi.useFakeTimers()
  })

  function setTotalTokens(n: number): void {
    cpState.execFileSync = (file, args) => {
      if (file === 'python3') {
        return PYTHON_OK({
          inputTokens: 0,
          outputTokens: 0,
          cacheReadTokens: 0,
          cacheWriteTokens: 0,
          reasoningTokens: 0,
          messageTokens: n,
        })
      }
      if (args[0] === 'list-sessions') throw new Error('no tmux')
      return ''
    }
  }

  it('takes no action for a healthy worker', async () => {
    setTotalTokens(0)
    const promise = autoSweepLifecycle(['w1'])
    await vi.advanceTimersByTimeAsync(3000)
    const out = await promise
    expect(out).toHaveLength(1)
    expect(out.at(0)?.action).toBe('none')
    expect(out.at(0)?.result).toBeUndefined()
  })

  it('requests a handoff when in handoff_required state', async () => {
    setTotalTokens(400_000)
    const promise = autoSweepLifecycle(['w1'])
    await vi.advanceTimersByTimeAsync(3000)
    const out = await promise
    expect(out.at(0)?.action).toBe('request-handoff')
    expect(out.at(0)?.status.contextState).toBe('handoff_required')
    expect(out.at(0)?.result).toBeDefined()
  })

  it('requests a handoff when renew_required but no handoff exists', async () => {
    setTotalTokens(500_000)
    // handoff file absent -> handoffExists false
    const promise = autoSweepLifecycle(['w1'])
    await vi.advanceTimersByTimeAsync(3000)
    const out = await promise
    expect(out.at(0)?.action).toBe('request-handoff')
    expect(out.at(0)?.status.contextState).toBe('renew_required')
  })

  it('renews when renew_required and a handoff exists', async () => {
    setTotalTokens(500_000)
    const id = 'sweep-renew'
    const hp = `${MEMORY_ROOT}/memory/handoffs/swarm/${id}-latest.md`
    fsState.files.set(hp, '# handoff')
    fsState.dirs.add(`${PROFILES_DIR}/${id}`)
    const child = new FakeChildProcess()
    cpState.spawn = (): FakeChildProcess => child

    const promise = autoSweepLifecycle([id])
    await vi.advanceTimersByTimeAsync(5000)
    const out = await promise
    expect(out.at(0)?.action).toBe('renew')
    expect(out.at(0)?.status.contextState).toBe('renew_required')
    expect(out.at(0)?.result).toBeDefined()
    child.emit('exit', 0, null)
  })

  it('processes multiple workers in order', async () => {
    cpState.execFileSync = (file, args) => {
      if (file === 'python3') {
        const worker = args.at(-1)
        const n = worker?.endsWith('hot') ? 400_000 : 0
        return PYTHON_OK({
          inputTokens: 0,
          outputTokens: 0,
          cacheReadTokens: 0,
          cacheWriteTokens: 0,
          reasoningTokens: 0,
          messageTokens: n,
        })
      }
      if (args[0] === 'list-sessions') throw new Error('no tmux')
      return ''
    }
    const promise = autoSweepLifecycle(['cold', 'hot'])
    await vi.advanceTimersByTimeAsync(3000)
    const out = await promise
    expect(out.map((o) => o.workerId)).toEqual(['cold', 'hot'])
    expect(out.at(0)?.action).toBe('none')
    expect(out.at(1)?.action).toBe('request-handoff')
  })
})
