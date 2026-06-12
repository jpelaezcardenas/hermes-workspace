import { execFileSync } from 'node:child_process'
import * as path from 'node:path'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'

const REPO_ROOT = path.resolve(process.env.HERMES_WORKSPACE_REPO || process.cwd())

function git(args: Array<string>): string {
  return execFileSync('git', args, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    timeout: 2500,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()
}

function safeGit(args: Array<string>): string | null {
  try {
    return git(args)
  } catch {
    return null
  }
}

function parseAheadBehind(): { ahead: number; behind: number } {
  const upstream = safeGit(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}'])
  if (!upstream) return { ahead: 0, behind: 0 }
  const counts = safeGit(['rev-list', '--left-right', '--count', `HEAD...${upstream}`])
  if (!counts) return { ahead: 0, behind: 0 }
  const [aheadRaw, behindRaw] = counts.split(/\s+/)
  return {
    ahead: Number(aheadRaw) || 0,
    behind: Number(behindRaw) || 0,
  }
}

export const Route = createFileRoute('/api/git-status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          const sha = git(['rev-parse', 'HEAD'])
          const branch = safeGit(['branch', '--show-current']) || 'detached'
          const remote = safeGit(['config', '--get', `branch.${branch}.remote`])
          const status = safeGit(['status', '--porcelain']) ?? ''
          const { ahead, behind } = parseAheadBehind()

          return Response.json({
            ok: true,
            repo: REPO_ROOT,
            branch,
            shortSha: sha.slice(0, 8),
            sha,
            subject: git(['log', '-1', '--pretty=%s']),
            author: git(['log', '-1', '--pretty=%an']),
            committedAt: git(['log', '-1', '--pretty=%cI']),
            relativeCommitTime: git(['log', '-1', '--pretty=%cr']),
            dirty: status.length > 0,
            ahead,
            behind,
            remote,
            checkedAt: Date.now(),
          })
        } catch (error) {
          return Response.json(
            {
              ok: false,
              repo: REPO_ROOT,
              branch: 'unknown',
              shortSha: '',
              sha: '',
              subject: '',
              author: '',
              committedAt: '',
              relativeCommitTime: '',
              dirty: false,
              ahead: 0,
              behind: 0,
              remote: null,
              checkedAt: Date.now(),
              error: error instanceof Error ? error.message : String(error),
            },
            { status: 200 },
          )
        }
      },
    },
  },
})
