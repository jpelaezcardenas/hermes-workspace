# Alpha 14 Slice A – Self-gap audit and pilot blueprint

Datum: 2026-05-17
Status: Blueprint erstellt, keine Codeänderungen

## Kurzfazit

LeseWerk ist nach Alpha 13 inhaltlich und technisch stabil genug, um einen ersten sehr kleinen lokalen Unterrichtspilot vorzubereiten. Für einen echten 10–15-Minuten-GE-Pilot ist die App aber noch nicht sauber genug gerahmt: Die sichtbare Versionssprache ist veraltet, die Lehrkraft bekommt noch keine kompakte Vorher/Während/Nachher-Checkliste, und die Grenze zwischen Demo, vorsichtiger Beobachtung und späterer Produktreife muss klarer benannt werden.

Der sichere Alpha-14-Scope ist daher kein neues Aufgabenpaket und keine neue Diagnostik, sondern eine kleine Pilot-Readiness-Schärfung: Versionsklarheit, kurze Lehrer-Onboarding-Karte, kompakte Pilot-Checkliste und Tests für genau diese Texte/Grenzen.

## Geprüfte Grundlagen

Gelesen und gegen die aktuelle App-Situation gespiegelt:

- `reports/alpha-14-goal-prompt.md`
- `reports/product-spec.md`
- `reports/alpha-13-watchdog-review.md`
- `reports/alpha-13-content-audit.md`
- `reports/alpha-13-content-refinement-report.md`
- `reports/alpha-13-ge-content-review.md`
- `src/App.tsx`
- `src/styles.css`
- `src/lesewerk-content.mjs`

Nicht ausgeführt in Slice A: `npm test`, `npm run build`, Browsercheck. Diese Slice ist laut Auftrag eine Vorab-Audit-/Blueprint-Slice ohne Codeänderungen.

## Aktueller Stand aus der Selbstprüfung

### Was schon tragfähig ist

- 48 Lernaufgaben über Level A/B/C und 24 Story-Pfade sind vorhanden und nach Alpha 13 didaktisch geschärft.
- Kinderpfad ist grundsätzlich ruhig: anonymes Profil, Hilfen, Tagesweg, Lesekarte, Feedbackauswahl und Abschluss.
- Keine echten Namen, keine Diagnosen, keine Cloud-/Upload-Logik, keine externen Bild-URLs oder geschützten Symbolpakete erkennbar.
- Lokale Symbolhilfen sind als Platzhalter markiert und nicht als lizenzierte Symbole behauptet.
- Lehrerbereich enthält bereits Tagesweg-Wahl, vorsichtigen Vorschlag, 10–15-Minuten-Pilot, anonyme Beobachtungskarte und lokale Druckvorschau.
- Alpha-13-Watchdog bestätigte Tests, Build, Browsercheck und Datenschutzscan ohne Blocker.

### Was noch nicht pilotklar genug ist

- Der Hero nennt sichtbar noch `LeseWerk Alpha 12 · lokale Demo`. Das ist für Alpha 14 stale und kann Lehrkräfte verwirren.
- Die vorhandene Pilot-Karte ist brauchbar, aber noch zu knapp: Sie sagt, was zu tun ist, aber noch zu wenig, was vorher vorbereitet wird, was währenddessen beobachtbar ist und was ausdrücklich nicht interpretiert/gespeichert werden darf.
- Die erste Lehrerorientierung ist funktional, aber für eine fremde Lehrkraft noch nicht selbsterklärend genug: Tagesweg, Vorschlag, Beobachtungskarte und Druckvorschau sind mehrere Bereiche; die Reihenfolge „erst vorbereiten, dann Kind lesen lassen, dann vorsichtig notieren“ sollte stärker sichtbar werden.
- Der Kinderpfad startet zwar ruhig, enthält aber auf einem Bildschirm Profil, Hilfen, Tagesweg, Bibliothek, Lesekarte und Feedbacklogik. Für einen ersten Pilot braucht die Lehrkraft die Möglichkeit, den Weg bewusst klein zu halten und die Kinderansicht nicht durch zu viele Optionen zu überfrachten.
- Sellable Quality ist klar noch nicht erreicht: keine validierte Symbol-/Assetstrategie, keine echte Tablet-/Barrierefreiheitsprüfung mit Kindern, keine Lizenz-/Datenschutzdokumentation für externe Nutzung, keine Nutzerinterviews, kein belastbarer Unterrichtsnachweis.

## Gap-Klassifikation

### Must before pilot

Diese Punkte sollten vor einem ersten 10–15-Minuten-Pilot erledigt werden. Ohne sie ist der Pilot nicht zwingend gefährlich, aber unnötig unklar oder missverständlich.

