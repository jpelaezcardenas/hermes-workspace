# Archiviert - Codex Handoff Gartenpost Hilfeflow

Archiviert am: 2026-05-26

Grund: umgesetzt und Ergebnis geschrieben nach `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-22-gartenpost-hilfeflow.md`.

Original-Handoff:

# Codex Handoff

## Ziel

Den bestehenden Standalone-Prototyp `gartenpost-prototyp.html` in genau einem kleinen Slice verbessern: kindgerechter Hilfemodus mit drei klaren Optionen und ein Beobachtungsdrawer, der keine aktiven Kind-Aktionen halb verdeckt.

## Kontext

Auslöser ist der Lernwerkstatt-Testpilot vom 2026-05-21. Der Prototyp funktioniert grundsätzlich gut als GE-Spielraum, aber zwei praktische Brüche wurden beobachtet:

1. Der Hilfe-Button ist zu verborgen bzw. mehrdeutig.
2. Der geöffnete Beobachtungsdrawer überdeckt den Spielbereich bzw. den `Fertig`-Button teilweise.

Der heutige Decision-Inbox-Eintrag 2026-05-22 setzt diesen Punkt unter `SOFORT_MACHEN`. Es soll **keine** Haupt-App-Integration, kein Dashboard und keine neue Spielbibliothek entstehen.

## Dateien

Pflichtquellen lesen:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-2026-05-21.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`

Erlaubt zu ändern:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`

Erlaubt neu zu erstellen/überschreiben als Prüfnachweise:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-hilfeflow-desktop.png`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-hilfeflow-mobile.png`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-22-gartenpost-hilfeflow.md`

Nicht ändern:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/package.json`
- andere App-/Projektdateien außerhalb dieses kleinen Standalone-Slice

## Was Codex tun soll

1. Vor Änderungen kurz prüfen, ob der Prototyp lokal noch ohne externe Abhängigkeiten lädt.
2. In `gartenpost-prototyp.html` den bisherigen Hilfeablauf so anpassen, dass ein Klick auf `Hilfe` einen kleinen, kindgerechten Hilfemodus mit genau drei großen Optionen öffnet:
   - `Weniger`
   - `Zeig es mir`
   - `Pause`
3. Verhalten der drei Hilfen:
   - `Weniger`: reduziert auf zwei Briefkästen und markiert ruhig die nächste Handlung.
   - `Zeig es mir`: führt eine langsame Demo aus: Karte wird ausgewählt und zum passenden Briefkasten zugestellt.
   - `Pause`: zeigt sinngemäß `Fertig zeigen. Pause ist okay.` und lässt `Nochmal` und `Fertig` sichtbar.
4. Den Beobachtungsdrawer so anpassen, dass im geöffneten Zustand keine halb verdeckten aktiven Kind-Buttons übrig bleiben.
5. Bestehenden GE-Charakter erhalten: große Touchziele, ruhiges Feedback, keine Punkte/Timer/Rankings, keine rote Fehlerdramaturgie, keine echten Daten, keine Speicherung.
6. Lokale Browserprüfung durchführen und Desktop-/Mobile-Screenshots speichern.
7. Ergebnisbericht nach `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-22-gartenpost-hilfeflow.md` schreiben.

## Status

Erledigt durch Codex am 2026-05-26.
