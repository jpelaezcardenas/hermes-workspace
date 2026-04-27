---
title: "Example Review: Sub-Score Override — Polished Production, Broken Messaging"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.661129Z
---

# Example Review: Sub-Score Override — Polished Production, Broken Messaging

> **Calibration purpose:** Demonstrates the "Cannot Approve" override rule. This hypothetical 18-slide DALP partner deck scores 32/50 total (normally Revise), but the Content/Messaging sub-score of 11/25 triggers the hard block: "If either sub-score is below 12/25, the deck should not be approved regardless of the other sub-score." Teaches the reviewer that strong visual production cannot rescue weak messaging.

## Verdict
- Revise (Cannot Approve — Content/Messaging sub-score below 12/25)

## Score Summary
- Brand Compliance: 5/5 — Flawless Figtree usage, SettleMint palette throughout, logo untouched, page numbers correct, protected slides intact.
- Slide Selection / Layout Fit: 4/5 — Good variety: cover, agenda, 3-column capability, comparison grid, process flow, image-plus-narrative, architecture, and close. One proof slide would land better as a metric-led layout.
- Text Quality: 2/5 — Headlines label topics instead of making claims. Body copy is dense and passive. AI-tell phrases ("leverage," "streamline," "seamless") appear on 5 slides. Cap trigger fires: ≥3 AI-tell instances caps at 3, but additional density and passive voice issues pull it to 2.
- Content Accuracy / Product Accuracy: 2/5 — Slide 8 claims "real-time settlement finality across any network" without qualification. Slide 14 implies DALP handles KYC/AML natively when it integrates with external providers. Cap trigger fires: unverifiable capability claim caps at 2.
- Visual Balance: 4/5 — Clean composition, good whitespace, well-spaced cards and columns. One architecture slide is slightly dense.
- Narrative Flow / Narrative Clarity: 2/5 — Opens with three capability slides before establishing the business problem. The audience has no reason to care about features until Slide 7, when the market context finally appears. Cap trigger fires: no problem-framing slide before solution caps at 2.
- Audience Fit: 2/5 — Pitched at partners but reads like an internal product overview. Partners need integration depth, commercial model, and co-sell mechanics. None of those appear. The deck talks AT partners about what DALP does rather than WITH partners about what they can build.
- Completeness: 4/5 — Fully populated, no placeholders, clean start and end. One appendix reference on Slide 16 points to a missing supplementary slide.
- Editability: 4/5 — All text, shapes, and diagrams are natively editable. Grouping is sensible. One chart legend is slightly over-layered.
- Message Hierarchy: 3/5 — Cap trigger fires: ≥3 slides with topic-label titles ("Architecture," "Capabilities," "Deployment Options") caps at 3. Some slides have clear focal points, but the topic-label pattern undermines takeaway clarity on the front half.

**Technical/Visual Sub-Score: 21/25** (Brand 5 + Layout 4 + Visual Balance 4 + Completeness 4 + Editability 4)
**Content/Messaging Sub-Score: 11/25** (Text 2 + Accuracy 2 + Narrative 2 + Audience 2 + Hierarchy 3)
**Total: 32/50**

> ⚠️ **Sub-score override active.** Content/Messaging at 11/25 is below the 12/25 floor. This deck cannot be approved even though the total falls in the Revise band and the production quality is strong. The messaging needs structural rework before the visual polish matters.

## Hard Failures
- Slide 8: "Real-time settlement finality across any network" is an unverifiable DALP claim. Settlement behavior depends on the underlying network and asset configuration. This must be rewritten with appropriate qualification.
- Slide 14: Implies DALP performs KYC/AML checks natively. DALP integrates with compliance providers but does not run identity verification itself. Misrepresenting this to a partner audience creates downstream support and expectation problems.

## Top Issues
1. **Narrative is backwards.** The deck leads with three consecutive capability slides (Slides 2-4) before the partner even understands the market opportunity or the problem DALP solves. Move the market context and partner value proposition to the front.
2. **Partner framing is absent.** This reads like a product overview repurposed for a partner audience. Partners need: what they can build on DALP, how the commercial model works, integration effort, and co-sell positioning. None of those topics appear.
3. **Headline discipline is weak.** Five of the first eight slides use topic-label titles ("Overview," "Architecture," "Capabilities") that tell the audience what the slide is about but not what it means. Each title should make a claim the body supports.

## Strengths
- Production quality is genuinely strong. The deck looks professional, feels intentional, and uses the SettleMint template system well. Whoever built this knows the visual system.
- Slide 11 (Deployment Models) is the best content slide: it frames cloud, self-hosted, and hybrid as partner deployment choices with clear trade-offs. The structure and copy both work.
- The architecture diagram on Slide 9 is natively built, correctly labeled, and accurately represents DALP's component model. The technical content is right even though its placement in the narrative is wrong.

## Slide-Level Notes
- Slide 1 (Cover): Clean, on-brand. Title "DALP Partner Program" is fine but generic. A subtitle framing the partner value proposition ("Build regulated digital asset products on DALP") would set the conversation up better.
- Slides 2-4 (Capabilities): Three consecutive capability slides with no preceding context. The partner audience does not yet know why they should care. These slides contain useful content but belong after the problem and opportunity framing.
- Slide 5 (Agenda): Appears on Slide 5 instead of Slide 2. By the time the audience sees the roadmap, they have already sat through content without a frame.
- Slide 7 (Market Context): Best opening content in the deck, buried on Slide 7. Move this to Slide 2 or 3.
- Slide 8 (Settlement Claims): Hard failure. "Any network" language is the kind of unqualified claim that creates partner expectation debt.
- Slide 9 (Architecture): Technically accurate and well-built, but appears too early for a partner audience. Partners care about integration points, not internal component layout. Reframe around "where your system connects to DALP."
- Slide 11 (Deployment): Strongest content slide. Keep as-is.
- Slide 14 (Compliance): Hard failure. The KYC/AML framing implies native capability. Rewrite to show DALP's integration with compliance providers, which is the actual product truth.
- Slide 17 (Close): Ends on "Let's connect" without a specific next step. For partners, the close should propose a concrete action: technical sandbox access, integration workshop, or commercial terms review.

## Recommended Fix Path
- Structural rework required (not just copy edits)
- Estimated effort: 4-6 hours
- Priority order:
  1. **Restructure narrative:** Move market context (Slide 7) to the front. Sequence as: problem → opportunity → DALP fit → partner model → proof → next step.
  2. **Add partner-specific content:** Integration model, commercial structure, co-sell mechanics, and partner success path. This is not a product deck with a partner label; it needs partner-native framing.
  3. **Fix hard failures:** Rewrite Slide 8 settlement claims with network-specific qualification. Rewrite Slide 14 to show compliance integration, not native KYC/AML.
  4. **Rewrite headlines:** Replace topic labels with claim-driven titles on at least the first 8 slides.
  5. **Quick wins:** Move agenda to Slide 2, add a specific CTA to the closing slide, trim body copy on Slides 2-4 after restructure.

## Calibration Note
This example is useful because it trains the reviewer not to over-penalize production quality while still blocking approval. The right lesson is not "pretty deck, therefore harsh rebuild". The lesson is "strong production, weak partner framing, unsafe claims". Keep the technical/visual scores honest when the file is genuinely well built. Put the failure where it belongs: audience fit, narrative order, and product-claim discipline. If those messaging failures are structural but still fixable within the existing deck shell, Revise is correct. Rebuild is reserved for cases where the story, facts, and file structure are all collapsing at once.
