#!/usr/bin/env bash
set -euo pipefail

WORKFORCE_TOKEN="${P99_WORKFORCE_API_KEY:-}"
BASE_URL="${P99_WORKFORCE_BASE_URL:-https://app.99pages.uk/ai/v1}"
MODEL="${P99_WORKFORCE_MODEL:-99pages/fast}"
APP_NAME="${P99_APP_NAME:-99Pages Agentic OS}"
INSTALL_DIR="${P99_INSTALL_DIR:-$HOME/.99pages/agentic-os/hermes-workspace}"
REPO_URL="${P99_REPO_URL:-https://github.com/outsourc-e/hermes-workspace.git}"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --token)
      WORKFORCE_TOKEN="${2:-}"
      shift 2
      ;;
    --base-url)
      BASE_URL="${2:-}"
      shift 2
      ;;
    --model)
      MODEL="${2:-}"
      shift 2
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

if [ -z "$WORKFORCE_TOKEN" ]; then
  echo "Workforce token is required. Set P99_WORKFORCE_API_KEY or pass --token." >&2
  exit 1
fi

if [ "$(uname -s)" != "Darwin" ]; then
  echo "This installer is for macOS. Use scripts/install-windows.ps1 on Windows." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd || pwd)"
CANDIDATE_ROOT="$(cd "$SCRIPT_DIR/.." 2>/dev/null && pwd || pwd)"
if [ -f "$CANDIDATE_ROOT/package.json" ]; then
  ROOT="$CANDIDATE_ROOT"
else
  if ! command -v git >/dev/null 2>&1; then
    echo "git is required for one-line install. Install Xcode Command Line Tools first." >&2
    exit 1
  fi
  if [ -d "$INSTALL_DIR/.git" ]; then
    git -C "$INSTALL_DIR" pull --ff-only
  else
    mkdir -p "$(dirname "$INSTALL_DIR")"
    git clone "$REPO_URL" "$INSTALL_DIR"
  fi
  ROOT="$INSTALL_DIR"
fi
HERMES_HOME="${HERMES_HOME:-$HOME/.hermes}"
ENV_PATH="$HERMES_HOME/.env"
CONFIG_PATH="$HERMES_HOME/config.yaml"
BIN_DIR="$HOME/.local/bin"
LAUNCHER="$BIN_DIR/99pages-agentic-os"
DESKTOP_LAUNCHER="$HOME/Desktop/$APP_NAME.command"

mkdir -p "$HERMES_HOME" "$BIN_DIR"

cat > "$ENV_PATH" <<EOF
API_SERVER_ENABLED=true
OPENAI_API_KEY=$WORKFORCE_TOKEN
OPENAI_BASE_URL=$BASE_URL
OPENAI_MODEL=$MODEL
CUSTOM_API_KEY=$WORKFORCE_TOKEN
CUSTOM_BASE_URL=$BASE_URL
CUSTOM_MODEL=$MODEL
HERMES_INFERENCE_PROVIDER=custom
HERMES_DEFAULT_MODEL=$MODEL
HERMES_PROVIDER=custom
HERMES_MODEL=$MODEL
HERMES_99PAGES_PROVIDER_LOCK=custom
HERMES_99PAGES_DISABLE_PROVIDER_SELECTION=1
HERMES_99PAGES_ROUTE_KEY=$MODEL
P99_WORKFORCE_API_KEY=$WORKFORCE_TOKEN
P99_PROVIDER_LOCK=custom
P99_FORCE_WORKFORCE=true
P99_HIDE_EXTERNAL_PROVIDERS=true
P99_LOCK_PROVIDER=true
P99_WORKFORCE_PRODUCT_MODEL=99pages/workforce
P99_WORKFORCE_EXECUTION_MODEL=$MODEL
P99_WORKFORCE_ROUTE=$MODEL
P99_WORKFORCE_BASE_URL=$BASE_URL
P99_PORTAL_URL=https://app.99pages.uk
AGENTIC_OS_PORTAL_URL=https://app.99pages.uk
AGENTIC_OS_WORKFORCE_BASE_URL=$BASE_URL
P99_LOGIN_METHOD=magic_link

