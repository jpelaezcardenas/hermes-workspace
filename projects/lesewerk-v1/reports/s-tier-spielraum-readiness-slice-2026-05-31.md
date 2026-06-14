# S-Tier Spielraum Readiness Slice - 2026-05-31

## Ziel

Den Kinder-Spielraum vor dem Start weniger erklaerend und staerker als App-Erlebnis gestalten: grosses Symbol, kurzer Handlungssatz, klarer Startknopf.

## Umsetzung

- `FocusGameShell` erhaelt einen `focus-game-shell-ready` Zustand.
- Im Bereit-Zustand zeigt der Spielraum:
  - ein grosses Symbol (`📅`, `🚀`, `🎁`, `✉️`)
  - einen kurzen Handlungssatz wie `Schau. Klatsch. Lies.`
  - einen grossen Startknopf
- Lange Helfertexte im Spielraum-Kopf werden vor dem Start ausgeblendet.
- Tagespfad-Header, Hilfestreifen und Orientierungsstapel verschwinden im Bereit-Zustand, damit die Spielhandlung sofort oben sichtbar ist.
- `Zur Lehrkraft` ist im Bereit-Zustand kleiner und sekundär, damit es nicht mit dem Kinder-Start konkurriert.

## Verifikation

- `npm test -- --run`: 243/243 bestanden.
- `npm run build`: erfolgreich.
- Browser-/Viewport-Pruefung mit 390x844:
  - `Mein Tag` zeigt direkt `Tagespfad Mama`, Symbol `📅`, Cue `Schau. Klatsch. Lies.`
  - Tagespfad-Header und Hilfestreifen sind im Bereit-Zustand ausgeblendet.
  - Screenshot: `reports/s-tier-mein-tag-ready-final2-2026-05-31.png`

## Naechster sinnvoller Slice

Den gestarteten Spielraum selbst weiter verdichten: Die laufende Aufgabe zeigt noch den Spielraum-Kopf plus Aufgabenkarte. Naechster Schritt waere eine noch klarere laufende Aufgabenbuehne mit einer grossen Handlung, einem Wort/Symbol und maximal zwei Buttons.
