# Alpha 72A - Teller/Tasse Interaktion

Datum: 2026-05-21
Status: umgesetzt, lokal geprueft, review-required

## Was wurde gebaut?

Der vorhandene Teller-Mini-Moment wurde um genau eine kindgerechte Zwei-Optionen-Interaktion erweitert:

- Frage: `Zeig Teller.`
- Option 1: `Teller`
- Option 2: `Tasse`
- Auswahl `Teller`: `Ja. Teller. Der Teller liegt auf dem Tisch.`
- Auswahl `Tasse`: `Das ist die Tasse. Der Teller ist daneben.`
- Danach bleibt `Nochmal` direkt in der Interaktion moeglich; `Fertig` und `Zur Lehrkraft` bleiben sichtbar erreichbar.

Die bestehende Bild/Silbe/Wort/Satz/Mini-Geschichte-Logik bleibt erhalten. Es wurde keine neue Wortfamilie, kein dritter Distraktor und keine Speicherung eingefuehrt.

## Warum ist das didaktisch der richtige naechste Schritt?

Alpha 71B/71C hatten den Teller-Moment bereits ruhiger und stabiler gemacht, aber der Moment blieb noch weitgehend gefuehrt/passiv. Alpha 72A fuegt deshalb nicht mehr Inhalt hinzu, sondern genau eine beobachtbare Handlung: Teller und Tasse in derselben Tischszene unterscheiden.

Das passt zum GE-Kontext, weil die Aufgabe konkret, kurz und wiederholbar ist:

- nur zwei alltagsnahe Optionen;
- keine Punkte, kein Timer, keine Fehlermarkierung;
- klare Trennung von Teller und Tasse in Bild und Sprache;
- grosse Touch-Buttons;
- ruhige, informative Rueckmeldung statt Bewertung.

## Rueckmeldelogik

Die Rueckmeldung ist bewusst informativ und nicht bewertend:

- Bei `Teller` wird bestaetigt und der Satzanker wiederholt.
- Bei `Tasse` wird die Auswahl benannt und der Teller ruhig daneben verortet.

Es gibt kein `falsch`, keine rote Fehlerlogik, keine Punkte, keinen Score, keinen Timer, keine Note und kein Ranking. Die Lehrkraft kann beobachten, ob das Kind die Zielaufforderung wahrnimmt, ob es Teller/Tasse unterscheidet und ob eine Wiederholung oder Materialhilfe sinnvoll ist. Es wird nichts gespeichert.

## Geaenderte Dateien

- `src/lesewerk-content.mjs`
  - `childMiniMoment.interaction` mit Prompt, exakt zwei Optionen und druckfreien Feedbacktexten ergaenzt.
- `src/App.tsx`
  - lokaler React-State fuer die ausgewaehlte Option ergaenzt;
  - Interaktionskarte mit zwei Buttons, Feedback und `Nochmal` eingefuegt;
  - `Fertig` / `Zur Lehrkraft` bleiben unveraendert erreichbar.
- `src/styles.css`
  - grosse touchfreundliche Optionsbuttons, Feedbackkarte und schmale Einspaltenregel ergaenzt.
- `tests/lesewerk-content.test.mjs`
  - Alpha-72A-Guards fuer exakt Teller/Tasse, druckfreie Feedbacktexte, UI-Klassen/State und keine neuen Objektwoerter ergaenzt.
- `reports/alpha-72a-teller-tasse-interaction-report.md`
  - dieser Report.

## Testergebnis

TDD-Status:

- RED: Neue Alpha-72A-Tests wurden zuerst geschrieben und `npm test -- --run` schlug erwartungsgemaess fehl:
  - `interaction` fehlte;
  - UI-Interaktionsklassen/State fehlten.
- GREEN: Nach minimaler Implementierung bestanden alle Tests.

Final:

- `npm test -- --run`: 218/218 bestanden.
- `npm run build`: erfolgreich.

## Browser-Smoke

Lokaler Build wurde ueber einen Python-HTTP-Server auf `http://127.0.0.1:52775/` geoeffnet.

Hinweis: `npm run preview` auf Port 4173 konnte nicht starten, weil Port 4173 bereits belegt war (`OSError: [Errno 48] Address already in use`). Deshalb wurde der gebaute `dist`-Ordner auf Port 52775 serviert.

Gepruefter sichtbarer Pfad:

