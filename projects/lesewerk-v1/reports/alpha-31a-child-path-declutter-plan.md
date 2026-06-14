# Alpha 31A - Child Path Declutter Plan

## Kurzdiagnose

Alpha 30B hat den Kinderpfad sichtbar verbessert: Es gibt jetzt eine Tagespfad-Buehne mit Header, Schrittleiste, aktiver Mama-Schrittkarte, kompaktem Hilfebereich und einem Weiter-Button. Der Pfad wirkt aber noch nicht voll entschlackt, weil neben dem Tagespfad weiterhin mehrere gleichartige Orientierungs- und Auswahlbereiche sichtbar bleiben.

Ziel fuer Alpha 31B: Keine neue Inhalts- oder Lehrkraftlogik bauen, sondern den vorhandenen Kinderpfad so ordnen, dass ein Kind zuerst den heutigen Schritt, genau eine aktive Karte und genau eine primaere Handlung sieht.

## 1. UI-Elemente, die aktuell noch mit dem Tagespfad konkurrieren

### 1.1 Doppelte Startbereiche

Aktuell stehen vor bzw. am Anfang des Kinderpfads zwei Startsignale:

- `guided-entry-card` mit `Heute lesen wir so.` und Button `Lesepfad starten`.
- `today-path-header` mit `Heute lesen` und Button `Tagespfad starten`.

Beide sind fachlich ruhig formuliert, konkurrieren aber als Startpunkt. Fuer ein Kind ist nicht eindeutig, welcher Start der eigentliche Beginn ist.

### 1.2 Profilwahl bleibt vor dem Kinderpfad sehr prominent

Die Profilsektion `Wer liest heute?` ist anonym und lokal, bleibt aber vor dem Tagespfad sichtbar. Sie ist eher eine Lehrkraft-/Demo-Vorentscheidung als eine Kinderhandlung. Wenn sie im Kinderfluss zu prominent bleibt, entsteht vor dem Lesen eine zusaetzliche Entscheidung.

### 1.3 Hilfezone ist kompakter als frueher, aber noch eine eigene Spalte

`support-strip` ist bereits besser als die fruehere grosse Planungskarte. Auf Desktop steht sie aber als eigene linke Saeule neben der aktiven Karte. Dadurch kann `Hilfe waehlen` weiterhin wie eine zweite Hauptaufgabe wirken.

### 1.4 Mehrere Orientierungsleisten sagen aehnliches

Im aktiven Bereich erscheinen weiterhin mehrere Orientierungsebenen:

- `GuidedReadingPath` / `step-rail`: Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke.
- `guided-worked-chain`: dieselbe Beispielkette noch einmal als Pfeilkette.
- `Leseleiter`: erneut `Heute lesen wir so` mit `Jetzt` und `Danach` aus dem aktiven Aufgabenprofil.
- `daily-path-panel`: `Kleine Auswahl` / `Heute lesen` mit mehreren Karten.

Das erzeugt nicht unbedingt falsche Inhalte, aber zu viele gleichwertige Signale fuer "wo bin ich gerade?".

### 1.5 Tagespfad und Tagesauswahl vermischen sich noch

Der gefuehrte Mama-Pfad nutzt `mamaStepIndex` als klare Schrittlogik. Direkt darunter bleibt aber `daily-path-panel` mit mehreren Karten als Auswahlraster sichtbar. Damit stehen zwei Pfadmodelle nebeneinander:

- ein linearer Mama-Schrittpfad,
- ein auswählbarer Tagesweg mit mehreren Karten.

Fuer Alpha 31B sollte nur eines davon die Kinder-Hauptbuehne sein: der lineare Tagespfad.

### 1.6 Bibliothek bleibt zu nah am Kinderfluss

Die `library-panel` ist als `details` bereits sekundär, aber sie steht noch im aktiven Kinderbereich und oeffnet eine grosse Auswahlwelt mit `Wort üben`, `Story lesen`, Aufgaben- und Story-Pills. Das ist fuer Lehrkraefte hilfreich, fuer Kinder aber ein zweiter Modus direkt neben dem heutigen Pfad.

### 1.7 Doppelte Hauptaktionen

Im selben Kinderbereich koennen mehrere auffaellige Aktionen erscheinen:

- `Lesepfad starten`,
- `Tagespfad starten`,
- `Weiter` in der Mama-Schrittkarte,
- `Ich bin fertig` in der Lesekarte,
- Auswahlbuttons im Tagesweg und in der Bibliothek.

Alpha 31B sollte sichtbar nur eine primaere Kinderhandlung pro Zustand zeigen.

## 2. Exakte minimale Aenderungen fuer Alpha 31B

