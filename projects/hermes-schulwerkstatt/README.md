# Hermes Schulwerkstatt v7 · Förderkompass + Aufgabenbank v2 + Materialkorb

Lokale, lehrer-facing Schulwerkstatt für Chris' GE-Kontext: Wochenziele auswählen, daraus eine ruhige 5-Tage-Struktur erzeugen, Stationen konkretisieren, Beobachtungsfragen sammeln, nächste Schritte ableiten und vorhandene lokale Lernsysteme sicher referenzieren.

Die v7 ist bewusst kein Schülerdaten-System und keine automatische Förderdiagnostik. Sie nutzt ausschließlich fiktive/anonymisierte Demo-Daten und unterstützt die pädagogische Entscheidung der Lehrkraft.

## Öffnen

Direkt im Browser öffnen:

`/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`

Empfohlen mit lokalem Server:

```bash
cd /Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt
python3 -m http.server 8788
```

Dann öffnen:

`http://127.0.0.1:8788/`

## Was v7 kann

- Interaktiver Wochenziel-Generator mit Auswahlziel, eigenem Zieltext und Unterstützungsfokus.
- Automatisch erzeugter 5-Tage-Wochenplan mit Station, Ziel, Material, Unterstützung, Beobachtungsfrage und nächstem Schritt.
- Aufgabenwerkstatt mit klaren Lehrer-Aufträgen.
- Förderkompass v1: anonymisierte Beobachtungssignale, Fokusbereich und Unterstützungsniveau werden lokal in Arbeitshypothese, nächsten kleinsten Schritt, Aufgabe, Materialhinweis, Überladungswarnung und Connector-Empfehlung übersetzt.
- Aufgabenbank v2: 48 kuratierte Mini-Aufgaben, genau 12 pro Bereich (Lesen, Mengen, Kommunikation/UK, Wahrnehmung/Alltag), mit Filter nach Bereich, Unterstützungsniveau und Dauer.
- Aufgabenkarten v2: druckbare Karten aus der aktuell gefilterten Aufgabenbank oder aus den zwei Förderkompass-Empfehlungen, jeweils mit Kind-Seite, Lehrer-Seite und dezenter Schneidelinie.
- Materialkorb v1: Checkliste aus der aktuellen Kartenauswahl, damit Material vor dem Unterricht konkret bereitgelegt werden kann.
- Team-Check v1: kurze Vorprüfung „passt / zu viel / nächster kleiner Schritt“ ohne Bewertung, Ranking oder automatische Speicherung.
- Förderkompass empfiehlt nach einer lokalen Empfehlung zwei passende Aufgaben aus der Aufgabenbank; bei fehlender exakter Passung wird „passend prüfen“ angezeigt.
- Copybarer Markdown/Text-Export für aktuellen Wochenplan + Förderkompass-Ergebnis inklusive empfohlener Aufgabentitel, Materialkorb und Team-Check. Der Export speichert nicht automatisch und enthält eine Anonymisierungs-Erinnerung.
- Connector-Karten zu bestehenden lokalen Systemen: LeseWerk, GE-Lernwerkstatt, Spielraum Generator und weekly-plans.
- Statuslabels für Connectoren: `available` oder `check manually`.
- A4-freundliche Druckansicht mit Materialliste, Beobachtungsfragen, Förderkompass-Nächstschritt, empfohlenen Aufgaben, Materialkorb, Team-Check und Aufgabenkarten ohne Rohbeobachtungstext.
- Quality/Safety Panel: Datenschutz, GE-Passung, Überladung, Lehrerentscheidung, keine Pseudo-Diagnose.

## Dateien

