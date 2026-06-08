import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  applyAgentUpdate,
  applyWorkspaceUpdate,
  readAgentUpdateStatus,
  readUpdateStatus,
  readWorkspaceUpdateStatus,
  remoteUrlMatches,
  updateAvailableFromDivergence,
} from './update-system'

// ── execFileSync mock ─────────────────────────────────────────────────────────
//
// Every git / which / hermes / pnpm invocation in the module routes through
// `execFileSync`. We model it as a list of handlers keyed by a substring of the
// joined "command arg1 arg2 …" string. The first matching handler wins, so
// later-registered (more specific) handlers take precedence.

type ExecOptions = {
  cwd?: string
  timeout?: number
  encoding?: string
  stdio?: unknown
}

type ExecHandler = (args: Array<string>, options: ExecOptions) => string

type ExecRule = {
  command: string
  cwd: string | undefined
  match: (key: string) => boolean
  handler: ExecHandler
}

type ExecCall = {
  command: string
  args: Array<string>
  cwd: string | undefined
}

const execState: {
  rules: Array<ExecRule>
  calls: Array<ExecCall>
} = {
  rules: [],
  calls: [],
}

class ExecFailure extends Error {}

function execKey(command: string, args: Array<string>): string {
  return [command, ...args].join(' ')
}

/**
 * Register an exec handler. Optionally scope it to a specific `cwd` so the
 * same git subcommand can behave differently for the workspace vs the agent
 * repo within a single test (e.g. readUpdateStatus, which reads both).
 */
function onExec(
  command: string,
  contains: string,
  handler: ExecHandler,
  cwd?: string,
): void {
  execState.rules.unshift({
    command,
    cwd,
    match: (key) => key.startsWith(`${command} `) && key.includes(contains),
    handler,
  })
}

vi.mock('node:child_process', () => ({
  execFileSync: (
    command: string,
    args: Array<string>,
    options: ExecOptions,
  ): string => {
    execState.calls.push({ command, args, cwd: options.cwd })
    const key = execKey(command, args)
    const rule = execState.rules.find(
      (r) => r.match(key) && (r.cwd === undefined || r.cwd === options.cwd),
    )
    if (!rule) throw new ExecFailure(`unhandled exec: ${key}`)
    return rule.handler(args, options)
  },
}))

// ── fs mock ───────────────────────────────────────────────────────────────────

const fsState: {
  files: Map<string, string>
  dirs: Set<string>
  realpaths: Map<string, string>
  writes: Map<string, string>
  mkdirs: Array<string>
} = {
  files: new Map(),
  dirs: new Set(),
  realpaths: new Map(),
  writes: new Map(),
  mkdirs: [],
}

vi.mock('node:fs', () => ({
  existsSync: (p: string): boolean =>
    fsState.files.has(p) || fsState.dirs.has(p),
  readFileSync: (p: string): string => {
    const v = fsState.files.get(p)
    if (v === undefined) throw new Error(`ENOENT: ${p}`)
    return v
  },
  writeFileSync: (p: string, data: string): void => {
    fsState.writes.set(p, data)
  },
  mkdirSync: (p: string): void => {
    fsState.mkdirs.push(p)
    fsState.dirs.add(p)
  },
  realpathSync: (p: string): string => {
    const resolved = fsState.realpaths.get(p)
    if (resolved === undefined) throw new Error(`ENOENT realpath: ${p}`)
    return resolved
  },
}))

vi.mock('node:os', () => ({
  homedir: (): string => '/home/tester',
}))

// ── helpers ───────────────────────────────────────────────────────────────────

const CWD = '/repo/workspace'

const originalEnv: Record<string, string | undefined> = {}

function setEnv(key: string, value: string | undefined): void {
  if (!(key in originalEnv)) originalEnv[key] = process.env[key]
  if (value === undefined) delete process.env[key]
  else process.env[key] = value
}

/** Register a git checkout at `path` so realGitRepoPath() resolves it. */
function registerGitRepo(path: string, resolved = path): void {
  fsState.realpaths.set(path, resolved)
  fsState.dirs.add(`${resolved}/.git`)
}

function setPackageVersion(repoPath: string, version: string): void {
  fsState.files.set(`${repoPath}/package.json`, JSON.stringify({ version }))
}

