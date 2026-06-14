# Alpha 29A - GE Learning Check Spec

## Short verdict
Alpha 29A should be a calm, local learning check for teacher planning — not a test, not a ranking, not a diagnosis. The best fit is a 3-5 step start sequence that shows which access path feels safe today: Bild/Symbol, Silbe, Wort, Satz/kurze Geschichte, plus an optional writing bridge.

The result should feed directly into the existing Alpha 28 profile builder as a planning hint: what support is needed, where the learner starts, and what the next small step is.

## Recommended learning check flow

### 1) Bild / Symbol orientation
Purpose: settle in, orient, and see whether the learner can connect a local picture cue with the target word or scene.

Teacher does:
- shows one clear image or symbol
- names the item calmly
- offers one or two alternatives only if needed
- watches whether the learner points, looks, names, matches, or needs support

Child-facing wording:
- "Schau mal."
- "Wir starten ruhig."
- "Zeig mir, was du meinst."
- "Nimm dir Zeit."

### 2) Silbe / syllable awareness
Purpose: check whether the learner can hear, clap, say, or read a syllable with support.

Teacher does:
- offers a syllable card or a short syllable sequence
- may clap, tap, or read aloud once
- watches whether the learner can repeat safely, segment, or match

Child-facing wording:
- "Wir klatschen die Silbe."
- "Du kannst mitsprechen."
- "Wir machen es gemeinsam."
- "Noch einmal ganz ruhig."

### 3) Wort recognition
Purpose: check whether the learner recognizes a familiar word in a small, reduced choice set.

Teacher does:
- shows one target word with 1-2 distractors
- keeps the layout calm and low text
- observes whether the learner needs picture help, read-aloud, gesture, or reduced choices

Child-facing wording:
- "Finde das Wort."
- "Was passt hier?"
- "Du darfst wählen."
- "Wir schauen zusammen."

### 4) Short sentence or story understanding
Purpose: check whether the learner can follow a short sentence or a tiny story with comprehension support.

Teacher does:
- reads or presents 1-3 very short sentences
- asks one concrete question
- offers reduced choices instead of open questioning when needed

Child-facing wording:
- "Hör kurz zu."
- "Was ist passiert?"
- "Zeig mir die richtige Antwort."
- "Wir lesen den kleinen Text noch einmal."

### 5) Optional writing bridge
Purpose: check whether the learner can move from reading into a tiny writing action.

Teacher does:
- offers copying, tracing, first-letter choice, syllable laying, or a simple sentence frame
- keeps the task optional and short
- watches whether the learner can bridge from Bild to Silbe/Wort/Satz without overload

Child-facing wording:
- "Möchtest du noch etwas schreiben?"
- "Du kannst abschreiben oder nachlegen."
- "Nur ein kleines Stück."
- "Das reicht schon."

## Observation model

The teacher should observe locally and descriptively. The goal is not to score performance, but to see which access route is currently most helpful.

### What to observe
- needs image support
- needs gesture support
- needs teacher read-aloud
- needs reduced choices
- needs repetition to stay safe
- can move from Bild to Silbe
- can move from Silbe to Wort
- can move from Wort to Satz
- can tolerate a short writing bridge

### How to record it
Use short, neutral observations like:
- "Mit Bildhilfe sicherer"
- "Mit Geste besser nachvollziehbar"
- "Reduzierte Auswahl hilfreich"
- "Wiederholung wird gut angenommen"
- "Nächster Schritt: Silbe mit Bildstütze"

Avoid:
- diagnosis language
- score language
- speed language
- deficit labels
- ranking or level talk

### Suggested local observation categories
1. Bild/Symbol braucht Hilfe ja/nein
2. Silbe braucht Hilfe ja/nein
3. Wort braucht reduzierte Auswahl ja/nein
4. Satz/Story braucht Vorlesen ja/nein
5. Schreibbrücke möglich ja/nein
6. Wiederholung beruhigt / stabilisiert ja/nein

## Adaptive path rules

Alpha 29A should feed the existing Alpha 28 builder, especially `createLocalDidacticProfile(...)` and `getAdaptiveNextStepForProfile(...)`.

### Rule set for the next step
- Wenn Bild/Symbol Sicherheit gibt, bleibt der Einstieg dort oder geht nur einen kleinen Schritt weiter.
- Wenn Silbe mit Unterstützung gelingt, kann die Silbenebene als nächster stabiler Zugang gewählt werden.
- Wenn Worterkennung in kleiner Auswahl gelingt, darf der Weg auf Wortebene weitergehen.
- Wenn ein kurzer Satz oder eine Mini-Geschichte verstanden wird, kann eine einfache Anschlussaufgabe folgen.
- Wenn eine Schreibbrücke möglich ist, wird sie nur als optionaler nächster Schritt angeboten.
- Wenn viel Unterstützung nötig ist, bleibt der Weg klein, ruhig und wiederholbar.

### How it should feed Alpha 28
The learning check result should be translated into the existing builder inputs:
- known graphemes
- known syllables
- support needs
- access focus

