# Alpha 12 – Teacher Area Visual Hierarchy Blueprint

Datum: 2026-05-17
Ziel: Die Lehrkraftfläche von Alpha 11 ruhiger, klarer und schneller scannbar machen, ohne den Funktionsumfang zu erweitern.

## 1. Zielbild der Hierarchie

Die Lehrkraftfläche braucht eine klare dreistufige Ordnung:

### Primary
Das ist die Hauptarbeit der Lehrkraft und muss sofort erkennbar sein:
- die Tagesweg-Curation / Auswahl der heutigen Karten;
- die direkte Anpassung des Tageswegs;
- die bestätigbare, lokale Aktion der Lehrkraft.

### Secondary
Das sind unterstützende Inhalte, die helfen, aber nicht den Blick dominieren dürfen:
- der Lehrer-Vorschlag für den nächsten Tagesweg;
- die kurze Begründung des Vorschlags;
- die Alternative zum Vorschlag;
- der nächste kleine Schritt;
- die Statusrückmeldung nach Apply/Ignore.

### Tertiary
Das sind nachgeordnete Orientierungselemente, die nur bei Bedarf auffallen sollen:
- Beobachtung / Notiz / Protokollhinweise;
- Pilot- und Druckinformationen;
- technische oder erklärende Zusatztexte;
- Reset- und Nebeninformationen, sofern vorhanden.

Die visuelle Regel lautet: Erst die Arbeit, dann die Hilfe, dann die Erklärung.

## 2. Sollbild für die Lehrkraftfläche

Die Lehrkraftfläche soll sich wie eine ruhige Planungsoberfläche anfühlen, nicht wie ein Dashboard.

Das heißt konkret:
- eine klar erkennbare Hauptfläche für den Tagesweg;
- ein kleiner, aber auffindbarer Vorschlagsblock;
- keine konkurrierenden Großflächen nebeneinander;
- keine optische Aufwertung von Nebeninformationen;
- keine zusätzliche „zweite Startseite“ oberhalb des eigentlichen Arbeitsbereichs.

## 3. Der Vorschlagsblock wird leiser, bleibt aber findbar

Der Vorschlagsblock darf sichtbar bleiben, muss aber visuell zurücktreten.

### Anforderungen an die Ruhe
- kleinere optische Betonung als die Tagesweg-Curation;
- geringere Flächenwirkung als die Hauptarbeit;
- ruhigere Hintergrundfarbe als die Hauptfläche;
- weniger starke Rahmen- und Schattenwirkung als die Hauptfläche;
- kompaktere Typografie als die Hauptüberschrift des Arbeitsbereichs;
- kurze, klare Beschriftung statt langer erklärender Texte.

### Anforderungen an die Auffindbarkeit
- der Block bleibt im Lehrerbereich oben oder im direkten Blickfeld;
- Überschrift und Statushinweis bleiben eindeutig lesbar;
- die beiden Handlungen „In Tagesweg übernehmen“ und „Ignorieren“ bleiben klar sichtbar;
- die Begründung bleibt zugänglich, darf aber optisch zurücktreten;
- der Block muss auch auf schmalen Bildschirmen ohne Suchen erreichbar sein.

### Konkrete visuelle Priorität
Der Vorschlag soll als „Hilfeblock“ wahrgenommen werden, nicht als Hauptaufgabe.

## 4. Tagesweg-Curation bleibt die Hauptarbeit

Die Tagesweg-Curation ist der zentrale Arbeitsbereich der Lehrkraft.
Sie soll daher die stärkste visuelle und semantische Priorität bekommen.

### Sollregeln
- sie bekommt den klarsten Titel im Lehrerbereich;
- sie ist die größte, ruhigste und am besten lesbare Arbeitszone;
- sie steht unmittelbar als handlungsorientierter Bereich im Fokus;
- die Karten sind direkt klickbar und ohne Umweg verständlich;
- die Auswahl soll als konkrete tägliche Entscheidung erscheinen, nicht als Nebenfunktion.

### Inhaltliche Priorität
Die Lehrkraft soll auf einen Blick erkennen:
1. Was ist der heutige Tagesweg?
2. Welche Karten sind gewählt?
3. Was ist der nächste Schritt?
4. Was kann ich direkt übernehmen oder verwerfen?

### Gestalterische Konsequenz
Wenn die Fläche knapp wird, muss zuerst alles Unwichtige schrumpfen, nicht der Tagesweg.

## 5. Layoutregeln nach Gerätegröße

### Desktop
- Zwei-Spalten-Anordnung ist erlaubt, wenn sie klar hierarchisch bleibt.
- Die Hauptarbeitsfläche darf breiter sein als der Vorschlagsbereich.
- Der Vorschlagsblock darf sichtbar, aber kleiner bleiben.
- Beobachtung, Pilot und Druck dürfen in ruhigeren Sekundärblöcken stehen.
- Keine verschachtelte Kartenlandschaft mit gleich starken Blöcken.

