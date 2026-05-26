param(
  [string]$WorkforceToken = $env:P99_WORKFORCE_API_KEY,
  [string]$BaseUrl = "https://app.99pages.uk/ai/v1",
  [string]$Model = "99pages/fast",
  [string]$ShortcutName = "99Pages Agentic OS",
  [string]$Hotkey = "CTRL+ALT+H",
  [string]$InstallDir = (Join-Path $env:LOCALAPPDATA "99Pages\AgenticOS\hermes-workspace"),
  [string]$RepoUrl = "https://github.com/outsourc-e/hermes-workspace.git",
  [switch]$ConfigureToken,
  [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"

$candidateRoot = if ($PSScriptRoot) { Join-Path $PSScriptRoot ".." } else { "" }
if ($candidateRoot -and (Test-Path (Join-Path $candidateRoot "package.json"))) {
  $root = Resolve-Path $candidateRoot
}
else {
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "git is required for one-line install. Install Git for Windows first."
  }
  if (Test-Path (Join-Path $InstallDir ".git")) {
    git -C $InstallDir pull --ff-only
  }
  else {
    New-Item -ItemType Directory -Force -Path (Split-Path $InstallDir -Parent) | Out-Null
    git clone $RepoUrl $InstallDir
  }
  $root = Resolve-Path $InstallDir
}
Set-Location $root
$scriptRoot = Join-Path $root "scripts"

if (Get-Command pnpm -ErrorAction SilentlyContinue) {
  if (-not $SkipInstall -and -not (Test-Path (Join-Path $root "node_modules"))) {
    pnpm install
  }
}
else {
  Write-Warning "pnpm is not installed. The shortcut was created, but dependencies must be installed before first launch."
}

if ($WorkforceToken) {
  & "$scriptRoot\configure-ai-workforce.ps1" `
    -BaseUrl $BaseUrl `
    -Model $Model `
    -ApiKey $WorkforceToken `
    -Provider "custom"
}
elseif ($ConfigureToken) {
  throw "Workforce token is required when -ConfigureToken is used. Pass -WorkforceToken or set P99_WORKFORCE_API_KEY."
}

& "$scriptRoot\create-desktop-shortcut.ps1" `
  -ShortcutName $ShortcutName `
  -Hotkey $Hotkey

Write-Host "99Pages Agentic OS Windows deployment is configured."
if ($WorkforceToken) {
  Write-Host "Custom endpoint: $BaseUrl"
  Write-Host "Model route:      $Model"
}
else {
  Write-Host "Custom endpoint will be configured after first Magic Link login."
}
Write-Host "Shortcut:         $ShortcutName ($Hotkey)"
Write-Host "Launch:           powershell -ExecutionPolicy Bypass -File scripts\start-windows-desktop.ps1"
