param(
  [string]$BaseUrl = "https://app.99pages.uk/ai/v1",
  [string]$Model = "99pages/fast",
  [string]$ApiKey = "ai-workforce",
  [string]$Provider = "custom"
)

$ErrorActionPreference = "Stop"

$hermesHome = Join-Path $HOME ".hermes"
$envPath = Join-Path $hermesHome ".env"
$configPath = Join-Path $hermesHome "config.yaml"

New-Item -ItemType Directory -Force -Path $hermesHome | Out-Null

$workforceModelCatalog = @(
  "# 99Pages AI Workforce model catalog for Agentic OS routing",
  "P99_WORKFORCE_MODELS=99pages/fast,99pages/pro,99pages/think,99pages/coder,99pages/admin,99pages/creator,99pages/copywriter,99pages/trader",
  "P99_WORKFORCE_MODEL_FAST=99pages/fast",
  "P99_WORKFORCE_MODEL_PRO=99pages/pro",
  "P99_WORKFORCE_MODEL_THINK=99pages/think",
  "P99_WORKFORCE_MODEL_CODER=99pages/coder",
  "P99_WORKFORCE_MODEL_ADMIN=99pages/admin",
  "P99_WORKFORCE_MODEL_CREATOR=99pages/creator",
  "P99_WORKFORCE_MODEL_COPYWRITER=99pages/copywriter",
  "P99_WORKFORCE_MODEL_TRADER=99pages/trader",
  "P99_WORKFORCE_ROUTE_FAST=99pages/fast",
  "P99_WORKFORCE_ROUTE_PRO=99pages/pro",
  "P99_WORKFORCE_ROUTE_THINK=99pages/think",
  "P99_WORKFORCE_ROUTE_CODER=99pages/coder",
  "P99_WORKFORCE_ROUTE_ADMIN=99pages/admin",
  "P99_WORKFORCE_ROUTE_CREATOR=99pages/creator",
  "P99_WORKFORCE_ROUTE_COPYWRITER=99pages/copywriter",
  "P99_WORKFORCE_ROUTE_TRADER=99pages/trader",
  "P99_WORKFORCE_ROLE_FAST=Fast:DeepSeek-V4-Flash,quick-general-work",
  "P99_WORKFORCE_ROLE_PRO=Pro:MiniMax-M2.5,long-coding-and-complex-orchestration",
  "P99_WORKFORCE_ROLE_THINK=Think:Gemini-3.1-Flash-Lite,reasoning-and-fallback-thinking",
  "P99_WORKFORCE_ROLE_CODER=Coder:Llama-4-Maverick,frequent-long-coding-work",
  "P99_WORKFORCE_ROLE_ADMIN=Admin:DeepSeek-V3.1-Terminus,finance-legal-administration",
  "P99_WORKFORCE_ROLE_CREATOR=Creator:Xiaomi-MiMo-V2.5-Pro,creative-planning",
  "P99_WORKFORCE_ROLE_COPYWRITER=Copywriter:Kimi-K2.6,copywriting",
  "P99_WORKFORCE_ROLE_TRADER=Trader:Qwen-3.5-397B-A17B,quant-trading-investment-forecasting"
) -join "`n"

@"
API_SERVER_ENABLED=true
OPENAI_API_KEY=$ApiKey
OPENAI_BASE_URL=$BaseUrl
OPENAI_MODEL=$Model
HERMES_INFERENCE_PROVIDER=$Provider
HERMES_DEFAULT_MODEL=$Model
HERMES_PROVIDER=$Provider
HERMES_MODEL=$Model
HERMES_99PAGES_PROVIDER_LOCK=$Provider
HERMES_99PAGES_ROUTE_KEY=$Model
P99_WORKFORCE_API_KEY=$ApiKey
P99_PROVIDER_LOCK=$Provider
P99_WORKFORCE_PRODUCT_MODEL=99pages/workforce
P99_WORKFORCE_EXECUTION_MODEL=$Model
P99_WORKFORCE_ROUTE=$Model
P99_WORKFORCE_BASE_URL=$BaseUrl
P99_PORTAL_URL=https://app.99pages.uk
AGENTIC_OS_PORTAL_URL=https://app.99pages.uk
AGENTIC_OS_WORKFORCE_BASE_URL=$BaseUrl
P99_LOGIN_METHOD=magic_link

$workforceModelCatalog
"@ | Set-Content -Encoding UTF8 $envPath

@"
model:
  default: $Model
  provider: $Provider
  base_url: $BaseUrl
  key_env: P99_WORKFORCE_API_KEY
  api_mode: chat_completions
custom_providers:
  - name: $Provider
    base_url: $BaseUrl
    key_env: P99_WORKFORCE_API_KEY
    model: $Model
    api_mode: chat_completions
"@ | Set-Content -Encoding UTF8 $configPath

Write-Host "Configured Hermes Agent for $Provider"
Write-Host "Config: $configPath"
Write-Host "Env:    $envPath"
