import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'

/**
 * /kanban — embeds the Hermes Agent dashboard's kanban board via the
 * same-origin proxy at /api/dashboard-proxy/kanban-board. The dashboard token
 * is injected server-side by the proxy and never reaches the browser.
 */
export const Route = createFileRoute('/kanban')({
  ssr: false,
  component: function KanbanRoute() {
    usePageTitle('Tasks Board')
    return (
      <div className="flex h-full min-h-0 w-full flex-1 flex-col bg-primary-950">
        <div className="px-4 py-2 border-b border-primary-800">
          <h1 className="text-sm font-semibold text-primary-100">
            Tasks Board (proxied from built-in Hermes kanban)
          </h1>
        </div>
        <iframe
          src="/api/dashboard-proxy/kanban-board"
          title="Tasks Board"
          aria-label="Durable task board (built-in Hermes kanban)"
          className="h-full w-full flex-1 border-0"
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          // sandbox tightened; allow scripts (the dashboard SPA needs JS) and
          // same-origin (proxy makes it same-origin), but block popups/top.
          sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups"
        />
      </div>
    )
  },
})
