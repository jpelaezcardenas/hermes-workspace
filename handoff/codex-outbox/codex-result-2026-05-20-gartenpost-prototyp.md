# Codex Ergebnis - Gartenpost Prototyp

Datum: 2026-05-20

## Kurzfazit

Der Standalone-Prototyp fuer **Gartenpost - Zeig, wohin die Karte geht** wurde als lokale HTML-Datei erstellt und im Browser geprueft. Der Slice bleibt bewusst klein: kein Build, keine Installation, keine externen Assets, keine echten Daten, keine App-Integration.

## Umgesetzt

- heller Garten-/Postraum mit stabiler gruenen Kopfzeile;
- grosse zentrale Bildkarte;
- 2 bis 4 grosse Briefkaesten je nach Level A/B/C;
- Hauptbedienung per Antippen: Karte antippen, Briefkasten antippen;
- ruhige Zustellanimation und wertschatzendes Feedback;
- Buttons `Hilfe`, `Nochmal`, `Fertig`;
- Hilfe `Weniger Briefkaesten` mit Zielhinweis und zweiter Hilfeweg `Ich zeige es dir`;
- getrennter Lehrkraftdrawer `Beobachtung` mit Level, Hilfegrad, Kommunikationsform, naechstem Schritt und situativer 1-10-Einschaetzung nur dort;
- Symbol-/Emoji-Platzhalter sichtbar als nicht lizenzgeklaerte lokale Platzhalter markiert.

## Dateien

Erstellt:

- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp-desktop.png`
- `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp-mobile.png`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`

Nicht veraendert:

- bestehende App-Dateien wie `src/main.jsx`, `src/styles.css`, `package.json`
- offenes `Mengen legen`-Handoff

## Lokal geoeffnet

Geprueft ueber lokalen statischen Server:

`http://127.0.0.1:8776/gartenpost-prototyp.html`

Direktes `file://`-Oeffnen wurde von der Browser-Sicherheitsrichtlinie blockiert; der lokale Server ist deshalb der verwendete Pruefweg.

## Checks

- Seite laedt mit Titel `Gartenpost - Prototyp`.
- Sichtbare Kernelemente vorhanden: `Gartenpost`, zentrale Karte, Briefkaesten, `Nochmal`, `Hilfe`, `Fertig`, `Beobachtung`.
- Vollstaendige Spielrunde geprueft:
  - Karte `Blume` angetippt;
  - Briefkasten `Garten` angetippt;
  - Feedback `Die Karte ist angekommen.` sichtbar;
  - Briefkasten zeigt Ankunftszustand.
- Hilfe geprueft:
  - `Hilfe` reduziert auf 2 Briefkaesten;
  - Zielhinweis wird weich markiert;
  - Feedback `Weniger Briefkaesten. Schau in Ruhe.` sichtbar.
- Lehrkraftdrawer geprueft:
  - Drawer oeffnet ueber `Beobachtung`;
  - Level steht auf `B`;
  - 1-10-Einschaetzung ist nur im Lehrkraftbereich sichtbar;
  - Kinderbereich enthaelt keine 1-10-Skala.
- Schmale Breite geprueft bei ca. 390 px:
  - kein horizontaler Overflow;
  - keine erkannten Ueberlappungen der zentralen Buttons/Touchziele;
  - 3 Briefkaesten und 3 Aktionsbuttons bleiben nutzbar.
- Sicherheits-/Datenschutzscan:
  - keine externen URLs/CDNs;
  - kein `fetch`, keine Storage-APIs, kein Tracking;
  - keine echten Namen, keine Cloud, keine Diagnostik-Automatik;
  - keine Punkte, kein Timer, kein Ranking, keine rote Fehlerdramaturgie.

## Verbleibende Risiken

- Emoji-Symbole sind nur Platzhalter und nicht als lizenzsichere Unterrichtsassets zu behandeln.
- Die Animation ist fuer einen ersten Slice ausreichend, aber noch nicht als barrierearme Bewegungsoption ausgearbeitet.
- Der Prototyp ist visuell eigenstaendig, aber noch nicht mit der echten Beta-3.0-App-Navigation integriert.
- Level C ist als Zielanzahl/Benennen angelegt, aber noch kein mehrkartiger Ablauf mit Satzstarter.

## Fuer Hermes

Erinnern:

- Gartenpost paedagogisch und visuell pruefen;
- spaeter ueber lizenzsichere lokale Symbolassets entscheiden;
- erst nach Review ueber Integration in die Haupt-App entscheiden.

Ignorieren:

- keine Integration, kein Commit, kein Deployment aus diesem Handoff ableiten;
- das offene `Mengen legen`-Handoff wurde nicht bearbeitet.

## Naechste kleinste Aktion

Den Prototyp im Unterrichts-/Teamkontext kurz sichten: Wirkt der Gartenpost-Raum fuer Kinder klar genug, und welche echten Symbolkarten sollen die Emoji-Platzhalter zuerst ersetzen?
