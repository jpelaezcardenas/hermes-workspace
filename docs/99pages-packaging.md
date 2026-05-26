# 99Pages Agentic OS Packaging

99Pages Agentic OS packages must deploy Hermes Core through the managed AI Workforce custom endpoint.

## Token rule

Do not bake a shared API key into the installer binary, source tree, or public release artifact. The installer must receive the user's Workforce token at install time, then write it to the local Hermes custom endpoint config:

- `~/.hermes/.env`
- `~/.hermes/config.yaml`

The installed provider is locked to `custom` and points at:

- `https://app.99pages.uk/ai/v1`

## Windows one-line install

```powershell
$env:P99_WORKFORCE_API_KEY="USER_WORKFORCE_TOKEN"; irm https://raw.githubusercontent.com/outsourc-e/hermes-workspace/main/scripts/install-windows.ps1 | iex
```

Local source install:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\install-windows.ps1 -WorkforceToken "USER_WORKFORCE_TOKEN"
```

The Windows installer also creates a desktop shortcut with `CTRL+ALT+H`.

## macOS one-line install

```bash
P99_WORKFORCE_API_KEY="USER_WORKFORCE_TOKEN" bash -c "$(curl -fsSL https://raw.githubusercontent.com/outsourc-e/hermes-workspace/main/scripts/install-macos.sh)"
```

Local source install:

```bash
P99_WORKFORCE_API_KEY="USER_WORKFORCE_TOKEN" bash scripts/install-macos.sh
```

The macOS installer creates:

- `~/.local/bin/99pages-agentic-os`
- `~/Desktop/99Pages Agentic OS.command`

macOS global hotkeys are controlled by System Settings or Shortcuts; assign the generated Desktop command there when a global keyboard shortcut is required.

## Model catalog

The installer writes the complete AI Workforce model catalog:

- Fast: `99pages/fast`
- Pro: `99pages/pro`
- Think: `99pages/think`
- Coder: `99pages/coder`
- Admin: `99pages/admin`
- Creator: `99pages/creator`
- Copywriter: `99pages/copywriter`
- Trader: `99pages/trader`

Keep `P99_WORKFORCE_ROLE_*` values shell-safe because gateway scripts may source `.env` with bash.
