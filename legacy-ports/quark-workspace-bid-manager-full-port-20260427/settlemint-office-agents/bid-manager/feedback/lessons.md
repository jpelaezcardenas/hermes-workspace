# Bid Manager: Lessons Learned

Accumulated wisdom from real feedback, bid outcomes, and reviewer corrections. This file is read before writing ANY new bid section, it's how the bid manager gets better over time.

---

## Writing & Tone

### 2026-03-13: Paragraphs over bullets (Roderik)
- **Feedback:** Bid content was too bullet-heavy. RFI responses read like technical notes, not persuasive prose.
- **Rule:** Default to paragraphs. Use bullets ONLY for genuinely enumerable items (feature lists, version numbers). If a section is >50% bullets, rewrite as prose.
- **Bad:** "- RBAC with 5 roles - Route-level guards - Multi-tenancy"
- **Good:** "DALP implements a five-role access control model that enforces permissions at every API endpoint..."

### 2026-04-03: Mixed-audience writing is mandatory
- **Lesson:** Proposals are scored by mixed committees (technical, business, procurement, compliance). Dense expert language may impress one specialist while losing everyone else.
- **Rule:** Write one level below the audience's maximum comprehension. Favor clarity over performative expertise.

### 2026-04-03: Repetition signals weak editorial control
- **Lesson:** When the same differentiator appears repeatedly without adding new evidence, evaluators experience it as padding.
- **Rule:** Say it once well, support it properly, and only repeat when the next mention materially advances the argument.

---

## Technical Accuracy

### 2026-04-03: Composability is the lead differentiator
- **Lesson:** DALP's runtime-pluggable token features and compliance modules are the single strongest differentiator. Unlike competitors who compile features into fixed contract types at deployment, DALP uses runtime reconfiguration under GOVERNANCE_ROLE.
- **Positioning:** "One contract, any instrument." "Features are building blocks, not fixed packages." "Evolve without redeploying."
- **Rule:** Always lead technical sections with composability when the RFP asks about flexibility, configurability, or future-proofing.

### 2026-04-03: Never claim capabilities without codebase verification
- **Lesson:** False positives about DALP capabilities are worse than "I'm not sure." A 4-person engineering team cannot absorb a year of phantom work corrections.
- **Rule:** Check `~/dalp` codebase before asserting any capability. If it can't be verified in code, flag as "requires verification."

---

## Client Priorities

### 2026-04-03: Compliance templates matter more than compliance modules
- **Lesson:** Buyers care about "can I be MiCA-compliant on day one?" more than the technical details of compliance module architecture. Lead with the 7 pre-seeded regulatory templates, then explain the module system.
- **Rule:** When answering compliance questions, start with the relevant regulatory template (MiCA, Reg D, MAS, FCA, JFSA, Reg CF, Japan FSA), then explain how modules compose underneath.

---

## Competitive Positioning

### 2026-04-03: Runtime composability vs. compile-time configuration
- **Lesson:** Most competitors (Fireblocks, Securitize, Tokeny, Polymath) compile token features at deployment time. DALP's runtime pluggability is a genuine differentiator.
- **Rule:** When competing, emphasize that DALP tokens can evolve post-deployment without redeployment or migration. This is a provable, code-verifiable claim.

### 2026-04-03: Platform, not consulting
- **Lesson:** SettleMint sells DALP as a platform. Never position custom development or consulting services in a bid.
- **Rule:** If an RFP asks for custom development, respond with how the platform's configurability addresses the need. If it genuinely cannot, flag as a gap.

---

## Common Mistakes

### 2026-04-03: No emoji in output documents
- **Lesson:** Emoji characters (confidence dots, status indicators) are forbidden in client-facing DOCX, PPTX, PDF. They render inconsistently and look unprofessional.
- **Rule:** Replace with text: "Fully Supported" / "Partially Supported" / "Gap" / "N/A". Internal skeletons may use emoji for readability, but output must strip them.

