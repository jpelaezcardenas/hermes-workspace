---
title: "Anti-Patterns Library"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.658003Z
---

# Anti-Patterns Library

Use this file during startup to calibrate your eye before reviewing any deck.
It is a catalog of common presentation failures you should actively look for.
Do not wait for these issues to become extreme before flagging them.
If a slide, section, or full deck matches one of these patterns, name it explicitly in the review.

## How to Use This Library
- Use the anti-pattern name in feedback when it sharpens the point.
- Treat these as recognizable failure modes, not cute labels.
- One slide may trigger multiple anti-patterns at once.
- Repeated anti-patterns across a deck are worse than isolated slips.
- When severity says **Hard Fail**, the deck should not ship without correction.
- When severity says **Major**, it materially harms clarity, credibility, or audience trust.
- When severity says **Minor**, it is still worth fixing, especially when repeated.

---

## 1. The Wall of Text
**One-line description:** A slide is crammed with paragraphs instead of presentation-ready copy.

**What it looks like:**
- Multiple full sentences or paragraphs on one slide
- Tiny text used to fit more content
- No obvious scanning path
- Speaker-note content dumped onto the canvas

**Why it’s bad:**
- The audience reads instead of listening
- Key points disappear inside visual noise
- The presenter is forced to narrate a document, not a slide

**How to fix it:**
- Cut the slide to one message
- Convert paragraphs into short, non-overlapping bullets
- Move detail into speaker notes or split into multiple slides
- Use the title to state the takeaway, not the topic

**Severity:** Major

---

## 2. The Ghost Slide
**One-line description:** A slide still contains placeholder content, empty boxes, or obviously unfinished sections.

**What it looks like:**
- “Click to add text” or sample template copy
- Blank charts, empty tables, or unlabeled shapes
- A title with no meaningful body content
- Half-built layout blocks left behind

**Why it’s bad:**
- It signals carelessness immediately
- It makes the deck look unfinished and untrustworthy
- It wastes audience attention on content that does not exist

**How to fix it:**
- Delete unused slides and placeholders
- Fill required content completely or remove the layout
- Run a final pass specifically for empty fields and orphaned objects

**Severity:** Hard Fail

---

## 3. The Kitchen Sink
**One-line description:** A slide tries to communicate three or more competing messages at once.

**What it looks like:**
- Mixed agenda, data, diagram, and CTA on one canvas
- Several equal-weight panels with no clear focal point
- A title that does not unify the content below it
- The audience cannot tell what matters most

**Why it’s bad:**
- Attention gets split instead of directed
- Nothing feels important because everything is competing
- The presenter must do too much rescue work live

**How to fix it:**
- Decide the one job of the slide
- Remove or relocate anything that does not serve that job
- Split the content into separate slides if needed
- Rebuild hierarchy so one element clearly leads

**Severity:** Major

---

## 4. The Bullet Marathon
**One-line description:** A slide uses a long, flat list of bullets with no grouping, priority, or structure.

**What it looks like:**
- 10 or more bullets in one list
- Each bullet has similar weight and length
- No grouping into themes or sections
- The title provides no clear takeaway

**Why it’s bad:**
- The audience stops scanning after a few bullets
- Important points are buried beside trivial ones
- The slide feels like notes pasted in raw

**How to fix it:**
- Cut to the 3-6 most important points
- Group related bullets under mini-headings
- Turn low-value bullets into speaker notes
- Split the list across multiple slides when necessary

**Severity:** Major

---

## 5. The Font Zoo
**One-line description:** A slide uses too many fonts or inconsistent type styles.

**What it looks like:**
- Three or more fonts on one slide
- Random mixing of weights, sizes, and styles
- One slide looks unlike the rest of the deck
- Headers and body copy follow no consistent system

**Why it’s bad:**
- It makes the deck feel amateur and stitched together
- It weakens hierarchy instead of strengthening it
- It signals brand indiscipline and low polish

**How to fix it:**
- Use the template font system only
- Limit variation to purposeful hierarchy changes
- Standardize title, subtitle, body, and caption styles across the deck

**Severity:** Major

---

## 6. The Color Explosion
**One-line description:** A slide uses random colors outside the template palette or without semantic logic.

**What it looks like:**
- Many unrelated accent colors on one slide
- Colors that do not match the brand template
- Highlight colors used inconsistently across slides
- Visual emphasis achieved through color spam

