---
title: "PPTX Reviewer Lessons & Heuristics"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.656152Z
---

# PPTX Reviewer Lessons & Heuristics

## Structural Lessons
- Most deck failures are structural, not cosmetic.
- A deck with the wrong story arc cannot be saved by better spacing, icons, or polish.
- Overloaded slides kill credibility faster than minor visual imperfections.
- If a slide needs a speech to make sense, it is carrying too much weight.
- When in doubt, split one crowded slide into two clean slides.
- The cover-to-close arc matters more than any individual slide.
- A strong presentation should feel intentional from Slide 1 to the final close.
- If the ending fizzles, the whole deck feels unfinished even if the middle is solid.
- If you cannot name the exact problem slide, your review is too vague.
- Good reviews point to Slide X, explain what is wrong, and say how to fix it.
- “Needs more polish” is lazy feedback; “Slide 7 has three competing messages” is useful.
- For most SettleMint presentations, 15-25 slides is the sweet spot.
- Fewer than that can feel under-evidenced; more than that often means repetition or drift.
- Agenda, problem, solution, proof, architecture, and close should each earn their place.

## Brand & Template Lessons
- Brand drift usually starts with fonts and background misuse.
- If Figtree is not dominant, something probably went off the rails.
- White backgrounds on content slides are non-negotiable.
- Dark or branded backgrounds on ordinary content slides usually make the deck feel off-template fast.
- Cover and closing slides are the main legitimate exceptions for dark/branded backgrounds.
- Divider slides can be exceptions too, but only when clearly intentional and sparse.
- Background review must check the slide -> layout -> master inheritance chain.
- Looking only at visible colors is not enough; template inheritance hides a lot of sins.
- Some slides appear white in editing logic but still inherit branded assets underneath.
- The SettleMint template has roughly 30 slide layouts.
- Using fewer than 5 distinct layouts in a full deck is usually a missed opportunity.
- Reusing one generic layout for everything makes the deck feel assembled, not designed.
- Template compliance is about fit, not just visual similarity.
- A slide can look “fine” and still be wrong for the template system.

## Content Lessons
- DALP claims must be verifiable against the codebase or approved source material.
- If a claim cannot be verified, it does not belong in a client-facing deck.
- “Industry-leading” without comparison data is an instant credibility hit.
- Generic superiority language reads like marketing fog unless backed by proof.
- Client-facing decks should never contain [TODO], [TBD], draft markers, or placeholder copy.
- One unresolved placeholder can make the whole deck feel unsafe.
- Mermaid diagrams do not translate well to PPTX deliverables.
- If a diagram matters, rebuild it as native shapes, connectors, and labels.
- Every slide needs a clear “so what?”
- If there is no takeaway, cut the slide or rewrite it until the implication is obvious.
- Good content slides do one job: explain a point, prove a point, or move the story forward.
- Do not confuse “more nouns” with “more substance.”
- Proof beats adjectives.

## Technical PPTX Lessons
- python-pptx text replacement must traverse paragraph runs, not just top-level text containers.
- If you only replace easy text, the deck will look edited but still contain stale fragments.
- Tables require special care because merged cells and nested paragraphs can hide content.
- Cell merge handling is fragile; always inspect real output, not just code intent.
- Slide reordering is not free.
- Reordering slides can break relationships unless cleanup is handled correctly.
- Some template slides contain background images that bleed through even after a white override.
- A slide that looks fixed in one renderer can still be wrong in PowerPoint.
- Native editability matters: avoid baking text into images unless absolutely necessary.
- Always validate that the output PPTX opens in PowerPoint without repair prompts.
- “Opens in LibreOffice” is not the bar.
- A technically broken deck with good content is still a failed deliverable.

## Review Process Lessons
- Run automated inspection first, then do the human review.
- Automation is good at surfacing candidates; humans are good at judging severity.
- Use the inspector to find density, font, image, and background anomalies before forming opinions.
- Score conservatively.
- A 3 should be the default, not a 4.
- Reserve 4s and 5s for decks that are clearly above baseline, not merely competent.
- Always name specific slides in feedback.
- Slide-level notes make revision faster and remove ambiguity.
- Balance criticism with what works.
- Even weak decks usually contain one or two strong slides, and saying so improves adoption of the review.
- The fix path matters more than the score.
- A review should help someone improve the deck quickly, not just justify a verdict.
- Hard failures should be reserved for issues that truly block client use.

## Technical Visual Lessons
- Text overflow is the most common silent failure. Auto-shrink masks problems until someone edits the text.
- Element overlap is easiest to catch by comparing bounding boxes of all elements on a slide.
- Font contamination usually happens through copy-paste from Word, Excel, or the web. Always check table cells and chart labels.
- Title position drift is invisible on any single slide but obvious when flipping through the deck quickly.
- Logo distortion often happens when someone resizes without holding Shift (aspect ratio lock).
- Inconsistent gutters in card layouts create a subtle but persistent "something feels off" impression.
- Page number issues are surprisingly common — missing on some slides, wrong font on others.
- Color contrast failures most commonly appear in gray text on white backgrounds and text on photos.
- Content density is a judgment call, but >100 words per slide is almost always too much.
- Image stretching is easy to detect: compare the rendered width:height ratio against expected proportions.
- Cross-slide consistency is the highest-signal quality indicator — a deck where every title, body, and card looks the same across all slides feels professional even if individual slides are imperfect.

## Tone and Positioning Lessons
- SettleMint decks should sound institutional, not startup-ish. Flag any crypto jargon or hype language.
- DALP is a lifecycle platform, not a tokenization tool. If the deck only talks about issuance, the positioning is wrong.
- SettleMint sells platform, not consulting. Any slide that implies custom development services is off-brand.
- Compliance claims without jurisdictional scope are a credibility hazard.
- "Fully compliant" and "any chain" are the two most dangerous phrases in any SettleMint deck.

## Common Traps
- Do not confuse lots of content with good content.
- Do not let pretty visuals mask weak arguments.
- Do not overlook the closing slide; it is the last impression the audience keeps.
- Do not flag cosmetic issues as hard failures when the structure and message are sound.
- Do not write reviews longer than the deck itself.
- Long reviews without prioritization create work instead of clarity.
- If the review cannot tell the author what to fix first, it is not finished.
- The best review outcome is simple: specific diagnosis, fair score, clear next move.
