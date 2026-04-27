---
title: "Feedback Pattern Library — PPTX Reviewer"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.658793Z
---

# Feedback Pattern Library — PPTX Reviewer

Use these templates when writing slide-level notes and top-issue descriptions.
They provide constructive, specific, actionable language for common problems.

Each pattern has:
- **When to use** — the condition that triggers this feedback
- **Template** — copy-ready language with `[placeholders]` to fill in
- **Tone rule** — how to deliver it

Do not paste templates verbatim into every review. Adapt the language to the specific slide and context. The goal is consistency of quality, not copy-paste uniformity.

---

## 1. Overloaded Slide (Split Recommendation)

**When to use:** A slide carries two or more competing messages that each deserve their own space.

**Template:**
> Slide [X] tries to cover [topic A] and [topic B] in one pass. These are both worth keeping, but they compete for attention here. Split into two slides: one focused on [topic A] with [suggested framing], and a second on [topic B]. The audience will absorb both points better when they don't have to decode them simultaneously.

**Tone rule:** Validate both messages before recommending the split. Never imply the content is bad — it's the density that's the problem.

---

## 2. Weak Headline (Reframe Recommendation)

**When to use:** A slide title labels the topic ("Our Platform") instead of stating the takeaway ("One platform for the full asset lifecycle").

**Template:**
> Slide [X] title "[current title]" describes the topic but doesn't frame the point. Rewrite to lead with the takeaway — something like "[suggested headline]" — so the audience knows what to take away even if they only skim.

**Tone rule:** Offer a concrete alternative. Don't just say "make it stronger."

---

## 3. Content Density Warning

**When to use:** A slide exceeds ~100 words or has more than 6 bullets without grouping.

**Template:**
> Slide [X] is running dense at ~[N] words. Cut to the [3–5] points that matter most for this audience and move supporting detail to speaker notes. If all points are essential, split across two slides with clear sub-themes.

**Tone rule:** Be specific about the word count or bullet count. Vague "too much text" feedback doesn't help the author prioritize.

---

## 4. Unverifiable Claim Flag

**When to use:** A DALP capability claim can't be confirmed against known product reality.

**Template:**
> Slide [X] states "[exact claim]." This needs verification against the current product scope before the deck ships. If confirmed, keep it. If not, narrow the language to what's defensible — e.g., "[safer alternative phrasing]." Unverified claims are a credibility risk with technical audiences.

**Tone rule:** Never accuse the author of lying. Frame it as a verification gap, not an integrity problem.

---

## 5. Audience Mismatch

**When to use:** The depth, jargon, or framing doesn't match the stated target audience.

**Template:**
> Slide [X] is pitched at a [technical/executive/generic] level, but this deck targets [actual audience]. For [audience type], [specific adjustment] — e.g., replace "[current phrasing]" with "[audience-appropriate alternative]" to match the room.

**Tone rule:** Name the audience explicitly. "Too technical" is vague; "too technical for a CFO audience" is actionable.

---

## 6. Missing Transition

**When to use:** Two consecutive slides have a logical gap — the story jumps without connecting.

**Template:**
> The move from Slide [X] ([topic]) to Slide [Y] ([topic]) feels abrupt. The audience needs a bridge: either add a one-line transition in the closing of Slide [X], or insert a brief framing slide that connects [what came before] to [what comes next].

**Tone rule:** Describe the gap the audience would feel, not just the structural issue.

---

## 7. Positive Callout (Strength Recognition)

**When to use:** A slide or section is genuinely well done and worth noting.

**Template:**
> Slide [X] lands well. [Specific reason — e.g., "The headline frames the commercial value before the technical detail, which is exactly right for this audience."] Keep this pattern for similar slides.

**Tone rule:** Be specific about *why* it works. "Good slide" is useless. "Good slide because the headline carries the argument" teaches the author what to repeat.

---

## 8. Brand Drift Detection

**When to use:** A slide breaks template discipline — wrong font, off-palette colors, modified protected elements.