/**
 * Wire up the standard "happy path" workspace git repo with an available
 * fast-forwardable update on the main branch. Individual tests override pieces.
 */
function wireWorkspaceRepo(
  options: {
    remoteUrl?: string
    branch?: string
    currentHead?: string
    remoteHead?: string
    porcelain?: string
    ahead?: number
    behind?: number
    canVerifyRef?: boolean
    canFastForward?: boolean
  } = {},
): void {
  const remoteUrl =
    options.remoteUrl ?? 'https://github.com/outsourc-e/hermes-workspace.git'
  const branch = options.branch ?? 'main'
  const currentHead = options.currentHead ?? 'aaaa'
  const remoteHeadSha = options.remoteHead ?? 'bbbb'
  const porcelain = options.porcelain ?? ''
  const ahead = options.ahead ?? 0
  const behind = options.behind ?? 1
  const canVerifyRef = options.canVerifyRef ?? true
  const canFf = options.canFastForward ?? true

  registerGitRepo(CWD)
  setPackageVersion(CWD, '1.2.3')

  onExec('git', 'remote get-url origin', () => remoteUrl, CWD)
  onExec('git', 'fetch origin --quiet', () => 'ok', CWD)
  onExec('git', 'rev-parse HEAD', () => currentHead, CWD)
  onExec('git', 'rev-parse --abbrev-ref HEAD', () => branch, CWD)
  onExec(
    'git',
    `ls-remote ${remoteUrl} HEAD`,
    () => `${remoteHeadSha}\tHEAD`,
    CWD,
  )
  onExec('git', 'status --porcelain', () => porcelain, CWD)
  onExec(
    'git',
    'rev-list --left-right --count',
    () => `${ahead}\t${behind}`,
    CWD,
  )
  onExec(
    'git',
    'rev-parse --verify',
    () => {
      if (!canVerifyRef) throw new ExecFailure('no ref')
      return remoteHeadSha
    },
    CWD,
  )
  onExec(
    'git',
    'merge-base --is-ancestor',
    () => {
      if (!canFf) throw new ExecFailure('not ancestor')
      return 'ok'
    },
    CWD,
  )
}

beforeEach(() => {
  execState.rules = []
  execState.calls = []
  fsState.files.clear()
  fsState.dirs.clear()
  fsState.realpaths.clear()
  fsState.writes.clear()
  fsState.mkdirs = []
  vi.spyOn(process, 'cwd').mockReturnValue(CWD)
  // Default environment: not desktop, not docker.
  setEnv('HERMES_WORKSPACE_DESKTOP', undefined)
  setEnv('HERMES_WORKSPACE_DOCKER', undefined)
  setEnv('ELECTRON_RUN_AS_NODE', undefined)
  setEnv('HERMES_AGENT_REPO', undefined)
  // Deterministic clock.
  vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)
})

afterEach(() => {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
  for (const key of Object.keys(originalEnv)) delete originalEnv[key]
  vi.restoreAllMocks()
})

// ── remoteUrlMatches ──────────────────────────────────────────────────────────

describe('remoteUrlMatches', () => {
  it('returns false for a null url', () => {
    expect(remoteUrlMatches(null, ['hermes-workspace'])).toBe(false)
  })

  it('matches an https url with .git suffix', () => {
    expect(
      remoteUrlMatches('https://github.com/outsourc-e/hermes-workspace.git', [
        'hermes-workspace',
      ]),
    ).toBe(true)
  })

  it('matches an http url', () => {
    expect(
      remoteUrlMatches('http://github.com/outsourc-e/hermes-workspace', [
        'hermes-workspace',
      ]),
    ).toBe(true)
  })

  it('matches a scp-style git@ url', () => {
    expect(
      remoteUrlMatches('git@github.com:outsourc-e/hermes-workspace.git', [
        'outsourc-e/hermes-workspace',
      ]),
    ).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(
      remoteUrlMatches('https://GitHub.com/Outsourc-E/Hermes-Workspace.git', [
        'hermes-workspace',
      ]),
    ).toBe(true)
  })

  it('strips a .git suffix off the expected alias too', () => {
    expect(
      remoteUrlMatches('git@github.com:owner/hermes-agent', [
        'hermes-agent.git',
      ]),
    ).toBe(true)
  })

  it('returns false when no alias is contained in the url', () => {
    expect(
      remoteUrlMatches('https://github.com/owner/other-repo.git', [
        'hermes-workspace',
        'hermes-agent',
      ]),
    ).toBe(false)
  })
})

