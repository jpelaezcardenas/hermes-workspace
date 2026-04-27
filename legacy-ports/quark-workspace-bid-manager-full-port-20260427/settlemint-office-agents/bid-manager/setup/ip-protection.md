# IP Protection Rules for Bid Content

## Purpose

All bid responses, RFP answers, and proposal documents must contain only publicly-safe information. This document defines explicit allow/deny boundaries. When in doubt, omit.

## NEVER Include (Deny List)

### Source Code and Implementation Details
- Source code in any language (Solidity, TypeScript, SQL, etc.)
- File paths, directory structures, or module names from the codebase
- Database table names, column names, or schema definitions
- API route paths, endpoint definitions, or internal service names
- Package names, library names, or dependency versions
- Internal component names (e.g., specific class names, function names)
- Configuration file contents or environment variables

### Third-Party Product Names (Use General Terms Instead)
- Do NOT name specific open-source projects, frameworks, or libraries used in the implementation
- Use category descriptions: "blockchain indexer" not the specific indexing tool, "relational database" not the specific database engine, "caching layer" not the specific caching product, "container orchestration" not the specific orchestrator, "durable workflow engine" not the specific workflow product, "monitoring stack" not the specific monitoring tools
- **Exception**: Industry-standard technical terms and open protocols are fine to name: ERC-3643, ERC-20, OnchainID, OAuth 2.0, OIDC, SAML, ISO 20022, FIDO2/WebAuthn, FIPS 140-2, TLS. These are standards, not implementation choices.

### Infrastructure and Operations
- CI/CD pipeline configurations or tooling details
- Git repository structure or version control specifics
- Container image names or registry details
- Specific resource definitions or deployment chart values
- Internal monitoring alert rules or threshold configurations
- Infrastructure provider account details or region specifics

### Business and Personnel
- Employee names, titles, or organizational structure (unless explicitly approved for the bid)
- Internal pricing models, cost structures, or margin details
- Internal processes, decision frameworks, or governance documents
- Client names or engagement details (unless explicitly approved as references)
- Financial information about SettleMint (revenue, funding, etc.)
- Credentials, API keys, secrets, or access tokens

### Smart Contract Internals
- Solidity source code or contract implementation details
- Internal function signatures or contract interface definitions
- Gas optimization techniques or implementation patterns
- Specific contract addresses from production deployments
- Deployment scripts or migration procedures

## SAFE to Include (Allow List)

### Product Capabilities
- Feature descriptions from the public product documentation
- Capability statements (what the platform does, not how it is coded)
- Supported asset classes and their lifecycle descriptions
- User portal descriptions (Issuer, Investor, Admin, Developer)
- Deployment model options (on-premises, cloud, dedicated SaaS)
- White-label and customization capabilities
- API-first design and integration capabilities (typed REST APIs, webhooks, SDKs)

### Standards and Protocols (These Are Public)
- ERC-3643, ERC-20, ERC-721, ERC-1155 (open token standards)
- SMART Protocol (SettleMint Adaptable Regulated Token), name and description only
- OnchainID (open protocol for decentralized identity)
- ISO 20022, OpenID Connect, OAuth 2.0, FIDO2/WebAuthn
- FIPS 140-2/140-3 (HSM standard reference)
- SAML, OIDC (identity federation standards)

### Architecture (High Level Only)
- Four-layer architecture description (Asset Console, Unified API, Execution Engine, SMART Protocol)
- Design principles (single source of truth, atomic operations, defense in depth)
- Technology category names: "blockchain indexer," "durable workflow engine," "relational database," "caching layer," "log aggregation," "distributed tracing," "metrics collection"
- EVM-compatible network support (Ethereum, Polygon, Hyperledger Besu, Quorum)

### Compliance and Regulatory
- Supported regulatory frameworks: Reg D, Reg S, MiCA, MiFID II, MAS, FCA, GCC
- Compliance enforcement model (transfer-path enforcement, ex-ante controls)
- Identity verification approach (portable credentials, privacy-preserving design)
- Audit trail capabilities (what is recorded, not how it is stored)
- Certifications the platform supports pursuing (SOC 2, ISO 27001)

### Market and Industry
- Public market data (tokenization market size, growth projections)
- Named public deployments by other companies (EIB, Siemens, JPMorgan, Franklin Templeton, these are public record)
- Regulatory framework descriptions (public legislation and guidelines)

### Metrics and Outcomes
- Performance targets: T+0 settlement, 99.9% uptime, zero compliance breaches
- Operational improvement claims: "roughly 90% reduction in operational overhead"
- Timeline estimates: "4 to 8 weeks for first asset type"
- Cost comparisons at category level (not specific pricing)

## Review Checklist

Before finalizing any bid document, verify:

- [ ] No source code or code-like syntax appears anywhere
- [ ] No internal file paths, module names, or package references
- [ ] No specific third-party product names for implementation components (use category descriptions)
- [ ] Industry-standard protocol and standard names are acceptable (ERC-3643, OAuth, etc.)
- [ ] No employee names (unless approved)
- [ ] No client references (unless approved)
- [ ] No pricing or cost structure details (unless specifically requested and approved)
- [ ] Architecture descriptions use layer names, not component implementation names
- [ ] No em dashes or en dashes in the text
- [ ] All capability claims are grounded in public documentation content
