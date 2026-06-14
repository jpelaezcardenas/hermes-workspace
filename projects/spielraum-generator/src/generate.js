import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const goal = JSON.parse(fs.readFileSync(path.join(root, 'data/silben-garten.goal.json'), 'utf8'));
const outDir = path.join(root, 'dist');
fs.mkdirSync(outDir, { recursive: true });

const words = Object.fromEntries(goal.vocabulary.map((entry) => [entry.word, entry]));
const sceneIndex = Object.fromEntries(goal.scenes.map((scene, index) => [scene.id, index]));

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function attrs(scene, extra = {}) {
  const values = {
    'data-scene-id': scene.id,
    'data-scene-type': scene.type,
    'data-expected-answer': scene.expectedAnswer || '',
    'data-repeat-text': scene.repeatText || scene.prompt || '',
    'data-difficulty-gate': scene.difficultyGate || '',
    'data-visual-cue-type': scene.visualCueType || '',
    'data-max-choices': scene.maxChoices ?? '',
    'data-correct-feedback': scene.feedback?.correct || 'Gut. Das passt. Weiter geht es.',
    'data-help-feedback': scene.feedback?.help || `Schau noch einmal. Suche ${scene.focusWord || 'das passende Bild'}.`,
    ...extra
  };
  return Object.entries(values).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ');
}

function objectCue(cue, label = '') {
  const safe = escapeHtml(label);
  return `<div class="object-cue object-${escapeHtml(cue)}" aria-label="${safe}"><span class="object-shine" aria-hidden="true"></span><span class="object-label">${safe}</span></div>`;
}

function pathIndicator(scene) {
  const activeIndex = sceneIndex[scene.id] ?? 0;
  const items = goal.scenes.map((item, index) => `<span class="trail-step ${index === activeIndex ? 'active' : ''} ${index < activeIndex ? 'visited' : ''}" aria-label="Station ${index + 1}: ${escapeHtml(item.title || item.focusWord || item.id)}"><span>${index + 1}</span></span>`).join('');
  return `<nav class="journey-path" aria-label="Gartenweg"><div class="trail-line" aria-hidden="true"></div>${items}</nav>`;
}

function sceneHeader(scene, focus) {
  const place = (sceneIndex[scene.id] ?? 0) + 1;
  const total = goal.scenes.length;
  return `<div class="scene-orientation">
    ${pathIndicator(scene)}
    <p class="micro-label">Station ${place} von ${total}</p>
    <p class="focus-pill">Heute: <strong>${escapeHtml(scene.focusWord || scene.title || goal.theme)}</strong></p>
    <h2>${escapeHtml(scene.prompt || scene.title)}</h2>
    <p class="next-hint">${escapeHtml(scene.nextStep || 'Tippe weiter, wenn du bereit bist.')}</p>
  </div>`;
}

function choiceButton(text, cue, kind = 'choice') {
  return `<button class="big-card ${kind}" data-action="answer" data-answer="${escapeHtml(text)}">${cue ? objectCue(cue, text) : ''}<span>${escapeHtml(text)}</span></button>`;
}

function sceneTemplate(scene, inner) {
  const focus = words[scene.focusWord] || goal.vocabulary[0];
  return `<section class="scene" ${attrs(scene)} aria-label="${escapeHtml(scene.title || scene.prompt)}">
    <div class="garden-sky" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="scene-card">
      ${sceneHeader(scene, focus)}
      ${inner}
      <div class="scene-actions">
        <button class="soft-button" data-action="repeat">Noch einmal hören</button>
        <button class="next-button" data-action="next">Weiter</button>
      </div>
    </div>
  </section>`;
}

