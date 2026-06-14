# Schulwerkstatt Cockpit v3 - Nach dem Modul Beobachtung

STATE:
Done via CEO-Handoff. Hermes task `t_582164e2` was started with profile `schule`, but the worker crashed on the local Codex OAuth refresh-token issue before implementation. The requested product slice was completed directly in the project.

FILES_CHANGED:
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-cockpit-v3-nach-dem-modul-report.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/schulwerkstatt-cockpit-v3-module-check.png`

WHAT CHANGED:
- Added `Nach dem Modul: 60-Sekunden-Check` inside the cockpit.
- The teacher can select the module just used: LeseWerk, Lernwerkstatt, Spielraum, or anderes.
- The teacher can select the visible learning signal: sicher, braucht Bild/Material, braucht Modell/Vormachen, or war zu viel.
- The cockpit produces one calm recommendation and a next smallest teaching step.
- The card links back to `#beobachtung` and `#foerderkompass`.

CHECKS:
- HTML parse check: OK.
- Local linkcheck: `/index.html`, `/lesewerk-v1/dist/index.html`, `/ge-lernwerkstatt/dist/index.html`, `/spielraum-generator/dist/index.html` all returned 200.
- Browser smoke: `#modulcheck` visible, 4 module choices, 4 signal choices, no horizontal overflow.
- Interaction smoke: Lernwerkstatt + war zu viel updates the recommendation to `Entlasten` and heading to `Lernwerkstatt: Aufgabe verkleinern und regulieren`.

RISKS:
- Hermes profiles using Codex currently need re-authentication. The project itself is not blocked, but Hermes workers may keep crashing until the local Codex OAuth token is refreshed.
- The new check is intentionally not a diagnostic claim. It is a teacher-facing reflection helper.

NEXT_SLICE:
Add a small `Beobachtung übernehmen` bridge that pre-fills or scrolls into the observation/förderkompass area without storing student-identifying data.
