# Alpha 30A - UI/Orientation Audit

## Kurzfazit

Der aktuelle LeseWerk-Stand hat die richtige didaktische Richtung: Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke ist in Inhalt und UI bereits angelegt. Fuer ein Kind wirkt der Kinderpfad aber noch nicht wie ein eindeutiger App-Pfad, sondern wie mehrere nebeneinander liegende Hilfs-, Demo- und Auswahlbereiche. Alpha 30B sollte deshalb keine neuen Inhalte bauen, sondern eine einzige sichtbare Tagespfad-Fuehrung fuer den Kinderbereich umsetzen.

## Gepruefte Quellen

- `reports/alpha-29-watchdog-review.md`
- `reports/alpha-29-learning-check-report.md`
- `reports/alpha-28-profile-builder-report.md`
- `reports/alpha-27-deep-didactic-audit.md`
- `reports/alpha-26c-coverage-inspector-report.md`
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## 1. Aktuelle Orientierungsprobleme

### 1.1 Zu viele Start- und Steuerorte im Kinderpfad

Im Kinderbereich erscheinen nacheinander:

- Hero mit Modus-Schalter Kinderpfad / Lehrkraft.
- Profilwahl: `Wer liest heute?`.
- Startkarte: `Heute lesen wir so.` mit `Lesepfad starten`.
- Linke Planungskarte: `Hilfe waehlen`.
- Rechte grosse Arbeitsflaeche mit Schrittkarte Mama, Leseleiter, Tagesweg, Bibliothek, Lesekarte und optionaler Schreibbruecke.

Das ist fachlich nachvollziehbar, aber fuer ein Kind konkurrieren mehrere Fragen gleichzeitig:

- Soll ich zuerst ein Profil waehlen?
- Soll ich `Lesepfad starten` druecken?
- Soll ich eine Hilfe waehlen?
- Soll ich eine Karte im Tagesweg waehlen?
- Soll ich die Mama-Schrittkarte bedienen?
- Soll ich die grosse Lesekarte bearbeiten?

Die aktuelle Struktur ist eher eine kombinierte Demo-/Planungsoberflaeche als ein gefuehrter Kinderpfad.

### 1.2 Der didaktische Zusammenhang ist sichtbar, aber nicht handlungsfuehrend

`getGuidedReadingChain()` liefert eine klare Beispielkette fuer Mama: Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbruecke. In `App.tsx` wird diese Kette aber parallel zu anderen Pfadelementen gezeigt:

- `MamaStepCard` hat eigene `Weiter`-Logik ueber `mamaStepIndex`.
- `GuidedReadingPath` zeigt die gesamte Leseleiter, markiert aber aktuell nur den ersten Schritt als `current`.
- `Leseleiter` in der aktiven Lesekarte bestimmt `Jetzt` aus dem Entwicklungsprofil der Aufgabe, nicht aus dem aktuell gefuehrten Mama-Schritt.
- `daily-path-panel` zeigt Karten wie Mond, Ball, Story und Wiederholung, also eine andere Orientierungsebene als die Mama-Schrittkarte.

Dadurch ist Bild -> Silbe -> Wort -> Satz zwar vorhanden, aber nicht als eine lineare Aufgabe erfahrbar. Ein Kind kann nicht eindeutig erkennen: "Ich bin gerade hier, danach kommt genau dieser naechste Schritt."

### 1.3 Tagesweg und Bibliothek vermischen sich noch

Der `daily-path-panel` ist sinnvoll, aber darunter kann die Vollbibliothek ueber `Alle Woerter und Geschichten oeffnen` sichtbar werden. Auch als `details` bleibt sie nah am Kinderpfad. Fuer Lehrkraefte ist das hilfreich; fuer Kinder erzeugt es eine zweite, groessere Auswahlwelt neben dem Tagespfad.

Alpha 29 hat bewusst festgehalten, dass der Lernstart den Kinderpfad nicht automatisch umstellt. Das ist sicher. Die UI braucht aber trotzdem einen klaren Kinderpfad, der eine bewusst vorbereitete Auswahl als primaeren Weg zeigt und die Bibliothek nur sekundär erreichbar macht.