// ── updateAvailableFromDivergence ─────────────────────────────────────────────

describe('updateAvailableFromDivergence', () => {
  it('reports available when behind > 0 regardless of headsDiffer', () => {
    expect(updateAvailableFromDivergence({ ahead: 0, behind: 3 }, false)).toBe(
      true,
    )
  })

  it('reports not-available when only ahead (local hotfixes)', () => {
    expect(updateAvailableFromDivergence({ ahead: 5, behind: 0 }, true)).toBe(
      false,
    )
  })

  it('reports not-available when in sync', () => {
    expect(updateAvailableFromDivergence({ ahead: 0, behind: 0 }, false)).toBe(
      false,
    )
  })

  it('falls back to headsDiffer when divergence is null', () => {
    expect(updateAvailableFromDivergence(null, true)).toBe(true)
    expect(updateAvailableFromDivergence(null, false)).toBe(false)
  })
})

// ── readWorkspaceUpdateStatus: install kind branches ──────────────────────────

describe('readWorkspaceUpdateStatus install kinds', () => {
  it('detects desktop install via HERMES_WORKSPACE_DESKTOP=1', () => {
    setEnv('HERMES_WORKSPACE_DESKTOP', '1')
    registerGitRepo(CWD)
    setPackageVersion(CWD, '2.0.0')

    const status = readWorkspaceUpdateStatus()
    expect(status.installKind).toBe('desktop')
    expect(status.state).toBe('unsupported')
    expect(status.updateMode).toBe('desktop-auto-updater')
    expect(status.version).toBe('2.0.0')
    expect(status.canUpdate).toBe(false)
  })

  it('detects desktop install via ELECTRON_RUN_AS_NODE', () => {
    setEnv('ELECTRON_RUN_AS_NODE', '1')
    registerGitRepo(CWD)
    setPackageVersion(CWD, '2.0.0')

    expect(readWorkspaceUpdateStatus().installKind).toBe('desktop')
  })

  it('detects docker install via HERMES_WORKSPACE_DOCKER=1', () => {
    setEnv('HERMES_WORKSPACE_DOCKER', '1')
    registerGitRepo(CWD)
    setPackageVersion(CWD, '2.0.0')

    const status = readWorkspaceUpdateStatus()
    expect(status.installKind).toBe('docker')
    expect(status.state).toBe('unsupported')
    expect(status.updateMode).toBe('docker-manual')
  })

  it('returns unknown/unsupported when cwd is not a git repo', () => {
    // No realpath registered → realGitRepoPath returns null.
    const status = readWorkspaceUpdateStatus()
    expect(status.installKind).toBe('unknown')
    expect(status.state).toBe('unsupported')
    expect(status.updateMode).toBe('manual')
    expect(status.version).toBe('unknown')
    expect(status.repoPath).toBeNull()
  })
})

// ── readWorkspaceUpdateStatus: git branches ───────────────────────────────────

