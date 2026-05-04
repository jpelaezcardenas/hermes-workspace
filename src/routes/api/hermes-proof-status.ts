import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '../../server/auth-middleware'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

function todayChicago(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export const Route = createFileRoute('/api/hermes-proof-status')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
        }
        const url = new URL(request.url)
        const requestedDate = url.searchParams.get('date')
        if (requestedDate && !/^\d{4}-\d{2}-\d{2}$/.test(requestedDate)) {
          return new Response(JSON.stringify({ error: 'Invalid date' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }
        const root = process.env.MAJESTIC12_ROOT || '/Users/majestic12/ai-systems'
        const stateDir = join(root, 'state')
        let statePath = join(root, 'state', `hermes_jobs_proof_status_${requestedDate || todayChicago()}.json`)
        try {
          if (!requestedDate || !existsSync(statePath) || url.searchParams.get('refresh') === '1') {
            const args = [join(root, 'hermes-workspace', 'scripts', 'generate-hermes-proof-status.mjs')]
            if (requestedDate) args.push(`--date=${requestedDate}`)
            execFileSync('node', args, {
              cwd: join(root, 'hermes-workspace'),
              timeout: 30_000,
              stdio: ['ignore', 'pipe', 'pipe'],
            })
          }
          if (!requestedDate) {
            const latest = readdirSync(stateDir)
              .filter((name) => /^hermes_jobs_proof_status_\d{4}-\d{2}-\d{2}\.json$/.test(name))
              .sort()
              .at(-1)
            if (latest) statePath = join(stateDir, latest)
          }
          const body = readFileSync(statePath, 'utf8')
          return new Response(body, { headers: { 'Content-Type': 'application/json' } })
        } catch (error) {
          return new Response(
            JSON.stringify({
              error: 'Failed to generate Hermes proof status',
              detail: error instanceof Error ? error.message : String(error),
              statePath,
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
          )
        }
      },
    },
  },
})
