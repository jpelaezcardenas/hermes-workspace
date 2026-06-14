# Alpha 44A – Doppelte Einstiegssprache auditieren

## Kurzbefund
Im Kinderpfad stehen aktuell zwei Einstiegssignale direkt übereinander:
1. die lange Einführungszeile vor dem Kinderpfad
2. die kurze, klare Handlungszeile im Tagespfad

Für den GE-Kontext ist das zu viel doppelte Orientierung. Die kurze Zeile ist bereits passend, die längere Vorab-Erklärung wirkt im Kinderblick eher wie eine zweite Einstiegsebene.

## Beobachtung im Code
In `src/App.tsx` steht oberhalb von `<section className="learning-layout child-path-shell">` aktuell:

- `Bild anschauen, Silbe klatschen, Wort lesen, Satz lesen, Mini-Geschichte, Schreibbrücke. Der Tagespfad startet unten.`

Direkt darunter folgt im sichtbaren Kinderpfad bereits:

- `Schau. Klatsch. Lies.`
- `Tagespfad starten`
- der Tagespfad-/Hilfen-Block

Damit entsteht für Kinder eine doppelte Einstiegssprache: einmal erklärend, einmal handlungsnah.

## Einordnung
- Die kurze Kinderzeile ist klar, ruhig und alltagstauglich.
- Die lange Einführungszeile ist inhaltlich nicht falsch, aber für den Kinderblick zu textreich.
- Der Kinderpfad braucht an dieser Stelle nicht mehr Erklärung, sondern mehr Reduktion.

## Empfehlung für Alpha 44B
Die lange Einführungszeile sollte aus der kindlichen Sicht entfernt oder aus dem Kinderpfad heraus verlagert werden; im Kinderblick soll nur die kurze Zeile `Schau. Klatsch. Lies.` als Einstieg stehen.