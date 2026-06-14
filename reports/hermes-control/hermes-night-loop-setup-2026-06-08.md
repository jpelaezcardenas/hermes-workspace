# Hermes Night Loop Setup - 2026-06-08

## Kurzfazit
Signal: Green.

Hermes hat jetzt einen geschlossenen Nacht-Loop. Die Arbeit startet nach 00:00 und soll bis 06:00 beendet sein. Die Zwischenjobs schreiben lokal, damit Chris nachts keine Telegram-Flut bekommt. Die eine sichtbare Morgenmeldung kommt um 05:30 durch `HERMES_MORNING_CEO_DAILY`.

## Nacht-Zeitplan
| Zeit | Job | Zweck | Ausgabe |
|---:|---|---|---|
| 00:10 | `HERMES_NIGHT_RESULT_TUEV_DAILY` | Prueft Substanz der letzten Hermes-Ergebnisse | lokal |
| 00:45 | `HERMES_LIFE_BUILDER_NIGHTLY` | Baut genau eine kleine Lebensverbesserung fuer morgen | lokal |
| 01:30 | `NIGHT_APP_STUDIO_BUILD_DAILY` | Baut oder stoppt genau einen lokalen App-Prototyp | lokal |
| 03:15 Montag | `HERMES_ASSET_FORGE_WEEKLY` | Waehlt ein Wochen-Asset, jetzt im Nachtfenster | lokal |
| 04:05 | `NAYYAL_HUB_RADAR_DAILY` | Prueft Nayyal/Hub/Unterseiten und Meta-Verbesserung | lokal |
| 05:30 | `HERMES_MORNING_CEO_DAILY` | Eine CEO-Zusammenfassung fuer Chris vor 06:00 | Telegram |

## Neue Jobs
### `HERMES_NIGHT_RESULT_TUEV_DAILY`
Bewertet jeden Nachtstart nach fuenf Bahnen:
- Schule / Unterricht
- Investment-Ideen / Research, ohne Trading
- Nayyal / Hub
- Night App / lokale Tools
- Admin / Alltag / Hermes-System

Ziel:
Schlechte oder wiederholte Ergebnisse frueh erkennen, bevor weiter Tokens in weiche Aufgaben laufen.

Report:
`/Users/zondrius/hermes-workspace/reports/night-loop/result-tuev-YYYY-MM-DD.md`

### `HERMES_LIFE_BUILDER_NIGHTLY`
Waehlt genau eine konkrete Lebensverbesserung fuer den naechsten Tag.

Moegliche Bahnen:
- Schule: Unterricht, Material, Vorbereitung
- Investment: Research-Frage, Risiko-Notiz, Watch-Idee, nie Kauf/Verkauf
- Nayyal: Hub-Klarheit, Proof Board, Public/Private-Grenze
- Night App: Test- oder V2-Richtung
- Admin/Alltag: Reibung senken

Reports:
- `/Users/zondrius/hermes-workspace/reports/night-loop/life-builder-YYYY-MM-DD.md`
- optional `/Users/zondrius/hermes-workspace/reports/night-loop/life-card-YYYY-MM-DD.md`

### `HERMES_MORNING_CEO_DAILY`
Sendet eine einzige Telegram-Meldung vor 06:00.

Muss enthalten:
- Heute zaehlt
- Schule
- Investment, nur Research-Sprache
- Nayyal
- Night App
- Life/Admin
- Befehl heute
- Nicht tun
- Entscheidung fuer Chris

Report:
`/Users/zondrius/hermes-workspace/reports/night-loop/morning-ceo-YYYY-MM-DD.md`

## Geaenderte bestehende Jobs
- `NIGHT_APP_STUDIO_BRIEFING_DAILY` pausiert, weil der 08:00-Brief nun durch den 05:30-Morgen-CEO ersetzt wird.
- `HERMES_ASSET_FORGE_WEEKLY` von Montag 06:30 auf Montag 03:15 verschoben.
- `HERMES_ASSET_FORGE_WEEKLY` liefert lokal, damit die Zusammenfassung im Morgen-CEO landet.
- `NAYYAL_HUB_RADAR_DAILY` liefert lokal, damit nachts keine einzelne Telegram-Meldung kommt.

## Looping-Regeln
Alle drei neuen Jobs nutzen dieselbe Grundregel:
1. Ziel verstehen.
2. Kontext lesen.
3. Genau ein Hauptresultat waehlen.
4. Ergebnis schreiben oder erzeugen.
5. Ergebnis ruecklesen/pruefen.
6. Offensichtliche Fehler einmal reparieren.
7. Stoppen.
8. Befehlskarte und Decision Inbox schreiben.

## Abdeckung
- Schule: ja, durch Teacher Nextday, Wochenplan, Lernwerkstatt-Reports und Life Builder.
- Investment-Ideen: ja, als Research-/Risikobahn im Life Builder und Morgen-CEO; keine Trading-Befehle.
- Nayyal: ja, durch Nayyal Hub Radar und Morgen-CEO.
- Night Apps: ja, durch Night App Studio und Morgen-CEO.
- Alltag/Admin: ja, durch Life Builder und Admin-Freitag.
- Hermes-Qualitaet: ja, durch Result-TUEV und Control Daily.

## Backup
Vor der Aenderung:
`/Users/zondrius/.hermes/backups/2026-06-08-night-loop/jobs.json`

## Verifikation
Pruefscript:
`/Users/zondrius/.hermes/scripts/hermes_night_loop_check.py`

Erwartung:
- drei neue Nachtloop-Jobs vorhanden.
- Nachtloop ist im Fenster 00:00 bis 06:00.
- Morgen-CEO laeuft 05:30 per Telegram.
- alte 08:00-Night-App-Einzelmeldung ist pausiert.
- Nayyal und Asset Forge liefern nachts lokal.
- GPT-5.5 bleibt fuer aktive LLM-Jobs gesetzt.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts; naechsten Nachtlauf beobachten.
- CHRIS_ENTSCHEIDET: Ob die Morgen-CEO-Meldung nach 2-3 Tagen noch kuerzer oder mutiger priorisieren soll.
- BEOBACHTEN: Ob Life Builder echte Entlastung erzeugt oder nur neue Ideenlisten schreibt.
- SPAETER: Bei guten Ergebnissen Investment-Research und Nayyal-Proof-Board als eigene Premium-Loops ausbauen.
- BLOCKIERT: nichts.
- NICHT_TUN: Keine weiteren Nachtjobs hinzufuegen, bevor dieser Loop mindestens zwei Naechte gelaufen ist.
- Naechste kleinste Aktion: Morgen nach der 05:30-Meldung pruefen, ob sie wirklich brauchbar ist.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-night-loop-setup-2026-06-08.md`
