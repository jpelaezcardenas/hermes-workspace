# Alpha 68D - Premium-Verstehensszene

Datum: 2026-05-21

## Ziel

Nach der Premium-Satzszene sollte die Mini-Geschichte nicht mehr wie ein normaler Prompt wirken. Ziel war eine kleine, druckfreie Verstehensszene: Das Kind liest `Mama ist da.` und sieht zwei grosse Karten zu `Was passt?`.

## Umgesetzt

- `Mini-Geschichte` wird nun als eigene Szene erkannt:
  - `isStoryLayer = station.label === 'Mini-Geschichte'`
- Die Szene ist getrennt von der normalen Satzszene.
- Sichtbar sind:
  - Frage: `Was passt?`
  - Satz/Bedeutung: `Mama ist da.`
  - zwei grosse Auswahlkarten:
    - `Mama ist da`
    - `Da ist Licht`
- Die Karten sind bewusst ohne Score, ohne richtig/falsch-Rueckmeldung, ohne Fehlerlogik.
- Fuer andere Wortfamilien ist die Zielkarte passend vorbereitet:
  - Sofa: `Das Sofa ist da`
  - Tasse: `Die Tasse ist da`
  - Lama: `Das Lama ist da`
- Mama/Sofa/Tasse/Lama bleiben mit fuenf Stationen gueltig.

## Geaenderte Dateien

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

## Verifikation

- `npm test -- --run`: erfolgreich, 203/203 Tests bestanden.
- `npm run build`: erfolgreich.
- Lokale Vorschau neu gestartet unter `http://127.0.0.1:5212/`.
- Desktop-Smoke:
  - Lehrkraft -> `Mama-Mini-Reise starten` -> `Mini-Reise starten`
  - viermal `Weiter` bis `Mini-Geschichte`
  - sichtbar: `Was passt?`
  - sichtbar: `Mama ist da.`
  - genau zwei Karten sichtbar:
    - `Mama ist da`
    - `Da ist Licht`
  - `Fertig` sichtbar
  - kein horizontaler Overflow
  - keine Timer-/Punkte-/Ranking-/Noten-/Diagnose-/Cloud-/Upload-/Export-/Fehler-/falsch-Woerter im Kindmodus gefunden
- Mobile-Smoke bei 390 x 844:
  - gleicher Pfad erfolgreich
  - kein horizontaler Overflow

## Screenshots

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68d-verstehensszene-desktop.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68d-verstehensszene-mobile.png`

## Bewertung

Gruen fuer diesen Slice. Die Referenz-Mini-Reise hat jetzt eine vollstaendigere Lernkurve:

`Bild -> Silben -> Wort -> Satz -> Verstehen`

Der wichtigste Fortschritt: Das Kind sieht nicht nur einen Satz, sondern bekommt eine sehr einfache, visuelle Bedeutungsentscheidung. Das bleibt GE-passend, weil es druckfrei, lokal, kurz und ohne Bewertungssprache umgesetzt ist.

Naechster sinnvoller Schritt: Alpha 68E sollte eine visuelle Review-/Qualitaetsrunde sein: einmal die komplette Mama-Mini-Reise als Kind durchlaufen, Screenshots vergleichen, Abstaende/Hierarchie/Buttonlogik polieren, aber keine neue Funktion hinzufuegen.
