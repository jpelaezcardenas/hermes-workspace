"""
Pre-built diagram templates for DALP/fintech presentations.

Each template includes Mermaid code with SettleMint brand styling
applied via inline styles matching the brand color palette.

Templates cover common slide diagram needs:
- Architecture overviews
- Process/lifecycle flows
- Sequence diagrams
- Gantt/timeline charts
- ER diagrams
- State machines
- Class diagrams
- Pie/distribution charts
"""

DIAGRAM_TEMPLATES = {
    # Architecture diagrams
    "platform_architecture": {
        "type": "mermaid",
        "category": "architecture",
        "description": "DALP platform layer architecture",
        "code": """graph TB
    subgraph UI["Experience Layer"]
        A1[Admin Dashboard] --> A2[Investor Portal]
        A2 --> A3[API Gateway]
    end
    subgraph BL["Business Services"]
        B1[Asset Engine] --> B2[Compliance Engine]
        B2 --> B3[Identity Service]
    end
    subgraph IL["Infrastructure"]
        C1[Smart Contracts] --> C2[Event Processing]
        C2 --> C3[Data Layer]
    end
    UI --> BL
    BL --> IL
    style UI fill:#E8E8FF,stroke:#0000FF,stroke-width:2px,rx:15,ry:15
    style BL fill:#E8F5E8,stroke:#187848,stroke-width:2px,rx:15,ry:15
    style IL fill:#F0E8F8,stroke:#8848C8,stroke-width:2px,rx:15,ry:15"""
    },

    "asset_lifecycle": {
        "type": "mermaid",
        "category": "flow",
        "description": "Digital asset lifecycle flow",
        "code": """graph LR
    A[Configure] -->|Templates| B[Deploy]
    B -->|Smart Contract| C[Issue]
    C -->|Distribution| D[Service]
    D -->|Corporate Actions| E[Redeem]
    style A fill:#E8E8FF,stroke:#0000FF,rx:15,ry:15
    style B fill:#E8F5E8,stroke:#187848,rx:15,ry:15
    style C fill:#F0E8F8,stroke:#8848C8,rx:15,ry:15
    style D fill:#E8F0F8,stroke:#1E4868,rx:15,ry:15
    style E fill:#FFF0E8,stroke:#C05030,rx:15,ry:15"""
    },

    "compliance_sequence": {
        "type": "mermaid",
        "category": "sequence",
        "description": "Compliance check sequence diagram",
        "code": """sequenceDiagram
    participant I as Investor
    participant P as DALP Platform
    participant C as Compliance Engine
    participant B as Blockchain
    I->>P: Transfer Request
    P->>C: Check Eligibility
    C->>C: Verify KYC/AML
    C->>C: Check Transfer Rules
    C-->>P: Approved
    P->>B: Execute Transfer
    B-->>P: Confirmation
    P-->>I: Transfer Complete"""
    },

    "deployment_timeline": {
        "type": "mermaid",
        "category": "gantt",
        "description": "DALP deployment Gantt chart",
        "code": """gantt
    title DALP Implementation Timeline
    dateFormat YYYY-MM-DD
    section Discovery
    Requirements Analysis    :a1, 2026-01-01, 14d
    Architecture Design      :a2, after a1, 7d
    section Development
    Smart Contract Config    :b1, after a2, 14d
    Platform Integration     :b2, after a2, 21d
    Compliance Setup         :b3, after b1, 14d
    section Testing
    UAT                      :c1, after b2, 14d
    Security Audit           :c2, after b3, 7d
    section Launch
    Pilot Deployment         :d1, after c1, 7d
    Production Go-Live       :d2, after d1, 3d"""
    },

    "entity_relationship": {
        "type": "mermaid",
        "category": "er",
        "description": "DALP data model ER diagram",
        "code": """erDiagram
    ASSET ||--o{ TOKEN : "issues"
    ASSET {
        string name
        string type
        string status
    }
    TOKEN ||--o{ HOLDER : "owned_by"
    TOKEN {
        string tokenId
        int amount
        date issuedAt
    }
    HOLDER ||--o{ TRANSACTION : "initiates"
    HOLDER {
        string address
        string kycStatus
        string jurisdiction
    }
    TRANSACTION {
        string txHash
        string type
        date timestamp
    }
    ASSET ||--o{ COMPLIANCE_RULE : "enforces"
    COMPLIANCE_RULE {
        string jurisdiction
        string ruleType
        boolean active
    }"""
    },

    "state_diagram": {
        "type": "mermaid",
        "category": "state",
        "description": "Asset state transitions",
        "code": """stateDiagram-v2
    [*] --> Draft
    Draft --> Configured: Set Parameters
    Configured --> Deployed: Deploy Contract
    Deployed --> Active: Begin Issuance
    Active --> Paused: Pause Operations
    Paused --> Active: Resume
    Active --> Matured: Reach Maturity
    Matured --> Redeemed: Process Redemption
    Redeemed --> [*]"""
    },

    "class_diagram": {
        "type": "mermaid",
        "category": "class",
        "description": "Smart contract class hierarchy",
        "code": """classDiagram
    class DALPAsset {
        +String name
        +String symbol
        +uint256 totalSupply
        +configure()
        +deploy()
        +issue()
    }
    class ComplianceModule {
        +checkTransfer()
        +verifyInvestor()
        +enforceRules()
    }
    class IdentityRegistry {
        +registerIdentity()
        +verifyKYC()
        +checkEligibility()
    }
    DALPAsset --> ComplianceModule
    DALPAsset --> IdentityRegistry
    ComplianceModule --> IdentityRegistry"""
    },

    "pie_chart": {
        "type": "mermaid",
        "category": "pie",
        "description": "Asset distribution breakdown",
        "code": """pie title Asset Distribution by Type
    "Fixed Income" : 35
    "Equity" : 25
    "Real Estate" : 20
    "Funds" : 15
    "Commodities" : 5"""
    },

    "network_topology": {
        "type": "mermaid",
        "category": "architecture",
        "description": "Blockchain network topology",
        "code": """graph TB
    subgraph PN["Production Network"]
        N1[Validator Node 1] --- N2[Validator Node 2]
        N2 --- N3[Validator Node 3]
        N3 --- N1
    end
    subgraph SN["Staging Network"]
        S1[Staging Node]
    end
    subgraph EXT["External Integrations"]
        E1[Oracle Feed]
        E2[Custody Provider]
        E3[KYC Provider]
    end
    PN --> EXT
    SN -.-> PN
    style PN fill:#E8E8FF,stroke:#0000FF,stroke-width:2px,rx:15,ry:15
    style SN fill:#F8F5E0,stroke:#BCA820,stroke-width:2px,rx:15,ry:15
    style EXT fill:#E8F0F8,stroke:#1E4868,stroke-width:2px,rx:15,ry:15"""
    },

    "token_issuance_flow": {
        "type": "mermaid",
        "category": "flow",
        "description": "Token issuance process flow",
        "code": """graph TD
    A[Define Asset Parameters] --> B{Compliance Check}
    B -->|Pass| C[Deploy Smart Contract]
    B -->|Fail| D[Review & Update]
    D --> B
    C --> E[Configure Distribution]
    E --> F[Investor Onboarding]
    F --> G{KYC/AML Verified?}
    G -->|Yes| H[Allocate Tokens]
    G -->|No| I[Reject / Request Info]
    I --> F
    H --> J[Settlement & Confirmation]
    style A fill:#E8E8FF,stroke:#0000FF,rx:15,ry:15
    style C fill:#E8F5E8,stroke:#187848,rx:15,ry:15
    style H fill:#F0E8F8,stroke:#8848C8,rx:15,ry:15
    style J fill:#E8F0F8,stroke:#1E4868,rx:15,ry:15
    style B fill:#F8F5E0,stroke:#BCA820,rx:10,ry:10
    style G fill:#F8F5E0,stroke:#BCA820,rx:10,ry:10
    style D fill:#FFF0E8,stroke:#C05030,rx:15,ry:15
    style I fill:#FFF0E8,stroke:#C05030,rx:15,ry:15"""
    },
}


