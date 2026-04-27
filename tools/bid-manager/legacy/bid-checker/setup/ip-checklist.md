# IP & Confidentiality Checklist

This is the definitive list of internal terms, patterns, and references that **must never appear** in any client-facing proposal, RFI response, or RFP response. Any match is an automatic flag in the IP Exposure Audit.

---

## Category 1: Internal Framework & Library Names

These are specific open-source or internal tools that reveal implementation details. Each has an approved client-facing replacement.

| Internal Term | Category | Client-Facing Replacement |
|--------------|----------|--------------------------|
| **TheGraph** | Blockchain indexing | "blockchain indexer" or "on-chain data indexing service" |
| **Restate** | Workflow orchestration | "durable workflow engine" or "workflow orchestration layer" |
| **oRPC** | API framework | "typed API framework" or "remote procedure call layer" |
| **Drizzle** | Database ORM | "database abstraction layer" or "data access layer" |
| **Better Auth** | Authentication | "authentication framework" or "identity management layer" |
| **Zod** | Validation | "schema validation" or "input validation framework" |
| **Foundry** | Smart contract tooling | "smart contract development toolkit" or "blockchain development framework" |
| **Hardhat** | Smart contract tooling | "smart contract development environment" or "blockchain development framework" |
| **Playwright** | Testing | "end-to-end testing framework" or "automated UI testing" |
| **TanStack** | UI framework | "reactive data management" or "client-side data layer" |
| **dnum** | Number library | "high-precision arithmetic library" or "decimal number handling" |
| **Grafana** | Monitoring | "monitoring dashboards" or "operational monitoring platform" |
| **Prometheus** | Metrics | "metrics collection" or "time-series monitoring" |
| **Loki** | Log aggregation | "centralized log aggregation" or "log management system" |
| **OpenTelemetry** | Observability | "distributed tracing" or "observability framework" |
| **Caddy** | Reverse proxy | "reverse proxy" or "TLS-terminating proxy" |
| **Tailscale** | Networking | "zero-trust network mesh" or "private network overlay" |
| **GGUF** | Model format | "optimised model format" or "local inference model" |
| **Viem** | Blockchain client | "blockchain client library" or "EVM interaction layer" |
| **Wagmi** | Wallet connection | "wallet integration layer" or "Web3 connection framework" |
| **Turborepo** | Build system | "monorepo build system" or omit entirely |
| **pnpm** | Package manager | omit entirely — never reference package managers |
| **Biome** | Linting | omit entirely — never reference linting tools |
| **Next.js** | Web framework | "web application framework" or "server-rendered application layer" |
| **Hono** | API framework | "lightweight API server" or "API gateway layer" |
| **PostgreSQL** (when referencing internal setup) | Database | "enterprise relational database" — only flag if combined with internal config details |
| **Redis** (when referencing internal setup) | Cache | "in-memory cache layer" — only flag if combined with internal config details |

---

## Category 2: Internal Naming Patterns

These patterns reveal internal project structure and must be caught:

### Package Paths
- `packages/*` — any reference to internal monorepo package paths
- `kit/*` — internal kit package references
- `@dalp/*` — scoped npm package names
- `@settlemint/*` — internal scoped packages (unless referencing the public SDK)

### Route Paths
- `/api/trpc/*` — internal API route structure
- `/api/v1/*` — internal API versioning (unless describing a public API specification)
- Route handler file paths

### Version Control References
- PR numbers: `#1234`, `PR-1234`, `pull/1234`
- Commit hashes: any 7+ character hex string in code context (e.g., `a1b2c3d`)
- Branch names: `feat/`, `fix/`, `develop`, `staging`
- Jira/Linear ticket IDs: `DALP-123`, `SM-456`

### Internal Project Names
- `dalp-kit` — the internal monorepo name
- `dapp` — the internal application package name
- `hasura` — internal GraphQL engine reference
- Any codename not publicly announced

