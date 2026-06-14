# Alpha 17 Slice C – Hermes Anschluss-Empfehlung

Datum: 2026-05-17
Status: Empfehlung erstellt, keine Codeänderungen

## Kurzfazit

Hermes würde nach Alpha 17 nicht sofort weiter am UI polieren, keine Content-Offensive starten und keinen Lehrkraft-Workflow mit Speicherung/Export bauen. Der beste nächste Schritt ist ein echter, sehr kleiner Tablet-Pilot mit anschließender Auswertung der Beobachtungen.

Empfehlung: `Alpha 18 – Realer 2-Karten-Tablet-Pilot und Beobachtungsabgleich`

Grund: Die App hat inzwischen genug Schutz- und Praxisstruktur für einen kleinen Realitätstest. Weitere Features ohne echte Beobachtung würden wahrscheinlich an den wichtigsten Fragen vorbeibauen: Findet ein Kind den Start? Sind zwei Karten wirklich ruhig genug? Sind Touch-Ziele und Lesbarkeit aus Kindposition ausreichend? Versteht die Lehrkraft die flüchtige Praxis-Pilotkarte?

## Ausgangslage nach Alpha 17

Vorhanden bzw. geprüft:

- 2-Karten-Pilotmodus aus Alpha 15.
- Praxis-Pilotkarte mit genau drei Leitfragen aus Alpha 16.
- Sichtbarer Speicherfrei-Hinweis aus Alpha 17:
  - `Hinweis: Diese Notizen werden nicht gespeichert. Bei Bedarf sofort anonym auf Papier übertragen.`
- Real-Tablet-Pilot-Checkliste liegt vor:
  - `reports/alpha-17-real-tablet-pilot-checklist.md`
- Datenschutzlinie bleibt eng:
  - keine echten Namen,
  - keine Diagnosen,
  - keine Scores/Timer/Ranking/Noten,
  - keine Speicherung der Praxisnotizen,
  - kein Export, Upload, Login, Cloud- oder Klassenlistenworkflow.

Wichtigste offene Evidenz:

- Noch kein echter physischer Tablet-Test im Klassenraum.
- Noch keine Beobachtung mit realer Sitzposition, Blickwinkel, Greifdistanz und Unterrichtsdynamik.
- Noch keine belastbare Antwort, ob die App im 10–15-Minuten-GE-Alltag ruhig genug ist.

## Top 3 nächste Phasen – kritisch gerankt

### 1. Realer Pilot-Test mit kleinem Beobachtungsabgleich

Bewertung: beste nächste Phase.

Was gemeint ist:

- Ein sehr kurzer Test mit einem echten Tablet im realen Setting.
- Maximal 1–2 anonymisierte Durchläufe, keine Sammlung personenbezogener Details.
- Fokus auf Bedienbarkeit, Orientierung, Lesbarkeit, Touch-Treffer und Ruhe des 2-Karten-Ablaufs.
- Nutzung der Alpha-17-Checkliste als Beobachtungsrahmen.
- Danach ein kurzer Report: Was war Hürde? Was war sofort verständlich? Was ist der kleinste nächste UI- oder Ablauf-Fix?

Warum Rang 1:

- Er beantwortet die aktuell wichtigste Produktfrage: Funktioniert der Kern unter echten GE-Bedingungen?
- Er ist risikoarm, weil keine neue Datenlogik entsteht.
- Er verhindert Feature-Drift.
- Er schützt vor falscher Politur: UI-Details sollten erst nach echter Beobachtung priorisiert werden.
- Er passt zur bisherigen Alpha-Logik: klein, lokal, praxisnah, datensparsam.

Risiken:

- Auch ein kleiner Pilot kann zu viele Beobachtungen erzeugen; deshalb nur wenige, vorher festgelegte Prüfpunkte notieren.
- Lehrkräfte könnten doch personenbezogene Details in Freitextfelder eintragen; deshalb Hinweis aktiv beachten und bei Bedarf sofort anonym auf Papier übertragen.
- Ein einzelner Pilot ist keine Evidenz für alle Kinder; Ergebnis nur als erste Alltagstauglichkeitsprüfung behandeln.

