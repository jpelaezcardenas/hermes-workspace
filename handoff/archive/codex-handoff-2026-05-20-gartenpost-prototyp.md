# Codex Handoff

Status: abgeschlossen und archiviert am 2026-05-21.

Rueckgabe:
`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`

CEO-Review:
Die Rueckgabe erfuellt den engen Standalone-Slice: lokale HTML-Datei, Desktop-/Mobile-Screenshots, gepruefte Spielrunde, Hilfepruefung, Lehrkraftdrawer, Datenschutzcheck und keine App-Integration. Naechster Schritt ist nicht erneuter Prototypbau, sondern Pattern-Dokumentation und spaetere paedagogische Sichtung.

## Ziel

Einen ersten lokalen, Beta-3.0-nahen Prototyp für das GE-Lernwerkstatt-Spiel **„Gartenpost – Zeig, wohin die Karte geht“** erstellen. Der Prototyp soll als kleiner, prüfbarer Slice entstehen: zentrale Karte, 2–3 große Briefkästen, Antippen statt Drag-only, ruhige Zustellanimation, Hilfe/Nochmal/Fertig und getrennter Lehrkraftdrawer.

## Kontext

Auslöser ist das Game-Lab-Konzept vom 2026-05-20:

`/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/game-concept-2026-05-20.md`

Dort ist der kleinste buildbare erste Schnitt beschrieben: entweder sicheres Standalone-HTML in `game-lab/gartenpost-prototyp.html` oder minimale Integration in die bestehende App, wenn Build-Risiko gering ist. Für diesen Handoff gilt: **Standalone-HTML bevorzugen**, damit der Slice klein bleibt und das offene ältere Mengen-legen-Handoff nicht berührt wird.

Pädagogischer Rahmen: GE, basaler/konkret-handelnder/symbolischer Zugang, keine echten Schülerdaten, keine Diagnostik-Automatik, keine Punkte/Timer/Rankings/rote Fehlerlogik.

## Dateien

Projektordner:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/`

Primäre Quelldatei für diesen Slice:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/game-concept-2026-05-20.md`

Zieldatei bevorzugt:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`

Kontext- und Prüfdokumente:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/BETA_3_0_QUALITAETSSTANDARD.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/APP_KONZEPT.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/LERNKREISLAUF_MODELL.md`

