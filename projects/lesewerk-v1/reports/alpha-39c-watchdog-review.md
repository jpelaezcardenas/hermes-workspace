# Alpha 39C – Watchdog Sprachglättung Tablet und Alpha-40 Fokus

## Ampel
Grün.

## Kurzfazit
Die Beispielmaterialien wirken nach Alpha 39B weiter ruhig, konkret und gut anschlussfähig für den GE-Kontext. Der Kinderpfad bleibt frei von Lehrkraft-/Serienlogik, und es sind keine neuen Risiken bei Datenschutz, Safe-UI oder Bedienlogik sichtbar.

## Belege
- `npm test`: 139/139 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Sichtprüfung auf `http://127.0.0.1:4173/`: Kinderpfad und Lehrkraftbereich sind getrennt, sichtbare Texte bleiben ruhig und kurz.
- Browser-Konsole: keine JS-Fehler, keine horizontale Überbreite im aktuellen Viewport (`1280px` Breite, `scrollWidth == clientWidth`).
- Codex-Nachprüfung nach dem Watchdog: Desktop 1280x900, Tablet 768x1024 und Mobile 390x844 bestanden. In allen drei Viewports: 4 Beispielkarten sichtbar, kurze Texte sichtbar, keine horizontale Überbreite, keine JS-Fehler, keine Beispielmaterialien im Kinderpfad.
- Sichtbare Kopien enthalten keine Hinweise auf geschützte Assets, echte Daten, Diagnose-, Score-, Timer-, Ranking-, Cloud-, Login- oder Export-Funktionen.
- Eltern-/Lehrkraftlogik bleibt getrennt von der Kinderlogik; der Kinderpfad zeigt weiter den Tagespfad ohne Lehrkraftserien-Vormerkung.

## Fachliche Bewertung
Die sprachliche Glättung ist erkennbar: Sätze sind kurz, handlungsnah und nicht übererklärend. Für den Kinderpfad ist wichtig, dass die ruhige Lesespur erhalten bleibt; das ist aktuell gegeben. Die Beispielmaterialien wirken tablet-tauglich, weil sie nicht textlastig, nicht verschachtelt und ohne unnötige Zusatzlogik erscheinen.

## Technische Bewertung
Die Oberfläche bleibt stabil und aufgeräumt. Im aktuellen Browser-Viewport gibt es keine horizontale Überbreite und keine JS-Fehler. Die Trennung zwischen Lernpfad und Lehrkraftbereich bleibt klar, sodass keine Lehrkraft-/Serienlogik in den Kinderpfad ausläuft.

## Restlücken
- Keine akute Mini-Fix-Notwendigkeit. Ein echter physischer Tablet-Touch-Test wäre später weiterhin wertvoll, ist aber kein Blocker für diese Phase.

## Alpha-40 Empfehlung
Alpha 40 sollte nicht weiter dieselbe UI-Sicherheitsrunde wiederholen. Sinnvoller nächster Fokus: den Wort-/Silbenbestand systematisch prüfen und gezielt erweitern, damit die App für unterschiedliche bekannte Buchstaben der Schülerinnen und Schüler mehr passende, kurze Leseangebote bereitstellen kann.