**Why it’s bad:**
- It creates visual noise and kills coherence
- The audience cannot tell what color means, if anything
- It makes the deck feel less trustworthy and less premium

**How to fix it:**
- Stay within the approved brand palette
- Use color sparingly and consistently for emphasis or categorization
- Let hierarchy do most of the work before adding color

**Severity:** Major

---

## 7. The Screenshot Dump
**One-line description:** A full-page screenshot is dropped in with no crop, annotation, or explanation.

**What it looks like:**
- Entire app screens pasted as-is
- Tiny UI text unreadable at presentation distance
- No callouts, highlights, or framing text
- The audience must hunt for the point

**Why it’s bad:**
- Screenshots become clutter instead of evidence
- The presenter burns time explaining where to look
- The slide communicates “we had a screenshot” rather than a message

**How to fix it:**
- Crop to the relevant area
- Add callouts, arrows, or labels to direct attention
- Pair the image with a title that states the insight
- Replace full screenshots with recreated diagrams when clarity matters more than fidelity

**Severity:** Major

---

## 8. The Phantom Template
**One-line description:** Unused template or backup slides remain in the final deck.

**What it looks like:**
- Cover variants, appendix stubs, or instruction slides left in place
- Duplicate layouts never populated
- Slide sorter shows obvious leftovers from the original template
- Hidden slides contain junk that should have been removed

**Why it’s bad:**
- It makes the deck look sloppy and uncurated
- It confuses reviewers, presenters, and clients
- It suggests nobody did a final quality pass

**How to fix it:**
- Delete all unused template slides before review
- Keep only slides that belong to the actual story
- Run a sorter-view cleanup pass before export or delivery

**Severity:** Hard Fail

---

## 9. The Redundant Slide
**One-line description:** The deck repeats the same point across multiple slides without adding new value.

**What it looks like:**
- Two or more slides making the same claim in slightly different wording
- Repeated diagrams or proof points with minimal change
- A section that feels like it is circling instead of progressing
- Titles that could be swapped without changing meaning

**Why it’s bad:**
- It wastes audience attention and deck length
- It makes the story feel weaker, not stronger
- Repetition without advancement signals poor editing

**How to fix it:**
- Combine overlapping slides
- Keep the strongest expression of the point and cut the rest
- Ensure each slide earns its place by advancing the argument

**Severity:** Major

---

## 10. The Buzzword Bingo
**One-line description:** The copy is stuffed with empty jargon, AI-tell language, and vague superiority claims.

**What it looks like:**
- Sentences full of “leverage,” “transform,” “innovative,” or “end-to-end” without specifics
- Claims that sound impressive but say nothing concrete
- Generic B2B SaaS copy that could fit any company
- Stacked adjectives replacing evidence

**Why it’s bad:**
- Audiences stop trusting the deck
- Real strengths get buried under fake sophistication
- The deck sounds machine-generated or consultant-written

**How to fix it:**
- Replace abstract jargon with specific features, workflows, or outcomes
- Cut empty modifiers and superiority claims
- Ask of every line: what does this actually mean, and can we defend it?

**Severity:** Major

---

## 11. The Missing Story
**One-line description:** The deck is a pile of slides, not a narrative that builds to a conclusion.

**What it looks like:**
- Slides feel individually plausible but collectively disconnected
- No clear setup, tension, resolution, or recommendation
- The ending does not feel earned by what came before
- Section order feels arbitrary

**Why it’s bad:**
- The audience cannot follow the logic or remember the message
- Good slides still fail if they do not add up to an argument
- The deck feels assembled, not designed

**How to fix it:**
- Define the audience question the deck is answering
- Reorder slides into a clear progression
- Make titles carry the narrative so the story survives skim-reading
- End with a conclusion that resolves the deck’s main tension

**Severity:** Hard Fail

---

## 12. The Clone Army
**One-line description:** Too many slides use the exact same layout, rhythm, and visual treatment.

**What it looks like:**
- Five or more slides with identical structure and pacing
- Same card grid, same bullet block, same image placement over and over
- No visual change when the story changes
- The deck becomes monotonous to scan

**Why it’s bad:**
- Repetition dulls attention and weakens emphasis
- The audience stops noticing what is different from slide to slide
- Important moments do not get visual distinction

