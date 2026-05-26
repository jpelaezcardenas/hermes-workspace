param(
  [string]$BaseUrl = "https://openrouter.ai/api/v1",
  [string]$Model = "google/gemini-3.5-flash",
  [string]$ApiKey = $env:OPENROUTER_API_KEY,
  [string]$Provider = "openrouter"
)

$ErrorActionPreference = "Stop"

if (-not $ApiKey) {
  throw "OpenRouter API key is required. Set OPENROUTER_API_KEY or pass -ApiKey."
}

$hermesHome = Join-Path $HOME ".hermes"
$envPath = Join-Path $hermesHome ".env"
$configPath = Join-Path $hermesHome "config.yaml"

New-Item -ItemType Directory -Force -Path $hermesHome | Out-Null

$apiServerKey = $env:API_SERVER_KEY
if (-not $apiServerKey -and (Test-Path $envPath)) {
  $existingKeyLine = Get-Content $envPath | Where-Object { $_ -match '^API_SERVER_KEY=' } | Select-Object -First 1
  if ($existingKeyLine) {
    $apiServerKey = $existingKeyLine -replace '^API_SERVER_KEY=', ''
  }
}
if (-not $apiServerKey) {
  $bytes = New-Object byte[] 32
  $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
  try {
    $rng.GetBytes($bytes)
  }
  finally {
    $rng.Dispose()
  }
  $apiServerKey = [Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')
}

@"
API_SERVER_ENABLED=true
API_SERVER_KEY=$apiServerKey
OPENROUTER_API_KEY=$ApiKey
OPENAI_API_KEY=$ApiKey
OPENAI_BASE_URL=$BaseUrl
OPENAI_MODEL=$Model
CUSTOM_API_KEY=$ApiKey
CUSTOM_BASE_URL=$BaseUrl
CUSTOM_MODEL=$Model
HERMES_INFERENCE_PROVIDER=$Provider
HERMES_DEFAULT_MODEL=$Model
HERMES_PROVIDER=$Provider
HERMES_MODEL=$Model
HERMES_99PAGES_PROVIDER_LOCK=$Provider
HERMES_99PAGES_DISABLE_PROVIDER_SELECTION=0
P99_PROVIDER_LOCK=$Provider
P99_FORCE_WORKFORCE=false
P99_HIDE_EXTERNAL_PROVIDERS=false
P99_LOCK_PROVIDER=false
P99_LOGIN_METHOD=byok
OPENROUTER_HTTP_REFERER=https://99pages.uk
OPENROUTER_APP_TITLE="99Pages Agentic OS"
OPENROUTER_CATEGORIES=productivity,cli-agent,agentic-os
"@ | Set-Content -Encoding UTF8 $envPath

@"
model:
  default: "$Model"
  provider: "$Provider"
  base_url: "$BaseUrl"
  key_env: OPENROUTER_API_KEY
  api_mode: chat_completions
custom_providers:
  - name: "$Provider"
    base_url: "$BaseUrl"
    key_env: OPENROUTER_API_KEY
    model: "$Model"
    api_mode: chat_completions
"@ | Set-Content -Encoding UTF8 $configPath

Write-Host "Configured Hermes Agent for OpenRouter BYOK"
Write-Host "Model:  $Model"
Write-Host "Config: $configPath"
Write-Host "Env:    $envPath"
