# LeseWerk Alpha 6 - Didaktik- und Produktreview

Stand: 2026-05-17

## Kurzfazit
Alpha 6 wirkt insgesamt ruhiger und pilotnaeher als Alpha 5. Die Kinderfuehrung bleibt klar, die Lehreransicht ist support-orientiert und die lokale Druckvorschau bleibt anonym und ohne Exportlogik.

Ein kleiner Restpunkt war ein sichtbarer Header-Text mit Alpha-5-Bezug; dieser wurde als sichere Wortkorrektur auf Alpha 6 angepasst. Danach laeuft der Stand konsistent als Alpha 6.

## Gepruefte Quellen

- `reports/alpha-6-tablet-pilot-report.md`
- `reports/alpha-6-teacher-planning-report.md`
- `reports/alpha-6-local-print-preview-report.md`
- `reports/alpha-6-accessibility-report.md`
- `src/App.tsx`
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`

## Bewertung nach Kriterien

### 1. Ist Alpha 6 calmer und more pilot-ready als Alpha 5?
Ja. Der Kinderpfad wurde einspaltiger und ruhiger beschrieben, die Hilfen sind sichtbar und die Auswahl bleibt reduziert. Die Ansprache ist deutlich weniger hektisch als in einer typischen Ueberladungsoberflaeche.

Was fuer einen Pilot spricht:

- reduzierte Auswahl mit klarer Orientierung
- sichtbare Hilfen statt versteckter Logik
- ruhige, kurze Texte
- kein Noten-, Ranking- oder Timerdenken

### 2. Bleibt die Lehrerplanung support-orientiert und nicht-diagnostisch?
Ja. Die Lehreransicht arbeitet mit Beobachtung, genutzter Hilfe, vorsichtigem Vorschlag und naechstem kleinen Schritt. Das ist fachlich passend fuer GE, weil es beobachtbar, tagesbezogen und anschlussfaehig bleibt.

Positiv:

- keine Diagnosesprache
- keine Defizitetikettierung
- keine Bewertungssprache
- Fokus auf Unterstuetzung und naechste Lernschritte

### 3. Bleibt Print/Preview lokal, anonym und sicher?
Ja. Die Druckvorschau bleibt lokal im Browser, nutzt nur Profil-Labels/Farben und verzichtet auf Backend, Cloud, PDF-Export, Downloads oder automatische Speicherung.

Das ist fuer den Schulkontext gut, weil:

- keine personenbezogenen Echtdaten benoetigt werden
- keine Dateiablage erzeugt wird
- der Druckvorgang transparent und kontrollierbar bleibt

### 4. Verbessern Accessibility-Aenderungen die Nutzung ohne zu technische UI?
Ja. Die Aenderungen helfen sichtbar bei Tastaturbedienung und Fokuswahrnehmung, ohne die Oberflaeche technischer wirken zu lassen. Die UI bleibt kindnah und ruhig.

Gut gelungen:

- starke Fokusanzeige
- `aria-pressed` fuer zentrale Umschalter
- klare Labels
- keine technisch wirkende Zusatzoberflaeche

### 5. Gibt es noch Blocker vor einem echten Klassenpilot?
Keine harten Blocker, aber drei Restthemen bleiben fuer einen echten Pilot wichtig:

1. Kein echter Tablet-Hardwaretest, nur Browser-/Viewport-Pruefung.
2. Die Lehreransicht bleibt auf kleinen Displays eher textlastig, auch wenn sie schon deutlich kompakter ist.
3. Ein Praxispilot sollte beobachten, ob die reduzierte Auswahl im realen Unterricht fuer einzelne Kinder noch weiter angepasst werden muss.

## Kleiner, sicherer Wort-Fix

Gefaehrdet war nur ein sichtbarer Header-Text, der noch auf Alpha 5 zeigte. Das war als Wortkorrektur klar sicher und wurde in `src/App.tsx` auf Alpha 6 umgestellt.

## Verifikation

Ausgefuehrt im Projektpfad `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 35/35 Tests bestanden.
- `npm run build`: erfolgreich.

## Gesamturteil

Alpha 6 ist fachlich stimmig fuer einen vorsichtigen Klassenpilot mit GE-Fokus. Es wirkt ruhiger, datensparsam, supportorientiert und alltagstauglich genug, um in einer echten Unterrichtssituation getestet zu werden.

Empfehlung: freigabefaehig fuer einen begleiteten Pilot, mit Beobachtung auf Tablet-Verhalten und Textlaenge der Lehreransicht.
