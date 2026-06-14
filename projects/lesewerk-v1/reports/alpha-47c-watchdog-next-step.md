# Alpha 47C – Watchdog Hilfeblock und nächste Leselogik

## Ampel
Grün mit kleiner Restunsicherheit.

## Kurzbewertung
Der Hilfeblock wirkt nach Alpha 47A/47B ruhiger und klarer, ohne dass wir die sichere Grundlogik verändert haben: optional, manuell, ohne automatische Übertragung, ohne neue Inhalte und ohne neue Risikofunktionen. Die Änderung bleibt klein und alltagstauglich für GE-Lernende; der offene Bereich ist nun kompakter, aber weiterhin gut bedienbar.

## Evidenz
- Aus Alpha 47A: Der Supportbereich war bereits sicher, manuell und funktional, aber auf sehr kleinen Displays noch textlastig.
- Aus Alpha 47B: Die geöffnete Supportkarte wurde nur visuell verdichtet, mit unverändertem Verhalten und unverändertem Supportweg.
- Verifikation:
  - `npm test` → 147/147 Tests bestanden.
  - `npm run build` → erfolgreich.
- Aus den bisherigen Reports und dem Scope:
  - keine neuen Inhalte,
  - keine automatische Support-Auswahl,
  - keine Score-/Timer-/Ranking-Logik,
  - keine Login-/Cloud-/Upload-/Export-Funktionen,
  - keine externen oder geschützten Assets,
  - keine realen Lerndaten.

## Risiken / Restunsicherheit
- Die Änderung ist bewusst klein und visuell; ein echter Test auf einem sehr schmalen realen Gerät bleibt wertvoll.
- Zu starke Verdichtung könnte bei künftigen Feinanpassungen die Lesbarkeit wieder verschlechtern.
- Die Supportkarte ist jetzt ruhiger, aber der nächste Nutzen entsteht vermutlich eher in der Leselogik als in weiterer UI-Kosmetik.

## Antwort auf die Leitfragen
### Wurde der Supportbereich ruhiger und klarer für GE-Lernende?
Ja, wahrscheinlich schon. Der Bereich bleibt freiwillig und manuell, wirkt aber nach der CSS-Verdichtung kompakter und leichter scannbar. Das passt gut zu einer klaren, reizarmen GE-Oberfläche.

### Haben wir optionalen/manuellen Support und die Sicherheitsgrenzen bewahrt?
Ja. Nichts deutet darauf hin, dass Automatisierung, neue Inhalte, Bewertung oder Datenübertragung eingeführt wurden. Der Support bleibt ausdrücklich optional und manuell.

### Was sollte Alpha 48 fokussieren?
Die kleinste hohe nächste Wirkung liegt aus meiner Sicht bei der Leselogik, genauer: bei mehr Klarheit im Leseverlauf und den konkreten nächsten Schritten für bekannte Buchstaben/Wörter. Das ist näher am fachlichen Kern als weitere UI-Feinjustierung. Lehrerseitige Entwicklungsstufen-Steuerung ist ebenfalls sinnvoll, wirkt aber als nächster Schritt etwas größer und eher nach einer späteren Ausbaustufe.

## Empfehlung für Alpha 48
Fokus: leselogische Klarheit des Tagespfads für bekannte Buchstaben/Wörter.

Begründung:
- Das verbessert unmittelbar die Orientierung im Lernweg.
- Es ist pädagogisch näher an Teilhabe und Verständlichkeit als weitere UI-Politur.
- Es kann klein geschnitten werden, ohne neue Inhalte oder risikoreiche Funktionen.

## Alpha-48-Task-Chain mit Acceptance Criteria
### Alpha 48A – Leselogik des aktuellen Schritts sichtbar und ruhig machen
Ziel: Den aktuellen Lese-Schritt im Tagespfad klarer markieren, ohne neue Inhalte einzuführen.

Acceptance Criteria:
- Der aktuelle Schritt ist optisch deutlicher als die übrigen Schritte.
- Es bleibt bei bestehenden Inhalten und bestehenden Routen.
- Keine Score-, Timer-, Ranking- oder Diagnosewörter.
- Keine automatische Umstellung des Tageswegs.
- Keine zusätzlichen Lerninhalte oder geschützten Assets.

### Alpha 48B – Known-letter-Aufgaben im sichtbaren Umfang prüfen und schlanker ordnen
Ziel: Die Menge und Reihenfolge der Aufgaben für bereits bekannte Buchstaben/Einheiten so prüfen, dass der sichtbare Lernweg nicht überladen wirkt.

Acceptance Criteria:
- Die Aufgabe bleibt im bekannten, vorhandenen Content-Spektrum.
- Sichtbare Auswahl bleibt überschaubar und für GE-Lernende ruhig.
- Keine neuen Inhalte, keine versteckte Bewertung, keine Datenübertragung.
- Lehrkräfte können den Umfang weiter manuell beeinflussen.

### Alpha 48C – Lehrersteuerung für Entwicklungsstufen als ruhige Kontrollschicht
Ziel: Eine einfache Lehreransicht prüfen, die Entwicklungsstufen ohne Automatismus kontrollierbarer macht.

Acceptance Criteria:
- Lehrerinnen und Lehrer können Stufen nachvollziehen und manuell steuern.
- Die Kinderansicht bleibt ruhig und reduziert.
- Keine Diagnoseendpunkte, kein Ranking, keine Notenlogik.
- Keine Cloud-, Login- oder Exportabhängigkeit.

## Schlussfazit
Alpha 47C ist aus fachlicher Sicht ein grüner Zwischenstand: Der Hilfeblock ist kleiner und ruhiger geworden, ohne Sicherheitsgrenzen zu verletzen. Für Alpha 48 sollte jetzt die Leselogik Priorität bekommen, damit die Benutzerführung nicht nur ruhig, sondern auch fachlich klarer wird.