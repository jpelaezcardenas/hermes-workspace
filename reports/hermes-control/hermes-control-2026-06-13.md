# Hermes Control Tower – 2026-06-13

## Ampel
Yellow

## CEO One Move
If Chris has only 20 minutes today:
- Do: Review der offenen Codex-Handoffs: eine Inbox-Datei mit passender Outbox-Rueckgabe markieren und als Review/Archiv-Kandidat notieren (keine Loeschung).
- Why: Handoff-Hygiene ist sicher, lokal, klein und verhindert doppelte Arbeit; mehrere Handoff-Dateien sind vorhanden.
- Source: codex-inbox=1, codex-outbox=11; /Users/zondrius/hermes-workspace/handoff/
- Do not: Fuenferfeld/Fünferfeld wieder aufnehmen; keine Deploys, Commits, Pushes, Installationen, Finanz-/Provider- oder Publishing-Aktionen.

## Befehlskarte Heute
- Chris 5-Minuten-Befehl: Öffne `/Users/zondrius/hermes-workspace/handoff/codex-outbox/` und prüfe die neueste Rückgabe gegen die passende Inbox-Datei; entscheide nur „archivieren / nacharbeiten / ignorieren“.
- Codex-Befehl: keiner – heute erst Handoff-Hygiene/Review, keine neue Aufgabe duplizieren.
- Hermes-Pruefbefehl: Morgen erneut Control Tower laufen lassen und prüfen, ob geprüfte Outbox-Rückgaben aus der Inbox entfernt/archiviert wurden.
- Proof-Befehl: Falls ein Lernwerkstatt-/Materialartefakt betroffen ist: nur als kleine TEST_CARD im Alltag prüfen, keine V2/Productization ohne Proof-Ledger-Eintrag.
- Stop-/Park-Befehl: Fuenferfeld-Linie bleibt geparkt; unbewiesene Erweiterungen bleiben Beobachtung/Später.
- Nicht-ausfuehren: keine neuen Broad-Goals, keine externen Aktionen, keine Käufe/Installs, keine sensiblen Schülerdaten, keine automatischen Löschungen.

## Model Policy
- Dieser Cron läuft laut Auftrag mit `gpt-5.5` via `openai-codex`; kein Providerwechsel vorgenommen.
- Enabled-LLM-Jobs wurden nur über verfügbare Übersichten/CLI-Ausgaben geprüft; wenn einzelne Jobs dort kein Modell ausweisen, ist das eine gelbe Transparenzlücke, kein bestätigter Fehler.

## Execution Score Synthese
- Handoff-Hygiene: 2 (konkrete nächste Aktion, lokale Prüfung möglich).
- Report-/Scout-Signale: 1–2, sofern sie nur Empfehlungen ohne neues Artefakt enthalten.
- Unbewiesene App-/Materialausweitung: 0–1 und daher nicht SOFORT_MACHEN.

## Wichtigste Beobachtung
- Handoff-Hygiene ist heute der sicherste Nutzenhebel: Inbox `1`, Outbox `11`, Archive `11`.
- Fuenferfeld ist durch Chris geparkt und wird nicht als Tagesaktion gewählt.
- Control-Job bleibt read-only: keine Code-, Memory-, Cron-, Git- oder Löschaktionen durchgeführt.
- Proof-Regel bleibt aktiv: ohne echten Nutzungsnachweis keine V2, Expansion oder Produktisierung.
- Gateway/Workspace wirkt aus Dateisicht nutzbar, aber Live-Gateway wurde nicht destruktiv getestet.

## Job-Kontrolle
- active jobs OK / issue: geprueft; Details siehe Belege (keine automatische Aenderung)
- suspicious rhythm / prompt issue / none: keine harte Störung belegt; mögliche Transparenzlücke bei Modell-/Jobdetails nur beobachten.
- Cron-Auszug: `['┌─────────────────────────────────────────────────────────────────────────┐', '│                         Scheduled Jobs                                  │', '└─────────────────────────────────────────────────────────────────────────┘']`

## Job Hygiene
- Duplicates: nicht final belegt; Handoff-Duplikate nur nach Review von Inbox/Outbox beurteilen.
- Low-substance loops: keine automatische Pause empfohlen ohne zwei belegte schwache Läufe.
- Delivery failures: nicht belegt.
- Empfehlung: erst Outbox-vs-Inbox prüfen, dann archivieren lassen; keinen neuen Handoff erzeugen.

