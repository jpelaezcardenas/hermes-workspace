import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { isAuthenticated } from '../../../server/auth-middleware'
import { setActiveProfile } from '../../../server/profiles-browser'
import { requireJsonContentType } from '../../../server/rate-limit'

const execFileAsync = promisify(execFile)

async function restartGatewayForProfileChange() {
  const uid = typeof process.getuid === 'function' ? process.getuid() : undefined
  await execFileAsync('systemctl', ['--user', 'restart', 'hermes-gateway.service'], {
    timeout: 30_000,
    env: {
      ...process.env,
      ...(uid !== undefined
        ? {
            XDG_RUNTIME_DIR: process.env.XDG_RUNTIME_DIR || `/run/user/${uid}`,
            DBUS_SESSION_BUS_ADDRESS:
              process.env.DBUS_SESSION_BUS_ADDRESS ||
              `unix:path=/run/user/${uid}/bus`,
          }
        : {}),
    },
  })
}

export const Route = createFileRoute('/api/profiles/activate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }
        const csrfCheck = requireJsonContentType(request)
        if (csrfCheck) return csrfCheck
        try {
          const body = (await request.json()) as { name?: string }
          setActiveProfile(body.name || '')
          await restartGatewayForProfileChange()
          return json({ ok: true })
        } catch (error) {
          return json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to activate profile',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
