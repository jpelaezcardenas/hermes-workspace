# ADI FinStreet Proposal Diagram Sources

## Diagram 1, platform fit

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#E8EAF6', 'primaryTextColor': '#000099', 'primaryBorderColor': '#000099', 'lineColor': '#000099', 'secondaryColor': '#FFF3E0', 'tertiaryColor': '#E8F5E9', 'background': '#FFFFFF' }}}%%
graph TD
    A[ADI FinStreet business model] --> B[Regulated digital asset issuance]
    A --> C[Lifecycle servicing and investor operations]
    A --> D[Institutional controls and auditability]
    B --> E[DALP asset factories and token features]
    C --> F[DALP servicing workflows and APIs]
    D --> G[DALP compliance, access control, custody integration]
    E --> H[ADI Chain smart contracts]
    F --> H
    G --> H
    G --> I[External custody, data, treasury, and bank systems]
```

## Diagram 2, operating model layering

```mermaid
flowchart LR
    subgraph ADI[ADI Chain environment]
        N[Chain, validators, RPC, settlement]
    end
    subgraph DALP[DALP platform layer]
        D1[Asset designer and factories]
        D2[Identity registry and claims]
        D3[Compliance modules]
        D4[Servicing and operator actions]
        D5[API, dashboard, audit trail]
    end
    subgraph EXT[External institutional systems]
        E1[Custody providers]
        E2[KYC and claim issuers]
        E3[Core banking and treasury]
        E4[Registrar and reporting]
    end
    D1 --> N
    D2 --> N
    D3 --> N
    D4 --> N
    D5 --> E1
    D5 --> E2
    D5 --> E3
    D5 --> E4
```

## Diagram 3, solution architecture

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#E8EAF6', 'primaryTextColor': '#000099', 'primaryBorderColor': '#000099', 'lineColor': '#000099', 'secondaryColor': '#FFF3E0', 'tertiaryColor': '#E8F5E9', 'background': '#FFFFFF' }}}%%
graph TD
    A[Issuer and FinStreet operators] --> B[DALP console and API layer]
    B --> C[DALP workflow and permission layer]
    C --> D[Asset factories and token features]
    C --> E[Identity registry and trusted issuers]
    C --> F[Compliance module engine]
    C --> G[Settlement and servicing capabilities]
    D --> H[ADI Chain smart contracts]
    E --> H
    F --> H
    G --> H
    B --> I[Custody providers]
    B --> J[KYC and claims providers]
    B --> K[Treasury and payment systems]
    B --> L[Reporting, observability, and downstream channels]
```

## Diagram 4, DvP flow

```mermaid
sequenceDiagram
    participant O as Operator
    participant D as DALP API
    participant C as Custody provider
    participant A as Asset token
    participant P as Payment token
    O->>D: Initiate DvP settlement
    D->>D: Validate roles, approvals, and compliance context
    D->>C: Request transaction signing
    C-->>D: Signed approval or execution
    D->>A: Submit asset leg
    D->>P: Submit payment leg
    A-->>D: Transfer success
    P-->>D: Transfer success
    D-->>O: Settlement completed atomically
```

## Diagram 5, integration perimeter

```mermaid
flowchart TD
    A[DALP on ADI Chain] --> B[Identity and claims providers]
    A --> C[Custody and approval systems]
    A --> D[Core banking and treasury]
    A --> E[Pricing, NAV, and reference data]
    A --> F[Investor portals, registrar, reporting]
    B --> G[Verified investor eligibility]
    C --> H[Signed and approved transactions]
    D --> I[Cash leg and reconciliation]
    E --> J[Servicing inputs]
    F --> K[Operational visibility and user journeys]
```
