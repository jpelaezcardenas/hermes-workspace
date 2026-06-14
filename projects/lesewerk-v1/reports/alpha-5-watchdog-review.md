# LeseWerk Alpha 5 – Watchdog Review und Alpha 6 Vorschlag

Stand: 2026-05-16

## Kurzfazit

Alpha 5 ist nach finalem Watchdog bestanden. Tests und Build laufen, der frische lokale Browserpfad funktioniert, die adaptive Platzierung bleibt vorsichtig formuliert und die UK-/Gebärden-Hinweise erscheinen als textbasierte Lesestütze ohne geschützte Assets.

Entscheidung: **Alpha 5 bestanden. Weiterbauen.**

Kleine Korrektur im Watchdog: Der sichtbare Header wurde von `LeseWerk Alpha 4 · lokale Demo` auf `LeseWerk Alpha 5 · lokale Demo` aktualisiert, weil dies bereits im Didaktik-/UX-Review als einziger Vor-Watchdog-Fix markiert war.

## Geprüfte Reports

- `reports/alpha-5-adaptive-quality-blueprint.md`
- `reports/alpha-5-adaptive-placement-report.md`
- `reports/alpha-5-story-expansion-report.md`
- `reports/alpha-5-uk-gesture-support-report.md`
- `reports/alpha-5-didaktik-ux-review.md`
- `reports/alpha-4-watchdog-review.md`

## Technische Verifikation