# 99Pages AI Workforce model catalog for Agentic OS routing
P99_WORKFORCE_MODELS=99pages/fast,99pages/pro,99pages/think,99pages/coder,99pages/admin,99pages/creator,99pages/copywriter,99pages/trader
P99_WORKFORCE_MODEL_FAST=99pages/fast
P99_WORKFORCE_MODEL_PRO=99pages/pro
P99_WORKFORCE_MODEL_THINK=99pages/think
P99_WORKFORCE_MODEL_CODER=99pages/coder
P99_WORKFORCE_MODEL_ADMIN=99pages/admin
P99_WORKFORCE_MODEL_CREATOR=99pages/creator
P99_WORKFORCE_MODEL_COPYWRITER=99pages/copywriter
P99_WORKFORCE_MODEL_TRADER=99pages/trader
P99_WORKFORCE_ROUTE_FAST=99pages/fast
P99_WORKFORCE_ROUTE_PRO=99pages/pro
P99_WORKFORCE_ROUTE_THINK=99pages/think
P99_WORKFORCE_ROUTE_CODER=99pages/coder
P99_WORKFORCE_ROUTE_ADMIN=99pages/admin
P99_WORKFORCE_ROUTE_CREATOR=99pages/creator
P99_WORKFORCE_ROUTE_COPYWRITER=99pages/copywriter
P99_WORKFORCE_ROUTE_TRADER=99pages/trader
P99_WORKFORCE_ROLE_FAST=Fast:DeepSeek-V4-Flash,quick-general-work
P99_WORKFORCE_ROLE_PRO=Pro:MiniMax-M2.5,long-coding-and-complex-orchestration
P99_WORKFORCE_ROLE_THINK=Think:Gemini-3.1-Flash-Lite,reasoning-and-fallback-thinking
P99_WORKFORCE_ROLE_CODER=Coder:Llama-4-Maverick,frequent-long-coding-work
P99_WORKFORCE_ROLE_ADMIN=Admin:DeepSeek-V3.1-Terminus,finance-legal-administration
P99_WORKFORCE_ROLE_CREATOR=Creator:Xiaomi-MiMo-V2.5-Pro,creative-planning
P99_WORKFORCE_ROLE_COPYWRITER=Copywriter:Kimi-K2.6,copywriting
P99_WORKFORCE_ROLE_TRADER=Trader:Qwen-3.5-397B-A17B,quant-trading-investment-forecasting
EOF

cat > "$CONFIG_PATH" <<EOF
model:
  default: "$MODEL"
  provider: "custom"
  base_url: "$BASE_URL"
  key_env: P99_WORKFORCE_API_KEY
  api_mode: chat_completions
custom_providers:
  - name: "custom"
    base_url: "$BASE_URL"
    key_env: P99_WORKFORCE_API_KEY
    model: "$MODEL"
    api_mode: chat_completions
EOF

chmod 600 "$ENV_PATH" "$CONFIG_PATH"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required. Install Node.js and pnpm first." >&2
  exit 1
fi

if [ ! -d "$ROOT/node_modules" ]; then
  (cd "$ROOT" && pnpm install)
fi

cat > "$LAUNCHER" <<EOF
#!/usr/bin/env bash
set -euo pipefail
cd "$ROOT"
export HERMES_HOME="$HERMES_HOME"
export HERMES_API_URL="\${HERMES_API_URL:-http://127.0.0.1:8642}"
export HERMES_DASHBOARD_URL="\${HERMES_DASHBOARD_URL:-http://127.0.0.1:9119}"
export NODE_OPTIONS="\${NODE_OPTIONS:---max-old-space-size=2048}"
pnpm exec electron .
EOF
chmod +x "$LAUNCHER"

cat > "$DESKTOP_LAUNCHER" <<EOF
#!/usr/bin/env bash
open -a Terminal "$LAUNCHER"
EOF
chmod +x "$DESKTOP_LAUNCHER"

echo "99Pages Agentic OS macOS deployment is configured."
echo "Custom endpoint: $BASE_URL"
echo "Model route:      $MODEL"
echo "Launcher:         $LAUNCHER"
echo "Desktop launcher: $DESKTOP_LAUNCHER"
echo "Optional hotkey: assign the Desktop .command file in macOS Shortcuts or Keyboard settings."