**How to fix it:**
- Keep template consistency, but vary layouts when the content type changes
- Use different formats for proof, process, architecture, comparison, and CTA slides
- Let visual treatment reinforce narrative progression

**Severity:** Minor

---

## 13. The Data Graveyard
**One-line description:** A chart or table is presented without an insight, interpretation, or takeaway.

**What it looks like:**
- Dense tables with no highlighted row or conclusion
- Charts dropped in without commentary
- Raw numbers with no framing
- The title describes the data source, not the meaning

**Why it’s bad:**
- Data without interpretation forces the audience to do the work
- The slide proves effort, not insight
- Valuable evidence loses persuasive power

**How to fix it:**
- Write the title as the conclusion, not the topic
- Highlight the one number, pattern, or delta that matters
- Add a callout explaining why the audience should care
- Move supporting detail to appendix if necessary

**Severity:** Major

---

## 14. The Franken-deck
**One-line description:** The deck shows obvious seams from copy-pasting slides, styles, or tone from different sources.

**What it looks like:**
- Sudden shifts in typography, icon style, or spacing
- Tone changes from technical to hypey to generic sales language
- Mixed brands, mixed terminology, or mixed visual systems
- Some slides feel handcrafted, others feel imported

**Why it’s bad:**
- It kills trust and polish instantly
- It makes the presenter seem unprepared or incoherent
- The audience feels the deck was assembled from leftovers

**How to fix it:**
- Normalize all slides to one template and one voice
- Rewrite imported copy into the deck’s narrative and brand style
- Standardize colors, icons, chart styles, and terminology before final review

**Severity:** Major

---

## 15. The Invisible CTA
**One-line description:** The deck ends without a clear ask, decision, or next step.

**What it looks like:**
- Final slide is a bland thank-you or logo page
- No recommendation, action, owner, or decision request
- The audience does not know what should happen after the meeting
- The deck stops instead of landing

**Why it’s bad:**
- Even a good deck fails if it does not move the conversation forward
- The audience leaves without clarity on what is needed from them
- Momentum dies at the exact moment the deck should convert attention into action

**How to fix it:**
- End with a concrete next step, decision, or ask
- Name what needs approval, discussion, or follow-up
- Make the closing slide operational, not decorative

**Severity:** Hard Fail

---

## 16. The Edge Cram
**One-line description:** Content is pushed too close to the slide borders to squeeze more in.

**What it looks like:**
- Text boxes nearly touching the edges
- Charts, logos, or cards jammed into corners
- Footer content colliding with main content
- Margins inconsistent with the template

**Why it’s bad:**
- The slide feels unstable and crowded
- Readability drops, especially when projected
- It signals desperation to fit too much content

**How to fix it:**
- Respect template margins
- Reduce content before shrinking spacing
- Rebuild the layout with proper whitespace

**Severity:** Minor

---

## 17. The Fake Balance Slide
**One-line description:** A slide looks symmetrical, but the actual content weight is wildly uneven.

**What it looks like:**
- Two columns where one side has 10x more content than the other
- Equal-size boxes holding unequal complexity
- A centered layout that hides lopsided information density
- Visual structure that suggests parity where none exists

**Why it’s bad:**
- It creates cognitive friction because the visual promise is false
- The audience expects equal comparison and gets imbalance instead
- Important content gets visually under- or over-weighted

**How to fix it:**
- Match layout structure to actual content weight
- Resize, regroup, or stack sections based on importance and density
- Do not force symmetry when the content is asymmetric

**Severity:** Minor

---

## 18. The Infographic Dump
**One-line description:** A dense diagram or framework is dropped onto a slide without simplification or explanation.

**What it looks like:**
- Complex architecture graphic pasted in full
- Tiny labels, arrows, and boxes unreadable from a distance
- No highlight of the relevant section
- The diagram looks imported rather than designed for presentation

**Why it’s bad:**
- Complexity without guidance overwhelms the audience
- The slide becomes a visual permission slip for confusion
- The presenter has to talk people through a map they cannot read

**How to fix it:**
- Simplify the diagram to the subset that matters for this audience
- Highlight the relevant path, component, or insight
- Break one complex diagram into multiple simpler slides if needed

**Severity:** Major

---

# SettleMint / DALP-Specific Anti-Patterns

These are not generic design misses. They are credibility failures specific to SettleMint, DALP, and the standards expected in our decks.
Because DALP claims must be precise and defensible, these anti-patterns deserve extra scrutiny.

