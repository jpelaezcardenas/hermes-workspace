# Alpha 32A - Story and Writing Bridge Metadata Model

## Ziel
Alpha 32A soll die didaktische Logik von Mini-Geschichten und Schreibbrücken klarer machen, ohne den Content-Slice aufzublähen. Die Modelle sollen bestehende Level A/B/C-Pfade nur sauberer beschreiben, nicht neu erfinden.

## 1) Kleines Metadatenmodell fuer Mini-Stories

Empfohlene Felder:
- `focusWord`: zentrales Fokuswort der Geschichte
- `shortText`: 2 bis 3 kurze Saetze in klarer Alltagssprache
- `comprehensionMoment`: ein klarer Verstehensmoment als Frage oder Zeigefrage
- `pictureCue`: lokale Bild-/Symbolbeschreibung ohne geschuetzte Assets
- `supportCue`: ruhiger Hinweis auf die passende Hilfeform
- `requiredGraphemes`: optionale Liste der schon bekannten Grapheme fuer die Story
- `requiredSyllables`: optionale Liste der schon bekannten Silben fuer die Story

Beispiel als Datenform:

```js
{
  id: 'story-ball-sofa',
  kind: 'mini-story',
  focusWord: 'Ball',
  shortText: ['Der Ball rollt zum Sofa.', 'Ein Kind schaut hin.', 'Der Ball bleibt dort.'],
  comprehensionMoment: 'Wo ist der Ball?',
  pictureCue: 'Ball vor Sofa, lokale Form-/Textkarte',
  supportCue: 'Bildhilfe und kurze Wiederholung',
  requiredGraphemes: ['b', 'a', 'l'],
  requiredSyllables: ['Ball'],
}
```

Wichtig ist hier die Trennung zwischen Textkern und Hilfehinweisen. Die Story bleibt auch dann lesbar, wenn nur einzelne Felder genutzt werden.

## 2) Kleines Metadatenmodell fuer Schreibbruecken

Empfohlene Felder:
- `targetWord`: das Wort, das aus dem Lesen in die Schrift uebergeht
- `actionType`: Art der Schreibbruecke, z. B. `trace`, `copy-word`, `build-syllable`, `select-letter`, `sentence-frame`
- `materialCue`: konkretes Material oder Handlungsangebot, z. B. nachfahren, legen, waehlen, abschreiben
- `optionality`: markiert die Schreibbruecke als optional und heute-passend
- `supportCue`: ruhiger Hinweis, welche Hilfe passt
- `noEvaluationWording`: Formulierung ohne Bewertung, Druck oder Testsprache

Beispiel als Datenform:

```js
{
  id: 'bridge-sofa',
  kind: 'writing-bridge',
  targetWord: 'Sofa',
  actionType: 'build-syllable',
  materialCue: 'Silbenkarten legen',
  optionality: true,
  supportCue: 'Nur wenn es heute passt: mit Bild- oder Silbenhilfe legen',
  noEvaluationWording: 'lokale Schreibbruecke, kein Test, keine Bewertung',
}
```

Die Schreibbruecke soll immer als Anschluss gedacht werden, nicht als Leistungsnachweis.

## 3) Anschluss an bestehende Tasks ohne Bruch von Level A/B/C

Das Modell passt gut auf die bereits vorhandene Struktur in `src/lesewerk-content.mjs`:
- Storys haben schon `focusWord`, `symbolHelp`, `gestureHint`, `comprehensionPrompt`, `reducedChoice`, `supportiveFeedback`, `nextStep`.
- Schreibbruecken sind bereits als `optional`, `localOnly`, `nonEvaluative`, `type`, `title`, `childPrompt`, `teacherHint` beschrieben.

Das neue Modell muss diese Struktur nicht ersetzen. Es kann als zusaetzliche, lesbare Metadaten-Schicht dazukommen:
- Level A bleibt bild-/symbolnah mit enger, sicherer Auswahl.
- Level B bleibt silben- und wortnah mit klaren Alltagwoertern.
- Level C bleibt satz- und storynah mit kurzer, verstaendlicher Szene.

Praktisch bedeutet das:
- `focusWord` und `requiredGraphemes/requiredSyllables` helfen beim Gating.
- `comprehensionMoment` hilft bei der Auswahl der Verstehensfrage.
- `actionType` und `materialCue` helfen bei der passenden Schreibbruecke.
- `optionality` und `noEvaluationWording` sichern die GE-gerechte Haltung.

So kann ein Task sowohl eine Story als auch eine Schreibbruecke haben, ohne dass daraus ein zweiter Modus oder eine neue Datenwelt entstehen muss.

## 4) Beispiele mit Alpha-31-Inhalten

### 4.1 Ball / Sofa Mini-Story

Beispiel:
```js
{
  id: 'story-ball-sofa',
  kind: 'mini-story',
  focusWord: 'Ball',
  shortText: ['Der Ball rollt zum Sofa.', 'Ein Kind schaut hin.', 'Der Ball bleibt dort.'],
  comprehensionMoment: 'Wo ist der Ball?',
  pictureCue: 'Ball vor Sofa, lokale Bildplatzhalter-Sprache',
  supportCue: 'Bildhilfe und kurze Wiederholung',
  requiredGraphemes: ['b', 'a', 'l'],
  requiredSyllables: ['Ball'],
}
```

