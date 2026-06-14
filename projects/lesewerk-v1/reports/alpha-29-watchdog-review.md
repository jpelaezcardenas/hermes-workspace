# Alpha 29B - Watchdog Review

## Ampel
Green with one follow-up.

## Geprueft
- Der neue Lernstart bleibt lokal, anonym und ohne Speicherung.
- Die sichtbare UI vermeidet Score-, Ranking-, Timer-, Prozent- und Testlogik.
- Die Empfehlung wird aus Beobachtungs-Chips abgeleitet und an den bestehenden Alpha-28-Tagespfad angeschlossen.
- Der Kinderpfad wird nicht automatisch umgestellt.
- Es wurden keine geschuetzten Bild- oder Symbolassets eingefuehrt.

## Verifikation
- `npm test`: bestanden, 120/120 Tests.
- `npm run build`: bestanden.
- Source-Scan: Treffer zu localStorage und Diagnose-Wortlaut liegen in bestehenden aelteren Bereichen oder Reports, nicht als neue Lernstart-Funktion.
- Browser-Smoke laut Neva: Lernstart im Lehrkraftmodus sichtbar; Chip-Aenderung veraendert die Empfehlung.

## Bewertung
Alpha 29B ist fachlich ein sinnvoller Fortschritt: Die App hat jetzt nicht nur Aufgaben und Profiloptionen, sondern einen ersten kurzen Unterrichtseinstieg, der aus Beobachtungen einen Tagesweg macht. Das ist fuer den GE-Kontext passender als eine harte Diagnostik, weil es konkrete Hilfen, kleine Schritte und Wiederholung sichtbar macht.

## Grenzen
- Der Lernstart ist noch regelbasiert und ersetzt keine echte paedagogische Beobachtung.
- Es gibt noch keine breite, quantitative Inhaltsauswahl je Entwicklungsstufe.
- Satz-, Story- und Schreibbrueckenebene sind noch ausbaufaehig.
- Ein Tablet-/Touch-Test im Klassenraumkontext steht noch aus.

## Naechster sinnvoller Schritt
Alpha 30 sollte den Lernstart mit einem groesseren Inhalts- und Qualitaetspaket verbinden: mehr Aufgaben je Buchstaben-/Silbenstand, klarere Progression Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte, sowie eine visuell ruhigere Tagespfad-Fuehrung fuer Kinder.