### 1.4 Hilfen sind prominent, aber koennen den Start ueberlagern

Die linke `planning-card` fragt frueh `Was hilft dir?` und zeigt mehrere Hilfe-Buttons. Das ist GE-passend, weil Hilfen sichtbar und waehlbar bleiben. Gleichzeitig steht diese Karte vor oder neben der eigentlichen Lesehandlung. Fuer manche Kinder ist das ein eigener Entscheidungsraum, bevor klar ist, was heute gelesen wird.

Besser: Hilfen bleiben sichtbar, aber kompakter als Begleitleiste oder ausklappbare Hilfezone innerhalb des Tagespfades. Die erste sichtbare Hauptfrage sollte sein: "Was mache ich jetzt?" nicht "Welche Konfiguration waehle ich?".

### 1.5 Lehrkraftbereich ist fachlich reich, aber als Modus zu gleichwertig praesent

Der Lehrkraftmodus enthaelt inzwischen viele sinnvolle lokale Werkzeuge: 2-Karten-Pilot, Praxis-Pilotkarte, Tagesweg-Auswahl, Vorschlag, lokales Leseprofil, Demo-Profil, Coverage-Check, Lernstart und Druckvorschau. Der Hero-Modus-Schalter stellt `Kinderpfad` und `Lehrkraft` jedoch visuell gleich prominent nebeneinander.

Fuer die App-Orientierung sollte der Kinderpfad die Default-Buehne sein. Lehrkraftwerkzeuge sollen erreichbar, aber als sekundäre Werkzeugzone markiert sein. Das schuetzt den Kinderfluss und passt zu den bisherigen Sicherheitsgrenzen: lokale Planungsstuetze, keine Bewertung, keine feste Einordnung.

### 1.6 CSS-Struktur stuetzt eine ruhige App, aber nicht genug Fokus

Positiv:

- Touch-Ziele sind meist gross (`min-height` 56-108px).
- Cards haben ruhige Farben, klare Rundungen und gute Fokusmarkierung.
- Breakpoints bei 1100px, 760px, 640px und 430px vermeiden grobe Layoutbrueche.

Problematisch fuer Orientierung:

- `.learning-layout` nutzt auf Desktop zwei Spalten: Hilfen links, Arbeitsbereich rechts. Das macht Hilfen zu einer gleichwertigen Hauptsaeule.
- `.syllable-demo` enthaelt viele Panels untereinander: Mama-Schrittkarte, Guided Path, Tagesweg, Bibliothek, Leseleiter, Reading Card, Schreibbruecke.
- `.guided-step-list`, `.leseleiter-steps` und `.daily-path-grid` konkurrieren als mehrere Raster mit aehnlicher visueller Gewichtung.
- Auf Tablet/Narrow Width stapelt sich alles, aber die Reihenfolge bleibt lang: Start, Hilfen, mehrere Orientierungsleisten, Karte. Das kann den eigentlichen naechsten Button nach unten schieben.

## 2. Vorgeschlagenes kindorientiertes Navigationsmuster

### Zielbild: ein klarer Tagespfad

Der Kinderbereich sollte als ein einziger Tagespfad erscheinen:

1. Oben: "Heute lesen" mit genau einem grossen Start-/Weiter-Button.
2. Direkt darunter oder links: eine sichtbare Schrittleiste mit Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke.
3. Mitte: genau eine aktive Aufgabenkarte.
4. Unten/rechts: kompakte Hilfen, nicht als zweite Hauptaufgabe.
5. Nach Abschluss: genau eine naechste Handlung: `Weiter`, `Nochmal ruhig` oder `Fertig`.

Die Lehrkraft bereitet Tagesweg und Hilfen vor; das Kind sieht nur den ruhigen Weg.

### Konkretes Pattern

#### A. Kinderpfad-Shell

Eine neue Kinderstruktur, z. B. konzeptionell:

- `child-path-shell`
  - `today-path-header`
    - Titel: `Heute lesen`
    - Unterzeile: `Schritt 1 von 6: Bild anschauen`
    - Primaerbutton: `Starten` oder `Weiter`
  - `step-rail`
    - 6 Schritte: Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbruecke
    - genau ein aktiver Schritt
    - erledigte Schritte ruhig markiert
  - `active-step-card`
    - nur die aktuelle Handlung
    - grosses Wort/Bild/Satz je nach Schritt
  - `support-strip`
    - aktive Hilfen als kleine Chips
    - Button `Hilfe anzeigen` oder `Hilfe waehlen`, sekundär
  - `next-action-row`
    - eine primaere Handlung: `Weiter`
    - sekundär: `Nochmal ruhig`
    - am letzten Schritt: `Fertig`

#### B. Schrittlogik fuer die vertikale Slice

Fuer Alpha 30B reicht ein einziger vertikaler Slice mit Mama:

- Nutze die vorhandene `guidedReadingChain` als Datenquelle.
- Fuehre `mamaStepIndex` als die zentrale Orientierung fuer Schrittkarte und Step Rail.
- Zeige nicht gleichzeitig Tagesweg-Karten, Leseleiter und Mama-Kette mit konkurrierender Aktivmarkierung.
- Die aktive Karte zeigt pro Schritt nur das, was passt:
  - Bild: lokale Symbolhilfe / Bildplatzhalter-Hinweis.
  - Silbe: `Ma` `ma` gross und farbig.
  - Wort: `Mama` gross.
  - Satz: `Mama ist da.`.
  - Mini-Geschichte: drei kurze Zeilen.
  - Schreibbruecke: `Wort mit dem Finger nachfahren oder Silben legen.`.
- Der Button `Weiter` bewegt nur diesen einen Pfad weiter.

#### C. Tagespfad statt Vollbibliothek

Im Kinderpfad sollte der Tagespfad nicht als Auswahlbibliothek wirken. Fuer die erste Slice:

- Keine `Alle Woerter und Geschichten oeffnen`-Bibliothek im primaeren Kinderbereich.
- Keine parallele Auswahl von Mond/Ball/Story neben der Mama-Schrittkarte.
- Wenn Tageskarten gezeigt werden, dann nur als Fortschrittsuebersicht, nicht als grosses Auswahlraster.
- Lehrkraft kann Auswahl weiterhin im Lehrkraftmodus vorbereiten.

#### D. Lehrkraftwerkzeuge sekundär halten

- Hero: Kinderpfad bleibt optisch primaer.
- Lehrkraftzugang als ruhiger Sekundaerbutton, z. B. `Lehrkraftbereich` oben rechts.
- Keine Lehrkraftdaten, Coverage-Checks oder Profilbuilder im Kinderfluss.
- Keine automatische Uebernahme aus Lernstart/Profile Builder in den Kinderpfad ohne bewusste Lehrkraftentscheidung.

## 3. Konkrete CSS/UI-Anforderungen

### Desktop ab ca. 1024px

- App-Breite weiter ruhig begrenzen, z. B. `max-width` um 1180px beibehalten.
- Kinderpfad als klare Arbeitsbuehne statt allgemeines Dashboard:
  - Header ueber volle Breite.
  - Darunter ein 2-Spalten-Layout: links schmale Step Rail, rechts aktive Aufgabenkarte.
  - Optional rechts/unterhalb kompakte Hilfechips; nicht als grosse linke Hauptkarte.
- Step Rail:
  - 6 Schritte vertikal oder horizontal mit gleichbleibender Reihenfolge.
  - Aktiver Schritt deutlich, aber nicht alarmierend: warme Markierung, keine Rot-/Fehlerlogik.
  - Mindesthoehe pro Schritt ca. 64px, gut antippbar.
- Aktive Aufgabenkarte:
  - Prioritaet im Layout: groesste Flaeche.
  - Kein zweites Auswahlraster direkt darueber.
  - Primaerbutton immer sichtbar am Ende der Karte; bei Desktop moeglichst ohne viel Scrollen.
- Hilfen:
  - aktive Hilfen als Chips unter dem Header oder neben der Karte.
  - Hilfeauswahl optional in `details` oder sekundärem Panel, aber nicht vor dem ersten Start.

### Tablet ca. 768px bis 1024px

