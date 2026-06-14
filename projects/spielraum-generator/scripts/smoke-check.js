import fs from 'node:fs';

const htmlPath = new URL('../dist/index.html', import.meta.url);
const dataPath = new URL('../data/silben-garten.goal.json', import.meta.url);
const html = fs.readFileSync(htmlPath, 'utf8');
const goal = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const requiredSceneIds = ['start', 'bild', 'silben', 'wort', 'satz', 'geschichte', 'finish'];
const missingScenes = requiredSceneIds.filter((id) => !html.includes(`data-scene-id="${id}"`));
if (missingScenes.length) {
  throw new Error(`Missing scenes: ${missingScenes.join(', ')}`);
}

if (goal.schemaVersion !== 2) throw new Error('Generator data must use schemaVersion 2.');
const interactiveScenes = goal.scenes.filter((scene) => !['start', 'finish'].includes(scene.type));
const missingExpected = interactiveScenes.filter((scene) => !scene.expectedAnswer || !scene.feedback?.correct || !scene.feedback?.help || !scene.repeatText || !scene.difficultyGate || !scene.visualCueType || typeof scene.maxChoices !== 'number');
if (missingExpected.length) {
  throw new Error(`Missing V2 answer/help metadata: ${missingExpected.map((scene) => scene.id).join(', ')}`);
}
for (const scene of interactiveScenes) {
  if (!html.includes(`data-scene-id="${scene.id}"`) || !html.includes(`data-expected-answer="${scene.expectedAnswer}"`)) {
    throw new Error(`Generated HTML misses expected answer metadata for ${scene.id}`);
  }
}

const childModeMatch = html.match(/<main[\s\S]*?<\/main>/i);
if (!childModeMatch) throw new Error('No child main area found.');
const childText = childModeMatch[0];
const forbidden = ['score', 'Punkte', 'Timer', 'Ranking', 'Note', 'Diagnose', 'Fehler', 'falsch'];
const foundForbidden = forbidden.filter((word) => new RegExp(`\\b${word}\\b`, 'i').test(childText));
if (foundForbidden.length) {
  throw new Error(`Forbidden child-mode pressure words found: ${foundForbidden.join(', ')}`);
}

const neededStrings = ['Silben-Garten', 'Mama', 'Sofa', 'Ball', 'Bus', 'Nochmal', 'Weiter', 'Fertig', 'Noch einmal hören'];
const missingStrings = neededStrings.filter((s) => !html.includes(s));
if (missingStrings.length) throw new Error(`Missing visible strings: ${missingStrings.join(', ')}`);

if (!html.includes('class="teacher-toggle"') || !html.includes('id="teacher-panel"') || !html.includes('hidden')) {
  throw new Error('Teacher panel must exist and remain secondary/hidden by default.');
}
if (!html.includes('journey-path') || !html.includes('trail-step')) {
  throw new Error('Journey/path indicator missing.');
}
if (!html.includes('speechSynthesis') || !html.includes('SpeechSynthesisUtterance') || !html.includes("'speechSynthesis' in window") || !html.includes('else {')) {
  throw new Error('Web Speech API fallback logic missing.');
}
const externalNetworkPatterns = [/https?:\/\//i, /<script[^>]+src=/i, /<link[^>]+href=/i, /fetch\s*\(/i, /XMLHttpRequest/i, /sendBeacon/i, /navigator\.sendBeacon/i];
const foundNetwork = externalNetworkPatterns.filter((pattern) => pattern.test(html));
if (foundNetwork.length) {
  throw new Error(`External network reference found: ${foundNetwork.map((pattern) => pattern.source).join(', ')}`);
}

const jsMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
if (!jsMatch) throw new Error('No inline JS found.');
new Function(jsMatch[1]);

console.log(JSON.stringify({
  ok: true,
  checkedFile: htmlPath.pathname,
  scenes: requiredSceneIds.length,
  schemaVersion: goal.schemaVersion,
  answerMetadataScenes: interactiveScenes.length,
  forbiddenPressureWordsInChildMode: foundForbidden.length,
  teacherPanelSecondary: true,
  journeyPath: true,
  webSpeechFallback: true,
  externalNetworkReferences: 0,
  jsSyntax: 'ok'
}, null, 2));
