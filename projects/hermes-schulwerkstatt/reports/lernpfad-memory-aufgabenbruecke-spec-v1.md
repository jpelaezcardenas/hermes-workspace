# Lernpfad-Memory Aufgabenbruecke v1 - Spezifikation

## Ziel
Das Lernpfad-Memory soll von einer reinen anonymen Lernnotiz zu einer Aufgabenbruecke werden. Aus Lernbereich, sicheren Ankern, Unterstuetzungsform und naechstem Schritt sollen lokal und deterministisch drei passende Mini-Aufgaben vorgeschlagen werden.

Die Funktion bleibt lehrkraftseitig, anonym, lokal und ohne automatische Speicherung.

## Lehrer-Workflow
1. Die Lehrkraft waehlt ein anonymes Profil.
2. Die Lehrkraft waehlt den Lernbereich.
3. Die Lehrkraft traegt bekannte Buchstaben, Silben, Woerter oder sichere Gegenstandsanker ein.
4. Die Lehrkraft waehlt eine oder mehrere Unterstuetzungsformen: `Hand dabei`, `kurz gezeigt`, `alleine versucht`.
5. Die App zeigt direkt drei passende Mini-Aufgaben.
6. Jede Empfehlung erklaert kurz, warum sie passt.
7. Die Lehrkraft kann zur Aufgabenbank, zur Lese-Inhaltsbibliothek oder zu Druckkarten springen.
8. Beim Export wird eine kurze Zusammenfassung der naechsten Mini-Aufgaben ergaenzt.

## Matching-Logik
Die App nutzt keine KI und keine Netzwerkaufrufe. Alle Empfehlungen entstehen aus lokalen Daten in `index.html`.

### Bereichs-Mapping
- `Lesen` -> `lesen`
- `Mengen` -> `mengen`
- `Kommunikation` -> `kommunikation`
- `Alltag / Wahrnehmung` oder `Alltag/Wahrnehmung` -> `wahrnehmung`

### Unterstuetzungs-Mapping
- `Hand dabei` -> bevorzugt `basal`, danach `konkret`
- `kurz gezeigt` -> bevorzugt `konkret`, danach `unterstuetzt`
- `alleine versucht` -> bevorzugt `unterstuetzt`, danach `symbolisch`

Wenn mehrere Chips aktiv sind, duerfen alle passenden Level beruecksichtigt werden. Wenn kein Chip aktiv ist, soll das System eine ruhige Bereichs-Empfehlung ausgeben.

### Anker-Matching
Die Eingabe bei `memoryAnchors` wird normalisiert:
- lowercase
- Umlaute erhalten, aber Vergleich robust halten
- Satzzeichen als Trenner behandeln
- einzelne Buchstaben und ganze Worte erkennen

Bei Bereich `Lesen`:
- Wenn bekannte Buchstaben eingegeben werden, sollen Lese-Woerter bevorzugt werden, die diese Buchstaben enthalten oder aus ihnen gut aufgebaut werden koennen.
- Beispiel: `M, A` -> `Mama` oder eine Aufgabe mit `Ma`.
- Beispiel: `S, O` -> `Sonne` oder eine Aufgabe mit `So`.
- Wenn ein sicherer Anker wie `Haus` eingegeben wird, soll eine Bild-Wort-Satz-Leiter vorgeschlagen werden.

Bei anderen Bereichen:
- Anker duerfen im Warum-Text aufgegriffen werden.
- Falls eine Aufgabe Titel, Material oder Beobachtung mit dem Anker beruehrt, steigt ihre Prioritaet.

### Ranking ohne Zufall
Keine zufaellige Auswahl. Bei Gleichstand bleibt die Reihenfolge stabil.

Empfohlene Punktelogik nur intern, nicht sichtbar:
- +4 Bereich passt
- +3 Level passt exakt
- +2 Level passt angrenzend
- +2 Anker passt in Titel, Material, Beobachtung oder Wort
- +1 naechster Schritt enthaelt ein relevantes Stichwort

Die drei hoechsten passenden Empfehlungen werden angezeigt. Wenn weniger als drei direkte Treffer existieren, mit sicheren Bereichs-Fallbacks auffuellen.

## UI
Direkt in `#lernpfad-memory`, am besten in oder unter der Vorschaukarte:

Titel: `Passende Impulse fuer die naechste Woche`

Leerer Zustand:
`Waehle Bereich und Unterstuetzung fuer passende Vorschlaege.`

Empfehlungskarte:
- Titel
- `Warum das passt: ...`
- `Material / Support: ...`
- Button: `Zur Aufgabenbank`
- optional bei Lesen: `Zur Lese-Bibliothek`

Die Karten sind lehrkraftseitig. Sie duerfen im Kindmodus nicht sichtbar sein.

## Export
Der Exporttext des Lernpfad-Memory erhaelt am Ende:

`Naechste Mini-Aufgaben:`
- Aufgabe 1
- Aufgabe 2
- Aufgabe 3

Nur Titel und kurze Begruendung, keine personenbezogenen Daten.

## Akzeptanzkriterien
- Bei `Lesen` und Anker `M, A` erscheint eine passende Leseempfehlung wie `Mama`, `Ma` oder eine vorhandene passende Leseaufgabe.
- Bei `Mengen` und `Hand dabei` erscheint eine basale oder konkrete Mengenaufgabe unter den Top 3.
- Bei leeren Ankern erscheinen trotzdem drei ruhige Bereichsempfehlungen.
- Empfehlungen aktualisieren sich live beim Aendern der Memory-Felder.
- Keine Speicherung in `localStorage`, `sessionStorage` oder Cookies.
- Kein Scoring, keine Ranking-Worte, keine Diagnosen, keine Timer, keine Punkte im UI.
- Mobile 390px ohne horizontalen Overflow.

## Red Flags
- Keine KI-Aufrufe im Browser.
- Keine externen Assets.
- Keine Namen oder personenbezogenen Felder.
- Keine zufaelligen Empfehlungen, weil Lehrkraefte reproduzierbare Ergebnisse brauchen.
- Keine Ueberladung: maximal drei Empfehlungen sichtbar.
