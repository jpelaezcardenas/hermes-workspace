# Alpha 33A - UI Orientierung und Attraktivitaetsplan

## Kurzdiagnose

Der aktuelle LeseWerk-Stand hat starke Bausteine: ruhige Farben, grosse Touch-Ziele, einen sichtbaren Tagespfad, eine Schrittleiste und eine aktive Mama-Schrittkarte. Fuer ein Kind ohne Orientierung ist aber noch nicht sofort eindeutig, welche Ebene die eigentliche Aufgabe ist. Auf der Seite erscheinen gleichzeitig Brueckenstreifen, Leseleiter, Mama-Schrittkarte, Tagesweg-Auswahl, Bibliotheks-Details, zweite Leseleiter und normale Lesekarte.

Ziel fuer Alpha 33B: Die App soll wie ein klarer, attraktiver Lernweg wirken, nicht wie ein Demo-Dashboard. Ein Kind soll beim ersten Blick erkennen: Wo bin ich? Was mache ich jetzt? Was kommt danach?

## Gepruefte Quellen und aktueller Stand

Geprueft wurden:

- `src/App.tsx`
- `src/styles.css`
- `reports/alpha-30a-ui-orientation-audit.md`
- `reports/alpha-31a-child-path-declutter-plan.md`
- `reports/alpha-32a-story-writing-bridge-model.md`
- `reports/alpha-33a-ge-reading-bridge-brief.md`
- Browser-Smoke auf lokal gebautem `dist` unter `http://localhost:4174`

Relevante aktuelle App-Struktur:

- `App` rendert zuerst Hero, Modus-Schalter und prominente Profilwahl.
- Der Kinderpfad startet mit `guided-entry-note`, `today-path-header`, `support-strip`, `GuidedReadingPath`, `MamaStepCard`, `daily-path-panel`, Bibliotheks-`details`, `Leseleiter`, `reading-card` und `WritingBridgeCard`.
- `GuidedReadingPath` nutzt den Ablauf Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke und markiert den aktiven Index.
- `MamaStepCard` zeigt die aktive Station mit `MamaStepContent`.
- `Mini-Geschichte` und `Schreibbruecke` sind bereits als Stationen angelegt, wirken aber noch nicht als zentrale Buehne, solange darunter parallel Tagesweg/Bibliothek/Lesekarte sichtbar bleiben.

## Wichtigste Orientierungsprobleme

### 1. Mehrere aktive Wahrheiten gleichzeitig

Im Browser war oben sichtbar:

- `Heute lesen`, `Schritt 1 von 6: Bild anschauen`
- Leseleiter mit aktiver Station `Bild`
- Mama-Schrittkarte `1 von 6`, `Bild`

Weiter unten war gleichzeitig sichtbar:

- `Dein Tagesweg`
- vier auswählbare Tagesweg-Karten
- `Alle Wörter und Geschichten öffnen`
- eine zweite `Leseleiter Orientierung`
- eine normale Lesekarte mit `Ich bin fertig`

Das erzeugt zwei konkurrierende Lernzustände: Der gefuehrte Brueckenpfad sagt `Bild`, die normale Lesekarte kann aber einen anderen taskbasierten Stand zeigen. Fuer Alpha 33B muss die gefuehrte Bruecke die einzige Default-Hauptbuehne sein.

### 2. Brueckenstreifen ist inhaltlich gut, visuell zu leise

Der Hinweis `Bild anschauen, Silbe klatschen, Wort lesen, Satz lesen, Mini-Geschichte, Schreibbrücke` ist fachlich richtig und kindnah. Er wirkt aber wie ein kleiner Hinweistext oberhalb des eigentlichen Pfads. Als Orientierungselement sollte er sichtbarer werden: eine echte Brueckenleiste mit sechs Stationen, klarer Aktivmarkierung und ruhigem visuellen Gewicht.

### 3. Karten-in-Karten-Ueberladung

Die UI nutzt viele helle Karten mit Rundungen, Rahmen und Schatten. Das wirkt freundlich, aber die Hierarchie verliert Kraft, weil fast alles wie eine Karte aussieht:

- Tagespfad-Header
- Leseleiter-Panel
- sechs Step-Karten
- Worked-Chain-Streifen
- Mama-Schrittkarte
- Tagesweg-Panel
- vier Tagesweg-Karten
- Bibliothek-Details
- zweite Leseleiter
- Reading-Card
- Writing-Bridge-Card

