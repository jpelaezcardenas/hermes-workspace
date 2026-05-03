/**
 * POST /api/system/restart/:label — Wave 2 Lane B (F25)
 *
 * Implements actual restart for the 3 known launchd services:
 *   - ai.hermes.gateway   → spawn `hermes gateway restart` via execFile
 *   - ai.hermes.workspace → would kill our own process; returns 423 Locked
 *   - ai.hermes.dashboard → launchctl kickstart -k gui/<uid>/ai.hermes.dashboard
 *
 * Auth: requireLocalOrAuth() (cookie auth OR private/loopback IP).
 * Always uses execFile (no shell) and validates the label against an allowlist.
 *
 * Response shape:
 *   { ok, label, action_taken, stdout?, stderr?, error? }
 */
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { execFile } from 'node:child_process'
import { requireLocalOrAuth } from '../../../../server/auth-middleware'

const ALLOWED_LABELS = new Set([
  'ai.hermes.gateway',
  'ai.hermes.workspace',
  'ai.hermes.dashboard',
])

const EXEC_TIMEOUT_MS = 30_000

type ExecResult = { stdout: string; stderr: string; code: number }

function execAsync(
  cmd: string,
  args: ReadonlyArray<string>,
  timeoutMs: number,
): Promise<ExecResult> {
  return new Promise((resolve) => {
    execFile(
      cmd,
      args as string[],
      { timeout: timeoutMs, maxBuffer: 1024 * 1024 },
      (err, stdout, stderr) => {
        if (err) {
          // execFile sets `code` on the error object for non-zero exits
          const code =
            (err as NodeJS.ErrnoException & { code?: number | string }).code
          resolve({
            stdout: String(stdout || ''),
            stderr:
              String(stderr || '') +
              (err.message ? `\n[exec-error] ${err.message}` : ''),
            code: typeof code === 'number' ? code : 1,
          })
          return
        }
        resolve({
          stdout: String(stdout || ''),
          stderr: String(stderr || ''),
          code: 0,
        })
      },
    )
  })
}

export const Route = createFileRoute('/api/system/restart/$label')({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        if (!requireLocalOrAuth(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const label = params.label
        if (!ALLOWED_LABELS.has(label)) {
          return json(
            {
              ok: false,
              label,
              error: `Unknown label. Allowed: ${[...ALLOWED_LABELS].join(', ')}`,
            },
            { status: 400 },
          )
        }

        // Refuse to suicide: workspace = current process.
        if (label === 'ai.hermes.workspace') {
          return json(
            {
              ok: false,
              label,
              action_taken: 'refused',
              error:
                'Refusing to restart ai.hermes.workspace — that would kill the current process. Restart it from the macOS menu bar agent or via `launchctl kickstart -k gui/<uid>/ai.hermes.workspace` from a separate terminal.',
            },
            { status: 423 },
          )
        }

        if (label === 'ai.hermes.gateway') {
          const result = await execAsync(
            'hermes',
            ['gateway', 'restart'],
            EXEC_TIMEOUT_MS,
          )
          const ok = result.code === 0
          return json(
            {
              ok,
              label,
              action_taken: 'hermes gateway restart',
              stdout: result.stdout,
              stderr: result.stderr,
              ...(ok ? {} : { error: `exit code ${result.code}` }),
            },
            { status: ok ? 200 : 500 },
          )
        }

        if (label === 'ai.hermes.dashboard') {
          const uid = String(process.getuid?.() ?? '')
          if (!uid) {
            return json(
              {
                ok: false,
                label,
                error: 'Could not determine uid for launchctl gui domain',
              },
              { status: 500 },
            )
          }
          const target = `gui/${uid}/${label}`
          const result = await execAsync(
            'launchctl',
            ['kickstart', '-k', target],
            EXEC_TIMEOUT_MS,
          )
          const ok = result.code === 0
          return json(
            {
              ok,
              label,
              action_taken: `launchctl kickstart -k ${target}`,
              stdout: result.stdout,
              stderr: result.stderr,
              ...(ok ? {} : { error: `exit code ${result.code}` }),
            },
            { status: ok ? 200 : 500 },
          )
        }

        // Unreachable — allowlist already filtered.
        return json(
          { ok: false, label, error: 'Unhandled label' },
          { status: 500 },
        )
      },
    },
  },
})
