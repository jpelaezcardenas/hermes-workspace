# Hermes Rollenmatrix v2 - Control Report

Datum: 2026-06-01

## Kurzfazit

Rollenmatrix v2 wurde als sicheres Governance-Goal angelegt. Es wurden keine aktiven Profile, keine Swarm-Code-Dateien, keine Cronjobs und keine Handoff-Dateien geaendert.

Nachtrag am 2026-06-01: Wegen des Nous-Auslaufs am 2026-06-06 wurde spaeter am selben Tag ein separater Nous-to-Codex-Cutover umgesetzt und validiert. Der aktuelle Stand liegt in `/Users/zondrius/hermes-workspace/reports/hermes-control/nous-to-codex-cutover-2026-06-01.md`.

Die wichtigste Entscheidung:

```text
Chris bleibt CEO. Neva wird Chief of Staff / COO. Darunter arbeiten Rollenmodi,
nicht sofort neue Profile. GPT-5.5 ist Premium fuer Build, harte Triage,
finale Produktarchitektur und tiefe Synthese. Routine bleibt darunter.
```

## Angelegt

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/ROLE_MATRIX_V2.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/MODEL_ROUTING_POLICY.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/VALIDATION.md`

## Nicht geaendert

- Keine `/Users/zondrius/.hermes/profiles/*/config.yaml`.
- Keine `/Users/zondrius/.hermes/profiles/*/SOUL.md`.
- Keine `/Users/zondrius/hermes-workspace/src/**`.
- Keine `/Users/zondrius/hermes-workspace/handoff/**`.
- Keine Cronjobs.
- Keine API Keys, Tokens, Provider oder externen Services.

## Neue Rollenlogik

Sofort als Routing-Regel nutzbar:

- `Productklarheit PM`: `ideas` + `schule`, Integration durch `neva`.
- `Paedagogische QA / GE-Testpilot`: `schule`.
- `Builder`: `coder` oder Swarm Builder.
- `Reviewer`: eigener Reviewer-Modus, nicht derselbe Worker als finaler Gatekeeper.
- `RiskGate / Privacy Veto`: `memory`.
- `Research / Sage`: `research`.
- `Scribe / Memory / Handoff`: `memory` oder Scribe.
- `Foundation / Ops`: Foundation oder `coder`.
- `Finance / Scenario`: `finance`.
- `Lab / Experiment`: Lab, isoliert.

## Modell- und Kostenentscheidung

Aktuelle Defaults bleiben unangetastet.

Empfohlen:

- GPT-5.5 fuer echte Build-Slices, harte Triage, finale Productklarheit-Specs und komplexe Synthese.
- GPT-5.4 fuer Review, QA, RiskGate, paedagogische QA und Foundation.
- GPT-5.4-mini fuer Neva-/Memory-Alltag.
- Gemini Flash fuer erste Entwuerfe, Materialideen und breite Scans.
- Kimi K2.6 fuer Finance-/Trend-Kontext.

Besonders wichtig:

- `Scribe` und `Sage` sollten nicht blind auf GPT-5.5 bleiben, wenn sie nur Routine-Doku oder erste Recherche machen.
- `coder` sollte nicht pauschal als Profil auf GPT-5.5 gestellt werden, solange echte Build-Arbeit ueber den Swarm Builder laufen kann.

## Naechster sicherer Slice

Chris reviewt Rollenmatrix v2 und entscheidet eine von drei Optionen:

1. `nur nutzen`: Rollenmatrix bleibt als Routing-Regel ohne Config-Aenderung.
2. `SOUL aktualisieren`: Neva-/Memory-/Coder-SOULs bekommen die Rollenmodi als Textregel, aber keine Modell-Config.
3. `gezielt konfigurieren`: einzelne Swarm-Presets oder Profile werden nach Backup und Freigabe angepasst.

Empfehlung: Option 1 fuer einige echte Durchlaeufe nutzen. Danach hoechstens `Scribe`/`Sage` Modellkosten pruefen und Neva-SOUL minimal aktualisieren.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: Rollenmatrix v2 in echten Neva-Entscheidungen als Routing-Regel nutzen, ohne Config-Aenderung.
- CHRIS_ENTSCHEIDET: Ob spaeter SOUL- oder Modell-Config-Aenderungen umgesetzt werden.
- BEOBACHTEN: Ob `coder` als Builder/Reviewer weiter zu breit ist und ob `Productklarheit PM` ein eigenes Profil braucht.
- SPAETER: Swarm `Scribe`/`Sage` Defaultmodelle kostenbewusst pruefen.
- BLOCKIERT: keine technische Blockade; Config-Aenderung bewusst nicht freigegeben.
- NICHT_TUN: Keine neuen Profile, keine GPT-5.5-Pauschaldefaults, keine Aenderung laufender Execution-Layer-Arbeit.
- Naechste kleinste Aktion: Rollenmatrix v2 einmal bei der naechsten Produkt-/Code-/GE-Entscheidung anwenden und Ergebnis dokumentieren.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/ROLE_MATRIX_V2.md`
