# Alpha 50A – Lehrer Entwicklungssteuerung Audit

## Kurzfazit
Der aktuelle Lehrerbereich ist bereits deutlich mehr als ein Kinderpfad: Er zeigt lokale Planung, eine kleine 2-Karten-Pilotlogik, eine manuelle Tagesweg-Vorschau und eine Leseleiter-Orientierung. Für Alpha 50B sollte daraus aber nur eine sehr kleine, klar begrenzte Entwicklungsübersicht entstehen: sichtbar machen, was schon sicher bekannt wirkt, wie viel Hilfe gerade gebraucht wird, welche Lesestufe lokal naheliegt und welcher ruhige Anschluss als nächstes möglich ist.

## Aktueller teacher-side Stand

### Bereits vorhanden in `src/App.tsx`
- `teacher-panel` mit dem Titel „Planung für heute“.
- Eine kurze lokale Einordnung: „Kurzer lokaler Lesemoment“, mit Hinweisen auf sichtbare Beobachtungen.
- Grenzenhinweise: keine echten Namen, nach zwei Karten bewusst enden, vorsichtig deuten.
- `SeriesCompactPanel` für ruhige Serien-Auswahl.
- `2-Karten-Pilotmodus` als bewusst kleine Erstnutzung.
- Eine kleine „Praxis-Pilotkarte“ mit drei Textfeldern, die ausdrücklich nicht gespeichert werden.
- Eine lokale Tagesweg-Auswahl mit maximal vier Karten.
- Ein manueller Vorschlag für den nächsten Tagesweg, der nur per Klick übernommen wird.
- Die Orientierungshilfen `GuidedReadingPath` und `Leseleiter` mit den Stufen Bild / Silbe / Wort / Satz / Mini-Geschichte / Schreibbrücke.
- Der Kinderpfad bleibt getrennt von der Lehrkraftlogik; automatische Mutationen sind bereits stark begrenzt.

### Bereits vorhanden in `src/lesewerk-content.mjs`
- Anonyme Profile und lokale didaktische Profile.
- `getTaskDevelopmentProfile(...)` mit `entryLayer` als Orientierung.
- `getTeacherSummary(...)` und `getAdaptivePlacementSummary(...)` als vorsichtige Auswertungen.
- `getTeacherDailyPathSuggestion(...)` mit manuell übernehmbarer Empfehlung.
- `getLocalObservationControlSummary(...)`, `getAdaptiveNextStepForProfile(...)`, `getLocalReadingSeriesForProfile(...)`.
- Die Inhalte sind bereits um eine ruhige Reihenfolge von bekannten Wortkernen, Silben und Story-Anschlüssen aufgebaut.

### Relevante Tests in `tests/lesewerk-content.test.mjs`
- Es gibt bereits Schutztests gegen Diagnose-, Score-, Ranking- und Export-/Cloud-Muster.
- Die teacher-side UI ist bereits auf lokale, vorsichtige Sprache geprüft.
- Die Serienlogik und der kleine Pilotmodus sind bereits als kompakte, ruhige Struktur abgesichert.

## Risiken

1. Begriffe können zu stark nach Bewertung klingen
   - Wörter wie „Stufe“, „Level“, „Fit“, „Placement“ oder „Score“ könnten im Lehrerbereich schnell wie Leistungsbewertung wirken.
   - Auch eine gute Orientierung kann falsch gelesen werden, wenn sie zu technisch oder zu linear erscheint.

2. Zu viele Parallelanzeigen erzeugen Diagnosegefühl
   - Wenn bekannte Wortkerne, Unterstützungsgrad, Einstiegsebene, nächste Serie und Tagesweg gleichzeitig prominent erscheinen, wird die Oberfläche schnell wie ein Förderdiagnostik-Dashboard statt wie eine Planungsstütze.

3. Automatische Ableitungen wirken schnell zu endgültig
   - Eine automatisch gesetzte Empfehlung oder eine scheinbar „richtige“ nächste Stufe könnte als Festlegung verstanden werden.
   - Für GE-Praxis ist aber ein offener, prüfbarer Anschluss wichtiger als eine vermeintlich exakte Einstufung.

4. Lehrkraftansicht könnte ungewollt Daten sammeln
   - Schon kleine Zusatzfelder können den Eindruck erzeugen, dass Beobachtungen dauerhaft gespeichert oder weiterverarbeitet werden.
   - Für das hier gewünschte Format ist lokale, manuelle, kurzlebige Orientierung besser als ein System mit Verlauf oder Export.

## Drei mögliche Tiny-Designs

### Design 1: Mini-Orientierungskarte
Eine sehr kleine Kachel im Lehrerbereich mit vier Zeilen:
- Bekannte Wortkerne
- Aktuelle Unterstützung
- Aktuelle Leseorientierung
- Nächster möglicher Anschluss

Vorteile:
- Sehr klar.
- Kaum Platzbedarf.
- Gut für schnelles Vorbereiten.

Nachteile:
- Wenig Tiefe.
- Muss sauber formuliert werden, damit es nicht nach Bewertung aussieht.

### Design 2: Ruhige Entwicklungsleiste
Eine kompakte Leiste mit vier benannten Schritten:
- Bild / Symbol
- Silbe
- Wort
- Satz / Mini-Story

