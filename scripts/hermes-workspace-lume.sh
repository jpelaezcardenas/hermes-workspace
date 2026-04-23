#!/usr/bin/env bash
set -euo pipefail

# hermes-workspace-lume.sh
#
# Bootstraps and manages hermes-workspace inside a Lume VM on Apple Silicon macOS.
# Two-VM layout: one BASE (clean snapshot), one AGENT (running workspace).
#
# Commands:
#   create-vm      Create the VM and boot with display for first-time setup
#   bootstrap      SSH into the VM and install Node.js/pnpm/hermes-workspace
#   start          Start the VM headless (no VNC window)
#   stop           Stop the running VM
#   status         Show VM state
#   ssh            Print SSH command to connect to the VM
#   uninstall      Delete the VM

VM_NAME="${VM_NAME:-hermes-workspace}"
VM_USER="${VM_USER:-hermes}"
VM_HOST="${VM_HOST:-}"
VM_PORT="${VM_PORT:-22}"
SHARED_DIR="${SHARED_DIR:-$HOME/hermes-shared}"
INSTALL_DIR="${INSTALL_DIR:-$HOME/.local/bin}"
WORKSPACE_DIR="${WORKSPACE_DIR:-$HOME/hermes-workspace}"
AGENT_API_URL="${AGENT_API_URL:-http://127.0.0.1:8642}"

log() { printf '\n==> %s\n' "$*"; }
warn() { printf '\n[warn] %s\n' "$*" >&2; }
die() { printf '\n[error] %s\n' "$*" >&2; exit 1; }
need_cmd() { command -v "$1" >/dev/null 2>&1; }

ensure_host_requirements() {
  [[ "$(uname -s)" == "Darwin" ]] || die "This script is for macOS hosts."
  [[ "$(uname -m)" == "arm64" ]] || die "Apple Silicon is required."
  local major
  major="$(sw_vers -productVersion | awk -F. '{print $1}')"
  [[ "${major}" -ge 13 ]] || die "macOS 13 or later is required."
}

install_lume() {
  mkdir -p "$INSTALL_DIR"
  case ":$PATH:" in
    *":$INSTALL_DIR:"*) ;;
    *)
      export PATH="$INSTALL_DIR:$PATH"
      ;;
  esac

  if need_cmd lume; then
    log "Lume already installed: $(lume --version || true)"
    return
  fi
  log "Installing Lume"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/trycua/cua/main/libs/lume/scripts/install.sh)"
  need_cmd lume || die "Lume installed but not on PATH. Open a new shell and retry."
}

vm_exists() {
  local name="$1"
  lume list 2>/dev/null | awk '{print $1}' | grep -Fxq "$name"
}

create_vm() {
  mkdir -p "$SHARED_DIR"
  if vm_exists "$VM_NAME"; then
    warn "VM already exists: $VM_NAME"
    return
  fi
  log "Creating VM: $VM_NAME"
  lume create "$VM_NAME" --os macos --ipsw latest
}

boot_vm() {
  log "Booting VM with display for setup"
  lume run "$VM_NAME" --shared-dir "$SHARED_DIR"
  cat <<EOF

Complete these steps inside the VM:
  1. Finish macOS Setup Assistant
  2. Create a user account (note the username)
  3. Enable System Settings > General > Sharing > Remote Login (SSH)
  4. Do NOT sign into personal iCloud in this VM

Then run:
  VM_USER=<vm-username> $0 bootstrap
EOF
}

detect_vm_host() {
  if [[ -n "${VM_HOST}" ]]; then
    printf '%s\n' "$VM_HOST"
    return 0
  fi
  local out ip
  out="$(lume get "$VM_NAME" 2>/dev/null || true)"
  ip="$(printf '%s\n' "$out" | grep -Eo '([0-9]{1,3}\.){3}[0-9]{1,3}' | head -n1 || true)"
  [[ -n "$ip" ]] || return 1
  printf '%s\n' "$ip"
}

ssh_cmd() {
  local host="${1:-}"
  [[ -n "$host" ]] || die "Could not determine VM IP. Set VM_HOST explicitly."
  printf 'ssh -p %s -o StrictHostKeyChecking=accept-new %s@%s' "$VM_PORT" "$VM_USER" "$host"
}

