# Alpha 28A - GE Profile Builder Brief

## Classroom verdict
Ein teacher-facing, lokal begrenzter Profil-Baustein ist im GE-Unterricht sinnvoll, wenn er ruhig, kurz und beobachtungsnah bleibt. Er darf nur Unterrichtsplanung unterstützen: welche Buchstaben/Grapheme, Silben und Zugänge schon bekannt oder naheliegend sind, welche Hilfen typisch gebraucht werden und welcher nächste kleine Schritt passt.

Die Funktion sollte ausdrücklich nicht nach Diagnose, Leistungsrang, Testwert oder „Können/Nichtkönnen“ fragen. Sie ist ein Strukturierungswerkzeug für Lehrkräfte, kein Schülerprofil im medizinischen oder diagnostischen Sinn.

## Recommended minimal UI
1. Name der Fläche: „Leseprofil für heute“ oder „Mein Unterrichtsprofil“ statt „Diagnose“, „Level“ oder „Test“.
2. Drei ruhige Abschnitte, maximal wenige Auswahlchips pro Abschnitt:
   - bekannte Grapheme / komplexe Einheiten
   - bekannte Silben
   - benötigte Unterstützung
3. Ein vierter Abschnitt für den Zugangsschwerpunkt:
   - Bild/Symbol
   - Silbe
   - Wort
   - Satz
   - Mini-Geschichte
   - Schreibbrücke
4. Ein einzelner Button für die Auswertung: „Nächsten kleinen Schritt zeigen“.
5. Eine kurze Ergebniszeile statt langer Auswertung.
6. Keine freien Textfelder außer optionaler Notiz für die Lehrkraft; diese sollte klein, lokal und rein vorläufig sein.

UI-Prinzipien gegen Überlastung:
- nur eine Seite oder ein sehr kurzes Drawer-/Panel-Layout
- keine Pflichtauswahl in allen Feldern
- pro Feld nur wenige, klar benannte Optionen
- bekannte Inhalte als Auswahlchips oder Checklisten, nicht als offene Eingabeliste
- immer nur eine Empfehlung anzeigen, nicht mehrere Parallelpfade
- visuell trennen zwischen Lehrerbereich und Kinderansicht

## Recommended helper/data shape
Sinnvoll ist ein lokales, nicht speicherpflichtiges Datenobjekt für die Lehrkraft, etwa so:

```js
{
  knownGraphemes: ['a', 'm', 'sch'],
  knownSyllables: ['ma', 'schu'],
  supportNeeds: {
    image: true,
    gesture: true,
    reducedChoices: true,
    teacherReadAloud: false,
    repetition: true,
  },
  accessFocus: 'Silbe', // Bild/Symbol | Silbe | Wort | Satz | Mini-Geschichte | Schreibbrücke
  teacherNote: 'optional, kurz, lokal',
}
```

Wichtig:
- keine Schülernamen als Pflichtfeld
- keine dauerhaften Profile im ersten Schritt
- keine Speicherung über Login oder Cloud
- kein Score, kein Prozentwert, kein Ranking
- keine automatische Diagnose aus den Eingaben ableiten

Die Auswahlfelder sollten an vorhandene Leseleiter-Logik anschließen: bekannte Grapheme und Silben beeinflussen, welche Inhalte als passend markiert werden; Support Needs steuern nur Darstellung und Hilfen.

## How the next-step recommendation should sound
Eine gute Empfehlung ist ruhig, konkret und klein. Sie benennt:
- den nächstpassenden Zugang
- eine kurze Begründung in Alltagssprache
- eine konkrete Unterstützung
- optional eine Anschlussidee

Beispielton:
„Nächster Schritt: Silbe mit Bildhilfe und Wiederholung. Die Auswahl bleibt klein, damit die lernende Person sicher starten kann. Danach kann eine kurze Wortkarte folgen.“

