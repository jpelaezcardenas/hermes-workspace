# Diagram Workflow

## Purpose
Use this six-phase workflow every time the bid-manager creates or updates a diagram. The goal is simple: pick the right tool, stay on-brand, and avoid diagrams that look clever but communicate badly.

## Phase 1: Analysis
Figure out what the diagram needs to do before picking syntax.

### Questions to Answer
- What is the single message the diagram must communicate?
- Who is the audience: evaluator, buyer, technical reviewer, or executive?
- Is the purpose explanatory, comparative, architectural, procedural, or evidentiary?
- Does the surrounding section already explain enough, or does the diagram carry essential meaning?
- Can the same information be shown more clearly as a table or bullet list?

### Outputs
- Diagram purpose statement
- Audience and context
- Candidate diagram type
- Draft title

## Phase 2: Planning
Decide scope, shape, and content boundaries.

### Planning Rules
- Limit the diagram to one primary story
- Define what is inside scope and what stays in prose
- Cap complexity early: if the structure will exceed A4 readability, split it now
- Shorten labels before diagramming, not after rendering
- Choose 3-5 semantic color roles at most

### Planning Checklist
- [ ] Title is clear and proposal-ready
- [ ] Diagram fits one page at normal reading size
- [ ] Node count is realistic for the chosen type
- [ ] Legend is needed only if color semantics are not obvious
- [ ] Fixed vs variable content is understood

## Phase 3: Selection (Mermaid vs PlantUML)
Pick the tool based on structure, not personal preference.

### Choose Mermaid When
- The diagram is a simple flowchart or decision tree
- You need a lightweight Gantt, ER, pie, journey, mind map, or quick process view
- The proposal needs speed and easy inline authoring
- Layout precision is less important than fast iteration

### Choose PlantUML When
- The diagram is component, deployment, class, object, package, use case, or network oriented
- UML semantics matter
- The structure is technical and benefits from clearer grouping
- You need stronger control of containers, boundaries, and notation

### Decision Table

| Need | Choose | Why |
|---|---|---|
| Quick process explanation | Mermaid | Faster to author and easy to read |
| Implementation plan timeline | Mermaid | Native Gantt support |
| Data model relationship sketch | Mermaid | ER is fast and readable |
| Runtime architecture | PlantUML | Better deployment/control notation |
| Service/component map | PlantUML | Better component semantics |
| Use case view | PlantUML | Proper UML use case notation |
| Domain structure | PlantUML | Class/package/object support |
| Proposal-ready decision tree | Mermaid | Clean and quick |

## Phase 4: Generation
Write the diagram with brand standards from the start. See `setup/brand-colors.md` for the canonical color palette and diagram fill pairings.

### Generation Rules
- Use approved SettleMint colors only
- Use dark text on pastel fills only
- Use Figtree wherever the renderer supports it
- Use rounded corners; PlantUML must use `RoundCorner 15`
- Keep labels concise and meaningful
- Prefer grouping and whitespace over dense node packing

### Generation Sequence
1. Start from the library or catalog example closest to the need
2. Draft the content with short labels
3. Apply the approved theming block
4. Render locally to SVG and PNG
5. Fix syntax and layout issues immediately

## Phase 5: Integration
Place the rendered diagram into the document intentionally.

### Integration Rules
- Center diagrams in the Word document
- Fit within A4 content width and height
- Place diagrams near the section they support
- Add a short lead-in sentence before the diagram
- Add a short interpretation after the diagram if the visual has multiple parts
- Do not stack two dense diagrams back-to-back without explanatory text

### File Handling
- Use deterministic output naming
- Keep rendered diagrams in a dedicated `diagrams/` directory when generated from markdown
- Preserve source markdown blocks as the canonical editable version

## Phase 6: Quality Check
Do not ship the first render without checking it properly.

### Content Quality Checks
- [ ] The diagram supports the argument instead of repeating the text
- [ ] Labels are understandable without internal jargon overload
- [ ] The diagram title matches the surrounding section
- [ ] The visual tells one coherent story

### Brand Compliance Checks
- [ ] Approved palette only
- [ ] Heading/text blue is `#000099` where used as primary text
- [ ] Body black remains `#000000` outside diagrams
- [ ] White background is preserved
- [ ] Rounded cards use 15-20px logic consistently
- [ ] PlantUML diagrams use Figtree and `RoundCorner 15`

### Technical Checks
- [ ] Syntax validates cleanly
- [ ] SVG renders correctly
- [ ] PNG renders at 300 DPI where required
- [ ] Diagram fits on page without clipping
- [ ] Text remains readable at insertion size
- [ ] No overlapping labels, broken arrows, or accidental default styling

## Final Approval Rule
A diagram is done only when all three are true:
1. it communicates clearly,
2. it is visibly on-brand,
3. it renders reliably in the document workflow.

If one of those fails, the diagram is not done yet.
