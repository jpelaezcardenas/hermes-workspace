## Kurzfazit
Die Lernwerkstatt ist im aktuellen Stand deutlich näher an Beta 3.0 als in früheren Berichten: Der erste Screen beginnt kindorientiert mit „Heute spielen wir“, Farbauswahl, großen Spielkacheln und zurückgenommenem Lehrkraftbereich. Der geprüfte Spielraum „Mengen legen“ ist lokal öffnend, touchfreundlich und ohne Punkte/Timer/Ranking, erreicht aber noch nicht durchgehend Beta-3.0-Reife, weil Rückmeldung, Materialbrücke und mobile/tabletähnliche Verifikation noch nicht stark genug abgesichert sind. Der nächste Qualitätshebel ist kein neues Modul, sondern ein präziser Feinschliff des Mengen-Spielraums als Referenzbaustein.

## Qualitaetswertung
**7,5/10 für die Gesamt-App; 8/10-Tendenz für Startbildschirm und Grundfluss „Mengen legen“.**

Beta-3.0-Niveau ist **teilweise erreicht**, aber noch nicht belastbar für die ganze App. Erreicht sind: kindgerechter Start, große Kacheln, getrennte Lehrkraftlogik, keine 1-10-Skala im Schüler:innenmodus, kein Timer, kein Ranking, lokale Ausführung und ein eigener Spielraum. Noch nicht ausreichend belegt sind: schmale/tabletähnliche Breite, durchgehend eindeutiges Feedback nach jeder Handlung, echte lokale Symbol-/Materialassets statt Emoji/Platzhalter und ein Spielraum, der didaktisch-visuell als unterrichtsreifer Referenzbaustein trägt.

Geprüfte Evidenz in diesem Review:
- Kontext gelesen: `APP_KONZEPT.md`, `LERNKREISLAUF_MODELL.md`, `BETA_3_0_QUALITAETSSTANDARD.md`, aktuelle Ergebnis-/Reportdateien, `src/main.jsx`, `src/styles.css`, `package.json`.
- `npm run build`: **fehlgeschlagen** wegen bekanntem Rolldown/macOS-Native-Binding-Problem, nicht wegen sichtbarem App-Codefehler.
- `npm run build:esbuild`: **erfolgreich** (`dist/assets/main.js`, `dist/assets/main.css`, Build in 94ms).
- Lokal geöffnet über statischen Server: `http://127.0.0.1:4173/`.
- Sicht- und Interaktionscheck: Startseite sichtbar; „Mengen legen“ geöffnet; zwei Mal „Stein legen“ und Auswahl „2“ getestet; keine sichtbare Textüberlappung im geprüften Desktop-Ausschnitt; große Touchflächen sichtbar.
- Nicht geprüft: echter mobiler/tabletähnlicher Viewport, kompletter Durchlauf aller Module, echte Unterrichtssituation.

## Beta-3.0-Vergleich
- Below Beta 3.0:
  - Der primäre Vite-Build ist weiterhin durch das lokale Rolldown/macOS-Binding blockiert; der esbuild-Fallback funktioniert, aber das ist keine saubere Standard-Build-Baseline.
  - Der Mengen-Spielraum nutzt noch Platzhalter-/Emoji-/abstrakte Materiallogik; Beta-3.0-Ziel wären stärkere lokale Materialbilder/Symbole oder klarere gegenstandsnahe visuelle Anker.
  - Rückmeldung nach Auswahl ist ruhig und nicht beschämend, aber noch nicht maximal eindeutig als „Das ist passiert / nächster Schritt“ für basal unterstützte Lernende.
  - Mobile/tabletähnliche Breite wurde in diesem Review nicht geprüft; damit ist Mindeststandard Punkt 9 aus dem Beta-3.0-Dokument noch nicht belegt.
  - Die Gesamt-App trägt noch Spuren der Erwachsenen-/Beobachtungs-App: Lehrkraftfunktionen sind zwar eingeklappt/sekundär, aber im Dashboard weiterhin präsent.