describe('readWorkspaceUpdateStatus git', () => {
  it('reports available + canUpdate on a clean main repo that is behind', () => {
    wireWorkspaceRepo({ behind: 2 })

    const status = readWorkspaceUpdateStatus()
    expect(status.installKind).toBe('git')
    expect(status.state).toBe('available')
    expect(status.updateAvailable).toBe(true)
    expect(status.canUpdate).toBe(true)
    expect(status.reason).toBeNull()
    expect(status.branch).toBe('main')
    expect(status.currentHead).toBe('aaaa')
    expect(status.latestHead).toBe('bbbb')
    expect(status.version).toBe('1.2.3')
    expect(status.blockingFiles).toBeUndefined()
  })

  it('reports current when heads match and not behind', () => {
    wireWorkspaceRepo({
      currentHead: 'same',
      remoteHead: 'same',
      ahead: 0,
      behind: 0,
    })

    const status = readWorkspaceUpdateStatus()
    expect(status.state).toBe('current')
    expect(status.updateAvailable).toBe(false)
    expect(status.canUpdate).toBe(false)
    expect(status.reason).toBeNull()
  })

  it('reports unsupported when the remote does not look like hermes-workspace', () => {
    wireWorkspaceRepo({
      remoteUrl: 'https://github.com/someone/unrelated.git',
    })

    const status = readWorkspaceUpdateStatus()
    expect(status.state).toBe('unsupported')
    expect(status.reason).toMatch(/does not look like hermes-workspace/)
    expect(status.canUpdate).toBe(false)
  })

  it('reports unsupported on a non-main/master branch', () => {
    wireWorkspaceRepo({ branch: 'feature/x' })

    const status = readWorkspaceUpdateStatus()
    expect(status.state).toBe('unsupported')
    expect(status.reason).toMatch(/only enabled on main\/master/)
    expect(status.latestHead).toBeNull()
  })

  it('supports the master branch', () => {
    wireWorkspaceRepo({ branch: 'master', behind: 1 })

    const status = readWorkspaceUpdateStatus()
    expect(status.branch).toBe('master')
    expect(status.state).toBe('available')
  })

  it('reports blocked with blockingFiles when the checkout is dirty', () => {
    // Porcelain lines: "XY <path>". exec() trims the whole blob, so the very
    // first line must not lead with a space or git's column-1 space would be
    // stripped (real status codes here use a non-space first column).
    wireWorkspaceRepo({
      behind: 2,
      porcelain: 'M  src/a.ts\n?? new.txt\nA  staged.ts\n',
    })

    const status = readWorkspaceUpdateStatus()
    expect(status.state).toBe('blocked')
    expect(status.canUpdate).toBe(false)
    expect(status.reason).toMatch(/local changes/)
    expect(status.blockingFiles).toEqual(['src/a.ts', 'new.txt', 'staged.ts'])
  })

  it('caps blockingFiles at the limit (24)', () => {
    const lines = Array.from({ length: 30 }, (_, i) => `M  file-${i}.ts`).join(
      '\n',
    )
    wireWorkspaceRepo({ behind: 1, porcelain: lines })

    const status = readWorkspaceUpdateStatus()
    expect(status.blockingFiles).toHaveLength(24)
  })

  it('reports blocked when the remote ref cannot be verified', () => {
    wireWorkspaceRepo({ behind: 2, canVerifyRef: false })

    const status = readWorkspaceUpdateStatus()
    expect(status.state).toBe('blocked')
    expect(status.canUpdate).toBe(false)
    expect(status.reason).toMatch(/could not verify the remote branch ref/)
  })

  it('surfaces a diverged-branch reason when ff is not possible but ref verifies', () => {
    wireWorkspaceRepo({
      behind: 2,
      ahead: 3,
      canVerifyRef: true,
      canFastForward: false,
    })

    const status = readWorkspaceUpdateStatus()
    // canSync true (ref verifies) → available, but reason flags divergence.
    expect(status.state).toBe('available')
    expect(status.reason).toMatch(/diverged from origin/)
  })

  it('treats a null remote head as no update (e.g. ls-remote failure)', () => {
    wireWorkspaceRepo({ behind: 5 })
    // Override ls-remote to fail → remoteHead returns null.
    onExec('git', 'ls-remote', () => {
      throw new ExecFailure('network down')
    })

    const status = readWorkspaceUpdateStatus()
    expect(status.latestHead).toBeNull()
    expect(status.updateAvailable).toBe(false)
    expect(status.state).toBe('current')
  })

  it('falls back to version "unknown" when package.json is malformed', () => {
    wireWorkspaceRepo()
    fsState.files.set(`${CWD}/package.json`, '{ not valid json')

    expect(readWorkspaceUpdateStatus().version).toBe('unknown')
  })
})

// ── readAgentUpdateStatus ─────────────────────────────────────────────────────

const AGENT_REPO = '/home/tester/.hermes/hermes-agent'

