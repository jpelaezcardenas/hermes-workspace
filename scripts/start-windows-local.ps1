param(
  [string]$ApiUrl = "",
  [string]$DashboardUrl = "",
  [string]$BindHost = "",
  [int]$Port = 3000,
  [switch]$Install,
  [switch]$Open
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  throw "pnpm is not installed. Run: npm install -g pnpm"
}

if ($Install -or -not (Test-Path (Join-Path $root "node_modules"))) {
  pnpm install
}

if ($ApiUrl) { $env:HERMES_API_URL = $ApiUrl }
elseif (-not $env:HERMES_API_URL) { $env:HERMES_API_URL = "http://127.0.0.1:8642" }
if ($DashboardUrl) { $env:HERMES_DASHBOARD_URL = $DashboardUrl }
elseif (-not $env:HERMES_DASHBOARD_URL) { $env:HERMES_DASHBOARD_URL = "http://127.0.0.1:9119" }
if ($BindHost) { $env:HOST = $BindHost }
elseif (-not $env:HOST) { $env:HOST = "127.0.0.1" }
$env:PORT = [string]$Port
$env:NODE_OPTIONS = "--max-old-space-size=2048"

$browserHost = if ($env:HOST -eq "0.0.0.0") { "127.0.0.1" } else { $env:HOST }
Write-Host "Starting Hermes Workspace on http://$browserHost`:$Port/chat"
Write-Host "Gateway:   $env:HERMES_API_URL"
Write-Host "Dashboard: $env:HERMES_DASHBOARD_URL"

if ($Open) {
  Start-Process "http://$browserHost`:$Port/chat" -WindowStyle Hidden
}

pnpm exec vite dev --host $env:HOST --port $Port
