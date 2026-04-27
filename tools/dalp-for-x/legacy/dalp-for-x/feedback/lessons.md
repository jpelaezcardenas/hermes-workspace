---
title: "lessons.md — dalp-for-x Build Lessons"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.652566Z
---

# lessons.md — dalp-for-x Build Lessons

Durable learning from past builds. Update this file whenever a new lesson is confirmed.

---

## Lesson 001 — Widget w/x Hard Stop (2026-03-24)
**Issue**: HubSpot silently breaks the editor when any widget has w or x values other than `w=12, x=0`.
**Rule**: ALL widgets in sections 1-5 must have `w=12, x=0`. Section-6 is the ONLY exception (w=8/x=0 and w=4/x=8 columns). Before every PATCH, iterate every widget and assert compliance. Do not skip this check.
**Origin**: Same lesson as comparison-webmaster — applies identically here.

---

## Lesson 002 — Content Framing: Audience First (2026-03-24)
**Issue**: Natural instinct is to lead with DALP features. That's wrong for these pages.
**Rule**: Every "DALP for X" page must open with the audience's world: what regulations they face, what operations they run, what they're trying to achieve. DALP comes second, as the answer to their specific needs. Pages that lead with DALP features feel like brochures; pages that lead with audience context feel like expertise.
**Test**: If you can swap the audience name and the copy still works, the copy isn't audience-specific enough.

---

## Lesson 003 — Section-3 Navy Background Must Be Explicit (2026-03-24)
**Issue**: If `rowMetaData.styles.backgroundColor` is omitted or set incorrectly for section-3, the dark card section renders without its navy background, making the white card text unreadable.
**Rule**: Section-3 `rowMetaData` must always include `backgroundColor: {a:1, b:72, g:0, r:0}`. Verify this in the payload before every PATCH.

---

## Lesson 004 — Table `<td>` Color Must Be Explicit (2026-03-24)
**Issue**: HubSpot's default styles can override table cell text color. Without an explicit `color: #1a1a2e;` in each `<td>` style attribute, text may render incorrectly.
**Rule**: Every `<td>` in the context table (section-2) must have `style="... color: #1a1a2e; ..."` explicitly set.

---

## Lesson 005 — Research Before Writing (2026-03-24)
**Issue**: Writing Japan copy from memory risks outdated or inaccurate regulatory claims.
**Rule**: For every target, do live web research on the regulatory framework and key market developments before writing. Japan: FSA, Payment Services Act (PSA), Financial Instruments and Exchange Act (FIEA), stablecoin framework (2023), JFSA VASP regime. Do not rely solely on training data for regulatory facts.
