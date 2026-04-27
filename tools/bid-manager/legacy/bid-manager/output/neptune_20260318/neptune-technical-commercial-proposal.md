# Technical and Commercial Proposal: Corporate Structure Tokenization Platform

| Field | Value |
|---|---|
| Proposal title | Technical and Commercial Proposal. Corporate Structure Tokenization Platform |
| Client | Neptune Maritime Leasing |
| Submitted by | SettleMint NV |
| Date | 18 March 2026 |
| Version | v1.0 |
| Classification | Confidential |
| Primary contacts | Harris Antoniou, Iraklis Tsirigotis |

---

## Table of Contents

- Executive Summary
- Neptune Context and Programme Objectives
- Proposed DALP Solution for the Neptune Structure
- Capability Boundaries and Delivery Model
- Governance, Compliance, and Identity Controls
- Operating Model Across Holding Company and SPCs
- Integration and Implementation Approach
- Commercial Structure
- Assumptions, Dependencies, and Open Points
- Conclusion

## Executive Summary

Neptune is not trying to tokenize a vessel. Neptune is trying to digitize a layered corporate and financing structure in a way that can support present shareholders, future capital formation, and operational control across a holding company and a large number of special purpose companies. That distinction matters because the technical answer is not a simple asset wrapper. It is a governed issuance and servicing platform that can represent equity and related instruments, enforce investor eligibility, separate duties across operators, and scale entity creation without rebuilding the control model each time.

SettleMint proposes DALP as the platform layer for that operating model. DALP gives Neptune a standards-based digital asset stack built on ERC-3643 and OnchainID, with configurable token features, configurable compliance modules, role-based access control, and API-first integration surfaces. In practical terms, this means Neptune can establish a controlled tokenization model at the holding-company level first, then extend the same control architecture to SPC-level structures as the programme matures. Where behaviour is native to DALP, this proposal says so explicitly. Where outcomes depend on configuration choices, legal structuring, or external integrations, this proposal says that just as explicitly.

The central recommendation is a phased rollout. Phase 1 should establish the Jersey holding-company tokenization perimeter and governance baseline. Phase 2 should extend the model to repeatable SPC issuance and administration workflows, especially if Neptune wants to support a larger fleet of structurally similar entities. Phase 3 should add the investor onboarding, servicing, and reporting capabilities needed for broader capital raising. This sequence aligns with the buyer discussion captured in the Neptune deal notes and reduces risk by proving governance and compliance mechanics before scaling issuance across 60 or more structures.

Commercially, the source material indicates that a working price shape has already been discussed. Because the available deal notes do not provide a final approved price sheet, all commercials in this proposal are expressed either as source-derived working placeholders or as explicit **[TO CONFIRM]** items. Nothing in this proposal should be read as a binding commercial commitment until Neptune and SettleMint confirm scope, environment model, integration ownership, and implementation boundaries.

![The DALP Administration Dashboard gives Neptune an operating command center for assets, identities, pending actions, and live platform activity in one view.](../shared/brand/dalp-screenshots/02 - Dashboard/Dashboard 2.png)

## Neptune Context and Programme Objectives

The opportunity described in the Neptune deal context is a corporate-structure tokenization programme with three clear dimensions. First, Neptune is considering tokenization at the holding-company level. Second, Neptune operates a structure with more than sixty SPCs underneath that holding framework, with each SPC tied to receivables and financing arrangements rather than direct vessel title. Third, Neptune sees a future capital-raising path in which the initial structure may need to support additional investor participation and broader distribution.

That matters for platform design because the unit of tokenization is not a single undifferentiated real-world asset. The unit of tokenization is a governed legal and economic claim sitting inside a multi-entity structure. The platform therefore needs to do more than issue tokens. It needs to support entitlement logic, identity-aware eligibility, approval controls, servicing events, and clear separation between platform-native capabilities and the legal or operational processes that still belong to Neptune and its advisors.

