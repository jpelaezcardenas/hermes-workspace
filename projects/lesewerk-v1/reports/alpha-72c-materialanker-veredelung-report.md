# Alpha 72C - Materialanker Veredelung

Datum: 2026-05-21
Status: umgesetzt, lokal geprueft, review-required

## Was wurde visuell verbessert?

Alpha 72C veredelt nur die lokalen CSS-Materialanker im bestehenden Teller/Tasse-Spielmoment:

- Teller in Szene und Optionskarte:
  - flacher, ovaler Teller mit sichtbarem Aussenrand;
  - zusaetzlicher Innenring ueber `::before`;
  - helle Innenflaeche ueber `::after`;
  - ruhige creme/gelbe Tellerfarbigkeit mit radialem Verlauf statt flachem Fleck.
- Tasse in Szene und Optionskarte:
  - klarerer Becherkoerper mit Rand und warmem Blauverlauf;
  - sichtbare Oeffnung/Innenflaeche ueber `::before`;
  - eindeutiger Henkel ueber `::after`;
  - gleiche Formensprache in Tischszene und Optionssymbol.
- Optionskarten:
  - waermere, ruhigere Kartenflaeche per hellem Verlauf;
  - bestehende starke Raender, Schatten und Focus-Visible bleiben erhalten;
  - keine Animation, kein Score-/Game-UI, keine zusaetzlichen Farben.
- Narrow:
  - explizite Symbolgroessen fuer ca. 390px Breite ergaenzt;
  - Teller/Tasse bleiben untereinander und laufen nicht aus den Buttons.

## Warum hilft das Kindern im GE-Bereich?

Die Veraenderung verbessert die bildliche Unterscheidbarkeit ohne neue Aufgabe. Der Teller ist flach/rund mit Innenflaeche, die Tasse hat Koerper, Oeffnung und Henkel. Damit passen Szene und Antwortkarten staerker zusammen: Das Kind kann `Teller` und `Tasse` eher als dieselben konkreten Dinge erkennen, bevor es den Text lesen muss. Die Aufgabe bleibt ruhig: `Zeig Teller.` mit genau zwei grossen Optionen.

## Geaenderte Dateien

- `src/styles.css`
  - CSS-Formen fuer `.object-family-cup`, `.object-family-plate`, `.object-family-option-symbol-cup`, `.object-family-option-symbol-plate` veredelt.
  - Optionskarten optisch waermer gemacht.
  - Narrow-Regeln fuer Optionssymbole ergaenzt.
- `tests/lesewerk-content.test.mjs`
  - Alpha-72C-Guards fuer lokale Materialanker, Szene/Option-Kopplung, externe-Asset-Freiheit und Narrow-Symbolgroessen ergaenzt.
- `reports/alpha-72c-materialanker-veredelung-report.md`
  - Dieser Report.

`src/App.tsx` wurde nicht geaendert.

## TDD / Testergebnis

RED:

- Neue Alpha-72C-Tests wurden vor der CSS-Umsetzung angelegt.
- Erster Lauf `npm test -- --run` schlug erwartungsgemaess fehl:
  - veredelte Teller-Merkmale fehlten (`::before`, Border/Innenring/radialer Verlauf);
  - veredelte Tassen-Merkmale fehlten (Border/Oeffnung/Henkel-Schaerfung/Verlauf);
  - Szene/Option-Kopplungs-Guards fuer veredelte Objektanker schlugen fehl;
  - Premium-Optionskarten und Narrow-Symbolgroessen fehlten.

GREEN / final:

- `npm test -- --run`: 224/224 bestanden.
- `npm run build`: erfolgreich.

## Browser-Smoke

Lokaler Build wurde ueber Python-HTTP-Server auf `http://127.0.0.1:52777/` geprueft.

Desktop-Pfad:

1. App geoeffnet.
2. `Lehrkraft` gewaehlt.
3. `Objekt-Moment starten` ausgefuehrt.
4. Teller-Moment sichtbar.
5. Sichtpruefung:
   - `Zeig Teller.` vorhanden;
   - Tischszene mit Teller/Tasse sichtbar;
   - Optionskarten exakt `Teller` und `Tasse` sichtbar;
   - Teller-Option und Tasse-Option sind visuell unterscheidbar;
   - Icons und Beschriftungen ueberlappen nicht und ragen nicht aus den Karten.
6. `Teller` ausgewaehlt:
   - Feedback `Ja. Teller. Der Teller liegt auf dem Tisch.` sichtbar.
7. `Fertig` ausgefuehrt:
   - Abschluss `Teller-Moment ist fertig.` erreichbar.

Browser-Vision-Kurzcheck:

- Die zwei grossen Karten `Teller` und `Tasse` wirken als Antwortoptionen.
- Icons und Texte sind nicht gequetscht.
- Kein sichtbares Ueberlaufen der Optionssymbole.
- Hinweis: Im sichtbaren Desktop-Screenshot war ein Teil der umliegenden Seite am Rand abgeschnitten, der zentrale Spielmoment blieb aber nutzbar.