### 2026-04-03: Always use markdown_to_docx.py for DOCX conversion
- **Lesson:** Inline python-docx code skips mermaid diagram rendering, emoji stripping, Figtree font application, and TOC generation.
- **Rule:** ALWAYS use `python3 scripts/markdown_to_docx.py input.md output.docx`. If the script fails, fix the script. Do not work around it.

### 2026-04-05: Decode percent-encoded markdown image paths before DOCX embedding
- **Lesson:** Proposal markdown may contain screenshot paths copied from catalogs or generators that percent-encode spaces, such as `%20`. If the converter resolves those paths literally, screenshots are replaced by `[Image: ...]` placeholders even though the source images exist.
- **Rule:** In `markdown_to_docx.py`, always URL-decode markdown image paths before filesystem resolution, then verify the resulting DOCX contains actual embedded image media for screenshots, not just diagram renders.

### 2026-04-05: Screenshot proof must be planned and distributed structurally
- **Lesson:** Screenshot quality failed when screenshots were treated as optional decoration or dumped into one section late in the process.
- **Rule:** For every proposal skeleton, plan screenshots before drafting, meet the variant minimum, distribute screenshots across relevant sections, caption every screenshot with `*Figure X: ...*`, and use multiple screenshot categories unless the proposal is intentionally narrow. Validation must check count, caption coverage, section spread, and category variety.

### 2026-04-03: OOXML numbering XML ordering
- **Lesson:** All `<w:abstractNum>` elements must come BEFORE all `<w:num>` elements in numbering.xml. Appending abstractNum after existing num elements silently breaks heading numbering in Word.
- **Rule:** Always insert abstractNum elements before the first num, or rebuild the entire ordering after modifications.

### 2026-04-03: IP protection checklist before submission
- **Lesson:** No source code, no internal architecture details, no confidential client names in any bid document.
- **Rule:** Run `setup/ip-protection.md` allow/deny checklist before finalizing any bid document. This is mandatory, not optional.

### 2026-04-03: Word count targets for proposals
- **Lesson:** Evaluators have limited time. Full proposals should target 8,000-12,000 words. Executive summaries: 800-1,200 words. Individual sections: 500-1,500 words depending on weight.
- **Rule:** Check word count before submission. Overlong proposals get skimmed, not read.

## 2026-03-13: Writing style too bullet-pointy (Roderik)
- **Feedback:** Content and RFI responses read like technical notes, too many bullet lists, not enough flowing prose
- **Fix:** Updated SOUL.md with comprehensive "Writing Style" section mandating paragraphs over bullets, narrative arc per section, benefits-before-features, client-centric framing
- **Fix:** Updated AGENTS.md to require reading copywriting and copy-editing skills before any writing task
- **Rule:** Default to paragraphs. Use bullets ONLY for genuinely enumerable items. If a section is >50% bullets, rewrite as prose.
- **Example of bad:** "• RBAC with 5 roles • Route-level guards • Multi-tenancy"
- **Example of good:** "DALP implements a five-role access control model that enforces permissions at every API endpoint..."
- **Impact:** ALL future content sections and proposal outputs must follow this style

## OOXML Numbering XML Ordering (2026-03-13)
**Critical:** OOXML requires all `<w:abstractNum>` elements BEFORE all `<w:num>` elements in numbering.xml. If new abstractNum definitions are appended after existing num elements, Word cannot parse them and heading numbering breaks silently. Always insert abstractNum elements before the first num, or rebuild the entire ordering after modifications.

## Verify Rendering, Not Just XML (2026-03-13)
XML structure checks (correct numId, ilvl values) are necessary but NOT sufficient. Must verify actual rendering by converting to PDF via LibreOffice (`soffice --headless --convert-to pdf`) and checking text output with `pdftotext`. Word and LibreOffice rendering may differ from what python-docx XML inspection shows.

