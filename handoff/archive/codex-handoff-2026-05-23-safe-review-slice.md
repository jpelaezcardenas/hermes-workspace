# Archiviert: Codex Handoff

Status: stale/duplicate und archiviert am 2026-05-26
Ergebnis: `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-23-safe-review-slice.md`

## Ziel

Einen kleinen, lokalen Review-/Validierungsschnitt aus dem aktuellen Hermes-Report prüfen und als Ergebnisbericht zurückgeben, ohne produktive Änderungen auszuführen.

## Kontext

Auslöser ist der aktuelle Report unter:

- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-23.md`

Relevanter Decision-/Next-Action-Ausschnitt:

```text
     1|# Daily Decision Inbox – 2026-05-23
     2|
     3|Quelle: Hermes Control Tower Tageslauf.
     4|
     5|## Gesammelte Signale
     6|- Ampel: Yellow
     7|- Ausgewertete Decision-Inbox-Blöcke: 16
     8|- Codex-Inbox: 1 Datei(en)
     9|- Codex-Outbox: 4 Datei(en)
    10|- Aktive Goal-Stränge: 15
    11|
    12|## Decision Inbox
    13|- Signal: Yellow
    14|- SOFORT_MACHEN: Fehlendes Janitor-Script prüfen/reparieren oder Cronjob deaktivieren lassen: `HERMES_HANDOFF_JANITOR_DAILY` findet `/Users/zondrius/.hermes/profiles/neva/scripts/handoff_janitor.py` nicht.
    15|- CHRIS_ENTSCHEIDET: `codegraph` P2-Sandbox ja/nein; später Gartenpost Standalone weiter testen vs. React-Lernwerkstatt-Integration. (decision-inbox-2026-05-22.md); Ob der taegliche Codex-App-Material-Scout langfristig taeglich bleiben soll oder spaeter auf 3x/Woche reduziert wird. (hermes-job-update-2026-05-20.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (hermes-control-2026-05-20.md); Ob `millionco/react-doctor` in einer rein lokalen Wegwerf-Sandbox getestet werden soll; ob `codegraph` P2 in einem nicht-sensiblen Demo-/Throwaway-Repo getestet werden darf; ob lokale lizenzsichere Symbol-/Bildassets später geplant werden. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); 1 Codex-Handoff(s) warten auf Entscheidung/Weitergabe; nichts automatisch starten.; 1 Codex-Outbox-Rückgabe(n) warten auf menschliche Sichtung.; Stale/Blocked/Ready/Triage-Kanban-Zeilen prüfen, falls sie aktive Arbeit blockieren. (decision-inbox-2026-05-20.md)
    16|- BEOBACHTEN: VDS-GE-Report-Verzeichnis; heutiger 10:30-Handoff-Scout; GitHub-Signale `chrome-devtools-mcp`, `CLI-Anything`, `notebooklm-py`, `forge`, `oh-my-pi`. (decision-inbox-2026-05-22.md); Echte Tablet-/Mobilansicht und kompletter Symbol-Garten-Durchlauf sind noch nicht geprüft; Ob `CODEX_HANDOFF_SCOUT_DAILY` durch den Queue-Guard weniger Handoff-Stau erzeugt. (hermes-job-update-2026-05-20.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich. (hermes-control-2026-05-20.md); Laufender LeseWerk-Task `t_783a3a3c` und Folge-Task `t_daf91551`; offenen Codex-Handoff `lernwerkstatt-mengen-spielraum`; GitHub-Signale `openhuman`, `academic-research-skills`, `CLI-Anything`, `scientific-agent-skills`, `tech-leads-club/agent-skills`, `codegraph`, `agentmemory`. (hermes-control-2026-05-19.md) (decision-inbox-2026-05-21.md); GE-Lernwerkstatt-Dateien/Reports vorhanden; Fortschritt beobachten, keine große Mission automatisch starten.; Recurring Reports liefern Decision-Inbox-Blöcke; Control-Tower-Sammlung funktioniert grundsätzlich. (decision-inbox-2026-05-20.md)
    17|- SPAETER: Skill-Design-Vergleich aus Plugin-/Skill-Repos; lizenzsichere lokale Symbolassets; LeseWerk-Qualitätsjob nach weiteren Läufen bewerten. (decision-inbox-2026-05-22.md); Nach zwei Wochen pruefen, ob `LESEWERK_QUALITY_WEEKLY` nuetzliche Folgeprompts liefert. (hermes-job-update-2026-05-20.md); Lernwerkstatt-/Workspace-Verbesserungen nur als kleine Slices, nicht als neue Großmission. (hermes-control-2026-05-20.md); `supertonic` nur prüfen, wenn lokale deutsche TTS wieder Priorität bekommt; `12-factor-agents` bei nä
```

Hermes-Codex-Handoff-Scout hat diesen Punkt als potenziell kleine, lokal prüfbare Aufgabe erkannt. Falls beim Öffnen klar wird, dass der Punkt doch breit, riskant oder bereits erledigt ist: nicht implementieren, sondern im Resultat begründet abbrechen.

## Dateien

Primär prüfen:

- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-23.md`

Optionaler Kontext, nur lesend:

- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/`

## Was Hermes schon gemacht hat

- Neueste Decision-/Control-/Lernwerkstatt-/VdS-Reports gesichtet.
- Queue-Guard geprüft: aktuell weniger als 3 offene Codex-Inbox-Handoffs.
- Keine automatische externe Aktion, kein Commit, kein Push, kein Deployment beauftragt.

## Was Codex tun soll

1. Den Auslöser-Report lesen und den dort genannten kleinen nächsten Schritt präzise identifizieren.
2. Lokal und nur lesend prüfen, ob dieser Schritt bereits erledigt, dupliziert, riskant oder sinnvoll als nächster kleiner Slice ist.
3. Wenn eine kleine sichere Dateiprüfung oder Prompt-/Skill-/Report-Validierung möglich ist, diese durchführen.
4. Keine produktiven Codeänderungen erzwingen. Falls minimale Textkorrekturen in nicht-sensiblen Hermes-/Report-/Skill-Dateien notwendig und sicher sind, diese nur dann vornehmen, wenn sie direkt zum geprüften Slice gehören.
5. Ergebnis in die Outbox schreiben.

## Akzeptanzkriterien

- Ergebnisdatei existiert unter `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-23-safe-review-slice.md`.
- Ergebnis nennt: geprüfte Dateien, konkrete Befunde, ggf. geänderte Dateien, Checks, Rest-Risiken und nächste kleine Aktion.
- Keine Installationen, Commits, Pushes, Deployments, Löschungen oder externen Sends wurden ausgeführt.
- Keine realen Schülerdaten oder sensiblen personenbezogenen Daten wurden verarbeitet oder gespeichert.
- Wenn der Task nicht sicher klein ist, enthält das Ergebnis einen klaren Abbruchgrund statt Umsetzung.

## Risiken

- Der Report-Ausschnitt kann zu breit oder bereits veraltet sein.
- Ähnliche Arbeit kann in einer bestehenden Outbox-Datei liegen; dann nicht duplizieren.
- Lernwerkstatt-/Schulkontext kann sensibel sein: nur anonymisierte oder generische Daten anfassen.

## Nicht tun

- Keine App breit umbauen.
- Keine Installationen oder neuen Tools einrichten.
- Keine Commits, Pushes, Deployments, Veröffentlichungen, externen Nachrichten oder Käufe.
- Keine echten Schüler-, Eltern-, Kollegiums- oder Verbandsdaten verwenden.
- Keine Löschaktionen oder Archivierungen ohne ausdrückliche Freigabe.

## Rueckgabe erwartet

Schreibe den Ergebnisbericht nach:

`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-23-safe-review-slice.md`

Der Bericht soll enthalten:

- was getan wurde;
- Dateien geändert oder nur gelesen;
- Checks;
- verbleibende Risiken;
- was Hermes merken oder ignorieren soll;
- nächste kleine Aktion.
