## Kurzfazit
Green. Ein sicherer, kleiner Codex-Handoff wurde erstellt: GE-Lernwerkstatt-Startseite entmischen und Launcher-Klickpfade pruefen. Nicht geroutet wurden Cron-Reparatur und Nayyal Registry, weil beide laut aktueller Control-/Radar-Lage zuerst Chris-Entscheidung brauchen.

## Gepruefte Quellen
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/handoff/CODEX_HANDOFF_TEMPLATE.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- `/Users/zondrius/hermes-workspace/memory/goals/`
- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/`
- `/Users/zondrius/hermes-workspace/reports/vds-ge/`
- `/Users/zondrius/hermes-workspace/reports/business-ideas/business-idea-firework-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-15.md`
- `/Users/zondrius/hermes-workspace/reports/mission-chain/mission-chain-2026-06-13.md`

## Kandidaten
1. `WOCHENPLAN_GE_SONNTAG` reparieren/pausieren: verworfen, weil aktive Cron-Reparatur/Pause laut Control Tower zuerst Chris-Entscheidung braucht.
2. Nayyal Connector Registry: verworfen, obwohl `CODEX_HANDOFF_READY`, weil der Report selbst `CHRIS_ENTSCHEIDET` nennt und die Sichtbarkeits-/Hub-Strukturentscheidung nicht automatisch getroffen werden soll.
3. Business Ideas 2026-06-15: verworfen, `Type: STOP`, kein Codex-Handoff.
4. Mission Chain UK-Handoff-Review: verworfen als neuer Handoff, weil bereits ein offener Handoff `codex-handoff-2026-06-14-uk-startkarte-handoff-review.md` genau diese Review beauftragt.
5. GE-Lernwerkstatt Startseite entmischen: angenommen. Der aktuelle Lernwerkstatt-Qualitaetsbericht nennt genau diesen kleinen lokalen Slice als `SOFORT_MACHEN`; er ist file-spezifisch, lokal testbar, ohne Install/Deploy/Commit/Push und ohne echte Schuelerdaten.

## Erstellter Handoff
- Datei: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-15-lernwerkstatt-startseite-entmischen.md`

## Warum / Warum Nicht
- Warum erstellt: Klarer sicherer lokaler Lernwerkstatt-Slice aus SOFORT_MACHEN; keine Chris-Freigabe fuer externe oder irreversible Aktion noetig.
- Warum nicht Nayyal: Trotz `CODEX_HANDOFF_READY` blockiert Gate `CHRIS_ENTSCHEIDET` zur lokalen Connector-Registry/Sichtbarkeit.
- Warum nicht Cron: Reparieren oder Pausieren eines aktiven Jobs ist eine Betriebsentscheidung; keine automatische Cron-Aenderung.
- Warum nicht UK-Review: bereits offen, keine Duplikate.
- Queue-Guard: Vor Erstellung lagen 2 offene Inbox-Handoffs vor, also unter der Grenze von 3.
- Datenschutz: Handoff verbietet echte Schueler-/Eltern-/Diagnose-/Foto-/Familien-/Schuldaten und bleibt lokal.

## Befehlskarte
- Handoff-Entscheidung: erstellt
- Codex-Befehl: /goal Verbessere ausschliesslich die Standard-Startseite der GE-Lernwerkstatt: Entmische Kinderstart und Lehrkraft-Dashboard; pruefe Build und Kinder-Startkacheln im Browser; keine neuen Spiele, keine Installs, keine echten Schuelerdaten, keine Deploys/Commits/Pushes.
- Warum jetzt / warum nicht: Der GE-Qualitaetsbericht 2026-06-15 liefert die klarste sichere lokale Sofortaktion; andere Kandidaten sind STOP, bereits offen oder Chris-Entscheid.
- Naechster Pruefschritt: Nach Codex-Rueckgabe Outbox-Datei `codex-result-2026-06-15-lernwerkstatt-startseite-entmischen.md` gegen Akzeptanzkriterien, Build und Browsercheck lesen.
- Nicht-ausfuehren: Keine Fuenferfeld-Linie, keine echten Schuelerdaten, keine neuen Spiele, keine Installs, keine Deploys, keine Commits/Pushes, keine Cron-Aenderungen, keine Nayyal-Live-Aktion.
- Chris 5-Minuten-Befehl: Wenn du Codex heute nutzt, diesen einen Handoff starten; sonst nur offen lassen, keine zweite Baustelle beginnen.
- Hermes-Pruefbefehl: Morgen pruefen, ob eine passende Outbox-Rueckgabe existiert und ob der Kinderstart wirklich ohne Lehrkraft-Dashboard startet.
- Stop-/Park-Befehl: Stoppen, wenn Codex neue Module/Assets/Dependencies vorschlaegt oder die Lehrkraftfunktionen loescht statt sie zu verlagern.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: Codex-Handoff zur GE-Lernwerkstatt-Startseiten-Entmischung bearbeiten lassen.
- CHRIS_ENTSCHEIDET: Cron `WOCHENPLAN_GE_SONNTAG` reparieren oder pausieren; Nayyal Connector Registry lokal anlegen ja/nein; alte UK-Handoffs spaeter archivieren/schliessen.
- BEOBACHTEN: Zwei alte UK-Handoffs bleiben offen; Nayyal Registry bleibt entscheidungsabhaengig; Business Proof Loop bleibt ohne neue Business-Aktion.
- SPAETER: Nach erfolgreichem Startseiten-Slice echter Tablet-/Mobile-Smoke und Symbol-/Asset-Frage, aber nicht heute.
- BLOCKIERT: Cron-Reparatur/Pause ohne Chris-Entscheidung; Nayyal-Hub-Sichtbarkeitsentscheidung ohne Chris.
- NICHT_TUN: Keine Fuenferfeld-Linie, keine neuen Lernspiele, keine externen Sends/Deploys/Commits/Pushes, keine Installs, keine sensiblen Daten.
- Naechste kleinste Aktion: Codex den Handoff `codex-handoff-2026-06-15-lernwerkstatt-startseite-entmischen.md` bearbeiten lassen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/codex-handoff-scout/codex-handoff-scout-2026-06-15.md`
