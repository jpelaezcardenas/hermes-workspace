# Produktklarheit v1 – 10 Materialkorb Kartentypen Wort / Silbe / Satz

## Geändert
- `src/App.tsx`
  - Alpha73-Materialkorb um eine ruhige Kartentyp-Auswahl ergänzt: Wortkarte, Silbenkarte, Satzstarterkarte.
  - Druckkarten reagieren jetzt auf den gewählten Modus.
  - Deterministische Satzstarter-Hilfe ergänzt, ohne externe Datenquellen.
- `src/styles.css`
  - Neue Steuerung für die Kartentyp-Auswahl.
  - Print-Logik für die drei Modi ergänzt.
  - Satz- und Silbenkarten visuell stärker gemacht.

## Verhalten
- Wortkarte: großes Wort plus ruhiger Einordnungs-Hinweis.
- Silbenkarte: großes Wort plus deutlich sichtbare Silbenzeile.
- Satzstarterkarte: großes Wort plus einfacher, deterministischer deutscher Satzstarter aus Domänenwissen.
- Druckansicht bleibt A4-tauglich und versteckt die App nicht vollständig.
- UI bleibt teacher-facing und ohne Leistungsdruck.

## Verifikation
- `npm test -- --run` ✅ 239/239 Tests grün
- `npm run build` ✅ erfolgreich
- Source-Check: Kartentyp-Labels und Print-Klassen vorhanden ✅
- `index.html` enthält weiterhin `#root` ✅

## Risiken / offene Punkte
- Die Satzstarter sind bewusst simpel und regelbasiert; sprachlich sind sie passend, aber nicht inhaltlich tief personalisiert.
- Visuelle Feinabstimmung der drei Druckmodi könnte im Browser noch einmal geprüft werden, falls eine exakte Druckvorschau gewünscht ist.

## Codex-Nachprüfung 2026-05-31
- Kleine UI-Korrektur ergänzt: `.print-only` ist außerhalb von `@media print` jetzt standardmäßig versteckt, damit Druck-Introtexte nicht im normalen Lehrerbereich sichtbar werden.
- Danach erneut Tests und Build geprüft.