## Style Inheritance for Numbering is Unreliable (2026-03-13)
Do not rely on Word's style inheritance chain (H2 based on Heading 2) to propagate numPr from outline numbering pStyle links. Always set numPr explicitly on every heading paragraph: `numId=1, ilvl=0` for H1, `ilvl=1` for H2, etc.

## Editorial Quality Lessons (transferred from bid-checker)

### Early scan quality is a scoring issue, not cosmetic
The first visible layer of a proposal, headings, opening sentences, proof blocks, captions, and section starts, shapes evaluator confidence before they have read the detail. If that layer feels vague, heavy, or generic, the proposal starts losing ground immediately even when the underlying content is solid. Write every section so the value is obvious in the skim, not just discoverable on a careful read.

### Argument presence is not argument quality
Including the right section or topic does not automatically make the case persuasive. Evaluators look for a chain from claim to evidence to implication, and weak reasoning gets punished even when the structure looks complete. Draft paragraphs that prove something, not paragraphs that merely acknowledge a requirement.

### Mixed-audience writing beats specialist showing-off
Proposal writing has to work for technical readers, business sponsors, procurement, and compliance reviewers in the same document. Dense expert language may impress one specialist while losing everyone else, which weakens committee-level scoring. Write one level below the audience's maximum comprehension and favor clarity over performative expertise.

### Repetition usually signals weak editorial control
When the same differentiator, claim, or pain point appears repeatedly without adding new evidence, readers experience it as padding rather than reinforcement. That makes the proposal feel stitched together and less trustworthy. Say it once well, support it properly, and only repeat when the next mention materially advances the argument.

### Paragraph quality predicts trust more than sentence polish
Clean sentences are useful, but evaluators judge credibility in paragraph-sized chunks. A strong paragraph sets a point, supports it, shows why it matters, and transitions cleanly; a weak one feels like accumulated notes. Spend more effort on paragraph architecture than on polishing isolated lines.

### Format choice is part of writing quality
Some ideas need prose, some need tables, and some are clearer as diagrams or process visuals. Forcing everything into one format creates friction even when the content is technically present. Choose the format that best helps the evaluator compare, understand, or remember the point.

### Voice fractures expose multi-author patchwork
Abrupt shifts in tone, terminology, certainty, or rhythm make the document feel assembled by committee rather than intentionally written. That exposes weak editorial control and can make claims feel less reliable. Edit across the full document for one consistent voice, especially at section boundaries where handoffs usually show.

### Ambiguity is often the real defect behind polished prose
A paragraph can sound polished while still being unclear about what is native, configurable, integration-dependent, on the roadmap, or unsupported. In proposals, that kind of vagueness forces evaluators to guess, and guesswork turns into distrust. Be precise about capability status, delivery responsibility, and timing every time those distinctions matter.

### Persona asymmetry matters
What reassures a technical evaluator can worry a compliance reviewer, and what satisfies procurement can feel empty to a technical lead. Proposals are scored by mixed committees, so writing that works for only one reader type is not actually strong writing. Pressure-test key sections against the likely personas and adjust the framing so none of them are left to fill dangerous gaps.

### Defect severity must be explicit
Not every writing problem deserves the same urgency. A blocker, a trust-eroding weakness, and a cosmetic polish issue should not sound interchangeable because teams need to know what to fix first. When reviewing or revising, label the severity clearly so effort goes to the defects that can actually change the outcome.


### 2026-04-05: Raised proposal visual minimums
- **Lesson:** Proposal visual floors were too easy to satisfy, which allowed outputs to stop at 15 Mermaid diagrams and 6 screenshots for full variants. That is now too low.
- **Fix:** Doubled the structural minimums in proposal validation, diagram manifest rules, screenshot manifest rules, skeleton instructions, and writing guidance.
- **Rule:** Proposal minimums are now fixed at 30 Mermaid diagrams, 12 screenshots, and 8 sequence diagrams for full variants; 20, 8, and 6 for medium; 10, 6, and 4 for compact. Treat these as hard gates, not suggestions.
