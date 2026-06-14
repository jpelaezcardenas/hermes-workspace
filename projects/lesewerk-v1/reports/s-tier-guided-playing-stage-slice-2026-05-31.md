# S-Tier Guided Playing Stage Slice - 2026-05-31

## Ziel

Nach dem Klick auf `Tagespfad ruhig starten` soll die laufende Aufgabe mehr wie eine eigenstaendige Kinder-App-Buehne wirken: eine grosse sichtbare Handlung, wenig Text, klare Weiter-/Nochmal-Buttons.

## Umsetzung

- `GuidedFocusStage` zeigt jetzt pro Schritt ein grosses Symbol.
- Die eigentliche Handlung liegt in einer hellen zentralen Buehne.
- Die Aufforderung ist kurz und kindnah:
  - `Schau genau.`
  - `Klatsch mit.`
  - `Lies ruhig.`
  - `Lies den Satz.`
  - `Hoer und schau.`
  - `Spur nach.`
- Der lange Spielraum-Hilfetext wird im Spielmodus ausgeblendet.
- `Zur Lehrkraft` ist auch im laufenden Spielmodus kleiner und sekundär.

## Verifikation

- `npm test -- --run`: 244/244 bestanden.
- `npm run build`: erfolgreich.
- Mobile-Viewport 390x844:
  - Spielmodus aktiv.
  - Symbol sichtbar: `🖼️`
  - zentrale Handlung sichtbar: `Bild anschauen. Wort zeigen.`
  - kurzer Cue sichtbar: `Schau genau.`
  - `Zur Lehrkraft` bleibt sekundär mit 118px Breite.
  - Screenshot: `reports/s-tier-guided-playing-stage-final-2026-05-31.png`

## Naechster sinnvoller Slice

Die Mini-Reise-Buehne nach demselben Muster veredeln, damit `Meine Reisen` nicht nur startet, sondern im laufenden Zustand genauso hochwertig wirkt wie der Tagespfad.
