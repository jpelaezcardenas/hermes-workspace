# Folder Naming Convention

Standard naming scheme for input and output folders in the bid-manager pipeline.

---

## Format

```
{username}_{rfp-title-slug}_{YYYYMMDD-HHMM}/
```

### Components

| Component | Rule | Example |
|-----------|------|---------|
| **username** | Slack display name, lowercase, no spaces. Use hyphens for multi-word names. | `gyan`, `roderik`, `matthew-v` |
| **rfp-title-slug** | Extracted from document title or message context. Lowercase, hyphens only, max 50 chars. Strip articles (a, the). | `emirates-nbd-digital-assets` |
| **timestamp** | UTC, format `YYYYMMDD-HHMM`. Time of ingestion, not document date. | `20260313-1156` |

### Slugification Rules

1. Lowercase everything
2. Replace spaces with hyphens
3. Remove special characters (except hyphens)
4. Strip leading/trailing hyphens
5. Collapse consecutive hyphens to single
6. Truncate to 50 characters (break at word boundary)

---

## Examples

| Input Context | Folder Name |
|---------------|-------------|
| Gyan shares Emirates NBD digital assets RFP at 11:56 UTC | `gyan_emirates-nbd-digital-assets_20260313-1156/` |
| Roderik shares MOJ Qatar land registry tender at 09:30 UTC | `roderik_moj-qatar-land-registry_20260310-0930/` |
| Matthew shares HSBC security questionnaire at 14:22 UTC | `matthew_hsbc-security-questionnaire_20260312-1422/` |
| Navita shares BNP Paribas RFI at 16:05 UTC | `navita_bnp-paribas-rfi_20260311-1605/` |
| Unknown user shares generic vendor assessment | `unknown_vendor-assessment_20260313-0800/` |

---

## Where Folders Live

| Stage | Location |
|-------|----------|
| Input (original + converted) | `input/{folder-name}/` |
| Output (deliverables) | `output/{folder-name}/` |

Both input and output folders for the same bid use **the same folder name** so they can be cross-referenced.

---

## Edge Cases

- **No client name in message:** Ask the user, or use `unknown-client` as placeholder
- **No document title:** Derive from message content or use `untitled-rfp`
- **Multiple files for same bid:** Same folder, all files inside
- **Revision of existing bid:** New timestamp, append `-v2` before timestamp: `gyan_emirates-nbd-digital-assets-v2_20260315-0900/`
