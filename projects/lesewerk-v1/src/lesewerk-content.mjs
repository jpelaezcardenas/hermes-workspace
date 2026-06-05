export function getAnonymousProfiles() {
  return [
    {
      id: 'blue',
      label: 'Profil Blau',
      storageKey: 'demo-blue',
      symbol: '●',
      colorName: 'Blau',
      description: 'ruhig starten',
    },
    {
      id: 'green',
      label: 'Profil Grün',
      storageKey: 'demo-green',
      symbol: '◆',
      colorName: 'Grün',
      description: 'mit Hilfe lesen',
    },
    {
      id: 'sun',
      label: 'Profil Sonne',
      storageKey: 'demo-sun',
      symbol: '☀',
      colorName: 'Sonne',
      description: 'nochmal versuchen',
    },
  ];
}

const baseSupports = ['imageHelp', 'syllableColors', 'readAloud', 'signHint', 'reduceChoices', 'repeat'];

const localSymbolCues = {
  Mond: { token: '◐', shape: 'circle', tone: 'night' },
  Ball: { token: '●', shape: 'circle', tone: 'play' },
  Bus: { token: '▭', shape: 'bus', tone: 'travel' },
  Hut: { token: '△', shape: 'hat', tone: 'clothes' },
  Tasse: { token: '◡', shape: 'cup', tone: 'table' },
  Sonne: { token: '☼', shape: 'sun', tone: 'bright' },
  Haus: { token: '⌂', shape: 'house', tone: 'home' },
  Maus: { token: '◔', shape: 'mouse', tone: 'animal' },
  Mama: { token: '♡', shape: 'person', tone: 'care' },
  Sofa: { token: '▰', shape: 'sofa', tone: 'room' },
  Lama: { token: '♢', shape: 'animal', tone: 'animal' },
  Limo: { token: '◌', shape: 'glass', tone: 'drink' },
  Tomate: { token: '●', shape: 'food', tone: 'food' },
  Banane: { token: '◜', shape: 'food', tone: 'food' },
  Rose: { token: '✽', shape: 'flower', tone: 'nature' },
  Nase: { token: '⌒', shape: 'face', tone: 'body' },
  Fisch: { token: '◇', shape: 'fish', tone: 'water' },
  Schule: { token: '▣', shape: 'building', tone: 'school' },
  Gras: { token: '▱', shape: 'field', tone: 'nature' },
  Tisch: { token: '▭', shape: 'table', tone: 'table' },
  Licht: { token: '✦', shape: 'light', tone: 'bright' },
  Hof: { token: '▤', shape: 'yard', tone: 'school' },
  Brot: { token: '▱', shape: 'food', tone: 'table' },
  Blume: { token: '✽', shape: 'flower', tone: 'nature' },
  Buch: { token: '▧', shape: 'book', tone: 'school' },
  Regen: { token: '⋮', shape: 'rain', tone: 'weather' },
  Wind: { token: '≈', shape: 'wind', tone: 'weather' },
  Tasche: { token: '▱', shape: 'bag', tone: 'school' },
  Stift: { token: '▯', shape: 'pen', tone: 'school' },
  Heft: { token: '▤', shape: 'booklet', tone: 'school' },
  Wasser: { token: '◌', shape: 'glass', tone: 'drink' },
  Apfel: { token: '●', shape: 'food', tone: 'food' },
  Hand: { token: '✋', shape: 'hand', tone: 'body' },
  Fuß: { token: '▱', shape: 'foot', tone: 'body' },
  Schuh: { token: '◖', shape: 'shoe', tone: 'clothes' },
  Jacke: { token: '▥', shape: 'jacket', tone: 'clothes' },
  Fenster: { token: '▥', shape: 'window', tone: 'room' },
  Tür: { token: '▯', shape: 'door', tone: 'room' },
  Tafel: { token: '▰', shape: 'board', tone: 'school' },
  Kreis: { token: '○', shape: 'circle', tone: 'school' },
  Platz: { token: '□', shape: 'place', tone: 'school' },
  Frage: { token: '?', shape: 'question', tone: 'school' },
  Ruhe: { token: '◇', shape: 'calm', tone: 'care' },
  Hilfe: { token: '◇', shape: 'hands', tone: 'care' },
  Freude: { token: '♡', shape: 'heart', tone: 'care' },
};

const gestureHintTexts = {
  Mond: 'Zeige mit der Hand nach oben: Mond am Himmel.',
  Ball: 'Zeige mit beiden Händen rund: Ball rollen.',
  Bus: 'Zeige mit beiden Händen nach vorn: Bus kommt.',
  Hut: 'Zeige mit der Hand auf den Kopf: Hut.',
  Tasse: 'Zeige mit einer Hand: Tasse halten.',
  Sonne: 'Zeige mit beiden Händen nach oben: Sonne.',
  Haus: 'Zeige mit beiden Händen ein Dach: Haus.',
  Maus: 'Zeige mit kleinen Fingern: Maus läuft.',
  Mama: 'Zeige mit der Hand zum Herzen: vertraute Person.',
  Sofa: 'Zeige mit flachen Händen nach unten: Sofa.',
  Lama: 'Zeige mit der Hand einen langen Hals: Lama.',
  Limo: 'Zeige mit der Hand: Glas halten.',
  Tomate: 'Zeige mit beiden Händen rund: Tomate.',
  Banane: 'Zeige mit der Hand eine gebogene Form: Banane.',
  Rose: 'Zeige mit den Fingern eine kleine Blüte: Rose.',
  Nase: 'Zeige mit dem Finger zur Nase.',
  Fisch: 'Zeige mit der Hand eine Schwimmbewegung: Fisch.',
  Schule: 'Zeige mit beiden Händen ein Haus: Schule.',
  Gras: 'Zeige mit flacher Hand nach unten: Gras.',
  Tisch: 'Zeige mit flacher Hand eine Platte: Tisch.',
  Licht: 'Zeige mit den Fingern nach außen: Licht.',
  Hof: 'Zeige mit der Hand nach draußen: Hof.',
  Brot: 'Zeige mit beiden Händen eine kleine Scheibe: Brot.',
  Blume: 'Zeige mit den Fingern eine Blüte: Blume.',
  Buch: 'Zeige mit beiden Händen: Buch aufklappen.',
  Regen: 'Zeige mit den Fingern nach unten: Regen.',
  Wind: 'Zeige mit der Hand seitlich eine weiche Welle: Wind.',
  Tasche: 'Zeige mit einer Hand: Tasche tragen.',
  Stift: 'Zeige mit den Fingern: Stift halten.',
  Heft: 'Zeige mit beiden Händen: Heft öffnen.',
  Wasser: 'Zeige mit der Hand: Becher halten und trinken.',
  Apfel: 'Zeige mit beiden Händen rund: Apfel.',
  Hand: 'Zeige mit offener Hand nach vorn: Hand.',
  Fuß: 'Zeige mit der Hand nach unten: Fuß.',
  Schuh: 'Zeige mit der Hand zum Schuh.',
  Jacke: 'Zeige mit beiden Händen: Jacke anziehen.',
  Fenster: 'Zeige mit beiden Händen einen Rahmen: Fenster.',
  Tür: 'Zeige mit der Hand: Tür schließen.',
  Tafel: 'Zeige mit flacher Hand nach vorn: Tafel.',
  Kreis: 'Zeige mit dem Finger einen Kreis.',
  Platz: 'Zeige mit der Hand nach unten: Platz.',
  Frage: 'Zeige mit der Hand nach oben und schaue fragend: Frage.',
  Ruhe: 'Zeige mit flacher Hand langsam nach unten: Ruhe.',
  Hilfe: 'Zeige mit offener Hand zur anderen Hand: Hilfe anbieten.',
  Freude: 'Zeige mit der Hand zum Herzen und lächle: Freude.',
};

function makeSymbolHelp(word, pictureHint) {
  const cue = localSymbolCues[word] ?? { token: '□', shape: 'card', tone: 'neutral' };
  const label = pictureHint.replace('Bildplatzhalter:', '').trim();

  return {
    label,
    altText: `Lokale Symbolhilfe: ${label}.`,
    cue: {
      kind: 'local-symbol-card',
      ...cue,
    },
  };
}

function makeGestureHint(word) {
  return {
    label: 'Gebärden-Hinweis',
    text: gestureHintTexts[word] ?? `Zeige mit der Hand: ${word}.`,
    readingSupportText: 'Die Geste stützt das Lesen. Der Text bleibt wichtig.',
  };
}

function makeTask({ id, level, type, word, pictureHint, syllables, prompt, options, storyBridge, writingBridge, ...metadata }) {
  return {
    id,
    level,
    type,
    word,
    pictureHint,
    symbolHelp: makeSymbolHelp(word, pictureHint),
    gestureHint: makeGestureHint(word),
    prompt,
    options,
    supports: baseSupports,
    ...(storyBridge ? { storyBridge } : {}),
    ...(writingBridge ? { writingBridge } : {}),
    ...metadata,
    syllables: syllables.map((text, index) => ({ text, color: index % 2 === 0 ? 'blue' : 'red' })),
  };
}

function makeStory({ id, title, cluster, targetSkill, text, focusWord, symbolLabel, comprehensionPrompt, reducedChoice, supportiveFeedback, nextStep, supportSyllables = [] }) {
  return {
    id,
    title,
    cluster,
    targetSkill,
    text,
    focusWord,
    symbolHelp: makeSymbolHelp(focusWord, `Bildplatzhalter: ${symbolLabel}`),
    gestureHint: makeGestureHint(focusWord),
    comprehensionPrompt,
    reducedChoice: {
      ...reducedChoice,
      answer: reducedChoice.answer ?? reducedChoice.options[0],
    },
    supportiveFeedback,
    nextStep,
    supportSyllables: supportSyllables.map((text, index) => ({ text, color: index % 2 === 0 ? 'blue' : 'red' })),
  };
}

const storyPaths = [
  makeStory({
    id: 'story-ball-garten',
    title: 'Der Ball im Garten',
    cluster: 'Alltag – Dinge und Handlungen',
    targetSkill: 'Bild-Wort-Zuordnung und erstes Satzverstehen',
    text: ['Im Garten liegt ein Ball.', 'Ein Kind nimmt den Ball.', 'Er rollt über das Gras.'],
    focusWord: 'Ball',
    symbolLabel: 'Ball auf Gras',
    comprehensionPrompt: 'Was liegt im Garten?',
    reducedChoice: { options: ['Ball', 'Bus'], answer: 'Ball' },
    supportiveFeedback: 'Der Ball steht im Text im Mittelpunkt.',
    nextStep: 'Gleiche Satzstruktur mit einem anderen Gegenstand wiederholen.',
    supportSyllables: ['Ball'],
  }),
  makeStory({
    id: 'story-tasse-tisch',
    title: 'Die Tasse auf dem Tisch',
    cluster: 'Alltag – Dinge und Handlungen',
    targetSkill: 'Worterkennung und Ortssatz verstehen',
    text: ['Die Tasse steht auf dem Tisch.', 'Ein Kind nimmt die Tasse.', 'Der Tisch bleibt frei.'],
    focusWord: 'Tasse',
    symbolLabel: 'Tasse auf Tisch',
    comprehensionPrompt: 'Wo steht die Tasse?',
    reducedChoice: { options: ['Tisch', 'Bett'], answer: 'Tisch' },
    supportiveFeedback: 'Der Ort passt zur Tasse im Text.',
    nextStep: 'Ort mit zweiter Tasse-Story sichern.',
    supportSyllables: ['Tas', 'se'],
  }),
  makeStory({
    id: 'story-brot-tasche',
    title: 'Das Brot in der Tasche',
    cluster: 'Alltag – Dinge und Handlungen',
    targetSkill: 'Gegenstand und Ort in einer Alltagsszene verstehen',
    text: ['In der Tasche liegt Brot.', 'Das Kind holt das Brot.', 'Das Brot kommt auf den Teller.'],
    focusWord: 'Brot',
    symbolLabel: 'Brot in einer Tasche',
    comprehensionPrompt: 'Was liegt in der Tasche?',
    reducedChoice: { options: ['Brot', 'Hut'], answer: 'Brot' },
    supportiveFeedback: 'Brot und Tasche sind klar verbunden.',
    nextStep: 'Danach Tasche und Teller im Text vergleichen.',
    supportSyllables: ['Brot'],
  }),
  makeStory({
    id: 'story-hut-haken',
    title: 'Der Hut am Haken',
    cluster: 'Alltag – Dinge und Handlungen',
    targetSkill: 'Alltagswort und Handlungsfolge verbinden',
    text: ['Der Hut hängt am Haken.', 'Ein Kind nimmt den Hut.', 'Der Haken ist leer.'],
    focusWord: 'Hut',
    symbolLabel: 'Hut an einem Haken',
    comprehensionPrompt: 'Was hängt am Haken?',
    reducedChoice: { options: ['Hut', 'Tasse'], answer: 'Hut' },
    supportiveFeedback: 'Hut und Haken passen zusammen.',
    nextStep: 'Danach Haken und leer im Text zeigen.',
    supportSyllables: ['Hut'],
  }),
  makeStory({
    id: 'story-lampe-licht',
    title: 'Die Lampe macht Licht',
    cluster: 'Alltag – Dinge und Handlungen',
    targetSkill: 'Gegenstand und einfache Wirkung verstehen',
    text: ['Die Lampe macht Licht.', 'Das Kind sieht den Tisch.', 'Der Raum ist hell.'],
    focusWord: 'Licht',
    symbolLabel: 'Lampe mit Licht',
    comprehensionPrompt: 'Was macht die Lampe?',
    reducedChoice: { options: ['Licht', 'Regen'], answer: 'Licht' },
    supportiveFeedback: 'Du hast die Wirkung erkannt.',
    nextStep: 'Licht-Satz mit Fenster wiederholen.',
    supportSyllables: ['Licht'],
  }),
  makeStory({
    id: 'story-fenster-offen',
    title: 'Das Fenster ist offen',
    cluster: 'Alltag – Dinge und Handlungen',
    targetSkill: 'Zustand und Gegenstand im Raum verstehen',
    text: ['Das Fenster ist offen.', 'Ein Kind sieht den Regen.', 'Dann geht das Fenster zu.'],
    focusWord: 'Fenster',
    symbolLabel: 'Offenes Fenster mit Regen',
    comprehensionPrompt: 'Was ist offen?',
    reducedChoice: { options: ['Fenster', 'Tasche'], answer: 'Fenster' },
    supportiveFeedback: 'Offen und Fenster gehören hier zusammen.',
    nextStep: 'Danach offen und zu mit Tür lesen.',
    supportSyllables: ['Fens', 'ter'],
  }),
  makeStory({
    id: 'story-blume-tisch',
    title: 'Die Blume am Tisch',
    cluster: 'Alltag – Dinge und Handlungen',
    targetSkill: 'Gegenstand und Ort im kurzen Satz lesen',
    text: ['Die Blume steht auf dem Tisch.', 'Ein Kind zeigt die Blume.', 'Die Blume bleibt dort.'],
    focusWord: 'Blume',
    symbolLabel: 'Blume auf dem Tisch',
    comprehensionPrompt: 'Was steht auf dem Tisch?',
    reducedChoice: { options: ['Blume', 'Bus'], answer: 'Blume' },
    supportiveFeedback: 'Der Gegenstand steht klar im Satz.',
    nextStep: 'Ortssatz mit Blume wiederholen.',
    supportSyllables: ['Blu', 'me'],
  }),
  makeStory({
    id: 'story-tuer-wind',
    title: 'Die Tür im Wind',
    cluster: 'Alltag – Dinge und Handlungen',
    targetSkill: 'Alltagshandlung und Gegenstand verbinden',
    text: ['Der Wind kommt zur Tür.', 'Ein Kind schließt die Tür.', 'Der Raum bleibt ruhig.'],
    focusWord: 'Tür',
    symbolLabel: 'Tür bei Wind',
    comprehensionPrompt: 'Was schließt das Kind?',
    reducedChoice: { options: ['Tür', 'Buch'], answer: 'Tür' },
    supportiveFeedback: 'Tür und Wind sind klar verbunden.',
    nextStep: 'Tür-Satz mit offen und zu lesen.',
    supportSyllables: ['Tür'],
  }),
  makeStory({
    id: 'story-schule-pause',
    title: 'In der Pause',
    cluster: 'Schule und Klassenalltag',
    targetSkill: 'Alltagsverständnis in einer kurzen Sachgeschichte',
    text: ['Es ist Pause.', 'Kinder gehen auf den Hof.', 'Ein Kind hat einen Ball.'],
    focusWord: 'Hof',
    symbolLabel: 'Pause auf dem Schulhof',
    comprehensionPrompt: 'Wann gehen Kinder auf den Hof?',
    reducedChoice: { options: ['Pause', 'Nacht'], answer: 'Pause' },
    supportiveFeedback: 'Pause und Hof sind im Text verbunden.',
    nextStep: 'Pause-Szene mit anderem Ort wiederholen.',
    supportSyllables: ['Pau', 'se'],
  }),
  makeStory({
    id: 'story-stift-tisch',
    title: 'Der Stift auf dem Tisch',
    cluster: 'Schule und Klassenalltag',
    targetSkill: 'Schulgegenstand und Ortssatz verstehen',
    text: ['Der Stift liegt auf dem Tisch.', 'Ein Kind nimmt den Stift.', 'Das Heft liegt daneben.'],
    focusWord: 'Stift',
    symbolLabel: 'Stift auf einem Tisch',
    comprehensionPrompt: 'Was liegt auf dem Tisch?',
    reducedChoice: { options: ['Stift', 'Ball'], answer: 'Stift' },
    supportiveFeedback: 'Der Gegenstand steht klar im Satz.',
    nextStep: 'Tisch-Satz mit Heft wiederholen.',
    supportSyllables: ['Stift'],
  }),
  makeStory({
    id: 'story-heft-fach',
    title: 'Das Heft im Fach',
    cluster: 'Schule und Klassenalltag',
    targetSkill: 'Materialroutine in einfacher Folge lesen',
    text: ['Das Heft liegt im Fach.', 'Ein Kind holt das Heft.', 'Dann beginnt die Arbeit.'],
    focusWord: 'Heft',
    symbolLabel: 'Heft in einem Fach',
    comprehensionPrompt: 'Was liegt im Fach?',
    reducedChoice: { options: ['Heft', 'Tasse'], answer: 'Heft' },
    supportiveFeedback: 'Die Materialfolge ist im Text sichtbar.',
    nextStep: 'Materialholen mit zweitem Gegenstand lesen.',
    supportSyllables: ['Heft'],
  }),
  makeStory({
    id: 'story-buch-kreis',
    title: 'Das Buch im Kreis',
    cluster: 'Schule und Klassenalltag',
    targetSkill: 'Mitmachhandlung und Gegenstand verstehen',
    text: ['Im Sitzkreis liegt ein Buch.', 'Ein Kind gibt das Buch weiter.', 'Alle schauen auf das Buch.'],
    focusWord: 'Buch',
    symbolLabel: 'Buch im Sitzkreis',
    comprehensionPrompt: 'Was wird weitergegeben?',
    reducedChoice: { options: ['Buch', 'Brot'], answer: 'Buch' },
    supportiveFeedback: 'Die Handlung mit dem Buch ist klar.',
    nextStep: 'Schul-Story mit anderem Gegenstand lesen.',
    supportSyllables: ['Buch'],
  }),
  makeStory({
    id: 'story-tasche-tuer',
    title: 'Die Tasche an der Tür',
    cluster: 'Schule und Klassenalltag',
    targetSkill: 'Start in den Schultag mit Material verstehen',
    text: ['Die Tasche steht an der Tür.', 'Ein Kind nimmt die Tasche.', 'Dann beginnt der Tag.'],
    focusWord: 'Tasche',
    symbolLabel: 'Tasche an der Tür',
    comprehensionPrompt: 'Was steht an der Tür?',
    reducedChoice: { options: ['Tasche', 'Tasse'], answer: 'Tasche' },
    supportiveFeedback: 'Du hast das Material erkannt.',
    nextStep: 'Start-Szene mit Ranzen wiederholen.',
    supportSyllables: ['Ta', 'sche'],
  }),
  makeStory({
    id: 'story-tafel-wort',
    title: 'Das Wort an der Tafel',
    cluster: 'Schule und Klassenalltag',
    targetSkill: 'Unterrichtsort und Lesewort verbinden',
    text: ['An der Tafel steht ein Wort.', 'Ein Kind zeigt das Wort.', 'Die Klasse schaut mit.'],
    focusWord: 'Tafel',
    symbolLabel: 'Wort an der Tafel',
    comprehensionPrompt: 'Wo steht ein Wort?',
    reducedChoice: { options: ['Tafel', 'Hof'], answer: 'Tafel' },
    supportiveFeedback: 'Der Ort steht direkt im Satz.',
    nextStep: 'Tafel-Satz mit Bildhilfe wiederholen.',
    supportSyllables: ['Ta', 'fel'],
  }),
  makeStory({
    id: 'story-kreis-kissen',
    title: 'Das Kissen im Kreis',
    cluster: 'Schule und Klassenalltag',
    targetSkill: 'Sitzkreis und Platz im Raum verstehen',
    text: ['Im Kreis liegt ein Kissen.', 'Ein Kind setzt sich dazu.', 'Alle bleiben ruhig.'],
    focusWord: 'Kreis',
    symbolLabel: 'Kissen im Sitzkreis',
    comprehensionPrompt: 'Wo liegt ein Kissen?',
    reducedChoice: { options: ['Kreis', 'Bus'], answer: 'Kreis' },
    supportiveFeedback: 'Der Kreis ist als Ort markiert.',
    nextStep: 'Kreis-Szene mit Platz wiederholen.',
    supportSyllables: ['Kreis'],
  }),
  makeStory({
    id: 'story-heft-ablegen',
    title: 'Das Heft wird abgelegt',
    cluster: 'Schule und Klassenalltag',
    targetSkill: 'Materialroutine in zwei Orten verstehen',
    text: ['Das Heft liegt auf dem Tisch.', 'Ein Kind legt es ins Fach.', 'Der Tisch ist frei.'],
    focusWord: 'Heft',
    symbolLabel: 'Heft auf dem Tisch',
    comprehensionPrompt: 'Was liegt auf dem Tisch?',
    reducedChoice: { options: ['Heft', 'Hut'], answer: 'Heft' },
    supportiveFeedback: 'Die Materialfolge ist im Text sichtbar.',
    nextStep: 'Ablage mit anderem Material wiederholen.',
    supportSyllables: ['Heft'],
  }),
  makeStory({
    id: 'story-kind-hilft',
    title: 'Ein Kind hilft',
    cluster: 'Sozial und emotional',
    targetSkill: 'Einfache Hilfehandlung aus dem Text entnehmen',
    text: ['Ein Kind fällt hin.', 'Ein anderes Kind hilft.', 'Beide sitzen ruhig.'],
    focusWord: 'Hilfe',
    symbolLabel: 'Ein Kind hilft einem anderen Kind',
    comprehensionPrompt: 'Was macht das andere Kind?',
    reducedChoice: { options: ['hilft', 'wartet'], answer: 'hilft' },
    supportiveFeedback: 'Die Hilfehandlung steht direkt im Text.',
    nextStep: 'Danach Hilfe und ruhig sitzen verbinden.',
    supportSyllables: ['Hil', 'fe'],
  }),
  makeStory({
    id: 'story-ball-teilen',
    title: 'Wir teilen den Ball',
    cluster: 'Sozial und emotional',
    targetSkill: 'Soziale Handlung in kurzer Szene verstehen',
    text: ['Zwei Kinder haben einen Ball.', 'Ein Kind gibt den Ball weiter.', 'Beide spielen zusammen.'],
    focusWord: 'Ball',
    symbolLabel: 'Zwei Kinder teilen einen Ball',
    comprehensionPrompt: 'Was gibt das Kind weiter?',
    reducedChoice: { options: ['Ball', 'Heft'], answer: 'Ball' },
    supportiveFeedback: 'Teilen ist als Handlung klar sichtbar.',
    nextStep: 'Teilen mit anderem Gegenstand anbieten.',
    supportSyllables: ['Ball'],
  }),
  makeStory({
    id: 'story-platz-warten',
    title: 'Ein Platz bleibt frei',
    cluster: 'Sozial und emotional',
    targetSkill: 'Warten und Teilhabe in einer Gruppe verstehen',
    text: ['Ein Platz bleibt frei.', 'Ein Kind kommt dazu.', 'Die Gruppe wartet kurz.'],
    focusWord: 'Platz',
    symbolLabel: 'Freier Platz im Kreis',
    comprehensionPrompt: 'Was bleibt frei?',
    reducedChoice: { options: ['Platz', 'Brot'], answer: 'Platz' },
    supportiveFeedback: 'Der freie Platz steht im Mittelpunkt.',
    nextStep: 'Warten mit Sitzkreis-Szene wiederholen.',
    supportSyllables: ['Platz'],
  }),
  makeStory({
    id: 'story-freude-buch',
    title: 'Freude über das Buch',
    cluster: 'Sozial und emotional',
    targetSkill: 'Ein sichtbares Gefühl mit einem Gegenstand verbinden',
    text: ['Ein Kind bekommt ein Buch.', 'Das Kind schaut froh.', 'Es zeigt das Buch.'],
    focusWord: 'Freude',
    symbolLabel: 'Kind zeigt ein Buch mit Freude',
    comprehensionPrompt: 'Was bekommt das Kind?',
    reducedChoice: { options: ['Buch', 'Hut'], answer: 'Buch' },
    supportiveFeedback: 'Das Buch ist im Text genannt.',
    nextStep: 'Gefühl mit zweitem Gegenstand lesen.',
    supportSyllables: ['Freu', 'de'],
  }),
  makeStory({
    id: 'story-kind-fragt',
    title: 'Ein Kind fragt',
    cluster: 'Sozial und emotional',
    targetSkill: 'Ruhige Fragehandlung in der Gruppe verstehen',
    text: ['Ein Kind hebt die Hand.', 'Die Lehrkraft hört zu.', 'Das Kind stellt eine Frage.'],
    focusWord: 'Frage',
    symbolLabel: 'Handmeldung mit Frage',
    comprehensionPrompt: 'Was stellt das Kind?',
    reducedChoice: { options: ['Frage', 'Tasse'], answer: 'Frage' },
    supportiveFeedback: 'Die Fragehandlung steht direkt im Text.',
    nextStep: 'Frage-Szene mit Bildhilfe wiederholen.',
    supportSyllables: ['Fra', 'ge'],
  }),
  makeStory({
    id: 'story-brot-teilen',
    title: 'Brot wird geteilt',
    cluster: 'Sozial und emotional',
    targetSkill: 'Teilen als kurze Alltagshandlung lesen',
    text: ['Ein Kind hat Brot.', 'Ein anderes Kind schaut hin.', 'Beide teilen das Brot.'],
    focusWord: 'Brot',
    symbolLabel: 'Zwei Kinder teilen Brot',
    comprehensionPrompt: 'Was teilen die Kinder?',
    reducedChoice: { options: ['Brot', 'Buch'], answer: 'Brot' },
    supportiveFeedback: 'Teilen ist als Handlung klar sichtbar.',
    nextStep: 'Teilen mit Ball wiederholen.',
    supportSyllables: ['Brot'],
  }),
  makeStory({
    id: 'story-ruhig-warten',
    title: 'Ruhig warten',
    cluster: 'Sozial und emotional',
    targetSkill: 'Warten und ruhige Handlung im Satz erkennen',
    text: ['Ein Kind wartet ruhig.', 'Ein anderes Kind kommt dazu.', 'Beide gehen zusammen.'],
    focusWord: 'Ruhe',
    symbolLabel: 'Kind wartet ruhig',
    comprehensionPrompt: 'Wie wartet das Kind?',
    reducedChoice: { options: ['ruhig', 'laut'], answer: 'ruhig' },
    supportiveFeedback: 'Ruhig warten steht direkt im Text.',
    nextStep: 'Warten im Kreis wiederholen.',
    supportSyllables: ['Ru', 'he'],
  }),
  makeStory({
    id: 'story-freude-bauen',
    title: 'Freude beim Bauen',
    cluster: 'Sozial und emotional',
    targetSkill: 'Gemeinsames Tun und sichtbares Gefühl verbinden',
    text: ['Zwei Kinder bauen zusammen.', 'Ein Kind gibt einen Stein.', 'Beide freuen sich.'],
    focusWord: 'Freude',
    symbolLabel: 'Zwei Kinder bauen mit Freude',
    comprehensionPrompt: 'Was ist sichtbar?',
    reducedChoice: { options: ['Freude', 'Regen'], answer: 'Freude' },
    supportiveFeedback: 'Freude ist in der Szene sichtbar.',
    nextStep: 'Freude mit anderer Szene lesen.',
    supportSyllables: ['Freu', 'de'],
  }),
];


export function createMiniStoryBridgeMetadata({ focusWord, shortText, comprehensionMoment, pictureCue, supportCue, requiredGraphemes = [], requiredSyllables = [] }) {
  return {
    kind: 'mini-story-bridge',
    focusWord,
    shortText,
    comprehensionMoment,
    pictureCue,
    supportCue,
    requiredGraphemes,
    requiredSyllables,
    localOnly: true,
    nonEvaluative: true,
    nextSmallStep: 'Heute nur verbinden: Wort, Bild und eine kleine Handlung.',
    safetyText: 'Lokale Lernbeobachtung, keine Bewertung und keine feste Einordnung.',
  };
}

