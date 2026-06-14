# Hermes GPT-5.5 Job Overhaul - 2026-06-08

## Kurzfazit
Signal: Green.

Hermes wurde auf eine klare Modellpolitik umgestellt: aktive LLM-Jobs laufen mit `gpt-5.5` ueber `openai-codex`. Reine Script-Jobs bleiben bewusst ohne Modell, weil sie keine Tokens brauchen. Es wurde kein Job geloescht; stattdessen wurden Rollen, Ergebnisregeln und Stop-Regeln geschaerft.

## Modellpruefung
- Live-Probe: `hermes --profile neva --provider openai-codex -m gpt-5.5 -z ...`
- Ergebnis: `GPT55_OK`
- Schluss: `gpt-5.5` ist in dieser Hermes-Umgebung praktisch nutzbar.

## Geaenderte Modellkonfiguration
Aktive Defaults wurden auf `gpt-5.5` gesetzt:

- `/Users/zondrius/.hermes/config.yaml`
- `/Users/zondrius/.hermes/profiles/research/config.yaml`
- `/Users/zondrius/.hermes/profiles/memory/config.yaml`
- `/Users/zondrius/.hermes/profiles/schule/config.yaml`
- `/Users/zondrius/.hermes/profiles/neva/config.yaml`
- `/Users/zondrius/.hermes/profiles/lernwerkstatt/config.yaml`
- `/Users/zondrius/.hermes/profiles/finance/config.yaml`
- `/Users/zondrius/.hermes/profiles/ideas/config.yaml`
- `/Users/zondrius/.hermes/profiles/coder/config.yaml`

Backup:
`/Users/zondrius/.hermes/backups/2026-06-08-gpt55-job-overhaul/`

## Cronjob-Policy
- 21 aktive LLM-Jobs wurden explizit gepinnt:
  - `model=gpt-5.5`
  - `provider=openai-codex`
- 2 no-agent Script-Jobs bleiben ohne Modell:
  - `WOCHENPLAN_GE_SONNTAG`
  - `HERMES_HANDOFF_JANITOR_DAILY`

Warum das richtig ist:
- LLM-Jobs sollen mit GPT-5.5 arbeiten.
- Script-Jobs sollen tokenlos bleiben, weil sie kein LLM nutzen.
- Dadurch gibt es keine heimliche 5.4-Nutzung, aber auch keinen sinnlosen Tokenverbrauch fuer reine Skripte.

## Prompt-Qualitaet
Alte Regeln wie "kein GPT-5.5" wurden entfernt.

Alle aktiven LLM-Jobs haben jetzt eine gemeinsame Closed-Loop-Regel:
1. Kontext lesen.
2. Genau ein Hauptresultat waehlen.
3. Ergebnis schreiben oder erzeugen.
4. Output ruecklesen / pruefen.
5. Offensichtliche Qualitaetsfehler einmal reparieren.
6. Stoppen, statt neue Nebenmissionen zu starten.

Zusaetzlich geschaerft:
- `HERMES_CONTROL_DAILY`: muss Modellpolitik, Job-Hygiene, Doppelungen und moegliche Pausen beobachten.
- Stock-Jobs: Telegram soll kurz bleiben; lange Tabellen gehoeren in Reports.
- `NIGHT_APP_STUDIO_BUILD_DAILY`: GPT-5.5 darf tiefer denken, aber nur ein Prototyp pro Nacht.
- `NAYYAL_HUB_RADAR_DAILY`: eine konkrete lokale Entscheidung oder ein Artefakt statt Branding-Rauschen.
- `BUSINESS_IDEA_FIREWORK_DAILY`: nur ein Rohsignal + 20-Minuten-Microtest; Asset Forge baut das Wochenasset.
- `HERMES_ASSET_FORGE_WEEKLY`: ein nutzbares Wochenasset, nicht weitere Ideenliste.
- `CODEX_HANDOFF_SCOUT_DAILY`: hoechstens ein exakter lokaler Codex-Handoff, sonst keine Uebergabe.

## Job-Entscheidung
Keine Jobs wurden geloescht oder pausiert.

Gruende:
- Es gibt aktuell keine echte harte Doppelung.
- Die meisten Jobs haben unterschiedliche Rollen: Unterricht, Nayyal, Apps, Handoff, Control, Aktien/Risiko, Asset-Auswahl.
- Das groesste Problem war nicht "zu viele Jobs", sondern zu wenig strenge Ergebnislogik in einigen Jobs.

Unter Beobachtung:
- `BUSINESS_IDEA_FIREWORK_DAILY` vs `HERMES_ASSET_FORGE_WEEKLY`: Wenn die Business-Idee weiter nur Asset-Forge-Themen wiederholt, auf 2-3x pro Woche reduzieren.
- Stock-Stack: Wenn zu viel Telegram-Rauschen entsteht, nur `STOCK_RISK_COMMANDER_DAILY` per Telegram senden und die anderen Stock-Reports lokal lassen.
- Delivery-Fehler bei Telegram: nicht als Job-Fehler werten, aber im Control-Report sichtbar halten.

## Verifikation
Pruefer:
`/Users/zondrius/.hermes/scripts/hermes_gpt55_job_overhaul_check.py`

Erwartung nach diesem Report:
- aktive Konfigs enthalten keine `gpt-5.4`-Defaults mehr.
- aktive LLM-Jobs sind auf `gpt-5.5` / `openai-codex` gesetzt.
- no-agent Jobs sind modellfrei.
- keine alten "kein GPT-5.5"-Prompt-Regeln bleiben uebrig.
- dieser Report ist vorhanden.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts; naechste Cronlaeufe beobachten.
- CHRIS_ENTSCHEIDET: Ob Stock-Subreports spaeter lokal statt Telegram laufen sollen, falls sie nerven.
- BEOBACHTEN: Business Idea Firework vs Asset Forge; Stock-Telegram-Rauschen; Telegram-Delivery-Fehler.
- SPAETER: Wenn Ergebnisse immer noch zu weich sind, einzelne Jobs auf weniger Frequenz oder lokale Ausgabe umstellen.
- BLOCKIERT: nichts.
- NICHT_TUN: keine Jobs loeschen, bevor zwei aktuelle Laeufe zeigen, dass sie wirklich doppelt oder wertarm sind.
- Naechste kleinste Aktion: Morgen die naechsten GPT-5.5-Cron-Ausgaben auf Konkretheit pruefen.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-gpt55-job-overhaul-2026-06-08.md`
