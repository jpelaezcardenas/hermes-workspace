---
title: "Feedback Patterns — Word Writer"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.914717Z
---

# Feedback Patterns — Word Writer

> Constructive feedback templates for common document issues. Use these when self-reviewing drafts or providing revision notes. Each pattern identifies the symptom, explains why it matters, and gives a concrete fix direction.

## Structure Feedback

### Buried Lead
- **Symptom:** The document's core message or recommendation appears on page 2 or later.
- **Feedback:** "The key takeaway is buried in section [X]. Move the core point to the opening paragraph. The reader should know what this document is about and what it recommends within the first three sentences."
- **Fix direction:** Rewrite the opening to state the conclusion or recommendation first, then use the body to support it.

### TOC Mismatch
- **Symptom:** A TOC is included in a short document (under 4 pages), or omitted from a long reference document.
- **Feedback:** "This [document type] is [N] pages. A TOC adds navigation overhead without value at this length." / "At [N] pages, readers need a TOC to locate sections quickly."
- **Fix direction:** Remove TOC for memos and short briefings. Add TOC for reports, research summaries, and reference docs over 5 pages.

### Appendix Carrying Core Content
- **Symptom:** Critical analysis, recommendations, or data that drives decisions is placed in an appendix.
- **Feedback:** "The [specific content] in Appendix [X] is essential to the document's argument. Appendices are for supporting detail, not primary reasoning. Move this into the body."
- **Fix direction:** Relocate decision-critical content into the relevant body section. Keep only supplementary reference material in appendices.

## Writing Feedback

### Warm-Up Paragraphs
- **Symptom:** The first paragraph of a section restates context the reader already has before getting to the point.
- **Feedback:** "Section [X] opens with context the reader already knows from the executive summary / previous section. Cut the warm-up and start with the new information or analysis."
- **Fix direction:** Delete the restating sentences. Begin each section with what that section uniquely contributes.

### Hedge Overload
- **Symptom:** Excessive use of "may," "could potentially," "it is possible that," "depending on circumstances" without committing to a position.
- **Feedback:** "This paragraph hedges [N] times in [M] sentences. If the answer is conditional, state the conditions clearly. If it is uncertain, say so once and move on. Do not hedge every clause."
- **Fix direction:** Pick a position. State conditions as concrete if/then statements rather than probability language.

### Repetition Across Summary and Body
- **Symptom:** The executive summary and a body section say the same thing in slightly different words with no added depth.
- **Feedback:** "Section [X] repeats the executive summary almost verbatim. The body should add detail, evidence, or analysis that the summary compressed. If there is nothing to add, the section may not be needed."
- **Fix direction:** Make the body section go deeper: add specifics, data, examples, or reasoning that supports the summary's compressed claim.

## Table and Figure Feedback

### Prose-Heavy Table Cells
- **Symptom:** Table cells contain full sentences or multi-line paragraphs.
- **Feedback:** "The table in section [X] has cells containing [N]-word paragraphs. Tables work for comparison, not narration. Use short phrases, keywords, or values. If explanation is needed, put it in text before or after the table."
- **Fix direction:** Reduce cell content to keywords, short phrases, or data values. Move explanatory prose to surrounding body text.

### Uninterpreted Table
- **Symptom:** A table is dropped into the document without any preceding introduction or following interpretation.
- **Feedback:** "The table in section [X] appears without context. Add a sentence before it explaining what the reader should take from it, and a sentence after highlighting the key insight or comparison."
- **Fix direction:** Add a lead-in sentence ("Table [N] compares...") and a takeaway sentence after the table.

### Figure Without Purpose
- **Symptom:** A diagram or screenshot is included but does not clearly support the surrounding text.
- **Feedback:** "The figure in section [X] is not referenced in the surrounding text. If it supports a specific point, reference it explicitly. If it does not add to comprehension, remove it."
- **Fix direction:** Either add an explicit text reference ("As shown in Figure [N]...") that ties the figure to the argument, or remove the figure.

### Caption Missing on Meaningful Figure
- **Symptom:** A figure carries analytical or explanatory value, but appears without a caption.
- **Feedback:** "The figure in section [X] does real explanatory work, but it has no caption. Add a short caption so the reader can identify what the figure shows without reverse-engineering it from surrounding prose."
- **Fix direction:** Add a concise caption that names the figure and its purpose, for example: "Figure [N]. DALP servicing workflow" or "Figure [N]. Comparison of deployment options." Keep captions descriptive, not promotional.

