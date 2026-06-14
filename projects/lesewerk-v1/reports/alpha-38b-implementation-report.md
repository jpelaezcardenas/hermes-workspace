# Alpha 38B - Serien-Beispielmaterialien ruhig einbauen

## Kurzfazit
Alpha 38B wurde umgesetzt: Jede der vier Unterrichtsserien hat jetzt eine kleine, konkrete Beispielmaterial-Vorschau im Lehrkraftbereich. Der Kinderpfad wurde nicht erweitert; die Serien-Vormerkung bleibt weiterhin getrennt vom Tagesweg.

## Geänderte Dateien
- `src/lesewerk-content.mjs`
  - `exampleMaterial` pro Serie ergänzt.
  - Beispiele: Ball, ma / ma → Mama, Tasse im Satz, Hut-Mini-Geschichte.
- `src/App.tsx`
  - Ruhige Materialvorschau in `SeriesCompactPanel` ergänzt.
  - Vorschau zeigt Symbol-Platzhalter, Bild-/Materialspur, Silbe, Wort, Satz, Mini-Geschichte und Hilfe.
- `src/styles.css`
  - Kompakte Styles für `.series-example-card` und zugehörige Beispiel-Elemente ergänzt.
- `tests/lesewerk-content.test.mjs`
  - Alpha-38B-Test für konkrete Inhalte, UI-Begriffe, Safety und keine automatische Tagesweg-Übertragung ergänzt.

## Didaktische Leitplanken
- Pro Serie genau ein Muster, keine Materialsammlung.
- Nur lokale Text-/Symbol-Platzhalter, keine externen Bilder und keine geschützten Assets.
- Lehrkraftbereich erhält mehr Orientierung; Kinderpfad bleibt ruhig.
- Die Beispiele folgen der Progression Bild/Silbe/Wort/Satz/Mini-Geschichte/Schreibbrücke.

## Verifikation
- `npm test`: bestanden, 139/139 Tests.
- `npm run build`: bestanden.
- Desktop-Smoke:
  - Browser-Snapshot im Lehrkraftbereich geprüft: 4 Beispielmaterialkarten sichtbar.
  - Headless-Screenshot erstellt: `reports/smoke/alpha-38b-desktop.png`.
  - Codex-Nachprüfung: 4 Beispielkarten sichtbar, keine horizontale Überbreite, keine JS-Fehler, keine Beispielmaterialien im Kinderpfad.
- Mobile-Smoke:
  - Headless-Screenshot mit 390x844 erstellt: `reports/smoke/alpha-38b-mobile.png`.
  - Sichtbarer Bereich lädt ohne Blank Screen; keine offensichtliche Layout-Katastrophe im oberen mobilen Bereich.
  - Codex-Nachprüfung 390x844: 4 Beispielkarten sichtbar, keine horizontale Überbreite, keine JS-Fehler, keine Beispielmaterialien im Kinderpfad.
- Safety-Scan:
  - Neue Beispieltexte und Serien-UI enthalten keine externen Asset-Links, keine geschützten Asset-Begriffe, keine Upload-/Cloud-/Export-Funktion und keine Score-/Ranking-/Punkte-Logik.
  - Allgemeiner Quelltext enthält weiterhin bewusst formulierte Datenschutz-Hinweise wie „keine diagnostische Einordnung“ und „keine Cloud“.
- Preview-Server:
  - gestartet für Smoke-Tests auf `http://127.0.0.1:4173`.
  - nach Codex-Nachprüfung gestoppt.

## Risiken / Hinweise
- Die Beispiele sind bewusst einfache lokale Platzhalter und noch keine final geprüften Symbolmaterialien.
- Die mobile Headless-Prüfung zeigt nur den initial sichtbaren Bereich; der Lehrkraftbereich wurde zusätzlich im Browser-Snapshot geprüft.
- Keine echten Schülerdaten, keine Diagnosen, keine Namen, keine externen Assets ergänzt.

## Nächster sinnvoller Schritt
Alpha 38C sollte die Serien-Vorschau kritisch prüfen: Ist die Materialspur fachlich ruhig genug, auf Tablet lesbar, und entsteht wirklich keine Verwechslung zwischen „Serie vormerken“ und „Tagesweg aktivieren“?