function wireAgentRepo(
  options: {
    remoteUrl?: string
    branch?: string
    currentHead?: string
    remoteHead?: string
    porcelain?: string
    behind?: number
    canVerifyRef?: boolean
    canFastForward?: boolean
    hasVenvHermes?: boolean
    version?: string
  } = {},
): void {
  const remoteUrl =
    options.remoteUrl ?? 'https://github.com/NousResearch/hermes-agent.git'
  const branch = options.branch ?? 'main'
  const currentHead = options.currentHead ?? 'cccc'
  const remoteHeadSha = options.remoteHead ?? 'dddd'
  const porcelain = options.porcelain ?? ''
  const behind = options.behind ?? 1
  const canVerifyRef = options.canVerifyRef ?? true
  const canFf = options.canFastForward ?? true
  const version = options.version ?? 'hermes 9.9.9'

  setEnv('HERMES_AGENT_REPO', AGENT_REPO)
  registerGitRepo(AGENT_REPO)

  const venvHermes = `${AGENT_REPO}/venv/bin/hermes`
  if (options.hasVenvHermes ?? true) {
    fsState.files.set(venvHermes, '#!/bin/sh')
    onExec(venvHermes, '--version', () => version)
  } else {
    onExec('which', 'hermes', () => '/usr/local/bin/hermes')
    onExec('/usr/local/bin/hermes', '--version', () => version)
  }

  onExec('git', 'remote get-url origin', () => remoteUrl, AGENT_REPO)
  onExec('git', 'fetch origin --quiet', () => 'ok', AGENT_REPO)
  onExec('git', 'rev-parse HEAD', () => currentHead, AGENT_REPO)
  onExec('git', 'rev-parse --abbrev-ref HEAD', () => branch, AGENT_REPO)
  onExec(
    'git',
    `ls-remote ${remoteUrl} HEAD`,
    () => `${remoteHeadSha}\tHEAD`,
    AGENT_REPO,
  )
  onExec('git', 'status --porcelain', () => porcelain, AGENT_REPO)
  onExec(
    'git',
    'rev-list --left-right --count',
    () => `0\t${behind}`,
    AGENT_REPO,
  )
  onExec(
    'git',
    'rev-parse --verify',
    () => {
      if (!canVerifyRef) throw new ExecFailure('no ref')
      return remoteHeadSha
    },
    AGENT_REPO,
  )
  onExec(
    'git',
    'merge-base --is-ancestor',
    () => {
      if (!canFf) throw new ExecFailure('not ancestor')
      return 'ok'
    },
    AGENT_REPO,
  )
}

describe('readAgentUpdateStatus', () => {
  it('returns unsupported/unknown when no agent checkout is found', () => {
    // HERMES_AGENT_REPO unset and no candidate realpaths registered.
    onExec('which', 'hermes', () => {
      throw new ExecFailure('not found')
    })

    const status = readAgentUpdateStatus()
    expect(status.installKind).toBe('unknown')
    expect(status.state).toBe('unsupported')
    expect(status.repoPath).toBeNull()
    expect(status.version).toBe('unknown')
    expect(status.reason).toMatch(/git checkout was not found/)
  })

  it('reads version from the venv hermes binary when present', () => {
    wireAgentRepo({ version: 'hermes 4.5.6\nextra line', behind: 1 })

    const status = readAgentUpdateStatus()
    expect(status.version).toBe('hermes 4.5.6')
    expect(status.path).toBe(`${AGENT_REPO}/venv/bin/hermes`)
  })

  it('falls back to `which hermes` when the venv binary is absent', () => {
    wireAgentRepo({ hasVenvHermes: false, version: 'hermes 1.0.0' })

    const status = readAgentUpdateStatus()
    expect(status.path).toBe('/usr/local/bin/hermes')
    expect(status.version).toBe('hermes 1.0.0')
  })

  it('reports available + canUpdate on a clean repo that is behind', () => {
    wireAgentRepo({ behind: 3 })

    const status = readAgentUpdateStatus()
    expect(status.state).toBe('available')
    expect(status.updateAvailable).toBe(true)
    expect(status.canUpdate).toBe(true)
    expect(status.updateMode).toBe('hermes-update')
  })

  it('allows non-main branches (agent has no branch restriction)', () => {
    wireAgentRepo({ branch: 'develop', behind: 1 })

    const status = readAgentUpdateStatus()
    expect(status.branch).toBe('develop')
    expect(status.state).toBe('available')
  })

  it('reports unsupported when the remote is not a hermes-agent remote', () => {
    wireAgentRepo({ remoteUrl: 'https://github.com/x/y.git' })

    const status = readAgentUpdateStatus()
    expect(status.state).toBe('unsupported')
    expect(status.reason).toMatch(/does not look like hermes-agent/)
    expect(status.latestHead).toBeNull()
    expect(status.updateAvailable).toBe(false)
  })

  it('reports blocked with blockingFiles when dirty', () => {
    wireAgentRepo({ behind: 2, porcelain: 'M  agent.py\n' })

    const status = readAgentUpdateStatus()
    expect(status.state).toBe('blocked')
    expect(status.blockingFiles).toEqual(['agent.py'])
    expect(status.reason).toMatch(/local changes/)
  })

  it('reports blocked when the ref cannot be verified', () => {
    wireAgentRepo({ behind: 2, canVerifyRef: false })

    const status = readAgentUpdateStatus()
    expect(status.state).toBe('blocked')
    expect(status.canUpdate).toBe(false)
    expect(status.reason).toMatch(/could not verify the remote branch ref/)
  })

  it('reports current when in sync', () => {
    wireAgentRepo({ currentHead: 'z', remoteHead: 'z', behind: 0 })

    const status = readAgentUpdateStatus()
    expect(status.state).toBe('current')
    expect(status.updateAvailable).toBe(false)
  })
})

