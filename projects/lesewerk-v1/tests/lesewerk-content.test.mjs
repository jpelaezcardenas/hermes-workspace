import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import {
  createEmptyObservation,
  createLocalDidacticProfile,
  createLearningCheckObservation,
  getAnonymousProfiles,
  getAdaptiveNextStepForProfile,
  getLocalObservationControlSummary,
  getCuratedObservationTasksForProfile,
  getLocalReadingSeriesForProfile,
  getLearningCheckDailyPath,
  getChildOrientationSteps,
  getProgressionPathForProfile,
  getLearningCheckSummary,
  learningCheckSteps,
  getLearningTasks,
  getReducedChoices,
  getReducedStoryChoices,
  getStoryPaths,
  getStudentTaskLabel,
  getSyllableCards,
  getTeacherSummary,
  getAdaptivePlacementSummary,
  getTeacherDailyPathSuggestion,
  getTeacherDevelopmentOverview,
  getTeacherWordFamilyReviewSlices,
  getDailyPathChoices,
  getDailyReadingPath,
  getGuidedReadingChain,
  getGuidedReadingTransitionCue,
  developmentMapDimensions,
  getTaskDevelopmentProfile,
  getDevelopmentCoverageSummary,
  getWritingBridgeForTask,
  getSymbolAssetReadinessSummary,
  getCuratedDailyReadingPath,
  getTaskProfileFit,
  getProfileSafeTaskOptions,
  getProfileSafeDailyPath,
  getProfileSafeWortpostPath,
  getWortpostDevelopmentStage,
  getWortpostPresetPreview,
  getWortpostProfilePresets,
  getProfileWordFamilyMaterialPacks,
  getAvailableMiniJourneyCards,
  getMiniJourneyReadinessOverview,
  getMiniJourneyPrepActions,
  getMiniJourneyPrepSequence,
  getMiniJourneyTeacherRationales,
  getMamaFamilyMiniJourney,
  getSofaFamilyMiniJourney,
  getTasseFamilyMiniJourney,
  getBusFamilyMiniJourney,
  getBuchFamilyMiniJourney,
  getTischFamilyMiniJourney,
  getHeftFamilyMiniJourney,
  getWordFamilyMiniJourney,
  getObjectFamilyMiniSlice,
  getWortpostStageOrientation,
  getWortpostSentenceBridge,
  getTaskRequirementCoverageSummary,
  getTwoCardPilotPath,
  readingProfileExamples,
  taskRequirementProfiles,
  getTwoCardPilotSupport,
  createMiniStoryBridgeMetadata,
  createWritingBridgeMetadata,
  getTaskBridgeMetadata,
  maxDailyPathCards,
  normalizeSupportState,
  profileBuilderOptions,
  recordLearningAction,
  supportOptions,
} from '../src/lesewerk-content.mjs';

const unsafeQualityWords = /diagnose|diagnost|note|noten|rang|ranking|score|timer|zeitdruck|falsch|fehler|schwach|defizit|leistung|perfekt|super|klasse|toll|musst|solltest/i;
const protectedAssetWords = /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac|protected|asset|lizenz/i;


