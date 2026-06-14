# Alpha 31B - Content Breadth and Child Path Declutter Implementation Report

## Ergebnis
Alpha 31B erweitert LeseWerk um einen opt-in Alpha-31-Inhaltsslice und entschlackt den Kinderpfad sichtbar weiter. Der Tagespfad bleibt die dominante Bühne; Bibliothek/Details sind tiefer und sekundär eingeordnet.

## Geänderte Dateien
- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-31b-content-declutter-implementation-report.md`
- `reports/alpha-31b-watchdog-review.md`

## Content-Slice
Neu hinzugekommen ist ein kontrollierter Alpha-31-Pack mit 15 realen, bildfähigen Aufgaben/Wortkarten:
- Bild/Symbol: Mama, Sofa, Tasse
- Silbe: Mama/ma, Sofa/so-fa, Mofa/mo-fa
- Wort/Satz: Mama, Sofa, Tasse, Limo, Tisch, kurze Sofa-/Tasse-Sätze
- Mini-Geschichte: Ball rollt zum Sofa
- Schreibbrücke: Sofa nachfahren/legen

Der Pack ist absichtlich opt-in: Profilpfade zeigen Alpha-31-Aufgaben erst mit `includeAlpha31Pack: true`. Alpha-30-Verhalten bleibt damit rückwärtskompatibel.

## Profil-Gating
- Frühes M+A bleibt eng bei Mama/ma und öffnet keine Sofa-, Mofa-, Limo-, Tasse- oder Tisch-Aufgaben.
- M+A+S+O+F kann Sofa/Mofa sehen.
- Spätere Profile mit l/i/t/e und passenden Silben können Limo/Tasse/Tisch sehen.
- Komplexe oder lizenzkritische Symbol-/Asset-Fragen wurden nicht eingeführt.

## UI-Entschlackung
- Der frühere zweite Startbereich wurde zu einem kurzen Hinweis ohne eigenen Primärbutton reduziert.
- Der sichtbare Start-/Weiter-Ort ist der `today-path-header` mit `Tagespfad starten`.
- `support-strip` ist als sekundäre Begleitleiste über die volle Breite eingeordnet.
- Die Vollbibliothek liegt in einer `secondary-library-panel`-Zone unterhalb der aktiven Tagespfad-/Arbeitskarte.
- Lehrkraftwerkzeuge blieben unverändert erreichbar.

## Tests
Neue Alpha-31-Tests prüfen:
- Packgröße und echte Wörter
- Stufenabdeckung über Bild/Symbol, Silbe, Wort/Satz, Mini-Geschichte und Schreibbrücke
- Opt-in-Verhalten
- Profil-Gating für M+A, M+A+S+O+F und spätere Profile
- keine riskante Sprache / keine geschützten Assets
- UI-Quellstruktur: Tagespfad vor Bibliothek, eine dominante Startaktion, Support sekundär

## Verifikation
- `npm test`: bestanden, 126/126 Tests.
- `npm run build`: bestanden.
- Fokussierter Risk-Scan: keine neuen geschützten Asset-Referenzen; Treffer zu Diagnose/Noten liegen in bestehenden Safety-/Test-Kontexten bzw. CSS-Klassennamen wie `guided-entry-note`.
- Browser-Smoke lokal: LeseWerk V1 geladen, Tagespfad sichtbar, Bibliothek sekundär unterhalb der aktiven Karte, kein horizontaler Overflow, Lehrkraft-Schalter sichtbar. Der Header-Button `Tagespfad starten` startet/resetet den Pfad; der Schrittkarten-Button `Weiter` schaltet sichtbar von Schritt 1 Bild zu Schritt 2 Silbe.

## Grenzen
- Der Pack ist ein sinnvoller Slice, aber noch kein vollständiges Curriculum.
- Bild-/Symbolqualität bleibt lokal-placeholder-basiert; keine geschützten Symbolsysteme wurden eingebunden.
- Die Bibliothek ist weiterhin im Kinderpfad erreichbar, aber sekundär. Langfristig kann sie noch stärker in Lehrkraft-/Vorbereitungsbereiche wandern.