- Einspaltige oder sanft zweispaltige Struktur, aber Reihenfolge strikt:
  1. Tagespfad-Header
  2. Step Rail horizontal scrollfrei oder 2x3 Raster
  3. Aktive Aufgabenkarte
  4. Hilfechips
  5. Sekundäre Optionen
- Touch-Ziele mindestens 56-64px hoch.
- Keine 4-Spalten-Raster fuer Kinderaktionen; maximal 2 Spalten, besser eine klare Hauptaktion.
- `Weiter` und `Nochmal ruhig` duerfen nebeneinander stehen, aber `Weiter` muss visuell primaer bleiben.
- Keine Textueberlagerung bei grossen Woertern; Silbenbereiche muessen umbrechen koennen.

### Narrow Width unter ca. 640px

Auch wenn die Zielnutzung eher Tablet/Desktop ist, sollte der Pfad nicht zerfallen:

- Step Rail als 2-Spalten-Raster oder kompakte Liste.
- Aktive Karte vor Bibliothek/Details.
- Primaerbutton volle Breite.
- Keine langen horizontalen Ketten mit Pfeilen als einzige Orientierung; wenn `guided-worked-chain` bleibt, muss sie umbrechen und darf nicht wichtiger sein als der aktive Schritt.

### Visuelle Sprache

- Keine Score-, Prozent-, Ranking-, Timer- oder Testanzeige.
- Keine roten Fehlerzustaende fuer Kinderaktionen.
- Sprache: `Heute`, `Weiter`, `Nochmal ruhig`, `Fertig`, `Naechster kleiner Schritt`.
- Keine Begriffe wie Diagnose, Lesestufe, Alter, Bewertung im Kinderbereich.
- Lokale Symbolhilfen nur als lokale Platzhalter benennen, keine geschuetzten Symbolsysteme behaupten.

## 4. Was noch nicht gebaut werden sollte

Nicht in Alpha 30B aufnehmen:

- Kein neues Profil- oder Accountsystem.
- Keine Speicherung echter Lernendenprofile, keine Namen, keine Klassenlisten.
- Kein Backend, Login, Cloud, Export oder Upload.
- Keine Scores, Noten, Ranglisten, Timer, Prozentfortschritte oder Reading-Age-Logik.
- Keine diagnostischen Aussagen oder klinischen Labels.
- Keine geschuetzten Bild-/Symbolassets und keine METACOM-/ARASAAC-/Boardmaker-/Widgit-Claims.
- Kein grosser Content-Ausbau parallel zur UI-Orientierung.
- Kein kompletter Refactor von App-State oder Inhaltsmodell.
- Keine neue adaptive Automatik, die den Kinderpfad ohne bewusste Lehrkraftentscheidung umstellt.
- Keine Vollbibliothek als sichtbarer Standard im Kinderpfad.

## 5. Exakte Implementierungs-Checkliste fuer Neva: eine vertikale Slice

Ziel der Slice: Der vorhandene Mama-Pfad wird im Kinderbereich zu einer klaren App-Orientierung mit Step Rail, einer aktiven Karte und einem eindeutigen Weiter-Button. Keine neuen Inhalte, keine neuen Datenfluesse.

### Dateien

- Aendern: `src/App.tsx`
- Aendern: `src/styles.css`
- Falls noetig anpassen/ergaenzen: `tests/lesewerk-content.test.mjs` nur wenn bestehende Snapshot-/Textannahmen betroffen sind
- Neu schreiben: `reports/alpha-30b-child-path-slice-report.md`

### App.tsx

1. Im Kinderpfad eine fokussierte Struktur fuer den gefuehrten Mama-Pfad einfuehren.
   - Bestehende Datenquelle `guidedReadingChain` weiterverwenden.
   - Bestehenden State `mamaStepIndex` weiterverwenden.
   - Keine neue Persistenz.

2. `MamaStepCard` und `GuidedReadingPath` zusammenfuehren oder visuell eindeutig koppeln.
   - Step Rail erhaelt den aktiven Index aus `mamaStepIndex`.
   - Nicht mehr hart `index === 0` als `current` markieren.
   - Erledigte Schritte mit `index < mamaStepIndex` markieren.