1. App geoeffnet.
2. `Lehrkraft` gewaehlt.
3. `Objekt-Moment starten` ausgefuehrt.
4. Teller-Mini-Moment sichtbar.
5. Interaktion sichtbar:
   - Prompt `Zeig Teller.`
   - Buttons `Teller` und `Tasse`.
6. `Teller` ausgewaehlt:
   - Feedback `Ja. Teller. Der Teller liegt auf dem Tisch.` sichtbar.
7. `Tasse` ausgewaehlt:
   - Feedback `Das ist die Tasse. Der Teller ist daneben.` sichtbar.
8. `Fertig` bleibt erreichbar und fuehrt zum Finish-Screen `Der Teller-Moment ist fertig.`.

Narrow-Smoke per Same-Origin-Frame:

- Framebreite: ca. 386px.
- Optionen sichtbar: `Teller`, `Tasse`.
- Optionsgrid bricht auf eine Spalte um (`gridTemplateColumns`: ca. `284px`).
- Interaktionskarte: ca. 320px breit.
- Feedback nach `Teller` sichtbar.
- `Fertig` erreichbar.

Browser-Konsole: keine gemeldeten JS-Fehler im abschliessenden Check.

## Testpilot-Kurzcheck

### Basal

- Staerke: Eine kurze Aufforderung und zwei grosse Buttons sind wahrnehmbarer als eine lange Aufgabenfolge.
- Risiko: CSS-Szene bleibt ein lokaler Platzhalter; echtes Material/Symbolset waere spaeter robuster.
- Hilfe: Lehrkraft kann reale Teller/Tasse parallel auf den Tisch legen.

### Unterstuetzt

- Staerke: `Nochmal` setzt die Auswahl ohne Druck zurueck; die Rueckmeldung benennt ruhig, was angetippt wurde.
- Risiko: Bei sehr kleiner Displayhoehe ist der Moment weiterhin scrollig, weil Bild/Silbe/Wort/Satz erhalten bleiben.
- Hilfe: Erst gemeinsam Teller zeigen, dann digital antippen.

### Symbolisch / erweitert

- Staerke: Die Handlung verbindet Zielwort, Szene und Satzanker, ohne eine neue Wortfamilie einzufuehren.
- Risiko: Es ist bewusst nur eine Unterscheidung; noch keine flexible Satz-/Transferuebung.

### Lehrkraft im Alltag

- Startbarkeit: Der Startpfad aus dem Lehrkraftbereich bleibt gleich.
- Beobachtbar: Wahrnimmt das Kind die kurze Aufforderung? Waehlt es Teller/Tasse? Nutzt es Wiederholung? Braucht es reales Material?
- Nicht enthalten: Keine Dokumentation, keine Diagnose, keine Speicherung.

## Staerken

- Erster echter Interaktionsmoment ohne Content-Ausbau.
- Exakt zwei Optionen, kein dritter Distraktor.
- Druckfreie Feedbacklogik.
- TDD-Guards sichern Datenstruktur, UI-Anbindung, Feedbacksprache und Wortbegrenzung.
- Build und Browser-Smoke erfolgreich.

## Schwaechen

- UI-Tests pruefen die Komponente weiterhin quellenbasiert, nicht ueber React Testing Library.
- Die visuelle Tischszene ist weiterhin CSS-basiert und kein validiertes UK-Symbolmaterial.
- Der Narrow-Smoke nutzt einen Same-Origin-Frame statt echte Geraeteemulation.

## Risiken

- Auf echten Tablets kann Scrollposition/Browser-UI anders wirken.
- CSS-Formen fuer Teller/Tasse koennen je nach Browser minimal anders aussehen.
- Die Interaktion ist gut fuer diesen Mini-Moment, aber noch kein allgemeines Interaktionssystem fuer weitere Wortfamilien.

## Empfehlung fuer Alpha 72B

Nur diesen Interaktionsmoment qualitativ nachpruefen: Falls noetig, die Reihenfolge im Teller-Moment so verdichten, dass Interaktion noch dominanter vor Bild/Silbe/Wort/Satz wirkt, ohne die bestehende Lernspur zu entfernen. Kein neuer Content.

## Empfehlung fuer Alpha 73A

Erst nach Review von Alpha 72A entscheiden, ob eine zweite sehr kleine Interaktion sinnvoll ist. Wenn ja, nur auf Basis derselben Struktur und mit einem klaren GE-/Testpilot-Gate; keine neue Wortfamilie automatisch anschliessen.
