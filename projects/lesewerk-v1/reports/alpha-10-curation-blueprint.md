# Alpha 10 – Curation Blueprint and Acceptance Contract

Datum: 2026-05-17
Status: Blueprint
Ziel: Lokale Lehrkraft-Kuratierung des täglichen Lesewegs, ohne Dashboard, ohne Konten, ohne Cloud und ohne neue Inhaltsmenge.

## 1. Produktauftrag in einem Satz

Alpha 10 ergänzt die bestehende Alpha-9-Demo um eine kleine lokale Lehrkraft-Funktion: Im Lehrkraftbereich können für den heutigen Kinderpfad bis zu vier vorhandene Karten ausgewählt werden. Der Kinderbereich zeigt danach genau diese Auswahl als ruhigen Tagesweg. Wenn nichts ausgewählt ist, bleibt der sichere Alpha-9-Standardpfad aktiv.

## 2. Geltungsbereich

In Alpha 10 wird nur der tägliche Leseweg kuratiert.

Erlaubt:
- lokale Auswahl von vorhandenen Karten aus dem bestehenden Inhalt;
- Anzeige dieser Auswahl im Kinderbereich;
- Rückfall auf den sicheren Standardpfad;
- eine kleine, klar benannte Lehrkraftsektion;
- klare Hinweise für Kinder- und Lehrkraftsprache;
- Tests und Browser-Checks für die neue Auswahllogik.

Nicht erlaubt:
- keine Content-Erweiterung;
- kein Dashboard;
- keine Klassenverwaltung;
- keine Schülerprofile mit Namen;
- kein Login;
- keine Cloud;
- kein Export;
- kein Backend;
- kein Upload;
- keine automatische Übertragung;
- keine Scores, Timers, Rankings, Noten oder Diagnosesprache.

## 3. Daten- und Datenschutzgrenze

Die Kuratierung arbeitet ausschließlich lokal im Browser.

Zulässig sind nur anonyme, nicht personenbezogene Bezeichnungen wie:
- Profil Blau
- Profil Grün
- Profil Sonne
- Karte 1–4
- Heute lesen
- Tagesweg

Verboten sind:
- echte Namen;
- Initialen mit eindeutiger Zuordnung;
- Geburtsdaten, Adressen, Familienangaben;
- Diagnosen oder medizinische Einordnungen;
- Speicherung oder Übertragung an externe Dienste;
- Cloud-Synchronisation, Login oder Authentifizierung;
- exportierbare personenbezogene Protokolle.

## 4. Exakte Max-vier-Kuratierung

Die Lehrkraft kann für den heutigen Tagesweg 0 bis 4 Karten auswählen.

Definition der auswählbaren Karten:
- nur bereits vorhandene Inhalte;
- keine neuen Stories oder Aufgaben werden für Alpha 10 ergänzt;
- es werden nur Karten aus dem bestehenden Inhaltsbestand angeboten.

Regeln:
1. Maximal vier Karten können aktiv ausgewählt sein.
2. Die Auswahl geschieht lokal im Lehrkraftbereich.
3. Jede Auswahl ersetzt nicht den Gesamtbestand, sondern steuert nur den Kinder-Tagesweg.
4. Die Reihenfolge der Auswahl ist die Reihenfolge des sichtbaren Tageswegs.
5. Eine fünfte Auswahl ist nicht möglich; stattdessen bleibt die Oberfläche bei vier Karten gesperrt oder weist ruhig darauf hin, dass vier Karten genügen.
6. Die Auswahl bleibt auf den aktuellen lokalen Demo-Stand bezogen und ist nicht als Schülerhistorie gespeichert.

## 5. Verhalten bei 0, 1, 2, 3 oder 4 ausgewählten Karten

### 5.1 Keine Karten ausgewählt

Wenn keine Karte ausgewählt ist, gilt immer der sichere Alpha-9-Standardpfad.

Das bedeutet:
- der Kinderbereich zeigt weiterhin den bekannten ruhigen Tagesweg;
- die Default-Auswahl bleibt klein und übersichtlich;
- die App wirkt nicht leer;
- die Lehrkraft muss keine Auswahl treffen, um sicher starten zu können.

Ziel dieses Fallbacks:
- sofort nutzbar;
- kein Abbruch bei leerem Zustand;
- keine Überforderung;
- klare sichere Grundfunktion.

### 5.2 Eine Karte ausgewählt

Wenn genau eine Karte ausgewählt ist, zeigt der Kinderbereich nur diese eine Karte als Tagesweg.