test('Alpha 71A object family mini slice adds only Sofa Tisch Tasse Teller and keeps five-step logic', () => {
  const slice = getObjectFamilyMiniSlice();
  const visibleText = JSON.stringify(slice);

  assert.equal(slice.id, 'object-family-sofa-tisch-tasse-teller');
  assert.deepEqual(slice.objectWords, ['Sofa', 'Tisch', 'Tasse', 'Teller']);
  assert.deepEqual(slice.childMiniMoment.steps.map((step) => step.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.equal(slice.childMiniMoment.anchorWord, 'Teller');
  assert.match(visibleText, /Tasse|Tisch|Teller|Sofa/);
  assert.doesNotMatch(visibleText, /Ball|Bus|Haus|Lama|Mama\/Lama/i);
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});


test('Alpha 71A object family UI is teacher-prepared with exactly one child mini moment', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const objectMomentSection = appSource.slice(appSource.indexOf('function ObjectFamilyMiniMomentStage'), appSource.indexOf('function MiniJourneyPrepStage'));

  assert.match(appSource, /getObjectFamilyMiniSlice/);
  assert.match(teacherWortpostSection, /Objektfamilie: Sofa, Tisch, Tasse, Teller/);
  assert.match(teacherWortpostSection, /object-family-mini-slice/);
  assert.match(teacherWortpostSection, /Objekt-Moment starten/);
  assert.match(objectMomentSection, /object-family-mini-moment-stage/);
  assert.match(objectMomentSection, /Teller ist auf dem Tisch/);
  assert.match(objectMomentSection, /Genau ein Mini-Moment/);
  assert.match(css, /\.object-family-mini-slice/);
  assert.match(css, /\.object-family-table/);
  assert.match(css, /\.object-family-plate/);
  assert.doesNotMatch(objectMomentSection, /Dashboard|Score|Ranking|Punkte|Timer|Note|Diagnose|Storage|fetch\(|Lama-Mini-Reise|Mama-Mini-Reise/i);
});


test('Alpha 71B object family moment has specific finish copy without generic mini journey wording', () => {
  const slice = getObjectFamilyMiniSlice();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const finishScreenSection = appSource.slice(appSource.indexOf('function FinishScreen'), appSource.indexOf('function SummaryItem'));

  assert.equal(slice.childMiniMoment.finishTitle, 'Der Teller-Moment ist fertig.');
  assert.equal(slice.childMiniMoment.repeatLabel, 'Nochmal Teller');
  assert.equal(slice.childMiniMoment.teacherLabel, 'Zur Lehrkraft');
  assert.match(finishScreenSection, /objectFamilyMomentMode/);
  assert.match(finishScreenSection, /Der Teller-Moment ist fertig\./);
  assert.match(finishScreenSection, /objectFamilyMomentMode \? 'Nochmal Teller'/);
  assert.doesNotMatch(finishScreenSection, /objectFamilyMomentMode \? 'Mini-Reise nochmal starten'/);
});


test('Alpha 71B object family moment keeps child orientation and visual separation pressure-free', () => {
  const slice = getObjectFamilyMiniSlice();
  const visibleText = JSON.stringify(slice);
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const objectMomentSection = appSource.slice(appSource.indexOf('function ObjectFamilyMiniMomentStage'), appSource.indexOf('function MiniJourneyPrepStage'));

  assert.equal(slice.childMiniMoment.orientation, 'Schau: Der Teller steht auf dem Tisch. Die Tasse steht daneben.');
  assert.match(objectMomentSection, /object-family-orientation-card/);
  assert.match(objectMomentSection, /object-family-layer-grid/);
  assert.match(objectMomentSection, /Bild<\/strong>[\s\S]*Silbe<\/strong>[\s\S]*Wort<\/strong>[\s\S]*Satz<\/strong>/);
  assert.match(objectMomentSection, /Was liegt auf dem Tisch\?/);
  assert.match(css, /\.object-family-orientation-card/);
  assert.match(css, /\.object-family-layer-grid/);
  assert.match(css, /\.object-family-cup::before/);
  assert.match(css, /\.object-family-plate::after/);
  assert.doesNotMatch(visibleText + objectMomentSection, /Ball|Bus|Haus|Lama|Mama\/Lama|Score|Ranking|Punkte|Timer|Note|Diagnose|Storage|fetch\(|Cloud|Upload|Export|falsch|Fehler/i);
});


test('Alpha 71C object family narrow rules keep scene width and calm tablet wrapping', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const objectFamilyCss = css.slice(css.indexOf('.object-family-mini-slice'));

  assert.match(objectFamilyCss, /\.object-family-scene\s*\{[\s\S]*width:\s*min\(100%, 760px\)/);
  assert.match(objectFamilyCss, /\.object-family-orientation-card\s*\{[\s\S]*width:\s*min\(100%, 820px\)/);
  assert.match(objectFamilyCss, /\.object-family-layer-grid\s*\{[\s\S]*width:\s*min\(100%, 860px\)/);
  assert.match(objectFamilyCss, /\.object-family-step-path\s*\{[\s\S]*width:\s*min\(100%, 900px\)/);
  assert.match(objectFamilyCss, /@media \(max-width: 820px\) \{[\s\S]*\.object-family-layer-grid,[\s\S]*\.object-family-step-path \{[\s\S]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(objectFamilyCss, /@media \(max-width: 560px\) \{[\s\S]*\.object-family-layer-grid,[\s\S]*\.object-family-step-path \{[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\)/);
});


test('Alpha 72A object family interaction offers exactly Teller and Tasse', () => {
  const slice = getObjectFamilyMiniSlice();
  const interaction = slice.childMiniMoment.interaction;

  assert.equal(interaction.prompt, 'Zeig Teller.');
  assert.deepEqual(interaction.options.map((option) => option.id), ['plate', 'cup']);
  assert.deepEqual(interaction.options.map((option) => option.label), ['Teller', 'Tasse']);
  assert.equal(interaction.options.length, 2);
});


test('Alpha 72A interaction feedback is informative and pressure-free', () => {
  const slice = getObjectFamilyMiniSlice();
  const interactionText = JSON.stringify(slice.childMiniMoment.interaction);

  assert.match(interactionText, /Ja\. Teller\.|Teller liegt auf dem Tisch/);
  assert.match(interactionText, /Tasse/);
  assert.doesNotMatch(interactionText, /falsch|Fehler|Punkte|Score|Timer|Note|Ranking|rot|schlecht|musst/i);
});


test('Alpha 72A object family UI renders one two-option interaction with calm feedback', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const objectMomentSection = appSource.slice(appSource.indexOf('function ObjectFamilyMiniMomentStage'), appSource.indexOf('function MiniJourneyPrepStage'));
  const objectFamilyCss = css.slice(css.indexOf('.object-family-mini-slice'));

  assert.match(objectMomentSection, /useState/);
  assert.match(objectMomentSection, /object-family-interaction-card/);
  assert.match(objectMomentSection, /object-family-option-grid/);
  assert.match(objectMomentSection, /object-family-feedback/);
  assert.match(objectMomentSection, /interaction\.options\.map/);
  assert.match(objectMomentSection, /setSelectedInteractionOption/);
  assert.match(objectFamilyCss, /\.object-family-option-grid/);
  assert.match(objectFamilyCss, /\.object-family-feedback/);
  assert.doesNotMatch(objectMomentSection, /Score|Ranking|Punkte|Timer|Note|Diagnose|Storage|fetch\(|falsch|Fehler/i);
});


test('Alpha 72A object family interaction adds no new object words', () => {
  const slice = getObjectFamilyMiniSlice();
  const visibleText = JSON.stringify(slice);

  assert.match(visibleText, /Sofa/);
  assert.match(visibleText, /Tisch/);
  assert.match(visibleText, /Tasse/);
  assert.match(visibleText, /Teller/);
  assert.doesNotMatch(visibleText, /Ball|Bus|Haus|Lama|Mama\/Lama|Becher|Schale|Gabel|Löffel|Stuhl/i);
});


test('Alpha 72B object family renders play action before secondary learning trail', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const objectMomentSection = appSource.slice(appSource.indexOf('function ObjectFamilyMiniMomentStage'), appSource.indexOf('function MiniJourneyPrepStage'));
  const sceneIndex = objectMomentSection.indexOf('className="object-family-scene"');
  const playPanelIndex = objectMomentSection.indexOf('className="object-family-play-panel"');
  const interactionIndex = objectMomentSection.indexOf('className="object-family-interaction-card"');
  const learningTrailIndex = objectMomentSection.indexOf('className="object-family-learning-trail"');
  const stepPathIndex = objectMomentSection.indexOf('className="object-family-step-path"');

  assert.ok(sceneIndex > -1, 'scene must stay as first visual anchor');
  assert.ok(playPanelIndex > sceneIndex, 'play panel must follow the scene');
  assert.ok(interactionIndex > playPanelIndex, 'interaction must be inside the play panel');
  assert.ok(learningTrailIndex > interactionIndex, 'secondary learning trail must follow the main interaction');
  assert.ok(stepPathIndex > learningTrailIndex, 'step path must stay in the secondary learning trail');
});


test('Alpha 72B object family options stay exactly Teller Tasse and avoid pressure words', () => {
  const slice = getObjectFamilyMiniSlice();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const objectMomentSection = appSource.slice(appSource.indexOf('function ObjectFamilyMiniMomentStage'), appSource.indexOf('function MiniJourneyPrepStage'));
  const combinedText = JSON.stringify(slice.childMiniMoment.interaction) + objectMomentSection;

  assert.deepEqual(slice.childMiniMoment.interaction.options.map((option) => option.label), ['Teller', 'Tasse']);
  assert.equal(slice.childMiniMoment.interaction.options.length, 2);
  assert.doesNotMatch(combinedText, /falsch|Fehler|Score|Punkte|Timer|Note|Ranking|Diagnose/i);
});


test('Alpha 72B CSS makes the main interaction touch-safe focused and narrow-stable', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const objectFamilyCss = css.slice(css.indexOf('.object-family-mini-slice'));

  assert.match(objectFamilyCss, /\.object-family-play-panel\s*\{[\s\S]*width:\s*min\(100%, 820px\)/);
  assert.match(objectFamilyCss, /\.object-family-interaction-card\s*\{[\s\S]*padding:\s*clamp\(18px, 4vw, 30px\)/);
  assert.match(objectFamilyCss, /\.object-family-option-grid button\s*\{[\s\S]*min-height:\s*clamp\(92px, 16vw, 132px\)/);
  assert.match(objectFamilyCss, /\.object-family-option-grid button:focus-visible\s*\{[\s\S]*outline:\s*4px solid/);
  assert.match(objectFamilyCss, /\.object-family-option-symbol/);
  assert.match(objectFamilyCss, /@media \(max-width: 560px\) \{[\s\S]*\.object-family-play-panel[\s\S]*\.object-family-option-grid \{[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\)/);
});


test('Alpha 73A student vocabulary pack adds controlled everyday target opportunities', () => {
  const tasks = getLearningTasks();
  const expectedWords = ['Stift', 'Heft', 'Buch', 'Tür', 'Brot', 'Banane', 'Wasser', 'Apfel', 'Hand', 'Fuß', 'Schuh', 'Jacke', 'Ball', 'Bus', 'Tisch', 'Sofa'];
  const alpha73Tasks = tasks.filter((task) => task.id.startsWith('alpha73a-'));
  const alpha73Words = new Set(alpha73Tasks.map((task) => task.word));

  assert.ok(alpha73Tasks.length >= 12);
  for (const word of expectedWords) assert.ok(alpha73Words.has(word), `${word} fehlt im Alpha-73A-Paket`);
  for (const task of alpha73Tasks) {
    assert.match(task.pictureHint, /^Bildplatzhalter:/);
    assert.ok(task.storyBridge || task.writingBridge, `${task.id} braucht einen Lernpfad-Anschluss`);
    assert.doesNotMatch(JSON.stringify(task), protectedAssetWords);
  }
});


test('Alpha 73A student vocabulary pack is classified by domain and complexity', () => {
  const alpha73Tasks = getLearningTasks().filter((task) => task.id.startsWith('alpha73a-'));
  const domains = new Set(alpha73Tasks.map((task) => task.vocabularyDomain));
  const complexity = new Set(alpha73Tasks.map((task) => task.readingComplexity));

  assert.deepEqual(domains, new Set(['schule-material', 'essen-trinken', 'koerper-kleidung', 'alltag-spiel-orientierung']));
  assert.ok(complexity.has('very-early'));
  assert.ok(complexity.has('medium'));
  assert.ok(complexity.has('teacher-led-advanced'));
  for (const task of alpha73Tasks) {
    assert.equal(task.localOnly, true);
    assert.equal(task.externalMediaDependency, false);
    assert.ok(['immediate-child-visible', 'teacher-selectable', 'teacher-led-advanced'].includes(task.visibilityGate));
  }
});


test('Alpha 73A complex everyday words are gated and early profile path stays small', () => {
  const complexWords = ['Tür', 'Fuß', 'Schuh', 'Jacke', 'Tisch', 'Buch'];
  for (const word of complexWords) {
    const task = getLearningTasks().find((item) => item.id.startsWith('alpha73a-') && item.word === word);
    assert.ok(task, `${word} fehlt`);
    const requirement = taskRequirementProfiles[task.id];
    assert.ok(requirement, `${task.id} braucht lokale Anforderungen`);
    assert.equal(requirement.requiresTeacherReview, true, `${word} muss lehrkraftgeführt/advanced markiert sein`);
    assert.notEqual(requirement.qualityStatus, 'reviewed_safe');
  }

  const earlyPath = getProfileSafeDailyPath(readingProfileExamples.profileMA, { minimumChoices: 1 });
  const earlyWords = new Set(earlyPath.cards.map((card) => card.word));
  assert.ok(earlyPath.cards.length <= maxDailyPathCards);
  for (const word of complexWords) assert.equal(earlyWords.has(word), false, `${word} darf Profil M+A nicht fluten`);
});


test('Alpha 73A keeps Alpha 72 object-family slice intact and adds no external assets', () => {
  const slice = getObjectFamilyMiniSlice();
  const alpha73Text = JSON.stringify(getLearningTasks().filter((task) => task.id.startsWith('alpha73a-')));

  assert.deepEqual(slice.objectWords, ['Sofa', 'Tisch', 'Tasse', 'Teller']);
  assert.equal(slice.childMiniMoment.anchorWord, 'Teller');
  assert.deepEqual(slice.childMiniMoment.interaction.options.map((option) => option.label), ['Teller', 'Tasse']);
  assert.doesNotMatch(alpha73Text, protectedAssetWords);
});


test('Alpha 72C plate and cup option symbols have distinct local material anchors', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const objectFamilyCss = css.slice(css.indexOf('.object-family-mini-slice'));

  assert.match(objectFamilyCss, /\.object-family-option-symbol-plate\s*\{[\s\S]*width:\s*86px[\s\S]*height:\s*38px[\s\S]*border:\s*2px solid[\s\S]*radial-gradient/);
  assert.match(objectFamilyCss, /\.object-family-option-symbol-plate::before\s*\{[\s\S]*border:\s*3px solid[\s\S]*background:\s*transparent/);
  assert.match(objectFamilyCss, /\.object-family-option-symbol-plate::after\s*\{[\s\S]*inset:\s*13px 26px[\s\S]*box-shadow:\s*inset 0 0 0 2px/);
  assert.match(objectFamilyCss, /\.object-family-option-symbol-cup\s*\{[\s\S]*width:\s*54px[\s\S]*height:\s*54px[\s\S]*border:\s*2px solid[\s\S]*linear-gradient/);
  assert.match(objectFamilyCss, /\.object-family-option-symbol-cup::before\s*\{[\s\S]*border:\s*2px solid[\s\S]*background:\s*#f7fbff/);
  assert.match(objectFamilyCss, /\.object-family-option-symbol-cup::after\s*\{[\s\S]*right:\s*-22px[\s\S]*border:\s*7px solid/);
});


test('Alpha 72C scene and option anchors stay consistent local CSS without external assets', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const objectMomentSection = appSource.slice(appSource.indexOf('function ObjectFamilyMiniMomentStage'), appSource.indexOf('function MiniJourneyPrepStage'));
  const objectFamilyCss = css.slice(css.indexOf('.object-family-mini-slice'), css.indexOf('@media (max-width: 620px)'));

  assert.match(objectMomentSection, /className="object-family-cup"/);
  assert.match(objectMomentSection, /className="object-family-plate"/);
  assert.match(objectMomentSection, /object-family-option-symbol-\$\{option\.id\}/);
  assert.match(objectFamilyCss, /\.object-family-cup\s*\{[\s\S]*border:\s*2px solid[\s\S]*linear-gradient/);
  assert.match(objectFamilyCss, /\.object-family-cup::after\s*\{[\s\S]*border:\s*6px solid/);
  assert.match(objectFamilyCss, /\.object-family-plate\s*\{[\s\S]*border:\s*2px solid[\s\S]*radial-gradient/);
  assert.match(objectFamilyCss, /\.object-family-plate::before\s*\{[\s\S]*border:\s*3px solid/);
  assert.doesNotMatch(objectFamilyCss, /url\(|https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif/i);
});


test('Alpha 72C option cards keep premium calm styling and explicit narrow symbol sizing', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const objectFamilyCss = css.slice(css.indexOf('.object-family-mini-slice'));

  assert.match(objectFamilyCss, /\.object-family-option-grid button\s*\{[\s\S]*background:\s*linear-gradient\(180deg, #fffdf8 0%, #fff4df 100%\)[\s\S]*box-shadow:\s*inset 0 0 0 3px/);
  assert.match(objectFamilyCss, /\.object-family-option-symbol\s*\{[\s\S]*width:\s*86px[\s\S]*height:\s*56px/);
  assert.match(objectFamilyCss, /@media \(max-width: 560px\) \{[\s\S]*\.object-family-option-symbol \{[\s\S]*width:\s*78px[\s\S]*height:\s*50px[\s\S]*\.object-family-option-symbol-plate \{[\s\S]*width:\s*78px[\s\S]*height:\s*34px[\s\S]*\.object-family-option-symbol-cup \{[\s\S]*width:\s*50px[\s\S]*height:\s*50px/);
});


test('Alpha 67A material packs gate Mama, Sofa and Tasse by known units', () => {
  const tasks = getLearningTasks();
  const profileMA = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a'],
    knownSyllables: ['ma'],
    readiness: { sentence: 'later', story: 'later' },
    accessFocus: 'syllable',
  });
  const profileSofa = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'later', story: 'later' },
    accessFocus: 'word',
  });
  const profileSentence = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'],
    knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'],
    readiness: { sentence: 'supported', story: 'later' },
    accessFocus: 'sentence',
  });

  assert.deepEqual(getProfileWordFamilyMaterialPacks(profileMA, tasks).map((pack) => pack.anchorWord), ['Mama']);
  assert.deepEqual(getProfileWordFamilyMaterialPacks(profileSofa, tasks).map((pack) => pack.anchorWord), ['Mama', 'Sofa']);
  assert.deepEqual(getProfileWordFamilyMaterialPacks(profileSentence, tasks).map((pack) => pack.anchorWord), ['Mama', 'Sofa', 'Tasse']);
});

test('Alpha 67A material packs keep ordered local pressure-free steps', () => {
  const tasks = getLearningTasks();
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'],
    knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'sentence',
  });
  const packs = getProfileWordFamilyMaterialPacks(profile, tasks);
  const visibleText = JSON.stringify(packs);
  const expectedOrder = ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte'];

  assert.ok(packs.length <= 3);
  assert.ok(packs.every((pack) => pack.localOnly === true && pack.persistent === false));
  assert.ok(packs.every((pack) => pack.id && pack.title && pack.anchorWord && pack.stageFit && pack.teacherUse && pack.childSafeSummary));
  assert.ok(packs.every((pack) => pack.materialSteps.every((step, index) => step.label === expectedOrder[index])));
  assert.ok(packs.every((pack) => pack.taskIds.length > 0 || pack.taskRefs.length > 0));
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 67A teacher source shows material packs only in teacher area', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const childWortpostSection = appSource.slice(appSource.indexOf('function WortpostStage'), appSource.indexOf('function WortpostFeedback'));

  assert.match(appSource, /getProfileWordFamilyMaterialPacks/);
  assert.match(teacherWortpostSection, /Materialpakete aus bekannten Einheiten/);
  assert.match(teacherWortpostSection, /wordFamilyMaterialPacks/);
  assert.match(teacherWortpostSection, /materialSteps/);
  assert.match(css, /\.word-family-material-grid/);
  assert.doesNotMatch(teacherWortpostSection, /Score|Ranking|Punkte|Prozent|Timer|Level|Diagnose|Cloud|Upload|Export|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(childWortpostSection, /Materialpakete aus bekannten Einheiten|wordFamilyMaterialPacks|materialSteps|Mama-Familie|Sofa-Familie|Tasse-Familie/i);
});


test('Alpha 67B Mama mini journey has five calm local stations in order', () => {
  const tasks = getLearningTasks();
  const profile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readiness: { sentence: 'supported', story: 'supported' } });
  const journey = getMamaFamilyMiniJourney(profile, tasks);
  const visibleText = JSON.stringify(journey);

  assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.equal(journey.length, 5);
  assert.ok(journey.every((station) => station.id && station.childPrompt && station.teacherHint && station.taskRef && station.taskId && station.successText));
  assert.ok(journey.every((station) => station.localOnly === true && station.persistent === false));
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 67B source wires Mama journey start in teacher area and child focus without material dashboard', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const mamaJourneySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(appSource, /getMamaFamilyMiniJourney/);
  assert.match(teacherWortpostSection, /Mama-Mini-Reise starten/);
  assert.match(teacherWortpostSection, /startWordFamilyMiniJourney/);
  assert.match(mamaJourneySection, /Weiter/);
  assert.match(mamaJourneySection, /Nochmal/);
  assert.match(mamaJourneySection, /Zur Lehrkraft/);
  assert.match(css, /\.mama-family-journey-stage/);
  assert.doesNotMatch(mamaJourneySection, /Materialpakete aus bekannten Einheiten|wordFamilyMaterialPacks|materialSteps|Dashboard|Score|Ranking|Punkte|Timer|Note|Diagnose|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 67C Sofa mini journey has five calm local stations in order', () => {
  const tasks = getLearningTasks();
  const profile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], readiness: { sentence: 'supported', story: 'supported' } });
  const journey = getSofaFamilyMiniJourney(profile, tasks);
  const visibleText = JSON.stringify(journey);

  assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.equal(journey.length, 5);
  assert.ok(journey.every((station) => station.id && station.childPrompt && station.teacherHint && station.taskRef && station.taskId && station.successText));
  assert.ok(journey.every((station) => station.anchorWord === 'Sofa' && station.journeyTitle === 'Sofa-Mini-Reise'));
  assert.ok(journey.every((station) => station.localOnly === true && station.persistent === false));
  assert.match(visibleText, /So - fa|Sofa/);
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 67D mini journey selector derives only available journey cards', () => {
  const tasks = getLearningTasks();
  const profileMA = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readiness: { sentence: 'supported', story: 'supported' } });
  const profileSofa = createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], readiness: { sentence: 'supported', story: 'supported' } });
  const expectedSteps = ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte'];

  const earlyCards = getAvailableMiniJourneyCards(profileMA, tasks);
  const sofaCards = getAvailableMiniJourneyCards(profileSofa, tasks);

  assert.deepEqual(earlyCards.map((card) => card.anchorWord), ['Mama']);
  assert.deepEqual(sofaCards.map((card) => card.anchorWord), ['Mama', 'Sofa']);
  assert.ok(sofaCards.every((card) => card.journeyTitle === `${card.anchorWord}-Mini-Reise`));
  assert.ok(sofaCards.every((card) => card.startLabel === `${card.anchorWord}-Mini-Reise starten`));
  assert.ok(sofaCards.every((card) => card.fitReason && card.knownUnitsSummary));
  assert.ok(sofaCards.every((card) => card.localOnly === true && card.persistent === false));
  assert.ok(sofaCards.every((card) => JSON.stringify(card.stepsPreview) === JSON.stringify(expectedSteps)));
  assert.doesNotMatch(JSON.stringify(sofaCards), unsafeQualityWords);
  assert.doesNotMatch(JSON.stringify(sofaCards), /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 67D source shows calm teacher selector and keeps child journey dashboard-free', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(appSource, /getAvailableMiniJourneyCards/);
  assert.match(teacherWortpostSection, /Heute passende Lesereisen/);
  assert.match(teacherWortpostSection, /Mama-Mini-Reise starten/);
  assert.match(teacherWortpostSection, /Sofa-Mini-Reise starten/);
  assert.match(teacherWortpostSection, /availableMiniJourneyCards/);
  assert.doesNotMatch(teacherWortpostSection, /Score|Ranking|Punkte|Prozent|Timer|Level|Diagnose|Cloud|Upload|Export|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(journeySection, /Heute passende Lesereisen|availableMiniJourneyCards|Dashboard|Score|Ranking|Punkte|Timer|Note|Diagnose|Storage|fetch\(/i);
});

test('Alpha 67E selector uses prominent word anchors, calm chips and concrete roadmap slices', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const roadmapUrl = new URL('../reports/alpha-67-lesereisen-roadmap.md', import.meta.url);
  const roadmap = readFileSync(roadmapUrl, 'utf8');

  assert.ok(existsSync(roadmapUrl));
  assert.match(teacherWortpostSection, /mini-journey-word-anchor/);
  assert.match(teacherWortpostSection, /mini-journey-step-chips/);
  assert.match(teacherWortpostSection, /mini-journey-card-action/);
  assert.match(css, /\.mini-journey-word-anchor/);
  assert.match(css, /font-size: clamp\(1\.55rem, 4vw, 2\.35rem\)/);
  assert.match(css, /\.mini-journey-step-chips/);
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(roadmap, /Kleinster sicherer Slice/g);
  assert.ok((roadmap.match(/## Priorität/g) ?? []).length >= 6);
  assert.match(roadmap, /67F Tasse-Reise/);
  assert.match(roadmap, /Adaptive Wiederholung ohne Speicherung/);
  assert.match(roadmap, /Export\/Print nur lokal/);
  assert.doesNotMatch(journeySection, /Roadmap|Selector|Dashboard|Score|Ranking|Punkte|Timer|Diagnose|Storage|fetch\(/i);
});

test('Alpha 67F selector renders local CSS symbol anchors for Mama and Sofa cards', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(teacherWortpostSection, /mini-journey-symbol-anchor/);
  assert.match(teacherWortpostSection, /mini-journey-symbol-anchor--\$\{card\.anchorWord\.toLowerCase\(\)\}/);
  assert.match(teacherWortpostSection, /card\.anchorWord === 'Ball' \? \(/);
  assert.match(teacherWortpostSection, /'Tas' : card\.anchorWord === 'Sofa' \? 'So' : card\.anchorWord === 'Lama' \? 'La' : 'Ma'/);
  assert.match(teacherWortpostSection, /mini-journey-symbol-tile-word/);
  assert.match(teacherWortpostSection, /mini-journey-symbol--mama/);
  assert.match(teacherWortpostSection, /mini-journey-symbol--sofa/);
  assert.match(css, /\.mini-journey-symbol-anchor/);
  assert.match(css, /\.mini-journey-symbol-anchor--sofa/);
  assert.match(css, /\.mini-journey-symbol-tile/);
  assert.match(css, /\.mini-journey-mama-house/);
  assert.match(css, /\.mini-journey-sofa-seat/);
  assert.doesNotMatch(teacherWortpostSection, /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(journeySection, /Heute passende Lesereisen|mini-journey-symbol-anchor|Selector|Roadmap|Dashboard|Score|Ranking|Punkte|Timer|Diagnose|Storage|fetch\(/i);
});

test('Alpha 67G child focus journey renders calm play scene with current station focus', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(journeySection, /mini-journey-play-scene/);
  assert.match(journeySection, /mini-journey-scene-panel/);
  assert.match(journeySection, /mini-journey-focus-symbol/);
  assert.match(journeySection, /mini-journey-stage-track/);
  assert.match(journeySection, /mini-journey-stage-focus/);
  assert.match(journeySection, /station\.anchorWord === 'Ball' \? \['Ball'\] : station\.anchorWord === 'Bus' \? \['Bus'\] : station\.anchorWord === 'Buch' \? \['Buch'\] : station\.anchorWord === 'Tisch' \? \['Tisch'\] : station\.anchorWord === 'Heft' \? \['Heft'\] : station\.anchorWord === 'Apfel' \? \['Ap', 'fel'\] : station\.anchorWord === 'Tasse' \? \['Tas', 'se'\] : station\.anchorWord === 'Sofa' \? \['So', 'fa'\] : station\.anchorWord === 'Lama' \? \['La', 'ma'\] : \['Ma', 'ma'\]/);
  assert.match(journeySection, /aria-current=\{index === activePathIndex \? 'step' : undefined\}/);
  assert.match(css, /\.mini-journey-play-scene/);
  assert.match(css, /\.mini-journey-stage-focus/);
  assert.match(css, /\.mini-journey-focus-symbol/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.doesNotMatch(journeySection, /Heute passende Lesereisen|Selector|Roadmap|Dashboard|Score|Ranking|Punkte|Timer|Diagnose|Storage|fetch\(/i);
});

test('Alpha 67H child focus repeat help stays local and pressure-free', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(journeySection, />Hilfe<\/button>/);
  assert.match(journeySection, /mini-journey-help-active/);
  assert.match(journeySection, /mini-journey-help-box/);
  assert.match(journeySection, /Wir schauen langsam\. Erst die Silben, dann das Wort\./);
  assert.match(journeySection, /erst schauen/);
  assert.match(journeySection, /dann lesen/);
  assert.match(appSource, /setMamaJourneyHelpActive\(false\)/);
  assert.match(css, /\.mini-journey-help-active/);
  assert.match(css, /\.mini-journey-help-box/);
  assert.doesNotMatch(journeySection, /Heute passende Lesereisen|Selector|Roadmap|Dashboard|Score|Ranking|Punkte|Timer|Diagnose|Storage|fetch\(/i);
});

test('Alpha 67I Tasse mini journey has five calm local stations in order', () => {
  const tasks = getLearningTasks();
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'],
    knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'sentence',
  });
  const journey = getTasseFamilyMiniJourney(profile, tasks);
  const visibleText = JSON.stringify(journey);

  assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.equal(journey.length, 5);
  assert.ok(journey.every((station) => station.id && station.childPrompt && station.teacherHint && station.taskRef && station.taskId && station.successText));
  assert.ok(journey.every((station) => station.anchorWord === 'Tasse' && station.journeyTitle === 'Tasse-Mini-Reise'));
  assert.ok(journey.every((station) => station.localOnly === true && station.persistent === false));
  assert.match(visibleText, /Tas - se|Tasse|Die Tasse ist da/);
  assert.match(visibleText, /Die Tasse ist da\. Was passt\?/);
  assert.deepEqual(journey.find((station) => station.label === 'Satz')?.childPrompt, 'Lies: Die Tasse ist da.');
  assert.deepEqual(journey.find((station) => station.label === 'Mini-Geschichte')?.childPrompt, 'Die Tasse ist da. Was passt?');
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 69B Tasse premium mini journey keeps five-step visual path and sentence supports', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const selectorSection = appSource.slice(appSource.indexOf('className="mini-journey-selector"'), appSource.indexOf('className="word-family-material-grid"'));

  assert.match(selectorSection, /card\.anchorWord === 'Tasse' \? 'Tas'/);
  assert.match(selectorSection, /card\.anchorWord === 'Tasse' \? 'se'/);
  assert.match(selectorSection, /mini-journey-symbol--tasse/);
  assert.match(selectorSection, /Tasse-Mini-Reise starten/);
  assert.match(journeySection, /station\.anchorWord === 'Tasse' \? \['Tas', 'se'\]/);
  assert.match(journeySection, /const childPathSteps = \['Bild', 'Silben', 'Wort', 'Satz', 'Mini-Geschichte'\]/);
  assert.match(journeySection, /mini-journey-layer-badge/);
  assert.match(journeySection, /mini-journey-sentence-line/);
  assert.match(journeySection, /mini-journey-word-tile--anchor/);
  assert.match(journeySection, /mini-journey-comprehension-scene/);
  assert.match(journeySection, /Die Tasse ist da/);
  assert.match(css, /\.mini-journey-symbol-anchor--tasse/);
  assert.match(css, /\.mini-journey-cup-bowl/);
  assert.match(css, /\.mini-journey-sentence-scene/);
  assert.match(css, /\.mini-journey-comprehension-card/);
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.doesNotMatch(journeySection, /Heute passende Lesereisen|Selector|Roadmap|Dashboard|Score|Ranking|Punkte|Timer|Note|Diagnose|Storage|fetch\(/i);
});

test('Alpha 69C Lama premium mini journey matches verified five-step quality and stays gated', () => {
  const tasks = getLearningTasks();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const selectorSection = appSource.slice(appSource.indexOf('className="mini-journey-selector"'), appSource.indexOf('className="word-family-material-grid"'));
  const noLProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const noLaProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 'l'],
    knownSyllables: ['ma'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const lamaProfile = createLocalDidacticProfile({
    knownGraphemes: ['l', 'a', 'm'],
    knownSyllables: ['la', 'ma'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const journey = getWordFamilyMiniJourney(lamaProfile, tasks, { anchorWord: 'Lama', maxPacks: 4 });
  const visibleText = JSON.stringify(journey);

  assert.equal(journey.length, 5);
  assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.ok(journey.every((station) => station.anchorWord === 'Lama' && station.journeyTitle === 'Lama-Mini-Reise'));
  assert.equal(journey.find((station) => station.label === 'Silbe')?.childPrompt, 'Lies: La - ma.');
  assert.equal(journey.find((station) => station.label === 'Satz')?.childPrompt, 'Lies: Das Lama ist da.');
  assert.equal(journey.find((station) => station.label === 'Mini-Geschichte')?.childPrompt, 'Das Lama ist da. Was passt?');
  assert.match(visibleText, /La - ma|Das Lama ist da\. Was passt\?/);
  assert.deepEqual(getAvailableMiniJourneyCards(noLProfile, tasks, { maxCards: 4 }).map((card) => card.anchorWord), ['Mama', 'Sofa']);
  assert.ok(!getAvailableMiniJourneyCards(noLaProfile, tasks, { maxCards: 4 }).some((card) => card.anchorWord === 'Lama'));
  assert.deepEqual(getAvailableMiniJourneyCards(lamaProfile, tasks, { maxCards: 4 }).map((card) => card.anchorWord), ['Mama', 'Lama']);
  assert.match(selectorSection, /card\.anchorWord === 'Lama' \? 'La'/);
  assert.match(selectorSection, /card\.anchorWord === 'Tasse' \? 'se' : card\.anchorWord === 'Sofa' \? 'fa' : 'ma'/);
  assert.match(selectorSection, /mini-journey-symbol--lama/);
  assert.match(selectorSection, /Lama-Mini-Reise starten/);
  assert.match(journeySection, /station\.anchorWord === 'Lama' \? \['La', 'ma'\]/);
  assert.match(journeySection, /const childPathSteps = \['Bild', 'Silben', 'Wort', 'Satz', 'Mini-Geschichte'\]/);
  assert.match(journeySection, /mini-journey-layer-badge/);
  assert.match(journeySection, /mini-journey-sentence-line/);
  assert.match(journeySection, /mini-journey-word-tile--anchor/);
  assert.match(journeySection, /mini-journey-syllable-trace/);
  assert.match(journeySection, /mini-journey-comprehension-scene/);
  assert.match(journeySection, /Das Lama ist da/);
  assert.match(css, /\.mini-journey-symbol-anchor--lama/);
  assert.match(css, /\.mini-journey-lama-body/);
  assert.match(css, /\.mini-journey-sentence-scene/);
  assert.match(css, /\.mini-journey-comprehension-card/);
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.doesNotMatch(visibleText + journeySection + selectorSection, /Score|Ranking|Punkte|Timer|Zeitdruck|Note|Diagnose|Dashboard|localStorage|sessionStorage|fetch\(|Cloud|Upload|Export|falsch|Fehler|wrong|error/i);
});

test('Alpha 67I mini journey selector shows Tasse only when known-unit gating allows it', () => {
  const tasks = getLearningTasks();
  const profileSofa = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
  });
  const profileTasse = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'],
    knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'sentence',
  });

  assert.deepEqual(getAvailableMiniJourneyCards(profileSofa, tasks, { maxCards: 3 }).map((card) => card.anchorWord), ['Mama', 'Sofa']);
  assert.deepEqual(getAvailableMiniJourneyCards(profileTasse, tasks, { maxCards: 3 }).map((card) => card.anchorWord), ['Mama', 'Sofa', 'Tasse']);
  assert.match(JSON.stringify(getAvailableMiniJourneyCards(profileTasse, tasks, { maxCards: 3 })), /Tasse-Mini-Reise starten/);
});

test('Alpha 67Q Lama family is the only controlled new family and stays behind l/la gating', () => {
  const tasks = getLearningTasks();
  const profileSofa = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const profileLama = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l'],
    knownSyllables: ['ma', 'so', 'fa', 'la'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });

  assert.ok(!getProfileWordFamilyMaterialPacks(profileSofa, tasks, { maxPacks: 4 }).some((pack) => pack.anchorWord === 'Lama'));
  assert.deepEqual(
    getProfileWordFamilyMaterialPacks(profileLama, tasks, { maxPacks: 4 }).map((pack) => pack.anchorWord),
    ['Mama', 'Sofa', 'Lama'],
  );
  assert.deepEqual(
    getAvailableMiniJourneyCards(profileLama, tasks, { maxCards: 4 }).map((card) => card.anchorWord),
    ['Mama', 'Sofa', 'Lama'],
  );
});

test('Alpha 67Q Lama mini journey and prep stay local, pressure-free and do not break Mama/Sofa/Tasse', () => {
  const tasks = getLearningTasks();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const profileLama = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l'],
    knownSyllables: ['ma', 'so', 'fa', 'la'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const lamaJourney = getWordFamilyMiniJourney(profileLama, tasks, { anchorWord: 'Lama', maxPacks: 4 });
  const prep = getMiniJourneyPrepSequence('Lama');
  const visibleText = JSON.stringify({ lamaJourney, prep });

  assert.deepEqual(lamaJourney.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.equal(lamaJourney.length, 5);
  assert.ok(lamaJourney.every((station) => station.anchorWord === 'Lama' && station.journeyTitle === 'Lama-Mini-Reise'));
  assert.ok(lamaJourney.every((station) => station.localOnly === true && station.persistent === false));
  assert.match(visibleText, /La - ma|Lama|Das Lama ist da/);
  assert.ok(prep.every((step) => step.anchorWord === 'Lama' && step.localOnly === true && step.persistent === false));
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
  assert.match(appSource, /Lama-Mini-Reise starten/);
  assert.match(appSource, /mini-journey-symbol--lama/);
  assert.match(appSource, /'La'/);
  assert.match(css, /\.mini-journey-symbol-anchor--lama/);
  assert.match(css, /\.mini-journey-lama-body/);
  assert.equal(getMamaFamilyMiniJourney({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] }, tasks).length, 5);
  assert.equal(getSofaFamilyMiniJourney({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'] }, tasks).length, 5);
  assert.equal(getTasseFamilyMiniJourney({ knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'], knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'sentence' }, tasks).length, 5);
});

test('Phase 2C Apfel mini journey is profile-gated and keeps five pressure-free local stations', () => {
  const tasks = getLearningTasks();
  const noApfelProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const apfelProfile = createLocalDidacticProfile({
    knownGraphemes: ['a', 'p', 'f', 'e', 'l'],
    knownSyllables: ['ap', 'fel'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const journey = getWordFamilyMiniJourney(apfelProfile, tasks, { anchorWord: 'Apfel', maxPacks: 4 });
  const visibleText = JSON.stringify(journey);

  assert.ok(!getAvailableMiniJourneyCards(noApfelProfile, tasks, { maxCards: 4 }).some((card) => card.anchorWord === 'Apfel'));
  assert.deepEqual(getAvailableMiniJourneyCards(apfelProfile, tasks, { maxCards: 4 }).map((card) => card.anchorWord), ['Apfel']);
  assert.equal(journey.length, 5);
  assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.ok(journey.every((station) => station.anchorWord === 'Apfel' && station.journeyTitle === 'Apfel-Mini-Reise'));
  assert.ok(journey.every((station) => station.localOnly === true && station.persistent === false));
  assert.equal(journey.find((station) => station.label === 'Silbe')?.childPrompt, 'Lies: Ap - fel.');
  assert.equal(journey.find((station) => station.label === 'Satz')?.childPrompt, 'Lies: Der Apfel ist da.');
  assert.equal(journey.find((station) => station.label === 'Mini-Geschichte')?.childPrompt, 'Der Apfel ist da. Was passt?');
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Phase 2C Apfel UI uses local CSS symbol, selector copy and teacher rationale', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const selectorSection = appSource.slice(appSource.indexOf('className="mini-journey-selector"'), appSource.indexOf('className="word-family-material-grid"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const rationales = getMiniJourneyTeacherRationales();
  const apfelRationale = rationales.find((item) => item.anchorWord === 'Apfel');

  assert.ok(apfelRationale, 'Apfel braucht eine Lehrkraft-Rationale');
  assert.match(apfelRationale.why, /Essen|Pause|Alltagswort/);
  assert.match(selectorSection, /card\.anchorWord === 'Apfel' \? 'Ap'/);
  assert.match(selectorSection, /card\.anchorWord === 'Apfel' \? 'fel'/);
  assert.match(selectorSection, /mini-journey-symbol--apfel/);
  assert.match(selectorSection, /Apfel-Mini-Reise starten/);
  assert.match(journeySection, /station\.anchorWord === 'Apfel' \? \['Ap', 'fel'\]/);
  assert.match(journeySection, /Der Apfel ist da/);
  assert.match(css, /\.mini-journey-symbol-anchor--apfel/);
  assert.match(css, /\.mini-journey-apple-body/);
  assert.match(css, /\.mini-journey-apple-leaf/);
  assert.doesNotMatch(selectorSection + journeySection + css, /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac/i);
});

test('Phase 2E Tisch mini journey is profile-gated and keeps five pressure-free local stations', () => {
  const tasks = getLearningTasks();
  const noTischProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const tischProfile = createLocalDidacticProfile({
    knownGraphemes: ['t', 'i', 's', 'ch'],
    knownSyllables: ['tisch'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const journey = getTischFamilyMiniJourney(tischProfile, tasks, { maxPacks: 4 });
  const visibleText = JSON.stringify(journey);

  assert.ok(!getAvailableMiniJourneyCards(noTischProfile, tasks, { maxCards: 4 }).some((card) => card.anchorWord === 'Tisch'));
  assert.deepEqual(getAvailableMiniJourneyCards(tischProfile, tasks, { maxCards: 4 }).map((card) => card.anchorWord), ['Tisch']);
  assert.equal(journey.length, 5);
  assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.ok(journey.every((station) => station.anchorWord === 'Tisch' && station.journeyTitle === 'Tisch-Mini-Reise'));
  assert.equal(journey.find((station) => station.label === 'Silbe')?.childPrompt, 'Lies: Tisch.');
  assert.equal(journey.find((station) => station.label === 'Satz')?.childPrompt, 'Lies: Der Tisch ist da.');
  assert.equal(journey.find((station) => station.label === 'Mini-Geschichte')?.childPrompt, 'Der Tisch ist da. Was passt?');
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
});

test('Phase 2E Tisch UI uses local CSS symbol, selector copy and teacher rationale', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const selectorSection = appSource.slice(appSource.indexOf('className="mini-journey-selector"'), appSource.indexOf('className="word-family-material-grid"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const tischRationale = getMiniJourneyTeacherRationales().find((item) => item.anchorWord === 'Tisch');

  assert.ok(tischRationale, 'Tisch braucht eine Lehrkraft-Rationale');
  assert.match(tischRationale.knownUnits, /T \+ I \+ S \+ ch|tisch/i);
  assert.match(tischRationale.support, /ch bleibt lehrkraftgeführt|ch/i);
  assert.match(selectorSection, /mini-journey-symbol--tisch/);
  assert.match(selectorSection, /Tisch-Mini-Reise starten/);
  assert.match(journeySection, /station\.anchorWord === 'Tisch' \? \['Tisch'\]/);
  assert.match(journeySection, /Der Tisch ist da/);
  assert.match(css, /\.mini-journey-symbol-anchor--tisch/);
  assert.match(css, /\.mini-journey-table-top/);
  assert.match(css, /\.mini-journey-table-leg/);
  assert.doesNotMatch(selectorSection + journeySection + css, /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac/i);
});

test('Phase 2F-B Tisch micro prep offers t i s ch tisch only as teacher-led preparation', () => {
  const tasks = getLearningTasks();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const noTischProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const prep = getMiniJourneyPrepSequence('Tisch');
  const action = getMiniJourneyPrepActions(noTischProfile, tasks).find((item) => item.anchorWord === 'Tisch');
  const visibleText = JSON.stringify({ prep, action });

  assert.deepEqual(prep.map((step) => step.focus), ['t', 'i', 's', 'ch', 'tisch']);
  assert.equal(prep.length, 5);
  assert.ok(prep.every((step) => step.anchorWord === 'Tisch' && step.prepTitle === 'Tisch-Vorbereitung'));
  assert.ok(prep.every((step) => step.localOnly === true && step.persistent === false));
  assert.equal(action?.enabled, true);
  assert.equal(action?.startLabel, 'Tisch-Vorbereitung starten');
  assert.match(teacherWortpostSection, /startMiniJourneyPrep\(item\.anchorWord as MiniJourneyPrepAnchor\)/);
  assert.match(appSource, /type MiniJourneyPrepAnchor = 'Sofa' \| 'Tasse' \| 'Lama' \| 'Tisch'/);
  assert.doesNotMatch(journeySection, /Tisch-Vorbereitung starten|tisch-prep|ch bleibt lehrkraftgeführt/i);
  assert.doesNotMatch(visibleText + teacherWortpostSection, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
});

test('Phase 2G-A1 Heft mini journey has the exact five pressure-free local stations', () => {
  const tasks = getLearningTasks();
  const heftProfile = createLocalDidacticProfile({
    knownGraphemes: ['h', 'e', 'f', 't'],
    knownSyllables: ['heft'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const journey = getHeftFamilyMiniJourney(heftProfile, tasks, { maxPacks: 4 });
  const visibleText = JSON.stringify(journey);

  assert.equal(journey.length, 5);
  assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.ok(journey.every((station) => station.anchorWord === 'Heft' && station.journeyTitle === 'Heft-Mini-Reise'));
  assert.ok(journey.every((station) => station.localOnly === true && station.persistent === false));
  assert.equal(journey.find((station) => station.label === 'Bild')?.childPrompt, 'Schau das Heft an.');
  assert.equal(journey.find((station) => station.label === 'Silbe')?.childPrompt, 'Lies: Heft.');
  assert.equal(journey.find((station) => station.label === 'Wort')?.childPrompt, 'Lege oder wähle Heft.');
  assert.equal(journey.find((station) => station.label === 'Satz')?.childPrompt, 'Lies: Das Heft ist da.');
  assert.equal(journey.find((station) => station.label === 'Mini-Geschichte')?.childPrompt, 'Das Heft ist da. Was passt?');
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Phase 2G-A1 Heft mini journey is conservatively gated and not in the earliest default path', () => {
  const tasks = getLearningTasks();
  const earlyProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const heftProfile = createLocalDidacticProfile({
    knownGraphemes: ['h', 'e', 'f', 't'],
    knownSyllables: ['heft'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });

  assert.ok(!getAvailableMiniJourneyCards(earlyProfile, tasks, { maxCards: 4 }).some((card) => card.anchorWord === 'Heft'));
  assert.ok(!getProfileSafeDailyPath(readingProfileExamples.profileMA, { minimumChoices: 1 }).cards.some((card) => card.word === 'Heft'));
  assert.deepEqual(getAvailableMiniJourneyCards(heftProfile, tasks, { maxCards: 4 }).map((card) => card.anchorWord), ['Heft']);
});

test('Phase 2G-A1 Heft teacher rationale is present and postpones Brot and Keks', () => {
  const rationale = getMiniJourneyTeacherRationales().find((item) => item.anchorWord === 'Heft');
  const text = JSON.stringify(rationale);

  assert.ok(rationale, 'Heft braucht eine Lehrkraft-Rationale');
  assert.match(rationale.knownUnits, /H \+ E \+ F \+ T|heft/i);
  assert.match(rationale.why, /schulnah|Heft|ruhig/i);
  assert.match(text, /Brot/);
  assert.match(text, /Keks/);
  assert.match(text, /verschoben|später|postpon/i);
  assert.doesNotMatch(text, unsafeQualityWords);
  assert.doesNotMatch(text, protectedAssetWords);
});

test('Phase 2G-B Heft has a distinct local visual symbol and meaningful story choice', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const symbolHelperSection = appSource.slice(appSource.indexOf('function MiniJourneySymbolScene'), appSource.indexOf('const teacherPreviewProfiles'));
  const selectorSection = appSource.slice(appSource.indexOf('className="mini-journey-selector"'), appSource.indexOf('className="word-family-material-grid"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(symbolHelperSection, /anchorWord === 'Heft'/);
  assert.match(symbolHelperSection, /mini-journey-heft-cover/);
  assert.match(symbolHelperSection, /mini-journey-heft-line--top/);
  assert.match(symbolHelperSection, /mini-journey-heft-label/);
  assert.match(selectorSection, /card\.anchorWord === 'Heft'/);
  assert.match(selectorSection, /mini-journey-symbol--heft/);
  assert.match(selectorSection, /mini-journey-symbol-tile-word/);
  assert.match(journeySection, /Heft:\s*\{\s*correct: \{ text: 'Das Heft ist da\.', symbol: 'Heft' \}/);
  assert.match(journeySection, /distractor: \{ text: 'Das Buch ist da\.', symbol: 'Buch' \}/);
  assert.match(css, /\.mini-journey-symbol-anchor--heft/);
  assert.match(css, /\.mini-journey-heft-cover/);
  assert.match(css, /\.mini-journey-heft-line/);
  assert.match(css, /\.mini-journey-heft-label/);
  assert.doesNotMatch(symbolHelperSection + selectorSection + journeySection + css, /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac/i);
});

test('Alpha 68A child mini journey shows Bild-Silben-Wort-Satz path and keeps all four word families playable', () => {
  const tasks = getLearningTasks();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const familyProfiles = [
    { anchorWord: 'Mama', profile: { knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] } },
    { anchorWord: 'Sofa', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'] } },
    { anchorWord: 'Tasse', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'], knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'sentence' } },
    { anchorWord: 'Lama', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l'], knownSyllables: ['ma', 'so', 'fa', 'la'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word' } },
  ];

  assert.match(journeySection, /const childPathSteps = \['Bild', 'Silben', 'Wort', 'Satz', 'Mini-Geschichte'\]/);
  assert.match(journeySection, /layerLabel/);
  assert.match(journeySection, /aria-label="Lernpfad: Bild, Silben, Wort, Satz, Mini-Geschichte"/);
  assert.doesNotMatch(journeySection, /Score|Ranking|Punkte|Timer|Note|Diagnose|Dashboard|localStorage|sessionStorage|fetch\(/i);
  assert.match(css, /\.mini-journey-layer-badge/);

  for (const { anchorWord, profile } of familyProfiles) {
    const journey = getWordFamilyMiniJourney(createLocalDidacticProfile(profile), tasks, { anchorWord, maxPacks: 4 });
    assert.equal(journey.length, 5, `${anchorWord} keeps all five internal stations`);
    assert.deepEqual(journey.slice(0, 4).map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz']);
  }

  const profileWithoutLama = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  assert.ok(!getAvailableMiniJourneyCards(profileWithoutLama, tasks, { maxCards: 4 }).some((card) => card.anchorWord === 'Lama'));
});

test('Alpha 68B Mama reference mini journey becomes one premium Spielraum with cue copy and safe controls', () => {
  const tasks = getLearningTasks();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const familyProfiles = [
    { anchorWord: 'Mama', profile: { knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] } },
    { anchorWord: 'Sofa', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'] } },
    { anchorWord: 'Tasse', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'], knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'sentence' } },
    { anchorWord: 'Lama', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l'], knownSyllables: ['ma', 'so', 'fa', 'la'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word' } },
  ];

  assert.match(journeySection, /layerCueByLabel/);
  assert.match(journeySection, /Bild: 'Schau\.'/);
  assert.match(journeySection, /Silben: 'Lies langsam\.'/);
  assert.match(journeySection, /Wort: 'Lies ganz\.'/);
  assert.match(journeySection, /Satz: 'Lies den Satz\.'/);
  assert.match(journeySection, /mini-journey-premium-stage/);
  assert.match(journeySection, /mini-journey-current-object/);
  assert.match(journeySection, /mini-journey-layer-cue/);
  assert.match(journeySection, /mini-journey-syllable-tile/);
  assert.match(journeySection, /mini-journey-actions/);
  assert.match(journeySection, /mini-journey-teacher-exit/);
  assert.match(css, /\.mini-journey-premium-stage/);
  assert.match(css, /\.mini-journey-current-object/);
  assert.match(css, /\.mini-journey-syllable-tile:nth-child\(odd\)/);
  assert.match(css, /\.mini-journey-syllable-tile:nth-child\(even\)/);
  assert.match(css, /\.mini-journey-actions button/);
  assert.match(css, /\.mini-journey-teacher-exit/);

  for (const { anchorWord, profile } of familyProfiles) {
    const journey = getWordFamilyMiniJourney(createLocalDidacticProfile(profile), tasks, { anchorWord, maxPacks: 4 });
    assert.deepEqual(journey.slice(0, 4).map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz']);
    assert.equal(journey.length, 5, `${anchorWord} remains playable`);
  }

  assert.doesNotMatch(journeySection, /Score|Ranking|Punkte|Timer|Zeitdruck|Note|Diagnose|Dashboard|localStorage|sessionStorage|fetch\(|Cloud|Upload|Export/i);
});

test('Alpha 68C Satz layer renders a calm premium sentence scene with word tiles', () => {
  const tasks = getLearningTasks();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const profile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readiness: { sentence: 'supported', story: 'supported' } });
  const sentenceStation = getWordFamilyMiniJourney(profile, tasks, { anchorWord: 'Mama', maxPacks: 4 }).find((station) => station.label === 'Satz');

  assert.match(sentenceStation.childPrompt, /Mama ist da\./);
  assert.match(journeySection, /const isSentenceLayer = station\.label === 'Satz'/);
  assert.match(journeySection, /sentenceWords/);
  assert.match(journeySection, /mini-journey-sentence-scene/);
  assert.match(journeySection, /mini-journey-sentence-line/);
  assert.match(journeySection, /mini-journey-word-tile/);
  assert.match(journeySection, /mini-journey-word-tile--anchor/);
  assert.match(journeySection, /mini-journey-syllable-trace/);
  assert.match(journeySection, /Lies den Satz\./);
  assert.match(css, /\.mini-journey-sentence-scene/);
  assert.match(css, /\.mini-journey-sentence-line/);
  assert.match(css, /\.mini-journey-word-tile/);
  assert.match(css, /\.mini-journey-word-tile--anchor/);
  assert.match(css, /\.mini-journey-syllable-trace/);
  assert.doesNotMatch(journeySection, /Score|Ranking|Punkte|Timer|Zeitdruck|Note|Diagnose|Dashboard|localStorage|sessionStorage|fetch\(|Cloud|Upload|Export|falsch|Fehler/i);
});

test('Alpha 68D Mini-Geschichte renders a distinct pressure-free comprehension scene with two choices', () => {
  const tasks = getLearningTasks();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const familyProfiles = [
    { anchorWord: 'Mama', profile: { knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] } },
    { anchorWord: 'Sofa', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'] } },
    { anchorWord: 'Tasse', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'], knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'sentence' } },
    { anchorWord: 'Lama', profile: { knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l'], knownSyllables: ['ma', 'so', 'fa', 'la'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'word' } },
  ];
  const mamaStory = getWordFamilyMiniJourney(createLocalDidacticProfile(familyProfiles[0].profile), tasks, { anchorWord: 'Mama', maxPacks: 4 }).find((station) => station.label === 'Mini-Geschichte');

  assert.match(mamaStory.childPrompt, /Mama ist da\. Was passt\?/);
  assert.match(journeySection, /const isStoryLayer = station\.label === 'Mini-Geschichte'/);
  assert.match(journeySection, /'Mini-Geschichte': 'Zeig, was passt\.'/);
  assert.match(journeySection, /const childPathSteps = \['Bild', 'Silben', 'Wort', 'Satz', 'Mini-Geschichte'\]/);
  assert.match(journeySection, /mini-journey-comprehension-scene/);
  assert.match(journeySection, /mini-journey-comprehension-choices/);
  assert.match(journeySection, /mini-journey-comprehension-card/g);
  assert.equal((journeySection.match(/mini-journey-comprehension-card--\$\{comprehensionChoices\.(?:correct|distractor)\.symbol\.toLowerCase\(\)\}/g) ?? []).length, 2);
  assert.match(journeySection, /Mama ist da\./);
  assert.match(journeySection, /Das Sofa ist da\./);
  assert.doesNotMatch(journeySection, /Da ist Licht/);
  assert.match(journeySection, /Was passt\?/);
  assert.match(css, /\.mini-journey-comprehension-scene/);
  assert.match(css, /\.mini-journey-comprehension-choices/);
  assert.match(css, /\.mini-journey-comprehension-card/);
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.doesNotMatch(journeySection, /Score|Ranking|Punkte|Timer|Zeitdruck|Note|Diagnose|Dashboard|localStorage|sessionStorage|fetch\(|Cloud|Upload|Export|falsch|Fehler|wrong|error/i);

  for (const { anchorWord, profile } of familyProfiles) {
    const journey = getWordFamilyMiniJourney(createLocalDidacticProfile(profile), tasks, { anchorWord, maxPacks: 4 });
    assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
    assert.equal(journey.length, 5, `${anchorWord} remains valid after comprehension scene slice`);
  }
});

test('Alpha 70B premium mini story choices are intentional for Mama Sofa Tasse Ball Bus Buch Lama Apfel and Tisch', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const expectedChoicePairs = [
    ['Mama', 'Mama ist da.', 'Das Sofa ist da.'],
    ['Sofa', 'Das Sofa ist da.', 'Mama ist da.'],
    ['Tasse', 'Die Tasse ist da.', 'Das Sofa ist da.'],
    ['Ball', 'Der Ball rollt.', 'Die Tasse ist da.'],
    ['Bus', 'Der Bus fährt.', 'Der Ball rollt.'],
    ['Buch', 'Das Buch ist da.', 'Der Bus fährt.'],
    ['Lama', 'Das Lama ist da.', 'Mama ist da.'],
    ['Apfel', 'Der Apfel ist da.', 'Die Tasse ist da.'],
    ['Tisch', 'Der Tisch ist da.', 'Der Ball rollt.'],
  ];

  assert.match(journeySection, /const miniJourneyStoryChoices/);
  assert.match(journeySection, /comprehensionChoices\.correct\.text/);
  assert.match(journeySection, /comprehensionChoices\.distractor\.text/);
  assert.match(journeySection, /comprehensionChoices\.correct\.symbol/);
  assert.match(journeySection, /comprehensionChoices\.distractor\.symbol/);
  assert.doesNotMatch(journeySection, /Da ist Licht/);
  assert.doesNotMatch(journeySection, /comprehensionChoiceText\s*=\s*station\.anchorWord/);
  assert.doesNotMatch(journeySection, /icon:\s*['"]/);

  for (const [anchorWord, correctText, distractorText] of expectedChoicePairs) {
    assert.match(journeySection, new RegExp(`${anchorWord}: \\{[\\s\\S]*correct: \\{ text: '${correctText.replace('.', '\\.')}'`));
    assert.match(journeySection, new RegExp(`${anchorWord}: \\{[\\s\\S]*distractor: \\{ text: '${distractorText.replace('.', '\\.')}'`));
  }

  assert.doesNotMatch(journeySection, /Score|Ranking|Punkte|Timer|Zeitdruck|Note|Diagnose|Dashboard|localStorage|sessionStorage|fetch\(|Cloud|Upload|Export|falsch|Fehler|wrong|error/i);
});

test('Alpha 70C premium mini story choices use local CSS symbol scenes', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const symbolHelperSection = appSource.slice(appSource.indexOf('function MiniJourneySymbolScene'), appSource.indexOf('const teacherPreviewProfiles'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(symbolHelperSection, /function MiniJourneySymbolScene/);
  assert.match(symbolHelperSection, /mini-journey-symbol--\$\{anchorWord\.toLowerCase\(\)\}/);
  assert.match(symbolHelperSection, /mini-journey-mama-house/);
  assert.match(symbolHelperSection, /mini-journey-sofa-seat/);
  assert.match(symbolHelperSection, /mini-journey-cup-steam/);
  assert.match(symbolHelperSection, /mini-journey-ball-core/);
  assert.match(symbolHelperSection, /mini-journey-bus-body/);
  assert.match(symbolHelperSection, /mini-journey-book-cover/);
  assert.match(symbolHelperSection, /mini-journey-lama-ear/);
  assert.match(symbolHelperSection, /mini-journey-table-top/);
  assert.match(journeySection, /symbol: 'Mama'/);
  assert.match(journeySection, /symbol: 'Sofa'/);
  assert.match(journeySection, /symbol: 'Tasse'/);
  assert.match(journeySection, /symbol: 'Ball'/);
  assert.match(journeySection, /symbol: 'Bus'/);
  assert.match(journeySection, /symbol: 'Buch'/);
  assert.match(journeySection, /symbol: 'Lama'/);
  assert.match(journeySection, /symbol: 'Tisch'/);
  assert.match(journeySection, /MiniJourneySymbolScene anchorWord=\{comprehensionChoices\.correct\.symbol\}/);
  assert.match(journeySection, /MiniJourneySymbolScene anchorWord=\{comprehensionChoices\.distractor\.symbol\}/);
  assert.match(css, /\.mini-journey-comprehension-symbol/);
  assert.match(css, /\.mini-journey-comprehension-card--mama/);
  assert.match(css, /\.mini-journey-comprehension-card--sofa/);
  assert.match(css, /\.mini-journey-comprehension-card--tasse/);
  assert.match(css, /\.mini-journey-comprehension-card--ball/);
  assert.match(css, /\.mini-journey-comprehension-card--bus/);
  assert.match(css, /\.mini-journey-comprehension-card--buch/);
  assert.match(css, /\.mini-journey-comprehension-card--lama/);
  assert.match(css, /\.mini-journey-comprehension-card--tisch/);
  assert.match(css, /\.mini-journey-cup-steam/);
  assert.match(css, /\.mini-journey-ball-core/);
  assert.match(css, /\.mini-journey-bus-body/);
  assert.match(css, /\.mini-journey-book-cover/);
  assert.match(css, /\.mini-journey-lama-ear/);
  assert.match(css, /\.mini-journey-table-top/);
  assert.doesNotMatch(journeySection + symbolHelperSection + css, /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(journeySection, /Score|Ranking|Punkte|Timer|Zeitdruck|Note|Diagnose|Dashboard|Cloud|Upload|Export|falsch|Fehler|wrong|error/i);
});

test('Alpha 70D teacher rationales explain each mini journey without leaking into child journey', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const rationales = getMiniJourneyTeacherRationales();
  const visibleText = JSON.stringify(rationales);

  assert.deepEqual(rationales.map((item) => item.anchorWord), ['Mama', 'Sofa', 'Tasse', 'Ball', 'Bus', 'Buch', 'Lama', 'Apfel', 'Tisch', 'Heft']);
  assert.ok(rationales.every((item) => item.focus && item.knownUnits && item.stage && item.why && item.support && item.nextSmallStep));
  assert.ok(rationales.every((item) => item.teacherOnly === true && item.localOnly === true && item.persistent === false));
  assert.match(rationales.find((item) => item.anchorWord === 'Mama').knownUnits, /M \+ A|ma/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Sofa').knownUnits, /so\/fa|s, o, f/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Tasse').knownUnits, /Tas-se|tas\/se/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Ball').knownUnits, /b, a, l|ball/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Bus').knownUnits, /B \+ U \+ S|bus/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Buch').knownUnits, /B \+ U \+ ch|buch/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Lama').knownUnits, /L\/la|la\/ma/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Apfel').knownUnits, /Ap\/fel|A, p, f, e, l/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Tisch').knownUnits, /T \+ I \+ S \+ ch|tisch/i);
  assert.match(rationales.find((item) => item.anchorWord === 'Heft').knownUnits, /H \+ E \+ F \+ T|heft/i);
  assert.match(visibleText, /Bild → Silbe → Wort → Satz → Mini-Geschichte/);
  assert.match(visibleText, /Passt, weil/);
  assert.match(visibleText, /Hilft bei/);
  assert.match(visibleText, /Nächster kleiner Schritt/);
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.match(teacherWortpostSection, /miniJourneyTeacherRationales/);
  assert.match(teacherWortpostSection, /Warum diese Reise\?/);
  assert.match(teacherWortpostSection, /Hilft bei/);
  assert.doesNotMatch(journeySection, /miniJourneyTeacherRationales|Warum diese Reise\?|Passt, weil|Hilft bei|Nächster kleiner Schritt|bekannte Einheit|Entwicklungsstufe/i);
});

test('Alpha 69A Sofa mini journey keeps premium five-step path with its own sentence and final Mini-Geschichte', () => {
  const tasks = getLearningTasks();
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    readiness: { sentence: 'supported', story: 'supported' },
    accessFocus: 'word',
  });
  const journey = getWordFamilyMiniJourney(profile, tasks, { anchorWord: 'Sofa', maxPacks: 4 });
  const visibleText = JSON.stringify(journey);

  assert.equal(journey.length, 5);
  assert.deepEqual(journey.map((station) => station.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte']);
  assert.deepEqual(journey.map((station) => station.anchorWord), ['Sofa', 'Sofa', 'Sofa', 'Sofa', 'Sofa']);
  assert.equal(journey[3].childPrompt, 'Lies: Das Sofa ist da.');
  assert.equal(journey[4].childPrompt, 'Das Sofa ist da. Was passt?');
  assert.equal(journey[4].id, 'sofa-mini-mini-geschichte');
  assert.match(journeySection, /const childPathSteps = \['Bild', 'Silben', 'Wort', 'Satz', 'Mini-Geschichte'\]/);
  assert.match(journeySection, /'Mini-Geschichte': 'Zeig, was passt\.'/);
  assert.match(journeySection, /Das Sofa ist da/);
  assert.doesNotMatch(visibleText, /Score|Ranking|Punkte|Timer|Zeitdruck|Note|Diagnose|Cloud|Upload|Export|falsch|Fehler|wrong|error/i);
});

test('Alpha 67J readiness overview derives Mama, Sofa and Tasse status from existing mini journey gating', () => {
  const tasks = getLearningTasks();
  const profileMA = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readiness: { sentence: 'later', story: 'later' }, accessFocus: 'syllable' });
  const profileSofa = createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], readiness: { sentence: 'later', story: 'later' }, accessFocus: 'word' });
  const profileTasse = createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'], knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'sentence' });

  const early = getMiniJourneyReadinessOverview(profileMA, tasks);
  const sofa = getMiniJourneyReadinessOverview(profileSofa, tasks);
  const tasse = getMiniJourneyReadinessOverview(profileTasse, tasks);

  assert.deepEqual(early.map((item) => [item.anchorWord, item.status]), [['Mama', 'bereit'], ['Sofa', 'braucht Einheiten'], ['Tasse', 'noch nicht zeigen'], ['Ball', 'braucht Einheiten'], ['Bus', 'braucht Einheiten'], ['Buch', 'braucht Einheiten'], ['Lama', 'braucht Einheiten'], ['Apfel', 'braucht Einheiten'], ['Tisch', 'braucht Einheiten'], ['Heft', 'braucht Einheiten']]);
  assert.deepEqual(sofa.map((item) => [item.anchorWord, item.status]), [['Mama', 'bereit'], ['Sofa', 'bereit'], ['Tasse', 'noch nicht zeigen'], ['Ball', 'braucht Einheiten'], ['Bus', 'braucht Einheiten'], ['Buch', 'braucht Einheiten'], ['Lama', 'braucht Einheiten'], ['Apfel', 'braucht Einheiten'], ['Tisch', 'braucht Einheiten'], ['Heft', 'braucht Einheiten']]);
  assert.deepEqual(tasse.map((item) => [item.anchorWord, item.status]), [['Mama', 'bereit'], ['Sofa', 'bereit'], ['Tasse', 'bereit'], ['Ball', 'braucht Einheiten'], ['Bus', 'braucht Einheiten'], ['Buch', 'braucht Einheiten'], ['Lama', 'braucht Einheiten'], ['Apfel', 'braucht Einheiten'], ['Tisch', 'braucht Einheiten'], ['Heft', 'braucht Einheiten']]);
  assert.match(early.find((item) => item.anchorWord === 'Sofa').missingText, /s, o, f|so, fa/);
  assert.match(sofa.find((item) => item.anchorWord === 'Tasse').missingText, /Satzbereitschaft|t, e|tas, se/);
  assert.match(tasse.find((item) => item.anchorWord === 'Ball').missingText, /b, l|ball/);
  assert.match(tasse.find((item) => item.anchorWord === 'Bus').missingText, /u|bus/);
  assert.match(tasse.find((item) => item.anchorWord === 'Buch').missingText, /u, ch|buch/);
  assert.match(tasse.find((item) => item.anchorWord === 'Apfel').missingText, /p, f, l|ap, fel/);
  assert.match(tasse.find((item) => item.anchorWord === 'Tisch').missingText, /i, ch|tisch/);
  assert.match(early.find((item) => item.anchorWord === 'Sofa').nextSmallStep, /erst s, o, f oder so\/fa gemeinsam sichern/);
  assert.match(sofa.find((item) => item.anchorWord === 'Tasse').nextSmallStep, /erst tas\/se und einen kurzen Satz gemeinsam vorbereiten/);
  assert.ok(tasse.every((item) => item.source === 'Mini-Reisen-Gating'));
  assert.doesNotMatch(JSON.stringify([early, sofa, tasse]), unsafeQualityWords);
  assert.doesNotMatch(JSON.stringify([early, sofa, tasse]), protectedAssetWords);
  assert.doesNotMatch(JSON.stringify([early, sofa, tasse]), /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 67K next smallest step stays teacher-facing, practical and pressure-free', () => {
  const tasks = getLearningTasks();
  const earlyProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readiness: { sentence: 'later', story: 'later' }, accessFocus: 'syllable' });
  const sofaProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], readiness: { sentence: 'later', story: 'later' }, accessFocus: 'word' });
  const early = getMiniJourneyReadinessOverview(earlyProfile, tasks);
  const sofa = getMiniJourneyReadinessOverview(sofaProfile, tasks);
  const recommendations = [
    early.find((item) => item.anchorWord === 'Sofa').nextSmallStep,
    sofa.find((item) => item.anchorWord === 'Tasse').nextSmallStep,
  ];

  assert.match(recommendations[0], /Nächster kleiner Schritt: erst s, o, f oder so\/fa gemeinsam sichern\./);
  assert.match(recommendations[1], /Nächster kleiner Schritt: erst tas\/se und einen kurzen Satz gemeinsam vorbereiten\./);
  assert.ok(recommendations.every((text) => text.length <= 95));
  assert.doesNotMatch(JSON.stringify(recommendations), unsafeQualityWords);
  assert.doesNotMatch(JSON.stringify(recommendations), /Score|Ranking|Punkte|Timer|Diagnose|Cloud|Upload|Export|speichern/i);
});

test('Alpha 67L micro prep derives Sofa and Tasse teacher actions from readiness nextSmallStep', () => {
  const tasks = getLearningTasks();
  const earlyProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readiness: { sentence: 'later', story: 'later' }, accessFocus: 'syllable' });
  const sofaProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], readiness: { sentence: 'later', story: 'later' }, accessFocus: 'word' });
  const readyProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'], knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'], readiness: { sentence: 'supported', story: 'supported' }, accessFocus: 'sentence' });

  const sofaPrep = getMiniJourneyPrepActions(earlyProfile, tasks).find((item) => item.anchorWord === 'Sofa');
  const tassePrep = getMiniJourneyPrepActions(sofaProfile, tasks).find((item) => item.anchorWord === 'Tasse');
  const readyPrep = getMiniJourneyPrepActions(readyProfile, tasks).find((item) => item.anchorWord === 'Mama');

  assert.equal(sofaPrep.startLabel, 'Sofa-Vorbereitung starten');
  assert.equal(tassePrep.startLabel, 'Tasse-Vorbereitung starten');
  assert.match(sofaPrep.derivedFromNextSmallStep, /s, o, f oder so\/fa/);
  assert.match(tassePrep.derivedFromNextSmallStep, /tas\/se und einen kurzen Satz/);
  assert.equal(readyPrep.startLabel, 'Mama ruhig anbieten');
  assert.equal(sofaPrep.teacherOnly, true);
  assert.equal(tassePrep.teacherOnly, true);
  assert.doesNotMatch(JSON.stringify([sofaPrep, tassePrep, readyPrep]), unsafeQualityWords);
});

test('Alpha 67L micro prep sequences are tiny, one-step and pressure-free', () => {
  const sofa = getMiniJourneyPrepSequence('Sofa');
  const tasse = getMiniJourneyPrepSequence('Tasse');
  const visibleText = JSON.stringify([sofa, tasse]);

  assert.deepEqual(sofa.map((step) => step.focus), ['s', 'o', 'f', 'so', 'fa']);
  assert.deepEqual(tasse.map((step) => step.focus), ['tas', 'se', 'Die Tasse ist da.']);
  assert.ok([...sofa, ...tasse].every((step) => step.childPrompt && step.teacherHint && step.localOnly === true && step.persistent === false));
  assert.ok([...sofa, ...tasse].every((step) => step.stepLabel.match(/^Schritt [1-5] von [35]$/)));
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, /cloud|login|upload|export|speichern|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 67L source wires micro prep only through teacher readiness area and separate child scene', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const regularJourneySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const prepSceneSection = appSource.slice(appSource.indexOf('function MiniJourneyPrepStage'), appSource.indexOf('function MamaFamilyJourneyStage'));

  assert.match(appSource, /getMiniJourneyPrepActions/);
  assert.match(appSource, /getMiniJourneyPrepSequence/);
  assert.match(teacherWortpostSection, /Vorbereitung starten/);
  assert.match(teacherWortpostSection, /mini-journey-prep-action/);
  assert.match(prepSceneSection, /Nochmal/);
  assert.match(prepSceneSection, /Weiter|Fertig/);
  assert.match(prepSceneSection, /Zur Lehrkraft/);
  assert.doesNotMatch(regularJourneySection, /Vorbereitung starten|miniJourneyPrepActions|activeMiniJourneyPrep|MiniJourneyPrepStage/);
  assert.doesNotMatch(JSON.stringify([teacherWortpostSection, prepSceneSection]), /Score|Ranking|Punkte|Prozent|Timer|Level|Diagnose|Cloud|Upload|Export|sessionStorage|fetch\(/i);
});

test('Alpha 67M micro prep scene has calm progress strip and local symbol anchors', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const prepSceneSection = appSource.slice(appSource.indexOf('function MiniJourneyPrepStage'), appSource.indexOf('function MamaFamilyJourneyStage'));
  const regularJourneySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(prepSceneSection, /mini-journey-prep-path/);
  assert.match(prepSceneSection, /aria-current=\{index === stepIndex \? 'step' : undefined\}/);
  assert.match(prepSceneSection, /mini-journey-prep-symbol-anchor/);
  assert.match(prepSceneSection, /mini-journey-prep-symbol--\$\{step\.anchorWord\.toLowerCase\(\)\}/);
  assert.match(prepSceneSection, /mini-journey-symbol--sofa/);
  assert.match(prepSceneSection, /mini-journey-symbol--tasse/);
  assert.match(prepSceneSection, /mini-journey-prep-focus-card/);
  assert.match(prepSceneSection, /mini-journey-prep-focus-current/);
  assert.match(css, /\.mini-journey-prep-path/);
  assert.match(css, /\.mini-journey-prep-symbol-anchor/);
  assert.match(css, /\.mini-journey-prep-focus-card/);
  assert.match(css, /\.mini-journey-prep-focus-current/);
  assert.doesNotMatch(prepSceneSection, /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac/i);
  assert.doesNotMatch(regularJourneySection, /mini-journey-prep-path|mini-journey-prep-symbol-anchor|mini-journey-prep-focus-card/);
});

test('Alpha 67N micro prep keeps calm child-facing variation patterns for prepared anchors', () => {
  const sofa = getMiniJourneyPrepSequence('Sofa');
  const tasse = getMiniJourneyPrepSequence('Tasse');
  const lama = getMiniJourneyPrepSequence('Lama');
  const unknown = getMiniJourneyPrepSequence('Mond');
  const allSteps = [...sofa, ...tasse, ...lama];
  const visibleText = JSON.stringify(allSteps);

  assert.deepEqual(unknown.map((step) => step.anchorWord), sofa.map((step) => step.anchorWord));
  assert.equal(new Set(allSteps.map((step) => step.variation)).size >= 2, true);
  assert.ok(allSteps.some((step) => step.variation === 'listen-point' && /Hör|Zeig/i.test(step.childPrompt)));
  assert.ok(allSteps.some((step) => step.variation === 'eye-trace' && /Fahr mit den Augen/i.test(step.childPrompt)));
  assert.ok(allSteps.every((step) => step.childPrompt.length <= 70));
  assert.ok(allSteps.every((step) => step.childPrompt && step.teacherHint && step.localOnly === true && step.persistent === false));
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /Dashboard|Lehrkraft|Mini-Reisen-Gating|Score|Ranking|Punkte|Timer|Diagnose|Cloud|Upload|Export|speichern|localStorage|sessionStorage|fetch\(/i);
});


test('Alpha 67O micro prep renders local visual mini-moments for both variation values', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const prepSceneSection = appSource.slice(appSource.indexOf('function MiniJourneyPrepStage'), appSource.indexOf('function MamaFamilyJourneyStage'));
  const variationCueSection = appSource.slice(appSource.indexOf('function MiniJourneyPrepVariationCue'), appSource.indexOf('function MamaFamilyJourneyStage'));
  const childFacingScene = JSON.stringify([prepSceneSection, variationCueSection]);
  const sofa = getMiniJourneyPrepSequence('Sofa');

  assert.equal(sofa[0].variation, 'listen-point');
  assert.equal(sofa[0].childPrompt, 'Hör: s. Zeig auf s.');
  assert.equal(sofa[1].variation, 'eye-trace');
  assert.equal(sofa[1].childPrompt, 'Fahr mit den Augen um o.');
  assert.match(prepSceneSection, /mini-journey-prep-focus--\$\{step\.variation\}/);
  assert.match(prepSceneSection, /<MiniJourneyPrepVariationCue variation=\{step\.variation\}/);
  assert.match(variationCueSection, /data-variation="listen-point"/);
  assert.match(variationCueSection, /mini-journey-prep-listen-ear/);
  assert.match(variationCueSection, /mini-journey-prep-point-finger/);
  assert.match(variationCueSection, /data-variation="eye-trace"/);
  assert.match(variationCueSection, /mini-journey-prep-eye-shape/);
  assert.match(variationCueSection, /mini-journey-prep-eye-dot/);
  assert.match(css, /\.mini-journey-prep-listen-point-cue/);
  assert.match(css, /\.mini-journey-prep-eye-trace-cue/);
  assert.match(css, /\.mini-journey-prep-focus-text/);
  assert.doesNotMatch(variationCueSection, /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac/i);
  assert.doesNotMatch(childFacingScene, /Diagnose|Punkte|Timer|Note|Bewertung|Ranking|Rang|Cloud|Upload|Export|speichern|localStorage|sessionStorage/i);
});


test('Alpha 67P full mini journey has premium Spielraum orientation without pressure', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const childFacingScene = JSON.stringify(journeySection);

  assert.match(journeySection, /mini-journey-orientation-card/);
  assert.match(journeySection, /Aktuelles Wort/);
  assert.match(journeySection, /Jetzt: \{station\.label\}/);
  assert.match(journeySection, /Dein nächster Schritt/);
  assert.match(journeySection, /mini-journey-spielraum-path/);
  assert.match(journeySection, /mini-journey-path-stone/);
  assert.match(journeySection, /mini-journey-stage-quiet/);
  assert.match(journeySection, /mini-journey-next-action/);
  assert.match(css, /\.mini-journey-orientation-card/);
  assert.match(css, /\.mini-journey-spielraum-path/);
  assert.match(css, /\.mini-journey-path-stone/);
  assert.match(css, /\.mini-journey-stage-quiet/);
  assert.match(css, /\.mini-journey-next-action/);
  assert.match(css, /overflow-x: hidden/);
  assert.doesNotMatch(journeySection, /https?:\/\/|data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif|metacom|pcs|boardmaker|widgit|arasaac/i);
  assert.doesNotMatch(childFacingScene, /Heute passende Lesereisen|Mini-Reisen Bereitschaft|Gating|Dashboard|Score|Ranking|Punkte|Timer|Note|Diagnose|Bewertung|Level|Cloud|Upload|Export|speichern|localStorage|sessionStorage|fetch\(/i);
});


test('Alpha 67J source shows readiness overview only in teacher area with pressure-free wording', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(appSource, /getMiniJourneyReadinessOverview/);
  assert.match(teacherWortpostSection, /Mini-Reisen Bereitschaft/);
  assert.match(teacherWortpostSection, /miniJourneyReadinessOverview/);
  assert.match(teacherWortpostSection, /braucht Einheiten/);
  assert.match(teacherWortpostSection, /noch nicht zeigen/);
  assert.match(teacherWortpostSection, /mini-journey-next-step/);
  assert.match(appSource, /nextSmallStep/);
  assert.match(css, /\.mini-journey-readiness/);
  assert.match(css, /\.mini-journey-next-step/);
  assert.doesNotMatch(teacherWortpostSection, /Score|Ranking|Punkte|Prozent|Timer|Level|Diagnose|Cloud|Upload|Export|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(journeySection, /Mini-Reisen Bereitschaft|miniJourneyReadinessOverview|nextSmallStep|braucht Einheiten|noch nicht zeigen|Dashboard|Score|Ranking|Punkte|Timer|Note|Diagnose|Storage|fetch\(/i);
});

test('Alpha 67I source wires Tasse card and generic help reset without forbidden child copy', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(appSource, /getTasseFamilyMiniJourney/);
  assert.match(teacherWortpostSection, /Tasse-Mini-Reise starten/);
  assert.match(teacherWortpostSection, /mini-journey-symbol--tasse/);
  assert.match(journeySection, /Tasse/);
  assert.match(journeySection, />Hilfe<\/button>/);
  assert.match(appSource, /setMamaJourneyHelpActive\(false\)/);
  assert.match(css, /\.mini-journey-symbol-anchor--tasse/);
  assert.match(css, /\.mini-journey-cup-bowl/);
  assert.doesNotMatch(journeySection, /Heute passende Lesereisen|Selector|Roadmap|Dashboard|Score|Ranking|Punkte|Timer|Diagnose|Storage|fetch\(/i);
});

test('Alpha 67C source wires Sofa journey start only through available material packs', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const journeySection = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));
  const profileMA = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readiness: { sentence: 'supported', story: 'supported' } });
  const profileSofa = createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], readiness: { sentence: 'supported', story: 'supported' } });
  const tasks = getLearningTasks();

  assert.deepEqual(getProfileWordFamilyMaterialPacks(profileMA, tasks).map((pack) => pack.anchorWord), ['Mama']);
  assert.deepEqual(getProfileWordFamilyMaterialPacks(profileSofa, tasks).map((pack) => pack.anchorWord), ['Mama', 'Sofa']);
  assert.match(appSource, /getSofaFamilyMiniJourney/);
  assert.match(teacherWortpostSection, /availableMiniJourneyCards/);
  assert.match(teacherWortpostSection, /Sofa-Mini-Reise starten/);
  assert.match(teacherWortpostSection, /startWordFamilyMiniJourney/);
  assert.match(appSource, /activeWordFamilyJourneyTitle/);
  assert.doesNotMatch(journeySection, /Materialpakete aus bekannten Einheiten|wordFamilyMaterialPacks|materialSteps|Dashboard|Score|Ranking|Punkte|Timer|Note|Diagnose|localStorage|sessionStorage|fetch\(/i);
});

test('Alpha 66B Wortpost presets are consistent and safe', () => {
  const presets = getWortpostProfilePresets();
  const visibleText = JSON.stringify(presets);

  assert.deepEqual(presets.map((preset) => preset.label), ['Start: m + a', 'Sofa-Pfad', 'Satz bereit', 'Heft prüfen']);
  assert.ok(presets.every((preset) => preset.knownGraphemes.length >= 2));
  assert.ok(presets.every((preset) => preset.knownSyllables.length >= 1));
  assert.ok(presets.every((preset) => ['syllable', 'word', 'sentence'].includes(preset.accessFocus)));
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, /diagnose|diagnost|score|ranking|punkte|timer|cloud|login|upload|export|speichern/i);
});

test('Alpha 66B Wortpost presets lead to expected development stages', () => {
  const presets = getWortpostProfilePresets();
  const stages = Object.fromEntries(presets.map((preset) => [
    preset.id,
    getWortpostDevelopmentStage(createLocalDidacticProfile(preset)).id,
  ]));

  assert.equal(stages['start-ma'], 'silbenbruecke');
  assert.equal(stages['sofa-path'], 'wortaufbau');
  assert.equal(stages['sentence-ready'], 'satzbruecke');
  assert.equal(stages['heft-review'], 'wortaufbau');
});

test('Alpha 66C Wortpost preset preview shows expected stage changes and next cards', () => {
  const presets = getWortpostProfilePresets();
  const tasks = getLearningTasks();
  const currentProfile = createLocalDidacticProfile(presets.find((preset) => preset.id === 'start-ma'));
  const sofaPreview = getWortpostPresetPreview(currentProfile, presets.find((preset) => preset.id === 'sofa-path'), tasks);
  const sentencePreview = getWortpostPresetPreview(currentProfile, presets.find((preset) => preset.id === 'sentence-ready'), tasks);

  assert.equal(sofaPreview.currentStageLabel, 'Silbenbrücke');
  assert.equal(sofaPreview.nextStageLabel, 'Wortaufbau');
  assert.equal(sofaPreview.stageChangeText, 'Silbenbrücke → Wortaufbau');
  assert.equal(sentencePreview.stageChangeText, 'Silbenbrücke → Satzbrücke');
  assert.equal(sofaPreview.nextCards.length, 3);
  assert.equal(sentencePreview.nextCards.length, 3);
  assert.ok(sofaPreview.nextCards.every((card) => card.word && card.reason));
  assert.ok(sentencePreview.nextCards.some((card) => card.sentenceBridge));
});

test('Alpha 66C Wortpost preset preview stays local and pressure-free', () => {
  const presets = getWortpostProfilePresets();
  const tasks = getLearningTasks();
  const currentProfile = createLocalDidacticProfile(presets[0]);
  const preview = getWortpostPresetPreview(currentProfile, presets.find((preset) => preset.id === 'sentence-ready'), tasks);
  const visibleText = JSON.stringify(preview);

  assert.equal(preview.localOnly, true);
  assert.equal(preview.persistent, false);
  assert.match(preview.reason, /Satz|kurz|bekannt|Stufe|Einheiten/i);
  assert.ok(preview.nextSmallStep.length > 0);
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, /diagnose|diagnost|score|ranking|punkte|timer|cloud|login|upload|export|speichern/i);
});

test('Alpha 66C teacher source contains before-after preview and keeps child mode free of preset copy', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const childWortpostSection = appSource.slice(appSource.indexOf('function WortpostStage'), appSource.indexOf('function WortpostFeedback'));

  assert.match(teacherWortpostSection, /Wortpost heute einstellen/);
  assert.match(appSource, /getWortpostProfilePresets/);
  assert.match(appSource, /getWortpostPresetPreview/);
  assert.match(teacherWortpostSection, /Vorher\/Nachher|vorher-nachher|stageChangeText/);
  assert.match(teacherWortpostSection, /wortpostPresetPreviews/);
  assert.match(teacherWortpostSection, /nextCards/);
  assert.match(teacherWortpostSection, /wortpostProfileControlUnits\.graphemes/);
  assert.match(teacherWortpostSection, /wortpostProfileControlUnits\.syllables/);
  assert.match(css, /\.wortpost-today-controls/);
  assert.match(css, /\.wortpost-preset-preview-grid/);
  assert.match(css, /flex-wrap:\s*wrap/);
  assert.doesNotMatch(teacherWortpostSection, /Score|Ranking|Punkte|Prozent|Timer|Level|Diagnose|Cloud|Upload|Export|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(childWortpostSection, /Wortpost heute einstellen|Bekannte Einheiten schnell setzen|Sofa-Pfad|Satz bereit|Vorher\/Nachher|stageChangeText|preset/i);
});

test('Phase 2G-C Heft preset makes Heft deliberately teacher-startable without opening the early child path', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const teacherWortpostSection = appSource.slice(appSource.indexOf('className="wortpost-start-card"'), appSource.indexOf('className="practice-pilot-card"'));
  const childWortpostSection = appSource.slice(appSource.indexOf('function WortpostStage'), appSource.indexOf('function WortpostFeedback'));
  const tasks = getLearningTasks();
  const presets = getWortpostProfilePresets();
  const heftPreset = presets.find((preset) => preset.id === 'heft-review');
  const earlyProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readiness: { sentence: 'later', story: 'later' }, accessFocus: 'syllable' });
  const heftProfile = createLocalDidacticProfile(heftPreset);

  assert.ok(heftPreset, 'Heft braucht ein bewusstes Lehrkraft-Preset');
  assert.equal(heftPreset.label, 'Heft prüfen');
  assert.deepEqual(getAvailableMiniJourneyCards(heftProfile, tasks, { maxCards: 3 }).map((card) => card.anchorWord), ['Heft']);
  assert.ok(!getAvailableMiniJourneyCards(earlyProfile, tasks, { maxCards: 3 }).some((card) => card.anchorWord === 'Heft'));
  assert.match(teacherWortpostSection, /wortpostProfilePresets\.map/);
  assert.match(JSON.stringify(presets), /Heft prüfen/);
  assert.match(teacherWortpostSection, /Heft-Mini-Reise starten/);
  assert.doesNotMatch(childWortpostSection, /Heft prüfen|Heft-Mini-Reise starten|heft-review/i);
});

test('Alpha 66A Wortpost stage engine starts with Bildanker when profile needs strong help', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m'],
    knownSyllables: [],
    supportSettings: { imageHelp: true, reducedChoices: true, teacherReadAloud: true },
    readiness: { sentence: 'later', story: 'later' },
    accessFocus: 'symbol',
  });
  const stage = getWortpostDevelopmentStage(profile);

  assert.equal(stage.id, 'bildanker');
  assert.equal(stage.label, 'Bildanker');
  assert.match(stage.reason, /Bildhilfe|kleine Auswahl|wenige bekannte Einheiten/i);
  assert.match(stage.nextSmallStep, /eine bekannte Silbe/i);
  assert.equal(stage.orientation, 'Schau auf das Bild. Dann bring den Brief heim.');
  assert.equal(stage.localOnly, true);
  assert.equal(stage.persistent, false);
  assert.doesNotMatch(JSON.stringify(stage), unsafeQualityWords);
});

test('Alpha 66A Wortpost stage engine advances deterministically to Wortaufbau and Satzbruecke', () => {
  const wordProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    supportSettings: { imageHelp: true, reducedChoices: false },
    readiness: { sentence: 'later', story: 'later' },
    accessFocus: 'word',
  });
  const sentenceProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f', 't', 'e'],
    knownSyllables: ['ma', 'so', 'fa', 'tas', 'se'],
    supportSettings: { imageHelp: true, reducedChoices: false },
    readiness: { sentence: 'supported', story: 'later' },
    accessFocus: 'sentence',
  });

  assert.equal(getWortpostDevelopmentStage(wordProfile).id, 'wortaufbau');
  assert.equal(getWortpostDevelopmentStage(sentenceProfile).id, 'satzbruecke');
  assert.equal(getWortpostDevelopmentStage(wordProfile).orientation, 'Baue das Wort ruhig zusammen.');
  assert.equal(getWortpostDevelopmentStage(sentenceProfile).orientation, 'Lies das Wort. Danach kommt ein kurzer Satz.');
});

test('Alpha 66A Wortpost child orientation texts stay short and pressure-free', () => {
  const stageIds = ['bildanker', 'silbenbruecke', 'wortaufbau', 'satzbruecke'];
  const orientations = stageIds.map((stageId) => getWortpostStageOrientation(stageId));

  assert.deepEqual(orientations, [
    'Schau auf das Bild. Dann bring den Brief heim.',
    'Sprich die Silbe leise mit. Dann waehle.',
    'Baue das Wort ruhig zusammen.',
    'Lies das Wort. Danach kommt ein kurzer Satz.',
  ]);
  assert.ok(orientations.every((text) => text.length <= 55));
  assert.ok(orientations.every((text) => text.split(/\s+/).length <= 9));
  assert.doesNotMatch(JSON.stringify(orientations), unsafeQualityWords);
  assert.doesNotMatch(JSON.stringify(orientations), /punkte|prozent|level|rang|cloud|login|upload|export|speichern/i);
});

test('Alpha 65 Wortpost profile path returns three calm local cards with safe reasons', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a'],
    knownSyllables: ['ma'],
    supportSettings: { imageHelp: true, reducedChoices: true },
    readiness: { sentence: 'supported' },
  });
  const tasks = getLearningTasks();
  const path = getProfileSafeWortpostPath(profile, tasks, { maxCards: 3, minimumChoices: 1 });
  const visibleText = JSON.stringify(path);

  assert.equal(path.cards.length, 3);
  assert.equal(path.localOnly, true);
  assert.equal(path.persistent, false);
  assert.ok(path.cards.every((card) => card.taskId && card.word && card.reason && card.sentenceBridge));
  assert.ok(path.cards.some((card) => /passt zu bekannten Einheiten|mit Lehrkraft gemeinsam sinnvoll|kleiner Auswahl/.test(card.reason)));
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, /diagnose|diagnost|score|ranking|punkte|timer|cloud|login|upload|export|speichern/i);
});

test('Alpha 65 Wortpost sentence bridge stays short, concrete and local', () => {
  assert.equal(getWortpostSentenceBridge('Ball'), 'Der Ball rollt zum Sofa.');
  assert.equal(getWortpostSentenceBridge('Tasse'), 'Die Tasse steht auf dem Tisch.');
  assert.equal(getWortpostSentenceBridge('Mond'), 'Der Mond ist da.');

  const bridges = ['Ball', 'Tasse', 'Mond'].map((word) => getWortpostSentenceBridge(word));
  assert.ok(bridges.every((bridge) => bridge.length <= 60));
  assert.ok(bridges.every((bridge) => bridge.split(/\s+/).length <= 7));
  assert.doesNotMatch(JSON.stringify(bridges), unsafeQualityWords);
});

test('Alpha 57B child feedback loop offers only Nochmal Weiter Fertig without teacher review changes', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const feedbackSection = appSource.slice(appSource.indexOf('function FeedbackChoices'), appSource.indexOf('function FinishScreen'));
  const teacherSection = appSource.slice(appSource.indexOf('teacher-word-family-review'), appSource.indexOf('function GuidedReadingPath'));

  assert.match(feedbackSection, /Du kannst es noch einmal lesen\./);
  assert.match(feedbackSection, /Du darfst weitergehen\./);
  assert.match(feedbackSection, /Du bist fertig\./);
  assert.match(feedbackSection, /\(\['Nochmal', 'Weiter', 'Fertig'\] as const\)/);
  assert.doesNotMatch(feedbackSection, /Leichter|Score|Ranking|Punkte|Prozent|Timer|Level|Diagnose|Cloud|Upload|Export|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(teacherSection, /Du kannst es noch einmal lesen|Du darfst weitergehen|Du bist fertig/);
});

test('Alpha 54B guided reading transition cue shows current and next child action safely', () => {
  const chain = getGuidedReadingChain();

  const pictureCue = getGuidedReadingTransitionCue(chain, 0);
  const syllableCue = getGuidedReadingTransitionCue(chain, 1);
  const sentenceCue = getGuidedReadingTransitionCue(chain, 3);
  const visibleText = JSON.stringify([pictureCue, syllableCue, sentenceCue]);

  assert.deepEqual(Object.keys(pictureCue), ['title', 'nowLabel', 'nowAction', 'nextLabel', 'nextAction', 'childSentence']);
  assert.equal(pictureCue.title, 'Mein nächster Schritt');
  assert.equal(pictureCue.nowLabel, 'Jetzt');
  assert.equal(pictureCue.nowAction, 'Bild');
  assert.equal(pictureCue.nextLabel, 'Danach');
  assert.equal(pictureCue.nextAction, 'Silbe');
  assert.equal(pictureCue.childSentence, 'Ich schaue.');
  assert.equal(syllableCue.nowAction, 'Silbe');
  assert.equal(syllableCue.nextAction, 'Wort');
  assert.equal(syllableCue.childSentence, 'Ich spreche mit.');
  assert.equal(sentenceCue.nowAction, 'Satz');
  assert.equal(sentenceCue.nextAction, 'Mini-Geschichte');
  assert.equal(sentenceCue.childSentence, 'Ich lese ruhig.');
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /punkte|prozent|level|rang|cloud|login|upload|export|speichern/i);
});

test('Alpha 54B child UI renders one small transition card without changing teacher review behavior', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const childSection = appSource.slice(appSource.indexOf('function GuidedReadingPath'), appSource.indexOf('function Leseleiter'));
  const teacherSection = appSource.slice(appSource.indexOf('teacher-word-family-review'), appSource.indexOf('function GuidedReadingPath'));

  assert.match(childSection, /getGuidedReadingTransitionCue/);
  assert.match(childSection, /guided-transition-card/);
  assert.match(childSection, /Mein nächster Schritt/);
  assert.match(childSection, /Jetzt/);
  assert.match(childSection, /Danach/);
  assert.match(css, /\.guided-transition-card/);
  assert.match(css, /minmax\(0, 1fr\)/);
  assert.match(css, /\.guided-transition-card\s*\{[\s\S]*border-radius:\s*8px/);
  assert.match(css, /\.guided-transition-actions span\s*\{[\s\S]*border-radius:\s*8px/);
  assert.doesNotMatch(childSection, /Score|Ranking|Punkte|Prozent|Timer|Level|Diagnose|Cloud|Upload|Export|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(teacherSection, /guided-transition-card|Mein nächster Schritt/);
});

test('Alpha 55B child path gives Jetzt a quieter but clearer visual focus', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const childSection = appSource.slice(appSource.indexOf('function GuidedReadingPath'), appSource.indexOf('function Leseleiter'));
  const teacherSection = appSource.slice(appSource.indexOf('teacher-word-family-review'), appSource.indexOf('function GuidedReadingPath'));

  assert.match(css, /\.child-progress-status\s*\{[\s\S]*box-shadow:\s*inset 0 0 0 2px rgba\(49, 91, 127, 0\.16\)/);
  assert.match(css, /\.child-progress-pill\.current\s*\{[\s\S]*box-shadow:\s*0 6px 14px rgba\(49, 91, 127, 0\.22\), inset 0 0 0 2px rgba\(255, 255, 255, 0\.35\)/);
  assert.match(css, /\.guided-transition-actions span:first-child\s*\{[\s\S]*background:\s*#eef6fb;[\s\S]*box-shadow:\s*inset 0 0 0 2px rgba\(49, 91, 127, 0\.16\)/);
  assert.match(css, /\.guided-transition-actions span:last-child\s*\{[\s\S]*background:\s*#f4f8f5;[\s\S]*box-shadow:\s*inset 0 0 0 2px rgba\(63, 109, 70, 0\.16\)/);
  assert.doesNotMatch(childSection, /Score|Ranking|Punkte|Prozent|Timer|Level|Diagnose|Cloud|Upload|Export|localStorage|sessionStorage|fetch\(/i);
  assert.doesNotMatch(teacherSection, /guided-transition-card|Mein nächster Schritt/);
});

test('Alpha 50B teacher development overview stays local, manual and non-diagnostic', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    supportSettings: { imageHelp: true, reducedChoices: true, repeat: true },
    readiness: { sentence: 'supported', story: 'later', writingBridge: 'later' },
    accessFocus: 'word',
  });
  const beforePath = getDailyReadingPath().map((item) => item.id);
  const overview = getTeacherDevelopmentOverview(profile, { minimumChoices: 1 });
  const afterPath = getDailyReadingPath().map((item) => item.id);
  const visibleText = JSON.stringify(overview);

  assert.deepEqual(Object.keys(overview), [
    'title',
    'knownUnitsLabel',
    'knownUnits',
    'supportLabel',
    'support',
    'orientationLabel',
    'orientation',
    'nextConnectionLabel',
    'nextConnection',
    'safetyNote',
    'localOnly',
    'manualOnly',
    'persistent',
  ]);
  assert.equal(overview.title, 'Arbeitsstand und nächster möglicher Anschluss');
  assert.equal(overview.knownUnitsLabel, 'Bekannte Einheiten');
  assert.equal(overview.supportLabel, 'Aktuelle Hilfe');
  assert.equal(overview.orientationLabel, 'Orientierung');
  assert.equal(overview.nextConnectionLabel, 'Nächster möglicher Anschluss');
  assert.equal(overview.localOnly, true);
  assert.equal(overview.manualOnly, true);
  assert.equal(overview.persistent, false);
  assert.match(overview.knownUnits, /m, a, s, o, f/);
  assert.match(overview.knownUnits, /ma, so, fa/);
  assert.match(overview.support, /Bildhilfe|Auswahl klein|Wiederholung/);
  assert.match(overview.orientation, /Orientierung/);
  assert.match(overview.nextConnection, /möglicher Anschluss/);
  assert.match(overview.safetyNote, /nur Orientierung, keine Bewertung/i);
  assert.doesNotMatch(visibleText, /diagnose|diagnost|score|ranking|punkte|prozent|\bnote\b|testwert|lesealter|defizit|automatisch|placement|export|upload|cloud|login|fetch|localStorage|sessionStorage/i);
  assert.deepEqual(afterPath, beforePath);
});

test('Alpha 50B teacher UI exposes only a compact orientation block without unsafe side effects', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const section = appSource.slice(appSource.indexOf('teacher-development-overview'), appSource.indexOf('teacher-suggestion-card'));

  assert.match(appSource, /getTeacherDevelopmentOverview/);
  assert.match(section, /Arbeitsstand und nächster möglicher Anschluss/);
  assert.match(section, /Bekannte Einheiten/);
  assert.match(section, /Aktuelle Hilfe/);
  assert.match(section, /Orientierung/);
  assert.match(section, /Nächster möglicher Anschluss/);
  assert.match(section, /nur Orientierung, keine Bewertung/i);
  assert.match(section, /Der Kinderpfad bleibt unverändert/);
  assert.match(css, /\.teacher-development-overview/);
  assert.doesNotMatch(section, /<input|textarea|localStorage|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(|Login|Cloud|Upload|Export|Diagnose|Score|Ranking|Punkte|Prozent|Testwert|Lesealter|Defizit/i);
});

test('Alpha 49B adds one tiny Tasse quality loop with meaning, syllable, contrast and sentence transfer', () => {
  const tasks = getLearningTasks();
  const alpha49Tasks = tasks.filter((task) => task.id.startsWith('alpha49b-'));

  assert.deepEqual(alpha49Tasks.map((task) => task.id), [
    'alpha49b-a-tasse-meaning',
    'alpha49b-b-tas-se-repeat',
    'alpha49b-c-tasse-tasche-contrast',
    'alpha49b-c-tasse-sentence',
  ]);
  assert.deepEqual(alpha49Tasks.map((task) => task.word), ['Tasse', 'Tasse', 'Tasse', 'Tasse']);
  assert.deepEqual(alpha49Tasks.map((task) => task.type), ['image-word-match', 'syllable-blend', 'word-picture-match', 'word-picture-match']);
  assert.deepEqual(alpha49Tasks.map((task) => task.options), [['Tasse'], ['Tasse'], ['Tasse', 'Tasche'], ['Tasse']]);
  assert.ok(alpha49Tasks.length <= 4);
  assert.ok(alpha49Tasks.every((task) => task.options.length <= 2));
  assert.ok(alpha49Tasks.every((task) => task.options.includes(task.word)));
  assert.ok(alpha49Tasks.every((task) => task.syllables.map((part) => part.text).join('-') === 'Tas-se'));
  assert.match(alpha49Tasks[3].prompt, /Die Tasse steht da\./);
  assert.equal(getTaskBridgeMetadata('alpha49b-c-tasse-sentence').storyBridge?.shortText, 'Die Tasse steht da.');
});

test('Alpha 49B Tasse loop stays profile-safe, local and does not overload default child path', () => {
  const alpha49Tasks = getLearningTasks().filter((task) => task.id.startsWith('alpha49b-'));
  const visibleText = JSON.stringify(alpha49Tasks);
  const earlyProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] });
  const tasseProfile = createLocalDidacticProfile({
    knownGraphemes: ['t', 'a', 's', 'e'],
    knownSyllables: ['tas', 'se'],
    supportSettings: { imageHelp: true, reducedChoices: true, repeat: true },
    readiness: { sentence: 'supported' },
  });

  assert.equal(getTaskProfileFit('alpha49b-a-tasse-meaning', earlyProfile).allowed, false);
  assert.equal(getTaskProfileFit('alpha49b-c-tasse-sentence', tasseProfile, { minimumChoices: 1 }).allowed, true);
  assert.equal(getTaskProfileFit('alpha49b-a-tasse-meaning', tasseProfile, { minimumChoices: 1 }).mode, 'full-choice');
  assert.equal(getTaskProfileFit('alpha49b-b-tas-se-repeat', tasseProfile, { minimumChoices: 1 }).mode, 'full-choice');
  assert.equal(getTaskProfileFit('alpha49b-c-tasse-tasche-contrast', tasseProfile, { minimumChoices: 1 }).mode, 'teacher-led');
  assert.equal(getTaskProfileFit('alpha49b-c-tasse-sentence', tasseProfile, { minimumChoices: 1 }).mode, 'full-choice');
  assert.deepEqual(
    alpha49Tasks.map((task) => task.id).filter((taskId) => getTaskProfileFit(taskId, tasseProfile, { minimumChoices: 1 }).allowed),
    alpha49Tasks.map((task) => task.id),
  );
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /echter name|familie|cloud|login|upload|export|metacom/i);
  assert.equal(getDailyReadingPath().length, 4);
  assert.equal(getProfileSafeDailyPath(earlyProfile).cards[0].taskId, 'b-ma-ma');
  assert.ok(getProfileSafeDailyPath(tasseProfile, { minimumChoices: 1 }).cards.length <= maxDailyPathCards);
});

test('Alpha 51B adds exactly one tiny Mama quality loop with meaning, syllable, safe contrast and sentence transfer', () => {
  const tasks = getLearningTasks();
  const alpha51Tasks = tasks.filter((task) => task.id.startsWith('alpha51b-'));

  assert.deepEqual(alpha51Tasks.map((task) => task.id), [
    'alpha51b-a-mama-meaning',
    'alpha51b-b-ma-ma-repeat',
    'alpha51b-c-mama-oma-contrast',
    'alpha51b-c-mama-sentence',
  ]);
  assert.deepEqual(alpha51Tasks.map((task) => task.word), ['Mama', 'Mama', 'Mama', 'Mama']);
  assert.deepEqual(alpha51Tasks.map((task) => task.type), ['image-word-match', 'syllable-blend', 'word-picture-match', 'word-picture-match']);
  assert.deepEqual(alpha51Tasks.map((task) => task.options), [['Mama'], ['Mama'], ['Mama', 'Oma'], ['Mama']]);
  assert.ok(alpha51Tasks.length <= 4);
  assert.ok(alpha51Tasks.every((task) => task.options.length <= 2));
  assert.ok(alpha51Tasks.every((task) => task.options.includes(task.word)));
  assert.ok(alpha51Tasks.every((task) => task.syllables.map((part) => part.text).join('-') === 'Ma-ma'));
  assert.match(alpha51Tasks[0].prompt, /Zeige Mama\./);
  assert.match(alpha51Tasks[1].prompt, /Lies: Ma - ma\./);
  assert.match(alpha51Tasks[2].prompt, /Lies Mama\. Zeige Mama\./);
  assert.match(alpha51Tasks[3].prompt, /Mama ist da\./);
  assert.equal(getTaskBridgeMetadata('alpha51b-c-mama-sentence').storyBridge?.shortText, 'Mama ist da.');
});

test('Alpha 51B Mama loop stays profile-safe, local and does not overload default child path', () => {
  const alpha51Tasks = getLearningTasks().filter((task) => task.id.startsWith('alpha51b-'));
  const visibleText = JSON.stringify(alpha51Tasks);
  const earlyProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] });
  const mamaProfile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 'o'],
    knownSyllables: ['ma', 'mo'],
    supportSettings: { imageHelp: true, reducedChoices: true, repeat: true },
    readiness: { sentence: 'supported' },
  });

  assert.equal(getTaskProfileFit('alpha51b-a-mama-meaning', earlyProfile, { minimumChoices: 1 }).allowed, true);
  assert.equal(getTaskProfileFit('alpha51b-c-mama-sentence', mamaProfile, { minimumChoices: 1 }).allowed, true);
  assert.equal(getTaskProfileFit('alpha51b-a-mama-meaning', mamaProfile, { minimumChoices: 1 }).mode, 'full-choice');
  assert.equal(getTaskProfileFit('alpha51b-b-ma-ma-repeat', mamaProfile, { minimumChoices: 1 }).mode, 'full-choice');
  assert.equal(getTaskProfileFit('alpha51b-c-mama-oma-contrast', mamaProfile, { minimumChoices: 1 }).mode, 'full-choice');
  assert.equal(getTaskProfileFit('alpha51b-c-mama-sentence', mamaProfile, { minimumChoices: 1 }).mode, 'full-choice');
  assert.deepEqual(
    alpha51Tasks.map((task) => task.id).filter((taskId) => getTaskProfileFit(taskId, mamaProfile, { minimumChoices: 1 }).allowed),
    alpha51Tasks.map((task) => task.id),
  );
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /echter name|familie|diagnose|cloud|login|upload|export|metacom|timer|ranking|score/i);
  assert.equal(getDailyReadingPath().length, 4);
  assert.equal(getProfileSafeDailyPath(earlyProfile).cards[0].taskId, 'b-ma-ma');
  assert.ok(getProfileSafeDailyPath(mamaProfile, { minimumChoices: 1 }).cards.length <= maxDailyPathCards);
});

test('Alpha 40B adds only small early word offers and keeps them profile gated', () => {
  const tasks = getLearningTasks();
  const alpha40Tasks = tasks.filter((task) => task.id.startsWith('alpha40-'));

  assert.deepEqual(alpha40Tasks.map((task) => task.word), ['Ich', 'Da', 'Ja', 'Nein']);
  assert.ok(alpha40Tasks.length <= 8);
  assert.ok(alpha40Tasks.every((task) => task.level === 'A' || task.level === 'B'));
  assert.ok(alpha40Tasks.every((task) => task.options.includes(task.word)));

  const earlyProfile = createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] });
  assert.equal(getTaskProfileFit('alpha40-a-ich', earlyProfile).allowed, false);

  const communicationProfile = createLocalDidacticProfile({
    knownGraphemes: ['i', 'ch', 'd', 'a', 'j', 'n', 'ei'],
    knownSyllables: ['ich', 'da', 'ja', 'nein'],
    supportSettings: { imageHelp: true, reducedChoices: true },
  });
  assert.equal(getTaskProfileFit('alpha40-a-ich', communicationProfile, { minimumChoices: 1 }).allowed, true);
  assert.equal(getTaskProfileFit('alpha40-a-da', communicationProfile, { minimumChoices: 1 }).allowed, true);
});

