#!/usr/bin/env bash
set -u

PROJECT_DIR="/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt"
REPORT_DIR="$PROJECT_DIR/reports/health"
HERMES_HOME="/Users/zondrius/.hermes"
KANBAN_DB="$HERMES_HOME/kanban.db"
KANBAN_SHADOW_DB="$HERMES_HOME/kanban/kanban.db"
STAMP="$(date +%Y-%m-%d_%H-%M-%S)"
REPORT="$REPORT_DIR/hermes-health-$STAMP.md"

mkdir -p "$REPORT_DIR"

bytes_to_gb() {
  awk "BEGIN { printf \"%.1f\", $1 / 1024 / 1024 / 1024 }"
}

available_bytes="$(df -k "$HERMES_HOME" | awk 'NR==2 { print $4 * 1024 }')"
available_gb="$(bytes_to_gb "$available_bytes")"
backup_count_before="$(find "$HERMES_HOME" -maxdepth 1 -name 'kanban.db.corrupt*.bak' -type f 2>/dev/null | wc -l | tr -d ' ')"
backup_bytes_before="$(find "$HERMES_HOME" -maxdepth 1 -name 'kanban.db.corrupt*.bak' -type f -exec stat -f '%z' {} + 2>/dev/null | awk '{s+=$1} END {print s+0}')"
backup_gb_before="$(bytes_to_gb "$backup_bytes_before")"

kanban_integrity="unknown"
if [ -s "$KANBAN_DB" ]; then
  kanban_integrity="$(sqlite3 "$KANBAN_DB" 'PRAGMA integrity_check;' 2>&1 | head -1)"
else
  kanban_integrity="missing-or-empty"
fi

shadow_status="ok"
if [ -e "$KANBAN_SHADOW_DB" ] && [ ! -s "$KANBAN_SHADOW_DB" ]; then
  shadow_status="empty-shadow-db-present"
fi

cleanup_action="none"
if [ "$backup_count_before" -gt 200 ] || [ "$backup_bytes_before" -gt 536870912 ]; then
  find "$HERMES_HOME" -maxdepth 1 -name 'kanban.db.corrupt*.bak' -type f -delete
  cleanup_action="deleted-corrupt-kanban-backups"
fi

backup_count_after="$(find "$HERMES_HOME" -maxdepth 1 -name 'kanban.db.corrupt*.bak' -type f 2>/dev/null | wc -l | tr -d ' ')"
available_bytes_after="$(df -k "$HERMES_HOME" | awk 'NR==2 { print $4 * 1024 }')"
available_gb_after="$(bytes_to_gb "$available_bytes_after")"

cat > "$REPORT" <<EOF
# Hermes Health Guard

Datum: $(date)

## Ampel
$(
  if [ "$kanban_integrity" = "ok" ] && awk "BEGIN { exit !($available_gb_after >= 5) }"; then
    echo "Green"
  elif [ "$kanban_integrity" = "ok" ]; then
    echo "Yellow"
  else
    echo "Red"
  fi
)

## Checks
- Freier Speicher vorher: ${available_gb} GB
- Freier Speicher nachher: ${available_gb_after} GB
- Kanban integrity: ${kanban_integrity}
- Shadow-Kanban: ${shadow_status}
- Corrupt-Kanban-Backups vorher: ${backup_count_before} Dateien / ${backup_gb_before} GB
- Corrupt-Kanban-Backups nachher: ${backup_count_after} Dateien
- Cleanup: ${cleanup_action}

## Regeln
- Es wurden nur Dateien nach Muster \`$HERMES_HOME/kanban.db.corrupt*.bak\` geloescht.
- Keine Projektdateien, keine Reports, keine App-Dateien wurden entfernt.
- Bei Kanban-Fehler: nicht weiter an grossen Hermes-Aufgaben arbeiten, zuerst DB reparieren.
EOF

echo "$REPORT"

if [ "$kanban_integrity" != "ok" ]; then
  echo "KANBAN_UNHEALTHY: $kanban_integrity" >&2
  exit 2
fi

if awk "BEGIN { exit !($available_gb_after < 2) }"; then
  echo "LOW_DISK_SPACE: ${available_gb_after} GB" >&2
  exit 3
fi

exit 0
