# GE Spielraum-Qualitaet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gartenpost-Qualitaet als wiederverwendbares GE-Spielraum-Muster in die GE-Lernwerkstatt und anschliessend in LeseWerk uebertragen.

**Architecture:** Erst wird das Muster dokumentiert und als kleiner app-naher Slice erprobt. Danach wird ein wiederverwendbarer `LearningGameShell`-Ansatz fuer React geplant, ohne die bestehenden grossen Dateien sofort zu zerlegen. LeseWerk folgt erst nach erfolgreicher GE-Lernwerkstatt-Pruefung.

**Tech Stack:** React/Vite in `projects/ge-lernwerkstatt`, React/TypeScript/esbuild in `projects/lesewerk-v1`, lokale Browserpruefung, keine neuen Dependencies.

---

## File Map

- Create: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`
  - Verantwortlich fuer Musterbeschreibung, Akzeptanzkriterien, Do/Don'ts und Uebertragungsregeln.
- Create: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-20-ge-spielraum-pattern.md`
  - Erster sicherer Codex-Handoff: Pattern dokumentieren, keine App-Integration.
- Later create or modify after Pattern-Review:
  - `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx`
  - `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/styles.css`
  - Ziel: einen kleinen Spielraum-Slice app-nah einbauen oder bestehenden `SymbolSortiergarten` auf Pattern heben.
- Later create or modify after GE-Slice:
  - `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
  - `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
  - Ziel: eine Leseuebung als ruhigen Spielraum mit Wort-/Silbenkarte und 2-4 Touchzielen bauen.

## Task 1: Pattern aus Gartenpost extrahieren

**Files:**
- Create: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`
- Read: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html`
- Read: `/Users/zondrius/hermes-workspace/handoff/codex-outbox/codex-result-2026-05-20-gartenpost-prototyp.md`
- Read: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/BETA_3_0_QUALITAETSSTANDARD.md`
- Read: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/LERNKREISLAUF_MODELL.md`

- [ ] **Step 1: Pattern-Datei schreiben**

Create `GE-SPIELRAUM-PATTERN.md` with these sections:

```markdown
# GE-Spielraum-Pattern

## Zweck

Ein GE-Spielraum ist ein ruhiger, lokaler Lernraum fuer eine konkrete Handlung. Er ersetzt Formulare im Kindermodus durch eine sichtbare Aufgabe, grosse Touchziele, positive Hilfen und getrennte Lehrkraftlogik.

## Pflichtmerkmale

- eigener visueller Raum, nicht Dashboard/Formular;
- eine Hauptaktion pro Bildschirm;
- grosses zentrales Lernobjekt;
- 2-4 grosse Touchziele;
- Antippen als Hauptbedienung;
- Hilfe sichtbar: weniger Auswahl, vormachen, Symbolhinweis oder Pause;
- Feedback wertschatzend und handlungsnah;
- Lehrkraftbereich getrennt;
- keine Punkte, Timer, Rankings, rote Fehlerdramaturgie, Diagnosesprache oder echten Namen.

## Komponentenmodell

- `GameSpace`: visueller Raum und Navigation.
- `FocusObject`: Karte, Wort, Menge, Symbol oder Gegenstand.
- `ChoiceTargets`: grosse Ziele fuer Auswahl/Zuordnung.
- `SupportBar`: Hilfe, Nochmal, Fertig.
- `FeedbackBubble`: kurze Rueckmeldung.
- `TeacherDrawer`: Level, Hilfegrad, Kommunikation, naechster Schritt.

## Uebertragung auf GE-Lernwerkstatt

Geeignet fuer Mengen, Sortieren, Symbol/Gegenstand, Lebenspraxis und Kommunikation. Start mit einem einzigen Slice, der lokal pruefbar bleibt.

## Uebertragung auf LeseWerk

Geeignet fuer Silben-/Wort-/Bild-Zuordnung: grosse Wortkarte, 2-4 Bild-/Silbenziele, Hilfe weniger Auswahl, vormachen/lautieren, Feedback ohne Richtig/Falsch-Druck.

## Pruefcheckliste

- Vollstaendige Runde funktioniert.
- Hilfe reduziert oder modelliert.
- Schmale Breite ohne Ueberlappung.
- Kinderansicht ohne 1-10.
- Keine externen Assets oder personenbezogenen Daten.
```

- [ ] **Step 2: Pattern gegen Gartenpost abgleichen**

Run:

```bash
rg -n "Hilfe|Nochmal|Fertig|Beobachtung|1-10|fetch|localStorage|https?://" /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/gartenpost-prototyp.html
```

Expected:

- `Hilfe`, `Nochmal`, `Fertig`, `Beobachtung`, `1-10` appear as intended.
- No external `http`/`https`, `fetch`, or storage usage appears except if the search shows none for those terms.