## Goal-Execute / aktive Stränge
- Geprüfter Ordner: `/Users/zondrius/hermes-workspace/memory/goals/`
- Gefundene aktuelle Goal-Dateien: 0
- Kleinste sichere Aktion: nur Status lesen und Handoff-Bezug prüfen; keine neuen Goals starten.
- GE-Spielraum-Qualitaet: in den täglichen Scan einbezogen, sofern als Goal-/Reportdatei vorhanden; keine automatische Umsetzung.

## Decision Inbox Heute
- SOFORT_MACHEN: Review der offenen Codex-Handoffs: eine Inbox-Datei mit passender Outbox-Rueckgabe markieren und als Review/Archiv-Kandidat notieren (keine Loeschung).
- CHRIS_ENTSCHEIDET: Archivieren/Löschen/Schließen von Handoffs; externe Veröffentlichungen; Provider-/Finanz-/Account-Aktionen; jede schülerbezogene Bewertung.
- BEOBACHTEN: Modelltransparenz einzelner Jobs; wiederkehrende Scout-Signale; Nayyal-Hub nur lokal/konzeptionell ohne Deploy.
- SPAETER: Unbewiesene V2-/Produktisierungs-Ideen; breite App- oder Mission-Chain-Ausweitungen.
- BLOCKIERT: nichts
- NICHT_TUN: Fuenferfeld reaktivieren; neue breite Codex-Aufgaben erzeugen; Handoffs duplizieren; ungeprüfte GitHub-Repos produktiv integrieren.

## Naechste 3 Mini-Schritte
1. Prüfe neueste Codex-Outbox-Rückgabe gegen passende Inbox-Datei und notiere Review/Archiv-Kandidat.
2. Öffne Proof-Ledger und markiere nur real getestete Artefakte als `tested_useful` oder `tested_not_useful` (falls Chris Feedback hat).
3. Lies den neuesten Week-Architect-/Mission-Chain-Bericht nur als Rahmen; keine zusätzliche SOFORT-Aktion daraus ableiten.

## Codex-Handoff
- Offene Inbox-Handoffs: 1 (codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md)
- Neue Outbox-Rueckgaben: 11 (codex-result-2026-05-20-ge-spielraum-pattern.md, codex-result-2026-05-22-gartenpost-hilfeflow.md, codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md, codex-result-2026-05-28-ge-spielraum-schmale-viewport.md, codex-result-2026-05-23-hermes-janitor-script.md)
- Sollte ein neuer Handoff erstellt werden? nein – erst vorhandene Outbox/Inbox schließen, keine Duplikate.

## Kein Aktionismus
- Keine Fuenferfeld-Aktionen.
- Keine automatischen Cron-/Job-Änderungen.
- Keine Löschung/Archivierung ohne Chris-Freigabe.
- Keine Deploys, Commits, Pushes, Installationen oder externen Veröffentlichungen.
- Keine Verarbeitung realer Schüler-, Eltern-, Gesundheits-, Finanz- oder Secret-Daten.