### Tablet
- Die Lehrkraftfläche soll entweder in einer klaren Hauptspalte mit darunterliegenden Nebenbereichen oder in einer sehr stabilen 60/40-Verteilung erscheinen.
- Die Tagesweg-Curation bleibt oben oder im ersten Bildschirmbereich sichtbar.
- Der Vorschlag darf nicht mit der Hauptarbeit um Platz konkurrieren.
- Textzeilen müssen ohne horizontales Lesen funktionieren.
- Bedienflächen müssen groß genug bleiben, damit Tippen ohne Fehlbedienung möglich ist.

### Mobile
- Einspaltiges Layout.
- Reihenfolge von oben nach unten:
  1. Lehrerbereich / Orientierung
  2. Tagesweg-Curation
  3. Vorschlag
  4. Beobachtung / Pilot / Druck
- Kein enges Zwei-Spalten-Textlayout.
- Keine nebeneinander liegenden Textblöcke, wenn sie Lesbarkeit kosten.
- Die wichtigsten Aktionen müssen ohne Scroll-Suche erreichbar bleiben.

## 6. Was sich gegenüber Alpha 11 nicht ändern darf

Alpha 12 darf die akzeptierte Alpha-11-Basis nicht beschädigen.

Es darf nicht verändert werden:
- der ruhige Kinderpfad „Heute lesen“ als primärer Start;
- die lokale, anonyme Lehrkraftsteuerung;
- der Lehrer-Vorschlagsblock als manuelle Unterstützung;
- das manuelle Verhalten „Übernehmen“ und „Ignorieren“;
- die Max-four-Regel für den Tagesweg;
- lokale Speicherung ohne echte Namen, Cloud, Login, Backend oder Export;
- keine Scores, Timer, Rankings, Diagnosen, Tempo- oder Schamsprache;
- keine automatische Entscheidung über den Kinderpfad;
- kein neuer App-Modus und keine neue Datenbasis;
- die ruhige Grundstimmung der Kinderansicht.

Wichtig: Alpha 12 ist eine Hierarchie- und Dichteverfeinerung, kein Feature-Ausbau.

## 7. Praktische Gestaltungsprinzipien

- Primary-Flächen bekommen mehr Raum, Secondary-Flächen weniger.
- Der Vorschlag darf nie lauter wirken als die Tagesweg-Curation.
- Nebentexte werden kürzer, nicht wichtiger.
- Sekundärblöcke sollen im Zweifel kompakter, nicht größer werden.
- Karten und Buttons müssen klar unterscheidbar bleiben.
- Die Oberfläche soll ruhig, professionell und alltagstauglich wirken.

## 8. Akzeptanzkriterien für Slice B

Slice B ist erfüllt, wenn die Umsetzung folgende Punkte sichtbar erfüllt:
- die Lehrkraftfläche hat eine klare Primary/Secondary/Tertiary-Ordnung;
- der Tagesweg ist die am stärksten fokussierte Arbeitsfläche;
- der Vorschlagsblock ist ruhiger und visuell kleiner als die Hauptarbeit;
- Beobachtung, Pilot und Druck treten optisch zurück;
- Desktop, Tablet und Mobile bleiben gut lesbar;
- kein Alpha-11-Verhalten geht verloren;
- keine neuen Produktfunktionen werden hinzugefügt.

## 9. Akzeptanzkriterien für Slice C

Slice C ist erfüllt, wenn die Interaktion und Verständlichkeit geprüft und stabil sind:
- Fokuszustände bleiben sichtbar;
- Apply/Ignore/Reset sind klar erkennbar;
- die Hierarchie bleibt auch per Tastatur nachvollziehbar;
- Buttons und Karten sind auf schmalen Screens noch gut bedienbar;
- der Lehrerbereich wirkt nicht wie ein Dashboard;
- der Kinderpfad bleibt unverändert und ruhig;
- keine Datenschutz- oder Namensregressionen entstehen.

## 10. Akzeptanzkriterien für Slice D

Slice D ist erfüllt, wenn die Endprüfung zeigt:
- Tests und Build sind grün;
- Desktop- und Narrow-Viewport-Check bestehen;
- keine verbotenen Muster in den aktiven Produktdateien auftauchen;
- die Lehrerfläche ist sichtbar ruhiger und klarer als in Alpha 11;
- die Tagesweg-Curation bleibt die Hauptarbeit;
- der Vorschlag bleibt auffindbar, aber nicht dominant.

## 11. Kurzfassung für die Umsetzung

Die Umsetzung soll im Kern diese Regel befolgen:

„Die Lehrkraft sieht zuerst die Tagesweg-Arbeit, dann die ruhige Hilfe, dann die zusätzlichen Hinweise.“

Wenn eine Entscheidung zwischen mehr Sichtbarkeit und mehr Ruhe nötig ist, gewinnt die Ruhe – solange der Vorschlag noch eindeutig auffindbar bleibt.
