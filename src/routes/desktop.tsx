import { createFileRoute, Link } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'

const downloadHref = '/downloads/CaelDesktop-macOS-arm64.zip'
const checksumHref = '/downloads/CaelDesktop-macOS-arm64.sha256'

export const Route = createFileRoute('/desktop')({
  ssr: false,
  component: DesktopRoute,
})

function DesktopRoute() {
  usePageTitle('Cael Desktop')

  return (
    <main className="h-full overflow-y-auto bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-6 lg:px-8">
        <section className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--theme-muted)]">
            Native companion
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Install Cael Desktop on your MacBook Pro
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--theme-muted)]">
            Cael Workspace stays the browser/PWA cockpit. Cael Desktop is the native macOS
            companion for a more Mac-like working system. The download below is served only from
            BigMac over your Tailscale mesh.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={downloadHref}
              download
              className="rounded-xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Download Cael Desktop for macOS arm64
            </a>
            <a
              href={checksumHref}
              className="rounded-xl border border-[var(--theme-border)] px-5 py-3 text-center text-sm transition hover:bg-white/5"
            >
              View SHA-256 checksum
            </a>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <InfoCard title="Download" value="CaelDesktop.app.zip" sub="Unzip on MBP, then drag the app into Applications." />
          <InfoCard title="Access" value="Tailscale only" sub="No public internet or Funnel access is used." />
          <InfoCard title="Pairing" value="BigMac via SSH" sub="The app includes connection profiles for BigMac/Cael over Tailscale." />
        </section>

        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <h2 className="text-lg font-semibold">Install steps on MBP</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-[var(--theme-muted)]">
            <li>Click the green download button above.</li>
            <li>Open the downloaded zip; macOS will reveal <code>CaelDesktop.app</code>.</li>
            <li>Drag <code>CaelDesktop.app</code> to your Applications folder.</li>
            <li>If macOS blocks first launch, right-click the app and choose <strong>Open</strong>.</li>
            <li>Use the <strong>BigMac / Cael via Tailscale</strong> profile to connect back to BigMac.</li>
          </ol>
        </section>

        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <h2 className="text-lg font-semibold">Feature merge direction</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <MergeCard title="Workspace owns" body="Chat, sessions, memory, terminal, workflows, tasks, status, receipts, and Tailscale web/PWA access." />
            <MergeCard title="Desktop owns" body="Native macOS shell, remote BigMac workbench, Finder-like behavior, future notifications, menu bar, and local affordances." />
            <MergeCard title="Shared bridge" body="Both should point at the same Hermes Gateway/Dashboard APIs and Cael status endpoints instead of duplicating state." />
            <MergeCard title="Next native merge" body="Add a native Homebase tab that opens this Workspace, plus status/download/update checks from BigMac." />
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <h2 className="text-lg font-semibold">Back to cockpit</h2>
          <Link
            to="/cael-home"
            className="mt-4 inline-flex rounded-xl border border-[var(--theme-border)] px-5 py-3 text-sm transition hover:bg-white/5"
          >
            Return to Cael Homebase
          </Link>
        </section>
      </div>
    </main>
  )
}

function InfoCard({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">{title}</div>
      <div className="mt-2 break-words text-xl font-semibold">{value}</div>
      <div className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">{sub}</div>
    </div>
  )
}

function MergeCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-[var(--theme-border)] bg-black/10 p-4">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--theme-muted)]">{body}</p>
    </div>
  )
}
