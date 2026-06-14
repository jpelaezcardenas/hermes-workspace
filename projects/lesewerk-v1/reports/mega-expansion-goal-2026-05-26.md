# LeseWerk Mega Expansion Goal - 2026-05-26

## Oberziel

LeseWerk soll von einzelnen Mini-Reisen zu einem skalierbaren, hochwertigen Leselernsystem wachsen: viele alltagsnahe Wortschatz-Anker, saubere Entwicklungsstufen, klare GE-taugliche Bedienung, kindgerechte visuelle Führung und robuste Qualitätssicherung.

Das Ziel ist nicht "mehr Wörter irgendwo einbauen", sondern ein System, das gezielt entscheidet:

- Welche Buchstaben/Grapheme kann das Kind bereits?
- Welche Silben oder Wortmuster sind stabil?
- Welche Wörter sind jetzt didaktisch passend?
- Welche Mini-Reise ist sofort spielbar?
- Welche Mini-Reise braucht erst eine kleine Vorbereitung?
- Wie bleibt der Kindermodus ruhig, schön, handlungsnah und nicht überladen?

## Leitprinzipien

1. S-Tier statt Masse: Nur Wörter aufnehmen, wenn sie didaktisch passen und eine klare Mini-Reise tragen.
2. GE-Fokus: kurze Sprache, konkrete Handlung, wenig Auswahl, starke Orientierung, kein Druck.
3. Lokale Sicherheit: keine externen Bilder, keine geschützten Assets, keine Cloud, kein Tracking, kein Speichern.
4. Entwicklungslogik: Bild -> Laut/Graphem -> Silbe/Wort -> Satz -> Mini-Geschichte.
5. Kleine Code-Slices: große Vision, aber Umsetzung in stabilen Paketen mit Tests und Build.
6. Bestehende Qualität schützen: Mama, Sofa, Tasse, Ball, Lama dürfen nicht brechen.
7. Abschluss nur mit Nachweis: Tests, Build, kurzer Bericht, konkrete nächste Empfehlung.

## Zielbild

LeseWerk bekommt eine "Wortschatz-Landkarte" mit mehreren Wortfamilien:

- Personen/Beziehungen: Mama, Papa, Oma, Opa.
- Spiel/Bewegung: Ball, Bus, Auto.
- Schule/Material: Buch, Heft, Stift.
- Essen/Trinken: Apfel, Wasser, Tasse, Teller.
- Zuhause/Raum: Sofa, Tisch, Haus, Tür.
- Tiere/Natur: Lama, Maus, Hund.

Nicht alle Wörter müssen sofort als Kinderspiel sichtbar werden. Wichtig ist die Stufung:

- `ready`: vollständig spielbare Mini-Reise.
- `prep`: braucht Vorbereitung, aber Lehrkraft sieht den nächsten kleinen Schritt.
- `later`: noch nicht zeigen, weil Einheiten fehlen oder Auswahl zu schwer wäre.

## Geplanter Arbeitsfluss

### Slice A - Didaktische Wortschatz-Matrix

Erstelle eine prüfbare Matrix mit 30 bis 50 möglichen Wörtern. Sortiere nach:

- Alltag / Schule / Zuhause / Essen / Spiel / Tiere.
- erforderliche Grapheme.
- Silbenstruktur.
- Bildhaftigkeit.
- Handlungsnähe.
- GE-Eignung.
- Risiko für Verwechslung oder Überforderung.
- empfohlener Status: ready, prep, later.

Ergebnis: Bericht mit Top-Prioritäten und konkreter Empfehlung, welche 6 bis 10 Wörter als nächste Mini-Reisen am sinnvollsten sind.

### Slice B - Technische Expansionsarchitektur

Prüfe, wie die Mini-Reisen aktuell in `lesewerk-content.mjs`, `App.tsx`, `styles.css` und Tests verankert sind. Entwirf eine kleine, sichere Struktur, damit neue Reisen weniger manuell und weniger fehleranfällig ergänzt werden können.

Keine große Refaktor-Operation. Erst eine Source-Map und ein kleiner Vorschlag:

- Wo sind Daten doppelt?
- Welche Hilfsstruktur könnte wiederkehrende Text-/Satz-/Symbol-Logik bündeln?
- Was darf aus Sicherheitsgründen nicht automatisiert werden?
- Welche Tests müssen als Gate bleiben?

Ergebnis: Bericht mit minimalem Umsetzungsplan.

### Slice C - Konkreter großer Inhalts-Slice 1

Wenn Slice A und B genug Sicherheit geben, setze als ersten größeren, aber begrenzten Code-Slice zwei bis drei neue Mini-Reisen um. Favorit: `Bus` und `Buch`, optional `Apfel`, wenn die Matrix es bestätigt.

Jede neue Reise braucht:

- Wortfamilien-Pack.
- fünf Schritte: Bild, Silbe/Wort, Wort, Satz, Mini-Geschichte.
- kindgerechte Satzspur.
- Story-Auswahl mit maximal zwei Karten.
- lokales CSS-Symbol.
- Lehrkraft-Rationale.
- Readiness-Status.
- Tests.
- Build.

### Slice D - Review, Memory und nächste Roadmap

Prüfe Ergebnisqualität:

- Lädt die App?
- Kein Quer-Scroll auf 390px.
- Kindermodus bleibt ruhig.
- Lehrkraftbereich enthält genug Erklärung, aber nicht zu viel.
- Keine verbotenen Begriffe: Score, Timer, Note, Diagnose, falsch, Fehler.
- Keine externen Medien/geschützten Assets.

Speichere die Learnings in Hermes-Memory/Handoff, damit Hermes beim nächsten Mal weiß:

- Kleine Slices funktionieren besser als Mega-Prompts.
- Neue Mini-Reisen brauchen Daten + UI + CSS + Tests.
- Nach jedem Slice: npm test, npm run build, Mobile-Smoke.

## Nicht tun

- Keine riesige unsortierte Wortliste direkt in den Kindermodus kippen.
- Keine externen Bildquellen oder Metacom/PCS/Boardmaker/Widgit/ARASAAC verwenden.
- Kein lokales Speichern von Schülerdaten.
- Keine Diagnose-/Leistungslabels.
- Keine Timer, Punkte, Rankings.
- Keine große Refaktorierung ohne Source-Map und Review.
- Keine unkontrollierte Retry-Schleife.

## Abschlusskriterium

Die Arbeit ist erst gut genug, wenn mindestens ein neuer größerer Ausbaupfad steht:

- geprüfte Wortschatz-Matrix,
- technischer Expansionsplan,
- mindestens zwei neue Mini-Reisen oder ein klar begründeter kleinerer sicherer Slice,
- grüne Tests,
- grüner Build,
- kurzer Bericht mit nächstem Schritt.
