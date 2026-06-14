# Hermes Goal Concreteness Fixes - 2026-06-08

## Kurzfazit
Green. Vier Hermes-Jobs wurden gezielt nachgeschaerft, damit sie bei passenden Signalen nicht nur empfehlen, sondern kleine sichere Arbeitsgrundlagen erzeugen oder Wiederholungen komprimieren.

## Geaenderte Jobs

### VDS_GE_MONITOR_WEEKLY
- Neues Pflichtverhalten: Wenn eine interne 1-Seiten-Notiz empfohlen wird, soll Hermes die Notiz als Begleitartefakt schreiben.
- Zielpfad: `/Users/zondrius/hermes-workspace/reports/vds-ge/vds-ge-internal-note-YYYY-MM-DD.md`
- Zweck: aus VdS-Monitoring wird sofort eine ruhige interne Vorbereitungsnotiz.

### AGENT_TOOLS_SCOUT_SCHULWERKSTATT_WEEKLY
- Neues Pflichtverhalten: Bei genau einem sicheren Testkandidaten soll Hermes eine Sandbox-Testkarte schreiben.
- Zielpfad: `/Users/zondrius/hermes-workspace/reports/agent-tools-scout/tool-sandbox-card-YYYY-MM-DD.md`
- Zweck: Tool-Funde werden kontrolliert testbar statt nur interessant.

### ADMIN_FREITAG_30MIN
- Neues Pflichtverhalten: `## Befehlskarte Freitag` mit genau einer Wochenentscheidung, einer 15-Minuten-Aktion und Zustell-/Fehlerstatus.
- Zweck: Freitag wird echte Wochensteuerung statt reine Bucketliste.

### AI_STOCK_RADAR_DAILY
- Neues Pflichtverhalten: `## Progress changed?` und `COMPRESSED_NO_PROGRESS`.
- Zweck: Wenn sich nichts Wesentliches geaendert hat, wird der Bericht kuerzer und wiederholt nicht endlos dieselben Blocker.

## Goal-Memory Bereinigung
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-ceo-action-loop-v1/GOAL.md`
  - Status von `planned` auf `executed-active` gesetzt.
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-05-hermes-night-app-studio-v2-quality-gate/GOAL.md`
  - Status von `planned` auf `executed-active` gesetzt.

## Schutz
- Keine neuen Cronjobs.
- Keine Schedule-Aenderungen.
- Keine Job-IDs geaendert.
- Keine Deliver-Wege geaendert.
- Kein Deploy.
- Keine externen Sends.
- Keine Logins, Tokens, Installationen, Provider oder privaten Daten.
- Keine Nayyal-/Lernwerkstatt-/LeseWerk-App-Dateien geaendert.

## Backup
`/Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-20260608-before-goal-concreteness-fixes`

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob VdS-Notizen spaeter auch als externe Anfrage vorbereitet werden duerfen; aktuell bleiben sie intern.
- BEOBACHTEN: Naechste Laeufe von VDS_GE_MONITOR_WEEKLY, AGENT_TOOLS_SCOUT_SCHULWERKSTATT_WEEKLY, ADMIN_FREITAG_30MIN und AI_STOCK_RADAR_DAILY auf konkrete Artefakte bzw. Kompression pruefen.
- SPAETER: Nach erfolgreichem Lauf koennen aehnliche Artefakt-Regeln fuer weitere Review-Jobs folgen.
- BLOCKIERT: nichts
- NICHT_TUN: keine Automatik fuer externe Sends, Installationen, Trading, Commits/Pushes oder private Daten.
- Naechste kleinste Aktion: Den naechsten echten Lauf dieser vier Jobs beobachten.
- Beleg / Datei: `/Users/zondrius/.hermes/scripts/hermes_goal_concreteness_check.py`
