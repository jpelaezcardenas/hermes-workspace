# Execute Goal - Schulwerkstatt x LeseWerk Produktklarheit v1

Datum: 2026-05-31

## Oberziel

Hermes-Schulwerkstatt soll das zentrale Lehrer-Cockpit werden. LeseWerk bleibt das starke Premium-Lesemodul, GE-Lernwerkstatt das Beobachtungs-/Kompetenzmodul und Spielraum Generator die spielbare Aufgabenmaschine. Ziel ist ein klarer, hochwertiger, lokaler Workflow: Lehrkraft startet in der Schulwerkstatt, waehlt Ziel/Profil, bekommt passende Aufgabe, Material, Beobachtungsfrage, naechsten Schritt und bei Lesefokus einen sinnvollen LeseWerk-Uebergang.

## /goal Prompt

/goal Build `Schulwerkstatt x LeseWerk Produktklarheit v1` as a controlled, local, teacher-facing product slice. The final product must make the existing ecosystem easier to understand and use without adding unsafe storage, external assets, real student data, diagnosis language, score/ranking/timer pressure, or broad rewrites.

Context:
- Main cockpit: `/Users/zondrius/hermes-workspace/projects/hermes-schulwerkstatt/index.html`
- LeseWerk app: `/Users/zondrius/hermes-workspace/projects/lesewerk-v1`
- GE Lernwerkstatt: `/Users/zondrius/hermes-workspace/projects/ge-lernwerkstatt`
- Spielraum Generator: `/Users/zondrius/hermes-workspace/projects/spielraum-generator`
- Current LeseWerk facts: 101 local tasks, 24 stories, premium mini journeys, Alpha-73A controlled everyday vocabulary pack with 16 word opportunities, object family Sofa/Tisch/Tasse/Teller, no backend/cloud/login.
- Current Schulwerkstatt facts: teacher cockpit, weekly plan, Förderkompass, Aufgabenbank, Druckkarten, Materialkorb, Team-Check, Gruppenmodus, Lernpfad-Memory, local links.

Build only small, verifiable improvements:
1. Product map / Start-here clarity: create or improve a visible teacher-facing orientation that explains the route in the app itself: Start in Schulwerkstatt -> choose focus/profile -> pick module -> prepare material -> run child activity -> observe -> next small step.
2. LeseWerk bridge clarity: make it easier to see which reading-related Schulwerkstatt tasks can connect to LeseWerk, but do not add automatic diagnosis or unsafe deep-link assumptions.
3. LeseWerk Alpha-73A visibility: in LeseWerk or a report, expose the 16 controlled everyday vocabulary opportunities by domain, gate and teacher-led status. If code change is too risky, produce an exact implementation plan first.
4. Product documentation: make README/report files match the actual state, not old Alpha-1 language.
5. QA and safety: verify LeseWerk tests, GE-Lernwerkstatt build, Spielraum smoke and Schulwerkstatt local links. Report gaps honestly.

Strict rules:
- No real student data.
- No new external dependencies.
- No remote assets, no protected symbol systems, no uploads.
- No automatic storage of sensitive learning profiles.
- No large redesign in one task.
- If a slice is too big, split and finish the smallest useful part.
- Every implementation task must write a report and run verification.
- If blocked, write a clear blocker report with exact next action instead of retrying the same prompt.

Expected final deliverables:
- A short product map/report in `hermes-schulwerkstatt/reports/`.
- Any safe code/doc improvements completed with verification.
- A follow-up recommendation: next smallest high-value implementation slice.
- Kanban should end with no blocked/running stale tasks or a precise blocker reason.

## Kontrollierte Task-Kette

1. Fach-/UX-Spezifikation: Was muss eine Lehrkraft zuerst sehen, damit Schulwerkstatt, LeseWerk, GE-Lernwerkstatt und Spielraum als ein System verstanden werden?
2. Code-Slice Schulwerkstatt: kleine Start-/Produktkarte oder vorhandenen Startpfad verbessern, ohne neue Datenlogik.
3. Code-Slice LeseWerk: Alpha-73A-Wortpaket sichtbar/fassbar machen oder als exakten Plan vorbereiten, wenn Code-Risiko zu hoch ist.
4. QA-Slice: Tests, Builds, Smoke-Checks, Linkcheck und mobile/desktop Sichtung.
5. Synthese: Ergebnis, Restluecken und naechster Weltklasse-Slice.

## Erfolgskriterien

- Lehrkraft erkennt innerhalb von 30 Sekunden: Wo starte ich, welches Modul passt, was ist der naechste kleine Schritt?
- LeseWerk wirkt nicht mehr wie eine isolierte Neben-App, sondern als klarer Lesebaustein der Schulwerkstatt.
- LeseWerk bleibt fuer Kinder ruhig, spielerisch und druckfrei.
- Die Schulwerkstatt bleibt lehrer-facing und datenschutzsicher.
- Alle neuen Aussagen sind durch Dateien, Tests oder Reports belegbar.
