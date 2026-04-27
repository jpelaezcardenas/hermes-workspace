---
title: "Content Standards"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.658534Z
---

# Content Standards

## Purpose
- Review slide copy for clarity, accuracy, terminology discipline, and credibility.
- Kill filler, hype, consultant-speak, and AI-sounding language.
- Prefer concrete claims, plain English, and audience-appropriate technical precision.

## Core Standard
- Every slide must say something real, specific, and defensible.
- If a sentence could appear on any generic B2B SaaS deck, flag it.
- If the copy sounds impressive but says nothing, flag it.
- If a strong claim lacks evidence, soften it or remove it.

## AI-Tell Words and Phrases
- Flag these when used as empty filler, vague hype, or generic positioning.
- Do not auto-ban them in legitimate technical contexts; judge usage, not just the token.
- Watch for: leverage, utilize, harness, empower, unlock, revolutionize, cutting-edge.
- Also watch for: state-of-the-art, best-in-class, world-class, next-generation, paradigm, synergy.
- Also watch for: holistic, robust, seamless, end-to-end, transformative, innovative, disruptive.
- Also watch for: game-changing, scalable, comprehensive, streamline, optimize.
- Add common AI-tell offenders: frictionless, powerful, future-proof, mission-critical, leading.
- Also: industry-leading, enterprise-grade, highly flexible, dynamic, intelligent, smart.
- Also: pioneering, breakthrough, unparalleled, unmatched, exceptional, impactful.
- Also: modernize, accelerate, elevate, maximize, simplify, enhance, enable.
- Also: supercharge, reimagine, unlock value, drive efficiency, drive innovation.
- Also: seamless integration, full visibility, complete solution, all-in-one, single pane of glass.
- Also: trusted partner, tailored solution, unique approach, differentiated offering.
- Also: rapidly evolving, ever-changing landscape, digital transformation, journey.
- Also: actionable insights, strategic advantage, operational excellence, value creation.
- Also: best practice when used vaguely, ecosystem when it means product, platformization.
- Also flag stacked hype, e.g. “innovative, scalable, end-to-end platform.”
- Prefer replacements with specifics: what feature, what workflow, what outcome, what metric.

## DALP Terminology Reference
- Use DALP, not “the DALP.”
- Avoid “DALP platform” unless contrast absolutely requires it; usually just say DALP.
- Always write SettleMint with the exact capitalization.
- Flag Settlemint, SETTLEMINT, settleMint, or other variants.
- Use T-REX for the compliance framework/standard implementation name.
- Use ERC-3643 for the underlying token standard reference.
- Do not collapse T-REX and ERC-3643 into the same thing; related, not identical labels.
- Prefer token lifecycle when describing issuance, servicing, transfer, compliance, and redemption flows.
- Prefer compliance modules, not vague “compliance layer” unless the context is architectural.
- Use identity registry when referring to the registry component, not “KYC database” unless that is truly what is meant.
- Use claim topics for the required claim categories checked during compliance validation.
- Use trusted issuers for entities authorized to issue claims.
- Use DAPI in all caps.
- Use configurable tokens when describing token behavior that can be parameterized through supported controls.
- Do not invent DALP nouns that are not in product language.
- Do not say DALP “replaces regulation” or “automates compliance” without scope.
- Prefer “enforces configured compliance rules” over grander claims.
- Prefer “supports token lifecycle operations” over “manages everything end-to-end” unless the slide proves it.

## Common Terminology Errors to Flag
- “The DALP platform” used repeatedly.
- “Settlemint” or all-caps brand styling.
- “T-Rex” or “trex” instead of T-REX.
- “ERC3643” without the hyphen.
- Calling claim topics “claim types” if the precise on-chain concept matters.
- Referring to trusted issuers as generic validators without context.
- Saying DAPI stands for something else or styling it as Dapi.
- Mixing token issuance with the broader token lifecycle.
- Using “wallet compliance” when the actual mechanism is identity/claim-based eligibility.