## Belege
- Cron: `hermes cron list` (read-only)
- Kanban: `hermes kanban list` (read-only; falls CLI-Ausgabe begrenzt, nicht als Vollprüfung werten)
- Handoff-Zähler: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`, `codex-outbox/`, `archive/`
- /Users/zondrius/Documents/New project 6/hermes-jobs-overview.md
- /Users/zondrius/Documents/New project 6/hermes-integration-cockpit.md
- /Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md
- /Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-mission-chain-ceo-setup-2026-06-12.md
- /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-execution-boost-setup-2026-06-12.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-12.md
- /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-11.md
- /Users/zondrius/hermes-workspace/reports/evening-execution/evening-execution-2026-06-12.md
- /Users/zondrius/hermes-workspace/reports/vds-ge/vds-ge-internal-note-2026-06-12.md
- /Users/zondrius/hermes-workspace/reports/vds-ge/vds-ge-monitor-2026-06-12.md
- /Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-13.md
- /Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-12.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-11.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-06-11.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-06-07.md
- /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-05-24.md
- /Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md
- /Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-06-05-ge-mengen-legen-schmalansicht.md
- /Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-31-ge-minikisten-checkliste.md
- /Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-28-ge-spielraum-schmale-viewport.md
- /Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-26-lesewerk-startklarheit-kinderpfad.md
- /Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-22-gartenpost-hilfeflow.md
- /Users/zondrius/hermes-workspace/handoff/archive/codex-handoff-2026-06-04-ge-mengen-legen-schmalansicht.md
- /Users/zondrius/hermes-workspace/handoff/archive/codex-handoff-2026-05-31-ge-minikisten-checkliste.md
- /Users/zondrius/hermes-workspace/handoff/archive/codex-handoff-2026-05-28-ge-spielraum-schmale-viewport.md
- /Users/zondrius/hermes-workspace/handoff/archive/codex-handoff-2026-05-26-lesewerk-startklarheit-kinderpfad.md
- /Users/zondrius/hermes-workspace/handoff/archive/codex-handoff-2026-05-22-gartenpost-hilfeflow.md

## Rohsignale kurz
### /Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md
# Hermes Codex Handoff

Stand: 2026-06-12

Zweck:
Hermes kann Aufgaben fuer Codex hier sauber ablegen. Codex kann Ergebnisse strukturiert zurueckgeben. So bleiben automatische Hermes-Jobs, Decision Inbox und Codex-Umsetzung verbunden.

## Ordner

| Ordner | Zweck |
|---|---|
| `/Users/zondrius/hermes-workspace/handoff/codex-inbox/` | Aufgaben, die Codex bearbeiten soll |
| `/Users/zondrius/hermes-workspace/handoff/codex-outbox/` | Rueckgaben von Codex an Hermes |
| `/Users/zondrius/hermes-workspace/handoff/archive/` | erledigte oder alte Uebergaben |
| `/Users/zondrius/hermes-workspace/handoff/examples/` | Beispiele, keine echten offenen Aufgaben |

## Vorlage

Nutze:

`/Users/zondrius/hermes-workspace/handoff/CODEX_HANDOFF_TEMPLATE.md`

## Regel

Hermes legt nur dann ein Codex-Handoff an, wenn aus der Decision Inbox eine konkrete Umsetzung, Pruefung oder Reparatur entsteht. Beobachtungen ohne klare Handlung bleiben in `BEOBACHTEN` oder `SPAETER`.

## Aktuelle Handoff-Lage

Offene Codex-Inbox-Handoffs:
- `codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md`: offen, keine passende Outbox-Rückgabe gefunden.

## Zuletzt abgeschlossene Handoffs

- `codex-handoff-2026-05-18-le
### /Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md
# Hermes Proof Ledger

Purpose:
Track whether a Hermes idea, app, card, report or research signal was actually tested or useful. This is not a diary and not a performance log.

Rules:
- No real student names, diagnoses, photos, family details, health data, broker data, account data, private cash numbers or secrets.
- Keep one line short.
- If there is no proof, Hermes must not claim real-world usefulness.
- Proof status values: `untested`, `tested_useful`, `tested_not_useful`, `parked`.

Format:

```text
YYYY-MM-DD | area | artifact_or_idea | proof_status | proof_note | next_action
```

Examples:

```text
2026-06-10 | Schule | Gartenpost/Zustellen | untested | vorbereitet, aber noch nicht genutzt | morgen nachtragen
2026-06-10 | Night App | Vertretungsstunden-Assistent GE | untested | nur lokaler Flow belegt | 60-Sekunden-Sichttest
2026-06-10 | Investment | GMEX/NBIS/DUKR Research Watch | parked | keine neue Primaerquelle | Sonntag Thesis Lab lesen
```

## Real Entries

Only lines below this heading are real proof entries. Hermes jobs must ignore the examples, format line, headings and instructions above.

### /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-mission-chain-ceo-setup-2026-06-12.md
# Hermes Mission Chain CEO Setup - 2026-06-12

## Kurzfazit

Green. `HERMES_MISSION_CHAIN_CEO_WEEKLY` wurde als woechentlicher Loop fuer grosse Updates, Apps und Website-/Systemmissionen angelegt.

## Zweck

Der Job verhindert Mega-Prompts und zerlegt grosse Vorhaben in eine Mission Chain:

`Spec -> Slices -> Codex Handoff Drafts -> QA -> Proof`

Damit grosse Updates nicht als unkontrollierte Einzelaufgabe starten, sondern als kleine, pruefbare Kette.

