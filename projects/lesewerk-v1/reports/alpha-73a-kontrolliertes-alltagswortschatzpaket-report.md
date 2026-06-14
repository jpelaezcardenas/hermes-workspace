# Alpha 73A - Kontrolliertes Alltagswortschatzpaket

Datum: 2026-05-21
Status: umgesetzt, lokal geprueft, review-required

## Ziel

Alpha 73A erweitert das Lesewerk um ein kontrolliertes Alltagswortschatzpaket mit 16 lokalen Wortangeboten. Die neuen Inhalte sind an bestehende Lernpfad-Metadaten angeschlossen, bleiben ohne externe Medien und greifen die Alpha-72-Objektfamilie Teller/Tasse nicht an.

## Inventar

Geaendert wurden nur:

- `src/lesewerk-content.mjs`
  - `makeTask` nimmt jetzt zusaetzliche Metadaten kontrolliert via Rest-Parameter auf.
  - lokale Symbol- und Gesten-Hinweise fuer Alpha-73A-Woerter ergaenzt.
  - 16 Alpha-73A-Tasks mit Lernpfad-Anschluss, Domain, Komplexitaet und Sichtbarkeits-Gate ergaenzt.
  - `makeAlpha73Requirement` und lokale Requirement-Definitionen fuer Profil-Gating ergaenzt.
- `tests/lesewerk-content.test.mjs`
  - TDD-Schutztests fuer Wortliste, lokale Medienfreiheit, Alpha-72-Bestandsschutz, Domain-/Komplexitaetsklassifikation und Gating ergaenzt.
  - bestehende deterministische Coverage-Erwartungen an die groessere Requirement-Menge angepasst.
- `reports/alpha-73a-kontrolliertes-alltagswortschatzpaket-report.md`
  - dieser Report.

## Wortliste und Struktur

| ID | Wort | Level | Domain | Sichtbarkeit | Komplexitaet | Lehrkraft-Review |
|---|---:|---:|---|---|---|---|
| `alpha73a-a-stift` | Stift | A | schule-material | teacher-led-advanced | teacher-led-advanced | ja |
| `alpha73a-a-heft` | Heft | A | schule-material | teacher-selectable | medium | nein |
| `alpha73a-a-buch` | Buch | A | schule-material | teacher-led-advanced | teacher-led-advanced | ja |
| `alpha73a-a-tuer` | Tuer | A | schule-material | teacher-led-advanced | teacher-led-advanced | ja |
| `alpha73a-b-brot` | Brot | B | essen-trinken | teacher-selectable | medium | nein |
| `alpha73a-b-banane` | Banane | B | essen-trinken | teacher-selectable | very-early | nein |
| `alpha73a-b-wasser` | Wasser | B | essen-trinken | teacher-selectable | medium | nein |
| `alpha73a-b-apfel` | Apfel | B | essen-trinken | teacher-led-advanced | teacher-led-advanced | ja |
| `alpha73a-c-hand` | Hand | C | koerper-kleidung | teacher-selectable | medium | nein |
| `alpha73a-c-fuss` | Fuss | C | koerper-kleidung | teacher-led-advanced | teacher-led-advanced | ja |
| `alpha73a-c-schuh` | Schuh | C | koerper-kleidung | teacher-led-advanced | teacher-led-advanced | ja |
| `alpha73a-c-jacke` | Jacke | C | koerper-kleidung | teacher-led-advanced | teacher-led-advanced | ja |
| `alpha73a-a-ball` | Ball | A | alltag-spiel-orientierung | immediate-child-visible | medium | nein |
| `alpha73a-a-bus` | Bus | A | alltag-spiel-orientierung | teacher-selectable | medium | nein |
| `alpha73a-c-tisch` | Tisch | C | alltag-spiel-orientierung | teacher-led-advanced | teacher-led-advanced | ja |
| `alpha73a-b-sofa` | Sofa | B | alltag-spiel-orientierung | immediate-child-visible | very-early | nein |

Domain-Verteilung:

- schule-material: 4
- essen-trinken: 4
- koerper-kleidung: 4
- alltag-spiel-orientierung: 4

Sichtbarkeits-Gates:

- teacher-led-advanced: 8
- teacher-selectable: 6
- immediate-child-visible: 2

