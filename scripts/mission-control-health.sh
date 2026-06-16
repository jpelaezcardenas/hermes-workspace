#!/usr/bin/env bash
set -Eeuo pipefail

printf 'Homelab Mission Control health check\n'
printf 'Checked at: %s\n\n' "$(date --iso-8601=seconds)"

printf 'Host\n'
printf '  hostname: %s\n' "$(hostname)"
printf '  kernel: %s\n' "$(uname -srmo)"
printf '  uptime: %s\n' "$(uptime -p 2>/dev/null || true)"
printf '\n'

printf 'Hermes user services\n'
for svc in hermes-gateway.service hermes-dashboard.service hermes-workspace.service; do
  state="$(systemctl --user is-active "$svc" 2>/dev/null || true)"
  printf '  %-28s %s\n' "$svc" "${state:-unknown}"
done
printf '\n'

printf 'Ports\n'
for port in 3000 8642 9119; do
  if ss -ltn "sport = :$port" 2>/dev/null | grep -q LISTEN; then
    printf '  :%-5s listening\n' "$port"
  else
    printf '  :%-5s not listening\n' "$port"
  fi
done
printf '\n'

printf 'Disk\n'
df -h / /home 2>/dev/null | awk 'NR>1 && !seen[$6]++ {printf "  %-20s used=%-5s avail=%-6s mount=%s\n", $1, $5, $4, $6}'
printf '\n'

printf 'Memory\n'
free -h | awk '/^Mem:/ {printf "  used=%s total=%s available=%s\n", $3, $2, $7} /^Swap:/ {printf "  swap_used=%s swap_total=%s\n", $3, $2}'
printf '\n'

printf 'Hermes API probes\n'
if curl -fsS --max-time 3 http://127.0.0.1:3000/api/ping >/dev/null; then
  printf '  workspace /api/ping: ok\n'
else
  printf '  workspace /api/ping: failed\n'
fi
if curl -fsS --max-time 3 http://127.0.0.1:8642/v1/models >/dev/null; then
  printf '  gateway /v1/models: ok\n'
else
  printf '  gateway /v1/models: failed or requires auth\n'
fi
if curl -fsS --max-time 3 http://127.0.0.1:9119/api/health >/dev/null; then
  printf '  dashboard /api/health: ok\n'
else
  printf '  dashboard /api/health: failed or unavailable\n'
fi