# Diagram type index — maps categories to templates and use cases
DIAGRAM_INDEX = {
    "architecture": {
        "description": "System architecture and layer diagrams",
        "templates": ["platform_architecture", "network_topology"],
        "use_cases": [
            "Platform overview slides",
            "Technical deep dives",
            "Architecture stack layouts",
            "Network topology illustrations",
        ],
    },
    "flow": {
        "description": "Process and data flow diagrams",
        "templates": ["asset_lifecycle", "token_issuance_flow"],
        "use_cases": [
            "Process slides",
            "Implementation flows",
            "Data pipeline illustrations",
            "Decision tree diagrams",
        ],
    },
    "sequence": {
        "description": "Interaction sequence diagrams",
        "templates": ["compliance_sequence"],
        "use_cases": [
            "API integration slides",
            "Compliance workflow illustrations",
            "User journey maps",
            "System interaction flows",
        ],
    },
    "gantt": {
        "description": "Timeline and Gantt charts",
        "templates": ["deployment_timeline"],
        "use_cases": [
            "Implementation roadmap slides",
            "Project timeline",
            "Phase planning",
            "Milestone tracking",
        ],
    },
    "er": {
        "description": "Entity-relationship diagrams",
        "templates": ["entity_relationship"],
        "use_cases": [
            "Data model slides",
            "Database architecture",
            "System design",
            "Domain modeling",
        ],
    },
    "state": {
        "description": "State machine diagrams",
        "templates": ["state_diagram"],
        "use_cases": [
            "Asset lifecycle states",
            "Workflow states",
            "Status transitions",
            "Process state machines",
        ],
    },
    "class": {
        "description": "Class and component diagrams",
        "templates": ["class_diagram"],
        "use_cases": [
            "Smart contract architecture",
            "Module relationships",
            "API design",
            "Object model visualization",
        ],
    },
    "pie": {
        "description": "Distribution and breakdown charts",
        "templates": ["pie_chart"],
        "use_cases": [
            "Market share slides",
            "Portfolio breakdown",
            "Distribution analysis",
            "Budget allocation",
        ],
    },
}
