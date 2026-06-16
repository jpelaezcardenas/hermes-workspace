# Hermes Control Tower - 2026-06-15

STATE: REVIEW_ONLY
PROFILE/ROLES_USED: neva als Control Tower; keine Spezialagenten gestartet.
SKILLS_USED: hermes-agent-operating-system, hermes-decision-inbox, codex-handoff
FILES_CHANGED: dieser Bericht und Tages-Decision-Inbox.
SOURCES_OR_CONTEXT: lokale Reports, Hermes Status/Doctor, Cron-Liste, Handoff-Ordner, Proof Ledger.

## Ampel
Yellow

## CEO One Move
If Chris has only 20 minutes today:
- Do: Den Cron-Fehler `WOCHENPLAN_GE_SONNTAG` prüfen und entscheiden: Scriptpfad reparieren oder Job pausieren.
- Why: Das ist der einzige echte technische Fehler im heutigen Systemcheck; er betrifft einen aktiven Schul-/GE-Job und verhindert sonntags zuverlässig Output.
- Source: `hermes cron list`: Last run 2026-06-14 error: `Script not found: /Users/zondrius/.hermes/profiles/neva/scripts/weekly_plan_ge_sonntag.py`.
- Do not: Nicht automatisch `hermes doctor --fix`, keine Cron-Aenderung, keine Löschung, kein neues Wochenplan-System und keine Fuenferfeld-Richtung.

## Befehlskarte Heute
- Chris 5-Minuten-Befehl: Öffne den Wochenplan-Cron-Fehler und entscheide: `Scriptpfad reparieren` oder `WOCHENPLAN_GE_SONNTAG pausieren`.
- Codex-Befehl: keiner - Reparatur/Pause eines aktiven Cron-Jobs braucht erst Chris' Entscheidung.
- Hermes-Pruefbefehl: `hermes cron list` und danach gezielt den Job `WOCHENPLAN_GE_SONNTAG` prüfen.
- Proof-Befehl: Kein Real-World-Proof nötig; es ist ein technischer Jobfehler, nicht ein Material-Wirksamkeitsnachweis.
- Stop-/Park-Befehl: Wenn der Sonntags-Wochenplan nicht mehr gebraucht wird, Job nicht reparieren, sondern später bewusst pausieren/löschen lassen.
- Nicht-ausfuehren: Keine automatischen Cron-Edits, keine Script-Neuanlage ohne Auftrag, keine Deploys/Commits/Pushes, keine sensiblen Schülerdaten, keine Fuenferfeld-Aufgaben.

## Model Policy
- Status: Yellow/OK mit kleinem Hygiene-Hinweis.
- `hermes status`: aktives Profil `neva` nutzt `gpt-5.5` über OpenAI Codex; OpenAI Codex auth ist eingeloggt.
- `hermes doctor`: Profile `coder`, `finance`, `ideas`, `lernwerkstatt`, `memory`, `neva`, `research`, `schule` stehen auf `gpt-5.5`.
- Kein aktiver LLM-Job wurde heute als falsches Modell erkannt. Reine Script-Jobs sind modellfrei und daher kein Modellverstoß.

## Wichtigste Beobachtung
- Gateway/Workspace wirkt grundsätzlich gesund: `hermes status` meldet Gateway running, 32 aktive Jobs, 1 aktive Session; `hermes doctor` Exit 0.
- Ein echter Cron-Fehler ist sichtbar: `WOCHENPLAN_GE_SONNTAG` ist aktiv, letzter Lauf error wegen fehlendem Script `weekly_plan_ge_sonntag.py`.
- Handoff-Hygiene bleibt offen: 2 Codex-Inbox-Handoffs (`2026-06-07` und `2026-06-14` UK-Startkarte), keine neue Outbox-Rückgabe seit 2026-06-05.
- Proof Ledger hat unter `## Real Entries` weiterhin keine echten Einträge; daher keine V2-, Produkt-, Night-App- oder Lernwerkstatt-Erweiterung als heutige Sofortaktion.
- Nayyal Radar 2026-06-15 liefert einen Codex-ready Registry-Slice, aber er enthält Sichtbarkeits-/Hub-Entscheidungen und bleibt deshalb bei `CHRIS_ENTSCHEIDET`, nicht `SOFORT_MACHEN`.