// ── readUpdateStatus aggregation + pending release notes cache ─────────────────

describe('readUpdateStatus', () => {
  it('aggregates both products and reflects updateAvailable', () => {
    wireWorkspaceRepo({ behind: 2 })
    wireAgentRepo({ currentHead: 'z', remoteHead: 'z', behind: 0 })

    const status = readUpdateStatus()
    expect(status.ok).toBe(true)
    expect(status.checkedAt).toBe(1_700_000_000_000)
    expect(status.products.workspace.id).toBe('workspace')
    expect(status.products.agent.id).toBe('agent')
    expect(status.updateAvailable).toBe(true) // workspace has one
  })

  it('reports updateAvailable false when neither product has an update', () => {
    wireWorkspaceRepo({
      currentHead: 'same',
      remoteHead: 'same',
      ahead: 0,
      behind: 0,
    })
    wireAgentRepo({ currentHead: 'z', remoteHead: 'z', behind: 0 })

    expect(readUpdateStatus().updateAvailable).toBe(false)
  })

  it('reads pending release notes from the cache file when present', () => {
    wireWorkspaceRepo({ behind: 1 })
    wireAgentRepo({ behind: 0, currentHead: 'z', remoteHead: 'z' })
    const cachePath = `${CWD}/.runtime/pending-update-release-notes.json`
    fsState.files.set(
      cachePath,
      JSON.stringify({
        sections: [
          {
            product: 'workspace',
            label: 'Hermes Workspace',
            from: 'a',
            to: 'b',
            commits: ['fix things (a)'],
          },
        ],
      }),
    )

    const status = readUpdateStatus()
    expect(status.pendingReleaseNotes).toHaveLength(1)
    expect(status.pendingReleaseNotes[0]?.commits).toEqual(['fix things (a)'])
  })

  it('returns empty pending notes when the cache file is missing', () => {
    wireWorkspaceRepo({ behind: 1 })
    wireAgentRepo({ behind: 0, currentHead: 'z', remoteHead: 'z' })

    expect(readUpdateStatus().pendingReleaseNotes).toEqual([])
  })

  it('returns empty pending notes when the cache file is malformed', () => {
    wireWorkspaceRepo({ behind: 1 })
    wireAgentRepo({ behind: 0, currentHead: 'z', remoteHead: 'z' })
    fsState.files.set(
      `${CWD}/.runtime/pending-update-release-notes.json`,
      'not json at all',
    )

    expect(readUpdateStatus().pendingReleaseNotes).toEqual([])
  })

  it('returns empty pending notes when sections is not an array', () => {
    wireWorkspaceRepo({ behind: 1 })
    wireAgentRepo({ behind: 0, currentHead: 'z', remoteHead: 'z' })
    fsState.files.set(
      `${CWD}/.runtime/pending-update-release-notes.json`,
      JSON.stringify({ sections: 'nope' }),
    )

    expect(readUpdateStatus().pendingReleaseNotes).toEqual([])
  })
})

// ── applyWorkspaceUpdate ──────────────────────────────────────────────────────