- Equal to Beta 3.0:
  - Startseite führt kindorientiert: „Heute spielen wir“, Farbauswahl, große Profil-/Spielkacheln und sekundärer Lehrkraftbereich.
  - „Mengen legen“ hat einen eigenen Spielraum mit klarer Hauptaktion, A/B/C-Niveaus, Antippen als Hauptbedienung und großen Buttons.
  - Schüler:innen sehen keine 1-10-Skala, keine Diagnosesprache, keine Punkte, keine Bestenliste und keinen Timer.
  - Hilfe-, Pause-, Nochmal- und Weniger-Auswahl-Angebote sind sichtbar.
  - Lehrkraft-/Beobachtungslogik bleibt grundsätzlich getrennt und datensparsam.

- Better than Beta 3.0:
  - Die pädagogische Beobachtungslogik im Lehrkraftbereich ist fachlich stärker ausgearbeitet als ein reiner Spiele-Launcher: Hilfegrad, Transfer, Sicherheit, nächster Lernschritt und Datenschutzgrenzen sind konzeptuell klar.
  - Das lokale Datenschutzkonzept ist sehr stark: keine Cloud, keine Logins, keine echten Namen, keine Diagnosen als App-Output.
  - Die Verbindung von Spielhandlung und GE-Beobachtung ist fachlich vielversprechend, sofern sie nicht in den Schüler:innenmodus hineinrutscht.

## Staerken
1. **Kindorientierter Start ist sichtbar gelungen:** Der erste Kontakt wirkt nicht mehr wie ein reines Lehrkraft-Dashboard, sondern wie ein ruhiger Kinderstart.
2. **GE-Sicherheitslinien sind stabil:** keine Noten, kein Ranking, kein Timer, keine rote Fehlerlogik, keine 1-10-Skala im Schüler:innenmodus.
3. **Große Touchflächen im geprüften Mengen-Spielraum:** Zahlkarten, Hauptaktionen und Hilfen sind groß genug und klar voneinander getrennt.
4. **A/B/C-Zugänge sind vorhanden:** basal, unterstützt und erweitert sind technisch/inhaltlich angelegt und im Spielraum sichtbar.
5. **Lehrkraftnutzen bleibt hoch:** Beobachtung, Hilfegrad, Transfer, nächster Schritt und Export-/Planungslogik sind stärker als bei vielen reinen Lernspiel-Prototypen.

## Schwaechen
1. **Standard-Build ist nicht grün:** `npm run build` scheitert weiterhin am Rolldown/macOS-Binding. Für Review reicht der esbuild-Fallback, für produktivere Weiterarbeit ist das fragil.
2. **Mengen-Feedback ist noch nicht referenzreif:** Nach der Auswahl ist eine ruhige Rückmeldung sichtbar/markiert, aber der nächste Schritt könnte für basal unterstützte Lernende eindeutiger sein: „Passt. Jetzt: nochmal / anderes Material / fertig zeigen.“
3. **Materialbrücke ist zu abstrakt:** „Steine“ und Zahlkarten sind sinnvoll, aber visuell noch nicht stark genug als gegenstandsnahes GE-Materialsystem. Lokale Materialbilder oder klarere Objektkarten würden den Beta-3.0-Standard heben.
4. **Tablet-/Mobil-Evidenz fehlt in diesem Review:** Keine Aussage zu schmaler Breite, eventuellen Umbrüchen oder Touchabständen auf Tabletgröße.
5. **Gesamt-App bleibt teilweise erwachsenenzentriert:** Der Start ist besser, aber Dashboard-Karten und Lehrkraftlogik sind noch im gleichen Fluss sichtbar. Für Kinder ist das akzeptabel nur, weil der Lehrkraftbereich sekundär wirkt; vollständig konsequent ist es noch nicht.

## Naechster Weltklasse-Slice
**Nur den Spielraum „Mengen legen“ zum Beta-3.0-Referenzbaustein schärfen.**

