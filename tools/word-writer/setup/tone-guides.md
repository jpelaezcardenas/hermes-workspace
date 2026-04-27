---
title: "Tone Guides"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.919541Z
---

# Tone Guides

## General principle
Each document type has a natural register. Match the register; do not default to "corporate neutral" for everything. The reader should feel the document was written *for them*, not adapted from a template.

---

## Executive memo tone
- concise, decisive, low-drama, recommendation-led
- Open with the ask or recommendation, not the background
- Use short paragraphs (3–4 sentences max)

**Do:** "We recommend discontinuing the pilot. Conversion rates are 40% below threshold after 90 days and the cost trajectory is unsustainable."
**Don't:** "After careful consideration of various factors and extensive analysis of the pilot program's performance metrics over the past quarter, it has become apparent that there may be grounds for reconsidering the continuation of the initiative."

---

## Technical report tone
- precise, explicit about assumptions, evidence-led, no marketing inflation
- State methodology or data sources up front
- Distinguish between findings (what the data shows) and interpretation (what it means)
- Use footnotes or inline caveats for weak evidence rather than burying uncertainty

**Do:** "Throughput averaged 1,200 tx/s under load testing (10k concurrent users, 48h sustained). This exceeds the 800 tx/s target but does not account for cross-chain settlement latency."
**Don't:** "The platform demonstrated impressive scalability and strong performance under rigorous testing conditions."

---

## Meeting summary tone
- factual, time-aware, owner-aware, action-led
- Lead with decisions made, then actions, then discussion notes
- Every action item needs an owner and a date — no exceptions
- Keep discussion notes compressed; the reader was in the meeting

**Do:** "Decision: proceed with Phase 2 scope as presented. Action: [Maria] circulate revised timeline by 28 Mar."
**Don't:** "The team had a productive discussion about Phase 2 and agreed that it would be beneficial to move forward with the proposed scope."

---

## Q&A tone
- direct answer first, then rationale, no long preamble
- Answer in the first sentence. If the answer is "no" or "not yet", say so immediately
- Supporting context goes after the answer, not before it
- Keep answers self-contained — each Q&A pair should stand alone

**Do:** "Q: Does DALP support multi-sig custody? A: Yes. Custody wallets support configurable multi-signature approval flows with maker-checker enforcement."
**Don't:** "Q: Does DALP support multi-sig custody? A: Custody is a critical component of any digital asset platform. SettleMint's approach to custody management encompasses several layers of security..."

---

## Research summary tone
- analytical, careful with confidence levels, explicit about what the evidence supports
- Separate what is established from what is emerging or speculative
- Use confidence qualifiers: "strong evidence", "early indicators", "limited data suggests"
- Close with explicit gaps — what the research does not cover

**Do:** "Three of four surveyed implementations reported settlement time reductions of 60–80%. One outlier (permissioned L1, low volume) showed no measurable improvement. Sample size limits generalizability."
**Don't:** "Research conclusively demonstrates that blockchain significantly reduces settlement times across all implementations."

---

## Structured briefing tone
- situation-first, implication-aware, compressed
- Open with the situation or change, not organizational context
- State implications for the reader's domain explicitly
- Keep total length under two pages unless complexity demands more

**Do:** "MiCA's transitional period ends 30 June 2026. SettleMint clients issuing EMTs must have CASP licensing in place before that date or pause issuance."
**Don't:** "As the regulatory landscape continues to evolve, it is important for stakeholders to be aware of upcoming changes that may affect their operations."

---

## Status update tone
- scannable, owner-tagged, risk-forward
- Use tables for workstream status — do not narrate what a table can show
- Lead with blockers and risks, not accomplishments
- Keep the "on track" items to one line each; expand only what needs attention

**Do:** A status table with columns: Workstream | Status | Owner | Note — with red/amber items at the top.
**Don't:** A three-paragraph narrative describing each workstream's progress in prose form.

---

## Operating note / guidance memo tone
- instructional, exception-aware, unambiguous
- Write for the person who will follow the process, not the person who designed it
- Call out exceptions and edge cases explicitly — they cause most errors
- Use numbered steps for sequential processes, bullets for non-ordered lists

**Do:** "Step 3: Submit the configuration via the platform CLI. If the node is running a custom genesis, stop the node first (see Exception A below)."
**Don't:** "Users should generally submit configurations through the appropriate tooling, keeping in mind various considerations that may apply."

---

## Questionnaire / response pack tone
- direct, self-contained per answer, no cross-referencing unless unavoidable
- Each answer should make sense without reading the others
- Cite specifics: feature names, versions, standards — not vague assurances
- If the answer is partial or conditional, say what is supported and what is not

**Do:** "DALP supports RBAC and ABAC for access control. RBAC is available out of the box; ABAC policies require configuration via the admin console."
**Don't:** "SettleMint provides comprehensive access control capabilities that can be tailored to meet your organization's specific requirements."
