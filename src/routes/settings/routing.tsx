import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { usePageTitle } from '@/hooks/use-page-title'

type RouteRule = {
  match?: { surface?: string }
  primary?: { model?: string; provider?: string; effort?: string }
  fallbacks?: Array<{ model?: string; provider?: string }>
}

type RoutingPayload = {
  ok?: boolean
  payload?: {
    config?: {
      model?: { default?: string; provider?: string; base_url?: string }
      fallback_providers?: Array<{ provider?: string }>
      smart_model_routing?: { enabled?: boolean; rules?: RouteRule[] }
      auxiliary?: Record<string, { provider?: string; model?: string; timeout?: number }>
    }
  }
}

function RoutingScreen() {
  const [data, setData] = useState<RoutingPayload['payload'] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch('/api/config-get', { credentials: 'same-origin' })
      .then(async (r) => {
        if (!r.ok) throw new Error(`config-get returned ${r.status}`)
        return r.json() as Promise<RoutingPayload>
      })
      .then((j) => {
        if (cancelled) return
        setData(j.payload ?? null)
        setLoading(false)
      })
      .catch((e) => {
        if (cancelled) return
        setError(String(e))
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <div style={{ padding: 24 }}>Loading routing config…</div>
  if (error)
    return (
      <div style={{ padding: 24, color: '#c53030' }}>
        Failed to load routing config: {error}
      </div>
    )

  const cfg = data?.config ?? {}
  const model = cfg.model ?? {}
  const fallbacks = cfg.fallback_providers ?? []
  const smartRouting = cfg.smart_model_routing ?? {}
  const rules: RouteRule[] = smartRouting.rules ?? []
  const auxiliary = cfg.auxiliary ?? {}

  return (
    <div style={{ padding: 24, maxWidth: 1100 }}>
      <h1 style={{ marginBottom: 8 }}>Model Routing</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Read-only view of the active model routing configuration. Use{' '}
        <a href="/settings/gateway" style={{ color: '#3182ce' }}>
          Settings → Gateway → Models &amp; Routing
        </a>{' '}
        to edit the JSON rules and fallback chain.
      </p>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Primary model</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8, width: 180, color: '#555' }}>Default</td>
              <td style={{ padding: 8 }}>
                <code>{model.default ?? '(unset)'}</code>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 8, color: '#555' }}>Provider</td>
              <td style={{ padding: 8 }}>
                <code>{model.provider ?? '(unset)'}</code>
              </td>
            </tr>
            <tr>
              <td style={{ padding: 8, color: '#555' }}>Base URL</td>
              <td style={{ padding: 8 }}>
                <code>{model.base_url || '(provider default)'}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          Fallback providers ({fallbacks.length})
        </h2>
        {fallbacks.length === 0 ? (
          <p style={{ color: '#888' }}>None configured.</p>
        ) : (
          <ol style={{ paddingLeft: 24 }}>
            {fallbacks.map((f, i) => (
              <li key={i} style={{ padding: '4px 0' }}>
                <code>{f.provider}</code>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          Smart routing rules ({rules.length}){' '}
          <span style={{ fontSize: 12, color: '#666', fontWeight: 'normal' }}>
            {smartRouting.enabled === false ? 'DISABLED' : 'enabled'}
          </span>
        </h2>
        {rules.length === 0 ? (
          <p style={{ color: '#888' }}>No rules configured.</p>
        ) : (
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f7fafc', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: 8, textAlign: 'left' }}>Surface</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Primary</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Effort</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Fallbacks</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 8, fontWeight: 500 }}>
                    {r.match?.surface ?? '(any)'}
                  </td>
                  <td style={{ padding: 8 }}>
                    <code>
                      {r.primary?.model}
                      <br />
                      <span style={{ color: '#888' }}>@ {r.primary?.provider}</span>
                    </code>
                  </td>
                  <td style={{ padding: 8 }}>{r.primary?.effort ?? '—'}</td>
                  <td style={{ padding: 8 }}>
                    {(r.fallbacks ?? []).map((f, j) => (
                      <div key={j} style={{ fontSize: 12, color: '#444' }}>
                        <code>
                          {f.model} <span style={{ color: '#888' }}>@ {f.provider}</span>
                        </code>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          Auxiliary surfaces ({Object.keys(auxiliary).length})
        </h2>
        {Object.keys(auxiliary).length === 0 ? (
          <p style={{ color: '#888' }}>None configured.</p>
        ) : (
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f7fafc', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: 8, textAlign: 'left' }}>Surface</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Provider</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Model</th>
                <th style={{ padding: 8, textAlign: 'left' }}>Timeout</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(auxiliary)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([surface, vals]) => (
                  <tr key={surface} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: 8, fontWeight: 500 }}>{surface}</td>
                    <td style={{ padding: 8 }}>
                      <code>{vals.provider ?? '—'}</code>
                    </td>
                    <td style={{ padding: 8 }}>
                      <code>{vals.model || '(unset)'}</code>
                    </td>
                    <td style={{ padding: 8 }}>{vals.timeout ?? '—'}s</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export const Route = createFileRoute('/settings/routing')({
  ssr: false,
  component: function SettingsRoutingRoute() {
    usePageTitle('Routing')
    return <RoutingScreen />
  },
})