bootstrap() {
  need_cmd ssh || die "ssh is required."
  local host sshcmd
  host="$(detect_vm_host)" || die "Could not determine VM IP. Set VM_HOST explicitly."
  sshcmd="$(ssh_cmd "$host")"
  log "Bootstrapping VM at ${VM_USER}@${host}"

  local tmpfile
  tmpfile="$(mktemp)"
  cat > "$tmpfile" <<'EOS'
#!/usr/bin/env bash
set -euo pipefail

WORKSPACE_DIR="${WORKSPACE_DIR:-$HOME/hermes-workspace}"
AGENT_API_URL="${AGENT_API_URL:-http://127.0.0.1:8642}"

need_cmd() { command -v "$1" >/dev/null 2>&1; }
log() { printf '\n==> %s\n' "$*"; }

if ! xcode-select -p >/dev/null 2>&1; then
  log "Installing Xcode Command Line Tools"
  xcode-select --install || true
  echo "Complete the Xcode CLT install, then re-run this script."
  exit 2
fi

if ! need_cmd brew; then
  log "Installing Homebrew"
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

eval "$(/opt/homebrew/bin/brew shellenv)"
grep -q 'brew shellenv' "$HOME/.zprofile" 2>/dev/null || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> "$HOME/.zprofile"

if ! need_cmd node; then
  log "Installing Node.js 22 via Homebrew"
  brew install node@22
fi

eval "$(/opt/homebrew/bin/brew --prefix node@22)/libexec/bin/node-home.sh" 2>/dev/null || true

if ! need_cmd pnpm; then
  log "Installing pnpm"
  npm install -g pnpm
fi

log "Cloning hermes-workspace"
mkdir -p "$(dirname "$WORKSPACE_DIR")"
if [[ -d "$WORKSPACE_DIR" ]]; then
  log "Workspace already exists, pulling latest"
  cd "$WORKSPACE_DIR" && git pull
else
  git clone https://github.com/outsourc-e/hermes-workspace.git "$WORKSPACE_DIR"
fi

cd "$WORKSPACE_DIR"

log "Installing dependencies"
pnpm install

log "Creating .env from example"
cp .env.example .env
echo "HERMES_API_URL=${AGENT_API_URL}" >> .env

cat > "$HOME/run-hermes-workspace.sh" <<'EOH'
#!/usr/bin/env bash
cd "$HOME/hermes-workspace"
export HERMES_API_URL="${HERMES_API_URL:-http://127.0.0.1:8642}"
pnpm start
EOH
chmod +x "$HOME/run-hermes-workspace.sh"

log "Bootstrap complete."
log "To start workspace: $HOME/run-hermes-workspace.sh"
EOS
  chmod +x "$tmpfile"

  $(ssh_cmd "$host") "cat > /tmp/bootstrap.sh" < "$tmpfile"
  rm -f "$tmpfile"

  $sshcmd "bash /tmp/bootstrap.sh"
}

start_headless() {
  if ! vm_exists "$VM_NAME"; then
    die "VM does not exist. Run 'create-vm' first."
  fi
  log "Starting VM headless"
  lume stop "$VM_NAME" >/dev/null 2>&1 || true
  lume run "$VM_NAME" --no-display --shared-dir "$SHARED_DIR"
}

stop_vm() {
  if vm_exists "$VM_NAME"; then
    log "Stopping VM"
    lume stop "$VM_NAME"
  fi
}

status_vm() {
  echo "VM: $VM_NAME"
  if vm_exists "$VM_NAME"; then
    lume get "$VM_NAME" || true
  else
    echo "Not found"
  fi
}

print_ssh() {
  local host
  host="$(detect_vm_host)" || die "Could not determine VM IP. Set VM_HOST explicitly."
  echo "ssh -p ${VM_PORT} -o StrictHostKeyChecking=accept-new ${VM_USER}@${host}"
}

uninstall_vm() {
  if vm_exists "$VM_NAME"; then
    log "Stopping and deleting VM: $VM_NAME"
    lume stop "$VM_NAME" >/dev/null 2>&1 || true
    lume delete "$VM_NAME"
  fi
}

usage() {
  cat <<EOF
Usage: $0 <command>

Commands:
  create-vm   Create the VM and boot with display for setup
  bootstrap   Install Node.js, pnpm, and hermes-workspace in the VM
  start       Start the VM headless (no VNC window)
  stop        Stop the running VM
  status      Show VM state
  ssh         Print SSH command to connect to the VM
  uninstall   Delete the VM

Env vars:
  VM_NAME, VM_USER, VM_HOST, VM_PORT, SHARED_DIR
  WORKSPACE_DIR, AGENT_API_URL

Examples:
  $0 create-vm
  VM_USER=mark $0 bootstrap
  $0 start
  VM_USER=mark $0 ssh
EOF
}

case "${1:-}" in
  create-vm) ensure_host_requirements; install_lume; create_vm; boot_vm ;;
  bootstrap) bootstrap ;;
  start) start_headless ;;
  stop) stop_vm ;;
  status) status_vm ;;
  ssh) print_ssh ;;
  uninstall) uninstall_vm ;;
  ""|-h|--help) usage ;;
  *) die "Unknown command: $1" ;;
esac