## Claim Verification Checklist
- No roadmap-as-fact. Future capability must be marked as planned, upcoming, or roadmap.
- No customer counts, transaction counts, or asset counts without a source.
- No performance claims without evidence, benchmark context, or clearly stated scope.
- No “industry-leading” without comparison data and the basis of comparison.
- No market size claims without citation.
- No regulatory claims without jurisdiction specificity.
- No “fully compliant” claims unless the exact legal and operational scope is stated.
- No “guarantees” language for legal, regulatory, or operational outcomes.
- No ROI numbers without methodology or source.
- No claims that SettleMint or DALP did work actually done by a partner or customer.
- If evidence is unavailable, rewrite to a narrower factual statement.

## Tone Rules
- Direct, not corporate.
- Specific, not generic.
- Evidence-backed, not aspirational.
- Technical when the audience is technical; plain language when the audience is not.
- Never write “we believe,” “we think,” or “we aim to” unless the uncertainty itself matters.
- State facts cleanly or do not state them.
- Prefer verbs that describe action over slogans that imply superiority.
- Avoid inflated confidence, chest-beating, and empty future-of-X rhetoric.
- If the copy sounds like a consultant trying to escape accountability, flag it.

## Structural Patterns
- Every slide must pass the “so what?” test.
- The takeaway should be obvious within seconds.
- Titles should make a point, not name a topic.
- Prefer “DALP Reduces Compliance Review Effort” over “Compliance.”
- Bullets should be short, scannable, and non-overlapping.
- Target 5-6 bullets max per slide.
- Aim for under 15 words per bullet where possible.
- Break wall-of-text slides into multiple slides.
- One slide should do one primary job.
- If a slide needs a paragraph to be understood, the slide is under-edited.
- If the audience cannot tell the implication, add the implication.

## DALP Positioning Alignment (Track 13)

Every deck must align with SettleMint's core DALP positioning. Check for:

### Positioning Pillars
- **DALP = Digital Asset Lifecycle Platform.** Not a tokenization tool. Not a blockchain platform. A lifecycle platform for digital assets.
- **The scope is lifecycle, not issuance.** Decks that only talk about creating/minting tokens miss the full value: issuance, servicing, compliance, transfer, redemption.
- **Platform, not consulting.** SettleMint sells the DALP platform. No custom development, no consulting services, no "we build for you."
- **Institutional-grade operations.** DALP is for regulated institutions managing real assets. Not for crypto experiments or retail DeFi.
- **Complexity is the value, not simplicity.** DALP's value is managing the inherent complexity of digital asset operations correctly — not making it seem easy.

### Messaging Alignment Checks
- [ ] Does the deck position DALP as a lifecycle platform (not just tokenization)?
- [ ] Does the deck avoid implying consulting or custom development services?
- [ ] Does the deck target institutional/regulated audiences appropriately?
- [ ] Are capability claims grounded in actual platform features (not vague vision)?
- [ ] Does the deck avoid legacy ATK framing or terminology?
- [ ] Is the competitive positioning honest and defensible (no "we're the only platform that...")?
- [ ] Are customer/partner stories properly attributed (not credit-grabbing)?
- [ ] Does the deck distinguish between shipped features and roadmap items?

### Accuracy Red Lines
- Never claim DALP "automates compliance" without scope qualifiers.
- Never claim DALP works on "any chain" without specifying EVM scope.
- Never present partner achievements as DALP product features.
- Never use "fully compliant" without specifying jurisdiction and framework.
- Never claim performance numbers without methodology.
- Never say DALP "replaces" regulation or legal counsel.

---

## Tone and Style Assessment (Track 14)

### Target Tone
- **Professional and institutional.** SettleMint speaks to regulated financial institutions, not crypto startups.
- **Confident without being arrogant.** State capabilities clearly; don't claim superiority without evidence.
- **Direct, not corporate.** Say what needs to be said without burying it in committee-speak.
- **Technical when warranted, plain when not.** Match the audience. Don't use jargon to sound smart.

### Tone Red Flags
- **Crypto/Web3 jargon** used casually: "WAGMI," "to the moon," "trustless," "permissionless" (unless in precise technical context), "DeFi" (unless specifically relevant), "wen," "HODL."
- **Startup hype language:** "disrupting," "revolutionary," "game-changing," "moonshot," "10x."
- **Consultant mush:** "leverage synergies," "drive holistic transformation," "strategically positioned."
- **Fear-based selling:** "miss the boat," "left behind," "last chance," "your competitors are already..."
- **Breathless futurism:** "the future of finance," "reimagining the possible," "a new paradigm."

