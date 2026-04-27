# Learning Protocol

The bid manager learns from every interaction. This isn't optional, learning is a core function, not an afterthought. Every piece of feedback makes future bids better.

---

## Intake Sources

### Direct Feedback
User says "this section was too technical" or "client loved the compliance matrix", that's immediate, actionable signal.

**Recognize these patterns:**
- "This section needs to be less technical" → log as writing feedback, update `setup/writing-style.md`
- "Client said they loved the compliance matrix" → log as positive signal, reinforce that approach in lessons
- "The implementation timeline was unrealistic" → log as accuracy correction, update relevant template
- "Make it shorter / more concise / punchier" → log as tone feedback, update style guidance

### Meeting Notes
When meeting notes are dropped in `feedback/`, extract bid-relevant insights:
- What the client asked about → reveals evaluation priorities
- What concerned them → reveals objections to address proactively
- What they praised → reveals what to double down on
- What competitors they mentioned → cross-reference with competitor dossiers

### Client Responses
RFP outcome notifications (won/lost), evaluator comments, follow-up questions from clients, all signal:
- Won → what worked? Tag the bid, analyze differentiators
- Lost → why? Pricing? Technical gaps? Compliance miss? Log and adjust
- Follow-up questions → what wasn't clear enough in the response?
- Evaluator scores/comments → direct insight into how bids are graded

### Reviewer Corrections
When a human edits a bid response, the diff is learning material:
- What did they change? (word choice, structure, claims, emphasis)
- Why did they change it? (if stated, ask if not obvious)
- Does the change reveal a pattern? (e.g., always softening certainty claims)

---

## Processing Rules

Every piece of feedback follows this processing pipeline:

### 1. Log It
Every feedback input gets logged in `feedback/feedback-log.md`:
- **Date**: When the feedback was received
- **Source**: Who provided it (person, client, evaluator)
- **Type**: Category, `writing`, `technical`, `priority`, `competitive`, `outcome`, `meeting`, `correction`
- **Summary**: One-line description of the feedback
- **Applied To**: Which bid/section/file was affected (or "general" for broad lessons)

### 2. Extract Lessons
Determine if the feedback contains an actionable, repeatable lesson. If yes, append to `feedback/lessons.md` under the appropriate category:
- Writing style issue → **Writing & Tone**
- Capability claim correction → **Technical Accuracy**
- Client priority insight → **Client Priorities**
- Competitive win/loss insight → **Competitive Positioning**
- Process or format mistake → **Common Mistakes**

### 3. Propagate Updates
Feedback doesn't just live in the log, it changes how future bids are written:

| If feedback... | Then update... |
|----------------|----------------|
| Corrects a DALP capability claim | Relevant `content/` section AND `feedback/lessons.md` |
| Reveals a client priority pattern | `setup/win-themes.md` |
| Reveals a writing style preference | `setup/writing-style.md` |
| Mentions a competitor | Check dossier in `/Users/quark/Public/quark/workspace/product/dalp/competitors/` and cross-reference |
| Reports a won/lost outcome | Tag the bid in feedback log, analyze what differentiated the winning response |
| Corrects an implementation timeline | Relevant template in `templates/` |
| Identifies a compliance gap | `content/` section + `templates/compliance-matrix.md` |

### 4. Validate
After updating, verify:
- The correction doesn't contradict other established content
- The lesson is specific enough to be actionable (not vague platitudes)
- Updated files remain internally consistent

---

## Continuous Improvement Cycle

### Before Every Bid
- Read `feedback/lessons.md`: internalize all accumulated learning before writing anything new
- Check if the client or sector has appeared in previous feedback
- Review win themes, are they still accurate?

### Every 5 Bids (or Monthly)
- Review the full `feedback/feedback-log.md` for patterns
- Consolidate recurring themes into lessons
- Check: are there lessons that should update `setup/win-themes.md`?
- Check: has client priority shifted based on recent feedback?

### Quarterly
- Full review of `feedback/lessons.md`: are all lessons still valid?
- Cross-reference with latest DALP capabilities (product evolves)
- Archive outdated lessons with a note on why they're no longer applicable
- Update competitive positioning based on market changes

---

## Feedback Command Examples

The agent should recognize these natural language patterns and process them accordingly:

| User Says | Action |
|-----------|--------|
| "This section needs to be less technical" | Log as `writing` feedback → update `setup/writing-style.md` |
| "Client said they loved the compliance matrix" | Log as `priority` feedback → reinforce approach in lessons |
| "We lost this bid because of pricing" | Log as `outcome` feedback → update commercial approach |
| "Meeting notes from [client]" + attached notes | Log as `meeting` → extract and internalize all bid-relevant insights |
| "The implementation timeline was unrealistic" | Log as `correction` feedback → update relevant template |
| "Reviewer changed X to Y in the security section" | Log as `correction` → update `content/` section if pattern emerges |
| "Client asked a lot about disaster recovery" | Log as `priority` → ensure DR is prominent in future technical proposals |
| "Competitor Z was also bidding and they won" | Log as `competitive` + `outcome` → analyze and update positioning |
| "This answer was perfect, keep doing this" | Log as `writing` (positive) → document what made it work |

---

## What Good Looks Like

After 10+ bids with active feedback:
- `lessons.md` has 20+ specific, actionable lessons across all categories
- Win themes have been validated or adjusted based on real outcomes
- Writing style has been refined based on evaluator preferences
- Technical accuracy corrections have been propagated to all affected content
- The bid manager produces noticeably better first drafts because it's learned what works
