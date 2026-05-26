param(
  [string]$OpenRouterApiKey = $env:OPENROUTER_API_KEY,
  [string]$OpenRouterModel = "google/gemini-3.5-flash",
  [string]$OpenRouterBaseUrl = "https://openrouter.ai/api/v1",
  [string]$AiWorkforceBaseUrl = "https://app.99pages.uk/ai/v1",
  [string]$AiWorkforceModel = "99pages/fast",
  [string]$AiWorkforceApiKey = $env:P99_WORKFORCE_API_KEY,
  [string]$ApiUrl = "",
  [string]$DashboardUrl = "",
  [string]$BindHost = "",
  [string]$PortalUrl = "",
  [switch]$Rebuild
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$hermesBin = Join-Path $root ".venv-hermes\Scripts\hermes.exe"

Set-Location $root

function Import-DotEnv {
  param([string]$Path)
  if (-not (Test-Path $Path)) { return }

  Get-Content $Path | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#") -or -not $line.Contains("=")) { return }
    $name, $value = $line.Split("=", 2)
    $name = $name.Trim()
    $value = $value.Trim().Trim('"').Trim("'")
    if ($name) {
      [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
  }
}

Import-DotEnv (Join-Path $root ".env")
Import-DotEnv (Join-Path $HOME ".hermes\.env")

if (-not $env:HERMES_API_TOKEN -and $env:API_SERVER_KEY) {
  $env:HERMES_API_TOKEN = $env:API_SERVER_KEY
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  throw "pnpm is not installed. Run: npm install -g pnpm"
}

if (-not (Test-Path $hermesBin)) {
  py -3.12 -m venv .venv-hermes
  .\.venv-hermes\Scripts\python.exe -m pip install hermes-agent
}

if ($AiWorkforceApiKey -or $env:P99_WORKFORCE_API_KEY) {
  if (-not $AiWorkforceApiKey) {
    $AiWorkforceApiKey = $env:P99_WORKFORCE_API_KEY
  }
  $args = @(
    "-BaseUrl", $AiWorkforceBaseUrl,
    "-Model", $AiWorkforceModel
  )
  if ($AiWorkforceApiKey) {
    $args += @("-ApiKey", $AiWorkforceApiKey)
  }
  & "$PSScriptRoot\configure-ai-workforce.ps1" @args
}
elseif ($OpenRouterApiKey) {
  & "$PSScriptRoot\configure-openrouter.ps1" `
    -BaseUrl $OpenRouterBaseUrl `
    -Model $OpenRouterModel `
    -ApiKey $OpenRouterApiKey
}

if (-not (Test-Path "node_modules")) {
  pnpm install
}

if ($Rebuild -or -not (Test-Path "dist\server\server.js") -or -not (Test-Path "dist\client")) {
  $env:NODE_OPTIONS = "--max-old-space-size=2048"
  pnpm exec vite build
  pnpm exec esbuild dist/server/server.js --bundle --platform=node --format=cjs --outfile=electron/server-bundle.cjs
}

$env:PATH = "$(Join-Path $root '.venv-hermes\Scripts');$env:PATH"
$env:HERMES_CLI_BIN = $hermesBin
if ($ApiUrl) { $env:HERMES_API_URL = $ApiUrl }
elseif (-not $env:HERMES_API_URL) { $env:HERMES_API_URL = "http://127.0.0.1:8642" }
if ($DashboardUrl) { $env:HERMES_DASHBOARD_URL = $DashboardUrl }
elseif (-not $env:HERMES_DASHBOARD_URL) { $env:HERMES_DASHBOARD_URL = "http://127.0.0.1:9119" }
if ($BindHost) { $env:HERMES_WORKSPACE_BIND_HOST = $BindHost }
elseif (-not $env:HERMES_WORKSPACE_BIND_HOST) { $env:HERMES_WORKSPACE_BIND_HOST = "127.0.0.1" }
$env:HERMES_AUTH_MODE = "none"
$env:P99_AUTH_MODE = "none"
if ($PortalUrl) { $env:AGENTIC_OS_PORTAL_URL = $PortalUrl }
elseif (-not $env:AGENTIC_OS_PORTAL_URL) { $env:AGENTIC_OS_PORTAL_URL = "https://app.99pages.uk" }
$env:AGENTIC_OS_HOST_HOME = (Join-Path $HOME ".agentic-os")
$env:COOKIE_SECURE = "0"
$env:API_SERVER_ENABLED = "true"
$env:NODE_ENV = "production"

pnpm exec electron .
