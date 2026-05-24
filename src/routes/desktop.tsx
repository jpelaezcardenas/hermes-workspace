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
            Cael Desktop is the primary native command center. Cael Workspace at
            :3077 is the responsive web/PWA mirror for iPhone, iPad, and
            browsers until a true mobile app ships. Both read the same Cael
            Workspace API contract; Desktop adds native Mac affordances without
            owning business logic. The download below is served only from BigMac
            over your Tailscale mesh.
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
          <InfoCard
            title="Download"
            value="CaelDesktop.app.zip"
            sub="Unzip on MBP, then drag the app into Applications."
          />
          <InfoCard
            title="Access"
            value="Tailscale only"
            sub="No public internet or Funnel access is used."
          />
          <InfoCard
            title="Pairing"
            value="BigMac via SSH"
            sub="The app includes connection profiles for BigMac/Cael over Tailscale."
          />
        </section>

        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <h2 className="text-lg font-semibold">Install steps on MBP</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-[var(--theme-muted)]">
            <li>Click the green download button above.</li>
            <li>
              Open the downloaded zip; macOS will reveal{' '}
              <code>CaelDesktop.app</code>.
            </li>
            <li>
              Drag <code>CaelDesktop.app</code> to your Applications folder.
            </li>
            <li>
              If macOS blocks first launch, right-click the app and choose{' '}
              <strong>Open</strong>.
            </li>
            <li>
              Use the <strong>BigMac / Cael via Tailscale</strong> profile to
              connect back to BigMac.
            </li>
          </ol>
        </section>

        <section className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
          <h2 className="text-lg font-semibold">Feature merge direction</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <MergeCard
              title="API owns"
              body="Shared Cael Workspace APIs own chat, sessions, memory, terminal, workflows, tasks, status, receipts, usage, n8n health, and approvals."
            />
            <MergeCard
              title="Desktop owns"
              body="Primary native macOS cockpit: Homebase, sessions/chat, usage, tasks, workflows, artifacts, terminal, future notifications, menu bar, and local affordances."
            />
            <MergeCard
              title="Web/PWA mirrors"
              body="The :3077 Workspace mirrors the same dashboard, chat/session, usage, memory, n8n health, approvals, and command panels responsively for iPhone/iPad."
            />
            <MergeCard
              title="Shared bridge"
              body="The Cael Workspace API contract is the source of truth; Swift/Desktop and Web/PWA are clients of the same Hermes Gateway/Dashboard/Knowledge/n8n adapters."
            />
            <MergeCard
              title="Legacy absorption"
              body="KB Brain Dashboard remains migration-only while its Personal Brain, Business Brain, n8n, Vaultwarden-reference, and receipt surfaces move into Cael."
            />
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

function InfoCard({
  title,
  value,
  sub,
}: {
  title: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-muted)]">
        {title}
      </div>
      <div className="mt-2 break-words text-xl font-semibold">{value}</div>
      <div className="mt-2 text-xs leading-5 text-[var(--theme-muted)]">
        {sub}
      </div>
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
