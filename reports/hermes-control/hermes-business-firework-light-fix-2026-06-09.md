# Hermes Business Firework LIGHT Fix - 2026-06-09

## Kurzfazit
Signal: Green after fix.

Der kaputte Business-Ideen-Job wurde nicht abgeschaltet, sondern scharf verkleinert. Aus einem breiten 5-Ideen-Feuerwerk wurde ein leichter Entscheidungsjob: ein Mikro-Test, eine rohe Chance oder STOP.

## Problem
- `BUSINESS_IDEA_FIREWORK_DAILY` hatte am 2026-06-09 einen Broken-Pipe-Fehler.
- Der alte Prompt war zu breit: fuenf Ideen, viele alte Quellen, lange Bewertung, viele Folgefelder.
- Das passte nicht mehr zur neuen Hermes-Regel: GPT-5.5 ja, aber ein Ergebnis, Rueckpruefung, Stop-Regel.

## Root Cause
- Der Fehler war sehr wahrscheinlich Kontext- und Laufzeitdruck, nicht ein fehlendes Modell.
- Der Job las zu breit und musste zu viel erzeugen.
- Er doppelte teilweise Rollen anderer Jobs:
  - Asset Forge fuer bleibende Assets.
  - Night App Studio fuer App-Builds.
  - Handoff Scout fuer Codex-Uebergaben.
  - Teacher/Schule-Jobs fuer Unterrichtsplanung.

## Aenderung
- Prompt von ca. 10.412 Zeichen auf ca. 4.749 Zeichen reduziert.
- Job bleibt auf `gpt-5.5` via `openai-codex`.
- Job bleibt taeglich 09:30 aktiv.
- Job bleibt Telegram-sichtbar.
- Neuer Modus: `LIGHT`.

## Neue Job-Regel
Der Job darf nur noch eines liefern:
- `MICRO_TEST`: ein 20-Minuten-Test, wenn der Score stark genug ist.
- `RAW_OPPORTUNITY`: eine interessante, aber noch nicht handlungsreife Chance.
- `STOP`: wenn Signal schwach, wiederholt, geparkt oder zu breit ist.

## Mehr Execution
Der Job muss jetzt:
- Feedback lesen.
- Maximal drei Kandidatensignale kurz scannen.
- Genau ein Ergebnis waehlen.
- Eine Befehlskarte schreiben.
- Die Telegram-Antwort auf maximal acht Zeilen begrenzen.
- Keine fuenf Ideenlisten mehr erzeugen.

## Nicht Angefasst
- `AI_STOCK_RADAR_DAILY` bleibt trotz langem Prompt unveraendert, weil er zuletzt lief und bereits einen Kompakt-/Research-only-Modus hat.
- Night Loop, Morning CEO und Feedback-Inbox wurden bereits vorher geschaerft und bestanden die Checks.
- Keine Jobs wurden geloescht.

## Verifikation
- JSON-Format der Cron-Datei geprueft: OK.
- Promptlaenge und Rollen-Grenzen geprueft: OK, ca. 5.796 Zeichen statt vorher ca. 10.412.
- Keine doppelten Job-Namen oder Job-IDs gefunden.
- GPT-5.5-/Closed-Loop-Check bestanden.
- Morning-CEO-/Feedback-Check bestanden.
- Night-Loop-Check bestanden.
- NUL-Byte-Pruefung der geaenderten Dateien: 0.
- Business-Fix-Check neu angelegt:
  `/Users/zondrius/.hermes/scripts/hermes_business_firework_light_check.py`

## Befehlskarte
- Chris 5-Minuten-Befehl: Morgen nur schauen, ob der Business-Job einen Mikro-Test oder STOP liefert.
- Hermes-Pruefbefehl: Naechsten Lauf von `BUSINESS_IDEA_FIREWORK_DAILY` auf Broken Pipe und Ergebnisqualitaet pruefen.
- Stop-/Park-Befehl: Wenn der Job wieder broad/ideenlastig wird, auf 2-3x pro Woche reduzieren oder in Asset Forge einsortieren.
- Nicht-ausfuehren: Keine fuenf Ideen erzwingen, keine App bauen, keine Handoff-Datei schreiben, keine externen Aktionen.

## Decision Inbox
- Signal: Green
- SOFORT_MACHEN: nichts; Fix ist eingetragen, naechster Beweis kommt beim naechsten Lauf.
- CHRIS_ENTSCHEIDET: nichts.
- BEOBACHTEN: Ob der naechste Business-Lauf stabil durchlaeuft und wirklich konkreter wird.
- SPAETER: Wenn weiter Rauschen entsteht, Business-Job auf Dienstag/Donnerstag/Samstag reduzieren.
- BLOCKIERT: Live-Beweis erst nach naechstem geplanten Lauf.
- NICHT_TUN: Nicht den Stock-Radar wegen Laenge kuerzen, solange er stabil laeuft und Sicherheitsgates liefert.
- Naechste kleinste Aktion: Nach dem naechsten 09:30-Lauf Report und Telegram-Text gegenpruefen.
- Beleg / Datei: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