Narrow-Smoke per Same-Origin-Frame:

- Framebreite / `window.innerWidth`: 390px.
- Kein horizontaler Overflow: `scrollWidth` = `clientWidth` = 390.
- Optionsgrid: eine Spalte (`gridTemplateColumns`: ca. `268px`).
- Optionskarten: ca. 268px breit, 92px hoch.
- Optionssymbole:
  - Teller: ca. 78px breit, 34px hoch.
  - Tasse: ca. 50px breit, 50px hoch.
- Spielpanel: ca. 324px breit.
- Szene: ca. 324px breit, 190px hoch.
- `Zeig Teller.` sichtbar.
- Feedback nach Teller-Auswahl sichtbar.
- `Fertig` erreichbar.

Browser-Konsole: keine gemeldeten JS-Fehler im abschliessenden Check.

## Was ist besser als Alpha 72B?

- Alpha 72B hatte bereits grosse Optionskarten, aber Teller/Tasse waren noch einfachere CSS-Platzhalter.
- Alpha 72C macht den Teller eindeutiger flach/rund mit Rand und Innenflaeche.
- Alpha 72C macht die Tasse eindeutiger als Becher mit Oeffnung und Henkel.
- Szene und Optionskarten sprechen jetzt konsequenter dieselbe visuelle Sprache.
- Narrow-Symbolgroessen sind explizit abgesichert.

## Testpilot-Kurzcheck

### Basal

- Staerke: Teller/Tasse koennen staerker ueber Form wahrgenommen werden, nicht nur ueber Text.
- Risiko: CSS-Symbole bleiben lokale Platzhalter, kein validiertes UK-Symbolmaterial.
- Hilfe: Reale Tasse und realer Teller koennen weiterhin parallel auf dem Tisch liegen.

### Unterstuetzt

- Staerke: Zwei grosse Optionen, ruhige Wiederholung, keine Fehlermarkierung.
- Risiko: Bei sehr kleiner Displayhoehe bleibt der gesamte Moment scrollig, weil Lernspur und Navigation erhalten bleiben.
- Hilfe: Erst Szene gemeinsam anschauen, dann Teller in der Option antippen.

### Symbolisch / erweitert

- Staerke: Zielwort, Szene, Optionssymbol und Satzanker bleiben verbunden.
- Grenze: Es bleibt bewusst nur eine Unterscheidung, keine neue Transfer- oder Satzaufgabe.

### Lehrkraft im Alltag

- Startbarkeit: Startpfad `Lehrkraft` -> `Objekt-Moment starten` bleibt gleich.
- Beobachtbar: Orientiert sich das Kind an Szene/Form? Waehlt es gezielt Teller? Braucht es reales Material oder Wiederholung?
- Nicht enthalten: Keine neue Dokumentation, keine Diagnose, keine Speicherung.

## GE-/Datenschutz-Check

- Keine neuen Inhalte, keine neue Wortfamilie, keine neue Diagnostik.
- Keine Speicherung, kein localStorage, keine Cloud, keine externen Assets.
- Studentensicht bleibt ohne Score, Timer, Ranking, Noten oder rote Fehlerlogik.
- Zielwort `Teller` bleibt Hauptorientierung.
- Es entstehen keine personenbezogenen Daten.

## Staerken

- Sehr kleiner CSS-Slice im vorhandenen Moment.
- Keine App-Logik oder Datenstruktur geaendert.
- TDD-Guards sichern die visuelle Materialanker-Qualitaet quellenbasiert ab.
- Build, Tests und begrenzter Browser-Smoke erfolgreich.

## Schwaechen

- Die Tests pruefen CSS-Struktur quellenbasiert, nicht pixelgenau.
- Browser-Smoke nutzt fuer Narrow wieder einen Same-Origin-Frame statt echte Tablet-Hardware.
- CSS-Symbole sind hochwertigere lokale Platzhalter, aber kein lizenziertes UK-/Symbolset.

## Risiken

- Pseudo-Elemente koennen je nach Browser leicht anders gerendert werden.
- Auf echten Tablets koennen Zoom und Browser-UI vertikale Ausschnitte leicht veraendern.
- Die Veredelung ist nur fuer diesen Teller/Tasse-Moment umgesetzt, kein allgemeines Symbolsystem.

## Offen

- Review durch Codex/CEO: Ist die neue visuelle Sprache ruhig genug und klarer als Alpha 72B?
- Optional spaeter: echtes lokales, lizenzklares Symbolmaterial pruefen. Nicht in Alpha 72C umgesetzt.

## Next best prompt

Reviewe Alpha 72C visuell: Sind Teller und Tasse in Szene und Optionskarten fuer den GE-Kindermoment klarer als Alpha 72B, ohne unruhig oder ueberdekoriert zu wirken? Wenn ja, Alpha 72C freigeben und erst danach ueber Alpha 73A entscheiden.