The deal notes also point to a strong requirement for repeatability. A one-off issuance could be built in many ways. Neptune's real advantage comes if the operating model for one entity can be reused for many entities with controlled differences in permissions, investor pools, and compliance rules. That is why this proposal emphasizes configuration-led deployment over bespoke engineering. DALP is strongest when an institution wants to establish reusable issuance patterns, reusable compliance controls, and consistent operational governance across multiple products or entities.

A further theme from the Neptune notes is the need to keep the narrative grounded in corporate structure tokenization rather than vessel tokenization. This proposal follows that instruction throughout. Where an SPC relates economically to vessel receivables, DALP would represent the chosen legal instrument and its associated rights, not a direct claim that DALP natively models maritime title registries or vessel ownership mechanics.

## Proposed DALP Solution for the Neptune Structure

The proposed solution is to use DALP as the governed lifecycle platform for Neptune's tokenized corporate structure. At the core of DALP is a standards-based asset model using ERC-3643 with OnchainID-backed identity and a modular compliance layer. That gives Neptune a credible base for regulated or controlled distribution because transfer permissions can be evaluated against identity claims and compliance modules before execution, rather than relying on off-platform policy alone.

For Neptune's Phase 1 holding-company use case, DALP can support tokenized equity-style structures through its configurable token model and its equity-oriented presets. Native DALP capabilities relevant here include identity-bound transfers through the Identity Registry, configurable role assignments per asset, historical balance tracking, and optional voting-power features. Those are native platform features. The exact shareholder-rights model, voting thresholds, transfer restrictions, and document set would still need to be configured to match Neptune's legal structure and transaction design.

For a later SPC expansion model, DALP's value is not that it knows shipping SPVs out of the box. Its value is that it provides a reusable configuration framework for repeated issuances. Asset templates, compliance templates, permissions, and servicing patterns can be defined once and reused with controlled variation. In Neptune's context, that supports the concept discussed in the deal notes of a factory-like approach to repeated SPC creation. The repeatability outcome is configuration-driven. It depends on Neptune standardizing enough of the SPC model for template reuse, and on the implementation team defining the right orchestration around DALP.

Where Neptune needs fixed-income or distribution-style mechanics, DALP also supports bond-style lifecycle features such as maturity redemption and fixed-yield schedules. Those are native DALP capabilities for appropriate instrument structures. Whether Neptune uses those features depends on the legal instrument selected for a given entity or raise. This proposal does not assume a debt structure unless Neptune confirms that instrument choice.

![The DALP Asset Designer lets Neptune define asset class, legal-jurisdiction context, compliance logic, and permissions through a guided configuration workflow rather than bespoke contract assembly.](../shared/brand/dalp-screenshots/03 - Asset Designer/Asset Designer.png)

## Capability Boundaries and Delivery Model

This proposal draws a strict line between three categories: native DALP capability, configuration-driven behaviour, and integration-dependent outcomes.

**Native DALP capability** includes the ERC-3643 token foundation, OnchainID-backed identity architecture, configurable compliance modules, role-based asset administration, historical balances, voting-power support for suitable equity-style structures, maturity-redemption support for suitable bond-style structures, and API-led operational access. These capabilities are grounded in the workspace documentation and DALP capability mapping.

**Configuration-driven behaviour** includes most of the outcomes Neptune is likely to care about operationally: who may hold which instrument, which countries or investor groups are eligible, which approvals are required before transfer, how administrator roles are split, whether a given structure includes voting, and whether an issuance pattern can be replicated across multiple entities. DALP provides the machinery; Neptune and the implementation team define the operating rules.

**Integration-dependent outcomes** include third-party KYC or KYB data ingestion, investor onboarding workflows that rely on external providers, payment and cash-movement connectivity, custody-provider-specific approval experiences, reporting exports into Neptune or partner systems, and any integration with Mindwave-delivered components. DALP supports these patterns through APIs and integration points, but the end-to-end operating result depends on the selected providers and the implementation design.

This distinction is especially important for Neptune because the programme appears to involve Mindwave as an implementation partner and may require coordination across legal, finance, and technical stakeholders. DALP should be positioned as the core platform and policy layer, not as a claim that every adjacent process is already solved inside the product.

## Governance, Compliance, and Identity Controls

