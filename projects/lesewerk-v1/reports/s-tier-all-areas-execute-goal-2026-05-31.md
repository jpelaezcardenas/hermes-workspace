# S-Tier All-Areas Execute Goal - 2026-05-31

## Oberziel

Erhoehe LeseWerk V1 in Richtung echtes S-Tier App-Feeling fuer Schuelerinnen und Schueler im Foerderschwerpunkt Geistige Entwicklung, ohne die vorhandene stabile Struktur zu zerstoeren. Pruefe alle relevanten Bereiche, priorisiere sauber und setze nur kleine, verifizierbare High-Impact-Slices um.

## Kontext

- Projekt: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`
- Preview: `http://127.0.0.1:5174/`
- Aktueller Stand: Tests und Build laufen; Lese-Mission aus dem Materialkorb funktioniert; lokale Symbolkarten fuer Stift, Heft, Buch und weitere Alltagswoerter sind vorhanden.
- Wichtigste Memory-Regel: App-Feeling kann nicht nur durch Tests bewertet werden. Nach Aenderungen ist eine echte Browser-Sichtpruefung Pflicht.

## Nicht verhandelbare Regeln

1. Keine personenbezogenen Daten, keine Cloud-Abhaengigkeit, keine externen Bild-/Metacom-Assets ohne klares spaeteres Asset-Konzept.
2. Keine Timer, Scores, Noten, Ranking, Defizit-Sprache oder Diagnose-Labels im Kindermodus.
3. Keine grosse Umstrukturierung von `App.tsx`, wenn ein kleiner Slice reicht.
4. Keine Wiederholung grosser Prompts, wenn ein Task blockiert. Dann: Ursache dokumentieren, kleiner schneiden, naechster sicherer Schritt.
5. Jede Umsetzung braucht mindestens: `npm test -- --run`, `npm run build`, Browser-Smoke.
6. Kindermodus muss wie ein Spielraum wirken: klare grosse Handlung, wenige Worte, sichtbarer naechster Schritt, ruhige Hilfe, Abschluss.
7. Lehrkraftmodus darf fachlich dichter sein, muss aber scanbar und handlungsorientiert bleiben.

## Zu pruefende Bereiche

### A. Kinderpfad und erste Orientierung

- Ist fuer ein Kind sofort klar: Wo druecke ich? Was passiert jetzt? Was ist als Naechstes dran?
- Gibt es zu viel sichtbare Struktur, bevor das Kind wirklich im Spiel ist?
- Wird der Uebergang Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte koerperlich/spielerisch fuehlbar oder nur erklaert?

### B. Vollbild-/FocusGameShell-Appgefuehl

- Welche Spielwege nutzen bereits den Fokusrahmen?
- Welche wichtigen Wege fallen noch zurueck in Webapp-/Dashboard-Feeling?
- Muss ein universeller "Spiel starten"-Pattern fuer alle Kinderaktivitaeten entstehen?
- Sind die primaeren Buttons in schmaler Breite sichtbar und sinnvoll erreichbar?

### C. Lese-Mission aus dem Materialkorb

- Ist die Mission fuer alle Materialkorb-Woerter visuell hochwertig genug?
- Sind die lokalen Symbolkarten unterscheidbar, ruhig und kindgerecht?
- Ist die Progression Wort fuer Wort klar?
- Braucht die Mission mehr "Spielhandlung" statt nur Karte + Weiter?

### D. Mini-Reisen / Wortfamilien

- Haben Mama, Sofa, Tasse, Lama, Apfel, Tisch, Heft usw. ein einheitliches Premium-Muster?
- Gibt es Ausreisser, die noch zu textlastig, technisch oder unfertig wirken?
- Sind Bild, Silbe, Wort, Satz und Mini-Geschichte jeweils als eigene Lernhandlung erkennbar?

### E. Lesegeschichten und Satzebene