export function createWritingBridgeMetadata({ targetWord, actionType, materialCue, supportCue, requiredGraphemes = [], requiredSyllables = [] }) {
  return {
    kind: 'writing-bridge',
    targetWord,
    actionType,
    materialCue,
    optionality: 'optional-heute-passend',
    supportCue,
    requiredGraphemes,
    requiredSyllables,
    localOnly: true,
    nonEvaluative: true,
    noEvaluationWording: 'Nur anbieten, wenn es heute passt; keine Bewertung, kein Vergleich.',
  };
}

export function getTaskBridgeMetadata(taskId) {
  const task = learningTasks.find((item) => item.id === taskId);
  if (!task) return undefined;
  return {
    taskId,
    storyBridge: task.storyBridge,
    writingBridge: task.writingBridge,
  };
}

const learningTasks = [
  makeTask({ id: 'a-mond', level: 'A', type: 'image-word-match', word: 'Mond', pictureHint: 'Bildplatzhalter: Mond am Himmel', prompt: 'Zeige Mond.', options: ['Mond', 'Tasse', 'Sonne'], syllables: ['Mond'] }),
  makeTask({ id: 'a-ball', level: 'A', type: 'image-word-match', word: 'Ball', pictureHint: 'Bildplatzhalter: ein Ball', prompt: 'Zeige Ball.', options: ['Ball', 'Bus', 'Buch'], syllables: ['Ball'] }),
  makeTask({ id: 'a-bus', level: 'A', type: 'image-word-match', word: 'Bus', pictureHint: 'Bildplatzhalter: ein Bus', prompt: 'Zeige Bus.', options: ['Bus', 'Tasse', 'Mond'], syllables: ['Bus'] }),
  makeTask({ id: 'a-hut', level: 'A', type: 'image-word-match', word: 'Hut', pictureHint: 'Bildplatzhalter: ein Hut', prompt: 'Zeige Hut.', options: ['Hut', 'Ball', 'Tasse'], syllables: ['Hut'] }),
  makeTask({ id: 'a-tasse', level: 'A', type: 'image-word-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: eine Tasse', prompt: 'Zeige Tasse.', options: ['Tasse', 'Mond', 'Bus'], syllables: ['Tas', 'se'] }),
  makeTask({ id: 'a-sonne', level: 'A', type: 'image-word-match', word: 'Sonne', pictureHint: 'Bildplatzhalter: Sonne', prompt: 'Wo ist Sonne?', options: ['Sonne', 'Sofa', 'Salat'], syllables: ['Son', 'ne'] }),
  makeTask({ id: 'a-haus', level: 'A', type: 'image-word-match', word: 'Haus', pictureHint: 'Bildplatzhalter: ein Haus', prompt: 'Finde Haus.', options: ['Haus', 'Hut', 'Hand'], syllables: ['Haus'] }),
  makeTask({ id: 'a-maus', level: 'A', type: 'image-word-match', word: 'Maus', pictureHint: 'Bildplatzhalter: eine Maus', prompt: 'Zeige Maus.', options: ['Maus', 'Bus', 'Sonne'], syllables: ['Maus'] }),
  makeTask({ id: 'a-licht', level: 'A', type: 'image-word-match', word: 'Licht', pictureHint: 'Bildplatzhalter: Lampe mit Licht', prompt: 'Zeige Licht.', options: ['Licht', 'Wind', 'Regen'], syllables: ['Licht'] }),
  makeTask({ id: 'a-regen', level: 'A', type: 'image-word-match', word: 'Regen', pictureHint: 'Bildplatzhalter: Regen am Fenster', prompt: 'Zeige Regen.', options: ['Regen', 'Bus', 'Tasse'], syllables: ['Re', 'gen'] }),
  makeTask({ id: 'a-wind', level: 'A', type: 'image-word-match', word: 'Wind', pictureHint: 'Bildplatzhalter: Wind an der Tür', prompt: 'Finde Wind.', options: ['Wind', 'Wort', 'Wald'], syllables: ['Wind'] }),
  makeTask({ id: 'a-blume', level: 'A', type: 'image-word-match', word: 'Blume', pictureHint: 'Bildplatzhalter: Blume auf dem Tisch', prompt: 'Wähle Blume.', options: ['Blume', 'Buch', 'Ball'], syllables: ['Blu', 'me'] }),
  makeTask({ id: 'a-tasche', level: 'A', type: 'image-word-match', word: 'Tasche', pictureHint: 'Bildplatzhalter: Tasche an der Tür', prompt: 'Zeige Tasche.', options: ['Tasche', 'Tasse', 'Tafel'], syllables: ['Ta', 'sche'] }),
  makeTask({ id: 'a-fenster', level: 'A', type: 'image-word-match', word: 'Fenster', pictureHint: 'Bildplatzhalter: offenes Fenster', prompt: 'Finde Fenster.', options: ['Fenster', 'Fisch', 'Finger'], syllables: ['Fens', 'ter'] }),
  makeTask({ id: 'a-tuer', level: 'A', type: 'image-word-match', word: 'Tür', pictureHint: 'Bildplatzhalter: eine Tür', prompt: 'Wo ist Tür?', options: ['Tür', 'Tisch', 'Tasche'], syllables: ['Tür'] }),
  makeTask({ id: 'a-buch', level: 'A', type: 'image-word-match', word: 'Buch', pictureHint: 'Bildplatzhalter: ein Buch', prompt: 'Zeige Buch.', options: ['Buch', 'Bus', 'Brot'], syllables: ['Buch'] }),

  makeTask({ id: 'b-ma-ma', level: 'B', type: 'syllable-blend', word: 'Mama', pictureHint: 'Bildplatzhalter: eine vertraute Person', prompt: 'Lies: Ma - ma.', options: ['Mama', 'Momo', 'Mimi'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'b-so-fa', level: 'B', type: 'syllable-blend', word: 'Sofa', pictureHint: 'Bildplatzhalter: ein Sofa', prompt: 'Lies: So - fa.', options: ['Sofa', 'Sonne', 'Salat'], syllables: ['So', 'fa'] }),
  makeTask({ id: 'b-la-ma', level: 'B', type: 'syllable-blend', word: 'Lama', pictureHint: 'Bildplatzhalter: ein Lama', prompt: 'Lies: La - ma.', options: ['Lama', 'Sofa', 'Rose'], syllables: ['La', 'ma'] }),
  makeTask({ id: 'b-li-mo', level: 'B', type: 'syllable-blend', word: 'Limo', pictureHint: 'Bildplatzhalter: ein Glas Limo', prompt: 'Lies: Li - mo.', options: ['Limo', 'Sofa', 'Nase'], syllables: ['Li', 'mo'] }),
  makeTask({ id: 'b-to-ma-te', level: 'B', type: 'syllable-blend', word: 'Tomate', pictureHint: 'Bildplatzhalter: eine Tomate', prompt: 'Lies: To - ma - te.', options: ['Tomate', 'Tasche', 'Tafel'], syllables: ['To', 'ma', 'te'] }),
  makeTask({ id: 'b-ba-na-ne', level: 'B', type: 'syllable-blend', word: 'Banane', pictureHint: 'Bildplatzhalter: eine Banane', prompt: 'Lies: Ba - na - ne.', options: ['Banane', 'Birne', 'Brot'], syllables: ['Ba', 'na', 'ne'] }),
  makeTask({ id: 'b-ro-se', level: 'B', type: 'syllable-blend', word: 'Rose', pictureHint: 'Bildplatzhalter: eine Rose', prompt: 'Lies: Ro - se.', options: ['Rose', 'Regen', 'Rad'], syllables: ['Ro', 'se'] }),
  makeTask({ id: 'b-na-se', level: 'B', type: 'syllable-blend', word: 'Nase', pictureHint: 'Bildplatzhalter: eine Nase', prompt: 'Lies: Na - se.', options: ['Nase', 'Nuss', 'Nest'], syllables: ['Na', 'se'] }),
  makeTask({ id: 'b-ta-sche', level: 'B', type: 'syllable-blend', word: 'Tasche', pictureHint: 'Bildplatzhalter: Tasche an der Tür', prompt: 'Lies: Ta - sche.', options: ['Tasche', 'Tasse', 'Tafel'], syllables: ['Ta', 'sche'] }),
  makeTask({ id: 'b-ta-fel', level: 'B', type: 'syllable-blend', word: 'Tafel', pictureHint: 'Bildplatzhalter: Wort an der Tafel', prompt: 'Lies: Ta - fel.', options: ['Tafel', 'Tasche', 'Tasse'], syllables: ['Ta', 'fel'] }),
  makeTask({ id: 'b-schu-le', level: 'B', type: 'syllable-blend', word: 'Schule', pictureHint: 'Bildplatzhalter: eine Schule', prompt: 'Lies: Schu - le.', options: ['Schule', 'Tasse', 'Rose'], syllables: ['Schu', 'le'] }),
  makeTask({ id: 'b-blu-me', level: 'B', type: 'syllable-blend', word: 'Blume', pictureHint: 'Bildplatzhalter: Blume auf dem Tisch', prompt: 'Lies: Blu - me.', options: ['Blume', 'Brot', 'Buch'], syllables: ['Blu', 'me'] }),
  makeTask({ id: 'b-re-gen', level: 'B', type: 'syllable-blend', word: 'Regen', pictureHint: 'Bildplatzhalter: Regen am Fenster', prompt: 'Lies: Re - gen.', options: ['Regen', 'Rose', 'Ruhe'], syllables: ['Re', 'gen'] }),
  makeTask({ id: 'b-fens-ter', level: 'B', type: 'syllable-blend', word: 'Fenster', pictureHint: 'Bildplatzhalter: offenes Fenster', prompt: 'Lies: Fens - ter.', options: ['Fenster', 'Tasse', 'Buch'], syllables: ['Fens', 'ter'] }),
  makeTask({ id: 'b-tas-se', level: 'B', type: 'syllable-blend', word: 'Tasse', pictureHint: 'Bildplatzhalter: eine Tasse', prompt: 'Lies: Tas - se.', options: ['Tasse', 'Tasche', 'Tafel'], syllables: ['Tas', 'se'] }),
  makeTask({ id: 'b-son-ne', level: 'B', type: 'syllable-blend', word: 'Sonne', pictureHint: 'Bildplatzhalter: Sonne', prompt: 'Lies: Son - ne.', options: ['Sonne', 'Sofa', 'Salat'], syllables: ['Son', 'ne'] }),

  makeTask({ id: 'c-haus', level: 'C', type: 'word-picture-match', word: 'Haus', pictureHint: 'Bildplatzhalter: ein Haus', prompt: 'Lies Haus. Was passt?', options: ['Haus', 'Hut', 'Hund'], syllables: ['Haus'] }),
  makeTask({ id: 'c-maus', level: 'C', type: 'word-picture-match', word: 'Maus', pictureHint: 'Bildplatzhalter: eine Maus', prompt: 'Lies Maus. Was passt?', options: ['Maus', 'Mond', 'Mama'], syllables: ['Maus'] }),
  makeTask({ id: 'c-fisch', level: 'C', type: 'word-picture-match', word: 'Fisch', pictureHint: 'Bildplatzhalter: ein Fisch', prompt: 'Lies Fisch. Was passt?', options: ['Fisch', 'Fuchs', 'Fuß'], syllables: ['Fisch'] }),
  makeTask({ id: 'c-schule', level: 'C', type: 'word-picture-match', word: 'Schule', pictureHint: 'Bildplatzhalter: eine Schule', prompt: 'Lies Schule. Was passt?', options: ['Schule', 'Schuh', 'Schal'], syllables: ['Schu', 'le'] }),
  makeTask({ id: 'c-rose', level: 'C', type: 'word-picture-match', word: 'Rose', pictureHint: 'Bildplatzhalter: eine Rose', prompt: 'Lies Rose. Was passt?', options: ['Rose', 'Regen', 'Rad'], syllables: ['Ro', 'se'] }),
  makeTask({ id: 'c-nase', level: 'C', type: 'word-picture-match', word: 'Nase', pictureHint: 'Bildplatzhalter: eine Nase', prompt: 'Lies Nase. Was passt?', options: ['Nase', 'Nuss', 'Nest'], syllables: ['Na', 'se'] }),
  makeTask({ id: 'c-ball', level: 'C', type: 'word-picture-match', word: 'Ball', pictureHint: 'Bildplatzhalter: ein Ball', prompt: 'Lies Ball. Was passt?', options: ['Ball', 'Bus', 'Buch'], syllables: ['Ball'] }),
  makeTask({ id: 'c-tasse', level: 'C', type: 'word-picture-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: eine Tasse', prompt: 'Lies Tasse. Was passt?', options: ['Tasse', 'Tisch', 'Tüte'], syllables: ['Tas', 'se'] }),
  makeTask({ id: 'c-licht', level: 'C', type: 'word-picture-match', word: 'Licht', pictureHint: 'Bildplatzhalter: Lampe mit Licht', prompt: 'Lies: Die Lampe macht Licht.', options: ['Licht', 'Regen', 'Buch'], syllables: ['Licht'] }),
  makeTask({ id: 'c-regen', level: 'C', type: 'word-picture-match', word: 'Regen', pictureHint: 'Bildplatzhalter: Regen am Fenster', prompt: 'Lies: Regen am Fenster.', options: ['Regen', 'Rose', 'Rad'], syllables: ['Re', 'gen'] }),
  makeTask({ id: 'c-wind', level: 'C', type: 'word-picture-match', word: 'Wind', pictureHint: 'Bildplatzhalter: Wind an der Tür', prompt: 'Lies: Wind an der Tür.', options: ['Wind', 'Wort', 'Wald'], syllables: ['Wind'] }),
  makeTask({ id: 'c-blume', level: 'C', type: 'word-picture-match', word: 'Blume', pictureHint: 'Bildplatzhalter: Blume auf dem Tisch', prompt: 'Lies: Die Blume steht hier.', options: ['Blume', 'Brot', 'Tasse'], syllables: ['Blu', 'me'] }),
  makeTask({ id: 'c-buch', level: 'C', type: 'word-picture-match', word: 'Buch', pictureHint: 'Bildplatzhalter: ein Buch im Kreis', prompt: 'Lies: Das Buch liegt da.', options: ['Buch', 'Bus', 'Tasse'], syllables: ['Buch'] }),
  makeTask({ id: 'c-heft', level: 'C', type: 'word-picture-match', word: 'Heft', pictureHint: 'Bildplatzhalter: ein Heft auf dem Tisch', prompt: 'Lies: Das Heft liegt.', options: ['Heft', 'Hof', 'Hut'], syllables: ['Heft'] }),
  makeTask({ id: 'c-tisch', level: 'C', type: 'word-picture-match', word: 'Tisch', pictureHint: 'Bildplatzhalter: ein Tisch', prompt: 'Lies: Am Tisch steht etwas.', options: ['Tisch', 'Ball', 'Rose'], syllables: ['Tisch'] }),
  makeTask({ id: 'c-hof', level: 'C', type: 'word-picture-match', word: 'Hof', pictureHint: 'Bildplatzhalter: Schulhof in der Pause', prompt: 'Lies: Im Hof ist Pause.', options: ['Hof', 'Tasse', 'Brot'], syllables: ['Hof'] }),

  // Alpha 30 content pack: controlled, reviewable, stage-aware additions.
  makeTask({ id: 'alpha30-a-mama', level: 'A', type: 'image-word-match', word: 'Mama', pictureHint: 'Bildplatzhalter: vertraute Person', prompt: 'Zeige Mama.', options: ['Mama', 'ma'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha30-a-sofa', level: 'A', type: 'image-word-match', word: 'Sofa', pictureHint: 'Bildplatzhalter: ein Sofa', prompt: 'Zeige Sofa.', options: ['Sofa', 'Mama'], syllables: ['So', 'fa'] }),
  makeTask({ id: 'alpha30-b-ma', level: 'B', type: 'syllable-blend', word: 'Mama', pictureHint: 'Bildplatzhalter: Silbenkarte ma ma', prompt: 'Lies: Ma - ma.', options: ['Mama', 'Sofa'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha30-b-so', level: 'B', type: 'syllable-blend', word: 'Sofa', pictureHint: 'Bildplatzhalter: Silbenkarte so fa', prompt: 'Lies: So - fa.', options: ['Sofa', 'Mama'], syllables: ['So', 'fa'] }),
  makeTask({ id: 'alpha30-b-fa', level: 'B', type: 'syllable-blend', word: 'Mofa', pictureHint: 'Bildplatzhalter: Silbenkarte mo fa', prompt: 'Lies: Mo - fa.', options: ['Mofa', 'Sofa'], syllables: ['Mo', 'fa'] }),
  makeTask({ id: 'alpha30-b-la', level: 'B', type: 'syllable-blend', word: 'Lama', pictureHint: 'Bildplatzhalter: Silbenkarte la ma', prompt: 'Lies: La - ma.', options: ['Lama', 'Mama'], syllables: ['La', 'ma'] }),
  makeTask({ id: 'alpha30-c-mama-da', level: 'C', type: 'word-picture-match', word: 'Mama', pictureHint: 'Bildplatzhalter: Mama ist da', prompt: 'Lies: Mama ist da.', options: ['Mama', 'Sofa'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha30-c-sofa', level: 'C', type: 'word-picture-match', word: 'Sofa', pictureHint: 'Bildplatzhalter: Sofa im Raum', prompt: 'Lies Sofa. Was passt?', options: ['Sofa', 'Mama'], syllables: ['So', 'fa'] }),
  makeTask({ id: 'alpha30-c-limo', level: 'C', type: 'word-picture-match', word: 'Limo', pictureHint: 'Bildplatzhalter: Glas Limo', prompt: 'Lies Limo. Was passt?', options: ['Limo', 'Lama'], syllables: ['Li', 'mo'] }),
  makeTask({ id: 'alpha30-c-tasse-tisch', level: 'C', type: 'word-picture-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: Tasse auf dem Tisch', prompt: 'Lies: Tasse auf dem Tisch.', options: ['Tasse', 'Tisch'], syllables: ['Tas', 'se'] }),

  // Alpha 31 content pack: opt-in, real words, imageable and profile-gated.
  makeTask({ id: 'alpha31-a-mama-symbol', level: 'A', type: 'image-word-match', word: 'Mama', pictureHint: 'Bildplatzhalter: vertraute Person', prompt: 'Zeige Mama.', options: ['Mama', 'ma'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha31-a-sofa-symbol', level: 'A', type: 'image-word-match', word: 'Sofa', pictureHint: 'Bildplatzhalter: Sofa im Zimmer', prompt: 'Zeige Sofa.', options: ['Sofa', 'Mama'], syllables: ['So', 'fa'] }),
  makeTask({ id: 'alpha31-a-tasse-symbol', level: 'A', type: 'image-word-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: Tasse auf dem Tisch', prompt: 'Zeige Tasse.', options: ['Tasse', 'Tisch'], syllables: ['Tas', 'se'] }),
  makeTask({ id: 'alpha31-b-ma', level: 'B', type: 'syllable-blend', word: 'Mama', pictureHint: 'Bildplatzhalter: Silbenkarte ma ma', prompt: 'Lies: Ma - ma.', options: ['Mama', 'ma'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha31-b-so', level: 'B', type: 'syllable-blend', word: 'Sofa', pictureHint: 'Bildplatzhalter: Silbenkarte so fa', prompt: 'Lies: So - fa.', options: ['Sofa', 'Mama'], syllables: ['So', 'fa'] }),
  makeTask({ id: 'alpha31-b-mofa', level: 'B', type: 'syllable-blend', word: 'Mofa', pictureHint: 'Bildplatzhalter: Silbenkarte mo fa', prompt: 'Lies: Mo - fa.', options: ['Mofa', 'Sofa'], syllables: ['Mo', 'fa'] }),
  makeTask({ id: 'alpha31-c-mama-word', level: 'C', type: 'word-picture-match', word: 'Mama', pictureHint: 'Bildplatzhalter: Mama ist da', prompt: 'Lies: Mama ist da.', options: ['Mama', 'Sofa'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha31-c-sofa-word', level: 'C', type: 'word-picture-match', word: 'Sofa', pictureHint: 'Bildplatzhalter: Sofa im Raum', prompt: 'Lies Sofa. Was passt?', options: ['Sofa', 'Mofa'], syllables: ['So', 'fa'] }),
  makeTask({ id: 'alpha31-c-tasse-word', level: 'C', type: 'word-picture-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: Tasse auf dem Tisch', prompt: 'Lies Tasse. Was passt?', options: ['Tasse', 'Tisch'], syllables: ['Tas', 'se'] }),
  makeTask({ id: 'alpha31-c-limo-word', level: 'C', type: 'word-picture-match', word: 'Limo', pictureHint: 'Bildplatzhalter: Glas Limo', prompt: 'Lies Limo. Was passt?', options: ['Limo', 'Sofa'], syllables: ['Li', 'mo'] }),
  makeTask({ id: 'alpha31-c-sofa-sentence', level: 'C', type: 'word-picture-match', word: 'Sofa', pictureHint: 'Bildplatzhalter: Mama sitzt auf dem Sofa', prompt: 'Lies: Mama sitzt auf dem Sofa.', options: ['Sofa', 'Mama'], syllables: ['So', 'fa'], storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Sofa', shortText: 'Mama sitzt auf dem Sofa.', comprehensionMoment: 'Wer sitzt auf dem Sofa?', pictureCue: 'Sofa im Raum', supportCue: 'Satz zeigen, Sofa-Karte daneben legen.', requiredGraphemes: ['s','o','f','a'], requiredSyllables: ['so','fa'] }) }),
  makeTask({ id: 'alpha31-c-tasse-sentence', level: 'C', type: 'word-picture-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: Tasse auf dem Tisch', prompt: 'Lies: Tasse auf Tisch.', options: ['Tasse', 'Tisch'], syllables: ['Tas', 'se'], storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Tasse', shortText: 'Die Tasse steht auf dem Tisch.', comprehensionMoment: 'Wo steht die Tasse?', pictureCue: 'Tasse auf Tisch', supportCue: 'Tasse und Tisch mit echten Gegenständen zeigen.', requiredGraphemes: ['t','a','s','e'], requiredSyllables: ['tas','se'] }) }),
  makeTask({ id: 'alpha31-c-tisch-word', level: 'C', type: 'word-picture-match', word: 'Tisch', pictureHint: 'Bildplatzhalter: Tisch im Raum', prompt: 'Lies Tisch. Was passt?', options: ['Tisch', 'Tasse'], syllables: ['Tisch'] }),
  makeTask({ id: 'alpha31-c-ball-story', level: 'C', type: 'word-picture-match', word: 'Ball', pictureHint: 'Bildplatzhalter: Ball im Zimmer', prompt: 'Lies: Der Ball rollt zum Sofa.', options: ['Ball', 'Sofa'], syllables: ['Ball'], storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Ball', shortText: 'Der Ball rollt zum Sofa.', comprehensionMoment: 'Was rollt zum Sofa?', pictureCue: 'Ball neben Sofa', supportCue: 'Ball langsam rollen lassen, dann Satz lesen.', requiredGraphemes: ['b','a','l'], requiredSyllables: ['ball'] }) }),
  makeTask({ id: 'alpha31-c-sofa-writing', level: 'C', type: 'word-picture-match', word: 'Sofa', pictureHint: 'Bildplatzhalter: Sofa Wortkarte', prompt: 'Lies: Sofa. Fahre nach.', options: ['Sofa', 'so'], syllables: ['So', 'fa'], writingBridge: createWritingBridgeMetadata({ targetWord: 'Sofa', actionType: 'finger-trace-word', materialCue: 'Wortkarte Sofa mit Finger nachfahren.', supportCue: 'Erst gemeinsam lesen, dann freiwillig nachfahren.', requiredGraphemes: ['s','o','f','a'], requiredSyllables: ['so','fa'] }) }),

  // Alpha 49B: tiny known-letter Tasse quality loop; meaning → syllables → contrast → sentence.
  makeTask({ id: 'alpha49b-a-tasse-meaning', level: 'A', type: 'image-word-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: eine Tasse auf dem Tisch', prompt: 'Zeige Tasse.', options: ['Tasse'], syllables: ['Tas', 'se'] }),
  makeTask({ id: 'alpha49b-b-tas-se-repeat', level: 'B', type: 'syllable-blend', word: 'Tasse', pictureHint: 'Bildplatzhalter: Silbenkarte Tas se', prompt: 'Lies: Tas - se.', options: ['Tasse'], syllables: ['Tas', 'se'] }),
  makeTask({ id: 'alpha49b-c-tasse-tasche-contrast', level: 'C', type: 'word-picture-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: Tasse neben Tasche', prompt: 'Lies Tasse. Zeige Tasse.', options: ['Tasse', 'Tasche'], syllables: ['Tas', 'se'] }),
  makeTask({ id: 'alpha49b-c-tasse-sentence', level: 'C', type: 'word-picture-match', word: 'Tasse', pictureHint: 'Bildplatzhalter: Tasse steht da', prompt: 'Lies: Die Tasse steht da.', options: ['Tasse'], syllables: ['Tas', 'se'], storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Tasse', shortText: 'Die Tasse steht da.', comprehensionMoment: 'Was steht da?', pictureCue: 'Tasse auf Tisch', supportCue: 'Tasse-Karte zeigen, Satzstreifen legen und langsam lesen.', requiredGraphemes: ['t','a','s','e'], requiredSyllables: ['tas','se'] }) }),

  // Alpha 51B: tiny second word-family Mama quality loop; meaning → syllables → safe contrast → sentence.
  makeTask({ id: 'alpha51b-a-mama-meaning', level: 'A', type: 'image-word-match', word: 'Mama', pictureHint: 'Bildplatzhalter: vertraute Person ist da', prompt: 'Zeige Mama.', options: ['Mama'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha51b-b-ma-ma-repeat', level: 'B', type: 'syllable-blend', word: 'Mama', pictureHint: 'Bildplatzhalter: Silbenkarte Ma ma', prompt: 'Lies: Ma - ma.', options: ['Mama'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha51b-c-mama-oma-contrast', level: 'C', type: 'word-picture-match', word: 'Mama', pictureHint: 'Bildplatzhalter: Mama-Karte neben Oma-Karte', prompt: 'Lies Mama. Zeige Mama.', options: ['Mama', 'Oma'], syllables: ['Ma', 'ma'] }),
  makeTask({ id: 'alpha51b-c-mama-sentence', level: 'C', type: 'word-picture-match', word: 'Mama', pictureHint: 'Bildplatzhalter: Mama ist da', prompt: 'Lies: Mama ist da.', options: ['Mama'], syllables: ['Ma', 'ma'], storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Mama', shortText: 'Mama ist da.', comprehensionMoment: 'Wer ist da?', pictureCue: 'vertraute Person ist da', supportCue: 'Mama-Karte zeigen, Satzstreifen legen und ruhig lesen.', requiredGraphemes: ['m','a'], requiredSyllables: ['ma'] }) }),

  // Alpha 73A: controlled student everyday vocabulary expansion, metadata-gated and local-only.
  makeTask({ id: 'alpha73a-a-stift', level: 'A', type: 'image-word-match', word: 'Stift', pictureHint: 'Bildplatzhalter: Stift auf dem Tisch', prompt: 'Zeige Stift.', options: ['Stift', 'Heft'], syllables: ['Stift'], vocabularyDomain: 'schule-material', readingComplexity: 'teacher-led-advanced', visibilityGate: 'teacher-led-advanced', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Stift', shortText: 'Der Stift liegt da.', comprehensionMoment: 'Was liegt da?', pictureCue: 'Stift auf dem Tisch', supportCue: 'Stift zeigen, Wortkarte daneben legen.', requiredGraphemes: ['st','i','f','t'], requiredSyllables: ['stift'] }) }),
  makeTask({ id: 'alpha73a-a-heft', level: 'A', type: 'image-word-match', word: 'Heft', pictureHint: 'Bildplatzhalter: Heft auf dem Tisch', prompt: 'Zeige Heft.', options: ['Heft', 'Buch'], syllables: ['Heft'], vocabularyDomain: 'schule-material', readingComplexity: 'medium', visibilityGate: 'teacher-selectable', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Heft', shortText: 'Das Heft liegt da.', comprehensionMoment: 'Was liegt da?', pictureCue: 'Heft auf dem Tisch', supportCue: 'Heft oder Heftkarte zeigen.', requiredGraphemes: ['h','e','f','t'], requiredSyllables: ['heft'] }) }),
  makeTask({ id: 'alpha73a-a-buch', level: 'A', type: 'image-word-match', word: 'Buch', pictureHint: 'Bildplatzhalter: Buch im Kreis', prompt: 'Zeige Buch.', options: ['Buch', 'Heft'], syllables: ['Buch'], vocabularyDomain: 'schule-material', readingComplexity: 'teacher-led-advanced', visibilityGate: 'teacher-led-advanced', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Buch', shortText: 'Das Buch ist da.', comprehensionMoment: 'Was ist da?', pictureCue: 'Buch im Kreis', supportCue: 'Buch aufklappen, Wort gemeinsam lesen.', requiredGraphemes: ['b','u','ch'], requiredSyllables: ['buch'] }) }),
  makeTask({ id: 'alpha73a-a-tuer', level: 'A', type: 'image-word-match', word: 'Tür', pictureHint: 'Bildplatzhalter: Tür im Raum', prompt: 'Zeige Tür.', options: ['Tür', 'Tisch'], syllables: ['Tür'], vocabularyDomain: 'schule-material', readingComplexity: 'teacher-led-advanced', visibilityGate: 'teacher-led-advanced', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Tür', shortText: 'Die Tür ist zu.', comprehensionMoment: 'Was ist zu?', pictureCue: 'Tür im Raum', supportCue: 'Zur Tür zeigen, dann Wortkarte legen.', requiredGraphemes: ['t','ü','r'], requiredSyllables: ['tür'] }) }),
  makeTask({ id: 'alpha73a-b-brot', level: 'B', type: 'syllable-blend', word: 'Brot', pictureHint: 'Bildplatzhalter: Brot auf dem Teller', prompt: 'Lies: Bro - t.', options: ['Brot', 'Ball'], syllables: ['Bro', 't'], vocabularyDomain: 'essen-trinken', readingComplexity: 'medium', visibilityGate: 'teacher-selectable', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Brot', shortText: 'Das Brot liegt da.', comprehensionMoment: 'Was liegt da?', pictureCue: 'Brot auf Teller', supportCue: 'Brotkarte zeigen und Wort gemeinsam lesen.', requiredGraphemes: ['b','r','o','t'], requiredSyllables: ['bro','t'] }) }),
  makeTask({ id: 'alpha73a-b-banane', level: 'B', type: 'syllable-blend', word: 'Banane', pictureHint: 'Bildplatzhalter: Banane auf dem Tisch', prompt: 'Lies: Ba - na - ne.', options: ['Banane', 'Brot'], syllables: ['Ba', 'na', 'ne'], vocabularyDomain: 'essen-trinken', readingComplexity: 'very-early', visibilityGate: 'teacher-selectable', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Banane', shortText: 'Die Banane liegt da.', comprehensionMoment: 'Was liegt da?', pictureCue: 'Banane auf dem Tisch', supportCue: 'Silben klatschen: Ba-na-ne.', requiredGraphemes: ['b','a','n','e'], requiredSyllables: ['ba','na','ne'] }) }),
  makeTask({ id: 'alpha73a-b-wasser', level: 'B', type: 'syllable-blend', word: 'Wasser', pictureHint: 'Bildplatzhalter: Glas Wasser', prompt: 'Lies: Was - ser.', options: ['Wasser', 'Banane'], syllables: ['Was', 'ser'], vocabularyDomain: 'essen-trinken', readingComplexity: 'medium', visibilityGate: 'teacher-selectable', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Wasser', shortText: 'Das Wasser steht da.', comprehensionMoment: 'Was steht da?', pictureCue: 'Glas Wasser', supportCue: 'Becher zeigen, Wort gemeinsam lesen.', requiredGraphemes: ['w','a','s','e','r'], requiredSyllables: ['was','ser'] }) }),
  makeTask({ id: 'alpha73a-b-apfel', level: 'B', type: 'syllable-blend', word: 'Apfel', pictureHint: 'Bildplatzhalter: Apfel auf dem Tisch', prompt: 'Lies: Ap - fel.', options: ['Apfel', 'Banane'], syllables: ['Ap', 'fel'], vocabularyDomain: 'essen-trinken', readingComplexity: 'teacher-led-advanced', visibilityGate: 'teacher-led-advanced', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Apfel', shortText: 'Der Apfel ist da.', comprehensionMoment: 'Was ist da?', pictureCue: 'Apfel auf dem Tisch', supportCue: 'Apfelkarte zeigen, Pf-Laut gemeinsam tragen.', requiredGraphemes: ['a','pf','e','l'], requiredSyllables: ['ap','fel'] }) }),
  makeTask({ id: 'alpha73a-c-hand', level: 'C', type: 'word-picture-match', word: 'Hand', pictureHint: 'Bildplatzhalter: eine Hand', prompt: 'Lies Hand. Was passt?', options: ['Hand', 'Hut'], syllables: ['Hand'], vocabularyDomain: 'koerper-kleidung', readingComplexity: 'medium', visibilityGate: 'teacher-selectable', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Hand', shortText: 'Die Hand zeigt.', comprehensionMoment: 'Was zeigt?', pictureCue: 'Hand zeigt', supportCue: 'Eigene Hand zeigen, dann Wortkarte lesen.', requiredGraphemes: ['h','a','n','d'], requiredSyllables: ['hand'] }) }),
  makeTask({ id: 'alpha73a-c-fuss', level: 'C', type: 'word-picture-match', word: 'Fuß', pictureHint: 'Bildplatzhalter: ein Fuß', prompt: 'Lies Fuß. Was passt?', options: ['Fuß', 'Hand'], syllables: ['Fuß'], vocabularyDomain: 'koerper-kleidung', readingComplexity: 'teacher-led-advanced', visibilityGate: 'teacher-led-advanced', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Fuß', shortText: 'Der Fuß ist da.', comprehensionMoment: 'Was ist da?', pictureCue: 'Fuß am Boden', supportCue: 'Zum Fuß zeigen, ß gemeinsam lesen.', requiredGraphemes: ['f','u','ß'], requiredSyllables: ['fuß'] }) }),
  makeTask({ id: 'alpha73a-c-schuh', level: 'C', type: 'word-picture-match', word: 'Schuh', pictureHint: 'Bildplatzhalter: ein Schuh', prompt: 'Lies Schuh. Was passt?', options: ['Schuh', 'Jacke'], syllables: ['Schuh'], vocabularyDomain: 'koerper-kleidung', readingComplexity: 'teacher-led-advanced', visibilityGate: 'teacher-led-advanced', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Schuh', shortText: 'Der Schuh steht da.', comprehensionMoment: 'Was steht da?', pictureCue: 'Schuh am Platz', supportCue: 'Schuh zeigen, Sch gemeinsam sprechen.', requiredGraphemes: ['sch','u','h'], requiredSyllables: ['schuh'] }) }),
  makeTask({ id: 'alpha73a-c-jacke', level: 'C', type: 'word-picture-match', word: 'Jacke', pictureHint: 'Bildplatzhalter: eine Jacke am Haken', prompt: 'Lies Jacke. Was passt?', options: ['Jacke', 'Schuh'], syllables: ['Ja', 'cke'], vocabularyDomain: 'koerper-kleidung', readingComplexity: 'teacher-led-advanced', visibilityGate: 'teacher-led-advanced', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Jacke', shortText: 'Die Jacke hängt da.', comprehensionMoment: 'Was hängt da?', pictureCue: 'Jacke am Haken', supportCue: 'Jacke zeigen, Wort gemeinsam lesen.', requiredGraphemes: ['j','a','ck','e'], requiredSyllables: ['ja','cke'] }) }),
  makeTask({ id: 'alpha73a-a-ball', level: 'A', type: 'image-word-match', word: 'Ball', pictureHint: 'Bildplatzhalter: Ball im Raum', prompt: 'Zeige Ball.', options: ['Ball', 'Bus'], syllables: ['Ball'], vocabularyDomain: 'alltag-spiel-orientierung', readingComplexity: 'medium', visibilityGate: 'immediate-child-visible', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Ball', shortText: 'Der Ball rollt.', comprehensionMoment: 'Was rollt?', pictureCue: 'Ball am Boden', supportCue: 'Ball rollen lassen, Wortkarte zeigen.', requiredGraphemes: ['b','a','l'], requiredSyllables: ['ball'] }) }),
  makeTask({ id: 'alpha73a-a-bus', level: 'A', type: 'image-word-match', word: 'Bus', pictureHint: 'Bildplatzhalter: Bus an der Haltestelle', prompt: 'Zeige Bus.', options: ['Bus', 'Ball'], syllables: ['Bus'], vocabularyDomain: 'alltag-spiel-orientierung', readingComplexity: 'medium', visibilityGate: 'teacher-selectable', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Bus', shortText: 'Der Bus kommt.', comprehensionMoment: 'Was kommt?', pictureCue: 'Bus an der Haltestelle', supportCue: 'Buskarte zeigen, Wort gemeinsam lesen.', requiredGraphemes: ['b','u','s'], requiredSyllables: ['bus'] }) }),
  makeTask({ id: 'alpha73a-c-tisch', level: 'C', type: 'word-picture-match', word: 'Tisch', pictureHint: 'Bildplatzhalter: Tisch im Raum', prompt: 'Lies Tisch. Was passt?', options: ['Tisch', 'Sofa'], syllables: ['Tisch'], vocabularyDomain: 'alltag-spiel-orientierung', readingComplexity: 'teacher-led-advanced', visibilityGate: 'teacher-led-advanced', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Tisch', shortText: 'Der Tisch steht da.', comprehensionMoment: 'Was steht da?', pictureCue: 'Tisch im Raum', supportCue: 'Tisch zeigen, ch gemeinsam lesen.', requiredGraphemes: ['t','i','sch'], requiredSyllables: ['tisch'] }) }),
  makeTask({ id: 'alpha73a-b-sofa', level: 'B', type: 'syllable-blend', word: 'Sofa', pictureHint: 'Bildplatzhalter: Sofa im Raum', prompt: 'Lies: So - fa.', options: ['Sofa', 'Bus'], syllables: ['So', 'fa'], vocabularyDomain: 'alltag-spiel-orientierung', readingComplexity: 'very-early', visibilityGate: 'immediate-child-visible', localOnly: true, externalMediaDependency: false, storyBridge: createMiniStoryBridgeMetadata({ focusWord: 'Sofa', shortText: 'Das Sofa ist da.', comprehensionMoment: 'Was ist da?', pictureCue: 'Sofa im Raum', supportCue: 'Silben So-fa legen und lesen.', requiredGraphemes: ['s','o','f','a'], requiredSyllables: ['so','fa'] }) }),

  // Alpha 40B: tiny early communication-word slice, profile-gated and local-only.
  makeTask({ id: 'alpha40-a-ich', level: 'A', type: 'image-word-match', word: 'Ich', pictureHint: 'Bildplatzhalter: Ich-Karte mit Zeigegeste', prompt: 'Zeige Ich.', options: ['Ich', 'Da'], syllables: ['Ich'] }),
  makeTask({ id: 'alpha40-a-da', level: 'A', type: 'image-word-match', word: 'Da', pictureHint: 'Bildplatzhalter: Da-Karte mit Zeigepunkt', prompt: 'Zeige Da.', options: ['Da', 'Ich'], syllables: ['Da'] }),
  makeTask({ id: 'alpha40-a-ja', level: 'A', type: 'image-word-match', word: 'Ja', pictureHint: 'Bildplatzhalter: Ja-Karte mit Zustimmungsgeste', prompt: 'Zeige Ja.', options: ['Ja', 'Nein'], syllables: ['Ja'] }),
  makeTask({ id: 'alpha40-b-nein', level: 'A', type: 'image-word-match', word: 'Nein', pictureHint: 'Bildplatzhalter: Nein-Karte mit Stopp-Geste', prompt: 'Zeige Nein.', options: ['Nein', 'Ja'], syllables: ['Nein'] }),
];

export const profileBuilderOptions = {
  graphemes: ['m', 'a', 's', 'o', 'f', 'l', 'p', 'i', 'n', 'e', 't', 'b', 'u', 'h', 'd', 'j', 'au', 'ch', 'ei', 'sch', 'st'],
  syllables: ['ma', 'so', 'fa', 'la', 'ap', 'fel', 'li', 'mo', 'ba', 'na', 'ne', 'ta', 'tas', 'se', 'sche', 'te', 're', 'gen', 'blu', 'me', 'bus', 'buch', 'tisch', 'heft', 'ich', 'da', 'ja', 'nein'],
  supportSettings: [
    { id: 'imageHelp', label: 'Bildhilfe' },
    { id: 'gestureHint', label: 'Gebärden-Hinweis' },
    { id: 'reducedChoices', label: 'Weniger Auswahl' },
    { id: 'teacherReadAloud', label: 'Lehrkraft liest an' },
    { id: 'repeat', label: 'Wiederholung' },
  ],
  readiness: [
    { id: 'sentence', label: 'Satz heute mit Hilfe' },
    { id: 'story', label: 'Mini-Geschichte heute mit Hilfe' },
    { id: 'writingBridge', label: 'Schreibbrücke heute optional' },
  ],
  accessFocus: [
    { id: 'picture-symbol', label: 'Bild/Symbol' },
    { id: 'syllable', label: 'Silbe' },
    { id: 'word', label: 'Wort' },
    { id: 'sentence', label: 'Satz' },
    { id: 'story', label: 'Mini-Geschichte' },
    { id: 'writing-bridge', label: 'Schreibbrücke' },
  ],
};

function normalizeProfileBuilderList(values, allowedValues) {
  const allowed = new Set(allowedValues.map((value) => value.toLocaleLowerCase('de-DE')));
  return [...new Set((Array.isArray(values) ? values : [])
    .map((value) => String(value).trim().toLocaleLowerCase('de-DE'))
    .filter((value) => allowed.has(value)))]
    .sort((left, right) => allowedValues.indexOf(left) - allowedValues.indexOf(right));
}


export const wortpostProfileControlUnits = {
  graphemes: ['m', 'a', 's', 'o', 'f', 'l', 't', 'e', 'b', 'h'],
  syllables: ['ma', 'so', 'fa', 'la', 'tas', 'se', 'heft'],
};

export function getWortpostProfilePresets() {
  return [
    {
      id: 'start-ma',
      label: 'Start: m + a',
      knownGraphemes: ['m', 'a'],
      knownSyllables: ['ma'],
      accessFocus: 'syllable',
      supportSettings: { imageHelp: true, reducedChoices: true },
      readiness: { sentence: 'later', story: 'later', writingBridge: 'later' },
      teacherHint: 'Kleiner Silbenstart mit Bildhilfe und kleiner Auswahl.',
    },
    {
      id: 'sofa-path',
      label: 'Sofa-Pfad',
      knownGraphemes: ['m', 'a', 's', 'o', 'f'],
      knownSyllables: ['ma', 'so', 'fa'],
      accessFocus: 'word',
      supportSettings: { imageHelp: true, reducedChoices: false },
      readiness: { sentence: 'later', story: 'later', writingBridge: 'later' },
      teacherHint: 'Wortaufbau mit Sofa-nahen Einheiten vorbereiten.',
    },
    {
      id: 'sentence-ready',
      label: 'Satz bereit',
      knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'],
      knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'],
      accessFocus: 'sentence',
      supportSettings: { imageHelp: true, reducedChoices: false },
      readiness: { sentence: 'supported', story: 'later', writingBridge: 'later' },
      teacherHint: 'Nach der Wortkarte kann ein kurzer Satz mitgehen.',
    },
    {
      id: 'heft-review',
      label: 'Heft prüfen',
      knownGraphemes: ['h', 'e', 'f', 't'],
      knownSyllables: ['heft'],
      accessFocus: 'word',
      supportSettings: { imageHelp: true, reducedChoices: false },
      readiness: { sentence: 'supported', story: 'supported', writingBridge: 'later' },
      teacherHint: 'Heft bewusst als schulnahen Mini-Reise-Anker prüfen, ohne den frühen Kinderpfad zu öffnen.',
    },
  ];
}

export function createLocalDidacticProfile(input = {}) {
  const supportInput = input.supportSettings ?? input.supportNeeds ?? {};
  const readinessInput = input.readiness ?? input.localReadiness ?? {};
  const supportSettings = {
    imageHelp: Boolean(supportInput.imageHelp ?? supportInput.image),
    gestureHint: Boolean(supportInput.gestureHint ?? supportInput.gesture),
    reducedChoices: Boolean(supportInput.reducedChoices),
    teacherReadAloud: Boolean(supportInput.teacherReadAloud ?? supportInput.readAloud),
    repeat: Boolean(supportInput.repeat ?? supportInput.repetition),
    teacherLed: true,
  };
  const readiness = {
    sentence: readinessInput.sentence === 'supported' || readinessInput.sentence === true ? 'supported' : 'later',
    story: readinessInput.story === 'supported' || readinessInput.story === true ? 'supported' : 'later',
    writingBridge: readinessInput.writingBridge === 'optional' || readinessInput.writingBridge === true ? 'optional' : 'later',
  };
  const accessFocusIds = profileBuilderOptions.accessFocus.map((item) => item.id);
  const accessFocus = accessFocusIds.includes(input.accessFocus) ? input.accessFocus : 'syllable';

  return {
    id: 'local-teacher-preview',
    profileId: 'local-teacher-preview',
    label: 'Lokales Unterrichtsprofil',
    readingStage: 5,
    knownGraphemes: normalizeProfileBuilderList(input.knownGraphemes, profileBuilderOptions.graphemes),
    knownSyllables: normalizeProfileBuilderList(input.knownSyllables, profileBuilderOptions.syllables),
    supportSettings,
    readiness,
    accessFocus,
    localOnly: true,
    anonymous: true,
    persistent: false,
  };
}

export const learningCheckSteps = [
  { id: 'picture-symbol', label: 'Bild/Symbol ansehen', teacherCue: 'Bild zeigen, Wort ruhig nennen, Blick oder Zeigen beobachten.' },
  { id: 'syllable', label: 'Silbe klatschen/lesen', teacherCue: 'Ma gemeinsam sprechen, klatschen oder legen.' },
  { id: 'word', label: 'Wort lesen/erkennen', teacherCue: 'Mama in kleiner Auswahl anbieten.' },
  { id: 'sentence-story', label: 'Kurzer Satz oder Mini-Geschichte', teacherCue: 'Einen kurzen Satz lesen und eine konkrete Frage anbieten.' },
  { id: 'writing-bridge', label: 'Optionale Schreibbrücke', teacherCue: 'Nur wenn es heute passt: nachlegen, nachspuren oder abschreiben.' },
];

export function createLearningCheckObservation(input = {}) {
  return {
    localOnly: true,
    anonymous: true,
    persistent: false,
    imageSupportUsed: Boolean(input.imageSupportUsed),
    gestureOrReadAloudUsed: Boolean(input.gestureOrReadAloudUsed),
    reducedChoicesUsed: Boolean(input.reducedChoicesUsed),
    repeatUsed: Boolean(input.repeatUsed),
    syllableStepComfortable: Boolean(input.syllableStepComfortable),
    wordStepComfortable: Boolean(input.wordStepComfortable),
    sentenceOrStoryReady: Boolean(input.sentenceOrStoryReady),
    writingBridgeReady: Boolean(input.writingBridgeReady),
  };
}

function getLearningCheckProfileInput(observation) {
  const supportSettings = {
    imageHelp: observation.imageSupportUsed || observation.reducedChoicesUsed || !observation.syllableStepComfortable,
    gestureHint: observation.gestureOrReadAloudUsed,
    reducedChoices: observation.reducedChoicesUsed || !observation.wordStepComfortable,
    teacherReadAloud: observation.gestureOrReadAloudUsed || !observation.sentenceOrStoryReady,
    repeat: observation.repeatUsed,
  };

  if (observation.sentenceOrStoryReady) {
    return { knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l', 'i', 'n', 'e', 't'], knownSyllables: ['ma', 'so', 'fa', 'la', 'li', 'ta', 'te'], supportSettings, accessFocus: observation.writingBridgeReady ? 'writing-bridge' : 'story' };
  }
  if (observation.wordStepComfortable) {
    return { knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], supportSettings, accessFocus: 'word' };
  }
  return { knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], supportSettings, accessFocus: observation.syllableStepComfortable ? 'syllable' : 'picture-symbol' };
}

export function getLearningCheckSummary(observationInput = {}) {
  const observation = createLearningCheckObservation(observationInput);
  const supports = [];
  if (observation.imageSupportUsed) supports.push('Bildhilfe');
  if (observation.gestureOrReadAloudUsed) supports.push('Geste oder Vorlesen');
  if (observation.reducedChoicesUsed) supports.push('kleine Auswahl');
  if (observation.repeatUsed) supports.push('Wiederholung');
  const ready = observation.sentenceOrStoryReady ? 'kurzer Satz oder Mini-Geschichte' : observation.wordStepComfortable ? 'Wortebene' : observation.syllableStepComfortable ? 'Silbe' : 'Bild/Symbol';
  return { readyFocus: ready, supportLabels: supports.length > 0 ? supports : ['ruhiger gemeinsamer Start'], note: 'Lokale Beobachtung für die heutige Planung, ohne Namen und ohne Speicherung.' };
}

export function getLearningCheckDailyPath(observationInput = {}, options = {}) {
  const observation = createLearningCheckObservation(observationInput);
  const profile = createLocalDidacticProfile(getLearningCheckProfileInput(observation));
  const adaptive = getAdaptiveNextStepForProfile(profile, { minimumChoices: options.minimumChoices ?? 1, maxCards: options.maxCards ?? maxDailyPathCards });
  const summary = getLearningCheckSummary(observation);
  const supportPlan = [...adaptive.supportPlan];
  if (observation.repeatUsed && !supportPlan.some((item) => item.includes('noch einmal'))) supportPlan.push('Eine Wiederholung fest einplanen.');
  if (observation.reducedChoicesUsed && !supportPlan.some((item) => item.includes('Auswahl klein'))) supportPlan.push('Auswahl klein halten.');
  return {
    observation,
    derivedProfile: profile,
    pathCards: adaptive.pathCards,
    recommendedFocus: adaptive.recommendedFocus,
    todayStart: `Heute starten mit ${adaptive.pathCards.map((card) => card.word).slice(0, 3).join(', ') || summary.readyFocus}.`,
    nextSmallStep: adaptive.nextSmallStep,
    supportPlan,
    writingBridgeSuggestion: observation.writingBridgeReady ? adaptive.writingBridgeSuggestion ?? 'Kleine Schreibbrücke: Mama nachlegen oder abschreiben.' : undefined,
    safetyNote: 'Lokale Planungsstütze: kein Test, keine feste Einordnung, keine Speicherung und kein Vergleich.',
    summary,
  };
}

export function getChildOrientationSteps(observationInput = {}) {
  const path = getLearningCheckDailyPath(observationInput, { minimumChoices: 1 });
  const labels = [
    ['picture-symbol', 'Bild', 'Bild anschauen: Wir finden zuerst Bedeutung.'],
    ['syllable', 'Silbe', 'Silbe sprechen: Wir hören den Klang.'],
    ['word', 'Wort', 'Wort lesen: Wir verbinden Klang und Zeichen.'],
    ['sentence', 'Satz', 'Kurzer Satz: Wir lesen, was passiert.'],
    ['story', 'Mini-Geschichte', 'Mini-Geschichte: Wir verstehen eine kleine Szene.'],
    ['writing-bridge', 'Schreibbrücke', 'Schreibbrücke: Nur wenn es heute passt, legen oder spuren wir ein Wort.'],
  ];
  const activeFocus = path.recommendedFocus === 'sentence-story' ? 'story' : path.recommendedFocus;
  const activeIndex = Math.max(0, labels.findIndex(([id]) => id === activeFocus));
  return labels.map(([id, label, childText], index) => ({
    id,
    label,
    childText,
    state: index < activeIndex ? 'done' : index === activeIndex ? 'current' : 'next',
  }));
}

export function getProgressionPathForProfile(profileInput = {}, options = {}) {
  const adaptive = getAdaptiveNextStepForProfile(profileInput, options);
  return {
    profileId: adaptive.profileId,
    todayPathLabel: 'Tagespfad',
    currentAction: adaptive.nextSmallStep,
    nextAction: adaptive.supportPlan[0] ?? 'Gemeinsam lesen und danach den nächsten kleinen Schritt wählen.',
    steps: getChildOrientationSteps({
      syllableStepComfortable: adaptive.recommendedFocus !== 'picture-symbol',
      wordStepComfortable: adaptive.pathCards.length >= 2,
      sentenceOrStoryReady: adaptive.pathCards.length >= 3,
      writingBridgeReady: Boolean(adaptive.writingBridgeSuggestion),
    }),
    pathCards: adaptive.pathCards,
    safetyNote: adaptive.safetyNote,
  };
}

function getSupportPlanForProfile(profile) {
  const support = profile?.supportSettings ?? {};
  const plan = [];
  if (support.imageHelp) plan.push('Bildhilfe sichtbar lassen.');
  if (support.gestureHint) plan.push('Gebärde kurz vormachen und dann gemeinsam lesen.');
  if (support.reducedChoices) plan.push('Auswahl klein halten.');
  if (support.teacherReadAloud) plan.push('Lehrkraft liest kurz an, danach in Ruhe wiederholen.');
  if (support.repeat) plan.push('Dieselbe Struktur heute noch einmal anbieten.');
  return plan.length > 0 ? plan : ['Ruhig starten; Hilfe erst zuschalten, wenn sie im Unterricht gebraucht wird.'];
}

function getActiveSupportLabels(profile) {
  const support = profile?.supportSettings ?? {};
  const labels = [];
  if (support.imageHelp) labels.push('Bildhilfe');
  if (support.gestureHint) labels.push('Gebärden-Hinweis');
  if (support.reducedChoices) labels.push('kleine Auswahl');
  if (support.teacherReadAloud) labels.push('Lehrkraft liest an');
  if (support.repeat) labels.push('Wiederholung');
  return labels;
}

function getReadinessLabels(profile) {
  const readiness = profile?.readiness ?? {};
  return [
    readiness.sentence === 'supported' ? 'Satz heute mit Hilfe' : 'Satz später',
    readiness.story === 'supported' ? 'Mini-Geschichte heute mit Hilfe' : 'Mini-Geschichte später',
    readiness.writingBridge === 'optional' ? 'Schreibbrücke heute optional' : 'Schreibbrücke später',
  ];
}

export function getLocalObservationControlSummary(profileInput = {}, adaptiveInput) {
  const profile = profileInput?.profileId === 'local-teacher-preview' ? profileInput : createLocalDidacticProfile(profileInput);
  const adaptive = adaptiveInput ?? getAdaptiveNextStepForProfile(profile, { minimumChoices: 1 });
  const graphemeText = (profile.knownGraphemes ?? []).join(', ') || 'gemeinsam gewählte Grapheme';
  const syllableText = (profile.knownSyllables ?? []).join(', ') || 'gemeinsam getragene Silben';
  const supportLabels = getActiveSupportLabels(profile);
  const readinessLabels = getReadinessLabels(profile);
  const firstCardWords = (adaptive.pathCards ?? []).map((card) => card.word).slice(0, 3).join(', ');
  const fitReasons = [];
  if ((profile.knownGraphemes ?? []).length > 0) fitReasons.push('bekannte Grapheme');
  if ((profile.knownSyllables ?? []).length > 0) fitReasons.push('sichere Silben');
  if (supportLabels.length > 0) fitReasons.push('sichtbare Hilfe');
  if ((profile.readiness?.story === 'supported') || (profile.readiness?.writingBridge === 'optional')) fitReasons.push('lokale Bereitschaft');

  return {
    todayFocus: `Heute im Blick: ${graphemeText} · ${syllableText}`,
    helpSummary: `Hilfe: ${supportLabels.join(', ') || 'ruhiger gemeinsamer Start'}`,
    readinessSummary: readinessLabels.join(' · '),
    nextStep: adaptive.nextSmallStep,
    whyItFits: `Warum passt das? Die Auswahl nutzt ${fitReasons.join(', ')} und bleibt bei ${firstCardWords || 'einem ruhigen gemeinsamen Start'}.`,
    omitSummary: (adaptive.omittedReasonSample ?? []).length > 0
      ? `Heute auslassen: Aufgaben mit neuen oder zu vielen Einheiten (${adaptive.omittedReasonSample.slice(0, 3).join(', ')}).`
      : 'Heute auslassen: nichts aus der Stichprobe; trotzdem ruhig bei kleiner Auswahl bleiben.',
    localSafety: 'Lokale Unterrichtsspur: anonym, ohne Speicherung und ohne feste Einordnung.',
  };
}

export function getCuratedObservationTasksForProfile(profileInput = {}) {
  const profile = profileInput?.profileId === 'local-teacher-preview' ? profileInput : createLocalDidacticProfile(profileInput);
  const firstGrapheme = profile.knownGraphemes?.[0] ?? 'm';
  const firstSyllable = profile.knownSyllables?.[0] ?? 'ma';
  const word = (profile.knownSyllables ?? []).includes('so') && (profile.knownSyllables ?? []).includes('fa') ? 'Sofa' : 'Mama';
  const tasks = [
    { id: 'alpha34b-picture-word', observationKind: 'picture-symbol', title: 'Bild/Symbol → Wort', childPrompt: `Zeige ${word}.`, supportCue: 'Bild oder Gegenstand sichtbar lassen; Auswahl klein halten.', teacherRationale: 'Bedeutung wird zuerst gesichert, bevor Schrift erweitert wird.' },
    { id: 'alpha34b-grapheme', observationKind: 'grapheme', title: 'Bekanntes Graphem wiederfinden', childPrompt: `Finde ${firstGrapheme}.`, supportCue: 'Buchstabenkarte zeigen und gemeinsam sprechen.', teacherRationale: 'Bekannte Grapheme bleiben Ausgangspunkt; neue Einheiten werden nicht gleichzeitig verlangt.' },
    { id: 'alpha34b-syllable', observationKind: 'syllable', title: 'Sichere Silbe sprechen oder legen', childPrompt: `Sprich ${firstSyllable}.`, supportCue: 'Silbe klatschen, legen oder mitsprechen lassen.', teacherRationale: 'Sichere Silben bilden den ruhigen Übergang vom Zeichen zum Wort.' },
    { id: 'alpha34b-word', observationKind: 'word', title: 'Zwei Silben zu einem Wort verbinden', childPrompt: `Lies ${word}.`, supportCue: 'Silben sichtbar lassen und das Wort gemeinsam aufbauen.', teacherRationale: 'Das Wort nutzt bekannte Silben und bleibt in reduzierter Auswahl.' },
    { id: 'alpha34b-sentence', observationKind: 'sentence', title: 'Kurzer Satz mit Bildbezug', childPrompt: `${word} ist da.`, supportCue: 'Satz zeigen, Bild daneben lassen und bei Bedarf vorlesen.', teacherRationale: 'Der Satz wird nur als unterstützte Unterrichtsspur angeboten.' },
    { id: 'alpha34b-mini-story', observationKind: 'mini-story', title: 'Mini-Geschichte in zwei Schritten', childPrompt: `${word} ist da. Wir zeigen ${word}.`, supportCue: 'Zwei kurze Sinnschritte mit Bildfolge anbieten.', teacherRationale: 'Mini-Geschichte prüft Folgebezug ohne inhaltliche Überladung.' },
    { id: 'alpha34b-writing-bridge', observationKind: 'writing-bridge', title: 'Schreibbrücke: Wort nachspuren', childPrompt: `${word} nachfahren.`, supportCue: 'Wortkarte legen; Nachspuren bleibt freiwillige Materialhandlung.', teacherRationale: 'Schreiben ist hier eine optionale Brücke nach einem vertrauten Wort.' },
  ];
  return tasks.map((task) => ({ ...task, localOnly: true }));
}

export function getLocalReadingSeriesForProfile(profileInput = {}, adaptiveInput) {
  const profile = profileInput?.profileId === 'local-teacher-preview' ? profileInput : createLocalDidacticProfile(profileInput);
  const adaptive = adaptiveInput ?? getAdaptiveNextStepForProfile(profile, { minimumChoices: 1 });
  const tasks = getCuratedObservationTasksForProfile(profile);
  const taskById = Object.fromEntries(tasks.map((task) => [task.id, task]));
  const firstWord = adaptive.pathCards?.[0]?.word ?? ((profile.knownSyllables ?? []).includes('so') ? 'Sofa' : 'Mama');
  const firstSyllable = profile.knownSyllables?.[0] ?? 'ma';
  const supportLabels = getActiveSupportLabels(profile);
  const supportLabel = supportLabels.slice(0, 2).join(' und ') || 'ruhiger gemeinsamer Start';
  const sentenceReady = profile.readiness?.sentence === 'supported';
  const storyReady = profile.readiness?.story === 'supported';
  const writingReady = profile.readiness?.writingBridge === 'optional';

  const makeSeries = ({ id, title, taskIds, startLabel, repeatLabel, nextStepLabel, supportLabel: ownSupportLabel, omitLabel, exampleMaterial, recommendation = false }) => ({
    id,
    title,
    taskIds,
    startLabel,
    repeatLabel,
    nextStepLabel,
    supportLabel: ownSupportLabel,
    omitLabel,
    exampleMaterial,
    materialLabels: taskIds.map((taskId) => taskById[taskId]?.title).filter(Boolean),
    safetyNote: 'Lokal, anonym, ohne Speicherung und ohne feste Einordnung.',
    recommendation,
    localOnly: true,
  });

  return [
    makeSeries({
      id: 'arrival-recognition',
      title: 'Ankommen mit Bild und Silbe',
      taskIds: ['alpha34b-picture-word', 'alpha34b-grapheme', 'alpha34b-syllable'],
      startLabel: `${firstWord} mit Bildkarte oder Gegenstand ruhig zeigen.`,
      repeatLabel: `${firstSyllable} erst zeigen, dann sprechen, klatschen und legen.`,
      nextStepLabel: 'Vom Bild aus eine sichere Silbe oder ein erstes Wort gemeinsam lesen.',
      supportLabel,
      omitLabel: 'Heute reicht Bild oder Gegenstand, wenn Schrift noch nicht ruhig mitgeht.',
      exampleMaterial: {
        label: 'Beispiel: Ball sehen und lesen.',
        symbol: localSymbolCues.Ball.token,
        visual: 'Bildkarte Ball',
        syllable: 'Ball',
        word: 'Ball',
        sentence: 'Ball zeigen und lesen.',
        miniStory: 'Ball zeigen. Ball lesen oder sprechen.',
        help: 'Ball zeigen. Langsam sprechen. Ein Schritt nach dem anderen.',
      },
      recommendation: !sentenceReady,
    }),
    makeSeries({
      id: 'syllables-carry',
      title: 'Silben verbinden',
      taskIds: ['alpha34b-syllable', 'alpha34b-word'],
      startLabel: `${firstSyllable} gemeinsam sprechen und sichtbar lassen.`,
      repeatLabel: 'Erst die Silbe hören und legen, dann das Wort zusammenziehen.',
      nextStepLabel: `${firstWord} gemeinsam lesen und Auswahl klein halten.`,
      supportLabel: 'Silbenklatschen, Legematerial und gemeinsames Mitsprechen.',
      omitLabel: 'Überspringen, wenn die Silbe heute noch nicht sicher gelegt oder gesprochen wird.',
      exampleMaterial: {
        label: 'Beispiel: ma / ma legen.',
        symbol: localSymbolCues.Mama.token,
        visual: 'Silbenkarte Mama',
        syllable: 'ma / ma',
        word: 'Mama',
        sentence: 'Daraus wird Mama.',
        miniStory: 'Silben klatschen. Dann zusammenziehen.',
        help: 'Silben trennen. Klatschen. Legen. Sprechen.',
      },
      recommendation: sentenceReady && !storyReady,
    }),
    makeSeries({
      id: 'words-in-sentence',
      title: 'Wort im Satz',
      taskIds: ['alpha34b-word', 'alpha34b-sentence'],
      startLabel: `${firstWord} als bekanntes Wort mit Bildkarte aufnehmen.`,
      repeatLabel: 'Der gleiche Satztyp kommt wieder, nur mit kleiner Veränderung.',
      nextStepLabel: 'Einen kurzen Satzstreifen anbieten und bekannte Wörter markieren.',
      supportLabel: 'Satzstreifen, Bildkarte und kurzes Anlesen durch die Lehrkraft.',
      omitLabel: 'Heute bei der Wortebene bleiben, wenn Satzlesen noch zu viel ist.',
      exampleMaterial: {
        label: 'Beispiel: Tasse im Satz finden.',
        symbol: localSymbolCues.Tasse.token,
        visual: 'Satzstreifen Tasse',
        syllable: 'Tas / se',
        word: 'Tasse',
        sentence: 'Die Tasse steht auf dem Tisch.',
        miniStory: 'Tasse finden. Wort zeigen.',
        help: 'Wort markieren. Zwei Antworten zeigen: Tisch oder Bett.',
      },
      recommendation: sentenceReady && !storyReady,
    }),
    makeSeries({
      id: 'mini-story-writing-bridge',
      title: 'Geschichte und Schreibbrücke',
      taskIds: ['alpha34b-mini-story', 'alpha34b-writing-bridge'],
      startLabel: `${firstWord} in zwei kurzen Bildschritten erzählen.`,
      repeatLabel: 'Die Bildfolge bleibt gleich; erzählen und verstehen laufen gemeinsam.',
      nextStepLabel: writingReady ? 'Wortkarte freiwillig legen, nachfahren oder kurz nachspuren.' : 'Nur die Mini-Geschichte mit Hilfe anbieten; Schreibbrücke später.',
      supportLabel: 'Bildfolge, Vormachen und eine sehr kurze Materialhandlung.',
      omitLabel: 'Überspringen, wenn Satzfolge oder Schreibhandlung heute motorisch zu viel wäre.',
      exampleMaterial: {
        label: 'Beispiel: Hut in einer Mini-Geschichte verstehen.',
        symbol: localSymbolCues.Hut.token,
        visual: 'Drei Bildschritte Hut',
        syllable: 'Hut',
        word: 'Hut',
        sentence: 'Der Hut hängt am Haken.',
        miniStory: 'Der Hut hängt am Haken. Dann ist der Haken leer.',
        help: 'Bildfolge festlegen. Schreiben optional: legen oder nachspuren.',
      },
      recommendation: storyReady || writingReady,
    }),
  ];
}

function getFocusLabel(focusId) {
  return profileBuilderOptions.accessFocus.find((item) => item.id === focusId)?.label ?? 'Silbe';
}

export function getAdaptiveNextStepForProfile(profileInput = {}, options = {}) {
  const profile = profileInput?.profileId === 'local-teacher-preview' ? profileInput : createLocalDidacticProfile(profileInput);
  const dailyPath = getProfileSafeDailyPath(profile, { minimumChoices: options.minimumChoices ?? 1, maxCards: options.maxCards ?? maxDailyPathCards });
  const coverage = getTaskRequirementCoverageSummary(profile, { minimumChoices: options.minimumChoices ?? 1, sampleLimit: 4 });
  const developmentCoverage = getDevelopmentCoverageSummary({ sampleLimit: 4 });
  const cards = dailyPath.cards;
  const firstCard = cards[0];
  const writingBridge = firstCard ? getWritingBridgeForTask(firstCard.taskId) : undefined;
  const known = new Set(profile.knownGraphemes ?? []);
  const supportHeavy = Object.values(profile.supportSettings ?? {}).filter(Boolean).length >= 3;
  const hasMAOnly = known.has('m') && known.has('a') && known.size <= 2;
  const hasMASOF = ['m', 'a', 's', 'o', 'f'].every((unit) => known.has(unit));
  const recommendedFocus = supportHeavy
    ? 'picture-symbol'
    : profile.accessFocus === 'writing-bridge' && writingBridge
      ? 'writing-bridge'
      : cards.length >= 3
        ? 'word'
        : profile.accessFocus;
  const nextSmallStep = hasMAOnly
    ? 'Mit Mama starten: Ma–ma klatschen, Bildhilfe nutzen und nur eine sichere Option zeigen.'
    : hasMASOF
      ? 'Mama und Sofa als kleinen Pfad anbieten; Auswahl reduziert lassen und beide Silben ruhig verbinden.'
      : cards.length >= 3
        ? `Heute ${cards.slice(0, 3).map((card) => card.word).join(', ')} als kleinen A/B-Pfad nutzen und eine Schreibbrücke anschließen.`
        : firstCard
          ? `${firstCard.word} gemeinsam lesen und danach dieselbe Silbenstruktur wiederholen.`
          : 'Mit Bild/Symbol und Lehrkraftführung starten; erst danach weitere Grapheme oder Silben ergänzen.';

  return {
    profileId: 'local-teacher-preview',
    pathCards: cards,
    recommendedFocus,
    nextSmallStep,
    explanation: `${cards.length} passende Karte(n) gefunden. Schwerpunkt heute: ${getFocusLabel(recommendedFocus)}. ${coverage.summary} Leseleiter-Abdeckung: ${developmentCoverage.summary}`,
    supportPlan: getSupportPlanForProfile(profile),
    omittedReasonSample: dailyPath.blockedTaskIds.slice(0, 4),
    writingBridgeSuggestion: writingBridge ? `${writingBridge.title}: ${writingBridge.childPrompt ?? writingBridge.teacherHint ?? 'optional anbieten'}` : undefined,
    safetyNote: 'Nur lokale Planungsstütze: anonym, ohne Speicherung und ohne feste Einordnung.',
  };
}

export function getTeacherWordFamilyReviewSlices() {
  return [
    {
      id: 'tasse',
      word: 'Tasse',
      title: 'Vorhandene Wortfamilie sichten: Tasse',
      chainLabel: 'Bild/Bedeutung · Silbe Tas-se · Kontrast Tasse/Tasche · kurzer Satz',
      teacherCue: 'Manuell vorbereiten: echte Tasse oder Karte bereitlegen und den ruhigen Anschluss nur bei Bedarf anbieten.',
      taskIds: ['alpha49b-a-tasse-meaning', 'alpha49b-b-tas-se-repeat', 'alpha49b-c-tasse-tasche-contrast', 'alpha49b-c-tasse-sentence'],
      localOnly: true,
      manualOnly: true,
      readOnly: true,
      persistent: false,
    },
    {
      id: 'mama',
      word: 'Mama',
      title: 'Vorhandene Wortfamilie sichten: Mama',
      chainLabel: 'Bild/Bedeutung · Silbe Ma-ma · Kontrast Mama/Oma · kurzer Satz',
      teacherCue: 'Manuell vorbereiten: vertraute Personenkarte ruhig nutzen und nur als möglichen Anschluss mitnehmen.',
      taskIds: ['alpha51b-a-mama-meaning', 'alpha51b-b-ma-ma-repeat', 'alpha51b-c-mama-oma-contrast', 'alpha51b-c-mama-sentence'],
      localOnly: true,
      manualOnly: true,
      readOnly: true,
      persistent: false,
    },
  ];
}

export function getTeacherDevelopmentOverview(profileInput = {}, options = {}) {
  const profile = profileInput?.profileId === 'local-teacher-preview' ? profileInput : createLocalDidacticProfile(profileInput);
  const nextStep = getAdaptiveNextStepForProfile(profile, { minimumChoices: options.minimumChoices ?? 1, maxCards: options.maxCards ?? maxDailyPathCards });
  const observationSummary = getLocalObservationControlSummary(profile, nextStep);
  const knownGraphemes = profile.knownGraphemes?.length ? profile.knownGraphemes.join(', ') : 'noch gemeinsam prüfen';
  const knownSyllables = profile.knownSyllables?.length ? profile.knownSyllables.join(', ') : 'noch gemeinsam prüfen';
  const supportPlan = nextStep.supportPlan?.length ? nextStep.supportPlan.join(' ') : observationSummary.helpSummary.replace(/^Hilfe:\s*/, '');
  const orientationParts = [getFocusLabel(nextStep.recommendedFocus)];
  if (profile.readiness?.sentence === 'supported') orientationParts.push('Satz heute mit Hilfe');
  if (profile.readiness?.story === 'supported') orientationParts.push('Mini-Geschichte heute mit Hilfe');
  if (profile.readiness?.writingBridge === 'optional') orientationParts.push('Schreibbrücke optional');

  return {
    title: 'Arbeitsstand und nächster möglicher Anschluss',
    knownUnitsLabel: 'Bekannte Einheiten',
    knownUnits: `Grapheme: ${knownGraphemes}. Silben: ${knownSyllables}.`,
    supportLabel: 'Aktuelle Hilfe',
    support: supportPlan,
    orientationLabel: 'Orientierung',
    orientation: `Orientierung: ${orientationParts.join(', ')}.`,
    nextConnectionLabel: 'Nächster möglicher Anschluss',
    nextConnection: `Nächster möglicher Anschluss: ${nextStep.nextSmallStep}`,
    safetyNote: 'Nur Orientierung, keine Bewertung. Lokal, anonym und erst nach bewusster Auswahl für den Unterricht nutzen.',
    localOnly: true,
    manualOnly: true,
    persistent: false,
  };
}

export const readingProfileExamples = {
  profileMA: {
    id: 'profile-ma',
    label: 'Profil M+A',
    readingStage: 5,
    knownGraphemes: ['m', 'a'],
    knownSyllables: ['ma'],
    supportSettings: { reducedChoices: true, teacherLed: true },
  },
  profileMASOF: {
    id: 'profile-ma-sof',
    label: 'Profil M+A+S+O+F',
    readingStage: 5,
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    supportSettings: { reducedChoices: true, teacherLed: true },
  },
  profileLAM: {
    id: 'profile-lam',
    label: 'Profil L+A+M',
    readingStage: 5,
    knownGraphemes: ['l', 'a', 'm'],
    knownSyllables: ['la', 'ma'],
    supportSettings: { reducedChoices: true, teacherLed: true },
  },
};


function makeAlpha31Requirement(taskId, targetWord, targetSyllables, optionWords, minReadingStage = 5, complexUnits = []) {
  const targetGraphemes = [...new Set(graphemesForWord(targetWord))];
  return {
    taskId,
    targetWord,
    targetGraphemes,
    targetSyllables,
    syllablePattern: 'alpha31-controlled',
    minReadingStage,
    optionWords,
    optionGraphemes: [...new Set(targetGraphemes.concat(optionWords).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha31-controlled',
    complexUnits,
    requiresTeacherReview: complexUnits.length > 0,
    graphemeNotes: 'Alpha 31 Pack: opt-in, echte Wörter, lokale Profilpassung.',
    qualityStatus: complexUnits.length > 0 ? 'teacher_review' : 'reviewed_safe',
    controlledUseNote: 'Alpha 31: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  };
}

function makeAlpha49Requirement(taskId, optionWords = ['Tasse']) {
  return {
    ...makeAlpha31Requirement(taskId, 'Tasse', ['tas', 'se'], optionWords, 5, optionWords.includes('Tasche') ? ['sch'] : []),
    syllablePattern: 'alpha49b-tas-se-loop',
    wordPattern: 'alpha49b-known-letter-tasse-loop',
    graphemeNotes: optionWords.includes('Tasche') ? 'Alpha 49B: Tasse bleibt Zielwort; Tasche ist nur ein eng geführter Kontrast und darf reduziert werden.' : 'Alpha 49B: Tasse bleibt Zielwort ohne zusätzlichen Kontrastdistraktor.',
    qualityStatus: optionWords.includes('Tasche') ? 'teacher_review' : 'reviewed_safe',
    controlledUseNote: 'Alpha 49B: kleine Tasse-Reihe mit Bild, Silbe, Wortkontrast und kurzem Satz; lokale Profilpassung entscheidet die Auswahl.',
  };
}

function makeAlpha51Requirement(taskId, optionWords = ['Mama']) {
  return {
    ...makeAlpha31Requirement(taskId, 'Mama', ['ma'], optionWords, 5),
    syllablePattern: 'alpha51b-ma-ma-loop',
    wordPattern: 'alpha51b-second-word-family-mama-loop',
    graphemeNotes: optionWords.includes('Oma') ? 'Alpha 51B: Mama bleibt Zielwort; Oma ist nur ein profil-sicherer, alltagsnaher Kontrast mit bekanntem o.' : 'Alpha 51B: Mama bleibt Zielwort ohne zusätzlichen Kontrastdistraktor.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 51B: kleine Mama-Reihe mit Bild, Silbe, Wortkontrast und kurzem Satz; keine automatische Kinderpfad-Erweiterung.',
  };
}

function makeAlpha73Requirement(taskId, targetWord, targetSyllables, optionWords, metadata = {}) {
  const targetGraphemes = [...new Set(graphemesForWord(targetWord))];
  const optionGraphemes = [...new Set(optionWords.flatMap((word) => graphemesForWord(word)).concat(metadata.extraOptionGraphemes ?? []))];
  const complexUnits = metadata.complexUnits ?? [];
  const advanced = complexUnits.length > 0 || metadata.readingComplexity === 'teacher-led-advanced';
  return {
    taskId,
    targetWord,
    targetGraphemes: [...new Set(targetGraphemes.concat(metadata.extraTargetGraphemes ?? []))],
    targetSyllables,
    syllablePattern: metadata.syllablePattern ?? 'alpha73a-controlled-everyday-word',
    minReadingStage: metadata.minReadingStage ?? 5,
    optionWords,
    optionGraphemes,
    wordPattern: metadata.wordPattern ?? 'alpha73a-everyday-vocabulary',
    complexUnits,
    requiresTeacherReview: advanced,
    graphemeNotes: metadata.graphemeNotes ?? 'Alpha 73A: alltagsnahes Wort, lokal getaggt und durch Profilpassung begrenzt.',
    qualityStatus: advanced ? 'teacher_review' : 'reviewed_safe',
    controlledUseNote: advanced
      ? 'Alpha 73A: komplexe Einheit oder Cluster nur lehrkraftgeführt, mit Bild/Gegenstand und reduzierter Auswahl einsetzen.'
      : 'Alpha 73A: alltagsnahes Wort bleibt lokal, konkret und profilabhängig auswählbar.',
  };
}

const alpha73RequirementDefinitions = [
  ['alpha73a-a-stift', 'Stift', ['stift'], ['Stift', 'Heft'], { readingComplexity: 'teacher-led-advanced', complexUnits: ['st'], extraTargetGraphemes: ['st'] }],
  ['alpha73a-a-heft', 'Heft', ['heft'], ['Heft', 'Buch'], { readingComplexity: 'medium' }],
  ['alpha73a-a-buch', 'Buch', ['buch'], ['Buch', 'Heft'], { readingComplexity: 'teacher-led-advanced', complexUnits: ['ch'] }],
  ['alpha73a-a-tuer', 'Tür', ['tür'], ['Tür', 'Tisch'], { readingComplexity: 'teacher-led-advanced', complexUnits: ['ü', 'sch'] }],
  ['alpha73a-b-brot', 'Brot', ['bro', 't'], ['Brot', 'Ball'], { readingComplexity: 'medium' }],
  ['alpha73a-b-banane', 'Banane', ['ba', 'na', 'ne'], ['Banane', 'Brot'], { readingComplexity: 'very-early' }],
  ['alpha73a-b-wasser', 'Wasser', ['was', 'ser'], ['Wasser', 'Banane'], { readingComplexity: 'medium' }],
  ['alpha73a-b-apfel', 'Apfel', ['ap', 'fel'], ['Apfel', 'Banane'], { readingComplexity: 'teacher-led-advanced', complexUnits: ['pf'], extraTargetGraphemes: ['pf'] }],
  ['alpha73a-c-hand', 'Hand', ['hand'], ['Hand', 'Hut'], { readingComplexity: 'medium' }],
  ['alpha73a-c-fuss', 'Fuß', ['fuß'], ['Fuß', 'Hand'], { readingComplexity: 'teacher-led-advanced', complexUnits: ['ß'] }],
  ['alpha73a-c-schuh', 'Schuh', ['schuh'], ['Schuh', 'Jacke'], { readingComplexity: 'teacher-led-advanced', complexUnits: ['sch'] }],
  ['alpha73a-c-jacke', 'Jacke', ['ja', 'cke'], ['Jacke', 'Schuh'], { readingComplexity: 'teacher-led-advanced', complexUnits: ['ck', 'sch'], extraTargetGraphemes: ['ck'] }],
  ['alpha73a-a-ball', 'Ball', ['ball'], ['Ball', 'Bus'], { readingComplexity: 'medium' }],
  ['alpha73a-a-bus', 'Bus', ['bus'], ['Bus', 'Ball'], { readingComplexity: 'medium' }],
  ['alpha73a-c-tisch', 'Tisch', ['tisch'], ['Tisch', 'Sofa'], { readingComplexity: 'teacher-led-advanced', complexUnits: ['sch'] }],
  ['alpha73a-b-sofa', 'Sofa', ['so', 'fa'], ['Sofa', 'Bus'], { readingComplexity: 'very-early' }],
];

export const taskRequirementProfiles = {
  'alpha49b-a-tasse-meaning': makeAlpha49Requirement('alpha49b-a-tasse-meaning'),
  'alpha49b-b-tas-se-repeat': makeAlpha49Requirement('alpha49b-b-tas-se-repeat'),
  'alpha49b-c-tasse-tasche-contrast': makeAlpha49Requirement('alpha49b-c-tasse-tasche-contrast', ['Tasse', 'Tasche']),
  'alpha49b-c-tasse-sentence': makeAlpha49Requirement('alpha49b-c-tasse-sentence'),
  'alpha51b-a-mama-meaning': makeAlpha51Requirement('alpha51b-a-mama-meaning'),
  'alpha51b-b-ma-ma-repeat': makeAlpha51Requirement('alpha51b-b-ma-ma-repeat'),
  'alpha51b-c-mama-oma-contrast': makeAlpha51Requirement('alpha51b-c-mama-oma-contrast', ['Mama', 'Oma']),
  'alpha51b-c-mama-sentence': makeAlpha51Requirement('alpha51b-c-mama-sentence'),
  'alpha40-a-ich': {
    taskId: 'alpha40-a-ich',
    targetWord: 'Ich',
    targetGraphemes: ['i', 'ch'],
    targetSyllables: ['ich'],
    syllablePattern: 'VC complex ch',
    minReadingStage: 5,
    optionWords: ['Ich', 'Da'],
    optionGraphemes: ['i', 'ch', 'd', 'a'],
    wordPattern: 'early communication word',
    complexUnits: ['ch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Kommunikationswort nur nutzen, wenn ch und die Auswahlwörter im lokalen Profil freigegeben sind.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Frühes Kommunikationswort lokal getaggt; bei ch oder Distraktoren nur gemeinsam lesen oder Auswahl reduzieren.',
  },
  'alpha40-a-da': {
    taskId: 'alpha40-a-da',
    targetWord: 'Da',
    targetGraphemes: ['d', 'a'],
    targetSyllables: ['da'],
    syllablePattern: 'CV',
    minReadingStage: 5,
    optionWords: ['Da', 'Ich'],
    optionGraphemes: ['d', 'a', 'i', 'ch'],
    wordPattern: 'early pointing word',
    complexUnits: ['ch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Da selbst ist einfach; Ich als Distraktor kann die Auswahl lehrkraftgeführt machen.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort ist lokal getaggt; Antwortoptionen bleiben profilabhängig reduziert oder gemeinsam geführt.',
  },
  'alpha40-a-ja': {
    taskId: 'alpha40-a-ja',
    targetWord: 'Ja',
    targetGraphemes: ['j', 'a'],
    targetSyllables: ['ja'],
    syllablePattern: 'CV',
    minReadingStage: 5,
    optionWords: ['Ja', 'Nein'],
    optionGraphemes: ['j', 'a', 'n', 'ei'],
    wordPattern: 'early communication word',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Ein kurzes Kommunikationswort; Auswahl bleibt abhängig vom heutigen Profil.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'alpha40-b-nein': {
    taskId: 'alpha40-b-nein',
    targetWord: 'Nein',
    targetGraphemes: ['n', 'ei', 'n'],
    targetSyllables: ['nein'],
    syllablePattern: 'CVVC',
    minReadingStage: 5,
    optionWords: ['Nein', 'Ja'],
    optionGraphemes: ['n', 'ei', 'j', 'a'],
    wordPattern: 'early communication word',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Kommunikationswort als ruhige Auswahl; keine Bewertung oder Verhaltensdeutung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'a-ball': {
    taskId: 'a-ball',
    targetWord: 'Ball',
    targetGraphemes: ['b', 'a', 'l'],
    targetSyllables: ['Ball'],
    syllablePattern: 'CVC double consonant',
    minReadingStage: 5,
    optionWords: ['Ball', 'Bus', 'Buch'],
    optionGraphemes: ['b', 'a', 'l', 'u', 's', 'ch'],
    wordPattern: 'CVC double consonant',
    complexUnits: ['ch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) ch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'a-bus': {
    taskId: 'a-bus',
    targetWord: 'Bus',
    targetGraphemes: ['b', 'u', 's'],
    targetSyllables: ['Bus'],
    syllablePattern: 'CVC',
    minReadingStage: 5,
    optionWords: ['Bus', 'Tasse', 'Mond'],
    optionGraphemes: ['b', 'u', 's', 't', 'a', 'e', 'm', 'o', 'n', 'd'],
    wordPattern: 'CVC',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'a-hut': {
    taskId: 'a-hut',
    targetWord: 'Hut',
    targetGraphemes: ['h', 'u', 't'],
    targetSyllables: ['Hut'],
    syllablePattern: 'CVC',
    minReadingStage: 5,
    optionWords: ['Hut', 'Ball', 'Tasse'],
    optionGraphemes: ['h', 'u', 't', 'b', 'a', 'l', 's', 'e'],
    wordPattern: 'CVC',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'a-tasse': {
    taskId: 'a-tasse',
    targetWord: 'Tasse',
    targetGraphemes: ['t', 'a', 's', 'e'],
    targetSyllables: ['tas', 'se'],
    syllablePattern: 'CVC-CV',
    minReadingStage: 5,
    optionWords: ['Tasse', 'Mond', 'Bus'],
    optionGraphemes: ['t', 'a', 's', 'e', 'm', 'o', 'n', 'd', 'b', 'u'],
    wordPattern: 'CVC-CV',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'a-sonne': {
    taskId: 'a-sonne',
    targetWord: 'Sonne',
    targetGraphemes: ['s', 'o', 'n', 'e'],
    targetSyllables: ['son', 'ne'],
    syllablePattern: 'CVC-CV',
    minReadingStage: 5,
    optionWords: ['Sonne', 'Sofa', 'Salat'],
    optionGraphemes: ['s', 'o', 'n', 'e', 'f', 'a', 'l', 't'],
    wordPattern: 'CVC-CV',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'a-haus': {
    taskId: 'a-haus',
    targetWord: 'Haus',
    targetGraphemes: ['h', 'au', 's'],
    targetSyllables: ['Haus'],
    syllablePattern: 'complex au',
    minReadingStage: 5,
    optionWords: ['Haus', 'Hut', 'Hand'],
    optionGraphemes: ['h', 'au', 's', 'u', 't', 'a', 'n', 'd'],
    wordPattern: 'complex au',
    complexUnits: ['au'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) au nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'a-maus': {
    taskId: 'a-maus',
    targetWord: 'Maus',
    targetGraphemes: ['m', 'au', 's'],
    targetSyllables: ['Maus'],
    syllablePattern: 'complex au',
    minReadingStage: 5,
    optionWords: ['Maus', 'Bus', 'Sonne'],
    optionGraphemes: ['m', 'au', 's', 'b', 'u', 'o', 'n', 'e'],
    wordPattern: 'complex au',
    complexUnits: ['au'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) au nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'a-licht': {
    taskId: 'a-licht',
    targetWord: 'Licht',
    targetGraphemes: ['l', 'i', 'ch', 't'],
    targetSyllables: ['Licht'],
    syllablePattern: 'complex ch',
    minReadingStage: 5,
    optionWords: ['Licht', 'Wind', 'Regen'],
    optionGraphemes: ['l', 'i', 'ch', 't', 'w', 'n', 'd', 'r', 'e', 'g'],
    wordPattern: 'complex ch',
    complexUnits: ['ch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) ch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'a-regen': {
    taskId: 'a-regen',
    targetWord: 'Regen',
    targetGraphemes: ['r', 'e', 'g', 'n'],
    targetSyllables: ['re', 'gen'],
    syllablePattern: 'CV-CVC',
    minReadingStage: 5,
    optionWords: ['Regen', 'Bus', 'Tasse'],
    optionGraphemes: ['r', 'e', 'g', 'n', 'b', 'u', 's', 't', 'a'],
    wordPattern: 'CV-CVC',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'a-wind': {
    taskId: 'a-wind',
    targetWord: 'Wind',
    targetGraphemes: ['w', 'i', 'n', 'd'],
    targetSyllables: ['Wind'],
    syllablePattern: 'CVC cluster',
    minReadingStage: 5,
    optionWords: ['Wind', 'Wort', 'Wald'],
    optionGraphemes: ['w', 'i', 'n', 'd', 'o', 'r', 't', 'a', 'l'],
    wordPattern: 'CVC cluster',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'a-blume': {
    taskId: 'a-blume',
    targetWord: 'Blume',
    targetGraphemes: ['b', 'l', 'u', 'm', 'e'],
    targetSyllables: ['blu', 'me'],
    syllablePattern: 'CCV-CV',
    minReadingStage: 5,
    optionWords: ['Blume', 'Buch', 'Ball'],
    optionGraphemes: ['b', 'l', 'u', 'm', 'e', 'ch', 'a'],
    wordPattern: 'CCV-CV',
    complexUnits: ['ch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) ch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'a-tasche': {
    taskId: 'a-tasche',
    targetWord: 'Tasche',
    targetGraphemes: ['t', 'a', 'sch', 'e'],
    targetSyllables: ['ta', 'sche'],
    syllablePattern: 'CV-complex sche',
    minReadingStage: 5,
    optionWords: ['Tasche', 'Tasse', 'Tafel'],
    optionGraphemes: ['t', 'a', 'sch', 'e', 's', 'f', 'l'],
    wordPattern: 'CV-complex sche',
    complexUnits: ['sch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) sch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'a-fenster': {
    taskId: 'a-fenster',
    targetWord: 'Fenster',
    targetGraphemes: ['f', 'e', 'n', 'st', 'r'],
    targetSyllables: ['fens', 'ter'],
    syllablePattern: 'complex st/ch options',
    minReadingStage: 5,
    optionWords: ['Fenster', 'Fisch', 'Finger'],
    optionGraphemes: ['f', 'e', 'n', 'st', 'r', 'i', 'sch', 'g'],
    wordPattern: 'complex st/ch options',
    complexUnits: ['sch', 'st'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) sch, st nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'a-tuer': {
    taskId: 'a-tuer',
    targetWord: 'Tür',
    targetGraphemes: ['t', 'ü', 'r'],
    targetSyllables: ['Tür'],
    syllablePattern: 'umlaut plus complex options',
    minReadingStage: 5,
    optionWords: ['Tür', 'Tisch', 'Tasche'],
    optionGraphemes: ['t', 'ü', 'r', 'i', 'sch', 'a', 'e'],
    wordPattern: 'umlaut plus complex options',
    complexUnits: ['sch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) sch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'a-buch': {
    taskId: 'a-buch',
    targetWord: 'Buch',
    targetGraphemes: ['b', 'u', 'ch'],
    targetSyllables: ['Buch'],
    syllablePattern: 'complex ch',
    minReadingStage: 5,
    optionWords: ['Buch', 'Bus', 'Brot'],
    optionGraphemes: ['b', 'u', 'ch', 's', 'r', 'o', 't'],
    wordPattern: 'complex ch',
    complexUnits: ['ch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) ch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'b-ma-ma': {
    taskId: 'b-ma-ma',
    targetWord: 'Mama',
    targetGraphemes: ['m', 'a'],
    targetSyllables: ['ma'],
    syllablePattern: 'CV-CV repeated',
    minReadingStage: 5,
    optionWords: ['Mama', 'Momo', 'Mimi'],
    optionGraphemes: ['m', 'a', 'o', 'i'],
    wordPattern: 'CV-CV repeated',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'b-so-fa': {
    taskId: 'b-so-fa',
    targetWord: 'Sofa',
    targetGraphemes: ['s', 'o', 'f', 'a'],
    targetSyllables: ['so', 'fa'],
    syllablePattern: 'CV-CV',
    minReadingStage: 5,
    optionWords: ['Sofa', 'Sonne', 'Salat'],
    optionGraphemes: ['s', 'o', 'f', 'a', 'n', 'e', 'l', 't'],
    wordPattern: 'CV-CV',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'b-la-ma': {
    taskId: 'b-la-ma',
    targetWord: 'Lama',
    targetGraphemes: ['l', 'a', 'm'],
    targetSyllables: ['la', 'ma'],
    syllablePattern: 'CV-CV transfer',
    minReadingStage: 5,
    optionWords: ['Lama', 'Sofa', 'Rose'],
    optionGraphemes: ['l', 'a', 'm', 's', 'o', 'f', 'r', 'e'],
    wordPattern: 'CV-CV transfer',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'b-li-mo': {
    taskId: 'b-li-mo',
    targetWord: 'Limo',
    targetGraphemes: ['l', 'i', 'm', 'o'],
    targetSyllables: ['li', 'mo'],
    syllablePattern: 'CV-CV',
    minReadingStage: 5,
    optionWords: ['Limo', 'Sofa', 'Nase'],
    optionGraphemes: ['l', 'i', 'm', 'o', 's', 'f', 'a', 'n', 'e'],
    wordPattern: 'CV-CV',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'b-to-ma-te': {
    taskId: 'b-to-ma-te',
    targetWord: 'Tomate',
    targetGraphemes: ['t', 'o', 'm', 'a', 'e'],
    targetSyllables: ['to', 'ma', 'te'],
    syllablePattern: 'CV-CV-CV',
    minReadingStage: 5,
    optionWords: ['Tomate', 'Tasche', 'Tafel'],
    optionGraphemes: ['t', 'o', 'm', 'a', 'e', 'sch', 'f', 'l'],
    wordPattern: 'CV-CV-CV',
    complexUnits: ['sch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) sch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'b-ba-na-ne': {
    taskId: 'b-ba-na-ne',
    targetWord: 'Banane',
    targetGraphemes: ['b', 'a', 'n', 'e'],
    targetSyllables: ['ba', 'na', 'ne'],
    syllablePattern: 'CV-CV-CV',
    minReadingStage: 5,
    optionWords: ['Banane', 'Birne', 'Brot'],
    optionGraphemes: ['b', 'a', 'n', 'e', 'i', 'r', 'o', 't'],
    wordPattern: 'CV-CV-CV',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'b-ro-se': {
    taskId: 'b-ro-se',
    targetWord: 'Rose',
    targetGraphemes: ['r', 'o', 's', 'e'],
    targetSyllables: ['ro', 'se'],
    syllablePattern: 'CV-CV',
    minReadingStage: 5,
    optionWords: ['Rose', 'Regen', 'Rad'],
    optionGraphemes: ['r', 'o', 's', 'e', 'g', 'n', 'a', 'd'],
    wordPattern: 'CV-CV',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'b-na-se': {
    taskId: 'b-na-se',
    targetWord: 'Nase',
    targetGraphemes: ['n', 'a', 's', 'e'],
    targetSyllables: ['na', 'se'],
    syllablePattern: 'CV-CV',
    minReadingStage: 5,
    optionWords: ['Nase', 'Nuss', 'Nest'],
    optionGraphemes: ['n', 'a', 's', 'e', 'u', 'st'],
    wordPattern: 'CV-CV',
    complexUnits: ['st'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) st nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'b-ta-sche': {
    taskId: 'b-ta-sche',
    targetWord: 'Tasche',
    targetGraphemes: ['t', 'a', 'sch', 'e'],
    targetSyllables: ['ta', 'sche'],
    syllablePattern: 'CV-complex sche',
    minReadingStage: 5,
    optionWords: ['Tasche', 'Tasse', 'Tafel'],
    optionGraphemes: ['t', 'a', 'sch', 'e', 's', 'f', 'l'],
    wordPattern: 'CV-complex sche',
    complexUnits: ['sch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) sch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'b-ta-fel': {
    taskId: 'b-ta-fel',
    targetWord: 'Tafel',
    targetGraphemes: ['t', 'a', 'f', 'e', 'l'],
    targetSyllables: ['ta', 'fel'],
    syllablePattern: 'CV-CVC',
    minReadingStage: 5,
    optionWords: ['Tafel', 'Tasche', 'Tasse'],
    optionGraphemes: ['t', 'a', 'f', 'e', 'l', 'sch', 's'],
    wordPattern: 'CV-CVC',
    complexUnits: ['sch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) sch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'b-schu-le': {
    taskId: 'b-schu-le',
    targetWord: 'Schule',
    targetGraphemes: ['sch', 'u', 'l', 'e'],
    targetSyllables: ['schu', 'le'],
    syllablePattern: 'complex Schu-CV',
    minReadingStage: 5,
    optionWords: ['Schule', 'Tasse', 'Rose'],
    optionGraphemes: ['sch', 'u', 'l', 'e', 't', 'a', 's', 'r', 'o'],
    wordPattern: 'complex Schu-CV',
    complexUnits: ['sch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) sch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'b-blu-me': {
    taskId: 'b-blu-me',
    targetWord: 'Blume',
    targetGraphemes: ['b', 'l', 'u', 'm', 'e'],
    targetSyllables: ['blu', 'me'],
    syllablePattern: 'CCV-CV',
    minReadingStage: 5,
    optionWords: ['Blume', 'Brot', 'Buch'],
    optionGraphemes: ['b', 'l', 'u', 'm', 'e', 'r', 'o', 't', 'ch'],
    wordPattern: 'CCV-CV',
    complexUnits: ['ch'],
    requiresTeacherReview: true,
    graphemeNotes: 'Komplexe Einheiten konservativ als ganze Einheit behandeln.',
    qualityStatus: 'review_needed_complex_unit',
    controlledUseNote: 'Zielwort und Optionen sind lokal getaggt. Komplexe Einheit(en) ch nur gemeinsam lesen oder vorher fachlich prüfen.',
  },
  'b-re-gen': {
    taskId: 'b-re-gen',
    targetWord: 'Regen',
    targetGraphemes: ['r', 'e', 'g', 'n'],
    targetSyllables: ['re', 'gen'],
    syllablePattern: 'CV-CVC',
    minReadingStage: 5,
    optionWords: ['Regen', 'Rose', 'Ruhe'],
    optionGraphemes: ['r', 'e', 'g', 'n', 'o', 's', 'u', 'h'],
    wordPattern: 'CV-CVC',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Einfache Einheiten; Profilpassung trotzdem an Optionen prüfen.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Zielwort und Antwortoptionen sind lokal getaggt; Auswahl bleibt abhängig vom heutigen Profil.',
  },
  'alpha30-a-mama': {
    taskId: 'alpha30-a-mama',
    targetWord: 'Mama',
    targetGraphemes: ['m','a'],
    targetSyllables: ['ma'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Mama','ma'],
    optionGraphemes: [...new Set(['m','a'] .concat(['Mama','ma']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-a-sofa': {
    taskId: 'alpha30-a-sofa',
    targetWord: 'Sofa',
    targetGraphemes: ['s','o','f','a'],
    targetSyllables: ['so','fa'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Sofa','Mama'],
    optionGraphemes: [...new Set(['s','o','f','a'] .concat(['Sofa','Mama']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-b-ma': {
    taskId: 'alpha30-b-ma',
    targetWord: 'Mama',
    targetGraphemes: ['m','a'],
    targetSyllables: ['ma'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Mama','Sofa'],
    optionGraphemes: [...new Set(['m','a'] .concat(['Mama','Sofa']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-b-so': {
    taskId: 'alpha30-b-so',
    targetWord: 'Sofa',
    targetGraphemes: ['s','o','f','a'],
    targetSyllables: ['so','fa'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Sofa','Mama'],
    optionGraphemes: [...new Set(['s','o','f','a'] .concat(['Sofa','Mama']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-b-fa': {
    taskId: 'alpha30-b-fa',
    targetWord: 'Mofa',
    targetGraphemes: ['m','o','f','a'],
    targetSyllables: ['mo','fa'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Mofa','Sofa'],
    optionGraphemes: [...new Set(['m','o','f','a'] .concat(['Mofa','Sofa']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-b-la': {
    taskId: 'alpha30-b-la',
    targetWord: 'Lama',
    targetGraphemes: ['l','a','m'],
    targetSyllables: ['la','ma'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Lama','Mama'],
    optionGraphemes: [...new Set(['l','a','m'] .concat(['Lama','Mama']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-c-mama-da': {
    taskId: 'alpha30-c-mama-da',
    targetWord: 'Mama',
    targetGraphemes: ['m','a'],
    targetSyllables: ['ma'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Mama','Sofa'],
    optionGraphemes: [...new Set(['m','a'] .concat(['Mama','Sofa']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-c-sofa': {
    taskId: 'alpha30-c-sofa',
    targetWord: 'Sofa',
    targetGraphemes: ['s','o','f','a'],
    targetSyllables: ['so','fa'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Sofa','Mama'],
    optionGraphemes: [...new Set(['s','o','f','a'] .concat(['Sofa','Mama']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-c-limo': {
    taskId: 'alpha30-c-limo',
    targetWord: 'Limo',
    targetGraphemes: ['l','i','m','o'],
    targetSyllables: ['li','mo'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Limo','Lama'],
    optionGraphemes: [...new Set(['l','i','m','o'] .concat(['Limo','Lama']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },
  'alpha30-c-tasse-tisch': {
    taskId: 'alpha30-c-tasse-tisch',
    targetWord: 'Tasse',
    targetGraphemes: ['t','a','s','e'],
    targetSyllables: ['tas','se'],
    syllablePattern: 'alpha30-controlled',
    minReadingStage: 5,
    optionWords: ['Tasse','Tisch'],
    optionGraphemes: [...new Set(['t','a','s','e'] .concat(['Tasse','Tisch']).flatMap((word) => graphemesForWord(word)))],
    wordPattern: 'alpha30-controlled',
    complexUnits: [],
    requiresTeacherReview: false,
    graphemeNotes: 'Alpha 30 Pack: kontrolliert, kleine Auswahl, lokale Profilpassung.',
    qualityStatus: 'reviewed_safe',
    controlledUseNote: 'Alpha 30: Aufgabe bleibt an bekannte Grapheme/Silben und kleine Auswahl gebunden.',
  },

  'alpha31-a-mama-symbol': makeAlpha31Requirement('alpha31-a-mama-symbol', 'Mama', ['ma'], ['Mama','ma'], 5, []),
  'alpha31-a-sofa-symbol': makeAlpha31Requirement('alpha31-a-sofa-symbol', 'Sofa', ['so','fa'], ['Sofa','Mama'], 5, []),
  'alpha31-a-tasse-symbol': makeAlpha31Requirement('alpha31-a-tasse-symbol', 'Tasse', ['tas','se'], ['Tasse','Tisch'], 5, []),
  'alpha31-b-ma': makeAlpha31Requirement('alpha31-b-ma', 'Mama', ['ma'], ['Mama','ma'], 5, []),
  'alpha31-b-so': makeAlpha31Requirement('alpha31-b-so', 'Sofa', ['so','fa'], ['Sofa','Mama'], 5, []),
  'alpha31-b-mofa': makeAlpha31Requirement('alpha31-b-mofa', 'Mofa', ['mo','fa'], ['Mofa','Sofa'], 5, []),
  'alpha31-c-mama-word': makeAlpha31Requirement('alpha31-c-mama-word', 'Mama', ['ma'], ['Mama','Sofa'], 5, []),
  'alpha31-c-sofa-word': makeAlpha31Requirement('alpha31-c-sofa-word', 'Sofa', ['so','fa'], ['Sofa','Mofa'], 5, []),
  'alpha31-c-tasse-word': makeAlpha31Requirement('alpha31-c-tasse-word', 'Tasse', ['tas','se'], ['Tasse','Tisch'], 5, []),
  'alpha31-c-limo-word': makeAlpha31Requirement('alpha31-c-limo-word', 'Limo', ['li','mo'], ['Limo','Sofa'], 5, []),
  'alpha31-c-sofa-sentence': makeAlpha31Requirement('alpha31-c-sofa-sentence', 'Sofa', ['so','fa'], ['Sofa','Mama'], 5, []),
  'alpha31-c-tasse-sentence': makeAlpha31Requirement('alpha31-c-tasse-sentence', 'Tasse', ['tas','se'], ['Tasse','Tisch'], 5, []),
  'alpha31-c-tisch-word': makeAlpha31Requirement('alpha31-c-tisch-word', 'Tisch', ['tisch'], ['Tisch','Tasse'], 5, []),
  'alpha31-c-ball-story': makeAlpha31Requirement('alpha31-c-ball-story', 'Ball', ['ball'], ['Ball','Sofa'], 5, []),
  'alpha31-c-sofa-writing': makeAlpha31Requirement('alpha31-c-sofa-writing', 'Sofa', ['so','fa'], ['Sofa','so'], 5, []),
  ...Object.fromEntries(alpha73RequirementDefinitions.map(([taskId, targetWord, targetSyllables, optionWords, metadata]) => [
    taskId,
    makeAlpha73Requirement(taskId, targetWord, targetSyllables, optionWords, metadata),
  ])),
};

function normalizeUnitList(units = []) {
  return units.map((unit) => String(unit).toLocaleLowerCase('de-DE'));
}

function getMissingUnits(required = [], known = []) {
  const knownSet = new Set(normalizeUnitList(known));
  return normalizeUnitList(required).filter((unit) => !knownSet.has(unit));
}


export const developmentMapDimensions = [
  { id: 'symbolicAccess', label: 'Symbolisch-präliteraler Zugang', description: 'Bild, Gegenstand, Geste oder lokales Symbol als Lesestütze nutzen.' },
  { id: 'logographicAccess', label: 'Logographischer Zugang', description: 'Ganzwort, Form und vertrauten Kontext wiedererkennen.' },
  { id: 'phonologicalAwarenessWide', label: 'Phonologische Bewusstheit weit', description: 'Rhythmus, Reim und Silben als größere Spracheinheiten wahrnehmen.' },
  { id: 'phonologicalAwarenessNarrow', label: 'Phonologische Bewusstheit eng', description: 'Anlaut, Lautfolge oder Synthese bewusst hören und verbinden.' },
  { id: 'graphemeKnowledge', label: 'Graphemwissen', description: 'Buchstaben und Grapheme im Wort sicherer wiederfinden.' },
  { id: 'syllableReading', label: 'Silbenlesen', description: 'Silben klatschen, sehen, lesen oder verbinden.' },
  { id: 'wordReading', label: 'Wortlesen', description: 'Ein Wort lesen, wiedererkennen oder aus Silben aufbauen.' },
  { id: 'sentenceReading', label: 'Satzlesen', description: 'Einen kurzen Satz oder Satzrahmen verstehen.' },
  { id: 'storyComprehension', label: 'Mini-Geschichte', description: 'Eine kurze Geschichte mit einer einfachen Frage verbinden.' },
  { id: 'writingBridge', label: 'Schreibbrücke', description: 'Lesen ruhig mit Nachfahren, Legen, Abschreiben oder Tastatur verbinden.' },
  { id: 'supportNeeds', label: 'Unterstützungsbedarf', description: 'Bildhilfe, reduzierte Auswahl oder gemeinsames Lesen planen.' },
];

const writingBridgeOrder = ['trace', 'select-letter', 'build-syllable', 'copy-word', 'keyboard-word', 'sentence-frame'];

function getEntryLayerForTask(task, requirement) {
  if (!task) return 'symbol';
  if (task.type === 'image-word-match') return requirement.requiresTeacherReview ? 'picture' : 'symbol';
  if (task.type === 'syllable-blend') return 'syllable';
  if (task.type === 'word-picture-match') return 'sentence';
  return 'word';
}

function getReadingAccessLevelForTask(task, requirement) {
  if (!task) return 'praeliteral-symbolisch';
  if (task.level === 'A') return requirement.requiresTeacherReview ? 'alphabetisch' : 'logographemisch';
  if (task.level === 'B') return requirement.complexUnits?.length ? 'orthographisch' : 'alphabetisch';
  if (task.level === 'C') return 'integrativ';
  return 'praeliteral-symbolisch';
}

function getPhonologicalFocusForTask(task, requirement) {
  if (!task) return 'none';
  if (task.type === 'syllable-blend') return requirement.targetSyllables?.length > 1 ? 'syllable' : 'synthesis';
  if (task.level === 'A') return 'onset';
  if (task.level === 'C') return 'synthesis';
  return 'none';
}

function getWritingBridgeTypeForTask(task, requirement) {
  if (!task) return 'none';
  if (task.id === 'b-ma-ma') return 'build-syllable';
  if (task.level === 'A') return 'trace';
  if (task.level === 'B') return requirement.targetSyllables?.length > 1 ? 'build-syllable' : 'select-letter';
  if (task.level === 'C') return 'sentence-frame';
  return 'copy-word';
}

function getImageQualityNeedForTask(task, requirement) {
  if (!task) return 'placeholder-ok';
  if (['Tasche', 'Fenster', 'Tür', 'Schule', 'Licht', 'Haus', 'Maus'].includes(requirement.targetWord)) return 'licensed-asset-slot';
  if (requirement.requiresTeacherReview || ['Sofa', 'Lama', 'Limo', 'Tafel', 'Rose', 'Nase'].includes(requirement.targetWord)) return 'needs-better-local-symbol';
  return 'placeholder-ok';
}

export function getTaskDevelopmentProfile(taskId) {
  const requirement = taskRequirementProfiles[taskId];
  const task = learningTasks.find((item) => item.id === taskId);
  if (!requirement || !task) return undefined;
  const entryLayer = getEntryLayerForTask(task, requirement);
  const phonologicalFocus = getPhonologicalFocusForTask(task, requirement);
  const writingBridgeType = getWritingBridgeTypeForTask(task, requirement);
  const imageQualityNeed = getImageQualityNeedForTask(task, requirement);
  const readingAccessLevel = getReadingAccessLevelForTask(task, requirement);
  const symbolicAccess = entryLayer === 'symbol' || entryLayer === 'picture' || imageQualityNeed !== 'placeholder-ok';
  const syllableReading = task.type === 'syllable-blend' || (requirement.targetSyllables ?? []).length > 1;
  return {
    taskId,
    word: requirement.targetWord,
    entryLayer,
    readingAccessLevel,
    phonologicalFocus,
    writingBridgeType,
    symbolSupportNeed: imageQualityNeed === 'licensed-asset-slot' ? 'essential' : imageQualityNeed === 'needs-better-local-symbol' ? 'helpful' : 'helpful',
    imageQualityNeed,
    teacherReviewReason: requirement.requiresTeacherReview
      ? `Gemeinsam prüfen: ${requirement.complexUnits.join(', ') || 'Optionen'} sind lokal nur konservativ getaggt.`
      : 'Lokal getaggt; Auswahl und Hilfen weiter durch Lehrkraft steuern.',
    childOrientationCue: entryLayer === 'symbol' || entryLayer === 'picture'
      ? 'Schau auf Bild und Wort.'
      : entryLayer === 'syllable'
        ? 'Klatsche und lies die Silben.'
        : entryLayer === 'sentence'
          ? 'Lies den kurzen Satz.'
          : 'Lies das Wort in Ruhe.',
    nextStepIfTooHard: symbolicAccess ? 'Bildhilfe zeigen, Auswahl verkleinern und gemeinsam lesen.' : 'Zum Bild-Wort-Schritt zurückgehen und nur eine Struktur anbieten.',
    nextStepIfTooEasy: writingBridgeType === 'sentence-frame' ? 'Mini-Geschichte mit Satzrahmen anschließen.' : 'Schreibbrücke anbieten oder einen kurzen Satz anschließen.',
    dimensions: {
      symbolicAccess,
      logographicAccess: task.level === 'A',
      phonologicalAwarenessWide: ['rhyme', 'syllable'].includes(phonologicalFocus) || syllableReading,
      phonologicalAwarenessNarrow: ['onset', 'phoneme', 'synthesis'].includes(phonologicalFocus),
      graphemeKnowledge: readingAccessLevel !== 'praeliteral-symbolisch',
      syllableReading,
      wordReading: true,
      sentenceReading: task.level === 'C' || writingBridgeType === 'sentence-frame',
      storyComprehension: false,
      writingBridge: writingBridgeType !== 'none',
      supportNeeds: requirement.requiresTeacherReview || imageQualityNeed !== 'placeholder-ok',
    },
  };
}

export function getDevelopmentCoverageSummary(options = {}) {
  const profiles = Object.keys(taskRequirementProfiles).map((taskId) => getTaskDevelopmentProfile(taskId)).filter(Boolean);
  const layerCounts = profiles.reduce((counts, profile) => ({ ...counts, [profile.entryLayer]: (counts[profile.entryLayer] ?? 0) + 1 }), {});
  const accessCounts = profiles.reduce((counts, profile) => ({ ...counts, [profile.readingAccessLevel]: (counts[profile.readingAccessLevel] ?? 0) + 1 }), {});
  const phonologicalFocusCounts = profiles.reduce((counts, profile) => ({ ...counts, [profile.phonologicalFocus]: (counts[profile.phonologicalFocus] ?? 0) + 1 }), {});
  const writingBridgeCounts = profiles.reduce((counts, profile) => ({ ...counts, [profile.writingBridgeType]: (counts[profile.writingBridgeType] ?? 0) + 1 }), {});
  const dimensionCounts = Object.fromEntries(developmentMapDimensions.map((dimension) => [dimension.id, profiles.filter((profile) => Boolean(profile.dimensions?.[dimension.id])).length]));
  const assetNeeds = profiles.filter((profile) => profile.imageQualityNeed !== 'placeholder-ok').map((profile) => ({ taskId: profile.taskId, word: profile.word, imageQualityNeed: profile.imageQualityNeed }));
  return {
    totalProfiles: profiles.length,
    layerCounts,
    accessCounts,
    phonologicalFocusCounts,
    writingBridgeCounts,
    dimensionCounts,
    assetNeeds: assetNeeds.slice(0, Number(options.assetLimit ?? assetNeeds.length)),
    hasWidePhonologicalAwareness: dimensionCounts.phonologicalAwarenessWide > 0,
    hasNarrowPhonologicalAwareness: dimensionCounts.phonologicalAwarenessNarrow > 0,
    summary: `${profiles.length} profilierte Aufgaben sind lokal in der Entwicklungslandkarte beschrieben; das ist Planungsunterstützung, keine Bewertung.`,
  };
}

export function getWritingBridgeForTask(taskId) {
  const profile = getTaskDevelopmentProfile(taskId);
  const task = learningTasks.find((item) => item.id === taskId);
  if (!profile || !task || profile.writingBridgeType === 'none') return undefined;
  const syllableText = task.syllables.map((part) => part.text).join(' · ');
  const firstLetter = task.word.slice(0, 1).toLocaleUpperCase('de-DE');
  return {
    taskId,
    word: task.word,
    optional: true,
    localOnly: true,
    nonEvaluative: true,
    type: profile.writingBridgeType,
    title: 'Schreibbrücke',
    childPrompt: profile.writingBridgeType === 'build-syllable'
      ? `Lege das Wort ruhig: ${syllableText}`
      : profile.writingBridgeType === 'select-letter'
        ? `Finde den Anfang: ${firstLetter}`
        : profile.writingBridgeType === 'sentence-frame'
          ? `Setze das Wort in den Satz: Ich lese ${task.word}.`
          : `Fahre das Wort mit dem Finger nach: ${task.word}`,
    teacherHint: 'Optionaler Übergang vom Lesen zum Schreiben: nachfahren, legen, wählen oder abschreiben; keine Bewertung und keine Speicherung.',
  };
}

export function getSymbolAssetReadinessSummary() {
  const profiles = Object.keys(taskRequirementProfiles).map((taskId) => getTaskDevelopmentProfile(taskId)).filter(Boolean);
  const prioritySlots = profiles
    .filter((profile) => profile.imageQualityNeed !== 'placeholder-ok')
    .slice(0, 12)
    .map((profile) => ({
      taskId: profile.taskId,
      word: profile.word,
      concept: profile.word,
      defaultLocalCue: 'lokale Form-/Textkarte',
      licensedAssetSlot: `licensed-${profile.taskId}`,
      altText: `Lizenziertes Symbol für ${profile.word}, falls rechtlich vorhanden`,
      usageNote: 'Nur mit gültiger Lizenz einfügen; lokale Platzhalter bleiben Fallback.',
    }));
  return {
    protectedAssetsEmbedded: false,
    localSymbolCardsOnly: true,
    sufficientForLowerStages: 'teilweise',
    prioritySlots,
    manifestShape: ['taskId', 'word', 'concept', 'defaultLocalCue', 'licensedAssetSlot', 'altText', 'usageNote'],
  };
}

export function getTaskProfileFit(taskId, profile = {}, options = {}) {
  const requirements = taskRequirementProfiles[taskId];
  if (!requirements) {
    return {
      allowed: false,
      mode: 'blocked',
      missing: ['task-requirements'],
      warnings: ['Für diese Aufgabe sind noch keine lokalen Anforderungen hinterlegt.'],
      reason: 'Aufgabe bleibt ausgeblendet, bis sie fachlich getaggt ist.',
    };
  }

  const knownGraphemes = profile.knownGraphemes ?? Object.keys(profile.graphemeStatus ?? {}).filter((key) => profile.graphemeStatus[key] >= 4);
  const knownSyllables = profile.knownSyllables ?? Object.keys(profile.syllableStatus ?? {}).filter((key) => profile.syllableStatus[key] >= 4);
  const profileStage = Number(profile.readingStage ?? 0);
  const targetMissing = getMissingUnits(requirements.targetGraphemes, knownGraphemes);
  const syllableMissing = getMissingUnits(requirements.targetSyllables, knownSyllables);
  const optionMissing = getMissingUnits(requirements.optionGraphemes, knownGraphemes);
  const stageMissing = profileStage < requirements.minReadingStage;

  if (stageMissing || targetMissing.length > 0 || syllableMissing.length > 0) {
    return {
      allowed: false,
      mode: 'blocked',
      missing: [
        ...(stageMissing ? [`reading-stage-${requirements.minReadingStage}`] : []),
        ...targetMissing.map((unit) => `target:${unit}`),
        ...syllableMissing.map((unit) => `syllable:${unit}`),
      ],
      warnings: [],
      reason: 'Zielwort oder Silben liegen noch nicht im heutigen lokalen Profil.',
    };
  }

  if (optionMissing.length > 0) {
    const support = { ...(profile.supportSettings ?? {}), ...options };
    const mode = support.teacherLed ? 'teacher-led' : 'reduced-choice';
    return {
      allowed: true,
      mode,
      missing: optionMissing.map((unit) => `option:${unit}`),
      warnings: [
        `Antwortoptionen enthalten noch nicht freigegebene Grapheme: ${optionMissing.join(', ')}.`,
        requirements.controlledUseNote,
      ],
      reason: 'Ziel passt, aber volle Auswahl bleibt wegen Distraktoren reduziert oder lehrkraftgeführt.',
    };
  }

  return {
    allowed: true,
    mode: 'full-choice',
    missing: [],
    warnings: requirements.qualityStatus === 'reviewed_safe' ? [] : [requirements.controlledUseNote],
    reason: 'Zielwort, Silben, Lesestufe und Antwortoptionen passen zum heutigen lokalen Profil.',
  };
}

export const isTaskAllowedForProfile = getTaskProfileFit;

function graphemesForWord(word = '') {
  const lower = String(word).toLocaleLowerCase('de-DE').normalize('NFC');
  const complexUnits = ['sch', 'ch', 'au', 'ei', 'eu', 'ie', 'st', 'sp'];
  const units = [];

  for (let index = 0; index < lower.length;) {
    const complexUnit = complexUnits.find((unit) => lower.startsWith(unit, index));
    if (complexUnit) {
      units.push(complexUnit);
      index += complexUnit.length;
      continue;
    }

    const char = lower[index];
    if (/[a-zäöüß]/i.test(char)) units.push(char);
    index += 1;
  }

  return units;
}

function getKnownGraphemes(profile = {}) {
  return profile.knownGraphemes ?? Object.keys(profile.graphemeStatus ?? {}).filter((key) => profile.graphemeStatus[key] >= 4);
}

function getWordMissingGraphemes(word, knownGraphemes = []) {
  return getMissingUnits([...new Set(graphemesForWord(word))], knownGraphemes);
}

export function getProfileSafeTaskOptions(taskId, profile = {}, options = {}) {
  const requirements = taskRequirementProfiles[taskId];
  const fit = getTaskProfileFit(taskId, profile, options);

  if (!requirements) {
    return {
      taskId,
      targetWord: undefined,
      mode: 'blocked',
      visibleOptions: [],
      hiddenOptions: [],
      missing: fit.missing,
      warnings: fit.warnings,
      reason: fit.reason,
    };
  }

  if (fit.mode === 'blocked') {
    return {
      taskId,
      targetWord: requirements.targetWord,
      mode: 'blocked',
      visibleOptions: [],
      hiddenOptions: [...requirements.optionWords],
      missing: fit.missing,
      warnings: fit.warnings,
      reason: fit.reason,
    };
  }

  const knownGraphemes = getKnownGraphemes(profile);
  const optionMissingByWord = requirements.optionWords.map((word) => ({
    word,
    missing: getWordMissingGraphemes(word, knownGraphemes),
  }));
  const visibleOptions = optionMissingByWord.filter((item) => item.missing.length === 0).map((item) => item.word);
  const hiddenOptions = optionMissingByWord.filter((item) => item.missing.length > 0).map((item) => item.word);
  const minimumChoices = Number(options.minimumChoices ?? 2);

  if (!visibleOptions.includes(requirements.targetWord)) {
    return {
      taskId,
      targetWord: requirements.targetWord,
      mode: 'blocked',
      visibleOptions: [],
      hiddenOptions: [...requirements.optionWords],
      missing: [...fit.missing, `target:${requirements.targetWord}`],
      warnings: ['Das Zielwort bleibt ausgeblendet, weil seine Grapheme nicht vollständig im lokalen Profil liegen.'],
      reason: 'Zielwort liegt noch nicht vollständig im heutigen lokalen Profil.',
    };
  }

  if (hiddenOptions.length === 0) {
    return {
      taskId,
      targetWord: requirements.targetWord,
      mode: 'full-choice',
      visibleOptions: [...requirements.optionWords],
      hiddenOptions: [],
      missing: [],
      warnings: fit.warnings,
      reason: 'Zielwort und alle Antwortoptionen passen zum heutigen lokalen Profil.',
    };
  }

  const mode = visibleOptions.length >= minimumChoices ? 'reduced-choice' : 'teacher-led';
  return {
    taskId,
    targetWord: requirements.targetWord,
    mode,
    visibleOptions,
    hiddenOptions,
    missing: fit.missing,
    warnings: [
      ...fit.warnings,
      mode === 'teacher-led'
        ? 'Es bleibt nur eine sichere Option sichtbar; die Aufgabe passt heute eher zum gemeinsamen Lesen und Zeigen.'
        : 'Nur profilpassende Antwortoptionen bleiben sichtbar.',
    ],
    reason: mode === 'teacher-led'
      ? 'Zielwort passt; für eine eigene Auswahl bleiben zu wenige sichere Optionen. Gemeinsam lesen und zeigen ist passender.'
      : 'Zielwort passt; die Auswahl wird auf profilpassende Optionen reduziert.',
  };
}



const dailyPathModeRank = {
  'full-choice': 0,
  'reduced-choice': 1,
  'teacher-led': 2,
};

const wortpostFallbackWords = ['Ball', 'Tasse', 'Mond'];

const wortpostDevelopmentStages = {
  bildanker: {
    id: 'bildanker',
    label: 'Bildanker',
    orientation: 'Schau auf das Bild. Dann bring den Brief heim.',
    reason: 'Bildhilfe, kleine Auswahl oder wenige bekannte Einheiten stehen im Vordergrund.',
    nextSmallStep: 'Eine bekannte Silbe gemeinsam sprechen und wiederfinden.',
  },
  silbenbruecke: {
    id: 'silbenbruecke',
    label: 'Silbenbrücke',
    orientation: 'Sprich die Silbe leise mit. Dann waehle.',
    reason: 'Bekannte Silben können bewusst wiedererkannt werden.',
    nextSmallStep: 'Eine bekannte Silbe mit einem passenden Wort verbinden.',
  },
  wortaufbau: {
    id: 'wortaufbau',
    label: 'Wortaufbau',
    orientation: 'Baue das Wort ruhig zusammen.',
    reason: 'Bekannte Grapheme und Silben tragen den Wortaufbau.',
    nextSmallStep: 'Ein ganzes Wort aus bekannten Einheiten legen oder lesen.',
  },
  satzbruecke: {
    id: 'satzbruecke',
    label: 'Satzbrücke',
    orientation: 'Lies das Wort. Danach kommt ein kurzer Satz.',
    reason: 'Der kurze Satz kann nach dem Wort mit Hilfe aufgenommen werden.',
    nextSmallStep: 'Nach der Wortpost einen kurzen Satzstreifen lesen.',
  },
};

export function getWortpostStageOrientation(stageId = 'bildanker') {
  return (wortpostDevelopmentStages[stageId] ?? wortpostDevelopmentStages.bildanker).orientation;
}

export function getWortpostDevelopmentStage(profile = {}) {
  const knownGraphemes = Array.isArray(profile.knownGraphemes) ? profile.knownGraphemes : [];
  const knownSyllables = Array.isArray(profile.knownSyllables) ? profile.knownSyllables : [];
  const support = profile.supportSettings ?? {};
  const readiness = profile.readiness ?? {};
  const accessFocus = profile.accessFocus ?? 'picture-symbol';
  const supportHeavy = Boolean(support.reducedChoices || support.teacherReadAloud) || knownGraphemes.length < 2;
  const sentenceReady = readiness.sentence === 'supported' || ['sentence', 'story', 'writing-bridge'].includes(accessFocus);
  const wordReady = accessFocus === 'word' || knownGraphemes.length >= 5 || knownSyllables.length >= 3;
  const syllableReady = accessFocus === 'syllable' || knownSyllables.length >= 1 || knownGraphemes.length >= 2;
  const stageId = sentenceReady && knownSyllables.length >= 2
    ? 'satzbruecke'
    : wordReady && !supportHeavy
      ? 'wortaufbau'
      : syllableReady && knownSyllables.length >= 1
        ? 'silbenbruecke'
        : 'bildanker';
  const stage = wortpostDevelopmentStages[stageId];
  return {
    ...stage,
    knownSummary: `${knownGraphemes.length} Graphem(e), ${knownSyllables.length} Silbe(n) bekannt`,
    localOnly: true,
    persistent: false,
  };
}

function getSentenceBridgeFromTask(task) {
  const bridgeText = task?.storyBridge?.shortText;
  if (bridgeText && bridgeText.length <= 60) return bridgeText;
  return undefined;
}

export function getWortpostSentenceBridge(wordOrTask = '') {
  const task = typeof wordOrTask === 'object'
    ? wordOrTask
    : learningTasks.find((item) => item.word === wordOrTask && item.storyBridge?.shortText)
      ?? learningTasks.find((item) => item.word === wordOrTask);
  const bridgeText = getSentenceBridgeFromTask(task);
  if (bridgeText) return bridgeText;

  const word = typeof wordOrTask === 'object' ? wordOrTask?.word : String(wordOrTask);
  const fallbackSentences = {
    Ball: 'Der Ball ist da.',
    Tasse: 'Die Tasse steht da.',
    Mond: 'Der Mond ist da.',
    Mama: 'Mama ist da.',
    Sofa: 'Das Sofa ist da.',
    Hut: 'Der Hut ist da.',
    Bus: 'Der Bus ist da.',
    Buch: 'Das Buch ist da.',
  };
  return fallbackSentences[word] ?? `${word} ist da.`;
}

function getWortpostPathReason(mode) {
  if (mode === 'full-choice') return 'passt zu bekannten Einheiten';
  if (mode === 'reduced-choice') return 'passt mit kleiner Auswahl';
  if (mode === 'teacher-led') return 'mit Lehrkraft gemeinsam sinnvoll';
  return 'heute klein starten';
}

function getWortpostPresetPreviewReason(currentStage, nextStage, path) {
  if (currentStage.id === nextStage.id) return `Die Stufe ${nextStage.label} bleibt passend; die Karten werden an die gewählten Einheiten angepasst.`;
  if (nextStage.id === 'wortaufbau') return 'Mehr bekannte Grapheme und Silben machen ruhigen Wortaufbau mit passenden Wortkarten möglich.';
  if (nextStage.id === 'satzbruecke') return 'Bekannte Einheiten und Satzbereitschaft erlauben nach der Wortkarte einen kurzen Satzanschluss.';
  if (nextStage.id === 'silbenbruecke') return 'Die Auswahl bleibt klein; bekannte Silben tragen den nächsten Wortpost-Schritt.';
  return path.teacherHint ?? nextStage.reason;
}

export function getWortpostPresetPreview(currentProfile = {}, preset = {}, tasks = learningTasks) {
  const currentStage = getWortpostDevelopmentStage(currentProfile);
  const nextProfile = createLocalDidacticProfile(preset);
  const path = getProfileSafeWortpostPath(nextProfile, tasks, { maxCards: 3, minimumChoices: 1 });
  const nextStage = path.developmentStage ?? getWortpostDevelopmentStage(nextProfile);

  return {
    presetId: preset.id ?? 'custom',
    presetLabel: preset.label ?? 'Lokale Auswahl',
    currentStageLabel: currentStage.label,
    nextStageLabel: nextStage.label,
    stageChangeText: `${currentStage.label} → ${nextStage.label}`,
    reason: getWortpostPresetPreviewReason(currentStage, nextStage, path),
    nextCards: path.cards.slice(0, 3).map((card) => ({
      taskId: card.taskId,
      word: card.word,
      reason: card.reason,
      sentenceBridge: card.sentenceBridge,
    })),
    nextSmallStep: nextStage.nextSmallStep,
    localOnly: true,
    persistent: false,
  };
}

const wordFamilyPackDefinitions = [
  {
    id: 'word-family-mama',
    title: 'Mama-Familie',
    anchorWord: 'Mama',
    requiredGraphemes: ['m', 'a'],
    requiredSyllables: ['ma'],
    preferredTaskIds: ['alpha51b-a-mama-meaning', 'alpha51b-b-ma-ma-repeat', 'alpha51b-c-mama-oma-contrast', 'alpha51b-c-mama-sentence', 'b-ma-ma'],
  },
  {
    id: 'word-family-sofa',
    title: 'Sofa-Familie',
    anchorWord: 'Sofa',
    requiredGraphemes: ['m', 'a', 's', 'o', 'f'],
    requiredSyllables: ['ma', 'so', 'fa'],
    preferredTaskIds: ['alpha30-a-sofa', 'alpha31-b-so', 'alpha31-c-sofa-word', 'alpha31-c-sofa-sentence', 'alpha31-c-sofa-writing', 'b-so-fa'],
  },
  {
    id: 'word-family-tasse',
    title: 'Tasse-Familie',
    anchorWord: 'Tasse',
    requiredGraphemes: ['t', 'a', 's', 'e'],
    requiredSyllables: ['tas', 'se'],
    requiresSentenceReadiness: true,
    preferredTaskIds: ['alpha49b-a-tasse-meaning', 'alpha49b-b-tas-se-repeat', 'alpha49b-c-tasse-tasche-contrast', 'alpha49b-c-tasse-sentence', 'alpha31-c-tasse-sentence', 'a-tasse', 'b-tas-se'],
  },
  {
    id: 'word-family-ball',
    title: 'Ball-Familie',
    anchorWord: 'Ball',
    requiredGraphemes: ['b', 'a', 'l'],
    requiredSyllables: ['ball'],
    preferredTaskIds: ['alpha73a-a-ball', 'a-ball', 'c-ball', 'alpha31-c-ball-story'],
  },
  {
    id: 'word-family-bus',
    title: 'Bus-Familie',
    anchorWord: 'Bus',
    requiredGraphemes: ['b', 'u', 's'],
    requiredSyllables: ['bus'],
    preferredTaskIds: ['alpha73a-a-bus', 'a-bus'],
  },
  {
    id: 'word-family-buch',
    title: 'Buch-Familie',
    anchorWord: 'Buch',
    requiredGraphemes: ['b', 'u', 'ch'],
    requiredSyllables: ['buch'],
    preferredTaskIds: ['alpha73a-a-buch', 'a-buch', 'c-buch'],
  },
  {
    id: 'word-family-lama',
    title: 'Lama-Familie',
    anchorWord: 'Lama',
    requiredGraphemes: ['l', 'a', 'm'],
    requiredSyllables: ['la', 'ma'],
    preferredTaskIds: ['b-la-ma', 'alpha31-b-ma', 'alpha51b-c-mama-sentence'],
  },
  {
    id: 'word-family-apfel',
    title: 'Apfel-Familie',
    anchorWord: 'Apfel',
    requiredGraphemes: ['a', 'p', 'f', 'e', 'l'],
    requiredSyllables: ['ap', 'fel'],
    preferredTaskIds: ['alpha73a-b-apfel'],
  },
  {
    id: 'word-family-tisch',
    title: 'Tisch-Familie',
    anchorWord: 'Tisch',
    requiredGraphemes: ['t', 'i', 's', 'ch'],
    requiredSyllables: ['tisch'],
    preferredTaskIds: ['alpha73a-c-tisch', 'alpha31-c-tisch-word', 'c-tisch'],
  },
  {
    id: 'word-family-heft',
    title: 'Heft-Familie',
    anchorWord: 'Heft',
    requiredGraphemes: ['h', 'e', 'f', 't'],
    requiredSyllables: ['heft'],
    preferredTaskIds: ['alpha73a-a-heft', 'c-heft'],
  },
];

const materialStepOrder = ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte'];

function hasKnownUnits(profile, requiredGraphemes = [], requiredSyllables = []) {
  const knownGraphemes = new Set((profile?.knownGraphemes ?? []).map((unit) => String(unit).toLocaleLowerCase('de-DE')));
  const knownSyllables = new Set((profile?.knownSyllables ?? []).map((unit) => String(unit).toLocaleLowerCase('de-DE')));
  return requiredGraphemes.every((unit) => knownGraphemes.has(unit))
    && requiredSyllables.every((unit) => knownSyllables.has(unit));
}

function getStageFitLabel(profile, anchorWord) {
  const stage = getWortpostDevelopmentStage(profile);
  if (stage.id === 'bildanker') return 'Bildanker';
  if (stage.id === 'silbenbruecke') return 'Silbenbrücke';
  if (stage.id === 'satzbruecke') return 'Satzbrücke';
  if (anchorWord === 'Sofa' || anchorWord === 'Tasse' || anchorWord === 'Ball' || anchorWord === 'Bus' || anchorWord === 'Buch' || anchorWord === 'Apfel' || anchorWord === 'Tisch' || anchorWord === 'Heft') return 'Wortaufbau';
  return stage.label;
}

function getMaterialStepTask(stepLabel, tasksForWord) {
  if (stepLabel === 'Bild') return tasksForWord.find((task) => task.level === 'A') ?? tasksForWord[0];
  if (stepLabel === 'Silbe') return tasksForWord.find((task) => task.level === 'B') ?? tasksForWord[0];
  if (stepLabel === 'Wort') return tasksForWord.find((task) => task.level === 'C') ?? tasksForWord.find((task) => task.level === 'B') ?? tasksForWord[0];
  if (stepLabel === 'Satz') return tasksForWord.find((task) => task.storyBridge?.shortText || /[.:]/.test(task.prompt)) ?? tasksForWord.find((task) => task.level === 'C');
  return tasksForWord.find((task) => task.storyBridge?.shortText) ?? tasksForWord.find((task) => task.level === 'C');
}

function getMaterialStepCue(stepLabel, task, anchorWord) {
  if (stepLabel === 'Bild') return task?.symbolHelp?.label ? `Lokale Symbolhilfe: ${task.symbolHelp.label}` : `Bildplatzhalter: ${anchorWord}`;
  if (stepLabel === 'Silbe') return (task?.syllables ?? []).map((syllable) => syllable.text).join(' · ') || anchorWord;
  if (stepLabel === 'Wort') return task?.word ?? anchorWord;
  if (stepLabel === 'Satz') return getWortpostSentenceBridge(task ?? anchorWord);
  return task?.storyBridge?.shortText ?? `${anchorWord} in einer kleinen Alltagsszene zeigen.`;
}

function buildWordFamilyMaterialSteps(definition, tasksForWord, profile) {
  const sentenceReady = profile?.readiness?.sentence === 'supported' || ['sentence', 'story', 'writing-bridge'].includes(profile?.accessFocus);
  const storyReady = profile?.readiness?.story === 'supported' || ['story', 'writing-bridge'].includes(profile?.accessFocus);
  return materialStepOrder
    .filter((stepLabel) => {
      if (stepLabel === 'Satz') return sentenceReady || tasksForWord.some((task) => task.storyBridge?.shortText);
      if (stepLabel === 'Mini-Geschichte') return storyReady || tasksForWord.some((task) => task.storyBridge?.shortText);
      return true;
    })
    .map((stepLabel) => {
      const task = getMaterialStepTask(stepLabel, tasksForWord);
      return {
        label: stepLabel,
        cue: getMaterialStepCue(stepLabel, task, definition.anchorWord),
        taskId: task?.id,
      };
    })
    .filter((step) => step.cue);
}

export function getProfileWordFamilyMaterialPacks(profileInput = {}, tasks = learningTasks, options = {}) {
  const profile = profileInput?.profileId === 'local-teacher-preview' ? profileInput : createLocalDidacticProfile(profileInput);
  const maxPacks = Math.min(4, Math.max(1, Number(options.maxPacks ?? 3)));
  const sentenceReady = profile.readiness?.sentence === 'supported' || ['sentence', 'story', 'writing-bridge'].includes(profile.accessFocus);
  return wordFamilyPackDefinitions
    .map((definition) => {
      const available = hasKnownUnits(profile, definition.requiredGraphemes, definition.requiredSyllables)
        && (!definition.requiresSentenceReadiness || sentenceReady);
      if (!available) return null;
      return definition;
    })
    .filter(Boolean)
    .map((definition) => {
      const preferredTasks = definition.preferredTaskIds
        .map((taskId) => tasks.find((task) => task.id === taskId))
        .filter(Boolean);
      const fallbackTasks = tasks.filter((task) => task.word === definition.anchorWord);
      const tasksForWord = [...new Map([...preferredTasks, ...fallbackTasks].map((task) => [task.id, task])).values()];
      const materialSteps = buildWordFamilyMaterialSteps(definition, tasksForWord, profile);
      const taskRefs = materialSteps
        .filter((step) => step.taskId)
        .map((step) => ({ step: step.label, taskId: step.taskId }));
      return {
        id: definition.id,
        title: definition.title,
        anchorWord: definition.anchorWord,
        stageFit: getStageFitLabel(profile, definition.anchorWord),
        knownUnits: {
          graphemes: definition.requiredGraphemes,
          syllables: definition.requiredSyllables,
        },
        materialSteps,
        taskIds: [...new Set(taskRefs.map((ref) => ref.taskId))],
        taskRefs,
        teacherUse: `${definition.anchorWord} ruhig vom Bild über Silben zum Wort legen; Satz oder Mini-Geschichte nur mit Hilfe anschließen.`,
        childSafeSummary: `${definition.anchorWord}: Wir lesen Schritt für Schritt.`,
        localOnly: true,
        persistent: false,
      };
    })
    .slice(0, maxPacks);
}

const wordFamilyJourneyTexts = {
  Mama: {
    Bild: { childPrompt: 'Schau das Bild an.', teacherHint: 'Erst gemeinsam schauen und benennen.', successText: 'Du hast geschaut.' },
    Silbe: { childPrompt: 'Lies: Ma - ma.', teacherHint: 'Silben langsam mitsprechen oder klatschen.', successText: 'Ma - ma ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Mama.', teacherHint: 'Kleine Auswahl sichtbar lassen.', successText: 'Mama ist gewählt.' },
    Satz: { childPrompt: 'Lies: Mama ist da.', teacherHint: 'Bei Bedarf vorlesen und nachsprechen lassen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Mama ist da. Was passt?', teacherHint: 'Kurze Alltagsszene ruhig besprechen.', successText: 'Die Geschichte ist verstanden.' },
  },
  Sofa: {
    Bild: { childPrompt: 'Schau das Sofa an.', teacherHint: 'Erst gemeinsam schauen und im Raum zeigen.', successText: 'Du hast das Sofa angeschaut.' },
    Silbe: { childPrompt: 'Lies: So - fa.', teacherHint: 'Silben langsam mitsprechen oder legen.', successText: 'So - fa ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Sofa.', teacherHint: 'Kleine Auswahl sichtbar lassen.', successText: 'Sofa ist gewählt.' },
    Satz: { childPrompt: 'Lies: Das Sofa ist da.', teacherHint: 'Bei Bedarf kurz vorlesen und nachsprechen lassen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Das Sofa ist da. Was passt?', teacherHint: 'Kurze Alltagsszene ruhig besprechen.', successText: 'Die Geschichte ist verstanden.' },
  },
  Tasse: {
    Bild: { childPrompt: 'Schau die Tasse an.', teacherHint: 'Erst gemeinsam schauen und auf dem Tisch zeigen.', successText: 'Du hast die Tasse angeschaut.' },
    Silbe: { childPrompt: 'Lies: Tas - se.', teacherHint: 'Silben langsam mitsprechen oder klatschen.', successText: 'Tas - se ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Tasse.', teacherHint: 'Kleine Auswahl sichtbar lassen.', successText: 'Tasse ist gewählt.' },
    Satz: { childPrompt: 'Lies: Die Tasse ist da.', teacherHint: 'Bei Bedarf kurz vorlesen und nachsprechen lassen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Die Tasse ist da. Was passt?', teacherHint: 'Kurze Tischszene ruhig besprechen.', successText: 'Die Geschichte ist verstanden.' },
  },
  Ball: {
    Bild: { childPrompt: 'Schau den Ball an.', teacherHint: 'Erst gemeinsam schauen, zeigen oder kurz rollen lassen.', successText: 'Du hast den Ball angeschaut.' },
    Silbe: { childPrompt: 'Lies: Ball.', teacherHint: 'Wort langsam sprechen; bei Bedarf Anfangslaut b markieren.', successText: 'Ball ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Ball.', teacherHint: 'Kleine Auswahl sichtbar lassen: Ball und Bus oder Ball und Buch.', successText: 'Ball ist gewählt.' },
    Satz: { childPrompt: 'Lies: Der Ball rollt.', teacherHint: 'Bei Bedarf Ball rollen lassen und den Satz gemeinsam sprechen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Der Ball rollt. Was passt?', teacherHint: 'Kurze Spielszene ruhig besprechen.', successText: 'Die Geschichte ist verstanden.' },
  },
  Bus: {
    Bild: { childPrompt: 'Schau den Bus an.', teacherHint: 'Erst gemeinsam schauen und die Fahr-Handlung benennen.', successText: 'Du hast den Bus angeschaut.' },
    Silbe: { childPrompt: 'Lies: Bus.', teacherHint: 'Wort langsam sprechen; b, u und s sichtbar halten.', successText: 'Bus ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Bus.', teacherHint: 'Kleine Auswahl sichtbar lassen: Bus und Ball.', successText: 'Bus ist gewählt.' },
    Satz: { childPrompt: 'Lies: Der Bus fährt.', teacherHint: 'Bei Bedarf mit Fahr-Geste begleiten und den Satz gemeinsam sprechen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Der Bus fährt. Was passt?', teacherHint: 'Kurze Alltagsszene ruhig besprechen: Bus fährt, Ball rollt.', successText: 'Die Geschichte ist verstanden.' },
  },
  Buch: {
    Bild: { childPrompt: 'Schau das Buch an.', teacherHint: 'Erst gemeinsam schauen und das Buch im Raum zeigen.', successText: 'Du hast das Buch angeschaut.' },
    Silbe: { childPrompt: 'Lies: Buch.', teacherHint: 'Buch als Wortmuster lesen; ch bewusst gemeinsam führen.', successText: 'Buch ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Buch.', teacherHint: 'Kleine Auswahl sichtbar lassen: Buch und Bus.', successText: 'Buch ist gewählt.' },
    Satz: { childPrompt: 'Lies: Das Buch ist da.', teacherHint: 'Bei Bedarf kurz vorlesen und ch nicht isoliert abfragen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Das Buch ist da. Was passt?', teacherHint: 'Kurze Schulszene ruhig besprechen: Buch anschauen oder lesen.', successText: 'Die Geschichte ist verstanden.' },
  },
  Lama: {
    Bild: { childPrompt: 'Schau das Lama an.', teacherHint: 'Erst gemeinsam schauen und als Tier benennen.', successText: 'Du hast das Lama angeschaut.' },
    Silbe: { childPrompt: 'Lies: La - ma.', teacherHint: 'Silben langsam mitsprechen oder legen.', successText: 'La - ma ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Lama.', teacherHint: 'Kleine Auswahl sichtbar lassen.', successText: 'Lama ist gewählt.' },
    Satz: { childPrompt: 'Lies: Das Lama ist da.', teacherHint: 'Bei Bedarf kurz vorlesen und nachsprechen lassen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Das Lama ist da. Was passt?', teacherHint: 'Kurze Tierszene ruhig besprechen.', successText: 'Die Geschichte ist verstanden.' },
  },
  Apfel: {
    Bild: { childPrompt: 'Schau den Apfel an.', teacherHint: 'Erst gemeinsam schauen und als Essen auf dem Tisch benennen.', successText: 'Du hast den Apfel angeschaut.' },
    Silbe: { childPrompt: 'Lies: Ap - fel.', teacherHint: 'Silben langsam mitsprechen; pf/fel nur lehrkraftgeführt sichern.', successText: 'Ap - fel ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Apfel.', teacherHint: 'Kleine Auswahl sichtbar lassen: Apfel und Banane.', successText: 'Apfel ist gewählt.' },
    Satz: { childPrompt: 'Lies: Der Apfel ist da.', teacherHint: 'Bei Bedarf kurz vorlesen und den Apfel zeigen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Der Apfel ist da. Was passt?', teacherHint: 'Kurze Tisch- oder Pausenszene ruhig besprechen.', successText: 'Die Geschichte ist verstanden.' },
  },
  Tisch: {
    Bild: { childPrompt: 'Schau den Tisch an.', teacherHint: 'Erst gemeinsam schauen, zeigen und als Schulraum-Objekt benennen.', successText: 'Du hast den Tisch angeschaut.' },
    Silbe: { childPrompt: 'Lies: Tisch.', teacherHint: 'Tisch als Wortmuster lesen; ch bewusst gemeinsam führen.', successText: 'Tisch ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Tisch.', teacherHint: 'Kleine Auswahl sichtbar lassen: Tisch und Tasse oder Tisch und Keks.', successText: 'Tisch ist gewählt.' },
    Satz: { childPrompt: 'Lies: Der Tisch ist da.', teacherHint: 'Bei Bedarf zum realen Tisch zeigen und den Satz gemeinsam sprechen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Der Tisch ist da. Was passt?', teacherHint: 'Kurze Schulraum- oder Tischszene ruhig besprechen.', successText: 'Die Geschichte ist verstanden.' },
  },
  Heft: {
    Bild: { childPrompt: 'Schau das Heft an.', teacherHint: 'Erst gemeinsam schauen, anfassen oder auf dem Tisch zeigen.', successText: 'Du hast das Heft angeschaut.' },
    Silbe: { childPrompt: 'Lies: Heft.', teacherHint: 'Heft als kurzes Wortmuster lesen; h, e, f und t sichtbar halten.', successText: 'Heft ist gelesen.' },
    Wort: { childPrompt: 'Lege oder wähle Heft.', teacherHint: 'Kleine Auswahl sichtbar lassen: Heft und Buch.', successText: 'Heft ist gewählt.' },
    Satz: { childPrompt: 'Lies: Das Heft ist da.', teacherHint: 'Bei Bedarf zum realen Heft zeigen und den Satz gemeinsam sprechen.', successText: 'Der Satz ist gelesen.' },
    'Mini-Geschichte': { childPrompt: 'Das Heft ist da. Was passt?', teacherHint: 'Kurze Schulszene ruhig besprechen: Heft anschauen, öffnen oder auf den Tisch legen.', successText: 'Die Geschichte ist verstanden.' },
  },
};

const wordFamilyJourneyFallbacks = {
  Mama: { knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], taskId: 'alpha51b-a-mama-meaning' },
  Sofa: { knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], taskId: 'alpha30-a-sofa' },
  Tasse: { knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'], knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'sentence', taskId: 'alpha49b-a-tasse-meaning' },
  Ball: { knownGraphemes: ['b', 'a', 'l'], knownSyllables: ['ball'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word', taskId: 'alpha73a-a-ball' },
  Bus: { knownGraphemes: ['b', 'u', 's'], knownSyllables: ['bus'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word', taskId: 'alpha73a-a-bus' },
  Buch: { knownGraphemes: ['b', 'u', 'ch'], knownSyllables: ['buch'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word', taskId: 'alpha73a-a-buch' },
  Lama: { knownGraphemes: ['l', 'a', 'm'], knownSyllables: ['la', 'ma'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word', taskId: 'b-la-ma' },
  Apfel: { knownGraphemes: ['a', 'p', 'f', 'e', 'l'], knownSyllables: ['ap', 'fel'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word', taskId: 'alpha73a-b-apfel' },
  Tisch: { knownGraphemes: ['t', 'i', 's', 'ch'], knownSyllables: ['tisch'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word', taskId: 'alpha73a-c-tisch' },
  Heft: { knownGraphemes: ['h', 'e', 'f', 't'], knownSyllables: ['heft'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word', taskId: 'alpha73a-a-heft' },
};

const miniJourneyTeacherRationaleDefinitions = [
  {
    anchorWord: 'Mama',
    focus: 'Zielwort Mama und die Mama-Wortspur',
    knownUnits: 'M + A, ma',
    why: 'Passt, weil die Reise mit sehr wenigen bekannten Einheiten startet und die gleiche Wortspur ruhig wiederholt.',
    support: 'Hilft bei gemeinsamer Bildbenennung, Silbenmitsprechen und kleiner Auswahl.',
    nextSmallStep: 'Nächster kleiner Schritt: Reise ruhig gemeinsam anbieten.',
  },
  {
    anchorWord: 'Sofa',
    focus: 'Zielwort Sofa als ruhiger Alltagsgegenstand',
    knownUnits: 's, o, f und so/fa',
    why: 'Passt, weil Sofa ein klares Gegenwort zu Mama ist und die Silben so/fa sichtbar bleiben.',
    support: 'Hilft bei langsamem Verbinden von Lauten und Silben mit einem gut zeigbaren Objekt.',
    nextSmallStep: 'Nächster kleiner Schritt: erst s, o, f oder so/fa gemeinsam sichern.',
  },
  {
    anchorWord: 'Tasse',
    focus: 'Zielwort Tasse mit kurzem Satzanschluss',
    knownUnits: 'Tas-se, tas/se und kurzer Satz',
    why: 'Passt, weil Tasse die bekannte Objektwelt erweitert und den Schritt vom Wort zum kurzen Satz vorbereitet.',
    support: 'Hilft bei Silbentrennung, Artikelklarheit und ruhigem Nachsprechen des Satzes.',
    nextSmallStep: 'Nächster kleiner Schritt: erst tas/se und einen kurzen Satz gemeinsam vorbereiten.',
  },
  {
    anchorWord: 'Ball',
    focus: 'Zielwort Ball als bewegungsnaher Alltagsanker',
    knownUnits: 'B + A + L, ball',
    why: 'Passt, weil Ball über echten Gegenstand, Bewegung und klare Zwei-Auswahl sehr schnell Bedeutung bekommt.',
    support: 'Hilft beim Wechsel von Gegenstand zu Wortkarte und beim kurzen Satz „Der Ball rollt.“.',
    nextSmallStep: 'Nächster kleiner Schritt: erst Ball zeigen oder rollen lassen, dann Wortkarte dazulegen.',
  },
  {
    anchorWord: 'Bus',
    focus: 'Zielwort Bus als fahrender Alltagsanker',
    knownUnits: 'B + U + S, bus',
    why: 'Passt, weil Bus kurz, sehr bildhaft und über die Handlung Fahren klar unterscheidbar ist.',
    support: 'Hilft beim Verbinden von Wortkarte, Fahr-Geste und kurzem Satz „Der Bus fährt.“.',
    nextSmallStep: 'Nächster kleiner Schritt: erst b, u, s und Bus gemeinsam sichern.',
  },
  {
    anchorWord: 'Buch',
    focus: 'Zielwort Buch als schulnaher Materialanker',
    knownUnits: 'B + U + ch, buch',
    why: 'Passt, weil Buch im Lernwerkstatt-Kontext sehr konkret ist; ch bleibt bewusst lehrkraftgeführt.',
    support: 'Hilft beim ruhigen Wortmuster Buch und beim kurzen Satz „Das Buch ist da.“.',
    nextSmallStep: 'Nächster kleiner Schritt: erst b, u und ch als Wortmuster gemeinsam sichern.',
  },
  {
    anchorWord: 'Lama',
    focus: 'Zielwort Lama mit bewusstem Abstand zu Mama',
    knownUnits: 'L/la, la/ma und bekannte ma-Silbe',
    why: 'Passt, weil Lama die vertraute ma-Silbe nutzt und den Anfangslaut l sichtbar absetzt.',
    support: 'Hilft bei der Unterscheidung von Mama und Lama durch klaren Bildanker und langsames Sprechen.',
    nextSmallStep: 'Nächster kleiner Schritt: erst l, la und ma gemeinsam sichern.',
  },
  {
    anchorWord: 'Apfel',
    focus: 'Zielwort Apfel als Essen- und Tischanker',
    knownUnits: 'A, p, f, e, l sowie Ap/fel',
    why: 'Passt, weil Apfel ein konkretes Alltagswort aus Essen/Pause ist und als Mini-Reise nur lehrkraftgeführt freigegeben wird.',
    support: 'Hilft beim ruhigen Übergang von Bild und Gegenstand zu Ap-fel, Wortkarte und kurzem Satz „Der Apfel ist da.“.',
    nextSmallStep: 'Nächster kleiner Schritt: erst a, p, f sowie Ap/fel gemeinsam sichern.',
  },
  {
    anchorWord: 'Tisch',
    focus: 'Zielwort Tisch als Schulraum- und Objektanker',
    knownUnits: 'T + I + S + ch, tisch',
    why: 'Passt, weil Tisch im Raum sofort zeigbar ist und als Objektfamilie Sofa/Tasse/Teller ruhig verbindet.',
    support: 'Hilft beim Übergang von realem Gegenstand zu Wortmuster und kurzem Satz „Der Tisch ist da.“; ch bleibt lehrkraftgeführt.',
    nextSmallStep: 'Nächster kleiner Schritt: erst t, i, s und ch als Wortmuster gemeinsam sichern.',
  },
  {
    anchorWord: 'Heft',
    focus: 'Zielwort Heft als schulnaher Materialanker',
    knownUnits: 'H + E + F + T, heft',
    why: 'Passt, weil Heft schulnah, konkret und ruhig zeigbar ist; Brot und Keks werden später verschoben, weil sie als nächster Schritt mehr Struktur- oder Graphemrisiko tragen.',
    support: 'Hilft beim Übergang vom echten Unterrichtsmaterial zur Wortkarte und zum kurzen Satz „Das Heft ist da.“.',
    nextSmallStep: 'Nächster kleiner Schritt: erst h, e, f und t als kurzes Wortmuster gemeinsam sichern.',
  },
];

export function getMiniJourneyTeacherRationales() {
  return miniJourneyTeacherRationaleDefinitions.map((item) => ({
    ...item,
    journeyTitle: `${item.anchorWord}-Mini-Reise`,
    stage: 'Bild → Silbe → Wort → Satz → Mini-Geschichte',
    teacherOnly: true,
    localOnly: true,
    persistent: false,
  }));
}

function normalizeJourneyAnchor(options = {}, packOrProfile = {}) {
  const anchorWord = options.anchorWord ?? packOrProfile?.anchorWord ?? 'Mama';
  if (wordFamilyJourneyTexts[anchorWord]) return anchorWord;
  return 'Mama';
}

export function getPlayableWordFamilyJourney(packOrProfile = {}, tasks = learningTasks, options = {}) {
  const anchorWord = normalizeJourneyAnchor(options, packOrProfile);
  const pack = packOrProfile?.materialSteps
    ? packOrProfile
    : getProfileWordFamilyMaterialPacks(packOrProfile, tasks, { maxPacks: 3, ...options })
      .find((candidate) => candidate.anchorWord === anchorWord);
  const fallback = wordFamilyJourneyFallbacks[anchorWord] ?? wordFamilyJourneyFallbacks.Mama;
  const fallbackPack = getProfileWordFamilyMaterialPacks(fallback, tasks, { maxPacks: 3 })
    .find((candidate) => candidate.anchorWord === anchorWord);
  const activePack = pack?.anchorWord === anchorWord ? pack : fallbackPack;
  if (!activePack) return [];
  const sourceSteps = materialStepOrder.map((label) => activePack.materialSteps.find((step) => step.label === label)).filter(Boolean);
  const fallbackTaskId = activePack.taskRefs?.[0]?.taskId ?? activePack.taskIds?.[0] ?? fallback.taskId;
  const stationTexts = wordFamilyJourneyTexts[anchorWord] ?? wordFamilyJourneyTexts.Mama;
  return materialStepOrder.map((label) => {
    const step = sourceSteps.find((item) => item.label === label);
    const safe = stationTexts[label];
    return {
      id: `${anchorWord.toLocaleLowerCase('de-DE')}-mini-${label.toLocaleLowerCase('de-DE').replace(/[^a-zäöüß]+/g, '-')}`.replace(/-$/, ''),
      anchorWord,
      journeyTitle: `${anchorWord}-Mini-Reise`,
      label,
      childPrompt: safe.childPrompt,
      teacherHint: safe.teacherHint,
      taskRef: step?.taskId ?? fallbackTaskId,
      taskId: step?.taskId ?? fallbackTaskId,
      successText: safe.successText,
      localOnly: true,
      persistent: false,
    };
  });
}

function formatMissingUnits(label, units = []) {
  return units.length > 0 ? `${label}: ${units.join(', ')}` : undefined;
}

function getMiniJourneyNextSmallStep(anchorWord, status, missingGraphemes = [], missingSyllables = [], missingReadiness = []) {
  if (status === 'bereit') return 'Nächster kleiner Schritt: Reise ruhig gemeinsam anbieten.';
  if (anchorWord === 'Sofa') return 'Nächster kleiner Schritt: erst s, o, f oder so/fa gemeinsam sichern.';
  if (anchorWord === 'Tasse') return 'Nächster kleiner Schritt: erst tas/se und einen kurzen Satz gemeinsam vorbereiten.';
  if (anchorWord === 'Ball') return 'Nächster kleiner Schritt: erst b, a, l und Ball gemeinsam sichern.';
  if (anchorWord === 'Bus') return 'Nächster kleiner Schritt: erst b, u, s und Bus gemeinsam sichern.';
  if (anchorWord === 'Buch') return 'Nächster kleiner Schritt: erst b, u und ch als Wortmuster gemeinsam sichern.';
  if (anchorWord === 'Apfel') return 'Nächster kleiner Schritt: erst a, p, f und Ap/fel gemeinsam sichern.';
  if (anchorWord === 'Tisch') return 'Nächster kleiner Schritt: erst t, i, s und ch als Wortmuster gemeinsam sichern.';
  if (anchorWord === 'Heft') return 'Nächster kleiner Schritt: erst h, e, f und t als Wortmuster gemeinsam sichern.';
  const firstGraphemes = missingGraphemes.slice(0, 3).join(', ');
  const firstSyllables = missingSyllables.slice(0, 2).join('/');
  const unitHint = firstSyllables || firstGraphemes || missingReadiness.join(', ') || 'eine passende Einheit';
  return `Nächster kleiner Schritt: erst ${unitHint} gemeinsam sichern.`;
}

export function getMiniJourneyReadinessOverview(profileInput = {}, tasks = learningTasks) {
  const profile = profileInput?.profileId === 'local-teacher-preview' ? profileInput : createLocalDidacticProfile(profileInput);
  const availableAnchors = new Set(getAvailableMiniJourneyCards(profile, tasks, { maxCards: 3 }).map((card) => card.anchorWord));
  const knownGraphemes = normalizeUnitList(profile.knownGraphemes ?? []);
  const knownSyllables = normalizeUnitList(profile.knownSyllables ?? []);
  const sentenceReady = profile.readiness?.sentence === 'supported' || ['sentence', 'story', 'writing-bridge'].includes(profile.accessFocus);

  return wordFamilyPackDefinitions
    .filter((definition) => wordFamilyJourneyTexts[definition.anchorWord])
    .map((definition) => {
      const missingGraphemes = getMissingUnits(definition.requiredGraphemes, knownGraphemes);
      const missingSyllables = getMissingUnits(definition.requiredSyllables, knownSyllables);
      const missingReadiness = definition.requiresSentenceReadiness && !sentenceReady ? ['Satzbereitschaft'] : [];
      const missingPieces = [
        formatMissingUnits('Grapheme', missingGraphemes),
        formatMissingUnits('Silben', missingSyllables),
        missingReadiness.length > 0 ? missingReadiness.join(', ') : undefined,
      ].filter(Boolean);
      const unitsMissing = missingGraphemes.length + missingSyllables.length;
      const status = availableAnchors.has(definition.anchorWord)
        ? 'bereit'
        : unitsMissing > 0 && definition.anchorWord !== 'Tasse'
          ? 'braucht Einheiten'
          : 'noch nicht zeigen';
      const missingText = status === 'bereit'
        ? 'Alle Kernstücke liegen im heutigen lokalen Profil.'
        : missingPieces.length > 0
          ? `Fehlt noch: ${missingPieces.join('; ')}.`
          : 'Heute noch nicht aus dem Mini-Reisen-Gating freigegeben.';

      const nextSmallStep = getMiniJourneyNextSmallStep(
        definition.anchorWord,
        status,
        missingGraphemes,
        missingSyllables,
        missingReadiness,
      );

      return {
        anchorWord: definition.anchorWord,
        journeyTitle: `${definition.anchorWord}-Mini-Reise`,
        status,
        missingText,
        nextSmallStep,
        knownUnitsSummary: `Benötigt: ${[...definition.requiredGraphemes, ...definition.requiredSyllables].join(' · ')}`,
        source: 'Mini-Reisen-Gating',
        localOnly: true,
        persistent: false,
      };
    });
}

const miniJourneyPrepDefinitions = {
  Sofa: [
    { focus: 's', variation: 'listen-point', childPrompt: 'Hör: s. Zeig auf s.', teacherHint: 'Laut kurz vormachen, Kind darf zeigen oder mitsprechen.' },
    { focus: 'o', variation: 'eye-trace', childPrompt: 'Fahr mit den Augen um o.', teacherHint: 'Rund zeigen, langsam sprechen.' },
    { focus: 'f', variation: 'listen-point', childPrompt: 'Hör: f. Zeig auf f.', teacherHint: 'Kurz zeigen, nicht abfragen.' },
    { focus: 'so', variation: 'eye-trace', childPrompt: 'Fahr mit den Augen: so.', teacherHint: 's und o gemeinsam langsam verbinden.' },
    { focus: 'fa', variation: 'listen-point', childPrompt: 'Hör: fa. Zeig auf fa.', teacherHint: 'f und a gemeinsam langsam verbinden.' },
  ],
  Tasse: [
    { focus: 'tas', variation: 'listen-point', childPrompt: 'Hör: tas. Zeig auf tas.', teacherHint: 'Silbe langsam vorsprechen oder legen.' },
    { focus: 'se', variation: 'eye-trace', childPrompt: 'Fahr mit den Augen: se.', teacherHint: 'Silbe ruhig anschließen.' },
    { focus: 'Die Tasse ist da.', variation: 'listen-point', childPrompt: 'Hör: Die Tasse ist da.', teacherHint: 'Kurzen Satz gemeinsam sprechen.' },
  ],
  Lama: [
    { focus: 'l', variation: 'listen-point', childPrompt: 'Hör: l. Zeig auf l.', teacherHint: 'Laut kurz vormachen, Kind darf zeigen oder mitsprechen.' },
    { focus: 'la', variation: 'eye-trace', childPrompt: 'Fahr mit den Augen: la.', teacherHint: 'l und a gemeinsam langsam verbinden.' },
    { focus: 'ma', variation: 'listen-point', childPrompt: 'Hör: ma. Zeig auf ma.', teacherHint: 'Bekannte Silbe ma ruhig wiederholen.' },
  ],
  Tisch: [
    { focus: 't', variation: 'listen-point', childPrompt: 'Hör: t. Zeig auf t.', teacherHint: 'Laut kurz vormachen, Kind darf zeigen oder mitsprechen.' },
    { focus: 'i', variation: 'eye-trace', childPrompt: 'Fahr mit den Augen um i.', teacherHint: 'Kurzen Vokal ruhig zeigen, nicht abfragen.' },
    { focus: 's', variation: 'listen-point', childPrompt: 'Hör: s. Zeig auf s.', teacherHint: 'Bekannten Laut kurz wiederholen.' },
    { focus: 'ch', variation: 'eye-trace', childPrompt: 'Schau: ch.', teacherHint: 'ch als gemeinsames Zeichen zeigen; die Lehrkraft führt.' },
    { focus: 'tisch', variation: 'listen-point', childPrompt: 'Hör: Tisch. Zeig auf Tisch.', teacherHint: 'Vom Lautmuster zum ganzen Wort führen, ohne Drill.' },
  ],
};

export function getMiniJourneyPrepSequence(anchorWord = 'Sofa') {
  const safeAnchor = miniJourneyPrepDefinitions[anchorWord] ? anchorWord : 'Sofa';
  const steps = miniJourneyPrepDefinitions[safeAnchor];
  return steps.map((step, index) => ({
    id: `${safeAnchor.toLocaleLowerCase('de-DE')}-prep-${index + 1}`,
    anchorWord: safeAnchor,
    prepTitle: `${safeAnchor}-Vorbereitung`,
    stepLabel: `Schritt ${index + 1} von ${steps.length}`,
    focus: step.focus,
    variation: step.variation,
    childPrompt: step.childPrompt,
    teacherHint: step.teacherHint,
    successText: 'In Ruhe geübt.',
    localOnly: true,
    persistent: false,
  }));
}

export function getMiniJourneyPrepActions(profileInput = {}, tasks = learningTasks) {
  return getMiniJourneyReadinessOverview(profileInput, tasks).map((item) => {
    const hasPrep = Boolean(miniJourneyPrepDefinitions[item.anchorWord]);
    const ready = item.status === 'bereit';
    return {
      anchorWord: item.anchorWord,
      prepTitle: hasPrep ? `${item.anchorWord}-Vorbereitung` : `${item.anchorWord} ruhig anbieten`,
      startLabel: hasPrep && !ready ? `${item.anchorWord}-Vorbereitung starten` : `${item.anchorWord} ruhig anbieten`,
      offerText: hasPrep && !ready ? 'Erst eine kleine Vorbereitung, dann neu entscheiden.' : 'Die Reise kann ruhig gemeinsam angeboten werden.',
      derivedFromNextSmallStep: item.nextSmallStep,
      enabled: hasPrep && !ready,
      teacherOnly: true,
      localOnly: true,
      persistent: false,
    };
  });
}

export function getAvailableMiniJourneyCards(profile = {}, tasks = learningTasks, options = {}) {
  const maxCards = Math.min(4, Math.max(1, Number(options.maxCards ?? 2)));
  const packs = getProfileWordFamilyMaterialPacks(profile, tasks, { ...options, maxPacks: maxCards })
    .filter((pack) => wordFamilyJourneyTexts[pack.anchorWord]);
  return packs.slice(0, maxCards).map((pack) => ({
    anchorWord: pack.anchorWord,
    journeyTitle: `${pack.anchorWord}-Mini-Reise`,
    startLabel: `${pack.anchorWord}-Mini-Reise starten`,
    fitReason: `${pack.anchorWord} passt heute zu den bekannten Einheiten; die Reise bleibt klein und kann ruhig begleitet werden.`,
    knownUnitsSummary: `Bekannt: ${[...pack.knownUnits.graphemes, ...pack.knownUnits.syllables].join(' · ')}`,
    stepsPreview: materialStepOrder.map((label) => label),
    localOnly: true,
    persistent: false,
  }));
}

export function getWordFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getPlayableWordFamilyJourney(profile, tasks, options);
}

export function getMamaFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Mama' });
}

export function getSofaFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Sofa' });
}

export function getTasseFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Tasse' });
}

export function getBallFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Ball' });
}

export function getBusFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Bus' });
}

export function getBuchFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Buch' });
}

export function getApfelFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Apfel' });
}

export function getTischFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Tisch' });
}

export function getHeftFamilyMiniJourney(profile = {}, tasks = learningTasks, options = {}) {
  return getWordFamilyMiniJourney(profile, tasks, { ...options, anchorWord: 'Heft' });
}

export function getObjectFamilyMiniSlice() {
  const objectWords = ['Sofa', 'Tisch', 'Tasse', 'Teller'];
  const steps = [
    { label: 'Bild', childPrompt: 'Schau: Teller.', cue: 'Teller auf dem Tisch anschauen.' },
    { label: 'Silbe', childPrompt: 'Lies: Tel - ler.', cue: 'Tel und ler langsam zeigen.' },
    { label: 'Wort', childPrompt: 'Lies: Teller.', cue: 'Teller als ganzes Wort legen.' },
    { label: 'Satz', childPrompt: 'Lies: Der Teller ist auf dem Tisch.', cue: 'Kurzen Satz gemeinsam sprechen.' },
    { label: 'Mini-Geschichte', childPrompt: 'Teller ist auf dem Tisch. Was passt?', cue: 'Tischszene mit Tasse oder Teller ruhig vergleichen.' },
  ];

  return {
    id: 'object-family-sofa-tisch-tasse-teller',
    title: 'Objektfamilie: Sofa, Tisch, Tasse, Teller',
    objectWords,
    teacherPreparation: {
      purpose: 'Vorhandene Objektwörter als ruhige Unterrichtsfamilie sichten, ohne den Kinderpfad automatisch zu ändern.',
      materialCue: 'Sofa als bekanntes Sitz-Objekt, Tisch als Ort, Tasse und Teller als Tisch-Objekte.',
      nextSmallStep: 'Nächster kleiner Schritt: genau einen Teller-Moment anbieten, wenn Tisch und Tasse schon ruhig sichtbar waren.',
      teacherOnly: true,
    },
    childMiniMoment: {
      id: 'object-family-teller-mini-moment',
      anchorWord: 'Teller',
      title: 'Teller-Mini-Moment',
      childGoal: 'Teller als Tisch-Objekt ruhig vom Bild zum kurzen Satz führen.',
      orientation: 'Schau: Der Teller steht auf dem Tisch. Die Tasse steht daneben.',
      sentence: 'Der Teller ist auf dem Tisch.',
      storyPrompt: 'Teller ist auf dem Tisch. Was passt?',
      interaction: {
        prompt: 'Zeig Teller.',
        options: [
          { id: 'plate', label: 'Teller', feedback: 'Ja. Teller. Der Teller liegt auf dem Tisch.' },
          { id: 'cup', label: 'Tasse', feedback: 'Das ist die Tasse. Der Teller ist daneben.' },
        ],
      },
      finishTitle: 'Der Teller-Moment ist fertig.',
      finishText: 'Der Teller lag auf dem Tisch. Jetzt ist Pause.',
      repeatLabel: 'Nochmal Teller',
      teacherLabel: 'Zur Lehrkraft',
      steps,
      localOnly: true,
      persistent: false,
    },
    localOnly: true,
    persistent: false,
  };
}

export function getProfileSafeWortpostPath(profile = {}, tasks = learningTasks, options = {}) {
  const maxCards = Math.max(1, Number(options.maxCards ?? 3));
  const optionArgs = { minimumChoices: options.minimumChoices ?? 1 };
  const fallbackTasks = wortpostFallbackWords
    .map((word) => tasks.find((task) => task.word === word))
    .filter(Boolean)
    .slice(0, maxCards);
  const candidates = tasks
    .filter((task) => taskRequirementProfiles[task.id])
    .map((task, order) => ({ task, order, safeOptions: getProfileSafeTaskOptions(task.id, profile, optionArgs) }))
    .filter(({ safeOptions }) => safeOptions.mode !== 'blocked')
    .sort((left, right) => {
      const modeDiff = (dailyPathModeRank[left.safeOptions.mode] ?? 9) - (dailyPathModeRank[right.safeOptions.mode] ?? 9);
      return modeDiff === 0 ? left.order - right.order : modeDiff;
    });
  const seenWords = new Set();
  const selected = [];
  for (const candidate of candidates) {
    if (seenWords.has(candidate.task.word)) continue;
    selected.push(candidate);
    seenWords.add(candidate.task.word);
    if (selected.length >= maxCards) break;
  }
  for (const fallbackTask of fallbackTasks) {
    if (selected.length >= maxCards) break;
    if (seenWords.has(fallbackTask.word)) continue;
    const safeOptions = getProfileSafeTaskOptions(fallbackTask.id, profile, optionArgs);
    selected.push({ task: fallbackTask, order: Number.MAX_SAFE_INTEGER, safeOptions: { ...safeOptions, mode: safeOptions.mode === 'blocked' ? 'teacher-led' : safeOptions.mode } });
    seenWords.add(fallbackTask.word);
  }
  const stage = getWortpostDevelopmentStage(profile);
  const cards = selected.slice(0, maxCards).map(({ task, safeOptions }) => ({
    taskId: task.id,
    word: task.word,
    mode: safeOptions.mode,
    reason: getWortpostPathReason(safeOptions.mode),
    visibleOptions: safeOptions.visibleOptions?.length ? safeOptions.visibleOptions : [task.word],
    sentenceBridge: getWortpostSentenceBridge(task),
  }));
  const fullFitCount = cards.filter((card) => card.mode === 'full-choice').length;
  return {
    cards,
    fallbackUsed: fullFitCount < maxCards,
    summary: cards.length >= maxCards && fullFitCount >= maxCards
      ? `${maxCards} Wortpost-Karten passen zu den bekannten Einheiten.`
      : `Heute klein starten: ${cards.length} Wortpost-Karten, davon ${fullFitCount} voll passend.`,
    teacherHint: fullFitCount >= maxCards ? 'Wortpost kann mit ruhiger Auswahl starten.' : 'Kleine Auswahl und Lehrkraftbegleitung bleiben sinnvoll.',
    developmentStage: stage,
    localOnly: true,
    persistent: false,
  };
}

export function getProfileSafeDailyPath(profile = {}, options = {}) {
  const maxCards = Math.max(0, Number(options.maxCards ?? maxDailyPathCards));
  const optionArgs = 'minimumChoices' in options ? { minimumChoices: options.minimumChoices } : {};
  const requirementIds = Object.keys(taskRequirementProfiles)
    .filter((taskId) => (options.includeAlpha30Pack || !taskId.startsWith('alpha30-'))
      && (options.includeAlpha31Pack || !taskId.startsWith('alpha31-'))
      && (options.includeAlpha51Pack || !taskId.startsWith('alpha51b-')));
  const candidates = requirementIds
    .map((taskId, order) => ({
      order,
      safeOptions: getProfileSafeTaskOptions(taskId, profile, optionArgs),
    }));
  const blockedTaskIds = candidates
    .filter(({ safeOptions }) => safeOptions.mode === 'blocked')
    .map(({ safeOptions }) => safeOptions.taskId);
  const fittingCards = candidates
    .filter(({ safeOptions }) => safeOptions.mode !== 'blocked')
    .sort((left, right) => {
      const modeDiff = (dailyPathModeRank[left.safeOptions.mode] ?? 9) - (dailyPathModeRank[right.safeOptions.mode] ?? 9);
      return modeDiff === 0 ? left.order - right.order : modeDiff;
    })
    .slice(0, maxCards)
    .sort((left, right) => left.order - right.order)
    .map(({ safeOptions }) => ({
      taskId: safeOptions.taskId,
      word: safeOptions.targetWord,
      mode: safeOptions.mode,
      visibleOptions: [...safeOptions.visibleOptions],
      hiddenOptions: [...safeOptions.hiddenOptions],
      reason: safeOptions.reason,
      warnings: [...safeOptions.warnings],
    }));

  return {
    profileId: profile?.id,
    maxCards,
    cards: fittingCards,
    blockedTaskIds,
    summary: fittingCards.length > 0
      ? `${fittingCards.length} Aufgabe(n) passen heute in den kleinen Leseweg.`
      : 'Heute passt noch keine profilierte Aufgabe sicher in den kleinen Leseweg. Gemeinsam starten und Profil erweitern.',
  };
}


export function getTaskRequirementCoverageSummary(profile, options = {}) {
  const requirements = Object.values(taskRequirementProfiles)
    .filter((requirement) => (options.includeAlpha30Pack || !requirement.taskId.startsWith('alpha30-'))
      && (options.includeAlpha31Pack || !requirement.taskId.startsWith('alpha31-'))
      && (options.includeAlpha51Pack || !requirement.taskId.startsWith('alpha51b-')));
  const sampleLimit = Math.max(1, Number(options.sampleLimit ?? 6));
  const levelCounts = { A: 0, B: 0, C: 0 };
  const typeCounts = {};
  const complexUnitSet = new Set();
  const sampleReviewTaskIds = [];

  for (const requirement of requirements) {
    const task = learningTasks.find((item) => item.id === requirement.taskId);
    if (task?.level && levelCounts[task.level] !== undefined) levelCounts[task.level] += 1;
    if (task?.type) typeCounts[task.type] = (typeCounts[task.type] ?? 0) + 1;
    for (const unit of requirement.complexUnits ?? []) complexUnitSet.add(unit);
    if (requirement.requiresTeacherReview && sampleReviewTaskIds.length < sampleLimit) {
      sampleReviewTaskIds.push(requirement.taskId);
    }
  }

  const teacherReviewCount = requirements.filter((requirement) => requirement.requiresTeacherReview).length;
  const complexUnits = [...complexUnitSet].sort((left, right) => left.localeCompare(right, 'de'));
  const summary = `${requirements.length} Aufgabe(n) sind lokal getaggt; ${teacherReviewCount} davon mit Prüfung durch Lehrkraft. ${complexUnits.length > 0 ? `Komplexe Einheiten: ${complexUnits.join(', ')}.` : 'Keine komplexen Einheiten hinterlegt.'}`;
  const result = {
    totalRequirements: requirements.length,
    levelCounts,
    typeCounts,
    teacherReviewCount,
    complexUnits,
    sampleReviewTaskIds,
    sampleBlockedTaskIds: [],
    summary,
  };

  if (profile) {
    const optionArgs = 'minimumChoices' in options ? { minimumChoices: options.minimumChoices } : {};
    const safeOptions = Object.keys(taskRequirementProfiles)
      .filter((taskId) => (options.includeAlpha30Pack || !taskId.startsWith('alpha30-'))
        && (options.includeAlpha31Pack || !taskId.startsWith('alpha31-'))
        && (options.includeAlpha51Pack || !taskId.startsWith('alpha51b-')))
      .map((taskId) => getProfileSafeTaskOptions(taskId, profile, optionArgs));
    const sampleBlockedTaskIds = safeOptions
      .filter((item) => item.mode === 'blocked')
      .slice(0, sampleLimit)
      .map((item) => item.taskId);
    result.selectedProfileFit = {
      visibleCount: safeOptions.filter((item) => item.mode !== 'blocked').length,
      blockedCount: safeOptions.filter((item) => item.mode === 'blocked').length,
      teacherLedCount: safeOptions.filter((item) => item.mode === 'teacher-led').length,
      reducedChoiceCount: safeOptions.filter((item) => item.mode === 'reduced-choice').length,
      fullChoiceCount: safeOptions.filter((item) => item.mode === 'full-choice').length,
    };
    result.sampleBlockedTaskIds = sampleBlockedTaskIds;
  }

  return result;
}

export function getLearningTasks() {
  return learningTasks;
}

export function getStoryPaths() {
  return storyPaths;
}

export const maxDailyPathCards = 4;

export function getDailyPathChoices(tasks = getLearningTasks(), stories = getStoryPaths()) {
  const taskChoices = tasks.slice(0, 8).map((task) => ({
    id: `curation-task-${task.id}`,
    kind: 'task',
    source: 'existing-content',
    taskId: task.id,
    label: task.word,
    helper: getStudentTaskLabel(task),
  }));
  const storyChoices = stories.slice(0, 4).map((story) => ({
    id: `curation-story-${story.id}`,
    kind: 'story',
    source: 'existing-content',
    storyId: story.id,
    label: story.title,
    helper: 'Kurze Story',
  }));

  return [...taskChoices, ...storyChoices];
}

export function getCuratedDailyReadingPath(selectedIds = [], tasks = getLearningTasks(), stories = getStoryPaths()) {
  const selectedIdSet = new Set(selectedIds.slice(0, maxDailyPathCards));
  if (selectedIdSet.size === 0) return getDailyReadingPath(tasks, stories);

  const choices = getDailyPathChoices(tasks, stories);
  const curated = selectedIds
    .slice(0, maxDailyPathCards)
    .map((selectedId) => choices.find((choice) => choice.id === selectedId))
    .filter(Boolean)
    .map((choice) => {
      if (choice.kind === 'story') {
        return {
          id: choice.id,
          kind: 'story',
          storyId: choice.storyId,
          label: choice.label,
          helper: choice.helper,
        };
      }

      return {
        id: choice.id,
        kind: 'task',
        taskId: choice.taskId,
        label: choice.label,
        helper: choice.helper,
      };
    });

  return curated.length > 0 ? curated : getDailyReadingPath(tasks, stories);
}

export function getTwoCardPilotPath(tasks = getLearningTasks()) {
  const preferredIds = ['a-ball', 'a-tasse'];
  const preferredTasks = preferredIds.map((id) => tasks.find((task) => task.id === id)).filter(Boolean);
  const pilotTasks = preferredTasks.length === 2
    ? preferredTasks
    : tasks.filter((task) => task.level === 'A' && task.type === 'image-word-match').slice(0, 2);

  return pilotTasks.map((task, index) => ({
    id: `pilot-task-${task.id}`,
    kind: 'task',
    source: 'existing-content',
    taskId: task.id,
    label: task.word,
    helper: index === 0 ? 'Erste Pilotkarte' : 'Zweite Pilotkarte',
  }));
}

export function getTwoCardPilotSupport() {
  return {
    imageHelp: true,
    syllableColors: true,
    reduceChoices: true,
  };
}

export function getGuidedReadingTransitionCue(chain, activeIndex = 0) {
  const steps = chain?.steps ?? [];
  const currentStep = steps[activeIndex] ?? steps[0] ?? { label: 'Bild' };
  const nextStep = steps[Math.min(activeIndex + 1, Math.max(steps.length - 1, 0))] ?? currentStep;
  const childSentences = {
    Bild: 'Ich schaue.',
    Silbe: 'Ich spreche mit.',
    Wort: 'Ich lese.',
    Satz: 'Ich lese ruhig.',
    'Mini-Geschichte': 'Ich höre zu.',
    Schreibbrücke: 'Ich fahre nach.',
  };

  return {
    title: 'Mein nächster Schritt',
    nowLabel: 'Jetzt',
    nowAction: currentStep.label,
    nextLabel: 'Danach',
    nextAction: nextStep.label,
    childSentence: childSentences[currentStep.label] ?? 'Ich lese.',
  };
}

export function getGuidedReadingChain(tasks = getLearningTasks(), stories = getStoryPaths()) {
  const task = tasks.find((item) => item.id === 'b-ma-ma') ?? tasks.find((item) => item.word === 'Mama') ?? tasks[0];
  const sentence = 'Mama ist da.';
  const storyText = ['Mama ist da.', 'Mama winkt.', 'Wir lesen ruhig.'];

  return {
    taskId: task?.id,
    storyId: undefined,
    word: task?.word ?? 'Mama',
    syllables: task?.syllables ?? [
      { text: 'Ma', color: 'blue' },
      { text: 'ma', color: 'red' },
    ],
    sentence,
    storyTitle: 'Mama ist da',
    storyText,
    steps: [
      { id: 'picture', label: 'Bild', helper: 'Bild anschauen' },
      { id: 'syllables', label: 'Silbe', helper: (task?.syllables ?? [{ text: 'Ma' }, { text: 'ma' }]).map((part) => part.text).join(' / ') },
      { id: 'word', label: 'Wort', helper: task?.word ?? 'Mama' },
      { id: 'sentence', label: 'Satz', helper: sentence },
      { id: 'story', label: 'Mini-Geschichte', helper: 'Mama ist da' },
      { id: 'writing', label: 'Schreibbrücke', helper: 'Wort legen oder nachfahren' },
    ],
  };
}

function uniqueLimitedIds(ids = []) {
  return [...new Set(ids.filter(Boolean))].slice(0, maxDailyPathCards);
}

function getSuggestionChoiceIds(pathLabel, { choices, tasks, stories, observation }) {
  const taskChoices = choices.filter((choice) => choice.kind === 'task');
  const storyChoices = choices.filter((choice) => choice.kind === 'story');
  const firstStoryEvidence = observation.storyEvidence?.at(-1);
  const observedStoryChoice = storyChoices.find((choice) => choice.storyId === firstStoryEvidence?.storyId);
  const latestTaskChoice = taskChoices.find((choice) => choice.taskId === observation.taskPath?.at(-1));
  const syllableTaskIds = tasks.filter((task) => task.type === 'syllable-blend').slice(0, 2).map((task) => `daily-task-${task.id}`);

  if (pathLabel === 'Story verstehen') {
    return {
      selectedChoiceIds: uniqueLimitedIds([observedStoryChoice?.id, storyChoices[0]?.id, taskChoices[0]?.id]),
      suggestedCardIds: uniqueLimitedIds([`daily-story-${firstStoryEvidence?.storyId ?? stories[0]?.id}`, `daily-task-${tasks[0]?.id}`]),
    };
  }

  if (pathLabel === 'Silben lesen') {
    return {
      selectedChoiceIds: [],
      suggestedCardIds: uniqueLimitedIds(syllableTaskIds),
    };
  }

  if (pathLabel === 'Reduzierte Auswahl und Wiederholung') {
    return {
      selectedChoiceIds: uniqueLimitedIds([latestTaskChoice?.id, taskChoices[0]?.id, taskChoices[1]?.id]),
      suggestedCardIds: uniqueLimitedIds([`daily-task-${latestTaskChoice?.taskId ?? tasks[0]?.id}`, `daily-repeat-${latestTaskChoice?.taskId ?? tasks[0]?.id}`]),
    };
  }

  return {
    selectedChoiceIds: uniqueLimitedIds([taskChoices[0]?.id, taskChoices[1]?.id, storyChoices[0]?.id]),
    suggestedCardIds: uniqueLimitedIds([`daily-task-${tasks[0]?.id}`, `daily-task-${tasks[1]?.id}`, `daily-story-${stories[0]?.id}`]),
  };
}

export function getTeacherDailyPathSuggestion({
  support = {},
  observation = createEmptyObservation(),
  selectedDailyPathIds = [],
  tasks = getLearningTasks(),
  stories = getStoryPaths(),
} = {}) {
  const choices = getDailyPathChoices(tasks, stories);
  const validCurrentChoiceIds = selectedDailyPathIds.filter((selectedId) => choices.some((choice) => choice.id === selectedId)).slice(0, maxDailyPathCards);
  const placement = getAdaptivePlacementSummary({ observation, support });
  const hasStoryEvidence = (observation.storyEvidence ?? []).length > 0;
  const hasRepeatSignal = (observation.choices ?? []).includes('Nochmal') || Boolean(support.repeat) || (observation.selectedSupports ?? []).includes('Nochmal');
  const hasReducedChoiceSignal = Boolean(support.reduceChoices) || (observation.selectedSupports ?? []).includes('Weniger Auswahl');
  const latestTask = tasks.find((task) => task.id === observation.taskPath?.at(-1));
  const thinStarter = (observation.observationCount ?? 0) <= 1 && !hasStoryEvidence && !(hasRepeatSignal && hasReducedChoiceSignal) && latestTask?.type !== 'syllable-blend';
  const pathLabel = thinStarter ? 'Bild und Wort' : placement.pathLabel;
  const { selectedChoiceIds, suggestedCardIds } = getSuggestionChoiceIds(pathLabel, { choices, tasks, stories, observation });
  const alternative = pathLabel === 'Bild und Wort' ? 'Silben lesen' : 'Bild und Wort';
  const reasonSignals = placement.observedSignals.toSorted((left, right) => {
    const leftPriority = /Storyfrage|Nochmal|Weniger Auswahl/.test(left) ? 0 : 1;
    const rightPriority = /Storyfrage|Nochmal|Weniger Auswahl/.test(right) ? 0 : 1;
    return leftPriority - rightPriority;
  });

  return {
    title: 'Vorschlag für den nächsten Tagesweg',
    label: pathLabel,
    suggestion: thinStarter ? 'Heute passt vermutlich Bild und Wort mit klarer visueller Stütze.' : placement.suggestion,
    reason: thinStarter
      ? 'Vorsichtiger Starter: Es gibt noch wenige lokale Signale. Bild und Wort bleibt ein ruhiger Einstieg mit visueller Stütze.'
      : `Warum dieser Vorschlag? ${reasonSignals.slice(0, 2).join(' ')}`,
    alternative,
    nextSmallStep: placement.nextStep,
    selectedChoiceIds: uniqueLimitedIds(selectedChoiceIds),
    suggestedCardIds: uniqueLimitedIds(suggestedCardIds),
    currentChoiceIds: uniqueLimitedIds(validCurrentChoiceIds),
    observedSignals: placement.observedSignals,
    dataQuality: placement.dataQuality,
    teacherExplanation: {
      observedSignals: placement.teacherExplanation.observedSignals,
      suggestedPath: placement.teacherExplanation.suggestedPath,
      uncertainty: placement.teacherExplanation.uncertainty,
      nextSmallStep: placement.teacherExplanation.nextSmallStep,
    },
  };
}

export function getDailyReadingPath(tasks = getLearningTasks(), stories = getStoryPaths()) {
  const firstTask = tasks[0];
  const secondTask = tasks.find((task) => task.id !== firstTask?.id) ?? firstTask;
  const firstStory = stories[0];

  return [
    firstTask
      ? {
          id: `daily-task-${firstTask.id}`,
          kind: 'task',
          taskId: firstTask.id,
          label: firstTask.word,
          helper: 'Erstes Wort',
        }
      : null,
    secondTask
      ? {
          id: `daily-task-${secondTask.id}`,
          kind: 'task',
          taskId: secondTask.id,
          label: secondTask.word,
          helper: 'Noch ein Wort',
        }
      : null,
    firstStory
      ? {
          id: `daily-story-${firstStory.id}`,
          kind: 'story',
          storyId: firstStory.id,
          label: firstStory.title,
          helper: 'Kurze Story',
        }
      : null,
    firstTask
      ? {
          id: `daily-repeat-${firstTask.id}`,
          kind: 'repeat',
          taskId: firstTask.id,
          label: firstTask.word,
          helper: 'Nochmal in Ruhe',
        }
      : null,
  ].filter(Boolean);
}

export function getReducedStoryChoices(stories = getStoryPaths(), activeStoryId = stories[0]?.id, reduceChoices = false) {
  if (!reduceChoices) return stories;
  const active = stories.find((story) => story.id === activeStoryId) ?? stories[0];
  const next = stories.find((story) => story.id !== active.id) ?? active;
  return [active, next];
}

export function getStudentTaskLabel(task) {
  const labels = {
    A: 'Bild und Wort',
    B: 'Silben lesen',
    C: 'Wort lesen',
  };
  return labels[task?.level] ?? 'Lesen';
}

export function getSyllableCards() {
  return learningTasks;
}

export function getReducedChoices(tasks = getLearningTasks(), activeTaskId = tasks[0]?.id, reduceChoices = false) {
  if (!reduceChoices) return tasks;
  const active = tasks.find((task) => task.id === activeTaskId) ?? tasks[0];
  const next = tasks.find((task) => task.id !== active.id) ?? active;
  return [active, next];
}

export const supportOptions = [
  { id: 'imageHelp', label: 'Bildhilfe', description: 'Eine lokale Symbolkarte hilft beim Verstehen.' },
  { id: 'syllableColors', label: 'Silbenfarben', description: 'Silben wechseln blau und rot.' },
  { id: 'readAloud', label: 'Vorlesen', description: 'Lehrkraft liest bei Bedarf kurz vor.' },
  { id: 'signHint', label: 'Gebärden-Hinweis', description: 'Kurzer Handhinweis stützt das Lesen.' },
  { id: 'reduceChoices', label: 'Weniger Auswahl', description: 'Nur zwei Karten werden gezeigt.' },
  { id: 'repeat', label: 'Nochmal', description: 'Die Aufgabe darf in Ruhe wiederholt werden.' },
];

export function normalizeSupportState(support = {}) {
  return {
    imageHelp: Boolean(support.imageHelp),
    syllableColors: support.syllableColors !== false,
    readAloud: Boolean(support.readAloud),
    signHint: Boolean(support.signHint),
    reduceChoices: Boolean(support.reduceChoices),
    repeat: Boolean(support.repeat),
    visibleCardCount: support.reduceChoices ? 2 : getLearningTasks().length,
    feedback: support.repeat
      ? 'Wir lesen in Ruhe noch einmal.'
      : 'Du darfst eine Hilfe wählen. Wir lesen ohne Eile.',
  };
}

function getSupportLabels(support = {}) {
  const safeSupport = normalizeSupportState(support);
  return supportOptions.filter((option) => safeSupport[option.id]).map((option) => option.label);
}

function getDataQualityText(observationCount = 0) {
  return observationCount <= 0
    ? 'noch keine Beobachtung – nur vorbereitende Ansicht'
    : observationCount < 4
      ? 'eine Beobachtung – nur vorsichtige Einordnung'
      : 'wiederholte Beobachtungen – weiterhin pädagogisch prüfen';
}

function getObservedSignals({ observation = createEmptyObservation(), support = {} } = {}) {
  const observedSupport = [...new Set([...getSupportLabels(support), ...(observation.selectedSupports ?? [])])];
  const signals = [];

  if (observedSupport.includes('Bildhilfe')) signals.push('Bildhilfe wurde sichtbar genutzt.');
  if (observedSupport.includes('Silbenfarben')) signals.push('Silbenfarben waren als Wortstruktur sichtbar.');
  if (observedSupport.includes('Gebärden-Hinweis')) signals.push('Gebärden-Hinweis wurde als textbasierte Lesestütze angeboten.');
  if (observedSupport.includes('Weniger Auswahl')) signals.push('Weniger Auswahl hat den Leseweg geordnet.');
  if (observedSupport.includes('Nochmal') || (observation.choices ?? []).includes('Nochmal')) signals.push('Nochmal wurde als ruhige Wiederholung gewählt.');
  if ((observation.storyEvidence ?? []).length > 0) signals.push('Eine Storyfrage wurde mit kurzer Auswahl bearbeitet.');
  if ((observation.taskPath ?? []).length > 0) signals.push('Ein Wort- oder Silbenweg wurde bearbeitet.');

  return signals.length > 0 ? signals : ['Noch keine belastbare Beobachtung gespeichert.'];
}

function getLatestTask(observation = createEmptyObservation()) {
  const latestTaskId = observation.taskPath?.at(-1);
  return learningTasks.find((task) => task.id === latestTaskId);
}

export function getAdaptivePlacementSummary({ observation = createEmptyObservation(), support = {} } = {}) {
  const observedSupport = [...new Set([...getSupportLabels(support), ...(observation.selectedSupports ?? [])])];
  const latestTask = getLatestTask(observation);
  const hasStoryEvidence = (observation.storyEvidence ?? []).length > 0;
  const repeatUsed = (observation.choices ?? []).includes('Nochmal') || observedSupport.includes('Nochmal');
  const reducedChoices = observedSupport.includes('Weniger Auswahl');
  const imageHelp = observedSupport.includes('Bildhilfe');
  const syllableHelp = observedSupport.includes('Silbenfarben');

  let pathLabel = 'Bild und Wort';
  let suggestion = 'Heute passt vermutlich Bild und Wort mit klarer visueller Stütze.';
  let nextStep = 'Noch einmal mit anderem Bild und sehr wenigen Alternativen lesen.';

  if (repeatUsed && reducedChoices) {
    pathLabel = 'Reduzierte Auswahl und Wiederholung';
    suggestion = 'Heute passt vermutlich reduzierte Auswahl mit ruhiger Wiederholung.';
    nextStep = 'Dieselbe Struktur mit zwei Karten und minimaler Variation wiederholen.';
  } else if (hasStoryEvidence) {
    pathLabel = 'Story verstehen';
    suggestion = 'Heute passt vermutlich Story verstehen mit kurzer Frage.';
    nextStep = 'Eine ähnliche Story mit nur einer neuen Schwierigkeit lesen.';
  } else if (latestTask?.type === 'syllable-blend' || (syllableHelp && !imageHelp)) {
    pathLabel = 'Silben lesen';
    suggestion = 'Heute passt vermutlich Silben lesen als nächster Leseschritt.';
    nextStep = 'Eine ähnliche Silbenfolge in Ruhe wiederholen.';
  }

  const observedSignals = getObservedSignals({ observation, support });
  const dataQuality = `${getDataQualityText(observation.observationCount)}; heute passend, nicht endgültig.`;

  return {
    pathLabel,
    suggestion,
    observedSignals,
    dataQuality,
    nextStep,
    teacherExplanation: {
      observedSignals: observedSignals.join(' '),
      suggestedPath: suggestion,
      uncertainty: dataQuality,
      nextSmallStep: nextStep,
    },
  };
}

export function createEmptyObservation() {
  return {
    taskPath: [],
    storyPath: [],
    storyEvidence: [],
    selectedSupports: [],
    choices: [],
    observationCount: 0,
  };
}

export function recordLearningAction(observation = createEmptyObservation(), action = {}) {
  if (action.kind === 'task') {
    return {
      ...observation,
      taskPath: [...observation.taskPath, action.taskId],
      selectedSupports: [...new Set([...observation.selectedSupports, ...getSupportLabels(action.support)])],
      observationCount: observation.observationCount + 1,
    };
  }
  if (action.kind === 'choice') {
    return {
      ...observation,
      choices: [...observation.choices, action.choice],
      observationCount: observation.observationCount + 1,
    };
  }
  if (action.kind === 'story') {
    const story = storyPaths.find((story) => story.id === action.storyId);
    return {
      ...observation,
      storyPath: [...(observation.storyPath ?? []), action.storyTitle ?? story?.title ?? action.storyId],
      storyEvidence: [
        ...(observation.storyEvidence ?? []),
        {
          storyId: action.storyId,
          title: action.storyTitle ?? story?.title,
          answer: action.answer,
          nextStep: action.nextStep ?? story?.nextStep,
        },
      ],
      selectedSupports: [...new Set([...observation.selectedSupports, ...getSupportLabels(action.support)])],
      observationCount: observation.observationCount + 1,
    };
  }
  return observation;
}

export function getTeacherSummary({ profileLabel = 'Profil Blau', support = {}, observation = createEmptyObservation() } = {}) {
  const observedSupport = [...new Set([...getSupportLabels(support), ...observation.selectedSupports])];
  const safeSupportLabels = observedSupport.length > 0 ? observedSupport : ['noch keine Hilfe gewählt'];
  const pathText = observation.taskPath.length > 0 ? observation.taskPath.join(' → ') : 'noch kein Aufgabenweg gespeichert';
  const storyEvidence = observation.storyEvidence ?? [];
  const latestStory = storyEvidence.at(-1);
  const storyPathText = latestStory?.title ? `Story: ${latestStory.title}` : pathText;
  const storyNextStep = latestStory?.nextStep;
  const repeatUsed = observation.choices.includes('Nochmal') || observedSupport.includes('Nochmal');
  const nextStep = repeatUsed
    ? 'Dieselbe Wortstruktur mit Bildhilfe noch einmal anbieten.'
    : 'Kurze Silbenwörter mit wählbarer Bildhilfe wiederholen.';
  const signHintUsed = observedSupport.includes('Gebärden-Hinweis');
  const dataQuality = getDataQualityText(observation.observationCount);
  const actionText = latestStory
    ? `Story gelesen; Antwort: ${latestStory.answer}.${signHintUsed ? ' Gebärden-Hinweis war verfügbar.' : ''}`
    : observation.taskPath.length > 0
      ? `Aufgabe bearbeitet${observation.choices.length > 0 ? `; Auswahl danach: ${observation.choices.join(', ')}` : ''}.${signHintUsed ? ' Gebärden-Hinweis war verfügbar.' : ''}`
      : `Noch keine Aufgabe bearbeitet.${signHintUsed ? ' Gebärden-Hinweis ist vorbereitet.' : ''}`;
  const observationText = signHintUsed
    ? 'Geste stützte das Lesen als textbasierter Handhinweis.'
    : latestStory
      ? 'Story-Verstehen wurde mit kurzer Auswahlhilfe beobachtet.'
      : observedSupport.includes('Bildhilfe') || observedSupport.includes('Silbenfarben')
        ? 'Mit visueller Struktur wird der Leseweg ruhiger angebahnt.'
        : 'Leseweg weiter sachlich beobachten.';

  return {
    profileLabel,
    taskPath: storyPathText,
    readingProfile: observationText,
    observedSupport: safeSupportLabels,
    roughReadingObservation: 'Vorsichtige Einordnung im angeleiteten Silben- und Wortlesen.',
    dataQuality,
    nextStep: `Nächster kleiner Lernschritt: ${nextStep}`,
    supportHistory: {
      situation: latestStory ? storyPathText : `Aufgabenweg: ${pathText}`,
      help: safeSupportLabels.join(', '),
      action: actionText,
      observation: observationText,
      nextStep: storyNextStep ?? nextStep,
    },
    hint: 'Neutrale Beobachtung für die nächste Förderung. Anonym, lokal, bewertungsfrei und ressourcenorientiert.',
  };
}

export function getAlpha73Inventory() {
  const alpha73Tasks = getLearningTasks().filter((task) => task.id.startsWith('alpha73a-'));
  return alpha73Tasks.map((task) => {
    const requirement = taskRequirementProfiles[task.id];
    return {
      id: task.id,
      word: task.word,
      level: task.level,
      domain: task.vocabularyDomain,
      complexity: task.readingComplexity,
      gate: task.visibilityGate,
      requiredGraphemes: requirement?.targetGraphemes ?? [],
      requiredSyllables: requirement?.targetSyllables ?? [],
      complexUnits: requirement?.complexUnits ?? [],
      isAdvanced: task.visibilityGate === 'teacher-led-advanced' || task.readingComplexity === 'teacher-led-advanced',
      pictureHint: task.pictureHint.replace('Bildplatzhalter:', '').trim(),
      syllablesText: task.syllables.map(s => s.text).join('-')
    };
  });
}
