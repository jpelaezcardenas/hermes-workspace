# Spielraum Generator MVP Report – Silben-Garten

## 1. Was gebaut wurde

Gebaut wurde ein eigenständiger, lokal lauffähiger MVP des „Lernwerkstatt Spielraum Generators“ als Full-Screen-HTML-Lernspiel.

Der Prototyp besteht aus:

- einem strukturierten Lernziel-/Generator-Eingabemodell,
- einem einfachen Generator-Skript,
- einer generierten spielbaren HTML-Ausgabe,
- einem Kindmodus mit sieben Szenen,
- einem sekundären Lehrkraftbereich,
- README mit Öffnungsanleitung,
- Qualitätsmuster für zukünftige Spielraum-Generator-Aufgaben.

Der erste generierte Spielraum heißt:

„Silben-Garten: Mama, Sofa, Ball, Bus“

Lernziel:
Bekannte Laute, Silben und kurze Wörter erkennen, bauen und in einem sehr kurzen Satz lesen.

## 2. Exakter Datei- und Öffnungspfad

Projektordner:

`/Users/zondrius/hermes-workspace/projects/spielraum-generator`

Spielbare generierte Datei:

`/Users/zondrius/hermes-workspace/projects/spielraum-generator/dist/index.html`

Direkt öffnen:

```bash
open /Users/zondrius/hermes-workspace/projects/spielraum-generator/dist/index.html
```

Oder über lokalen Server:

```bash
cd /Users/zondrius/hermes-workspace/projects/spielraum-generator
python3 -m http.server 5177 -d dist
```

Dann öffnen:

`http://localhost:5177/`

## 3. Game Flow

Der Spielraum enthält alle geforderten Szenen:

1. Startszene
   - warme Gartenwelt,
   - eine große Startaktion,
   - keine Lehrkraft-Dashboard-Dominanz.

2. Bildszene
   - Fokus auf ein Objekt/Wort,
   - zwei große Optionen: Mama / Bus.

3. Silbenszene
   - blau-rote Silbenkarten,
   - einfache Bauhandlung für „So · fa“.

4. Wortszene
   - Bild und Wort verbinden/auswählen,
   - große Wortkarten.

5. Satzszene
   - kurzer Satz: „Mama ist da.“,
   - visuelle Auswahl zur Orientierung.

6. Mini-Geschichte
   - sehr kurzer Sinnmoment: Mama im Garten, etwas rollt zu Mama,
   - zwei Antwortmöglichkeiten.

7. Finish-Szene
   - ruhige Bestärkung,
   - Buttons: Nochmal / Weiter / Fertig.

## 4. Generator-Schema und Struktur

Eingabedatei:

`data/silben-garten.goal.json`

Das Schema enthält u. a.:

- `subject`
- `theme`
- `learningGoal`
- `targetLearners`
- `developmentalStage`
- `knownUnits`
- `vocabulary`
- `supportNeeds`
- `choiceCount`
- `feedbackStyle`
- `scenes`

Generator:

`src/generate.js`

Der Generator liest die JSON-Datei und erzeugt daraus:

`dist/index.html`

Die Präsentation ist nicht komplett als lose statische Einzelseiten geschrieben, sondern wird aus Szenendaten, Wortschatz, Cues und Szene-Typen erzeugt. Für zukünftige Varianten können neue Lernziele, Wortschätze und Szenenfolgen ergänzt werden.

## 5. Verifikationsergebnisse

Ausgeführt im Projektordner:

```bash
npm run build && npm run smoke
```

Ergebnis:

```json
{
  "ok": true,
  "checkedFile": "/Users/zondrius/hermes-workspace/projects/spielraum-generator/dist/index.html",
  "scenes": 7,
  "forbiddenPressureWordsInChildMode": 0,
  "jsSyntax": "ok"
}
```

Zusätzlich im Browser geöffnet:

`http://localhost:5177/`

Browser-Prüfung:

- Seite lädt mit Titel „Silben-Garten: Mama, Sofa, Ball, Bus“.
- Startszene sichtbar.
- Startaktion führt in die Bildszene.
- Per DOM-Klickprüfung wurden die weiteren Szenen bis zur Finish-Szene erreicht.
- Browser-Konsole zeigte keine JavaScript-Fehler.
- Lehrkraftbereich ist sekundär über „Für Lehrkraft“ erreichbar und nicht Teil des dominanten Kindstarts.

