# Hermes Control Tower — 2026-06-12

STATE: completed-readonly
PROFILE/ROLES_USED: neva; Control Tower; keine Subagents
SKILLS_USED: hermes-agent-operating-system, hermes-decision-inbox, codex-handoff, hermes-agent
FILES_CHANGED: dieser Report und `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-12.md`
SOURCES_OR_CONTEXT: lokale Reports, Cron-/Gateway-/Kanban-Status, Handoff-Ordner, Goal-Ordner

## Ampel
Yellow

## CEO One Move
If Chris has only 20 minutes today:
- Do: 1 Platzset, 1 Teller, 1 Becher und die Karten **Hilfe / Pause / Fertig** fuer morgen bereitlegen.
- Why: Das ist der klarste gruene, sichere Unterrichts-/Materialschritt aus dem neuesten Teacher-Nextday-Report; keine App-Erweiterung, keine sensiblen Daten, kein Fuenferfeld.
- Source: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-11.md`
- Do not: Keine digitale Erweiterung, keine zweite Station, kein Fuenferfeld, kein Codex-Handoff fuer diese reale Unterrichtserprobung.

## Befehlskarte Heute
- Chris 5-Minuten-Befehl: `Platzset mit zwei Feldern zeichnen, Teller und Becher danebenlegen, Hilfe/Pause/Fertig-Karten dazulegen.`
- Codex-Befehl: keiner — heutiger bester Schritt ist reales Material/Proof, nicht Code.
- Hermes-Pruefbefehl: Nach Nutzung kurz ins Proof-Ledger oder in eine Notiz schreiben: `Tisch decken: Was hat Beteiligung geoeffnet — Vormachen, weniger Auswahl, gemeinsame Handlung oder UK-Karte?`
- Proof-Befehl: 1 kurzer Realtest mit dem Tischauftrag; kein V2/Produktversprechen ohne Rueckmeldung.
- Stop-/Park-Befehl: Fuenferfeld bleibt geparkt; Nayyal live/public bleibt bis Chris-Entscheidung blockiert.
- Nicht-ausfuehren: keine Installs, Commits, Pushes, Deploys, Publikationen, Trades, Loeschungen, externe Sends oder sensible Datenverarbeitung.

## Model Policy
- Aktiver Job-Kontext: dieser Cronlauf laeuft mit `gpt-5.5` via `openai-codex`.
- Check: `hermes --profile neva cron list --all` zeigt 30 aktive Jobs; geparste `jobs.json` ergab keine aktive LLM-Job-Abweichung von `gpt-5.5/openai-codex`. No-agent-Scriptjobs sind ausgenommen.
- Finding: Green/Yellow — Modellpolitik wirkt konsistent; alte Goal-Dateien enthalten historische abweichende Zielmodelle, sind aber keine Live-Job-Abweichung.

## Wichtigste Beobachtung
- Gateway und Cron wirken grundsaetzlich gesund: Gateway laeuft als LaunchAgent, Cron meldet 30 aktive Jobs, naechster Lauf 2026-06-12 10:30.
- Handoff-Hygiene ist ueberschaubar: 1 offene Codex-Inbox-Datei (`uk-startkarte-fachfremde-kollegen`), keine neue passende Outbox-Rueckgabe seit 2026-06-05.
- Neuester Nayyal-Radar bleibt ein Chris-Entscheidungspunkt: Public/Research/Private-Grenze bestaetigen oder aendern; keine Live-Hub-Aktion automatisch.
- GE/Lernwerkstatt liefert heute einen gruenen Praxishebel: Tisch-decken-Material statt digitaler Erweiterung.
- Kanban ist nicht leer: 2 blocked und 2 todo; das sieht nach alter Hygiene/Swarm-Restarbeit aus, nicht nach akutem Gateway-Ausfall.

## Job-Kontrolle
- active jobs OK / issue: ueberwiegend OK; 30 aktive Jobs, Gateway laeuft.
- suspicious rhythm / prompt issue / none: Yellow wegen hoher Jobzahl und wiederkehrender CEO-/Night-/Business-Reports; aktuell aber durch Week Architect und Control-Tower-Regeln gebremst.
- Auffaellig:
  - `ADMIN_FREITAG_30MIN` letzter Lauf 2026-06-05 mit Telegram/DNS-Delivery-Fehler; naechster Lauf heute 15:45 beobachten, nicht vorher reparieren.
  - `WOCHENPLAN_GE_SONNTAG` letzter Lauf hatte Broken Pipe, ist laut Cronbeschreibung seit 2026-06-07 auf no-agent Script fixiert; naechsten Sonntag pruefen.
  - `NIGHT_APP_STUDIO_BRIEFING_DAILY` ist pausiert; das passt zur Night-Loop-Umstellung, kein Sofortproblem.

## Job Hygiene
- Duplicates: keine eindeutigen aktuellen Duplikatjobs erkannt; Night-App-Briefing ist pausiert, Morning-CEO uebernimmt Zusammenfassung.
- Low-substance loops: Business Firework und Night App Studio weiter beobachten; gestrige Fix-Reports sagen bereits, keine zweite Tagesaktion erzwingen.
- Jobs, die ggf. spaeter pausiert werden koennten: Business Firework nur, wenn weiter Nebenimpulse statt Proof/CEO-Move liefert; Stock-Teilreports nur, wenn Telegram-Rauschen wieder steigt.
- Delivery failures: Admin-Freitag hatte Telegram/DNS-Fehler; AI Stock Deepdive hatte fruehere Telegram-Delivery-Warnung. Keine automatische Reparatur heute.

## Blocked / Stale / Running
- Kanban stats: triage 0, ready 0, running 0, blocked 2, todo 2, done 377.
- Blocked:
  - `t_f4b02334` — All-Areas GE-Didaktik und Leselogik Qualitaetsmatrix.
  - `t_c6457ae1` — All-Areas App-Feeling Routes Fullscreen Tests Browser Audit.
- Todo:
  - `t_c958a9a9` — Verify swarm outputs.
  - `t_89f3d2e1` — Synthesize swarm outputs.
- Bewertung: wahrscheinlich alte breite Swarm-/Qualitaetsmatrix-Reste; nicht als heutiger echter Blocker behandeln, aber spaeter gezielt archivieren oder in kleine Review-Slices schneiden.

## Active Goals / Strands
- `2026-06-11-hermes-wochenarchitekt-loop-v1`: aktiv installiert; kleinste sichere Aktion ist erster Sonntag-Lauf am 2026-06-14 pruefen. Kein Codex-Handoff noetig.
- `2026-06-05-hermes-ceo-action-loop-v1`: executed-active; kleinste sichere Aktion ist Tages-Move real testen statt weitere Automatik bauen. Kein neuer Handoff.
- `2026-06-05-hermes-night-app-studio-v2-quality-gate`: executed-active; kleinste sichere Aktion ist Proof/Review, keine V2 ohne echten Test. Kein neuer Handoff.
- `2026-06-01-hermes-business-idea-firework-daily-v1`: installiert; beobachten, ob keine zweite Tagesaktion erzeugt wird. Kein neuer Handoff.
- GE-Spielraum-Qualitaet: aktiv als Kontext, aber Fuenferfeld ist von Chris geparkt; naechste sichere Richtung ist nicht-Fuenferfeld/UK/Tischhandlung.

## Decision Inbox Heute
- SOFORT_MACHEN
  - 1 Platzset, 1 Teller, 1 Becher und Hilfe/Pause/Fertig-Karten bereitlegen.
- CHRIS_ENTSCHEIDET
  - Nayyal Public/Research/Private-Grenze bestaetigen oder aendern.
  - Ob die offene UK-Startkarte fuer fachfremde Kolleg:innen noch priorisiert ist oder geparkt wird.
  - Externe VdS-, Nayyal-, Publishing-, Provider-, Kauf-/Trading- oder Live-Site-Schritte nur nach Freigabe.
- BEOBACHTEN
  - Admin-Freitag-Lauf heute wegen letztem Delivery-Fehler.
  - Wochenplan-Sonntag no-agent-Fix beim naechsten Sonntaglauf.
  - Offener UK-Handoff und Handoff-Janitor-Status.
  - Week-Architect erster Lauf am 2026-06-14.
  - Proof-Ledger/echte Rueckmeldungen: keine V2 ohne Nutzungstest.
- SPAETER
  - VdS-GE interne 1-Seiten-Notiz mit drei Fragen.
  - Kanban-Altlasten in kleine Hygiene-Slices schneiden.
  - Nayyal Connector-Registry erst nach Kategorieentscheidung.
- BLOCKIERT
  - Live-Nayyal, oeffentliche Navigation und Public-Hub-Schritte bis Chris die Grenze bestaetigt.
  - Ungetestete V2/Produktisierung ohne Proof.
- NICHT_TUN
  - Fuenferfeld wieder aufgreifen.
  - Neue Duplikat-Handoffs erzeugen.
  - Breite App-/Swarm-Neubauten, Installs, Commits, Pushes, Deploys, Publikationen, Trades, Loeschungen oder sensible Datenverarbeitung.

## Naechste 3 Mini-Schritte
1. Platzset/Teller/Becher/Hilfe-Pause-Fertig-Karten bereitlegen und nach Nutzung eine Mini-Beobachtung notieren.
2. Heute nach `ADMIN_FREITAG_30MIN` nur beobachten, ob der Delivery-Fehler erneut auftritt; bei erneutem Fehler erst dann Reparatur-Slice planen.
3. Offenen Codex-Handoff `uk-startkarte-fachfremde-kollegen` beim naechsten Handoff-Check entscheiden: behalten, ausfuehren lassen oder parken — keinen zweiten Handoff daneben erstellen.

## Codex-Handoff
- Offene Inbox-Handoffs: 1 — `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md`
- Neue Outbox-Rueckgaben: keine neue seit 2026-06-05; 11 Outbox-Dateien insgesamt.
- Handoff-Hygiene: Archiv 11 Dateien; kein eindeutiges Inbox/Outbox-Paar fuer automatische Archivierung erkannt.
- Sollte ein neuer Handoff erstellt werden? nein — es gibt bereits einen offenen UK-Handoff; heutiger CEO One Move ist reales Material/Proof, nicht Codex.

## Kein Aktionismus
- Keine Live-Hub-/Nayyal-Aenderung.
- Keine externen VdS-Texte oder Publikationen.
- Keine Investment-/Trading-Aktion.
- Keine Fuenferfeld-Wiederaufnahme trotz alter Reports.
- Keine neuen Cronjobs oder Swarms.
- Keine Handoff-Duplikate.
- Keine Arbeit mit echten Schueler-, Eltern-, Kollegiums-, Gesundheits-, Finanz- oder Verbandsinterna.

## Belege
- `hermes --profile neva gateway status`
- `hermes --profile neva cron status`
- `hermes --profile neva cron list --all`
- `hermes --profile neva kanban list`, `hermes --profile neva kanban stats`, `hermes --profile neva kanban list --status blocked`, `--status todo`
- `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`
- `/Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-11.md`
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-12.md`
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-public-research-private-map-2026-06-12.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-11.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-06-11.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/handoff-janitor-2026-06-11.md`
- `/Users/zondrius/hermes-workspace/memory/goals/`
- `/Users/zondrius/hermes-workspace/inbox/chris-feedback/proof-ledger.md` — nicht vorhanden/geprueft als fehlend im Dateiscan.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: 1 Platzset, 1 Teller, 1 Becher und Hilfe/Pause/Fertig-Karten bereitlegen.
- CHRIS_ENTSCHEIDET: Nayyal Public/Research/Private-Grenze; offene UK-Startkarte priorisieren oder parken; externe/published/paid/provider/trading/live-site Schritte nur nach Freigabe.
- BEOBACHTEN: Admin-Freitag-Delivery heute; Wochenplan-Sonntag-Fix; offener UK-Handoff; Week-Architect-Erstlauf; Proof-Ledger/Rueckmeldungen.
- SPAETER: VdS-GE Drei-Fragen-Notiz; Kanban-Altlasten; Nayyal Connector-Registry nach Entscheidung.
- BLOCKIERT: Live-Nayyal/oeffentliche Navigation bis Kategorieentscheidung; V2/Produktisierung ohne echten Proof.
- NICHT_TUN: Fuenferfeld, Duplikat-Handoffs, breite Neubauten, Installs/Commits/Pushes/Deploys/Publikationen/Trades/Loeschungen, sensible Daten.
- Naechste kleinste Aktion: Platzset mit zwei Feldern zeichnen und Teller/Becher plus Hilfe/Pause/Fertig-Karten danebenlegen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-12.md`
