# Hermes Cockpit TUI Verification

Ratatui/Crossterm apps must be verified in a real terminal or pseudo-terminal. Piping stdin, for example `echo q | cargo run`, can bypass the alternate screen and does **not** prove rendering.

## Build verification

```bash
cd prototypes/hermes-cockpit
cargo check
```

## Deterministic render unit test pattern

Serena inspection of Joe's existing EOS Ratatui client found a useful pattern: use `ratatui::backend::TestBackend` plus `Terminal::draw(...)`, then inspect the buffer text for expected labels. This prototype includes that pattern as a smoke mode:

```bash
cd prototypes/hermes-cockpit
cargo run -- --smoke ../../docs/hermes-cockpit/projection-example.json \
  | grep -E 'HERMES COCKPIT|GSD / Kanban Cards|Trust / Approval Warnings'
```

Expected: the command prints the render-buffer line containing the main title and panel labels. This proves the render tree without needing a human screenshot, while the PTY check below still proves terminal-mode behavior.

## PTY smoke test

Use a PTY-capable runner such as `script`:

```bash
cd prototypes/hermes-cockpit
script -q -c 'timeout 3s cargo run -- ../../docs/hermes-cockpit/projection-example.json' /tmp/hermes-cockpit-pty.log || true
perl -pe 's/\e\[[0-9;?]*[ -\/]*[@-~]//g' /tmp/hermes-cockpit-pty.log | grep -E 'HERMES COCKPIT|GSD / Kanban Cards|Trust / Approval Warnings'
```

Expected: the cleaned PTY log contains the main title and at least the cards and trust/approval panel titles.

## Screenshot or recording evidence

For human-visible proof, run:

```bash
cd prototypes/hermes-cockpit
cargo run -- ../../docs/hermes-cockpit/projection-example.json
```

Then capture one of:

- Terminal screenshot showing the Cockpit layout.
- `asciinema rec` terminal recording.
- `script` PTY log plus cleaned text proof.

## Manual UAT checklist

Within 60 seconds, the operator should be able to answer:

1. Which card is selected?
2. Which runs are active or completed?
3. What artifact exists?
4. Which claim or artifact has a trust warning?
5. Whether approval is required or recorded?

The answer must come from the Cockpit display, not from reading raw NDJSON.