---

## 19. The Capability Hallucination
**One-line description:** The deck claims DALP can do something that is not verified in product reality.

**What it looks like:**
- Sweeping capability claims with no product grounding
- Language that implies support, automation, or coverage beyond what is known
- “DALP can” statements that sound speculative or over-broad
- Features described as if shipped when verification is absent

**Why it’s bad:**
- It damages credibility with prospects and internal teams
- It creates false expectations engineering must later unwind
- Overselling is worse than a narrower, truthful claim

**How to fix it:**
- Require verification for capability claims
- Narrow statements to what is actually supported
- Mark unverified or planned items explicitly as roadmap, not current capability
- Prefer precise scope over broad promise

**Severity:** Hard Fail

---

## 20. The ATK Time Warp
**One-line description:** The deck uses legacy ATK terminology instead of DALP, or mixes both carelessly.

**What it looks like:**
- “ATK” appears in current product messaging without explicit legacy context
- Slides alternate between DALP and ATK as if they are the same current label
- Old terminology persists in section titles, diagrams, or screenshots
- Audience-facing copy reflects outdated naming

**Why it’s bad:**
- It confuses the audience about the product scope and brand evolution
- It signals stale thinking or stale source material
- It undermines message consistency across the company

**How to fix it:**
- Use DALP as the default product name
- Mention ATK only when explicitly explaining legacy context
- Update inherited copy, visuals, and diagrams to current terminology

**Severity:** Major

---

## 21. The Blockchain Fog Machine
**One-line description:** The deck leans on generic blockchain hype instead of SettleMint-specific value and proof.

**What it looks like:**
- Empty claims about transformation, tokenization, or decentralization
- Generic Web3 language that could belong to any vendor
- No reference to DALP workflows, controls, compliance, or operating model
- Messaging centered on category buzz, not product reality

**Why it’s bad:**
- It makes SettleMint sound undifferentiated
- Sophisticated buyers tune out generic blockchain rhetoric immediately
- The deck misses the chance to explain why DALP matters in practice

**How to fix it:**
- Replace category hype with SettleMint-specific capabilities and outcomes
- Anchor claims in concrete workflows, controls, architecture, or compliance handling
- Make the deck about operational value, not blockchain theater

**Severity:** Major

---

## 22. The Chain Fantasy
**One-line description:** The deck claims chain support broader than verified EVM reality.

**What it looks like:**
- “Multi-chain” used loosely without scope
- Non-EVM support implied or stated without verification
- Architecture visuals suggesting universal chain portability
- Copy that treats all chains as equally supported

**Why it’s bad:**
- Buyers will assume broader interoperability than exists
- Technical credibility collapses if even one architect notices the overreach
- This creates avoidable correction loops later in the sales process

**How to fix it:**
- State support with explicit scope
- If the deck references chain coverage, make EVM boundaries clear unless broader support is verified
- Remove chain-general claims that cannot be defended

**Severity:** Hard Fail

---

## 23. The Roadmap Masquerade
**One-line description:** Future or roadmap features are presented as if they already exist today.

**What it looks like:**
- Planned capabilities written in present tense
- Architecture diagrams showing upcoming modules without labels
- “Supports” language for features still in development
- No distinction between shipped, piloted, and roadmap items

**Why it’s bad:**
- It is a direct credibility and trust problem
- It sets the wrong expectations for buyers and internal teams
- It blurs the line between ambition and product truth

**How to fix it:**
- Label future capabilities clearly as roadmap, planned, or upcoming
- Separate current-state and future-state slides when necessary
- Review verb tense carefully: present for shipped, future for planned

**Severity:** Hard Fail

---

## 24. The Easy Button Lie
**One-line description:** The deck frames digital asset operations as simple magic instead of emphasizing the complexity DALP helps manage correctly.

**What it looks like:**
- Messaging that implies tokenization is trivial with the right vendor
- No acknowledgment of lifecycle, compliance, governance, or operating complexity
- Oversimplified story focused only on speed or launch ease
- DALP positioned as a shortcut rather than a control system

**Why it’s bad:**
- It weakens SettleMint’s real strategic angle
- Sophisticated audiences know this domain is hard; pretending otherwise sounds naive
- It undersells why a platform like DALP is valuable in the first place

