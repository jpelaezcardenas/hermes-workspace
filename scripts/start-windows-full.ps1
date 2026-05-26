param(
  [int]$WorkspacePort = 3000,
  [int]$GatewayPort = 8642,
  [int]$DashboardPort = 9119,
  [string]$BindHost = "",
  [switch]$Open
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$venvHermes = Join-Path $root ".venv-hermes\Scripts\hermes.exe"
$logDir = Join-Path $root "logs\windows-local"

if (-not (Test-Path $venvHermes)) {
  throw "Hermes Agent venv is missing. Run: py -3.12 -m venv .venv-hermes; .\.venv-hermes\Scripts\python.exe -m pip install hermes-agent"
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  throw "pnpm is not installed. Run: npm install -g pnpm"
}

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$gatewayOutLog = Join-Path $logDir "gateway.out.log"
$gatewayErrLog = Join-Path $logDir "gateway.err.log"
$dashboardOutLog = Join-Path $logDir "dashboard.out.log"
$dashboardErrLog = Join-Path $logDir "dashboard.err.log"
$workspaceOutLog = Join-Path $logDir "workspace.out.log"
$workspaceErrLog = Join-Path $logDir "workspace.err.log"
$effectiveBindHost = if ($BindHost) { $BindHost } elseif ($env:HOST) { $env:HOST } else { "127.0.0.1" }
$browserHost = if ($effectiveBindHost -eq "0.0.0.0") { "127.0.0.1" } else { $effectiveBindHost }
$gatewayUrl = if ($env:HERMES_API_URL) { $env:HERMES_API_URL } else { "http://127.0.0.1:$GatewayPort" }
$dashboardUrl = if ($env:HERMES_DASHBOARD_URL) { $env:HERMES_DASHBOARD_URL } else { "http://127.0.0.1:$DashboardPort" }

$workspaceCommand = @"
Set-Location '$root'
`$env:HERMES_API_URL='$gatewayUrl'
`$env:HERMES_DASHBOARD_URL='$dashboardUrl'
`$env:API_SERVER_HOST='$effectiveBindHost'
`$env:API_SERVER_PORT='$GatewayPort'
`$env:HOST='$effectiveBindHost'
`$env:PORT='$WorkspacePort'
`$env:NODE_OPTIONS='--max-old-space-size=2048'
pnpm exec vite dev --host $effectiveBindHost --port $WorkspacePort
"@

$gatewayCommand = @"
`$env:API_SERVER_HOST='$effectiveBindHost'
`$env:API_SERVER_PORT='$GatewayPort'
& '$venvHermes' gateway run --replace --accept-hooks
"@

Start-Process powershell -WindowStyle Hidden -RedirectStandardOutput $gatewayOutLog -RedirectStandardError $gatewayErrLog -ArgumentList @(
  "-NoProfile",
  "-ExecutionPolicy",
  "Bypass",
  "-Command",
  $gatewayCommand
)

Start-Process powershell -WindowStyle Hidden -RedirectStandardOutput $dashboardOutLog -RedirectStandardError $dashboardErrLog -ArgumentList @(
  "-NoProfile",
  "-ExecutionPolicy",
  "Bypass",
  "-Command",
  "& '$venvHermes' dashboard --port $DashboardPort --host $effectiveBindHost --no-open --skip-build"
)

Start-Process powershell -WindowStyle Hidden -RedirectStandardOutput $workspaceOutLog -RedirectStandardError $workspaceErrLog -ArgumentList @(
  "-NoProfile",
  "-ExecutionPolicy",
  "Bypass",
  "-Command",
  $workspaceCommand
)

$url = "http://$browserHost`:$WorkspacePort/chat"
Write-Host "Started Hermes local stack."
Write-Host "Workspace: $url"
Write-Host "Gateway:   $gatewayUrl"
Write-Host "Dashboard: $dashboardUrl"
Write-Host "Logs:      $logDir"

if ($Open) {
  Start-Process $url -WindowStyle Hidden
}
