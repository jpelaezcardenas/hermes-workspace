# Spielraum Generator Phase 2 – Premium Upgrade Report

Datum: 2026-05-22
Projekt: `/Users/zondrius/hermes-workspace/projects/spielraum-generator`
Öffnen: `/Users/zondrius/hermes-workspace/projects/spielraum-generator/dist/index.html`
Lokaler Testpfad in dieser Prüfung: `http://127.0.0.1:4177/index.html`

## Kurzfazit

Der Silben-Garten wurde vom funktionierenden MVP zu einem deutlich spielbareren lokalen HTML-Kindspiel ausgebaut. Die Szenen haben jetzt echte Zielantworten, ruhige Hilfen, einen sichtbaren Gartenweg, klarere nächste Schritte, lokal gezeichnete Premium-Objekte und optionales lokales Vorlesen über die Browser-Web-Speech-API mit sichtbarem Fallback.

## Was geändert wurde

1. Datenmodell / Schema V2
- `data/silben-garten.goal.json` enthält jetzt `schemaVersion: 2`.
- Jede relevante Spielszenen enthält:
  - `expectedAnswer`
  - `feedback.correct`
  - `feedback.help`
  - `repeatText`
  - `difficultyGate`
  - `visualCueType`
  - `maxChoices`
  - `nextStep`

2. Echte Antwort- und Hilfelogik
- Auswahlbuttons nutzen jetzt `data-action="answer"` und `data-answer`.
- Richtige Auswahl zeigt ruhige positive Rückmeldung.
- Nicht-Zielauswahl zeigt konkrete, nicht beschämende Hilfe, z. B. „Schau noch einmal. Suche Mama.“
- Keine Wörter wie „falsch“, „Fehler“, Noten, Punkte, Timer oder Ranking im Kindmodus.

3. Bessere Spielorientierung
- Jede Szene zeigt einen kleinen `journey-path`/Gartenweg mit 7 Stationen.
- Jede Szene zeigt Station, Fokuswort, Handlung und nächsten Schritt.
- Die Lehrkraft-Information bleibt sekundär hinter dem Button „Für Lehrkraft“.

4. Lokale Premium-Visuals
- Mama, Sofa, Ball und Bus wurden als klarere lokale CSS-Illustrationen mit Schatten, Silhouetten und Labels verbessert.
- Gartenbett, Himmel, Weg und Abschlussblumen geben mehr Spielgefühl ohne externe Assets.
- Mobile Abstände und Karten wurden angepasst, damit frühe Szenen mit zwei Auswahlmöglichkeiten touchfreundlich bleiben.

5. Wiederholen / Vorlesen ohne Cloud
- „Noch einmal hören“ spricht den aktuellen Prompt bzw. Fokus-Satz mit `SpeechSynthesisUtterance`, wenn der Browser Web Speech unterstützt.
- Falls Web Speech nicht verfügbar ist, wird der Wiederholtext sichtbar als Feedback angezeigt.
- Es gibt keine Aufnahme, keine Speicherung und keine externe Netzwerkverbindung durch die App.
- Diese Einschränkung ist im Lehrkraftpanel dokumentiert.

6. Stärkere Smoke Checks
- `scripts/smoke-check.js` prüft jetzt:
  - alle sieben Pflichtszenen,
  - Schema V2,
  - Antwort-/Feedback-/Repeat-/Gate-/Cue-/MaxChoice-Metadaten,
  - keine Druckwörter im Kindmodus,
  - sekundäres Lehrkraftpanel,
  - Gartenweg/Journey-Indikator,
  - Web-Speech-Fallback,
  - keine externen Netzwerkreferenzen,
  - Inline-JS-Syntax.

## Vorher/Nachher-Qualität

Vorher:
- Solider MVP mit sieben Szenen.
- Feedback war generisch; jede Auswahl fühlte sich gleich an.
- Orientierung war eher bildschirmweise als spielerisch.
- Wiederholen war nur eine visuelle Standardmeldung.
- Datenmodell war für künftige generierte Spiele noch zu dünn.