Wording rules:
- „passt gut zu…“ statt „ist schwach in…“
- „nächster kleiner Schritt“ statt „Förderstufe“ oder „Niveau“
- „mit Bildhilfe / mit Geste / mit Wiederholung“ statt Defizitbeschreibung
- keine absoluten Aussagen wie „kann nicht“, „beherrscht nicht“, „ist unter“

## Connection to existing Leseleiter and Coverage-Check
Die neue Fläche sollte keine neue Logik erfinden, sondern auf vorhandene Strukturen aufsetzen:
- Leseleiter bleibt die sichtbare Reihenfolge für Kinder und Lehrkraft: Bild → Silbe → Wort → Satz → Mini-Geschichte → Schreibbrücke.
- Coverage-Check bleibt die Lehrkraftsicht auf Abdeckung und Lücken, also: was ist im Material bereits getaggt, welche Zugänge sind vertreten, wo fehlen sichere oder überprüfte Inhalte.
- Der Profil-Baustein ergänzt diese beiden Ebenen: Er hilft, aus bekannten Graphemen, Silben und Hilfen eine kleine passende Auswahl für heute abzuleiten.

Empfohlene Kopplung:
1. Lehrkraft wählt bekannte Grapheme/Silben und Hilfen.
2. System schlägt den niedrigsten sinnvollen Einstieg in der Leseleiter vor.
3. Coverage-Check zeigt, ob das Material dafür schon gut abgedeckt ist oder lehrkraftgeführt geprüft werden sollte.
4. Die Empfehlung bleibt nur eine Planungsstütze und überschreibt nicht die Beobachtung vor Ort.

## Exact acceptance criteria for Alpha 28B
1. Es gibt eine teacher-facing, lokale Profilfläche ohne Login, ohne Cloud und ohne dauerhafte Speicherung.
2. Die Fläche fragt nur nach:
   - bekannten Graphemen / komplexen Einheiten
   - bekannten Silben
   - Unterstützungsbedarfen
   - Zugangsschwerpunkt
3. Die UI bleibt kompakt, ruhig und mit wenig Auswahl pro Feld.
4. Die Auswertung erzeugt genau eine kurze nächste Handlungsempfehlung.
5. Die Empfehlung ist nicht diagnostisch, nicht bewertend und nicht als Score formuliert.
6. Die Empfehlung kann an Leseleiter und Coverage-Check angebunden werden.
7. Es werden keine echten Schülerdaten, keine Klassenlisten, keine Namen, keine Profile mit Login und kein Export eingeführt.
8. Es werden keine geschützten Bild- oder Symbolsets vorausgesetzt; lokale Platzhalter oder freie/selbst erstellte Hinweise bleiben erlaubt.
9. Die Oberfläche trennt klar zwischen Lehrkraftsicht und Kinderpfad.
10. Die Implementierung darf keinen Test-, Diagnose- oder Rankingcharakter bekommen.

## Risks and wording rules
Risiken:
- Zu viele Auswahloptionen können die Lehrkraft überlasten und die Funktion in eine verdeckte Diagnoselogik schieben.
- Freitextfelder können schnell zu unstrukturierten oder datensensiblen Einträgen werden.
- Eine zu starke Empfehlung könnte wie eine Festlegung wirken, obwohl sie nur eine Hilfe für den nächsten Schritt sein soll.
- Wenn persistente Profile eingebaut werden, steigt sofort das Datenschutz- und Missverständnisrisiko.

Wording rules:
- neutral, beobachtbar, klein
- keine Etiketten wie „schwach“, „stark“, „unter Niveau“
- keine Fachsprache, wenn sie nicht direkt hilft
- lieber „bekannt“, „geübt“, „mit Hilfe“, „als nächster Schritt“
- immer klar machen: lokale Planungsstütze, keine Diagnose

## Bottom line
Alpha 28B sollte einen sehr kleinen, lokalen Profilhelfer bauen, der Lehrkraftwissen über bekannte Grapheme, Silben und Hilfen in eine ruhige nächste Empfehlung übersetzt. Der Mehrwert liegt nicht in mehr Daten, sondern in besserer Struktur, passender Auswahl und einer klaren, GE-tauglichen Sprache.
