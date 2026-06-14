# Alpha 41C – Watchdog Review

## Ampel: Green

## Was verbessert wurde
- Der Kinderpfad zeigt jetzt eine kompakte, dauerhaft sichtbare Orientierungslinie mit „Mein Leseweg“ und „Jetzt lesen: …“.
- Die Progression Bild → Silbe → Wort → Satz → Mini-Geschichte → Schreibbrücke ist an einer Stelle zusammengezogen, statt nur verteilt mitzuschwingen.
- Die Lösung bleibt ruhig und textarm genug, um den Start nicht deutlich aufzublähen.

## Was noch schwach ist
- Die neue Leiste ist visuell hilfreich, aber noch stark textbasiert; für manche Kinder wäre eine noch klarere, symbolische Verdichtung später denkbar.
- Auf sehr schmalen Geräten ist horizontaler Scroll eine pragmatische Lösung, aber nicht die eleganteste Endprüfung.
- Die Leiste verbessert Orientierung, ersetzt aber keine pädagogische Begleitung und keine verbale Strukturierung durch die Lehrkraft.

## Sicherheitscheck
- Keine realen Lernendendaten.
- Keine Diagnose-, Score-, Timer- oder Rankinglogik.
- Keine Cloud-, Login-, Export- oder Upload-Funktion.
- Keine geschützten externen Assets.
- Kein automatisches Mutieren des Kinderpfads aus der Lehrkraftvorschau.

## Empfehlung für Alpha 42
Alpha 42 sollte vor allem auf UI-Polish gehen, nicht auf neue Inhalte.

Begründung:
- Die inhaltliche Orientierung ist jetzt sichtbar genug, um sinnvoll zu wirken.
- Der größte nächste Hebel liegt in ruhigerer Darstellung, besserer Verdichtung und ggf. noch klarerer Tablet-/Mobile-Anmutung.
- Die diagnostische Schärfe ist bereits solide genug und sollte nicht die Oberfläche wieder voller machen.

## Nächster kleinster sicherer Schritt
- Die neue Leiste auf echte Tablet-/Handy-Anmutung nachziehen: visuelle Balance prüfen, ggf. Abstände und Scrollverhalten feinjustieren, ohne neue Inhalte oder neue Auswahlpfade einzubauen.

## Verifikation
- `npm test` → bestanden, 142/142.
- `npm run build` → bestanden.
- Browser-Smoke auf `http://127.0.0.1:4173/` → App lädt, Kinderpfad und neue Fortschrittsleiste sichtbar, keine JS-Fehler im Sichtcheck.
- Preview-Server wurde danach gestoppt.
