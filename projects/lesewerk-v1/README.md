# LeseWerk v1

Eigenstaendige lokale Lese-App fuer fruehes Lesen im Foerderschwerpunkt geistige Entwicklung. Der aktuelle Stand ist deutlich weiter als Alpha 1: LeseWerk enthaelt inzwischen profilgesteuerte Aufgaben, Mini-Geschichten, Premium-Mini-Reisen, bekannte-Buchstaben-Steuerung, Entwicklungsstufen, Bild-Silbe-Wort-Satz-Bruecken und einen lehrkraftseitigen Bereich fuer Planung und Beobachtung.

## Aktueller Stand

- 101 lokale Leseaufgaben ueber die Stufen A, B und C.
- 24 Mini-Geschichten mit kurzen, kontrollierten Verstehensmomenten.
- Premium-Mini-Reisen fuer ausgewaehlte Wortfamilien, u. a. Mama, Sofa, Tasse, Lama, Apfel, Tisch, Heft, Ball, Bus und Buch.
- Kontrollierte Objektfamilie Sofa / Tisch / Tasse / Teller mit Teller-Tasse-Interaktion.
- Alpha-73A-Alltagswortschatzpaket mit 16 zusaetzlichen Wortangeboten aus Schule, Essen/Trinken, Koerper/Kleidung und Alltag/Spiel.
- Profil- und Entwicklungssteuerung: bekannte Grapheme/Silben, Hilfegrad, lokale Beobachtung, naechster kleiner Schritt.
- Kindermodus mit ruhiger Fuehrung, grossen Touchzielen, Wiederholung, Hilfe und ohne Score, Timer, Ranking oder Diagnose.
- Lehrkraftbereich mit Tagespfad, Review-Modus, Wortfamilienuebersicht, Support-Hinweisen und lokalen Empfehlungen.
- Silben-/Wortdarstellung mit blau-rot alternierenden Silbenfarben.
- Supporthilfen: Bildhilfe, Silbenfarben, Vorlesen als lehrkraftseitiger Prompt, Gebaerden-Hinweis, weniger Auswahl, Wiederholung.
- Vollstaendig lokal: kein Backend, kein Login, keine Cloud-Synchronisation.

## Lokale Nutzung

```bash
npm install
npm test
npm run build
npm run dev
```

Danach im Browser öffnen:

```text
http://127.0.0.1:5173
```

Alternativ kann nach `npm run build` der statische Build so geöffnet werden:

```bash
npm run preview
```

Dann:

```text
http://127.0.0.1:4173
```

## Technische Notiz

Die App ist React + TypeScript und bleibt vollstaendig lokal. Der Build laeuft ueber `tsc` plus ein kleines esbuild-Skript. Es gibt kein Backend, keinen Login und keine Cloud-Synchronisation.

## Wichtige Dateien

- `src/App.tsx` - App-Oberflaeche, Lehrerbereich und Kindermodus.
- `src/lesewerk-content.mjs` - Leseaufgaben, Stories, Profile, Entwicklungslogik und Mini-Reisen.
- `src/styles.css` - Design, Kindermodus, mobile Darstellung und Druck-/Hilfsbereiche.
- `tests/*.test.mjs` - Qualitaets- und Regressionschecks.
- `dist/index.html` - gebauter lokaler Stand.
- `reports/` und `dist/reports/` - Alpha-/Phase-Berichte, Smoke-Screenshots und Handoffs.

## Datenschutz und Grenzen

- Nur anonyme Profile oder Farbcodes verwenden.
- Keine echten Schuelernamen, Diagnosen, Geburtsdaten, Familieninformationen oder medizinischen Angaben eintragen.
- LeseWerk gibt paedagogische Hinweise und lokale Vorschlaege, aber keine automatische Diagnose.
- Lehrkraftentscheidung bleibt zentral.

## Naechster sinnvoller Produkt-Schritt

Der naechste starke Schritt ist kein weiterer grosser Inhaltsdump, sondern Produktklarheit:

1. Alpha-73A-Wortpaket im Lehrerbereich gezielt filterbar machen.
2. Mini-Reisen, Alltagswortschatz und Entwicklungsstufen sichtbar zusammenfuehren.
3. Die Uebergabe aus der Hermes-Schulwerkstatt so klaeren, dass eine Lehrkraft schnell sieht: welches Wort, welche Stufe, welche Hilfe, welcher naechste kleine Schritt.
