# Alpha 71C - Teller Narrow Smoke

Datum: 2026-05-21
Status: umgesetzt, lokal geprueft

## Ziel

Tablet- und Narrow-Smoke fuer den vorhandenen Teller-Mini-Moment aus Alpha 71B. Ziel war visuelle Ruhe, klare Orientierung und gute Lesbarkeit. Kein neuer Inhalt, keine neue Wortfamilie, keine neue Auswahlhandlung, keine neue Diagnostik.

## Gepruefte Viewports

Geprueft wurde der finale Build ueber lokalen Preview-Server `http://127.0.0.1:52774`.

- Tablet-Smoke: `768x1024` per eingebettetem Same-Origin-Browsing-Context.
  - `window.innerWidth`: 768
  - `.object-family-scene`: ca. 643px breit, 220px hoch
  - `.object-family-layer-grid`: 2 Spalten
  - `.object-family-step-path`: 2 Spalten
  - Teller, Tasse und Tisch hatten messbare Breiten; Finish-Button war vorhanden.
- Schmal/mobile-Smoke: `390x844` per eingebettetem Same-Origin-Browsing-Context.
  - `window.innerWidth`: 390
  - `.object-family-scene`: 324px breit, 190px hoch
  - `.object-family-layer-grid`: 1 Spalte
  - `.object-family-step-path`: 1 Spalte
  - Satz `Der Teller ist auf dem Tisch.` blieb vorhanden; Finish-Button war vorhanden.
- Zusaetzlich sichtbarer Browser-Smoke im laufenden Browser: Szene wurde aufgerufen und zur Szene gescrollt.

Hinweis: Die CLI-Browsersteuerung hat keine direkte Viewport-Umschaltung angeboten. Deshalb wurden die zwei Zielbreiten im selben Origin ueber eingebettete Browsing-Contexts gemessen und der sichtbare Browser-Smoke zusaetzlich visuell geprueft.

## Was war gut sichtbar?

- Der Startpfad Lehrkraft -> `Objekt-Moment starten` fuehrt weiterhin in den Teller-Mini-Moment.
- Die Orientierung `Was liegt auf dem Tisch?` und `Schau: Der Teller steht auf dem Tisch. Die Tasse steht daneben.` bleibt ruhig und gut lesbar.
- Bild, Silbe, Wort und Satz sind als getrennte Karten sichtbar; auf Tablet brechen sie ruhiger in zwei Spalten, auf schmaler Breite in eine Spalte.
- Der Satz `Der Teller ist auf dem Tisch.` bleibt gross und dominant.
- Im finalen visuellen Szenen-Check waren Sofa, Tisch, Tasse und Teller sichtbar und unterscheidbar. Tasse und Teller liegen getrennt auf dem Tisch.
- Keine Score-, Timer-, Ranking-, Fehler- oder Diagnose-Sprache im geprueften Text.

## Was musste nachjustiert werden?

- `.object-family-scene` hatte im ersten Browser-Smoke keine eigene Breite und renderte dadurch effektiv mit 0px Breite. Die Tischszene war nicht sichtbar.
- Orientierungskarte, Szene, Layer-Grid und Step-Pfad bekamen begrenzte Maximalbreiten und zentrierte Ausrichtung, damit die Karten nicht unruhig ueber die volle Stage laufen.
- Die Narrow-Regel wurde fuer die Objektfamilie auf Tablet-Breiten erweitert:
  - bis 820px: Layer-Grid und Step-Pfad mit 2 Spalten
  - bis 560px: Layer-Grid und Step-Pfad mit 1 Spalte
- Die Tischbeine wurden von 94px auf 58px reduziert, weil sie im sichtbaren Szenen-Smoke leicht geclippt wirkten.

## Geaenderte Dateien

- `src/styles.css`
  - kleine CSS-Politur nur an Objektfamilien-Szene, Orientierung, Layer-Grid, Step-Pfad und Tischform.
- `tests/lesewerk-content.test.mjs`
  - Guard fuer Alpha 71C: Szene braucht Breite; Narrow-Regeln fuer Layer-Grid und Step-Pfad muessen existieren.
- `reports/alpha-71c-teller-narrow-smoke-report.md`
  - dieser Report.

## Tests und Build

- Vor CSS-Fix:
  - `npm test -- --run`: 213/213 bestanden
  - `npm run build`: erfolgreich
- Nach CSS-Fix und Test-Guard:
  - `npm test -- --run`: 214/214 bestanden
  - `npm run build`: erfolgreich
- Nach letzter Tischbein-Korrektur final erneut:
  - `npm test -- --run`: 214/214 bestanden
  - `npm run build`: erfolgreich

## Testpilot-Kurzcheck

### Basal

- Staerke: Die konkrete Szene ist wieder sichtbar; Tasse und Teller sind als verschiedene Formen getrennt wahrnehmbar.
- Risiko: CSS-Formen bleiben Platzhalter und ersetzen kein validiertes UK-Symbolmaterial.

### Unterstuetzt

- Staerke: Bild/Silbe/Wort/Satz brechen auf kleineren Breiten ruhiger um und bleiben getrennt.
- Hilfe: Lehrkraft kann weiter mit realem Teller/Tasse/Tischmaterial parallel arbeiten.

### Symbolisch / erweitert

- Staerke: Der Satz bleibt dominant und wird nicht durch neue Aufgaben verwässert.
- Risiko: Der Moment bleibt passiv gefuehrt; bewusst keine neue Auswahlhandlung in Alpha 71C.

### Lehrkraft im Alltag

- Startbarkeit: Objekt-Moment startet aus dem Lehrkraftbereich wie zuvor.
- Beobachtbar: Ob das Kind Szene, Teller/Tasse-Unterscheidung und Satzanker wahrnimmt.
- Fehlend: Keine neue Dokumentation, keine Speicherung, keine Diagnostik; bewusst ausserhalb dieses Slices.

## Staerken

- Minimaler CSS-Fix mit direkter Ursache: Szene hatte keine Breite.
- Tablet- und Narrow-Umbruch sind jetzt explizit abgesichert.
- Keine neuen Inhalte, keine neue Wortfamilie, keine neue Diagnostik.
- Tests und Build sind final gruen.

## Schwaechen

- Viewport-Smoke wurde technisch ueber eingebettete Same-Origin-Frames gemessen, nicht ueber echte Geraeteemulation des Browser-Tools.
- Die CSS-Szene ist weiterhin ein lokaler Platzhalter, kein echtes Symbolset.
- Der ganze Mini-Moment ist auf kleinen Hoehen weiterhin scrollig; das ist wegen der vorhandenen Informationsmenge erwartbar.

## Risiken

- Bei echten Tablets mit anderer Browser-UI/Zoom kann die vertikale Scrollposition anders wirken.
- Pseudo-CSS-Objekte koennen je nach Browser leicht anders aussehen.

## Empfehlung fuer Alpha 72A

Nicht sofort neue Woerter hinzufuegen. Der naechste sichere Schritt waere ein kleiner Interaktions-Slice fuer genau diesen Teller-Moment, z.B. eine einzige ruhige, optionale `Zeig Teller`-/`Zeig Tasse`-Handlung mit realer Materialbruecke, aber nur wenn die Bild-/Textdichte dadurch nicht wieder steigt. Alternativ zuerst echte lokale Symbol-/Materialplatzhalter fuer Teller/Tasse/Tisch pruefen.
