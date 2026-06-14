# Alpha 35C - Watchdog Review

## Ampel
Grün.

## Qualitätsbewertung
Alpha 35B wurde nicht nur technisch umgesetzt, sondern fachlich auf eine echte kleine Serienlogik verdichtet. Die 7 Alpha-34-Beobachtungsaufgaben erscheinen im Code als 4 ruhige Unterrichtsserien mit Start, Wiederholung, nächstem Schritt, Hilfen und Auslasslogik; das ist GE-passend, kurz und wiederholbar.

Besonders wichtig: Der Kinderpfad bleibt unverändert ruhig. Die Serien sitzen im Lehrkraftbereich, die Kinderansicht zeigt weiterhin keine Serienauswahl, keine Diagnose- oder Scorelogik und keinen zusätzlichen Druck. Damit ist Alpha 35C als Watchdog fachlich bestanden.

## Was fachlich gelungen ist
- Die 7 Beobachtungsaufgaben sind zu 4 kleinen Unterrichtsserien gebündelt.
- Jede Serie trägt eine klare Mini-Didaktik: Start, Wiederholung, nächster kleiner Schritt, Hilfe, Auslasslogik.
- Die Formulierungen bleiben beobachtend, lokal und alltagsnah.
- Der Kinderpfad bleibt ruhig und wird durch die Serien nicht automatisch umgestellt.
- Die Lehrkraft sieht die Serien kompakt vor den kuratierten Einzelaufgaben; die Einzelaufgaben sind sekundär gehalten.

## Sicherheits- und GE-Prüfung
Grün.

Im sichtbaren Code und in den vorhandenen Tests finden sich keine neuen echten Schülerdaten, Diagnosen, Scores, Rankings, Timer, Logins, Cloud-/Exportfunktionen oder Drucklogiken mit Leistungsdruck. Die Serien heißen ruhig, bleiben lokal und sind als Planungsstütze formuliert, nicht als Bewertungssystem.

## Verifikation
- `npm test` bestanden: 136/136.
- `npm run build` bestanden.
- Browser-Smoke auf dem laufenden lokalen App-Stand: Startseite, Kinderbereich und Lehrkraftbereich erreichbar; die Lehrkraftnavigation ist vorhanden und die App bleibt ruhig und lokal.
- Codeprüfung bestätigt: `getLocalReadingSeriesForProfile(...)` erzeugt 4 Serien und `SeriesCompactPanel` rendert die kompakte Serienansicht im Lehrkraftbereich.

## Restlücken
- Die Serien sind didaktisch sauber, aber noch stark modellhaft. Für Alpha 36 wären noch reichere echte Inhaltsvarianten hilfreich.
- Die Auswahl bleibt manuell; eine vorsichtige, klar begründete Serienübergabe in den Tagespfad könnte später sinnvoll sein, darf aber nur ohne automatische Umstellung passieren.
- Sprachlich könnten einzelne Titel in sauberer deutscher Typografie noch etwas glatter werden.

## Perfekter Alpha-36-Folgeprompt
Oberziel: Verbessere LeseWerk nach Alpha 35C noch etwas mehr in Richtung ruhiger, klarer GE-Unterrichtsqualität, ohne den Kinderpfad zu belasten und ohne neue Diagnose-, Score-, Timer-, Login-, Cloud- oder Exportlogik.

Aufgabe 1: Verfeinere die 4 Unterrichtsserien so, dass sie noch stärker nach echtem Unterricht klingen. Jede Serie soll weiterhin Start, Wiederholung, nächsten kleinen Schritt und passende Hilfe tragen, aber die Inhalte sollen etwas konkreter und variantenreicher werden.

Aufgabe 2: Prüfe die Lehrkraftoberfläche auf unnötige Länge. Verdichte, wo möglich, aber ohne Informationsverlust. Ziel ist: schneller erfassbar für das Kollegium, ruhiger für den Blick.

Aufgabe 3: Halte den Kinderpfad strikt unverändert ruhig. Keine Serienbegriffe, keine zusätzliche Steuerlogik, keine automatische Umstellung.

Aufgabe 4: Wenn eine Serienübernahme in den Tagespfad ergänzt wird, dann nur manuell, transparent und lokal. Keine automatische Bewertung, kein Ranking, keine verdeckte Auswahl.

Pflichtprüfungen: `npm test`, `npm run build`, Desktop- und Mobile-Browser-Smoke, Safety-Scan auf Diagnose-/Score-/Timer-/Cloud-/Login-/Export-/Asset-Risiken.