# Phase 2C - Apfel Mini-Reise Code Report

## Ergebnis

Apfel ist als kleine, profile-gated Mini-Reise ergaenzt.

## Umgesetzt

- Apfel-Familie mit bekannten Einheiten `a`, `p`, `f`, `e`, `l` und `ap/fel`.
- Fuenf Stationen: Bild, Silbe, Wort, Satz, Mini-Geschichte.
- Satz: `Der Apfel ist da.`
- Mini-Geschichte: `Der Apfel ist da. Was passt?`
- Lehrkraft-Rationale und Readiness-Uebersicht.
- Lokales CSS-Symbol fuer Apfel, ohne externe Bilder oder geschuetzte Assets.
- UI-Anbindung fuer Auswahl, Symbolszene, Silbenanzeige und Story-Choice.

## CEO-Korrektur

Der Hermes-Worker hatte Apfel bereits weitgehend eingebaut, lief aber nicht sauber zu Ende. Danach wurden gezielt repariert:

- fehlender `getApfelFamilyMiniJourney` Export,
- Type-Anbindung in `App.tsx`,
- alte Test-Erwartungen fuer Rationales/Readiness/Silbenlogik,
- inkonsistenter Distraktor `Banane` mit Tasse-Symbol; jetzt bewusst `Die Tasse ist da.` mit Tasse-Symbol.

## Verifikation

- `npm test`: 230/230 Tests gruen.
- `npm run build`: gruen.
- Direkter Inhaltscheck: Apfel-Karte erscheint bei passendem Profil; Prompts lauten Bild, Silbe, Wort, Satz, Mini-Geschichte in richtiger Reihenfolge.

## Naechste Empfehlung

Jetzt nicht sofort 20 Woerter in Code kippen. Naechster guter Schritt ist Phase 2D: S-Tier Wortschatz-Bibliothek planen und daraus die besten naechsten 5 Code-Slices auswaehlen.