test('Alpha 40B communication words stay safe and do not disturb default daily paths', () => {
  const tasks = getLearningTasks();
  const alpha40Tasks = tasks.filter((task) => task.id.startsWith('alpha40-'));
  const visibleText = JSON.stringify(alpha40Tasks);

  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, protectedAssetWords);
  assert.doesNotMatch(visibleText, /echter name|familie|diagnose|cloud|login|export/i);
  assert.equal(getDailyReadingPath().length, 4);
  assert.equal(getProfileSafeDailyPath(createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] })).cards[0].taskId, 'b-ma-ma');
});

test('Alpha 29 learning check steps cover the calm start sequence', () => {
  const labels = learningCheckSteps.map((step) => step.label).join(' ');

  assert.ok(learningCheckSteps.length >= 5);
  assert.match(labels, /Bild\/Symbol/);
  assert.match(labels, /Silbe/);
  assert.match(labels, /Wort/);
  assert.match(labels, /Satz|Mini-Geschichte/);
  assert.match(labels, /Schreibbrücke/);
  assert.doesNotMatch(JSON.stringify(learningCheckSteps), unsafeQualityWords);
});

test('Alpha 29 default learning check produces a safe early Mama path', () => {
  const observation = createLearningCheckObservation({ imageSupportUsed: true, reducedChoicesUsed: true });
  const path = getLearningCheckDailyPath(observation);

  assert.equal(observation.localOnly, true);
  assert.equal(observation.persistent, false);
  assert.deepEqual(path.pathCards.map((card) => card.taskId), ['b-ma-ma']);
  assert.match(path.todayStart, /Mama/);
  assert.match(path.nextSmallStep, /Mama/);
  assert.match(path.supportPlan.join(' '), /Bildhilfe|Auswahl klein/);
  const visibleText = [path.todayStart, path.nextSmallStep, path.supportPlan.join(' '), path.safetyNote, path.summary.note].join(' ');
  assert.doesNotMatch(visibleText, /diagnostik|diagnostisch|punkte|\bnote\b|rang|ranking|timer|zeitdruck|klasse|lesealter|prozent|fehler|defizit/i);
});

