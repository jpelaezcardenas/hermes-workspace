import { createFileRoute } from '@tanstack/react-router'
import { requireLocalOrAuth } from '../../server/auth-middleware'
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
  requireJsonContentType,
} from '../../server/rate-limit'

type SuggestedCommand = {
  command: string
  description: string
}

type DebugAnalysis = {
  summary: string
  rootCause: string
  suggestedCommands: Array<SuggestedCommand>
  docsLink?: string
}

const COMMAND_LIMIT = 5
const MAX_OUTPUT_CHARS = 12_000

function has(text: string, pattern: RegExp): boolean {
  return pattern.test(text)
}

function clip(text: string): string {
  return text.length > MAX_OUTPUT_CHARS
    ? text.slice(text.length - MAX_OUTPUT_CHARS)
    : text
}

function buildAnalysis(rawOutput: string): DebugAnalysis {
  const output = clip(rawOutput)
  const lower = output.toLowerCase()
  const suggestedCommands: Array<SuggestedCommand> = []

  let summary = 'No known failure pattern was detected in the recent terminal output.'
  let rootCause =
    'The terminal is reachable, but the captured output does not include enough signal for a specific diagnosis. Run the failing command again, then click Debug.'
  const docsLink = '/docs/troubleshooting.md'

  if (has(lower, /command not found:?\s+hermes|hermes:\s+command not found/)) {
    summary = 'Hermes CLI is not available in this shell.'
    rootCause =
      'The PTY started successfully, but PATH does not include the Hermes executable for the active user/session.'
    suggestedCommands.push(
      {
        command: 'which hermes',
        description: 'Confirm whether the shell can resolve the Hermes CLI.',
      },
      {
        command: 'python3 -m pip show hermes-agent',
        description: 'Check whether hermes-agent is installed for Python.',
      },
    )
  } else if (has(lower, /unauthorized|401|api_server_key|invalid api key/)) {
    summary = 'Hermes API authentication failed.'
    rootCause =
      'The workspace terminal likely started without the gateway token expected by the Hermes backend.'
    suggestedCommands.push(
      {
        command:
          'python3 - <<\'PY\'\nimport os\nprint("HERMES_API_TOKEN configured:", bool(os.getenv("HERMES_API_TOKEN")))\nprint("API_SERVER_KEY configured:", bool(os.getenv("API_SERVER_KEY")))\nPY',
        description:
          'Check token presence without printing secret values.',
      },
      {
        command: 'curl -sS http://127.0.0.1:8645/health',
        description: 'Verify whether the local Hermes gateway is reachable.',
      },
    )
  } else if (has(lower, /connection refused|econnrefused|failed to connect/)) {
    summary = 'The target backend is not accepting connections.'
    rootCause =
      'The command reached the network layer, but no service is listening at the requested host/port.'
    suggestedCommands.push(
      {
        command: 'curl -sS http://127.0.0.1:8645/health',
        description: 'Probe the default Hermes gateway health endpoint.',
      },
      {
        command: 'lsof -nP -iTCP -sTCP:LISTEN | grep -E "8645|8642|9119|3000"',
        description:
          'List local listeners for Hermes gateway, dashboard, and workspace ports.',
      },
    )
  } else if (has(lower, /unknown model|model.*unknown|no model|model not found/)) {
    summary = 'The active model could not be resolved by the backend.'
    rootCause =
      'Hermes is reachable, but the configured provider/model pair is missing, misspelled, or not available to the configured credentials.'
    suggestedCommands.push(
      {
        command: 'hermes models list',
        description:
          'Ask Hermes which models are available in the active provider context.',
      },
      {
        command:
          'python3 - <<\'PY\'\nimport os\nprint("GOOGLE_API_KEY configured:", bool(os.getenv("GOOGLE_API_KEY")))\nprint("OPENAI_API_KEY configured:", bool(os.getenv("OPENAI_API_KEY")))\nPY',
        description:
          'Verify provider credential presence without exposing values.',
      },
    )
  } else if (has(lower, /permission denied|eacces|operation not permitted/)) {
    summary = 'The command failed because of filesystem or process permissions.'
    rootCause =
      'The active user does not have permission for the requested path, socket, or executable.'
    suggestedCommands.push(
      {
        command: 'pwd && whoami && ls -la',
        description:
          'Confirm current directory ownership and active terminal user.',
      },
    )
  } else if (output.trim().length > 0) {
    summary = 'Terminal output captured successfully.'
    rootCause =
      'No built-in rule matched the captured output. Use the safe inspection commands below to gather more context.'
    suggestedCommands.push(
      {
        command: 'pwd && whoami && date',
        description:
          'Confirm the terminal working directory, user, and wall-clock context.',
      },
      {
        command: 'curl -sS http://127.0.0.1:8645/health || true',
        description:
          'Check the default Hermes gateway without mutating state.',
      },
    )
  }

  if (suggestedCommands.length === 0) {
    suggestedCommands.push({
      command: 'pwd && whoami && env | grep -E "^(HERMES_|API_SERVER_|GOOGLE_|OPENAI_)" | sed "s/=.*$/=<configured>/"',
      description:
        'List relevant environment variable names without printing secret values.',
    })
  }

  return {
    summary,
    rootCause,
    suggestedCommands: suggestedCommands.slice(0, COMMAND_LIMIT),
    docsLink,
  }
}

export const Route = createFileRoute('/api/debug-analyze')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck

        const ip = getClientIp(request)
        if (!rateLimit(`debug-analyze:${ip}`, 30, 60_000)) {
          return rateLimitResponse()
        }

        const body = (await request.json().catch(() => ({}))) as Record<
          string,
          unknown
        >
        const terminalOutput =
          typeof body.terminalOutput === 'string' ? body.terminalOutput : ''

        return Response.json(buildAnalysis(terminalOutput))
      },
    },
  },
})