## Gating-Logik

- Komplexe oder potentiell zu fruehe Einheiten werden nicht still vereinfacht, sondern als lehrkraftpflichtig markiert.
- Beispiele:
  - `Stift`: `st` -> teacher-led-advanced
  - `Buch`: `ch` -> teacher-led-advanced
  - `Apfel`: `pf` -> teacher-led-advanced
  - `Schuh`/`Tisch`: `sch` -> teacher-led-advanced
  - `Jacke`: `ck` plus Kontrast `Schuh` -> teacher-led-advanced
- Der fruehe Profilpfad M+A bleibt klein. Alpha-73A flutet den Kinderpfad nicht.
- Die Requirement-Definitionen wurden am Ende von `taskRequirementProfiles` eingefuegt, damit bestehende Alpha-26B-Auswahlreihenfolgen nicht durch neue Inhalte verdraengt werden.

## Alpha-72-Bestandsschutz

Der Schutztest bestaetigt weiterhin:

- `getObjectFamilyMiniSlice().objectWords` bleibt exakt `['Sofa', 'Tisch', 'Tasse', 'Teller']`.
- Der Kinder-Mini-Moment bleibt auf `Teller` verankert.
- Die Interaktionsoptionen bleiben exakt `Teller` und `Tasse`.
- Alpha 73A fuehrt keine externen Medienpfade, URLs oder geschuetzte Symbolsystem-Namen ein.

## TDD / Testergebnis

RED:

- Neue Alpha-73A-Tests wurden vor der finalen Implementierung angelegt.
- Der erste Lauf `npm test -- --run` schlug erwartungsgemaess fehl, weil die Alpha-73A-Wortliste, Metadaten und Requirement-Profile noch fehlten.

GREEN / final:

- `npm test -- --run`: 228/228 bestanden.
- `npm run build`: erfolgreich.

## GE-/Datenschutz-Check

- Keine echten Namen.
- Keine Diagnosen, Noten, Scores, Timer oder Ranking-Sprache.
- Keine Cloud-, URL- oder externen Medienverweise.
- Symbolhilfen bleiben lokale Text-/CSS-nahe Platzhalter.
- Gestenhinweise bleiben textbasiert und nur als Leseunterstuetzung gedacht.
- Schwere Grapheme werden nicht automatisch in den fruehen Kinderpfad gegeben.

## Staerken

- Kontrollierte Erweiterung mit klarer Domain-Balance: 4 x Schule, 4 x Essen/Trinken, 4 x Koerper/Kleidung, 4 x Alltag/Spiel/Orientierung.
- Bestehende Alpha-72-Objektfamilie bleibt stabil.
- Gating ist explizit und testgeschuetzt.
- Tests schuetzen lokale Medienfreiheit und verhindern geschuetzte/externe Symbolabhaengigkeiten.

## Schwaechen

- Alpha 73A ist aktuell ein Content-/Gating-Slice; es gibt noch keine neue eigene UI-Auswahl fuer dieses Paket.
- Einige Woerter sind wegen komplexer Grapheme bewusst lehrkraftpflichtig und nicht direkt als freier Kinderpfad gedacht.
- `Brot` wurde fuer die bestehende Level-B-Testinvariante als `Bro` + `t` modelliert. Das ist technisch konsistent, didaktisch aber spaeter genauer zu pruefen.

## Risiken

- Ohne Browser-Smoke bleibt nur Build-/Unit-Test-Evidenz; eine sichtbare Lernpfad-Pruefung wurde in diesem Slice nicht durchgefuehrt.
- Die Domain- und Gate-Metadaten sind vorhanden, aber noch nicht als eigener Lehrkraftfilter visualisiert.
- Die neuen lokalen Symbol-Cues sind Platzhalter, keine validierten UK-Symbole.

## Kleinster naechster Schritt

Einen kleinen Lehrkraft-Filter fuer Alpha 73A bauen: Paket nach Domain und Gate anzeigen, aber keine automatische Kinderpfad-Erweiterung. Akzeptanz: Alpha-73A-Woerter sind sichtbar, teacher-led-advanced ist klar markiert, Alpha-72-Teller/Tasse-Moment bleibt unveraendert, `npm test -- --run` und `npm run build` bleiben gruen.
