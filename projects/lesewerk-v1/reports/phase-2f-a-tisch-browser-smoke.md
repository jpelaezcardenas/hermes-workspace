# Phase 2F-A - Tisch Browser Tablet Smoke

## Ampel

Yellow-Green.

## Was geprueft wurde

- LeseWerk `dist` lokal im Browser bei 390px Breite.
- Startseite / Kindpfad auf horizontalen Ueberlauf, Druckwoerter und sichtbare Orientierung.
- Direkter Inhaltscheck fuer ein passendes Tisch-Profil.

## Ergebnisse

- 390px Startansicht hat keinen horizontalen Ueberlauf.
- Buttons sind gross genug und touchfreundlich.
- Keine Druckwoerter im sichtbaren Starttext: keine Punkte, Timer, Ranking, Score, Diagnose, Fehler.
- Screenshot: `reports/phase-2f-a-start-390.png`
- Beobachtungsdaten: `reports/phase-2f-a-browser-smoke-observation.json`
- Die Standard-Startansicht zeigt Tisch nicht sofort. Das ist fachlich erwartbar, weil Tisch profile-gated ist und nicht fuer das frueheste Demo-Profil freigeschaltet wird.
- Direkter Inhaltscheck mit passendem Profil zeigt:
  - Karte: `Tisch`
  - Prompts:
    - `Schau den Tisch an.`
    - `Lies: Tisch.`
    - `Lege oder wähle Tisch.`
    - `Lies: Der Tisch ist da.`
    - `Der Tisch ist da. Was passt?`

## Beobachtungspunkt

Die App braucht spaeter eine leichtere Lehrkraft-Moeglichkeit, gezielt ein Profil mit `t/i/s/ch/tisch` zu waehlen oder sichtbar zu machen, welche Mini-Reisen nur durch Gating verborgen sind. Aktuell kann Chris sonst denken, Tisch fehle, obwohl er korrekt vorhanden ist.

## Entscheidung

Phase 2F-B darf starten. Der Smoke blockiert nicht. Die naechste sinnvolle Verbesserung ist eine kleine Tisch-Vorbereitung, damit `t/i/s/ch/tisch` vor der Mini-Reise ruhig angebahnt wird.
