import type { DashboardOverview } from '@/server/dashboard-aggregator'
import {
  formatCount,
  formatIsoDate,
  formatMoney,
} from '@/screens/dashboard/lib/formatters'

type PatchAidFaireOrders = DashboardOverview['patchAidFaireOrders']

export function PatchAidFaireOrdersCard({
  data,
}: {
  data: PatchAidFaireOrders
}) {
  const summary = data?.summary ?? null
  const latestOrder = data?.orders[0] ?? null
  const hasOrders = !!summary && summary.orderCount > 0

  return (
    <section
      className="relative flex w-full flex-col gap-3 overflow-hidden rounded-xl border px-3 py-2.5"
      style={{
        background:
          'linear-gradient(150deg, color-mix(in srgb, var(--theme-card) 96%, transparent), color-mix(in srgb, var(--theme-card) 90%, transparent))',
        borderColor: 'var(--theme-border)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, var(--theme-success), color-mix(in srgb, var(--theme-success) 45%, transparent), transparent)',
        }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: 'var(--theme-text)' }}
          >
            PatchAid wholesale
          </h3>
          <p className="mt-1 text-[11px]" style={{ color: 'var(--theme-muted)' }}>
            Faire order emails from Corpus
          </p>
        </div>
        <span
          className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em]"
          style={{
            border: '1px solid var(--theme-border)',
            color: data?.warning ? 'var(--theme-warning)' : 'var(--theme-muted)',
          }}
        >
          {data?.warning ? 'warning' : data?.sourceLabel ?? 'Faire'}
        </span>
      </div>

      {hasOrders ? (
        <>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums text-[var(--theme-text)]">
                {formatCount(summary.orderCount)}
              </div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted">
                orders
              </div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums text-[var(--theme-text)]">
                {formatMoney(summary.revenue)}
              </div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted">
                revenue
              </div>
            </div>
            <div>
              <div className="font-mono text-lg font-semibold tabular-nums text-[var(--theme-text)]">
                {formatCount(summary.units)}
              </div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-muted">
                units
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border px-2.5 py-2 text-[11px]"
            style={{
              borderColor: 'var(--theme-border)',
              background: 'color-mix(in srgb, var(--theme-card2) 85%, transparent)',
              color: 'var(--theme-muted)',
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <span>Latest order</span>
              <span className="font-mono text-[var(--theme-text)]">
                {formatIsoDate(summary.latestOrderDate)}
              </span>
            </div>
            {latestOrder ? (
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="truncate" title={latestOrder.customerName ?? ''}>
                  {latestOrder.customerName ?? latestOrder.orderId}
                </span>
                {latestOrder.orderUrl ? (
                  <a
                    href={latestOrder.orderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--theme-accent)] hover:underline"
                  >
                    open →
                  </a>
                ) : (
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em]">
                    {latestOrder.orderId}
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div
          className="rounded-lg border border-dashed px-3 py-4 text-center text-sm"
          style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-muted)' }}
        >
          {data?.warning
            ? data.warning
            : 'No PatchAid Faire orders found in the Corpus index.'}
        </div>
      )}
    </section>
  )
}
