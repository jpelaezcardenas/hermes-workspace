# Alpha 38C - Watchdog Beispielmaterialien und Alpha-39 Fokus

## Kurzfazit
Alpha 38C ist fachlich grün. Die Beispielmaterialien wirken ruhig, kindnah und GE-passend, der Kinderpfad bleibt unbelastet, und es sind keine riskanten Funktionen oder Datenpfade hinzugekommen.

## Ampel
- Lehrkraftbereich / Beispielmaterialien: Grün
- Kinderpfad-Ruhe: Grün
- Datenschutz / Safety: Grün
- Alpha-39 Anschlussfähigkeit: Grün

## Bewertung
Die vier Beispielmaterialkarten geben nur eine kleine, klare Materialspur pro Serie vor. Sie helfen im Lehrkraftbereich bei Orientierung, ohne die Lernenden mit Materialfülle, Bewertungssprache oder zusätzlichen Bedienwegen zu belasten.

Im Kinderpfad bleibt die Oberfläche ruhig. Es sind keine Hinweise auf geschützte Bildassets, echte Schülerdaten, Diagnose-, Score-, Timer-, Ranking-, Cloud-, Login- oder Export-Funktionen sichtbar.

## Verifikation
- `npm test` → bestanden, 139/139 Tests
- `npm run build` → bestanden
- Desktop-Smoke → geprüft über aktuelle Verified-Screenshot-Ansicht; 4 Beispielkarten sichtbar, ruhige Anordnung, keine offensichtliche horizontale Überbreite
- Mobile-Smoke → geprüft über aktuelle Verified-Screenshot-Ansicht; schmaler Viewport bleibt ruhig, keine sichtbare horizontale Überbreite, Kinderpfad bleibt getrennt

## Beobachtungen
- Die Beispielkarten sind konkret genug, um fachlich zu helfen, aber nicht so ausführlich, dass sie den Lehrkraftbereich überladen.
- Die Materialspur bleibt text- und symbolnah; das passt zum GE-Kontext und vermeidet unnötige Komplexität.
- Der Kinderpfad bleibt optisch und funktional klar getrennt.

## Risiken / Hinweise
- Die Materialien sind weiterhin bewusst einfache lokale Platzhalter und noch keine final geprüften Symbolmaterialien.
- Die mobile Sichtprüfung zeigt vor allem den oberen Bereich; dort wirkt das Layout ruhig und unkritisch.

## Alpha-39 Empfehlung
Alpha 39 sollte nicht mehr an der Grundsicherheit drehen, sondern die Materialqualität verfeinern: einzelne Beispielmaterialien sprachlich und visuell noch etwas präziser machen, ohne mehr Strukturkomplexität einzuführen.

Sinnvoll für Alpha 39:
1. Beispieltexte weiter glätten, damit sie noch ruhiger und eindeutiger wirken.
2. Prüfen, ob die Materialspur auf dem Tablet noch kompakter lesbar wird.
3. Weiterhin strikt getrennt halten: Serie vormerken ja, Tagesweg aktivieren nur an der vorgesehenen Stelle.

## Mini-Fix nur falls später nötig
Falls Alpha 39 noch etwas nachschärfen soll, dann am ehesten die Materialkarten auf wenige Worte kürzen und die Hilfezeile pro Karte vereinheitlichen.