Daneben eine Markierung für „Arbeitsstand“ und ein Feld „nächster möglicher Anschluss“.

Vorteile:
- Passt zur vorhandenen Leseleiter.
- Didaktisch anschlussfähig.
- Sehr leicht verständlich.

Nachteile:
- Kann zu stufenförmig wirken, wenn die Wörter nicht bewusst entwertungsfrei bleiben.

### Design 3: Zwei-Spalten-Übersicht
Links: „Arbeitsstand“ mit bekannten Wortkernen und sichtbaren Hilfen.
Rechts: „nächster möglicher Anschluss“ mit einer ruhigen Auswahl aus 1–2 Optionen.

Vorteile:
- Sehr praktisch für die Unterrichtsvorbereitung.
- Trennt Gegenwart und Anschluss sauber.

Nachteile:
- Etwas größer als die anderen Varianten.
- Braucht Disziplin, damit daraus kein Planungs-Dashboard wird.

## Empfehlung: kleinste sichere 50B-Implementierung

Empfohlen wird Design 1 als kleinster sicherer Schritt, ergänzt um eine sehr kleine Anschlusszeile aus Design 3.

### Konkret
Eine neue Teacher-Card im Lehrerbereich mit genau diesen Bausteinen:
- Titel: „Arbeitsstand und nächster möglicher Anschluss“
- 1 Zeile: bekannte Wortkerne
- 1 Zeile: aktuelle Unterstützung
- 1 Zeile: aktuelle Orientierung / Leseebene
- 1 Zeile: nächster möglicher Anschluss
- 1 kurze Sicherheitsnotiz: „nur Orientierung, keine Bewertung“

### Warum diese Variante am sichersten ist
- Sie baut auf vorhandenem Material auf, ohne neue Logik zu erzwingen.
- Sie kann vollständig lokal und manuell bleiben.
- Sie macht den Lehrerblick nützlich, ohne automatisch zu platzieren oder zu bewerten.
- Sie vermeidet die Gefahr, dass mehrere bestehende teacher-side Module gleichzeitig als „Entwicklungsdiagnostik“ gelesen werden.

## Exakte Acceptance Criteria für Alpha 50B

1. Die neue Ansicht ist rein teacher-side und lokal.
2. Sie zeigt nur anonymisierte, generische Informationen.
3. Sie verwendet Begriffe wie „Arbeitsstand“, „Orientierung“ und „nächster möglicher Anschluss“.
4. Sie zeigt bekannte Wortkerne, aktuelle Unterstützung und eine ruhige Leseorientierung.
5. Sie enthält keine Diagnose-, Score-, Ranking-, Punkte-, Prozent-, Timer- oder Notensprache.
6. Sie enthält keine automatische Platzierung oder automatische Pfadmutation.
7. Sie speichert keine neuen Schülerdaten, keine Namen, keine Klassen und keine externen Dateien.
8. Sie bleibt als eine kleine Karte oder ein sehr kleiner Block im bestehenden Lehrerbereich lesbar.
9. Sie ist in einem kleinen Folgetask umsetzbar, ohne den Kinderpfad neu zu bauen.
10. Die Formulierung bleibt vorsichtig: Vorschlag, Orientierung, möglicher Anschluss – keine Festlegung.

## Wording-Guardrails

### Gute Begriffe
- Arbeitsstand
- Orientierung
- bekannter Wortkern
- aktuelle Unterstützung
- ruhiger Anschluss
- nächster möglicher Anschluss
- manuelle Auswahl
- lokale Einschätzung
- vorsichtiger Vorschlag

### Zu vermeiden
- Diagnose
- Stufe als Leistungsurteil
- Level
- Score
- Ranking
- Punkte
- Prozent
- Testwert
- Fehlerzahl
- Defizit
- Förderstatus als Endurteil
- automatisches Placement

### Formulierungsregeln
- Beobachtbar statt wertend schreiben.
- Den nächsten Schritt als Möglichkeit beschreiben, nicht als Muss.
- Kein Eindruck von Vergleich, Norm oder Rangfolge.
- Immer klar machen: lokal, manuell, nur Orientierung.

## Sinnvolle Einbettung in den Codebestand

Der kleinste sichere 50B-Schritt sollte sich an vorhandene Bausteine anlehnen:
- an die bestehende `teacher-panel`-Struktur in `src/App.tsx`;
- an `getTeacherSummary(...)` und `getAdaptivePlacementSummary(...)`, aber sprachlich entschärft;
- an die Leseleiter-Logik mit den Stufen Bild / Silbe / Wort / Satz / Mini-Story / Schreibbrücke;
- an die vorhandenen Schutztests in `tests/lesewerk-content.test.mjs`.

So bleibt die Entwicklung anschlussfähig, ohne das System in Richtung Diagnostik oder automatischer Steuerung zu verschieben.

## Fazit
Der aktuelle Lehrerbereich ist schon gut vorbereitet für eine vorsichtige Entwicklungssteuerung. Alpha 50B sollte deshalb nicht „mehr Analyse“ bauen, sondern eine einzige kleine, ruhige Orientierungskarte hinzufügen, die bekannte Wortkerne, Unterstützung, Leseebene und nächsten möglichen Anschluss sichtbar macht – klar, lokal und ohne Bewertungslogik.
