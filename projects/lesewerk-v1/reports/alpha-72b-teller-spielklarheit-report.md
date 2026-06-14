# Alpha 72B - Teller Spielklarheit

Datum: 2026-05-21
Status: umgesetzt, lokal geprueft, review-required

## Was wurde verbessert?

Der vorhandene Teller/Tasse-Moment wurde nicht inhaltlich erweitert, sondern als klarerer Kinderspiel-Moment priorisiert:

- Die Hauptinteraktion steht jetzt direkt nach Orientierung und Tischszene.
- Die Lernspur Bild/Silbe/Wort/Satz/Mini-Geschichte bleibt vorhanden, liegt aber als ruhigere Begleitung nach der Spielhandlung.
- Die Frage `Zeig Teller.` ist groesser und visueller Mittelpunkt der Interaktionskarte.
- Die beiden Optionen `Teller` und `Tasse` sind groessere Karten mit lokalen CSS-Bildankern fuer Teller und Tasse.
- Fokus- und Touch-Ziele wurden fuer die Optionskarten verstaerkt.
- `Nochmal` bleibt in der Interaktion ruhig; `Fertig` bleibt erreichbar, dominiert aber nicht die Hauptaufgabe.

## Spielklarheitsentscheidung

Die Reihenfolge fuer das Kind ist jetzt:

1. Blickanker: Ueberschrift, kurze Orientierung und Tischszene mit Teller/Tasse.
2. Hauptaufgabe: `Zeig Teller.` als grosse, zentrale Frage.
3. Auswahl: genau zwei grosse Optionskarten `Teller` und `Tasse`.
4. Rueckmeldung: ruhig und informativ, ohne Drucksprache.
5. Danach: `Nochmal` optional; `Fertig` bleibt unterhalb erreichbar.
6. Lernspur: Bild/Silbe/Wort/Satz/Mini-Geschichte bleibt sichtbar, aber sekundär nach der Spielhandlung.

Damit konkurriert die Lernspur nicht mehr mit der Kinderhandlung. Alpha 72A hatte die erste Interaktion gebaut; Alpha 72B macht diese Interaktion zum klaren Zentrum.

## Geaenderte Dateien

- `src/App.tsx`
  - Interaktionsblock vor die sekundäre Lernspur verschoben.
  - Neue lokale Wrapper `object-family-play-panel` und `object-family-learning-trail` ergaenzt.
  - Optionsbuttons behalten exakt `Teller` und `Tasse`, erhalten aber dekorative lokale CSS-Symbolanker.
- `src/styles.css`
  - Spielpanel, Lernspur, groessere Frage, groessere Optionskarten, Focus-Visible und Narrow-Regeln fuer den Teller/Tasse-Moment ergaenzt/geschaerft.
  - Keine externen Assets, keine neuen Dependencies.
- `tests/lesewerk-content.test.mjs`
  - Alpha-72B-Guards fuer Reihenfolge Hauptinteraktion vor Lernspur, exakt zwei Optionen, Druckwort-Ausschluss und CSS-Touch-/Focus-/Narrow-Regeln ergaenzt.
- `reports/alpha-72b-teller-spielklarheit-report.md`
  - Dieser Report.

## TDD / Testergebnis

RED:

- Neue Alpha-72B-Tests wurden vor der Umsetzung angelegt.
- `npm test -- --run` schlug erwartungsgemaess fehl:
  - `object-family-play-panel` / `object-family-learning-trail` fehlten;
  - Interaktion stand noch nicht als Hauptaktion vor der Lernspur;
  - CSS-Guards fuer grosses Spielpanel, Touch-Ziele, Focus-Visible und Narrow-Layout fehlten.

GREEN / final:

- `npm test -- --run`: 221/221 bestanden.
- `npm run build`: erfolgreich.

## Browser-Smoke

Lokaler Build wurde ueber Python-HTTP-Server auf `http://127.0.0.1:52776/` geprueft.

Desktop-Pfad:

1. App geoeffnet.
2. `Lehrkraft` gewaehlt.
3. `Objekt-Moment starten` ausgefuehrt.
4. Teller-Moment sichtbar.
5. Sichtpruefung erfolgreich:
   - Frage `Zeig Teller.` sichtbar;
   - Tischszene sichtbar;
   - Optionen exakt `Teller` und `Tasse` sichtbar;
   - Lernspur erscheint nach der Hauptinteraktion;
   - Auswahl `Teller` zeigt Feedback `Ja. Teller. Der Teller liegt auf dem Tisch.`;
   - `Nochmal` erscheint nach Feedback;
   - `Fertig` bleibt erreichbar und fuehrt zum Abschluss mit `Der Teller-Moment ist fertig.`.

Narrow-Smoke per Same-Origin-Frame:

- Framebreite: 390px.
- `window.innerWidth`: 390.
- Frage `Zeig Teller.` sichtbar.
- Optionskarten sichtbar: `Teller`, `Tasse`.
- Optionsgrid bricht auf eine Spalte um (`gridTemplateColumns`: ca. `268px`).
- Optionskarten: ca. 268px breit, 92px hoch.
- Spielpanel: ca. 324px breit.
- Feedback nach `Teller` sichtbar.
- `Fertig` erreichbar.
- Kein horizontaler Overflow (`scrollWidth` = `clientWidth` = 390).

Browser-Konsole: keine gemeldeten JS-Fehler im abschliessenden Check.

## GE-/Datenschutz-Check

- Keine neuen Inhalte, keine neue Wortfamilie, keine neue Diagnostik.
- Keine Speicherung, kein localStorage, keine Cloud, keine externen Assets.
- Studentensicht bleibt ohne Score, Timer, Ranking, Noten oder rote Fehlerlogik.
- Rueckmeldung bleibt informativ: Die Auswahl wird benannt und der Teller ruhig verortet.
- Es entstehen keine personenbezogenen Daten.

## Was ist besser als Alpha 72A?

- Alpha 72A hatte die Interaktion noch nach der Bild/Silbe/Wort/Satz-Karte; Alpha 72B stellt die Handlung direkt nach die Tischszene.
- Die Optionsbuttons wirken jetzt wie Hauptaktionen statt wie kleine Nebenbuttons.
- Teller und Tasse sind in den Optionskarten visuell gekoppelt an die Tischszene.
- Die Lernspur bleibt fachlich erhalten, wirkt aber weniger dominant.
- Narrow-Layout ist explizit fuer das Spielpanel und die Optionskarten abgesichert.

## Testpilot-Kurzcheck

### Basal

- Staerke: Frage, Szene und grosse Karten sind mit Blick und Finger erfassbarer.
- Risiko: CSS-Symbole sind weiterhin lokale Platzhalter, kein validiertes UK-Symbolmaterial.
- Hilfe: Reale Tasse/Teller koennen parallel gezeigt werden.

### Unterstuetzt

- Staerke: Maximal zwei Optionen; Wiederholung ueber `Nochmal` ohne Druck.
- Risiko: Bei sehr kleiner Displayhoehe bleibt der gesamte Moment scrollig, weil die Lernspur bewusst erhalten bleibt.
- Hilfe: Erst gemeinsam Teller zeigen, dann digital antippen.

### Symbolisch / erweitert

- Staerke: Wort, Symbol, Szene und Satzanker bleiben verbunden, ohne ein Arbeitsblatt-Gefuehl in den Vordergrund zu stellen.
- Grenze: Es ist weiterhin genau eine Unterscheidung, keine flexible Transferuebung.

### Lehrkraft im Alltag

- Startbarkeit: Startpfad aus dem Lehrkraftbereich bleibt gleich.
- Beobachtbar: Wird die kurze Aufforderung wahrgenommen? Wird eine der zwei Karten gezielt gewaehlt? Wird Wiederholung benoetigt?
- Nicht enthalten: Keine neue Dokumentation, keine Diagnose, keine Speicherung.

## Staerken

- Kleine, lokale Aenderung im vorhandenen Teller/ObjectFamily-Moment.
- TDD-Guards sichern Reihenfolge, Optionenzahl, Druckfreiheit und CSS-Qualitaet.
- Build und Browser-Smoke erfolgreich.
- Keine neuen Inhalte oder externen Assets.

## Schwaechen

- UI-Tests bleiben quellenbasiert statt komponentenbasiert mit React Testing Library.
- CSS-Symbole sind brauchbare lokale Platzhalter, aber kein lizenziertes UK-/Symbolset.
- Narrow-Smoke nutzt einen Same-Origin-Frame, keine echte Tablet-Hardware.

## Risiken

- Echte Tablets koennen wegen Browser-UI/Zoom leicht andere vertikale Scrollpositionen zeigen.
- Die Lernspur ist jetzt sekundär, aber auf kleinen Hoehen weiterhin unterhalb der Hauptaufgabe scrollig.
- Die neue Spielklarheit ist nur fuer diesen Teller/Tasse-Moment gebaut, noch kein allgemeines Interaktionssystem.

## Offen fuer Alpha 72C oder Alpha 73A

- Falls weiter veredelt werden soll: echte lokale, lizenzklare Symbol-/Materialanker fuer Teller/Tasse pruefen.
- Optional spaeter: eine kleine Hilfe-/Modellierfunktion, aber nur wenn sie die Zwei-Optionen-Klarheit nicht stoert.
- Keine Content-Expansion aus Alpha 72B heraus gestartet.

## Next best prompt

Pruefe Alpha 72B im Review: Ist die neue Reihenfolge Szene -> `Zeig Teller.` -> zwei grosse Optionen -> Feedback -> Lernspur fuer den Kindermoment klar genug? Wenn ja, erst danach entscheiden, ob Alpha 72C lokale Symbol-/Materialanker oder eine kleine Hilfe-Modellierung pruefen soll.
