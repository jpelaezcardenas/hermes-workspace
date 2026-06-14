# Alpha 66B – Wortpost Profilsteuerung

## Ergebnis
- In der Lehrkraft-Startkarte der Wortpost wurde ein kompakter Bereich `Wortpost heute einstellen` ergänzt.
- Die Steuerung nutzt die bestehenden lokalen Profilstates (`localKnownGraphemes`, `localKnownSyllables`, `localSupportSettings`, `localReadiness`, `localAccessFocus`) und legt keine neue parallele Datenquelle für das Profil an.
- Drei Presets setzen die lokalen Profilstates direkt:
  - `Start: m + a` → Grapheme m/a, Silbe ma, Fokus Silbe, kleine Auswahl aktiv.
  - `Sofa-Pfad` → Grapheme m/a/s/o/f, Silben ma/so/fa, Fokus Wort, kleine Auswahl aus.
  - `Satz bereit` → Grapheme m/a/s/o/f/t/e, Silben ma/so/fa/tas/se, Fokus Satz, Satzbereitschaft aktiv.
- Die vorhandene Wortpost-Vorschau reagiert nach Auswahl sichtbar über Stufe, Begründung, nächsten Schritt und die drei Post-Karten.

## Geänderte Dateien
- `src/lesewerk-content.mjs`
  - `wortpostProfileControlUnits` ergänzt.
  - `getWortpostProfilePresets()` als exportierten Helper ergänzt.
- `src/App.tsx`
  - Helper importiert.
  - Presets per `applyWortpostProfilePreset()` an die bestehenden lokalen State-Setter angebunden.
  - Wortpost-Startkarte um Preset-Buttons und kleine Graphem-/Silben-Chips erweitert.
- `src/styles.css`
  - Kompakte, umbrechende Styles für Presets, Chips und Mobile ergänzt.
- `tests/lesewerk-content.test.mjs`
  - Preset-Sicherheit und Konsistenz getestet.
  - Erwartbare Entwicklungsstufen der Presets getestet.
  - Source-Test für den Wortpost-Steuerbereich ergänzt.

## Verifikation
- `npm test -- --run` bestanden: 169/169 Tests grün.
- `npm run build` bestanden.
- Browser-Smoke über lokalen Server `http://127.0.0.1:5188/`:
  - Lehrkraftbereich geöffnet.
  - Preset `Sofa-Pfad` per Button ausgelöst.
  - Vorschau wechselte nach React-Update von `Silbenbrücke` zu `Wortaufbau`.
  - Post-Karten reagierten sichtbar: u. a. `Mama`, `Sofa`, `Ball`.
  - `Wortpost testen` gestartet; Fokusraum wurde geöffnet.
  - Horizontaler Overflow im DOM-Check: `0`.
- Codex-Review-Smoke über frischen lokalen Server `http://127.0.0.1:5190/`:
  - Desktop: `Sofa-Pfad` wechselte die Vorschau von `Silbenbrücke` zu `Wortaufbau`.
  - Desktop: `Satz bereit` wechselte die Vorschau zu `Satzbrücke`.
  - Desktop: Kindmodus startete mit `Lies das Wort. Danach kommt ein kurzer Satz.`
  - Mobile 390px: Steuerbereich sichtbar, `Satz bereit` reagiert, kein Overflow.
  - Screenshots:
    - `reports/smoke/alpha66b-wortpost-desktop.png`
    - `reports/smoke/alpha66b-wortpost-mobile.png`

## Datenschutz / GE-Check
- Keine Namen, Diagnosen, Noten, Punkte, Timer, Ranking oder Speicherlogik ergänzt.
- Kindmodus erhält keine neuen Bedienelemente; die Steuerung liegt nur in der Lehrkraft-Startkarte.
- Presets sind lokale Planungshilfen und enthalten keine personenbezogenen Daten.

## Restlücken
- Mobile wurde per 390px Browser-Smoke geprüft, aber nicht auf einem echten physischen Tablet.
- Die Presets sind jetzt schnell bedienbar; eine noch bessere Vorher/Nachher-Anzeige wäre ein eigener Folge-Slice.

## Nächster sicherer Slice
- Alpha 66C könnte die Lehrkraft-Vorschau noch klarer machen: kleine Vorher/Nachher-Zeile `Aktuelle Stufe → nach Preset`, ohne neue Kindmodus-Elemente und ohne Speicherung.