3. Im gefuehrten Kinderpfad nur eine primaere aktive Handlung zeigen.
   - Aktive Schrittkarte zeigt Inhalt aus `MamaStepContent`.
   - Primaerbutton: `Weiter`.
   - Sekundaerbutton: `Nochmal ruhig`.
   - Letzter Schritt: `Fertig` oder deaktivierter `Weiter` plus klare Abschlussaktion, keine Sackgasse.

4. Konkurrenz im Kinderbereich reduzieren.
   - `daily-path-panel` im gefuehrten Mama-Slice nicht oberhalb der aktiven Karte anzeigen.
   - `library-panel` fuer den Standard-Kinderpfad in dieser Slice entfernen oder deutlich unter `details` am Ende platzieren.
   - `planning-card`/Hilfen in eine kompakte Hilfezone verschieben oder im Layout sekundär machen.

5. Lehrkraftmodus unveraendert lassen, ausser wenn ein Textlink noetig ist.
   - Keine Funktion aus Tagesweg-Auswahl, Lernstart, Profilbuilder oder Coverage-Check entfernen.
   - Keine automatische Uebernahme in Kinderpfad einfuehren.

### styles.css

1. Neue/angepasste Klassen fuer die Kinder-Slice:
   - `.child-path-shell`
   - `.today-path-header`
   - `.step-rail`
   - `.active-step-card`
   - `.support-strip`
   - `.next-action-row`

2. Desktop-Anforderung:
   - Aktive Karte prominent.
   - Step Rail sichtbar neben oder ueber der Karte.
   - Primaerbutton ohne langes Scrollen erreichbar.

3. Tablet-Anforderung:
   - Reihenfolge Header -> Step Rail -> aktive Karte -> Aktionen -> Hilfen.
   - Maximal zwei Spalten fuer Schrittchips, keine vier konkurrierenden Kinderaktionsspalten.

4. Bestehende Touch-/Fokusqualitaet erhalten.
   - `button:focus-visible` nicht abschwaechen.
   - Mindesthoehen 56-64px beibehalten.
   - Keine Farbmarkierung, die Fehler/Ranking suggeriert.

### Akzeptanzkriterien

- Beim Oeffnen des Kinderpfads ist eindeutig sichtbar: `Heute lesen`, aktueller Schritt, eine aktive Karte, eine naechste Aktion.
- `Weiter` bewegt Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke in sichtbarer Reihenfolge.
- Step Rail markiert genau einen aktuellen Schritt und optional erledigte Schritte.
- Hilfen bleiben erreichbar, dominieren aber nicht den Start.
- Lehrkraftwerkzeuge bleiben im Lehrkraftbereich.
- Keine neuen Datenschutz-/Sicherheitsrisiken: keine Namen, keine Speicherung, kein Export, kein Login, keine Bewertung.

### Verifikation fuer Neva

- `npm test`
- `npm run build`
- Browser-Smoke lokal:
  - Kinderpfad oeffnen.
  - Mama-Pfad starten.
  - Mehrfach `Weiter` klicken und pruefen, ob Step Rail und Karte synchron bleiben.
  - `Nochmal ruhig` pruefen.
  - Abschlusszustand pruefen.
  - Tablet-/narrow width pruefen: kein Textueberlauf, keine konkurrierenden Hauptaktionen, Primaerbutton erreichbar.
- Kurzer Sicherheits-Scan im Diff: keine neuen Begriffe fuer Score, Ranking, Timer, Diagnose, Lesestufe, Alter, Cloud, Export, Upload.

## Schlussbewertung

Die naechste sinnvolle Produktverbesserung ist kein weiterer Teacher-Inspector und kein neuer Inhalt, sondern Fokus: ein Kind soll im ersten Blick erkennen, welchen kleinen Schritt es heute macht. Der beste Alpha-30B-Slice ist deshalb eine UI-Orientierungsreduktion am vorhandenen Mama-Pfad. Das haelt das Risiko klein, nutzt bestehende Daten, bewahrt die lokalen Sicherheitsgrenzen und macht die didaktische Kette Bild -> Silbe -> Wort -> Satz erstmals als echte App-Handlung erfahrbar.