Neptune's structure and investor base make governance and eligibility control central to the design. DALP addresses this through a combination of identity binding, compliance modules, and scoped administrative roles.

On identity, DALP uses OnchainID contracts and an Identity Registry to bind wallets to verifiable claims issued by trusted issuers. This is a native platform capability. DALP does not perform KYC or AML screening by itself. Instead, it stores and evaluates claims that come from trusted issuers or integrated providers. For Neptune, that means investor verification remains an operational process, but transfer gating and eligibility enforcement can be executed in a deterministic platform layer once the claims exist.

On compliance, DALP includes configurable module types such as identity allowlists, country allowlists, transfer approvals, and investor-count restrictions. These modules are directly relevant to a private or semi-private capital structure where investor classes, jurisdictional restrictions, and transfer approvals need to be enforced consistently. The specific controls Neptune needs will depend on the legal structuring advice and target investor profile. The enforcement mechanism is native. The actual policy set is configuration-driven.

On governance and permissions, DALP supports per-asset role scoping, including governance, custodian, supply-management, emergency, and administrator roles. This gives Neptune a clear way to separate legal control, issuance control, compliance administration, and operational servicing. That matters in a multi-entity structure because the people allowed to approve a holding-company issuance may not be the same people allowed to service an SPC-level instrument.

