# RFP Skeleton Scoring Rubric

Score each RFP Forge skeleton out of 100. The skeleton should be revised until it reaches **95 or above**.

## 1. Requirements coverage completeness — 20 points
How fully does the skeleton cover the requirement domains needed for the procurement type?

### High score characteristics
- includes organization context, scope, requirements, evaluation, timeline, submission rules, commercials, legal terms, and appendices
- covers technical, operational, security, compliance, integration, and deployment topics where relevant
- distinguishes mandatory, important, and desirable requirements
- includes enough requirement density to make vendor comparison meaningful

### Scoring guide
- **18-20:** complete and procurement-ready
- **14-17:** mostly complete; minor gaps
- **10-13:** material gaps in one or more domains
- **0-9:** incomplete structure

## 2. Evaluation criteria clarity — 15 points
How clearly does the skeleton tell the writer how vendors will be assessed?

### High score characteristics
- explicit scoring categories and weights
- clear distinction between pass/fail gates and weighted evaluation
- evaluator-ready evidence requests
- section structure supports side-by-side vendor comparison

### Scoring guide
- **13-15:** clear, weighted, and auditable
- **10-12:** generally clear but needs sharper scoring logic
- **6-9:** partial evaluation logic
- **0-5:** vague or absent evaluation method

## 3. Scope definition precision — 15 points
How precisely does the skeleton define the work, capabilities, boundaries, and expected outcomes?

### High score characteristics
- explicit in-scope and out-of-scope guidance
- clear operating model assumptions
- concrete buyer goals and target use cases
- no ambiguity around the procurement object

### Scoring guide
- **13-15:** precise and low-ambiguity
- **10-12:** usable but some boundary blur
- **6-9:** scope open to interpretation
- **0-5:** poorly defined

## 4. Submission instructions quality — 10 points
How well does the skeleton tell vendors how to respond?

### High score characteristics
- required format, response types, attachments, and templates are clear
- timeline, clarification process, and submission rules are explicit
- instructions reduce non-comparable responses

### Scoring guide
- **9-10:** strong and operational
- **7-8:** good with minor omissions
- **4-6:** partly defined
- **0-3:** weak or missing

## 5. Commercial framework clarity — 10 points
How clearly does the skeleton define commercial response expectations?

### High score characteristics
- pricing structure requested explicitly
- implementation cost expectations stated
- support, SLA, licensing, optional services, and assumptions included
- commercial schedule separated from technical response

### Scoring guide
- **9-10:** clear and structured
- **7-8:** mostly clear
- **4-6:** partial commercial framing
- **0-3:** weak or absent

## 6. Technical depth appropriateness — 10 points
Does the skeleton ask for the right depth for the document type?

### High score characteristics
- formal RFPs have enough depth to down-select vendors
- RFIs stay exploratory without turning into premature solution design
- questionnaires are structured, granular, and answerable

### Scoring guide
- **9-10:** depth well matched to purpose
- **7-8:** mostly appropriate
- **4-6:** too shallow or too heavy
- **0-3:** misaligned depth

## 7. Legal and regulatory framing — 10 points
How well does the skeleton frame legal, compliance, and governance expectations?

### High score characteristics
- includes terms, confidentiality, regulatory obligations, buyer reservations, and data handling where relevant
- aligns with regulated financial market procurement norms
- distinguishes platform controls from legal obligations

### Scoring guide
- **9-10:** strong legal and regulatory structure
- **7-8:** mostly complete
- **4-6:** partial framing
- **0-3:** weak or absent

## 8. Reusability and adaptability — 10 points
How reusable is the skeleton across adjacent procurement scenarios?

### High score characteristics
- includes clear tailoring variables
- reusable structure without becoming generic mush
- can be adapted by sector, geography, deployment model, or asset type

### Scoring guide
- **9-10:** highly reusable and adaptable
- **7-8:** reusable with light editing
- **4-6:** reusable only in narrow cases
- **0-3:** brittle or overly bespoke

## Hard fail conditions
A skeleton may not score above **90/100** if any of the following are missing, even if the numeric subtotal would otherwise exceed 90:
- published evaluation weightings and score logic
- explicit pass/fail qualification gates
- vendor response format instructions or response templates
- scope exclusions or out-of-scope boundaries
- submission process mechanics, including clarification window and deadline structure

Use this override to prevent inflated scores for skeletons that look complete at a glance but still fail the minimum procurement-operability test. A skeleton is not procurement-ready if a writer could produce a document that vendors cannot answer consistently or evaluators cannot score defensibly.

## Review output format
Use this summary block:

```md
## Score Summary
- Requirements coverage completeness: 19/20
- Evaluation criteria clarity: 15/15
- Scope definition precision: 14/15
- Submission instructions quality: 10/10
- Commercial framework clarity: 9/10
- Technical depth appropriateness: 10/10
- Legal/regulatory framing: 9/10
- Reusability/adaptability: 10/10
- **Total: 96/100**
```

## Revision rule
If total score is below 95:
1. identify the weak dimensions
2. revise the skeleton
3. rescore the revised version
4. keep the final published score at 95+