1. Sichtbare Versions- und Produktklarheit
- Fundstelle: `src/App.tsx`, Hero-Eyebrow `LeseWerk Alpha 12 · lokale Demo`.
- Risiko: Veraltete Alpha-Sprache wirkt unprofessionell und kann Berichte/Handoffs widersprüchlich machen.
- Erwartete Lösung: neutrale aktuelle Demo-Sprache, z. B. `LeseWerk · lokaler Pilot-Demo-Stand` oder `Alpha 14 · lokaler Pilot-Demo-Stand`.
- Grenze: Keine Marketingclaims wie „pilotbereit“, „validiert“ oder „einsatzfertig“ als Produktversprechen.

2. Kompakte Pilot-Checkliste für Lehrkräfte
- Fundstelle: vorhandene Karte `10–15-Minuten-Pilot` ist gut, aber noch nicht vollständig genug.
- Muss enthalten:
  - Gerät lokal öffnen / Browser bereit;
  - anonymes Profil wählen;
  - eine Hilfe sichtbar lassen;
  - höchstens zwei bis vier Karten nutzen;
  - Start/Abbruch ruhig erlauben;
  - nur sichtbare Signale notieren;
  - keine Diagnose, keine Bewertung, keine echten Namen;
  - nach 10–15 Minuten bewusst beenden.
- Risiko: Ohne Checkliste wird aus dem Pilot schnell ein unscharfer Test mit zu vielen Deutungen.

3. Kurzes Lehrer-Onboarding vor der ersten Nutzung
- Fundstelle: Lehrerbereich hat Funktionen, aber noch keinen klaren „So nutzt du es heute“-Block.
- Muss klären:
  - Ziel: kurzer lokaler Lesemoment, kein Test;
  - Beobachtung: Hilfe gewählt, Wiederholung, reduzierte Auswahl, Stopp, ruhiges Weitergehen;
  - Interpretation: nur vorsichtiger nächster pädagogischer Schritt;
  - Daten: lokal/anonym, nicht als Förderplan-Akte ohne menschliche Prüfung übernehmen.
- Risiko: Lehrerbereich wirkt sonst wie ein Diagnostik- oder Auswertungstool, obwohl er nur eine vorsichtige Beobachtungshilfe sein soll.

4. Datenschutz- und Nicht-Diagnostik-Hinweis schlank, aber sichtbar halten
- Fundstelle: Datenschutz-Hinweise sind vorhanden, verteilt und teils lang.
- Erwartete Lösung: Ein kurzer, gut sichtbarer Pilot-Hinweis reicht; längere Hinweise dürfen in Details bleiben.
- Risiko: Zu wenig Hinweis = falsche Sicherheit; zu viel Hinweis = App wirkt wie ein Datenschutztext statt Lernumgebung.

5. Tests für Pilot-Readiness-Texte und Grenzen
- Fundstelle: `tests/lesewerk-content.test.mjs` schützt Content; sichtbare UI-/Versionstexte sind wahrscheinlich noch nicht gezielt abgesichert.
- Erwartete Lösung: sehr kleine Tests oder Prüfungen, die stale `Alpha 12`, verbotene Claims und Pilot-Checklisten-Kernwörter abfangen.
- Risiko: Versions-/Sicherheitsgrenzen kippen in späteren Slices wieder unbemerkt.

### Should before wider use

Diese Punkte müssen nicht zwingend vor einem einzelnen lokalen Pilot mit Chris passieren, sollten aber vor wiederholtem Einsatz, Kollegiumsweitergabe oder externem Test geklärt werden.

1. Tablet-/Touchprüfung mit echten Geräten
- Die CSS-Struktur wirkt responsive, aber für GE-Praxis zählen reale Touchgröße, Abstand, Lesbarkeit, Scrolllast und motorische Fehlertoleranz.
- Vor breiterer Nutzung: iPad/Tablet, kleines Laptopdisplay und ggf. Beamer prüfen.

2. Reduzierter Kinder-Erstfluss
- Der Kinderpfad ist freundlich, aber noch relativ funktionsreich.
- Vor breiterer Nutzung sollte geprüft werden, ob „Profil wählen → zwei Karten lesen → fertig“ stärker als Primärweg sichtbar wird und die Bibliothek wirklich sekundär bleibt.

3. Ausdruck-/Dokumentationsgrenze sauberer formulieren
- Die lokale Druckvorschau ist praktisch, kann aber zur pseudo-offiziellen Dokumentation werden.
- Vor breiterer Nutzung braucht sie eine sehr klare Überschrift: Arbeitsnotiz / lokale Beobachtung / keine Diagnose / keine personenbezogenen Daten.