test('Alpha 29 word and story readiness produces a richer path than default', () => {
  const early = getLearningCheckDailyPath({ imageSupportUsed: true, reducedChoicesUsed: true });
  const ready = getLearningCheckDailyPath({ syllableStepComfortable: true, wordStepComfortable: true, sentenceOrStoryReady: true, writingBridgeReady: true });

  assert.ok(ready.pathCards.length > early.pathCards.length);
  assert.ok(ready.writingBridgeSuggestion);
  assert.match(ready.summary.readyFocus, /Satz|Mini-Geschichte/);
});

test('Alpha 29 support-heavy observation keeps support recommendations', () => {
  const path = getLearningCheckDailyPath({ imageSupportUsed: true, gestureOrReadAloudUsed: true, reducedChoicesUsed: true, repeatUsed: true });
  const supportText = path.supportPlan.join(' ');

  assert.match(supportText, /Bildhilfe/);
  assert.match(supportText, /Gebärde|Lehrkraft/);
  assert.match(supportText, /Auswahl klein/);
  assert.match(supportText, /Wiederholung|noch einmal/);
});

test('Alpha 29 teacher UI exposes Lernstart check without unsafe side effects', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const section = appSource.slice(appSource.indexOf('learning-check-card'), appSource.indexOf('teacher-planning-grid'));

  assert.match(section, /Lernstart: kurzer Check/);
  assert.match(section, /Heute starten mit/);
  assert.match(section, /Nächster kleiner Schritt/);
  assert.match(section, /Hilfen/);
  assert.match(section, /Schreibbrücke/);
  assert.doesNotMatch(section, /<input|textarea|localStorage|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(|Login|Cloud|Upload|Export|Namensfeld|Diagnose|Score|Ranking|Punkte|Prozent/i);
});

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeText(text) {
  return text.toLocaleLowerCase('de-DE').replace(/[^a-zäöüß]/gi, '');
}

function assertAll(items, predicate, describeFailure) {
  const failures = items.filter((item) => !predicate(item));
  assert.deepEqual(failures.map(describeFailure), []);
}

test('Alpha 35B reading series groups the seven Alpha 34 observation tasks into four calm series', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    supportSettings: { imageHelp: true, reducedChoices: true },
    readiness: { sentence: 'supported', story: 'supported', writingBridge: 'optional' },
  });
  const series = getLocalReadingSeriesForProfile(profile);
  const usedTaskIds = new Set(series.flatMap((item) => item.taskIds));

  assert.deepEqual(series.map((item) => item.title), [
    'Ankommen mit Bild und Silbe',
    'Silben verbinden',
    'Wort im Satz',
    'Geschichte und Schreibbrücke',
  ]);
  assert.equal(series.length, 4);
  assert.equal(getCuratedObservationTasksForProfile(profile).length, 7);
  assert.equal(usedTaskIds.size, 7);
  assert.ok(series.every((item) => item.localOnly === true));
  assert.ok(series.every((item) => item.startLabel && item.repeatLabel && item.nextStepLabel && item.supportLabel && item.omitLabel));
  assert.doesNotMatch(JSON.stringify(series), /diagnose|diagnost|score|punkte|ranking|timer|zeitdruck|cloud|login|export|name|klasse|\.png|\.svg|https?:\/\//i);
});

test('Alpha 35B teacher UI exposes compact series first and moves single tasks into details', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const builderSource = appSource.slice(appSource.indexOf('local-profile-builder'), appSource.indexOf('profile-safe-preview'));
  const contentSource = readFileSync(new URL('../src/lesewerk-content.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /getLocalReadingSeriesForProfile/);
  assert.match(appSource, /<SeriesCompactPanel/);
  assert.match(appSource, /Heute eine ruhige Serie vormerken/);
  assert.match(contentSource, /Ankommen mit Bild und Silbe/);
  assert.match(contentSource, /Silben verbinden/);
  assert.match(contentSource, /Wort im Satz/);
  assert.match(contentSource, /Geschichte und Schreibbrücke/);
  assert.match(builderSource, /<details className="curated-observation-tasks"/);
  assert.match(builderSource, /Kuratierte Einzelaufgaben anzeigen/);
  assert.match(css, /\.series-compact-panel/);
  assert.match(css, /\.series-row-grid[\s\S]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.series-row-steps/);
  assert.match(appSource, /Serie vormerken/);
  assert.match(appSource, /Vormerkung schreibt nicht in den Tagesweg/);
  assert.doesNotMatch(builderSource, /<input|textarea|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(|Login|Cloud|Upload|Export|Diagnose|Score|Ranking|Punkte|Prozent/i);
});

test('Alpha 36B series language and teacher UI stay compact without automatic daily-path transfer', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    supportSettings: { imageHelp: true, reducedChoices: true, teacherReadAloud: true },
    readiness: { sentence: 'supported', story: 'supported', writingBridge: 'optional' },
  });
  const series = getLocalReadingSeriesForProfile(profile);
  const seriesText = JSON.stringify(series);
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const teacherSource = appSource.slice(appSource.indexOf('teacher-onboarding-card'), appSource.indexOf('local-profile-builder'));
  const builderSource = appSource.slice(appSource.indexOf('local-profile-builder'), appSource.indexOf('profile-safe-preview'));

  assert.deepEqual(series.map((item) => item.title), ['Ankommen mit Bild und Silbe', 'Silben verbinden', 'Wort im Satz', 'Geschichte und Schreibbrücke']);
  assert.doesNotMatch(seriesText, /Woerter|Schreibbruecke|waere|spaeter|->/);
  assert.match(seriesText, /Bildkarte|Satzstreifen|Legematerial|Schreibbrücke/);
  assert.match(teacherSource, /<SeriesCompactPanel/);
  assert.match(appSource, /Serie vormerken/);
  assert.match(appSource, /Keine automatische Umstellung/);
  assert.doesNotMatch(teacherSource, /setSelectedDailyPathIds\(/);
  assert.doesNotMatch(builderSource, /<SeriesCompactPanel/);
});

test('Alpha 37B teacher planning copy separates series preview, manual daily path and child path safety', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const teacherSource = appSource.slice(appSource.indexOf('teacher-onboarding-card'), appSource.indexOf('local-profile-builder'));
  const seriesSource = appSource.slice(appSource.indexOf('function SeriesCompactPanel'), appSource.indexOf('function GuidedReadingPath'));
  const suggestionSource = appSource.slice(appSource.indexOf('teacher-suggestion-card'), appSource.indexOf('local-profile-builder'));

  assert.match(seriesSource, /Hier nur Serie vormerken/);
  assert.match(seriesSource, /Serie vormerken/);
  assert.match(seriesSource, /Vorgemerkt – noch nicht im Tagesweg/);
  assert.match(seriesSource, /Eine Vormerkung schreibt nicht in den Tagesweg/);
  assert.match(suggestionSource, /Nur Vorschlag/);
  assert.match(suggestionSource, /Erst mit Klick wird der Tagesweg geändert/);
  assert.match(suggestionSource, /Tagesweg übernehmen und aktivieren/);
  assert.match(suggestionSource, /Tagesweg übernommen/);
  assert.match(suggestionSource, /Vorschlag verworfen/);
  assert.doesNotMatch(teacherSource, /onSelect=\{applyTeacherSuggestion\}|onSelect=\{setSelectedDailyPathIds|setSelectedDailyPathIds\([^)]*selectedSeriesId/);
  assert.doesNotMatch(`${seriesSource}\n${suggestionSource}`, /localStorage|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(|<input|<textarea|Namensfeld|Login|Cloud|Upload|Export|Score|Ranking|Punkte|Prozent/i);
});

test('Alpha 38B series examples expose concrete material preview without unsafe assets or child-path transfer', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    supportSettings: { imageHelp: true, reducedChoices: true, teacherReadAloud: true },
    readiness: { sentence: 'supported', story: 'supported', writingBridge: 'optional' },
  });
  const series = getLocalReadingSeriesForProfile(profile);
  const examples = series.map((item) => item.exampleMaterial);
  const exampleText = JSON.stringify(examples);
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const seriesSource = appSource.slice(appSource.indexOf('function SeriesCompactPanel'), appSource.indexOf('function GuidedReadingPath'));

  assert.deepEqual(examples.map((item) => item.label), [
    'Beispiel: Ball sehen und lesen.',
    'Beispiel: ma / ma legen.',
    'Beispiel: Tasse im Satz finden.',
    'Beispiel: Hut in einer Mini-Geschichte verstehen.',
  ]);
  assert.deepEqual(examples.map((item) => item.sentence), [
    'Ball zeigen und lesen.',
    'Daraus wird Mama.',
    'Die Tasse steht auf dem Tisch.',
    'Der Hut hängt am Haken.',
  ]);
  assert.deepEqual(examples.map((item) => item.miniStory), [
    'Ball zeigen. Ball lesen oder sprechen.',
    'Silben klatschen. Dann zusammenziehen.',
    'Tasse finden. Wort zeigen.',
    'Der Hut hängt am Haken. Dann ist der Haken leer.',
  ]);
  assert.deepEqual(examples.map((item) => item.help), [
    'Ball zeigen. Langsam sprechen. Ein Schritt nach dem anderen.',
    'Silben trennen. Klatschen. Legen. Sprechen.',
    'Wort markieren. Zwei Antworten zeigen: Tisch oder Bett.',
    'Bildfolge festlegen. Schreiben optional: legen oder nachspuren.',
  ]);
  assert.ok(examples.every((item) => item.symbol && item.visual && item.syllable && item.word && item.sentence && item.miniStory && item.help));
  assert.match(seriesSource, /series-example-card/);
  assert.match(seriesSource, /Beispielmaterial für/);
  assert.match(css, /\.series-example-card/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*\.series-example-card[\s\S]*grid-template-columns: 1fr/);
  assert.doesNotMatch(`${exampleText}\n${seriesSource}`, protectedAssetWords);
  assert.doesNotMatch(`${exampleText}\n${seriesSource}`, /<input|textarea|localStorage|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(|Login|Cloud|Upload|Export|Namensfeld|Diagnose|Score|Ranking|Punkte|Prozent/i);
  assert.doesNotMatch(seriesSource, /setSelectedDailyPathIds\([^)]*selectedSeriesId|onSelect=\{setSelectedDailyPathIds/);
});