## Job-Kontrolle
- active jobs OK / issue: 32 aktive Jobs gefunden; Gateway läuft. Issue: `WOCHENPLAN_GE_SONNTAG` letzter Lauf fehlgeschlagen wegen fehlendem Script.
- suspicious rhythm / prompt issue / none: Kein Modell-Downgrade sichtbar. Hinweis: ein alter Script-Job bleibt aktiv, obwohl das Script im Profilpfad fehlt.
- Hermes Doctor: 3 nicht-akute Hygiene-Hinweise: Config v23→v24, fehlender `~/.local/bin/hermes` Symlink, fehlende optionale API-Keys/Web-Tools. Nicht automatisch beheben.

## Job Hygiene
- Duplikate: Keine neuen Duplikat-Jobs eindeutig belegt; Handoff-Inbox enthält aber zwei ähnliche UK-Startkarten-Handoffs.
- Low-substance loops: Proof-first-Regel bremst aktuell sinnvoll; keine neue Low-Substance-Schleife als heutiger Blocker erkannt.
- Jobs pausieren prüfen: `WOCHENPLAN_GE_SONNTAG`, falls Script nicht repariert werden soll.
- Delivery failures: `WOCHENPLAN_GE_SONNTAG` Telegram-Job lieferte wegen Scriptfehler vermutlich keinen sinnvollen Output; keine Telegram-Gateway-Störung gefunden.

## Execution Score Synthese
- Nayyal Hub Radar 2026-06-15: Score 2 - klare Codex-ready lokale Strukturaktion, aber Chris-Entscheidung vor Handoff nötig.
- Week Architect 2026-06-14: Score 2 - klare Wochenpriorität Gartenpost-Proof, aber alter Report-Date; heute nur Qualitätskontext.
- Evening Execution 2026-06-14: Score nicht vollständig neu ausgelesen; jüngster Abendjob ist alter Report-Date und wird nicht als heutige Anweisung verwendet.
- Proof CEO / Stop Doing 2026-06-14: Score 2 - starke Stop-/Proof-Regeln, aber keine heutige neue Aktion außer Proof-Gate beachten.
- Cron/Doctor-Check 2026-06-15: Score 2 - konkreter technischer Fehler mit kleinster nächster Aktion.

## Decision Inbox Heute
- SOFORT_MACHEN: Den aktiven Cron-Fehler `WOCHENPLAN_GE_SONNTAG` entscheiden: Scriptpfad reparieren oder Job pausieren lassen.
- CHRIS_ENTSCHEIDET: Nayyal Connector Registry lokal anlegen lassen? UK-Startkarten-Handoffs weiter offen lassen oder später archivieren? `hermes doctor --fix`/Config-Migration ausführen? GMEX-Primärquellenfrage manuell prüfen?
- BEOBACHTEN: Proof Ledger bleibt leer; Nayyal Public/Research/Private-Grenzen; GMEX nur als Research-Watch, kein Investment-Signal; VdS-GE letzter Bericht 2026-06-12, nächster Lauf geplant 2026-06-19.
- SPAETER: Nayyal Registry nach Chris-Freigabe; Handoff-Janitor-Regel schärfen; optionale Hermes-Doctor-Hygiene gesammelt statt ad hoc.
- BLOCKIERT: Automatische Wochenplan-Ausgabe sonntags ist durch fehlendes Script blockiert. Automatische Archivierung der UK-Handoffs bleibt ohne Chris-Freigabe blockiert.
- NICHT_TUN: Keine Fuenferfeld-Aufgaben, keine V2/Produktisierung ohne Proof, keine Finanzaktion, keine Provider-/API-Key-Setups, keine Deploys/Commits/Pushes, keine Cron-Änderung automatisch.

## Naechste 3 Mini-Schritte
1. `WOCHENPLAN_GE_SONNTAG` prüfen: Script wiederherstellen/reparieren oder Job bewusst pausieren lassen.
2. Die zwei offenen UK-Startkarten-Handoffs gegen Outbox/aktuellen Bedarf prüfen und nur Status notieren; nicht archivieren ohne Freigabe.
3. Wenn Zeit bleibt: Proof Ledger mit genau einer echten, anonymen Zeile füllen oder bewusst `parked` notieren; keine Erweiterung daraus ableiten.