4. Didaktische Progression über mehrere Sitzungen
- Alpha 13 sichert eine gute erste Contentbasis.
- Für wiederholte Nutzung fehlen aber noch belastbare Sequenzen: Was nach Sitzung 1, 2, 3? Welche Variation ohne Überforderung?

5. Kollegiumsverständliche Kurzanleitung
- Eine Lehrkraft außerhalb des Projektkontexts braucht eine Ein-Seiten-Anleitung: Zielgruppe, Start, Beobachtung, Abbruch, Datenschutz, Grenzen.
- Das kann später als `reports/`-Dokument oder App-interner Details-Block entstehen.

6. Sprachliche Restfeinschliffe
- Aus Alpha 13 bleiben Minor Notes zu ähnlichen Feedback-/Next-Step-Mustern.
- Nicht pilotblockierend, aber für wiederholte Nutzung und Produktgefühl relevant.

7. Asset-/Symbolstrategie
- Lokale Platzhalter sind für Demo sicher.
- Für externe Weitergabe braucht es eine klare lizenzierte Symbolstrategie oder bewusst abstrakte, eigene Symbolik mit Dokumentation.

### Later / not now

Diese Punkte sind wichtig für ein später verkaufbares oder breiter nutzbares Produkt, gehören aber nicht in Alpha 14.

1. Kein breites Diagnostiksystem
- Keine automatischen Level, keine normorientierte Auswertung, keine Förderdiagnose.
- Später höchstens als pädagogisch vorsichtige Verlaufsnotiz mit menschlicher Prüfung.

2. Keine Schülerverwaltung, Logins, Cloud oder Datenbank
- Für den ersten Pilot unnötig und datenschutzrechtlich riskant.
- Lokale anonyme Demo-Profile bleiben ausreichend.

3. Kein Export-/Upload-/Synchronisationssystem
- Druckvorschau lokal ist als Demo okay.
- Dateiexport, Cloud, PDF-Sammlung oder Transfer in Schülerakten ist nicht Alpha-14-Scope.

4. Kein neues großes Contentpaket
- Die vorhandenen 48 Aufgaben / 24 Stories reichen für den Pilot und für Pilot-Readiness-Prüfung.
- Mehr Inhalt würde den Fokus verschieben und erneut oversized werden.

5. Keine Marketingseite und keine Sellable-Quality-Behauptung
- Das Produkt ist nicht verkaufsbereit.
- Vor Vermarktung fehlen Unterrichtserprobung, Symbol-/Lizenzstrategie, Datenschutzdokumentation, Zielgruppenvalidierung, Supportmodell und rechtliche Prüfung.

6. Keine automatisierte Leistungsbewertung
- Keine Scores, Timer, Ranglisten, Prozentwerte, Ampellogik oder „kann/kann nicht“-Labels im Kinderpfad.
- Auch im Lehrerbereich nur beobachtbare Signale und vorsichtige nächste Schritte.

## Testpilot-Simulation für den ersten 10–15-Minuten-Einsatz

### Basale Lernperspektive

Works:
- Große Karten, klare Hilfen, ruhige Farben und kurze Wörter unterstützen Wahrnehmung und Orientierung.
- `Ich bin fertig`, `Nochmal`, `Leichter`, `Weiter`, `Fertig` sind einfache Handlungsoptionen.

Breaks / Risiko:
- Zu Beginn sind mehrere Bereiche sichtbar: Profil, Hilfe, Tagesweg, Bibliothek, Lesekarte. Ohne Lehrkraftführung kann das zu viel sein.
- Einige Kinder werden nicht ohne Lesefähigkeit erkennen, was der erste sinnvolle Klick ist.

Needed help:
- Lehrkraft muss den Start stark führen: Profil antippen, Hilfen nicht erklären bis zur Überladung, nur erste Karte nutzen.

### Unterstützte Lernperspektive

Works:
- Bildhilfe, Silbenfarben, Vorlesen, Gebärden-Hinweis, weniger Auswahl und Wiederholung sind didaktisch passend.
- Reduzierte Auswahl ist für GE besonders wertvoll.

Breaks / Risiko:
- Die Hilfeauswahl kann selbst zur Aufgabe werden. Für den Pilot sollte eine Standardhilfe vorausgewählt/empfohlen werden, statt alle Hilfen mit dem Kind auszuhandeln.

Needed help:
- Pilot-Onboarding sollte sagen: „Für den ersten Test eine Hilfe sichtbar lassen, nicht alle Hilfen gleichzeitig erklären.“

### Symbolisch / erweiterte Lernperspektive

Works:
- Level B/C und Mini-Stories ermöglichen mehr als reines Bild-Wort-Tippen.
- Storyfragen mit reduzierter Auswahl bieten einfache Verstehenssicherung.