![DALP's compliance expression builder allows Neptune to turn investor-eligibility policy into enforceable transfer logic rather than relying on manual pre-trade checks alone.](../shared/brand/dalp-screenshots/03 - Asset Designer/Asset Designer Compliance Expression.png)

![DALP establishes asset-level role segregation before deployment, letting Neptune assign governance, custodian, emergency, and supply-management authority with precision.](../shared/brand/dalp-screenshots/03 - Asset Designer/Asset Designer - Step 7 - Asset Permissions Config.png)

## Operating Model Across Holding Company and SPCs

The Neptune notes suggest a programme that begins at the holding-company level and then expands across a large SPC estate. The right operating model is therefore hierarchical, even if the on-chain assets themselves are issued separately.

At the holding-company level, DALP can serve as the issuance and governance layer for the first tokenized structure. This is where Neptune should establish the baseline for investor identity, role segregation, transfer policy, and reporting outputs. The objective in Phase 1 is not only to issue an instrument. It is to prove that the governance model is administratively workable and that Neptune can support controlled ownership changes without creating operational ambiguity.

At the SPC level, the operating question changes from first issuance to managed scale. DALP can support that transition if Neptune defines a standard pattern for recurring entity structures, recurring permissions, recurring compliance rules, and recurring servicing events. DALP does not natively create a legal-SPC framework on its own. What it can do is make a repeatable digital-asset and policy framework operational once that legal-SPC pattern exists.

For a future Phase 3 capital-raising perimeter, Neptune will likely need broader investor onboarding, stronger reporting flows, and a clearer integration path into distribution and servicing operations. DALP can support the asset, compliance, and workflow layers of that model. The final investor experience and onboarding flow will remain partly integration-dependent, especially if Neptune selects external identity, payment, or custody providers.

The practical programme logic is therefore straightforward: establish the control model once, validate it on the holding company, templatize it for SPC rollout, then expand onboarding and servicing for broader capital formation.

## Integration and Implementation Approach

The deal notes indicate a short proof-of-concept horizon and reference Mindwave as an implementation partner. That points to a delivery model where DALP should be introduced as the product core, while implementation work is constrained to the integration surfaces Neptune actually needs for the first programme phase.

A sensible implementation sequence is as follows. First, confirm the legal instrument and governance perimeter for the holding-company use case. Second, configure DALP for the chosen instrument class, identity topics, compliance controls, and role model. Third, establish the minimum integration set for investor verification, administration, and reporting. Fourth, prove the operational journey with a controlled investor cohort. Fifth, decide whether Neptune wants to extend the same model to SPC-level entity patterns.

From a platform perspective, DALP supports API-led integration and can sit behind custom user interfaces or adjacent operational tooling if Neptune and Mindwave prefer that separation. That integration flexibility is native. The final shape of the Neptune operating environment remains project-specific.

Where custody or transaction approvals are involved, DALP can integrate with provider models such as DFNS and Fireblocks through its signer abstraction. That does not mean all approval mechanics are identical. Some provider behaviours remain provider-specific. For example, Fireblocks approval resolution remains dependent on Fireblocks-controlled channels. For Neptune, that means the custody operating model should be selected as part of solution design rather than treated as a generic checkbox.

## Commercial Structure

The Neptune source material indicates that a commercial shape has already been discussed: **8K per month for development**, **50K to 80K fixed**, and **10K per month for production**. Because the deal notes do not provide a ratified commercial sheet, statement of work, or signed pricing approval, these values are included below only as **working commercials from source discussions** and remain **[TO CONFIRM]**.

### Commercial Summary

| Commercial Item | Source Status | Amount |
|---|---|---|
| Development-period platform / project charge | Mentioned in Neptune deal notes | **[TO CONFIRM] 8,000 per month** |
| Fixed implementation fee | Mentioned in Neptune deal notes | **[TO CONFIRM] 50,000 to 80,000 one-time** |
| Production-period platform charge | Mentioned in Neptune deal notes | **[TO CONFIRM] 10,000 per month** |
| Mindwave implementation services | Not formalized in provided sources | **[TO CONFIRM]** |
| Third-party KYC / KYB provider costs | Not present in provided sources | **[TO CONFIRM]** |
| Custody-provider costs | Not present in provided sources | **[TO CONFIRM]** |
| Infrastructure / hosting model | Not present in provided sources | **[TO CONFIRM]** |

On the basis of the available material, the most defensible commercial position is a two-part structure: a time-bounded implementation phase paired with a recurring production platform fee once Neptune moves into live operation. That aligns with how the Neptune team appears to be discussing the opportunity today, and it fits the phased rollout logic of holding-company first, scale later.

What is not yet clear from the source material is whether the development-period monthly charge is intended to cover DALP licensing, implementation support, or a blended project package; whether the fixed fee already includes Mindwave-delivered work; how many environments Neptune expects; and whether production pricing assumes a single entity, a holding-company deployment plus selected SPCs, or broader programme coverage. Those points all need confirmation before a final commercial paper can be issued.

## Assumptions, Dependencies, and Open Points

This proposal assumes that Neptune wants to begin with holding-company tokenization before extending the model to SPC-level structures. It also assumes that the economic and legal interest being digitized will be defined through the transaction workstream rather than inferred by the platform team.

The proposal further assumes that Neptune will decide whether investor verification is handled through an existing KYC or KYB process, a new provider integration, or a partner-led operating model. DALP can enforce claim-based eligibility once claims exist, but Neptune still needs to decide who creates those claims and who is accountable for that process.

A further dependency is the standardization level of the SPC estate. If Neptune's SPCs are materially heterogeneous in rights, approvals, and servicing logic, a templated rollout will still be possible but will deliver less efficiency than a genuinely standardized model. If the structures are substantially similar, DALP's configuration-led approach becomes much more powerful.

Finally, the proposal assumes that Neptune wants SettleMint positioned as the product core rather than as a general consulting provider. The delivery model described here is platform-led and implementation-supported. It is not framed as an open-ended custom-build engagement.

## Conclusion

Neptune's opportunity sits in the category where tokenization becomes valuable only when governance, eligibility, and repeatability are solved properly. The sources provided for this proposal point to exactly that challenge: a holding-company structure today, a large SPC estate tomorrow, and a possible broader capital-raising agenda after that. DALP is well suited to that problem because it combines standards-based digital asset mechanics with identity-aware compliance, role-based operational control, and reusable configuration patterns.

The recommended next step is not to over-expand scope. It is to confirm the Phase 1 holding-company instrument, lock the governance and investor-policy model, validate the working commercial shape, and then implement a controlled first deployment that can serve as the template for later SPC scaling. That is the fastest route to a credible programme and the lowest-risk way to prove that Neptune can operationalize tokenized corporate structures without turning the initiative into a bespoke software project.