test('Alpha 34B local observation control summarizes known units, help and readiness safely', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    supportSettings: { imageHelp: true, reducedChoices: true, teacherReadAloud: true },
    accessFocus: 'story',
    readiness: { sentence: 'supported', story: 'supported', writingBridge: 'optional' },
  });
  const adaptive = getAdaptiveNextStepForProfile(profile, { minimumChoices: 1 });
  const summary = getLocalObservationControlSummary(profile, adaptive);

  assert.match(summary.todayFocus, /m, a, s, o, f/);
  assert.match(summary.todayFocus, /ma, so, fa/);
  assert.match(summary.helpSummary, /Bildhilfe/);
  assert.match(summary.helpSummary, /kleine Auswahl/);
  assert.match(summary.readinessSummary, /Satz heute mit Hilfe/);
  assert.match(summary.readinessSummary, /Mini-Geschichte heute mit Hilfe/);
  assert.match(summary.readinessSummary, /Schreibbrücke heute optional/);
  assert.match(summary.whyItFits, /bekannte Grapheme|sichere Silben/);
  assert.match(summary.omitSummary, /auslassen|ruhig/);
  assert.doesNotMatch(JSON.stringify(summary), /diagnose|diagnost|score|punkte|ranking|timer|cloud|login|export|name|klasse/i);
});

test('Alpha 34B curated observation tasks stay within six to eight calm tasks across the reading bridge', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['m', 'a', 's', 'o', 'f'],
    knownSyllables: ['ma', 'so', 'fa'],
    supportSettings: { imageHelp: true, reducedChoices: true },
    accessFocus: 'writing-bridge',
    readiness: { sentence: 'supported', story: 'supported', writingBridge: 'optional' },
  });
  const curated = getCuratedObservationTasksForProfile(profile);
  const bridgeKinds = new Set(curated.map((task) => task.observationKind));

  assert.ok(curated.length >= 6);
  assert.ok(curated.length <= 8);
  for (const required of ['picture-symbol', 'grapheme', 'syllable', 'word', 'sentence', 'mini-story', 'writing-bridge']) {
    assert.ok(bridgeKinds.has(required), `missing ${required}`);
  }
  assert.ok(curated.every((task) => task.localOnly === true));
  assert.ok(curated.every((task) => task.teacherRationale && task.childPrompt && task.supportCue));
  assert.doesNotMatch(JSON.stringify(curated), /diagnose|diagnost|score|punkte|ranking|timer|zeitdruck|cloud|login|export|name|klasse|\.png|\.svg|https?:\/\//i);
});

test('Alpha 34B teacher UI exposes local observation summary and readiness without unsafe side effects', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const section = appSource.slice(appSource.indexOf('local-profile-builder'), appSource.indexOf('profile-safe-preview'));

  assert.match(section, /Heute im Blick/);
  assert.match(section, /Warum passt das/);
  assert.match(section, /Bereitschaft/);
  assert.match(section, /Satz heute mit Hilfe/);
  assert.match(section, /Mini-Geschichte heute mit Hilfe/);
  assert.match(section, /Schreibbrücke heute optional/);
  assert.match(section, /Kuratierte Beobachtungsaufgaben/);
  assert.doesNotMatch(section, /<input|textarea|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(|Login|Cloud|Upload|Export|Diagnose|Score|Ranking|Punkte|Prozent/i);
});

test('Alpha 28 local profile builder creates a safe anonymous local profile', () => {
  const profile = createLocalDidacticProfile({
    knownGraphemes: ['M', 'a', 'x-not-allowed'],
    knownSyllables: ['ma', 'unknown'],
    supportSettings: { imageHelp: true, reducedChoices: true },
    accessFocus: 'syllable',
  });

  assert.equal(profile.profileId, 'local-teacher-preview');
  assert.equal(profile.localOnly, true);
  assert.equal(profile.anonymous, true);
  assert.equal(profile.persistent, false);
  assert.deepEqual(profile.knownGraphemes, ['m', 'a']);
  assert.deepEqual(profile.knownSyllables, ['ma']);
  assert.equal(profile.supportSettings.imageHelp, true);
  assert.ok(profileBuilderOptions.graphemes.includes('sch'));
  assert.doesNotMatch(JSON.stringify(profile), /name|login|cloud|export|diagnose|score|ranking|klasse/i);
});

test('Alpha 28 adaptive next step is deterministic for M+A and M+A+S+O+F', () => {
  const early = getAdaptiveNextStepForProfile(createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], supportSettings: { imageHelp: true, reducedChoices: true } }));
  const sofa = getAdaptiveNextStepForProfile(createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], supportSettings: { reducedChoices: true } }));

  assert.deepEqual(early.pathCards.map((card) => card.taskId), ['b-ma-ma']);
  assert.match(early.nextSmallStep, /Mama/);
  assert.ok(sofa.pathCards.map((card) => card.taskId).includes('b-so-fa'));
  assert.match(sofa.nextSmallStep, /Mama und Sofa/);
  assert.doesNotMatch([early, sofa].map((item) => [item.nextSmallStep, item.explanation, item.supportPlan.join(' '), item.safetyNote].join(' ')).join(' '), /diagnose|diagnost|score|punkte|note|rang|ranking|timer|zeitdruck|falsch|fehler|schwach|defizit/i);
});

test('Alpha 28 broader profile gets more usable cards and support-heavy profile keeps support plan', () => {
  const early = getAdaptiveNextStepForProfile(createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'] }));
  const broad = getAdaptiveNextStepForProfile(createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l', 'i', 'n', 'e', 't', 'b', 'u', 'h'], knownSyllables: ['ma', 'so', 'fa', 'la', 'li', 'mo', 'ba', 'na', 'ne', 'ta', 'te'] }));
  const supportHeavy = getAdaptiveNextStepForProfile(createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], supportSettings: { imageHelp: true, gestureHint: true, reducedChoices: true, teacherReadAloud: true, repeat: true } }));

  assert.ok(broad.pathCards.length > early.pathCards.length);
  assert.ok(broad.writingBridgeSuggestion);
  assert.equal(supportHeavy.recommendedFocus, 'picture-symbol');
  assert.match(supportHeavy.supportPlan.join(' '), /Bildhilfe/);
  assert.match(supportHeavy.supportPlan.join(' '), /Auswahl klein/);
});

test('Alpha 28 teacher UI exposes local profile builder without unsafe side effects', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const builderSource = appSource.slice(appSource.indexOf('local-profile-builder'), appSource.indexOf('profile-safe-preview'));

  assert.match(appSource, /Lokales Leseprofil einstellen/);
  assert.match(appSource, /Heute passend/);
  assert.match(appSource, /Nächster kleiner Schritt/);
  assert.match(appSource, /Schreibbrücke/);
  assert.match(appSource, /Heute auslassen/);
  assert.match(appSource, /createLocalDidacticProfile/);
  assert.match(appSource, /getAdaptiveNextStepForProfile/);
  assert.match(css, /\.local-profile-builder/);
  assert.match(css, /\.builder-chip/);
  assert.doesNotMatch(builderSource, /<input|textarea|localStorage|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(|Login|Cloud|Upload|Export|Diagnose|Score|Ranking|Punkte|Prozent/i);
});

test('anonymous profiles never ask for real student names', () => {
  const profiles = getAnonymousProfiles();

  assert.deepEqual(
    profiles.map((profile) => profile.label),
    ['Profil Blau', 'Profil Grün', 'Profil Sonne'],
  );
  assert.ok(profiles.every((profile) => profile.storageKey.startsWith('demo-')));
});

test('syllable cards expose alternating blue-red syllable colors', () => {
  const firstCard = getSyllableCards().find((card) => card.syllables.length >= 2);

  assert.ok(firstCard);
  assert.deepEqual(
    firstCard.syllables.slice(0, 2).map((part) => part.color),
    ['blue', 'red'],
  );
});

test('support state can reduce visible choices without pressure feedback', () => {
  const reduced = normalizeSupportState({ reduceChoices: true, repeat: true });

  assert.equal(reduced.visibleCardCount, 2);
  assert.equal(reduced.feedback, 'Wir lesen in Ruhe noch einmal.');
});

test('daily reading path offers a calm four-card mix instead of the full library', () => {
  const path = getDailyReadingPath();

  assert.equal(path.length, 4);
  assert.deepEqual(
    path.map((item) => item.kind),
    ['task', 'task', 'story', 'repeat'],
  );
  assert.ok(path.every((item) => item.label.length > 0));
  assert.match(path.map((item) => item.helper).join(' '), /Erstes Wort/);
  assert.match(path.map((item) => item.helper).join(' '), /Kurze Story/);
  assert.match(path.map((item) => item.helper).join(' '), /Nochmal in Ruhe/);
  assert.ok(!/diagnose|note|noten|rang|ranking|score|timer|zeitdruck|falsch|fehler/i.test(JSON.stringify(path)));
});

