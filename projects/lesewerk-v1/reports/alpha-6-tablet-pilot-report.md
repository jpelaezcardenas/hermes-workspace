# LeseWerk Alpha 6 - Tablet-Pilot und Bedienruhe

Stand: 2026-05-17

## Kurzfazit

Slice A wurde nach einem Hermes-Iterationslimit durch Codex abgeschlossen. Der Block war kein fachlicher Fehlschlag, sondern ein fehlender Handoff nach bereits erledigter Arbeit.

Ergebnis: bestanden mit kleiner CSS-Korrektur. Der Kinderpfad bricht auf schmaleren Tablet-/Desktopbreiten frueher einspaltig um und wirkt dadurch ruhiger.

## Geaendert

Datei:

- `src/styles.css`

Korrektur:

- Der Layout-Umbruch fuer den Kinderpfad wurde bei `max-width: 1100px` ergaenzt.
- `.learning-layout` wird dort einspaltig.
- `.diagnostic-card` bleibt vor der Lese-/Storyflaeche.
- `.support-grid` und `.next-choice-grid` bleiben zweispaltig, damit Touchziele gross bleiben und die Seite nicht zu lang wirkt.
- Der vorhandene `max-width: 920px`-Block blieb erhalten, weil Tests und bestehende Responsive-Regeln daran haengen.

## Verifikation

Ausgefuehrt im Projektpfad:

```bash
npm test
npm run build
```

Ergebnis:

- `npm test`: 32/32 Tests bestanden.
- `npm run build`: erfolgreich.

## Browser-Check

Frischer lokaler Build wurde ueber einen neuen Preview-Port geoeffnet:

```text
http://localhost:4198
```

Grund fuer neuen Port:

- Ein alter Hermes-Testserver auf `4197` antwortete mit `ERR_EMPTY_RESPONSE`.
- Fuer die Abnahme wurde deshalb ein frischer Preview-Server verwendet.

Geprueft im schmalen In-App-Browser:

- Header zeigt korrekt `LeseWerk Alpha 5 · lokale Demo`.
- Kinderpfad ist einspaltig.
- Supportauswahl bleibt sichtbar und bedienbar.
- Storyauswahl wird bei aktivem `Weniger Auswahl` auf zwei Storys reduziert.
- Keine sichtbaren Textueberlappungen im geprueften Pfad.
- Touchziele wirken ausreichend gross.

## Gepruefter Kinderpfad

Pfad:

1. Profil Gruen ausgewaehlt.
2. Bildhilfe aktiviert.
3. Gebaerden-Hinweis aktiviert.
4. Weniger Auswahl aktiviert.
5. Story lesen gewaehlt.
6. `Der Ball im Garten` angezeigt.
7. Konkreter Gebaerden-Hinweis sichtbar: `Zeige mit beiden Haenden rund: Ball rollen.`
8. Verstaendnisfrage `Was liegt im Garten?` mit `Ball` beantwortet.
9. Feedbackphase erreicht.
10. `Fertig` erreicht.

Sichtbar:

- `Heute passt vermutlich Story verstehen mit kurzer Frage.`
- `Gut gelesen.`
- `Du hast die wichtige Sache erkannt.`
- keine Score-, Timer-, Ranking-, Noten- oder Schamsprache.

## Gepruefter Lehrerpfad

Nach dem Kinderpfad wurde der Lehrerbereich geoeffnet.

Sichtbar:

- Profil: `Profil Gruen`
- Datenqualitaet: `eine Beobachtung - nur vorsichtige Einordnung`
- Situation: `Story: Der Ball im Garten`
- Hilfe: `Bildhilfe, Silbenfarben, Gebaerden-Hinweis, Weniger Auswahl`
- Handlung: `Story gelesen; Antwort: Ball. Gebaerden-Hinweis war verfuegbar.`
- Beobachtung: `Geste stuetzte das Lesen als textbasierter Handhinweis.`
- Vorschlag: `Heute passt vermutlich Story verstehen mit kurzer Frage.`
- Naechster Schritt: `Eine aehnliche Story mit nur einer neuen Schwierigkeit lesen.`

Der Reset-Button `Lokalen Demo-Stand zuruecksetzen` war sichtbar und eindeutig vorhanden.

## Pass-Liste

- Einspaltiger Tablet-/Narrow-Flow ist ruhiger als vorher.
- Storymodus bleibt trotz mehreren Hilfen bedienbar.
- Reduzierte Auswahl hilft sichtbar gegen Storylisten-Dichte.
- Lehreransicht ist fachlich korrekt, aber weiterhin textreich.
- Keine neue Lernlogik, kein neues Datenschutzrisiko, keine externen Assets.

## Rest-Risiken

1. Kein echter Tablet-Geraetetest, nur In-App-Browser mit schmalem Viewport.
2. Lehreransicht bleibt auf kleinen Displays textlastig und sollte in Slice B kompakter werden.
3. Der Storypfad wird bei vielen aktiven Hilfen vertikal lang; das ist akzeptabel, aber weiter zu beobachten.
4. Alte kaputte lokale Preview-Prozesse koennen Ports stoeren; frische Ports sind fuer Abnahmen verlaesslicher.

## Empfehlung fuer Slice B

Slice B sollte die Lehreransicht kompakter machen:

- oberer Kurzblock: Beobachtung, genutzte Hilfe, heutiger Vorschlag, naechster Schritt;
- lange Begruendung nachrangig oder einklappbar;
- Reset sichtbar, aber nicht dominierend;
- keine Diagnose-, Score- oder Stufensprache.