- [ ] **Step 3: No-App-Change check**

Run:

```bash
git -C /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt status --short
```

Expected:

- Pattern file and existing game-lab prototype/outbox files may be untracked/modified.
- Do not modify `src/main.jsx`, `src/styles.css`, or `package.json` in Task 1.

## Task 2: GE-Lernwerkstatt App-Slice planen

**Files:**
- Read: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx`
- Read: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/styles.css`
- Read: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`
- Create: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-21-ge-spielraum-app-slice.md`

- [ ] **Step 1: Existing targets identify**

Run:

```bash
rg -n "function SymbolSortiergarten|function StudentModeBeta|uebungen|student-beta|symbol-sortiergarten" /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx
```

Expected:

- Shows current app entry points for student mode and symbol-sortiergarten.

- [ ] **Step 2: Choose safest first app target**

Decision rule:

- If `SymbolSortiergarten` already exists and is isolated, upgrade that first.
- If it is too tangled, add a new `Gartenpost` route/kachel but keep it small.
- Do not refactor the whole `main.jsx`.

- [ ] **Step 3: Write app-slice handoff**

The handoff must require:

- one small visible app slice;
- no new dependencies;
- no real data;
- no deployment/commit;
- browser screenshot check desktop and narrow width;
- result report in `handoff/codex-outbox`.

## Task 3: GE-Lernwerkstatt App-Slice ausfuehren

**Files:**
- Modify likely: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/main.jsx`
- Modify likely: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/src/styles.css`
- Test: local build and browser check.

- [ ] **Step 1: Write small failing/inspection check before edit**

Run:

```bash
cd /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt && npm run build
```

Expected:

- Build status recorded before edits.

- [ ] **Step 2: Implement only one app slice**

Implementation boundaries:

- keep child-facing UI separate from teacher-facing 1-10 logic;
- add or upgrade exactly one playroom;
- preserve existing dashboard and observation flows;
- no external assets.

- [ ] **Step 3: Verify**

Run:

```bash
cd /Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt && npm run build
```

Expected:

- Build exits 0.

Browser checks:

- open local Vite app;
- complete one round;
- test one help action;
- test narrow width;
- confirm no 1-10 in child area.

## Task 4: LeseWerk Slice planen

**Files:**
- Read: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- Read: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- Read: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt/game-lab/GE-SPIELRAUM-PATTERN.md`
- Create: `/Users/zondrius/hermes-workspace/handoff/codex-inbox/codex-handoff-2026-05-22-lesewerk-spielraum-slice.md`

- [ ] **Step 1: Identify current reading card flow**

Run:

```bash
rg -n "reading-card|syllable|daily-path|support|help|Fertig|Nochmal|Hilfe" /Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx /Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css
```

Expected:

- Shows existing LeseWerk reading path and support affordances.

- [ ] **Step 2: Select one reading interaction**

Recommended first slice:

- one large word/syllable card;
- 2-3 picture or syllable targets;
- tap word card -> tap target -> calm arrival/feedback;
- help reduces targets or models reading aloud with text hint;
- teacher area remains separate.

## Task 5: LeseWerk Slice ausfuehren und vergleichen

**Files:**
- Modify likely: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/App.tsx`
- Modify likely: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/src/styles.css`
- Test: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1/tests/*.test.mjs`

- [ ] **Step 1: Baseline checks**

Run:

```bash
cd /Users/zondrius/hermes-workspace/projects/lesewerk-v1 && npm test && npm run build
```

Expected:

- Record current pass/fail before edits.

- [ ] **Step 2: Implement one LeseWerk playroom slice**

Boundaries:

- no full rewrite;
- no external assets;
- no scoring/timer;
- keep existing teacher/child separation;
- keep current content model unless a tiny local fixture is safer.

- [ ] **Step 3: Verify and compare to Gartenpost**

Run:

```bash
cd /Users/zondrius/hermes-workspace/projects/lesewerk-v1 && npm test && npm run build
```

Expected:

- Tests and build status recorded.

Browser checks:

- complete one reading round;
- test help;
- screenshot desktop/narrow;
- compare against `GE-SPIELRAUM-PATTERN.md`.

## Self-Review

- Spec coverage: Pattern, GE app slice, LeseWerk slice, verification, privacy and no-deployment boundaries are covered.
- Placeholder scan: no open implementation blanks should remain in active tasks.
- Scope check: first executable handoff is Task 1 only; app integration waits for pattern review.

## Execution Choice

Recommended execution order:

1. Run Task 1 as the next Codex-Handoff.
2. Review the pattern file.
3. Let Hermes create the GE app-slice handoff.
4. Only after GE app-slice succeeds, create LeseWerk handoff.

Do not execute Tasks 3 and 5 automatically from cron.
