# Kinder-Spielwelt Vollbild v1

STATE:
Implemented in `index.html` as a fullscreen-style child overlay for the reading cycle. The kinderseitige Oberfläche can now be started from the reading cycle, stays focused on one task, uses large touch targets, and provides a clear return path for the teacher.

FILES_CHANGED:
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`
- `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/reports/kinder-spielwelt-v1-report.md`

WHAT_CHANGED:
- Added a fixed child-mode overlay with dark backdrop and a large inner surface.
- Added a dedicated fullscreen start button in the reading cycle.
- Added child-mode start/close controls plus return links back to Förderkreislauf and Bibliothek.
- Mirrored the current reading task into the fullscreen overlay so only one task is visible there.
- Kept the child view free of teacher texts, scores, and timers.
- Added body scroll lock while the child overlay is open.

CHECKS:
- Desktop browser smoke: `index.html` loads locally and the child overlay opens/closes.
- Console check: child overlay state toggles `data-open=true/false`, `aria-hidden=false/true`, and the overlay renders as fixed full-screen surface.
- Layout check: `document.documentElement.scrollWidth === window.innerWidth` while the overlay is open; no obvious horizontal overflow on desktop.
- Browser interaction: fullscreen start button from the reading cycle works.
- Browser interaction: return path back to teacher mode works.

RISKS / LIMITS:
- Fullscreen API can be browser-restricted; the overlay is implemented as a fixed full-screen surface and will still work even if native fullscreen is blocked.
- I did not complete a separate mobile-viewport browser emulation run in this session, so mobile behavior still needs a real narrow-width smoke test.
- The child view reuses the current reading task data; if you want a true child-only content stream, that should be a later slice.

QUALITY_ASSESSMENT:
This is a useful first v1, but it is still a surface-level child mode rather than a fully isolated child app. The biggest next quality lever is a narrow-width mobile test plus one explicit child-only start path from the Bibliothek card set.

NEXT_SLICE:
Add a real Bibliothek-start entry into the child mode, then run a narrow mobile smoke test and remove any remaining layout pressure or text density in the child surface.
