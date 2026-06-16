## Kurzfazit
Kein neuer Codex-Handoff erstellt. Die Queue-Grenze ist erreicht: In `/Users/zondrius/hermes-workspace/handoff/codex-inbox/` liegen bereits 3 offene Handoffs. Nach Guard-Regel darf heute kein weiterer Handoff erzeugt werden. Die sinnvollste Aktion ist Review/Erledigung der bestehenden Queue, zuerst der konkrete Lernwerkstatt-Handoff `codex-handoff-2026-06-15-lernwerkstatt-startseite-entmischen.md` oder die UK-Handoff-Hygiene.

## Gepruefte Quellen
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/handoff/CODEX_HANDOFF_TEMPLATE.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- `/Users/zondrius/hermes-workspace/memory/goals/`
- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-16.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-16.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/reports/business-ideas/business-idea-firework-2026-06-16.md`
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-16.md`
- `/Users/zondrius/hermes-workspace/reports/mission-chain/mission-chain-2026-06-13.md`
- `/Users/zondrius/hermes-workspace/reports/vds-ge/vds-ge-monitor-2026-06-12.md`

## Kandidaten
1. **Lernwerkstatt Startseite entmischen**
   - Quelle: `lernwerkstatt-quality-2026-06-15.md`, `SOFORT_MACHEN: Startseite entmischen und Launcher-Klickpfade gezielt pruefen`.
   - Bewertung: grundsätzlich Codex-geeignet, lokal, klein und testbar.
   - Status: bereits als offener Handoff vorhanden: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-15-lernwerkstatt-startseite-entmischen.md`.
   - Entscheidung: kein Duplikat.

2. **Gartenpost-Miniversuch / Proof-Zeile**
   - Quelle: `decision-inbox-2026-06-16.md`, `hermes-control-2026-06-16.md`, `teacher-nextday-2026-06-15.md`.
   - Bewertung: pädagogisch sinnvoll, aber es ist eine reale Tisch-/Unterrichtsaktion für Chris, keine Codex-Implementierung.
   - Entscheidung: kein Handoff.

3. **Wochenplan-Cron reparieren oder pausieren**
   - Quelle: `hermes-control-2026-06-16.md`.
   - Bewertung: technisch konkret, aber explizit `CHRIS_ENTSCHEIDET`, da Cron-Reparatur/Pause ein Systemeingriff ist.
   - Entscheidung: kein Handoff ohne Freigabe.

4. **Nayyal Drei-Zonen-Hub / Registry**
   - Quelle: `nayyal-hub-radar-2026-06-16.md`, Control Tower.
   - Bewertung: laut Control Tower Sichtbarkeit/Live-Startseite bzw. Positionierung ist Chris-Entscheidung; private/öffentliche Grenzziehung riskant.
   - Entscheidung: kein Handoff.

5. **Business Ideas 2026-06-16**
   - Quelle: `business-idea-firework-2026-06-16.md`.
   - Bewertung: `Type: STOP`, kein `CODEX_HANDOFF_READY`; Fuenferfeld/S-Kiste-Linien geparkt.
   - Entscheidung: kein Handoff.

6. **VDS-GE interne Notiz**
   - Quelle: `vds-ge-monitor-2026-06-12.md`.
   - Bewertung: Lesen/Entscheiden durch Chris bzw. Verbandskontext; keine lokale Codex-Umsetzung.
   - Entscheidung: kein Handoff.

## Erstellter Handoff
- Datei: `keiner`

## Warum / Warum Nicht
- **Hauptblocker:** Es gibt bereits 3 offene Codex-Inbox-Handoffs. Die Queue-Guard-Regel sagt: Bei 3 oder mehr offenen Inbox-Handoffs keinen neuen Handoff erstellen.
- **Keine Duplikate:** Der beste technische Kandidat (`Startseite entmischen`) ist bereits offen.
- **Nicht-Codex-Aufgaben:** Gartenpost-Proof ist eine reale Unterrichts-/Materialhandlung, nicht durch Codex lösbar.
- **Chris-Entscheidungen:** Cron-Reparatur/Pause, Nayyal-Sichtbarkeit und Handoff-Archivierung brauchen Chris-Freigabe.
- **Parkregeln:** Business-Ideen sind heute STOP; Fuenferfeld/Fünferfeld/five-frame und S-Kiste bleiben ineligible.

## Befehlskarte
- Handoff-Entscheidung: nicht erstellt
- Codex-Befehl: keiner
- Chris 5-Minuten-Befehl: Nicht neue Aufgaben starten; entweder Gartenpost-Proof real setzen/parken oder die bestehende Codex-Queue prüfen lassen.
- Hermes-Pruefbefehl: Morgen erneut prüfen, ob zu den 3 offenen Handoffs Outbox-Ergebnisse vorliegen; wenn ja, Review/Archivierung empfehlen statt neuen Handoff.
- Stop-/Park-Befehl: Keine neuen Codex-Handoffs, solange 3 offene Inbox-Handoffs bestehen.
- Warum jetzt / warum nicht: Queue voll und bester Kandidat bereits offen; ein neuer Handoff wäre Duplikat/Überlast.
- Naechster Pruefschritt: Priorität 1 ist `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-15-lernwerkstatt-startseite-entmischen.md` bearbeiten oder Outbox-Ergebnis abwarten; danach UK-Handoff-Hygiene prüfen.
- Nicht-ausfuehren: keine App-Code-Änderung durch diesen Scout, keine Installs, keine Commits/Pushes/Deploys, keine Cron-Änderung, keine Archivierung/Löschung, keine externen Sends, keine sensiblen Daten, kein Fuenferfeld/S-Kiste.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts als neuer Handoff; bestehende Codex-Queue zuerst abarbeiten/reviewen.
- CHRIS_ENTSCHEIDET: Ob offene Handoffs archiviert/geschlossen werden dürfen, wenn passende Ergebnisse vorliegen; ob `WOCHENPLAN_GE_SONNTAG` repariert oder pausiert wird; ob Nayyal öffentlich sichtbar gemacht wird.
- BEOBACHTEN: Outbox auf Ergebnisse zu `codex-handoff-2026-06-15-lernwerkstatt-startseite-entmischen.md`, `codex-handoff-2026-06-14-uk-startkarte-handoff-review.md`, `codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md`.
- SPAETER: Neuer Handoff erst, wenn die offene Queue unter 3 fällt und ein nicht-duplizierender, lokal testbarer Kandidat vorliegt.
- BLOCKIERT: Neue Handoff-Erstellung durch Queue-Guard blockiert.
- NICHT_TUN: keine Handoff-Duplikate, keine Fuenferfeld-/S-Kiste-Reaktivierung, keine Cron-/Git-/Deploy-/Install-/Publishing-/Finanzaktion, keine Arbeit mit echten Schüler- oder Personendaten.
- Naechste kleinste Aktion: Bestehenden Lernwerkstatt-Startseiten-Handoff bearbeiten lassen oder nach Outbox-Ergebnis suchen; heute keinen neuen Handoff anlegen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-06-16.md`
