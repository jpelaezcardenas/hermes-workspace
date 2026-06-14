# Alpha 43C – Watchdog Content Supports Review

## Ampel
Gelb.

## Kurzfazit
Alpha 43B verbessert die Kinderseite spürbar: Die Einstiegssprache ist kürzer, die Hilfeformulierung entlastender und die Schreibbrücke weniger erklärlastig. Für GE-Lernende ist das ein echter Gewinn, aber die Seite trägt noch eine doppelte Einstiegsschicht: Die kurze Kinderzeile ist gut, die längere Einführungszeile darüber wirkt weiterhin zu textreich.

## Was verbessert wurde
- Der Kinderpfad startet jetzt mit einer sehr kurzen Handlungszeile: „Schau. Klatsch. Lies.“
- Die Hilfe ist kindnaher und weniger belehrend: „Nimm Hilfe, wenn du magst.“
- Die Schreibbrücke wird als kleine optionale Handlung angekündigt, nicht als zusätzlicher Lernblock.
- Die Umsetzung bleibt bewusst klein: keine neuen Inhalte, keine neuen Assets, keine Speicher- oder Bewertungsfunktionen.

## Was noch schwach ist
- Oben auf der Seite bleibt die längere Einführungszeile mit der ganzen Schrittfolge stehen.
- Dadurch gibt es noch zwei Ebenen von Einstiegssprache: eine kurze Kinderzeile und eine längere erklärende Zeile.
- Die Schreibbrücke ist sprachlich schon besser, könnte aber langfristig noch weiter verdichtet werden, wenn sie im Kindermodus noch präsenter werden soll.

## Verifikation
- `npm test` bestanden: 144/144.
- `npm run build` bestanden.
- Desktop-Browser-Smoke auf lokalem Dist-Server geprüft: Seite lädt stabil, die neuen kurzen Texte sind sichtbar, kein horizontaler Overflow, keine JS-Fehler.
- Mobile-Smoke war mit den verfügbaren Browser-Werkzeugen nicht sauber umstellbar; deshalb nur eingeschränkt verifiziert.
- Preview-Server wurde nach dem Smoke beendet.

## Safety-Check
- Keine Schülerdaten, keine Namen, keine Diagnosen.
- Keine Scores, Timer, Rankings oder automatischen Bewertungen.
- Keine Cloud-, Login-, Export- oder Upload-Funktionen ergänzt.
- Keine externen oder geschützten Assets neu eingeführt.
- Keine automatische Übertragung von Lehrkraft-Vorschau in den Kinderpfad.

## Bewertung für Alpha 44
Alpha 44 sollte aus meiner Sicht primär auf Accessibility/Supports gehen, nicht auf mehr Inhalt oder diagnostische Schärfe.

Begründung:
- Inhaltlich ist die Richtung schon gut.
- Der nächste Gewinn liegt eher in der weiteren sprachlichen und visuellen Entlastung.
- Die Seite braucht weniger Erklärung, nicht mehr Material.

## Nächster kleinster sicherer Schritt
Die längere Einführungszeile oberhalb des Kinderpfads prüfen und entweder kürzen oder ganz in einen nicht-kindlichen Kontext verschieben, damit die Kinderansicht nur noch eine klare kurze Orientierung zeigt.