function renderScene(scene) {
  const focus = words[scene.focusWord] || goal.vocabulary[0];
  switch (scene.type) {
    case 'start':
      return `<section class="scene active" ${attrs(scene)} aria-label="Start">
        <div class="start-world">
          <div class="sun" aria-hidden="true"></div>
          ${pathIndicator(scene)}
          <div class="title-badge">${escapeHtml(goal.theme)}</div>
          <h1>Silben-Garten</h1>
          <p>${escapeHtml(scene.prompt)}</p>
          <p class="next-hint">${escapeHtml(scene.nextStep)}</p>
          <div class="garden-bed" aria-hidden="true"><span></span><span></span><span></span></div>
          <div class="start-objects" aria-hidden="true">
            ${objectCue('person', 'Mama')}${objectCue('sofa', 'Sofa')}${objectCue('ball', 'Ball')}${objectCue('bus', 'Bus')}
          </div>
          <button class="start-button" data-action="next">Los geht es</button>
        </div>
      </section>`;
    case 'picture-choice':
      return sceneTemplate(scene, `<div class="focus-object">${objectCue(focus.cue, focus.word)}</div><div class="two-choices">${choiceButton('Mama', 'person')}${choiceButton('Bus', 'bus')}</div>`);
    case 'syllable-build':
      return sceneTemplate(scene, `<div class="focus-object">${objectCue(focus.cue, focus.word)}</div><div class="syllable-row"><button class="syllable blue" data-action="answer" data-answer="Sofa">So</button><button class="syllable red" data-action="answer" data-answer="Sofa">fa</button></div><div class="built-word" aria-live="polite">So · fa</div>`);
    case 'word-object':
      return sceneTemplate(scene, `<div class="focus-object">${objectCue(focus.cue, focus.word)}</div><div class="two-choices word-choices">${choiceButton('Bus', '', 'word-choice')}${choiceButton('Sofa', '', 'word-choice')}</div>`);
    case 'sentence-read':
      return sceneTemplate(scene, `<div class="sentence-strip"><span>${escapeHtml(focus.sentence)}</span></div><div class="two-choices">${choiceButton('Mama', 'person')}${choiceButton('Ball', 'ball')}</div>`);
    case 'mini-story':
      return sceneTemplate(scene, `<div class="story-stage">${objectCue('person', 'Mama')}${objectCue('ball', 'Ball')}</div><p class="prompt-big">${escapeHtml(scene.prompt)}</p><div class="two-choices">${choiceButton('Ball', 'ball')}${choiceButton('Sofa', 'sofa')}</div>`);
    case 'finish':
      return `<section class="scene" ${attrs(scene)} aria-label="Ende">
        <div class="finish-card">
          ${pathIndicator(scene)}
          <div class="flower-ring" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
          <h2>${escapeHtml(scene.title)}</h2>
          <p>${escapeHtml(scene.prompt)}</p>
          <p class="next-hint">${escapeHtml(scene.nextStep)}</p>
          <div class="finish-actions">
            <button class="soft-button strong" data-action="restart">Nochmal</button>
            <button class="soft-button" data-action="repeat">Noch einmal hören</button>
            <button class="soft-button" data-action="done">Fertig</button>
          </div>
        </div>
      </section>`;
    default:
      return '';
  }
}

const sceneHtml = goal.scenes.map(renderScene).join('\n');
const teacherNotes = `
  <aside id="teacher-panel" class="teacher-panel" hidden>
    <button class="teacher-close" data-action="teacher-close">Schließen</button>
    <h2>Lehrkraft-Notizen</h2>
    <p><strong>Lernziel:</strong> ${escapeHtml(goal.learningGoal)}</p>
    <p><strong>Schema V2:</strong> Szenen enthalten expectedAnswer, feedback, repeatText, difficultyGate, visualCueType und maxChoices.</p>
    <p><strong>Vorlesen:</strong> Nutzt optional die lokale Web Speech API des Browsers. Es gibt keine Aufnahme, keine Speicherung und keine externe Netzwerkverbindung durch diese App. Wenn Vorlesen nicht verfügbar ist, erscheint der Text sichtbar als Wiederholung.</p>
    <p><strong>Bekannte Einheiten:</strong> ${goal.knownUnits.map(escapeHtml).join(', ')}</p>
    <p><strong>Wortschatz:</strong> ${goal.vocabulary.map((v) => escapeHtml(v.word)).join(', ')}</p>
    <p><strong>Beobachtbar:</strong> Orientierung zum Objekt, Auswahl zwischen zwei Optionen, Nachsprechen/Lesen einzelner Silben, Wiederholen bei Bedarf.</p>
    <p><strong>Nicht enthalten:</strong> personenbezogene Daten, Diagnosen, Leistungsdruck, externe Assets.</p>
  </aside>`;

