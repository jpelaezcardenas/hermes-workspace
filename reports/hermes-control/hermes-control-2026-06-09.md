# Hermes Control Tower — 2026-06-09

STATE: REVIEW_ONLY_READ_ONLY
PROFILE/ROLES_USED: neva als Control Tower; keine Subagents, weil die Aufgabe ein Sammeln/Pruefen vorhandener Signale ist.
SKILLS_USED: hermes-agent-operating-system, hermes-decision-inbox, codex-handoff
FILES_CHANGED: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-09.md; /Users/zondrius/hermes-workspace/reports/decision-inbox/decision-inbox-2026-06-09.md
SOURCES_OR_CONTEXT: siehe Belege unten.

## Ampel
Yellow

## CEO One Move
If Chris has only 20 minutes today:
- Do: Lege fuer morgen/heute die S-Kiste konkret bereit: 3 S-Gegenstaende oder Bildkarten, S-Fuehlbuchstabe/Sandtablett, 2 Sortierfelder, Lautgebaerdenkarte.
- Why: Das ist der klarste gruene Unterrichts-/Materialschritt aus Teacher Nextday und Wochenplan; klein, lokal, nicht Fuenferfeld, ohne sensible Daten.
- Source: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-08.md`
- Do not: Nicht in digitale Erweiterung, Fuenferfeld/Mengenlinie oder neue breite Lernwerkstatt-Mission ausweichen.

## Befehlskarte Heute
- Chris 5-Minuten-Befehl: Nimm drei S-Dinge oder S-Bildkarten und lege daneben zwei Felder: „passt zu S“ / „passt nicht zu S“.
- Codex-Befehl: keiner — es gibt schon einen offenen UK-Startkarten-Handoff; keine Doppelung erzeugen.
- Hermes-Pruefbefehl: Morgen kontrollieren, ob `BUSINESS_IDEA_FIREWORK_DAILY` erneut Broken Pipe wirft und ob der Handoff-Janitor die Lage weiter sauber haelt.
- Stop-/Park-Befehl: Fuenferfeld/Fünferfeld/five-frame weiter geparkt lassen.
- Nicht-ausfuehren: Keine Installs, Commits, Pushes, Deploys, Trades, Publikationen, Loeschungen, neuen Handoffs oder personenbezogenen Schuelerdaten.

## Wichtigste Beobachtung
- Gateway und Workspace wirken erreichbar: Gateway `/health` meldet ok; `localhost:3000` antwortet HTTP 200.
- Die aktiven LLM-Jobs sind nach Jobs-Datei auf `gpt-5.5` / `openai-codex` gesetzt; die zwei Script-Jobs sind bewusst no-agent ohne Modell.
- Aktueller bester gruener Arbeitsimpuls ist nicht technisch, sondern paedagogisch: S-Kiste als reale kurze Deutsch-/Wahrnehmungsstation.
- Handoff-Lage ist ueberschaubar: 1 offener Codex-Inbox-Handoff, keine neue passende Outbox-Rueckgabe dazu gefunden.
- Auffaellig bleibt Job-Hygiene: `BUSINESS_IDEA_FIREWORK_DAILY` hatte heute Broken Pipe; `ADMIN_FREITAG_30MIN` und `AI_STOCK_DEEPDIVE_WEEKLY` zeigen aeltere Telegram-Delivery-Fehler.

## Model Policy
- Status: Green mit Beobachtung.
- Geprueft: aktive LLM-Jobs in `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`.
- Befund: alle geprueften aktiven Agent-Jobs sind auf `gpt-5.5` und `openai-codex` gesetzt.
- Ausnahme: `WOCHENPLAN_GE_SONNTAG` und `HERMES_HANDOFF_JANITOR_DAILY` sind no-agent Script-Jobs; dafuer ist kein Modell erwartet.

## Job Hygiene
- Duplicates: keine harte Doppelung bestaetigt. Stock-Jobs sind thematisch nah, aber laut Setup aktuell unterschiedliche Rollen; weiter auf Telegram-Rauschen beobachten.
- Low-substance loops: noch nicht hart belegt. `BUSINESS_IDEA_FIREWORK_DAILY` heute wegen Broken Pipe nicht inhaltlich verwertbar; wenn sich das wiederholt, technische Reparatur oder Frequenzsenkung empfehlen.
- Jobs, die pausiert werden sollten: keine automatische Pause empfohlen. Beobachtung reicht aktuell.
- Delivery failures: `ADMIN_FREITAG_30MIN` mit Telegram-DNS/Connection-Fehler vom 2026-06-05; `AI_STOCK_DEEPDIVE_WEEKLY` mit Telegram-Delivery-Hinweis; heutiger Business-Idea-Lauf Broken Pipe.

## Job-Kontrolle
- active jobs OK / issue: ueberwiegend OK; keine globale Cron-Stoerung sichtbar.
- suspicious rhythm / prompt issue / none: Business-Idea-Firework ist heute technisch auffaellig; Stock-Telegram-Menge weiter beobachten; keine neue Dauerjob-Aktion.
- Gateway/Workspace: wahrscheinlich gesund; Dashboard HEAD liefert 405, das ist kein harter Ausfall, weil Gateway ok und Workspace 200.

## Ziele / aktive Goal-Execute-Strands
- `hermes-night-app-studio-v2-quality-gate`: executed-active; kleinste sichere Aktion: nur Ergebnisse/Proof-Gates beobachten, keine neue App-Familie erzwingen; Handoff: nicht noetig.
- `hermes-ceo-action-loop-v1`: executed-active; kleinste sichere Aktion: CEO One Move weiter auf konkrete lokale Handlung begrenzen; Handoff: nicht noetig.
- `hermes-night-app-studio-v1` und Cron-Aktivierung: umgesetzt/abgeloest durch v2/Night Loop; kein aktueller Handoff.
- GE-Spielraum-Qualitaet bleibt inhaltliche Leitlinie, aber Fuenferfeld-Varianten sind durch Chris geparkt.

## Decision Inbox Heute
- SOFORT_MACHEN
  - S-Kiste in 5 Minuten vorbereiten: 3 S-Gegenstaende/Bildkarten, S-Fuehlbuchstabe, 2 Sortierfelder.
- CHRIS_ENTSCHEIDET
  - Ob aus der S-Kiste nach realer Beobachtung ein fester Wochenanker oder eine wiederverwendbare Morgenkarte werden soll.
  - Ob der Admin-Freitag-Job bei erneutem Delivery-Fehler technisch geprueft oder pausiert werden soll.
  - Ob Nayyal spaeter in Codex-Handoff-Form gebracht werden soll; Live-Site/Deploy/Account/Secrets bleiben Freigabe-Themen.
- BEOBACHTEN
  - `BUSINESS_IDEA_FIREWORK_DAILY` nach heutigem Broken Pipe.
  - `LERNWERKSTATT_QUALITY_WEEKLY`: Startpfad/Schueler:innenmodus bleibt wichtig; Vite/Rolldown-Build lokal fehlerhaft, esbuild-Fallback gruen.
  - Offener Codex-Handoff `uk-startkarte-fachfremde-kollegen`.
  - Nayyal Radar: sicher nur lokale Struktur/Copy/Trust-Layer; keine externen Aktionen.
- SPAETER
  - VdS-GE One-Pager erst bei konkretem Anlass/Quelle.
  - Night App Studio Feinschliff erst nach Nutzentest/Proof.
  - Mobile/narrow-viewport-Smoke fuer Lernwerkstatt nach Start-Slice.
- BLOCKIERT
  - nichts als Gesamtbetrieb. Teilblocker: Vite/Rolldown-Binding im Lernwerkstatt-Report; nicht kritisch fuer heutige S-Kiste.
- NICHT_TUN
  - Kein Fuenferfeld / keine Mengenlinie heute.
  - Keine neuen Handoffs, solange der UK-Handoff offen ist.
  - Keine Installs, Commits, Pushes, Deploys, Publikationen, Loeschungen, Trades oder sensiblen Daten.

## Naechste 3 Mini-Schritte
1. S-Kiste real auf den Tisch legen und nur eine Beobachtungsfrage notieren: „Welcher Zugang oeffnet Beteiligung: hoeren, fuehlen, zeigen oder sortieren?“
2. Nach dem naechsten Codex-Handoff-Scout/Janitor-Lauf pruefen, ob der UK-Startkarten-Handoff unveraendert offen ist.
3. Morgen den Business-Idea-Firework-Lauf kontrollieren; erst bei zweitem Fehler Reparatur/Pause als echte Entscheidung markieren.

## Codex-Handoff
- Offene Inbox-Handoffs: 1 — `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md`
- Neue Outbox-Rueckgaben: keine passende Rueckgabe zum offenen UK-Handoff gefunden; juengste Outbox-Datei ist weiterhin `codex-result-2026-06-05-ge-mengen-legen-schmalansicht.md`.
- Handoff-Hygiene: Inbox 1, juengste Outbox vorhanden, Archiv 11 Dateien; keine Doppel-Handoff-Erstellung empfohlen.
- Sollte ein neuer Handoff erstellt werden? nein — erst offenen UK-Handoff bearbeiten/abschliessen oder Chris entscheiden lassen.

## Kein Aktionismus
- Fuenferfeld-Linie nicht reaktivieren.
- Nayyal nicht deployen, nicht mit Accounts/Secrets verbinden, nicht veroeffentlichen.
- Stock-Signale nicht als Kauf-/Verkaufs-/Brokeraktion behandeln.
- Business-Idea-Fehler nicht sofort mit grosser Job-Umbauaktion beantworten; erst Wiederholung pruefen.
- Keine Memory-Aenderung aus diesem Tagesreport: keine stabile neue Regel, nur Tageslage.

## Belege
- `date`: Tue Jun 9 10:16:32 CEST 2026
- `hermes cron list`
- `curl http://127.0.0.1:8642/health` -> ok
- `curl -I http://localhost:3000` -> HTTP 200
- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/Documents/New project 6/hermes-jobs-overview.md`
- `/Users/zondrius/Documents/New project 6/hermes-integration-cockpit.md`
- `/Users/zondrius/hermes-workspace/handoff/HANDOFF_OVERVIEW.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-08.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-06-08.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans/wochenplan-ge-2026-06-07.md`
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-09.md`

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: S-Kiste vorbereiten: 3 S-Gegenstaende/Bildkarten, S-Fuehlbuchstabe, 2 Sortierfelder.
- CHRIS_ENTSCHEIDET: Ob S-Kiste nach realer Beobachtung Wochenanker/Morgenkarte wird; ob Admin-Freitag bei erneutem Delivery-Fehler repariert/pausiert wird; Nayyal nur nach Freigabe extern weiterfuehren.
- BEOBACHTEN: Business-Idea-Firework Broken Pipe; offener UK-Codex-Handoff; Lernwerkstatt Startpfad und Vite/Rolldown-Binding; Nayyal nur lokal/privat halten.
- SPAETER: VdS-GE One-Pager bei Anlass; Night App Studio Feinschliff nach Nutzentest; mobile Lernwerkstatt-Smoke nach Start-Slice.
- BLOCKIERT: nichts
- NICHT_TUN: Kein Fuenferfeld, keine neuen Handoffs, keine Installs/Commits/Pushes/Deploys/Publikationen/Trades/Loeschungen/sensiblen Daten.
- Naechste kleinste Aktion: Drei S-Gegenstaende oder Bildkarten auf den Tisch legen.
- Beleg / Datei: /Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-09.md