## Job

- Name: `HERMES_MISSION_CHAIN_CEO_WEEKLY`
- ID: `1c6f8e2a4d90`
- Schedule: Samstag 20:30 Europe/Berlin (`30 20 * * 6`)
- Modell: `gpt-5.5`
- Provider: `openai-codex`
- Delivery: Telegram
- Workdir: `/Users/zondrius/hermes-workspace`

## Output

- Reportpfad: `/Users/zondrius/hermes-workspace/reports/mission-chain/mission-chain-YYYY-MM-DD.md`
- Pro Lauf maximal eine Mission.
- Mission enthaelt Spec, 3-6 Slices, Slice 1, Acceptance Criteria, QA-Gate und Proof-Gate.
- Codex-Handoff-Dateien werden nicht direkt erstellt.

## Loop-Anbindung

- `HERMES_CONTROL_DAILY` liest Mission-Chain-Reports.
- `CODEX_HANDOFF_SCOUT_DAILY` liest Mission-Chain-Reports und darf only route Slice 1.
- Handoff Scout darf Slice 1 nur routen, wenn der Sl
### /Users/zondrius/hermes-workspace/reports/evening-execution/evening-execution-2026-06-12.md
# Hermes Evening Execution Slot - 2026-06-12

## Kurzfazit
Green. Heute wird keine neue Idee erzeugt; die beste Ausführung ist eine copy-ready Proof-Ledger-Komfortkarte für die bereits benannte Morgen-CEO-Aktion.

## Sources Used
- `/Users/zondrius/hermes-workspace/reports/night-loop/morning-ceo-2026-06-12.md`
- `/Users/zondrius/hermes-workspace/reports/night-loop/life-card-2026-06-12.md`
- `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md`
- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-12.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-12.md`

## Execution Result
- Type: PROOF_ERFORDERLICH
- Name: Proof-Ledger Komfortkarte fuer `Tisch decken 1:1-Zuordnung`
- Path: `/Users/zondrius/hermes-workspace/reports/evening-execution/evening-execution-2026-06-12.md`
- Why this one: Morning CEO, Life Card, Decision Inbox und Control Tower zeigen alle auf dieselbe kleine, sichere Aktion. Das Proof-Ledger hat noch keine echte Real-Entry-Zeile; deshalb ist Schließen der Proof-Lücke wertvoller als ein neues Artefakt, eine App-V2 oder ein Handoff.
- Execution Score: 3

## Proof-Ledger Komfortkarte
- Copy-
### /Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-13.md
# Nayyal Public / Research / Private Map - 2026-06-13

## Public
- Purpose: Aussenorientierung fuer Besucher: Was ist Nayyal, welche Welten gibt es, und welche Bereiche sind bewusst privat oder passwortgeschuetzt.
- Allowed routes/examples: `https://www.nayyal.com/` as public gate/landing; public-safe teaser sections for Schulwerkstatt, LeseWerk, Wahren Playbook, Hermes OS, demo catalog or changelog only after Chris approves visibility.
- What stays hidden: passwords, private cockpit content, school-private context, student/parent data, personal finance data, broker/order/cash/portfolio details, private expense data, unpublished internal decisions.
- Trust rule: Public pages explain boundaries before they advertise products: no real student data, no finance advice, no automatic trading, no login bypass, no priva

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Review der offenen Codex-Handoffs: eine Inbox-Datei mit passender Outbox-Rueckgabe markieren und als Review/Archiv-Kandidat notieren (keine Loeschung).
- CHRIS_ENTSCHEIDET: Archivieren/Löschen/Schließen von Handoffs; externe Veröffentlichung; Provider-/Finanz-/Account-Aktionen; sensible Schülerentscheidungen.
- BEOBACHTEN: Job-Modelltransparenz, Scout-Wiederholungen, Nayyal nur lokal/konzeptionell, Mission-Chain nur mit sicherem Slice.
- SPAETER: Unbewiesene V2s, Produktisierung, breite App-Ausweitungen.
- BLOCKIERT: nichts
- NICHT_TUN: Fuenferfeld reaktivieren; neue Codex-Duplikate; automatische Installs/Deploys/Commits/Deletes.
- Naechste kleinste Aktion: neueste Codex-Outbox gegen passende Inbox prüfen und Review/Archiv-Kandidat markieren.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-13.md