Druckwort-Prüfung im Kindmodus:

- `score`: nicht gefunden
- `Punkte`: nicht gefunden
- `Timer`: nicht gefunden
- `Ranking`: nicht gefunden
- `Note`: nicht gefunden
- `Diagnose`: nicht gefunden
- `Fehler`: nicht gefunden
- `falsch`: nicht gefunden

Szenenprüfung:

- `start`: vorhanden
- `bild`: vorhanden
- `silben`: vorhanden
- `wort`: vorhanden
- `satz`: vorhanden
- `geschichte`: vorhanden
- `finish`: vorhanden

Mobile/narrow Layout:

- CSS enthält einen Breakpoint bei `max-width: 680px`.
- Auswahlkarten wechseln einspaltig.
- Touch-Ziele bleiben groß.
- Body darf auf schmalen Geräten scrollen, damit Inhalte nicht abgeschnitten werden.

## 6. Qualitätsstärken

- Der Kindmodus fühlt sich wie ein Spielraum an, nicht wie ein Lehrkraftformular.
- Der Einstieg ist warm, groß und eindeutig.
- Die Szenen haben jeweils eine aktuelle Handlung statt vieler paralleler Aufgaben.
- Die Bilder sind lokal mit CSS-Formen gebaut; keine externen oder geschützten Symbolsets.
- Frühe Szenen nutzen nur zwei Optionen.
- Silben werden visuell blau/rot gestützt.
- Feedback ist ruhig und druckarm.
- Lehrkraftinformationen sind vorhanden, aber sekundär.
- Der Generator ist klein, aber tatsächlich datengetrieben erweiterbar.

## 7. Grenzen des MVP

- Die Objektillustrationen sind bewusst einfache CSS-Platzhalter, noch kein kuratiertes Symbolsystem.
- Es gibt noch keine echte Audioausgabe; „Noch einmal hören“ gibt aktuell nur ruhige visuelle Rückmeldung.
- Es gibt noch keine adaptive Hilfe oder Speicherung von Beobachtungen.
- Die Antwortlogik unterscheidet noch nicht fachlich zwischen Zielantwort und Ablenker; jede Auswahl erhält warmes Feedback, um Druck im MVP zu vermeiden.
- Die Browserprüfung war ein Smoke-Test, kein vollständiger Tablet-Test auf echtem Gerät.
- Der Generator ist noch auf wenige Szene-Typen begrenzt.

## 8. Datenschutz- und GE-Check

- Keine echten Schülerdaten enthalten.
- Keine Namen außer generischem Wortschatz „Mama“.
- Keine Diagnosen oder personenbezogenen Beobachtungen.
- Keine Speicherung im Browser.
- Keine externen Assets oder Tracker.
- Keine Noten, Punkte, Ranglisten oder Zeitdruckelemente im Kindmodus.
- Pädagogische Sprache bleibt beobachtungsnah und unterstützend.

## 9. Nächste 3 World-Class Upgrade Slices

1. Audio- und Wiederhol-Slice
   - lokale Web-Speech-Option oder selbst erzeugte kurze Audio-Dateien,
   - Wiederholen liest nur den aktuellen Impuls vor,
   - kein Cloud-Audio und keine Schülerdaten.

2. Generator-Schema V2
   - mehrere Lernziele als JSON,
   - Szene-Typen validieren,
   - automatische Sicherheitsprüfung für Druckwörter, ChoiceCount, Touch-Ziel-Hinweise und Lehrkraftpanel.

3. Premium-Spielwelt-Slice
   - hochwertigere lokale SVG/CSS-Illustrationen,
   - kleine Gartenpfad-Navigation,
   - echte korrekte Zielantworten mit sanfter Hilfe statt global gleichem Feedback,
   - Tablet-Test mit 375px, 768px und Desktop-Breite.

## 10. Fazit

Der MVP erfüllt den Kernauftrag: Es gibt ein frisches lokales Projekt, ein strukturiertes Eingabemodell, einen Generator, eine generierte spielbare Full-Screen-HTML-Ausgabe, einen sekundären Lehrkraftbereich, eine README, einen Bericht und ein wiederverwendbares Qualitätsmuster. Die technische und pädagogische Prüfung ist für einen ersten MVP bestanden; für produktive Nutzung braucht es als nächstes Audio, bessere Illustrationen und eine fachlich feinere Antwort-/Hilfelogik.
