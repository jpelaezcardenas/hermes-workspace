# Productklarheit v1 – 12 Mini-Förderreihe aus Wortkarte

Datum: 2026-05-31
Projekt: /Users/zondrius/hermes-workspace/projects/lesewerk-v1

## Ergebnis
- Alpha-73 Materialkorb erweitert um den neuen Modus „Mini-Förderreihe“ (`reihe`).
- Druckkarten zeigen jetzt vier ruhige Schritte: Wort sehen, Silben hören/klatschen, Satz anfangen, Lesehandlung.
- Bestehende Modi Wortkarte, Silbenkarte und Satzstarterkarte bleiben erhalten.
- Bildfeld-Schalter, Lehrerhinweis, `print-only`-Verhalten und `materialkorb-controls`-Basisstruktur blieben erhalten.

## Technische Änderungen
- `src/App.tsx`
  - `cardMode` um `reihe` erweitert.
  - Neue deterministische Mini-Förderreihe-Schrittliste ergänzt.
  - Kartentyp-Auswahl um „Mini-Förderreihe“ erweitert.
  - Lehrerhinweis für den neuen Modus ergänzt.
- `src/styles.css`
  - Print-Styling für `.materialkorb-mini-foerderreihe` ergänzt.
  - Kompakte Schritt-Boxen für den A4-Druck ergänzt.

## Verifikation
- `npm test -- --run` → 239/239 Tests bestanden
- `npm run build` → erfolgreich
- Source-Check: `Förderreihe`, `createMiniFoerderreiheSteps`, `print-only`, `materialkorb-controls`, `materialkorb-symbol-slot`, bestehende Kartentypen geprüft

## Hinweise
- Keine externen Assets, keine Netzaufrufe, keine AI/API-Nutzung.
- Der neue Modus bleibt bewusst ruhig und low-load für GE-Lernsettings.

## Codex-Nachprüfung 2026-05-31
- Kleine CSS-Korrektur ergänzt: Die Reihe-spezifischen Druckregeln zielen jetzt auf `.materialkorb-print-panel[data-card-mode='reihe']`, weil `data-card-mode` am Panel und nicht am einzelnen Karten-Element sitzt.
- Danach erneut Tests und Build geprüft.
