# Phase 2F-B - Tisch Mikro-Prep Code Report

## Ergebnis

Die bestehende MiniJourneyPrep-Struktur wurde klein erweitert: `Tisch` hat jetzt eine lehrkraftseitige Vorbereitung fuer `t`, `i`, `s`, `ch` und `tisch`.

## Umgesetzt

- `src/lesewerk-content.mjs`
  - `miniJourneyPrepDefinitions` um `Tisch` ergaenzt.
  - Fuenf ruhige Prep-Schritte:
    - `t`: hoeren und zeigen
    - `i`: mit den Augen verfolgen
    - `s`: hoeren und zeigen
    - `ch`: als gemeinsames Zeichen anschauen, lehrkraftgefuehrt
    - `tisch`: vom Lautmuster zum ganzen Wort
  - Alle Schritte bleiben lokal, nicht persistent und ohne Druck-/Bewertungssprache.

- `src/App.tsx`
  - `MiniJourneyPrepAnchor` um `Tisch` erweitert, damit die vorhandene Lehrkraft-Prep-Aktion typsicher starten kann.
  - Keine neue Kindmodus-Struktur und kein zusaetzliches Dashboard eingefuehrt.

- `tests/lesewerk-content.test.mjs`
  - Neuer Test fuer Phase 2F-B:
    - prueft die genaue Tisch-Prep-Folge `t`, `i`, `s`, `ch`, `tisch`
    - prueft, dass die Aktion als Lehrkraft-Vorbereitung aktiviert wird
    - prueft, dass die Prep-Details nicht in die bestehende Kind-Mini-Reise leaken
    - prueft lokale/persistenzfreie und pressure-free Eigenschaften

## TDD-Nachweis

Der neue Phase-2F-B-Test wurde zuerst ausgefuehrt und schlug erwartbar fehl, weil `Tisch` noch auf die Sofa-Prep-Fallbackfolge fiel.

Danach wurde die minimale Implementierung ergaenzt und der Test erneut gruen ausgefuehrt.

## Verifikation

- `node --test --test-name-pattern='Phase 2F-B Tisch micro prep' tests/lesewerk-content.test.mjs`
  - zuerst rot mit erwarteter Abweichung: `['s', 'o', 'f', 'so', 'fa']` statt `['t', 'i', 's', 'ch', 'tisch']`
  - danach gruen
- `npm test`
  - 233/233 Tests gruen
- `npm run build`
  - gruen

## Bewertung

Gruen. Die Aenderung ist bewusst klein: Sie nutzt die vorhandene Readiness-/Prep-Struktur, macht das `ch`-Risiko im Lehrkraftfluss vorbereitbar und erweitert den Kindmodus nicht ueber die bestehende Prep-Szene hinaus.

## Rest-Risiken

- Kein neuer Browser-Smoke in diesem Slice; Phase 2F-A hatte den schmalen Kindfluss bereits freigegeben.
- Die tatsaechliche Sichtbarkeit des Tisch-Prep-Buttons haengt weiter vom aktuellen lokalen Profil/Gating ab, wie bei den bestehenden Prep-Ankern.