- `index.html` – nutzbare lokale v7-Dashboard-Demo mit CSS, JavaScript, Förderkompass, Aufgabenbank v2, Aufgabenkarten, Materialkorb und Team-Check in einer Datei.
- `data/schulwerkstatt-demo.json` – fiktive, anonymisierte Beispieldaten aus dem MVP.
- `reports/schulwerkstatt-mvp-report.md` – ursprünglicher MVP-Bericht.
- `reports/schulwerkstatt-v2-report.md` – v2-Bericht mit Änderungen, Verification und offenen Punkten.
- `reports/schulwerkstatt-foerderkompass-v1-report.md` – v3/Förderkompass-v1-Bericht mit Verification, Stärken, Grenzen und nächster v2-Idee.
- `reports/schulwerkstatt-aufgabenbank-v1-report.md` – v4/Aufgabenbank-v1-Bericht mit Verification, Stärken, Grenzen und nächstem Schritt.
- `reports/schulwerkstatt-aufgabenkarten-v1-report.md` – v5/Aufgabenkarten-v1-Bericht mit Verification, Stärken, Grenzen und nächstem Schritt.
- `reports/schulwerkstatt-materialkorb-v2-report.md` – v6/Materialkorb-und-Druckkarten-v2-Bericht mit Verification.
- `reports/schulwerkstatt-materialkorb-v2-report.md` – v6/Materialkorb-v2-Bericht mit Verification, Stärken, Grenzen und nächstem Schritt.
- `data/aufgabenbank-v2-content-draft.json` – validierter Draft der 48 Beispielaufgaben aus der Aufgabenbank v2.
- `reports/schulwerkstatt-aufgabenbank-v2-content-report.md` – Inhalts- und Qualitätsbericht zur Aufgabenbank v2.
- `reports/schulwerkstatt-aufgabenbank-v2-integration-report.md` – Integrations- und Prüfbericht für v7.
- `memory/schulwerkstatt-quality-pattern.md` – wiederverwendbares Qualitätsmuster für künftige Hermes-Jobs.

## Datenschutzgrenze

Diese Demo enthält nur fiktive Daten: Gruppe Rot, Kind A-D. Keine echten Namen, Diagnosen, Geburtsdaten, Familieninformationen, seltenen Merkmalskombinationen oder vertraulichen Schulnotizen eintragen.

Für echte Nutzung:

1. Nur Farbcodes oder anonymisierte Gruppenprofile verwenden.
2. Beobachtungen als pädagogische Arbeitshypothesen formulieren.
3. Keine automatischen Diagnosen, Rankings, Noten oder Förderentscheidungen ableiten.
4. Vor Weitergabe, Ausdruck oder Übernahme in Dokumentation menschlich prüfen.

## Connectoren

Die bestehenden Systeme werden nur referenziert und nicht verändert:

- LeseWerk: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/index.html`
- LeseWerk dist: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/dist/index.html`
- Spielraum Generator: `/Users/zondrius/hermes-workspace/projects/spielraum-generator/dist/index.html`
- GE-Lernwerkstatt: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/dist/index.html`
- Wochenpläne: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/weekly-plans`

Hinweis: Je nach Browser-Startmodus können relative lokale Links oder Ordnerlinks blockiert sein. Deshalb zeigt die Oberfläche zusätzlich die absoluten Pfade zum manuellen Öffnen.

## Förderkompass-Datenschutz

Der Förderkompass verarbeitet Texte nur lokal im Browser und speichert nichts. Trotzdem dürfen in das Beobachtungsfeld keine echten Namen, Diagnosen, Geburtsdaten, Familieninformationen, medizinischen Angaben oder seltene identifizierende Kombinationen eingetragen werden. Die Ausgabe ist eine pädagogische Arbeitshypothese für die Lehrkraft, keine Diagnose und keine automatische Förderentscheidung.

## Nächster sinnvoller Schritt

Ein kleiner, sicherer Folgeschritt wäre eine lehrkraftseitige Qualitätsrunde mit 6–8 echten Unterrichtssituationen ohne personenbezogene Daten: Welche Beispielaufgaben sind sofort nutzbar, welche brauchen Materialvereinfachung, welche sollten in einer späteren v8 ersetzt werden? Wichtig: weiterhin lokal, ohne echte Schülerdaten und ohne automatische Speicherung in sensiblen Dokumenten.
