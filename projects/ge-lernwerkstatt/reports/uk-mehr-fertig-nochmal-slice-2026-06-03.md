# UK-Station: Mehr, fertig, nochmal - erster Build-Slice

Datum: 2026-06-03

## Ergebnis

Der erste lokale Beta-3.0-Slice fuer **Mehr, fertig, nochmal** ist umgesetzt.

Gebaut wurden:

- eigener UK-Spielraum mit zentralem Tablett;
- drei grosse Karten: **mehr**, **fertig**, **nochmal**;
- A/B/C-Niveaus mit reduzierbarer Auswahl;
- Hilfe, weniger Karten, Vormachen, Pause und Nochmal;
- getrenntes Lehrkraftfach mit Hilfeform, Zugang, Beobachtungsfrage, 1-10-Momentaufnahme und naechstem Schritt;
- Startweg auf der Kinderstartseite;
- Eintrag in der Uebungsbibliothek;
- responsive Gestaltung fuer Desktop und schmale Breite.

Nicht gebaut wurden:

- keine Speicherung personenbezogener Beobachtungen im Spielraum;
- keine echten Namen, Diagnosen, Fotos oder externen Assets;
- kein Timer, keine Punkte, kein Ranking, keine roten Fehlerzustaende.

## Geaenderte Dateien

- `src/main.jsx`
- `src/styles.css`

## Browser-Pruefung

Geprueft mit lokaler Vorschau unter `http://127.0.0.1:5176/`.

Desktop:

- Titel sichtbar: `Mehr, fertig, nochmal`
- drei Karten sichtbar und eindeutig im Kartenbereich bedienbar;
- Feedback nach **mehr**, **fertig**, **nochmal** sichtbar;
- kein horizontaler Ueberlauf bei 1280 px;
- Screenshot: `reports/smoke/uk-mehr-fertig-nochmal-desktop-2026-06-03.png`

Mobile / schmale Breite:

- Viewport: 390 x 844;
- Startweg **UK-Karten** sichtbar und eindeutig;
- Karten brechen untereinander um;
- Feedback nach **mehr** sichtbar;
- kein horizontaler Ueberlauf;
- Screenshot: `reports/smoke/uk-mehr-fertig-nochmal-mobile-2026-06-03.png`

## Build-Pruefung

`npm run build` wurde erfolgreich ausgefuehrt.

## Einordnung

Der Slice ist bewusst klein gehalten. Er wirkt als Spielraum, weil eine sichtbare Materialhandlung im Zentrum steht und die UK-Karten eine konkrete Auswirkung haben. Die Lehrkraftlogik bleibt getrennt und datensparsam.

## Naechster sinnvoller Schritt

Wenn dieser Slice im Praxistest gut wirkt, waere der naechste Ausbau:

1. echtes lokales Symbol-/Kartenmaterial statt Platzhalter;
2. zweiter Materialmodus, z. B. Snack, Materialdienst oder Aufraeumen;
3. kurze Lehrer-Notiz als bewusst manuell kopierbarer Text, weiterhin ohne automatische Speicherung im Kindermodus.

## Decision Inbox

- Signal: Green
- SOFORT_MACHEN: im Browser testen und bei Gefallen als erstes Muster fuer Hermes-Nacht-App-Slices nutzen
- CHRIS_ENTSCHEIDET: ob als naechstes echte lokale Symbolkarten oder ein zweiter Materialmodus gebaut werden soll
- BEOBACHTEN: ob die Station im Unterricht eher nach Spielraum oder nach Buttonfeld wirkt
- SPAETER: Transfer in Snack, Materialdienst, Aufraeumen oder Tagesstruktur
- BLOCKIERT: nichts
- NICHT_TUN: keine echten Schuelerdaten, keine Cloud-Assets, kein Tracking, keine automatische Foerderdiagnostik
- Naechste kleinste Aktion: App unter `http://127.0.0.1:5176/` oeffnen, **UK-Karten** waehlen und eine Runde mit mehr/fertig/nochmal ausprobieren
