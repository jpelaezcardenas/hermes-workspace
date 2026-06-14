# Codex Handoff

## Ziel

Pruefe und verbessere einen kleinen Lernwerkstatt-Slice, der aus einem Hermes-Testpilot oder Qualitaetsreport entstanden ist.

## Kontext

Hermes hat in der Decision Inbox `SOFORT_MACHEN` eine konkrete App- oder Prompt-Verbesserung erkannt. Die Aufgabe ist klein genug fuer einen Codex-Durchlauf.

## Dateien

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/`
- konkrete Reportdatei aus `reports/`

## Was Hermes schon gemacht hat

- Report gelesen
- GE-Passung eingeordnet
- Risiko grob bewertet
- eine kleinste naechste Aktion vorgeschlagen

## Was Codex tun soll

- Relevante Dateien lesen
- nur den beschriebenen kleinen Slice bearbeiten oder pruefen
- Ergebnis mit Build/Test/Browser/File-Check belegen
- Rueckgabe in `codex-outbox` schreiben

## Akzeptanzkriterien

- Keine echten Schuelerdaten
- Kein grosser Umbau
- Ergebnis ist verifiziert
- Rueckgabe nennt geaenderte Dateien und offene Risiken

## Risiken

- Aufgabe zu breit
- unklare Reportquelle
- Umsetzung wuerde externe Freigabe brauchen

## Nicht tun

- keine neuen grossen Features
- keine Commits, Pushes, Deploys oder Loeschaktionen ohne Chris
- keine sensiblen Daten speichern

## Rueckgabe erwartet

Codex schreibt:

`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-YYYY-MM-DD-<slug>.md`

