# Changelog

All notable changes to Hermes Workspace are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed
- **`docker compose up` now pulls pre-built images by default** (#82) — `nousresearch/hermes-agent:latest` for the gateway and `ghcr.io/outsourc-e/hermes-workspace:latest` for the UI. Adds `docker-compose.dev.yml` overlay for building from source.

### Fixed
- **Docker: dashboard API unreachable** — agent now starts the dashboard process (`HERMES_DASHBOARD=1`) on `:9119` alongside the gateway; workspace reads sessions, skills, config, jobs, and MCP over the Docker network instead of falling back to limited zero-fork mode.
- **Docker: gateway bound to loopback inside container** — `API_SERVER_HOST` now defaults to `0.0.0.0` inside the container so workspace can reach it over Docker DNS; host publish remains loopback-only (`127.0.0.1:8642`).
- **Docker: volume naming** — renamed `claude-data` to `hermes-agent-data`; added `hermes-workspace-files` volume for workspace file browser persistence.
- **Docker: healthcheck** now verifies both gateway `:8642` and dashboard `:9119` are responding before marking the agent healthy.
- **pnpm 11 build** — added `pnpm-workspace.yaml` with `allowBuilds` map (replaces deprecated `onlyBuiltDependencies` / `dangerouslyAllowAllBuilds`).
- **Chat: per-session model selection** — model picker in the composer now persists the selected model per session and is sent with each message, instead of silently falling back to the backend default.
- **Settings: default model path** — changed from `agents.defaults.model.primary` to `model.default` to match the actual backend config key.
- **Config API: rename message** — "Restart Claude" → "Restart Hermes Agent".

## [2.0.0] — 2026-04-20

**Zero-fork release.** Clone, don't fork. Hermes Workspace now runs on vanilla `pip install hermes-agent` with no patches, no drift, no custom gateway required.

### Added
- **Zero-fork architecture** — dual gateway/dashboard routing; workspace talks directly to vanilla `hermes-agent` 0.10.0+ via standard endpoints (`/v1/models`, `/api/sessions`, `/api/skills`, `/api/config`, `/api/jobs`)
- **One-liner curl installer** — `curl -fsSL … | bash` provisions workspace + gateway + defaults
- **Claude-Nous theme** — dark + light editorial variants with cobalt/paper surface pass, thin 1px architectural borders, editorial type accents
- **Conductor** (`/conductor`) — mission-control surface ported from Clawsuite; spawn missions, assign workers, watch live output and costs
- **Operations** (`/operations`) — agent registry / sessions manager ported from Clawsuite; pause, steer, kill live agents with role and model insight
- **Synthesized tool pills** — inline tool-call rendering from dashboard stream markers when running against zero-fork gateway
- **Landing parity pass** — hero, features, screenshots, setup, OG image, mobile theme toggle
- **Task board status vs. assignee** decoupling
- **Local-model chat session persistence** — local sessions appear in history + session list
- **Memory is local-fs first** — honors `HERMES_HOME`, no gateway dependency
- **Splash + screenshots refresh** — Conductor, Dashboard, Tasks, Jobs captured in new editorial theme

### Changed
- **Model picker** — fetches from gateway (`~/.hermes/models.json` for user-configured models), matches OCPlatform behavior; shows only configured providers instead of all upstream
- **`enhanced-fork` mode label** no longer implies a fork is required; it indicates streaming route availability on vanilla gateway
- **Dashboard + enhanced-chat capabilities** marked optional; missing endpoints no longer trigger warnings
- **Feature-gate + install copy** — all fork-era references purged
- **Theme family allowlist** — `claude-nous` promoted to the enterprise allowlist
- **Session pill** — solid dark-mode background, matches model selector

### Fixed
- Duplicate responses and disappearing history on interrupt (#62)
- Portable-mode double user message, uncleaned timeouts, orphaned unregister callbacks
- Local model selection actually propagates to chat (no silent fallback)
- Strip provider prefix correctly for local routing
- Dashboard token injection on `/` (not `/index.html`)
- Onboarding no longer stacks behind workspace shell
- Root bootstrap guards against uncaught errors
- Preserve assistant text during tool-call streaming
- Installer output uses defined escape vars (removed undefined BOLD/RESET)

### Removed
- All references to the legacy "enhanced fork" as a requirement
- Stale fork-era gateway instructions and feature-gate copy

---

## [1.0.0] — 2026-04-10

Initial public release. Chat, files, memory, skills, terminal, dashboard, settings — the foundational workspace.
