# Skeleton Definition

## What a skeleton is
A proposal skeleton is a structural blueprint for a proposal writer. It is **not proposal content**. It does not try to persuade the client directly. It tells the writer **what to write, where to write it, how much to write, what evidence to include, what visuals to add, and which source files to use**.

Think of it as the architect's plan, not the finished building.

A good skeleton removes ambiguity. A writer should be able to pick it up and know:
- the section hierarchy
- the target length for each section and subsection
- the exact purpose of each section
- the topics to cover
- the expected tone
- the required tables, diagrams, and appendices
- the source material to pull from
- how the document should flow from start to finish

## What a skeleton is not
A skeleton is **not**:
- a finished proposal draft
- placeholder prose meant to be lightly edited
- generic filler text
- a content library
- a branded template with prewritten paragraphs

If a section starts sounding like actual client-facing copy, the skeleton has drifted into content writing and needs to be corrected.

## Anatomy of a skeleton entry
Every skeleton entry should contain the following components.

### 1. Section name
The section title and numbering scheme.

Example:
- `## Section 6: Technical Architecture`
- `### 6.2 Integration Architecture`

### 2. Target length
Length guidance should be given in a format that is operational for writers and reviewers.

Best practice:
- page range for the section
- word range for the section
- word count for each subsection
- paragraph count where useful

Example:
- `**Target length:** 4-5 pages (2,000-2,500 words)`
- `### 6.2 Integration Architecture (450-600 words, 3-4 paragraphs)`

### 3. Purpose
A short statement explaining why the section exists and what evaluator concern it is meant to answer.

Example:
- `**Purpose:** Show how DALP fits into the client's target operating model and existing infrastructure.`

### 4. Write-about instructions
Specific instructions that tell the writer what belongs in the section.

Good write-about instructions:
- identify the core topics
- specify required points to address
- indicate what to emphasize for that proposal type
- note where tailoring is required

Weak instruction:
- `Write about architecture.`

Strong instruction:
- `Write about deployment topology, major runtime components, integration boundaries, resilience model, and the rationale for the proposed architecture in a regulated institutional environment.`

### 5. Visual element specification
If a table, diagram, chart, timeline, or matrix is required, the skeleton should define:
- what kind of visual it is
- where it appears
- what information it contains
- how many rows/columns/steps are expected
- whether it is optional or mandatory

Example:
- `Include: 1 table (Component | Function | Technology | Integration Protocol) with 8-10 rows`
- `Include: 1 mermaid sequence diagram showing issuance approval flow from request to on-chain confirmation`

### 6. Tone and stance
The skeleton should instruct the writer how the section should sound.

Examples:
- `Tone: Direct, institutional, evidence-backed`
- `Tone: Commercially confident but non-promotional`
- `Tone: Precise and compliance-oriented; avoid marketing language`

### 7. Source references
Each section should point the writer to the source files or source systems that should feed the section.

Source references should be as specific as possible:
- exact markdown files
- exact directories when multiple docs are relevant
- spreadsheets or questionnaires to map from
- reusable blocks or standard sections

Example:
- `Reference: bid-manager/templates/technical-architecture.md`
- `Reference: ~/dalp/kit/dapp/content/docs/architecture/`
- `Reference: bid-manager/templates/rfi-questionnaire.csv`

### 8. Section-specific constraints
Where useful, define what must or must not happen in the section.

Examples:
- `Do not repeat company history already covered in Section 2`
- `Tie every claim to either a DALP doc, certification, or reviewed capability source`
- `Where the answer is partial, instruct the writer to state the limitation clearly`

## Skeletons vs templates
Skeletons and templates are related but different.

| Aspect | Skeleton | Template |
|---|---|---|
| Purpose | Defines structure and writing instructions | Provides reusable draft content or placeholders |
| Contains finished prose? | No | Often yes |
| Tells writer what to cover? | Yes | Sometimes, but usually less explicitly |
| Specifies word counts? | Yes, should do so consistently | Often incomplete or absent |
| Specifies visuals? | Yes, explicitly | Often only implied |
| Main use | Planning, structuring, assigning, reviewing | Drafting and assembling |

### Practical rule
- **Template** = partially built house
- **Skeleton** = blueprint with measurements and build notes

A writer should be able to use a skeleton to create new content from scratch without guessing.

## Quality criteria for a good skeleton
A strong skeleton should meet the following criteria.

### 1. Structural completeness
All major sections and subsections exist. No obvious proposal gaps.

### 2. Actionable length guidance
Every section has realistic length guidance. Writers should not have to guess whether a subsection needs 100 words or 1,000.

### 3. Visual clarity
All required visuals are specified with enough detail for a designer or writer to create them correctly.

### 4. Source traceability
Every section points to specific source materials. The writer should know where to pull facts from.

### 5. Clear hierarchy
Heading levels are consistent and easy to follow.

### 6. Instruction quality
The write-about instructions are specific enough that a writer can execute them without interpretation drift.

### 7. Logical flow
Sections build naturally from context -> solution -> proof -> delivery -> commercials -> appendices.

### 8. Reusability
The skeleton can be adapted across clients in the same class without rewriting the whole structure.

## Red flags
A skeleton needs revision if it:
- contains persuasive copy instead of instructions
- omits word counts for many sections
- uses vague references like `docs` instead of named files
- says `add a diagram` without specifying what diagram
- duplicates sections without distinct purpose
- has no clear distinction between core and optional material
- cannot be reviewed consistently by another person

## Minimum standard for every skeleton in this system
Every skeleton created in this system should include:
- section numbering
- target page and word counts
- purpose statement per major section
- subsection-level write-about instructions
- diagram/table specs where relevant
- tone guidance
- source references
- notes on tailoring variables such as geography, client type, deployment model, and regulatory emphasis
