# Alpha 33C - Watchdog Review

## Ampel
Green.

## Was besser geworden ist
- Der Weg Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbrücke ist sichtbarer.
- Mini-Geschichte und Schreibbrücke fühlen sich mehr nach eigener Lernstation an.
- Die App bleibt lokal, nicht bewertend und ohne echte Lernendendaten.
- Die Bibliothek wurde nicht wieder zur Hauptfläche gemacht.
- Tests und Build sind grün.

## Qualitätsbewertung
Alpha 33 ist ein sinnvoller Schritt Richtung besseres Leseerlebnis. Die App ist noch nicht S-Tier, aber die zentrale Brücke wird klarer: Ein Kind kann eher verstehen, dass es nicht zufällige Karten anklickt, sondern einen kleinen Lernweg geht.

Der größte Gewinn ist die sichtbare Schreibbrücke. Sie öffnet Schreiben als Material-/Spurhandlung, ohne sofort richtige/falsche Antworten, Punkte oder Druck einzuführen. Genau das passt besser zu GE-orientierten frühen Lesesituationen.

## Noch offen
- Mehr echte, systematisch kuratierte Inhalte mit bekannten Buchstaben.
- Eine klarere Lehrkraftsteuerung für Entwicklungsstufen: bekannte Buchstaben, Silbenmuster, Wortschatzfeld, Unterstützungsbedarf.
- Bessere bildhafte Unterstützung, aber nur mit lizenzsicherem Ansatz.
- Mini-Geschichten brauchen mehr Varianten und Wiederholungsschleifen.
- Die Oberfläche sollte weiter visuell beruhigt werden, besonders für Kinder, die noch nicht selbstständig navigieren.

## Sicherheitsprüfung
Keine neuen Diagnosen, Scores, Ranglisten, Timer, Exporte, Logins, Cloud-Funktionen oder echten Lernendendaten. Keine METACOM-, ARASAAC-, Boardmaker-, Widgit- oder anderen geschützten Symbolassets.

## Perfekter Alpha-34-Folgeprompt
Oberziel: Entwickle LeseWerk Alpha 34 zu einem stärker individualisierbaren S-Tier-Lesewerkzeug für den GE-Bereich. Baue keinen großen unkontrollierten Content-Bulk. Arbeite in kleinen Slices.

Aufgabe 1: Erstelle ein fachlich klares Modell für Entwicklungsstufen und bekannte Buchstaben. Die Lehrkraft soll einstellen können: bekannte Grapheme, sichere Silben, Bild-/Symbolbedarf, Satzbereitschaft, Mini-Geschichten-Bereitschaft und Schreibbrücken-Bereitschaft. Formuliere alles als lokale Lernbeobachtung, nicht als Diagnose.

Aufgabe 2: Erweitere den Content gezielt mit 12 bis 18 hochwertigen Aufgaben, die zu den frühen Buchstaben und Silben passen. Jede Aufgabe braucht einen Zweck: Bild, Silbe, Wort, Satz, Mini-Geschichte oder Schreibbrücke. Keine Füllwörter, keine künstlichen Fantasiewörter, keine überfordernden Distraktoren.

Aufgabe 3: Verbessere die sichtbare Orientierung im Kinderpfad weiter. Ein Kind soll immer sehen: Wo bin ich gerade? Was mache ich jetzt? Was kommt als nächstes? Die Lehrkraft soll sehen, warum die App genau diese Aufgabe vorschlägt.

Pflichtprüfungen: `npm test`, `npm run build`, Browser-Smoke Desktop und Mobile, Safety-Scan auf Diagnose-/Score-/Timer-/Cloud-/Asset-Risiken. Wenn ein Teil zu groß wird, dokumentiere Teilergebnis und offene Punkte statt zu blockieren.
