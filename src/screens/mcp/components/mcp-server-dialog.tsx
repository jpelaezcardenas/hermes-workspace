import { useEffect, useState } from 'react'
import {
  useDiscoverMcpTools,
  useUpsertMcpServer,
} from '../hooks/use-mcp-mutations'
import type { McpClientInput, McpServer } from '@/types/mcp'

interface Props {
  open: boolean
  initial?: McpServer | McpClientInput | null
  onClose: () => void
}

const EMPTY: McpClientInput = {
  name: '',
  transportType: 'http',
  url: '',
  args: [],
  env: {},
  headers: {},
  authType: 'none',
  toolMode: 'all',
}

function fromServer(server: McpServer): McpClientInput {
  return {
    name: server.name,
    transportType: server.transportType,
    url: server.url,
    command: server.command,
    args: server.args,
    // Drop masked secrets — caller must re-enter to update.
    env: {},
    headers: {},
    authType: server.authType,
    toolMode: server.toolMode,
    includeTools: server.includeTools,
    excludeTools: server.excludeTools,
  }
}

function isMcpServer(value: unknown): value is McpServer {
  return Boolean(value && typeof value === 'object' && 'discoveredToolsCount' in (value))
}

export function McpServerDialog({ open, initial, onClose }: Props) {
  const upsert = useUpsertMcpServer()
  const discover = useDiscoverMcpTools()
  const [draft, setDraft] = useState<McpClientInput>(EMPTY)

  useEffect(() => {
    if (!open) return
    if (!initial) {
      setDraft(EMPTY)
    } else if (isMcpServer(initial)) {
      setDraft(fromServer(initial))
    } else {
      setDraft(initial)
    }
  }, [open, initial])

  if (!open) return null

  const update = (patch: Partial<McpClientInput>) =>
    setDraft((prev) => ({ ...prev, ...patch }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-primary-900">
          {initial ? 'Edit MCP Server' : 'Add MCP Server'}
        </h2>
        <div className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="text-primary-700">Name</span>
            <input
              className="mt-1 w-full rounded border border-primary-300 px-2 py-1"
              value={draft.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </label>
          <label className="block text-sm">
            <span className="text-primary-700">Transport</span>
            <select
              className="mt-1 w-full rounded border border-primary-300 px-2 py-1"
              value={draft.transportType}
              onChange={(e) => update({ transportType: e.target.value as 'http' | 'stdio' })}
            >
              <option value="http">HTTP</option>
              <option value="stdio">stdio</option>
            </select>
          </label>
          {draft.transportType === 'http' ? (
            <label className="block text-sm">
              <span className="text-primary-700">URL</span>
              <input
                className="mt-1 w-full rounded border border-primary-300 px-2 py-1"
                value={draft.url || ''}
                onChange={(e) => update({ url: e.target.value })}
              />
            </label>
          ) : (
            <>
              <label className="block text-sm">
                <span className="text-primary-700">Command</span>
                <input
                  className="mt-1 w-full rounded border border-primary-300 px-2 py-1"
                  value={draft.command || ''}
                  onChange={(e) => update({ command: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                <span className="text-primary-700">Args (one per line)</span>
                <textarea
                  className="mt-1 w-full rounded border border-primary-300 px-2 py-1 font-mono text-xs"
                  rows={3}
                  value={(draft.args || []).join('\n')}
                  onChange={(e) =>
                    update({ args: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })
                  }
                />
              </label>
            </>
          )}
          <label className="block text-sm">
            <span className="text-primary-700">Auth</span>
            <select
              className="mt-1 w-full rounded border border-primary-300 px-2 py-1"
              value={draft.authType || 'none'}
              onChange={(e) =>
                update({ authType: e.target.value as 'none' | 'bearer' | 'oauth' })
              }
            >
              <option value="none">none</option>
              <option value="bearer">bearer</option>
              <option value="oauth">oauth</option>
            </select>
          </label>
          {draft.authType === 'bearer' ? (
            <label className="block text-sm">
              <span className="text-primary-700">Bearer token</span>
              <input
                type="password"
                className="mt-1 w-full rounded border border-primary-300 px-2 py-1"
                value={draft.bearerToken || ''}
                onChange={(e) => update({ bearerToken: e.target.value })}
                autoComplete="off"
              />
            </label>
          ) : null}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            className="rounded px-4 py-2 text-sm text-primary-600 hover:bg-primary-50"
            onClick={onClose}
            disabled={upsert.isPending}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded border border-primary-300 px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
            disabled={discover.isPending || !draft.name}
            onClick={() => discover.mutate(draft)}
          >
            {discover.isPending ? 'Discovering…' : 'Discover'}
          </button>
          <button
            type="button"
            className="rounded bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
            disabled={upsert.isPending || !draft.name}
            onClick={async () => {
              await upsert.mutateAsync(draft)
              // Wipe secrets from in-memory state on submit.
              setDraft((prev) => ({ ...prev, bearerToken: '' }))
              onClose()
            }}
          >
            {upsert.isPending ? 'Saving…' : 'Save'}
          </button>
        </div>
        {discover.data ? (
          <p className="mt-3 text-xs text-primary-600">
            Discovered {discover.data.tools.length} tools.
          </p>
        ) : null}
        {upsert.error ? (
          <p className="mt-2 text-xs text-red-600">{upsert.error.message}</p>
        ) : null}
      </div>
    </div>
  )
}