### 2.1 Einen Start behalten, den zweiten entfernen oder weich machen

Minimaler Zielzustand:

- `today-path-header` bleibt der einzige echte Start-/Weiter-Ort im Kinderpfad.
- `guided-entry-card` wird entweder entfernt oder zu einem sehr kleinen Hinweis oberhalb des Pfads reduziert, ohne eigenen Primaerbutton.
- Der sichtbare Primaerbutton heisst einheitlich `Tagespfad starten`, danach `Weiter`, am Ende `Fertig`.

Nicht bauen:

- keine neue Routinglogik,
- kein neuer Wizard,
- keine Persistenz fuer Startzustand.

### 2.2 Bibliothek aus dem Standard-Kinderfluss herausnehmen

Minimaler Zielzustand:

- Die Vollbibliothek wird im Standard-Kinderpfad nicht mehr direkt unter der Tagesauswahl angezeigt.
- Wenn sie fuer Demo-/Review-Zwecke erhalten bleiben muss, dann nur als sehr leiser Sekundaerlink am Ende: `Mehr Karten mit Lehrkraft öffnen`.
- Noch besser fuer Alpha 31B: Bibliotheksauswahl in den Lehrkraftbereich verschieben bzw. dort vorhandene Tagesweg-Auswahl nutzen.

Wichtig: Keine Aufgaben, Stories oder Content-Helper loeschen. Nur die Kinder-Standardposition der Bibliothek entschärfen.

### 2.3 `daily-path-panel` zur Fortschrittsuebersicht machen oder unterordnen

Minimaler Zielzustand:

- Im gefuehrten Mama-Slice zeigt `daily-path-panel` kein grosses Auswahlraster mehr oberhalb der Lesekarte.
- Falls Tageskarten sichtbar bleiben, dann nur als kompakte Statuszeile: `Heute: Mama-Pfad` oder `1 kleiner Weg vorbereitet`.
- Keine auswählbaren Karten neben der aktiven Schrittkarte im Default-Kinderpfad.

Damit bleibt die Lehrkraft-Vorbereitung erhalten, aber das Kind sieht nicht zwei Hauptpfade gleichzeitig.

### 2.4 Doppelte Ueberschriften reduzieren

Aktuell erscheinen Varianten von `Heute lesen wir so`, `Heute lesen`, `Dein Tagesweg`, `Leseleiter`. Alpha 31B sollte die Hierarchie vereinfachen:

- Haupttitel nur einmal: `Heute lesen`.
- Schrittzeile einmal: `Schritt X von 6: ...`.
- Step Rail ohne zweiten grossen Titel oder nur mit kleinem Label `Schritte`.
- `Leseleiter` im Lesekartenbereich entfernen oder in die vorhandene `step-rail` integrieren.
- `guided-worked-chain` entweder ausblenden oder als kleine Erklaerhilfe unter `details` setzen.

Minimaler Codeansatz fuer Neva:

- `GuidedReadingPath` bleibt die einzige Schrittleisten-Komponente.
- `Leseleiter` wird im Kinder-Default nicht gerendert, solange `MamaStepCard`/`step-rail` aktiv sind.
- Keine Datenstruktur anpassen, nur Rendering-Reihenfolge und Sichtbarkeit.

### 2.5 Eine aktive Karte als Hauptflaeche behalten

Minimaler Zielzustand:

- `MamaStepCard` ist die Hauptkarte im gefuehrten Tagespfad.
- Die normale `reading-card` mit `Ich bin fertig` erscheint nicht parallel zur Mama-Schrittkarte im selben Zustand.
- Wenn die normale Lesekarte weiter gebraucht wird, dann erst nach bewusster Lehrkraftauswahl oder in einem anderen Modus.

Akzeptabler Alpha-31B-Slice:

- Default-Kinderpfad = Mama-Schrittkarte + Step Rail + kompakte Hilfen.
- Tagesauswahl/Bibliothek/Lesekarte bleiben vorhanden, aber nicht als gleichzeitige Default-Konkurrenz.

### 2.6 Support Strip kompakt halten

Minimaler Zielzustand:

- `support-strip` bleibt sichtbar, aber nicht als linke Hauptsaeule.
- Desktop-Reihenfolge: Header -> Step Rail/aktive Karte -> kompakte Hilfen unter oder neben der Karte.
- Mobile-Reihenfolge: Header -> Step Rail -> aktive Karte -> Primaeraktion -> kompakte Hilfen.
- `Hilfe wählen` bleibt in `details`; geschlossen zeigt der Strip nur aktive Hilfechips.
- Keine grosse Hilfe-Buttonmatrix vor dem ersten Lesen.

Wording:

