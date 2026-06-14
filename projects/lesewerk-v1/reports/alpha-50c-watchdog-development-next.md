# Alpha 50C – Watchdog Entwicklungsübersicht und Alpha 51

## Ampel
Grün mit leichtem Gelbrest.

Die Alpha-50B-Lehrerkarte ist fachlich sinnvoll: Sie unterstützt die manuelle Entwicklungsplanung, bleibt lokal und vermeidet Diagnose- oder Bewertungssprache. Der Kinderpfad wirkt weiterhin ruhig und unverändert. Der nächste Schritt sollte deshalb nicht mehr Analyse bauen, sondern entweder eine weitere kleine Wortfamilie oder eine bessere visuelle Lesbarkeit der bestehenden Lehreransicht liefern.

## Evidenz

### Was Alpha 50A/50B bereits gut absichert
- Lehrerbereich bleibt klar von der Kinderansicht getrennt.
- Die neue Übersicht ist klein, lokal und manuell.
- Sie nennt Arbeitsstand, aktuelle Hilfe, Orientierung und einen möglichen Anschluss.
- Sie vermeidet Score-, Ranking-, Prozent-, Timer- und Notensprache.
- Sie verändert den Kinderpfad nicht automatisch.
- Die Formulierung bleibt vorsichtig: Orientierung statt Festlegung.

### Verifikation
- `npm test` → 152/152 Tests bestanden.
- `npm run build` → bestanden.
- Die vorhandenen Tests bestätigen die lokale, nicht-diagnostische und nicht-persistent gedachte Lehrkraftansicht.

## Bewertung der Leitfragen

### 1. Hilft die teacher-side Übersicht bei manueller Entwicklungsplanung, ohne diagnostisch zu werden?
Ja. Die Karte gibt genug Orientierung für das Gespräch im Kollegium oder für die Vorbereitung, ohne einen Leistungswert oder ein festes Entwicklungsurteil zu erzeugen. Entscheidend ist, dass die Begriffe bewusst weich bleiben: Arbeitsstand, Hilfe, Orientierung, möglicher Anschluss.

### 2. Bleibt der Kinderpfad ruhig und unverändert?
Ja, nach dem derzeitigen Stand und den vorhandenen Schutztests ist der Kinderpfad nicht durch die Übersicht beeinflusst. Das ist fachlich wichtig, weil die Lehrkraftansicht nur unterstützen soll und nicht nebenbei den Lernweg steuern darf.

### 3. Was sollte Alpha 51 tun?
Am sinnvollsten ist ein kleiner, klar abgegrenzter nächster Schritt. Zwei gute Optionen sind:
- eine weitere Wortfamilie mit derselben ruhigen Qualitätslogik,
- oder eine kleine visuelle Verbesserung der Lehrerkarte, damit der Überblick auf einen Blick besser lesbar wird.

Für den Gesamtpfad wirkt eine zusätzliche Wortfamilie momentan fachlich etwas stärker, sofern sie genauso klein und sicher bleibt wie die bisherigen Bausteine. Wenn das Ziel aber zuerst die Lehrkraftnutzung im Alltag ist, wäre eine visuelle Verfeinerung der bestehenden Teacher-Card der kleinere und risikoärmere Schritt.

## Risiken

1. Zu viel Entwicklungslogik kann nach Diagnostik aussehen
- Mehr Felder, mehr Zusammenfassungen oder zu viele parallele Hinweise könnten den Eindruck eines Förderdiagnostik-Dashboards erzeugen.
- Deshalb sollte Alpha 51 keine umfassende Analyse-Schicht hinzufügen.

2. Automatische Ableitungen wirken schnell endgültig
- Ein scheinbar „richtiger“ nächster Schritt kann als Festlegung missverstanden werden.
- Für GE-Praxis ist ein offener Vorschlag besser als eine harte Zuordnung.

3. Sprache kann ungewollt bewertend klingen
- Begriffe wie Level, Score, Fit, Placement oder Stufe mit Leistungsbezug sollten weiterhin vermieden werden.
- Die Karte soll Orientierung geben, nicht normieren.

## Empfehlung für Alpha 51

### Priorität A: Eine kleine zusätzliche Wortfamilie
Wenn der nächste fachliche Ausbauschritt im Inhalt liegt, dann nur als kleine, ruhige Erweiterung mit denselben Regeln wie bisher:
- nur lokal,
- nur bekannte oder gut anschlussfähige Einheiten,
- kein Ranking,
- kein automatisches Placement,
- keine neue Bewertungslogik,
- keine echten Schülerdaten.

### Priorität B: Visuelle Verbesserung der teacher-side Übersicht
Wenn der nächste Schritt eher die Alltagstauglichkeit verbessern soll, dann die bestehende Karte nur lesbarer machen:
- klare Zeilenhierarchie,
- ruhige Abstände,
- eindeutige Trennung von Arbeitsstand und möglichem Anschluss,
- keine zusätzliche Komplexität.

### Priorität C: Weitere Teacher-Steuerung nur sehr vorsichtig
Eine tiefere Entwicklungssteuerung sollte erst später kommen, wenn klar ist, dass die jetzige Karte im Alltag wirklich hilft und nicht nach Diagnostik aussieht. Mehr Steuerung darf nur manuell, kurzlebig und transparent bleiben.

## Konkrete Alpha-51-Kette

Empfohlene Reihenfolge:
1. Kleine Entscheidung treffen: Inhalt erweitern oder Visualisierung verbessern.
2. Falls Inhalt: eine weitere Wortfamilie in derselben Qualitätsstufe bauen.
3. Falls Visualisierung: teacher-side Karte nur optisch schärfen.
4. Danach erneut mit Tests und kurzer Sichtprüfung absichern.
5. Erst danach über weitere Entwicklungssteuerung nachdenken.

## Guardrails für zukünftige Entwicklungssteuerung

- Immer lokal und manuell.
- Keine echten Namen, Klassen, Diagnosen oder Förderplandaten.
- Keine Scores, Prozente, Rankings, Noten oder Timer.
- Keine automatische Platzierung und keine automatische Pfadmutation.
- Keine Formulierungen, die wie ein Endurteil klingen.
- Lieber eine kleine Orientierungskarte als ein Dashboard.
- Jede Aussage als Vorschlag oder Möglichkeit formulieren.
- Kinderpfad und Lehrerpfad strikt getrennt halten.
- Neue Elemente nur dann bauen, wenn sie im Alltag wirklich helfen.

## Fazit
Alpha 50B ist fachlich gelungen, weil es die Lehrkraft unterstützt, ohne die Lernlogik zu verhärten. Für Alpha 51 sollte der Fokus klein bleiben: entweder eine weitere Wortfamilie mit derselben Ruhe oder eine bessere visuelle Lesbarkeit der bestehenden teacher-side Orientierung. Der sicherste Maßstab bleibt: hilfreich für Planung, aber klar nicht-diagnostisch.