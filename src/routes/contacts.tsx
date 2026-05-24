import { createFileRoute, Link } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'

export const Route = createFileRoute('/contacts')({
  ssr: false,
  component: ContactsRoute,
})

function ContactsRoute() {
  usePageTitle('Cael Contacts')

  return (
    <main className="h-full overflow-y-auto bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 lg:px-8">
        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">People + companies</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Contacts</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
            Contacts will merge Twenty legacy contacts/companies with Google People. First source is the safe Twenty export; editing stays disabled until approval gates are implemented.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Info title="Twenty Legacy" body="Export and normalize contacts/companies before decommissioning Twenty." />
          <Info title="Google People" body="Add after Google OAuth is repaired." />
          <Info title="Dedupe" body="Group by email/domain and preserve source badges." />
        </section>

        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <h2 className="text-lg font-semibold">Next action</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--theme-muted)]">
            Run a read-only Twenty export into a timestamped folder, then wire this page to the normalized JSON.
          </p>
          <Link to="/integrations" className="mt-4 inline-flex rounded-xl border border-[var(--theme-border)] px-4 py-2 text-sm hover:bg-white/5">Open Integrations</Link>
        </section>
      </div>
    </main>
  )
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--theme-muted)]">{body}</p>
    </div>
  )
}