Wirkung:
- sehr kleiner Einstieg;
- klarer Fokus;
- geeignet für reduzierte Tage oder sehr frühe Einstiegssituationen.

Falls die bestehende App für das Layout mindestens zwei Karten benötigt, darf eine sanfte Ergänzung mit einem neutralen Platzhalter erfolgen, aber nur wenn dieser Platzhalter nicht wie zusätzlicher Lerninhalt wirkt. Bevorzugt bleibt jedoch: genau eine sichtbare Karte.

### 5.3 Zwei Karten ausgewählt

Wenn zwei Karten ausgewählt sind, zeigt der Kinderbereich genau diese zwei Karten.

Wirkung:
- ruhiger, kleiner Arbeitsweg;
- passende Reduktion für kurze oder entlastete Lernsituationen;
- klarer Fokus ohne Überlastung.

### 5.4 Drei Karten ausgewählt

Wenn drei Karten ausgewählt sind, zeigt der Kinderbereich genau diese drei Karten.

Wirkung:
- kleiner, aber schon etwas abwechslungsreicher Tagesweg;
- weiterhin klar und ruhig;
- geeignet, wenn etwas mehr Umfang als bei zwei Karten sinnvoll ist.

### 5.5 Vier Karten ausgewählt

Wenn vier Karten ausgewählt sind, zeigt der Kinderbereich genau diese vier Karten.

Wirkung:
- dies ist die volle erlaubte Alpha-10-Kuration;
- die Auswahl bleibt klein;
- die Oberfläche bleibt ruhig und ohne Dashboard-Gefühl.

## 6. Kindesprache und Lehrkraftsprache

### 6.1 Child-facing wording

Die Kinderansicht bleibt einfach, freundlich und druckarm.

Verwende bevorzugt Formulierungen wie:
- Heute lesen
- Dein Tagesweg
- Vier ruhige Karten
- Wir lesen langsam
- Du darfst eine Hilfe wählen
- Danach kannst du weiter lesen oder fertig sein
- Gut gelesen.
- Alles in Ruhe.

Nicht verwenden:
- jetzt musst du;
- Test;
- Bewertung;
- richtig/falsch im dominanten Ton;
- Zeitdruck;
- schnell;
- Fehler;
- Noten- oder Rankingbegriffe.

### 6.2 Teacher-facing wording

Die Lehrkraftansicht bleibt knapp, handlungsnah und klar.

Verwende bevorzugt Formulierungen wie:
- Tagesweg wählen
- Heute vorbereiten
- Auswahl lokal
- Maximal vier Karten
- Sicherer Standardpfad
- Kurzer Pilot
- Anonyme Beobachtung
- Lokale Druckvorschau

Nicht verwenden:
- Dashboard;
- Klassenverwaltung;
- Leistungsübersicht;
- Export;
- Diagnose;
- Dokumentationssystem;
- Bewertung der Kinder.

## 7. Aufbau der Lehrkraftsektion

Die Lehrkraftsektion soll kompakt bleiben und nicht wie ein Dashboard wirken.

Sie braucht genau drei Funktionen:
1. Tagesweg wählen: Auswahl der Karten für heute.
2. Sicher prüfen: Sichtbar, dass keine personenbezogenen Daten genutzt werden.
3. Zurücksetzen: Den lokalen Demo-Stand auf den sicheren Standard zurückstellen.

Zusätzlich erlaubt, aber klein gehalten:
- kurze Erklärung der Auswahlregel;
- klarer Hinweis auf den Fallback;
- kurze Hinweise zur lokalen, anonymen Nutzung.

Nicht vorgesehen:
- Filterlisten;
- Sortierfunktionen;
- Statistikbereiche;
- Verlaufstabellen;
- Schülerverwaltung;
- gespeicherte Tagespläne über einzelne Personen.

## 8. Erwartetes Verhalten im Kinderbereich

Wenn der Lehrkraftbereich eine Auswahl getroffen hat:
- der Kinderbereich zeigt diese ausgewählten Karten als Tagesweg;
- die sichtbare Auswahl bleibt klein;
- die Karten bleiben ruhig und groß genug bedienbar;
- der Bereich heißt weiterhin „Heute lesen“ oder eine sehr nahe Formulierung.

Wenn keine Auswahl getroffen wurde:
- der Kinderbereich nutzt den Alpha-9-Standardpfad;
- es gibt keinen Leerzustand als Startfehler;
- das Kind kann sofort lesen.