### Screenshot Includes Irrelevant Chrome
- **Symptom:** A screenshot shows browser tabs, desktop clutter, excess whitespace, or interface areas unrelated to the point.
- **Feedback:** "The screenshot in section [X] includes visual noise that does not help the reader. Crop it to the interface region that supports the point. The reader should not have to guess what to look at."
- **Fix direction:** Re-crop the image to the relevant panel, workflow step, or data region. Remove browser chrome, empty margins, and unrelated UI areas unless they are necessary context.

## Writing Feedback (continued)

### AI Markers and Self-Reference
- **Symptom:** Phrases like "As an AI," "I hope this helps," "In this document, we will explore," "It's important to note that," or uncanny constructions like "delve into," "landscape of," "it's worth mentioning" appear in the text.
- **Feedback:** "Section [X] contains AI-characteristic phrasing ('[specific phrase]'). These markers erode credibility with enterprise readers who will assume the document was generated without review. Replace with direct, human-sounding statements."
- **Fix direction:** Delete meta-commentary ("it's worth noting," "in this section we will"). Replace filler transitions with the actual point. Read the sentence aloud: if no professional would say it in a meeting, rewrite it.

### Consultant Fog
- **Symptom:** A section that should recommend or conclude instead offers vague strategic language: "organizations should consider evaluating," "a holistic approach may be beneficial," "stakeholders could explore synergies."
- **Feedback:** "Section [X] reads as advisory fog rather than a concrete recommendation. The reader needs to know what to do, not that they should 'consider exploring options.' State the recommendation, the cost, and the next step."
- **Fix direction:** Replace "should consider" with a direct imperative. Add specifics: who does what, by when, at what cost or effort level. If the answer is genuinely uncertain, state the two or three concrete options with trade-offs rather than hedging.

### Title Repeated as First Heading
- **Symptom:** The document title (from metadata or cover page) appears again as the H1 of the first section, creating redundancy.
- **Feedback:** "The title '[title]' is repeated as the first body heading. The reader already sees the title on the cover or in the document properties. Start the body with the first substantive section heading instead."
- **Fix direction:** Remove the duplicate heading. If the first section needs an introduction, use a distinct heading that signals what the section covers (e.g., "Background" or "Current State") rather than echoing the title.

### Sensitive Detail Leakage
- **Symptom:** Internal pricing, employee names, draft-stage caveats, internal project codes, or confidential client details appear in a document intended for an external audience.
- **Feedback:** "Section [X] contains [type of sensitive detail] that should not appear in a document for [audience]. Remove or generalize before delivery."
- **Fix direction:** Scrub the document against the audience classification from the request. Internal references become generic ("the project team"), pricing becomes "available on request," and draft caveats are removed entirely for final deliverables.

### Inconsistent Table Phrasing
- **Symptom:** Table rows mix sentence fragments, full sentences, and bare keywords in the same column, or verb tense shifts between rows.
- **Feedback:** "The table in section [X] mixes phrasing styles across rows (e.g., row 1 uses a full sentence, row 3 uses a keyword). Pick one style for each column and apply it consistently."
- **Fix direction:** Choose a column-level convention: noun phrases for label columns, short declarative fragments for description columns, values or keywords for data columns. Rewrite outlier rows to match.

## Formatting and Delivery Feedback

### Heading Granularity Mismatch
- **Symptom:** A 3-page memo uses H1/H2/H3/H4 nesting, or a 15-page report uses only H1.
- **Feedback:** "The heading depth does not match the document's complexity. [Short docs]: flatten to H1/H2 maximum. [Long docs]: add H2/H3 structure to help navigation."
- **Fix direction:** Match heading depth to document length and complexity. Two levels for short docs, three for medium, four only for comprehensive reference documents.

### Filename Too Vague
- **Symptom:** Output file is named "report.docx" or "summary.docx" without identifying the subject or date.
- **Feedback:** "The filename '[name]' does not help the recipient identify the document after download. Use the pattern: [subject]-[type]-[YYYY-MM-DD].docx."
- **Fix direction:** Rename using the standard pattern with subject, document type, and date.

### Blank Page After Cover or TOC
- **Symptom:** The generated DOCX opens with an unintended blank page after the cover, title page, or table of contents.
- **Feedback:** "The DOCX has a blank page after the cover or TOC. That reads as a conversion defect, not a design choice. Remove the extra page break or section break before delivery."
- **Fix direction:** Check the markdown and conversion output for an unnecessary page break, empty heading block, or section break around the cover and TOC boundary. Regenerate and re-open the DOCX to confirm the blank page is gone.
