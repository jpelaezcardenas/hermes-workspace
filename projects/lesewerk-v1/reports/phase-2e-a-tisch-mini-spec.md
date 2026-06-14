# Phase 2E-A - Tisch Mini-Spec

## Entscheidung

`Tisch` ist der beste naechste Code-Slice vor `Brot`, `Keks` und `Heft`.

Warum:
- sehr alltags- und schulnah
- im Klassenraum direkt zeigbar und leicht in Handlungen einbettbar
- passt sauber zur vorhandenen Objektfamilie um Sofa/Tasse/Teller
- erlaubt eine klare, kurze Satzspur
- ist didaktisch noch ruhig genug, aber schon leicht anspruchsvoller als die allerfruehesten Objekte

Warum nicht zuerst die anderen:
- `Brot`: ebenfalls stark, aber eher Essensfamilie; kann als naechster Ausbau nach Tisch sinnvoll bleiben
- `Keks`: gut und kurz, aber semantisch kleiner und weniger raumbezogen
- `Heft`: schulisch sehr brauchbar, aber als Objekt etwas abstrakter und stärker an Unterrichtslogik gebunden

## Gating

`Tisch` wird nur freigeschaltet, wenn diese Bedingungen erfuellt sind:

1. Die Objektfamilie ist im Lehrkraftbereich sichtbar profile-gated.
2. Keine externen Bilder oder geschuetzten Bildquellen werden verwendet.
3. Kindmodus bleibt ohne Punkte, Timer, Ranking, Diagnose oder 1-10-Logik.
4. Es gibt eine klare lokale Symbolidee fuer den Tisch.
5. Der `ch`-Anteil wird als didaktisches Risiko sichtbar gemacht und nicht unsichtbar geglaettet.
6. Die Mini-Reise bleibt klein: Bild, Silbe/Wort, Wortwahl, Satz, Mini-Geschichte.
7. Bestehende Struktur bleibt unangetastet; kein grosser Refactor im selben Slice.

## Zielbild der Mini-Reise

Die Tisch-Reise soll sich wie eine ruhige, eigenstaendige kleine Lesehandlung anfuehlen:
- klar
- bildhaft
- kurz
- wiederholbar
- mit sanfter Steigerung von Erkennen zu Satzverstehen

## Satzidee

Hauptsatz:
- `Der Tisch ist da.`

Optional fuer spaetere Wiederholung:
- `Der Tisch steht hier.`

Begruendung:
- kurz und stabil
- alltagstauglich
- leicht mit Zeigen oder Auswahl kombinierbar
- genug Struktur, ohne sprachlich zu ueberladen

## Mini-Geschichte

Vorschlag:
- `Der Tisch ist da. Was passt?`

Mini-Story-Logik:
- Der Tisch erscheint als bekanntes Objekt.
- Danach wird aus zwei oder drei klaren Auswahloptionen passend zugeordnet.
- Die Geschichte bleibt handlungsnah und vermeidet Textueberladung.

## Distraktor

Empfohlener Distraktor fuer die erste Tisch-Reise:
- `Brot` oder `Keks`, je nach angestrebtem Fokus

Empfehlung:
- fuer den ersten Tisch-Slice eher `Keks` als Distraktor, weil er kurz, bildbar und gut unterscheidbar ist
- `Brot` kann spaeter als eigener Essens-Slice folgen und sollte nicht zu frueh die Tisch-Reise semantisch verwischen

Didaktische Logik:
- Tisch = Raum / Schule / Moebel
- Keks = Essen / kleinteilig / abgrenzbar
- so bleibt die Auswahl fuer Lernende moeglich, ohne dass die Kategorien zu nah beieinander liegen

## Lokale Symbolidee

Symbolidee ohne externe Assets:
- einfacher lokaler CSS-Tisch: Tischplatte als Rechteck, zwei oder vier Beine als Linien oder kleine Balken
- reduzierte, klare Silhouette
- keine Deko, keine Realfoto-Abhaengigkeit
- im Kindmodus gross, ruhig und mit wenig Ablenkung

Anforderung an das Symbol:
- sofort als Tisch erkennbar
- nicht mit Stuhl, Regal oder Bank verwechselbar
- im Lehrkraftbereich sauber dokumentiert

## Risiko: ch

Didaktisches Risiko bei `Tisch`:
- `ch` ist laut- und schriftbildlich anspruchsvoller als bei sehr einfachen CVC-Woertern
- die Endung kann fuer fruehe Lernende unsauber mitgesprochen oder ueberlesen werden
- bei zu starker Vereinfachung geht der reale Wortcharakter verloren

Konsequenz:
- `ch` muss sichtbar bleiben
- keine heimliche Ersetzung durch einen “einfacheren” Kunstaufbau
- die UI darf stützen, aber nicht das Wort verfälschen

## Testidee

Minimal zu pruefen:
1. Erscheint `Tisch` nur im vorgesehenen Lehrkraft-/Profilkontext?
2. Wird die Reise in der richtigen Reihenfolge angeboten?
3. Ist das lokale Symbol eindeutig als Tisch lesbar?
4. Funktioniert die Satzspur `Der Tisch ist da.` ohne visuelle Ueberladung?
5. Ist die Mini-Geschichte kurz genug fuer GE-Kindmodus?
6. Bleiben alle Kindmodus-Flächen frei von Score-/Timer-/Diagnostiklogik?
7. Ist der Distraktor klar unterscheidbar?

## Ergebnis in einem Satz

`Tisch` ist der beste naechste Slice, weil es ein starkes, realitaetsnahes Klassenraumwort ist, das die Objektfamilie stabil erweitert und zugleich noch klar genug fuer eine kleine, ruhige Mini-Reise bleibt.

## Naechster Schritt

Wenn dieses Mini-Spec akzeptiert ist, sollte Phase 2E-B den Tisch-Slice exakt in dieser Reihenfolge umsetzen:
1. lokale Symbolidee
2. Satzspur
3. Mini-Geschichte
4. Distraktor
5. Tests
