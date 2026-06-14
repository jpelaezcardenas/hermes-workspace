# Alpha 20 - Tablet-Praxischeck der Mama-Schrittkarte

Datum: 2026-05-18
Status: Slice A abgeschlossen

## Ziel

Geprüft wurde die bestehende interaktive `Schrittkarte Mama` aus Alpha 19 aus Sicht einer 390px-breiten Tablet-/Phone-Klassensituation in der Förderschule GE. Es wurden keine realen Schülerdaten, keine Diagnosen und keine externen Assets genutzt.

## 1. Start und Auffindbarkeit

Der Einstieg `Lesepfad starten` ist gut sichtbar und sprachlich ruhig. Nach dem Öffnen des Kinderpfads liegt die Mama-Schrittkarte im rechten/unteren Lesebereich, aber sie steht nach der allgemeinen Übersicht `Wort zu Satz zu Geschichte`.

Bewertung: grundsätzlich auffindbar, aber auf schmaler Breite ist die konkrete aktuelle Handlung nicht der erste Blickfang. Für ein Kind im GE-Kontext ist die Übersicht hilfreich für die Lehrkraft, konkurriert aber vor der eigentlichen Schrittkarte mit dem aktuellen Handlungsauftrag.

## 2. Textgröße und Leselast

Die großen Wörter (`Mama`, Satz, Mini-Geschichte) sind ausreichend groß. Die Schrittüberschrift ist klar. Die Leselast ist insgesamt niedrig, weil immer nur ein aktiver Schritt als Hauptinhalt gerendert wird.

Risiko: Die Seite insgesamt enthält weiterhin viele weitere Bereiche unterhalb/oberhalb der Schrittkarte. Die Schrittkarte selbst bleibt aber ruhig.

## 3. Touch-Ziele

`Weiter` und `Nochmal ruhig` nutzen mindestens ca. 64px Höhe und sind bei 390px als untereinanderliegende Vollbreiten-Aktionen gut antippbar. Das ist tablet-/fingerfreundlich.

## 4. Position auf der Seite

Die Schrittkarte ist nicht zu klein, aber sie sitzt nach der Lesepfad-Übersicht. Auf 390px kann dadurch erst eine erklärende Übersicht erscheinen, bevor die eigentliche aktuelle Karte kommt. Das schwächt die Kindorientierung leicht.

## 5. Dominanz des aktuellen Schritts

Innerhalb der Karte ist immer genau ein aktueller Schritt dominant. Außerhalb der Karte stehen aber direkt davor alle sechs Pfadschritte als Überblick. Für Lehrkraftsteuerung ist das hilfreich; für das Kind kann es als konkurrierende Information wirken.

## 6. Trennung von `Ma` und `ma`

`Ma` und `ma` sind visuell gut getrennt: zwei Silben, unterschiedliche Farben, Abstand und separate Silben-Elemente. Bei 390px bleibt die Trennung erhalten.

## 7. Pause/Fertig-Moment

Der Pauseninhalt `Fertig. Jetzt ist Pause.` ist ruhig und eindeutig. `Weiter` ist im Pausenschritt deaktiviert, `Nochmal ruhig` bleibt verfügbar. Das ist fachlich passend.

Kleines Restrisiko: Der Pausenmoment könnte später noch stärker visuell abgesetzt werden, aber das wäre ein zweiter Designschritt. Für Alpha 20 ist der dringendere Punkt die Auffindbarkeit der aktuellen Karte.

## Empfohlener kleinster Fix

Genau eine kleine Änderung: Im Kinder-Lesebereich die `Schrittkarte Mama` vor die allgemeine `Leseweg`-Übersicht setzen. Dadurch sieht das Kind zuerst die aktuelle Handlung und erst danach die Orientierungskarte. Das ändert keine Inhalte, keine Wörter, keine Datenlogik und kein Produktmodell.

Entscheidung: kleiner UI-Fix gerechtfertigt.
