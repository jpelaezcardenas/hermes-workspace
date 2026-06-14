# Hermes Health Guard - Schutzprozess

## Ziel
Der Health Guard verhindert, dass Hermes wieder durch volle Platte, kaputte Kanban-Backups oder eine beschädigte Kanban-Datenbank in Blockaden laeuft.

## Automatische Wartung
Codex-Automation: `Hermes Health Guard`

Rhythmus: alle 12 Stunden

Script:
`/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/scripts/hermes-health-guard.sh`

## Was geprueft wird
- freier Speicher unter `/Users/zondrius/.hermes`
- Integritaet von `/Users/zondrius/.hermes/kanban.db`
- Menge/Groesse von automatisch erzeugten `kanban.db.corrupt*.bak` Dateien
- ob eine leere Shadow-Kanban-Datei unter `/Users/zondrius/.hermes/kanban/kanban.db` existiert

## Was automatisch geloescht werden darf
Nur Dateien nach diesem Muster:
`/Users/zondrius/.hermes/kanban.db.corrupt*.bak`

Keine Projektdateien, keine App-Dateien, keine Reports und keine normalen Datenbanken werden geloescht.

## Ampel
- Green: Speicher ausreichend, Kanban-DB intakt.
- Yellow: Kanban-DB intakt, aber Speicher wird knapp.
- Red: Kanban-DB nicht intakt oder nicht lesbar.

## Regel fuer weitere Hermes-Arbeit
Wenn der Health Guard Red meldet, keine grossen Hermes-Tasks starten. Erst Kanban reparieren oder aus einer geprueften Recovery wiederherstellen.

## Letzter bekannter Zustand
2026-05-30: Green nach Speicherbereinigung und Kanban-Recovery.
