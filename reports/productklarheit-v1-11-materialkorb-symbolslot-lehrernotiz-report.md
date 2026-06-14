# Productklarheit v1 - 11 Materialkorb Bildfeld und Lehrerkommentar

## Ergebnis
Die Alpha73-Materialkorb-Ansicht wurde um ein ruhiges optionales Bild-/Symbolfeld ergänzt sowie um einen deterministischen Lehrerhinweis pro Karte.

## Umsetzung
- In `src/App.tsx` wurde ein Lehrer-Checkbox-Toggle `Bildfeld drucken / Bildfeld ausblenden` ergänzt.
- Jede Materialkorb-Karte kann nun einen stabilen Platzhalter `.materialkorb-symbol-slot` anzeigen.
- Für jede Karte wird ein `Lehrerhinweis` aus Kartentyp und Metadaten abgeleitet.
- Die bestehende `print-only`-Logik blieb erhalten.

## Prüfpunkte
- `npm test -- --run` ✅
- `npm run build` ✅
- Source-Check für Kartentypen, `print-only`, Symbolslot und Lehrerhinweis ✅

## Hinweise
- Keine externen Bilder, APIs oder Downloads verwendet.
- Der Platzhalter ist bewusst neutral und kann später für lizenzierte Symbolintegration genutzt werden.

## Codex-Nachprüfung 2026-05-31
- Kleine UI-Korrektur ergänzt: Die Basisgestaltung von `.materialkorb-controls` wurde wiederhergestellt, damit Kartentyp-Auswahl und Bildfeld-Steuerung als ruhige Lehrer-App-Controls erscheinen.
- Danach erneut Tests und Build geprüft.