- Sind Mini-Geschichten sichtbar auffindbar?
- Sind die Geschichten einfach, motivierend und auf GE-Lernende angepasst?
- Gibt es ausreichend Bild-/Symbolanker und Antwortmoeglichkeiten ohne Ueberforderung?

### F. Diagnostik / Beobachtung / Entwicklung

- Bleibt alles beobachtend, lokal und nicht bewertend?
- Gibt es eine brauchbare Bruecke: Beobachtung -> naechster Tagespfad -> Materialkorb -> Spielraum?
- Sind Entwicklungsstufen fuer Lehrkraefte steuerbar, ohne dass Kinder Stufen/Defizite sehen?

### G. Wortschatz und bekannte Buchstaben

- Ist der Wortschatz alltagsnah genug fuer GE-Schueler?
- Sind bekannte Buchstaben/Grapheme sinnvoll in der Auswahl beruecksichtigt?
- Gibt es genug Woerter aus Schule, Zuhause, Koerper, Essen, Spiel, Kleidung, Wege/Bus, Materialien?
- Werden schwere Woerter sinnvoll gesperrt oder als Lehrkraft-Review markiert?

### H. Design, Emotion und Motivation

- Wirkt die App wie ein liebevoller Lernspielraum oder noch wie eine Arbeitsoberflaeche?
- Gibt es eine klare Figur-/Helferlogik (Neva), ohne zu viel Text?
- Sind Farben, Abstaende, Karten, Symbole und Buttons konsistent?
- Ist die App auf Tablet und schmalem Bildschirm kindgerecht bedienbar?

## Erwarteter Ablauf fuer Hermes

1. Lies diese Datei und die relevanten aktuellen Reports/Memory-Regeln.
2. Pruefe den aktuellen Quellstand mit Fokus auf `src/App.tsx`, `src/styles.css`, `src/lesewerk-content.mjs` und `tests/lesewerk-content.test.mjs`.
3. Erstelle zuerst eine All-Areas-Qualitaetsmatrix als Report:
   - Bereich
   - aktueller Stand
   - Risiko
   - S-Tier-Luecke
   - kleinster sicherer naechster Slice
4. Entscheide danach maximal einen High-Impact-Code-Slice fuer diese Runde.
5. Setze nur diesen Slice um, wenn er klein, testbar und reversibel ist.
6. Erweitere Tests gezielt.
7. Fuehre `npm test -- --run` und `npm run build` aus.
8. Fuehre Browser-Smoke auf `http://127.0.0.1:5174/` durch:
   - Startseite
   - Kinderpfad
   - Lehrkraft
   - Materialkorb -> Lese-Mission
   - mindestens ein Mini-Reise-Weg
   - schmale Breite soweit moeglich
9. Schreibe Abschlussreport:
   - Was wurde geprueft?
   - Was wurde umgesetzt?
   - Welche Tests/Build/Browser-Pruefung wurden gemacht?
   - Was bleibt offen?
   - Welcher naechste Slice ist am sinnvollsten?

## Akzeptanzkriterien

- Es entsteht ein Report unter `reports/s-tier-all-areas-quality-matrix-2026-05-31.md`.
- Falls Code geaendert wird, gibt es einen passenden Implementation-Report.
- Kein Kindermodus zeigt Diagnose-/Score-/Timer-/Ranking-Sprache.
- Build und Tests laufen nach der Umsetzung.
- Browser-Smoke wird dokumentiert.
- Der naechste Schritt ist kleiner und konkreter als "alles verbessern".

## Empfehlung fuer diese Runde

Bevorzugter High-Impact-Slice: Eine klarere universelle Kinder-Spielraum-Startlogik fuer alle wichtigen Kinderwege, sodass die App nach dem Einstieg weniger wie eine Webseite und mehr wie ein eigenstaendiges Spiel wirkt. Wenn dieser Slice zu gross ist, nur die Lese-Mission als Referenzmuster weiter veredeln und daraus ein Pattern fuer die naechsten Wege ableiten.
