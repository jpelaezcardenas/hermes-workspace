# Hermes Cockpit Ratatui Demo

Static read-only prototype for M006/S03.

## What it does

- Reads `docs/hermes-cockpit/projection-example.json` by default.
- Renders GSD/Kanban cards, replay events, active/completed runs, artifacts, trust warnings, and approval counts.
- Provides basic keyboard controls:
  - `q` or `Esc` — quit
  - `↑`/`↓` or `k`/`j` — select card
  - `t` — toggle trust-warning event filter

## Safety boundary

This prototype is read-only. It does not mutate GSD, Hermes Kanban, Hermes logs, or local agent state.

## Run

From this directory:

```bash
cargo run -- ../../docs/hermes-cockpit/projection-example.json
```

## Build check

```bash
cargo check
```

## Deterministic render smoke

This uses Ratatui `TestBackend` to render one frame and print the buffer text:

```bash
cargo run -- --smoke ../../docs/hermes-cockpit/projection-example.json \
  | grep -E 'HERMES COCKPIT|GSD / Kanban Cards|Trust / Approval Warnings'
```

## Verification caution

Do not use `echo q | cargo run` as proof of rendering. Ratatui/Crossterm apps need a real TTY/PTY to enter alternate-screen mode correctly. Use the PTY/screenshot recipe in `docs/hermes-cockpit/tui-verification.md`.
