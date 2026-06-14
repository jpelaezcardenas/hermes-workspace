# Lese-Anker-System v1 - Implementation Report

Datum: 2026-05-26

## Ergebnis

Das Lese-Anker-System v1 wurde als kleiner, kontrollierter Slice in die Schulwerkstatt eingebaut. Es verbindet Schulwerkstatt und LeseWerk über zehn konkrete Kernwörter, ohne die Apps zu verschmelzen.

Die neue Sektion heißt `Lese-Anker v1` und liegt in der Schulwerkstatt als lehrkraftseitiger Planungsbereich.

## Geänderte Datei

- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`

LeseWerk selbst wurde nicht verändert.

## Kernwörter

Die zehn Lese-Anker sind:

- Mama
- Tasse
- Ball
- Bus
- Buch
- Heft
- Sofa
- Schule
- Apfel
- Wasser

## Didaktische Struktur pro Anker

Jede Karte folgt derselben Brücke:

1. realer Gegenstand oder Bild
2. lokale Symbolhilfe
3. Silbe mit blau/rot-Struktur
4. Wortkarte
5. kurzer Satz oder Mini-Geschichte
6. Gebärden-/Handzeichenhinweis
7. passende Schulwerkstatt-Aufgabe
8. Beobachtungsfrage und Absenkung bei Überforderung

Damit entsteht eine saubere Progression:

`Gegenstand/Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Aufgabe`

## Warum das sinnvoll ist

Die Schulwerkstatt wird dadurch mehr als eine Aufgabenliste. Sie bekommt einen ersten echten Lernpfad-Baustein: Lehrkräfte sehen nicht nur „welche Aufgabe“, sondern auch, wie ein Wort von der realen Handlung bis zur Leseaufgabe aufgebaut werden kann.

Gleichzeitig bleibt der Kindmodus geschützt:

- keine Scores
- keine Diagnosezahlen
- keine personenbezogene Speicherung
- keine externe Bildquelle
- keine automatische Förderentscheidung

## Verifikation

Statische Prüfung:

- Aufgaben gesamt: 48
- Lesen: 12
- Mengen: 12
- Kommunikation/UK: 12
- Wahrnehmung/Alltag: 12
- `Sofort nutzbar`-Kurationen: 10
- Lese-Anker-Karten: 10

Mobile Browser-Smoke mit Chrome, 390px:

- Lese-Anker-Karten sichtbar: 10
- erste Karte: Mama
- Aufgabenbank-Karten: 48
- S-Tier-Badges: 10
- LeseWerk-Brücken: 11
- horizontales Overflow: nein
- `scrollWidth`: 390
- `clientWidth`: 390

## Grenzen

- Es gibt noch keine echte Synchronisierung mit LeseWerk-Inhalten.
- Die Anker öffnen LeseWerk nur lokal, wählen dort aber noch keine passende Mini-Reise automatisch aus.
- Die Wortlisten sind kuratiert, aber noch nicht als separates Datenmodell ausgelagert.
- LeseWerk wurde nicht erweitert, um diese Anker als eigene Startpfade zu lesen.

## Nächste Empfehlung

Der nächste hochwertige Schritt wäre `Lese-Anker v2`:

1. dieselben zehn Wörter als eigene Datenstruktur auslagern;
2. in LeseWerk prüfen, welche Wörter schon Aufgaben oder Story-Pfade besitzen;
3. Lücken schließen, aber nur für drei Wörter zuerst: `Mama`, `Tasse`, `Ball`;
4. daraus eine erste echte Mini-Reise bauen:
   - Gegenstand
   - Bild/Symbol
   - Silbe
   - Wort
   - Satz
   - Mini-Geschichte
   - Lehrkraftbeobachtung

Das sollte wieder als kleiner Slice passieren, damit die Übersichtlichkeit erhalten bleibt.
