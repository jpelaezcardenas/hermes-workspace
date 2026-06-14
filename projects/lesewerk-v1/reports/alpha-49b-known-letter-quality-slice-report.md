# Alpha 49B – Kleine bekannte-Buchstaben Qualitäts-Slice

## Kurzfazit
Die Alpha-49B-Slice setzt die Empfehlung aus `reports/alpha-49a-known-letter-content-audit.md` bewusst klein um: eine eng geführte Tasse-Reihe mit Bedeutung, Silbenwiederholung, Kontrast und kurzem Satztransfer. Es wurden keine Navigation, keine UI-Struktur und keine externen Assets verändert.

## Geänderte Dateien
- `src/lesewerk-content.mjs`
- `tests/lesewerk-content.test.mjs`
- `reports/alpha-49b-known-letter-quality-slice-report.md`

## Inhaltliche Umsetzung
Neu hinzugefügt wurden genau vier Alpha-49B-Aufgaben:
- `alpha49b-a-tasse-meaning`: Bild-/Bedeutungsstart mit „Zeige Tasse.“
- `alpha49b-b-tas-se-repeat`: Silbenwiederholung „Tas - se“
- `alpha49b-c-tasse-tasche-contrast`: enger Wortkontrast Tasse/Tasche
- `alpha49b-c-tasse-sentence`: sehr kurzer Satztransfer „Die Tasse steht da.“ mit lokaler Mini-Story-Bridge-Metadaten

Die Reihe bleibt auf einen Wortkern fokussiert. Der Kontrast „Tasse/Tasche“ ist bewusst klein, aber in den Requirements als lehrkraftprüfungsbedürftig markiert, weil „Tasche“ die Einheit `sch` berührt. Bei Profilen ohne passende Einheiten kann die Auswahl weiter reduziert werden.

## TDD
Vor der Implementierung wurden zwei fokussierte Tests ergänzt und rot gesehen:
- `Alpha 49B adds one tiny Tasse quality loop with meaning, syllable, contrast and sentence transfer`
- `Alpha 49B Tasse loop stays profile-safe, local and does not overload default child path`

Die Tests prüfen:
- genau vier neue Alpha-49B-Aufgaben
- Progression Bedeutung → Silbe → Wortkontrast → Satz
- kleine Auswahl mit maximal zwei Optionen
- Bridge-Metadaten für den Satztransfer
- Profil-Gating gegen ein frühes M+A-Profil
- keine unsafe/protected Asset-Wörter
- keine Überladung des Default-Kinderpfads
- Einhaltung von `maxDailyPathCards`

Bestehende deterministische Coverage-Tests wurden an die vier neuen Requirement-Profile angepasst.

## Verifikation
- `npm test`: bestanden, 150/150 Tests
- `npm run build`: bestanden

Kein Browser-Smoke durchgeführt, weil nur Inhaltsdaten, Metadaten und Tests geändert wurden; keine UI-/Routing-/CSS-Änderung.

## Safety-Check
- Keine realen Lernenden-, Eltern-, Kollegiums- oder Verbandsdaten.
- Keine Diagnosen, Scores, Timer, Rankings, Noten oder Leistungsdruck-Sprache.
- Keine Login-, Cloud-, Upload-, Export- oder Fetch-Logik.
- Keine externen oder geschützten Assets; nur lokale Text-/Symbolslot-Metadaten.
- Kein automatischer Transfer in Teacher Preview oder Kinderpfad.

## Offene Punkte für spätere größere Content-Erweiterung
- Der Wortkern „Tasse“ ist jetzt dichter, aber noch nicht breit in mehrere Wortfamilien übertragen.
- Der Kontrast Tasse/Tasche braucht im Unterricht eine klare Entscheidung, ob `sch` bereits getragen ist oder die Auswahl reduziert bleibt.
- Eine spätere größere Slice könnte 2–3 weitere Wortkerne nach demselben Muster ergänzen, aber erst nach erneutem Check gegen Kinderpfad-Überladung.

## Codex Review 2026-05-19
- Review-Block fachlich geprüft: Der ursprüngliche Stand war sicher, aber zu streng, weil alle vier Tasse-Aufgaben wegen des Distraktors `Tasche` nur lehrkraftgeführt waren.
- Korrigiert wurde die Profilpassung: Bedeutung, Silbenwiederholung und Satztransfer nutzen jetzt nur `Tasse` als Option und sind für ein Profil mit `t`, `a`, `s`, `e`, `tas`, `se` voll passend.
- Nur die echte Kontrastaufgabe `alpha49b-c-tasse-tasche-contrast` bleibt wegen `sch` in `Tasche` lehrkraftgeführt. Das ist didaktisch sinnvoll, weil der Kontrast bewusst gesetzt und nicht still als voll selbstständig freigegeben wird.
- Tests wurden entsprechend verschärft: Sie prüfen nun die exakten Optionen und die erwarteten Modi `full-choice`, `full-choice`, `teacher-led`, `full-choice`.
- `npm test`: bestanden, 150/150 Tests grün.
- `npm run build`: bestanden.
- Kein Browser-Smoke nötig, weil nur Inhaltsdaten, Requirements und Tests verändert wurden.
