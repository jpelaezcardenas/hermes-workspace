import { createFileRoute, Link } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/mail')({
  ssr: false,
  component: MailRoute,
})

function MailRoute() {
  usePageTitle('Cael Mail')

  return (
    <main className="h-full overflow-y-auto bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 lg:px-8">
        <Hero eyebrow="Communications" title="Mail" body="The Mail client starts read-only: inbox/search/thread reader, summaries, task extraction, and draft replies. Sending stays disabled until the approval-gated send flow is wired." />
        <section className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <Panel title="Presets">
            <ul className="space-y-2 text-sm text-[var(--theme-muted)]">
              <li>Inbox</li>
              <li>Unread</li>
              <li>Today</li>
              <li>Attachments</li>
              <li>Needs reply</li>
            </ul>
          </Panel>
          <Panel title="Provider setup needed">
            <p className="text-sm leading-6 text-[var(--theme-muted)]">
              Google Workspace OAuth needs repair before live Gmail data is available. This page is ready for the API wiring and will stay safe/setup-needed until auth is valid.
            </p>
            <LinkButton to="/integrations">Open Integrations</LinkButton>
          </Panel>
        </section>
      </div>
    </main>
  )
}

function Hero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">{body}</p>
    </section>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function LinkButton({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to as never} className="mt-4 inline-flex rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5">{children}</Link>
}
