# LeseWerk Startklarheit Kinderpfad

Datum: 2026-05-27  
Handoff: `codex-handoff-2026-05-26-lesewerk-startklarheit-kinderpfad.md`

## Kurzfazit

Signal: Green

Der Startklarheits-Slice wurde umgesetzt. Der Kinderpfad zeigt die aktuelle Hauptaktion nun frueher: Der Fokusspiel-/Tagespfad-Bereich erscheint vor der laengeren Orientierung mit Leseweg und Schrittkarte. Die Orientierung bleibt erhalten, dominiert aber nicht mehr den ersten Spielbereich.

## Geaendert

- `src/App.tsx`
  - `FocusGameShell` wurde im Kinderpfad nach oben gezogen.
  - `GuidedReadingPath` und `MamaStepCard` wurden in einen nachgeordneten `child-orientation-stack` gelegt.
  - Die bestehende Lernlogik, Wortpost-Logik, Mini-Reisen und Lehrkraftsteuerung bleiben erhalten.
- `src/styles.css`
  - `child-orientation-stack` ergaenzt.
  - Fokusspiel im aktiven Kinderbereich explizit vor der Orientierung eingeordnet.
- `tests/lesewerk-content.test.mjs`
  - Neuer Test: `CEO Startklarheit child path shows focus game before orientation stack`.

## Dateien

Geaendert:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/lesewerk-content.test.mjs`

Erstellt:

- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/lesewerk-startklarheit-kinderpfad-2026-05-26.md`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/lesewerk-startklarheit-kinderpfad-start-390.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/lesewerk-startklarheit-wortpost-start-390.png`
- `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/reports/lesewerk-startklarheit-wortpost-round-390.png`

## Verifikation

- `npm test`
  - 239/239 bestanden
- `npm run build`
  - bestanden
- Lokaler Browser-Smoke:
  - URL: `http://127.0.0.1:4297/`
  - Browser: lokaler Google Chrome
  - Viewport: 390 x 844

## 390px-Smoke

Bestanden:

- Titel laedt: `LeseWerk V1`.
- Startansicht ohne horizontalen Overflow: `390/390`.
- Hauptaktion erscheint vor der nachgeordneten Orientierung:
  - `demoHeader`: 1395
  - `dailyPanel`: 1579
  - `orientation`: 3064
- `Tagespfad starten` sichtbar.
- `Lehrkraft -> Wortpost testen -> Kinderpfad` zeigt `Wortpost starten`.
- `Wortpost starten -> Postfach Mama` funktioniert.
- Rueckmeldung sichtbar:
  - `Die Wortpost ist angekommen.`
  - `Postfach Mama: Der Brief liegt richtig.`
- Nach Runde sichtbar:
  - `Nochmal`
  - `Weiter`
  - `Zur Lehrkraft`
- Nach Runde weiterhin kein horizontaler Overflow: `390/390`.
- Im geprueften Pfad keine sichtbaren Druckwoerter:
  - keine Punkte
  - kein Timer
  - kein Ranking
  - kein `falsch`
  - keine Note
  - kein schneller/verloren

## Bewertung

Der Slice loest den Kern des CEO-Handoffs: Die Hauptaktion ist im Kinderpfad frueher und klarer erreichbar. Es ist kein grosser Umbau und kein neuer Inhalt entstanden.

Das System ist damit wieder bereit fuer kleine, priorisierte Folgeslices. Neue Inhalte sind moeglich, aber nur wenn sie nicht wieder den ersten Kinderblick ueberladen.

## Verbleibende Risiken

- LeseWerk bleibt fachlich dichter als Gartenpost. Das ist wegen Leseleiter, Profilen und Mini-Reisen teilweise gewollt.
- Der erste Gesamtbildschirm enthaelt weiterhin Profilwahl und Tagespfad. Ein spaeterer zweiter Startklarheits-Slice koennte die Profilwahl noch ruhiger nach unten staffeln.
- Bestehende lokale `localStorage`-Nutzung fuer anonymen Profilzustand bleibt unveraendert und sollte weiter als bekannte lokale Persistenz markiert bleiben.

## Naechste kleinste Aktion

Nicht sofort neue Wortfamilien stapeln. Besser:

1. Einen kurzen Review laufen lassen: Wirkt der Kinderpfad im Screenshot jetzt klarer?
2. Danach entweder:
   - `GE-Spielraum naechster Slice`, oder
   - `LeseWerk Startklarheit 2`: Profilwahl noch ruhiger staffeln.