Didaktische Logik:
- klarer Fokus auf ein Wort
- kurze Szene mit Ortsbezug
- einfache Frage mit Zeigeantwort
- gut anschlussfaehig fuer Bild, Wort und erste Satzarbeit

### 4.2 Sofa Schreibbruecke

Beispiel:
```js
{
  id: 'bridge-sofa',
  kind: 'writing-bridge',
  targetWord: 'Sofa',
  actionType: 'build-syllable',
  materialCue: 'Silbenkarten so-fa legen oder Sofa nachspuren',
  optionality: true,
  supportCue: 'Nur heute-passend und mit ruhiger Hilfe',
  noEvaluationWording: 'keine Bewertung, nur lokale Lernbeobachtung',
}
```

Didaktische Logik:
- vom gelesenen Wort in eine handelnde Schreibnahe-Phase
- mehrere moegliche Formen der Unterstuetzung
- keine Drucksprache, kein Testcharakter

### 4.3 Tasse / Tisch Satzbruecke

Beispiel:
```js
{
  id: 'bridge-tasse-tisch',
  kind: 'writing-bridge',
  targetWord: 'Tisch',
  actionType: 'sentence-frame',
  materialCue: 'Satzrahmen: Ich lese die Tasse auf dem Tisch.',
  optionality: true,
  supportCue: 'Wort im Satz rahmen oder abschreiben',
  noEvaluationWording: 'nur als kleiner naechster Schritt, ohne Bewertung',
}
```

Didaktische Logik:
- passt zu Satz- und Mini-Story-Naehe
- verbindet Verstehen mit einem kleinen Schreib- oder Satzrahmen
- bleibt fuer Level C offen, ohne Level A/B zu ueberfordern

## 5) Kompatibilitaet mit Level A/B/C

Die Metadaten sollten nicht die vorhandenen Level ersetzen, sondern ergaenzen.

Empfohlene Zuordnung:
- Level A: `focusWord`, `pictureCue`, `supportCue`, sehr kurze `shortText`
- Level B: zusaetzlich `requiredSyllables`, `actionType: build-syllable | select-letter | trace`
- Level C: zusaetzlich `comprehensionMoment`, Satzrahmen, kurze Mini-Story, `actionType: sentence-frame`

Regeln fuer Kompatibilitaet:
- Ein Level darf nie durch die Metadaten automatisch in ein schwereres Niveau springen.
- Fehlende Felder muessen erlaubt sein.
- Die Story- oder Bridge-Felder sollen nur helfen, nicht sperren.
- Das Gating bleibt weiterhin auf vorhandenen bekannten Graphemen, Silben und Taskprofilen aufgebaut.

Damit bleibt Alpha 32 kompatibel zu den Alpha-31-Pfaeden und zu den bisherigen ruhigen Einstiegen.

## 6) Acceptance Criteria fuer Neva-Tests und Reports

### Source-/Content-Tests
- Mini-Stories haben mindestens `focusWord`, `comprehensionMoment` und eine kurze Textfolge.
- Schreibbruecken haben mindestens `targetWord`, `actionType`, `optionality` und ein non-evaluatives Wording.
- Story- und Bridge-Felder koennen aus vorhandenen Tasks abgeleitet werden, ohne dass neue geschuetzte Assets oder externe Quellen eingebaut werden.
- Level A/B/C bleibt in den Taskprofilen sichtbar und unterscheidbar.
- Kein Test akzeptiert Diagnose-, Score-, Ranking-, Timer-, Prozent- oder Notensprache.

### Report-/Dokumentations-Tests
- Der Report benennt klar, dass es sich um eine Metadaten-Schicht handelt und nicht um eine neue grobe Content-Expansion.
- Die Beispiele Ball/Sofa, Sofa-Schreibbruecke und Tasse/Tisch-Satzbruecke sind enthalten.
- Die Beschreibung bleibt lokal, anonymisiert und ohne geschuetzte Symbolsystem-Claims.
- Der Report sagt explizit, wie die Modelle an bestehende Tasks andocken.

### Gute praktische Prueffragen fuer Neva
- Ist das Fokuswort klar sichtbar?
- Ist die Verstehensfrage kurz und eindeutig?
- Ist die Schreibbruecke optional und heute-passend formuliert?
- Bleibt die Formulierung ruhig, lokal und nicht bewertend?
- Kann das Taskprofil weiterhin in Level A/B/C eingeordnet werden, ohne neue Regeln zu brauchen?

## Kurzfazit
Alpha 32A sollte die Story- und Schreibbrueckenlogik nicht vergroessern, sondern lesbar machen. Ein kleines, explizites Metadatenmodell reicht aus, um vorhandene Tasks klarer, testbarer und didaktisch sauber anschlussfaehig zu beschreiben.