Ziel dieses einen Slices: Kein neues Modul, keine neue Navigation, kein Dashboard-Umbau. Stattdessen den bestehenden Mengen-Spielraum so verbessern, dass er für basal/unterstützt/erweitert klarer wirkt: eindeutige Rückmeldekarte nach Auswahl, sichtbarer nächster Schritt, ruhige Material-/Objektlogik, echte Funktion von „Weniger Auswahl“, und danach Desktop plus schmale/tabletähnliche Breite testen. Dieser Slice adressiert den größten aktuellen Beta-3.0-Gap: ein wirklich hochwertiger, geprüfter Spielraum statt nur guter Startnavigation.

## Perfekter Folgeprompt
```text
/goal Bitte verbessere im Projekt `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt` ausschließlich den bestehenden Spielraum „Mengen legen“ als Beta-3.0-Referenzbaustein. Keine neuen Module, keine neue Hauptnavigation, keine Lehrkraft-Dashboard-Erweiterung.

Kontext/Skills: Nutze `lernwerkstatt-build-loop`, `lernwerkstatt-ge-sachsen-anhalt` und bei Usability-Prüfung `lernwerkstatt-testpilot`.

Ziel:
- Nach jeder Mengenwahl erscheint eine eindeutige, ruhige Rückmeldekarte mit: „Das hast du gemacht“, „Jetzt kannst du …“ und 2–3 großen nächsten Handlungen: Nochmal, anderes Material/mehr, fertig zeigen.
- „Weniger Auswahl“ muss tatsächlich die Auswahl reduzieren oder sichtbar erklären, was reduziert wird.
- Basal / unterstützt / erweitert sollen im Spielraum klarer unterscheidbar sein, ohne Score, Timer, Ranking oder rote Fehlerlogik.
- Die Materialhandlung soll gegenständlicher wirken: Steine/Matte/Zahlkarte visuell klarer, aber nur mit lokalen Platzhaltern oder CSS, keine externen Assets.
- Lehrkraft-Hinweis bleibt getrennt und darf beobachtbare Evidenz nennen: Hilfe genutzt, Menge gelegt, Auswahl getroffen, nächster kleiner Lernschritt.

Akzeptanzkriterien:
1. `npm run build` ausführen; wenn Rolldown/macOS-Binding scheitert, `npm run build:esbuild` nutzen und den Buildfehler dokumentieren.
2. Lokal öffnen und testen: Start → Mengen legen → zwei Steine legen → 2 wählen → Rückmeldekarte sichtbar → Nochmal funktioniert.
3. `Weniger Auswahl` testen und dokumentieren, welche sichtbare Wirkung es hat.
4. Desktop und schmale/tabletähnliche Breite prüfen: keine Textüberlappung, große Touchflächen.
5. Keine personenbezogenen Daten, keine Namen, keine Diagnosen, keine 1-10-Skala im Schüler:innenmodus.
6. Ergebnisbericht unter `reports/mengen-legen-beta3-slice-YYYY-MM-DD.md` schreiben mit: geändert, geöffnet, geprüft, Risiken, nächster kleinster Schritt.
```

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: Folgeprompt für den engen Slice „Mengen legen als Beta-3.0-Referenzbaustein“ ausführen lassen.
- CHRIS_ENTSCHEIDET: Ob vor weiterer App-Arbeit das lokale Rolldown/macOS-Buildproblem durch Dependency-Neuinstallation behoben werden soll.
- BEOBACHTEN: Ob zukünftige Spielräume dieselbe klare Rückmelde-/Hilfelogik wie der verbesserte Mengen-Spielraum übernehmen können.
- SPAETER: Lokale geprüfte Symbol-/Materialassets statt Emoji/Platzhalter planen.
- BLOCKIERT: Primärer `npm run build` ist durch Rolldown/macOS-Native-Binding blockiert; Fallback `npm run build:esbuild` funktioniert.
- NICHT_TUN: Jetzt weitere neue Module, Dashboards oder Exportfunktionen hinzufügen, bevor ein Spielraum wirklich Beta-3.0-reif und mobil geprüft ist.
- Naechste kleinste Aktion: Den Folgeprompt als separaten Coder-Slice starten.
- Beleg / Datei: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/reports/lernwerkstatt-quality-2026-05-25.md`
