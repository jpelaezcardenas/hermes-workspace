# Output Naming Convention

## Folder Name Format

```
{submitter}_{client-slug}_{YYYYMMDD-HHMM}/
```

### Components

| Component | Description | Example |
|-----------|-------------|---------|
| `{submitter}` | Slack username of the person who triggered the bid | `gyan`, `roderik` |
| `{client-slug}` | Lowercase, hyphenated client/project name | `acme-bank`, `central-bank-uae` |
| `{YYYYMMDD-HHMM}` | Timestamp of generation (24h format, local time) | `20260315-1430` |

### Rules

- All lowercase
- Use hyphens (`-`) for multi-word slugs, not underscores
- Underscores (`_`) separate the three components
- No spaces, no special characters in slugs
- Keep client slugs short but recognizable (max 30 chars)

### Examples

```
gyan_ocbc-bank_20260315-1430/
roderik_isdb-subsidy_20260312-0900/
navita_saudi-rer_20260310-1615/
```

## Subdirectory Layout

Each output folder uses subdirectories per deliverable type:

```
gyan_ocbc-bank_20260315-1430/
├── technical/
│   ├── technical-proposal.md        (mother format)
│   └── technical-proposal.docx      (derivative)
├── commercial/
│   ├── commercial-proposal.md
│   └── commercial-proposal.docx
├── rfi/
│   ├── rfi-response.md
│   └── rfi-response.docx
├── questionnaire/
│   ├── questionnaire-response.csv   (mother format)
│   └── questionnaire-response.xlsx  (derivative)
└── diagrams/
    ├── architecture-diagram.md
    └── architecture-diagram.png
```

## Input Folder Naming

Input folders follow the same convention under `../input/`:

```
input/{submitter}_{client-slug}_{YYYYMMDD-HHMM}/
```

This creates a 1:1 mapping between input and output folders for traceability.