Der Kinderbereich soll niemals den Eindruck eines Verwaltungsbildschirms machen.

## 9. Verbindliche Implementationsannahmen

Für die spätere Umsetzung gilt:

1. Der aktuelle Alpha-9-Standardpfad bleibt als Fallback erhalten.
2. Die neue Kuration darf den bestehenden Content nur auswählen, nicht erweitern.
3. Die Auswahl muss lokal, anonym und ohne Persistenz personenbezogener Daten funktionieren.
4. Die Kinderansicht wird nur durch die ausgewählte Karte(n) gesteuert.
5. Die Umsetzung soll klein und nachvollziehbar sein; bevorzugt sind wenige, gut testbare Helferfunktionen.

## 10. Acceptance Criteria für die Implementierung

Die Umsetzung gilt als korrekt, wenn alle Punkte erfüllt sind:

1. Im Lehrkraftbereich kann der Tagesweg lokal auf 0 bis 4 Karten gesetzt werden.
2. Es gibt keinen Weg, mehr als vier Karten auszuwählen.
3. Bei 0 ausgewählten Karten bleibt der Alpha-9-Standardpfad sichtbar und nutzbar.
4. Bei 1, 2, 3 oder 4 ausgewählten Karten zeigt der Kinderbereich genau diese Auswahl als Tagesweg.
5. Es werden nur bestehende Inhalte verwendet.
6. Es gibt keine echten Namen oder andere personenbezogene Daten.
7. Es gibt keine Cloud-, Login-, Export-, Backend- oder Upload-Funktion.
8. Es gibt keine Scores, Timer, Rankings oder Diagnosesprache.
9. Die Ansicht bleibt ruhig, klein und GE-tauglich.
10. Die Lehrkraft kann die Auswahl ohne Umwege wieder auf den sicheren Standard zurücksetzen.

## 11. Acceptance Criteria für Tests

Tests müssen mindestens prüfen:

- Max-vier-Regel: Mehr als vier Karten sind nicht auswählbar.
- Fallback-Regel: Bei leerer Auswahl bleibt der sichere Standardpfad aktiv.
- 1–3-Karten-Regel: Die Kinderansicht zeigt genau die gewählten Karten.
- 4-Karten-Regel: Die volle erlaubte Kuratierung wird korrekt angezeigt.
- Datenschutzsprache: Keine verbotenen Muster wie Login, Cloud, Export, Score, Timer, Ranking oder Diagnose tauchen in der Produktlogik auf.
- Rücksetzen: Der lokale Demo-Stand kann wieder auf Standard zurückgesetzt werden.

## 12. Acceptance Criteria für Browser-Checks

Ein Browser-Check gilt als bestanden, wenn sichtbar ist:

- der Alpha-10-Hinweis bzw. die neue lokale Demo-Bezeichnung;
- die Lehrkraftsektion zur Tagesweg-Auswahl;
- die begrenzte Auswahl auf maximal vier Karten;
- der sichere Standardpfad bei leerer Auswahl;
- die ruhige Kinderansicht;
- der klare Rücksetzweg.

Der Browser-Check soll bestätigen, dass die neue Funktion als kleine Unterrichtshilfe und nicht als Verwaltungsoberfläche wirkt.

## 13. Acceptance Criteria für den finalen Watchdog

Der finale Watchdog darf nur akzeptieren, wenn:

1. Tests bestehen.
2. Build besteht.
3. Browser-Check besteht.
4. Forbidden-Pattern-Scan ist unauffällig.
5. Der Datenschutzrahmen bleibt lokal und anonym.
6. Die App fühlt sich weiterhin ruhig und klein an.
7. Kein Dashboard-Gefühl ist entstanden.

## 14. Nicht-Ziele für Alpha 10

Alpha 10 macht bewusst nicht:
- keine adaptive Empfehlungssystematik;
- keine automatische Diagnostik;
- keine individuelle Lernverlaufsanalyse;
- keine Erweiterung der Bibliothek;
- keine Klassenverwaltung;
- keine Datenexporte;
- keine Cloud-Anbindung;
- kein neues Reporting-System.

## 15. Kurzform des Contracts

Alpha 10 = bestehender Alpha-9-Standardpfad + lokale Lehrkraftauswahl für genau 0 bis 4 Karten + ruhiger Kinderpfad + sicherer Fallback + keine personenbezogenen Daten + keine Dashboard-Erweiterung.
