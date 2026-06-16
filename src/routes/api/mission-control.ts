import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import { requireJsonContentType } from '../../server/rate-limit'

type MissionAction =
  | 'health-check'
  | 'local-context'
  | 'daily-briefing'
  | 'ask-hermes'
  | 'send-note'

type MissionRequest = {
  action?: unknown
  prompt?: unknown
}

type CommandResult = {
  ok: boolean
  action: MissionAction
  title: string
  output: string
  stderr?: string
  durationMs: number
  ranAt: string
}

const MAX_OUTPUT_CHARS = 80_000
const MAX_PROMPT_CHARS = 4_000
const HERMES_BIN_CANDIDATES = [
  join(homedir(), '.local', 'bin', 'hermes'),
  join(homedir(), '.hermes', 'hermes-agent', 'venv', 'bin', 'hermes'),
  'hermes',
]
const HEALTH_SCRIPT = resolve(process.cwd(), 'scripts', 'mission-control-health.sh')
const LOCAL_RAG_PULSE_SCRIPT = resolve(process.cwd(), 'scripts', 'mission-control-local-rag-pulse.sh')

function resolveBin(candidates: Array<string>): string {
  for (const candidate of candidates) {
    if (candidate.includes('/')) {
      if (existsSync(candidate)) return candidate
    } else {
      return candidate
    }
  }
  return candidates.at(-1) ?? 'true'
}

function trimPrompt(prompt: unknown): string {
  if (typeof prompt !== 'string') return ''
  return prompt.trim().slice(0, MAX_PROMPT_CHARS)
}

function normalizeAction(action: unknown): MissionAction | null {
  if (
    action === 'health-check' ||
    action === 'local-context' ||
    action === 'daily-briefing' ||
    action === 'ask-hermes' ||
    action === 'send-note'
  ) {
    return action
  }
  return null
}

function execFileAsync(
  cmd: string,
  args: Array<string>,
  timeoutMs: number,
): Promise<{ ok: true; stdout: string; stderr: string } | { ok: false; stdout: string; stderr: string; error: string }> {
  return new Promise((resolvePromise) => {
    execFile(
      cmd,
      args,
      {
        timeout: timeoutMs,
        maxBuffer: MAX_OUTPUT_CHARS,
        cwd: process.env.HOME || homedir(),
        env: {
          ...process.env,
          PATH: `${join(homedir(), '.local', 'bin')}:/usr/local/bin:/usr/bin:/bin:${process.env.PATH || ''}`,
        },
      },
      (error, stdout, stderr) => {
        const stdoutText = (stdout || '').toString()
        const stderrText = (stderr || '').toString()
        if (error) {
          resolvePromise({
            ok: false,
            stdout: stdoutText,
            stderr: stderrText,
            error: stderrText.trim() || error.message,
          })
          return
        }
        resolvePromise({ ok: true, stdout: stdoutText, stderr: stderrText })
      },
    )
  })
}

function actionConfig(action: MissionAction, prompt: string): {
  title: string
  cmd: string
  args: Array<string>
  timeoutMs: number
} {
  const hermes = resolveBin(HERMES_BIN_CANDIDATES)

  if (action === 'health-check') {
    return {
      title: 'Health check',
      cmd: 'bash',
      args: [HEALTH_SCRIPT],
      timeoutMs: 20_000,
    }
  }

  if (action === 'local-context') {
    return {
      title: 'local-rag pulse',
      cmd: 'bash',
      args: [LOCAL_RAG_PULSE_SCRIPT, prompt || 'Hermes homelab current services workspace gateway dashboard'],
      timeoutMs: 45_000,
    }
  }

  if (action === 'daily-briefing') {
    return {
      title: 'Daily briefing',
      cmd: hermes,
      args: [
        'chat',
        '-Q',
        '--toolsets',
        'terminal',
        '-q',
        'Create a concise Homelab Mission Control daily briefing for Mike. First run local-rag query "Hermes homelab workspace gateway dashboard current state" --collection llmwiki -k 3, then summarize useful status, risks, and suggested next actions. Do not make changes. Keep it under 12 bullets.',
      ],
      timeoutMs: 180_000,
    }
  }

  if (action === 'send-note') {
    return {
      title: 'Send Mike a note',
      cmd: hermes,
      args: [
        'chat',
        '-Q',
        '--toolsets',
        'messaging',
        '-q',
        `Send this exact note to the configured Discord home channel, then report whether it was sent. Note: ${prompt}`,
      ],
      timeoutMs: 120_000,
    }
  }

  return {
    title: 'Ask Hermes',
    cmd: hermes,
    args: [
      'chat',
      '-Q',
      '-q',
      `You are running from Hermes Workspace Mission Control. For local/homelab/project questions, run local-rag first. Answer or perform this request safely and concisely: ${prompt}`,
    ],
    timeoutMs: 180_000,
  }
}

export const Route = createFileRoute('/api/mission-control')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        return Response.json({
          ok: true,
          actions: ['health-check', 'local-context', 'daily-briefing', 'ask-hermes', 'send-note'],
          healthScript: HEALTH_SCRIPT,
          localRagPulseScript: LOCAL_RAG_PULSE_SCRIPT,
          maxPromptChars: MAX_PROMPT_CHARS,
        })
      },
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        let body: MissionRequest
        try {
          body = (await request.json()) as MissionRequest
        } catch {
          return json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
        }

        const action = normalizeAction(body.action)
        if (!action) {
          return json({ ok: false, error: 'Unknown action' }, { status: 400 })
        }

        const prompt = trimPrompt(body.prompt)
        if ((action === 'ask-hermes' || action === 'send-note') && !prompt) {
          return json({ ok: false, error: 'Prompt required for this action' }, { status: 400 })
        }

        const started = Date.now()
        const config = actionConfig(action, prompt)
        const result = await execFileAsync(config.cmd, config.args, config.timeoutMs)
        const durationMs = Date.now() - started
        let output: string
        if (result.ok) {
          output = result.stdout.trim() || '(command completed with no output)'
        } else {
          const stdout = result.stdout.trim()
          output = `${stdout}${stdout ? '\n\n' : ''}ERROR: ${(result as { error: string }).error}`
        }

        const response: CommandResult = {
          ok: result.ok,
          action,
          title: config.title,
          output: output.slice(0, MAX_OUTPUT_CHARS),
          stderr: result.stderr?.trim() || undefined,
          durationMs,
          ranAt: new Date(started).toISOString(),
        }

        return Response.json(response, { status: result.ok ? 200 : 500 })
      },
    },
  },
})