Ausgeführt im Projektpfad `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 32/32 Tests bestanden.
- `npm run build`: erfolgreich.

## Frischer Browsercheck

Lokaler Build geöffnet über:

```text
http://localhost:4197/index.html?fresh=alpha5b
```

Zusätzlich wurde wegen Browser-Cache ein Hard-Reload ausgeführt. Danach war der Header sichtbar korrekt:

```text
LESEWERK ALPHA 5 · LOKALE DEMO
```

Browser-Konsole:

- keine JavaScript-Fehler beobachtet.

## Geprüfter Kinderpfad

Pfad:

1. Profil Grün gewählt.
2. Kinderpfad geöffnet.
3. `Gebärden-Hinweis` aktiviert.
4. `Weniger Auswahl` aktiviert.
5. `Story lesen` gewählt.
6. Mini-Story `Der Ball im Garten` geöffnet.
7. Verständnisfrage `Was liegt im Garten?` beantwortet mit `Ball`.
8. Feedbackphase erreicht.
9. `Fertig` war vorhanden und der Ablauf konnte abgeschlossen werden.

Sichtbares Ergebnis nach der Antwort:

- adaptive Kinderempfehlung: `Heute passt vermutlich Story verstehen mit kurzer Frage.`
- ruhiges Feedback: `Gut gelesen.`
- Storyfeedback: `Du hast die wichtige Sache erkannt.`
- keine Score-, Timer-, Ranking-, Noten- oder Schamsprache sichtbar.

## Geprüfter Lehrerpfad

Nach dem Kinderpfad wurde der Lehrerbereich geöffnet.

Sichtbar geprüft:

- Profil: `Profil Grün`
- Datenqualität: `eine Beobachtung – nur vorsichtige Einordnung`
- Situation: `Story: Der Ball im Garten`
- Hilfe: `Silbenfarben, Gebärden-Hinweis, Weniger Auswahl`
- Handlung: `Story gelesen; Antwort: Ball. Gebärden-Hinweis war verfügbar.`
- Beobachtung: `Geste stützte das Lesen als textbasierter Handhinweis.`
- Vorschlag: `Heute passt vermutlich Story verstehen mit kurzer Frage.`
- Einordnung: `heute passend, nicht endgültig`
- Begründung: enthält Silbenfarben, Gebärden-Hinweis, weniger Auswahl und Storyfrage.
- Nächster Schritt: `Eine ähnliche Story mit nur einer neuen Schwierigkeit lesen.`
- Reset: `Lokalen Demo-Stand zurücksetzen` geprüft; danach vorbereitende Ansicht ohne Beobachtung sichtbar.

## Sicherheits- und Datenschutzprüfung

Code-/Produktbereich geprüft: `src`, `tests`, `package.json`, `index.html`.

Bestanden:

- keine `ge-lernwerkstatt`-Dependency oder Import im Code-/Produktbereich;
- keine realen Schülerdaten oder Namen im Code-/Produktbereich;
- kein Login, keine Authentifizierung, kein Account, kein Cloud-/Upload-System im Code-/Produktbereich;
- keine geschützten Symbol-/Assetsets wie METACOM, Boardmaker, Widgit oder ARASAAC im Code-/Produktbereich;
- keine sichtbare Diagnose-, Noten-, Score-, Ranking-, Timer- oder Schamsprache im Code-/Produktbereich;
- Treffer in Reports sind historische Planungs-/Prüftexte oder Negativlisten, keine aktive Produktlogik.

## Fachliche Bewertung

### Adaptive Platzierung

Bestanden. Die App formuliert den Vorschlag als vorsichtige pädagogische Orientierung, nicht als Diagnose oder Leistungseinstufung. Die Datenqualität wird sichtbar begrenzt.

### Story-Erweiterung

Bestanden. Die Storys sind kurz, alltagsnah und mit klarer Verständnisfrage angelegt. Die Oberfläche wirkt im Browserpfad weiterhin nutzbar, aber ein echter Tablet-Pilot bleibt notwendig.

### UK-/Gebärden-Hinweise

Bestanden. Der Hinweis wird als textbasierte Lesestütze dokumentiert und nicht als Ersatz für Lesen oder als geschütztes Asset dargestellt.

### Lehrerbereich

Bestanden mit Beobachtungsbedarf. Die Inhalte sind fachlich hilfreich, können im echten Unterricht aber noch zu textreich sein. Für Alpha 6 sollte die Planungs-/Evidenzsicht kompakter und druckbarer werden.

## Kleine Risiken

- Kein echter Tablet-Gerätetest, nur lokaler Browserpfad.
- Kein Praxistest mit Kindern; die adaptive Logik ist deshalb nur als Pilotvorschlag zu verstehen.
- Lehrertexte sind fachlich sauber, aber für kleine Displays und hektische Klassensituationen wahrscheinlich noch zu lang.
- Die Gebärdenhinweise sind einfache Textimpulse, keine fachlich geprüfte Gebärdensammlung.
- Reports enthalten alte Beispielnamen wie `Mia` in historischen Planungsdokumenten; im aktiven Code-/Produktbereich wurden keine realen Namen gefunden.

## Alpha-6-Empfehlung

Alpha 6 sollte nicht sofort neue Lernlogik hinzufügen. Der nächste Qualitätssprung liegt in Pilotfähigkeit, Lehrerplanung und Barrierefreiheit.

### Slice A: Manueller Tablet-Pilot und Bedienruhe

Ziel:
Den bestehenden Alpha-5-Stand auf Tablet-/kleinem Viewport realistisch durchklicken.

Akzeptanzkriterien:

- Kinderpfad vollständig mit Touch-orientierter Bedienung prüfen;
- Profilwahl, Hilfen, Storyauswahl, Antwort, Feedback, Fertig, Nochmal, Leichter, Weiter, Lehrkraft und Reset prüfen;
- keine Überlappungen, zu kleinen Touchziele oder verwirrenden Zustände;
- Bericht mit konkreten Screens/Notizen und maximal 3 Fixes.

### Slice B: Stärkere Lehrer-Planungsansicht

Ziel:
Aus der aktuellen Evidenz eine kompakte Planungsansicht machen, die im Unterricht schnell lesbar ist.

Akzeptanzkriterien:

- Kurzzeilen: Beobachtung, genutzte Hilfe, heutiger Vorschlag, nächster Schritt;
- Langbegründung einklappbar oder deutlich nachrangig;
- keine Diagnosen, Scores oder Stufen;
- Reset bleibt eindeutig und datensparsam.

### Slice C: Datenschutzsichere Druck-/Export-Vorschau nur lokal

Ziel:
Eine lokale, anonyme Druckansicht für Lehrkraftnotizen prüfen, ohne Speicherung sensibler Daten.

Akzeptanzkriterien:

- nur aktueller anonymer Stand;
- keine Namen, keine Diagnosen, keine Cloud, kein automatischer Upload;
- klarer Hinweis `lokale Vorschau`;
- Browser-Print-Preview oder statische Druckansicht, kein Serverexport.

### Slice D: Vollständiger Accessibility-Pass

Ziel:
Grundlegende Zugänglichkeit und Bedienbarkeit absichern.

Akzeptanzkriterien:

- Tastaturbedienung für Kernpfade;
- Fokuszustände sichtbar;
- sinnvolle ARIA-/Label-Struktur;
- Kontraste und Schriftgrößen geprüft;
- keine Bedienung nur über Farbe oder Maus.

## Entscheidung

Alpha 5 kann als abgeschlossener Zwischenstand gelten. Der nächste sinnvolle Schritt ist Alpha 6 als Pilot- und Bedienqualitätsrunde, nicht als weitere Funktionsausweitung.
