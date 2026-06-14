# Hermes Control Tower — 2026-06-10

## Ampel
Yellow

## CEO One Move
If Chris has only 20 minutes today:
- Do: Zwei Zielorte und eine Gartenpost-Karte fuer morgen bereitlegen; eine Zustellrunde einmal trocken am Tisch durchspielen.
- Why: Das ist der konkreteste Green-Schul-/Materialschritt aus dem neuesten Teacher-Nextday-Report, ohne Fuenferfeld, ohne digitale Erweiterung und ohne sensible Daten.
- Source: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-09.md`
- Do not: Keine App umbauen, keinen neuen Handoff erzeugen, kein Fuenferfeld reaktivieren, keine externen Aktionen.

## Befehlskarte Heute
- Chris 5-Minuten-Befehl: `Lege zwei Koerbe/Zielorte und eine Gartenpost-Karte sichtbar bereit.`
- Codex-Befehl: keiner — ein offener UK-Handoff liegt bereits in der Inbox; kein Duplikat erzeugen.
- Hermes-Pruefbefehl: `hermes cron list` und danach pruefen, ob der Morning-CEO-Fix morgen die Schule-Zeile sauber zeigt.
- Stop-/Park-Befehl: `Fuenferfeld bleibt geparkt; Nayyal live/public/deploy und Investment-Provider bleiben CHRIS_ENTSCHEIDET.`
- Nicht-ausfuehren: Installs, Commits, Pushes, Deploys, Loeschungen, externe Publikation, Trades, Provider-/Account-Aktionen, sensible Schülerdaten.

## Wichtigste Beobachtung
- Gateway/Workspace wirkt laufend: Hermes Gateway, Dashboard und Vite-Prozess sind aktiv; keine akute Prozess-Störung gesehen.
- Cron-Landschaft ist insgesamt aktiv, aber es gibt alte/gelbe Hygiene-Signale: `ADMIN_FREITAG_30MIN` hatte zuletzt Delivery/Connection-Fehler; `WOCHENPLAN_GE_SONNTAG` hatte Broken Pipe, ist laut Cron-Ausgabe aber bereits auf no-agent Script-Fix umgestellt.
- Beste konkrete Schulaktion heute ist Gartenpost lokal vorbereiten. Fuenferfeld-Empfehlungen bleiben wegen Chris' Parkentscheidung ausgeschlossen.
- Handoff-Hygiene: 1 offener Codex-Inbox-Handoff (`uk-startkarte-fachfremde-kollegen`), 8 Outbox-Ergebnisse; kein neuer Handoff sinnvoll, solange die bestehende Inbox nicht geklärt ist.
- Nayyal-Radar liefert einen lokalen Connector-Registry-Slice, aber Kategorie-/Live-Entscheidungen gehoeren zu `CHRIS_ENTSCHEIDET`, nicht in Sofort-Aktion.

## Model Policy
- Green: 24 aktive Agent-Jobs sind explizit auf `gpt-5.5`/`openai-codex` gepinnt; no-agent Script-Jobs ohne Modell werden nicht als Policy-Verstoß gewertet.
- Bewertung: Green fuer aktivierte LLM-Jobs; weiter nur beobachten, kein automatischer Patch.

## Job Hygiene
- Doppelte Jobs: keine konkreten Duplikate aus der Cron-Liste belegt.
- Low-substance loops: nicht hart belegt; Business-/Morning-Fixes sollen beim naechsten Lauf beobachtet werden.
- Jobs, die beobachtet werden sollten: `ADMIN_FREITAG_30MIN` wegen Delivery-Fehler; `WOCHENPLAN_GE_SONNTAG` wegen naechstem Beweis nach Script-Fix; `NIGHT_APP_STUDIO` wegen Goal-Konflikt alt `Do not use GPT-5.5` vs aktuelle Model-Policy.
- Delivery failures: `ADMIN_FREITAG_30MIN` letzter Lauf mit Telegram/httpx ConnectError; andere gelistete Kernjobs zuletzt ok oder Fix pending.

## Job-Kontrolle
- active jobs OK / issue: Kernjobs aktiv; Hermes Control, Lernwerkstatt-Quality, VdS-Monitor, Codex-Handoff-Scout, Handoff-Janitor und Teacher-Nextday sind aktiv. Issue: einzelne letzte Fehler wie oben.
- suspicious rhythm / prompt issue / none: Yellow wegen vieler eng getakteter 10:15/10:30/10:35-Läufe und wegen Model-Policy-Nachweis; kein akuter Ausfall belegt.

## Blocked / Stale / Goals
- Blocked Kanban: `hermes kanban list` zeigte im sichtbaren Ausschnitt nur `done`; keine aktive Blockade belegt. Vollständigkeit begrenzt durch Toolausgabe.
- Stale running tasks: keine langen Hermes-Worker im Prozesscheck sichtbar, aber Codex-App-Prozesse laufen; nicht als Fehler bewertet.
- Aktive Goal-Strands:
  - `2026-06-05-hermes-night-app-studio-v2-quality-gate`: kleinste sichere Aktion = nur Review/Prompt-Konflikt prüfen; Handoff: keiner belegt.
  - `2026-06-05-hermes-ceo-action-loop-v1`: wirkt im Wesentlichen umgesetzt/validiert; kleinste sichere Aktion = nächsten echten Lauf beobachten; Handoff: keiner nötig.
  - GE-Spielraum-Qualitaet: kein eigener aktiver Goal-Dateipfad im Scan belegt; in Lernwerkstatt-Berichten weiter als Qualitäts-/Materiallinie sichtbar.

## Decision Inbox Heute
- SOFORT_MACHEN: Zwei Zielorte und eine Gartenpost-Karte fuer morgen bereitlegen.
- CHRIS_ENTSCHEIDET: Nayyal-Dreiteilung `Public/Research/Private`; externe Nayyal-/Public-/Deploy-Schritte; VdS-GE externe Anfrage/Position; ob alter Admin-Freitag-Job repariert/pausiert wird, falls Fehler erneut auftritt; bezahlte Investment-Datenprovider.
- BEOBACHTEN: Morning-CEO-Fix morgen; Wochenplan-Sonntag no-agent Fix; Business-Firework naechster Lauf; Lernwerkstatt Rolldown/Vite-Build bleibt lokal gelb; offener UK-Handoff; Nayyal lokale Struktur.
- SPAETER: VdS-GE One-Page-Notiz; Night App Studio Qualitätsfeinschliff; Lernwerkstatt Mobile-Smoke; lokale Nayyal Connector-Registry nach Chris' Kategorieentscheidung.
- BLOCKIERT: Kein echter Vite-Produktionsbuild wegen nativer Rolldown-Binding-Probleme im Lernwerkstatt-Report; arXiv/VdS-Suche zuletzt teils HTTP 429/Timeout; Live-Nayyal ohne Chris-Freigabe blockiert.
- NICHT_TUN: Kein Fuenferfeld, keine neuen Handoffs bei bestehender Inbox, keine Installs/Commits/Pushes/Deploys/Publikationen/Trades/Loeschungen, keine sensiblen Daten in Tools.

## Naechste 3 Mini-Schritte
1. Zwei Koerbe/Zielorte plus eine Gartenpost-Karte bereitlegen und eine Zustellrunde trocken testen.
2. Offenen Codex-Handoff `codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md` sichten: noch gewollt, erledigt oder archivieren?
3. Morgen nach dem Morning-CEO-Lauf pruefen, ob die Schule-Zeile aus Teacher-Nextday korrekt übernommen wurde.

## Codex-Handoff
- Offene Inbox-Handoffs: 1 — `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-06-07-uk-startkarte-fachfremde-kollegen.md`
- Neue Outbox-Rueckgaben: keine von heute; neueste sichtbare Rueckgabe: `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-06-05-ge-mengen-legen-schmalansicht.md`
- Sollte ein neuer Handoff erstellt werden? nein — bestehender offener Handoff zuerst klaeren; Nayyal-Connector braucht vorher Chris' Kategorieentscheidung.
- Handoff-Hygiene: Inbox 1, Outbox 11, Archive recent 8; Review/Archivierung sinnvoll, aber keine automatische Loesch-/Archiv-Aktion in diesem Lauf.

## Kein Aktionismus
- Fuenferfeld/Fünferfeld/five-frame bleibt geparkt.
- Keine Night-App-/Lernwerkstatt-Prototypen neu starten, bevor offene Fix-/Review-Linien geklärt sind.
- Keine Nayyal-Live-Seiten, Public-Routen, Secrets, Finanz-/Privatdaten oder Deploys anfassen.
- Keine Investment-Aktionen, keine Broker-/Provider-Workflows.
- Keine öffentlichen VdS-Texte oder Anfragen ohne Chris-Freigabe.

## Belege
- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `hermes cron list` Check vom 2026-06-10
- `hermes kanban list` Check vom 2026-06-10
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-morning-ceo-teacher-date-bridge-fix-2026-06-10.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/teacher-nextday-2026-06-09.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-06-08.md`
- `/Users/zondrius/hermes-workspace/reports/nayyal-hub-radar/nayyal-hub-radar-2026-06-10.md`
- `/Users/zondrius/hermes-workspace/reports/vds-ge/vds-ge-monitor-2026-06-05.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/`
- `/Users/zondrius/hermes-workspace/memory/goals/`

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Zwei Zielorte und eine Gartenpost-Karte fuer morgen bereitlegen.
- CHRIS_ENTSCHEIDET: Nayyal-Kategorien/Public-Schritte, VdS-externe Position, Admin-Freitag-Reparatur bei erneutem Fehler, bezahlte Investment-Datenprovider.
- BEOBACHTEN: Morning-CEO-Fix, Wochenplan-Sonntag Script-Fix, Business-Firework, Lernwerkstatt Rolldown/Vite, offener UK-Handoff.
- SPAETER: VdS-GE One-Pager, Night App Studio Feinschliff, Lernwerkstatt Mobile-Smoke, Nayyal Connector-Registry nach Entscheidung.
- BLOCKIERT: Vite/Rolldown-Produktionsbuild lokal gelb; Live-Nayyal ohne Freigabe; arXiv/VdS zuletzt teils 429/Timeout.
- NICHT_TUN: Fuenferfeld, neue Duplikat-Handoffs, Installs, Commits, Pushes, Deploys, Publikationen, Trades, Loeschungen, sensible Daten.
- Naechste kleinste Aktion: Zwei Koerbe hinstellen und eine Gartenpost-Karte auf das Startfeld legen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-control-2026-06-10.md`