**Template:**
> Slide [X] has [specific issue — e.g., "Calibri in the table cells" / "a non-palette blue (#2B7FFF) on the accent bar"]. Correct to [expected value — e.g., "Figtree Regular" / "brand primary #1B2A4A"]. This likely came from [probable source — e.g., "copy-paste from an Excel export" / "a manual color pick"].

**Tone rule:** Diagnose the likely cause. It helps the author prevent recurrence, not just fix this instance.

---

## 9. Narrative Weakness (Story Arc Problem)

**When to use:** The deck's overall story doesn't build properly — weak opening, missing tension, flat ending.

**Template:**
> The deck [specific structural issue — e.g., "opens on product features before establishing the problem" / "ends on a generic thank-you instead of a concrete next step" / "covers proof points before the audience knows what's being proved"]. Restructure so the arc follows [recommended flow — e.g., "problem → platform fit → proof → action"].

**Tone rule:** Give the recommended arc, not just the diagnosis. The author needs to know what "better" looks like.

---

## 10. Visual Balance Issue

**When to use:** A slide has spacing, density, or composition problems that affect readability.

**Template:**
> Slide [X] feels [crowded/sparse/lopsided] — [specific diagnosis, e.g., "the right column has 3x the content weight of the left" / "the cards are touching the slide edges with no breathing room" / "the bottom third is empty while the top is packed"]. [Specific fix — e.g., "Redistribute content across both columns" / "Add 0.5" margin from edges" / "Move one element down to balance the vertical weight"].

**Tone rule:** Describe what the audience would feel ("feels crowded"), then explain the mechanical cause. Both matter.

---

## 11. Closing Slide Weakness

**When to use:** The final slide is a generic "Thank you" or "Questions?" without a concrete next step or call to action.

**Template:**
> The closing slide ([Slide X]) ends on "[current closing text]," which lets the energy drop right when the audience should feel compelled to act. Replace with a concrete next step: "[suggested CTA, e.g., 'Schedule a platform walkthrough' / 'Start a sandbox environment this week' / 'Review the technical architecture document']." The last slide is the last impression; make it move the conversation forward.

**Tone rule:** Don't dismiss "Thank you" slides as wrong in every context, but for client-facing or sales decks, a passive close is a missed opportunity. Frame the fix as sharpening impact, not correcting a mistake.

---

## 12. Placeholder / Draft Marker Detection

**When to use:** A slide contains [TODO], [TBD], "Lorem ipsum," "Insert X here," or any unresolved placeholder text.

**Template:**
> Slide [X] still contains "[exact placeholder text]." This is a hard block for client delivery. Resolve with [specific content needed, e.g., "the actual deployment timeline" / "the confirmed customer name" / "finalized compliance language for the target jurisdiction"]. One unresolved placeholder makes the entire deck feel unfinished to the audience.

**Tone rule:** This is always a hard flag, not a suggestion. Be direct but don't pile on. State the placeholder, state what's needed, move on.

---

## 13. Cross-Slide Consistency Drift

**When to use:** Titles, body text, card layouts, gutters, or visual elements shift position or style between slides that should look uniform.

**Template:**
> Slides [X] through [Y] show [specific inconsistency, e.g., "title position drifts from 0.5" top margin to 0.8" on Slide Y" / "body text switches from Figtree Regular 14pt to 16pt midway" / "card gutters vary between 0.2" and 0.4" across the set"]. This is invisible on any single slide but obvious when flipping through. Standardize to [expected value] across the full run. Consistency here is the difference between "assembled" and "designed."

**Tone rule:** Acknowledge this is subtle. The author may not have noticed because each slide looked fine in isolation. Frame it as a polish pass, not a fundamental error.

---

## 14. Tone and Positioning Drift

**When to use:** A slide uses crypto jargon, startup-ish language, hype phrases, or positions SettleMint as consulting/custom dev instead of a platform.

**Template:**
> Slide [X] uses [specific language, e.g., "'web3-native infrastructure'" / "'we can build custom smart contracts for your use case'" / "'industry-leading tokenization'"]. SettleMint decks should sound institutional, not startup-ish. Replace with [specific alternative, e.g., "'standards-based digital asset infrastructure'" / "'the platform supports configurable asset templates'" / "'tokenization with seven out-of-the-box asset types'"]." Platform, not consulting. Specifics, not superlatives.

**Tone rule:** Don't lecture about brand voice abstractly. Show the specific phrase, explain why it lands wrong, and offer the replacement in one pass.

---

## 15. Auto-Shrink Masking (Hidden Overflow)

**When to use:** A slide's text appears to fit but only because auto-shrink has silently reduced the font size below the template baseline.

**Template:**
> Slide [X] text fits the textbox, but only because auto-shrink has compressed it to ~[N]pt — well below the template baseline of [expected size]pt. This masks an overflow problem: the moment someone edits or adds a line, the text will shrink further or break visually. Cut to [suggested word count] words or split across two slides. Auto-shrink is a crutch, not a solution.

**Tone rule:** Frame this as a hidden risk, not a current visual defect. The author may not realize auto-shrink is active because the slide "looks fine" in preview.

---

## 16. Layout Monotony

**When to use:** A deck of 10+ slides uses fewer than 5 distinct slide layouts, or repeats one generic layout for content that would benefit from varied structures.

**Template:**
> This deck uses [N] distinct layouts across [total] content slides. The template offers ~30 layout options; using only [N] makes the deck feel assembled rather than designed. Slides [X, Y, Z] would benefit from layout variety — e.g., [specific suggestion: "Slide X's three-point argument fits the 3-column layout (Slide 5 pattern)" / "Slide Y's process description is a natural fit for the 3-step flow (Slide 14 pattern)"]. Varying layouts signals intentional design and keeps the audience engaged.

**Tone rule:** Don't imply the author was lazy. Layout selection is a design skill, and many authors default to what they know. Suggest specific layout swaps rather than just flagging the monotony.

---

## 17. Missing Slide Purpose ("So What?" Absent)

**When to use:** A slide presents information (data, bullets, features) without stating what the audience should conclude from it.

**Template:**
> Slide [X] presents [what the slide contains, e.g., "four integration capabilities" / "a timeline of milestones"] but never states the implication. The audience is left to figure out why this matters. Add a takeaway line — e.g., "[suggested takeaway: 'This means deployment takes weeks, not months' / 'Result: a single pane of glass for the full asset lifecycle']" — so the slide argues a point rather than just displaying information.

**Tone rule:** Distinguish between slides that need a "so what?" (most of them) and rare exceptions like pure reference slides or appendix material where information display is the point. Don't apply this pattern to every data slide mechanically.

---

## 18. Compliance Scope Ambiguity

**When to use:** A slide claims compliance, regulatory readiness, or policy coverage without naming the jurisdiction, control scope, or boundary conditions.

**Template:**
> Slide [X] says [exact claim, e.g., "fully compliant" / "regulation-ready" / "built for regulated markets"], but it never defines the scope. Compliance language only works when the audience knows **where**, **for what**, and **under which controls** the claim applies. Tighten this to something bounded — e.g., "supports configurable compliance controls for [jurisdiction/use case]" or "designed to fit regulated asset workflows, subject to customer legal and policy requirements." Broad compliance language without scope reads as overclaim.

**Tone rule:** Treat this as a precision issue, not a legal lecture. The goal is to narrow the claim until it is credible and safe, not to strip out all confidence.

---

## General Feedback Principles

1. **Name the slide.** "Slide 7 has a problem" beats "some slides have issues."
2. **Diagnose before prescribing.** Say what's wrong, why it matters, then how to fix it.
3. **One fix per issue.** Don't stack three suggestions when one clear action is better.
4. **Validate before criticizing.** If the content is good but the execution is off, say so.
5. **Estimate effort.** When possible, signal whether the fix is a 5-minute tweak or a structural rebuild.
6. **Use anti-pattern names.** If a slide matches a cataloged anti-pattern, name it — "This is a Wall of Text problem" is faster than re-explaining the concept.