**How to fix it:**
- Make the narrative explicit: the problem is not just launching, but doing it right at scale
- Highlight lifecycle, compliance, servicing, and operational control
- Position DALP as infrastructure for disciplined execution, not magic

**Severity:** Major

---

## 25. The Compliance Fairy Tale
**One-line description:** The deck suggests DALP makes assets “fully compliant” without jurisdictional or operational scope.

**What it looks like:**
- Claims of automatic or guaranteed compliance
- Regulation presented as solved by software alone
- No distinction between configurable controls and legal outcome
- Slides implying DALP replaces regulatory work

**Why it’s bad:**
- It is legally and commercially reckless
- Compliance-savvy audiences will distrust the entire deck
- It overstates what software can legitimately claim

**How to fix it:**
- Use precise language: DALP enforces configured compliance rules within defined scope
- Specify jurisdiction or framework context when relevant
- Remove “fully compliant” or guarantee language unless the scope is extremely explicit and defensible

**Severity:** Hard Fail

---

## 26. The Partner Credit Grab
**One-line description:** The deck attributes work or capability to SettleMint that actually belongs to a partner, integrator, or customer.

**What it looks like:**
- Case-study outcomes presented as if DALP alone delivered them
- Partner-delivered services blurred into product claims
- Customer implementation decisions framed as built-in features
- Slides that erase the delivery context behind the result

**Why it’s bad:**
- It distorts product truth and damages trust
- Partners and customers notice this fast
- It turns real proof into suspect proof

**How to fix it:**
- Attribute roles clearly: what DALP did, what the partner did, what the customer operated
- Keep product capability separate from implementation service work
- Rewrite case-study claims with explicit responsibility boundaries

**Severity:** Major

---

## 27. The Terminology Drift
**One-line description:** DALP terminology is used loosely, inaccurately, or inconsistently across the deck.

**What it looks like:**
- SettleMint capitalization errors
- DAPI, T-REX, ERC-3643, compliance modules, or token lifecycle terms used incorrectly
- Different slides describing the same concept with different names
- Product nouns invented on the fly

**Why it’s bad:**
- Terminology inconsistency makes the team sound less credible
- It confuses both technical and business audiences
- Small naming errors compound into strategic fuzziness

**How to fix it:**
- Standardize terminology to current approved usage
- Run a terminology sweep before final review
- Prefer precise product language over improvised synonyms

**Severity:** Major

---

## 28. The Generic Tokenization Pitch
**One-line description:** The deck reduces DALP to “tokenization” and misses the broader lifecycle platform story.

**What it looks like:**
- Messaging focused only on issuance or minting
- No attention to servicing, transfer control, compliance operations, or lifecycle management
- DALP framed as a token creation tool instead of a digital asset lifecycle system
- Legacy product framing carried into new materials

**Why it’s bad:**
- It undersells the platform badly
- It collapses a broader operating model into a commodity narrative
- It makes SettleMint easier to misclassify against narrower competitors

**How to fix it:**
- Expand the story from issuance to lifecycle
- Include the operational realities DALP is built to handle
- Position DALP as infrastructure for managing digital assets across their lifecycle, not just creating them

**Severity:** Major

---

## 29. The Auto-Shrink Trap
**One-line description:** Text boxes rely on auto-shrink to fit content, masking overflow that breaks the moment someone edits.

**What it looks like:**
- Body text noticeably smaller than other slides using the same layout
- Font sizes below the template minimum (often below 12pt) on content slides
- Text that fills the entire placeholder with no breathing room
- Editing any line causes text to reflow or spill outside the box

**Why it's bad:**
- Auto-shrink is a silent failure: the slide looks fine until someone touches it
- It signals that the content was never edited down to fit the format
- The deck becomes fragile; any revision risks visible overflow or truncation
- Presenters cannot safely adjust talking points without breaking layout

**How to fix it:**
- Cut copy until it fits the placeholder at the standard template font size
- If content cannot be reduced, split across two slides
- Disable auto-shrink and manually verify fit at the intended size
- Treat font size below template minimum as a hard signal to reduce content

**Severity:** Major

---

## 30. The Consistency Mirage
**One-line description:** Individual slides look acceptable in isolation, but flipping through the deck reveals jarring inconsistencies.

**What it looks like:**
- Title positions shift by 10-20px between slides, creating a jittering effect on flip-through
- Body text margins or card gutters vary slide to slide without layout justification
- Icon styles change mid-deck (outlined vs. filled, rounded vs. sharp)
- Color usage for the same concept changes between sections (e.g., blue for DALP on slide 4, green on slide 12)
- Page numbers appear on some slides but not others, or use different fonts