### 2. Gezielt UI-/Touch-Polish aus dem Pilot ableiten

Bewertung: sinnvoll, aber erst nach Rang 1.

Was gemeint ist:

- Nur die Hürden verbessern, die im echten Pilot sichtbar werden.
- Mögliche Beispiele:
  - Startpunkt klarer machen,
  - Touch-Ziele vergrößern,
  - Kartenabstand erhöhen,
  - Lehrkraftbereich ruhiger strukturieren,
  - Hinweis zur Nicht-Speicherung sichtbarer oder knapper platzieren.

Warum nicht Rang 1:

- Der bisherige Desktop- und Narrow-Check zeigt keine offensichtlichen Blocker.
- Ohne echten Tablet-Test wäre UI-Polish Spekulation.
- Politur kann Zeit verbrauchen, ohne den Unterrichtsnutzen zu erhöhen.

Risiken:

- Gefahr eines breiten Redesigns.
- Gefahr, dass Lehrkraft- und Kindansicht vermischt werden.
- Gefahr, dass neue UI-Elemente den ruhigen 2-Karten-Rahmen wieder überladen.

### 3. Barriere-/Zugänglichkeits- und Unterstützungsoptionen minimal prüfen

Bewertung: wichtig, aber nach Pilot und erst sehr klein.

Was gemeint ist:

- Prüfen, ob konkrete Unterstützung fehlt:
  - größere Schrift,
  - weniger Text,
  - stärkere Bilddominanz,
  - auditiver Hinweis,
  - klarere Fokusführung,
  - bessere Tab-/Screenreader-Basics für Lehrkraftnutzung.

Warum Rang 3:

- Accessibility ist fachlich wichtig, aber ohne Pilotdaten ist unklar, welche Anpassung zuerst gebraucht wird.
- Eine große Accessibility-Phase könnte zu abstrakt werden, wenn sie nicht an konkreter Nutzung hängt.

Risiken:

- Zu breite technische Standards statt GE-praktischer Beobachtung.
- Audio/Sprachausgabe kann neue Lizenz-, Lautstärke-, Ablenkungs- oder Gerätesituationen erzeugen.
- Zusätzliche Hilfen können die Oberfläche überfrachten, wenn sie nicht optional und klar geführt sind.

## Nicht empfohlen als direkte nächste Phase

### Content Depth / neue Inhalte

Noch nicht tun.

Begründung:

- Mehr Karten, Wörter oder Übungen erhöhen Komplexität, bevor der kleine Kern im Alltag geprüft ist.
- Content-Ausbau kann später sinnvoll sein, aber erst wenn klar ist, welche Aufgabengröße, Bildsprache und Hilfen wirklich funktionieren.

### Teacher Workflow mit Speicherung, Export, PDF oder Klassenlisten

Noch nicht tun.

Begründung:

- Das wäre datenschutz- und produktseitig ein großer Sprung.
- Die jetzige Praxis-Pilotkarte ist bewusst flüchtig und datensparsam.
- Speicherung von Beobachtungen würde sofort strengere Anforderungen an Zweck, Zugriff, Löschung, Verantwortlichkeit und Datenschutzkonzept auslösen.

### Breites UI-Redesign

Noch nicht tun.

Begründung:

- Der aktuelle Engpass ist nicht „zu wenig Design“, sondern fehlende reale Nutzungsevidenz.
- Ein Redesign kann bestehende, bereits geprüfte Schutzlinien brechen.

### Gamification, Scores, Fortschrittsbalken, Timer oder Rankings

Nicht tun.

Begründung:

- Passt nicht zur GE-Schutzlinie dieser App.
- Erhöht Druck und kann falsche Leistungslogik einführen.
- Die App soll beobachtbares Lernen unterstützen, nicht bewerten.

### Cloud, Login, Upload, Datenbank, echte Schülerprofile

Nicht tun.

Begründung:

- Für den nächsten Erkenntnisschritt unnötig.
- Hohe Datenschutz- und Betriebslast.
- Würde das sichere lokale Alpha-Profil verlassen, bevor der Kern validiert ist.

## Empfohlene Option

Empfohlen wird Option 1:

`Alpha 18 – Realer 2-Karten-Tablet-Pilot und Beobachtungsabgleich`

## Alpha 18 – vorgeschlagener Titel und enger Scope

Titel:

`Alpha 18 – Realer 2-Karten-Tablet-Pilot und Beobachtungsabgleich`

Scope:

1. Keine neuen Features bauen.
2. Einen echten 10–15-Minuten-Pilot mit Tablet vorbereiten und nach der Alpha-17-Checkliste durchführen.
3. Nur anonymisierte, knappe Beobachtungen erfassen:
   - Start auffindbar?
   - Touch-Ziele passend?
   - Lesbarkeit aus Kindposition passend?
   - 2-Karten-Rahmen ruhig genug?
   - Speicherfrei-Hinweis für Lehrkraft verständlich?
4. Danach einen Report erstellen:
   - `reports/alpha-18-real-pilot-observation-report.md`
5. Aus dem Report genau einen nächsten technischen Slice ableiten:
   - entweder Startweg verbessern,
   - oder Touch-/Lesbarkeit verbessern,
   - oder Praxis-Pilotkarte sprachlich/visuell nachschärfen.

Nicht im Scope:

- keine neue Speicherung,
- kein Export/PDF,
- keine Schülerverwaltung,
- keine neuen Inhalte,
- keine breiten Accessibility-Umbauten,
- kein Redesign,
- kein Deployment,
- keine Veröffentlichung.

## Konkreter Alpha-18-Ablaufvorschlag

### Slice A – Pilotdurchführung / Beobachtungsreport

Output:

- `reports/alpha-18-real-pilot-observation-report.md`

Inhalt:

- kurzer Kontext ohne personenbezogene Daten,
- genutztes Gerät allgemein beschreiben,
- 5–7 Beobachtungspunkte aus der Alpha-17-Checkliste,
- Stop-Kriterien, falls relevant,
- klare Entscheidung: `weiter nutzbar`, `vereinfachen`, oder `blockiert bis UI-Fix`.

### Slice B – Kleinstes technisches Follow-up nur nach Evidenz

Nur starten, wenn Slice A eine konkrete Hürde zeigt.

Beispiele:

- Startbutton ist schwer auffindbar → Startweg sichtbarer machen.
- Touch-Ziele sind zu klein → gezielte CSS-Anpassung.
- Zwei Karten sind aus Kindposition zu unruhig → Kartenlayout vereinfachen.
- Speicherfrei-Hinweis wird übersehen → Hinweisposition/-Kontrast anpassen.

## Qualitätscheck

Fachliche Plausibilität:

- Hoch. Nach mehreren kleinen Alpha-Slices ist reale Nutzungsevidenz wichtiger als neue Funktionen.

Praktische Umsetzbarkeit:

- Hoch, wenn der Pilot bewusst klein bleibt und nicht als vollständige Evaluation verstanden wird.

Datenschutz:

- Gut kontrollierbar, solange keine Namen, Diagnosen, familiären Informationen, Fotos, Audios oder langen Verlaufserzählungen erfasst werden.

Risiko:

- Niedrig bis mittel. Niedrig technisch, mittel organisatorisch, weil reale Unterrichtssituationen schnell zu reichhaltigen und sensiblen Beobachtungen führen können.

Entscheidung:

- Alpha 18 sollte reale Pilot-Evidenz erzeugen, nicht die App erweitern.
