# Alpha 34C - Watchdog Review

## Ampel
Grün.

## Qualitätsbewertung
Alpha 34B ist ein echter Individualisierungsschritt und nicht nur eine optische Aufräumaktion. Die Lehrkraft bekommt jetzt eine lokal nachvollziehbare Steuerung für bekannte Grapheme, Hilfe, Bereitschaft und den nächsten kleinen Lernschritt; das passt gut zu GE-orientierter Lernbeobachtung.

Besonders positiv: Die kuratierten Beobachtungsaufgaben bleiben bei 7 und damit im gewünschten engen Rahmen. Damit wirkt der Lehrkraftbereich nicht wie ein unkontrollierter Bulk, sondern wie eine gezielte Auswahl mit didaktischer Begründung. Der Kinderpfad bleibt dabei ruhig und ohne neue Drucklogik.

## Was fachlich gelungen ist
- Lokale Beobachtungssteuerung ist verständlich und alltagsnah formuliert.
- Der Kinderpfad bleibt ruhig; keine neue Belohnungs-, Diagnose- oder Ranglogik sichtbar.
- Die 6 bis 8 Aufgaben sind eingehalten, tatsächlich sind es 7.
- Der nächste Lernschritt wird mit bekannten Einheiten und Hilfen begründet statt als Diagnoseformel.
- Die Lehrkraft-Sicht zeigt nachvollziehbar, warum eine Aufgabe passend ist.

## Sicherheits- und Risikoprüfung
Grün.

Es gibt keine Hinweise auf neue Diagnosen, Scores, Timer, Rankings, Cloud-Funktionen, Logins, Uploads/Exporte oder echte Lernendendaten. Auch der Browser-Smoke zeigt eine ruhige Startseite mit klarer Trennung zwischen Kinderstart und Lehrkraftbereich. Die Darstellung bleibt lokal und datensparsam.

## Verifikation
- `npm test` bestanden: 134/134.
- `npm run build` bestanden.
- Browser-Smoke auf Desktop: Startseite, Kinderpfad und Lehrkraftbereich erreichbar; keine auffälligen Layoutprobleme.
- Browser-Smoke auf Mobile: Inhalte bleiben lesbar, keine horizontalen Überläufe im sichtbaren Bereich.

## Restlücken
- Die 7 Beobachtungsaufgaben sind noch ein Modell, aber noch kein wirkliches Unterrichtsserien-System.
- Alpha 35 sollte nicht weiter aufblähen, sondern die Auswahl in echte kurze Unterrichtspfade übersetzen.
- Die Oberfläche wirkt fachlich bereits besser steuerbar, könnte aber an einigen Stellen noch stärker verdichtet werden, damit Lehrkräfte schneller zum Kern kommen.

## Perfekter Alpha-35-Folgeprompt
Oberziel: Verdichte LeseWerk nach Alpha 34 zu einem ruhigen, klaren GE-Lesewerkzeug, das Lehrkräften kleine Unterrichtsserien statt weiterer Einzelflächen bietet. Kein Bulk, keine neuen Diagnose- oder Scorelogiken, keine Cloud, keine Logins.

Aufgabe 1: Überführe die 7 Beobachtungsaufgaben in 3 bis 4 kleine Unterrichtspfade. Jeder Pfad soll einen klaren Anfang, eine ruhige Wiederholung und einen nächsten kleinen Schritt haben.

Aufgabe 2: Halte den Kinderpfad visuell und inhaltlich ruhig. Zeige nur das, was für den aktuellen Schritt wirklich nötig ist. Keine zusätzliche Komplexität, keine neuen Parallelflächen.

Aufgabe 3: Gib der Lehrkraft eine noch knappere Steuerung: bekannte Buchstaben, sichere Silben, Hilfebedarf, Satzbereitschaft, Mini-Geschichten-Bereitschaft und Schreibbrücken-Bereitschaft. Formuliere alles weiterhin als lokale Lernbeobachtung.

Pflichtprüfungen: `npm test`, `npm run build`, Desktop- und Mobile-Browser-Smoke, Safety-Scan auf Diagnose-/Score-/Timer-/Cloud-/Login-/Export-/Asset-Risiken.