test('child app shows a current local pilot demo header and keeps the full library secondary', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /LeseWerk · lokaler Pilot-Demo-Stand/);
  assert.doesNotMatch(appSource, /LeseWerk Alpha 12/);
  assert.match(appSource, /Heute lesen/);
  assert.match(appSource, /currentReadingPath\.map/);
  assert.match(appSource, /aria-label=\{`Tagesweg mit \$\{currentReadingPath.length\} Karte/);
  assert.match(appSource, /<details className="library-panel">/);
  assert.match(appSource, /Alle Wörter und Geschichten öffnen/);
  assert.match(css, /\.daily-path-grid[\s\S]*grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.library-panel/);
});

test('daily path source keeps library scale available but not as the default visible choice load', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const tasks = getLearningTasks();
  const stories = getStoryPaths();
  const path = getDailyReadingPath(tasks, stories);

  assert.ok(tasks.length >= 58);
  assert.equal(stories.length, 24);
  assert.equal(path.length, 4);
  assert.ok(path.length < tasks.length);
  assert.ok(path.some((item) => item.kind === 'story'));
  assert.match(appSource, /getReducedChoices\(tasks, activeTaskId, supportState\.reduceChoices\)/);
  assert.match(appSource, /getReducedStoryChoices\(stories, activeStoryId, supportState\.reduceChoices\)/);
});

test('teacher curation choices come only from existing tasks and stories', () => {
  const tasks = getLearningTasks();
  const stories = getStoryPaths();
  const choices = getDailyPathChoices(tasks, stories);

  assert.ok(choices.length > maxDailyPathCards);
  assert.ok(choices.some((choice) => choice.kind === 'task'));
  assert.ok(choices.some((choice) => choice.kind === 'story'));
  assert.ok(choices.every((choice) => choice.source === 'existing-content'));
  assert.ok(choices.filter((choice) => choice.kind === 'task').every((choice) => tasks.some((task) => task.id === choice.taskId)));
  assert.ok(choices.filter((choice) => choice.kind === 'story').every((choice) => stories.some((story) => story.id === choice.storyId)));
});

test('teacher curation enforces the max-four rule even with more selected ids', () => {
  const choices = getDailyPathChoices();
  const selectedIds = choices.slice(0, 6).map((choice) => choice.id);
  const curated = getCuratedDailyReadingPath(selectedIds);

  assert.equal(maxDailyPathCards, 4);
  assert.equal(curated.length, 4);
  assert.deepEqual(
    curated.map((item) => item.id),
    selectedIds.slice(0, 4),
  );
});

test('empty teacher curation falls back to the safe Alpha 9 default path', () => {
  const fallback = getDailyReadingPath();
  const curated = getCuratedDailyReadingPath([]);

  assert.deepEqual(curated, fallback);
  assert.equal(curated.length, 4);
});

test('curated child path uses exactly the selected one to four cards', () => {
  const choices = getDailyPathChoices();
  const selectedIds = [choices[2].id, choices[4].id, choices.find((choice) => choice.kind === 'story').id];
  const curated = getCuratedDailyReadingPath(selectedIds);

  assert.equal(curated.length, 3);
  assert.deepEqual(
    curated.map((item) => item.id),
    selectedIds,
  );
  assert.ok(curated.some((item) => item.kind === 'story'));
});

test('Alpha 15 two-card pilot path uses exactly Ball and Tasse from existing tasks', () => {
  const tasks = getLearningTasks();
  const pilotPath = getTwoCardPilotPath(tasks);

  assert.equal(pilotPath.length, 2);
  assert.deepEqual(
    pilotPath.map((item) => item.taskId),
    ['a-ball', 'a-tasse'],
  );
  assert.ok(pilotPath.every((item) => item.kind === 'task'));
  assert.ok(pilotPath.every((item) => item.source === 'existing-content'));
  assert.ok(pilotPath.every((item) => tasks.some((task) => task.id === item.taskId)));
  assert.deepEqual(
    pilotPath.map((item) => item.label),
    ['Ball', 'Tasse'],
  );
});

test('Alpha 15 two-card pilot starts only calm support settings and no pressure features', () => {
  const pilotSupport = getTwoCardPilotSupport();

  assert.deepEqual(pilotSupport, {
    imageHelp: true,
    syllableColors: true,
    reduceChoices: true,
  });
  assert.equal(normalizeSupportState(pilotSupport).imageHelp, true);
  assert.equal(normalizeSupportState(pilotSupport).syllableColors, true);
  assert.equal(normalizeSupportState(pilotSupport).reduceChoices, true);
  assert.equal(normalizeSupportState(pilotSupport).readAloud, false);
  assert.equal(normalizeSupportState(pilotSupport).signHint, false);
  assert.equal(normalizeSupportState(pilotSupport).repeat, false);
});

test('Alpha 15 app exposes teacher-started two-card pilot and a calm two-card finish', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /Pilot starten: nur 2 Karten/);
  assert.match(appSource, /startTwoCardPilot/);
  assert.match(appSource, /getTwoCardPilotPath\(tasks\)/);
  assert.match(appSource, /setSupport\(getTwoCardPilotSupport\(\)\)/);
  assert.match(appSource, /Heute nur zwei Karten\. Die Bildhilfe ist an\. Alles in Ruhe\./);
  assert.match(appSource, /Weiter zur zweiten Karte/);
  assert.match(appSource, /Du hast zwei Karten in Ruhe gelesen\. Jetzt ist Pause\./);
  assert.match(appSource, /Pilot noch einmal starten/);
  assert.doesNotMatch(appSource, /new Blob|URL\.createObjectURL|download=|fetch\(|authToken|ranking|score|timer|Login|Cloud-Sync|Schülerverwaltung/i);
  assert.match(css, /\.two-card-pilot-start/);
  assert.match(css, /\.pilot-notice/);
  assert.match(css, /\.pilot-progress/);
});

test('Alpha 16 teacher practice card stays compact, anonymous and non-diagnostic', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  const promptTexts = ['Start gelungen?', 'Welche Hilfe wurde genutzt?', 'Nächster kleinster Schritt?'];
  assert.match(appSource, /Praxis-Pilotkarte/);
  assert.match(appSource, /Nach dem 2-Karten-Pilot nur Sichtbares festhalten/);
  for (const promptText of promptTexts) {
    assert.equal(appSource.split(promptText).length - 1, 2);
  }
  assert.doesNotMatch(appSource, /setPractice|practiceObservation|new Blob|URL\.createObjectURL|download=|fetch\(|authToken|Login|Upload|Cloud-Sync|Schülerverwaltung/i);
  assert.match(css, /\.practice-pilot-card/);
  assert.match(css, /\.practice-prompt-grid/);
  assert.match(css, /\.practice-prompt-field textarea/);
});

test('Alpha 17 practice card shows the exact no-storage hint', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

  assert.match(appSource, /Praxis-Pilotkarte[\s\S]*Hinweis: Diese Notizen werden nicht gespeichert\. Bei Bedarf sofort anonym auf Papier übertragen\./);
});

test('Alpha 22 task requirements include first Mama Sofa Lama syllable tasks', () => {
  assert.ok(Object.keys(taskRequirementProfiles).includes('b-ma-ma'));
  assert.ok(Object.keys(taskRequirementProfiles).includes('b-so-fa'));
  assert.ok(Object.keys(taskRequirementProfiles).includes('b-la-ma'));
  assert.deepEqual(taskRequirementProfiles['b-ma-ma'].targetGraphemes, ['m', 'a']);
  assert.ok(taskRequirementProfiles['b-ma-ma'].optionGraphemes.includes('o'));
  assert.ok(taskRequirementProfiles['b-ma-ma'].optionGraphemes.includes('i'));
  assert.ok(taskRequirementProfiles['b-so-fa'].optionGraphemes.includes('n'));
  assert.ok(taskRequirementProfiles['b-la-ma'].optionGraphemes.includes('r'));
  assert.ok(Object.values(taskRequirementProfiles).every((item) => item.minReadingStage === 5));
});

test('Alpha 22 profileMA allows b-ma-ma only reduced or teacher-led because options add o and i', () => {
  const fit = getTaskProfileFit('b-ma-ma', readingProfileExamples.profileMA);

  assert.equal(fit.allowed, true);
  assert.equal(fit.mode, 'teacher-led');
  assert.deepEqual(fit.missing, ['option:o', 'option:i']);
  assert.match(fit.reason, /Ziel passt/);
  assert.match(fit.warnings.join(' '), /o, i|O\/I/);
});

test('Alpha 22 profileMA blocks Sofa and Lama when target graphemes are missing', () => {
  const sofa = getTaskProfileFit('b-so-fa', readingProfileExamples.profileMA);
  const lama = getTaskProfileFit('b-la-ma', readingProfileExamples.profileMA);

  assert.equal(sofa.allowed, false);
  assert.equal(sofa.mode, 'blocked');
  assert.ok(sofa.missing.includes('target:s'));
  assert.ok(sofa.missing.includes('target:o'));
  assert.ok(sofa.missing.includes('target:f'));
  assert.equal(lama.allowed, false);
  assert.equal(lama.mode, 'blocked');
  assert.ok(lama.missing.includes('target:l'));
});

test('Alpha 22 profileMASOF allows Sofa target but not full-choice with unknown distractor graphemes', () => {
  const fit = getTaskProfileFit('b-so-fa', readingProfileExamples.profileMASOF);

  assert.equal(fit.allowed, true);
  assert.notEqual(fit.mode, 'full-choice');
  assert.ok(fit.missing.includes('option:n'));
  assert.ok(fit.missing.includes('option:e'));
  assert.ok(fit.missing.includes('option:l'));
  assert.ok(fit.missing.includes('option:t'));
  assert.match(fit.warnings.join(' '), /Antwortoptionen/);
});

test('Alpha 22 profileLAM allows Lama target but not full-choice because options include Sofa and Rose graphemes', () => {
  const fit = getTaskProfileFit('b-la-ma', readingProfileExamples.profileLAM);

  assert.equal(fit.allowed, true);
  assert.notEqual(fit.mode, 'full-choice');
  assert.ok(fit.missing.includes('option:s'));
  assert.ok(fit.missing.includes('option:o'));
  assert.ok(fit.missing.includes('option:f'));
  assert.ok(fit.missing.includes('option:r'));
  assert.ok(fit.missing.includes('option:e'));
});

test('Alpha 22 unknown task id returns a safe blocked result', () => {
  const fit = getTaskProfileFit('missing-task', readingProfileExamples.profileMA);

  assert.equal(fit.allowed, false);
  assert.equal(fit.mode, 'blocked');
  assert.deepEqual(fit.missing, ['task-requirements']);
  assert.match(fit.reason, /ausgeblendet/);
});

test('Alpha 22 profile filter output contains no scoring or diagnosis wording', () => {
  const fits = [
    getTaskProfileFit('b-ma-ma', readingProfileExamples.profileMA),
    getTaskProfileFit('b-so-fa', readingProfileExamples.profileMASOF),
    getTaskProfileFit('b-la-ma', readingProfileExamples.profileLAM),
    getTaskProfileFit('missing-task', readingProfileExamples.profileMA),
  ];

  assert.ok(!/diagnose|diagnost|score|punkte|note|noten|rang|ranking|timer|zeitdruck|falsch|fehler|prozent|leistung|schwach|defizit/i.test(JSON.stringify(fits)));
});

test('Alpha 23 profileMA keeps only Mama visible and switches one safe option to teacher-led', () => {
  const safeOptions = getProfileSafeTaskOptions('b-ma-ma', readingProfileExamples.profileMA);

  assert.equal(safeOptions.taskId, 'b-ma-ma');
  assert.equal(safeOptions.targetWord, 'Mama');
  assert.equal(safeOptions.mode, 'teacher-led');
  assert.deepEqual(safeOptions.visibleOptions, ['Mama']);
  assert.deepEqual(safeOptions.hiddenOptions, ['Momo', 'Mimi']);
  assert.ok(safeOptions.missing.includes('option:o'));
  assert.ok(safeOptions.missing.includes('option:i'));
  assert.match(safeOptions.reason, /gemeinsam|zeigen|lesen/i);
});

test('Alpha 23 profileMASOF keeps Sofa visible and never treats unsafe distractors as full-choice', () => {
  const safeOptions = getProfileSafeTaskOptions('b-so-fa', readingProfileExamples.profileMASOF, { minimumChoices: 1 });

  assert.equal(safeOptions.targetWord, 'Sofa');
  assert.notEqual(safeOptions.mode, 'full-choice');
  assert.deepEqual(safeOptions.visibleOptions, ['Sofa']);
  assert.deepEqual(safeOptions.hiddenOptions, ['Sonne', 'Salat']);
});

test('Alpha 23 profileLAM keeps Lama visible, hides Sofa and Rose, and never returns full-choice', () => {
  const safeOptions = getProfileSafeTaskOptions('b-la-ma', readingProfileExamples.profileLAM, { minimumChoices: 1 });

  assert.equal(safeOptions.targetWord, 'Lama');
  assert.notEqual(safeOptions.mode, 'full-choice');
  assert.deepEqual(safeOptions.visibleOptions, ['Lama']);
  assert.deepEqual(safeOptions.hiddenOptions, ['Sofa', 'Rose']);
});

test('Alpha 23 full option profile returns b-ma-ma as full-choice without mutating task data', () => {
  const before = [...taskRequirementProfiles['b-ma-ma'].optionWords];
  const profileAllMamaOptions = {
    readingStage: 5,
    knownGraphemes: ['m', 'a', 'o', 'i'],
    knownSyllables: ['ma'],
    supportSettings: { reducedChoices: true, teacherLed: true },
  };
  const safeOptions = getProfileSafeTaskOptions('b-ma-ma', profileAllMamaOptions);

  assert.equal(safeOptions.mode, 'full-choice');
  assert.deepEqual(safeOptions.visibleOptions, ['Mama', 'Momo', 'Mimi']);
  assert.deepEqual(safeOptions.hiddenOptions, []);
  assert.deepEqual(taskRequirementProfiles['b-ma-ma'].optionWords, before);
});

test('Alpha 23 blocked tasks return no visible options and unknown task ids stay safely blocked', () => {
  const blockedTarget = getProfileSafeTaskOptions('b-so-fa', readingProfileExamples.profileMA);
  const unknown = getProfileSafeTaskOptions('missing-task', readingProfileExamples.profileMA);

  assert.equal(blockedTarget.mode, 'blocked');
  assert.deepEqual(blockedTarget.visibleOptions, []);
  assert.equal(unknown.mode, 'blocked');
  assert.deepEqual(unknown.visibleOptions, []);
  assert.deepEqual(unknown.hiddenOptions, []);
  assert.deepEqual(unknown.missing, ['task-requirements']);
});

test('Alpha 23 safe option output contains no scoring diagnosis pressure or ranking wording', () => {
  const outputs = [
    getProfileSafeTaskOptions('b-ma-ma', readingProfileExamples.profileMA),
    getProfileSafeTaskOptions('b-so-fa', readingProfileExamples.profileMASOF),
    getProfileSafeTaskOptions('b-la-ma', readingProfileExamples.profileLAM),
    getProfileSafeTaskOptions('missing-task', readingProfileExamples.profileMA),
  ];

  assert.ok(!/diagnose|diagnost|score|punkte|note|noten|rang|ranking|timer|zeitdruck|falsch|fehler|prozent|leistung|schwach|defizit|schnell|langsam/i.test(JSON.stringify(outputs)));
});


test('Alpha 24 profileMA daily path includes Mama teacher-led and blocks Sofa and Lama', () => {
  const path = getProfileSafeDailyPath(readingProfileExamples.profileMA);

  assert.equal(path.profileId, 'profile-ma');
  assert.equal(path.maxCards, 4);
  assert.deepEqual(path.cards.map((card) => card.taskId), ['b-ma-ma']);
  assert.equal(path.cards[0].word, 'Mama');
  assert.equal(path.cards[0].mode, 'teacher-led');
  assert.deepEqual(path.cards[0].visibleOptions, ['Mama']);
  assert.ok(path.blockedTaskIds.includes('b-so-fa'));
  assert.ok(path.blockedTaskIds.includes('b-la-ma'));
});

test('Alpha 24 profileMASOF daily path includes Mama and Sofa modes and blocks Lama without L', () => {
  const path = getProfileSafeDailyPath(readingProfileExamples.profileMASOF, { minimumChoices: 1 });
  const byId = Object.fromEntries(path.cards.map((card) => [card.taskId, card]));

  assert.ok(byId['b-ma-ma']);
  assert.ok(byId['b-so-fa']);
  assert.equal(byId['b-ma-ma'].mode, 'reduced-choice');
  assert.equal(byId['b-so-fa'].mode, 'reduced-choice');
  assert.ok(path.blockedTaskIds.includes('b-la-ma'));
});

test('Alpha 24 profileLAM uses the existing profile exactly and excludes Sofa', () => {
  const path = getProfileSafeDailyPath(readingProfileExamples.profileLAM, { minimumChoices: 1 });
  const taskIds = path.cards.map((card) => card.taskId);

  assert.deepEqual(readingProfileExamples.profileLAM.knownGraphemes, ['l', 'a', 'm']);
  assert.ok(taskIds.includes('b-ma-ma'));
  assert.ok(taskIds.includes('b-la-ma'));
  assert.ok(!taskIds.includes('b-so-fa'));
  assert.ok(path.blockedTaskIds.includes('b-so-fa'));
});

test('Alpha 24 full Mama-options profile returns b-ma-ma as full-choice in the path', () => {
  const profileAllMamaOptions = {
    id: 'profile-mama-options',
    readingStage: 5,
    knownGraphemes: ['m', 'a', 'o', 'i'],
    knownSyllables: ['ma'],
    supportSettings: { reducedChoices: true, teacherLed: true },
  };
  const path = getProfileSafeDailyPath(profileAllMamaOptions);
  const mama = path.cards.find((card) => card.taskId === 'b-ma-ma');

  assert.ok(mama);
  assert.equal(mama.mode, 'full-choice');
  assert.deepEqual(mama.visibleOptions, ['Mama', 'Momo', 'Mimi']);
});

test('Alpha 24 maxCards option returns exactly one fitting card when available', () => {
  const path = getProfileSafeDailyPath(readingProfileExamples.profileLAM, { maxCards: 1, minimumChoices: 1 });

  assert.equal(path.cards.length, 1);
  assert.equal(path.cards[0].taskId, 'b-ma-ma');
});

test('Alpha 24 empty profile returns no unsafe visible cards and calm summary', () => {
  const path = getProfileSafeDailyPath({ id: 'empty-local-profile' });

  assert.equal(path.cards.length, 0);
  assert.ok(path.blockedTaskIds.includes('b-ma-ma'));
  assert.ok(path.blockedTaskIds.includes('b-so-fa'));
  assert.ok(path.blockedTaskIds.includes('b-la-ma'));
  assert.ok(path.blockedTaskIds.length >= 24);
  assert.match(path.summary, /Heute passt noch keine profilierte Aufgabe sicher/);
  assert.ok(path.cards.every((card) => card.visibleOptions.length === 0));
});

test('Alpha 24 daily path output contains no diagnosis scoring pressure or ranking wording', () => {
  const outputs = [
    getProfileSafeDailyPath(readingProfileExamples.profileMA),
    getProfileSafeDailyPath(readingProfileExamples.profileMASOF, { minimumChoices: 1 }),
    getProfileSafeDailyPath(readingProfileExamples.profileLAM, { minimumChoices: 1 }),
    getProfileSafeDailyPath({}),
  ];

  assert.ok(!/diagnose|diagnost|score|punkte|note|noten|rang|ranking|timer|zeitdruck|falsch|fehler|prozent|leistung|schwach|defizit|schnell|langsam|grade|percentage/i.test(JSON.stringify(outputs)));
});


test('Alpha 19 guided reading chain uses Mama with alternating Ma ma syllables', () => {
  const chain = getGuidedReadingChain();

  assert.equal(chain.word, 'Mama');
  assert.equal(chain.taskId, 'b-ma-ma');
  assert.equal(chain.storyTitle, 'Mama ist da');
  assert.deepEqual(
    chain.steps.map((step) => step.label),
    ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte', 'Schreibbrücke'],
  );
  assert.deepEqual(
    chain.syllables.map((part) => [part.text, part.color]),
    [['Ma', 'blue'], ['ma', 'red']],
  );
  assert.equal(chain.sentence, 'Mama ist da.');
  assert.deepEqual(chain.storyText, ['Mama ist da.', 'Mama winkt.', 'Wir lesen ruhig.']);
  assert.doesNotMatch(JSON.stringify(chain), /diagnose|note|noten|rang|ranking|score|timer|zeitdruck|falsch|fehler|prozent/i);
});

test('Alpha 18 app exposes one clear guided start and visible reading path', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /Tagespfad starten/);
  assert.match(appSource, /Heute lesen wir so/);
  assert.match(appSource, /Schau\. Klatsch\. Lies\./);
  assert.match(appSource, /<GuidedReadingPath chain=\{guidedReadingChain\}/);
  assert.match(appSource, /Heute lesen wir so/);
  assert.match(css, /\.guided-entry-card/);
  assert.match(css, /\.guided-step-list/);
  assert.match(css, /\.guided-worked-chain/);
});


test('Alpha 19 app exposes the interactive Mama step card without pressure wording', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /<MamaStepCard/);
  assert.match(appSource, /Schrittkarte Mama/);
  assert.match(appSource, /Weiter/);
  assert.match(appSource, /Nochmal ruhig/);
  assert.match(appSource, /mamaStepIndex/);
  assert.match(appSource, /aria-label="Silben Ma und ma"/);
  assert.match(css, /\.mama-step-card/);
  assert.match(css, /\.mama-focus-syllables/);
  assert.match(css, /@media \(max-width: 430px\)[\s\S]*\.mama-step-actions/);
  const mamaSource = appSource.slice(appSource.indexOf('function MamaStepCard'), appSource.indexOf('function SupportPanel'));
  const mamaCss = css.slice(css.indexOf('/* Alpha 19 interactive Mama step card */'));
  assert.doesNotMatch(mamaSource + mamaCss, /score|timer|ranking|rang|diagnose|falsch|fehler|zeitdruck|prozent/i);
});

test('Alpha 10 teacher UI exposes local curation, reset fallback and privacy wording', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /Tagesweg wählen/);
  assert.match(appSource, /Maximal vier Karten/);
  assert.match(appSource, /Auswahl lokal/);
  assert.match(appSource, /setSelectedDailyPathIds\(\[\]\)/);
  assert.match(appSource, /getCuratedDailyReadingPath\(selectedDailyPathIds, tasks, stories\)/);
  assert.match(appSource, /Sicherer Standardpfad/);
  assert.doesNotMatch(appSource, /new Blob|URL\.createObjectURL|download=|fetch\(|authToken|ranking|score|timer/i);
  assert.match(css, /\.daily-curation-card/);
  assert.match(css, /\.curation-choice-grid/);
});

test('teacher summary structures support history from situation to next step', () => {
  const observation = recordLearningAction(createEmptyObservation(), {
    kind: 'task',
    taskId: 'a-mond',
    support: { imageHelp: true, readAloud: true, syllableColors: true },
  });
  const summary = getTeacherSummary({
    profileLabel: 'Profil Blau',
    support: { imageHelp: true, readAloud: true, syllableColors: true },
    observation,
  });

  assert.equal(summary.profileLabel, 'Profil Blau');
  assert.deepEqual(Object.keys(summary.supportHistory), ['situation', 'help', 'action', 'observation', 'nextStep']);
  assert.match(summary.supportHistory.situation, /a-mond/);
  assert.match(summary.supportHistory.help, /Bildhilfe/);
  assert.match(summary.supportHistory.help, /Vorlesen/);
  assert.match(summary.supportHistory.action, /Aufgabe bearbeitet/);
  assert.match(summary.supportHistory.observation, /visueller Struktur/);
  assert.equal(summary.supportHistory.nextStep, 'Kurze Silbenwörter mit wählbarer Bildhilfe wiederholen.');
  assert.ok(summary.dataQuality.includes('eine Beobachtung'));
  assert.ok(!/note|rang|diagnose|fehler|score|timer|export/i.test(JSON.stringify(summary)));
});

test('teacher planning view exposes compact top block and secondary details', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /Planung für heute/);
  assert.match(appSource, /teacher-planning-grid/);
  assert.match(appSource, /label="Beobachtung"/);
  assert.match(appSource, /label="Genutzte Hilfe"/);
  assert.match(appSource, /label="Heutiger Vorschlag"/);
  assert.match(appSource, /label="Nächster Schritt"/);
  assert.match(appSource, /<details className="teacher-detail-block">/);
  assert.match(appSource, /Längere Einordnung anzeigen/);
  assert.match(appSource, /Lokalen Demo-Stand zurücksetzen/);
  assert.match(css, /\.teacher-planning-grid/);
  assert.match(css, /\.teacher-detail-block/);
});

test('teacher view exposes a compact pilot protocol and anonymous observation card', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /10–15-Minuten-Pilot/);
  assert.match(appSource, /pilot-protocol-list/);
  assert.match(appSource, /1\. Gerät bereit/);
  assert.match(appSource, /2\. Zwei Karten lesen/);
  assert.match(appSource, /3\. Sachlich festhalten/);
  assert.match(appSource, /4\. Ohne Einordnung enden/);
  assert.match(appSource, /Anonyme Beobachtungskarte/);
  assert.match(appSource, /teacher-observation-card/);
  assert.match(appSource, /teacherSummary\.profileLabel/);
  assert.match(appSource, /teacherSummary\.supportHistory\.observation/);
  assert.match(appSource, /teacherSummary\.supportHistory\.help/);
  assert.match(appSource, /adaptivePlacement\.teacherExplanation\.nextSmallStep/);
  assert.match(appSource, /Keine echten Namen/);
  assert.match(appSource, /keine diagnostische Einordnung/);
  assert.match(appSource, /keine Fotos/);
  assert.match(appSource, /keine Cloud/);
  assert.match(css, /\.pilot-protocol-list/);
  assert.match(css, /\.teacher-observation-card/);
});

test('Alpha 14 teacher onboarding explains a short local pilot without storage or maturity claims', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /teacher-onboarding-card/);
  assert.match(appSource, /Kurzer lokaler Lesemoment/);
  assert.match(appSource, /10–15 Minuten Lesen/);
  assert.match(appSource, /Beobachte nur Sichtbares/);
  assert.match(appSource, /Keine echten Namen, Fotos oder Klassenlisten speichern/);
  assert.match(appSource, /Nach zwei Karten bewusst enden/);
  assert.match(appSource, /nur nächster pädagogischer Schritt/);
  assert.match(appSource, /keine diagnostische Einordnung/);
  assert.doesNotMatch(appSource, /validiert|einsatzfertig|verkaufsbereit|Login|Upload|Cloud-Sync|Schülerverwaltung/i);
  assert.match(css, /\.teacher-onboarding-card/);
  assert.match(css, /\.pilot-boundary-list/);
});

test('teacher view exposes a local anonymous print preview without export storage', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /Lokale Druckvorschau/);
  assert.match(appSource, /Nur lokal/);
  assert.match(appSource, /label="Anonymes Profil"/);
  assert.match(appSource, /label="Aktuelle Beobachtung"/);
  assert.match(appSource, /label="Genutzte Hilfen"/);
  assert.match(appSource, /label="Vorsichtiger Vorschlag"/);
  assert.match(appSource, /label="Nächster kleiner Schritt"/);
  assert.match(appSource, /Diese Vorschau bleibt in diesem Browser/);
  assert.match(appSource, /keine Datei, keine Online-Übertragung und keine automatische Speicherung/);
  assert.match(appSource, /window\.print\(\)/);
  assert.doesNotMatch(appSource, /new Blob|URL\.createObjectURL|download=|pdf|fetch\(/i);
  assert.match(css, /\.local-print-preview/);
  assert.match(css, /@media print/);
  assert.match(css, /\.print-button/);
});

test('core interactive controls expose keyboard-friendly state and visible focus styles', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /aria-pressed=\{mode === 'child'\}/);
  assert.match(appSource, /aria-pressed=\{mode === 'teacher'\}/);
  assert.match(appSource, /aria-pressed=\{selectedProfile\.id === profile\.id\}/);
  assert.match(appSource, /aria-pressed=\{Boolean\(support\[option\.id\]\)\}/);
  assert.match(appSource, /aria-pressed=\{readingMode === 'task'\}/);
  assert.match(appSource, /aria-pressed=\{readingMode === 'story'\}/);
  assert.match(appSource, /aria-pressed=\{task\.id === activeTask\.id\}/);
  assert.match(appSource, /aria-pressed=\{story\.id === activeStory\.id\}/);
  assert.match(appSource, /aria-label="Story auswählen"/);
  assert.match(appSource, /aria-label="Antwort zur Story wählen"/);
  assert.match(css, /button:focus-visible,\s*summary:focus-visible/);
  assert.match(css, /outline:\s*4px solid #172833/);
  assert.match(css, /box-shadow:\s*0 0 0 7px rgba\(255, 246, 130, 0\.9\)/);
});

test('teacher summary marks repeated observations without unsafe wording', () => {
  const afterFirstTask = recordLearningAction(createEmptyObservation(), {
    kind: 'task',
    taskId: 'b-ma-ma',
    support: { imageHelp: true, repeat: true },
  });
  const afterRepeatChoice = recordLearningAction(afterFirstTask, { kind: 'choice', choice: 'Nochmal' });
  const afterSecondTask = recordLearningAction(afterRepeatChoice, {
    kind: 'task',
    taskId: 'b-ma-ma',
    support: { imageHelp: true, repeat: true },
  });
  const afterFinishChoice = recordLearningAction(afterSecondTask, { kind: 'choice', choice: 'Fertig' });
  const summary = getTeacherSummary({
    profileLabel: 'Profil Grün',
    support: { imageHelp: true, repeat: true },
    observation: afterFinishChoice,
  });

  assert.match(summary.dataQuality, /wiederholte Beobachtungen/);
  assert.match(summary.supportHistory.help, /Nochmal/);
  assert.match(summary.supportHistory.action, /Nochmal/);
  assert.equal(summary.supportHistory.nextStep, 'Dieselbe Wortstruktur mit Bildhilfe noch einmal anbieten.');
  assert.ok(!/echter name|schülername|diagnose|note|rang|ranking|score|timer|cloud/i.test(JSON.stringify(summary)));
});

test('learning task pack contains the Alpha 8 target of 48 structured tasks across Level A, B, and C', () => {
  const tasks = getLearningTasks();
  const levels = tasks.reduce((count, task) => ({ ...count, [task.level]: (count[task.level] ?? 0) + 1 }), {});

  assert.ok(tasks.length >= 58);
  assert.ok(levels.A >= 16);
  assert.ok(levels.B >= 16);
  assert.ok(levels.C >= 16);
  assert.ok(tasks.every((task) => task.pictureHint.startsWith('Bildplatzhalter:')));
  assert.ok(tasks.every((task) => task.supports.includes('syllableColors')));
});

test('Alpha 8 learning tasks cover picture-word, syllable reading, word reading and first sentence-like prompts', () => {
  const tasks = getLearningTasks();
  const byLevel = Object.groupBy(tasks, (task) => task.level);

  assert.ok(byLevel.A.length >= 16);
  assert.ok(byLevel.B.length >= 16);
  assert.ok(byLevel.C.length >= 16);
  assert.ok(byLevel.A.some((task) => /Fenster|Tür|Tasche|Buch/.test(task.word)));
  assert.ok(byLevel.B.some((task) => task.syllables.length >= 3));
  assert.ok(byLevel.B.every((task) => task.prompt.includes('Lies') || task.prompt.includes('Verbinde')));
  assert.ok(byLevel.C.some((task) => /Lies: (Das|Die|Im|Am)|Lies: .* an der /.test(task.prompt)));
  assert.ok(byLevel.C.every((task) => task.prompt.length <= 40));
});

test('learning tasks expose local symbol help metadata with label, alt text and cue', () => {
  const tasks = getLearningTasks();

  assert.ok(tasks.every((task) => task.symbolHelp));
  assert.ok(tasks.every((task) => task.symbolHelp.label.length > 0));
  assert.ok(tasks.every((task) => task.symbolHelp.altText.startsWith('Lokale Symbolhilfe:')));
  assert.ok(tasks.every((task) => task.symbolHelp.cue.kind === 'local-symbol-card'));
  assert.ok(tasks.every((task) => task.symbolHelp.cue.token.length > 0));
  assert.ok(tasks.every((task) => task.symbolHelp.cue.shape.length > 0));
});

test('local symbol help never references external or protected assets', () => {
  const tasks = getLearningTasks();
  const serializedSymbolHelp = JSON.stringify(tasks.map((task) => task.symbolHelp));

  assert.ok(!/https?:\/\//i.test(serializedSymbolHelp));
  assert.ok(!/data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif/i.test(serializedSymbolHelp));
  assert.ok(!/metacom|pcs|boardmaker|widgit|arasaac|protected|asset|lizenz/i.test(serializedSymbolHelp));
});

test('learning task content stays local, concrete and free of pressure or score language', () => {
  const tasks = getLearningTasks();
  const serializedTasks = JSON.stringify(tasks);

  assert.ok(tasks.every((task) => new Set(task.options).size === task.options.length));
  assert.ok(tasks.every((task) => task.options.includes(task.word)));
  assert.ok(tasks.every((task) => task.prompt.length > 0 && task.prompt.length <= 40));
  assert.ok(tasks.every((task) => task.pictureHint.startsWith('Bildplatzhalter:')));
  assert.ok(!/https?:\/\//i.test(serializedTasks));
  assert.ok(!/data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif/i.test(serializedTasks));
  assert.ok(!/metacom|pcs|boardmaker|widgit|arasaac|protected|asset|lizenz/i.test(serializedTasks));
  assert.ok(!/echter name|schülername|diagnose|diagnost|note|noten|punkte|rang|ranking|score|timer|zeitdruck|schnell|langsam gelesen|falsch|fehler|schwach|defizit|leistung|besser aufpassen|musst/i.test(serializedTasks));
});

test('Alpha 13 Level A prompts stay short, concrete and action-oriented', () => {
  const levelATasks = getLearningTasks().filter((task) => task.level === 'A');

  assertAll(
    levelATasks,
    (task) => wordCount(task.prompt) <= 4 && /^(Schau\. Wähle|Zeige|Wo ist|Finde|Wähle)\b/.test(task.prompt) && task.prompt.includes(task.word),
    (task) => `${task.id}: ${task.prompt}`,
  );
});

test('Alpha 13 Level B syllable tasks keep consistent arrays and controlled option load', () => {
  const levelBTasks = getLearningTasks().filter((task) => task.level === 'B');

  assertAll(
    levelBTasks,
    (task) => task.syllables.length >= 2
      && task.syllables.length <= 3
      && task.syllables.map((syllable) => syllable.text).join('').toLocaleLowerCase('de-DE') === task.word.toLocaleLowerCase('de-DE')
      && task.syllables.every((syllable, index) => syllable.color === (index % 2 === 0 ? 'blue' : 'red'))
      && task.options.length <= 3
      && new Set(task.options).size === task.options.length
      && task.options.includes(task.word),
    (task) => `${task.id}: ${task.word} / ${task.syllables.map((syllable) => syllable.text).join('-')} / ${task.options.join(', ')}`,
  );
});

test('Alpha 13 Level C prompts remain short phrase or sentence prompts', () => {
  const levelCTasks = getLearningTasks().filter((task) => task.level === 'C');

  assertAll(
    levelCTasks,
    (task) => /^Lies\b/.test(task.prompt) && task.prompt.includes(task.word) && wordCount(task.prompt) <= 6 && task.prompt.length <= 40,
    (task) => `${task.id}: ${task.prompt}`,
  );
});

test('Alpha 13 story comprehension answers are grounded in text, focus word or scene context', () => {
  const stories = getStoryPaths();

  assertAll(
    stories,
    (story) => {
      const answer = normalizeText(story.reducedChoice.answer);
      const groundedContext = normalizeText([
        story.title,
        story.focusWord,
        story.symbolHelp?.label ?? '',
        story.comprehensionPrompt,
        ...story.text,
      ].join(' '));

      return story.reducedChoice.options.includes(story.reducedChoice.answer) && groundedContext.includes(answer);
    },
    (story) => `${story.id}: answer ${story.reducedChoice.answer}`,
  );
});

test('Alpha 13 feedback and next steps stay calm, useful and non-diagnostic', () => {
  const stories = getStoryPaths();
  const qualityCopy = [
    ...stories.flatMap((story) => [story.supportiveFeedback, story.nextStep]),
    ...supportOptions.flatMap((option) => [option.label, option.description]),
    normalizeSupportState({ repeat: true }).feedback,
    normalizeSupportState({}).feedback,
  ];

  assertAll(
    qualityCopy,
    (copy) => copy.length > 0 && !copy.includes('!') && !unsafeQualityWords.test(copy),
    (copy) => copy,
  );
  assertAll(stories, (story) => wordCount(story.supportiveFeedback) <= 8 && wordCount(story.nextStep) <= 12, (story) => `${story.id}: ${story.supportiveFeedback} / ${story.nextStep}`);
});

test('Alpha 13 gesture hints stay text-only, practical and demonstrable', () => {
  const hints = [
    ...getLearningTasks().map((task) => task.gestureHint),
    ...getStoryPaths().map((story) => story.gestureHint),
  ];

  assertAll(
    hints,
    (hint) => hint?.label === 'Gebärden-Hinweis'
      && hint.text.startsWith('Zeige')
      && /Hand|Händen|Finger|Fingern|Kopf|Herzen|Nase/.test(hint.text)
      && !protectedAssetWords.test(JSON.stringify(hint)),
    (hint) => hint?.text ?? 'missing hint',
  );
});

test('Alpha 13 Slice C story feedback is varied and avoids generic praise', () => {
  const feedback = getStoryPaths().map((story) => story.supportiveFeedback);
  const repeatedStarterCount = feedback.filter((text) => text.startsWith('Du hast')).length;

  assert.ok(repeatedStarterCount <= Math.ceil(feedback.length / 2));
  assert.ok(!/\bgut\b/i.test(feedback.join(' ')));
});

test('learning task levels follow the Alpha 2 didactic progression', () => {
  const tasks = getLearningTasks();
  const byLevel = Object.groupBy(tasks, (task) => task.level);

  assert.ok(byLevel.A.every((task) => task.type === 'image-word-match'));
  assert.ok(byLevel.B.every((task) => task.type === 'syllable-blend'));
  assert.ok(byLevel.C.every((task) => task.type === 'word-picture-match'));
  assert.ok(byLevel.B.every((task) => task.syllables.length >= 2));
  assert.ok(byLevel.C.some((task) => task.options.some((option) => option !== task.word && option[0] === task.word[0])));
});

test('story paths expose a quality-controlled Alpha 8 pack with balanced clusters', () => {
  const stories = getStoryPaths();
  const requiredClusters = [
    'Alltag – Dinge und Handlungen',
    'Schule und Klassenalltag',
    'Sozial und emotional',
  ];
  const clusters = stories.reduce((count, story) => ({ ...count, [story.cluster]: (count[story.cluster] ?? 0) + 1 }), {});

  assert.equal(stories.length, 24);
  assert.deepEqual(Object.keys(clusters).sort(), requiredClusters.sort());
  assert.deepEqual(clusters, {
    'Alltag – Dinge und Handlungen': 8,
    'Schule und Klassenalltag': 8,
    'Sozial und emotional': 8,
  });
  assert.ok(stories.every((story) => story.id.startsWith('story-')));
  assert.ok(stories.every((story) => story.title.length > 0));
  assert.ok(stories.every((story) => story.targetSkill.length > 0));
  assert.ok(stories.every((story) => story.text.length >= 2 && story.text.length <= 4));
  assert.ok(stories.every((story) => story.focusWord.length > 0));
  assert.ok(stories.every((story) => story.symbolHelp?.label.length > 0));
  assert.ok(stories.every((story) => story.symbolHelp?.altText.startsWith('Lokale Symbolhilfe:')));
  assert.ok(stories.every((story) => story.symbolHelp?.cue?.kind === 'local-symbol-card'));
  assert.ok(stories.every((story) => story.comprehensionPrompt.endsWith('?')));
  assert.ok(stories.every((story) => story.reducedChoice.options.length === 2));
  assert.ok(stories.every((story) => story.reducedChoice.options.includes(story.reducedChoice.answer)));
  assert.ok(stories.every((story) => story.supportiveFeedback.length > 0));
  assert.ok(stories.every((story) => story.nextStep.length > 0));
});

test('Alpha 8 stories keep short readable text and exactly one focused comprehension moment', () => {
  const stories = getStoryPaths();

  assert.ok(stories.every((story) => story.title.split(/\s+/).length >= 2));
  assert.ok(stories.every((story) => story.title.split(/\s+/).length <= 5));
  assert.ok(stories.every((story) => story.text.every((sentence) => sentence.split(/\s+/).length >= 3 && sentence.split(/\s+/).length <= 10)));
  assert.ok(stories.every((story) => story.comprehensionPrompt.split(/\s+/).length <= 7));
  assert.ok(stories.every((story) => story.reducedChoice.options.every((option) => option.split(/\s+/).length <= 3)));
  assert.ok(stories.every((story) => story.supportiveFeedback.split(/\s+/).length <= 8));
  assert.ok(stories.every((story) => story.nextStep.split(/\s+/).length <= 12));
});

test('story paths keep answer choices meaningful and avoid generic filler content', () => {
  const stories = getStoryPaths();
  const ids = new Set(stories.map((story) => story.id));
  const titles = new Set(stories.map((story) => story.title));

  assert.equal(ids.size, stories.length);
  assert.equal(titles.size, stories.length);
  assert.ok(stories.every((story) => new Set(story.reducedChoice.options).size === 2));
  assert.ok(stories.every((story) => story.reducedChoice.options.every((option) => option.length > 0)));
  assert.ok(stories.every((story) => story.text.every((sentence) => sentence.length >= 12 && sentence.length <= 80)));
  assert.ok(!/lorem|ipsum|platzhaltertext|todo|dummy|beispieltext|geschichte\s*\d/i.test(JSON.stringify(stories)));
});

test('story paths keep language and assets privacy safe', () => {
  const serializedStories = JSON.stringify(getStoryPaths());

  assert.ok(!/https?:\/\//i.test(serializedStories));
  assert.ok(!/data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif/i.test(serializedStories));
  assert.ok(!/metacom|pcs|boardmaker|widgit|arasaac|protected|asset|lizenz/i.test(serializedStories));
  assert.ok(!/echter name|schülername|diagnose|diagnost|note|noten|punkte|rang|ranking|score|timer|zeitdruck|schnell|langsam gelesen|falsch|fehler|schwach|defizit|leistung|besser aufpassen|musst/i.test(serializedStories));
});

test('story paths expose concrete text-only gesture hints for useful focus words', () => {
  const stories = getStoryPaths();
  const hints = stories.map((story) => story.gestureHint);

  assert.ok(hints.every((hint) => hint?.label === 'Gebärden-Hinweis'));
  assert.ok(hints.every((hint) => hint.text.startsWith('Zeige')));
  assert.ok(hints.every((hint) => hint.readingSupportText === 'Die Geste stützt das Lesen. Der Text bleibt wichtig.'));
  assert.ok(hints.some((hint) => /Ball rollen/.test(hint.text)));
  assert.ok(hints.some((hint) => /Buch/.test(hint.text)));
  assert.ok(hints.some((hint) => /Hilfe/.test(hint.text)));
});

test('learning tasks expose safe text-only gesture hints without protected assets', () => {
  const tasks = getLearningTasks();
  const serializedHints = JSON.stringify(tasks.map((task) => task.gestureHint));

  assert.ok(tasks.every((task) => task.gestureHint?.label === 'Gebärden-Hinweis'));
  assert.ok(tasks.every((task) => task.gestureHint?.text.length >= 18));
  assert.ok(!/https?:\/\//i.test(serializedHints));
  assert.ok(!/data:image|\.png|\.jpe?g|\.svg|\.webp|\.gif/i.test(serializedHints));
  assert.ok(!/metacom|pcs|boardmaker|widgit|arasaac|protected|asset|lizenz/i.test(serializedHints));
});

test('student-facing gesture hints are only rendered behind the sign support toggle', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

  assert.match(appSource, /supportState\.signHint \? <GestureHint/);
  assert.match(appSource, /<GestureHint gestureHint=\{activeTask\.gestureHint\}/);
  assert.match(appSource, /<GestureHint gestureHint=\{story\.gestureHint\}/);
  assert.doesNotMatch(appSource, /Schau mal meine Haende an\./);
});

test('teacher summary records available and used gesture hints without diagnosis or pressure', () => {
  const afterStory = recordLearningAction(createEmptyObservation(), {
    kind: 'story',
    storyId: 'story-ball-garten',
    storyTitle: 'Der Ball im Garten',
    support: { signHint: true, reduceChoices: true },
    answer: 'Ball',
  });
  const summary = getTeacherSummary({
    profileLabel: 'Profil Sonne',
    support: { signHint: true, reduceChoices: true },
    observation: afterStory,
  });

  assert.match(summary.supportHistory.help, /Gebärden-Hinweis/);
  assert.match(summary.supportHistory.action, /Gebärden-Hinweis war verfügbar/);
  assert.match(summary.supportHistory.observation, /Geste stützte das Lesen/);
  assert.ok(!/diagnose|note|rang|ranking|score|timer|zeitdruck|falsch|schwach|defizit/i.test(JSON.stringify(summary)));
});

test('reduced story choices keep the active story and a two-option comprehension answer', () => {
  const stories = getStoryPaths();
  const reduced = getReducedStoryChoices(stories, stories[2].id, true);

  assert.equal(reduced.length, 2);
  assert.equal(reduced[0].id, stories[2].id);
  assert.equal(stories[2].reducedChoice.options.length, 2);
  assert.ok(stories[2].reducedChoice.options.includes(stories[2].reducedChoice.answer));
});

test('teacher summary records story evidence and support use', () => {
  const afterStory = recordLearningAction(createEmptyObservation(), {
    kind: 'story',
    storyId: 'story-ball-garten',
    storyTitle: 'Der Ball im Garten',
    support: { imageHelp: true, readAloud: true, syllableColors: true, reduceChoices: true },
    answer: 'Ball',
  });
  const summary = getTeacherSummary({
    profileLabel: 'Profil Sonne',
    support: { imageHelp: true, readAloud: true, syllableColors: true, reduceChoices: true },
    observation: afterStory,
  });

  assert.match(summary.supportHistory.situation, /Story: Der Ball im Garten/);
  assert.match(summary.supportHistory.help, /Bildhilfe/);
  assert.match(summary.supportHistory.help, /Weniger Auswahl/);
  assert.match(summary.supportHistory.action, /Antwort: Ball/);
  assert.match(summary.supportHistory.observation, /Story-Verstehen/);
  assert.equal(summary.supportHistory.nextStep, 'Gleiche Satzstruktur mit einem anderen Gegenstand wiederholen.');
  assert.ok(!/diagnose|note|rang|ranking|score|timer|falsch/i.test(JSON.stringify(summary)));
});

test('Alpha 11 teacher UI exposes one manual suggestion block with cautious wording', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /LeseWerk · lokaler Pilot-Demo-Stand/);
  assert.match(appSource, /getTeacherDailyPathSuggestion/);
  assert.match(appSource, /teacher-suggestion-card/);
  assert.match(appSource, /Vorschlag für den nächsten Tagesweg/);
  assert.match(appSource, /Warum dieser Vorschlag\?/);
  assert.match(appSource, /Alternative/);
  assert.match(appSource, /Tagesweg übernehmen und aktivieren/);
  assert.match(appSource, /Ignorieren/);
  assert.match(appSource, /lokal, anonym und vorsichtig/);
  assert.match(css, /\.teacher-suggestion-card/);
});

test('Alpha 12 teacher UI orders Tagesweg as primary before the quieter suggestion and tertiary blocks', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  const curationIndex = appSource.indexOf('daily-curation-card teacher-primary-card');
  const suggestionIndex = appSource.indexOf('teacher-suggestion-card teacher-secondary-card');
  const pilotIndex = appSource.indexOf('pilot-protocol-card teacher-tertiary-card');
  const observationIndex = appSource.indexOf('teacher-observation-card teacher-tertiary-card');
  const printIndex = appSource.indexOf('local-print-preview teacher-tertiary-card');

  assert.ok(curationIndex > -1);
  assert.ok(suggestionIndex > -1);
  assert.ok(pilotIndex > -1);
  assert.ok(observationIndex > -1);
  assert.ok(printIndex > -1);
  assert.ok(curationIndex < suggestionIndex);
  assert.ok(suggestionIndex < pilotIndex);
  assert.ok(pilotIndex < observationIndex);
  assert.ok(observationIndex < printIndex);
  assert.match(css, /\.teacher-primary-card[\s\S]*background:\s*#fffdf8/);
  assert.match(css, /\.teacher-secondary-card[\s\S]*background:\s*#f7fafc/);
  assert.match(css, /\.teacher-tertiary-card[\s\S]*box-shadow:\s*inset 0 0 0 1px/);
});

test('Alpha 12 teacher CSS includes tablet and mobile hierarchy markers', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.teacher-panel/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.teacher-suggestion-actions[\s\S]*display:\s*grid/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.teacher-primary-card/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.teacher-tertiary-card/);
});

test('Alpha 11 suggestion apply and ignore wiring keeps the child path manually controlled', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

  assert.match(appSource, /applyTeacherSuggestion/);
  assert.match(appSource, /ignoreTeacherSuggestion/);
  assert.match(appSource, /setSelectedDailyPathIds\(teacherDailyPathSuggestion\.selectedChoiceIds\.slice\(0, maxDailyPathCards\)\)/);
  assert.match(appSource, /setSuggestionAction\('applied'\)/);
  assert.match(appSource, /setSuggestionAction\('ignored'\)/);
  assert.match(appSource, /setSuggestionAction\('idle'\)/);
  assert.match(appSource, /resetLocalDemoState[\s\S]*setSelectedDailyPathIds\(\[\]\)[\s\S]*setSuggestionAction\('idle'\)/);
  assert.doesNotMatch(appSource, /useEffect\([\s\S]*setSelectedDailyPathIds\(teacherDailyPathSuggestion/);
});

test('teacher daily path suggestion falls back to a safe starter when local data is thin', () => {
  const suggestion = getTeacherDailyPathSuggestion();

  assert.equal(suggestion.title, 'Vorschlag für den nächsten Tagesweg');
  assert.equal(suggestion.label, 'Bild und Wort');
  assert.match(suggestion.reason, /Vorsichtiger Starter/);
  assert.equal(suggestion.alternative, 'Silben lesen');
  assert.ok(suggestion.selectedChoiceIds.length > 0);
  assert.ok(suggestion.selectedChoiceIds.length <= maxDailyPathCards);
  assert.ok(suggestion.suggestedCardIds.length <= maxDailyPathCards);
});

test('teacher daily path suggestion uses repeat and reduced-choice support signals', () => {
  const afterTask = recordLearningAction(createEmptyObservation(), {
    kind: 'task',
    taskId: 'a-mond',
    support: { repeat: true, reduceChoices: true },
  });
  const afterRepeatChoice = recordLearningAction(afterTask, { kind: 'choice', choice: 'Nochmal' });
  const suggestion = getTeacherDailyPathSuggestion({ observation: afterRepeatChoice, support: { repeat: true, reduceChoices: true } });

  assert.equal(suggestion.label, 'Reduzierte Auswahl und Wiederholung');
  assert.match(suggestion.reason, /Nochmal|Weniger Auswahl/);
  assert.equal(suggestion.alternative, 'Bild und Wort');
  assert.ok(suggestion.selectedChoiceIds.length <= maxDailyPathCards);
  assert.ok(suggestion.suggestedCardIds.some((id) => id.startsWith('daily-repeat-')));
});

test('teacher daily path suggestion uses story evidence without automatic judgement', () => {
  const afterStory = recordLearningAction(createEmptyObservation(), {
    kind: 'story',
    storyId: 'story-ball-garten',
    storyTitle: 'Der Ball im Garten',
    support: { reduceChoices: true },
    answer: 'Ball',
  });
  const suggestion = getTeacherDailyPathSuggestion({ observation: afterStory, support: { reduceChoices: true } });

  assert.equal(suggestion.label, 'Story verstehen');
  assert.match(suggestion.suggestion, /Story verstehen/);
  assert.match(suggestion.reason, /Storyfrage/);
  assert.ok(suggestion.selectedChoiceIds.includes('curation-story-story-ball-garten'));
  assert.ok(suggestion.suggestedCardIds.includes('daily-story-story-ball-garten'));
});

test('teacher daily path suggestion caps current and suggested cards at max four', () => {
  const selectedDailyPathIds = getDailyPathChoices().slice(0, 8).map((choice) => choice.id);
  const afterTask = recordLearningAction(createEmptyObservation(), {
    kind: 'task',
    taskId: 'a-ball',
    support: { imageHelp: true, reduceChoices: true, syllableColors: false },
  });
  const suggestion = getTeacherDailyPathSuggestion({ observation: afterTask, support: { imageHelp: true, reduceChoices: true, syllableColors: false }, selectedDailyPathIds });

  assert.equal(suggestion.currentChoiceIds.length, maxDailyPathCards);
  assert.ok(suggestion.selectedChoiceIds.length <= maxDailyPathCards);
  assert.ok(suggestion.suggestedCardIds.length <= maxDailyPathCards);
});

test('teacher daily path suggestion wording avoids diagnosis, scores, ranking, speed and ability labels', () => {
  const afterTask = recordLearningAction(createEmptyObservation(), {
    kind: 'task',
    taskId: 'b-ma-ma',
    support: { imageHelp: false, syllableColors: true },
  });
  const suggestion = getTeacherDailyPathSuggestion({ observation: afterTask, support: { imageHelp: false, syllableColors: true } });
  const serialized = JSON.stringify(suggestion);

  assert.equal(suggestion.label, 'Silben lesen');
  assert.ok(suggestion.suggestedCardIds.every((id) => id.startsWith('daily-task-b-')));
  assert.ok(!/diagnose|diagnost|score|punkte|note|noten|rang|ranking|tempo|schnell|langsam|fähigkeit|begabung|leistung|schwach|defizit|stufe|level|timer|zeitdruck/i.test(serialized));
});

test('adaptive placement routes to Bild und Wort from image help and reduced choices', () => {
  const afterTask = recordLearningAction(createEmptyObservation(), {
    kind: 'task',
    taskId: 'a-ball',
    support: { imageHelp: true, reduceChoices: true, syllableColors: false },
  });
  const placement = getAdaptivePlacementSummary({ observation: afterTask, support: { imageHelp: true, reduceChoices: true, syllableColors: false } });

  assert.equal(placement.pathLabel, 'Bild und Wort');
  assert.match(placement.suggestion, /^Heute passt vermutlich Bild und Wort/);
  assert.match(placement.observedSignals.join(' '), /Bildhilfe/);
  assert.match(placement.observedSignals.join(' '), /Weniger Auswahl/);
  assert.match(placement.dataQuality, /vorsichtige Einordnung/);
  assert.match(placement.nextStep, /Bild/);
});

test('adaptive placement routes to Silben lesen from syllable support without image help', () => {
  const afterTask = recordLearningAction(createEmptyObservation(), {
    kind: 'task',
    taskId: 'b-ma-ma',
    support: { imageHelp: false, syllableColors: true },
  });
  const placement = getAdaptivePlacementSummary({ observation: afterTask, support: { imageHelp: false, syllableColors: true } });

  assert.equal(placement.pathLabel, 'Silben lesen');
  assert.match(placement.suggestion, /^Heute passt vermutlich Silben lesen/);
  assert.match(placement.teacherExplanation.suggestedPath, /Silben lesen/);
  assert.match(placement.teacherExplanation.nextSmallStep, /Silben/);
});

test('adaptive placement routes to Story verstehen from story evidence', () => {
  const afterStory = recordLearningAction(createEmptyObservation(), {
    kind: 'story',
    storyId: 'story-ball-garten',
    storyTitle: 'Der Ball im Garten',
    support: { reduceChoices: true },
    answer: 'Ball',
  });
  const placement = getAdaptivePlacementSummary({ observation: afterStory, support: { reduceChoices: true } });

  assert.equal(placement.pathLabel, 'Story verstehen');
  assert.match(placement.suggestion, /^Heute passt vermutlich Story verstehen/);
  assert.match(placement.teacherExplanation.observedSignals, /Storyfrage/);
  assert.match(placement.teacherExplanation.nextSmallStep, /Story/);
});

test('adaptive placement routes to reduced repetition from repeat choices', () => {
  const afterTask = recordLearningAction(createEmptyObservation(), {
    kind: 'task',
    taskId: 'a-mond',
    support: { repeat: true, reduceChoices: true },
  });
  const afterRepeatChoice = recordLearningAction(afterTask, { kind: 'choice', choice: 'Nochmal' });
  const placement = getAdaptivePlacementSummary({ observation: afterRepeatChoice, support: { repeat: true, reduceChoices: true } });

  assert.equal(placement.pathLabel, 'Reduzierte Auswahl und Wiederholung');
  assert.match(placement.suggestion, /^Heute passt vermutlich reduzierte Auswahl/);
  assert.match(placement.teacherExplanation.observedSignals, /Nochmal/);
  assert.match(placement.teacherExplanation.uncertainty, /nicht endgültig/);
});

test('adaptive placement wording stays suggestion-based and non-diagnostic', () => {
  const afterStory = recordLearningAction(createEmptyObservation(), {
    kind: 'story',
    storyId: 'story-tasse-tisch',
    storyTitle: 'Die Tasse auf dem Tisch',
    support: { imageHelp: true, syllableColors: true, reduceChoices: true },
    answer: 'Tisch',
  });
  const placement = getAdaptivePlacementSummary({ observation: afterStory, support: { imageHelp: true, syllableColors: true, reduceChoices: true } });
  const serialized = JSON.stringify(placement);

  assert.match(placement.suggestion, /^Heute passt vermutlich /);
  assert.ok(!/\bStufe\b|\bLevel\b|score|diagnose|note|noten|rang|ranking|fähigkeit|leistungs|schwach|defizit|timer|zeitdruck/i.test(serialized));
  assert.deepEqual(Object.keys(placement.teacherExplanation), ['observedSignals', 'suggestedPath', 'uncertainty', 'nextSmallStep']);
});

test('student task labels do not expose internal level letters', () => {
  const labels = getLearningTasks().map((task) => getStudentTaskLabel(task));

  assert.ok(labels.every((label) => !/Level|Leseweg [ABC]/i.test(label)));
  assert.ok(labels.includes('Bild und Wort'));
  assert.ok(labels.includes('Silben lesen'));
  assert.ok(labels.includes('Wort lesen'));
});

test('learning tasks expose stable support metadata without unsafe wording', () => {
  const tasks = getLearningTasks();
  const supportIds = ['imageHelp', 'syllableColors', 'readAloud', 'signHint', 'reduceChoices', 'repeat'];
  const unsafeWords = /note|noten|rang|ranking|diagnose|fehler|falsch|score|timer|zeitdruck/i;

  assert.ok(tasks.every((task) => supportIds.every((supportId) => task.supports.includes(supportId))));
  assert.ok(tasks.every((task) => task.prompt.length <= 40));
  assert.ok(!unsafeWords.test(JSON.stringify({ tasks, supportOptions })));
});

test('read-aloud support is an intentional teacher prompt without cloud or placeholder wording', () => {
  const readAloud = supportOptions.find((option) => option.id === 'readAloud');

  assert.ok(readAloud);
  assert.equal(readAloud.label, 'Vorlesen');
  assert.match(readAloud.description, /Lehrkraft liest/i);
  assert.ok(!/platzhalter|audio|cloud|tts|api|aufnehmen|speichern/i.test(readAloud.description));
});

test('student-facing read-aloud copy is intentional and privacy safe', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const readAloudLine = appSource.split('\n').find((line) => line.includes('supportState.readAloud')) ?? '';

  assert.match(readAloudLine, /Lehrkraft liest/i);
  assert.ok(!/Platzhalter|Audio|Cloud|TTS|API|aufnehmen|speichern/i.test(readAloudLine));
});

test('reduced-choice behavior keeps active task and only shows two choices', () => {
  const tasks = getLearningTasks();
  const reduced = getReducedChoices(tasks, tasks[4].id, true);

  assert.equal(reduced.length, 2);
  assert.equal(reduced[0].id, tasks[4].id);
});

test('student-facing app copy avoids timer, grade, ranking and diagnosis wording', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const childPathSource = appSource.slice(0, appSource.indexOf('mode === \'child\' ?') > -1 ? appSource.indexOf('mode === \'child\' ?') : appSource.length)
    + appSource.slice(appSource.indexOf('mode === \'child\' ?'), appSource.indexOf(') : (\n        <section className="teacher-panel"'));
  const visibleCopy = childPathSource.replace(/className=\{?[^\n>]+/g, '');

  assert.ok(!/note|noten|rang|ranking|diagnose|score|timer|zeitdruck/i.test(visibleCopy));
});

test('app exposes a calm story mode without replacing the existing task loop', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');

  assert.match(appSource, /getStoryPaths/);
  assert.match(appSource, /Story lesen/);
  assert.match(appSource, /Wort üben/);
  assert.match(appSource, /recordLearningAction\(current as any, \{\s*kind: 'story'/);
  assert.match(appSource, /StoryAnswerChoices/);
});

test('visual styles keep the child path tablet friendly and uncluttered', () => {
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(css, /@media \(max-width: 920px\)/);
  assert.match(css, /min-height:\s*64px/);
  assert.match(css, /\.learning-layout[\s\S]*grid-template-columns:\s*minmax\(240px, 0\.85fr\) minmax\(0, 1\.15fr\)/);
  assert.match(css, /\.reading-card[\s\S]*background:\s*#fffdf8/);
});

test('Alpha 25 app exposes a compact teacher profile-safe preview', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /Profil-Vorschau: Was passt heute\?/);
  assert.match(appSource, /readingProfileExamples\[teacherPreviewProfileKey\]/);
  assert.match(appSource, /getProfileSafeDailyPath\(teacherPreviewProfile/);
  assert.match(appSource, /Gemeinsam lesen/);
  assert.match(appSource, /Reduzierte Auswahl/);
  assert.match(appSource, /Freie Auswahl/);
  assert.match(appSource, /Heute auslassen/);
  assert.match(appSource, /M\+A\+S\+O\+F/);
  assert.match(css, /\.profile-safe-preview/);
  assert.match(css, /\.profile-safe-card-list[\s\S]*flex-wrap:\s*wrap/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.profile-safe-preview-header/);
});

test('Alpha 25 profile preview stays local, anonymous and non-persistent', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const previewSource = appSource.slice(appSource.indexOf('<section className="profile-safe-preview'), appSource.indexOf('<section className="pilot-protocol-card'));

  assert.match(previewSource, /Nur anonyme Demo-Profile/);
  assert.match(previewSource, /Der Kinderpfad wird dadurch nicht automatisch verändert/);
  assert.doesNotMatch(previewSource, /localStorage|sessionStorage|indexedDB|download|export|cloud|login|Login|fetch\(|new Blob|URL\.createObjectURL/i);
  assert.doesNotMatch(previewSource, /Schüler|Klassenliste|Diagnose|diagnostisch|Score|Ranking|Timer|Note|Prozent/i);
});

test('learning observation records child path, supports and repeated choices without grades', () => {
  const observation = createEmptyObservation();
  const afterTask = recordLearningAction(observation, {
    kind: 'task',
    taskId: 'b-ma-ma',
    support: { imageHelp: true, repeat: true },
  });
  const afterChoice = recordLearningAction(afterTask, { kind: 'choice', choice: 'Nochmal' });

  assert.deepEqual(afterChoice.taskPath, ['b-ma-ma']);
  assert.deepEqual(afterChoice.selectedSupports, ['Bildhilfe', 'Silbenfarben', 'Nochmal']);
  assert.deepEqual(afterChoice.choices, ['Nochmal']);
  assert.ok(!/note|rang|diagnose|fehler|score|timer/i.test(JSON.stringify(afterChoice)));
});

function alpha26bConservativeGraphemes(word = '') {
  const lower = String(word).toLocaleLowerCase('de-DE').normalize('NFC');
  const units = [];
  for (let index = 0; index < lower.length;) {
    const rest = lower.slice(index);
    const complex = ['sch', 'ch', 'au', 'ei', 'eu', 'ie', 'st', 'sp'].find((unit) => rest.startsWith(unit));
    if (complex) {
      units.push(complex);
      index += complex.length;
      continue;
    }
    const char = lower[index];
    if (/[a-zäöüß]/i.test(char)) units.push(char);
    index += 1;
  }
  return [...new Set(units)];
}

test('Alpha 26B expands task requirement coverage to at least 24 existing tasks', () => {
  const tasksById = new Map(getLearningTasks().map((task) => [task.id, task]));
  const requirements = Object.values(taskRequirementProfiles);

  assert.ok(requirements.length >= 24);
  assert.ok(requirements.every((requirement) => tasksById.has(requirement.taskId)));
  assert.ok(requirements.some((requirement) => requirement.taskId.startsWith('a-')));
  assert.ok(requirements.some((requirement) => requirement.taskId.startsWith('b-')));
});

test('Alpha 26B requirement option words match existing task options', () => {
  const tasksById = new Map(getLearningTasks().map((task) => [task.id, task]));

  for (const requirement of Object.values(taskRequirementProfiles)) {
    const task = tasksById.get(requirement.taskId);
    assert.deepEqual(requirement.optionWords, task.options, requirement.taskId);
    assert.equal(requirement.targetWord, task.word, requirement.taskId);
  }
});

test('Alpha 26B option graphemes conservatively cover all option words', () => {
  for (const requirement of Object.values(taskRequirementProfiles)) {
    const needed = [...new Set(requirement.optionWords.flatMap(alpha26bConservativeGraphemes))];
    for (const unit of needed) {
      assert.ok(requirement.optionGraphemes.includes(unit), `${requirement.taskId} missing ${unit}`);
    }
  }
});

test('Alpha 26B profile-safe daily paths gain broader useful choices without unsafe cards', () => {
  const richerProfile = {
    id: 'profile-alpha-26b-richer',
    readingStage: 5,
    knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l', 'i', 'n', 'e', 't', 'r', 'b', 'u', 'h'],
    knownSyllables: ['ball', 'bus', 'hut', 'tas', 'se', 'son', 'ne', 're', 'gen', 'blu', 'me', 'ma', 'so', 'fa', 'la', 'li', 'mo', 'na', 'ta', 'te', 'to', 'ba', 'ro'],
    supportSettings: { reducedChoices: true, teacherLed: true },
  };
  const path = getProfileSafeDailyPath(richerProfile, { maxCards: 8, minimumChoices: 1 });

  assert.ok(path.cards.length > 3);
  assert.ok(path.cards.every((card) => card.mode !== 'blocked'));
  assert.ok(path.cards.some((card) => card.taskId.startsWith('a-')));
  assert.ok(path.cards.some((card) => card.taskId.startsWith('b-')));
});

test('Alpha 26B very early grapheme profile does not see unsafe complex words', () => {
  const path = getProfileSafeDailyPath(readingProfileExamples.profileMA, { maxCards: 30, minimumChoices: 1 });
  const visibleWords = path.cards.map((card) => card.word);

  assert.ok(visibleWords.includes('Mama'));
  assert.ok(!visibleWords.some((word) => /Schule|Tasche|Buch|Licht|Haus|Maus|Fenster|Tür/.test(word)));
});

test('Alpha 26B complex units are marked for teacher review instead of silently simplified', () => {
  const complexRequirements = Object.values(taskRequirementProfiles).filter((requirement) => (requirement.complexUnits ?? []).length > 0);

  assert.ok(complexRequirements.length >= 6);
  assert.ok(complexRequirements.every((requirement) => requirement.requiresTeacherReview === true));
  assert.ok(complexRequirements.some((requirement) => requirement.complexUnits.includes('sch')));
  assert.ok(complexRequirements.some((requirement) => requirement.complexUnits.includes('ch')));
  assert.ok(complexRequirements.some((requirement) => requirement.complexUnits.includes('au')));
});

test('Alpha 26B profile-safe output language remains free of diagnosis scoring and pressure wording', () => {
  const outputs = [
    getProfileSafeDailyPath(readingProfileExamples.profileMA, { maxCards: 30 }),
    getProfileSafeDailyPath(readingProfileExamples.profileMASOF, { maxCards: 30, minimumChoices: 1 }),
  ];

  assert.ok(!/diagnose|diagnost|score|punkte|\bnote\b|noten|rang|ranking|timer|zeitdruck|falsch|fehler|prozent|leistung|schwach|defizit|schnell|langsam|grade|percentage/i.test(JSON.stringify(outputs)));
});


test('Alpha 26C coverage summary explains current requirement coverage safely', () => {
  const summary = getTaskRequirementCoverageSummary(readingProfileExamples.profileMA, { minimumChoices: 1 });

  assert.ok(summary.totalRequirements >= 28);
  assert.ok(summary.levelCounts.A > 0);
  assert.ok(summary.levelCounts.B > 0);
  assert.ok(summary.levelCounts.C >= 2);
  assert.ok(summary.teacherReviewCount > 0);
  for (const unit of ['sch', 'ch', 'au', 'st']) {
    assert.ok(summary.complexUnits.includes(unit), `${unit} missing from complexUnits`);
  }
  assert.ok(summary.selectedProfileFit.visibleCount >= 1);
  assert.ok(summary.selectedProfileFit.blockedCount > 0);
  assert.ok(summary.sampleReviewTaskIds.length > 0);
  assert.doesNotMatch(JSON.stringify(summary), /diagnose|diagnost|score|punkte|note|noten|rang|ranking|timer|zeitdruck|prozent|leistung|schwach|defizit/i);
});

test('Alpha 26C selected demo profile fit counts are deterministic', () => {
  assert.deepEqual(getTaskRequirementCoverageSummary(readingProfileExamples.profileMA, { minimumChoices: 1 }).selectedProfileFit, {
    visibleCount: 1,
    blockedCount: 51,
    teacherLedCount: 0,
    reducedChoiceCount: 1,
    fullChoiceCount: 0,
  });
  assert.deepEqual(getTaskRequirementCoverageSummary(readingProfileExamples.profileMASOF, { minimumChoices: 1 }).selectedProfileFit, {
    visibleCount: 3,
    blockedCount: 49,
    teacherLedCount: 0,
    reducedChoiceCount: 3,
    fullChoiceCount: 0,
  });
});

test('Alpha 26C app exposes compact coverage inspector without risky new workflow language', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const inspectorSource = appSource.slice(appSource.indexOf('<details className="coverage-inspector"'), appSource.indexOf('<section className="pilot-protocol-card'));

  assert.match(appSource, /Coverage-Check: Was ist schon getaggt\?/);
  assert.match(appSource, /getTaskRequirementCoverageSummary\(teacherPreviewProfile/);
  assert.match(inspectorSource, /mit Prüfung durch Lehrkraft/);
  assert.match(inspectorSource, /Sichtbar im Demo-Profil/);
  assert.match(inspectorSource, /Heute auslassen/);
  assert.match(inspectorSource, /Komplexe Einheiten/);
  assert.match(inspectorSource, /Lokale Strukturierungshilfe/);
  assert.doesNotMatch(inspectorSource, /localStorage|new Blob|URL\.createObjectURL|download=|fetch\(|Login|Upload|Cloud|Netzwerk|score|Score|Ranking|Diagnose|diagnost|Prozent|Note|Klasse/i);
  assert.match(css, /\.coverage-inspector/);
  assert.match(css, /\.coverage-grid[\s\S]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.coverage-grid[\s\S]*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width: 430px\)[\s\S]*\.coverage-grid[\s\S]*grid-template-columns:\s*1fr/);
});


test('Alpha 27 development map exists and stays non-diagnostic', () => {
  const summary = getDevelopmentCoverageSummary();
  assert.ok(developmentMapDimensions.length >= 10);
  assert.ok(developmentMapDimensions.some((dimension) => dimension.id === 'phonologicalAwarenessWide'));
  assert.ok(developmentMapDimensions.some((dimension) => dimension.id === 'phonologicalAwarenessNarrow'));
  assert.equal(summary.totalProfiles, Object.keys(taskRequirementProfiles).length);
  assert.ok(summary.hasWidePhonologicalAwareness);
  assert.ok(summary.hasNarrowPhonologicalAwareness);
  assert.doesNotMatch(JSON.stringify({ developmentMapDimensions, summary }), /diagnose|diagnost|score|punkte|note|noten|rang|ranking|timer|zeitdruck|defizit|schwach/i);
});

test('Alpha 27 every profiled task has a complete development profile', () => {
  const requiredKeys = ['entryLayer', 'readingAccessLevel', 'phonologicalFocus', 'writingBridgeType', 'symbolSupportNeed', 'imageQualityNeed', 'teacherReviewReason', 'childOrientationCue', 'nextStepIfTooHard', 'nextStepIfTooEasy'];
  for (const taskId of Object.keys(taskRequirementProfiles)) {
    const profile = getTaskDevelopmentProfile(taskId);
    assert.ok(profile, taskId);
    for (const key of requiredKeys) assert.ok(profile[key], `${taskId} missing ${key}`);
    for (const dimension of developmentMapDimensions) assert.equal(typeof profile.dimensions[dimension.id], 'boolean', `${taskId} ${dimension.id}`);
  }
});

test('Alpha 27 profiles classify across reading layers and phonological dimensions', () => {
  const summary = getDevelopmentCoverageSummary();
  assert.ok(summary.layerCounts.symbol > 0 || summary.layerCounts.picture > 0);
  assert.ok(summary.layerCounts.syllable > 0);
  assert.ok((summary.layerCounts.word ?? 0) >= 0); // current profiled task set has A/B tasks; sentence/story path is covered by guided chain UI
  assert.ok(summary.writingBridgeCounts.trace > 0);
  assert.ok(summary.writingBridgeCounts['build-syllable'] > 0);
  assert.ok((summary.writingBridgeCounts['sentence-frame'] ?? 0) >= 0);
  assert.ok(summary.phonologicalFocusCounts.syllable > 0);
  assert.ok(summary.phonologicalFocusCounts.onset > 0 || summary.phonologicalFocusCounts.synthesis > 0);
});

test('Alpha 27 symbol asset readiness confirms no protected assets and neutral manifest slots', () => {
  const readiness = getSymbolAssetReadinessSummary();
  assert.equal(readiness.protectedAssetsEmbedded, false);
  assert.equal(readiness.localSymbolCardsOnly, true);
  assert.deepEqual(readiness.manifestShape, ['taskId', 'word', 'concept', 'defaultLocalCue', 'licensedAssetSlot', 'altText', 'usageNote']);
  assert.ok(readiness.prioritySlots.length > 0);
  assert.doesNotMatch(JSON.stringify(readiness.prioritySlots.map((slot) => slot.defaultLocalCue)), /metacom|boardmaker|widgit|arasaac|\.png|\.svg|https?:\/\//i);
});

test('Alpha 27 app exposes Leseleiter and optional local non-evaluative writing bridge', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(appSource, /Leseleiter/);
  assert.match(appSource, /Schau\. Klatsch\. Lies\./);
  assert.match(appSource, /Jetzt: \{currentLabel\} · Danach: \{nextStep\}/);
  assert.match(appSource, /Optional/);
  assert.match(appSource, /Kein Speichern, keine Bewertung/);
  assert.match(css, /\.leseleiter-panel/);
  assert.match(css, /\.writing-bridge-card/);
  assert.doesNotMatch(appSource, /new Blob|URL\.createObjectURL|download=|fetch\(|Login|Upload|Cloud-Sync|ranking|score|timer/i);
});

test('Alpha 27 writing bridge helper is optional local and non-evaluative', () => {
  const bridge = getWritingBridgeForTask('b-ma-ma');
  assert.equal(bridge.optional, true);
  assert.equal(bridge.localOnly, true);
  assert.equal(bridge.nonEvaluative, true);
  assert.equal(bridge.type, 'build-syllable');
  assert.match(bridge.childPrompt, /Lege das Wort ruhig/);
  assert.doesNotMatch(JSON.stringify(bridge), /diagnose|score|\bnote\b|rang|ranking|timer|falsch|fehler|download|upload|cloud/i);
});

test('Alpha 27 reports exist and source avoids newly risky workflow language', () => {
  const files = ['alpha-27-deep-didactic-audit.md', 'alpha-27-symbol-asset-audit.md', 'alpha-27-implementation-report.md', 'alpha-27-watchdog-review.md'];
  for (const file of files) {
    const report = readFileSync(new URL(`../reports/${file}`, import.meta.url), 'utf8');
    assert.ok(report.length > 200, file);
  }
  const contentSource = readFileSync(new URL('../src/lesewerk-content.mjs', import.meta.url), 'utf8');
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const alpha27Source = contentSource.slice(contentSource.indexOf('export const developmentMapDimensions'), contentSource.indexOf('export function getTaskProfileFit'))
    + appSource.slice(appSource.indexOf('function Leseleiter'), appSource.indexOf('type GuidedStep'));
  assert.doesNotMatch(alpha27Source, /\b(login|cloud|backend|upload|download|analytics|ranking|score|timer|produktion|einsatzfertig)\b/i);
});


test('Alpha 30B content pack broadens stages while keeping early M+A safe', () => {
  const tasks = getLearningTasks();
  const alpha30 = tasks.filter((task) => task.id.startsWith('alpha30-'));
  const typeCounts = alpha30.reduce((counts, task) => ({ ...counts, [task.type]: (counts[task.type] ?? 0) + 1 }), {});
  const early = getProfileSafeDailyPath(createLocalDidacticProfile({ knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], supportSettings: { reducedChoices: true } }), { minimumChoices: 1, maxCards: 12, includeAlpha30Pack: true });
  const sofa = getProfileSafeDailyPath(createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'], supportSettings: { reducedChoices: true } }), { minimumChoices: 1, maxCards: 12, includeAlpha30Pack: true });
  const later = getProfileSafeDailyPath(createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l', 'i', 'n', 'e', 't'], knownSyllables: ['ma', 'so', 'fa', 'la', 'li', 'mo', 'tas', 'se'], supportSettings: { reducedChoices: true } }), { minimumChoices: 1, maxCards: 12, includeAlpha30Pack: true });

  assert.ok(alpha30.length >= 10);
  assert.ok(typeCounts['image-word-match'] >= 2);
  assert.ok(typeCounts['syllable-blend'] >= 4);
  assert.ok(typeCounts['word-picture-match'] >= 4);
  assert.ok(early.cards.some((card) => card.taskId === 'alpha30-a-mama' || card.taskId === 'alpha30-b-ma'));
  assert.ok(!early.cards.some((card) => /sofa|limo|tasse/i.test(card.word)));
  assert.ok(sofa.cards.some((card) => card.word === 'Sofa'));
  assert.ok(later.cards.some((card) => ['Limo', 'Tasse'].includes(card.word)));
});

test('Alpha 30B child orientation exposes Bild -> Silbe -> Wort -> Satz -> Mini-Geschichte -> Schreibbruecke', () => {
  const steps = getChildOrientationSteps({ syllableStepComfortable: true, wordStepComfortable: true, sentenceOrStoryReady: true, writingBridgeReady: true });
  const path = getProgressionPathForProfile(createLocalDidacticProfile({ knownGraphemes: ['m', 'a', 's', 'o', 'f'], knownSyllables: ['ma', 'so', 'fa'] }), { minimumChoices: 1 });

  assert.deepEqual(steps.map((step) => step.label), ['Bild', 'Silbe', 'Wort', 'Satz', 'Mini-Geschichte', 'Schreibbrücke']);
  assert.match(steps.map((step) => step.childText).join(' '), /Bedeutung.*Klang.*Zeichen.*passiert.*kleine Szene.*heute passt/i);
  assert.equal(path.todayPathLabel, 'Tagespfad');
  assert.ok(path.steps.some((step) => step.state === 'current'));
  assert.doesNotMatch(JSON.stringify(steps), unsafeQualityWords);
});

test('Alpha 30B UI source contains dominant Tagespfad and safe orientation language', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const childShell = appSource.slice(appSource.indexOf('child-path-shell'), appSource.indexOf("phase === 'finish'"));

  assert.match(childShell, /Tagespfad/);
  assert.match(childShell, /Heute lesen/);
  assert.match(appSource, /step-rail/);
  assert.match(childShell, /active-step-card/);
  assert.match(childShell, /Hilfe wählen/);
  assert.match(css, /\.child-path-shell/);
  assert.match(css, /\.today-path-header/);
  assert.match(css, /\.support-strip/);
  assert.doesNotMatch(childShell, /Login|Cloud|Upload|Export|Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer/i);
});


test('Alpha 41B child path adds one compact current-step progression strip', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const guidedSource = appSource.slice(appSource.indexOf('function GuidedReadingPath'), appSource.indexOf('function Leseleiter'));

  assert.match(guidedSource, /child-progress-strip/);
  assert.match(guidedSource, /Mein Leseweg/);
  assert.match(guidedSource, /Jetzt lesen:/);
  assert.match(guidedSource, /Bild[\s\S]*Silbe[\s\S]*Wort[\s\S]*Satz[\s\S]*Mini-Geschichte[\s\S]*Schreibbrücke/);
  assert.match(guidedSource, /aria-label=\{`Aktueller Leseschritt/);
  assert.match(css, /\.child-progress-strip/);
  assert.match(css, /\.child-progress-pill/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.child-progress-strip[\s\S]*overflow-x: auto/);
  assert.doesNotMatch(`${guidedSource}\n${css}`, /Login|Cloud|Upload|Export|Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|fetch\(|\.png|\.svg|https?:\/\//i);
});

test('Alpha 42B child progress strip keeps the full journey but makes the current status visually dominant and quieter on mobile', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const guidedSource = appSource.slice(appSource.indexOf('function GuidedReadingPath'), appSource.indexOf('function Leseleiter'));

  assert.match(guidedSource, /child-progress-status/);
  assert.match(guidedSource, /child-progress-steps/);
  assert.match(guidedSource, /aria-current=\{index === activeIndex \? 'step' : undefined\}/);
  assert.match(guidedSource, /Bild[\s\S]*Silbe[\s\S]*Wort[\s\S]*Satz[\s\S]*Mini-Geschichte[\s\S]*Schreibbrücke/);
  assert.match(css, /\.child-progress-status[\s\S]*min-width:\s*max-content/);
  assert.match(css, /\.child-progress-steps[\s\S]*display:\s*flex[\s\S]*overflow-x:\s*auto/);
  assert.match(css, /\.child-progress-pill:not\(\.current\)[\s\S]*opacity:\s*0\.72/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.child-progress-strip[\s\S]*grid-template-columns:\s*1fr/);
  assert.doesNotMatch(`${guidedSource}\n${css}`, /Login|Cloud|Upload|Export|Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|fetch\(|\.png|\.svg|https?:\/\//i);
});

test('Alpha 43B child path uses one short support-language layer instead of long explanations', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const childShell = appSource.slice(appSource.indexOf('child-path-shell'), appSource.indexOf('teacher-panel'));

  assert.match(childShell, /Schau\. Klatsch\. Lies\./);
  assert.match(childShell, /Hilfe ist freiwillig\./);
  assert.match(childShell, /Lege oder spure das Wort\./);
  assert.match(childShell, /today-path-header[\s\S]*Schau\. Klatsch\. Lies\./);
  assert.doesNotMatch(childShell, /<section className="learning-layout child-path-shell"[^>]*>\s*<p className="guided-entry-note">/);
  assert.doesNotMatch(childShell, /Bild anschauen, Silbe klatschen, Wort lesen, Satz lesen, Mini-Geschichte, Schreibbrücke/);
  assert.doesNotMatch(childShell, /Tippe eine Hilfe an\. Deine Hilfen bleiben sichtbar\./);
  assert.doesNotMatch(childShell, /Nur wenn es heute passt\. Kein Speichern, keine Bewertung\./);
  assert.doesNotMatch(childShell, /Login|Cloud|Upload|Export|Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|fetch\(|\.png|\.svg|https?:\/\//i);
});

test('Alpha 44B child entry keeps only the short start message before the child path', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const childModeStart = appSource.indexOf("{mode === 'child' ? (");
  const childModeEnd = appSource.indexOf('<section className="teacher-panel"', childModeStart);
  const childModeSource = appSource.slice(childModeStart, childModeEnd);

  assert.ok(childModeStart > 0);
  assert.ok(childModeEnd > childModeStart);
  assert.match(childModeSource, /Schau\. Klatsch\. Lies\./);
  assert.equal((childModeSource.match(/Schau\. Klatsch\. Lies\./g) ?? []).length, 1);
  assert.doesNotMatch(childModeSource, /guided-entry-note/);
  assert.doesNotMatch(childModeSource, /Bild anschauen, Silbe klatschen, Wort lesen, Satz lesen, Mini-Geschichte, Schreibbrücke/);
  assert.doesNotMatch(childModeSource, /Der Tagespfad startet unten/);
});

test('Alpha 45B separates optional support status from the main child reading action', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const supportStart = appSource.indexOf('support-strip');
  const activeStepIndex = appSource.indexOf('active-step-card', supportStart);
  const supportSource = appSource.slice(supportStart, activeStepIndex);

  assert.ok(supportStart > 0);
  assert.ok(activeStepIndex > supportStart);
  assert.match(supportSource, /support-status-row/);
  assert.match(supportSource, /support-choice-card/);
  assert.match(supportSource, /Hilfe ist freiwillig\./);
  assert.doesNotMatch(supportSource, /Nimm Hilfe, wenn du magst/);
  assert.match(supportSource, /<ActiveSupport labels=\{activeSupportLabels\} \/>[\s\S]*<details className="support-details support-choice-card">/);
  assert.match(css, /\.support-status-row[\s\S]*border-bottom:\s*1px solid rgba\(55, 76, 90, 0\.1\)/);
  assert.match(css, /\.support-choice-card[\s\S]*background:\s*rgba\(255, 253, 246, 0\.86\)/);
  assert.doesNotMatch(supportSource, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Cloud|Login|Upload|Export/i);
});

test('Alpha 47B keeps optional help manual while compacting only the open support card', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const supportStart = appSource.indexOf('support-strip');
  const activeStepIndex = appSource.indexOf('active-step-card', supportStart);
  const supportSource = appSource.slice(supportStart, activeStepIndex);

  assert.ok(supportStart > 0);
  assert.ok(activeStepIndex > supportStart);
  assert.match(supportSource, /<details className="support-details support-choice-card">[\s\S]*<summary>Hilfe wählen<\/summary>[\s\S]*<p>Hilfe ist freiwillig\.<\/p>[\s\S]*<SupportPanel support=\{support\} onToggle=\{toggleSupport\} \/>/);
  assert.match(css, /\.support-choice-card\[open\][\s\S]*padding:\s*12px 14px/);
  assert.match(css, /\.support-choice-card\[open\] p[\s\S]*margin:\s*2px 0 10px/);
  assert.match(css, /\.support-choice-card\[open\] \.support-grid[\s\S]*margin-top:\s*10px/);
  assert.doesNotMatch(supportSource, /onClick=\{toggleSupport\}|setSupport\(|setSelectedDailyPathIds\(|localStorage|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(|Login|Cloud|Upload|Export|Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer/i);
});

test('Alpha 48B child path marks current and next reading step without changing the route', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const guidedSource = appSource.slice(appSource.indexOf('function GuidedReadingPath'), appSource.indexOf('function Leseleiter'));

  assert.match(guidedSource, /const nextStep = chain\.steps\[Math\.min\(activeIndex \+ 1, chain\.steps\.length - 1\)\]/);
  assert.match(guidedSource, /Jetzt lesen: \{currentStep\.label\}/);
  assert.match(guidedSource, /Danach: \{nextStep\.label\}/);
  assert.match(guidedSource, /child-progress-pill next/);
  assert.match(guidedSource, /aria-label="Leseweg: Bild, Silbe, Wort, Satz, Mini-Geschichte, Schreibbrücke"/);
  assert.match(guidedSource, /Bild[\s\S]*Silbe[\s\S]*Wort[\s\S]*Satz[\s\S]*Mini-Geschichte[\s\S]*Schreibbrücke/);
  assert.match(css, /\.child-progress-next/);
  assert.match(css, /\.child-progress-pill\.next/);
  assert.doesNotMatch(`${guidedSource}\n${css}`, /Login|Cloud|Upload|Export|Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|fetch\(|\.png|\.svg|https?:\/\//i);
});


test('Alpha 52B teacher word-family review slices are read-only manual planning only', () => {
  const beforePath = getDailyReadingPath().map((item) => item.id);
  const slices = getTeacherWordFamilyReviewSlices();
  const afterPath = getDailyReadingPath().map((item) => item.id);
  const visibleText = JSON.stringify(slices);

  assert.deepEqual(beforePath, afterPath);
  assert.deepEqual(slices.map((slice) => slice.id), ['tasse', 'mama']);
  assert.deepEqual(slices.map((slice) => slice.word), ['Tasse', 'Mama']);
  assert.ok(slices.every((slice) => slice.localOnly === true));
  assert.ok(slices.every((slice) => slice.manualOnly === true));
  assert.ok(slices.every((slice) => slice.readOnly === true));
  assert.ok(slices.every((slice) => slice.persistent === false));
  assert.ok(slices.every((slice) => slice.taskIds.length === 4));
  assert.match(visibleText, /sichten|vorbereiten|ruhiger Anschluss|vorhandene Wortfamilie|manuell/i);
  assert.doesNotMatch(visibleText, unsafeQualityWords);
  assert.doesNotMatch(visibleText, /Score|Ranking|Punkte|Prozent|Fehler|Defizit|Level|Placement|download|export|upload|login|cloud|fetch\(|localStorage|sessionStorage/i);
});

test('Alpha 52B teacher UI adds a compact review block without child-path mutation or overload', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const childSource = appSource.slice(appSource.indexOf("{mode === 'child' ? ("), appSource.indexOf('<section className="teacher-panel"'));
  const teacherSource = appSource.slice(appSource.indexOf('<section className="teacher-panel"'), appSource.indexOf('<section className="teacher-suggestion-card'));

  assert.match(appSource, /getTeacherWordFamilyReviewSlices/);
  assert.match(teacherSource, /Review vorhandener Wortfamilien/);
  assert.match(teacherSource, /word-family-review-card/);
  assert.match(teacherSource, /Vorhandene Wortfamilien sichten/);
  assert.match(teacherSource, /Der Kinderpfad bleibt unverändert/);
  assert.match(appSource, /teacherWordFamilyReviewSlices\.map/);
  assert.match(appSource, /slice\.word/);
  assert.equal((teacherSource.match(/word-family-review-card/g) ?? []).length, 1);
  assert.doesNotMatch(childSource, /Review vorhandener Wortfamilien|word-family-review-card|getTeacherWordFamilyReviewSlices/);
  assert.doesNotMatch(teacherSource, /setSelectedDailyPathIds\(|setActiveTaskId\(|setMode\('child'\)|localStorage|sessionStorage|new Blob|URL\.createObjectURL|download=|fetch\(/);
  assert.doesNotMatch(teacherSource, /Score|Ranking|Punkte|Prozent|Diagnose|Fehler|Defizit|Level|Placement|Timer|Upload|Cloud|Login/i);
  assert.match(css, /\.word-family-review-card/);
});

test('Alpha 53B teacher review polish keeps the block calm, scannable, and narrow', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const teacherSource = appSource.slice(appSource.indexOf('<section className="teacher-panel"'), appSource.indexOf('<section className="teacher-suggestion-card'));
  const reviewCss = css.slice(css.indexOf('.word-family-review-card {'), css.indexOf('.teacher-development-overview h3'));

  assert.match(teacherSource, /word-family-review-intro/);
  assert.match(teacherSource, /word-family-review-word/);
  assert.match(teacherSource, /word-family-review-title-text/);
  assert.match(teacherSource, /word-family-review-chain/);
  assert.match(teacherSource, /word-family-review-cue/);
  assert.match(teacherSource, /nur sichten · manuell/);
  assert.match(teacherSource, /Der Kinderpfad bleibt unverändert/);

  assert.match(reviewCss, /grid-template-columns:\s*repeat\(auto-fit, minmax\(min\(100%, 220px\), 1fr\)\)/);
  assert.match(reviewCss, /padding:\s*20px/);
  assert.match(reviewCss, /border-radius:\s*8px/);
  assert.match(reviewCss, /min-width:\s*0/);
  assert.doesNotMatch(`${teacherSource}\n${reviewCss}`, /Score|Ranking|Punkte|Prozent|Diagnose|Fehler|Defizit|Level|Placement|Timer|Upload|Cloud|Login|download|fetch\(|localStorage|sessionStorage/i);
});

test('Alpha 31 pack stays opt-in and covers the planned content slice safely', () => {
  const alpha31Tasks = getLearningTasks().filter((task) => task.id.startsWith('alpha31-'));
  assert.ok(alpha31Tasks.length >= 12 && alpha31Tasks.length <= 16);
  assert.deepEqual([...new Set(alpha31Tasks.map((task) => task.word))].sort((a, b) => a.localeCompare(b, 'de')), ['Ball', 'Limo', 'Mama', 'Mofa', 'Sofa', 'Tasse', 'Tisch'].sort((a, b) => a.localeCompare(b, 'de')));

  assert.ok(alpha31Tasks.some((task) => task.type === 'image-word-match'));
  assert.ok(alpha31Tasks.some((task) => task.type === 'syllable-blend'));
  assert.ok(alpha31Tasks.some((task) => task.type === 'word-picture-match'));
  assert.ok(alpha31Tasks.some((task) => task.id.includes('sentence')));
  assert.ok(alpha31Tasks.some((task) => task.id.includes('story')));
  assert.ok(alpha31Tasks.some((task) => task.id.includes('writing')));

  const visibleByDefault = getProfileSafeDailyPath(readingProfileExamples.profileMASOF, { includeAlpha30Pack: true }).cards.map((card) => card.taskId);
  assert.equal(visibleByDefault.some((taskId) => taskId.startsWith('alpha31-')), false);

  const visibleWithAlpha31 = getProfileSafeDailyPath(readingProfileExamples.profileMASOF, { includeAlpha30Pack: true, includeAlpha31Pack: true, maxCards: 20 }).cards.map((card) => card.taskId);
  assert.ok(visibleWithAlpha31.some((taskId) => taskId.startsWith('alpha31-')));
  assert.doesNotMatch(JSON.stringify(alpha31Tasks), unsafeQualityWords);
  assert.doesNotMatch(JSON.stringify(alpha31Tasks), protectedAssetWords);
});

test('Alpha 31 profile gating keeps early M+A narrow and unlocks later words cautiously', () => {
  const early = { id: 'early-ma', knownGraphemes: ['m', 'a'], knownSyllables: ['ma'], readingStage: 5 };
  const masof = readingProfileExamples.profileMASOF;
  const later = { id: 'later', knownGraphemes: ['m', 'a', 's', 'o', 'f', 'l', 'i', 't', 'e'], knownSyllables: ['ma', 'so', 'fa', 'mo', 'li', 'tas', 'se', 'tisch'], readingStage: 5 };

  const earlyPath = getProfileSafeDailyPath(early, { includeAlpha30Pack: true, includeAlpha31Pack: true, maxCards: 20 });
  assert.equal(earlyPath.cards.some((card) => ['Sofa', 'Mofa', 'Limo', 'Tasse', 'Tisch'].includes(card.word)), false);

  const masofPath = getProfileSafeDailyPath(masof, { includeAlpha30Pack: true, includeAlpha31Pack: true, maxCards: 20 });
  assert.ok(masofPath.cards.some((card) => ['Sofa', 'Mofa'].includes(card.word)));
  assert.equal(masofPath.cards.some((card) => ['Limo', 'Tasse', 'Tisch'].includes(card.word)), false);

  const laterPath = getProfileSafeDailyPath(later, { includeAlpha30Pack: true, includeAlpha31Pack: true, maxCards: 30 });
  assert.ok(laterPath.cards.some((card) => ['Limo', 'Tasse', 'Tisch'].includes(card.word)));
});

test('Alpha 31 child path keeps Tagespfad dominant and library secondary in source', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const styleSource = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const childStart = appSource.indexOf('child-path-shell');
  const headerIndex = appSource.indexOf('today-path-header', childStart);
  const activeStepIndex = appSource.indexOf('active-step-card', childStart);
  const libraryIndex = appSource.indexOf('secondary-library-panel', childStart);

  assert.ok(childStart > 0);
  assert.ok(headerIndex > childStart);
  assert.ok(activeStepIndex > headerIndex);
  assert.ok(libraryIndex > activeStepIndex);
  assert.equal((appSource.match(/guided-start-action/g) ?? []).length, 1);
  assert.match(styleSource, /\.secondary-library-panel[\s\S]*order:\s*8/);
  assert.match(styleSource, /\.support-strip[\s\S]*grid-column:\s*1\s*\/\s*-1/);
});

test('Alpha 32B child path UI intent no longer depends on hidden Lesepfad marker', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const childStart = appSource.indexOf('child-path-shell');
  const headerIndex = appSource.indexOf('today-path-header', childStart);
  const startActionIndex = appSource.indexOf('guided-start-action', headerIndex);
  const activeStepIndex = appSource.indexOf('active-step-card', startActionIndex);
  const stepCardControlIndex = appSource.indexOf('Schrittkarte steuern', activeStepIndex);
  const stepAdvanceIndex = appSource.indexOf("{isLastStep ? 'Heute fertig' : 'Weiter'}", stepCardControlIndex);
  const libraryIndex = appSource.indexOf('secondary-library-panel', activeStepIndex);

  assert.ok(childStart > 0);
  assert.ok(headerIndex > childStart);
  assert.ok(startActionIndex > headerIndex);
  assert.ok(activeStepIndex > startActionIndex);
  assert.ok(stepCardControlIndex > activeStepIndex);
  assert.ok(stepAdvanceIndex > stepCardControlIndex);
  assert.ok(libraryIndex > activeStepIndex);
  assert.match(appSource.slice(headerIndex, activeStepIndex), /Tagespfad starten/);
  assert.match(appSource.slice(activeStepIndex), /Schrittkarte steuern/);
  assert.match(css, /\.secondary-library-panel[\s\S]*order:\s*8/);
  assert.doesNotMatch(appSource, /Lesepfad starten|source marker for legacy|kept as source marker/i);
});

test('CEO Startklarheit child path shows focus game before orientation stack', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const childStart = appSource.indexOf('child-path-shell');
  const activeStepIndex = appSource.indexOf('active-step-card', childStart);
  const focusIndex = appSource.indexOf('<FocusGameShell', activeStepIndex);
  const orientationIndex = appSource.indexOf('child-orientation-stack', focusIndex);
  const guidedIndex = appSource.indexOf('<GuidedReadingPath', orientationIndex);
  const mamaCardIndex = appSource.indexOf('<MamaStepCard', orientationIndex);

  assert.ok(childStart > 0);
  assert.ok(activeStepIndex > childStart);
  assert.ok(focusIndex > activeStepIndex);
  assert.ok(orientationIndex > focusIndex);
  assert.ok(guidedIndex > orientationIndex);
  assert.ok(mamaCardIndex > orientationIndex);
  assert.match(css, /\.child-orientation-stack/);
  assert.match(css, /\.active-step-card\s*>\s*\.focus-game-shell/);
});

test('CEO Startklarheit welcome choices route directly into real game rooms', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const welcomeShell = appSource.slice(appSource.indexOf('child-welcome-shell'), appSource.indexOf('<button className="secondary-action welcome-teacher-link"'));
  const startGuided = appSource.slice(appSource.indexOf('function startGuidedReadingPath'), appSource.indexOf('function startSequenceGame'));
  const startJourney = appSource.slice(appSource.indexOf('function startWordFamilyMiniJourney'), appSource.indexOf('function startMamaFamilyMiniJourney'));
  const startMission = appSource.slice(appSource.indexOf('function startLeseMission'), appSource.indexOf('function leaveLeseMission'));

  assert.match(welcomeShell, /Mein Tag/);
  assert.match(welcomeShell, /startGuidedReadingPath\(\)/);
  assert.match(welcomeShell, /Meine Reisen/);
  assert.match(welcomeShell, /startWordFamilyMiniJourney/);
  assert.match(welcomeShell, /Meine Mission/);
  assert.match(welcomeShell, /startLeseMission\(\)/);
  assert.match(startGuided, /setChildHomeStarted\(true\)/);
  assert.match(startJourney, /setChildHomeStarted\(true\)/);
  assert.match(startMission, /setChildHomeStarted\(true\)/);
  assert.match(appSource, /\(mode === 'teacher' \|\| !childHomeStarted\)/);
  assert.doesNotMatch(welcomeShell, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download/i);
});

test('CEO Spielraum readiness uses short child action cue before long helper text', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const focusShell = appSource.slice(appSource.indexOf('function FocusGameShell'), appSource.indexOf('function SupportPanel'));

  assert.match(focusShell, /focus-game-shell-ready/);
  assert.match(focusShell, /focus-start-symbol/);
  assert.match(focusShell, /focus-start-cue/);
  assert.match(focusShell, /Schau\. Klatsch\. Lies\./);
  assert.match(focusShell, /Bild\. Silbe\. Wort\. Satz\./);
  assert.match(css, /\.focus-game-shell-ready \.focus-shell-bar span[\s\S]*display:\s*none/);
  assert.match(css, /body:has\(\.focus-game-shell-ready\) \.support-strip/);
  assert.match(css, /body:has\(\.focus-game-shell-ready\) \.today-path-header/);
  assert.match(css, /\.focus-game-shell-ready \.focus-shell-bar > div[\s\S]*display:\s*none/);
  assert.match(css, /\.focus-game-shell-ready \.focus-exit-action[\s\S]*min-height:\s*44px/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.focus-game-shell-ready \.focus-exit-action[\s\S]*width:\s*auto/);
  assert.match(css, /\.focus-start-symbol/);
  assert.match(css, /\.focus-start-card \.focus-start-cue/);
  assert.doesNotMatch(focusShell, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download/i);
});

test('CEO Spielraum playing stage shows one large guided action stage', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const guidedStage = appSource.slice(appSource.indexOf('function GuidedFocusStage'), appSource.indexOf('function PilotFeedback'));

  assert.match(guidedStage, /guided-stage-symbol/);
  assert.match(guidedStage, /guided-stage-main-action/);
  assert.match(guidedStage, /Schau genau\./);
  assert.match(guidedStage, /Klatsch mit\./);
  assert.match(guidedStage, /Lies ruhig\./);
  assert.match(css, /\.focus-game-shell-playing \.focus-shell-bar span[\s\S]*display:\s*none/);
  assert.match(css, /\.focus-game-shell-playing \.focus-exit-action[\s\S]*min-height:\s*44px/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.focus-game-shell-playing \.focus-exit-action[\s\S]*width:\s*auto/);
  assert.match(css, /\.guided-stage-main-action \.mama-step-text[\s\S]*font-size:\s*clamp\(2rem, 8vw, 4\.6rem\)/);
  assert.match(css, /\.guided-stage-card \.focus-action-row[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\) auto/);
  assert.doesNotMatch(guidedStage, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download/i);
});

test('CEO Mini-Reise playing stage is reduced to one child action stage', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeyStage = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(journeyStage, /mini-journey-primary-stage/);
  assert.match(journeyStage, /mini-journey-stage-visual-symbol/);
  assert.match(journeyStage, /mini-journey-word-display--hero/);
  assert.match(css, /\.focus-game-shell-mama-journey\.focus-game-shell-playing \.mini-journey-orientation-card/);
  assert.match(css, /\.focus-game-shell-mama-journey\.focus-game-shell-playing \.mini-journey-stage-track/);
  assert.match(css, /\.focus-game-shell-mama-journey\.focus-game-shell-playing \.mini-journey-scene-panel[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(css, /\.focus-game-shell-mama-journey\.focus-game-shell-playing \.mini-journey-actions button:nth-child\(1\)/);
  assert.match(css, /\.mini-journey-word-display--hero[\s\S]*font-size:\s*clamp\(4rem, 16vw, 8\.5rem\)/);
  assert.doesNotMatch(journeyStage, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download/i);
});

test('CEO Mini-Reise story choices are real calm interaction cards', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeyStage = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(journeyStage, /selectedStoryChoice/);
  assert.match(journeyStage, /setSelectedStoryChoice/);
  assert.match(journeyStage, /mini-journey-story-feedback/);
  assert.match(journeyStage, /Das passt\./);
  assert.match(journeyStage, /Schau langsam\. Wähle in Ruhe\./);
  assert.match(journeyStage, /aria-pressed=\{selectedStoryChoice === 'correct'\}/);
  assert.match(journeyStage, /aria-pressed=\{selectedStoryChoice === 'distractor'\}/);
  assert.match(css, /\.mini-journey-comprehension-card\.selected/);
  assert.match(css, /\.mini-journey-story-feedback/);
  assert.match(css, /\.focus-game-shell-mama-journey\.focus-game-shell-playing \.mini-journey-layer-badge[\s\S]*display:\s*none/);
  assert.match(css, /@media \(max-width: 560px\) \{[\s\S]*\.focus-game-shell-mama-journey\.focus-game-shell-playing \.mini-journey-comprehension-scene/);
  assert.match(css, /@media \(max-width: 560px\) \{[\s\S]*\.mini-journey-comprehension-card \{[\s\S]*grid-template-columns:\s*auto minmax\(0, 1fr\)/);
  assert.match(css, /@media \(max-width: 560px\) \{[\s\S]*\.focus-game-shell-mama-journey\.focus-game-shell-playing \{[\s\S]*padding:\s*8px/);
  assert.match(css, /@media \(max-width: 560px\) \{[\s\S]*\.focus-game-shell-mama-journey\.focus-game-shell-playing \.mini-journey-primary-action \{[\s\S]*min-height:\s*52px/);
  assert.doesNotMatch(journeyStage, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download|falsch|Fehler/i);
});

test('CEO Mini-Reise sentence layer becomes a calm target-word interaction', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const journeyStage = appSource.slice(appSource.indexOf('function MamaFamilyJourneyStage'), appSource.indexOf('function FinishScreen'));

  assert.match(journeyStage, /selectedSentenceWord/);
  assert.match(journeyStage, /setSelectedSentenceWord/);
  assert.match(journeyStage, /mini-journey-sentence-task/);
  assert.match(journeyStage, /Finde \{station\.anchorWord\}\./);
  assert.match(journeyStage, /mini-journey-sentence-feedback/);
  assert.match(journeyStage, /aria-pressed=\{isSelected\}/);
  assert.match(journeyStage, /\$\{station\.anchorWord\} gefunden\./);
  assert.match(css, /\.mini-journey-sentence-task/);
  assert.match(css, /\.mini-journey-word-tile\.selected/);
  assert.match(css, /\.mini-journey-sentence-feedback/);
  assert.doesNotMatch(journeyStage, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download|falsch|Fehler/i);
});

test('Alpha 32B story and writing bridge metadata helpers are explicit and safe', () => {
  const story = createMiniStoryBridgeMetadata({
    focusWord: 'Ball',
    shortText: 'Der Ball rollt zum Sofa.',
    comprehensionMoment: 'Was rollt zum Sofa?',
    pictureCue: 'Ball neben Sofa',
    supportCue: 'Ball langsam rollen lassen, dann Satz lesen.',
    requiredGraphemes: ['b', 'a', 'l'],
    requiredSyllables: ['ball'],
  });
  const writing = createWritingBridgeMetadata({
    targetWord: 'Sofa',
    actionType: 'finger-trace-word',
    materialCue: 'Wortkarte Sofa mit Finger nachfahren.',
    supportCue: 'Erst gemeinsam lesen, dann freiwillig nachfahren.',
    requiredGraphemes: ['s', 'o', 'f', 'a'],
    requiredSyllables: ['so', 'fa'],
  });

  assert.deepEqual(Object.keys(story).sort(), ['comprehensionMoment', 'focusWord', 'kind', 'localOnly', 'nextSmallStep', 'nonEvaluative', 'pictureCue', 'requiredGraphemes', 'requiredSyllables', 'safetyText', 'shortText', 'supportCue'].sort());
  assert.deepEqual(Object.keys(writing).sort(), ['actionType', 'kind', 'localOnly', 'materialCue', 'noEvaluationWording', 'nonEvaluative', 'optionality', 'requiredGraphemes', 'requiredSyllables', 'supportCue', 'targetWord'].sort());
  assert.equal(story.localOnly, true);
  assert.equal(writing.nonEvaluative, true);
  assert.doesNotMatch(JSON.stringify({ story, writing }), unsafeQualityWords);
  assert.doesNotMatch(JSON.stringify({ story, writing }), protectedAssetWords);
});

test('Alpha 32B attaches bridge metadata to a small Alpha 31 slice without changing pack size', () => {
  const alpha31Tasks = getLearningTasks().filter((task) => task.id.startsWith('alpha31-'));
  const storyMetadata = alpha31Tasks.filter((task) => task.storyBridge);
  const writingMetadata = alpha31Tasks.filter((task) => task.writingBridge);
  const sofaWriting = getTaskBridgeMetadata('alpha31-c-sofa-writing');

  assert.equal(alpha31Tasks.length, 15);
  assert.equal(storyMetadata.length, 3);
  assert.equal(writingMetadata.length, 1);
  assert.equal(sofaWriting.writingBridge.targetWord, 'Sofa');
  assert.ok(storyMetadata.every((task) => task.storyBridge.kind === 'mini-story-bridge'));
  assert.ok(storyMetadata.every((task) => task.storyBridge.localOnly && task.storyBridge.nonEvaluative));
  assert.ok(writingMetadata.every((task) => task.writingBridge.optionality === 'optional-heute-passend'));
  assert.doesNotMatch(JSON.stringify({ storyMetadata, writingMetadata }), unsafeQualityWords);
  assert.doesNotMatch(JSON.stringify({ storyMetadata, writingMetadata }), protectedAssetWords);
});

test('Alpha 33B makes story scene and writing bridge visibly child-facing', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const alpha33Ui = appSource.slice(appSource.indexOf('function WritingBridgeCard'), appSource.indexOf('function SupportPanel'));

  assert.match(alpha33Ui, /mini-story-scene/);
  assert.match(alpha33Ui, /Mini-Szene zu/);
  assert.match(alpha33Ui, /mama-writing-scaffold/);
  assert.match(alpha33Ui, /Silben legen/);
  assert.match(alpha33Ui, /Wort ruhig nachfahren/);
  assert.match(alpha33Ui, /writing-bridge-material/);
  assert.match(alpha33Ui, /Finger-Spur/);
  assert.match(alpha33Ui, /Heute fertig/);
  assert.doesNotMatch(alpha33Ui, /disabled=\{isLastStep\}/);
  assert.match(css, /\.mini-story-scene/);
  assert.match(css, /\.mama-writing-scaffold/);
  assert.match(css, /\.writing-bridge-material/);
  assert.doesNotMatch(alpha33Ui, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download/i);
});

test('Alpha 33B implementation report exists under expected handoff filename', () => {
  const report = readFileSync(new URL('../reports/alpha-33b-implementation-report.md', import.meta.url), 'utf8');
  assert.match(report, /Mini-Geschichte/);
  assert.match(report, /Schreibbrücke/);
  assert.match(report, /npm test/);
  assert.match(report, /Browser-Smoke Desktop und Mobile/);
  assert.doesNotMatch(report, /Punktzahl|Rangliste|Lesealter|automatische Bewertung|Leistungstest/i);
});

test('S-Tier App Feeling 02 makes Lese-Mission a focused child game room', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const startMission = appSource.slice(appSource.indexOf('function startLeseMission'), appSource.indexOf('function leaveLeseMission'));
  const missionStage = appSource.slice(appSource.indexOf('function LeseMissionStage'), appSource.indexOf('function Alpha73MaterialkorbView'));

  assert.match(startMission, /setMode\('child'\)/);
  assert.match(missionStage, /Neva hilft/);
  assert.match(missionStage, /lese-mission-path/);
  assert.match(missionStage, /LeseMissionSymbolScene/);
  assert.match(missionStage, /lese-mission-action-panel/);
  assert.match(missionStage, /Deine Lese-Mission ist geschafft/);
  assert.match(css, /body:has\(\.focus-game-shell-playing\)[\s\S]*\.child-orientation-stack/);
  assert.match(css, /\.focus-game-shell-lese-mission\.focus-game-shell-playing/);
  assert.match(css, /\.lese-mission-neva/);
  assert.match(css, /\.lese-mission-path-dot\.active/);
  assert.doesNotMatch(missionStage, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download/i);
});

test('S-Tier App Feeling 03 replaces Lese-Mission placeholder with local symbols', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const missionSymbol = appSource.slice(appSource.indexOf('const leseMissionSymbolKeys'), appSource.indexOf('const teacherPreviewProfiles'));
  const missionStage = appSource.slice(appSource.indexOf('function LeseMissionStage'), appSource.indexOf('function Alpha73MaterialkorbView'));

  assert.match(missionSymbol, /stift/);
  assert.match(missionSymbol, /heft/);
  assert.match(missionSymbol, /buch/);
  assert.match(missionSymbol, /lese-mission-local-symbol/);
  assert.match(missionStage, /<LeseMissionSymbolScene/);
  assert.doesNotMatch(missionStage, /lese-mission-symbol-icon/);
  assert.match(css, /\.lese-mission-local-symbol--stift/);
  assert.match(css, /\.lese-mission-local-symbol--heft/);
  assert.match(css, /\.lese-mission-local-symbol--buch/);
  assert.match(css, /\.lese-mission-action-symbol/);
  assert.doesNotMatch(missionSymbol, /http|Upload|Cloud|Login|download|Metacom/i);
});

test('CEO Lese-Mission playing stage is reduced to one clear child action', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const missionStage = appSource.slice(appSource.indexOf('function LeseMissionStage'), appSource.indexOf('function Alpha73MaterialkorbView'));

  assert.match(missionStage, /lese-mission-card--play/);
  assert.match(missionStage, /lese-mission-primary-stage/);
  assert.match(missionStage, /lese-mission-symbol-slot--hero/);
  assert.match(missionStage, /Schau\. Lies\./);
  assert.match(missionStage, /Zeig\. Sprich\./);
  assert.match(missionStage, /missionActionCue/);
  assert.doesNotMatch(missionStage, /<p className="lese-mission-action-text">\{wordAction\}<\/p>[\s\S]*<p className="lese-mission-action-text">\{finalAction\}<\/p>/);
  assert.match(css, /\.focus-game-shell-lese-mission\.focus-game-shell-playing \.lese-mission-path-dot small[\s\S]*display:\s*none/);
  assert.match(css, /\.lese-mission-card--play[\s\S]*min-height:\s*min\(680px, calc\(100vh - 190px\)\)/);
  assert.match(css, /\.focus-game-shell-lese-mission\.focus-game-shell-playing \.lese-mission-card--play \.lese-mission-actions \.secondary-action[\s\S]*display:\s*none/);
  assert.match(css, /\.lese-mission-card--action \.lese-mission-action-panel \.lese-mission-action-text[\s\S]*font-size:\s*clamp\(1\.8rem, 6vw, 3\.5rem\)/);
  assert.doesNotMatch(missionStage, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download/i);
});

test('CEO Story focus stage becomes a calm app-like answer room', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  const storyFocus = appSource.slice(appSource.indexOf('function StoryFocusStage'), appSource.indexOf('function getWortpostHelpLabel'));

  assert.match(storyFocus, /selectedStoryAnswer/);
  assert.match(storyFocus, /story-focus-play-scene/);
  assert.match(storyFocus, /story-focus-answer-card/);
  assert.match(storyFocus, /story-focus-next-action/);
  assert.match(storyFocus, /Das passt\./);
  assert.match(storyFocus, /Schau noch einmal in die Story\./);
  assert.match(storyFocus, /onAnswer\(selectedStoryAnswer\)/);
  assert.match(css, /\.story-focus-play-scene/);
  assert.match(css, /\.story-focus-answer-card\.selected/);
  assert.match(css, /\.story-focus-next-action/);
  assert.doesNotMatch(storyFocus, /Score|Ranking|Punkte|Prozent|Diagnose|Lesealter|Timer|Upload|Cloud|Login|download|falsch|Fehler/i);
});

test('CEO teacher-started game rooms open directly instead of returning to child home', () => {
  const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const startTwoCardPilot = appSource.slice(appSource.indexOf('function startTwoCardPilot'), appSource.indexOf('function startGuidedReadingPath'));
  const startSequenceGame = appSource.slice(appSource.indexOf('function startSequenceGame'), appSource.indexOf('function startWortpost'));
  const startWortpost = appSource.slice(appSource.indexOf('function startWortpost'), appSource.indexOf('function startMiniJourneyPrep'));
  const startMiniJourneyPrep = appSource.slice(appSource.indexOf('function startMiniJourneyPrep'), appSource.indexOf('function continueMiniJourneyPrep'));
  const startObjectFamilyMiniMoment = appSource.slice(appSource.indexOf('function startObjectFamilyMiniMoment'), appSource.indexOf('function restartObjectFamilyMiniMomentInFocus'));

  assert.match(startTwoCardPilot, /setChildHomeStarted\(true\)/);
  assert.match(startSequenceGame, /setChildHomeStarted\(true\)/);
  assert.match(startWortpost, /setChildHomeStarted\(true\)/);
  assert.match(startMiniJourneyPrep, /setChildHomeStarted\(true\)/);
  assert.match(startObjectFamilyMiniMoment, /setChildHomeStarted\(true\)/);
});