describe('applyWorkspaceUpdate', () => {
  it('refuses when canUpdate is false (e.g. dirty)', () => {
    wireWorkspaceRepo({ behind: 2, porcelain: ' M dirty.ts\n' })

    const result = applyWorkspaceUpdate()
    expect(result.ok).toBe(false)
    expect(result.product).toBe('workspace')
    expect(result.error).toMatch(/local changes/)
    expect(result.output).toBe('')
    expect(result.restartRequired).toBe(false)
  })

  it('fast-forwards, rebuilds on src changes, and persists release notes', () => {
    // before: behind, ff-able, clean. We need a stateful HEAD so the "after"
    // read returns the new head once the merge has run.
    let head = 'aaaa'
    wireWorkspaceRepo({ behind: 1, currentHead: 'aaaa', remoteHead: 'bbbb' })
    // Replace rev-parse HEAD with a stateful reader.
    onExec('git', 'rev-parse HEAD', () => head)
    onExec('git', 'fetch origin', () => 'Fetching origin')
    onExec('git', 'merge --ff-only', () => {
      head = 'bbbb'
      return 'Updating aaaa..bbbb'
    })
    onExec('git', 'diff --name-only', () => 'src/index.ts\nREADME.md')
    onExec('git', 'log', () => 'add feature (bbbb)\nfix bug (cccc)')
    onExec('pnpm', 'build', () => 'built ok')

    const result = applyWorkspaceUpdate()
    expect(result.ok).toBe(true)
    expect(result.restartRequired).toBe(true)
    expect(result.output).toContain('Updating aaaa..bbbb')
    expect(result.output).toContain('built ok')
    expect(result.releaseNotes[0]?.from).toBe('aaaa')
    expect(result.releaseNotes[0]?.to).toBe('bbbb')
    expect(result.releaseNotes[0]?.commits).toEqual([
      'add feature (bbbb)',
      'fix bug (cccc)',
    ])
    // Release notes persisted to cache.
    const cachePath = `${CWD}/.runtime/pending-update-release-notes.json`
    expect(fsState.writes.has(cachePath)).toBe(true)
    expect(fsState.mkdirs).toContain(`${CWD}/.runtime`)
  })

  it('runs pnpm install when package.json / lockfile changed', () => {
    let head = 'aaaa'
    wireWorkspaceRepo({ behind: 1 })
    onExec('git', 'rev-parse HEAD', () => head)
    onExec('git', 'fetch origin', () => 'fetched')
    onExec('git', 'merge --ff-only', () => {
      head = 'bbbb'
      return 'merged'
    })
    onExec('git', 'diff --name-only', () => 'package.json\npnpm-lock.yaml')
    onExec('git', 'log', () => 'bump deps (bbbb)')
    const installFn = vi.fn(() => 'installed')
    const buildFn = vi.fn(() => 'built')
    onExec('pnpm', 'install --no-frozen-lockfile', installFn)
    onExec('pnpm', 'build', buildFn)

    const result = applyWorkspaceUpdate()
    expect(result.ok).toBe(true)
    expect(installFn).toHaveBeenCalledTimes(1)
    // package.json change also triggers a build.
    expect(buildFn).toHaveBeenCalledTimes(1)
    expect(result.output).toContain('installed')
  })

  it('uses reset --hard when fast-forward is not possible', () => {
    let head = 'aaaa'
    wireWorkspaceRepo({
      behind: 2,
      ahead: 1,
      canFastForward: false,
      canVerifyRef: true,
    })
    onExec('git', 'rev-parse HEAD', () => head)
    onExec('git', 'fetch origin', () => 'fetched')
    const resetFn = vi.fn(() => {
      head = 'bbbb'
      return 'HEAD is now at bbbb'
    })
    onExec('git', 'reset --hard', resetFn)
    onExec('git', 'diff --name-only', () => 'docs/x.md')
    onExec('git', 'log', () => 'realign (bbbb)')

    const result = applyWorkspaceUpdate()
    expect(result.ok).toBe(true)
    expect(resetFn).toHaveBeenCalledTimes(1)
    expect(result.output).toContain('HEAD is now at bbbb')
  })

  it('skips install and build when only non-src files changed', () => {
    let head = 'aaaa'
    wireWorkspaceRepo({ behind: 1 })
    onExec('git', 'rev-parse HEAD', () => head)
    onExec('git', 'fetch origin', () => 'fetched')
    onExec('git', 'merge --ff-only', () => {
      head = 'bbbb'
      return 'merged'
    })
    onExec('git', 'diff --name-only', () => 'docs/readme.md\nLICENSE')
    onExec('git', 'log', () => 'docs (bbbb)')
    const installFn = vi.fn(() => 'installed')
    const buildFn = vi.fn(() => 'built')
    onExec('pnpm', 'install', installFn)
    onExec('pnpm', 'build', buildFn)

    const result = applyWorkspaceUpdate()
    expect(result.ok).toBe(true)
    expect(installFn).not.toHaveBeenCalled()
    expect(buildFn).not.toHaveBeenCalled()
  })

  it('reports an error when the remote ref cannot be verified after fetch', () => {
    // canUpdate must be true initially, but the ref check inside apply fails.
    let verifyCalls = 0
    wireWorkspaceRepo({ behind: 2 })
    onExec('git', 'fetch origin', () => 'fetched')
    // First verify (during the initial status read) succeeds; the apply-time
    // verify fails.
    onExec('git', 'rev-parse --verify', () => {
      verifyCalls += 1
      if (verifyCalls === 1) return 'bbbb'
      throw new ExecFailure('ref gone')
    })

    const result = applyWorkspaceUpdate()
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/could not be verified/)
    expect(result.restartRequired).toBe(false)
  })
})

