import { useEffect, useState, type ReactNode } from 'react'
import {
  WIDGET_CATALOG,
  type DashboardLayout,
  type WidgetId,
} from '@/screens/dashboard/lib/use-dashboard-layout'

/**
 * Wraps a dashboard widget so it participates in edit mode and can be
 * collapsed without fully hiding it. Collapsed state is per-widget and
 * persisted in localStorage so operators can fit more status on one page.
 */
export function WidgetShell({
  id,
  layout,
  children,
}: {
  id: WidgetId
  layout: DashboardLayout
  children: ReactNode
}) {
  if (!layout.isVisible(id)) return null

  const meta = WIDGET_CATALOG.find((w) => w.id === id)
  const canHide = meta?.hideable ?? true
  const storageKey = `dashboard.widget.collapsed.${id}`
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(storageKey) === '1'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(storageKey, collapsed ? '1' : '0')
  }, [collapsed, storageKey])

  const collapseButton = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        setCollapsed((value) => !value)
      }}
      className="absolute top-2 z-20 inline-flex h-6 items-center justify-center rounded-full border px-2 text-[11px] font-semibold uppercase tracking-[0.12em] shadow-sm transition-all hover:scale-105"
      style={{
        right: layout.editMode && canHide ? 30 : 8,
        background: 'var(--theme-card)',
        color: 'var(--theme-muted)',
        borderColor: 'var(--theme-border)',
      }}
      title={`${collapsed ? 'Expand' : 'Collapse'} ${meta?.label ?? id}`}
      aria-label={`${collapsed ? 'Expand' : 'Collapse'} widget ${meta?.label ?? id}`}
    >
      {collapsed ? '＋' : '－'}
    </button>
  )

  if (collapsed) {
    return (
      <div
        className="relative rounded-xl border px-4 py-3"
        style={{
          background: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="pr-16">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            {meta?.label ?? id}
          </div>
          <div className="mt-1 text-xs text-muted">
            Collapsed — click + to expand.
          </div>
        </div>
        {collapseButton}
      </div>
    )
  }

  if (!layout.editMode) {
    return (
      <div className="relative h-full">
        {children}
        {collapseButton}
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          outline: '1px dashed var(--theme-accent)',
          outlineOffset: '2px',
          boxShadow:
            '0 0 0 6px color-mix(in srgb, var(--theme-accent) 8%, transparent)',
          borderRadius: 12,
        }}
      />
      <div className="relative h-full">{children}</div>
      {collapseButton}
      {canHide ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            layout.hide(id)
          }}
          className="absolute -right-2 -top-2 z-20 inline-flex size-6 items-center justify-center rounded-full text-[14px] font-bold leading-none shadow-md transition-transform hover:scale-110"
          style={{
            background: 'var(--theme-card)',
            color: 'var(--theme-danger)',
            border: '1px solid var(--theme-border)',
          }}
          title={`Hide ${meta?.label ?? id}`}
          aria-label={`Hide widget ${meta?.label ?? id}`}
        >
          ×
        </button>
      ) : null}
    </div>
  )
}
