import { createFileRoute, Link } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/calendar')({
  ssr: false,
  component: CalendarRoute,
})

function CalendarRoute() {
  usePageTitle('Cael Calendar')

  return (
    <main className="h-full overflow-y-auto bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 lg:px-8">
        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">Agenda + scheduling</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Calendar</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
            Calendar starts as a read-only agenda and daily brief surface. Event creation will use a draft → preview → explicit approve flow.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
            <h2 className="text-lg font-semibold">Views</h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--theme-muted)]">
              <li>Today</li>
              <li>Next 7 days</li>
              <li>Needs prep</li>
              <li>Draft event</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
            <h2 className="text-lg font-semibold">Provider setup needed</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--theme-muted)]">
              Google Calendar will appear here after OAuth is repaired. Until then, this page is a safe shell with no calendar mutations available.
            </p>
            <Link to="/integrations" className="mt-4 inline-flex rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5">Open Integrations</Link>
          </div>
        </section>
      </div>
    </main>
  )
}
