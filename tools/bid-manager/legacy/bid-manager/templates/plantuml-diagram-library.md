# PlantUML Diagram Library: DALP Templates

> Purpose: A library of 20 PlantUML templates for diagram types that benefit more from PlantUML than Mermaid. Each template is tagged `[FIXED]` or `[VARIABLE]` so proposal authors know whether to reuse or customize it.

## Brand Skinparam Reference

Every diagram can rely on the renderer to inject brand skinparams, but the templates below are self-contained so they also work standalone.

```plantuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam HyperlinkColor #0000FF
skinparam Shadowing false
skinparam RoundCorner 15
skinparam Padding 10
skinparam ArrowColor #000099
skinparam ArrowThickness 1.5
skinparam LineColor #000099
skinparam NoteBackgroundColor #F5F0B0
skinparam NoteBorderColor #BCA820
skinparam NoteFontColor #102848
skinparam PackageBorderColor #000099
skinparam PackageFontColor #000099
skinparam PackageBackgroundColor #D8E8F0
skinparam RectangleBackgroundColor #D8E8F0
skinparam RectangleBorderColor #000099
skinparam RectangleFontColor #000099
skinparam CardBackgroundColor #C0E0F0
skinparam CardBorderColor #284878
skinparam CardFontColor #284878
skinparam NodeBackgroundColor #C0F0C0
skinparam NodeBorderColor #187848
skinparam NodeFontColor #187848
skinparam ComponentBackgroundColor #C8A8E8
skinparam ComponentBorderColor #482068
skinparam ComponentFontColor #482068
skinparam InterfaceBackgroundColor #F2B8A0
skinparam InterfaceBorderColor #C05030
skinparam InterfaceFontColor #C05030
skinparam ArtifactBackgroundColor #B8D8E0
skinparam ArtifactBorderColor #1E4868
skinparam ArtifactFontColor #1E4868
skinparam CloudBackgroundColor #C0E0F0
skinparam CloudBorderColor #284878
skinparam CloudFontColor #284878
skinparam DatabaseBackgroundColor #B0C0D8
skinparam DatabaseBorderColor #183060
skinparam DatabaseFontColor #183060
skinparam QueueBackgroundColor #F5F0B0
skinparam QueueBorderColor #BCA820
skinparam QueueFontColor #102848
skinparam UsecaseBackgroundColor #F2B8A0
skinparam UsecaseBorderColor #C05030
skinparam UsecaseFontColor #C05030
skinparam ClassBackgroundColor #D8E8F0
skinparam ClassBorderColor #000099
skinparam ClassFontColor #000099
skinparam ClassAttributeFontColor #000000
skinparam ClassStereotypeFontColor #506878
skinparam ObjectBackgroundColor #C0F0C0
skinparam ObjectBorderColor #187848
skinparam ObjectFontColor #187848
skinparam ActivityBackgroundColor #D8E8F0
skinparam ActivityBorderColor #000099
skinparam ActivityFontColor #000099
skinparam ActivityDiamondBackgroundColor #F5F0B0
skinparam ActivityDiamondBorderColor #BCA820
skinparam ActivityDiamondFontColor #102848
skinparam SequenceLifeLineBorderColor #506878
skinparam SequenceLifeLineBackgroundColor #F2F2F2
skinparam SequenceParticipantBackgroundColor #D8E8F0
skinparam SequenceParticipantBorderColor #000099
skinparam SequenceParticipantFontColor #000099
skinparam SequenceActorBackgroundColor #F2B8A0
skinparam SequenceActorBorderColor #C05030
skinparam SequenceActorFontColor #C05030
skinparam SequenceArrowColor #000099
skinparam SequenceGroupBorderColor #284878
skinparam SequenceGroupBackgroundColor #C0E0F0
skinparam SequenceGroupHeaderFontColor #284878
skinparam SequenceBoxBorderColor #506878
skinparam SequenceBoxBackgroundColor #F2F2F2
skinparam PartitionBackgroundColor #C0E0F0
skinparam PartitionBorderColor #284878
skinparam PartitionFontColor #284878
skinparam LegendBackgroundColor #F2F2F2
skinparam LegendBorderColor #8898A8
skinparam LegendFontColor #000000
```

## 1. DALP Service Component Map `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
component "Asset Console" as UI
component "DAPI" as API
component "Execution Engine" as EE
component "Key Guardian" as KG
component "SMART Protocol" as SP
UI --> API
API --> EE
EE --> KG
KG --> SP
@enduml
```

## 2. Client Integration Component View `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
component "Client Core Banking" as CORE
component "KYC Provider" as KYC
component "DALP DAPI" as API
component "Compliance Engine" as CE
CORE --> API
KYC --> API
API --> CE
@enduml
```

## 3. Platform Deployment Topology `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
node "Kubernetes Cluster" {
  node "DAPI Pod" as API
  node "Indexer Pod" as IDX
  node "Workflow Pod" as WF
}
database "PostgreSQL" as DB
cloud "Blockchain Network" as BC
API --> DB
IDX --> DB
WF --> BC
API --> BC
@enduml
```

## 4. Multi-Environment Deployment `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
node "DEV" as DEV
node "TEST" as TEST
node "PROD" as PROD
artifact "Helm Release" as HELM
HELM --> DEV
HELM --> TEST
HELM --> PROD
@enduml
```

## 5. Activity: Token Issuance Approval `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
start
:Define token parameters;
:Validate compliance setup;
if (Approved?) then (yes)
  :Deploy asset;
  :Mint supply;
