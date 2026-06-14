# LeseWerk Alpha 7 - Final Watchdog Review

Status: accepted after Codex recheck  
Datum: 2026-05-17

## Kurzurteil

Alpha 7 ist akzeptiert. Die Content-Basis enthält 12 geprüfte deutsche Mini-Stories, die drei Blueprint-Cluster sind abgedeckt, die Story-Tests sind vorhanden, und `npm test` sowie `npm run build` laufen erfolgreich durch.

Der ursprüngliche Hermes-Watchdog hatte wegen einer vermeintlichen Browser-Akzeptanzlücke blockiert: Im damaligen lokalen Browserlauf schien der Antwortbutton `Ball` nicht sichtbar in den Feedbackzustand zu wechseln. Codex hat diesen Befund auf einem frischen lokalen Preview-Port nachgeprüft. Ergebnis: Der Story-Flow funktioniert. `Story lesen` -> Antwort `Ball` wechselt sichtbar zu `Gut gelesen.`, und die Lehreransicht zeigt danach die passende Story-Evidence.

## Gelesene Grundlagen

- `reports/product-spec.md`
- `reports/alpha-6-watchdog-review.md`
- `reports/alpha-7-content-blueprint.md`
- `reports/alpha-7-story-quality-review.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

## 1. Alpha-7-Endprodukt

Erfüllt.

Geprüfter Stand:

- 12 deutsche Mini-Stories vorhanden;
- drei Story-Cluster vorhanden:
  - Alltag - Dinge und Handlungen: 4 Stories;
  - Schule und Klassenalltag: 4 Stories;
  - Sozial und emotional: 4 Stories;
- Story-Quality-Review liegt vor: `reports/alpha-7-story-quality-review.md`;
- stärkere Story-Tests sind im Testlauf sichtbar:
  - Story-Cluster-Test;
  - kurze lesbare Texte und genau ein Verständnismoment;
  - sinnvolle Antwortoptionen ohne Füllmaterial;
  - Datenschutz-/Asset-Sicherheit;
  - text-only gesture hints;
  - reduzierte Story-Auswahl;
  - Story-Evidence in Teacher Summary;
  - adaptive Platzierung zu `Story verstehen`.

## 2. Technische Verifikation

### `npm test`

Ergebnis: bestanden.

- 36 Tests
- 36 bestanden
- 0 fehlgeschlagen

### `npm run build`

Ergebnis: bestanden.

```text
> lesewerk-v1@0.1.0 build
> tsc -b && node scripts/build.mjs
```

## 3. Browser-Recheck durch Codex

Frischer lokaler Preview:

```text
http://127.0.0.1:4291/?codex-alpha7-recheck=...
```

### Kinder-Story-Flow

Geprüft:

1. App geöffnet.
2. `Story lesen` gewählt.
3. Story `Der Ball im Garten` war sichtbar.
4. Frage `Was liegt im Garten?` war sichtbar.
5. Antwortbutton `Ball` geklickt.

Ergebnis:

- Die App wechselte sichtbar zu `Gut gelesen.`
- Die Feedbackkarte zeigte `Du hast die wichtige Sache erkannt.`
- Die nächsten Schritte `Nochmal`, `Leichter`, `Weiter`, `Fertig` waren sichtbar.

Damit ist der ursprüngliche Blocker nicht reproduziert.

### Lehrer-/Content-Pfad nach Story-Antwort

Geprüft:

1. Nach beantworteter Story `Lehrkraft` geöffnet.
2. Lehreransicht zeigte `Planung für heute`.
3. Story-Evidence war sichtbar:
   - `Story-Verstehen wurde mit kurzer Auswahlhilfe beobachtet.`
4. Vorschlag war sichtbar:
   - `Heute passt vermutlich Story verstehen mit kurzer Frage.`
5. Lokale Druckvorschau war sichtbar.
6. Datenschutztext war sichtbar:
   - keine Datei;
   - kein Upload;
   - keine automatische Speicherung.

Ergebnis: bestanden.

## 4. Safety-/Privacy-Check

Bestanden für die geprüften Inhalte und sichtbaren Pfade.

Geprüft gegen die Produktregeln:

- lokal-only: ja;
- anonym: ja, Farb-/Symbolprofile statt Namen;
- kein Login sichtbar;
- keine Cloud-/Upload-Funktion sichtbar;
- keine realen Schülernamen in den geprüften Produktinhalten;
- keine Diagnose-/Noten-/Score-/Ranking-/Timer-/Schamsprache im sichtbaren Produktflow;
- keine geschützten/METACOM-Assets in der aktiven App;
- keine `ge-lernwerkstatt`-Modifikation;
- kein Commit und kein Push.

Hinweis: Begriffe wie `METACOM`, `Ranking`, `Timer`, `Diagnose`, `Cloud` erscheinen in Reports und Spezifikationen als Verbots-/Prüfbegriffe. In der aktiven App ergab sich daraus keine Produktverletzung.

## 5. Kleiner Produkt-Fix

Codex hat nach dem Recheck eine sichtbare Versionskorrektur durchgeführt:

- `src/App.tsx`: Header von `LeseWerk Alpha 6 · lokale Demo` auf `LeseWerk Alpha 7 · lokale Demo` geändert.

Danach wurden erneut ausgeführt:

- `npm test`: bestanden, 36/36.
- `npm run build`: bestanden.

## 6. Akzeptanzentscheidung

Verdikt: Accept.

Begründung:

- Content-Ziel erreicht.
- Story-Review akzeptiert.
- Tests und Build grün.
- Story-Antwort-Flow funktioniert im frischen Browser-Recheck.
- Lehreransicht zeigt Story-Evidence nach beantworteter Story.
- Lokale Druckvorschau und Datenschutztext bleiben sichtbar.
- Keine aktive Safety-/Privacy-Verletzung gefunden.

## 7. Empfehlung für Alpha 8

Alpha 8 sollte nicht erneut Content ausweiten. Der sinnvollste nächste Schritt ist ein kleiner, realitätsnaher Pilotmodus:

1. Lehrer-Pilotprotokoll für eine 10- bis 15-Minuten-Erprobung.
2. Lokale, anonyme Beobachtungskarte ohne Namen.
3. Realer Tablet-/Touch-Check: Kinderpfad, Storypfad, Lehrerpfad, Reset, Druckvorschau.

Ziel: nicht mehr Umfang, sondern kontrollierte Unterrichtstauglichkeit.
