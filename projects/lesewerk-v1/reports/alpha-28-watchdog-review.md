# Alpha 28 Watchdog Review

## Kurzurteil
Accepted / nicht blockiert. Alpha 28B erfüllt den Kernauftrag: lokaler Teacher-Profile-Builder plus adaptive nächste Empfehlung, ohne personenbezogene Profile, ohne Backend und ohne geschützte Assets.

## Qualitätscheck

### Fachliche Plausibilität
Stark: Die Auswahl setzt an beobachtbaren Unterrichtsgrößen an: bekannte Grapheme, bekannte Silben, Hilfen und Zugangsschwerpunkt. Die Empfehlung bleibt klein und handlungsnah.

Grenze: Die Logik ist regelbasiert und materialgebunden. Sie darf nicht als diagnostische Aussage gelesen werden.

### Datenschutz
Bestanden:
- keine Namen
- keine Klassenlisten
- keine persistenten Lernprofile
- keine Cloud-/Login-/Export-Funktion
- keine freie Personentexteingabe im neuen Builder

### GE-Tauglichkeit
Stark:
- ruhige Chips statt Formularlast
- nächster kleiner Schritt statt Stufen-/Bewertungssprache
- Hilfen bleiben positiv als Unterstützungsplan sichtbar
- Kinderpfad bleibt ungestört

### UI / Bedienbarkeit
Stark:
- kompakte Sektion im Lehrkraftbereich
- sofortige Vorschau über `aria-live`
- Touch-taugliche Chips

Noch zu prüfen im echten Browser:
- visuelle Höhe der Chip-Flächen auf schmalem Tablet
- ob die Builder-Fläche im Lehrkraftbereich gut positioniert ist oder weiter nach oben sollte

### Tests / Build
- `npm test`: 115/115 bestanden
- `npm run build`: bestanden
- fokussierter Scan: keine geschützten Asset-/Risk-Hits in den relevanten Quellfiles

## Risiken
1. Begriff `profileBuilderOptions` / `safetyNote` ist intern technisch; in der UI wird es nicht als Score oder Diagnose dargestellt.
2. Sehr breite Profile können mehrere Karten erhalten; die UI zeigt trotzdem nur eine kompakte Vorschau und verändert den Kinderpfad nicht automatisch.
3. Die Empfehlung ist aktuell regelbasiert. Das ist für Alpha richtig, sollte aber später durch echte Unterrichtserprobung validiert werden.

## Empfehlung
Alpha 28B kann als akzeptierte lokale Planungsfunktion gelten. Nächster sinnvoller Schritt wäre kein weiterer Logikausbau, sondern ein kurzer Browser-/Tablet-Test: Lehrkraftbereich öffnen, M+A auf M+A+S+O+F erweitern und prüfen, ob sich die Vorschau verständlich und ruhig aktualisiert.