Practical mapping:
- Bildhilfe gebraucht → `imageHelp: true`
- Gebärde / Handzeichen gebraucht → `gestureHint: true`
- reduzierte Auswahl gebraucht → `reducedChoices: true`
- Vorlesen gebraucht → `teacherReadAloud: true`
- Wiederholung gebraucht → `repeat: true`
- Start auf Bild/Symbol → `accessFocus: 'picture-symbol'`
- Start auf Silbe → `accessFocus: 'syllable'`
- Start auf Wort → `accessFocus: 'word'`
- Start auf Satz → `accessFocus: 'sentence'`
- Start auf Mini-Geschichte → `accessFocus: 'story'`
- Start auf Schreibbrücke → `accessFocus: 'writing-bridge'`

### Result phrasing for the teacher UI
Good UI result wording should sound like:
- "Heute passt ein ruhiger Start mit Bildhilfe und kleiner Auswahl."
- "Die Silbe ist ein guter nächster Schritt."
- "Wortkarten mit reduzierter Auswahl wirken passend."
- "Eine kurze Story kann heute schon mitgehen."
- "Schreibbrücke nur optional und klein."

## Content pack recommendation

For the first pack, the app needs a compact set of tasks and stories that make the whole learning check feel real and stable.

### Most needed tasks
1. very clear Bild/Symbol entries for common classroom and everyday words
2. stable syllable tasks for short, familiar structures
3. small word cards with reduced choice sets
4. one-step sentence tasks with very short syntax
5. a few mini-stories with one concrete comprehension question
6. optional writing bridges that are easy to copy, trace, or complete

### Priority content types
- everyday objects and room words
- concrete actions
- familiar school items
- short repetitive sentence frames
- tiny story scenes with clear visual support

### Content qualities that matter most
- short
- familiar
- visually unambiguous
- locally understandable
- easy to repeat safely
- suitable for reduced choice sets
- no overloaded text blocks

### Existing content logic that should be expanded first
- more tasks where Bild → Silbe → Wort is very clear
- more story cards with one obvious comprehension question
- more writing bridges attached to the clearest tasks
- more local picture/symbol cues for ambiguous words

## Exact child-facing wording
These are the kinds of phrases Alpha 29B should use in the learning check flow:

- "Schau mal."
- "Wir starten ruhig."
- "Du kannst mitmachen."
- "Wir machen das gemeinsam."
- "Noch einmal langsam."
- "Zeig mir, was passt."
- "Du darfst auswählen."
- "Das ist ein guter Start."
- "Jetzt kommt nur ein kleiner Schritt."
- "Möchtest du noch schreiben?"

Rules for child-facing text:
- short
- encouraging
- calm
- no pressure
- no failure wording
- no test wording

## Exact teacher-facing wording
Teacher-facing wording should describe support and next steps, not hidden ability labels.

Good examples:
- "Mit Bildhilfe sicherer. Nächster kleiner Schritt: Silbe."
- "Mit reduzierter Auswahl und Vorlesen gut zugänglich."
- "Wortebene möglich, wenn die Auswahl klein bleibt."
- "Kurzer Satz mit Vorlesen versteht die lernende Person sicherer."
- "Schreibbrücke als optionale Anschlussidee."

Bad examples:
- "schwach in ..."
- "unter Niveau"
- "Test auffällig"
- "braucht Diagnose"
- "leistet wenig"

## Exact acceptance criteria for Alpha 29B implementation

1. There is a local, teacher-facing learning check flow with 3-5 clear steps.
2. The flow covers Bild/Symbol, Silbe, Wort, Satz/Story, and an optional writing bridge.
3. The flow is calm and non-test-like in wording and visual design.
4. The learner-facing wording is short, encouraging, and pressure-free.
5. The teacher-facing wording shows observed support needs and a next small step.
6. The result can feed the Alpha 28 profile builder through existing fields or clearly mapped equivalents.
7. The result suggests an access focus and support needs, not a score or diagnosis.
8. The UI avoids long text blocks, too many chips, and unclear transitions.
9. The learning check does not require real learner data, login, cloud sync, export, or persistent profiles.
10. No ranking, percentage, grade, timer, or speed pressure is introduced.
11. No protected assets or METACOM claims are introduced.
12. The first content pack includes enough stable items to make the learning check feel real and usable in a GE classroom.

## Risks / non-goals

### UI risks
- too much text on one screen
- too many chips or choice buttons
- unclear transition between the steps
- result page becoming too long or too technical
- learner and teacher view not clearly separated

### Didactic risks
- the check starts to feel like a test
- support needs are interpreted as deficits
- too many steps are used at once
- the writing bridge is pushed too early
- the learner is forced into a higher level too quickly

### Non-goals
- no diagnosis
- no ranking
- no percent score
- no grade logic
- no timed assessment
- no cloud/profile storage
- no export workflow
- no real learner identities

### Bottom line
Alpha 29A should be a gentle orientation tool that helps teachers choose the next daily reading path. Its value lies in calm observation, clear support mapping, and a small adaptive next step — not in measurement.