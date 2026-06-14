# LeseWerk Alpha 9 – Teacher-Pilot-Implementierungsbericht

Status: implementiert und lokal geprüft
Datum: 2026-05-17

## Ziel

Der Alpha-9-Folgeslice ergänzt den bestehenden Kinder-Tagesweg um eine kompakte Lehrkraftansicht für einen 10–15-Minuten-Pilot und eine lokale, anonyme Beobachtungskarte. Die App bleibt dabei eine ruhige lokale Demo ohne Dashboard-Gefühl.

## Umsetzung

Geänderte Dateien:

- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-9-teacher-pilot-implementation-report.md`

Konkrete Änderungen:

1. Im Lehrkraftbereich wurde ein kompakter `10–15-Minuten-Pilot` ergänzt:
   - Starten,
   - zwei Karten lesen,
   - beobachten,
   - abschließen.
2. Die bestehende kompakte Planungsübersicht bleibt erhalten und wird nicht zu einem schweren Dashboard erweitert.
3. Eine neue `Anonyme Beobachtungskarte` nutzt bereits vorhandene lokale Daten:
   - anonymes Profil bzw. Profilfarbe,
   - sichtbare Beobachtung aus `teacherSummary.supportHistory.observation`,
   - genutzte Hilfen aus `teacherSummary.supportHistory.help`,
   - nächster kleiner Schritt aus `adaptivePlacement.teacherExplanation.nextSmallStep`.
4. Die Datenschutzgrenze ist in Lehrkraftbereich und Druckvorschau explizit sichtbar:
   - keine echten Namen,
   - keine diagnostische Einordnung,
   - keine Fotos,
   - keine Cloud,
   - keine Datei oder Online-Übertragung durch die Druckvorschau.
5. Der Reset-Button `Lokalen Demo-Stand zurücksetzen` bleibt sichtbar im Lehrkraftbereich.
6. Die Styles halten Pilotablauf und Beobachtungskarte leichtgewichtig, responsive und passend zur bestehenden ruhigen Kartenoptik.

## Datenschutz- und GE-Sicherheitsgrenze

Die Beobachtungskarte dokumentiert nur sichtbare Unterrichtssignale aus dem aktuellen lokalen Demo-Stand. Sie fordert keine Namen, keine Fotos, keine Audioaufnahme, keine Konten, keine Cloud-Verbindung und keine diagnostische oder bewertende Aussage an.

Die Druckvorschau bleibt privacy-safe: Sie zeigt nur anonymes Profil, aktuelle Beobachtung, Hilfen, vorsichtigen Vorschlag und nächsten kleinen Schritt. Sie erzeugt keinen Export, keinen Download und keine Netzwerkübertragung.

## Automatisierte Prüfung

`npm test`:

- Ergebnis: bestanden
- Umfang: 42/42 Tests bestanden
- Neuer Test prüft:
  - sichtbaren 10–15-Minuten-Pilot,
  - vier kompakte Pilot-Schritte,
  - anonyme Beobachtungskarte,
  - Nutzung der bestehenden Teacher-Summary-/Placement-Daten,
  - explizite Datenschutzgrenzen,
  - Styles für Pilot und Beobachtungskarte.

`npm run build`:

- Ergebnis: bestanden
- Build-Pipeline: `tsc -b && node scripts/build.mjs`

## Browser-Spot-Check

Lokaler Build geöffnet unter:

- `http://127.0.0.1:4389/?alpha9-teacher-pilot=1`

Geprüft:

1. Lehrkraftbereich ist über den bestehenden Umschalter erreichbar.
2. `10–15-Minuten-Pilot` zeigt vier kompakte Schritte und keine schwere Dashboard-Struktur.
3. `Anonyme Beobachtungskarte` zeigt Profilfarbe, sichtbare Beobachtung, genutzte Hilfe und nächsten kleinen Schritt.
4. Datenschutztext nennt keine echten Namen, keine diagnostische Einordnung, keine Fotos und keine Cloud.
5. Lokale Druckvorschau bleibt anonym und enthält keine Export-/Download-Funktion.
6. Reset bleibt als `Lokalen Demo-Stand zurücksetzen` sichtbar.
7. Browser-Konsole zeigte keine JavaScript-Fehler.

## Grenzen / Risiken

- Die Beobachtungskarte ist bewusst lokal und read-only aus dem aktuellen Demo-Zustand. Freitextnotizen oder speicherbare Beobachtungsbögen wurden nicht ergänzt, um die Datenschutzgrenze klein zu halten.
- Der Pilotablauf ist fest als kompakte Orientierung implementiert. Eine anpassbare Lehrkraftplanung wäre ein eigener späterer Slice.
- Der erste Preview-Start auf Port 4173 schlug fehl, weil der Port bereits belegt war; der Browser-Check wurde deshalb mit einem lokalen Server auf Port 4389 durchgeführt.
