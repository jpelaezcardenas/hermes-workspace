import { useMemo, useState } from 'react'
import { McpServerCard } from './components/mcp-server-card'
import { McpServerDialog } from './components/mcp-server-dialog'
import { useMcpServers } from './hooks/use-mcp-servers'
import { MCP_PRESETS } from './presets'
import type { McpClientInput, McpServer } from '@/types/mcp'

type Tab = 'installed' | 'catalog' | 'all'

export function McpScreen() {
  const [tab, setTab] = useState<Tab>('installed')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<McpServer | McpClientInput | null>(null)

  const query = useMcpServers({ tab, category, search })
  const servers = query.data?.servers ?? []
  const categories = query.data?.categories ?? ['All']

  const presetCards = useMemo(() => {
    if (tab !== 'catalog') return null
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {MCP_PRESETS.map((preset) => (
          <div key={preset.id} className="rounded-xl border border-primary-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-primary-900">{preset.name}</h3>
                <p className="mt-1 text-xs text-primary-500">{preset.description}</p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded border border-primary-300 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-50"
                onClick={() => {
                  setEditing(preset.template)
                  setDialogOpen(true)
                }}
              >
                Install
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }, [tab])

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-primary-900">MCP Servers</h1>
          <p className="text-sm text-primary-500">
            Manage Model Context Protocol servers exposed to Hermes Agent.
          </p>
        </div>
        <button
          type="button"
          className="rounded bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
          onClick={() => {
            setEditing(null)
            setDialogOpen(true)
          }}
        >
          Add Server
        </button>
      </header>
      <nav className="flex gap-2 border-b border-primary-200 text-sm">
        {(['installed', 'catalog', 'all'] as Array<Tab>).map((t) => (
          <button
            key={t}
            type="button"
            className={`border-b-2 px-3 py-2 capitalize ${
              tab === t
                ? 'border-primary-600 font-medium text-primary-900'
                : 'border-transparent text-primary-500 hover:text-primary-700'
            }`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>
      {tab !== 'catalog' ? (
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            placeholder="Search servers…"
            className="flex-1 rounded border border-primary-300 px-3 py-1.5 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="rounded border border-primary-300 px-3 py-1.5 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="flex-1 overflow-y-auto">
        {tab === 'catalog' ? (
          presetCards
        ) : query.isLoading ? (
          <p className="text-sm text-primary-500">Loading…</p>
        ) : query.isError ? (
          <p className="text-sm text-red-600">{(query.error).message}</p>
        ) : servers.length === 0 ? (
          <p className="text-sm text-primary-500">No MCP servers configured.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {servers.map((server) => (
              <McpServerCard
                key={server.id}
                server={server}
                onEdit={(s) => {
                  setEditing(s)
                  setDialogOpen(true)
                }}
              />
            ))}
          </div>
        )}
      </div>
      <McpServerDialog
        open={dialogOpen}
        initial={editing}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  )
}
