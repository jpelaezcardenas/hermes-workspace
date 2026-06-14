# Alpha 54A – Child Transition Spec Bild → Silbe → Wort → Satz

## Kurzfazit
Der Kinderpfad hat bereits eine gute Grundorientierung: Es gibt eine Leseleiter, eine Schrittleiste, eine Beispielkette und ruhige Formulierungen wie „Jetzt lesen“ und „Danach“. Die größte Lücke ist nicht das Vorhandensein von Orientierung, sondern die Klarheit des kleinsten nächsten Kindesignals in der tatsächlichen Übergangssituation: Nach einem Schritt ist nicht immer auf einen Blick eindeutig, was jetzt konkret gemacht werden soll und wie der Wechsel zwischen Bild, Silbe, Wort und Satz im Tagespfad weitergeht.

## Aktueller Stand im Kinderpfad
Vorhandene Orientierungselemente:
- `GuidedReadingPath` mit Leseleiter, aktuellem Schritt und nächstem Schritt
- Schrittleiste mit den Stationen Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbrücke
- Beispielkette mit Pfeilen von Bild → Silben → Wort → Satz → Mini-Geschichte → Schreibbrücke
- Kindnahe Texte wie „Bild anschauen“, „Silbe sprechen“, „Wort lesen“, „Kurzer Satz“
- Ein ruhiger Tagespfad mit vorbereiteten Karten und kleinen Auswahlmöglichkeiten

Was daran schon gut ist:
- Die Reihenfolge ist sichtbar.
- Die Sprache ist einfach.
- Der Pfad bleibt ruhig und lokal.
- Es gibt keine Score-, Timer- oder Ranking-Logik.

## Aktuelle Schwachstelle
Für Kinder, die noch nicht sicher selbstständig orientieren, bleibt die nächste Handlung an der Übergangsstelle zu unscharf:
- Die Leseleiter zeigt zwar den Pfad, aber nicht immer als sofort lesbare „Jetzt / Danach / Zeig / Drück“-Hilfekarte.
- Die Schrittleiste ist eher eine Überblicksstruktur als ein direkter Handlungsimpuls.
- Die Beispielkette erklärt den Verlauf, ersetzt aber keine kurze, klare Übergangscue.
- Besonders beim Wechsel von Bild zu Silbe und von Silbe zu Wort braucht es eine ruhige, eindeutige Brücke, damit Kinder nicht im Gesamtbild hängen bleiben.

## Vorschlag: kleinste sinnvolle Alpha-54B-Verbesserung
Eine einzige zusätzliche Übergangskarte direkt im Kinderpfad:

Name: „Mein nächster Schritt“

Inhalt der Karte:
- Jetzt: Bild / Silbe / Wort / Satz
- Danach: genau der nächste Schritt
- Ein kindnaher Satz, z. B.:
  - „Schau erst das Bild an.“
  - „Sprich die Silbe mit.“
  - „Lies das Wort.“
  - „Lies den Satz ruhig.“
- Ein einziger Hinweis auf die Handlung:
  - „Tippe auf die Karte.“ oder
  - „Zeige auf das Bild.“ oder
  - „Lies mit dem Finger mit.“

Wichtig: Diese Karte soll nur Orientierung geben, nicht bewerten und nicht belehren.

## Kindgerechte Formulierung
Empfohlene Copy für die Karte:
- Überschrift: „Mein nächster Schritt“
- Zeile 1: „Jetzt: Bild“
- Zeile 2: „Danach: Silbe“
- Zeile 3: „Ich schaue.“ / „Ich spreche mit.“ / „Ich lese.“

Wenn der aktuelle Schritt anders ist, werden nur die zwei Stufen angepasst. Die Sprache bleibt immer kurz und konkret.

## Warum genau diese Lösung
Diese Lösung ist die kleinste gute Verbesserung, weil sie:
- vorhandene Inhalte weiterverwendet
- nur eine zusätzliche Orientierungsebene ergänzt
- den Tagespfad nicht umsortiert
- keine neue Inhaltsmenge braucht
- für Tablet und Handy leicht lesbar bleibt
- Kindern mit geringerer Selbststeuerung sofort hilft

## Was auf keinen Fall dazukommen soll
Nicht hinzufügen:
- Punkte, Sterne, Ranking oder Prozentangaben
- Diagnose-, Niveau- oder Defizitwörter
- zu viele Textzeilen oder Erklärblöcke
- neue große Aufgabenpakete
- neue externe Bild- oder Symbolsammlungen
- Cloud-, Login-, Export- oder Speicherfunktionen
- ein zusätzlicher komplexer Bedienmodus
- ein zweiter konkurrierender Orientierungsstrip

## Acceptance Criteria für Alpha 54B
1. Im Kinderpfad gibt es eine einzige kleine Übergangskarte, die „Jetzt“ und „Danach“ sichtbar macht.
2. Die Karte nutzt nur vorhandene Leseschritte und bestehende kindnahe Wörter.
3. Die Karte bleibt ruhig, kurz und auf Tablet/ मोबाइल gut lesbar.
4. Die bestehende Leseleiter, Schrittleiste und Beispielkette bleiben erhalten.
5. Kein Score, kein Timer, kein Ranking, keine Diagnose- oder Leistungsanzeige wird ergänzt.
6. Die Kind-Route bleibt ohne zusätzlichen Umweg nutzbar.
7. Die neue Karte verwendet keine externen/protected Symbole und keine echten Nutzerdaten.

## Testplan
Fachlich / didaktisch:
- Kann ein Kind in 3 Sekunden erkennen, was jetzt ansteht?
- Wird der nächste Schritt ohne lange Erklärung klar?
- Bleibt der Pfad ruhig und nicht überladen?
- Hilft die Karte besonders beim Wechsel Bild → Silbe → Wort → Satz?

Technisch / UI:
- Mobile Sichtprüfung der Karte auf kleiner Breite
- Prüfen, dass die Leseleiter nicht verdrängt wird
- Prüfen, dass keine zusätzliche horizontale Unruhe entsteht
- Sichtprüfung, ob die Karte nach dem aktuellen Schritt korrekt umspringt

## Erfolgskriterium
Der Kinderpfad wirkt nicht „reicher“, sondern klarer: Ein Kind sieht schneller, was jetzt kommt, und kann den Leseweg mit weniger Erwachsenenhilfe fortsetzen.

## Sicherheits- und Datenschutznotiz
Keine personenbezogenen Daten verwenden. Nur allgemeine kindnahe Sprache, lokale Anzeige und bestehende anonymisierte Inhalte. Die Verbesserung bleibt eine reine Orientierungshilfe ohne Bewertung oder Diagnose.
