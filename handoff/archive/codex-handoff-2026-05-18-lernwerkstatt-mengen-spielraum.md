# Archiviert: Codex Handoff

Status: abgeschlossen und archiviert am 2026-05-21
Ergebnis: `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md`
Kanban-Task: `t_63830980`

## Ziel

Die GE-Lernwerkstatt soll im vorhandenen Spiel `Mengen legen` einen engeren Beta-3.0-Kinder-Spielraum bekommen: Beim Start von `Mengen legen` sollen technischer App-Header und lange Lehrkraftnavigation nicht dominieren. Stattdessen soll ein ruhiger, kindgeführter Spielraum mit großen Touchzielen, Menge-Matte, Stein-Interaktion, Antwortwahl, Hilfe/Pause/Nochmal und sekundärem Rückweg entstehen.

## Kontext

Auslöser ist der Quality-Report vom 2026-05-18:

`/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-05-18.md`

Dort steht im Decision-Inbox-Block:

- `SOFORT_MACHEN: Folgeprompt für den engen Slice „Mengen legen als isolierter Beta-3.0-Spielraum“ ausführen lassen.`
- `Naechste kleinste Aktion: Den Folgeprompt als separaten Codex-/Coder-Slice starten, nicht als großen Gesamtumbau.`

Der Report beschreibt als größten Beta-3.0-Bruch: Nach dem Wechsel in `Mengen legen` werden wieder der technische Header `GE Lernwerkstatt Beobachtungs-App` und die umfangreiche Lehrkraftnavigation sichtbar. Die Startansicht ist bereits deutlich kindgerechter; der Spielraum soll jetzt enger isoliert werden.

## Dateien

Projektordner:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/`

Wahrscheinlich relevante Dateien:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/package.json`

Kontext- und Prüfdokumente:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-05-18.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/testpilot-mengen-legen-2026-05-16.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/BETA_3_0_QUALITAETSSTANDARD.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/APP_KONZEPT.md`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/SCHUELERMODUS_TESTSTRATEGIE.md`

Hinweis: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/` wurde vom Scout geprüft, enthält aber aktuell keine Dateien.

## Was Hermes schon gemacht hat

- Decision Inbox, Hermes-Control und aktuellen Lernwerkstatt-Quality-Report geprüft.
- Codex-Inbox geprüft: kein bereits offener ähnlicher Handoff gefunden.
- Der Slice wurde gegen die Handoff-Regeln geprüft: klein, lokal, prüfbar, ohne externe Veröffentlichung, ohne echte Schülerdaten, ohne Installationen, ohne Commits/Pushes/Deploys.
- Vorhandene Hinweise aus dem Quality-Report übernommen: Build lief dort bereits erfolgreich, Start → Mengen legen → zwei Steine → `2` wurde dort per DOM-Event erfolgreich geprüft.

## Was Codex tun soll

1. Lies zuerst die Kontextdateien, besonders den Quality-Report vom 2026-05-18 und den Beta-3.0-Qualitätsstandard.
2. Finde in `src/main.jsx` und `src/styles.css` die Struktur für den Kinderstart und das Spiel `Mengen legen`.
3. Ändere nur den engen Slice `Mengen legen`:
   - Im aktiven `Mengen legen`-Spiel soll die lange Lehrkraft-/App-Navigation nicht sichtbar oder nicht dominant sein.
   - Der technische Header `GE Lernwerkstatt Beobachtungs-App` soll den Kinder-Spielraum nicht dominieren.
   - Die bestehende Mengenlogik soll erhalten bleiben.
   - A/B/C-Niveau, Hilfe/Pause/Nochmal oder vergleichbare einfache Handlungen sollen kindgerecht und groß erreichbar bleiben.
   - Es soll einen sekundären, ruhigen Rückweg zur Übungsbibliothek/Lehrkraft-App geben.
4. Keine neuen Spiele, keine neue Datenlogik, keine neuen Dependencies, keine Symbolasset-Großbaustelle.
5. Prüfe danach lokal:
   - `npm run build`
   - App lokal öffnen/starten, falls im Projekt bereits üblich möglich.
   - Desktop und schmalen Viewport prüfen.
   - Interaktionspfad prüfen: Start → Mengen legen → zwei Steine legen → `2` wählen → ruhiges Erfolgsfeedback → Nochmal oder Zurück.
6. Schreibe das Ergebnis nach:

`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md`

## Akzeptanzkriterien

- `Mengen legen` öffnet in einem reduzierten Kinderlayout ohne lange Hauptnavigation als dominantes Element.
- Hauptaktion ist sofort sichtbar: Stein legen / Menge wählen / Hilfe oder Pause.
- A/B/C-Niveau bleibt erhalten oder gleichwertig zugänglich, aber einfacher und kindgerecht.
- Keine 1-10-Skala, keine Punkte, kein Timer, kein Ranking, keine rote Fehlerdramaturgie im Kinder-Spielraum.
- Ein vollständiger Pfad funktioniert: Start → Mengen legen → zwei Steine → `2` wählen → ruhiges Erfolgsfeedback → Nochmal oder Zurück.
- Desktop und schmaler Viewport sind geprüft und im Ergebnisbericht beschrieben.
- `npm run build` läuft erfolgreich.
- Ergebnisbericht liegt in der Codex-Outbox mit geänderten Dateien, Checks, verbleibenden Risiken und nächstem Kleinschnitt.

## Risiken

- Der Spielraum darf nicht versehentlich Lehrkraftfunktionen entfernen, die außerhalb des Kindermodus gebraucht werden.
- Die Trennung zwischen Kinderspielraum und Lehrkraft-/Beobachtungsbereich muss klar bleiben.
- Keine echten Schülerdaten verwenden oder erzeugen.
- Keine externen Assets einbauen; Emoji/Platzhalter sind für diesen Slice akzeptabel.
- Schmaler Viewport ist besonders riskant, weil die bisherige Navigation dort dicht wirken kann.

## Nicht tun

- Keine neuen Dependencies installieren.
- Keine echten Schüler-, Eltern- oder Diagnosedaten verwenden.
- Keine Veröffentlichung, kein Deployment, kein Commit, kein Push.
- Keine neuen Spiele oder große App-Umstrukturierung bauen.
- Keine Produkt-/Eduki-/Kommerzialisierungsentscheidung treffen.
- Keine lokalen Symbol-/Bildasset-Pakete integrieren.
- Keine Löschaktionen außerhalb minimal notwendiger Codeänderungen im engen Slice.

## Rueckgabe erwartet

Codex soll eine Ergebnisdatei schreiben nach:

`/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-18-lernwerkstatt-mengen-spielraum.md`

Die Rückgabe soll enthalten:

- was wurde umgesetzt;
- welche Dateien wurden geändert;
- welche Checks wurden ausgeführt;
- Ergebnis der Desktop- und schmaler-Viewport-Prüfung;
- Ergebnis des Pfads Start → Mengen legen → zwei Steine → `2` → Feedback → Nochmal/Zurück;
- verbleibende Risiken;
- was Hermes erinnern oder ignorieren soll;
- nächste kleinste Aktion.
