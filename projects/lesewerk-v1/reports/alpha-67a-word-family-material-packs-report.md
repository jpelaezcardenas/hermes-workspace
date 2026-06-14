# Alpha 67A - Wortfamilien-Materialpakete

## Ergebnis

Alpha 67A ist umgesetzt. Die App kann jetzt aus bekannten Graphemen und Silben kleine Materialpakete fuer vorhandene Wortfamilien ableiten. Das ist der erste echte Content-Motor: nicht mehr nur einzelne Wortpost-Karten, sondern eine ruhige Lehrkraft-Vorschau von Bild ueber Silbe und Wort bis Satz und Mini-Geschichte.

## Geaendert

- `src/lesewerk-content.mjs`
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs`

## Umgesetzt

- Neuer Helper `getProfileWordFamilyMaterialPacks(profile, tasks, options)`.
- Maximal drei Pakete:
  - `Mama-Familie` bei `m/a/ma`
  - `Sofa-Familie` bei `m/a/s/o/f` und `ma/so/fa`
  - `Tasse-Familie` nur bei passenden `t/a/s/e` plus `tas/se` und Satzbereitschaft
- Jedes Paket enthaelt:
  - `id`
  - `title`
  - `anchorWord`
  - `stageFit`
  - `knownUnits`
  - `materialSteps`
  - `taskIds`
  - `taskRefs`
  - `teacherUse`
  - `childSafeSummary`
  - `localOnly: true`
  - `persistent: false`
- Materialschritte bleiben in Reihenfolge:
  - Bild
  - Silbe
  - Wort
  - Satz
  - Mini-Geschichte
- Lehrkraftansicht zeigt nahe der Wortpost den Abschnitt `Materialpakete aus bekannten Einheiten`.
- Kindmodus wurde nicht erweitert und bleibt frei von Materialpaket-/Lehrkrafttexten.

## Verifikation

- `npm test -- --run`: 174/174 Tests bestanden.
- `npm run build`: bestanden.
- Desktop-Smoke ueber `http://127.0.0.1:5198/`:
  - Startprofil zeigt nur `Mama-Familie`.
  - `Sofa-Pfad` zeigt `Mama-Familie` und `Sofa-Familie`.
  - `Satz bereit` zeigt `Mama-Familie`, `Sofa-Familie`, `Tasse-Familie`.
  - Wortpost startet im Kindmodus.
  - Kindmodus enthaelt keine Materialpaket-/Lehrkrafttexte.
  - Kein horizontaler Overflow.
- Mobile-Smoke 390px:
  - Materialpakete sichtbar und umbrechend.
  - `Satz bereit` zeigt drei Pakete.
  - Kein horizontaler Overflow.
- Screenshots:
  - `reports/smoke/alpha67a-material-packs-desktop.png`
  - `reports/smoke/alpha67a-material-packs-mobile.png`

## Qualitaetseinschaetzung

Das ist ein echter inhaltlicher Schritt nach vorn. Die App kann jetzt profilnah zeigen, welche Wortfamilie fachlich gerade traegt und welche Materialfolge daraus entsteht. Besonders stark ist, dass vorhandene Aufgaben genutzt werden und der Kindmodus nicht zusaetzlich belastet wird.

## Restluecken

- Die Pakete sind noch Lehrkraft-Vorschau, keine eigene spielbare Lernreise.
- Die Materialtexte sind funktional, aber noch nicht final als hochwertige Unterrichtskarten gestaltet.
- Es gibt noch keine Mengensteuerung pro Paket, z. B. 3 Bildaufgaben, 3 Silbenaufgaben, 3 Satzbruecken.

## Naechster sinnvoller Slice

Alpha 67B sollte aus einem einzelnen Paket eine spielbare Mini-Lernreise machen. Empfehlung: `Mama-Familie` als sicherstes Paket nehmen und daraus eine kleine Sequenz bauen: Bild ansehen, Silbe lesen, Wort legen, Satz lesen, Mini-Geschichte verstehen. Danach kann dasselbe Pattern fuer Sofa und Tasse wiederverwendet werden.
