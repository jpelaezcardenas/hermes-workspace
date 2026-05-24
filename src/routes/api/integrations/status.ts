import { createFileRoute } from '@tanstack/react-router'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { requireLocalOrAuth } from '../../../server/auth-middleware'

const execFileAsync = promisify(execFile)

type IntegrationCheck = {
  id: string
  label: string
  status: 'ready' | 'setup-needed' | 'warning' | 'unknown'
  detail: string
  safeMode: string
}

async function checkCommand(command: string, args: string[]): Promise<{ ok: boolean; output: string }> {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, { timeout: 5000, maxBuffer: 64_000 })
    return { ok: true, output: `${stdout}${stderr}`.trim() }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, output: message }
  }
}

async function googleWorkspaceStatus(): Promise<IntegrationCheck> {
  const gws = await checkCommand('/opt/homebrew/bin/gws', ['auth', 'status'])
  if (!gws.ok) {
    return {
      id: 'google-workspace',
      label: 'Google Workspace',
      status: 'setup-needed',
      detail: 'gws auth status is unavailable. OAuth needs repair before Gmail/Calendar/Contacts can be live.',
      safeMode: 'Mail, Calendar, and Google Contacts stay read-only/setup-needed until OAuth is repaired.',
    }
  }

  if (gws.output.includes('"token_valid": true') || gws.output.includes('token_valid: true')) {
    return {
      id: 'google-workspace',
      label: 'Google Workspace',
      status: 'ready',
      detail: 'Google Workspace token is valid.',
      safeMode: 'Reads are allowed; send/create/edit still require explicit approval.',
    }
  }

  const tokenError = gws.output.match(/"token_error"\s*:\s*"([^"]+)"/)?.[1]
  return {
    id: 'google-workspace',
    label: 'Google Workspace',
    status: 'setup-needed',
    detail: tokenError ? `OAuth needs repair: ${tokenError}` : 'OAuth needs repair before live Google data is available.',
    safeMode: 'Workspace will show setup-needed states instead of crashing or mutating anything.',
  }
}

async function twentyStatus(): Promise<IntegrationCheck> {
  try {
    const response = await fetch('http://127.0.0.1:3020', { signal: AbortSignal.timeout(2500) })
    return {
      id: 'twenty-legacy',
      label: 'Twenty Legacy',
      status: response.ok ? 'warning' : 'unknown',
      detail: `Legacy Twenty endpoint returned HTTP ${response.status}. Treat as migration-only source.`,
      safeMode: 'Export first; do not delete or disable without explicit approval.',
    }
  } catch (error) {
    return {
      id: 'twenty-legacy',
      label: 'Twenty Legacy',
      status: 'unknown',
      detail: error instanceof Error ? error.message : String(error),
      safeMode: 'If offline, keep decommission paused until export/backup state is verified.',
    }
  }
}

async function vaultStatus(): Promise<IntegrationCheck> {
  const bw = await checkCommand('/opt/homebrew/bin/bw', ['status'])
  if (!bw.ok) {
    return {
      id: 'vaultwarden',
      label: 'Vaultwarden',
      status: 'unknown',
      detail: 'Bitwarden CLI is unavailable from the Workspace server process.',
      safeMode: 'Secrets remain out of UI and receipts.',
    }
  }

  if (bw.output.includes('"status":"unlocked"')) {
    return {
      id: 'vaultwarden',
      label: 'Vaultwarden',
      status: 'ready',
      detail: 'Bitwarden CLI reports unlocked.',
      safeMode: 'Never display secret values in Workspace.',
    }
  }

  return {
    id: 'vaultwarden',
    label: 'Vaultwarden',
    status: 'setup-needed',
    detail: 'Bitwarden/Vaultwarden CLI is configured but locked.',
    safeMode: 'Unlock locally before syncing secrets; do not paste master password into chat.',
  }
}

export const Route = createFileRoute('/api/integrations/status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!requireLocalOrAuth(request)) {
          return Response.json({ ok: false, error: 'Authentication required' }, { status: 401 })
        }

        const integrations = await Promise.all([
          googleWorkspaceStatus(),
          twentyStatus(),
          vaultStatus(),
        ])

        return Response.json({
          ok: integrations.every((item) => item.status === 'ready' || item.status === 'warning'),
          generatedAt: new Date().toISOString(),
          integrations,
          policy: {
            reads: 'Allowed after provider auth is ready.',
            drafts: 'Allowed for email/calendar/contact suggestions.',
            mutations: 'Sending email, creating/deleting events, and editing/deleting contacts require explicit approval.',
            exposure: 'Tailscale-only. No public internet exposure.',
          },
        })
      },
    },
  },
})