---

## Category 3: Code Patterns

These patterns indicate raw code leaking into proposals:

### Solidity Interface Names
- `IDALPxxx` — any interface prefixed with IDALP (e.g., `IDALPToken`, `IDALPCustody`)
- `ERC20`, `ERC721`, `ERC1155` are fine to reference — they're public standards
- Internal contract names that aren't part of public standards

### TypeScript / JavaScript Types
- Type definitions: `type XxxConfig = {...}`
- Interface definitions: `interface IXxx {...}`
- Import statements: `import { xxx } from '...'`
- Generic type parameters in prose: `Promise<T>`, `Result<T, E>`

### Function Signatures
- Internal function names with camelCase in technical prose
- Method signatures with parameter types
- API endpoint function names

### Configuration Fragments
- Environment variable names: `DALP_*`, `DATABASE_URL`, `REDIS_URL`, etc.
- Docker compose service names
- Kubernetes resource names (unless describing a generic architecture)
- `.env` file references

---

## Category 4: File Paths & System References

Any of these patterns appearing in a proposal is a critical flag:

| Pattern | Example | Why It's a Problem |
|---------|---------|-------------------|
| `~/dalp` | `~/dalp/packages/core` | Exposes local development path |
| `packages/` | `packages/blockchain-indexer/` | Reveals monorepo structure |
| `kit/` | `kit/dapp/src/` | Reveals internal project layout |
| `src/` | `src/components/` | Reveals source code structure |
| `node_modules/` | Any reference | Obviously internal |
| `/var/`, `/etc/`, `/opt/` | Server paths | Reveals infrastructure detail |
| `.github/` | CI/CD references | Reveals dev workflow |
| `docker-compose` | Service definitions | Fine generically, flag if specific to our setup |
| `Dockerfile` | Build references | Fine generically, flag if specific |

---

## Category 5: Metadata & Artefact Leaks

Less obvious but still problematic:

- **Author metadata** in exported documents (check PDF properties, DOCX author fields)
- **Track changes** or comments left in the document
- **Watermarks** from internal review tools
- **Screenshot metadata** — screenshots of internal tools with URLs or usernames visible
- **Diagram tool artefacts** — exported diagrams showing internal file names in the title or tool UI
- **Git blame** or version history in any included code samples

---

## How to Use This Checklist

### During Review
1. Run a text search for every term in Category 1 (exact match, case-insensitive)
2. Run pattern searches for Categories 2–4 (regex where appropriate)
3. Visually inspect any screenshots, diagrams, or embedded images for Category 5 leaks
4. For each match, record: the term, its location, and the recommended replacement
5. Report all findings in the IP Exposure Audit section of the review template

### During Writing
1. Keep this checklist open while drafting
2. When describing technical architecture, use the replacement terms from Column 3
3. Have a second person review specifically for IP exposure before finalising
4. Run automated search if available

### Severity Levels
- **Critical**: File paths, code snippets, commit hashes, internal project names — immediate rewrite required
- **Major**: Framework/library names from Category 1 — rewrite before submission
- **Minor**: Borderline terms that might be fine in context (e.g., "PostgreSQL" in a generic architecture discussion) — reviewer discretion

---

## Quick-Reference: Most Common Offenders

The terms most frequently caught in reviews, in order of frequency:

1. **Foundry / Hardhat** — appears when describing smart contract testing
2. **TheGraph** — appears when describing indexing capability
3. **Restate** — appears when describing workflow orchestration
4. **oRPC** — appears when describing API architecture
5. **Drizzle** — appears when describing database access
6. **OpenTelemetry** — use "distributed tracing" instead
7. **Package paths** — `packages/xxx` patterns in architecture descriptions
8. **Solidity interface names** — `IDALPToken` etc. in capability descriptions
9. **Grafana/Prometheus/Loki** — appears when describing monitoring stack
10. **Better Auth** — appears when describing authentication
