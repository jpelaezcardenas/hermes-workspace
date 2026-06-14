# LeseWerk Mega Expansion Phase 2 - CEO Goal

## Oberziel

LeseWerk soll von einzelnen gelungenen Mini-Reisen zu einem echten, kindgerechten GE-Lese-System wachsen: klar gefuehrt, bildhaft, ruhig, schoen, diagnostisch vorsichtig, mit wachsendem Wortschatz und einer stabilen Bauweise, die weitere Inhalte ohne Chaos erlaubt.

## Produktbild

Ein Kind soll nicht fragen muessen, wohin es klicken soll. Es sieht einen grossen, freundlichen Lernort, eine klare Auswahl, einen sichtbaren Weg von Bild zu Silbe zu Wort zu Satz zu Mini-Geschichte und bekommt nie Druck durch Zeit, Punkte, Noten oder Diagnosen. Die Lehrkraft sieht dagegen, welche Wortfamilien vorbereitet sind, welche Einheiten das Kind schon sicher verwenden kann und welcher naechste kleine Schritt sinnvoll ist.

## Phase 2 Reihenfolge

1. Mobile- und Kind-Orientierungspruefung: pruefen, ob der Start, die Mini-Reise-Auswahl und die 3er-Wahl auf 390px Breite ruhig, eindeutig und nicht zu voll wirken. Ergebnis: Reviewbericht mit konkreten, kleinen Reparaturvorschlaegen. Keine Codeaenderung.
2. Architektur-Stabilisierung: die wiederholte Mini-Reise-Definition fuer Mama, Sofa, Tasse, Ball, Bus, Buch und Lama so analysieren, dass eine kleine zentrale Struktur vorgeschlagen wird. Ergebnis: Refactor-Plan mit minimalem Risiko. Keine Codeaenderung.
3. Apfel-Slice: erst nach 1 und 2 ein neues Wortfeld "Apfel" als Nahrung/Alltag ergaenzen. Es muss Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte enthalten, profile-gated sein und lokale CSS-Symbole nutzen. Keine externen Bilder, keine METACOM-Platzhalter, keine ungesicherten Assets.
4. Wortschatz-Bibliothek S-Tier: danach ein kuratiertes Erweiterungspaket planen, aber noch nicht massenhaft einbauen. Fokus: GE-Schuelerwortschatz, Alltag, Schule, Koerper, Essen, Bewegung, Dinge im Klassenraum. Jedes Wort braucht bekannte Buchstaben/Grapheme, Silbenstruktur, Satzfaehigkeit, Symbolbedarf, GE-Eignung und didaktisches Risiko.

## Harte Qualitaetskriterien

- Kindmodus: ein dominanter naechster Schritt, kein Dashboard-Gefuehl, keine 1-10-Scores, keine Timer, keine Ranglisten.
- Lehrkraftmodus: klare Vorbereitung, aber nicht ueberladen.
- Diagnose: nur vorsichtige Hinweise und Beobachtungen, keine medizinisch/psychologisch wirkenden Feststellungen.
- Lesedidaktik: Buchstabenkenntnis, Silben, einfache Woerter, Satzverstehen und Mini-Geschichten getrennt betrachten.
- Design: gross, ruhig, spielerisch, hochwertig, mit lokaler Illustration statt Textwaende.
- Technik: Tests zuerst erweitern, Build pruefen, kleine Slices, bei Blockade sofort Bericht schreiben statt Endlosschleife.

## Stop-Regeln

Wenn ein Task ins Tool-/Iterationslimit laeuft: nicht denselben grossen Prompt wiederholen. Stattdessen aktuellen Stand dokumentieren, offene Punkte benennen und den naechsten Task kleiner schneiden.

Wenn ein neuer Inhalt didaktisch unsicher ist: nicht unsichtbar vereinfachen, sondern im Lehrkraftbereich als vorsichtig/Review markieren.

Wenn visuelle Pruefung nicht eindeutig ist: Bericht schreiben, keine Behauptung "fertig".