else (no)
  :Rework configuration;
endif
stop
@enduml
```

## 6. Activity: KYC Decision Path `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
start
:Receive investor profile;
:Run provider checks;
if (All checks pass?) then (yes)
  :Issue claims;
  :Enable transactions;
else (no)
  :Request remediation;
endif
stop
@enduml
```

## 7. Use Case: Investor Operations `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
left to right direction
actor Investor
rectangle DALP {
  usecase "View Holdings" as UC1
  usecase "Subscribe" as UC2
  usecase "Redeem" as UC3
}
Investor --> UC1
Investor --> UC2
Investor --> UC3
@enduml
```

## 8. Use Case: Operations Console `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
left to right direction
actor "Ops Team" as OPS
actor "Compliance Officer" as CO
rectangle "Client Operating Model" {
  usecase "Configure Asset" as U1
  usecase "Approve Claims" as U2
  usecase "Monitor Flows" as U3
}
OPS --> U1
OPS --> U3
CO --> U2
@enduml
```

## 9. Class: Core Asset Model `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
class Asset {
  +isin : string
  +status : string
}
class Token {
  +symbol : string
  +supply : uint256
}
class ComplianceProfile {
  +ruleset : string
}
Asset --> Token
Token --> ComplianceProfile
@enduml
```

## 10. Class: Integration Model `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
class ClientSystem
class DALPConnector
class ExternalProvider
ClientSystem --> DALPConnector
DALPConnector --> ExternalProvider
@enduml
```

## 11. Object: Example Investor Snapshot `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
object investor {
  name = "Investor A"
  tier = "Professional"
}
object wallet {
  address = "0x1234..."
}
object claim {
  type = "KYC"
  status = "Active"
}
investor --> wallet
wallet --> claim
@enduml
```

## 12. Object: Settlement Instance `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
object trade {
  asset = "[VARIABLE]"
  amount = "[VARIABLE]"
}
object buyer
object seller
trade --> buyer
trade --> seller
@enduml
```

## 13. Package: DALP Domain Map `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
package "Issuance" {
  [Asset Factory]
  [Token Config]
}
package "Compliance" {
  [Identity]
  [Rules Engine]
}
package "Settlement" {
  [DvP]
  [XvP]
}
[Token Config] --> [Rules Engine]
[Rules Engine] --> [DvP]
@enduml
```

## 14. Package: Client Solution Map `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
package "Client Landscape" {
  [CRM]
  [Core Banking]
}
package "DALP" {
  [DAPI]
  [Execution Engine]
}
[CRM] --> [DAPI]
[Core Banking] --> [DAPI]
@enduml
```

## 15. Network: Secure Access Topology `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
cloud Internet
node WAF
node "DAPI" as API
database "PostgreSQL" as DB
Internet --> WAF
WAF --> API
API --> DB
@enduml
```

## 16. Network: Client Connectivity Model `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
cloud "Client Network" as CLIENT
cloud "SettleMint Zone" as SM
node "Private Link / VPN" as VPN
CLIENT --> VPN
VPN --> SM
@enduml
```

## 17. Component: Custody Integration `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
component "Execution Engine" as EE
component "Signer Service" as SIG
component "Custody Provider" as CUST
component "Blockchain" as BC
EE --> SIG
SIG --> CUST
SIG --> BC
@enduml
```

## 18. Deployment: High Availability Layout `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
node "Zone A" {
  node "API A" as A1
}
node "Zone B" {
  node "API B" as B1
}
database "Primary DB" as DB1
database "Replica DB" as DB2
A1 --> DB1
B1 --> DB2
DB1 --> DB2
@enduml
```

## 19. Activity: Incident Handling `[FIXED]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
start
:Detect incident;
:Classify severity;
if (Critical?) then (yes)
  :Contain and notify;
else (no)
  :Investigate;
endif
:Resolve;
stop
@enduml
```

## 20. Use Case: Governance and Controls `[VARIABLE]`
```plantuml
@startuml
skinparam BackgroundColor #FFFFFF
skinparam DefaultFontName Figtree
skinparam DefaultFontColor #000099
skinparam RoundCorner 15
left to right direction
actor "Governance Lead" as GL
actor "Auditor" as AUD
rectangle "Control Framework" {
  usecase "Approve Policy" as C1
  usecase "Review Evidence" as C2
  usecase "Audit Activity" as C3
}
GL --> C1
GL --> C2
AUD --> C3
@enduml
```