Breaks / Risiko:
- Für 10–15 Minuten kann die App zu viele mögliche Wege öffnen. Ein erweitertes Kind könnte in der Bibliothek stöbern, statt einen klaren Mini-Leseweg zu gehen.

Needed challenge:
- Eine bewusste Auswahl von zwei bis vier Karten reicht. Keine neue Challenge in Alpha 14.

### Lehrkraft in realer Klasse

Works:
- Lehrerbereich enthält bereits Tagesweg, vorsichtigen Vorschlag, anonyme Beobachtung und lokale Druckvorschau.
- Die Sprache ist überwiegend respektvoll und nicht-diagnostisch.

Breaks / Risiko:
- Lehrkraft braucht vor dem Start eine knappe „Heute so durchführen“-Orientierung.
- Druckvorschau kann als offizieller Bericht missverstanden werden, wenn die lokale/anonyme Arbeitsnotiz-Grenze nicht sehr klar bleibt.
- Die App kann nicht verhindern, dass echte Namen mündlich oder handschriftlich ergänzt werden; die UI muss das deutlich vermeiden.

Needed observation:
- Nur sichtbare Signale: Hilfe gewählt, Wiederholung gewünscht, reduzierte Auswahl hilfreich, Storyfrage bearbeitet, Abbruch/Weiterlesen. Keine Aussage über allgemeine Lesekompetenz.

## Kleinster sicherer Alpha-14-Implementierungsscope

Empfohlene Slice B: `Pilot-readiness UI and version clarity`

Dateien wahrscheinlich:
- `src/App.tsx`
- `src/styles.css`
- `tests/lesewerk-content.test.mjs` oder ein kleiner UI-/Texttest, falls im Projekt passend
- `reports/alpha-14-pilot-readiness-report.md`

Implementieren:
1. Stale `Alpha 12` im sichtbaren Hero ersetzen durch aktuelle/neutrale lokale Pilot-Demo-Sprache.
2. Im Lehrerbereich eine kurze Onboarding-Karte ergänzen oder den bestehenden 10–15-Minuten-Pilotblock schärfen:
   - Ziel: kurzer lokaler Lesemoment;
   - Vorbereitung: Gerät, anonymes Profil, eine Hilfe;
   - Durchführung: zwei Karten, ruhig abbrechen/weiter;
   - Beobachtung: nur sichtbare Signale;
   - Grenze: keine Diagnose, keine echten Namen, keine Cloud/Datei.
3. Pilot-Checkliste kompakt machen, nicht als langer Manualtext.
4. Datenschutz-Hinweise nicht vergrößern, sondern sichtbarer und verständlicher ordnen.
5. Tests/Scan so ergänzen, dass stale Versionssprache und problematische Claims nicht wiederkommen.
6. Danach `npm test`, `npm run build` und kurzer Browsercheck.

Akzeptanzkriterien:
- Kein sichtbares `Alpha 12` mehr.
- App behauptet nicht, validiert, diagnostisch oder verkaufsfertig zu sein.
- Lehrkraft erkennt in unter einer Minute: Start, Dauer, Beobachtung, Ende, Datenschutzgrenze.
- Kinderpfad bleibt ruhig; keine neuen Aufgaben, keine neue Datenfunktion, keine Überladung.
- Tests/Build laufen.

## Was ausdrücklich out of scope bleiben muss

Damit Alpha 14 nicht wieder oversized wird, muss Folgendes draußen bleiben:

- keine neuen Lernaufgaben oder Stories;
- keine neue Level-/Diagnostiklogik;
- keine automatische Empfehlungserweiterung über die bestehende Alpha-11/13-Logik hinaus;
- keine Schülerverwaltung, keine echten Namen, keine Klassenlisten;
- kein Login, keine Cloud, kein Upload, keine Datenbank;
- kein Export außer der bestehenden lokalen Browser-Druckvorschau;
- keine geschützten Symbole, keine externen Bild-URLs, keine METACOM-/Boardmaker-/Widgit-/ARASAAC-Claims;
- keine Marketingseite, kein Pricing, keine Eduki-/SaaS-Verpackung;
- keine breite visuelle Neugestaltung;
- keine Commit-/Push-/Deployment-Aktion.

## Empfehlung

Alpha 14 sollte als kleine Sicherheits- und Klarheitsphase gebaut werden. Wenn Slice B nur Versionsklarheit, Pilot-Onboarding, Checkliste und schmale Texttests liefert, ist das genau richtig. Alles, was darüber hinausgeht, gehört frühestens in Alpha 15 – und erst nach einem lokalen Pilot oder einer gezielten Testpilot-Review der dann geschärften App.
