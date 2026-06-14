# Report: LeseWerk-Wochenplan Qualitätsrunde Sprache, Design, Mobile

Die Wochenplan-Darstellung in `#wochenplan` wurde sprachlich geglättet und visuell beruhigt. Die 5-Tage-Karte zeigt nun pro Tag eine rotierende Bibliothekskarte, einen kurzen Mini-Hinweis und eine klarere Material-/Support-Zeile, sodass der Bereich weniger repetitiv und besser scanbar wirkt.

## Was verbessert wurde

- Die Tageskarten im Wochenplan wurden sprachlich gestrafft:
  - kurze, handlungsnahe Formulierungen
  - weniger Wiederholungen
  - klarere Tageshierarchie über Fokus, Karte, Mini-Hinweis, Aufgabe und Support
- Der Materialbezug rotiert jetzt sichtbarer über die LeseWerk-Bibliothek statt sich wie eine feste Wiederholung anzufühlen.
- Die mobile Darstellung wurde vorsichtig stabilisiert:
  - Karten sind flexibler aufgebaut
  - die Tageskarten behalten klare innere Struktur
  - horizontales Overflow wurde geprüft und blieb aus
- Guardrails bleiben erhalten:
  - anonym
  - keine Etiketten
  - menschlich prüfen

## Verifikation

- `index.html` lädt lokal erfolgreich über HTTP.
- Der Bereich `#wochenplan` enthält 5 Tageskarten.
- Alle Pflichtfelder werden weiter angezeigt: Karte, Aufgabe, Beobachtungsfrage, Materialbezug und Support-Hinweis.
- Keine Diagnose-/Medizinbegriffe wurden im Wochenplanbereich gefunden.
- Browser-Check: kein horizontaler Overflow (`scrollWidth` ≤ `innerWidth`).

## Hinweise

- Die Umsetzung bleibt bewusst konservativ; es wurden keine neuen externen Abhängigkeiten ergänzt.
- Der Wochenplan bleibt datensparsam und ohne echte Schülerdaten.