const html = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${escapeHtml(goal.theme)}</title>
  <style>
    :root { --leaf:#3f8f5f; --leaf-dark:#216244; --cream:#fff8df; --sky:#bdeeff; --sun:#ffd66b; --blue:#4f8df7; --red:#f36a68; --ink:#23312a; --soil:#b77a42; --path:#f5d38d; }
    * { box-sizing: border-box; }
    html, body { margin:0; min-height:100%; font-family: ui-rounded, "Arial Rounded MT Bold", system-ui, -apple-system, sans-serif; color:var(--ink); background:linear-gradient(180deg,var(--sky),#eaffd4 62%,#bce78d); }
    body { overflow:hidden; }
    .app-shell { min-height:100vh; min-height:100dvh; position:relative; display:flex; flex-direction:column; }
    .child-game { flex:1; position:relative; display:grid; place-items:center; padding:clamp(12px,2.6vw,30px); }
    .scene { display:none; width:min(1080px,100%); min-height:calc(100vh - 42px); min-height:calc(100dvh - 42px); align-items:center; justify-content:center; position:relative; }
    .scene.active { display:flex; }
    .scene-card, .start-world, .finish-card { width:100%; border-radius:42px; padding:clamp(20px,4.5vw,52px); background:rgba(255,248,223,.96); box-shadow:0 24px 60px rgba(31,86,55,.22), inset 0 0 0 4px rgba(255,255,255,.65); text-align:center; position:relative; overflow:hidden; }
    .scene-card::after, .finish-card::after, .start-world::after { content:""; position:absolute; left:0; right:0; bottom:0; height:70px; background:radial-gradient(circle at 16px 100%, #75bd61 0 16px, transparent 17px) repeat-x; background-size:46px 42px; opacity:.45; pointer-events:none; }
    h1 { font-size:clamp(3.2rem,8vw,6.7rem); margin:.08em 0; letter-spacing:.02em; color:var(--leaf-dark); text-shadow:0 5px 0 rgba(255,255,255,.75); }
    h2 { font-size:clamp(1.9rem,4.6vw,4.2rem); line-height:1.05; margin:.16em auto .25em; max-width:14ch; }
    p { font-size:clamp(1.08rem,2.25vw,1.9rem); line-height:1.32; }
    .micro-label, .focus-pill, .next-hint { display:inline-flex; padding:.42rem .9rem; border-radius:999px; background:#fff; color:var(--leaf-dark); font-weight:900; margin:.25rem; box-shadow:0 5px 0 rgba(214,229,184,.75); }
    .next-hint { background:#fff7bd; }
    .title-badge { display:inline-flex; padding:.55rem 1rem; border-radius:999px; background:#ffffffd9; font-weight:900; margin-top:34px; }
    .journey-path { width:min(760px,100%); margin:0 auto 14px; display:flex; align-items:center; justify-content:space-between; position:relative; padding:0 8px; }
    .trail-line { position:absolute; left:30px; right:30px; top:50%; height:16px; border-radius:999px; background:linear-gradient(90deg,#efd081,#f9dfa1); box-shadow:inset 0 3px 0 rgba(255,255,255,.55); transform:translateY(-50%); }
    .trail-step { width:38px; height:38px; border-radius:50%; display:grid; place-items:center; background:#fff8d1; box-shadow:0 5px 0 #dec178; z-index:1; font-weight:1000; color:#7a5a20; }
    .trail-step.visited { background:#bce78d; color:#225936; }
    .trail-step.active { background:#fff; color:var(--leaf-dark); outline:5px solid rgba(63,143,95,.28); transform:scale(1.14); }
    .start-button, .next-button, .soft-button, .big-card, .syllable { border:0; cursor:pointer; font:inherit; min-height:72px; touch-action:manipulation; transition:transform .16s ease, box-shadow .16s ease, filter .16s ease; }
    .start-button, .next-button { border-radius:28px; padding:1rem 2rem; background:linear-gradient(180deg,#62c889,#2f9660); color:#fff; font-size:clamp(1.35rem,2.8vw,2.1rem); font-weight:950; box-shadow:0 14px 0 #1f6e45, 0 24px 35px rgba(34,95,54,.26); }
    .start-button:active, .next-button:active, .big-card:active, .syllable:active, .soft-button:active { transform:translateY(5px) scale(.99); box-shadow:0 7px 0 rgba(0,0,0,.16); }
    .soft-button { border-radius:24px; padding:.9rem 1.35rem; background:#fff; color:var(--leaf-dark); font-weight:900; box-shadow:0 8px 0 #d9e9bd; }
    .soft-button.strong { background:#fff2a8; }
    .scene-actions, .finish-actions { display:flex; flex-wrap:wrap; gap:16px; justify-content:center; margin-top:clamp(20px,3.5vw,38px); position:relative; z-index:2; }
    .two-choices { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(14px,3vw,28px); margin:clamp(18px,3.3vw,32px) auto 0; max-width:780px; }
    .big-card { border-radius:34px; background:#fff; padding:clamp(14px,2.7vw,24px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; font-size:clamp(1.6rem,3.7vw,3.2rem); font-weight:950; box-shadow:0 14px 0 #dfedc4, 0 20px 34px rgba(61,114,70,.14); min-height:205px; }
    .big-card[data-answer]:focus-visible, .next-button:focus-visible, .soft-button:focus-visible, .start-button:focus-visible { outline:6px solid #ffffff; outline-offset:4px; }
    .word-choice { min-height:150px; background:linear-gradient(180deg,#fff,#eefcdf); }
    .focus-object, .story-stage, .start-objects { display:flex; justify-content:center; align-items:end; gap:clamp(12px,3vw,28px); flex-wrap:wrap; position:relative; z-index:1; }
    .garden-bed { height:34px; max-width:720px; margin:12px auto 8px; border-radius:50% 50% 0 0; background:linear-gradient(180deg,#8ecf67,#5aa846); box-shadow:0 10px 0 #4d8d3b; }
    .object-cue { width:clamp(112px,18vw,198px); aspect-ratio:1; position:relative; display:grid; place-items:end center; margin:auto; filter:drop-shadow(0 12px 8px rgba(56,87,48,.14)); }
    .object-label { position:absolute; bottom:-.35rem; background:#fff; border-radius:999px; padding:.3rem .82rem; font-size:clamp(1rem,1.9vw,1.38rem); font-weight:950; box-shadow:0 4px 10px rgba(0,0,0,.1); z-index:5; }
    .object-shine { position:absolute; width:28%; aspect-ratio:1; border-radius:50%; background:rgba(255,255,255,.55); top:16%; left:24%; z-index:4; }
    .object-person::before { content:""; width:42%; aspect-ratio:1; border-radius:50%; background:#ffd6a8; position:absolute; top:6%; box-shadow:0 -12px 0 #6b442d inset, 0 0 0 8px #74442d; z-index:2; }
    .object-person::after { content:""; width:72%; height:55%; border-radius:44% 44% 25% 25%; background:linear-gradient(180deg,#ff9aae,#ef5c76); position:absolute; bottom:14%; box-shadow:inset 0 -16px 0 rgba(142,42,65,.18); }
    .object-sofa::before { content:""; width:84%; height:49%; border-radius:32px 32px 26px 26px; background:linear-gradient(180deg,#9dbbff,#7099f0); position:absolute; bottom:22%; box-shadow:inset 0 -18px 0 #5f86df; }
    .object-sofa::after { content:""; width:98%; height:35%; border-radius:28px 28px 20px 20px; background:#6288df; position:absolute; bottom:10%; box-shadow:-38px 18px 0 -22px #496fc4, 38px 18px 0 -22px #496fc4; }
    .object-ball::before { content:""; width:72%; aspect-ratio:1; border-radius:50%; background:radial-gradient(circle at 35% 30%,#fff6a2 0 16%,#ffcf57 17% 42%,#ff8f53 43% 100%); position:absolute; bottom:18%; box-shadow:inset -10px -14px 0 rgba(0,0,0,.08); }
    .object-ball::after { content:""; width:52%; height:10px; border-radius:999px; background:rgba(123,78,28,.16); position:absolute; bottom:10%; }
    .object-bus::before { content:""; width:94%; height:55%; border-radius:22px 22px 16px 16px; background:#ffd65e; position:absolute; bottom:22%; box-shadow:inset 0 -16px 0 #f4b73d, -42px 36px 0 -30px #394653, 42px 36px 0 -30px #394653; }
    .object-bus::after { content:""; width:78%; height:18%; background:linear-gradient(90deg,#7cc7ff 0 28%,transparent 29% 36%,#7cc7ff 37% 64%,transparent 65% 72%,#7cc7ff 73% 100%); position:absolute; top:31%; border-radius:8px; }
    .syllable-row { display:flex; justify-content:center; gap:clamp(18px,4vw,36px); margin-top:22px; }
    .syllable { min-width:clamp(120px,23vw,230px); border-radius:34px; color:#fff; font-size:clamp(2.7rem,7.4vw,5.8rem); font-weight:1000; box-shadow:0 13px 0 rgba(0,0,0,.18); }
    .syllable.blue { background:linear-gradient(180deg,#75a7ff,var(--blue)); }
    .syllable.red { background:linear-gradient(180deg,#ff9290,var(--red)); }
    .built-word, .sentence-strip, .prompt-big { display:inline-flex; margin-top:20px; border-radius:28px; background:#fff; padding:.75rem 1.3rem; font-size:clamp(1.9rem,4.8vw,4.2rem); font-weight:950; box-shadow:0 10px 0 #e5efc8; }
    .sentence-strip span { white-space:normal; }
    .teacher-toggle { position:fixed; top:12px; right:12px; z-index:5; border:0; border-radius:999px; background:rgba(255,255,255,.82); padding:.55rem .8rem; color:#31583e; font-weight:900; }
    .teacher-panel { position:fixed; inset:18px; z-index:10; overflow:auto; border-radius:28px; background:#fffdf0; padding:28px; box-shadow:0 20px 80px rgba(0,0,0,.28); max-width:760px; margin:auto; max-height:calc(100dvh - 36px); }
    .teacher-panel h2 { font-size:2rem; max-width:none; }
    .teacher-panel p { font-size:1.05rem; text-align:left; }
    .teacher-close { float:right; border:0; border-radius:999px; background:#e7f4d8; padding:.6rem 1rem; font-weight:900; }
    .feedback { position:fixed; left:50%; bottom:24px; transform:translateX(-50%) translateY(18px); opacity:0; pointer-events:none; background:#fff; color:var(--leaf-dark); border-radius:999px; padding:.85rem 1.25rem; font-weight:950; font-size:1.16rem; box-shadow:0 12px 30px rgba(0,0,0,.16); transition:.2s ease; z-index:6; max-width:min(92vw,760px); text-align:center; }
    .feedback.show { opacity:1; transform:translateX(-50%) translateY(0); }
    .sun { width:clamp(76px,12vw,120px); aspect-ratio:1; border-radius:50%; background:var(--sun); box-shadow:0 0 0 18px rgba(255,214,107,.28); position:absolute; top:22px; right:30px; }
    .garden-sky span { position:absolute; top:20px; width:90px; height:26px; border-radius:999px; background:rgba(255,255,255,.62); }
    .garden-sky span:nth-child(1) { left:8%; } .garden-sky span:nth-child(2) { left:42%; top:34px; } .garden-sky span:nth-child(3) { right:10%; }
    .flower-ring span { display:inline-block; width:42px; height:42px; margin:8px; border-radius:50% 50% 50% 0; background:#ff90a8; transform:rotate(45deg); }
    @media (max-width: 680px) { body { overflow:auto; } .child-game { padding:10px; } .scene { min-height:calc(100dvh - 20px); } .scene-card, .start-world, .finish-card { border-radius:26px; padding:18px 12px 24px; } .two-choices { grid-template-columns:1fr; max-width:420px; } .big-card { min-height:126px; flex-direction:row; } .big-card .object-cue { width:94px; } .scene-actions { gap:10px; } .start-objects .object-cue { width:78px; } h1 { font-size:3rem; } h2 { font-size:1.9rem; max-width:15ch; } .journey-path { margin-top:4px; } .trail-step { width:30px; height:30px; font-size:.9rem; } .trail-line { left:20px; right:20px; height:12px; } .sun { width:62px; top:12px; right:14px; } .title-badge { margin-top:22px; max-width:75%; } }
    @media (prefers-reduced-motion: no-preference) { .object-ball::before { animation: bob 2.8s ease-in-out infinite; } .sun { animation: glow 4s ease-in-out infinite; } @keyframes bob { 50% { transform:translateY(-10px); } } @keyframes glow { 50% { filter:saturate(1.2) brightness(1.05); } } }
  </style>
</head>
<body>
  <div class="app-shell" data-generated-from="${escapeHtml(goal.id)}" data-schema-version="${escapeHtml(goal.schemaVersion)}">
    <button class="teacher-toggle" data-action="teacher-open" aria-controls="teacher-panel">Für Lehrkraft</button>
    <main class="child-game" aria-live="polite">
      ${sceneHtml}
    </main>
    ${teacherNotes}
    <div class="feedback" id="feedback" aria-live="polite">Gut. Wir gehen ruhig weiter.</div>
  </div>
  <script>
    const scenes = Array.from(document.querySelectorAll('.scene'));
    const feedback = document.getElementById('feedback');
    let current = Math.max(0, scenes.findIndex((scene) => scene.classList.contains('active')));
    function activeScene() { return scenes[current]; }
    function showScene(index) {
      current = Math.max(0, Math.min(index, scenes.length - 1));
      scenes.forEach((scene, sceneIndex) => scene.classList.toggle('active', sceneIndex === current));
    }
    function showFeedback(text = 'Gut. Wir gehen ruhig weiter.') {
      feedback.textContent = text;
      feedback.classList.add('show');
      window.clearTimeout(showFeedback.timer);
      showFeedback.timer = window.setTimeout(() => feedback.classList.remove('show'), 1800);
    }
    function repeatCurrentScene() {
      const text = activeScene()?.dataset.repeatText || activeScene()?.querySelector('h2,p')?.textContent || '';
      if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.88;
        window.speechSynthesis.speak(utterance);
        showFeedback(text);
      } else {
        showFeedback(text || 'Wir schauen noch einmal in Ruhe.');
      }
    }
    function handleAnswer(button) {
      const scene = activeScene();
      const expected = scene?.dataset.expectedAnswer;
      const answer = button.dataset.answer;
      if (!expected || answer === expected) {
        showFeedback(scene?.dataset.correctFeedback || 'Gut. Das passt. Weiter geht es.');
        button.setAttribute('aria-pressed', 'true');
        return;
      }
      showFeedback(scene?.dataset.helpFeedback || 'Schau noch einmal. Suche das passende Bild.');
    }
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const action = button.dataset.action;
      if (action === 'next') { showFeedback('Schön. Nächster Schritt.'); showScene(current + 1); }
      if (action === 'repeat') repeatCurrentScene();
      if (action === 'answer') handleAnswer(button);
      if (action === 'restart') { showFeedback('Wir starten noch einmal.'); showScene(0); }
      if (action === 'done') showFeedback('Fertig. Danke fürs Lesen.');
      if (action === 'teacher-open') document.getElementById('teacher-panel').hidden = false;
      if (action === 'teacher-close') document.getElementById('teacher-panel').hidden = true;
    });
    window.SpielraumGame = { scenes: scenes.map((s) => s.dataset.sceneId), showScene, repeatCurrentScene, handleAnswer };
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
console.log(`Generated ${path.join(outDir, 'index.html')}`);
