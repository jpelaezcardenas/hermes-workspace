from pathlib import Path
import re, json

src = Path('output/technical/Europe/financial-institutions/euronext-technical_full_draft.md')
out_dir = Path('output/sample_euronext-digital-securities-listing_20260406-0002/technical')
out_dir.mkdir(parents=True, exist_ok=True)
text = src.read_text()
text = re.sub(r'^(##+)\s+\d+(?:\.\d+)*\.\s+', lambda m: m.group(1)+' ', text, flags=re.M)
for a,b in {
    'production-grade': 'production-ready',
    'enterprise-grade': 'enterprise-ready',
    'institutional-grade': 'institutional',
    '@settlemint/dalp-sdk': 'TypeScript SDK',
    'CLI (301 commands, 26 groups)': 'Operator command interface',
    'Restate (Durable Execution)': 'Durable execution service',
    'PostgreSQL Indexer': 'Relational indexer',
}.items():
    text = text.replace(a,b)
text = text.replace('—', ',').replace('–', ',')
append = '''

---

## Visual Evidence and Operational Design Addendum

This addendum brings the proposal's architecture, control model, and operating flows into a single visual set so evaluators can verify how the platform behaves across listing, compliance, settlement, security, and day-two operations.

### Platform Overview

```mermaid
flowchart TB
    A[Issuers and Venue Operators] --> B[DALP Console]
    B --> C[Unified API Layer]
    C --> D[Execution and Policy Services]
    D --> E[SMART Protocol Contracts]
    C --> F[External Market Systems]
    D --> G[Monitoring and Audit Services]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    classDef s fill:#C8A8E8,stroke:#482068,color:#482068,rx:8,ry:8;
    class A,B,C,D,E,G p;
    class F s;
```

![DALP dashboard overview for exchange operations](../../../shared/brand/dalp-screenshots/02%20-%20Dashboard/Dashboard%201.png)
*Figure 1: The dashboard gives exchange and operations teams a live control point for platform activity, asset visibility, and operating status.*

### Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Design
    Design --> Approval
    Approval --> Deployment
    Deployment --> Listing
    Listing --> Trading
    Trading --> Servicing
    Servicing --> Redemption
    Redemption --> Archive
    Archive --> [*]
```

![Asset designer entry point for creating a new instrument](../../../shared/brand/dalp-screenshots/04%20-%20Asset%20Designer/Asset%20Designer.png)
*Figure 2: The Asset Designer starts the lifecycle with guided configuration rather than custom development, reducing launch risk for new listings.*

### Compliance

```mermaid
flowchart TD
    A[Investor request] --> B[Identity and policy lookup]
    B --> C{Eligible under venue rules}
    C -->|Yes| D[Approve transfer path]
    C -->|No| E[Block action and record reason]
    D --> F[Audit event stored]
    E --> F
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    classDef d fill:#F2B8A0,stroke:#C05030,color:#C05030,rx:8,ry:8;
    class A,B,D,E,F p;
    class C d;
```

![Compliance module selection during instrument setup](../../../shared/brand/dalp-screenshots/04%20-%20Asset%20Designer/Asset%20Designer%20-%20Step%206%20-%20Compliance%20Modules.png)
*Figure 3: Compliance rules are configured during instrument creation so venue controls are applied before trading begins, not after exceptions appear.*

![Compliance policy template library](../../../shared/brand/dalp-screenshots/14%20-%20Compliance%20and%20Policy%20Templates/Compliance%20Policy%20Templates.png)
*Figure 4: Policy templates provide reusable compliance starting points for different venue and jurisdiction requirements, helping operations teams standardize controls across listings.*

### Security

```mermaid
flowchart TB
    A[User authentication] --> B[Role validation]
    B --> C[Policy enforcement]
    C --> D[Transaction signing approval]
    D --> E[Chain submission]
    E --> F[Immutable audit record]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E,F p;
```

![On-chain identity view for verified participants](../../../shared/brand/dalp-screenshots/15%20-%20Identity%20and%20Verification/Onchain%20Identity.png)
*Figure 5: Identity records link permissions and eligibility to verified participants, giving security and compliance teams a controlled basis for venue access.*

### Deployment

```mermaid
flowchart TB
    A[Private cloud environment] --> B[Application services]
    B --> C[Policy and workflow services]
    C --> D[EVM network connection]
    B --> E[Relational data store]
    B --> F[Observability stack]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E,F p;
```

![Blockchain monitoring dashboard](../../../shared/brand/dalp-screenshots/20%20-%20Monitoring/Blockchain%20Monitoring.png)
*Figure 6: Operational monitoring gives the venue team continuous visibility into blockchain health, supporting resilience and incident response objectives.*

### Integration

```mermaid
flowchart LR
    A[Exchange systems] --> B[Unified API]
    B --> C[DALP services]
    C --> D[Settlement network]
    B --> E[Identity provider]
    B --> F[Market surveillance tooling]
    B --> G[Reporting and analytics]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    classDef s fill:#C8A8E8,stroke:#482068,color:#482068,rx:8,ry:8;
    class B,C p;
    class A,D,E,F,G s;
```

![API key management for controlled integrations](../../../shared/brand/dalp-screenshots/19%20-%20Settings%20and%20Admin/API%20Keys.png)
*Figure 7: API key management shows how integration access is governed and rotated, supporting controlled connectivity to venue and participant systems.*

### Implementation

```mermaid
gantt
    title Delivery timeline for the listing platform
    dateFormat  YYYY-MM-DD
    section Foundation
    Discovery and design           :a1, 2026-04-07, 14d
    Platform setup                 :a2, after a1, 14d
    section Build and configure
    Compliance configuration       :b1, after a2, 21d
    Integration implementation     :b2, after a2, 28d
    section Readiness
    Testing and dress rehearsal    :c1, after b1, 21d
    Production cutover             :c2, after c1, 7d
```

![Activity log for operational governance](../../../shared/brand/dalp-screenshots/19%20-%20Settings%20and%20Admin/Activity%20Log.png)
*Figure 8: The activity log provides evidence for change control, user action review, and operational governance during implementation and steady-state service.*

### Access Control

```mermaid
flowchart TD
    A[Platform administrator] --> B[Venue operator]
    A --> C[Compliance officer]
    A --> D[Operations analyst]
    A --> E[Read-only auditor]
    B --> F[Listing actions]
    C --> G[Policy actions]
    D --> H[Operational actions]
    E --> I[Evidence review]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E,F,G,H,I p;
```

![Permissions configuration for an asset](../../../shared/brand/dalp-screenshots/04%20-%20Asset%20Designer/Asset%20Designer%20-%20Step%207%20-%20Asset%20Permissions%20Config.png)
*Figure 9: Permissions are assigned explicitly by role, supporting separation of duties between listing, compliance, and operations functions.*

### Data Architecture

```mermaid
flowchart LR
    A[User actions] --> B[API events]
    B --> C[Workflow state]
    C --> D[On-chain transactions]
    D --> E[Indexing and reconciliation]
    E --> F[Reporting views]
    E --> G[Audit evidence]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E,F,G p;
```

![Insights dashboard for asset-level reporting](../../../shared/brand/dalp-screenshots/21%20-%20Insights/Insights%20-%20Asset%20Overview.png)
*Figure 10: Insights views convert operational and on-chain data into reporting outputs for venue oversight, issuer servicing, and management review.*

### Key Management

```mermaid
flowchart TD
    A[Approved user action] --> B[Policy check]
    B --> C[Signing request]
    C --> D[Protected key domain]
    D --> E[Signed transaction]
    E --> F[Broadcast to network]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E,F p;
```

![Actions view for approval-driven operational controls](../../../shared/brand/dalp-screenshots/new-2026-03-24/Actions/0.jpg)
*Figure 11: Approval queues demonstrate how sensitive actions can be reviewed before execution, reinforcing controlled signing and governance.*

### Listing Workflow Sequence

```mermaid
sequenceDiagram
    participant Issuer
    participant Venue
    participant Platform
    participant Compliance
    Issuer->>Venue: Submit listing package
    Venue->>Platform: Create instrument record
    Platform->>Compliance: Validate policy set
    Compliance-->>Platform: Approved configuration
    Platform-->>Venue: Listing ready for deployment
```

### Onboarding Sequence

```mermaid
sequenceDiagram
    participant Participant
    participant Venue
    participant Identity
    participant Platform
    Participant->>Venue: Request admission
    Venue->>Identity: Verify credentials
    Identity-->>Venue: Eligibility result
    Venue->>Platform: Assign role and permissions
    Platform-->>Participant: Access enabled
```

### Surveillance Sequence

```mermaid
sequenceDiagram
    participant Market
    participant Platform
    participant Surveillance
    participant Operations
    Market->>Platform: Trading event
    Platform->>Surveillance: Forward normalized event
    Surveillance-->>Operations: Raise alert when threshold hit
    Operations-->>Platform: Apply venue control if required
```

![API monitoring overview](../../../shared/brand/dalp-screenshots/20%20-%20Monitoring/API%20Monitoring%20-%20Overview.png)
*Figure 12: API monitoring helps operators detect abnormal request patterns, latency spikes, and integration faults before they disrupt market operations.*

### Settlement Sequence

```mermaid
sequenceDiagram
    participant Buyer
    participant Seller
    participant Platform
    participant Settlement
    Buyer->>Platform: Confirm trade terms
    Seller->>Platform: Confirm asset availability
    Platform->>Settlement: Trigger atomic exchange
    Settlement-->>Platform: Finality status
    Platform-->>Buyer: Settlement confirmation
    Platform-->>Seller: Settlement confirmation
```

### Corporate Action Sequence

```mermaid
sequenceDiagram
    participant Issuer
    participant Platform
    participant Holders
    participant Audit
    Issuer->>Platform: Schedule coupon or redemption
    Platform->>Holders: Notify record date and event terms
    Platform->>Audit: Record approval trail
    Holders-->>Platform: Event acknowledgements where needed
    Platform-->>Issuer: Event execution status
```

### Support Escalation Sequence

```mermaid
sequenceDiagram
    participant User
    participant Support
    participant Operations
    participant Governance
    User->>Support: Raise incident
    Support->>Operations: Triage technical impact
    Operations->>Governance: Escalate if control action needed
    Governance-->>Operations: Authorize response path
    Operations-->>User: Resolution update
```

### Reporting Sequence

```mermaid
sequenceDiagram
    participant Venue
    participant Platform
    participant DataStore
    participant Report
    Venue->>Platform: Request operational report
    Platform->>DataStore: Query indexed activity
    DataStore-->>Platform: Consolidated data set
    Platform-->>Report: Render output package
    Report-->>Venue: Report delivered
```

### Change Control Sequence

```mermaid
sequenceDiagram
    participant Admin
    participant Platform
    participant Reviewer
    participant Audit
    Admin->>Platform: Submit configuration change
    Platform->>Reviewer: Request approval
    Reviewer-->>Platform: Approve or reject
    Platform->>Audit: Store decision trail
    Platform-->>Admin: Publish final status
```

### Operational Diagram Set

```mermaid
flowchart TD
    A[Trading session start] --> B[Venue state checks]
    B --> C[Participant activity]
    C --> D[Exception handling]
    D --> E[Session close and reports]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E p;
```

```mermaid
flowchart TD
    A[Listing request] --> B[Document review]
    B --> C[Compliance review]
    C --> D[Approval gate]
    D --> E[Deploy and publish]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E p;
```

```mermaid
flowchart TD
    A[Investor category] --> B[Jurisdiction rule]
    B --> C[Transfer eligibility]
    C --> D[Order admission]
    D --> E[Execution eligibility]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E p;
```

```mermaid
flowchart TD
    A[Order event] --> B[Event normalization]
    B --> C[Message sequencing]
    C --> D[Surveillance feed]
    D --> E[Audit storage]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E p;
```

```mermaid
flowchart TD
    A[Issuer request] --> B[Coupon schedule]
    B --> C[Record date check]
    C --> D[Entitlement calculation]
    D --> E[Payment instruction]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E p;
```

```mermaid
flowchart TD
    A[Operational alert] --> B[Severity assessment]
    B --> C[Response workflow]
    C --> D[Stakeholder communication]
    D --> E[Closure evidence]
    classDef p fill:#D8E8F0,stroke:#000099,color:#000099,rx:8,ry:8;
    class A,B,C,D,E p;
```
'''
final = text + append
out_md = out_dir/'euronext-technical-sample-full.md'
out_md.write_text(final)
cover = {
  'company':'Euronext',
  'title':'Technical Proposal: Digital Securities Listing Platform',
  'subtitle':'Sample full technical proposal',
  'valid_until':'06 April 2026',
  'contact_name':'SettleMint Team',
  'contact_title':'Digital Assets Solutions',
  'contact_email':'contact@settlemint.com',
  'contact_phone':'+32 16 79 50 00'
}
(out_dir/'cover.json').write_text(json.dumps(cover, indent=2))
print(out_md)