- `Aktiv: Bildhilfe, Silbenfarben` ist gut.
- `Hilfe wählen` ist erlaubt, aber sekundär.
- Keine Sprache wie Bewertung, Score, Diagnose, Test, Lesealter, Rang oder Tempo.

### 2.7 Eine Primaeraktion pro Zustand erzwingen

Konkrete Regel fuer Alpha 31B:

- Vor Start: genau ein Primaerbutton `Tagespfad starten`.
- Im Schritt: genau ein Primaerbutton `Weiter`.
- Sekundaer: `Nochmal ruhig`.
- Am Ende: genau eine Abschlussaktion `Fertig` oder `Heute fertig`.
- Keine zweite auffaellige Aktion `Ich bin fertig`, solange die Mama-Schrittkarte aktiv ist.

## 3. Was unveraendert bleiben muss

### 3.1 Lehrkraft-Lernstart

Der Bereich `Lernstart: kurzer Check` bleibt im Lehrkraftmodus erhalten. Er darf den Kinderpfad weiterhin nicht automatisch umstellen. Die Sprache muss vorsichtig bleiben: lokaler Start, sichtbare Beobachtung, naechster kleiner Schritt, keine feste Einordnung.

### 3.2 Profilbuilder und Profilvorschau

`Lokales Leseprofil einstellen`, Demo-Profilvorschau und die bekannten Graphem-/Silben-/Hilfen-Auswahlen bleiben erhalten. Alpha 31B soll diese Werkzeuge nicht umbauen, sondern nur verhindern, dass sie als Kinder-Entscheidungsraum wirken.

### 3.3 Coverage Inspector

Der Coverage-Check bleibt im Lehrkraftbereich. Er ist eine lokale Strukturierungs- und Reviewhilfe, kein Kinderpfad-Element. Keine Loeschung, keine Umbenennung zu Bewertung oder Leistungsanzeige.

### 3.4 Tagesweg-Auswahl fuer Lehrkraefte

Die Lehrkraft darf weiterhin Karten fuer heute vorbereiten. Die Entschlackung betrifft nur die sichtbare Kinder-Defaultbuehne, nicht die Auswahlmoeglichkeit im Lehrkraftmodus.

### 3.5 Local-only Safety

Unveraendert verboten:

- echte Lernendendaten,
- Namen, Fotos, Klassenlisten,
- Login, Backend, Cloud, Upload, Export,
- Scores, Noten, Ranking, Timer, Prozentfortschritt, Lesealter,
- klinische oder diagnostische Aussagen,
- geschuetzte Bild-/Symbolassets oder Claims zu METACOM, ARASAAC, Boardmaker oder Widgit.

Erlaubte sichere Sprache:

- `lokale Lernbeobachtung`,
- `heutiger Pfad`,
- `naechster kleiner Schritt`,
- `Heute passend`,
- `Nochmal ruhig`,
- `gemeinsam lesen`.

## 4. Browser-Smoke-Checklist fuer Alpha 31B

### Desktop ca. 1280 x 900

- Kinderpfad oeffnen.
- Pruefen: Auf den ersten Blick sind `Heute lesen`, aktueller Schritt und eine aktive Karte sichtbar.
- Pruefen: Es gibt vor dem Start nur einen auffaelligen Primaerbutton.
- `Tagespfad starten` klicken.
- Mehrfach `Weiter` klicken.
- Pruefen: Step Rail und aktive Karte bleiben synchron von Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke.
- Pruefen: Kein zweites grosses Auswahlraster konkurriert oberhalb oder direkt neben der aktiven Karte.
- Pruefen: Bibliothek ist nicht als Standard-Kinderbereich prominent sichtbar.
- Pruefen: `Hilfe wählen` bleibt erreichbar, dominiert aber nicht die Hauptbuehne.
- Pruefen: Lehrkraftmodus zeigt weiterhin Tagesweg-Auswahl, Profilbuilder, Coverage Inspector und Lernstart.

### Tablet / Narrow ca. 768 x 1024

- Reihenfolge pruefen: Header -> Step Rail -> aktive Karte -> Primaeraktion -> kompakte Hilfen.
- Touchziele pruefen: Buttons bleiben gross genug und nicht zusammengedrueckt.
- Pruefen: `Weiter` bleibt ohne langes Suchen erreichbar.
- Pruefen: Step Rail bricht ruhig um, kein horizontaler Overflow.

### Mobile Smoke ca. 390 x 844

- Pruefen: Kein horizontaler Overflow.
- Pruefen: Lange Woerter, Silben und Mini-Geschichte ueberlappen nicht.
- Pruefen: Primaerbutton ist volle Breite oder klar sichtbar.
- Pruefen: Hilfen erscheinen nach der aktiven Karte oder kompakt, nicht vor der Hauptaufgabe.
- Pruefen: `Nochmal ruhig` ist sekundär und nicht staerker als `Weiter`.

