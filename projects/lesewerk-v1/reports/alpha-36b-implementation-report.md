# Alpha 36B – Serien veredeln und UI verdichten

## Kurzfazit
Alpha 36B ist umgesetzt. Die vier lokalen Unterrichtsserien wurden sprachlich geglättet, das Serienpanel steht nun früh im Lehrkraftbereich und zeigt die Kerninformationen direkt in kompakten Serienzeilen. Eine Serienmarkierung bleibt bewusst nur Vorschau und verändert den Kinderpfad oder den Tagesweg nicht automatisch.

## Geänderte Dateien
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-36b-implementation-report.md`

## Umsetzung

### 1. Serien sprachlich und didaktisch geglättet
Die bisherigen Titel und Labels wurden ruhiger und typografisch sauberer formuliert:
- `Ankommen mit Bild und Silbe`
- `Silben verbinden`
- `Wort im Satz`
- `Geschichte und Schreibbrücke`

Die Wiederholungs-, Hilfe- und Auslasslogik wurde beobachtungsnäher formuliert, zum Beispiel mit Bildkarte, Satzstreifen, Legematerial, gemeinsamem Mitsprechen und motorisch passender Schreibbrücke. Technische Schreibweisen wie `Woerter`, `Schreibbruecke`, `waere`, `spaeter` und `->` wurden in den Alpha-36B-Serientexten geglättet.

### 2. Serienpanel dichter und früher platziert
Das alte Muster `4 Buttons + separate Detailkarte` wurde durch kompakte Serienzeilen ersetzt. Jede Zeile zeigt direkt:
- Titel und Empfehlung
- Start
- Wiederholung
- nächster kleiner Schritt
- kurze Hilfe-/Auslassen-Zeile
- enthaltene Aufgaben
- Button `Serie nur markieren`

Das Panel steht jetzt direkt nach dem kurzen Lehrkraft-Onboarding und vor der Tagesweg-Wahl. Damit ist die Serienentscheidung im oberen Lehrkraftfluss sichtbar, ohne den Kinderpfad zu belasten.

### 3. Keine automatische Tagespfad-Übernahme
Die sichere Entscheidung aus Alpha 36A wurde beibehalten: Es gibt noch keine automatische oder verdeckte Serienübergabe. Der Button markiert nur lokal die Serie. Der Hinweis lautet sinngemäß: Markierung schreibt nicht in den Tagesweg; Tageskarten werden darunter bewusst manuell gewählt.

Grund: Eine robuste Abbildung von `taskIds` auf `dailyPathChoices` ist für diesen Slice noch nicht ausreichend abgesichert. Eine spätere manuelle Übernahme ist möglich, sollte aber erst nach stabilem Mapping umgesetzt werden.

### 4. Lehrkraft-UI weiter verdichtet
Die lokale adaptive Vorschau im Profilbuilder wurde von neun sofort sichtbaren Feldern auf vier Kernfelder reduziert:
- Heute im Blick
- Hilfe
- Nächster kleiner Schritt
- Heute auslassen

Weitere Profil-Vorschau liegt in einem einklappbaren Detailbereich. Der Coverage-Inspector ist nicht mehr standardmäßig offen.

## Tests und Verifikation

### Automatische Tests
- `npm test` bestanden: 137/137
- Neuer Test ergänzt: `Alpha 36B series language and teacher UI stay compact without automatic daily-path transfer`

### Build
- `npm run build` bestanden

### Browser-Smoke Desktop
Geprüft über lokalen Server `http://127.0.0.1:4300`:
- App lädt ohne JS-Fehler.
- Lehrkraftbereich öffnet sich.
- Serienpanel ist früh sichtbar.
- Serienzeilen zeigen Start, Wiederholung, nächsten Schritt und Hilfen direkt.
- Serienmarkierung verändert den Tagesweg nicht automatisch.
- Kinderpfad enthält keine Serienbegriffe.
- Keine horizontale Scrollbar bei Desktop-Viewport 1280px.

### Mobile-/Responsive-Smoke
Geprüft über CSS-/DOM-Struktur und responsive Regeln:
- `.series-row-grid` wechselt unter 980px auf eine Spalte.
- `.series-row-steps` wechselt unter 640px auf eine Spalte.
- Serienzeilen und Step-Felder nutzen `min-width: 0` und `overflow-wrap: anywhere` für lange deutsche Labels.
- Kein neues festes Breitenlayout oder horizontales Scroll-Risiko in den geänderten Serienstrukturen.

Hinweis: Ein automatischer Playwright-Screenshot mit Mobile-Viewport war lokal nicht möglich, weil der Playwright-Browsercache fehlte. Es wurde deshalb kein Browser installiert, um keine zusätzliche Setup-Aktion in diesem Task auszulösen.

### Safety-Scan
Geprüft:
- Keine neuen echten Daten, Diagnosen, Scores, Timer, Rankings, Login-, Cloud-, Upload- oder Exportfunktionen.
- Suchtreffer in `src/App.tsx` betreffen bestehende Privacy-/Safety-Hinweise und vorhandenes anonymes Demo-`localStorage` für Profilwahl, keine neue Alpha-36B-Persistenz.
- Kinderpfad bleibt frei von Serienbegriffen, Profilchips und Lehrkraftbegründungen.

## Risiken / offene Punkte
- Die manuelle Serienübergabe in den Tagespfad ist bewusst noch nicht umgesetzt. Sie sollte erst erfolgen, wenn ein stabiles Mapping von Serien auf vorhandene Tagesweg-Karten getestet ist.
- Das Serienpanel ist dichter, aber die Lehrkraftseite insgesamt bleibt umfangreich. Nächster Hebel wäre eine weitere Zusammenführung von Tagesweg-Vorschlag und Serienempfehlung.
- Die Praxis-Pilotkarte enthält weiterhin nicht gespeicherte Textareas. Das ist Altbestand und wurde nicht erweitert.

## Nächster kleinster Schritt
Alpha 36C sollte als Watchdog prüfen:
1. Sichtbarkeit und Lesbarkeit der Serienzeilen auf Desktop, Tablet und Mobile.
2. Ob die Lehrkraft nach Serienmarkierung weiterhin versteht, dass der Tagesweg manuell gewählt wird.
3. Ob eine spätere Funktion `Serie in Tagesweg vorbereiten` sicher auf vorhandene `dailyPathChoices` abbildbar ist, ohne automatische Kinderpfad-Änderung.
