# Mega Expansion Slice C - Bus/Buch Mini-Reisen Code Report

Stand: 2026-05-26

## Ziel

Der erste grosse, aber kontrollierte Inhaltsausbau wurde umgesetzt: LeseWerk hat jetzt zusaetzlich zu Mama, Sofa, Tasse, Ball und Lama zwei neue Mini-Reisen fuer `Bus` und `Buch`.

## Umgesetzt

- Neue Wortfamilien:
  - `word-family-bus`
  - `word-family-buch`
- Neue fuenfstufige Mini-Reisen:
  - Bus: Bild -> Silbe/Wort -> Wort -> Satz -> Mini-Geschichte
  - Buch: Bild -> Silbe/Wort -> Wort -> Satz -> Mini-Geschichte
- Neue Satzspuren:
  - `Der Bus fährt.`
  - `Das Buch ist da.`
- Neue Story-Auswahl:
  - Bus gegen Ball als klare Handlungsunterscheidung.
  - Buch gegen Bus als schulnaher/handlungsnaher Kontrast.
- Neue lokale CSS-Symbole:
  - Bus-Symbol mit Fahrzeugkoerper, Fenstern und Raedern.
  - Buch-Symbol mit Cover, Seiten und Buchruecken.
- Neue Readiness-/Rationale-Eintraege fuer Lehrkraftbereich.
- Profiloptionen erweitert:
  - Silben/Wortmuster `bus`, `buch`.
- Tests erweitert, damit Bus/Buch in Rationale, Readiness, Story-Symbolen und Silbenlogik geprueft werden.

## Wichtige Korrektur

Der Worker hatte zwischenzeitlich Bus/Buch in der Auswahlkachel noch mit dem Text `Ball` angezeigt. Das wurde korrigiert: Die Kachel zeigt jetzt dynamisch das jeweilige Ankerwort.

## Verifikation

- `npm test`: gruen, 228/228 Tests bestanden.
- `npm run build`: gruen.

## Bewertung

Der Slice ist gelungen, weil er die Wortschatzbasis deutlich erweitert, ohne den Kindermodus breit zu ueberladen. Bus und Buch sind beide alltagsnah und visuell gut fuehrbar. Buch bleibt didaktisch sensibler, weil `ch` nicht als isolierte einfache Einheit behandelt werden sollte; die Texte fuehren es bewusst als Wortmuster.

## Naechster sinnvoller Slice

Als naechstes nicht sofort viele weitere Woerter einbauen. Besser:

1. Mobile/visuelle Pruefung von Bus/Buch.
2. Danach `Apfel` als Essens-Mini-Reise.
3. Danach Architektur-Slice fuer eine kleine zentrale Definition, damit neue Mini-Reisen weniger dupliziert werden muessen.
