# Phase 2G-B - Heft Visual Smoke

## Ergebnis

Heft hat jetzt eine eigene lokale Symbolform und ist visuell klarer von Buch und Tisch getrennt.

## Umgesetzt

- `src/App.tsx`
  - Heft nutzt nicht mehr die Buch-Innenform.
  - Heft bekommt eigene Elemente:
    - `mini-journey-heft-cover`
    - `mini-journey-heft-line`
    - `mini-journey-heft-label`
  - Der Mini-Reise-Selector kann Heft als eigenes Wort-Symbol darstellen.

- `src/styles.css`
  - Eigene Heft-Fläche ergänzt:
    - blauer Heftdeckel
    - helle Linien
    - kleines Etikett
  - Heft bekommt eine eigene ruhige Hintergrundfläche im Selector.

- `tests/lesewerk-content.test.mjs`
  - Neuer Test `Phase 2G-B Heft has a distinct local visual symbol and meaningful story choice`.
  - Prüft lokale Heft-Klassen, Story-Auswahl und keine externen/protected Assets.

## Verifikation

- `node --test --test-name-pattern="Phase 2G-B" tests/lesewerk-content.test.mjs`
  - 1/1 grün
- `npm test`
  - 237/237 grün
- `npm run build`
  - grün

## Browser-Smoke

- URL: `http://127.0.0.1:4181/index.html?phase2gb=heft`
- Viewport: 390 x 844
- Ergebnis:
  - kein horizontaler Überlauf: `0`
  - keine Druckwörter im sichtbaren Default-Kindmodus
  - Screenshot: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/phase-2g-b-heft-390.png`

Hinweis: Heft wurde im Default-Browserstart nicht sichtbar, weil Heft korrekt über das lokale Profil/Gating geschützt ist. Die visuelle Heft-Integration wurde deshalb zusätzlich über Source-/Unit-Tests abgesichert.

## Bewertung

Grün mit kleinem Browser-Hinweis. Die technische und visuelle Heft-Struktur ist da; die echte Heft-Sichtbarkeit im Browser sollte im nächsten Slice über einen expliziten Lehrkraft-Profil-Start oder eine kleine Test-Route geprüft werden.

## Nächster sinnvoller Slice

Phase 2G-C:

- Heft als bewusst auswählbaren Lehrkraft-Preset sichtbar machen.
- Danach Heft-Mini-Reise im Browser wirklich starten.
- Nur UI-Zugang/Smoke, keine neuen Wörter.
