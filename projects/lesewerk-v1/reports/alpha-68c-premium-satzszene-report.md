# Alpha 68C - Premium-Satzszene

Datum: 2026-05-21

## Ziel

Die Satzebene der bestehenden Mini-Reise sollte nicht mehr wie normaler Prompt-Text wirken, sondern als klarer, ruhiger und hochwertiger Lernmoment. Fokus: Satz lesen, Wortgrenzen sehen, Ankerwort erkennen, Silbenbezug behalten.

## Umgesetzt

- Der Satz-Layer wird erkannt ueber `layerLabel === 'Satz'`.
- Aus `station.childPrompt` wird die sichtbare Satzzeile gebildet.
- Vorangestelltes `Lies:` wird fuer die visuelle Satzbuehne entfernt.
- Die Satzszene zeigt grosse Wortkacheln, z. B.:
  - `Mama`
  - `ist`
  - `da.`
- Das Ankerwort wird stabil hervorgehoben, z. B. `Mama`.
- Die Silben bleiben in kleinerer Spur sichtbar:
  - `Ma`
  - `ma`
- Der Cue `Lies den Satz.` bleibt als sehr kurze Handlung sichtbar.
- Keine neuen Inhalte im grossen Stil, keine neuen Dependencies, keine externen Assets, keine echten Daten.

## Geaenderte Dateien

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

## Verifikation

- `npm test -- --run`: erfolgreich, 202/202 Tests bestanden.
- `npm run build`: erfolgreich.
- Desktop-Smoke unter `http://127.0.0.1:5212/`:
  - Lehrkraft -> `Mama-Mini-Reise starten` -> `Mini-Reise starten`
  - dreimal `Weiter` bis zur Satzstation
  - sichtbar: `Lies den Satz.`
  - sichtbar: `Jetzt: Satz`
  - aktive Pfadstation: `Satz`
  - Wortkacheln: `Mama`, `ist`, `da.`
  - Ankerwort hervorgehoben: `Mama`
  - Silbenspur: `Ma`, `ma`
  - kein horizontaler Overflow
  - keine Timer-/Punkte-/Ranking-/Noten-/Diagnose-/Cloud-/Upload-/Export-/Fehler-Woerter im Kindmodus gefunden
- Mobile-Smoke bei 390 x 844:
  - gleicher Pfad erfolgreich
  - kein horizontaler Overflow

## Screenshots

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68c-satzszene-desktop.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/smoke/alpha68c-satzszene-mobile.png`

## Bewertung

Gruen fuer diesen Slice. Die Mini-Reise hat jetzt fuer `Mama` eine klarere Premium-Progression:

`Bild -> Silben -> Wort -> Satz`

Der Satzmoment ist nun visuell eigenstaendig und didaktisch besser anschlussfaehig, weil Wortgrenzen, Ankerwort und Silbenbezug gleichzeitig sichtbar bleiben, ohne zu ueberladen.

Naechster sinnvoller Schritt: Alpha 68D sollte eine sehr kleine Abschluss-/Verstaendnisszene bauen, z. B. `Mama ist da. Was passt?`, aber wieder nur fuer eine Referenzeinheit und ohne neue Content-Flut.
