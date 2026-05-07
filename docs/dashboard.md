# Dashboard Operating Guide

## Purpose

Hermes Workspace exposes two dashboard routes:

- `/dashboard`: general Hermes workspace control surface for sessions, model status, skills, terminal, and settings.
- `/ll-ops`: LL Empire Hermes-only ops cockpit for briefing, content pipeline, agent state, client placeholders, performance placeholders, and integration gates.

The dashboard is designed to remain usable without external credentials. When Hermes gateway or dashboard companion APIs are unavailable, the UI renders fixture/fallback data and clear unavailable states instead of blocking access.

## Local Run

```bash
npx pnpm@10 install --frozen-lockfile
npm run dev
```

Open `http://localhost:3000/dashboard` or `http://localhost:3000/ll-ops`.

This repo also supports:

```bash
npm run test
npm run build
npm run start
```

`npm run start` intentionally runs the TanStack Start/Vite server because this workspace is deployed in service mode with `vite dev`, not `vite preview`.

## Required And Optional Env Vars

Core chat backend:

```bash
HERMES_API_URL=http://127.0.0.1:8645
HERMES_API_TOKEN=<same value as API_SERVER_KEY when gateway auth is enabled>
```

Optional dashboard companion API:

```bash
HERMES_DASHBOARD_URL=http://127.0.0.1:9119
```

Optional terminal env loading:

```bash
HERMES_TERMINAL_ENV_FILES=/home/lucas/.hermes/.env.shared:/home/lucas/.hermes/agents/atlas/.env
```

Do not place secrets in client code. Keep them in env files or server-side process env only.

## Step-by-Step Usage

1. Open `/dashboard`.
2. Use `New Chat`, `Terminal`, `Skills`, and `Settings` to move to real routes. Buttons route even when enhanced APIs are unavailable.
3. Read unavailable widgets as capability status, not app failure. Missing sessions/config/skills means the gateway or dashboard API is not exposing those endpoints yet.
4. Open `/ll-ops`.
5. Use the section buttons to filter the cockpit: Overview, Research, Pipeline, Performance, Agents, Clients, Settings.
6. Use search to filter pipeline, agents, clients, integrations, and briefing rows.
7. Click `Review` on a briefing row to mark the selected review item in the dashboard.
8. Click `Refresh and reset` to clear search/review state and refetch read-only status.
9. Open `/terminal` to use the persistent PTY workspace.
10. Click the terminal debug button after a failing command to call `/api/debug-analyze`; it returns structured, safe diagnostics and suggested commands without exposing secret values.

## Data Sources

`/ll-ops` reads these sources when available:

- `systemctl is-active` for Hermes service status.
- `/home/lucas/llempire/SHARED_STATE.md`.
- `/home/lucas/llempire/ACTIVE_STATE.md`.
- `/home/lucas/llempire/ops/status.json`.

When those paths are missing, the route returns safe missing-file/status metadata and the UI falls back to fixture content.

`/dashboard` reads:

- `/api/sessions` for session metrics.
- `/api/hermes-config` for model/provider status.
- `/api/skills` for skills summary.
- `/api/gateway-status` for capability gates.

## Known Limitations

- Live chat still requires a reachable OpenAI-compatible backend.
- Enhanced session, skill, config, job, and dashboard data require Hermes gateway/dashboard APIs.
- External business integrations such as Google Ads, YouTube, Instagram, TikTok, Apify, and ScrapeGraphAI remain disabled until credentials and write policy are approved.
- Full-project `npm run lint` currently fails on pre-existing lint debt outside the dashboard changes. Targeted lint on changed dashboard files passes.