**Why it's bad:**
- Cross-slide consistency is the highest-signal quality indicator: a deck where titles, body, and cards align across all slides feels professional even if individual slides are imperfect
- Inconsistency is invisible on any single slide but immediately obvious when scanning the deck in sorter view or presenting
- It makes the deck feel assembled from parts rather than designed as a whole

**How to fix it:**
- Review the deck in slide sorter view before scoring, looking specifically for alignment drift
- Compare title positions, text box widths, and margin offsets across slides using the same layout
- Standardize icon style, accent color usage, and page number treatment in one pass
- Flag any slide where an element is more than 5px off the position used by the same layout on other slides

**Severity:** Major

---

## 31. The Consulting Creep
**One-line description:** A slide implies SettleMint offers custom development, professional services, or bespoke implementation work instead of a platform product.

**What it looks like:**
- Language like "we can build," "our team will develop," or "custom integration engagement"
- Slides describing project timelines, resource allocation, or staffing models
- Service-oriented framing: discovery workshops, implementation sprints, managed operations
- Deliverable lists that sound like a consulting SOW rather than platform onboarding
- Architecture slides showing SettleMint teams embedded in customer org charts

**Why it's bad:**
- SettleMint sells a platform, not consulting. This is a core positioning rule, not a preference.
- Consulting framing attracts the wrong buyer expectations and invites scope negotiation
- It undermines the scalability story: platforms scale, consulting teams do not
- It confuses internal teams about what they are actually selling

**How to fix it:**
- Replace service language with platform capability language: "DALP provides" not "we will build"
- Frame onboarding as platform adoption, not project delivery
- Remove any staffing, timeline, or engagement model slides unless explicitly approved for a specific deal
- If partner delivery is involved, attribute it clearly rather than absorbing it into SettleMint's story

**Severity:** Major

---

## 32. The Presenter Crutch
**One-line description:** A slide cannot communicate its point without extensive verbal explanation from the presenter.

**What it looks like:**
- A diagram with no labels, legend, or annotation that only makes sense when narrated
- A slide title that names a topic ("Architecture") but states no claim or takeaway
- Content that relies on the presenter saying "what I mean by this is..." to land
- Visual elements whose relationship or sequence is ambiguous without live commentary
- Data or comparisons presented without framing, context, or interpretation on-slide

**Why it's bad:**
- Decks get forwarded, screenshotted, and reviewed without the presenter present
- A slide that fails silently is worse than an obviously broken one: it looks fine but communicates nothing
- It forces the presenter to compensate live, increasing delivery risk
- It means the slide is doing the presenter's job, not its own

**How to fix it:**
- Write the title as a claim or takeaway, not a topic label
- Add annotations, callouts, or a one-line interpretation to diagrams and data
- Test the slide by asking: "If someone sees this without me talking, do they get the point?"
- If the answer is no, add the missing context on-slide or simplify until the visual is self-explanatory

**Severity:** Major

---

## 33. The Logo Wall Alibi
**One-line description:** A slide uses customer logos, partner badges, or brand marks as a substitute for actual evidence.

**What it looks like:**
- A proof slide that is mostly logos with no caption explaining what each logo proves
- Customer or partner marks shown without deployment scope, use case, or outcome context
- "Trusted by" style visuals dropped into a deck as if they validate product claims automatically
- Mixed logos from prospects, partners, and customers presented with no distinction

**Why it's bad:**
- Logos create the appearance of proof without providing usable proof
- Buyers cannot tell whether the marks indicate production use, a partnership, a pilot, or just a conversation
- It invites credibility questions the moment an audience asks, "What exactly did they do with you?"

**How to fix it:**
- Add one line of context per logo cluster: customer, partner, pilot, or ecosystem relationship
- Pair logos with a concrete proof point, scoped use case, or measurable outcome when allowed
- Remove any mark that cannot be defended with explicit relationship context

**Severity:** Major

---

## Reviewer Reminder
If you spot one of these patterns, say so plainly.
Naming the failure mode helps the author understand the problem faster and fix it more cleanly.
Prefer feedback like “This is a Wall of Text plus Data Graveyard problem” over vague criticism like “could be clearer.”
Precision is the whole game.
