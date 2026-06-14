# Ball Mini-Reise Small Patch Report

Date: 2026-05-26

## Ziel

Ein kleiner, kontrollierter LeseWerk-Slice wurde umgesetzt: Die vorhandene Mini-Reise-Logik wurde um das alltagsnahe Zielwort `Ball` erweitert, ohne die bestehenden Reisen `Mama`, `Sofa`, `Tasse` und `Lama` zu brechen.

## Umgesetzt

- Neuer Wortfamilien-Pack `word-family-ball`.
- Neue Ball-Mini-Reise mit fünf Schritten: `Bild`, `Silbe`, `Wort`, `Satz`, `Mini-Geschichte`.
- Kindgerechte Satzspur: `Der Ball rollt.`
- Ball als eigener visueller Symbolanker in der Reise-Auswahl.
- Ball als lokales CSS-Symbol in der Mini-Geschichte.
- Lehrkraft-Rationale und Readiness-Übersicht erweitert.
- Kontrolltests auf die fünfte Mini-Reise aktualisiert.

## Qualitätssicherung

- `npm test`: grün, 228/228 Tests bestanden.
- `npm run build`: grün.
- Mobile Smoke-Test auf 390px Breite: Seite lädt, `Ball` ist im ausgelieferten Build sichtbar, kein horizontaler Overflow.

## Einschätzung

Dieser Slice ist bewusst klein und stabil. Er verbessert die Alltagstauglichkeit, weil `Ball` ein starkes GE-nahes Wort mit konkreter Handlung ist: anschauen, rollen, Wortkarte wählen, kurzen Satz lesen. Für den nächsten Ausbau sollten weitere Wörter nach genau diesem Muster folgen, jeweils einzeln oder in kleinen Paaren.

## Nächster empfohlener Slice

Weitere hochwertige Mini-Reisen aus dem bekannten Schülerwortschatz ergänzen, zum Beispiel `Bus`, `Buch`, `Tasse`, `Apfel`, `Wasser`, `Haus`, aber immer mit:

- bekannter Buchstaben-/Silben-Gating-Prüfung,
- Bild → Silbe/Wort → Satz → Mini-Geschichte,
- maximal zwei Auswahlkarten im Kindermodus,
- lokaler CSS-Symbolik statt externer Bildabhängigkeit,
- Tests vor Build.
