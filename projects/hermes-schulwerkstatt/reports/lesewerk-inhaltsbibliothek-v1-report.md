# LeseWerk Inhaltsbibliothek v1

STATE:
Done via CEO-Handoff. Hermes task `t_d9c12876` was created and started, but `neva` crashed before implementation because of the local Codex OAuth refresh-token issue. The requested library slice was implemented directly in the Schulwerkstatt cockpit.

FILES_CHANGED:
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/lesewerk-inhaltsbibliothek-v1-report.md`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/lesewerk-inhaltsbibliothek-v1-mobile.png`

WHAT_CHANGED:
- Added `LeseWerk Inhaltsbibliothek` as a visible cockpit section.
- Added 58 internal content cards across family, body, food, school, everyday life, animals, movement, and nature.
- Every card includes word, syllables, known-letter hints, category, icon, short sentence, reading stage, support type, and observation prompt.
- Added filters for reading stage, category, and support type.
- Added live count and preview grid with up to 12 readable cards.
- Connected the existing reading task generator to the expanded library so generated tasks and child-mode preview draw from the larger content pool.

CHECKS:
- HTML parse check: OK.
- Local linkcheck: `/index.html`, `/lesewerk-v1/dist/index.html`, `/ge-lernwerkstatt/dist/index.html`, `/spielraum-generator/dist/index.html` all returned 200.
- Browser smoke: library visible, count shows `58 passende Karten`, 12 preview cards render.
- Filter smoke: `silbe` + `essen` returns 3 matching cards and shows `Apfel` as first card.
- Mobile smoke at 390px: library visible, 12 cards render, no horizontal overflow.
- Screenshot: `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/lesewerk-inhaltsbibliothek-v1-mobile.png`

RISKS:
- Hermes Codex-backed profiles still need re-authentication before autonomous workers can complete tasks without CEO-Handoff.
- Icons are lightweight placeholders, not a licensed Metacom asset system.
- The library is now materially useful, but still needs classroom review and curation before it can be called complete.

NEXT_SLICE:
Build `LeseWerk Druckkarten v1`: printable word/syllable/sentence cards from the filtered library, with teacher-safe export and no student-identifying data.
