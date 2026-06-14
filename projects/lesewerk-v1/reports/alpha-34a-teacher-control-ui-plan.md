# Alpha 34A - Teacher Control UI Plan

## Kurzfazit
Der aktuelle Lehrkraftbereich hat bereits gute Bausteine: lokale Profilwahl, bekannte Grapheme, bekannte Silben, Hilfen, Zugangsschwerpunkt, adaptive Vorschau und Coverage-Check. Für Alpha 34B sollte deshalb nichts neu erfunden werden. Die Aufgabe ist, diese vorhandene Struktur sichtbarer als lokale Lernbeobachtung zu ordnen.

## Ziel
Eine Lehrkraft soll schnell erkennen:
- Welche Buchstaben und Silben sind heute bekannt oder werden gemeinsam getragen?
- Welche Hilfen sind aktiv?
- Warum passt der vorgeschlagene nächste Lernschritt?
- Welche Aufgaben werden heute bewusst ausgelassen?
- Wo beginnt das Kind ruhig weiter, ohne dass der Kinderpfad überladen wird?

Der Kinderpfad soll unverändert ruhig bleiben. Die zusätzliche Steuerung gehört in den Lehrkraftbereich.

## Empfohlene UI-Struktur für Alpha 34B

### 1. Lokale Beobachtungsleiste
Im bestehenden Bereich `Lokales Leseprofil einstellen` sollte oben eine kurze Zusammenfassung ergänzt werden:
- `Heute im Blick: M, a · ma`
- `Hilfe: Bild, kleine Auswahl`
- `Nächster Schritt: Bild/Silbe gemeinsam`

Diese Leiste ersetzt keine Chips, sondern fasst sie zusammen. Sie soll klein bleiben und nicht wie eine neue Hauptkarte wirken.

### 2. Begründungskarte innerhalb der bestehenden Vorschau
Die bestehende `adaptive-preview` sollte um eine klare Begründung erweitert werden:
- `Warum passt das?`
- Beispiel: `Die Aufgabe nutzt bekannte Grapheme und bleibt mit Bildhilfe bei einer kleinen Auswahl.`

Wichtig: Keine Formulierung wie `Kind kann`, `Niveau`, `Test`, `Diagnose`, `Score`.

### 3. Bereitschaft als lokale Unterrichtsspur
Zusätzlich zu Graphemen, Silben und Hilfen sollte Alpha 34B drei kleine Toggle-Gruppen im Lehrkraftbereich zeigen:
- `Satz heute mit Hilfe`
- `Mini-Geschichte heute mit Hilfe`
- `Schreibbrücke heute optional`

Diese Toggles sind keine Fähigkeitsurteile. Sie beschreiben nur, was heute angeboten werden darf.

### 4. Aufgabenpassung sichtbar machen
Bei der adaptiven Vorschau sollte sichtbar werden:
- `passt wegen: bekannte Grapheme`
- `passt wegen: sichere Silbe`
- `heute auslassen: neue/zu viele Einheiten`

Das kann als kleine Liste oder SummaryItem umgesetzt werden. Keine große neue Tabelle.

### 5. Kinderpfad nicht anfassen
Der Kinderbereich soll für Alpha 34B keine zusätzlichen Lehrkraftdaten zeigen. Dort bleiben:
- Tagespfad
- Schrittkarte
- Mini-Geschichte
- Schreibbrücke
- `Heute fertig`

## CSS- und Layout-Risiken
- Zu viele neue Karten im Lehrkraftbereich können die Seite wieder wie ein Dashboard wirken lassen.
- Die Chip-Gitter sind bereits umfangreich; neue Toggles müssen kompakt bleiben.
- Mobile braucht einspaltige Reihenfolge: Zusammenfassung, Grapheme/Silben, Hilfen, Bereitschaft, Vorschau.
- Keine horizontalen Chip-Überläufe.

## Akzeptanzkriterien für Alpha 34B
- Lehrkraftbereich zeigt eine lokale Beobachtungszusammenfassung.
- UI zeigt bekannte Grapheme und Silben als Grundlage des nächsten Lernschritts.
- UI zeigt mindestens eine kurze Begründung, warum der Vorschlag passt.
- UI zeigt, was heute ausgelassen wird.
- Satz-/Mini-Geschichte-/Schreibbrücken-Bereitschaft ist lokal sichtbar steuerbar oder zumindest sichtbar begründet.
- Kinderpfad bleibt optisch ruhig und bekommt keine zusätzliche Diagnose-/Profilfläche.
- Tests prüfen, dass keine Diagnose-, Score-, Ranking-, Timer-, Cloud-, Login- oder Export-Sprache eingeführt wird.

## Browser-Smoke-Kriterien
- Desktop 1280x900: Lehrkraftbereich erreichbar; lokale Beobachtungszusammenfassung sichtbar; kein horizontaler Overflow.
- Mobile 390x844: Lehrkraftbereich erreichbar; Chip-Gruppen umbrechen sauber; keine abgeschnittenen Buttons.
- Kinderpfad: Tagespfad, Mini-Geschichte, Schreibbrücke und `Heute fertig` bleiben sichtbar erreichbar.

## Kleinster sicherer Implementierungsslice
1. Bestehendes `localDidacticProfile` um lokale Bereitschaftsoptionen erweitern.
2. Bestehende `adaptive-preview` um `Warum passt das?` und `Heute auslassen` schärfen.
3. Maximal 6 bis 8 Aufgaben ergänzen, wenn sie didaktisch sauber an bekannte Grapheme/Silben anschließen.
4. Report und Tests ergänzen.
