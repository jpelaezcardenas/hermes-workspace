/**
 * Workspace Config Read API — `/api/config-get`
 *
 * Lightweight wrapper around ~/.hermes/config.yaml + workspace overrides so
 * the Studio Settings screens (providers-screen.tsx and friends) can read
 * the same config that `/api/config-patch` writes.
 *
 * Response shape (consumed by ConfigQueryResponse in providers-screen.tsx):
 *   { ok: true, payload: <merged config object> }
 *   { ok: false, error: string }                  // on error
 *
 * Auth: same `isAuthenticated` guard used by other workspace routes.
 *
 * Phase 3D Lane A.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import YAML from 'yaml'
import { isAuthenticated } from '../../server/auth-middleware'
import { safeErrorMessage } from '../../server/rate-limit'

const HERMES_HOME =
  process.env.HERMES_HOME ??
  process.env.CLAUDE_HOME ??
  path.join(os.homedir(), '.hermes')
const CONFIG_PATH = path.join(HERMES_HOME, 'config.yaml')
const OVERRIDES_PATH = path.join(HERMES_HOME, 'workspace-overrides.json')

function readYamlConfig(): Record<string, unknown> {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8')
    const parsed = YAML.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {}
  } catch {
    return {}
  }
}

function readWorkspaceOverrides(): Record<string, unknown> {
  try {
    const raw = fs.readFileSync(OVERRIDES_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {}
  } catch {
    return {}
  }
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(
        target[key] as Record<string, unknown>,
        value as Record<string, unknown>,
      )
    } else {
      target[key] = value
    }
  }
  return target
}

export const Route = createFileRoute('/api/config-get')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ ok: false, error: 'Unauthorized' }, { status: 401 })
        }
        try {
          const merged = deepMerge(readYamlConfig(), readWorkspaceOverrides())
          return json({ ok: true, payload: merged })
        } catch (error) {
          return json(
            { ok: false, error: safeErrorMessage(error) },
            { status: 500 },
          )
        }
      },
    },
  },
})
