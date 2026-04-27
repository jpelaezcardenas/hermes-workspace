# Tone Examples: Good vs Bad

## Purpose

These examples illustrate the difference between effective bid writing and common mistakes. Use them as calibration for all bid responses.

---

## Example 1: Describing Platform Capability

### ❌ Bad
> SettleMint's world-class, cutting-edge platform seamlessly empowers organizations to unlock the full potential of digital asset tokenization through our innovative and holistic approach to blockchain technology.

**What's wrong:** Every banned marketing phrase in one sentence. Says nothing specific. Evaluators will skip this.

### ✅ Good
> DALP supports the issuance and lifecycle management of digital assets including bonds, equities, deposits, and fund units. Asset parameters, maturity dates, coupon schedules, transfer restrictions, are configured through the platform UI, not coded. Each asset type deploys from a pre-built smart contract set based on ERC-3643/T-REX.

**What's right:** Specific asset types named. Configuration vs. coding distinction clear. Standard cited. Evaluator can check this against their requirements.

---

## Example 2: Responding to a Security Requirement

### ❌ Bad
> Security is our top priority. We take a comprehensive, multi-layered approach to ensure the highest levels of security across our platform. Our team of dedicated security professionals works tirelessly to protect our clients' data.

**What's wrong:** Vague platitudes. No specifics. Every vendor says this. Zero differentiation.

### ✅ Good
> DALP implements role-based access control (RBAC) with environment-level isolation in multi-tenant deployments. Sensitive operations (token issuance, compliance rule changes, role assignments) require maker-checker approval workflows. All platform actions and on-chain transactions are recorded in an immutable audit log accessible through the admin interface and API.

**What's right:** Three specific controls named. How they work is described. Evaluator can map these to their security requirements.

---

## Example 3: Addressing a Gap

### ❌ Bad
> While our platform doesn't natively support this specific requirement today, we are committed to continuous innovation and are always looking for ways to enhance our offering. We would be happy to discuss how our roadmap aligns with your future needs.

**What's wrong:** Evasive. Doesn't acknowledge the gap directly. "Committed to innovation" is meaningless.

### ✅ Good
> DALP does not currently support [specific capability]. This feature is on the product roadmap with an expected availability in Q4 2026. In the interim, [alternative approach] can address the core requirement, though with [specific limitation].

**What's right:** Direct acknowledgment. Timeline if available. Practical alternative offered. Limitation stated honestly.

---

## Example 4: Company Description

### ❌ Bad
> SettleMint is a leading blockchain technology company that is revolutionizing the financial industry with its innovative platform. With years of experience and a world-class team, we are uniquely positioned to help organizations navigate their digital transformation journey.

**What's wrong:** "Leading", "revolutionizing", "innovative", "world-class", "uniquely positioned", all empty superlatives. "Digital transformation journey" is meaningless in a bid context.

### ✅ Good
> SettleMint provides the Digital Asset Lifecycle Platform (DALP), infrastructure that solves the complexity of doing digital assets right for regulated institutions operating at scale. The platform has been deployed at tier-1 financial institutions and sovereign entities, processing live transactions under institutional SLAs. SettleMint's team combines blockchain engineering, financial markets, and enterprise delivery experience.

**What's right:** States what the company does. Names the product. References real deployments. Describes team competence factually.

---

## Example 5: Implementation Timeline

### ❌ Bad
> Our agile methodology ensures rapid, seamless deployment tailored to your unique needs. We work collaboratively with stakeholders to deliver results quickly.

**What's wrong:** No timeline. "Agile", "seamless", "tailored", "unique", "collaboratively", all filler.

### ✅ Good
> A standard DALP deployment follows a 4-phase approach over 6–8 weeks:
> - **Week 1–2:** Environment provisioning, network configuration, identity provider integration
> - **Week 3–4:** Asset type configuration, compliance rule setup, workflow customization
> - **Week 5–6:** Integration with client systems (core banking, custody) via REST API
> - **Week 7–8:** User acceptance testing, training, go-live
>
> This timeline assumes a single asset type. Additional asset types add 1–2 weeks each.

**What's right:** Specific phases with durations. Concrete activities per phase. Assumptions stated. Evaluator can compare this to their timeline.

---

## Example 6: Compliance Claim

### ❌ Bad
> Our platform is fully compliant with all relevant regulations and industry standards, ensuring your operations meet the highest regulatory requirements.

**What's wrong:** "All relevant regulations" is meaningless, which ones? "Highest regulatory requirements" is not a thing. This would fail any evaluator who knows compliance.

### ✅ Good
> DALP implements the ERC-3643/T-REX standard for compliant security tokens. Transfer restriction rules are enforced at the smart contract level, not as application-layer checks. Configurable rules include: investor eligibility by jurisdiction, accreditation status, holding period restrictions, and maximum holder counts. Investor identity is verified through OnchainID, which stores verifiable claims issued by trusted attestation providers.

**What's right:** Names the standard. Explains where enforcement happens. Lists specific configurable rules. Describes the identity mechanism.

---

## Pattern Summary

| Pattern | Bad | Good |
|---------|-----|------|
| Capability | Vague superlatives | Specific features with standards cited |
| Security | "We take security seriously" | Named controls with how they work |
| Gaps | Evasive with promises | Direct + timeline + alternative |
| Company | Empty positioning | Factual track record |
| Timeline | "Rapid deployment" | Week-by-week phases with activities |
| Compliance | "Fully compliant" | Named standards + enforcement mechanism |

## The One Rule

**If an evaluator can't verify your claim against your product documentation, rewrite it until they can.**