## Codex-Handoff
- Offene Inbox-Handoffs: 2 (`codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md`, `codex-handoff-2026-06-14-uk-startkarte-handoff-review.md`).
- Neue Outbox-Rueckgaben: keine neue Outbox-Rückgabe seit 2026-06-05 gefunden.
- Sollte ein neuer Handoff erstellt werden? nein. Es gibt bereits offene ähnliche UK-Handoffs; außerdem braucht der Cron-Fehler erst Chris' Entscheidung, ob repariert oder pausiert werden soll. Nayyal Registry ist zwar Codex-ready, aber laut Report zuerst `CHRIS_ENTSCHEIDET`.

## Goal-Execute Strands
- Aktiv/aktuell sichtbar: `2026-06-14-ai-stock-deepdive-ceo-calibration-v1` - kleinste sichere Aktion: keine Investment-Aktion; nur Label-/Datenqualität beobachten. Handoff: keiner nötig.
- Aktiv/aktuell sichtbar: `2026-06-12-hermes-mission-chain-ceo-v1` - kleinste sichere Aktion: offenen UK-Handoff reviewen/statusnotieren. Handoff: es existieren bereits offene UK-Handoff-Dateien.
- GE-Spielraum-Qualitaet: kein frischer eigener Goal-Ordner in den neuesten fünf Goal-Dateien sichtbar; Lernwerkstatt-Berichte bleiben Proof-gated. Fuenferfeld bleibt geparkt.

## Kein Aktionismus
- Keine automatische Reparatur mit `hermes doctor --fix`.
- Keine automatische Cron-Änderung oder Script-Neuanlage.
- Keine neuen Codex-Handoffs, solange zwei ähnliche UK-Handoffs offen sind.
- Keine Nayyal-Live-Deploys, Public-Copy-Änderungen, Logins oder privaten Finanz-/Schuldaten.
- Keine Finanz-Brokeraktion und kein Buy/Sell/Hold.
- Keine Fuenferfeld-/Fünferfeld-Linie.

## Belege
- `hermes status` am 2026-06-15: Gateway running, Modell `gpt-5.5`, Provider OpenAI Codex.
- `hermes doctor` am 2026-06-15: Exit 0, 3 Hygiene-Hinweise.
- `hermes cron list` am 2026-06-15: `WOCHENPLAN_GE_SONNTAG` letzter Lauf error Script not found.
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md`
- `/Users/zondrius/hermes-workspace/reports/week-architect/week-architect-2026-06-14.md` (old report date, nur Kontext)
- `/Users/zondrius/hermes-workspace/reports/mission-chain/mission-chain-2026-06-13.md` (old report date, nur Kontext)

RESULT: Tagesbericht und Decision-Inbox geschrieben.
QUALITY_CHECK: Read-only bis auf Berichtsausgabe; keine sensiblen Daten verarbeitet; alte Reports als alt markiert; genau eine SOFORT_MACHEN-Aktion gewählt.
RISKS: Cron-Reparatur selbst ist noch nicht ausgeführt; Handoff-Inbox kann weiter anwachsen, wenn Chris/Codex nicht entscheidet.
NEXT_ACTION: Chris entscheidet beim Wochenplan-Cron: reparieren oder pausieren.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: `WOCHENPLAN_GE_SONNTAG` prüfen und entscheiden: fehlenden Scriptpfad reparieren oder aktiven Job pausieren lassen.
- CHRIS_ENTSCHEIDET: Cron-Reparatur/Pause; Nayyal Connector Registry lokal anlegen lassen; UK-Handoffs später archivieren/schließen; Hermes-Doctor-Fixes ausführen.
- BEOBACHTEN: Proof Ledger ohne Real Entries; Nayyal Hub Registry-Signal; GMEX nur Research-Watch; VdS-GE nächster Lauf 2026-06-19.
- SPAETER: Handoff-Janitor-Regel und Hermes-Doctor-Hygiene gebündelt bearbeiten.
- BLOCKIERT: Sonntags-Wochenplan-Ausgabe ist durch fehlendes Script blockiert; automatische Handoff-Archivierung ohne Freigabe blockiert.
- NICHT_TUN: Keine Fuenferfeld-Linie, keine V2 ohne Proof, keine Finanzaktion, keine Deploys/Commits/Pushes, keine Cron-Änderung automatisch.
- Naechste kleinste Aktion: Chris gibt kurz frei: `Wochenplan-Cron reparieren` oder `Wochenplan-Cron pausieren`.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-15.md`