Nachher:
- Szenen haben klare Zielantworten und differenzierte Hilfen.
- Das Kind sieht einen Weg durch den Garten und bekommt je Szene einen konkreten nächsten Schritt.
- Objekte wirken stärker wie ein lokales Lernspiel statt wie einfache Platzhalter.
- Web Speech kann lokal/browserseitig vorlesen; Fallback bleibt datensparsam.
- Schema V2 macht weitere generierte Spiele deutlich besser steuerbar.

Qualitätseinschätzung: deutlich über MVP, erste Premium-Spielbarkeit erreicht. Noch kein vollwertiges S-Tier-Produkt, weil Animation, Soundfeinschliff, adaptive Aufgabenfolge und echte pädagogische Erprobung noch fehlen.

## Verifikation

Ausgeführt im Projektordner:

```bash
npm run build
npm run smoke
```

Ergebnis:

```json
{
  "ok": true,
  "checkedFile": "/Users/zondrius/hermes-workspace/projects/spielraum-generator/dist/index.html",
  "scenes": 7,
  "schemaVersion": 2,
  "answerMetadataScenes": 5,
  "forbiddenPressureWordsInChildMode": 0,
  "teacherPanelSecondary": true,
  "journeyPath": true,
  "webSpeechFallback": true,
  "externalNetworkReferences": 0,
  "jsSyntax": "ok"
}
```

Browser-Smoke:
- Lokaler Server aus `dist/` gestartet.
- Startseite geöffnet.
- Per DOM/Browser geprüft: Start → Bildszene.
- Nicht-Zielauswahl „Bus“ in der Bildszene zeigt Hilfe: „Schau noch einmal. Suche Mama.“
- Zielauswahl „Mama“ zeigt positive Rückmeldung: „Ja. Das ist Mama. Jetzt geht es weiter.“
- Weiter-Navigation bis `finish` geprüft.
- Browser-Konsole: keine JavaScript-Fehler nach der Prüfung.

Hinweis: Ein normaler Browser-Click im Snapshot war einmal unpräzise; die DOM-Interaktion bestätigte die tatsächliche Spiellogik zuverlässig.

## Datenschutz- und GE-Sicherheitscheck

- Keine Schülerdaten, Namen, Diagnosen, Fotos, Tracking-IDs oder Speicherung.
- Keine externen Assets und keine Netzwerkaufrufe.
- Keine Punkte, Timer, Ranking, Noten oder beschämende Fehlersprache im Kindmodus.
- Feedback bleibt kurz, konkret, handlungsorientiert und unterstützend.
- Zwei-Auswahl-Struktur bleibt in frühen Szenen erhalten.

## Veränderte Dateien

- `data/silben-garten.goal.json`
- `src/generate.js`
- `scripts/smoke-check.js`
- `dist/index.html`
- `reports/spielraum-generator-premium-upgrade-report.md`

## Verbleibende Grenzen

1. Web Speech ist browser- und systemabhängig. Stimme, Aussprache und Verfügbarkeit können variieren.
2. Die Silbenbau-Szene akzeptiert beide Silbenbuttons als Zielhandlung; eine echte Reihenfolge „So“ dann „fa“ wäre ein nächster Qualitätshebel.
3. Noch keine echte adaptive Lernlogik, keine Materialauswahl durch Lehrkraft und keine Druck-/Offline-Karten.
4. Browserprüfung war ein technischer Smoke, keine Erprobung mit Kindern oder Kollegium.
5. Visuals sind lokale CSS-Illustrationen, keine fachlich validierten Symbolsysteme.

## Nächste 3 Upgrade-Slices

1. Reihenfolge und Manipulation verbessern
- Silbenbau als echte Schrittfolge: erst „So“, dann „fa“, mit sichtbarem Wortaufbau und Hilfe bei anderer Reihenfolge.

2. Lehrkraft-Generatorsteuerung ergänzen
- Kleine lokale Konfigurationsansicht oder JSON-Beispiele für neue Wortsets, ohne Schülerdaten und ohne Speicherung.

3. Spielgefühl weiter erhöhen
- Sanfte Szenenübergänge, mehr Garten-Progression, optionaler stummer Animationsmodus und bessere Mobile-/Tablet-Feinprüfung.

## Abschluss

Die Phase-2-Anforderungen sind umgesetzt: Spiel öffnet, sieben Szenen bleiben erhalten, Build und Smoke bestehen, Browser-Kernpfad wurde geprüft und dieser Report liegt vor.