// ── applyAgentUpdate ──────────────────────────────────────────────────────────

describe('applyAgentUpdate', () => {
  it('refuses when the agent update is not available', () => {
    wireAgentRepo({ currentHead: 'z', remoteHead: 'z', behind: 0 })

    const result = applyAgentUpdate()
    expect(result.ok).toBe(false)
    expect(result.product).toBe('agent')
    expect(result.error).toBeTruthy()
  })

  it('fast-forwards and persists agent release notes', () => {
    let head = 'cccc'
    wireAgentRepo({ behind: 1, currentHead: 'cccc', remoteHead: 'dddd' })
    onExec('git', 'rev-parse HEAD', () => head)
    onExec('git', 'fetch origin', () => 'fetched')
    onExec('git', 'merge --ff-only', () => {
      head = 'dddd'
      return 'Updating cccc..dddd'
    })
    onExec('git', 'log', () => 'agent fix (dddd)')

    const result = applyAgentUpdate()
    expect(result.ok).toBe(true)
    expect(result.product).toBe('agent')
    expect(result.restartRequired).toBe(true)
    expect(result.output).toContain('Updating cccc..dddd')
    expect(result.releaseNotes[0]?.from).toBe('cccc')
    expect(result.releaseNotes[0]?.to).toBe('dddd')
    expect(result.releaseNotes[0]?.commits).toEqual(['agent fix (dddd)'])
    const cachePath = `${CWD}/.runtime/pending-update-release-notes.json`
    expect(fsState.writes.has(cachePath)).toBe(true)
  })

  it('reports an error when the ref cannot be verified after fetch', () => {
    let verifyCalls = 0
    wireAgentRepo({ behind: 2 })
    onExec('git', 'fetch origin', () => 'fetched')
    onExec('git', 'rev-parse --verify', () => {
      verifyCalls += 1
      if (verifyCalls === 1) return 'dddd'
      throw new ExecFailure('ref gone')
    })

    const result = applyAgentUpdate()
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/could not be verified/)
  })

  it('produces empty commits when from equals to (no head movement)', () => {
    // Update is available (behind), but the sync does not move HEAD (degenerate
    // but exercises the from===to branch in readCommits).
    let head = 'cccc'
    wireAgentRepo({ behind: 1, currentHead: 'cccc', remoteHead: 'dddd' })
    onExec('git', 'rev-parse HEAD', () => head)
    onExec('git', 'fetch origin', () => 'fetched')
    onExec('git', 'merge --ff-only', () => {
      head = 'cccc' // unchanged
      return 'Already up to date.'
    })

    const result = applyAgentUpdate()
    expect(result.ok).toBe(true)
    expect(result.restartRequired).toBe(false)
    expect(result.releaseNotes[0]?.commits).toEqual([])
  })
})