Alpha 33B sollte nicht mehr Container einfuehren, sondern vorhandene Container zusammenfuehren und die aktive Karte staerker priorisieren.

### 4. Mini-Geschichte und Schreibbruecke brauchen Buehnenqualitaet

Die aktuelle Schrittkarte kann Mini-Geschichte und Schreibbruecke anzeigen. Im Browser-Smoke waren die Stationen per Weiter-Klick erreichbar:

- Schritt 5: `Mini-Geschichte` mit Wortanfang, Fokuswort, Satz und drei kurzen Zeilen.
- Schritt 6: `Schreibbrücke` mit `Silben legen`, `Ma · ma`, `Wort ruhig nachfahren`, `Mama`.

Das ist eine gute Grundlage. Fuer Alpha 33B sollten diese beiden Stationen aber wie echte Lernmomente gestaltet werden, nicht wie eine Textbox innerhalb einer weiteren Karte.

## Zielbild fuer Alpha 33B

### Ein Satz

Alpha 33B macht die Lese-Bruecke zur sichtbaren Hauptbuehne: oben ein klarer Brueckenstreifen, in der Mitte genau eine aktive Karte, unten ruhige Hilfen; Bibliothek und freie Auswahl bleiben sekundär.

### Default-Kinderpfad in Reihenfolge

1. Kompakter App-Kopf
   - Titel klein halten, keine Marketing-Hero-Optik.
   - Kinderpfad ist Default.
   - Lehrkraft bleibt erreichbar, aber sekundär.

2. Sichtbarer Brueckenstreifen
   - sechs Stationen: Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbruecke.
   - genau eine aktive Station.
   - erledigte Stationen ruhig markiert.
   - Text: `Jetzt: Bild` / `Danach: Silbe`.

3. Eine aktive Karte
   - Stationstitel, kurzer Auftrag, grosser Inhalt, genau eine primaere Aktion.
   - Buttonlogik: `Weiter`, sekundär `Nochmal ruhig`, letzter Schritt `Heute fertig` oder deaktiviertes `Fertig` mit klarer Abschlussoption.

4. Ruhige Hilfezeile
   - aktive Hilfen als Chips.
   - `Hilfe wählen` in `details`, standardmaessig geschlossen.
   - Hilfe nicht vor der Hauptaufgabe platzieren.

5. Sekundäre Bibliothek
   - nicht im Default-Kinderpfad als grosse Auswahl sichtbar.
   - wenn erhalten: am Ende als leiser Link `Weitere Karten mit Lehrkraft öffnen`.
   - keine vier grossen Tagesweg-Karten parallel zur aktiven Brueckenkarte.

## Konkrete Komponentenplanung

### 1. `BridgeStrip` oder Umbau von `GuidedReadingPath`

Empfehlung: Keine neue Datenquelle. `getGuidedReadingChain()` und `mamaStepIndex` weiterverwenden. Entweder `GuidedReadingPath` fokussiert umbauen oder eine kleine Komponente `BridgeStrip` daraus ableiten.

Pflichten:

- Props: `chain`, `activeIndex`, optional `orientationSteps`.
- Rendert nur die sechs Stationen und eine knappe Jetzt/Danach-Zeile.
- Kein grosses zweites Panel mit eigenem Titel `Heute lesen wir so`, wenn direkt darueber schon `Heute lesen` steht.
- `guided-worked-chain` nur sekundär anzeigen, z. B. unter `details` mit Label `Beispiel ansehen`.

Empfohlene DOM-Struktur:

```tsx
<section className="bridge-strip" aria-label="Lese-Bruecke">
  <p className="section-kicker">Lese-Bruecke</p>
  <ol className="bridge-steps">...</ol>
  <p className="bridge-now">Jetzt: Bild · Danach: Silbe</p>
</section>
```

### 2. `ActiveBridgeCard` auf Basis von `MamaStepCard`

`MamaStepCard` ist fachlich die richtige Basis. Sie sollte in Alpha 33B die einzige Default-Arbeitskarte im Kinderpfad sein.

Pflichten:

- `stepIndex` bleibt zentrale Orientierung.
- `MamaStepContent` bleibt Quelle fuer die konkrete Station.
- Keine normale `reading-card` parallel darunter im Default-Kinderzustand.
- `Weiter` bleibt der primaere Button.
- `Nochmal ruhig` bleibt sekundär.
- Am letzten Schritt keine Sackgasse: Wenn der Primaerbutton `Fertig` deaktiviert ist, braucht es eine klare aktive Abschlussaktion. Besser: letzter Button aktiv als `Heute fertig` oder `Zurueck zum Anfang` sekundär.

### 3. Mini-Geschichte als echte Szene

Aktuelle Grundlage in `MamaStepContent`:

- `mama-mini-story`
- `mini-story-scene`
- `mini-story-picture`
- Fokuswort und Satz
- kurze Textzeilen

Alpha 33B sollte daraus eine visuell klare Szene machen:

- `mini-story-scene` bekommt die Funktion einer kleinen Buehne, nicht nur einer Metadaten-Zeile.
- Keine externen/geschuetzten Bilder. Der aktuelle Buchstaben-/Wortanfangs-Platzhalter ist sicherer als dekorative Asset-Claims.
- Die Szene sollte maximal drei sichtbare Textzeilen haben.
- Ein klarer Satz: `Wir lesen eine kleine Szene.` oder `Was passiert?`.
- Keine Verstehensfrage mit Testdruck.

Konkrete CSS-Richtung:

- warme, ruhige Flaeche innerhalb der aktiven Karte,
- Fokuswort groesser als Erklaertext,
- Satz und Storyzeilen lesbar mit `line-height` >= 1.35,
- auf 390px Breite einspaltig ohne Ueberlauf.

### 4. Schreibbruecke als Material-/Spur-Schritt

Aktuelle Grundlage:

- `mama-writing-scaffold`
- `writing-bridge-card`
- `writing-bridge-material`
- Text: `Silben legen`, `Wort ruhig nachfahren`, `Finger-Spur`

Alpha 33B sollte die Schreibbruecke als ruhigen Materialschritt fuehren:

- nicht als Schreibtest,
- nicht als Leistungsnachweis,
- nicht als Pflicht nach jedem Lesen,
- sondern als `Nur wenn es heute passt`.

Konkrete UI:

- ein Materialstreifen mit zwei Schritten:
  1. `Silben legen`
  2. `Wort nachspuren`
- grosses Zielwort, z. B. `Mama`, mit gestrichelter oder heller Spur-Flaeche.
- optionale Lehrkraft-/Materialsprache nur klein: `mit Silbenkarten, Finger oder Stift`.
- keine Eingabefelder, keine Speicherung, keine Bewertung.

### 5. `SupportStrip` sekundär halten

`support-strip` ist die richtige Richtung. Fuer Alpha 33B:

- unter oder neben der aktiven Karte platzieren, nicht vor der Hauptaufgabe.
- `ActiveSupport` sichtbar lassen.
- `SupportPanel` im `details` lassen.
- Auf Mobile nach der aktiven Karte, damit Kind zuerst Aufgabe und Weiter-Button sieht.

### 6. Bibliothek konsequent sekundär

Aktueller Code rendert `secondary-library-panel` und `library-panel` im Kinderbranch. Auch als `details` ist er noch nahe am Hauptpfad.

Alpha 33B-Optionen, nach Risiko sortiert:

1. Minimal: Bibliothek ganz unten nach der aktiven Karte und Hilfezeile, Label ändern zu `Weitere Karten mit Lehrkraft öffnen`.
2. Besser: Bibliothek im Kinder-Default gar nicht rendern; Lehrkraftbereich behält Tagesweg-Auswahl.
3. Nicht empfohlen: Bibliothek weiterhin direkt nach `daily-path-panel` mit grossen Wort-/Story-Pills sichtbar machen.

Wichtig: Keine Aufgaben/Stories loeschen. Nur Sichtbarkeit und Position im Kinder-Default aendern.

## Konkrete App.tsx-Aenderung fuer Alpha 33B

Minimaler Ziel-Diff in Worten:

1. Im Kinderbranch `GuidedReadingPath` zu einer fokussierten Brueckenleiste machen.
2. `MamaStepCard` als einzige aktive Default-Karte stehen lassen.
3. `daily-path-panel` im Default-Kinderpfad entfernen oder in eine sehr kleine Statuszeile verwandeln.
4. `Leseleiter` und `reading-card` nicht parallel zur Mama-Schrittkarte rendern.
5. `WritingBridgeCard` nicht als zweites grosses Panel parallel zur Schreibbruecken-Station anzeigen, sondern nur dann, wenn es wirklich eine optionale Zusatzspur nach der Station sein soll.
6. Bibliothek aus dem Hauptfluss entfernen oder deutlich ans Ende mit Lehrkraft-Hinweis setzen.
7. Lehrkraftbereich unveraendert lassen.

Keine neuen Datenfluesse erforderlich. Kein neues Routing, keine Persistenz, keine externe Assets.

## CSS-Risiken und Gegenmassnahmen

### Risiko 1: Doppelte Klassen mit historischer Bedeutung

`styles.css` enthaelt viele Alpha-Schichten: Alpha 18, 19, 27, 30B, 33B. Klassen wie `.guided-step-list`, `.step-rail`, `.leseleiter-list`, `.mama-step-card`, `.writing-bridge-card` werden an mehreren Stellen beeinflusst.

Gegenmassnahme:

- Keine globalen Regeln grob aendern, die Lehrkraftbereich oder alte Panels brechen.
- Neue Regeln eng scopen, z. B. `.child-path-shell .bridge-strip ...`.
- Vor dem Entfernen pruefen, ob Tests oder Reports auf Klassennamen schauen.

### Risiko 2: Horizontaler Overflow durch sechs Stationen

Sechs Stationen passen auf Desktop, aber nicht automatisch auf Tablet/Mobile.

Gegenmassnahme:

- Desktop: `grid-template-columns: repeat(6, minmax(0, 1fr))` erlaubt.
- Tablet: 2x3 Grid.
- Mobile: 1 Spalte oder 2 Spalten mit kurzen Labels.
- Keine lange Pfeilkette als einzige Orientierung; `guided-worked-chain` darf umbrechen oder in `details` verschwinden.

### Risiko 3: Aktive Karte verliert Prioritaet

Wenn Brueckenleiste, Tagesweg, Bibliothek und Hilfen gleich stark bleiben, wirkt die aktive Karte nicht wie die Hauptaufgabe.

Gegenmassnahme:

- Aktive Karte bekommt groesste Flaeche, staerksten Kontrast und den einzigen primaeren Button.
- Tagesweg/Bibliothek nur sekundär und optisch leiser.
- Keine zweite grosse `reading-card` im Default-Kinderpfad.

### Risiko 4: Mini-Geschichte wird zu dekorativ

Eine Szene kann schnell wie Illustration/Marketing wirken oder geschuetzte Symbolsysteme nahelegen.

Gegenmassnahme:

- Lokale typografische Szene statt Asset-Import.
- Keine externen Bilder, keine METACOM-/ARASAAC-/Boardmaker-/Widgit-Claims.
- Szene dient Lesesinn, nicht Dekoration.

### Risiko 5: Schreibbruecke wirkt wie Test

Worte wie `schreiben`, `fertig`, `geschafft` koennen Druck erzeugen, wenn sie falsch gerahmt werden.

Gegenmassnahme:

- Formulierungen: `legen`, `nachspuren`, `ruhig`, `nur wenn es heute passt`.
- Keine Punktzahl, kein Richtig/Falsch, kein Speicherfeld.
- Schreibbruecke als Materialhandlung, nicht als Ergebnisabgabe.

### Risiko 6: Mobile Reihenfolge

Auf schmalen Breiten kann die Hilfezone oder Bibliothek vor die aktive Aufgabe rutschen.

Gegenmassnahme:

- Mobile-Reihenfolge festlegen: Header -> Brueckenstreifen -> aktive Karte -> Aktionen -> Hilfen -> sekundäre Optionen.
- Primaerbutton volle Breite oder klar erster Button.
- `Nochmal ruhig` optisch sekundär.

## Browser-Smoke-Kriterien fuer Alpha 33B

### Desktop ca. 1280 x 900