### Audience-Appropriate Checks
- **For C-suite / board:** Business outcomes, risk management, regulatory alignment, competitive advantage. NO deep technical architecture.
- **For technical teams:** Architecture, integration, API capabilities, deployment models. Light on business vision.
- **For compliance/legal:** Regulatory framework support, audit trails, configurable controls, jurisdictional scope. Precise language only.
- **For mixed audiences:** Lead with business value, support with technical credibility. Never go deeper than the least technical person in the room can follow.

### Style Rules
- Sentences should be complete but concise.
- Avoid passive voice when active voice is clearer.
- Do not use exclamation marks in professional decks.
- Avoid rhetorical questions as slide titles.
- Numbers and data should be precise, not rounded to meaninglessness.
- Avoid starting slides with "We" — lead with the audience's problem or outcome.

---

## Narrative & Structural Completeness Checks (Track 15)

### Deck Arc Verification
- [ ] Does the deck have a coherent cover-to-close arc? The story should feel intentional from Slide 1 to the final close.
- [ ] Does the closing slide land with purpose? A weak or generic close ("Thank you" with no CTA, next step, or takeaway) undermines the entire deck.
- [ ] Can you summarize the deck's argument in one sentence? If not, the narrative is unfocused.
- [ ] Does the deck avoid circular storytelling (returning to the same point multiple times without adding new information)?

### Required Structural Elements
Every client-facing deck should include these structural beats. Flag any that are missing or underweight:
- [ ] **Problem/context framing:** At least one slide establishes why the audience should care before DALP is introduced.
- [ ] **Solution introduction:** DALP is positioned clearly as the answer to the problem framed above.
- [ ] **Proof/evidence:** At least one slide provides concrete evidence: architecture, case study, data, or demo walkthrough.
- [ ] **Close/CTA:** The final content slide states a clear next step, not just a logo and "questions?"

Optional but recommended for decks over 15 slides:
- [ ] **Agenda/overview:** Helps the audience navigate longer presentations.
- [ ] **Architecture/how-it-works:** Technical credibility slide for mixed or technical audiences.

### Content Density Limits
- [ ] **FAIL if** any content slide exceeds 100 words of body text (excluding titles, labels, and footnotes).
- [ ] **WARN if** any slide exceeds 80 words. Suggest splitting into two slides.
- [ ] **FAIL if** any slide has more than 8 bullet points.
- [ ] **WARN if** bullets average more than 15 words each on a single slide.

### Slide Count Guidance
- [ ] **WARN if** the deck has fewer than 10 content slides (may feel under-evidenced for client-facing use).
- [ ] **WARN if** the deck exceeds 28 content slides (risk of repetition, drift, or audience fatigue).
- [ ] **Flag** any slide that repeats a point already made on another slide without adding new evidence or a new angle.

---

## Proof & Evidence Sufficiency Checks (Track 16)

High-stakes slides must prove, not merely claim. Apply these checks wherever the deck presents outcomes, differentiation, compliance strength, or deployment confidence.

- [ ] **FAIL if** a slide makes a superiority claim (faster, simpler, lower risk, better control) without showing the mechanism, evidence, or comparison basis.
- [ ] **FAIL if** a proof slide contains only adjectives or icons with no architecture, workflow, metric, case evidence, or concrete operating detail.
- [ ] **WARN if** customer or partner logos appear as implied proof without an explicit explanation of what they prove.
- [ ] **FAIL if** a deployment or compliance claim hides the operating conditions, scope limits, or ownership boundaries that make the claim true.
- [ ] **PASS if** the slide headline states the conclusion and the body shows the supporting proof.
- [ ] **PASS if** each proof slide answers one buyer question clearly: why trust this, how it works, where it fits, or what outcome it changes.

## Reviewer Decision Rules
- Flag copy that is vague, inflated, repetitive, or unprovable.
- Reward concrete nouns, precise verbs, and evidence.
- When in doubt, ask: what exactly does this mean, and can we defend it?
- If the answer is no, rewrite or cut.
- Check tone alignment: is this how an institutional platform company speaks?
- Check positioning alignment: does this reinforce or dilute the DALP lifecycle platform story?
- Check audience fit: would the intended reader find this credible and useful?