### Safety Smoke

- Sichtbaren Kinderpfad auf unzulässige Begriffe pruefen: Diagnose, diagnostisch, Score, Punkte, Note, Ranking, Timer, Zeitdruck, Prozent, Lesealter, falsch, Fehler, defizit.
- Pruefen: Keine neuen externen Asset-URLs oder geschuetzten Symbolsystem-Claims.
- Pruefen: Keine neue Speicherung, kein Download, kein Upload, kein Fetch, kein Login.

## 5. Acceptance Criteria fuer Source Tests

Alpha 31B sollte die vorhandenen Source-Tests nicht ersetzen, sondern um kleine UI-Source-Guards ergaenzen.

### 5.1 Kinderpfad-Struktur

Ein Source-Test in `tests/lesewerk-content.test.mjs` oder einer passenden App-Source-Testdatei sollte pruefen:

- `child-path-shell`, `today-path-header`, `step-rail`, `active-step-card`, `support-strip` bleiben im App-Source vorhanden.
- `GuidedReadingPath` erhaelt weiterhin `activeIndex={mamaStepIndex}`.
- `MamaStepCard` bleibt an `mamaStepIndex` gekoppelt.

### 5.2 Nur eine sichtbare Primaerlogik im Default-Kinderpfad

Testziel:

- Der Default-Kinderpfad hat nicht gleichzeitig mehrere prominente Startbuttons fuer denselben Pfad.
- Wenn `guided-entry-card` bleibt, darf sie keinen eigenen `primary-action`-Startbutton mehr tragen.
- `Weiter` bleibt die Primaeraktion der Mama-Schrittkarte.

Moegliche Source-Assertion:

- Abschnitt zwischen `mode === 'child'` und Lehrkraft-Branch schneiden.
- Darin pruefen, dass die Anzahl direkter Startlabels `Lesepfad starten` / `Tagespfad starten` nicht doppelt als Primaerbutton vorkommt.

### 5.3 Bibliothek nicht mehr prominent im Default-Kinderfluss

Testziel:

- `Alle Wörter und Geschichten öffnen` ist nicht mehr vor oder mitten in der aktiven Tagespfad-Buehne gerendert.
- Falls vorhanden, muss der Text auf Lehrkraftbegleitung oder sekundaere Nutzung verweisen.

Akzeptanz:

- Entweder kein `library-panel` im Standard-Kinderbranch,
- oder ein Source-Test stellt sicher, dass `library-panel` nach der Hauptkarte / unter einem leisen Sekundaerhinweis steht und nicht als Primaeraktion auftritt.

### 5.4 Doppelte Orientierung reduzieren

Testziel:

- `step-rail` ist die einzige dominante Schrittleiste im Default-Kinderpfad.
- `Leseleiter` wird nicht parallel zur Mama-Schrittkarte im Default-Kinderzustand gerendert.
- `guided-worked-chain` ist entweder entfernt oder nur als sekundaere Erklaerhilfe sichtbar.

### 5.5 Lehrkraftwerkzeuge bleiben sichtbar

Source-Test muss weiter absichern:

- `Lernstart: kurzer Check` bleibt vorhanden.
- `Lokales Leseprofil einstellen` bleibt vorhanden.
- `Coverage-Check: Was ist schon getaggt?` bleibt vorhanden.
- `Tagesweg wählen` bleibt vorhanden.
- Texte behalten Hinweise auf lokal/anonym/keine Speicherung bzw. keine automatische Uebernahme.

### 5.6 Safety-Regressions

Bestehende Safety-Tests sollten weiterlaufen und ggf. erweitert werden:

- Keine neuen Treffer fuer Score-, Ranking-, Timer-, Noten-, Prozent-, Lesealter- oder Diagnosesprache im Kinderpfad.
- Keine `fetch(`, `new Blob`, `URL.createObjectURL`, `download=`, Login-, Upload-, Cloud- oder Exportlogik durch Alpha 31B.
- Keine externen Bilddateien oder geschuetzten Asset-Claims.

## Minimaler Alpha-31B-Scope in einem Satz

Neva soll nicht den Teacher-Bereich umbauen und keine neuen Inhalte schreiben. Der kleinste nuetzliche Alpha-31B-Slice ist: im Kinderpfad einen Start, eine Step Rail, eine Mama-Aktivkarte, eine Primaeraktion und kompakte Hilfen behalten; Tagesauswahl, Bibliothek, zweite Leseleiter und parallele Lesekarte aus der Default-Kinderbuehne entfernen oder deutlich nach unten/sekundär verschieben.
