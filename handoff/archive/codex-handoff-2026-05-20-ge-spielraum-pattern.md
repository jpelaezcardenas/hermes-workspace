# Codex Handoff

Status: abgeschlossen und archiviert am 2026-05-21.

Rueckgabe:
`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-ge-spielraum-pattern.md`

## Ziel

Das funktionierende Qualitaetsmuster aus dem Gartenpost-Prototyp als kurze, wiederverwendbare Pattern-Spezifikation fuer die GE-Lernwerkstatt dokumentieren.

Zieldatei:

`/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`

Dieser Handoff ist absichtlich klein: **keine App-Integration**, keine neuen Komponenten, keine Dependencies.

## Kontext

Der Prototyp **Gartenpost - Zeig, wohin die Karte geht** wurde erfolgreich lokal erstellt und geprueft:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`

Hermes Memory hat festgehalten: Die starke Wirkung kommt nicht nur vom Einzelspiel, sondern vom wiederverwendbaren Muster:

**ruhiger GE-Spielraum + eine klare Handlung + grosse Touchziele + sichtbare Hilfen + getrennte Lehrkraftlogik**.

Dieses Muster soll spaeter in GE-Lernwerkstatt und LeseWerk uebertragen werden.

## Dateien

Lesen:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/BETA_3_0_QUALITAETSSTANDARD.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/LERNKREISLAUF_MODELL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-05-20-ge-spielraum-qualitaet/EXECUTE_PLAN.md`

Erstellen:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`

Ergebnis schreiben:

- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-ge-spielraum-pattern.md`

Nicht veraendern:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/package.json`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`

## Was Hermes schon gemacht hat

- Gartenpost-Prototyp als Standalone-Slice erzeugen lassen.
- Spielrunde, Hilfe, Lehrkraftdrawer und schmale Breite pruefen lassen.
- Memory-Eintrag geschrieben: `/Users/zondrius/hermes-workspace/memory/2026-05-20.md`
- Goal-Execute-Strang angelegt: `/Users/zondrius/hermes-workspace/memory/goals/2026-05-20-ge-spielraum-qualitaet/`

## Was Codex tun soll

1. Lies die oben genannten Kontextdateien.
2. Erstelle `GE-SPIELRAUM-PATTERN.md` als kurze, nutzbare Pattern-Spezifikation.
3. Beschreibe konkret:
   - Zweck;
   - Pflichtmerkmale;
   - Komponentenmodell;
   - UX-Regeln fuer Kindermodus;
   - Lehrkraft-/Beobachtungsregeln;
   - Datenschutz- und Asset-Regeln;
   - Uebertragung auf GE-Lernwerkstatt;
   - Uebertragung auf LeseWerk;
   - Pruefcheckliste fuer kuenftige Slices.
4. Halte die Spezifikation handlungsnah, nicht akademisch.
5. Schreibe einen kurzen Ergebnisbericht in die Codex-Outbox.

## Akzeptanzkriterien

- `GE-SPIELRAUM-PATTERN.md` existiert.
- Die Datei ist ohne weitere Quellen verstaendlich.
- Das Pattern benennt klar die wiederverwendbaren Bausteine aus Gartenpost.
- Die Datei enthaelt konkrete Do/Don'ts fuer GE-Kindermodus.
- Die Datei beschreibt, wie das Muster auf Leseuebungen uebertragen werden kann.
- Die Datei enthaelt eine pruefbare Checkliste.
- Keine App-Dateien wurden veraendert.
- Ergebnisbericht liegt in der Codex-Outbox.

## Risiken

- Zu abstrakte Pattern-Sprache waere fuer spaetere Handoffs wenig brauchbar.
- Zu konkrete Gartenpost-Kopie wuerde die Uebertragung auf LeseWerk erschweren.
- App-Integration in diesem Handoff waere zu frueh und wuerde Scope sprengen.

## Nicht tun

- Keine App-Integration.
- Keine neuen Dependencies.
- Keine externen Assets.
- Keine echten Daten.
- Keine Commits, Pushes oder Deployments.
- Keine automatische Erstellung weiterer Handoffs.

## Rueckgabe erwartet

Codex soll schreiben:

`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-ge-spielraum-pattern.md`

Die Rueckgabe soll enthalten:

- was erstellt wurde;
- welche Quellen genutzt wurden;
- wichtigste Pattern-Entscheidungen;
- Check, dass keine App-Dateien veraendert wurden;
- Risiken;
- naechste kleinste Aktion.
