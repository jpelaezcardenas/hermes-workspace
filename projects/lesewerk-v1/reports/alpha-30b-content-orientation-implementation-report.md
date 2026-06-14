# Alpha 30B - Content and Orientation Implementation Report

## Ergebnis
Alpha 30B erweitert LeseWerk um einen kontrollierten Inhalts- und Orientierungs-Slice. Der Kinderpfad ist nun staerker als dominanter Tagespfad sichtbar: Schrittleiste, aktive Schrittkarte, kompakter Hilfebereich und klare Weiter-Handlung stehen im Vordergrund.

## Geaenderte Dateien
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-30b-content-orientation-implementation-report.md`
- `reports/alpha-30b-watchdog-review.md`

## Inhalt
Neu hinzugekommen ist ein kleiner, reviewbarer Alpha-30-Pack:
- Bild-/Symbolzugang: Mama, Sofa
- Silbenbruecken: Mama, Sofa, Mofa, Lama
- Wort-/Satznahe Karten: Mama ist da, Sofa, Limo, Tasse auf dem Tisch

Die Inhalte bleiben ueber lokale Profilpassung gesteuert. Sehr fruehe M+A-Profile bleiben eng bei Mama/ma. M+A+S+O+F oeffnet Sofa/Mofa. Spaetere Profile koennen Limo/Tasse nutzen. Der Alpha-30-Pack ist bewusst nicht automatisch in alle historischen Default-Pfade gemischt, sondern wird per `includeAlpha30Pack` gezielt zugeschaltet.

## Neue Helper
- `getChildOrientationSteps(...)`
- `getProgressionPathForProfile(...)`

Diese Helper beschreiben die Progression Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke ohne Score-, Test- oder Diagnosesprache.

## UI
Der Kinderbereich enthaelt nun eine klarere Struktur:
- `child-path-shell`
- `today-path-header`
- `support-strip`
- `active-step-card`
- `step-rail`
- `next-action-row`

Die Schrittleiste folgt dem aktuellen Mama-Schritt. Der Weiter-Button bewegt sichtbar von Bild zu Silbe und weiter durch den Pfad. Hilfen bleiben erreichbar, aber weniger dominant als vorher.

## Qualitaetskorrektur durch Codex
Nach Nevas Umsetzung wurde ein Kunstwort im Alpha-30-Pack ersetzt: `Fasa` wurde zu `Mofa`, damit die Silbenaufgabe konkreter, bildfaehiger und kindgerechter bleibt.

## Verifikation
- `npm test`: bestanden, 123/123 Tests.
- `npm run build`: bestanden.
- Browser-Smoke Desktop 1280x900: Tagespfad, Step Rail, aktive Karte sichtbar; Weiter schaltet von Bild zu Silbe; kein horizontaler Overflow.
- Browser-Smoke Mobile 390x844: Tagespfad, Step Rail, aktive Karte sichtbar; Weiter schaltet von Bild zu Silbe; kein horizontaler Overflow.
- Lehrkraftmodus: `Lernstart: kurzer Check` weiterhin sichtbar.

## Grenzen
- Der Alpha-30-Pack ist ein hochwertiger Slice, aber noch kein voller S-Tier-Inhaltsbestand.
- Satz-, Story- und Schreibbrueckenebene brauchen deutlich mehr quantitative Breite.
- Die Vollbibliothek ist weiterhin im Kinderpfad erreichbar; langfristig sollte sie noch staerker in den Lehrkraftbereich wandern.
