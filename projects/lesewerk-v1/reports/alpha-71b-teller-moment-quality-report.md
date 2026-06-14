# Alpha 71B - Teller-Moment Quality

Datum: 2026-05-21
Status: umgesetzt, lokal geprueft

## Ziel

Den vorhandenen Objektfamilien-Slice konservativ veredeln: kindklarere Orientierung, klarere Teller/Tasse/Tisch-Szene, spezifischer Abschluss fuer den Teller-Mini-Moment. Keine neue Wortfamilie, keine neue Diagnostik und keine Speicherung.

## Umgesetzter Slice

- Der Teller-Mini-Moment fuehrt jetzt mit einer expliziten Orientierung: "Schau: Der Teller steht auf dem Tisch. Die Tasse steht daneben."
- Die Szene trennt Sofa, Tisch, Tasse und Teller ruhiger voneinander; Teller und Tasse sind visuell staerker ausgeformt.
- Die Lernebenen werden zusaetzlich als ruhige Uebersicht gezeigt: Bild -> Silbe -> Wort -> Satz.
- Der Abschluss ist nicht mehr generisch als Mini-Reise formuliert, sondern spezifisch fuer den Teller-Moment: "Der Teller-Moment ist fertig." / "Nochmal Teller".

## Didaktische Entscheidung

Die Veraenderung bleibt beim bestehenden Ein-Moment-Workflow. Sie erweitert nicht die Materialmenge, sondern macht die vorhandene Situation fuer Kinder eindeutiger:

- Erst Orientierung an der Tischszene.
- Dann getrennte Repraesentation von Bild, Silbe, Wort und Satz.
- Danach der bekannte Schrittpfad bis zur Mini-Geschichte.
- Abschluss druckfrei und ohne Score, Timer, Ranking oder Fehlerzustand.

## GE-/Datenschutz-Check

- Keine realen Kindernamen, Diagnosen, Noten, Rankings oder sensiblen Daten.
- Keine Speicherung, Cloud-Anbindung, Logins oder Exporte.
- Kindansicht bleibt ruhig: kein Timer, keine rote Fehlerlogik, keine Punkte.
- Lehrkraftinformation bleibt randstaendig; der Kind-Fokus liegt auf der konkreten Tischszene.

## Testpilot-Kurzcheck

### Basal
- Staerker: Die erste Frage "Was liegt auf dem Tisch?" und die visuelle Szene geben einen klareren Wahrnehmungsanker.
- Risiko: Die symbolische Pseudo-CSS-Szene bleibt ein Platzhalter und ersetzt kein validiertes Symbolmaterial.

### Unterstuetzt
- Staerker: Bild/Silbe/Wort/Satz sind gleichzeitig sichtbar und klar getrennt.
- Risiko: Bei sehr kleinen Displays muss weiter beobachtet werden, ob die Layer-Karten noch genug Ruhe behalten.

### Symbolisch / erweitert
- Staerker: Der Satz "Der Teller ist auf dem Tisch." ist direkt mit Bild, Silbe und Wort verbunden.
- Risiko: Noch keine echte Interaktion innerhalb der Ebenen; es bleibt ein gefuehrter Mini-Moment.

### Lehrkraft im Alltag
- Staerker: Start und Abschluss sind spezifisch fuer den Teller-Moment und dadurch leichter einzuordnen.
- Fehlend: Keine neue Beobachtungs- oder Dokumentationsfunktion, bewusst ausserhalb dieses Slices.

## Verifikation

- `npm test -- --run`: 213/213 Tests bestanden.
- `npm run build`: erfolgreich.
- Browser-Smoke auf `http://127.0.0.1:52773`: Lehrkraft -> Objekt-Moment starten -> Fertig fuehrt zum spezifischen Finish-Screen mit "Der Teller-Moment ist fertig." und "Nochmal Teller".

## Staerken

- Konservative Verbesserung ohne neuen Workflow.
- Kindklarere Orientierung am konkreten Gegenstand.
- Druckfreie Sprache und lokaler Betrieb bleiben erhalten.
- Regressionsschutz fuer Content und Quelltext ist in den bestehenden Node-Tests ergaenzt.

## Schwaechen

- Visuelle Teller/Tasse/Tisch-Szene ist weiterhin CSS-/Symbolplatzhalter, kein lizenziertes UK-Symbolset.
- Der Layer-Grid ist noch passiv und nicht als einzeln antippbare Uebung umgesetzt.
- Mobile/narrow Layout wurde im Browser nur begrenzt per CSS/Build abgesichert, nicht als echter Tablet-Klassenraumtest.

## Risiken

- Pseudo-Elemente koennen je nach Browser/Zoom anders wirken; bei spaeterer Symbolintegration sollten echte lokale Assets priorisiert werden.
- Zu viele gleichzeitige Informationen koennen fuer basal arbeitende Kinder weiterhin reduziert werden muessen.

## Naechster kleinster sicherer Schritt

Einen echten Narrow-Width-/Tablet-Smoke fuer genau diesen Teller-Moment durchfuehren und nur falls noetig Abstand, Kartenumbruch oder Groessen der `object-family-layer-grid` nachjustieren. Keine neuen Objektfamilien hinzufuegen, bevor dieser Mini-Moment im Browser stabil und ruhig wirkt.