- Beim Oeffnen sind sichtbar: `Heute lesen`, Brueckenstreifen, aktive Station und eine aktive Karte.
- Es gibt im Default-Kinderpfad nur eine dominante aktive Lernkarte.
- `Weiter` bewegt sichtbar von Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke.
- Brueckenstreifen und aktive Karte bleiben synchron.
- Mini-Geschichte zeigt eine echte kleine Szene, nicht nur einen Listeneintrag.
- Schreibbruecke zeigt Material-/Spurhandlung, nicht Test-/Eingabecharakter.
- Bibliothek ist nicht als Hauptflaeche sichtbar; falls vorhanden, klar sekundär und mit Lehrkraft-Hinweis.
- Lehrkraftmodus ist erreichbar und zeigt weiterhin Tagesweg-Auswahl, Lernstart, Profilbuilder und Coverage-Check.

### Tablet ca. 768 x 1024

- Reihenfolge: Kopf -> Brueckenstreifen -> aktive Karte -> Aktionen -> Hilfen -> sekundäre Optionen.
- Sechs Stationen brechen sauber in 2x3 oder eine ruhige Liste um.
- Touchziele bleiben mindestens ca. 56px hoch.
- `Weiter` bleibt ohne langes Suchen sichtbar.
- Keine vier Kinder-Auswahlkarten konkurrieren mit der aktiven Brueckenkarte.

### Mobile ca. 390 x 844

- Kein horizontaler Overflow.
- Lange Woerter, Silben, Mini-Geschichte und Schreibbruecke ueberlappen nicht.
- Primaerbutton ist klar und gut antippbar.
- Hilfeauswahl ist erreichbar, dominiert aber nicht den Start.
- Bibliothek/weitere Karten erscheinen nicht vor der aktiven Aufgabe.

### Safety-Smoke

- Kein neuer Text mit Diagnose, Score, Punkte, Note, Ranking, Timer, Prozent, Lesealter, Defizit, falsch/richtig als Drucklogik.
- Keine echten Namen, Fotos, Klassenlisten oder personenbezogene Daten.
- Keine neue Speicherung, kein Export, kein Download, kein Upload, kein Login, kein Fetch.
- Keine externen oder geschuetzten Symbolassets.

## Akzeptanzkriterien fuer Alpha 33B

Alpha 33B ist gelungen, wenn:

- Die sichtbare Bruecke Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke die Hauptorientierung ist.
- Genau eine Station aktiv ist und genau eine aktive Karte dazu passt.
- Mini-Geschichte und Schreibbruecke als echte Lernmomente sichtbar sind.
- Die Schreibbruecke ruhig, optional und materialnah bleibt.
- Bibliothek und freie Auswahl sekundär bleiben.
- Die UI professionell und schulisch ruhig wirkt, nicht wie Marketing-Hero oder Spielhallen-Oberflaeche.
- Build, Tests und Browser-Smoke auf Desktop/Tablet/Mobile dokumentiert sind.

## Nicht-Ziele fuer Alpha 33B

- Kein neues Backend.
- Keine Speicherung echter Lernendendaten.
- Keine neue Diagnose-/Profilautomatik.
- Kein grosser Content-Bulk.
- Keine neuen Dependencies.
- Kein kompletter App-Refactor.
- Keine geschuetzten Bild-/Symbolassets.
- Keine Marketing-Hero-Umgestaltung.

## Kleinster sicherer Implementierungsslice

1. Kinderbranch visuell fokussieren: Brueckenstreifen + aktive Mama-Karte als Hauptbuehne.
2. Parallel sichtbare Tagesweg-/Bibliotheks-/Leseleiter-/Reading-Card-Konkurrenz aus dem Default-Kinderpfad entfernen oder ans Ende verschieben.
3. Mini-Geschichte und Schreibbruecke innerhalb `MamaStepContent` visuell als Szene bzw. Materialspur schaerfen.
4. CSS nur eng gescoped ergaenzen; bestehende Lehrkraftbereiche nicht umbauen.
5. `npm test`, `npm run build`, Browser-Smoke Desktop und Mobile ausfuehren.

## Kurzfazit

LeseWerk ist nicht weit von einer sehr starken Kinderorientierung entfernt. Die groesste Verbesserung liegt nicht in mehr Inhalt, sondern in weniger gleichzeitigen Hauptflaechen. Alpha 33B sollte die vorhandene Lernbruecke zur einen sichtbaren Buehne machen: Brueckenstreifen oben, aktive Karte in der Mitte, ruhige Hilfen unten, Bibliothek sekundär. Dann wird aus der guten Demo-Struktur ein attraktiver, kindnaher Lernweg.
