# Alpha 55A – Child Path Attractiveness Spec

## Kurzurteil
Gelb-grün mit klarer Richtung: Der Kinderpfad ist bereits ruhig und verständlich, wirkt aber in der Übergangsfläche noch etwas zu gleichförmig. Die kleinste sinnvolle Alpha-55B-Idee ist deshalb keine neue Funktion, sondern eine behutsame visuelle Hierarchie für „Jetzt“ und „Danach“, damit der nächste Leseschritt schneller erfasst wird.

## Aktuelle Beobachtung
Die Bereiche `guided-path-panel`, `child-progress-strip` und `guided-transition-card` sind schon sauber aufgebaut. Trotzdem wirkt der Kinderpfad an zwei Stellen noch leicht flach:

- Die Blickführung auf den aktuellen Schritt ist vorhanden, aber visuell noch nicht stark genug getrennt von den nachfolgenden Schritten.
- Die kleine Karte „Mein nächster Schritt“ liefert Inhalt, aber ihre Hierarchie ist noch eher „informativ“ als „einladend“.
- Auf kleinen Displays kann die Kombination aus Schrittleiste, Statuszeile und Übergangskarte etwas gleichmäßig wirken; man erkennt alles, aber nicht sofort, wo die Aufmerksamkeit zuerst hin soll.

Wichtig: Das ist kein Inhaltsproblem, sondern ein Feinschliff bei Gewichtung, Abständen und Farbsignalen.

## Empfohlene Mikro-Verbesserung für Alpha 55B
Eine einzige kleine Verbesserung: die aktuelle Leseorientierung soll visuell klarer als „Jetzt / Danach“ geführt werden.

Konkret:
- `child-progress-status` bekommt etwas stärkere visuelle Präsenz als ruhiger Fokusblock.
- Der aktuelle Schritt in `.child-progress-pill.current` darf klarer hervortreten, ohne lauter zu werden.
- Die Übergangskarte `guided-transition-card` soll als sanfter nächster Handlungsschritt lesbarer werden, z. B. durch leicht stärkere Trennung von Titel, Jetzt- und Danach-Aktion.
- Farbliche Gruppierung bleibt ruhig: warmes Grundpanel, kühles Fokusblau für den aktuellen Schritt, mildes Grün für den nächsten Schritt.

Nicht gemeint ist:
- keine Animation
- kein zusätzlicher Text
- kein dritter Status
- keine neue Lernlogik
- keine größere Karte
- keine dekorativen Effekte

## Copy-Boundaries
Die vorhandenen Texte bleiben inhaltlich unverändert.

Erlaubt sind nur kleine Layout-/Gewichts-/Kontrastanpassungen an den bestehenden Texten, zum Beispiel:
- „Mein Leseweg“ als ruhige Überschrift behalten
- „Jetzt lesen: ...“ stärker sichtbar machen
- „Danach: ...“ als freundlichen Ausblick belassen
- „Mein nächster Schritt“ unverändert lassen
- keine neuen Handlungsaufforderungen ergänzen

Verboten sind:
- neue Versprechen oder zusätzliche Schritttexte
- mehr motivierende Floskeln
- Bewertungssprache
- Fortschrittsprozent, Score, Level oder Ranking

## CSS-Boundaries
Die Änderungen dürfen nur innerhalb der bestehenden visuellen Logik bleiben.

Empfohlen ist ein sehr kleiner CSS-Fokus auf:
- stärkere Typografie-Hierarchie innerhalb von `.child-progress-status`
- leicht markiertere `.child-progress-pill.current`
- ruhige Akzentuierung in `.guided-transition-card`
- mobile Umbrüche bleiben erhalten
- Radius bleibt bei 8px für die Übergangskarte und bei bestehenden lokalen Mustern für die übrigen Chips/Flächen

Nicht anfassen:
- neue Content-Packs
- neue Aufgabenlogik
- Lehrkraft-Review-Verhalten
- Speicherung / Cloud / Login / Export
- externe Symbol-/Bildassets
- unruhige Verzierungen wie Blobs, Orbs oder starke Gradients

## Rejected Alternatives
1. Neue Zusatzkarte neben „Mein nächster Schritt“
   - Abgelehnt, weil das den Kinderpfad unnötig verlängert und die ruhige Oberfläche belastet.

2. Größere Illustration oder Symbolgrafik
   - Abgelehnt, weil keine externen/protected Assets verwendet werden sollen und der Pfad eher über Klarheit als über Deko gewinnt.

3. Animationen oder blinkende Hervorhebungen
   - Abgelehnt, weil das die GE-taugliche Ruhe und die Scanbarkeit verschlechtern kann.

4. Inhaltliche Erweiterung um mehr Schritte oder Erklärtext
   - Abgelehnt, weil Alpha 55 ausdrücklich nur die visuelle Attraktivität schärfen soll.

## Exakte Akzeptanzkriterien
Die Alpha-55B-Umsetzung ist erfüllt, wenn:

- der aktuelle Schritt im Kinderpfad schneller erkennbar ist als vor der Änderung
- „Jetzt“ und „Danach“ visuell klar unterscheidbar bleiben
- die Karte „Mein nächster Schritt“ weiterhin klein, ruhig und lesbar wirkt
- keine neuen Texte, Funktionen oder Datenflüsse hinzukommen
- die Oberfläche auf Desktop und Mobile nicht überladen wirkt
- die 8px-Radius-Regel für lokale Kartenoberflächen eingehalten bleibt, wo sie bereits als Pattern vorgesehen ist
- keine Score-/Timer-/Ranking-/Diagnose-/Defizitsprache auftaucht
- Teacher Review unverändert bleibt

## Testplan
Browser-Smoke-Checks für Desktop und Mobile:

1. Desktop-Ansicht prüfen
   - `guided-path-panel` als ruhiger Block sichtbar
   - `child-progress-strip` zeigt sofort den aktuellen Schritt
   - `guided-transition-card` bleibt kompakt und klar
   - keine Überlappung, kein Zeilenbruch-Chaos, keine abgeschnittenen Labels

2. Mobile-Ansicht prüfen
   - Schrittleiste bleibt horizontal nutzbar oder sauber scrollbar
   - „Jetzt“ und „Danach“ bleiben lesbar
   - die Übergangskarte bricht geordnet um
   - keine zu großen Höhen oder leeren Flächen

3. Funktionscheck
   - kein neues Verhalten für Auswahl, Progress oder Review
   - bestehende Bedienung bleibt unverändert

4. Sprachcheck
   - keine neuen problematischen Begriffe
   - keine Bewertung, keine Diagnose, kein Defizitwortlaut

## Sicherheits- und Datenschutznotiz
Es werden keine personenbezogenen Daten benötigt oder eingeführt. Die Empfehlung betrifft ausschließlich Layout, Hierarchie und visuelle Führung im anonymen Kinderpfad.

## Zusammenfassung der Empfehlung
Alpha 55B sollte genau eine kleine Richtung stärken: den aktuellen Lesezustand als ruhigen Fokuspunkt und den nächsten Schritt als freundlichen Ausblick. Das ist die kleinste Änderung mit dem höchsten Gewinn an Attraktivität und Scanbarkeit.
