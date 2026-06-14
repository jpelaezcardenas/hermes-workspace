## Kurzfazit

Ein sicherer, konkreter Codex-Handoff wurde erstellt: Gartenpost-Hilfeflow als kleiner Standalone-Slice. Die Codex-Inbox war leer, es gibt kein ähnliches offenes Handoff, und der Kandidat steht in `SOFORT_MACHEN` der heutigen Decision Inbox.

## Gepruefte Quellen

- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/handoff/CODEX_HANDOFF_TEMPLATE.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-20-ge-spielraum-qualitaet/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-20-ge-spielraum-qualitaet/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-05-22.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-05-22.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-21.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-ge-spielraum-pattern.md`

## Kandidaten

1. **Gartenpost-Hilfeflow verbessern**
   - Quelle: `decision-inbox-2026-05-22.md`, `hermes-control-2026-05-22.md`, `testpilot-2026-05-21.md`.
   - Status: geeignet.
   - Begründung: steht in `SOFORT_MACHEN`, ist ein kleiner Standalone-HTML-Slice, lokal prüfbar, ohne echte Schülerdaten, ohne externe Aktion, ohne Installation und ohne App-Integration.

2. **codegraph P2-Sandbox**
   - Quelle: heutige Decision Inbox / Control Tower.
   - Status: nicht geeignet.
   - Begründung: steht unter `CHRIS_ENTSCHEIDET`; keine automatische Sandbox/Installation/Repo-Wahl.

3. **Gartenpost später in React-Lernwerkstatt integrieren**
   - Quelle: heutige Decision Inbox / Control Tower.
   - Status: nicht geeignet.
   - Begründung: steht unter `CHRIS_ENTSCHEIDET` bzw. ist ein späterer größerer Schritt; zuerst Hilfeflow klein prüfen.

4. **VDS-GE-Report prüfen**
   - Quelle: heutige Beobachtung.
   - Status: nicht geeignet.
   - Begründung: kein konkreter Codex-Umsetzungs-Slice; eher Monitoring.

## Erstellter Handoff

- Datei: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-22-gartenpost-hilfeflow.md`

## Warum / Warum Nicht

Warum erstellt:

- Codex-Inbox hat 0 offene Handoffs; Queue-Guard greift nicht.
- Kein ähnlicher offener Handoff vorhanden.
- Keine passende Outbox-Rückgabe zum Hilfeflow vorhanden.
- Der Kandidat ist die nächste dokumentierte sichere Scheibe des aktiven Goal-Strangs `2026-05-20-ge-spielraum-qualitaet`.
- Der Slice ist dateispezifisch: nur `game-lab/gartenpost-prototyp.html` darf geändert werden.
- Akzeptanz ist prüfbar: lokale Runde, drei Hilfeoptionen, Drawer-Verhalten, schmale Breite, Datenschutz-/Externalscan, Ergebnisbericht.

Warum andere Kandidaten nicht erstellt wurden:

- `codegraph` und React-Integration brauchen Chris-Entscheidung.
- GitHub-Trends, VDS-Beobachtung und spätere Asset-/Skill-Vergleiche sind keine sicheren kleinen Codex-Handoffs für heute.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: Codex-Handoff `codex-handoff-2026-05-22-gartenpost-hilfeflow.md` bearbeiten lassen.
- CHRIS_ENTSCHEIDET: Nach Codex-Rückgabe entscheiden, ob Gartenpost Standalone weiter getestet oder später in die React-Lernwerkstatt integriert wird; `codegraph` P2-Sandbox bleibt ebenfalls Entscheidungssache.
- BEOBACHTEN: Ob Codex eine Outbox-Rückgabe `codex-result-2026-05-22-gartenpost-hilfeflow.md` erstellt und ob keine App-Dateien geändert wurden.
- SPAETER: Lizenzsichere lokale Symbolassets; LeseWerk-/React-Slice erst nach geprüftem Hilfeflow.
- BLOCKIERT: nichts.
- NICHT_TUN: Keine Haupt-App-Integration, keine Installationen, keine Commits/Pushes/Deployments, keine externen Assets/APIs, keine echten Schülerdaten.
- Naechste kleinste Aktion: Codex soll den erstellten Handoff öffnen und nur den Gartenpost-Hilfeflow-Slice bearbeiten.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-05-22.md`