Nicht verändern, außer Codex begründet ausdrücklich ein sehr geringes Risiko:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/package.json`

## Was Hermes schon gemacht hat

- Handoff-Übersicht, Vorlage, Decision-Inbox und Control-Tower vom 2026-05-20 geprüft.
- Offene Codex-Inbox geprüft: Es gibt bereits ein offenes Handoff zu `Mengen legen`, aber kein offenes ähnliches Handoff zu `Gartenpost`.
- Game-Lab-Konzept vom 2026-05-20 gelesen und auf Handoff-Tauglichkeit geprüft.
- Datenschutz-/Risiko-Check: Der Slice ist lokal, ohne echte Schülerdaten, ohne externe Assets, ohne Veröffentlichung, ohne Installationen, ohne Commit/Push/Deploy und als Standalone-Datei prüfbar.

## Was Codex tun soll

1. Lies zuerst `game-lab/game-concept-2026-05-20.md` sowie die drei Kontextdokumente `BETA_3_0_QUALITAETSSTANDARD.md`, `APP_KONZEPT.md` und `LERNKREISLAUF_MODELL.md`.
2. Erstelle bevorzugt eine einzelne Standalone-Datei:
   - `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`
3. Baue darin nur den ersten lokalen Prototyp:
   - heller Garten-/Postraum;
   - große zentrale Bildkarte;
   - 2–3 große Briefkästen als Touchziele;
   - Level A/B/C als Lehrkraft-/Einstellungsoption, nicht als Leistungsdruck;
   - Buttons `Hilfe`, `Nochmal`, `Fertig`;
   - Karte antippen → Briefkasten antippen → ruhige Zustellanimation → wertschätzendes Feedback;
   - Hilfe mindestens als `Weniger Briefkästen` oder `Zeig es mir` umsetzen;
   - getrennter Lehrkraftdrawer mit Level, Hilfegrad, Kommunikationsform, kurzem nächsten Schritt und optionaler situativer 1–10 nur dort.
4. Nutze nur lokale Platzhalter-Symbole/Emojis. Markiere sie im UI oder Kommentar als Platzhalter, keine externen Assets laden.
5. Prüfe lokal:
   - Datei im Browser öffnen, z. B. über lokalen statischen Server oder direkt per Datei-URL;
   - vollständige Interaktion testen: Karte antippen, Briefkasten antippen, Feedback sehen, Nochmal oder Fertig;
   - mindestens eine Hilfe testen;
   - schmale Breite prüfen: keine Überlappung, große Touchflächen bleiben nutzbar.
6. Schreibe die Rückgabe nach:

`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`

## Akzeptanzkriterien

- `game-lab/gartenpost-prototyp.html` existiert und ist lokal ohne Build-/Installationsschritt öffnbar.
- Der Prototyp wirkt als eigener Gartenpost-Spielraum, nicht als Formular oder Dashboard.
- Antippen ist die Hauptbedienung; Drag-only ist nicht erforderlich.
- Es gibt eine große Karte, große Briefkästen und die Buttons `Hilfe`, `Nochmal`, `Fertig`.
- Eine Runde funktioniert vollständig: Karte antippen → Briefkasten antippen → ruhige Animation/Ankunft → wertschätzendes Feedback → Nochmal oder Fertig.
- Mindestens eine Hilfehandlung funktioniert (`Weniger Briefkästen` oder `Zeig es mir`).
- Lehrkraftinformationen sind getrennt im Drawer/Panel; keine 1–10-Skala im Kinderbereich.
- Keine Punkte, kein Timer, kein Ranking, keine rote Fehlerdramaturgie, keine echten Namen, keine Diagnosen, keine Cloud, kein Tracking.
- Schmale Breite wurde geprüft und im Ergebnisbericht beschrieben.
- Ergebnisbericht liegt in der Codex-Outbox mit Dateien, Checks, Risiken und nächstem kleinen Schritt.

## Risiken

- Der Prototyp darf nicht wie eine reine Sortierformular-Übung wirken; der Gartenpost-Raum soll sichtbar werden.
- Emojis/Symbole sind nur Platzhalter und nicht als lizenzgeklärte Symbolassets zu behandeln.
- Lehrkraftdrawer darf die Kinderfläche nicht dominieren.
- Keine echten Schüler-, Eltern-, Diagnose- oder Familiendaten verwenden.
- Bestehende App nicht unnötig anfassen, solange Standalone-HTML den Zweck erfüllt.

## Nicht tun

- Keine neuen Dependencies installieren.
- Keine externen Assets, CDNs, Tracking, Cloud, Login, KI-Auswertung oder Foto-Uploads einbauen.
- Keine Veröffentlichung, kein Deployment, kein Commit, kein Push.
- Keine Klassenverwaltung, kein Export, keine große Symbolbibliothek, keine Produkt-/Eduki-Entscheidung.
- Das offene `Mengen legen`-Handoff nicht bearbeiten oder ersetzen.
- Keine sensiblen oder personenbezogenen Daten erzeugen oder speichern.

## Rueckgabe erwartet

Codex soll eine Ergebnisdatei schreiben nach:

`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`

Die Rückgabe soll enthalten:

- was umgesetzt wurde;
- welche Dateien geändert/erstellt wurden;
- wie der Prototyp lokal geöffnet wurde;
- welche Checks ausgeführt wurden;
- Ergebnis der vollständigen Spielrunde;
- Ergebnis der Hilfeprüfung;
- Ergebnis der schmalen Breitenprüfung;
- GE-/Datenschutzprüfung;
- verbleibende Risiken;
- was Hermes erinnern oder ignorieren soll;
- nächste kleinste Aktion.
